"use client";

import { useEffect, useState, useRef } from "react";

const NAV_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "lineup", label: "Lineup" },
  { id: "workbench", label: "Workbench" },
];

export default function ProjectsStickySubnav() {
  const [activeSection, setActiveSection] = useState("overview");
  const [navVisible, setNavVisible] = useState(false);
  const isScrollingToRef = useRef<string | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const rafNavRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafNavRef.current !== null) return;
      rafNavRef.current = requestAnimationFrame(() => {
        rafNavRef.current = null;
        const overview = document.getElementById("overview");
        if (overview) {
          const rect = overview.getBoundingClientRect();
          // Visible as user scrolls past the top hero section
          setNavVisible(rect.bottom < 200 || window.scrollY > 200);
        } else {
          setNavVisible(window.scrollY > 150);
        }

        if (isScrollingToRef.current) return;

        const isAtBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 120;
        if (isAtBottom) {
          setActiveSection("workbench");
          return;
        }

        for (let i = NAV_SECTIONS.length - 1; i >= 0; i--) {
          const { id } = NAV_SECTIONS[i];
          const el = document.getElementById(id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          if (rect.top <= 240) {
            setActiveSection(id);
            break;
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Avoid forced layout reflow and cascading update when page is at the top on mount
    if (typeof window !== "undefined" && window.scrollY > 50) {
      handleScroll();
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafNavRef.current !== null) {
        cancelAnimationFrame(rafNavRef.current);
      }
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    setActiveSection(id);
    isScrollingToRef.current = id;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingToRef.current = null;
    }, 850);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Desktop: Seamless Monochrome Optical Ruler Scrubber */}
      <nav
        aria-label="Projects page chapters"
        className={`hidden lg:flex fixed right-6 xl:right-10 top-1/2 -translate-y-1/2 z-40 flex-col gap-2.5 transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
          navVisible
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-4 pointer-events-none"
        }`}
      >
        {NAV_SECTIONS.map(({ id, label }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              aria-current={isActive ? "true" : undefined}
              className="flex items-center gap-3 py-1.5 px-1 text-left group cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-[#0071E3] rounded-md"
            >
              {/* Precision Optical Tick Mark with Apple Spring Animation */}
              <span
                className={`block rounded-full transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] shrink-0 ${
                  isActive
                    ? "w-6 h-[2.5px] bg-black dark:bg-white shadow-[0_0_8px_rgba(0,0,0,0.15)] dark:shadow-[0_0_8px_rgba(255,255,255,0.2)]"
                    : "w-2.5 h-[1px] bg-[#C7C7CC] dark:bg-[#3A3A3C] group-hover:w-4 group-hover:bg-[#86868B] dark:group-hover:bg-[#8E8E93]"
                }`}
              />
              {/* Chapter Label Bold and Shifted on Active with Apple Spring Curve */}
              <span
                className={`whitespace-nowrap transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
                  isActive
                    ? "text-[13.5px] font-bold tracking-tight text-black dark:text-white translate-x-1"
                    : "text-[12px] font-normal tracking-apple-tight text-[#6E6E73] dark:text-[#8E8E93] group-hover:text-black dark:group-hover:text-white group-hover:translate-x-0.5"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}

