import "server-only";
import { Dictionary } from "./types";

const dictionaries = {
  de: () =>
    import("@/messages/de.json").then((module) => module.default as Dictionary),
  en: () =>
    import("@/messages/en.json").then((module) => module.default as Dictionary),
  es: () =>
    import("@/messages/es.json").then((module) => module.default as Dictionary),
  fr: () =>
    import("@/messages/fr.json").then((module) => module.default as Dictionary),
  it: () =>
    import("@/messages/it.json").then((module) => module.default as Dictionary),
  pt: () =>
    import("@/messages/pt.json").then((module) => module.default as Dictionary),
};

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  const loadDictionary =
    dictionaries[locale as keyof typeof dictionaries] || dictionaries.en;
  return loadDictionary();
};
