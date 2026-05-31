"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export interface ProjectCardData {
  _id: string;
  title: string;
  slug: string;
  categories: string[];
  thumbSrc: string;
  shortDescription: string;
}

export default function ProjectsGrid({ projects }: { projects: ProjectCardData[] }) {
  const allCategories = Array.from(
    new Set(projects.flatMap((p) => p.categories ?? []))
  ).sort();

  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.categories?.includes(active));

  return (
    <>
      <section className="px-gutter mb-12 pt-16">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-3 md:gap-4">
          {["All", ...allCategories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-6 py-2 rounded-full border font-label-sm transition-colors ${
                active === cat
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="px-gutter mb-section-gap-desktop">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project) => (
            <article
              key={project._id}
              className="group glass-card rounded-xl overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-2"
            >
              <div className="aspect-video relative overflow-hidden bg-surface-variant">
                {project.thumbSrc && (
                  <Image
                    src={project.thumbSrc}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    unoptimized={project.thumbSrc.startsWith("/")}
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
                <h3 className="font-headline-lg text-headline-lg text-on-surface mb-2">
                  {project.title}
                </h3>
                <p className="text-on-surface-variant font-body-md mb-6 flex-grow">
                  {project.shortDescription}
                </p>
                <Link
                  href={`/projetos/${project.slug}`}
                  className="inline-flex items-center text-primary font-bold gap-2 group/link no-underline"
                >
                  Ver projeto
                  <span className="material-symbols-outlined transition-transform group-hover/link:translate-x-1">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
