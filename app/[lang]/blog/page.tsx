import React from "react";
import Image from "next/image";
import Link from "next/link";
import { client, urlFor, SanityPost } from "@/sanity/client";
import { getDictionary } from "@/lib/dictionary";
import { Calendar, ArrowRight } from "lucide-react";
import { Metadata } from "next";

// Typdefinition für die Page Params
interface PageProps {
  params: Promise<{ lang: string }>;
}

async function getPosts(lang: string): Promise<SanityPost[]> {
  const query = `
    *[_type == "post" && language == $lang] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      mainImage,
      excerpt
    }
  `;
  return client.fetch(query, { lang });
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  // FIX: 'as any' entfernt -> ist jetzt typsicher
  const dict = await getDictionary(lang);

  return {
    title: `${dict.blog.title} | Estelle Management`,
    description: dict.blog.subtitle,
  };
}

export default async function BlogPage({ params }: PageProps) {
  const { lang } = await params;
  // FIX: 'as any' entfernt
  const dict = await getDictionary(lang);
  const posts = await getPosts(lang);

  return (
    <main className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl md:text-5xl font-light text-zinc-900 dark:text-zinc-100 uppercase tracking-widest mb-6">
            {dict.blog.title}
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
            {dict.blog.subtitle}
          </p>
        </div>

        {/* Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <Link
                key={post._id}
                href={`/${lang}/blog/${post.slug.current}`}
                className="group block bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 animate-in fade-in slide-in-from-bottom-8"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-[16/9] relative overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                  {post.mainImage && (
                    <Image
                      src={urlFor(post.mainImage).width(800).height(450).url()}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      // Optional: Größen optimieren für Grid
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-2 text-xs text-zinc-400 uppercase tracking-widest mb-4">
                    <Calendar className="w-3 h-3" />
                    <time>
                      {new Date(post.publishedAt).toLocaleDateString(lang, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>

                  <h2 className="text-xl font-medium text-zinc-900 dark:text-zinc-100 mb-3 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <span className="inline-flex items-center text-xs uppercase tracking-widest font-medium text-zinc-900 dark:text-zinc-100 group-hover:translate-x-1 transition-transform">
                    {dict.blog.readMore}
                    <ArrowRight className="w-3 h-3 ml-2" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-zinc-200 dark:border-zinc-800">
            <p className="text-zinc-500">
              No posts found for this language ({lang}).
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
