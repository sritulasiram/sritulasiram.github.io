"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import ImageLightbox from "./ImageLightbox";
import type { ViewerScreen } from "./ScreenViewer";

/**
 * Scroll-driven showcase: on desktop the screen stays pinned while the steps scroll past and the
 * screen swaps to match; on small screens each step shows its own screenshot above its text.
 */
export default function PinnedScreens({
  screens,
  tone = "dark",
  fitWidth = false,
}: {
  screens: ViewerScreen[];
  tone?: "dark" | "light";
  /** The screens are 16:9 captures: fill the stage edge to edge instead of floating in a padded frame. */
  fitWidth?: boolean;
}) {
  const [active, setActive] = useState(0);
  // Index of the screen open in the viewer, or null when closed.
  const [zoomAt, setZoomAt] = useState<number | null>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.step));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const frame = `relative h-full w-full overflow-hidden rounded-xl sm:rounded-2xl ${
    tone === "light" ? "bg-[#ffffff]" : "bg-[#0F1117]"
  } shadow-2xl ring-1 ring-black/10 dark:ring-white/10`;

  return (
    <div className="md:grid md:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] md:gap-10 lg:gap-14">
      {/* Pinned stage (desktop) */}
      <div className="hidden md:block [container-type:inline-size]">
        <div className={fitWidth ? "sticky top-[max(72px,calc(50vh_+_26px_-_28.125cqw))]" : "sticky top-[max(72px,calc(50vh_+_26px_-_31.25cqw))]"}>
          <div className={`relative w-full overflow-hidden rounded-[28px] bg-[var(--pa-tint)] ${fitWidth ? "aspect-video" : "aspect-[16/10] p-5"}`}>
            {screens.map((screen, i) => (
              <div
                key={screen.id}
                aria-hidden={i !== active}
                // The incoming screen fades in on top while the outgoing one stays fully opaque until it is
                // covered, so the stage never dips to the background between two screens.
                className={`absolute ${fitWidth ? "inset-0" : "inset-5"} transition-opacity duration-500 ease-out motion-reduce:transition-none ${
                  i === active ? "z-[1] opacity-100" : "pointer-events-none opacity-0 delay-500 motion-reduce:delay-0"
                }`}
              >
                <div className={fitWidth ? "relative h-full w-full overflow-hidden" : frame}>
                  <Image src={screen.src} alt={screen.alt} fill sizes="(max-width: 1280px) 60vw, 780px" className={fitWidth ? "object-cover" : "object-contain object-top"} />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setZoomAt(active)}
              aria-label={`View ${screens[active].label} full size`}
              className="absolute inset-0 z-10 cursor-zoom-in focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[var(--focus-ring)]"
            >
              <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-md">
                <Maximize2 className="h-4 w-4" aria-hidden="true" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Steps */}
      <ol>
        {screens.map((screen, i) => (
          <li
            key={screen.id}
            ref={(el) => {
              stepRefs.current[i] = el;
            }}
            data-step={i}
            className="py-10 md:flex md:min-h-[30vh] md:items-center md:py-0"
          >
            <div
              className={`transition-opacity duration-500 motion-reduce:transition-none ${
                i === active ? "md:opacity-100" : "md:opacity-35"
              }`}
            >
              <div className={`relative mb-6 overflow-hidden rounded-[22px] bg-[var(--pa-tint)] md:hidden ${fitWidth ? "aspect-video" : "aspect-[16/10] p-4"}`}>
                <div className={fitWidth ? "relative h-full w-full overflow-hidden" : frame}>
                  <Image src={screen.src} alt={screen.alt} fill sizes="100vw" className={fitWidth ? "object-cover" : "object-contain object-top"} />
                </div>
              </div>
              <p className="text-sm font-semibold text-[var(--pa)]">{screen.label}</p>
              <h3 className="mt-2 text-3xl sm:text-4xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-hero leading-[1.1]">
                {screen.title}
              </h3>
              <p className="mt-4 text-lg text-[#68686D] dark:text-[#A1A1A6] leading-relaxed">{screen.description}</p>
            </div>
          </li>
        ))}
      </ol>

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
