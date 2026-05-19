import { defineField, defineType } from "sanity";

export const homePageContent = defineType({
  name: "homePageContent",
  title: "Página Inicial",
  type: "document",
  fields: [
    defineField({
      name: "heroTagline",
      title: "Tagline do Hero",
      type: "string",
      initialValue: "Criamos Experiências que Conectam.",
    }),
    defineField({
      name: "heroTitle",
      title: "Título do Hero",
      type: "string",
      initialValue: "Bem-vindo a Canji.",
    }),
    defineField({
      name: "heroDescription",
      title: "Descrição do Hero",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "heroPrimaryButtonText",
      title: "Texto do Botão Primário",
      type: "string",
      initialValue: "Quero saber mais",
    }),
    defineField({
      name: "heroSecondaryButtonText",
      title: "Texto do Botão Secundário",
      type: "string",
      initialValue: "Ver Portfólio",
    }),
    defineField({
      name: "solutionCards",
      title: "Cards de Soluções",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "icon", title: "Ícone (Material Symbol)", type: "string" }),
            defineField({ name: "title", title: "Título", type: "string" }),
            defineField({ name: "description", title: "Descrição", type: "text", rows: 3 }),
          ],
          preview: {
            select: { title: "title" },
          },
        },
      ],
    }),
    defineField({
      name: "serviceCards",
      title: "Cards de Serviços",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "icon", title: "Ícone (Material Symbol)", type: "string" }),
            defineField({ name: "title", title: "Título", type: "string" }),
            defineField({ name: "description", title: "Descrição", type: "text", rows: 3 }),
          ],
          preview: {
            select: { title: "title" },
          },
        },
      ],
    }),
    defineField({
      name: "ctaTitle",
      title: "Título do CTA",
      type: "string",
      initialValue: "Vamos Conversar?",
    }),
    defineField({
      name: "ctaDescription",
      title: "Descrição do CTA",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "ctaButtonText",
      title: "Texto do Botão CTA",
      type: "string",
      initialValue: "Iniciar um Projeto",
    }),
  ],
});
