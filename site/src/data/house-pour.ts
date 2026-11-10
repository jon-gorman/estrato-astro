// Content for /house-pour/ that still needs a verified fact or an approved quote.
// `null` renders a clearly marked "To add" box on the page (hidden by nothing — it is
// meant to be seen). Replace a null with the real, approved text and the box turns
// into the real content automatically. When nothing is left to fill in, the "Draft"
// banner disappears too (see pendingCount in the page).
//
// GUARDRAILS (Estrato-Website-Build-Brief.md): no fabricated tasting notes (G12), no
// health or superlative claims (G2/G3), no trade economics (G7), and every product fact
// below is the brand's to confirm before this page is linked or indexed.
export const content = {
  // false = draft: "To add" boxes are visible and the Draft banner shows.
  // true  = ad-ready: unfilled placeholders and empty sections are simply left out.
  publish: false,

  // e.g. "40% ABV" — confirm against the approved label
  abv: "35% ABV" as string | null, // confirmed by the brand

  // Third-party review used for flavor + tasting language. Attributed, paraphrased (not a
  // verbatim quote). NOTE: Agave Matchmaker reviewed "Estrato Blanco (Still Strength)" —
  // confirm that is the same liquid as the $16.99 750 ml Estrato Indigo before running ads,
  // and that the reviewer is fine with being cited. Avoid linking: that site may label the
  // product "tequila", which conflicts with this page.
  review: {
    source: "Agave Matchmaker",
    about: "Estrato Blanco",
    nose: "sweet, bold cooked agave with vegetal and citrus notes",
    palate: "a rich, viscous mouthfeel, led by cooked-agave sweetness and balanced by fresh vegetal and citrus tones",
    finish: "long, with the vegetal notes coming forward at the end",
  },
  // Brand-approved tasting notes. When set they replace the attributed review in the product section.
  // Brand-approved tasting notes (supplied 2026-10-16). Sentence-cased from the approved all-caps text.
  tasting: {
    appearance: "Crystal clear and brilliantly transparent. Fine, slow-forming legs reveal a silky texture and excellent structure.",
    nose: "Fresh and expressive, led by cooked agave with delicate floral notes and bright citrus nuances. Subtle hints of honey, natural vanilla, and refined minerality add depth and balance.",
    palate: "Exceptionally smooth and silky on entry. Flavors of mature agave are complemented by floral notes, honey, vanilla, and delicate white fruit, supported by a refreshing mineral character.",
    finish: "Long, clean, and persistent, leaving elegant impressions of cooked agave and wildflowers.",
  } as { appearance: string; nose: string; palate: string; finish: string } | null,
  // short, verified flavor description of what Estrato brings to a cocktail (brand-approved)
  flavor: null as string | null,
  // approved sensory description for the FAQ (brand-approved; the review above is used until set)
  sensory: "Fresh and expressive on the nose, led by cooked agave with floral and citrus notes. Silky on the palate, with mature agave, honey, vanilla, and a refreshing mineral character. The finish is long, clean, and persistent." as string | null,

  // Real footage of a bartender making Estrato cocktails (our own shoot; vertical 9:16, with a music bed).
  // It is brand footage, NOT an account testimonial — do not caption it as a named account or bartender.
  // Add a real account video via testimonial.videoSrc.
  bartenderVideo: {
    src: "/video/estrato-bartender.mp4",
    poster: "/video/estrato-bartender-poster.jpg",
  } as { src: string; poster: string } | null,

  // bartender quote (supplied 2026-11-10). Account/city is optional: add it to show it under the name.
  testimonial: {
    quote: "The best bottle on the back bar isn\u2019t always the most expensive. It\u2019s the one that works in the drink." as string | null, // exact, approved quote
    name: "Mariana G." as string | null, // bartender's name
    account: null as string | null, // account name, city
    videoSrc: null as string | null, // mp4 path under /public, or null
  },
  // customer quotes (supplied 2026-11-10; names confirmed). `by` is optional: when null the line is left out.
  customerQuotes: [
    {
      quote: "We made Cantaritos for friends, and Estrato worked beautifully with the fresh citrus. Easy to see this becoming our go-to cocktail bottle.",
      by: "Alex M.",
    },
    {
      quote: "I was skeptical at $16.99, but I really enjoyed it in cocktails. A welcome find for the bar cart.",
      by: "Danielle R.",
    },
    {
      quote: "For the price you can\u2019t go wrong. Everyone loved the cocktails I made with it.",
      by: "Chris T.",
    },
  ] as { quote: string; by: string | null }[],

  // tasting note for the margarita recipe
  tastingNote: null as string | null,

  // serving suggestion + tasting note for "Can I drink it straight?"
  straight: "Naturally smooth and well balanced, Estrato is equally enjoyable neat, lightly chilled, or as the foundation of cocktails that preserve the true character of the agave." as string | null, // from the approved "Character" note
  // substantiated reason for the $16.99 price
  priceReason: "Great agave shouldn't come with a markup. Estrato is distilled in Tequila, Jalisco from mature agave using a traditional process, priced so you can actually make it your go-to. Craft for the everyday pour." as string | null,
  // delivery availability and timing (shipping cost shows at checkout)
  delivery: null as string | null,
};
