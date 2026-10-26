"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { photoThumb } from "@/lib/photoThumb";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PhotoPreviewModal from "./PhotoPreviewModal";
import type { PhotoItem } from "@/types";

/** Scroll-snap shelf of large portrait cards on a light-gray band; cards open the lightbox. */
export default function PhotographyHighlights({
  photos,
  embedded = false,
}: {
  photos: PhotoItem[];
  /** Inside the pinned intro stage: fills the stage, sizes cards to the viewport height, and
   * lets the intro control card visibility through --cards-o. */
  embedded?: boolean;
}) {
  const [active, setActive] = useState<PhotoItem | null>(null);
  const shelf = useRef<HTMLDivElement>(null);

  const scrollShelf = (dir: 1 | -1) => {
    const el = shelf.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const step = (dir: 1 | -1) => {
    if (!active) return;
    const i = photos.findIndex((p) => p.id === active.id);
    setActive(photos[(i + dir + photos.length) % photos.length]);
  };

  return (
    <>
      <section
        id={embedded ? undefined : "highlights"}
        className={`bg-white dark:bg-black scroll-mt-16 ${
          embedded ? "h-full flex flex-col justify-center pt-10" : "py-16 sm:py-24"
        }`}
        aria-labelledby="highlights-title"
      >
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8">
          <div className="flex items-end justify-between gap-6 mb-8 sm:mb-10">
            <h2
              id="highlights-title"
              className="text-3xl sm:text-5xl font-semibold tracking-apple-headline leading-[1.08] text-[#1D1D1F] dark:text-[#F5F5F7]"
            >
              Highlights.
              <span className="block text-[#6E6E73] dark:text-[#8E8E93]">Five frames to start with.</span>
            </h2>
            <div className="hidden sm:flex gap-2 shrink-0">
              {([-1, 1] as const).map((dir) => (
                <button
                  key={dir}
                  type="button"
                  onClick={() => scrollShelf(dir)}
                  aria-label={dir === 1 ? "Next highlights" : "Previous highlights"}
                  className="w-11 h-11 rounded-full grid place-items-center bg-black/[0.06] dark:bg-white/[0.1] text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-black/10 dark:hover:bg-white/15 transition-colors cursor-pointer"
                >
                  {dir === 1 ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div
          ref={shelf}
          className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar px-6 sm:px-[max(2rem,calc((100%_-_1400px)/2_+_2rem))] scroll-px-6 sm:scroll-px-[max(2rem,calc((100%_-_1400px)/2_+_2rem))] pb-2"
        >
          {photos.map((photo) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setActive(photo)}
              aria-label={`View ${photo.title}`}
              data-highlight-card
              style={embedded ? { opacity: "var(--cards-o, 1)" } : undefined}
              className={`group snap-start shrink-0 aspect-[3/4] ${
                embedded
                  ? "w-[min(420px,calc((100vh-300px)*0.75))]"
                  : "w-[78vw] sm:w-[360px] lg:w-[420px]"
              } relative rounded-3xl overflow-hidden bg-[#E5E5EA] dark:bg-[#1C1C1E] text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]`}
            >
              <Image
                src={photoThumb(photo.imageSrc)}
                alt={photo.altText}
                fill
                sizes="(min-width: 1024px) 420px, (min-width: 640px) 360px, 78vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-x-0 top-0 p-6 sm:p-7 bg-gradient-to-b from-black/55 to-transparent">
                {photo.location && (
                  <span className="text-xs font-semibold text-white/90 [text-shadow:0_1px_3px_rgba(0,0,0,0.6),0_2px_16px_rgba(0,0,0,0.4)]">{photo.location}</span>
                )}
                <h3 className="mt-1 text-xl sm:text-2xl font-semibold tracking-apple-tight leading-tight text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.6),0_2px_16px_rgba(0,0,0,0.4)]">
                  {photo.spotlightTitle ?? photo.title}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </section>

      <PhotoPreviewModal
        photo={active}
        onClose={() => setActive(null)}
        onNext={() => step(1)}
        onPrev={() => step(-1)}
        currentIndex={active ? photos.findIndex((p) => p.id === active.id) : undefined}
        totalCount={photos.length}
      />
    </>
  );
}
