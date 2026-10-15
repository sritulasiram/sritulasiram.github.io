"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

interface AppleCarouselControllerProps {
  itemCount: number;
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  slideDuration?: number; // duration in ms, default 5500ms
  activeColor?: string; // custom progress bar color, defaults to Apple monochrome
  className?: string;
  ariaLabel?: string;
}

/**
 * Apple-style Carousel Scrub & Autoplay Controller
 * Engineered with direct-DOM GPU transform updates:
 * - Fluid 120 FPS sub-pixel filling via requestAnimationFrame (0 React re-renders)
 * - Deterministic advancement to next slide without getting stuck
 * - Frame-accurate pause & seamless resumption
 * - Frosted glass pill with interactive jump dots & circular play/pause button
 */
export default function AppleCarouselController({
  itemCount,
  activeIndex,
  onSelectIndex,
  slideDuration = 5500,
  activeColor,
  className = "",
  ariaLabel = "Carousel controls",
}: AppleCarouselControllerProps) {
  const [isPlaying, setIsPlaying] = useState(true);

  // Direct ref to the active progress fill element for 120 FPS hardware transform
  const containerRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const elapsedRef = useRef<number>(0);
  const lastTimeRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const prevActiveIndexRef = useRef(activeIndex);
  // Default to true for above-the-fold carousel to avoid mount cascading update
  const [isVisible, setIsVisible] = useState(true);

  // Pause rAF ticker when carousel is scrolled off-screen to preserve 120 FPS scrolling budget
  useEffect(() => {
    if (!containerRef.current || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const isReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Reset progress when active slide changes
    if (prevActiveIndexRef.current !== activeIndex) {
      prevActiveIndexRef.current = activeIndex;
      elapsedRef.current = 0;
      lastTimeRef.current = null;
      if (progressRef.current) {
        progressRef.current.style.transform = "scaleX(0)";
      }
    }

    if (!isPlaying || isReduced || !isVisible) {
      lastTimeRef.current = null;
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      return;
    }

    const tick = (now: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = now;
      }
      const delta = now - lastTimeRef.current;
      lastTimeRef.current = now;

      elapsedRef.current += delta;
      const progress = Math.min(1, elapsedRef.current / slideDuration);

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }

      if (elapsedRef.current >= slideDuration) {
        elapsedRef.current = 0;
        lastTimeRef.current = null;
        if (progressRef.current) {
          progressRef.current.style.transform = "scaleX(0)";
        }
        onSelectIndex((activeIndex + 1) % itemCount);
      } else {
        rafIdRef.current = requestAnimationFrame(tick);
      }
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [isPlaying, isVisible, activeIndex, itemCount, onSelectIndex, slideDuration]);

  const handleDotClick = (idx: number) => {
    elapsedRef.current = 0;
    lastTimeRef.current = null;
    if (progressRef.current) {
      progressRef.current.style.transform = "scaleX(0)";
    }
    onSelectIndex(idx);
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label={ariaLabel}
      className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}
    >
      {/* Frosted Progress Scrub Pill */}
      <div className="h-9 sm:h-10 px-3.5 sm:px-4 rounded-full bg-[#E5E5EA]/85 dark:bg-[#323236]/85 backdrop-blur-xl border border-black/[0.04] dark:border-white/10 shadow-xs flex items-center gap-2 sm:gap-2.5 shrink-0 overflow-hidden transition-colors duration-200">
        {Array.from({ length: itemCount }).map((_, idx) => {
          const isActive = idx === activeIndex;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleDotClick(idx)}
              aria-label={isActive ? `Current slide ${idx + 1}, restart` : `Jump to slide ${idx + 1}`}
              className={`h-full flex items-center justify-center cursor-pointer transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0 ${
                isActive ? "w-11 sm:w-13" : "w-2 sm:w-2.5"
              }`}
            >
              <div
                className={`h-2 sm:h-2.5 rounded-full relative overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] w-full ${
                  isActive
                    ? "bg-[#D1D1D6] dark:bg-white/25"
                    : "bg-[#AEAEB2] dark:bg-white/50 hover:bg-[#8E8E93] dark:hover:bg-white/80"
                }`}
              >
                {isActive && (
                  <div
                    ref={progressRef}
                    className={`absolute inset-0 rounded-full ${
                      activeColor ? "" : "bg-[#1D1D1F] dark:bg-white"
                    }`}
                    style={{
                      transform: "scaleX(0)",
                      transformOrigin: "left center",
                      willChange: "transform",
                      backgroundColor: activeColor || undefined,
                    }}
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Circular Play / Pause Toggle Button */}
      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause autoplay" : "Resume autoplay"}
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#E5E5EA]/85 dark:bg-[#323236]/85 hover:bg-[#DCDCE2] dark:hover:bg-[#3E3E42] backdrop-blur-xl border border-black/[0.04] dark:border-white/10 shadow-xs flex items-center justify-center text-[#1D1D1F] dark:text-white transition-all duration-200 cursor-pointer active:scale-95"
      >
        {isPlaying ? (
          <Pause className="w-3.5 h-3.5 fill-current" />
        ) : (
          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
        )}
      </button>
    </div>
  );
}
