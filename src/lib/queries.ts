import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings" && _id == "siteSettings"][0] {
    studioName,
    whatsappNumber,
    socialLinks,
    footerTagline
  }
`;

export const homePageQuery = groq`
  *[_type == "homePage" && _id == "homePage"][0] {
    heroTagline,
    heroTitle,
    heroDescription,
    heroPrimaryButtonText,
    heroSecondaryButtonText,
    solutionCards[] { icon, title, description },
    serviceCards[] { icon, title, description },
    ctaTitle,
    ctaDescription,
    ctaButtonText
  }
`;

export const allProjectsQuery = groq`
  *[_type == "project"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    categories,
    thumbnail,
    thumbnailUrl,
    shortDescription,
    publishedAt
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    categories,
    thumbnail,
    thumbnailUrl,
    heroDescription,
    heroBackgroundUrl,
    client,
    year,
    services,
    challenge,
    solution,
    visualExplorationTitle,
    visualExplorationDescription,
    gallery[] {
      image,
      imageUrl,
      alt,
      caption
    }
  }
`;

export const otherProjectsQuery = groq`
  *[_type == "project" && slug.current != $slug] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    categories,
    thumbnail,
    thumbnailUrl,
    shortDescription
  }
`;
