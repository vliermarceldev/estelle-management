"use client";
import React from "react";
import { ChevronDown } from "lucide-react";

export const ScrollIndicator = ({ label }: { label: string }) => {
  return (
    <div
      className="animate-bounce flex flex-col items-center gap-2 pointer-events-auto cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
      onClick={() =>
        document
          .getElementById("process")
          ?.scrollIntoView({ behavior: "smooth" })
      }
    >
      <span className="text-zinc-600 dark:text-zinc-500 text-[10px] uppercase tracking-[0.3em]">
        {label}
      </span>
      <ChevronDown className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
    </div>
  );
};
