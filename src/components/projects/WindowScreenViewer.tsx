"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import ImageLightbox from "@/components/shared/ImageLightbox";

export interface WindowScreen {
  id: string;
  label: string;
  title: string;
  description: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

/**
 * Tabbed viewer for screenshots that already include a window frame and shadow, so they sit
 * directly on the stage with no second frame. Arrow keys, Home and End move between tabs.
 */
export default function WindowScreenViewer({ screens, label }: { screens: WindowScreen[]; label: string }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = screens[active];

  // On narrow screens the tab bar scrolls; keep the selected tab in view.
  useEffect(() => {
    tabRefs.current[active]?.scrollIntoView({ inline: "nearest", block: "nearest" });
  }, [active]);

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
        id={`window-panel-${current.id}`}
        aria-labelledby={`window-tab-${current.id}`}
        className="relative overflow-hidden rounded-[28px] bg-[var(--pa-tint)] px-3 py-4 sm:px-8 sm:py-8"
      >
        <div className="relative mx-auto aspect-[1390/784] w-full max-w-5xl">
          {screens.map((screen, i) => (
            <Image
              key={screen.id}
              src={screen.src}
              alt={screen.alt}
              width={screen.width}
              height={screen.height}
              sizes="(max-width: 1024px) 100vw, 1024px"
              aria-hidden={i !== active}
              className={`absolute inset-0 h-full w-full object-contain transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                i === active ? "scale-100 opacity-100" : "pointer-events-none scale-[0.985] opacity-0"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setZoom(true)}
          aria-label={`View ${current.label} full size`}
          className="absolute inset-0 z-10 cursor-zoom-in focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[var(--pa)]"
        >
          <span className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-md">
            <Maximize2 className="h-4 w-4" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        role="tablist"
        aria-label={label}
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
            id={`window-tab-${screen.id}`}
            aria-selected={i === active}
            aria-controls={`window-panel-${screen.id}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={`min-h-11 shrink-0 rounded-full px-5 text-sm font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 sm:min-h-10 sm:px-6 ${
              i === active
                ? "bg-[var(--pa)] text-white focus-visible:outline-[#1D1D1F] dark:text-[#0B0B0C] dark:focus-visible:outline-white"
                : "text-[#1D1D1F] hover:bg-black/[0.06] focus-visible:outline-[var(--pa)] dark:text-[#F5F5F7] dark:hover:bg-white/10"
            }`}
          >
            {screen.label}
          </button>
        ))}
      </div>

      <p aria-live="polite" className="mx-auto mt-8 max-w-2xl text-center text-base leading-relaxed text-[#68686D] dark:text-[#A1A1A6] sm:text-lg">
        <span className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">{current.title}</span> {current.description}
      </p>
      {zoom && <ImageLightbox src={current.src} alt={current.alt} onClose={() => setZoom(false)} />}
    </div>
  );
}
