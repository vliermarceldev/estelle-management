// sanity.config.ts
"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schema } from "./sanity/schemaTypes";
// Icons importieren (EarthGlobeIcon ist der Fix für den Fehler)
import { BookIcon, UsersIcon, EarthGlobeIcon } from "@sanity/icons";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content Studio")
          .items([
            // 1. Models Ordner
            S.listItem()
              .title("Models")
              .icon(UsersIcon)
              .child(S.documentTypeList("model").title("All Models")),

            S.divider(),

            // 2. Blog Posts nach Sprache gruppiert
            S.listItem()
              .title("Blog Posts (by Language)")
              .icon(BookIcon)
              .child(
                S.list()
                  .title("Sprache wählen")
                  .items([
                    // 🇩🇪 DEUTSCH
                    S.listItem()
                      .title("🇩🇪 Deutsch")
                      .child(
                        S.documentList()
                          .title("Deutsche Artikel")
                          .filter('_type == "post" && language == "de"')
                      ),
                    // 🇺🇸 ENGLISH
                    S.listItem()
                      .title("🇺🇸 English")
                      .child(
                        S.documentList()
                          .title("English Posts")
                          .filter('_type == "post" && language == "en"')
                      ),
                    // 🇪🇸 ESPAÑOL
                    S.listItem()
                      .title("🇪🇸 Español")
                      .child(
                        S.documentList()
                          .title("Artículos en Español")
                          .filter('_type == "post" && language == "es"')
                      ),
                    // 🇫🇷 FRANÇAIS
                    S.listItem()
                      .title("🇫🇷 Français")
                      .child(
                        S.documentList()
                          .title("Articles en Français")
                          .filter('_type == "post" && language == "fr"')
                      ),
                    // 🇮🇹 ITALIANO
                    S.listItem()
                      .title("🇮🇹 Italiano")
                      .child(
                        S.documentList()
                          .title("Articoli in Italiano")
                          .filter('_type == "post" && language == "it"')
                      ),
                    // 🇵🇹 PORTUGUÊS
                    S.listItem()
                      .title("🇵🇹 Português")
                      .child(
                        S.documentList()
                          .title("Artigos em Português")
                          .filter('_type == "post" && language == "pt"')
                      ),

                    S.divider(),

                    // ALLE POSTS (Fallback)
                    S.listItem()
                      .title("Alle Posts (Unsortiert)")
                      .icon(EarthGlobeIcon)
                      .child(S.documentTypeList("post")),
                  ])
              ),

            // Fügt den Rest automatisch hinzu (falls du neue Typen erstellst, die wir hier vergessen haben)
            ...S.documentTypeListItems().filter(
              (listItem) =>
                !["model", "post"].includes(listItem.getId() as string)
            ),
          ]),
    }),
    visionTool(),
  ],
});
