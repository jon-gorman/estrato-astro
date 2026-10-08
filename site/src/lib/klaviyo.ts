// Klaviyo client-side API helpers. The company ID ("Public API Key" / site ID,
// Klaviyo > Settings > API keys) and list IDs are public by design — they ship
// to the browser in Klaviyo's own onsite snippet. Never put a private key here.
export const KLAVIYO_PUBLIC_KEY = "TU5RhB";

const REVISION = "2026-07-15";
const BASE = "https://a.klaviyo.com/client";

type Json = Record<string, unknown>;

async function post(path: string, body: Json) {
  if (!KLAVIYO_PUBLIC_KEY) throw new Error("Klaviyo public key is not set (src/lib/klaviyo.ts)");
  const res = await fetch(`${BASE}/${path}?company_id=${encodeURIComponent(KLAVIYO_PUBLIC_KEY)}`, {
    method: "POST",
    headers: { "Content-Type": "application/vnd.api+json", revision: REVISION },
    body: JSON.stringify(body),
  });
  if (res.status !== 202) throw new Error(`Klaviyo ${path} failed (${res.status})`);
}

/** Record a named event against a profile (creates the profile if new). */
export function trackEvent(
  metric: string,
  profile: { email: string; first_name?: string; last_name?: string; organization?: string; title?: string; properties?: Json },
  properties: Json = {},
) {
  return post("events", {
    data: {
      type: "event",
      attributes: {
        properties,
        metric: { data: { type: "metric", attributes: { name: metric } } },
        profile: { data: { type: "profile", attributes: profile } },
      },
    },
  });
}
