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
const STEP_SVH = 80;

/** Where the intro is while you scroll between two beats: it rests on each, then glides across the middle of the step. */
function easePosition(pos: number) {
  const base = Math.floor(pos);
  const t = Math.min(1, Math.max(0, (pos - base - 0.4) / 0.2));
  return base + t * t * (3 - 2 * t);
}

const READ_OUT =
  "I've always felt inspired when exploring solutions. Not just fixing what's broken, but asking what else is possible. That's me, Sri. That curiosity became my inspiration, and the details are what make a solution great. Then I discovered design, and it changed how I see everything. It's not enough for something to work. It has to feel natural, like home. And through photography, I explore nature's magic and freeze the moments that only happen once.";

/**
 * The intro, one beat at a time. The section is pinned to the screen and scrolling steps through the four
 * beats: each one fades in and plays when you reach it, and the one before slides away. Scrolling back
 * shows a finished beat again without replaying it. Reduced-motion visitors get the beats stacked on the
 * page like normal content.
 */
export default function IntroScroller() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  // The first beat waits until the section is nearly pinned, so its animation is not spent while you are still in the hero.
  const [reached, setReached] = useState(0);
  const [flat, setFlat] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only check; the server render must start from the initial state
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
      // The beats follow the scroll continuously: each one rests in place, then the next rises in as it leaves.
      const pos = easePosition(progress * (COUNT - 1));
      layerRefs.current.forEach((node, i) => {
        if (!node) return;
        const offset = i - pos;
        node.style.opacity = String(Math.max(0, 1 - Math.abs(offset) * 1.9));
        node.style.transform = `translate3d(0, ${Math.max(-1, Math.min(1, offset)) * 40}px, 0)`;
      });
      const now = Math.min(COUNT - 1, Math.max(0, Math.round(pos)));
      setActive(now);
      setReached((r) => Math.max(r, rect.top <= window.innerHeight * 0.5 ? now + 1 : 0));
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
      <section id="intro" aria-label="Introduction" className={`${WRAP} scroll-mt-14 flex flex-col gap-20 sm:gap-28 py-24 sm:py-32`}>
        {BEATS.map((Beat, i) => (
          <Beat key={i} />
        ))}
      </section>
    );
  }

  return (
    <section id="intro" ref={sectionRef} aria-label="Introduction" className="relative" style={{ height: `calc(100svh + ${COUNT * STEP_SVH}svh)` }}>
      <p className="sr-only">{READ_OUT}</p>
      <div aria-hidden="true" className="sticky top-0 h-svh overflow-hidden [contain:layout_paint]">
        {BEATS.map((Beat, i) => {
          const on = i === active;
          return (
            <div
              key={i}
              ref={(node) => {
                layerRefs.current[i] = node;
              }}
              className="absolute inset-0 flex items-center"
              style={{
                // Not shown (so not animating) until the first time you scroll to it.
                display: i < reached ? "flex" : "none",
                opacity: i === 0 ? 1 : 0,
                pointerEvents: on ? "auto" : "none",
                willChange: "opacity, transform",
              }}
            >
              <div className={`${WRAP} flex flex-col`}>
                <Beat />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
