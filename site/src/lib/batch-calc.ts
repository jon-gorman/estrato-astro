import { BOTTLE_PRICE } from "./bottlenexus";
import { RECIPES, PEOPLE_MIN, PEOPLE_MAX, DRINKS_OPTIONS } from "../data/batch-recipes";

// Pure helpers for the batch calculator. Used at build time (to render the default list into the
// HTML) and in the browser (to update it), so the numbers can never disagree.

export const OZ_PER_BOTTLE = 750 / 29.5735; // 750 ml in US fluid ounces (~25.4)

const FRACTIONS: Record<number, string> = { 0.25: "¼", 0.5: "½", 0.75: "¾" };

/** Format a number to the nearest quarter, e.g. 1.5 -> "1½", 16 -> "16". */
export function fmt(n: number) {
  const q = Math.round(n * 4) / 4;
  const whole = Math.floor(q);
  const frac = q - whole;
  return `${whole || ""}${frac ? FRACTIONS[frac] : ""}` || "0";
}

export const clampPeople = (n: number) => Math.min(PEOPLE_MAX, Math.max(PEOPLE_MIN, Math.round(Number.isFinite(n) ? n : PEOPLE_MIN)));
export const clampDrinks = (n: number) => ((DRINKS_OPTIONS as readonly number[]).includes(n) ? n : 2);

export type Row = { name: string; amount: string; cups: string | null; fruit: string | null; note: string | null };

export function compute(recipeKey: string, peopleIn: number, drinksIn: number) {
  const recipe = RECIPES[recipeKey] ?? RECIPES.margarita;
  const people = clampPeople(peopleIn);
  const perPerson = clampDrinks(drinksIn);
  const drinks = people * perPerson;

  const rows: Row[] = recipe.ingredients.map((i) => {
    const oz = i.oz * drinks;
    const pieces = i.fruit ? Math.ceil(oz / i.fruit.oz - 1e-9) : 0;
    return {
      name: i.name,
      amount: `${fmt(oz)} oz`,
      cups: oz >= 8 ? `${fmt(oz / 8)} ${Math.round((oz / 8) * 4) / 4 === 1 ? "cup" : "cups"}` : null,
      fruit: i.fruit ? `about ${pieces} ${pieces === 1 ? i.fruit.one : i.fruit.many}` : null,
      note: i.note ?? null,
    };
  });

  const estratoOz = (recipe.ingredients.find((i) => i.estrato)?.oz ?? 2) * drinks;
  const bottles = Math.max(1, Math.ceil(estratoOz / OZ_PER_BOTTLE - 1e-9));
  const total = (bottles * BOTTLE_PRICE).toFixed(2);

  return { recipe, people, perPerson, drinks, rows, estratoOz, bottles, total, extras: recipe.extras, method: recipe.method };
}

/** Ingredient list markup (shared by the build and the browser). */
export function rowsHtml(rows: Row[]) {
  return rows
    .map(
      (r) =>
        `<li><span class="bc__amt">${r.amount}${r.cups ? ` <small>${r.cups}</small>` : ""}</span>` +
        `<span class="bc__name">${r.name}${r.fruit ? ` <small>${r.fruit}</small>` : ""}${r.note ? ` <small>${r.note}</small>` : ""}</span></li>`,
    )
    .join("");
}

export const bottleLabel = (n: number) => `${n} bottle${n === 1 ? "" : "s"}`;
export const extrasHtml = (extras: string[]) => extras.map((e) => `<li>${e}</li>`).join("");

/** Plain-text shopping list for texting / sharing / copying. `url` reopens the calculator with the same choices. */
export function shareMessage(r: ReturnType<typeof compute>, url: string) {
  const lines = r.rows.map((row) => `• ${row.amount} ${row.name}${row.fruit ? ` (${row.fruit})` : ""}${row.note ? ` (${row.note})` : ""}`);
  return [
    `Estrato ${r.recipe.title} for ${r.people} people (${r.drinks} drinks)`,
    "",
    ...lines,
    `Also: ${r.extras.join(", ")}`,
    "",
    `You'll need ${bottleLabel(r.bottles)} of Estrato ($${r.total}).`,
    `Plan: ${url}`,
    "Please enjoy responsibly.",
  ].join("\n");
}
