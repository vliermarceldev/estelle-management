import React from "react";
import { getDictionary } from "@/lib/dictionary";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function Privacy({ params }: PageProps) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  if (!t.privacyPage) return null;

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 pt-32 pb-20 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 border-b border-zinc-200 dark:border-zinc-800 pb-8">
          <h1 className="text-3xl md:text-5xl font-light text-zinc-900 dark:text-zinc-100 uppercase tracking-widest mb-4">
            {t.privacyPage.title}
          </h1>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <p className="text-zinc-500 dark:text-zinc-400 font-light">
              {t.privacyPage.subtitle}
            </p>
            <span className="text-xs text-zinc-400 uppercase tracking-widest border border-zinc-200 dark:border-zinc-800 px-3 py-1">
              {t.privacyPage.updated}
            </span>
          </div>
        </div>

        {/* Intro Text */}
        <div className="mb-16">
          <p className="text-lg text-zinc-800 dark:text-zinc-200 font-light leading-relaxed">
            {t.privacyPage.intro}
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-16">
          {t.privacyPage.sections.map((section: any, index: number) => (
            <div key={index} className="group">
              <h3 className="text-xl font-medium text-zinc-900 dark:text-zinc-100 mb-6 flex items-center">
                {section.title}
              </h3>
              <div className="pl-4 md:pl-0 border-l-2 md:border-l-0 border-zinc-200 dark:border-zinc-800">
                <p className="text-zinc-600 dark:text-zinc-400 font-light leading-relaxed whitespace-pre-line text-sm md:text-base">
                  {section.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
