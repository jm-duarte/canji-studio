import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Projeto",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "categories",
      title: "Categorias",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "UI/UX Design", value: "UI/UX" },
          { title: "Web Dev", value: "Web Dev" },
          { title: "Mobile", value: "Mobile" },
          { title: "Branding", value: "Branding" },
          { title: "SaaS", value: "SaaS" },
          { title: "Visual Identity", value: "Visual Identity" },
          { title: "Data Viz", value: "Data Viz" },
          { title: "Web Design", value: "Web Design" },
        ],
      },
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail do Card",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "thumbnailUrl",
      title: "Thumbnail URL Externo (alternativo ao upload)",
      description: "Use apenas se não fizer upload da imagem acima",
      type: "url",
    }),
    defineField({
      name: "shortDescription",
      title: "Descrição Curta (no card)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "heroDescription",
      title: "Descrição do Hero (topo da página)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "heroBackgroundUrl",
      title: "URL da imagem de fundo do Hero",
      type: "url",
    }),
    defineField({
      name: "client",
      title: "Cliente",
      type: "string",
    }),
    defineField({
      name: "year",
      title: "Ano",
      type: "string",
    }),
    defineField({
      name: "services",
      title: "Serviços Prestados",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "challenge",
      title: "O Desafio",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "solution",
      title: "Nossa Solução",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "visualExplorationTitle",
      title: "Título da Exploração Visual",
      type: "string",
      initialValue: "Exploração Visual",
    }),
    defineField({
      name: "visualExplorationDescription",
      title: "Descrição da Exploração Visual",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "gallery",
      title: "Galeria de Imagens",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "image", title: "Imagem", type: "image", options: { hotspot: true } }),
            defineField({ name: "imageUrl", title: "URL Externa (alternativo)", type: "url" }),
            defineField({ name: "alt", title: "Texto alternativo", type: "string" }),
            defineField({ name: "caption", title: "Legenda (hover)", type: "string" }),
          ],
          preview: {
            select: { title: "alt", media: "image" },
          },
        },
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Data de Publicação",
      type: "date",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "thumbnail",
    },
  },
  orderings: [
    {
      title: "Data de Publicação (mais recente)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
