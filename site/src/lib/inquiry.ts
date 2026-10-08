// Shared submit flow for the distributor and contact forms: send the inquiry to
// our /api/inquiry endpoint (which emails it), then record it in Klaviyo.
type Turnstile = { reset: () => void };

export class InquiryError extends Error {
  constructor(public code: string) {
    super(code);
  }
}

export async function submitInquiry(
  type: "distributor" | "contact",
  form: HTMLFormElement,
  toKlaviyo: () => Promise<unknown>,
) {
  const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
  const turnstileToken = data["cf-turnstile-response"] ?? "";
  if (!turnstileToken) throw new InquiryError("verification_pending");

  try {
    const res = await fetch("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, type, turnstileToken }),
    });
    const body = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
    if (!res.ok || !body.ok) throw new InquiryError(body.error ?? "send_failed");
  } catch (err) {
    (window as unknown as { turnstile?: Turnstile }).turnstile?.reset();
    throw err instanceof InquiryError ? err : new InquiryError("network");
  }

  // The inquiry is already in the team's inbox; a Klaviyo hiccup must not fail the form.
  await toKlaviyo().catch((err) => console.warn("Klaviyo event failed", err));
}

export function inquiryMessage(err: unknown) {
  const code = err instanceof InquiryError ? err.code : "";
  if (code === "verification_pending") return "Please wait a moment for the spam check to finish, then try again.";
  if (code === "verification_failed") return "We couldn't verify that you're human. Please try again.";
  return "Something went wrong sending that. Please try again in a moment.";
}
