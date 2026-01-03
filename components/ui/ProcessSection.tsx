import React from "react";
import type { Dictionary } from "@/lib/dictionary";

export const ProcessSection = ({ t }: { t: Dictionary }) => {
  // Sicherheitscheck
  if (!t.home?.process) return null;

  return (
    <section className="py-24 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl font-light text-zinc-900 dark:text-zinc-100 uppercase tracking-widest mb-4">
            {t.home.process.title}
          </h2>
          <p className="text-zinc-500 font-light">{t.home.process.subtitle}</p>
        </div>

        <div className="relative">
          {/* Symmetrische Verbindungslinie (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-zinc-200 dark:bg-zinc-800 -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {t.home.process.steps.map((step, index) => (
              <div
                key={index}
                className="group relative flex flex-col items-center text-center"
              >
                {/* Nummer im Kreis */}
                <div className="w-24 h-24 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center mb-8 transition-colors duration-300 group-hover:border-zinc-900 dark:group-hover:border-zinc-100">
                  <span className="text-3xl font-light text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-4">
                  {step.title}
                </h3>

                <p className="text-zinc-600 dark:text-zinc-400 font-light leading-relaxed text-sm max-w-xs mx-auto">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
