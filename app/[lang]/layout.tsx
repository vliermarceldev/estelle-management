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

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
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
  const baseUrl = "https://www.estelle-management.com";

  return {
    title: {
      template: "%s | Estelle Management",
      default: "Estelle Management - Redefining Management",
    },
    description: "Exclusive OnlyFans Management & Marketing.",
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: "Estelle Management",
      description: "Redefining Management.",
      url: `${baseUrl}/${lang}`,
      siteName: "Estelle Management",
      locale: lang,
      type: "website",
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

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans min-h-screen bg-background text-foreground selection:bg-zinc-200 dark:selection:bg-zinc-700 selection:text-black dark:selection:text-white antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider lang={lang} dictionary={dictionary}>
            <SmoothScroll>
              <Navbar />
              <main>{children}</main>
              {/* Footer erhält nun Daten direkt vom Server -> bessere Performance */}
              <Footer t={dictionary} lang={lang} />
              <CookieConsent />
            </SmoothScroll>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
