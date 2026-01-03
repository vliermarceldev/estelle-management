import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client, urlFor, SanityPost } from "@/sanity/client";
import { getDictionary } from "@/lib/dictionary";
import { PortableText, PortableTextReactComponents } from "@portabletext/react";
import { ArrowLeft, Calendar } from "lucide-react";
import { Metadata } from "next";

async function getPost(slug: string, lang: string): Promise<SanityPost | null> {
  const query = `
    *[_type == "post" && slug.current == $slug][0] {
      ...,
      body[] {
        ...,
        asset->{
          ...,
          "_ref": _id
        }
      }
    }
  `;
  return client.fetch(query, { slug });
}

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = await getPost(slug, lang);
  if (!post) return {};
  return {
    title: `${post.title} | Estelle Management`,
    description: post.excerpt,
    openGraph: {
      images: post.mainImage ? [urlFor(post.mainImage).width(1200).url()] : [],
    },
  };
}

// FIX: 'any' entfernt. Typisierung für PortableText Komponenten
const ptComponents: Partial<PortableTextReactComponents> = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl font-light mt-12 mb-6 uppercase tracking-wide">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-light mt-10 mb-4 text-zinc-900 dark:text-zinc-100">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-medium mt-8 mb-3">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="mb-6 leading-loose text-zinc-600 dark:text-zinc-400 font-light">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-zinc-900 dark:border-zinc-100 pl-6 py-2 my-8 italic text-lg text-zinc-800 dark:text-zinc-200">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-6 space-y-2 text-zinc-600 dark:text-zinc-400 font-light">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-6 space-y-2 text-zinc-600 dark:text-zinc-400 font-light">
        {children}
      </ol>
    ),
  },
};

export default async function BlogPostPage({ params }: PageProps) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);
  const post = await getPost(slug, lang);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.mainImage
      ? urlFor(post.mainImage).width(1200).height(630).url()
      : undefined,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Organization",
      name: "Estelle Management",
      url: "https://www.estelle-management.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Estelle Management",
      logo: {
        "@type": "ImageObject",
        url: "https://www.estelle-management.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.estelle-management.com/${lang}/blog/${post.slug.current}`,
    },
  };

  return (
    <article className="min-h-screen pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Back Link */}
      <div className="max-w-3xl mx-auto px-4 mb-12">
        <Link
          href={`/${lang}/blog`}
          className="inline-flex items-center text-xs uppercase tracking-widest text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {dict.blog.back}
        </Link>
      </div>

      {/* Hero Header */}
      <div className="max-w-3xl mx-auto px-4 mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-zinc-900 dark:text-zinc-100 leading-tight mb-8">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-zinc-500 uppercase tracking-widest">
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {new Date(post.publishedAt).toLocaleDateString(lang, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Main Image */}
      {post.mainImage && (
        <div className="w-full h-[40vh] md:h-[60vh] relative mb-16 bg-zinc-100 dark:bg-zinc-900">
          <Image
            src={urlFor(post.mainImage).width(1920).height(1080).url()}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4">
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          {post.excerpt && (
            <p className="text-xl md:text-2xl font-light leading-relaxed text-zinc-900 dark:text-zinc-100 mb-12 border-b border-zinc-200 dark:border-zinc-800 pb-12">
              {post.excerpt}
            </p>
          )}

          <PortableText value={post.body} components={ptComponents} />
        </div>

        {/* CTA Section */}
        <div className="mt-20 p-8 md:p-12 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-center">
          <h3 className="text-2xl font-light text-zinc-900 dark:text-zinc-100 mb-4">
            Bereit für deinen eigenen Erfolg?
          </h3>
          <p className="text-zinc-500 dark:text-zinc-400 mb-8 font-light">
            Bewirb dich jetzt bei Estelle Management und starte deine Karriere.
          </p>
          <Link
            href={`/${lang}/#contact`}
            className="inline-block bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 px-8 py-4 text-sm uppercase tracking-widest font-medium hover:opacity-90 transition-opacity cursor-pointer"
          >
            {dict.nav.apply}
          </Link>
        </div>
      </div>
    </article>
  );
}
