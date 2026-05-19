import Link from "next/link";

interface NavbarProps {
  whatsappNumber?: string;
}

export default function Navbar({ whatsappNumber }: NavbarProps) {
  const waLink = whatsappNumber
    ? `https://wa.me/${whatsappNumber}`
    : "https://wa.me/";

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-white/10 shadow-sm">
      <nav className="flex justify-between items-center px-margin-safe py-4 max-w-7xl mx-auto">
        <Link
          href="/"
          className="font-display-lg text-headline-lg tracking-tighter logo-fill-hover cursor-pointer no-underline block"
        >
          Canji Studio
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/projetos"
            className="font-body-md text-on-surface-variant hover:text-primary transition-colors no-underline"
          >
            Nossos Projetos
          </Link>
        </div>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary-container text-on-primary-container px-6 py-2.5 rounded-full font-bold hover:opacity-80 transition-all active:scale-95 no-underline inline-block text-center"
        >
          Entrar em contato
        </a>
      </nav>
    </header>
  );
}
