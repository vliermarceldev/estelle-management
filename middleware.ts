import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const locales = ["en", "de", "es", "fr", "it", "pt"];
const defaultLocale = "en";

function getLocale(request: NextRequest): string {
  const headers = {
    "accept-language":
      request.headers.get("accept-language") || "en-US,en;q=0.5",
  };
  const languages = new Negotiator({ headers }).languages();
  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Check: System-Pfade und statische Assets ignorieren
  // Regex verfeinert für Performance und Sicherheit
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/studio") ||
    // Ignoriere typische Dateiendungen für Bilder/Fonts/etc.
    /\.(png|jpg|jpeg|svg|gif|webp|ico|css|js|woff|woff2|ttf|eot|mp4|webm)$/i.test(
      pathname
    )
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

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Matcher: Fängt alles ab, außer interne Pfade
  matcher: ["/((?!_next|api|studio|static|.*\\..*).*)"],
};
