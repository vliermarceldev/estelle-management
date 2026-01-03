import React from "react";
import { Metadata } from "next";
import { getDictionary } from "@/lib/dictionary";
import { getSeoMetadata } from "@/lib/seo";
import { ContactForm } from "@/components/ui/ContactForm";
import { ProcessSection } from "@/components/ui/ProcessSection";
import { FAQ } from "@/components/ui/FAQ";
import { HeroSection } from "@/components/ui/HeroSection";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = await getDictionary(lang);
  const seoBase = getSeoMetadata("", lang);

  return {
    ...seoBase,
    title: "Estelle Management | Exclusive OnlyFans Management",
    description: t.about.text1.substring(0, 160),
  };
}

export default async function Home({ params }: PageProps) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const faqList = t.home?.faq?.items || [];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqList.map((item: any) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HeroSection ist nun Server Component und erhält t */}
      <HeroSection t={t} />

      <div id="process">
        <ProcessSection t={t} />
      </div>

      {/* FAQ erhält die Daten vom Server */}
      <FAQ
        title={t.home.faq.title}
        subtitle={t.home.faq.subtitle}
        items={t.home.faq.items}
      />

      <section
        id="contact"
        className="py-24 bg-zinc-50 dark:bg-zinc-900 relative border-t border-zinc-200 dark:border-zinc-800 transition-colors duration-300"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-8 md:p-12 shadow-2xl shadow-zinc-200/50 dark:shadow-zinc-950/50 rounded-none relative overflow-hidden transition-colors duration-300">
            <div className="text-center mb-10 relative z-10">
              <h2 className="text-3xl font-light text-zinc-900 dark:text-zinc-100 uppercase tracking-widest mb-4">
                {t.contact.title}
              </h2>
              <p className="text-zinc-500">{t.contact.subtitle}</p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
