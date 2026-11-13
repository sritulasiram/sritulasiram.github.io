"use client";

import { useEffect, useRef, useState } from "react";
import { specIcon, specSlug } from "./specIcons";

/**
 * The row of section chips that sticks under the project's local nav. The chip for the section you are reading is
 * filled in, and the row scrolls sideways on its own to keep that chip in view. Once the last spec in the element
 * with `specsId` has scrolled up past the bar, the bar slides up behind the local nav, and it comes back as soon as
 * any spec is under it again.
 */
export default function SpecsJumpBar({ titles, specsId }: { titles: string[]; specsId?: string }) {
  const [active, setActive] = useState(specSlug(titles[0] ?? ""));
  const [edges, setEdges] = useState({ left: false, right: false });
  const [past, setPast] = useState(false);
  const row = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const specs = specsId ? document.getElementById(specsId) : null;
    if (!specs) return;
    let raf = 0;
    const check = () => {
      raf = 0;
      // The bar's bottom edge sits at about 104px (52px nav + 52px bar); hide once the specs end above it.
      setPast(specs.getBoundingClientRect().bottom < 120);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [specsId]);

  // Fade whichever edge has more chips beyond it, so it is clear the row scrolls.
  useEffect(() => {
    const el = row.current;
    if (!el) return;
    const update = () => {
      const left = el.scrollLeft > 4;
      const right = el.scrollLeft + el.clientWidth < el.scrollWidth - 4;
      setEdges((e) => (e.left === left && e.right === right ? e : { left, right }));
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  const fade = `linear-gradient(to right, ${edges.left ? "transparent, #000 3rem" : "#000, #000"}, ${
    edges.right ? "#000 calc(100% - 3rem), transparent" : "#000, #000"
  })`;

  useEffect(() => {
    const sections = titles
      .map((t) => document.getElementById(specSlug(t)))
      .filter((el): el is HTMLElement => el !== null);
    // A section counts as "being read" once it crosses a line about a third of the way down the screen.
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-30% 0px -65% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [titles]);

  // Keep the active chip in view by scrolling the row only, never the page.
  useEffect(() => {
    const el = row.current;
    const chip = el?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!el || !chip) return;
    const left = chip.offsetLeft - (el.clientWidth - chip.offsetWidth) / 2;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
  }, [active]);

  return (
    <nav
      aria-label="Jump to a section"
      inert={past}
      className={`sticky top-[52px] z-30 transition-[translate,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
        past ? "-translate-y-full opacity-0" : ""
      } border-b border-black/[0.08] bg-white/80 backdrop-blur-xl backdrop-saturate-150 dark:border-white/[0.12] dark:bg-black/75`}
    >
      <div
        ref={row}
        style={{ maskImage: fade, WebkitMaskImage: fade }}
        className="relative mx-auto flex max-w-5xl gap-2 overflow-x-auto px-6 py-2.5 sm:px-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {titles.map((title) => {
          const id = specSlug(title);
          const Icon = specIcon(title);
          const on = id === active;
          return (
            <a
              key={id}
              href={`#${id}`}
              data-id={id}
              aria-current={on ? "location" : undefined}
              onClick={() => setActive(id)}
              className={`inline-flex min-h-8 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-medium transition-colors duration-200 pointer-coarse:min-h-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] ${
                on
                  ? "bg-[#1D1D1F] text-white dark:bg-[#F5F5F7] dark:text-[#1D1D1F]"
                  : "bg-[var(--pa-soft)] text-[#1D1D1F] hover:bg-[color-mix(in_srgb,var(--pa)_22%,transparent)] dark:text-[#F5F5F7]"
              }`}
            >
              <Icon className={`h-3.5 w-3.5 ${on ? "" : "text-[var(--pa)]"}`} aria-hidden="true" />
              {title}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
