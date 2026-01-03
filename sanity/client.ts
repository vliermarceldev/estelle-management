import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { type SanityImageSource } from "@sanity/image-url";
import { type PortableTextBlock } from "sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  // WICHTIG: 'true' für Produktion. Das cached Inhalte im Edge-Network (schnell!).
  // Nur 'false' während der lokalen Entwicklung für Live-Updates.
  useCdn: process.env.NODE_ENV === "production",
  // 'published' stellt sicher, dass wir keine Drafts leaken
  perspective: "published",
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Interface für Models
export interface SanityModel {
  _id: string;
  name: string;
  slug: { current: string };
  instagram: string;
  mainImage: SanityImageSource;
  gallery: SanityImageSource[];
  stats: {
    age: number;
    height: string;
    bust: string;
    waist: string;
    hips: string;
  };
  bio: string;
}

// Interface für Blog Posts
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
