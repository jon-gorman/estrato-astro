// Public contact details shown on the site. Leave CONTACT_EMAIL empty until the
// mailbox exists — the contact page only shows an email address once it is set.
export const CONTACT_EMAIL = "";

// Cloudflare Turnstile site key (public). The matching secret key lives only in
// the Cloudflare Pages environment (TURNSTILE_SECRET), never in this repo.
// Localhost uses Cloudflare's always-pass test key because the real key is
// limited to the production hostnames.
export const TURNSTILE_SITE_KEY = import.meta.env.DEV ? "1x00000000000000000000AA" : "0x4AAAAAAFRsjRhxo_DzB2t_";
