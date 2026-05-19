import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { client } from "@/lib/sanity";
import { homePageQuery, siteSettingsQuery } from "@/lib/queries";
import { FALLBACK_HOME, FALLBACK_SETTINGS } from "@/lib/fallbackData";
import type { HomePageContent, SiteSettings, SolutionCard, ServiceCard } from "@/types";

const BG_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC9jp9js53aKWOM6yDMiFpbPSeOTnI2Xy3rln5ImPepCcmzC_3nWWnWrI3rGY31hUie0gyBEO3mtlnB1BsKYx8Ij8ukJoTrnyI1ctC-0aZ_qZgXbqdn-em0cNtMK70pi3j077wECil9tAgxkdzPDf89S2KJKtah0mHFUwHyowHI3X8MHVX9DqgHyUVSWzUlljyxm-sSL9pZkFjm9m2zi-an1kRG8OOdF6JQaoDS3wcAf3wRmMZwmIDVSrJoDS67wI9vuYmwJ88siOM0Rw";

async function getData() {
  try {
    const [home, settings] = await Promise.all([
      client.fetch<HomePageContent>(homePageQuery, {}, { next: { revalidate: 60 } }),
      client.fetch<SiteSettings>(siteSettingsQuery, {}, { next: { revalidate: 60 } }),
    ]);
    return { home, settings };
  } catch (err) {
    console.error("[Sanity] Failed to fetch home page data:", err);
    return { home: null, settings: null };
  }
}

export default async function HomePage() {
  const { home: rawHome, settings: rawSettings } = await getData();
  const home: HomePageContent = rawHome ?? FALLBACK_HOME;
  const settings: SiteSettings = rawSettings ?? FALLBACK_SETTINGS;

  return (
    <div
      className="bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url('${BG_IMAGE}')` }}
    >
      <Navbar whatsappNumber={settings.whatsappNumber} />
      <main>
        <HeroSection home={home} />
        <SolutionsSection cards={home.solutionCards ?? FALLBACK_HOME.solutionCards!} />
        <ServicesSection cards={home.serviceCards ?? FALLBACK_HOME.serviceCards!} />
        <CtaSection home={home} />
      </main>
      <Footer settings={settings} />
    </div>
  );
}

function HeroSection({ home }: { home: HomePageContent }) {
  return (
    <section className="relative min-h-screen flex items-center pt-20 hero-gradient">
      <div className="px-margin-safe max-w-7xl mx-auto w-full flex flex-col items-center text-center">
        <div className="z-10 max-w-4xl">
          <span className="font-label-sm text-primary uppercase tracking-[0.2em] mb-4 block">
            {home.heroTagline ?? FALLBACK_HOME.heroTagline}
          </span>
          <h1 className="font-display-lg text-[48px] md:text-[80px] leading-tight mb-8">
            {home.heroTitle?.replace("Canji.", "") ?? "Bem-vindo a "}
            <span className="text-primary-container font-bold">Canji.</span>
          </h1>
          <p className="font-body-md text-on-surface-variant max-w-2xl mx-auto mb-12">
            {home.heroDescription ?? FALLBACK_HOME.heroDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary-container text-on-primary-container px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-95">
              {home.heroPrimaryButtonText ?? FALLBACK_HOME.heroPrimaryButtonText}
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <Link
              href="/projetos"
              className="bg-transparent border border-white/20 backdrop-blur-md px-8 py-4 rounded-xl font-bold hover:bg-white/5 transition-all no-underline inline-block text-on-surface"
            >
              {home.heroSecondaryButtonText ?? FALLBACK_HOME.heroSecondaryButtonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function SolutionsSection({ cards }: { cards: SolutionCard[] }) {
  return (
    <section className="py-section-gap-mobile md:py-section-gap-desktop px-margin-safe max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        {cards.map((card, i) => (
          <article
            key={i}
            className="glass-card-light p-12 rounded-3xl group hover:border-primary/50 transition-colors"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-4xl">{card.icon}</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg mb-4">{card.title}</h2>
            <p className="font-body-md text-on-surface-variant">{card.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ServicesSection({ cards }: { cards: ServiceCard[] }) {
  return (
    <section className="py-section-gap-mobile md:py-section-gap-desktop bg-surface-container-lowest">
      <div className="px-margin-safe max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="font-headline-lg text-headline-lg mb-4">Nossos Serviços</h3>
          <div className="w-20 h-1 bg-primary-container mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {cards.map((card, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl aspect-square flex flex-col items-center justify-center text-center p-10 transition-all duration-300 hover:border-primary-container"
            >
              <span className="material-symbols-outlined text-primary/80 text-5xl mb-6">
                {card.icon}
              </span>
              <h4 className="font-bold mb-3 text-on-surface text-2xl">{card.title}</h4>
              <p className="text-on-surface-variant text-[14px] leading-relaxed px-4 opacity-90">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection({ home }: { home: HomePageContent }) {
  return (
    <section className="py-section-gap-mobile md:py-section-gap-desktop px-margin-safe text-center relative overflow-hidden">
      <div className="absolute inset-0 hero-gradient -z-10"></div>
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display-lg text-[40px] md:text-[64px] mb-8">
          {home.ctaTitle ?? FALLBACK_HOME.ctaTitle}
        </h2>
        <p className="font-body-md text-on-surface-variant mb-12">
          {home.ctaDescription ?? FALLBACK_HOME.ctaDescription}
        </p>
        <button className="bg-primary-container text-on-primary-container px-12 py-5 rounded-full font-extrabold text-lg hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] transition-all active:scale-95">
          {home.ctaButtonText ?? FALLBACK_HOME.ctaButtonText}
        </button>
      </div>
    </section>
  );
}
