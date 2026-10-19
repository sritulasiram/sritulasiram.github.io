"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ProjectScreen } from "@/types";

interface ProjectScreenWalkthroughProps {
  screens: ProjectScreen[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

/**
 * Apple-style Project Screen Walkthrough Carousel
 * Replicates Apple's signature macOS/hardware feature card deck:
 * - Fluid horizontal snapping card strip with rounded screenshot viewports
 * - Apple bold lead-in typography ("Title. Description.")
 * - Circular frosted navigation buttons with edge-aware disabled states
 * - Click-to-preview high-resolution modal inspection
 */
export default function ProjectScreenWalkthrough({
  screens,
  eyebrow = "Interface Walkthrough",
  title = "Explore each screen.",
  subtitle = "A page-by-page tour of the architecture, workflow terminals, and operational interfaces.",
  className = "",
}: ProjectScreenWalkthroughProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedImage, setSelectedImage] = useState<ProjectScreen | null>(null);

  const updateScrollButtons = useCallback(() => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateScrollButtons();
    track.addEventListener("scroll", updateScrollButtons, { passive: true });
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      track.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [updateScrollButtons, screens]);

  const scrollByCard = (direction: "left" | "right") => {
    if (!trackRef.current) return;
    const card = trackRef.current.querySelector<HTMLDivElement>("[data-walkthrough-card]");
    const cardWidth = card ? card.offsetWidth + 24 : 520;
    const offset = direction === "left" ? -cardWidth : cardWidth;

    trackRef.current.scrollBy({
      left: offset,
      behavior: "smooth",
    });
  };

  if (!screens || screens.length === 0) return null;

  return (
    <section className={`w-full py-6 sm:py-10 space-y-6 sm:space-y-8 ${className}`}>
      {/* 1. Header & Navigation Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 px-6 sm:px-8 max-w-5xl mx-auto w-full">
        <div className="space-y-1.5 max-w-2xl">
          {eyebrow && (
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#0071E3] block">
              {eyebrow}
            </span>
          )}
          {title && (
            <h2 className="text-3xl sm:text-5xl font-semibold text-[#1D1D1F] dark:text-white tracking-apple-tight leading-tight">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-sm sm:text-base text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Apple Circular Nav Chevrons */}
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <button
            type="button"
            onClick={() => scrollByCard("left")}
            disabled={!canScrollLeft}
            aria-label="Previous screen"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F5F5F7] dark:bg-[#2C2C2E] hover:bg-[#E5E5EA] dark:hover:bg-[#3A3A3C] border border-[#E5E5EA] dark:border-white/10 flex items-center justify-center text-[#1D1D1F] dark:text-white transition-all cursor-pointer active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed shadow-xs"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard("right")}
            disabled={!canScrollRight}
            aria-label="Next screen"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F5F5F7] dark:bg-[#2C2C2E] hover:bg-[#E5E5EA] dark:hover:bg-[#3A3A3C] border border-[#E5E5EA] dark:border-white/10 flex items-center justify-center text-[#1D1D1F] dark:text-white transition-all cursor-pointer active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed shadow-xs"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Apple Horizontal Card Deck */}
      <div
        ref={trackRef}
        className="flex gap-5 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none px-6 sm:px-8 max-w-5xl mx-auto w-full pb-3"
      >
        {screens.map((screen, idx) => (
          <div
            key={screen.id || idx}
            data-walkthrough-card
            className="w-[82vw] sm:w-[460px] md:w-[520px] shrink-0 snap-start flex flex-col space-y-3.5 group"
          >
            {/* Top: Clean Single Rounded Screenshot Card (Edge-to-Edge 16:9) */}
            <div
              onClick={() => setSelectedImage(screen)}
              className="relative w-full aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E5E5EA] dark:border-white/10 shadow-xs hover:shadow-md transition-all duration-300 bg-[#F5F5F7] dark:bg-[#161617] cursor-pointer"
            >
              <Image
                src={screen.imageSrc}
                alt={screen.title}
                fill
                sizes="(max-width: 640px) 82vw, (max-width: 768px) 460px, 520px"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>

            {/* Bottom: Apple Bold Lead-in Typography */}
            <p className="text-sm sm:text-[15px] text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed pt-0.5">
              <strong className="font-semibold text-[#1D1D1F] dark:text-white">
                {screen.title}.{" "}
              </strong>
              {screen.description}
            </p>
          </div>
        ))}
      </div>

      {/* 3. Fullscreen Inspection Modal */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200 cursor-zoom-out"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-neutral-900 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-2xl flex flex-col cursor-default"
          >
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-neutral-950/80 border-b border-white/10 text-white">
              <div className="space-y-0.5">
                <p className="text-sm font-semibold">{selectedImage.title}</p>
                <p className="text-xs text-neutral-400">{selectedImage.description}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                aria-label="Close preview"
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-white text-xs font-semibold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Image Viewport */}
            <div className="relative w-full aspect-[16/9] max-h-[75vh] bg-black">
              <Image
                src={selectedImage.imageSrc}
                alt={selectedImage.title}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
