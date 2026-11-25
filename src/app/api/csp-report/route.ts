import { NextRequest, NextResponse } from "next/server";

const MAX_BODY_BYTES = 16 * 1024;
const ALLOWED_TYPES = ["application/csp-report", "application/reports+json"];

const clip = (value: unknown) =>
  typeof value === "string" ? value.slice(0, 200) : undefined;

type Violation = Record<string, unknown>;

/** Normalizes both the legacy `csp-report` body and the Reporting API array into violations. */
function extractViolations(payload: unknown): Violation[] {
  if (Array.isArray(payload)) {
    return payload
      .filter((r) => r && typeof r === "object" && (r as Violation).type === "csp-violation")
      .map((r) => (r as Violation).body as Violation)
      .filter((b) => b && typeof b === "object");
  }
  const legacy = (payload as Violation | null)?.["csp-report"];
  return legacy && typeof legacy === "object" ? [legacy as Violation] : [];
}

export async function POST(request: NextRequest) {
  const type = (request.headers.get("content-type") ?? "").split(";")[0].trim().toLowerCase();
  if (!ALLOWED_TYPES.includes(type)) {
    return new NextResponse(null, { status: 415 });
  }

  const declared = Number(request.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > MAX_BODY_BYTES) {
    return new NextResponse(null, { status: 413 });
  }

  // Content-Length can be absent or wrong: enforce the cap on the actual bytes too.
  const raw = await request.text();
  if (Buffer.byteLength(raw) > MAX_BODY_BYTES) {
    return new NextResponse(null, { status: 413 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return new NextResponse(null, { status: 400 });
  }

  for (const v of extractViolations(payload).slice(0, 10)) {
    console.warn(
      "[csp]",
      JSON.stringify({
        blocked: clip(v["blocked-uri"] ?? v.blockedURL),
        directive: clip(v["effective-directive"] ?? v.effectiveDirective),
        document: clip(v["document-uri"] ?? v.documentURL),
      }),
    );
  }

  return new NextResponse(null, { status: 204 });
}
