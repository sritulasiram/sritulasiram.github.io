"use client";

import { useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import ImageLightbox from "@/components/shared/ImageLightbox";

const DIR = "/images/projects/cytron-hr-assistive-intelligence";

/** The chat screenshot in the visitor's colour scheme, with a click-to-enlarge view. */
export default function HrScreenshot({ alt }: { alt: string }) {
  const [zoomSrc, setZoomSrc] = useState<string | null>(null);

  const open = () => {
    const dark = document.documentElement.classList.contains("dark");
    setZoomSrc(`${DIR}/screen-${dark ? "dark" : "light"}.png`);
  };

  return (
    <>
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl sm:rounded-[28px] shadow-2xl ring-1 ring-black/10 dark:ring-white/10">
        <Image
          src={`${DIR}/screen-light.png`}
          alt={alt}
          width={1920}
          height={1080}
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="h-auto w-full dark:hidden"
        />
        <Image
          src={`${DIR}/screen-dark.png`}
          alt={alt}
          width={1920}
          height={1080}
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="hidden h-auto w-full dark:block"
        />
        <button
          type="button"
          onClick={open}
          aria-label="View the screenshot full size"
          className="absolute inset-0 z-10 cursor-zoom-in focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[var(--focus-ring)]"
        >
          <span className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-md">
            <Maximize2 className="h-4 w-4" aria-hidden="true" />
          </span>
        </button>
      </div>
      {zoomSrc && <ImageLightbox src={zoomSrc} alt={alt} onClose={() => setZoomSrc(null)} />}
    </>
  );
}
