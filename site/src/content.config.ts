import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Cocktail recipe collection.
 * Add a new drink = drop a `.md` file (and its photo) in `src/content/cocktails/`.
 *
 * GUARDRAIL: `tasted` gates production visibility. A recipe with
 * `tasted: false` still gets a route (so it can be reviewed directly) but is
 * excluded from the homepage cards and the /cocktails/ index — see the
 * `.filter()` calls in CocktailCards.astro and cocktails/index.astro. Flip
 * it to `true` once a bartender has actually made and approved the build.
 * Never render `verified` / `tasted` / `legalApproved` as visible text.
 */
const cocktails = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/cocktails" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      order: z.number().default(99),
      blurb: z.string(), // short card description
      deck: z.string(), // recipe-page subtitle (can differ from blurb)
      ratio: z.string().optional(), // e.g. "2 : 1 : 1" — omit when not genuinely useful
      glass: z.string(), // e.g. "Rocks"
      rim: z.string().optional(), // e.g. "Half-salted" — omit if the drink has no rim
      garnish: z.string(),
      method: z.enum(["Built", "Shaken", "Stirred", "Blended"]),
      build: z
        .array(z.object({ amount: z.string(), item: z.string() }))
        .min(1),
      steps: z.array(z.string()).min(1),
      note: z.string().optional(),
      image: image(),
      verified: z.boolean().default(false), // facts checked against the approved source
      tasted: z.boolean().default(false), // recipe made and approved by a bartender
      legalApproved: z.boolean().default(false), // copy cleared by beverage-alcohol counsel
    }),
});

export const collections = { cocktails };
