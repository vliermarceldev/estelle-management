import { MetadataRoute } from "next";
import { client } from "@/sanity/client";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://www.estelle-management.com";

// Interfaces definieren statt 'any'
interface SitemapModel {
  slug: { current: string };
  _updatedAt: string;
}

interface SitemapPost {
  slug: { current: string };
  language?: string;
  _updatedAt: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const languages = ["de", "en", "es", "fr", "it", "pt"];
  const staticRoutes = [
    "",
    "/about",
    "/what-we-do",
    "/models",
    "/blog",
    "/#contact",
  ];

  let routes: MetadataRoute.Sitemap = [];

  // 1. Statische Seiten
  languages.forEach((lang) => {
    staticRoutes.forEach((route) => {
      routes.push({
        url: `${baseUrl}/${lang}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" ? 1 : 0.8,
      });
    });
  });

  // 2. Models (Typsicher)
  const models = await client.fetch<SitemapModel[]>(`*[_type == "model"] {
    slug,
    _updatedAt
  }`);

  models.forEach((model) => {
    languages.forEach((lang) => {
      routes.push({
        url: `${baseUrl}/${lang}/models/${model.slug.current}`,
        lastModified: new Date(model._updatedAt),
        changeFrequency: "weekly",
        priority: 0.9,
      });
    });
  });

  // 3. Blog Posts (Typsicher)
  const posts = await client.fetch<SitemapPost[]>(`*[_type == "post"] {
    slug,
    language,
    _updatedAt
  }`);

  posts.forEach((post) => {
    const postLang = post.language || "en";
    routes.push({
      url: `${baseUrl}/${postLang}/blog/${post.slug.current}`,
      lastModified: new Date(post._updatedAt),
      changeFrequency: "daily",
      priority: 0.7,
    });
  });

  return routes;
}
