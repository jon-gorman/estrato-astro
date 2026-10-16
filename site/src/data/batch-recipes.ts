// Per-drink amounts (in fluid ounces) for the batch calculator (src/components/BatchCalculator.astro).
// To add a recipe: add an entry here and its key to RECIPE_ORDER — the calculator picks it up.
// Keep these in step with the single-drink builds in src/content/cocktails/*.md.

export type Ingredient = {
  name: string;
  oz: number; // per drink
  estrato?: true; // the Estrato line; drives the bottle count
  fruit?: { oz: number; one: string; many: string }; // juice yield per piece of fruit, for "about N limes"
  note?: string; // short hint shown beside the amount
};

export type Recipe = {
  label: string; // tab text
  title: string; // result heading
  ingredients: Ingredient[];
  extras: string[]; // not scaled by the calculator (garnish, ice, rim)
  method: string;
  href?: string; // full single-drink recipe page
};

export const RECIPES: Record<string, Recipe> = {
  margarita: {
    label: "Pitcher Margarita",
    title: "Pitcher Margarita",
    ingredients: [
      { name: "Estrato", oz: 2, estrato: true },
      { name: "Orange liqueur", oz: 1 },
      { name: "Fresh lime juice", oz: 1, fruit: { oz: 1, one: "lime", many: "limes" } },
    ],
    extras: ["Lime wheels", "Coarse salt for the rims", "Ice"],
    method: "Chill everything, stir in a large pitcher, and taste. Pour over fresh ice into salt-rimmed glasses.",
    href: "/cocktails/batch-margarita/",
  },
  cantarito: {
    label: "Cantarito",
    title: "Cantarito",
    ingredients: [
      { name: "Estrato", oz: 2, estrato: true },
      { name: "Fresh grapefruit juice", oz: 1, fruit: { oz: 6, one: "grapefruit", many: "grapefruits" } },
      { name: "Fresh orange juice", oz: 0.5, fruit: { oz: 3, one: "orange", many: "oranges" } },
      { name: "Fresh lime juice", oz: 0.5, fruit: { oz: 1, one: "lime", many: "limes" } },
      { name: "Grapefruit soda", oz: 2, note: "added to each glass" },
    ],
    extras: ["A pinch of salt per glass", "Tajín or coarse salt for the rims", "Lime, orange, and grapefruit wedges", "Ice"],
    method: "Stir everything except the soda over ice. Pour into rimmed glasses over fresh ice and top each with soda so it stays lively.",
    href: "/cocktails/cantarito/",
  },
};

export const RECIPE_ORDER = ["margarita", "cantarito"] as const;
export type RecipeKey = (typeof RECIPE_ORDER)[number];

// Guest planning limits. Drinks-per-guest is deliberately capped at 3.
export const PEOPLE_MIN = 2;
export const PEOPLE_MAX = 30;
export const DRINKS_OPTIONS = [1, 2, 3] as const;
