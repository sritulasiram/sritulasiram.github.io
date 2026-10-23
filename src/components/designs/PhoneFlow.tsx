"use client";

import { useEffect, useRef, useState } from "react";
import IphoneFrame from "@/components/mockups/IphoneFrame";
import type { DesignScreen } from "@/types";

const GRAY = "text-[#68686D] dark:text-[#A1A1A6]";
const INK = "text-[#1D1D1F] dark:text-[#F5F5F7]";

/**
 * Scroll-driven phone walkthrough: the phone stays pinned while the steps scroll past and the
 * screen swaps to match. On desktop it sits beside the steps; on small screens it is pinned at the
 * top and the steps scroll underneath it.
 */
export default function PhoneFlow({ screens }: { screens: DesignScreen[] }) {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    let io: IntersectionObserver | undefined;
    const observe = () => {
      io?.disconnect();
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.step));
          }
        },
        // Desktop: the middle of the viewport. Phones: a band in the text area below the pinned phone.
        { rootMargin: mq.matches ? "-45% 0px -45% 0px" : "-68% 0px -22% 0px" },
      );
      stepRefs.current.forEach((el) => el && io!.observe(el));
    };
    observe();
    mq.addEventListener("change", observe);
    return () => {
      mq.removeEventListener("change", observe);
      io?.disconnect();
    };
  }, []);

  return (
    <div className="md:grid md:grid-cols-2 md:gap-10 lg:gap-16">
      {/* Pinned stage (phones): the phone stays at the top, the text below changes with it */}
      <div className="sticky top-14 z-10 -mx-6 bg-white px-6 pb-3 pt-2 dark:bg-black md:hidden">
        <div
          role="img"
          aria-label={`${screens[active].title} screen`}
          className="mx-auto aspect-[420/870] h-[50svh]"
        >
          <IphoneFrame
            theme="light"
            hideStatusBar
            fade={false}
            screens={screens.map((screen, i) => ({ id: screen.id, src: screen.imageSrc, active: i === active }))}
          />
        </div>
      </div>

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
            className="flex min-h-[22svh] items-center py-4 md:min-h-[42vh] md:py-0"
          >
            <div
              className={`transition-opacity duration-500 motion-reduce:transition-none ${
                i === active ? "opacity-100" : "opacity-35"
              }`}
            >
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
