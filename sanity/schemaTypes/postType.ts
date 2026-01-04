import { defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "language",
      title: "Language",
      type: "string",
      options: {
        list: [
          { title: "Deutsch", value: "de" },
          { title: "English", value: "en" },
          { title: "Español", value: "es" },
          { title: "Français", value: "fr" },
          { title: "Italiano", value: "it" },
          { title: "Português", value: "pt" },
        ],
      },
      initialValue: "de",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt (Short summary for SEO & Cards)",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }, { type: "image" }],
    }),
  ],
  // NEU: Optimierte Vorschau für die Liste
  preview: {
    select: {
      title: "title",
      media: "mainImage",
      lang: "language",
    },
    prepare(selection) {
      const { title, media, lang } = selection;

      // Map für Flaggen-Emojis
      const emojis: Record<string, string> = {
        de: "🇩🇪",
        en: "🇺🇸",
        es: "🇪🇸",
        fr: "🇫🇷",
        it: "🇮🇹",
        pt: "🇵🇹",
      };

      const emoji = emojis[lang as string] || "🏳️";

      return {
        title: `${emoji} ${title}`,
        subtitle: `Sprache: ${lang ? lang.toUpperCase() : "Unbekannt"}`,
        media: media,
      };
    },
  },
});
