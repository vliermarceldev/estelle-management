import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getDictionary } from "@/lib/dictionary";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  adjustFontFallback: true,
});

export async function generateStaticParams() {
  return [
    { lang: "en" },
    { lang: "de" },
    { lang: "es" },
    { lang: "fr" },
    { lang: "it" },
    { lang: "pt" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.estelle-management.com";

  return {
    title: {
      template: "%s | Estelle Management",
      default: "Estelle Management - Redefining Management",
    },
    description: "Exclusive OnlyFans Management & Marketing.",
    metadataBase: new URL(baseUrl),
    // SEO Optimierung: Sprach-Alternativen angeben
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: "/en",
        de: "/de",
        es: "/es",
        fr: "/fr",
        it: "/it",
        pt: "/pt",
      },
    },
    openGraph: {
      title: "Estelle Management",
      description: "Redefining Management.",
      url: `${baseUrl}/${lang}`,
      siteName: "Estelle Management",
      locale: lang,
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.estelle-management.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EmploymentAgency",
    name: "Estelle Management",
    url: baseUrl,
    logo: `${baseUrl}/icon.png`,
    description: "Exclusive OnlyFans Management & Marketing Agency.",
    sameAs: ["https://www.instagram.com/estellemanagement"],
  };

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans min-h-screen bg-background text-foreground selection:bg-zinc-200 dark:selection:bg-zinc-700 selection:text-black dark:selection:text-white antialiased`}
      >
        <Script
          id="json-ld-agency"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider lang={lang} dictionary={dictionary}>
            <SmoothScroll>
              <Navbar />
              <main>{children}</main>
              <Footer t={dictionary} lang={lang} />
              <CookieConsent />
            </SmoothScroll>
            <Analytics />
            <SpeedInsights />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
