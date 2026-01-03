"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

// Interfaces für Props
interface FAQItem {
  q: string;
  a: string;
}

interface FAQProps {
  title: string;
  subtitle: string;
  items: FAQItem[];
}

export const FAQ = ({ title, subtitle, items }: FAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!items || items.length === 0) return null;

  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-900/30 border-t border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-light text-zinc-900 dark:text-zinc-100 uppercase tracking-widest mb-4">
            {title}
          </h2>
          <p className="text-zinc-500 font-light">{subtitle}</p>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none cursor-pointer"
                >
                  <span className="text-sm md:text-base font-medium text-zinc-900 dark:text-zinc-100 uppercase tracking-wide pr-8">
                    {item.q}
                  </span>
                  <span className="flex-shrink-0 text-zinc-400">
                    {isOpen ? (
                      <Minus className="w-5 h-5" />
                    ) : (
                      <Plus className="w-5 h-5" />
                    )}
                  </span>
                </button>

                <div
                  id={`faq-answer-${index}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="p-6 pt-0 text-zinc-600 dark:text-zinc-400 font-light leading-relaxed text-sm">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
