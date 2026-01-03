"use client";

import React, { createContext, useContext } from "react";
import type { Dictionary } from "@/lib/dictionary";

interface LanguageContextType {
  currentLang: string;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({
  children,
  lang,
  dictionary,
}: {
  children: React.ReactNode;
  lang: string;
  dictionary: Dictionary;
}) => {
  const value = {
    currentLang: lang,
    t: dictionary,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
