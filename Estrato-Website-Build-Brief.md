# ESTRATO — Website Build Brief

*Reconciles the **Copy & Creative Strategy** draft (Aug 31 2026) with the in‑progress Astro build in `/site`.*
*Working doc • 2026‑09‑05 • Author: build team*

Everything marked **⚠ VERIFY** must be confirmed by the brand and, where noted, beverage‑alcohol counsel **before publication**. This doc does not grant approval for any claim.

---

## 1. Non‑negotiable guardrails — apply to every section

These override design and copy preferences.

| # | Rule |
|---|------|
| G1 | **Never call Estrato "tequila."** Working category: **"Mexican Agave Spirit"** or **"100% Blue Agave Spirit"** — both **⚠ VERIFY** against the approved label + legal guidance. |
| G2 | **No health / physiological claims.** Specifically: never state or imply "no hangover," faster recovery, "clean," low‑cal, better‑for‑you, or that additive‑free / traditional production yields a health benefit. Remove the legacy site's hangover line entirely. |
| G3 | **No unsupported superlatives** — "finest," "best," "ultimate," "unmatched," "pinnacle," etc. |
| G4 | **Hold these words** until documented + legally cleared: "pure," "honest," "authentic," "ancestral," "traditional," "generations of expertise," "additive‑free" / "no additives," "100% blue agave." |
| G5 | **No tequila comparison** that could confuse the legal category. Lead with confident positive naming; explain the category plainly *lower* on the page, only with counsel‑approved language. Avoid defensive phrasing ("not technically tequila") in the hero. |
| G6 | **No environmental / sustainability claims** without evidence. |
| G7 | **No trade economics** — margin, pour cost, yield, cost‑per‑cocktail, depletion — until trade pricing, pour size, and distributor terms are verified. |
| G8 | **Age gate required** before site content. **⚠ VERIFY** compliance + privacy/cookie requirements. |
| G9 | **Responsible‑consumption footer required** ("Enjoy Responsibly" + any mandated language). |
| G10 | **Preserve the fulfillment disclosure** in the purchase path: alcohol orders are processed and fulfilled by licensed third‑party retailers in the **Bottle Nexus** network. |
| G11 | **Shipping exclusions** (currently AR, MI, MS, MT, UT) are dynamic — pull live or re‑confirm at launch; never hard‑code as evergreen copy. |
| G12 | **Every product fact is ⚠ VERIFY:** price ($16.99 at draft), ABV (unknown), exact origin wording, full production method, available formats (750 ml shown). Do not fabricate tasting notes. |

---

## 2. Where the build stands

Current build = single‑page site in `/site` (Astro 7). Sections live on `index.astro`, mockup‑driven.

| Strategy IA (§3 of source) | Build status | Notes |
|---|---|---|
| Home | **In progress** | 6 of ~9 mockup sections built |
| — Hero | ✅ built | "Big Agave Energy" + `$16.99` + "Buy a bottle" + product photo + flourish |
| — Mix It Your Way (recipes teaser) | ✅ built | 3 ratio cards, `2 : 1 : 1` |
| — Pricing band | ✅ built | 750 ml / 6‑pack / 12‑pack — **6‑ & 12‑pack prices are invented (see §5)** |
| — From Agave to Glass (process) | ✅ built | Cook / Ferment / Distill = real engravings; **Agave = placeholder crop** |
| — Behind the Glass (bartender element) | ✅ built | *Added — not in mockup.* Names/venue are placeholder |
| — Photo band | ✅ built | Full‑bleed cocktail + flourish + "Salt the rim." |
| — Built for the Bar | ⬜ mockup, not built | next up |
| — Cocktails row | ⬜ mockup, not built | 3 framed cards, `→` links |
| — Footer | ⬜ mockup, not built | mockup footer is minimal (see §3) |
| Our Spirit / Product page | ❌ missing | no PDP, no spec block anywhere |
| Mixology / Recipes | ❌ missing | cocktail cards link nowhere |
| For Bars & Restaurants | ❌ missing as a page | "Built for the Bar" section ≠ a trade page with an inquiry path |
| Our Story | ❌ missing | only the abstract process diagram exists |
| Where to Buy / Buy Online | ❌ missing | nav item + every CTA point to a dead `#where-to-buy` anchor |
| FAQ | ❌ missing | incl. "What is Mexican Agave Spirit?" module |
| Contact | ❌ missing | |
| Shipping / Privacy / Terms / Accessibility / Responsible Consumption | ❌ missing | |
| Age gate | ❌ missing | **G8 — required** |

