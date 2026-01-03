import React from "react";
import Link from "next/link";
import { getDictionary } from "@/lib/dictionary";
import {
  ArrowRight,
  MessageCircle,
  TrendingUp,
  Search,
  ShieldCheck,
  Clock,
  BarChart2,
  HeartHandshake,
} from "lucide-react";

interface ServiceItem {
  title: string;
  description: string;
}

interface BenefitItem {
  title: string;
  description: string;
}

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function WhatWeDo({ params }: PageProps) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const serviceIcons = [
    <MessageCircle key="chat" className="w-10 h-10 mb-6 stroke-[1.5]" />,
    <TrendingUp key="traffic" className="w-10 h-10 mb-6 stroke-[1.5]" />,
    <Search key="audit" className="w-10 h-10 mb-6 stroke-[1.5]" />,
  ];

  const benefitIcons = [
    <HeartHandshake key="freedom" className="w-6 h-6 mb-4 stroke-[1.5]" />,
    <BarChart2 key="data" className="w-6 h-6 mb-4 stroke-[1.5]" />,
    <ShieldCheck key="legal" className="w-6 h-6 mb-4 stroke-[1.5]" />,
    <Clock key="risk" className="w-6 h-6 mb-4 stroke-[1.5]" />,
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 pt-32 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl md:text-6xl font-light text-zinc-900 dark:text-zinc-100 uppercase tracking-widest mb-8">
            {t.whatWeDoPage.title}
          </h1>
          <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-light leading-relaxed mb-12">
            {t.whatWeDoPage.subtitle}
          </p>

          <div className="bg-zinc-50 dark:bg-zinc-900/50 p-8 md:p-12 border border-zinc-100 dark:border-zinc-800">
            <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-4">
              {t.whatWeDoPage.introHeadline}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-light max-w-2xl mx-auto">
              {t.whatWeDoPage.introText}
            </p>
          </div>
        </div>

        {/* Main Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {t.whatWeDoPage.services.map(
            (service: ServiceItem, index: number) => (
              <div
                key={index}
                className="p-10 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-900 dark:hover:border-zinc-100 transition-all duration-300 group bg-white dark:bg-zinc-950 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="text-6xl font-black text-zinc-900 dark:text-zinc-100">
                    0{index + 1}
                  </span>
                </div>

                <div className="text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors duration-300 relative z-10">
                  {serviceIcons[index]}
                </div>
                <h3 className="text-xl font-medium text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-4 relative z-10">
                  {service.title}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed font-light text-sm relative z-10">
                  {service.description}
                </p>
              </div>
            )
          )}
        </div>

        {/* Why Us Section */}
        <div className="mb-32">
          <h2 className="text-3xl font-light text-center text-zinc-900 dark:text-zinc-100 uppercase tracking-widest mb-16">
            {t.whatWeDoPage.whyUsTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.whatWeDoPage.whyUs.map((benefit: BenefitItem, index: number) => (
              <div
                key={index}
                className="p-8 bg-zinc-50 dark:bg-zinc-900/30 border-l-2 border-zinc-200 dark:border-zinc-800 hover:border-zinc-900 dark:hover:border-zinc-100 transition-colors duration-300"
              >
                <div className="text-zinc-900 dark:text-zinc-100">
                  {benefitIcons[index]}
                </div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-2">
                  {benefit.title}
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-24 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-zinc-900 dark:text-zinc-100 uppercase tracking-widest mb-10">
            {t.whatWeDoPage.cta}
          </h2>
          <Link
            href={`/${lang}/#contact`}
            className="inline-flex items-center gap-4 px-12 py-5 bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-950 uppercase tracking-widest text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all duration-300 rounded-none group"
          >
            {t.nav.apply}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </main>
  );
}
