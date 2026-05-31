"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

export interface LightboxItem {
  src: string;
  alt?: string;
  caption?: string;
  unoptimized?: boolean;
}

export default function GalleryLightbox({ items }: { items: LightboxItem[] }) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(
    () => setActive((i) => (i !== null ? (i - 1 + items.length) % items.length : null)),
    [items.length]
  );
  const next = useCallback(
    () => setActive((i) => (i !== null ? (i + 1) % items.length : null)),
    [items.length]
  );

  useEffect(() => {
    if (active === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [active, close, prev, next]);

  const [first, ...rest] = items;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:px-margin-safe max-w-7xl mx-auto">
        {first?.src && (
          <figure
            className="aspect-[4/5] overflow-hidden rounded-2xl group relative bg-surface-variant cursor-zoom-in"
            onClick={() => setActive(0)}
          >
            <Image
              src={first.src}
              alt={first.alt ?? ""}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              unoptimized={first.unoptimized}
            />
            {first.caption && (
              <figcaption className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                <span className="font-label-sm text-label-sm text-on-surface">{first.caption}</span>
              </figcaption>
            )}
            <span className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-lg p-1.5">
              <span className="material-symbols-outlined text-white text-xl">zoom_in</span>
            </span>
          </figure>
        )}

        {rest.length > 0 && (
          <div className="grid grid-rows-2 gap-4">
            {rest.slice(0, 2).map((item, i) => (
              <figure
                key={i}
                className="aspect-[16/9] overflow-hidden rounded-2xl bg-surface-variant group relative cursor-zoom-in"
                onClick={() => setActive(i + 1)}
              >
                {item.src && (
                  <Image
                    src={item.src}
                    alt={item.alt ?? ""}
                    width={800}
                    height={450}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized={item.unoptimized}
                  />
                )}
                {item.caption && (
                  <figcaption className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="font-label-sm text-label-sm text-on-surface">{item.caption}</span>
                  </figcaption>
                )}
                <span className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-lg p-1.5">
                  <span className="material-symbols-outlined text-white text-xl">zoom_in</span>
                </span>
              </figure>
            ))}
          </div>
        )}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all z-10"
            aria-label="Fechar"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>

          {items.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all z-10"
                aria-label="Anterior"
              >
                <span className="material-symbols-outlined text-2xl">chevron_left</span>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all z-10"
                aria-label="Próxima"
              >
                <span className="material-symbols-outlined text-2xl">chevron_right</span>
              </button>
            </>
          )}

          <div
            className="relative max-w-5xl max-h-[90vh] w-full mx-16 flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={active}
              src={items[active].src}
              alt={items[active].alt ?? ""}
              width={1400}
              height={900}
              className="object-contain max-h-[85vh] rounded-lg shadow-2xl"
              unoptimized={items[active].unoptimized}
            />
            {items[active].caption && (
              <p className="mt-3 text-sm text-white/60 text-center">
                {items[active].caption}
              </p>
            )}
          </div>

          {items.length > 1 && (
            <div className="absolute bottom-4 flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setActive(i); }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === active ? "bg-white scale-125" : "bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Imagem ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
