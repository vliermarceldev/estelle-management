import { Metadata } from "next";
import { client, urlFor } from "@/sanity/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getSeoMetadata } from "@/lib/seo";
import { type SanityImageSource } from "@sanity/image-url";

// Interfaces für Typsicherheit
interface SanityModel {
  name: string;
  slug: { current: string };
  bio?: string;
  height?: string;
  bust?: string;
  waist?: string;
  hips?: string;
  eyes?: string;
  hair?: string;
  // Hauptbild
  image: SanityImageSource & {
    asset: {
      _id: string;
      metadata: { lqip: string };
    };
  };
  // Portfolio Bilder
  portfolio?: (SanityImageSource & {
    asset: {
      _id: string;
      metadata: { lqip: string };
    };
  })[];
}

interface PageProps {
  params: Promise<{ slug: string; lang: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, lang } = await params;

  const model = await client.fetch<SanityModel>(
    `*[_type == "model" && slug.current == $slug][0]{
      name,
      bio,
      image { asset->{_id} } 
    }`,
    { slug }
  );

  if (!model) return {};

  const seoBase = getSeoMetadata(`models/${slug}`, lang);

  return {
    ...seoBase,
    title: `${model.name} | Estelle Management`,
    description: model.bio?.substring(0, 160),
    openGraph: {
      ...seoBase.openGraph,
      images: [urlFor(model.image).width(1200).url()],
    },
  };
}

export default async function ModelProfile({ params }: PageProps) {
  const { slug, lang } = await params;

  // Robuste Query mit _id für urlFor und LQIP für Blur-Effekte
  const model = await client.fetch<SanityModel>(
    `*[_type == "model" && slug.current == $slug][0]{
      name,
      bio,
      height,
      bust,
      waist,
      hips,
      eyes,
      hair,
      image {
        ...,
        asset->{
          _id,
          metadata { lqip }
        }
      },
      portfolio[]{
        ...,
        asset->{
          _id,
          metadata { lqip }
        }
      }
    }`,
    { slug }
  );

  if (!model) notFound();

  const stats = [
    { label: "Height", val: model.height, unit: "cm" },
    { label: "Bust", val: model.bust, unit: "" },
    { label: "Waist", val: model.waist, unit: "" },
    { label: "Hips", val: model.hips, unit: "" },
    { label: "Eyes", val: model.eyes, unit: "" },
    { label: "Hair", val: model.hair, unit: "" },
  ];

  // JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: model.name,
    description: model.bio,
    image: urlFor(model.image).width(800).url(),
    url: `https://www.estelle-management.com/${lang}/models/${slug}`,
    height: model.height ? `${model.height} cm` : undefined,
  };

  return (
    <main className="pt-32 pb-20 bg-white dark:bg-zinc-950 transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 lg:grid lg:grid-cols-12 lg:gap-16">
        {/* LINKE SPALTE: Name, Metriken (Stats), Bio */}
        <div className="lg:col-span-4 mb-12 lg:mb-0 content-start">
          <div className="sticky top-32">
            <h1 className="text-5xl font-light uppercase tracking-tighter mb-8 text-zinc-900 dark:text-zinc-100">
              {model.name}
            </h1>

            {/* Metriken (Stats) */}
            <div className="grid grid-cols-2 gap-8 border-y border-zinc-100 dark:border-zinc-800 py-8 mb-8 text-zinc-900 dark:text-zinc-100">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-1">
                    {s.label}
                  </p>
                  <p className="text-sm font-medium">
                    {s.val || "—"} {s.val && s.unit}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-zinc-500 font-light leading-relaxed">
              {model.bio}
            </p>
          </div>
        </div>

        {/* RECHTE SPALTE: Hauptbild + Portfolio */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 1. Das Hauptbild (als erstes Element im Grid) */}
          <div className="relative aspect-[3/4] bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
            <Image
              src={urlFor(model.image).width(1000).height(1333).url()}
              alt={`${model.name} Profile`}
              fill
              className="object-cover" // Kein Hover-Effekt mehr
              placeholder={model.image.asset?.metadata?.lqip ? "blur" : "empty"}
              blurDataURL={model.image.asset?.metadata?.lqip}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          {/* 2. Portfolio Bilder */}
          {model.portfolio?.map((img, i) => (
            <div
              key={i}
              className="relative aspect-[3/4] bg-zinc-100 dark:bg-zinc-900 overflow-hidden"
            >
              <Image
                src={urlFor(img).width(1000).auto("format").url()}
                alt={`${model.name} Portfolio ${i}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover" // Kein Hover-Effekt mehr
                placeholder={img.asset?.metadata?.lqip ? "blur" : "empty"}
                blurDataURL={img.asset?.metadata?.lqip}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