---

## 3. Missing sections — priority order

Merges the earlier gap analysis with the strategy sitemap. Ranked by impact on the stated goals (accessible‑but‑credible; on‑premise + value consumer + curious agave drinker).

### Tier 1 — required or core to conversion
1. **Age gate** (G8). Interstitial before content.
2. **"The liquid" / Our Spirit** — a spec + character block on the home page *and* a Product page. Category, 750 ml, ABV, blue‑agave, made‑in‑Jalisco, double‑distilled — all **⚠ VERIFY**. Tasting notes = **HOLD FOR TASTING** (structured internal tasting, ≥3 tasters, recorded language). Without this the bottle is hero'd 4× and never described.
3. **Where to Buy** as a real on‑page destination — retailer list / locator / "ask your bar," plus the Buy‑Online path with the Bottle Nexus disclosure (G10) and live shipping eligibility (G11). Every CTA currently dead‑ends.
4. **Trade / For Bars & Restaurants page** with a real **Trade Inquiry** form (market, concept, distributor). "Built for the Bar" is currently a headline + icons with no action. No economics until verified (G7).
5. **Full footer** — replace the mockup's wordmark+nav+button with: email capture, social, **Responsible Consumption** (G9), Privacy / Terms / Accessibility / Shipping & Returns, Contact, © line.

### Tier 2 — credibility & story
6. **Our Story** — maker + place (Jalisco), *why* Estrato. The brief leans hard on "culturally grounded / old‑world craft"; right now that lives only in an abstract diagram. Behind the Glass covers the *bar* side, not the *maker* side. Language: **⚠ VERIFY**; no "ancestral/traditional/authentic" (G4).
7. **"What is Mexican Agave Spirit?" education module + FAQ** — short version on home, long version in FAQ. Category explanation is a **[LEGAL REVIEW REQUIRED]** placeholder until counsel supplies exact wording (G1, G5).
8. **Social proof** — reviews / press / awards / venue logos. Zero credibility signals today. (Not in the source sitemap — recommended.)

### Tier 3 — energy & depth
9. **Recipes hub + detail pages** behind the cocktail‑card arrows — exact builds, glassware, garnish, yield, photo, responsible‑serving note. Recipes require testing before publish.
10. **Email / newsletter capture** (can fold into footer + a light inline module).
11. **UGC / social strip** near the page bottom for the "spirited, expressive" energy.
12. **Contact page**.

---

## 4. Copy — adopt now vs. hold

### Safe to wire in now (no claims)
- **Hero:** keep `BIG AGAVE ENERGY`; **add the subline** from Option B → `BIG AGAVE ENERGY. / EASYGOING PRICE.` Eyebrow `Mexican Agave Spirit` already matches.
- **Section headlines** (from §4 of source): "The bottle built for real drinks," "Agave spirit, no identity crisis," "From Jalisco to your glass," "Make the usual, better," "For bars and restaurants," and closing `THE NEXT ROUND STARTS HERE.`
- **Recipe blurbs:** Margarita — *"Bright, balanced, always invited."* • Paloma — *"Citrus, bubbles, agave. Done."* • Ranch Water — *"Cold, crisp, uncomplicated."* • House Highball — *"Estrato, sparkling water, lime, and room to improvise."*
- **Trade:** section keeps "Built for the Bar"; use `BUILT TO WORK THE WELL.` as the trade‑page headline. CTA: "Tell us your market, concept, and distributor."
- **Positioning lines** for exploration: "Made for the mix." / "Pour well." / "Agave for the whole bar." / "The bottle behind a better round."

### Must stay a visible placeholder until cleared
- **Proof strip:** `100% BLUE AGAVE* · MADE IN JALISCO, MEXICO* · DOUBLE‑DISTILLED* · 750 ML` — keep the `*` and a footnote; do not ship unstarred (G4, G12).
- **"Agave spirit, no identity crisis" body** → `[PLACEHOLDER: legally approved category + agave‑sourcing + geographic‑designation explanation]` (G1, G5).
- **Product taste notes** → `HOLD FOR TASTING` (G12).
- **FAQ answers** on origin, additive‑free, hangover → use the source doc's drafted answers verbatim; they are written to be compliant.
- **Any price in evergreen copy** — `$16.99` is contemplated by Hero Option B but is **⚠ VERIFY** for evergreen use.

