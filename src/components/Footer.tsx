import type { SiteSettings } from "@/types";

interface FooterProps {
  settings?: SiteSettings | null;
}

const FALLBACK_SETTINGS: SiteSettings = {
  studioName: "Canji Studio",
  footerTagline: "Precision in Digital Craft.",
};

export default function Footer({ settings }: FooterProps) {
  const s = settings ?? FALLBACK_SETTINGS;
  const year = new Date().getFullYear();

  return (
    <footer className="w-full py-section-gap-mobile md:py-section-gap-desktop bg-surface-container-lowest border-t border-white/5">
      <div className="flex flex-col md:flex-row justify-between items-center px-margin-safe gap-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="font-display-lg text-headline-lg text-on-surface">
            {s.studioName}
          </div>
          <p className="font-body-md text-on-surface-variant max-w-xs text-center md:text-left">
            © {year} {s.studioName}. {s.footerTagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
