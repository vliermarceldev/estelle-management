import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ModelCard } from "@/components/ui/ModelCard";
import { client, urlFor } from "@/sanity/client";
import { getDictionary } from "@/lib/dictionary";

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {models.map((model) => {
            if (!model.image?.asset) return null;

            return (
              <ModelCard
                key={model.slug.current}
                slug={model.slug.current}
                name={model.name}
                handle={model.handle}
                // FIX: .auto('format') hinzugefügt für automatische WebP Konvertierung
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
            className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white text-xs uppercase tracking-[0.2em] transition-colors flex items-center justify-center mx-auto"
          >
            <ArrowRight className="w-3 h-3 mr-2 rotate-180" />
            {t.modelsPage.backToHome}
          </Link>
        </div>
      </div>
    </div>
  );
}
