"use client";

import { useEffect, useRef, useState } from "react";

export interface SkillGroup {
  category: string;
  description: string;
  items: { name: string }[];
}

/** How many skills of a category are dark, larger pills; the rest are lighter, smaller ones. */
const HEADLINE = 4;
/** Height of the site's fixed top bar; the stage pins just below it. */
const NAV = 56;
/** Scroll spent on each category, in screen heights. */
const STEP_SVH = 85;
/**
 * Within a category's turn (0 to 1) the pills build between these points, and the rest is a hold so
 * the finished set can be read before the next category takes over.
 */
const BUILD_START = 0.06;
const BUILD_END = 0.66;
/**
 * Within the build (0 to 1): the large pills rise in one at a time, then the smaller ones follow
 * together as one group. Each piece moves a short distance and eases to a stop, no bounce.
 */
const HEAD_STAGGER = 0.14;
const HEAD_DUR = 0.22;
const REST_START = 0.5;
const REST_DUR = 0.3;
const RISE = 24;

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const part = (build: number, start: number, dur: number) => clamp((build - start) / dur);

/** Sets a pill part-way into place: t 0 is hidden and lowered, 1 is at rest. */
const place = (pill: HTMLElement, t: number) => {
  if (t >= 1) {
    pill.style.opacity = "";
    pill.style.transform = "";
    return;
  }
  const e = easeOut(t);
  pill.style.opacity = String(e);
  pill.style.transform = `translate3d(0, ${(1 - e) * RISE}px, 0)`;
};

const STACK = "grid [&>*]:[grid-area:1/1]";
const FADE =
  "transition-[opacity,filter,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none";
const fade = (on: boolean) =>
  on ? "opacity-100 blur-0 translate-y-0" : "pointer-events-none opacity-0 blur-[6px] translate-y-1.5";

const pad = (n: number) => String(n).padStart(2, "0");

