import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Configurações do Site",
  type: "document",
  fields: [
    defineField({
      name: "studioName",
      title: "Nome do Estúdio",
      type: "string",
      initialValue: "Canji Studio",
    }),
    defineField({
      name: "whatsappNumber",
      title: "Número do WhatsApp",
      description: "Apenas o número com código do país, ex: 5511999999999",
      type: "string",
    }),
    defineField({
      name: "socialLinks",
      title: "Redes Sociais",
      type: "object",
      fields: [
        defineField({ name: "linkedin", title: "LinkedIn URL", type: "url" }),
        defineField({ name: "twitter", title: "Twitter URL", type: "url" }),
        defineField({ name: "dribbble", title: "Dribbble URL", type: "url" }),
        defineField({ name: "github", title: "GitHub URL", type: "url" }),
      ],
    }),
    defineField({
      name: "footerTagline",
      title: "Tagline do Rodapé",
      type: "string",
      initialValue: "Precision in Digital Craft.",
    }),
  ],
});
