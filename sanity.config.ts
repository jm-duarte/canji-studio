import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  title: "Canji Studio CMS",
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Conteúdo")
          .items([
            S.listItem()
              .title("Configurações do Site")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
            S.listItem()
              .title("Página Inicial")
              .id("homePage")
              .child(
                S.document().schemaType("homePage").documentId("homePage")
              ),
            S.divider(),
            S.documentTypeListItem("project").title("Projetos"),
          ]),
    }),
    visionTool(),
  ],
});
