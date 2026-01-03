import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // FIX: Nutzung von Environment Variable
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.estelle-management.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Wir verbieten Crawlern den Zugriff auf das Studio und API-Routen
      disallow: ["/studio/", "/api/"],
    },
    // Verweis auf die Sitemap
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
