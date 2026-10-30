/**
 * Enquiry delivery for the static export.
 *
 * The site is plain HTML in `out/`, so there is no Next.js server at runtime.
 * Submissions are posted to the standalone Node service in `backend/`.
 *
 * The endpoint is resolved in this order:
 *
 *   1. `/enquiry-config.json` next to the deployed site — edit it on the server
 *      and the change is live immediately, no rebuild needed;
 *   2. `NEXT_PUBLIC_ENQUIRY_ENDPOINT`, baked in at build time;
 *   3. nothing → the form shows an error instead of silently dropping the
 *      enquiry.
 *
 * During development `.env.development.local` points at the local service.
 */

const BUILD_ENDPOINT = process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT?.trim() ?? "";

export type EnquiryResult = { ok: true } | { ok: false; error: string };

const GENERIC_ERROR =
  "We couldn't send your enquiry just now. Please call or email us directly.";

let endpointPromise: Promise<string> | null = null;

/** Reads the deploy-time override once and remembers it for the session. */
function resolveEndpoint(): Promise<string> {
  if (!endpointPromise) {
    endpointPromise = fetch("/enquiry-config.json", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((json: unknown) => {
        const value =
          typeof json === "object" && json !== null && "endpoint" in json
            ? (json as { endpoint?: unknown }).endpoint
            : "";
        const endpoint = typeof value === "string" ? value.trim() : "";
        return endpoint || BUILD_ENDPOINT;
      })
      .catch(() => BUILD_ENDPOINT);
  }
  return endpointPromise;
}

/**
 * Sends the enquiry. `data` is the raw form payload; name, phone and email are
 * validated by the caller before this runs.
 */
export async function sendEnquiry(
  data: Record<string, string>,
): Promise<EnquiryResult> {
  const endpoint = await resolveEndpoint();

  if (!endpoint) {
    console.error(
      "No enquiry endpoint configured. Set `endpoint` in /enquiry-config.json " +
        "to the deployed backend's /enquiry URL (see backend/README.md), or " +
        "set NEXT_PUBLIC_ENQUIRY_ENDPOINT and rebuild.",
    );
    return { ok: false, error: GENERIC_ERROR };
  }

  try {
    const res = await fetch(endpoint, {
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
