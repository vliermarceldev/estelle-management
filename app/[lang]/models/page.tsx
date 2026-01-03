import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ModelCard } from "@/components/ui/ModelCard";
import { client, urlFor } from "@/sanity/client";
import { getDictionary } from "@/lib/dictionary";
import { Metadata } from "next";
import { getSeoMetadata } from "@/lib/seo";

// Aktualisiert die Seite alle 60 Sekunden (ISR)
export const revalidate = 60;

interface SanityModel {
  name: string;
  slug: { current: string };
  handle: string;
  image: {
    asset: {
      _id: string;
      metadata: {
        lqip: string;
      };
    };
    crop?: any;
    hotspot?: any;
  };
}

interface PageProps {
  params: Promise<{ lang: string }>;
}

// NEU: Spezifische SEO-Daten für die Models-Seite
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = await getDictionary(lang);
  const seoBase = getSeoMetadata("models", lang);

  return {
    ...seoBase,
    title: t.nav.models + " | Estelle Management",
    description:
      "Discover our exclusive selection of talents and models managed by Estelle Management.",
  };
}

export default async function ModelsPage({ params }: PageProps) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const models = await client.fetch<SanityModel[]>(`
    *[_type == "model" && defined(image.asset)]{
      name,
      slug,
      handle,
      image {
        ...,
        asset->{
          _id,
          metadata {
            lqip
          }
        }
      }
    }
  `);

  return (
    <div className="pt-40 pb-20 min-h-screen bg-white dark:bg-zinc-950 animate-in fade-in duration-500 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Optional: Überschrift für Screenreader/SEO Struktur */}
        <h1 className="sr-only">{t.nav.models}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {models.map((model) => {
            if (!model.image?.asset) return null;

            return (
              <ModelCard
                key={model.slug.current}
                slug={model.slug.current}
                name={model.name}
                handle={model.handle}
                // .auto('format') sorgt dafür, dass Sanity WebP/AVIF liefert
                img={urlFor(model.image)
                  .width(800)
                  .height(1067)
                  .auto("format")
                  .url()}
                blurDataUrl={model.image.asset.metadata?.lqip}
              />
            );
          })}
        </div>

        <div className="mt-24 text-center">
          <Link
            href={`/${lang}`}
            className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white text-xs uppercase tracking-[0.2em] transition-colors flex items-center justify-center mx-auto w-fit"
          >
            <ArrowRight className="w-3 h-3 mr-2 rotate-180" />
            {t.modelsPage.backToHome}
          </Link>
        </div>
      </div>
    </div>
  );
}
