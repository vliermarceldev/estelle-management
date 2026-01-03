// v1/lib/dictionary.ts
import "server-only";

const dictionaries = {
  de: () => import("@/messages/de.json").then((module) => module.default),
  en: () => import("@/messages/en.json").then((module) => module.default),
  es: () => import("@/messages/es.json").then((module) => module.default),
  fr: () => import("@/messages/fr.json").then((module) => module.default),
  it: () => import("@/messages/it.json").then((module) => module.default),
  pt: () => import("@/messages/pt.json").then((module) => module.default),
};

// Wir nutzen 'de' als Referenz für die Typsicherheit im gesamten Projekt
export type Dictionary = Awaited<ReturnType<typeof dictionaries.de>>;

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  const loadDictionary =
    dictionaries[locale as keyof typeof dictionaries] || dictionaries.en;
  return loadDictionary();
};
