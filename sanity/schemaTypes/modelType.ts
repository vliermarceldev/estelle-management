// sanity/schemaTypes/modelType.ts
import { defineField, defineType } from "sanity";

export const modelType = defineType({
  name: "model",
  title: "Model",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL Endung)",
      type: "slug",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Hauptbild",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "height",
      title: "Größe (cm)",
      type: "string",
    }),
    defineField({
      name: "bust",
      title: "Brust",
      type: "string",
    }),
    defineField({
      name: "waist",
      title: "Taille",
      type: "string",
    }),
    defineField({
      name: "hips",
      title: "Hüfte",
      type: "string",
    }),
    defineField({
      name: "eyes",
      title: "Augenfarbe",
      type: "string",
    }),
    defineField({
      name: "hair",
      title: "Haarfarbe",
      type: "string",
    }),
    defineField({
      name: "bio",
      title: "Biografie",
      type: "text",
    }),
    defineField({
      name: "portfolio",
      title: "Portfolio Galerie",
      type: "array",
      of: [{ type: "image" }],
    }),
  ],
});
