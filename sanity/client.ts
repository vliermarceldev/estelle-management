import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { type SanityImageSource } from "@sanity/image-url";
import { type PortableTextBlock } from "sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  // 'true' für Produktion (schneller Cache), 'false' für Entwicklung
  useCdn: process.env.NODE_ENV === "production",
  perspective: "published",
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// --- Zentrale Typ-Definitionen ---

export interface SanityImage {
  asset: {
    _id: string;
    metadata?: {
      lqip: string;
    };
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export interface SanityModel {
  _id: string;
  name: string;
  slug: { current: string };
  // Hinweis: 'handle' war im Schema nicht definiert, aber ggf. im Code genutzt.
  // Falls es im Schema fehlt, geben wir es hier optional an.
  handle?: string;
  image: SanityImage;
  // Maße aus dem Schema
  height?: string;
  bust?: string;
  waist?: string;
  hips?: string;
  eyes?: string;
  hair?: string;
  bio?: string;
  portfolio?: SanityImage[];
}

export interface SanityPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  mainImage: SanityImageSource;
  excerpt: string;
  body: PortableTextBlock[];
  language: string;
}
