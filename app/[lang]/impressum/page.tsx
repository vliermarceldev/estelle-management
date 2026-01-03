import React from "react";
import { getDictionary } from "@/lib/dictionary";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function Impressum({ params }: PageProps) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  if (!t.impressumPage) return null;

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 pt-32 pb-20 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 border-b border-zinc-200 dark:border-zinc-800 pb-8">
          <h1 className="text-3xl md:text-5xl font-light text-zinc-900 dark:text-zinc-100 uppercase tracking-widest mb-4">
            {t.impressumPage.title}
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 font-light">
            {t.impressumPage.subtitle}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-12">
          {t.impressumPage.sections.map((section: any, index: number) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-4">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                  {section.title}
                </h3>
              </div>
              <div className="md:col-span-8">
                <p className="text-zinc-600 dark:text-zinc-400 font-light leading-relaxed whitespace-pre-line text-sm">
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
