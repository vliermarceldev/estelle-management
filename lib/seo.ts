import { Metadata } from "next";

export function getSeoMetadata(path: string, lang: string): Metadata {
  // FIX: Nutzung von Environment Variable mit Fallback
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.estelle-management.com";

  // Entferne führenden Slash, falls vorhanden, um doppelte Slashes zu vermeiden
  const cleanPath = path.replace(/^\//, "");

  return {
    metadataBase: new URL(baseUrl), // WICHTIG: metadataBase setzen, um Fehler bei relativen URLs zu vermeiden
    alternates: {
      canonical: `${baseUrl}/${lang}/${cleanPath}`,
      languages: {
        en: `${baseUrl}/en/${cleanPath}`,
        de: `${baseUrl}/de/${cleanPath}`,
        es: `${baseUrl}/es/${cleanPath}`,
        fr: `${baseUrl}/fr/${cleanPath}`,
        it: `${baseUrl}/it/${cleanPath}`,
        pt: `${baseUrl}/pt/${cleanPath}`,
      },
    },
  };
}
