import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { client } from "@/lib/sanity";
import { allProjectsQuery, siteSettingsQuery } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";
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
  } catch {
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

        <section className="px-gutter mb-12 pt-16">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-3 md:gap-4">
            {["All", "UI/UX Design", "Web Dev", "Mobile", "Branding"].map((filter) => (
              <button
                key={filter}
                className={`px-6 py-2 rounded-full border font-label-sm ${
                  filter === "All"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        <section className="px-gutter mb-section-gap-desktop">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </section>

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

function ProjectCard({ project }: { project: Project }) {
  const thumbSrc = project.thumbnail
    ? urlFor(project.thumbnail).width(800).height(450).url()
    : project.thumbnailUrl ?? "";

  return (
    <article className="group glass-card rounded-xl overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-2">
      <div className="aspect-video relative overflow-hidden bg-surface-variant">
        {thumbSrc && (
          <Image
            src={thumbSrc}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            unoptimized={!!project.thumbnailUrl}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex gap-2 mb-4 flex-wrap">
          {project.categories?.map((cat) => (
            <span
              key={cat}
              className="px-3 py-1 bg-secondary-container/30 text-secondary text-[10px] font-label-sm rounded uppercase tracking-wider"
            >
              {cat}
            </span>
          ))}
        </div>
        <h3 className="font-headline-lg text-headline-lg text-on-surface mb-2">{project.title}</h3>
        <p className="text-on-surface-variant font-body-md mb-6 flex-grow">
          {project.shortDescription}
        </p>
        <Link
          href={`/projetos/${project.slug.current}`}
          className="inline-flex items-center text-primary font-bold gap-2 group/link no-underline"
        >
          Ver projeto
          <span className="material-symbols-outlined transition-transform group-hover/link:translate-x-1">
            arrow_forward
          </span>
        </Link>
      </div>
    </article>
  );
}
