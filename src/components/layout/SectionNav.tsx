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

/** Height of one row in the capsule. */
const ITEM_H = 30;

// Desktop only: below this width the nav is not rendered and no scroll work is done.
const DESKTOP_QUERY = "(min-width: 1280px)";

/**
 * Chapter dots in a frosted capsule, fixed to the right edge of the page, styled after the
 * pagination dots on Apple's product pages.
 *
 * - xl (1280px+) only. At rest it is a column of dots; the current section's dot stretches into
 *   a pill. Hovering or focusing the capsule widens it to show every chapter's name.
 * - Items are real links (#id), so they can be copied, opened in a new tab and followed
 *   from the keyboard. The URL hash is updated on click and honoured on load.
 * - Active section comes from scroll position, checked at most once per frame.
 * - It stands in for the page's scrollbar: the browser's own is hidden while the nav is mounted
 *   on desktop (see globals.css). The current section's pill can be dragged up and down the
 *   column; the page follows section by section and the labels stay open while dragging.
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
  const listRef = useRef<HTMLUListElement>(null);
  const [dragging, setDragging] = useState(false);
  // Mirrors `dragging` for the scroll listener, which must leave the active section alone mid-drag.
  const draggingRef = useRef(false);
  // Set when a drag ends, so the click that follows the pointerup does not jump anywhere.
  const suppressClick = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    let raf = 0;
    let attached = false;

    const update = () => {
      raf = 0;
      setVisible((shown) => (shown ? window.scrollY > 120 : window.scrollY > 200));

      if (lockRef.current || draggingRef.current) return;

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
      document.documentElement.classList.toggle("section-nav-scroll", mq.matches);
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
      document.documentElement.classList.remove("section-nav-scroll");
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      if (hashTimer) clearTimeout(hashTimer);
      if (unlockTimer.current) clearTimeout(unlockTimer.current);
    };
  }, [sections]);

  /** Mark a section current and glide to it, holding off the scroll listener until it arrives. */
  const scrollToSection = (id: string) => {
    const el = getSection(id);
    if (!el) return false;

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
    return true;
  };

  const goTo = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (suppressClick.current || scrollToSection(id)) event.preventDefault();
  };

  /**
   * Drag the current section's pill. Window listeners rather than pointer capture, so a press
   * without movement still lands on the link as a normal click.
   */
  const startDrag = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || !listRef.current) return;
    const startY = event.clientY;
    let moved = false;
    let current = sections.findIndex((s) => s.id === active);

    const onMove = (e: PointerEvent) => {
      if (!moved) {
        if (Math.abs(e.clientY - startY) < 4) return;
        moved = true;
        draggingRef.current = true;
        setDragging(true);
        document.documentElement.style.cursor = "grabbing";
      }
      e.preventDefault();

      const rect = listRef.current!.getBoundingClientRect();
      const paddingTop = parseFloat(getComputedStyle(listRef.current!).paddingTop);
      const index = Math.min(
        sections.length - 1,
        Math.max(0, Math.floor((e.clientY - rect.top - paddingTop) / ITEM_H)),
      );
      if (index === current) return;
      current = index;

      scrollToSection(sections[index].id);
    };

    const onEnd = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onEnd);
      window.removeEventListener("pointercancel", onEnd);
      if (!moved) return;

      draggingRef.current = false;
      setDragging(false);
      document.documentElement.style.cursor = "";
      suppressClick.current = true;
      setTimeout(() => (suppressClick.current = false), 0);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onEnd);
    window.addEventListener("pointercancel", onEnd);
  };

  return (
    <nav
      aria-label={ariaLabel}
      inert={!visible}
      data-dragging={dragging || undefined}
      className={`group/rail hidden xl:block fixed right-4 2xl:right-8 top-1/2 -translate-y-1/2 z-40 transition-[opacity,transform] duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
      }`}
    >
      <ul ref={listRef} className="flex flex-col rounded-[22px] px-2 py-2 bg-[rgba(232,232,237,0.72)] dark:bg-[rgba(44,44,46,0.72)] backdrop-blur-xl backdrop-saturate-[180%] ring-1 ring-inset ring-black/[0.04] dark:ring-white/[0.06]">
        {sections.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(event) => goTo(event, id)}
                onPointerDown={isActive ? startDrag : undefined}
                draggable={false}
                aria-current={isActive ? "location" : undefined}
                style={{ height: ITEM_H }}
                className={`group flex items-center justify-end rounded-full px-1.5 select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] ${
                  isActive ? "cursor-grab" : ""
                }`}
              >
                {/* Label: folded to zero width at rest, opened when the capsule is hovered, focused or dragged. */}
                <span className="grid grid-cols-[0fr] group-hover/rail:grid-cols-[1fr] group-focus-within/rail:grid-cols-[1fr] group-data-dragging/rail:grid-cols-[1fr] transition-[grid-template-columns] duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none">
                  <span className="overflow-hidden">
                    <span
                      className={`block whitespace-nowrap pl-1.5 pr-3 text-[12px] leading-none tracking-[-0.01em] opacity-0 group-hover/rail:opacity-100 group-focus-within/rail:opacity-100 group-data-dragging/rail:opacity-100 transition-[opacity,color] duration-300 motion-reduce:transition-none ${
                        isActive
                          ? "font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]"
                          : "text-[#515154] dark:text-[#A1A1A6] group-hover:text-[#1D1D1F] dark:group-hover:text-[#F5F5F7]"
                      }`}
                    >
                      {label}
                    </span>
                  </span>
                </span>

                {/* Dot: the current section's stretches into a pill. */}
                <span className="flex w-2 shrink-0 justify-center" aria-hidden="true">
                  <span
                    className={`block w-2 rounded-full transition-[height,background-color] duration-500 [transition-timing-function:cubic-bezier(0.34,1.3,0.64,1)] motion-reduce:transition-none ${
                      isActive
                        ? "h-5 bg-[#1D1D1F] dark:bg-[#F5F5F7]"
                        : "h-2 bg-[#8B8B8E] dark:bg-[#808082] group-hover:bg-[#48484A] dark:group-hover:bg-[#C7C7CC]"
                    }`}
                  />
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
