import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalleryLightbox from "@/components/GalleryLightbox";
import { client, urlFor } from "@/lib/sanity";
import { projectBySlugQuery, otherProjectsQuery, siteSettingsQuery } from "@/lib/queries";
import { FALLBACK_PROJECTS, FALLBACK_SETTINGS } from "@/lib/fallbackData";
import type { Project, SiteSettings } from "@/types";

async function getData(slug: string) {
  try {
    const [project, otherProjects, settings] = await Promise.all([
      client.fetch<Project>(projectBySlugQuery, { slug }, { next: { revalidate: 60 } }),
      client.fetch<Project[]>(otherProjectsQuery, { slug }, { next: { revalidate: 60 } }),
      client.fetch<SiteSettings>(siteSettingsQuery, {}, { next: { revalidate: 60 } }),
    ]);
    return { project, otherProjects, settings };
  } catch (err) {
    console.error(`[Sanity] Failed to fetch project data for slug "${slug}":`, err);
    return { project: null, otherProjects: null, settings: null };
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { project: rawProject, otherProjects: rawOther, settings: rawSettings } = await getData(slug);

  const project: Project =
    rawProject ??
    FALLBACK_PROJECTS.find((p) => p.slug.current === slug) ??
    FALLBACK_PROJECTS[0];
  const settings: SiteSettings = rawSettings ?? FALLBACK_SETTINGS;
  const otherProjects: Project[] =
    rawOther && rawOther.length > 0
      ? rawOther
      : FALLBACK_PROJECTS.filter((p) => p.slug.current !== slug).slice(0, 3);

  const heroImg = project.heroBackgroundUrl ?? "";
  const categories = project.categories?.join(" / ") ?? "";

  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden">
      <Navbar whatsappNumber={settings.whatsappNumber} />
      <main>
        <header className="relative min-h-[70vh] flex flex-col justify-end pb-24 mesh-gradient overflow-hidden">
          {heroImg && (
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
              <Image
                src={heroImg}
                alt="Background"
                fill
                priority
                className="object-cover"
                unoptimized
              />
            </div>
          )}
          <div className="relative z-10 px-margin-safe max-w-7xl mx-auto w-full pt-32">
            <div className="flex flex-col items-start gap-4">
              {categories && (
                <div className="flex items-center gap-2 px-3 py-1 rounded-full glass-card">
                  <span className="text-primary font-label-sm text-label-sm uppercase tracking-widest">
                    {categories}
                  </span>
                </div>
              )}
              <h1 className="font-display-lg text-display-lg md:text-[84px] text-on-surface mb-4 max-w-4xl leading-[1.05]">
                {project.title}
              </h1>
              {project.heroDescription && (
                <p className="font-body-md text-body-md md:text-xl text-on-surface-variant max-w-2xl leading-relaxed">
                  {project.heroDescription}
                </p>
              )}
            </div>
          </div>
        </header>

        <section className="py-section-gap-mobile md:py-section-gap-desktop px-margin-safe max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <article className="md:col-span-8">
              <h2 className="font-headline-lg text-headline-lg mb-8 text-primary">O Desafio</h2>
              <div className="space-y-6 text-on-surface-variant max-w-3xl">
                {project.challenge ? (
                  <PortableText value={project.challenge} />
                ) : (
                  <p className="text-lg leading-relaxed">
                    Conteúdo do desafio ainda não cadastrado no CMS.
                  </p>
                )}
              </div>
            </article>
            <aside className="md:col-span-4 space-y-8 p-8 rounded-xl glass-card h-fit">
              {project.client && (
                <div className="space-y-1">
                  <span className="font-label-sm text-label-sm text-primary uppercase block">Cliente</span>
                  <span className="font-headline-lg text-headline-lg text-on-surface">{project.client}</span>
                </div>
              )}
              {project.client && <hr className="border-white/10" />}
              {project.year && (
                <div className="space-y-1">
                  <span className="font-label-sm text-label-sm text-primary uppercase block">Ano</span>
                  <span className="font-headline-lg text-headline-lg text-on-surface">{project.year}</span>
                </div>
              )}
              {project.year && project.services && project.services.length > 0 && (
                <hr className="border-white/10" />
              )}
              {project.services && project.services.length > 0 && (
                <div className="space-y-1">
                  <span className="font-label-sm text-label-sm text-primary uppercase block">Serviços</span>
                  <ul className="text-on-surface-variant space-y-2">
                    {project.services.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </section>

        {project.gallery && project.gallery.length > 0 && (
          <section className="py-section-gap-mobile md:py-section-gap-desktop bg-surface-container-lowest">
            <div className="px-margin-safe max-w-7xl mx-auto mb-16">
              <h2 className="font-headline-lg text-headline-lg mb-4">
                {project.visualExplorationTitle ?? "Exploração Visual"}
              </h2>
              {project.visualExplorationDescription && (
                <p className="text-on-surface-variant max-w-2xl">
                  {project.visualExplorationDescription}
                </p>
              )}
            </div>
            <GalleryLightbox
              items={project.gallery.map((item) => ({
                src: item.image ? urlFor(item.image).width(1400).url() : (item.imageUrl ?? ""),
                alt: item.alt,
                caption: item.caption,
                unoptimized: !item.image,
              }))}
            />
          </section>
        )}

        {project.solution && (
          <section className="py-section-gap-mobile md:py-section-gap-desktop px-margin-safe max-w-7xl mx-auto">
            <article className="mx-auto max-w-3xl">
              <h2 className="font-headline-lg text-headline-lg mb-8 text-primary">Nossa Solução</h2>
              <div className="text-lg text-on-surface-variant mb-10 leading-relaxed">
                <PortableText value={project.solution} />
              </div>
            </article>
          </section>
        )}

        {otherProjects.length > 0 && (
          <section className="border-t border-white/10">
            <div className="px-margin-safe max-w-7xl mx-auto py-24">
              <h2 className="font-headline-lg text-headline-lg mb-12 text-on-surface">
                Veja mais projetos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {otherProjects.map((p) => (
                  <OtherProjectCard key={p._id} project={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer settings={settings} />
    </div>
  );
}


function OtherProjectCard({ project }: { project: Project }) {
  const thumbSrc = project.thumbnail
    ? urlFor(project.thumbnail).width(640).height(400).url()
    : project.thumbnailUrl ?? "";
  const category = project.categories?.[0] ?? "";

  return (
    <Link
      href={`/projetos/${project.slug.current}`}
      className="group/card flex flex-col gap-4 no-underline"
    >
      <div className="aspect-[16/10] overflow-hidden rounded-xl bg-surface-variant relative">
        {thumbSrc && (
          <Image
            src={thumbSrc}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover/card:scale-105"
            unoptimized={!!project.thumbnailUrl}
          />
        )}
      </div>
      <div>
        <span className="font-label-sm text-label-sm text-primary uppercase mb-1 block">
          {category}
        </span>
        <h3 className="font-headline-lg text-lg text-on-surface group-hover/card:text-primary transition-colors">
          {project.title}
        </h3>
      </div>
    </Link>
  );
}
