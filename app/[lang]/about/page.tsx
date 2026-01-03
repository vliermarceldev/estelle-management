import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getDictionary } from "@/lib/dictionary";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function AboutPage({ params }: PageProps) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  return (
    <div className="pt-40 pb-20 min-h-screen bg-zinc-50 dark:bg-zinc-950 animate-in fade-in duration-500 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-zinc-500 text-xs uppercase tracking-[0.2em] mb-4 block">
          {t.about.title}
        </span>
        <h2 className="text-4xl md:text-5xl font-light text-zinc-900 dark:text-zinc-100 mb-12 leading-tight">
          {t.about.headline}
        </h2>
        <div className="space-y-8 text-lg font-light leading-relaxed text-zinc-600 dark:text-zinc-400">
          <p>{t.about.text1}</p>
          <p>{t.about.text2}</p>
        </div>
        <div className="mt-12 flex justify-center">
          <div className="h-px w-24 bg-zinc-200 dark:bg-zinc-800 mb-8"></div>
        </div>
        <p className="text-zinc-800 dark:text-zinc-300 font-handwriting italic text-xl">
          {t.about.signature}
        </p>
        <div className="mt-16 text-center">
          <Link
            href={`/${lang}`}
            className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white text-sm uppercase tracking-widest transition-colors flex items-center justify-center mx-auto"
          >
            <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
            {t.about.backToHome}
          </Link>
        </div>
      </div>
    </div>
  );
}
