import { Metadata } from "next";

export function getSeoMetadata(path: string, lang: string): Metadata {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.estelle-management.com";

  // Sicherstellen, dass baseUrl keinen Slash am Ende hat
  const cleanBaseUrl = baseUrl.replace(/\/$/, "");

  // Sicherstellen, dass path keinen Slash am Anfang hat, aber existiert
  const cleanPath = path ? path.replace(/^\//, "") : "";

  return {
    metadataBase: new URL(cleanBaseUrl),
    alternates: {
      canonical: `${cleanBaseUrl}/${lang}/${cleanPath}`,
      languages: {
        en: `${cleanBaseUrl}/en/${cleanPath}`,
        de: `${cleanBaseUrl}/de/${cleanPath}`,
        es: `${cleanBaseUrl}/es/${cleanPath}`,
        fr: `${cleanBaseUrl}/fr/${cleanPath}`,
        it: `${cleanBaseUrl}/it/${cleanPath}`,
        pt: `${cleanBaseUrl}/pt/${cleanPath}`,
      },
    },
  };
}
