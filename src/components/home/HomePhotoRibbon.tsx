"use client";

import { useState } from "react";
import Image from "next/image";
import PhotoPreviewModal from "@/components/photography/PhotoPreviewModal";
import { PHOTOGRAPHY_DATA } from "@/data/content";
import type { PhotoItem } from "@/types";
import { GRAY, INK } from "./homeShared";

const RIBBON_PHOTOS = PHOTOGRAPHY_DATA.slice(0, 10);

/**
 * A slow, endless ribbon of photos that fades out at both edges. It pauses on hover, and any photo
 * opens the full-size viewer. Reduced-motion visitors get a plain scrollable row.
 */
export default function HomePhotoRibbon() {
  const [preview, setPreview] = useState<PhotoItem | null>(null);

  const step = (direction: 1 | -1) => {
    if (!preview) return;
    const index = PHOTOGRAPHY_DATA.findIndex((p) => p.id === preview.id);
    setPreview(PHOTOGRAPHY_DATA[(index + direction + PHOTOGRAPHY_DATA.length) % PHOTOGRAPHY_DATA.length]);
  };

  const card = (photo: PhotoItem, copy: boolean) => (
    <button
      key={`${photo.id}-${copy ? "b" : "a"}`}
      type="button"
      onClick={() => setPreview(photo)}
      tabIndex={copy ? -1 : 0}
      aria-hidden={copy || undefined}
      aria-label={copy ? undefined : `Open photo: ${photo.title ?? photo.altText}`}
      className="group w-[240px] shrink-0 cursor-pointer text-left sm:w-[300px] md:w-[340px] rounded-[28px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-[var(--pa-tint)]">
        <Image
          src={photo.imageSrc}
          alt={copy ? "" : photo.altText}
          fill
          sizes="(max-width: 640px) 240px, (max-width: 768px) 300px, 340px"
          draggable={false}
          loading="eager"
          decoding="async"
          className="select-none object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
      {photo.title && <p className={`mt-4 text-base font-semibold tracking-apple-tight ${INK}`}>{photo.title}</p>}
      {photo.location && <p className={`text-sm ${GRAY}`}>{photo.location}</p>}
    </button>
  );

  return (
    <>
      <div className="relative">
      <div className="overflow-hidden py-2 motion-reduce:overflow-x-auto">
        <div
          // About 40px a second on desktop, the same gentle pace as the Home 1 strip.
          className="animate-ribbon"
          style={preview ? { animationPlayState: "paused" } : undefined}
        >
          <div className="flex shrink-0 gap-5 pr-5 sm:gap-6 sm:pr-6">{RIBBON_PHOTOS.map((p) => card(p, false))}</div>
          <div className="flex shrink-0 gap-5 pr-5 sm:gap-6 sm:pr-6" aria-hidden="true">
            {RIBBON_PHOTOS.map((p) => card(p, true))}
          </div>
        </div>
      </div>
      {/* Edge fades */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-[7%] bg-gradient-to-r from-white to-transparent dark:from-black motion-reduce:hidden" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-[7%] bg-gradient-to-l from-white to-transparent dark:from-black motion-reduce:hidden" />
      </div>

      <PhotoPreviewModal
        photo={preview}
        onClose={() => setPreview(null)}
        onNext={() => step(1)}
        onPrev={() => step(-1)}
        currentIndex={preview ? PHOTOGRAPHY_DATA.findIndex((p) => p.id === preview.id) : undefined}
        totalCount={PHOTOGRAPHY_DATA.length}
      />
    </>
  );
}
