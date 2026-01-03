"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface HeroButtonsProps {
  applyLabel: string;
  modelsLabel: string;
}

export const HeroButtons = ({ applyLabel, modelsLabel }: HeroButtonsProps) => {
  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-row gap-3 animate-in fade-in slide-in-from-top-4 duration-1000 delay-300 w-full justify-center md:justify-start">
      <Link
        href="/#contact"
        onClick={handleContactClick}
        className="group relative px-5 py-3 md:px-8 md:py-4 bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-950 font-medium uppercase tracking-widest text-[10px] md:text-sm rounded-none overflow-hidden transition-all hover:bg-zinc-800 dark:hover:bg-white hover:scale-105 flex-shrink-0 cursor-pointer"
      >
        <span className="relative z-10 flex items-center gap-2">
          {applyLabel}
          <ArrowRight className="w-3 h-3 md:w-4 md:h-4 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>

      <Link
        href="/models"
        className="group px-5 py-3 md:px-8 md:py-4 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-sm border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 font-medium uppercase tracking-widest text-[10px] md:text-sm rounded-none transition-all hover:bg-white/60 dark:hover:bg-zinc-800/60 hover:border-zinc-400 dark:hover:border-zinc-500 hover:scale-105 flex-shrink-0"
      >
        {modelsLabel}
      </Link>
    </div>
  );
};
