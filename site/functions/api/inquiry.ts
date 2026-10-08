// Cloudflare Pages Function: POST /api/inquiry
// Receives the distributor and contact forms, verifies Cloudflare Turnstile,
// and emails the inquiry through Elastic Email.
//
// Required secrets (Pages project > Settings > Variables and Secrets):
//   ELASTICEMAIL_API_KEY   Elastic Email API key with the "Send HTTP" permission
//   TURNSTILE_SECRET       Turnstile secret key
// Optional overrides (plain variables): INQUIRY_TO (comma-separated), INQUIRY_FROM

interface Env {
  ELASTICEMAIL_API_KEY?: string;
  TURNSTILE_SECRET?: string;
  INQUIRY_TO?: string;
  INQUIRY_FROM?: string;
}

const DEFAULT_TO = ["rich@alebrijespirits.us", "amanda@lto.consulting", "info@spirits.marketing"];
const DEFAULT_FROM = "agave@estratomx.com";
const MAX = { short: 200, long: 5000 };

type Field = { key: string; label: string; required?: boolean; long?: boolean };

const FORMS: Record<string, { title: string; fields: Field[] }> = {
  distributor: {
    title: "Distributor inquiry",
    fields: [
      { key: "first_name", label: "First name", required: true },
      { key: "last_name", label: "Last name", required: true },
      { key: "company", label: "Company", required: true },
      { key: "role", label: "Title" },
      { key: "email", label: "Email", required: true },
      { key: "phone", label: "Phone" },
      { key: "business_type", label: "Type of business", required: true },
      { key: "territory", label: "States or territory", required: true },
      { key: "message", label: "Message", long: true },
    ],
  },
  contact: {
    title: "Contact form",
    fields: [
      { key: "name", label: "Name", required: true },
      { key: "email", label: "Email", required: true },
      { key: "topic", label: "Topic", required: true },
      { key: "message", label: "Message", required: true, long: true },
    ],
  },
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// strip anything that could break out of a header or an address display name
const clean = (s: string) => s.replace(/[\r\n<>"]/g, " ").replace(/\s+/g, " ").trim();

const EMAIL_RE = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/;

async function verifyTurnstile(token: string, secret: string, ip: string | null) {
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
  if (!res.ok) return false;
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

export const onRequestPost = async ({ request, env }: { request: Request; env: Env }) => {
  if (!env.ELASTICEMAIL_API_KEY || !env.TURNSTILE_SECRET) {
    console.error("inquiry: ELASTICEMAIL_API_KEY or TURNSTILE_SECRET is not set");
    return json({ ok: false, error: "not_configured" }, 500);
  }

  let input: Record<string, unknown>;
  try {
    input = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  const form = FORMS[String(input.type)];
  if (!form) return json({ ok: false, error: "bad_request" }, 400);

  // honeypot: bots fill the hidden field. Reject visibly rather than faking success, so a
  // real visitor whose autofill filled it is told the message did not go through.
  if (String(input.leave_blank ?? "").trim()) {
    console.warn("inquiry: honeypot field was filled");
    return json({ ok: false, error: "spam" }, 400);
  }

  const values: Record<string, string> = {};
  for (const f of form.fields) {
    const v = String(input[f.key] ?? "").trim();
    if (f.required && !v) return json({ ok: false, error: "invalid", field: f.key }, 400);
    if (v.length > (f.long ? MAX.long : MAX.short)) return json({ ok: false, error: "invalid", field: f.key }, 400);
    values[f.key] = v;
  }
  if (!EMAIL_RE.test(values.email)) return json({ ok: false, error: "invalid", field: "email" }, 400);

  const token = String(input.turnstileToken ?? "");
  const human = token && (await verifyTurnstile(token, env.TURNSTILE_SECRET, request.headers.get("CF-Connecting-IP")));
  if (!human) return json({ ok: false, error: "verification_failed" }, 403);

  const name = values.name || `${values.first_name} ${values.last_name}`.trim();
  const subject =
    input.type === "distributor"
      ? `Estrato distributor inquiry: ${values.company} (${name})`
      : `Estrato contact: ${values.topic} (${name})`;

  const rows = form.fields.filter((f) => values[f.key]);
  const html =
    `<h2 style="font-family:sans-serif">${esc(form.title)}</h2>` +
    `<table cellpadding="6" style="font-family:sans-serif;font-size:14px;border-collapse:collapse">` +
    rows
      .map(
        (f) =>
          `<tr><td style="vertical-align:top;color:#666;white-space:nowrap">${esc(f.label)}</td>` +
          `<td style="white-space:pre-wrap">${esc(values[f.key])}</td></tr>`,
      )
      .join("") +
    `</table><p style="font-family:sans-serif;font-size:12px;color:#888">Sent from the Estrato website. Reply to answer ${esc(name)} directly.</p>`;
  const text = `${form.title}\n\n` + rows.map((f) => `${f.label}: ${values[f.key]}`).join("\n");

  const to = (env.INQUIRY_TO ? env.INQUIRY_TO.split(",").map((s) => s.trim()).filter(Boolean) : DEFAULT_TO);
  const from = env.INQUIRY_FROM || DEFAULT_FROM;

  const res = await fetch("https://api.elasticemail.com/v4/emails/transactional", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-ElasticEmail-ApiKey": env.ELASTICEMAIL_API_KEY },
    body: JSON.stringify({
      Recipients: { To: to },
      Content: {
        From: `Estrato Website <${from}>`,
        ReplyTo: `${clean(name) || "Website visitor"} <${values.email}>`,
        Subject: clean(subject),
        Body: [
          { ContentType: "HTML", Content: html, Charset: "utf-8" },
          { ContentType: "PlainText", Content: text, Charset: "utf-8" },
        ],
      },
    }),
  });

  if (!res.ok) {
    console.error("inquiry: Elastic Email rejected the send", res.status, (await res.text()).slice(0, 300));
    return json({ ok: false, error: "send_failed" }, 502);
  }
  return json({ ok: true });
};

// anything other than POST
export const onRequest = () => json({ ok: false, error: "method_not_allowed" }, 405);
