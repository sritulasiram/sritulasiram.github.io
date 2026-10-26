"use client";

import { useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import ImageLightbox from "@/components/shared/ImageLightbox";
import Reveal from "@/components/shared/Reveal";
import { ABOUT_DATA } from "@/data/content";

const INK = "text-[#1D1D1F] dark:text-[#F5F5F7]";
const GRAY = "text-[#68686D] dark:text-[#A1A1A6]";

/** Where each photo is anchored inside its tile, so the faces stay in frame. */
const FOCUS: Record<string, string> = {
  "uthm-best-project-award": "50% 28%",
  "puo-spice-best-project-award": "50% 40%",
  "puo-medspec-best-project-award": "50% 62%",
};
const focusFor = (src: string) => FOCUS[src.split("/").pop()?.replace(/\.\w+$/, "") ?? ""] ?? "50% 30%";

/**
 * Awards as photo-led tiles: the newest is a wide feature, the rest sit below it. The text sits on a
 * dark gradient over the photo, so it reads the same in light and dark mode. A tile opens its photo
 * in the full-size viewer, with previous and next moving through the awards.
 */
export default function Recognition() {
  const awards = (ABOUT_DATA.achievements ?? []).filter((a) => a.imageSrc);
  const [feature, ...rest] = awards;
  const [openAt, setOpenAt] = useState<number | null>(null);
  if (!feature) return null;
  const open = openAt === null ? null : awards[openAt];

  const year = (source?: string) => source?.match(/\b(20\d\d)\b/)?.[1];

  const tile = (award: (typeof awards)[number], large: boolean, delay: number, index: number) => (
    <Reveal delay={delay} className="h-full">
      <article
        className={`group relative isolate overflow-hidden rounded-[28px] bg-[#F5F5F7] dark:bg-[#1C1C1E] ${
          large ? "aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]" : "aspect-[4/5] sm:aspect-[4/3]"
        }`}
      >
        <button
          type="button"
          onClick={() => setOpenAt(index)}
          aria-label={`View photo: ${award.label}`}
          className="absolute inset-0 z-10 cursor-zoom-in rounded-[28px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100"
        >
          <Maximize2 className="h-4 w-4" />
        </span>
        <Image
          src={award.imageSrc!}
          alt={award.imageAlt ?? award.label}
          fill
          sizes={large ? "(max-width: 1024px) 100vw, 1024px" : "(max-width: 640px) 100vw, 512px"}
          style={{ objectPosition: focusFor(award.imageSrc!) }}
          className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent"
        />
        <div className={`pointer-events-none absolute inset-x-0 bottom-0 text-white ${large ? "p-7 sm:p-10 lg:max-w-[60%]" : "p-7 sm:p-8"}`}>
          <p className="text-sm font-semibold text-white/80">
            {year(award.source)}
            {award.source ? <span aria-hidden="true"> · </span> : null}
            {award.source?.replace(/\s*·?\s*(FYP Industrial Award )?\b20\d\d\b/, "").trim()}
          </p>
          <h3
            className={`mt-2 font-semibold leading-[1.08] tracking-apple-hero ${
              large ? "text-3xl sm:text-5xl" : "text-2xl sm:text-3xl"
            }`}
          >
            {award.label}
          </h3>
          <p className={`mt-3 max-w-md leading-relaxed text-white/85 ${large ? "text-base sm:text-lg" : "text-[15px]"}`}>
            {award.context}
          </p>
        </div>
      </article>
    </Reveal>
  );

  return (
    <section id="recognition" aria-label="Recognition" className="scroll-mt-14 mx-auto w-full max-w-5xl px-6 py-24 sm:px-8 sm:py-32">
      <Reveal>
        <h2 className={`text-3xl font-semibold leading-[1.08] tracking-apple-hero sm:text-5xl ${INK}`}>
          Recognition.
          <span className={`block ${GRAY}`}>Awards from UTHM and Politeknik Ungku Omar.</span>
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:gap-5 md:grid-cols-2">
        <div className="md:col-span-2">{tile(feature, true, 0, 0)}</div>
        {rest.map((award, i) => (
          <div key={award.label}>{tile(award, false, (i + 1) * 100, i + 1)}</div>
        ))}
      </div>

      {open && openAt !== null && (
        <ImageLightbox
          src={open.imageSrc!}
          alt={open.imageAlt ?? open.label}
          onClose={() => setOpenAt(null)}
          index={openAt}
          count={awards.length}
          onPrev={() => setOpenAt((openAt - 1 + awards.length) % awards.length)}
          onNext={() => setOpenAt((openAt + 1) % awards.length)}
          caption={
            <p className="text-sm leading-relaxed text-white/70 sm:text-base">
              <span className="font-semibold text-white">{open.label}</span> {open.source}
            </p>
          }
        />
      )}
    </section>
  );
}