function Pills({ items, centered }: { items: SkillGroup["items"]; centered?: boolean }) {
  return (
    <ul className={`flex flex-wrap gap-2 sm:gap-2.5 ${centered ? "justify-center" : ""}`}>
      {items.map((item, b) => (
        <li
          key={item.name}
          data-pill={b < HEADLINE ? "head" : "rest"}
          className={`will-change-transform rounded-full font-semibold tracking-apple-tight ${
            b < HEADLINE
              ? "bg-[#1D1D1F] px-3.5 py-2 text-sm text-white sm:px-4 sm:py-2.5 sm:text-base dark:bg-[#F5F5F7] dark:text-[#1D1D1F]"
              : "bg-[#F5F5F7] px-3 py-1.5 text-[13px] font-medium text-[#1D1D1F] ring-1 ring-black/5 sm:px-4 sm:py-2 sm:text-[15px] dark:bg-[#1C1C1E] dark:text-[#F5F5F7] dark:ring-white/10"
          }`}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
}

/**
 * Skills as one pinned stage. The stage stays on screen while you scroll through a tall section:
 * each category takes a turn, its name and description in large type with the skills assembling
 * beneath as pills (the strongest four first, then the rest together). A segmented bar along the
 * top fills as you go and is clickable. Reduced motion gets the same content as a plain stacked list.
 */
export default function SkillsScroller({
  groups,
  heading,
}: {
  groups: SkillGroup[];
  /** The section title. It stays pinned with the stage instead of scrolling away. */
  heading?: React.ReactNode;
}) {
  const n = groups.length;
  const [active, setActive] = useState(0);
  const [placed, setPlaced] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const section = sectionRef.current;
      const stage = stageRef.current;
      if (!section || !stage || section.offsetParent === null) return;

      const rect = section.getBoundingClientRect();
      const distance = rect.height - stage.offsetHeight;
      const scaled = distance > 0 ? clamp((NAV - rect.top) / distance) * n : 0;
      const current = Math.min(n - 1, Math.floor(scaled));
      setActive(current);

      section.querySelectorAll<HTMLElement>("[data-fill]").forEach((bar) => {
        const c = Number(bar.dataset.fill);
        bar.style.transform = `scaleX(${clamp(scaled - c)})`;
      });

      let landed = 0;
      section.querySelectorAll<HTMLElement>("[data-layer]").forEach((layer) => {
        const c = Number(layer.dataset.layer);
        const build = clamp((clamp(scaled - c) - BUILD_START) / (BUILD_END - BUILD_START));
        const heads = layer.querySelectorAll<HTMLElement>("[data-pill=head]");
        const rest = layer.querySelectorAll<HTMLElement>("[data-pill=rest]");

        let done = 0;
        heads.forEach((pill, b) => {
          const t = part(build, b * HEAD_STAGGER, HEAD_DUR);
          if (t >= 1) done++;
          place(pill, t);
        });
        const group = part(build, REST_START, REST_DUR);
        rest.forEach((pill) => place(pill, group));
        done += Math.floor(group * rest.length);
        if (c === current) landed = done;
      });
      setPlaced(landed);
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
  }, [n]);

  /** Scroll to a point in the category's turn where its pills are all in. */
  const jumpTo = (c: number) => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;
    const distance = section.offsetHeight - stage.offsetHeight;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: top - NAV + ((c + 0.78) / n) * distance, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <>
      {/* Pinned stage */}
      <div ref={sectionRef} className="motion-reduce:hidden">
        {/* The stage is only as tall as its content; the spacer below it is the distance it stays pinned for */}
        <div
          ref={stageRef}
          className="sticky flex flex-col justify-start gap-6 pt-4 sm:gap-8"
          style={{ top: NAV }}
        >
          {heading}

          {/* Progress: one bar per category, each filling as its turn passes */}
          <div>
            <ol className="flex gap-1.5">
              {groups.map((g, i) => (
                <li key={g.category} className="flex-1">
                  <button
                    type="button"
                    onClick={() => jumpTo(i)}
                    aria-label={`${g.category}`}
                    aria-current={i === active ? "true" : undefined}
                    className="group block h-5 w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                  >
                    <span className="mt-2 block h-[3px] overflow-hidden rounded-full bg-[#68686D]/25 transition-[height] group-hover:h-[5px]">
                      <span
                        data-fill={i}
                        className="block h-full origin-left rounded-full bg-[#1D1D1F] dark:bg-[#F5F5F7]"
                        style={{ transform: "scaleX(0)" }}
                      />
                    </span>
                  </button>
                </li>
              ))}
            </ol>
            <p className="mt-2 flex justify-between text-sm font-medium tabular-nums text-[#68686D] dark:text-[#A1A1A6]">
              <span>
                <span className="text-[#1D1D1F] dark:text-[#F5F5F7]">{pad(active + 1)}</span> / {pad(n)}
              </span>
              <span className={placed >= (groups[active]?.items.length ?? 0) ? "text-[var(--pa)]" : ""}>
                {Math.min(placed, groups[active]?.items.length ?? 0)} / {groups[active]?.items.length} skills
              </span>
            </p>
          </div>

          {/* The categories share one cell, so the stage is as tall as the tallest and nothing jumps */}
          <div className={STACK}>
            {groups.map((g, i) => (
              <div
                key={g.category}
                data-layer={i}
                aria-hidden={i !== active}
                inert={i !== active}
                className={`flex flex-col items-center text-center ${FADE} ${fade(i === active)}`}
              >
                <h3 className="text-balance text-[clamp(30px,5vw,56px)] font-semibold leading-[1.05] tracking-apple-hero text-[#1D1D1F] dark:text-[#F5F5F7]">
                  {g.category}
                </h3>
                <p className="mt-3 max-w-xl text-pretty text-base leading-relaxed text-[#68686D] dark:text-[#A1A1A6] sm:mt-4 sm:text-lg">
                  {g.description}
                </p>
                <div className="mt-6 w-full max-w-4xl sm:mt-8">
                  <Pills items={g.items} centered />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div aria-hidden="true" style={{ height: `${n * STEP_SVH}svh` }} />
      </div>

      {/* Reduced motion: the same content as a plain list */}
      <div className="hidden motion-reduce:block">
        {heading && <div className="mb-12">{heading}</div>}
        <ol className="space-y-16">
          {groups.map((g) => (
            <li key={g.category}>
              <h3 className="text-3xl font-semibold leading-[1.1] tracking-apple-hero text-[#1D1D1F] dark:text-[#F5F5F7] sm:text-4xl">
                {g.category}
              </h3>
              <p className="mt-3 max-w-xl text-lg leading-relaxed text-[#68686D] dark:text-[#A1A1A6]">{g.description}</p>
              <div className="mt-6">
                <Pills items={g.items} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
