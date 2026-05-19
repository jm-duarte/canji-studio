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
        <div className="flex flex-wrap justify-center gap-8">
          {s.socialLinks?.linkedin && (
            <a
              href={s.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body-md text-on-surface-variant hover:text-primary transition-colors"
            >
              LinkedIn
            </a>
          )}
          {s.socialLinks?.twitter && (
            <a
              href={s.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body-md text-on-surface-variant hover:text-primary transition-colors"
            >
              Twitter
            </a>
          )}
          {s.socialLinks?.dribbble && (
            <a
              href={s.socialLinks.dribbble}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body-md text-on-surface-variant hover:text-primary transition-colors"
            >
              Dribbble
            </a>
          )}
          {s.socialLinks?.github && (
            <a
              href={s.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body-md text-on-surface-variant hover:text-primary transition-colors"
            >
              GitHub
            </a>
          )}
          {!s.socialLinks && (
            <>
              <span className="font-body-md text-on-surface-variant">LinkedIn</span>
              <span className="font-body-md text-on-surface-variant">Twitter</span>
              <span className="font-body-md text-on-surface-variant">Dribbble</span>
            </>
          )}
        </div>
      </div>
    </footer>
  );
}
