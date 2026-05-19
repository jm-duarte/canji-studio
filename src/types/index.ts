import type { PortableTextBlock } from "@portabletext/types";

export interface SanityImage {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number; height: number; width: number };
}

export interface SiteSettings {
  studioName: string;
  whatsappNumber?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    dribbble?: string;
    github?: string;
  };
  footerTagline?: string;
}

export interface SolutionCard {
  icon: string;
  title: string;
  description: string;
}

export interface ServiceCard {
  icon: string;
  title: string;
  description: string;
}

export interface HomePageContent {
  heroTagline?: string;
  heroTitle?: string;
  heroDescription?: string;
  heroPrimaryButtonText?: string;
  heroSecondaryButtonText?: string;
  solutionCards?: SolutionCard[];
  serviceCards?: ServiceCard[];
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
}

export interface GalleryItem {
  image?: SanityImage;
  imageUrl?: string;
  alt?: string;
  caption?: string;
}

export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  categories?: string[];
  thumbnail?: SanityImage;
  thumbnailUrl?: string;
  shortDescription?: string;
  heroDescription?: string;
  heroBackgroundUrl?: string;
  client?: string;
  year?: string;
  services?: string[];
  challenge?: PortableTextBlock[];
  solution?: PortableTextBlock[];
  visualExplorationTitle?: string;
  visualExplorationDescription?: string;
  gallery?: GalleryItem[];
  publishedAt?: string;
}
