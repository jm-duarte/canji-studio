import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectsGrid from "@/components/ProjectsGrid";
import { client, urlFor } from "@/lib/sanity";
import { allProjectsQuery, siteSettingsQuery } from "@/lib/queries";
import { FALLBACK_PROJECTS, FALLBACK_SETTINGS } from "@/lib/fallbackData";
import type { Project, SiteSettings } from "@/types";

const HERO_BG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBXdn5tRVzIA36vJMy6GajLbY4NaHq_Kgh_C6mQp5wcZcL3i8Zdcp9zm3RfhKhpEYVqIJnFdt7Wde0iVUYQ9qiH3-C3J2lD3fl77XdSEVJASQ6WcCuJcD6LNN9R3-pH5Cd6CqxJTYAYFLIeEyu180EOvEM0XfjK1NU1Plb-rXwBwVweVmUPZh7q5EQooKJYKemENzbDcSU0km9HHnJV6A8BXH5wzPlSgvk6ncFGlGM2yO17lAdzieOLyGus-uNOaFhn9FkTV19nucQ";

async function getData() {
  try {
    const [projects, settings] = await Promise.all([
      client.fetch<Project[]>(allProjectsQuery, {}, { next: { revalidate: 60 } }),
      client.fetch<SiteSettings>(siteSettingsQuery, {}, { next: { revalidate: 60 } }),
    ]);
    return { projects, settings };
  } catch (err) {
    console.error("[Sanity] Failed to fetch projetos page data:", err);
    return { projects: null, settings: null };
  }
}

export default async function ProjetosPage() {
  const { projects: rawProjects, settings: rawSettings } = await getData();
  const projects: Project[] = rawProjects && rawProjects.length > 0 ? rawProjects : FALLBACK_PROJECTS;
  const settings: SiteSettings = rawSettings ?? FALLBACK_SETTINGS;

  return (
    <div className="bg-background overflow-x-hidden">
      <Navbar whatsappNumber={settings.whatsappNumber} />
      <main>
        <section
          className="pt-32 pb-20 md:pt-48 md:pb-32 px-gutter text-center relative bg-cover bg-center"
          style={{ backgroundImage: `url('${HERO_BG}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface pointer-events-none" />
          <div className="max-w-4xl mx-auto relative z-10">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary mb-4 block">
              Portfolio
            </span>
            <h1 className="font-display-lg text-display-lg md:text-6xl text-on-surface mb-6">
              Nossos Projetos
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
              Transformamos visões complexas em experiências digitais de alto impacto através de
              design precisionista e engenharia moderna.
            </p>
          </div>
        </section>

        <ProjectsGrid
          projects={projects.map((p) => ({
            _id: p._id,
            title: p.title,
            slug: p.slug.current,
            categories: p.categories ?? [],
            thumbSrc: p.thumbnail
              ? urlFor(p.thumbnail).width(800).height(450).url()
              : (p.thumbnailUrl ?? ""),
            shortDescription: p.shortDescription ?? "",
          }))}
        />

        <section className="px-gutter pb-section-gap-desktop">
          <div className="max-w-7xl mx-auto glass-card rounded-3xl p-12 md:p-24 text-center relative overflow-hidden">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-tertiary-container/20 blur-[100px] rounded-full" />
            <div className="relative z-10">
              <h2 className="font-display-lg text-display-lg md:text-5xl text-on-surface mb-6">
                Vamos conversar?
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto mb-10">
                Se você tem uma ideia desafiadora ou um projeto inovador, nossa equipe está pronta
                para transformá-lo em realidade digital.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <button className="bg-primary text-on-primary px-10 py-4 rounded-lg font-bold text-lg hover:scale-95 transition-all">
                  Iniciar um Projeto
                </button>
                <button className="glass-card text-on-surface border border-white/20 px-10 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-all">
                  Nossos Serviços
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </div>
  );
}

