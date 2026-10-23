"use client";

import { useEffect, useRef, useState } from "react";
import FixStatement from "@/components/home/FixStatement";
import MeetSri from "@/components/home/MeetSri";
import DesignStatement from "@/components/home/DesignStatement";
import PhotographyStatement from "@/components/home/PhotographyStatement";
import { WRAP } from "@/components/home/homeShared";

const BEATS = [FixStatement, MeetSri, DesignStatement, PhotographyStatement];
const COUNT = BEATS.length;
/** How far you scroll, in screen heights, to move from one beat to the next. */
const STEP_SVH = 45;

const READ_OUT =
  "I've always felt inspired when exploring solutions. Not just fixing what's broken, but asking what else is possible. That's me, Sri. That curiosity taught me precision, because the details are what make a solution great. Then I discovered design, and it changed how I see everything. It's not enough for something to work. It has to feel natural, like home. And through photography, I explore nature's magic and freeze the moments that only happen once.";

/**
 * The intro, one beat at a time. The section is pinned to the screen and scrolling steps through the four
 * beats: each one fades in and plays when you reach it, and the one before slides away. Scrolling back
 * shows a finished beat again without replaying it. Reduced-motion visitors get the beats stacked on the
 * page like normal content.
 */
export default function IntroScroller() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [reached, setReached] = useState(1);
  const [flat, setFlat] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFlat(true);
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      const progress = distance > 0 ? Math.min(1, Math.max(0, -rect.top / distance)) : 0;
      const next = Math.min(COUNT - 1, Math.floor(progress * COUNT));
      setActive(next);
      setReached((r) => Math.max(r, next + 1));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  if (flat) {
    return (
      <section aria-label="Introduction" className={`${WRAP} flex flex-col gap-20 sm:gap-28 py-24 sm:py-32`}>
        {BEATS.map((Beat, i) => (
          <Beat key={i} />
        ))}
      </section>
    );
  }

  return (
    <section ref={sectionRef} aria-label="Introduction" className="relative" style={{ height: `calc(100svh + ${COUNT * STEP_SVH}svh)` }}>
      <p className="sr-only">{READ_OUT}</p>
      <div aria-hidden="true" className="sticky top-0 h-svh overflow-hidden">
        {BEATS.map((Beat, i) => {
          const on = i === active;
          return (
            <div
              key={i}
              className="absolute inset-0 flex items-center"
              style={{
                // Not shown (so not animating) until the first time you scroll to it.
                display: i < reached ? "flex" : "none",
                opacity: on ? 1 : 0,
                transform: on ? "none" : `translateY(${i < active ? "-2.5rem" : "2.5rem"})`,
                transition: "opacity 500ms ease, transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
                pointerEvents: on ? "auto" : "none",
              }}
            >
              <div className={`${WRAP} flex flex-col`}>
                <Beat />
              </div>
            </div>
          );
        })}

        <div className="absolute right-3 top-1/2 flex -translate-y-1/2 flex-col gap-2 sm:right-6">
          {BEATS.map((_, i) => (
            <span
              key={i}
              className="w-1 rounded-full bg-[#1D1D1F] dark:bg-[#F5F5F7] transition-[height,opacity] duration-500"
              style={{ height: i === active ? 22 : 6, opacity: i === active ? 1 : 0.25 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
