import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);
const caseStudyPath = /^(?:\/(?:en|es|pt))?\/case-studies\//;

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (caseStudyPath.test(pathname)) {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  // Everything except Payload (admin, api), Next internals and files with an extension.
  matcher: ["/((?!admin|api|_next|_vercel|.*\\..*).*)"],
};
