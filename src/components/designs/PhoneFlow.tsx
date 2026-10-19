"use client";

import { useEffect, useRef, useState } from "react";
import IphoneFrame from "@/components/mockups/IphoneFrame";
import type { DesignScreen } from "@/types";

const GRAY = "text-[#68686D] dark:text-[#A1A1A6]";
const INK = "text-[#1D1D1F] dark:text-[#F5F5F7]";

/**
 * Scroll-driven phone walkthrough: on desktop the phone stays pinned while the steps scroll past
 * and the screen swaps to match; on small screens each step carries its own phone above its text.
 */
export default function PhoneFlow({ screens }: { screens: DesignScreen[] }) {
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
    <div className="md:grid md:grid-cols-2 md:gap-10 lg:gap-16">
      {/* Pinned stage (desktop) */}
      <div className="hidden md:block">
        <div className="sticky top-[max(72px,calc(50vh-340px))]">
          <div className="relative mx-auto h-[min(80vh,680px)] w-full">
            <div
              role="img"
              aria-label={`${screens[active].title} screen`}
              className="absolute left-1/2 top-1/2 aspect-[420/870] h-[88%] -translate-x-1/2 -translate-y-1/2"
            >
              {/* One phone, all screens preloaded and swapped instantly: no flash between screens. */}
              <IphoneFrame
                theme="light"
                hideStatusBar
                fade={false}
                screens={screens.map((screen, i) => ({ id: screen.id, src: screen.imageSrc, active: i === active }))}
              />
            </div>
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
              <div
                role="img"
                aria-label={`${screen.title} screen`}
                className="mx-auto mb-8 aspect-[420/870] w-[min(60vw,240px)] md:hidden"
              >
                <IphoneFrame src={screen.imageSrc} theme="light" hideStatusBar />
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
