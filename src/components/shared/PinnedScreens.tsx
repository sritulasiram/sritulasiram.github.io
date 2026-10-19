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
export default function PinnedScreens({ screens, tone = "dark" }: { screens: ViewerScreen[]; tone?: "dark" | "light" }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
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
    tone === "light" ? "bg-white" : "bg-[#0F1117]"
  } shadow-2xl ring-1 ring-black/10 dark:ring-white/10`;

  return (
    <div className="md:grid md:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] md:gap-10 lg:gap-14">
      {/* Pinned stage (desktop) */}
      <div className="hidden md:block [container-type:inline-size]">
        <div className="sticky top-[max(72px,calc(50vh_+_26px_-_31.25cqw))]">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[28px] bg-[var(--pa-tint)] p-5">
            {screens.map((screen, i) => (
              <div
                key={screen.id}
                aria-hidden={i !== active}
                className={`absolute inset-5 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                  i === active ? "opacity-100 scale-100" : "pointer-events-none opacity-0 scale-[0.985]"
                }`}
              >
                <div className={frame}>
                  <Image src={screen.src} alt={screen.alt} fill sizes="640px" className="object-contain object-top" />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setZoom(true)}
              aria-label={`View ${screens[active].label} full size`}
              className="absolute inset-0 z-10 cursor-zoom-in focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[var(--pa)]"
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
            className="py-10 md:flex md:min-h-[45vh] md:items-center md:py-0"
          >
            <div
              className={`transition-opacity duration-500 motion-reduce:transition-none ${
                i === active ? "md:opacity-100" : "md:opacity-35"
              }`}
            >
              <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-[22px] bg-[var(--pa-tint)] p-4 md:hidden">
                <div className={frame}>
                  <Image src={screen.src} alt={screen.alt} fill sizes="100vw" className="object-contain object-top" />
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

      {zoom && <ImageLightbox src={screens[active].src} alt={screens[active].alt} onClose={() => setZoom(false)} />}
    </div>
  );
}
