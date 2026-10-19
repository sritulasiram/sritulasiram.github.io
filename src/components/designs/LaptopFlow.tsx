"use client";

import { useEffect, useRef, useState } from "react";
import { MacbookPro } from "@/components/mockups/MacbookPro";
import type { DesignScreen } from "@/types";

const GRAY = "text-[#68686D] dark:text-[#A1A1A6]";
const INK = "text-[#1D1D1F] dark:text-[#F5F5F7]";

/**
 * Scroll-driven walkthrough for web pages: on desktop one laptop stays pinned while the steps scroll
 * past and its page swaps to match, instantly, so the frame never flashes. On small screens each step
 * carries its own laptop above its text.
 */
export default function LaptopFlow({ screens }: { screens: DesignScreen[] }) {
  const [active, setActive] = useState(0);
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

  return (
    <div className="md:grid md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:gap-10 lg:gap-14">
      {/* Pinned stage (desktop) */}
      <div className="hidden md:block">
        <div className="sticky top-[max(72px,calc(50vh-220px))]">
          <div className="relative w-full" role="img" aria-label={`${screens[active].title} page`}>
            {screens.map((screen, i) => (
              <div key={screen.id} className={i === active ? "" : "invisible absolute inset-0"} aria-hidden={i !== active}>
                <MacbookPro src={screen.imageSrc} width="100%" height="auto" className="h-auto w-full drop-shadow-2xl" />
              </div>
            ))}
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
            className="py-10 md:flex md:min-h-[42vh] md:items-center md:py-0"
          >
            <div
              className={`transition-opacity duration-500 motion-reduce:transition-none ${
                i === active ? "md:opacity-100" : "md:opacity-35"
              }`}
            >
              <div className="mx-auto mb-8 w-full max-w-md md:hidden" role="img" aria-label={`${screen.title} page`}>
                <MacbookPro src={screen.imageSrc} width="100%" height="auto" className="h-auto w-full drop-shadow-xl" />
              </div>
              <p className="text-sm font-semibold text-[var(--pa)] tabular-nums">
                {screen.number} · {screen.role}
              </p>
              <h3 className={`mt-2 text-3xl sm:text-4xl font-semibold tracking-apple-hero leading-[1.1] ${INK}`}>
                {screen.title}
              </h3>
              <p className={`mt-4 max-w-md text-base sm:text-lg leading-relaxed ${GRAY}`}>{screen.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
