"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function NotFound() {
  const { t, currentLang } = useLanguage();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white dark:bg-zinc-950 px-4 transition-colors duration-300">
      {/* Große Hintergrund-Zahl für ästhetischen Look */}
      <h1 className="text-[8rem] md:text-[15rem] font-black leading-none text-zinc-100 dark:text-zinc-900 select-none animate-in fade-in zoom-in duration-1000">
        404
      </h1>

      <div className="absolute flex flex-col items-center z-10">
        <h2 className="text-xl md:text-2xl font-light text-zinc-900 dark:text-zinc-100 uppercase tracking-widest mb-8 text-center">
          {t.notFound?.title || "Page not found"}
        </h2>

        <Link
          href={`/${currentLang || "en"}`}
          className="group flex items-center text-xs md:text-sm uppercase tracking-[0.2em] text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowRight className="w-4 h-4 mr-2 rotate-180 group-hover:-translate-x-1 transition-transform" />
          {t.about?.backToHome || "Back to Home"}
        </Link>
      </div>
    </div>
  );
}
