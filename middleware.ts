// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const locales = ["en", "de", "es", "fr", "it", "pt"];
const defaultLocale = "en";

function getLocale(request: NextRequest): string {
  // Fallback, falls Header fehlen
  const headers = {
    "accept-language":
      request.headers.get("accept-language") || "en-US,en;q=0.5",
  };
  const languages = new Negotiator({ headers }).languages();
  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Check: Dateien, API, Next.js Internals UND Studio ignorieren
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/studio") || // FIX: Studio Route ignorieren
    // Regex für Dateien mit Endung (z.B. .png, .css, .ico)
    /.*\.[^/]+$/.test(pathname)
  ) {
    return;
  }

  // 2. Check: Enthält der Pfad bereits eine unterstützte Locale?
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // 3. Wenn keine Locale da ist -> Redirect zur erkannten Sprache
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;

  // 308 Permanent Redirect ist besser für SEO als 307 (Standard)
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Matcher: Fängt alles ab, außer _next, api und Dateien mit Punkt
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
