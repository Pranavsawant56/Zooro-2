/**
 * Enquiry delivery for the static export.
 *
 * The site is plain HTML in `out/`, so there is no Next.js server at runtime.
 * Submissions are posted to the standalone nodemailer service in
 * `mail-service/`. Point the site at it with NEXT_PUBLIC_ENQUIRY_ENDPOINT and
 * rebuild (`npm run build`) — `NEXT_PUBLIC_*` values are inlined at build time.
 *
 * During development the same service runs locally; see `.env.development.local`.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT?.trim() ?? "";

export type EnquiryResult = { ok: true } | { ok: false; error: string };

const GENERIC_ERROR =
  "We couldn't send your enquiry just now. Please call or email us directly.";

/**
 * Sends the enquiry. `data` is the raw form payload; name, phone and email are
 * validated by the caller before this runs.
 */
export async function sendEnquiry(
  data: Record<string, string>,
): Promise<EnquiryResult> {
  if (!ENDPOINT) {
    console.error(
      "NEXT_PUBLIC_ENQUIRY_ENDPOINT is not set, so enquiries cannot be sent. " +
        "Set it to the deployed mail service URL (see mail-service/README.md) and rebuild.",
    );
    return { ok: false, error: GENERIC_ERROR };
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = (await res.json().catch(() => null)) as
      | { ok?: boolean; error?: string }
      | null;

    if (!res.ok || json?.ok !== true) {
      return { ok: false, error: json?.error || GENERIC_ERROR };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "Network error. Please check your connection and try again.",
    };
  }
}
