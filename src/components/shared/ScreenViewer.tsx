"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import ImageLightbox from "./ImageLightbox";

export interface ViewerScreen {
  id: string;
  label: string;
  title: string;
  description: string;
  src: string;
  alt: string;
}

/**
 * Tabbed screenshot viewer in the style of Apple's feature pages: a large rounded stage, a
 * segmented control beneath it, and a one-line caption with a bold lead-in.
 * Arrow keys, Home and End move between tabs.
 */
export default function ScreenViewer({ screens, tone = "dark" }: { screens: ViewerScreen[]; tone?: "dark" | "light" }) {
  const [active, setActive] = useState(0);
  // Index of the screen open in the viewer, or null when closed.
  const [zoomAt, setZoomAt] = useState<number | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = screens[active];

  const onKeyDown = (event: React.KeyboardEvent) => {
    const last = screens.length - 1;
    const next =
      event.key === "ArrowRight" ? (active === last ? 0 : active + 1)
      : event.key === "ArrowLeft" ? (active === 0 ? last : active - 1)
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : null;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div>
      <div
        role="tabpanel"
        id={`screen-panel-${current.id}`}
        aria-labelledby={`screen-tab-${current.id}`}
      >
        {/* Stage: every screen is stacked and crossfaded, so switching never jumps. */}
        <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden rounded-[28px] bg-[var(--pa-tint)]">
          {screens.map((screen, i) => (
            <div
              key={screen.id}
              aria-hidden={i !== active}
              className={`absolute inset-0 p-5 sm:p-10 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                i === active ? "opacity-100 scale-100" : "opacity-0 scale-[0.985] pointer-events-none"
              }`}
            >
              <div className={`relative h-full w-full overflow-hidden rounded-xl sm:rounded-2xl ${tone === "light" ? "bg-[#ffffff]" : "bg-[#0F1117]"} shadow-2xl ring-1 ring-black/10 dark:ring-white/10`}>
                <Image
                  src={screen.src}
                  alt={screen.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-contain object-top"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setZoomAt(active)}
            aria-label={`View ${current.label} full size`}
            className="absolute inset-0 z-10 cursor-zoom-in focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[var(--focus-ring)]"
          >
            <span className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-md">
              <Maximize2 className="h-4 w-4" aria-hidden="true" />
            </span>
          </button>
        </div>
      </div>

      {/* Segmented control sits under the stage, like Apple's feature pages. */}
      <div
        role="tablist"
        aria-label="Project pages"
        onKeyDown={onKeyDown}
        className="mx-auto mt-8 flex w-fit max-w-full overflow-x-auto rounded-full bg-[var(--pa-soft)] p-1 [scrollbar-width:none]"
      >
        {screens.map((screen, i) => (
          <button
            key={screen.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            role="tab"
            id={`screen-tab-${screen.id}`}
            aria-selected={i === active}
            aria-controls={`screen-panel-${screen.id}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={`min-h-11 sm:min-h-10 shrink-0 rounded-full px-5 sm:px-6 text-sm font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 ${
              i === active
                ? "bg-[var(--pa)] text-white dark:text-[#0B0B0C] focus-visible:outline-[#1D1D1F] dark:focus-visible:outline-white"
                : "text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-black/[0.06] dark:hover:bg-white/10 focus-visible:outline-[var(--focus-ring)]"
            }`}
          >
            {screen.label}
          </button>
        ))}
      </div>

      {/* Caption: bold lead-in, then gray detail, in one paragraph. */}
      <p aria-live="polite" className="mx-auto mt-8 max-w-2xl text-center text-base sm:text-lg leading-relaxed text-[#68686D] dark:text-[#A1A1A6]">
        <span className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">{current.title}</span>{" "}
        {current.description}
      </p>
      {zoomAt !== null && (
        <ImageLightbox
          src={screens[zoomAt].src}
          alt={screens[zoomAt].alt}
          onClose={() => setZoomAt(null)}
          index={zoomAt}
          count={screens.length}
          onPrev={() => setZoomAt((zoomAt - 1 + screens.length) % screens.length)}
          onNext={() => setZoomAt((zoomAt + 1) % screens.length)}
          caption={
            <p className="text-sm leading-relaxed text-white/70 sm:text-base">
              <span className="font-semibold text-white">{screens[zoomAt].title}</span> {screens[zoomAt].description}
            </p>
          }
        />
      )}
    </div>
  );
}
