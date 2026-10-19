"use client";

import { useEffect, useRef, useState } from "react";

export interface SectionNavItem {
  id: string;
  label: string;
}

/**
 * Sections can exist twice on a page (for example a scroll-driven version for desktop and a
 * static one for small screens, with one of them display:none), so prefer the copy that is
 * actually rendered. Sections tagged with data-section are found first, then plain ids.
 */
const getSection = (id: string) =>
  Array.from(document.querySelectorAll<HTMLElement>(`[data-section="${id}"]`)).find(
    (el) => el.getClientRects().length > 0,
  ) ?? document.getElementById(id);

// Desktop only: below this width the nav is not rendered and no scroll work is done.
const DESKTOP_QUERY = "(min-width: 1280px)";

/**
 * Chapter ruler fixed to the right edge of the page.
 *
 * - xl (1280px+): ticks only, with the label shown on hover or keyboard focus, so it never
 *   covers page content. 2xl (1536px+): labels are always visible in the page margin.
 * - Items are real links (#id), so they can be copied, opened in a new tab and followed
 *   from the keyboard. The URL hash is updated on click and honoured on load.
 * - Active section comes from scroll position, checked at most once per frame.
 */
export default function SectionNav({
  sections,
  ariaLabel,
}: {
  sections: SectionNavItem[];
  ariaLabel: string;
}) {
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const [visible, setVisible] = useState(false);
  // Set while a click-initiated scroll is running, so the scroll listener does not
  // flicker through the sections in between.
  const lockRef = useRef(false);
  const unlockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    let raf = 0;
    let attached = false;

    const update = () => {
      raf = 0;
      setVisible((shown) => (shown ? window.scrollY > 120 : window.scrollY > 200));
      if (lockRef.current) return;

      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120;
      if (atBottom) {
        setActive(sections[sections.length - 1].id);
        return;
      }

      const readingLine = window.innerHeight * 0.3;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = getSection(sections[i].id);
        if (el && el.getBoundingClientRect().top <= readingLine) {
          setActive(sections[i].id);
          return;
        }
      }
      setActive(sections[0].id);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const sync = () => {
      if (mq.matches && !attached) {
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        attached = true;
        update();
      } else if (!mq.matches && attached) {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        attached = false;
      }
    };

    sync();
    mq.addEventListener("change", sync);

    // Honour #section in the URL, including sections that have no native anchor target.
    const hash = window.location.hash.slice(1);
    const hashTimer =
      hash && sections.some((s) => s.id === hash)
        ? setTimeout(() => getSection(hash)?.scrollIntoView({ block: "start" }), 300)
        : undefined;

    return () => {
      mq.removeEventListener("change", sync);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      if (hashTimer) clearTimeout(hashTimer);
      if (unlockTimer.current) clearTimeout(unlockTimer.current);
    };
  }, [sections]);

  const goTo = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = getSection(id);
    if (!el) return;
    event.preventDefault();

    setActive(id);
    lockRef.current = true;
    if (unlockTimer.current) clearTimeout(unlockTimer.current);
    const release = () => {
      lockRef.current = false;
      window.removeEventListener("scrollend", release);
      if (unlockTimer.current) clearTimeout(unlockTimer.current);
    };
    // scrollend fires when the smooth scroll finishes; the timer covers browsers without it
    // and the case where the page is already at the target.
    window.addEventListener("scrollend", release, { once: true });
    unlockTimer.current = setTimeout(release, 1200);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <nav
      aria-label={ariaLabel}
      inert={!visible}
      className={`hidden xl:block fixed right-4 2xl:right-8 top-1/2 -translate-y-1/2 z-40 transition-[opacity,transform] duration-[400ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-3 pointer-events-none"
      }`}
    >
      <ul className="flex flex-col gap-1">
        {sections.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(event) => goTo(event, id)}
                aria-current={isActive ? "location" : undefined}
                className="group relative flex items-center justify-end h-8 w-9 pl-2 pr-1 rounded-md select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0071E3]"
              >
                {/* Label: a pill beside the tick on hover/focus; plain text in the margin on 2xl.
                    The wrapper's padding bridges the gap to the tick, so the pointer can move
                    from tick to label without losing hover, and the label is part of the link.
                    It only takes pointer events while visible, so it never blocks the page. */}
                <span className="absolute right-full pr-2 pointer-events-none group-hover:pointer-events-auto group-focus-visible:pointer-events-auto 2xl:pointer-events-auto">
                  <span
                    className={`block whitespace-nowrap rounded-full px-3 py-1 text-[12px] leading-none cursor-pointer border border-black/[0.06] dark:border-white/10 bg-white/90 dark:bg-[#1C1C1E]/90 backdrop-blur-xl shadow-xs transition-[opacity,transform,color] duration-200 ease-out motion-reduce:transition-none opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 2xl:opacity-100 2xl:translate-x-0 2xl:bg-transparent 2xl:dark:bg-transparent 2xl:border-transparent 2xl:dark:border-transparent 2xl:shadow-none 2xl:backdrop-blur-none ${
                      isActive
                        ? "font-medium text-[#1D1D1F] dark:text-white"
                        : "font-medium text-[#6E6E73] dark:text-[#A1A1A6] group-hover:text-[#1D1D1F] dark:group-hover:text-white"
                    }`}
                  >
                    {label}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={`block w-6 h-[2px] rounded-full shrink-0 origin-right transition-[transform,background-color] duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                    isActive
                      ? "scale-x-100 bg-[#1D1D1F] dark:bg-white"
                      : "scale-x-[0.42] bg-[#86868B] dark:bg-[#6E6E73] group-hover:scale-x-[0.7] group-hover:bg-[#6E6E73] dark:group-hover:bg-[#A1A1A6]"
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
