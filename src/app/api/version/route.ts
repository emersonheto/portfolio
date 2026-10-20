import { NextResponse } from "next/server";

// Reports the commit this container was built from, so the deploy workflow can wait until it is live.
export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(
    { version: process.env.APP_VERSION || "dev" },
    { headers: { "Cache-Control": "no-store" } }
  );
}
