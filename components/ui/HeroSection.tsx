import React from "react";
import { HeroButtons } from "@/components/ui/HeroButtons";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import type { Dictionary } from "@/lib/dictionary";

export const HeroSection = ({ t }: { t: Dictionary }) => {
  return (
    <section
      className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-white dark:bg-zinc-950 transition-colors duration-300"
      aria-label="Hero Section"
    >
      <div
        className="absolute inset-0 z-0 w-full h-full"
        aria-hidden="true" // Für Screenreader unsichtbar machen
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/heroposter.jpg" // Stelle sicher, dass dieses Bild existiert und klein ist (<100kb)
          className="w-full h-full object-cover"
        >
          {/* Tipp: Nutze WebM für Chrome/Firefox falls verfügbar für kleinere Dateigröße */}
          <source src="/videos/hero2.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-white/10 dark:bg-black/40 transition-colors duration-300"></div>
      </div>

      <div
        className="absolute inset-0 z-10 w-full h-full pointer-events-none select-none"
        aria-hidden="true"
      >
        <svg
          className="w-full h-full block"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <mask id="hero-text-mask">
              <rect width="100%" height="100%" fill="white" />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-[23vw] md:text-[22vw] font-black tracking-tight fill-black font-sans"
                fontWeight="900"
              >
                ESTELLE
              </text>
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            className="fill-white dark:fill-zinc-950 transition-colors duration-300"
            mask="url(#hero-text-mask)"
          />
        </svg>
      </div>

      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none">
        <div className="relative">
          {/* OPTIMIERUNG: sr-only ist besser für SEO als opacity-0 */}
          <h1 className="sr-only">ESTELLE Management</h1>

          {/* Visueller "Platzhalter" damit das Layout stimmt, falls nötig, 
              aber hier scheint das SVG den Text zu bilden. 
              Wir lassen das SVG wirken und nutzen H1 nur für Bots. */}

          <div className="absolute top-[100%] left-0 w-full flex justify-center mt-6 md:mt-4 pointer-events-auto z-50">
            <div className="w-fit">
              <HeroButtons
                applyLabel={t.nav.apply}
                modelsLabel={t.nav.models}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center pointer-events-none">
        <ScrollIndicator label={t.hero.scroll} />
      </div>
    </section>
  );
};
