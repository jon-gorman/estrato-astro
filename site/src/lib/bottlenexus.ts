// Bottle Nexus (commerce) identifiers. The brand token is a public, client-side
// token — it ships to the browser by design in the vendor's own snippets.
export const BN_TOKEN = "395946b6-68ca-11f0-9f57-0242ac110002";

// Product 7652 = "Estrato Indigo Agave Spirit 750ml" ($16.99). Multi-bottle
// options add this same product at quantity 3 / 6, so there is no bulk pricing.
export const BN_PRODUCT_ID = 7652;

// Price per 750 ml bottle. Flat — no bulk discount. Used by the batch calculator; keep in
// step with the price shown on the pages and in the Bottle Nexus cart.
export const BOTTLE_PRICE = 16.99;
