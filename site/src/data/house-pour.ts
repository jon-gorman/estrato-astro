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
    about: "Estrato Blanco (Still Strength)",
    nose: "sweet, bold cooked agave with vegetal and citrus notes",
    palate: "a rich, viscous mouthfeel, led by cooked-agave sweetness and balanced by fresh vegetal and citrus tones",
    finish: "long, with the vegetal notes coming forward at the end",
  },
  // Brand-approved tasting notes. When set they replace the attributed review in the product section.
  // Confirmed by the brand. (Wording originated in a third-party review; it is now presented as the brand's notes.)
  tasting: {
    nose: "Sweet, bold cooked agave with vegetal and citrus notes.",
    palate: "A rich, viscous mouthfeel, led by cooked-agave sweetness and balanced by fresh vegetal and citrus tones.",
    finish: "Long, with the vegetal notes coming forward at the end.",
  } as { nose: string; palate: string; finish: string } | null,
  // short, verified flavor description of what Estrato brings to a cocktail (brand-approved)
  flavor: null as string | null,
  // approved sensory description for the FAQ (brand-approved; the review above is used until set)
  sensory: "Sweet, bold cooked agave with vegetal and citrus notes on the nose, a rich and viscous palate led by cooked-agave sweetness and balanced by fresh vegetal and citrus tones, and a long finish." as string | null,

  // Branded footage of a bartender making a margarita with the Estrato bottle (Seedance, generated
  // from the stock bartender photo). It is product footage, NOT an account testimonial — do not
  // caption it as a real account or bartender. Replace/add a real account video via testimonial.videoSrc.
  bartenderVideo: {
    src: "/video/bartender-margarita.mp4",
    poster: "/video/bartender-margarita-poster.jpg",
  } as { src: string; poster: string } | null,

  // bartender at an account that has reordered Estrato
  testimonial: {
    quote: null as string | null, // exact, approved quote
    name: null as string | null, // bartender's name
    account: null as string | null, // account name, city
    videoSrc: null as string | null, // mp4 path under /public, or null
  },
  // optional second quote from a customer who knew it was an agave spirit
  customerQuote: null as { quote: string; by: string } | null,

  // tasting note for the margarita recipe
  tastingNote: null as string | null,

  // serving suggestion + tasting note for "Can I drink it straight?"
  straight: null as string | null,
  // substantiated reason for the $16.99 price
  priceReason: null as string | null,
  // delivery availability and timing (shipping cost shows at checkout)
  delivery: null as string | null,
};