---

## 5. Copy audit — things already in the build to fix

| Location | Issue | Action |
|---|---|---|
| `PricingBand.astro` | 6‑pack `$99.99` and 12‑pack `$179.99` are **fabricated**. `$16.99` is from the live cart but unverified for evergreen use. | Mark all three **⚠ VERIFY**; consider removing multipack prices until confirmed. |
| `BehindTheGlass.astro` | Credit line "Mara Solano — Head bartender, Bar Sótano · Oaxaca" is **invented**. | Replace with a real, permissioned person + venue, or remove. |
| `Base.astro` meta description | "Agave, made useful." — superseded tagline. | Update to current line, e.g. "…built for the mix." |
| `SiteHeader.astro` nav | `#where-to-buy` and `#restaurants` are dead anchors; `#product` → pricing band, `#cocktails` → ratio section. | Wire to real sections/pages as Tier‑1 items land. |
| Hero CTA | "Buy a bottle" → `#where-to-buy` (dead). | Point to the Buy‑Online / Where‑to‑Buy destination once built. |
| Global | No age gate, no responsible‑consumption line, no Bottle Nexus disclosure yet. | Add with Tier‑1 work (G8–G11). |
| Process section | Agave illustration is a cropped decorative flourish, not a specimen engraving. | Swap when a proper agave engraving is supplied (cook & ferment already replaced with "pro" versions). |

---

## 6. Visual direction

**The build currently follows `Assets/Mockup/EstratoDesign2026.png`:** warm cream (`#f1e7d8`), terracotta/rust (`#a63b22`), engraving green, ink near‑black; **Anton** (condensed display) + **Space Mono** (labels/body); vintage engravings, product cut‑outs on flat color, duotone photography, registration‑mark detailing.

This already hits most of the brief's **Core elements**:

| Brief core element | In current build? |
|---|---|
| Warm cream backgrounds | ✅ |
| Vivid citrus orange + subtle agave green | ✅ rust + engraving green (orange could push warmer) |
| Oversized condensed type, direct headlines ("Big Agave Energy") | ✅ |
| Authentic product + cocktail photography, natural shadows, tactile surfaces | ✅ (hero, photo band) |
| Antique engraved flourishes / agave / process art, used selectively | ✅ (hero, process, photo band) |
| Clean, reproducible drink + process icons | ✅ (ratio glassware, hand‑drawn to a system) |
| Strong pricing, simple recipes, unmistakable buying actions | ⚠ pricing shown but CTAs dead‑end (§5) |

**The strategy doc's two named directions are alternatives, not the current path:**
- **Direction 1 — Modern Cantina / "Pour Well":** charred black + bone + brick + **electric cobalt** + marigold; League Gothic / Inter; flash‑lit bar photography.
- **Direction 2 — Indigo Mercado / "Agave for Everyone":** deep **indigo** + chalk + terracotta + sun yellow; Fraunces / Manrope; commissioned block‑print illustration set.

Both would be a **repalette + retype** away from the mockup (esp. the cobalt/indigo accent vs. the current rust/green). **Decision needed:** proceed with the mockup aesthetic, or pivot to Direction 1 or 2 before building the remaining sections. Recommendation: the mockup already satisfies the brief's core elements and the build is 6 sections deep — treat Directions 1/2 as a future refresh unless the brand explicitly wants the cobalt/indigo world now.

---

## 7. Suggested build sequence

1. Finish the mockup: **Built for the Bar**, **Cocktails row**, **Footer** (build the footer to the *expanded* spec in §3.5, not the mockup's minimal version).
2. **Age gate** + **responsible‑consumption footer line** + **Bottle Nexus disclosure** (G8–G11).
3. **Our Spirit / "The liquid"** home section + **Product page** (spec = ⚠ VERIFY, taste = HOLD).
4. **Where to Buy / Buy Online** destination.
5. **Trade page** + Trade Inquiry form.
6. **Our Story**, then **FAQ** + "What is Mexican Agave Spirit?" module.
7. Recipes hub + detail, social proof, newsletter, UGC strip.
8. Legal pages (Privacy / Terms / Accessibility / Shipping & Returns), Contact.

---

## Source

Built from: *ESTRATO — Website Copy & Creative Strategy* (working draft, Aug 31 2026); the current live Estrato site + cart; and the in‑progress build in this repo. All product facts pending brand + legal verification.
