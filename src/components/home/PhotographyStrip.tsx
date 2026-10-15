"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, MapPin, Expand } from "lucide-react";
import { PHOTOGRAPHY_DATA } from "@/data/content";
import ProjectImage from "@/components/ui/ProjectImage";
import PhotoPreviewModal from "@/components/photography/PhotoPreviewModal";
import type { PhotoItem } from "@/types";

const STRIP_PHOTOS = PHOTOGRAPHY_DATA.slice(0, 10);

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function PhotographyStrip() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const singleSetRef = useRef<HTMLDivElement>(null);
  const singleSetWidthRef = useRef<number>(0);

  const speedRef = useRef<number>(35);
  const currentXRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const dragStartOffsetRef = useRef<number>(0);
  const hasDraggedRef = useRef<boolean>(false);
  const isHoveredRef = useRef<boolean>(false);
  const animationFrameRef = useRef<number | null>(null);

  const [isDraggingState, setIsDraggingState] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState<PhotoItem | null>(null);

  // Measure single set width accurately and handle window resize
  useEffect(() => {
    const updateWidth = () => {
      if (singleSetRef.current) {
        singleSetWidthRef.current = singleSetRef.current.offsetWidth;
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const wrapCheck = useCallback(() => {
    const w = singleSetWidthRef.current;
    if (w <= 0) return;
    while (currentXRef.current <= -w) {
      currentXRef.current += w;
    }
    while (currentXRef.current > 0) {
      currentXRef.current -= w;
    }
  }, []);

  // Continuous buttery smooth auto-glide with inertial momentum easing (viewport-throttled)
  useEffect(() => {
    let lastTime = performance.now();
    let isVisible = false;

    const step = (time: number) => {
      if (!isVisible) return;

      const delta = Math.min(time - lastTime, 64);
      lastTime = time;

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Target velocity: 0 when user prefers reduced motion, hovers, or preview modal is open; 35px/s when idle
      const targetSpeed =
        !prefersReducedMotion && !isDraggingRef.current && !isHoveredRef.current && !previewPhoto
          ? 35
          : 0;

      // Smooth exponential easing (gentle braking and smooth acceleration, never abrupt)
      const decay = 1 - Math.exp(-0.06 * (delta / 16.67));
      speedRef.current += (targetSpeed - speedRef.current) * decay;

      if (Math.abs(speedRef.current) > 0.05 && !isDraggingRef.current) {
        currentXRef.current -= (speedRef.current * delta) / 1000;
        wrapCheck();
        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${currentXRef.current}px, 0, 0)`;
        }
      }

      animationFrameRef.current = requestAnimationFrame(step);
    };

    const targetEl = viewportRef.current;
    if (!targetEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (isVisible && !wasVisible) {
          lastTime = performance.now();
          if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = requestAnimationFrame(step);
        } else if (!isVisible && animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
      },
      { rootMargin: "50px" }
    );

    observer.observe(targetEl);

    return () => {
      observer.disconnect();
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [wrapCheck, previewPhoto]);

  const isPointerDownRef = useRef<boolean>(false);
  const pointerStartPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Global window pointer safety: ensures pointerup is never missed
  useEffect(() => {
    const handleGlobalPointerUp = () => {
      isPointerDownRef.current = false;
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        setIsDraggingState(false);
        setTimeout(() => {
          hasDraggedRef.current = false;
        }, 150);
      }
    };

    window.addEventListener("pointerup", handleGlobalPointerUp);
    window.addEventListener("pointercancel", handleGlobalPointerUp);
    window.addEventListener("blur", handleGlobalPointerUp);
    return () => {
      window.removeEventListener("pointerup", handleGlobalPointerUp);
      window.removeEventListener("pointercancel", handleGlobalPointerUp);
      window.removeEventListener("blur", handleGlobalPointerUp);
    };
  }, []);

  // Pointer drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (previewPhoto) return;
    if (e.button !== 0) return;
    isPointerDownRef.current = true;
    isDraggingRef.current = false;
    hasDraggedRef.current = false;
    startXRef.current = e.clientX;
    pointerStartPosRef.current = { x: e.clientX, y: e.clientY };
    dragStartOffsetRef.current = currentXRef.current;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (previewPhoto) {
      isPointerDownRef.current = false;
      isDraggingRef.current = false;
      return;
    }

    // Must be actively pressing primary button (or touch) AND pointer must be down
    const isPrimaryDown = e.pointerType === "touch" || (e.buttons & 1) === 1;
    if (!isPrimaryDown || !isPointerDownRef.current) {
      if (isPointerDownRef.current || isDraggingRef.current) {
        isPointerDownRef.current = false;
        isDraggingRef.current = false;
        setIsDraggingState(false);
      }
      return;
    }

    const deltaX = e.clientX - startXRef.current;
    const deltaY = e.clientY - (pointerStartPosRef.current?.y || e.clientY);

    // On touch devices, if the user is scrolling vertically (|deltaY| > |deltaX|), do not capture or drag
    if (e.pointerType === "touch" && Math.abs(deltaY) > Math.abs(deltaX)) {
      isPointerDownRef.current = false;
      return;
    }

    // Only initiate drag mode if pointer moved more than 6px horizontally
    if (!isDraggingRef.current) {
      if (Math.abs(deltaX) > 6 && Math.abs(deltaX) > Math.abs(deltaY)) {
        isDraggingRef.current = true;
        hasDraggedRef.current = true;
        speedRef.current = 0;
        setIsDraggingState(true);
        try {
          viewportRef.current?.setPointerCapture(e.pointerId);
        } catch {}
      } else {
        return;
      }
    }

    let nextPos = dragStartOffsetRef.current + deltaX;
    const w = singleSetWidthRef.current;
    if (w > 0) {
      while (nextPos <= -w) {
        nextPos += w;
        dragStartOffsetRef.current += w;
      }
      while (nextPos > 0) {
        nextPos -= w;
        dragStartOffsetRef.current -= w;
      }
    }

    currentXRef.current = nextPos;
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${nextPos}px, 0, 0)`;
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isPointerDownRef.current = false;
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      speedRef.current = 0;
      setIsDraggingState(false);
      try {
        viewportRef.current?.releasePointerCapture(e.pointerId);
      } catch {}

      setTimeout(() => {
        hasDraggedRef.current = false;
      }, 150);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      currentXRef.current -= e.deltaX;
      wrapCheck();
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${currentXRef.current}px, 0, 0)`;
      }
    }
  };

  const scrollStep = (direction: "left" | "right") => {
    const amount = 340;
    currentXRef.current += direction === "left" ? amount : -amount;
    wrapCheck();
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${currentXRef.current}px, 0, 0)`;
    }
  };

  const handleOpenPreview = (photo: PhotoItem) => {
    isPointerDownRef.current = false;
    isDraggingRef.current = false;
    hasDraggedRef.current = false;
    setIsDraggingState(false);
    setPreviewPhoto(photo);
  };

  const handleClosePreview = () => {
    isPointerDownRef.current = false;
    isDraggingRef.current = false;
    hasDraggedRef.current = false;
    setIsDraggingState(false);
    setPreviewPhoto(null);
  };

  const handleNextPhoto = () => {
    if (!previewPhoto) return;
    const currentIndex = PHOTOGRAPHY_DATA.findIndex((p) => p.id === previewPhoto.id);
    const nextIndex = (currentIndex + 1) % PHOTOGRAPHY_DATA.length;
    setPreviewPhoto(PHOTOGRAPHY_DATA[nextIndex]);
  };

  const handlePrevPhoto = () => {
    if (!previewPhoto) return;
    const currentIndex = PHOTOGRAPHY_DATA.findIndex((p) => p.id === previewPhoto.id);
    const prevIndex = (currentIndex - 1 + PHOTOGRAPHY_DATA.length) % PHOTOGRAPHY_DATA.length;
    setPreviewPhoto(PHOTOGRAPHY_DATA[prevIndex]);
  };

  const renderPhotoCard = (photo: PhotoItem, keySuffix: string | number) => (
    <div
      key={`${photo.id}-${keySuffix}`}
      role="button"
      tabIndex={0}
      draggable={false}
      onClick={(e) => {
        e.stopPropagation();
        isPointerDownRef.current = false;
        if (hasDraggedRef.current || isDraggingRef.current) return;
        handleOpenPreview(photo);
      }}
      onPointerUp={() => {
        isPointerDownRef.current = false;
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleOpenPreview(photo);
        }
      }}
      className="group relative w-[240px] sm:w-[290px] md:w-[330px] aspect-[4/5] shrink-0 rounded-3xl overflow-hidden border border-[#E5E5EA] dark:border-[#2C2C2E] bg-[#FAFAFA] dark:bg-[#121214] apple-card-shadow block select-none cursor-pointer"
    >
      <ProjectImage
        src={photo.imageSrc}
        alt={photo.altText}
        placeholderLabel={photo.placeholderLabel}
        ratioText="4:5 Curated Photo"
        type="photo"
        className="w-full h-full pointer-events-none select-none"
      />

      {/* Hover Description Overlay: Pure opacity fade, no card translation or scale */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 pointer-events-none">
        <div className="space-y-1.5">
          {photo.location && (
            <span className="text-[11px] font-medium text-[#2997FF] flex items-center gap-1">
              <MapPin className="w-3 h-3 shrink-0" />
              <span className="truncate">{photo.location}</span>
            </span>
          )}
          {photo.title && (
            <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight leading-snug">
              {photo.title}
            </h3>
          )}
          {photo.description && (
            <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">
              {photo.description}
            </p>
          )}
          <div className="pt-1 flex items-center gap-1.5 text-[11px] font-medium text-white/70">
            <Expand className="w-3 h-3 text-[#2997FF] shrink-0" />
            <span>Click to preview</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <section id="photography" className="py-14 sm:py-20 bg-white dark:bg-black transition-colors duration-300 overflow-hidden select-none">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 gap-6">
            <div className="max-w-xl space-y-3">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#6E6E73] dark:text-[#A1A1A6] block">
                Photography
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight leading-[1.1] text-balance">
                Moments in light.
                <br />
                <span className="text-[#6E6E73] dark:text-[#8E8E93] font-medium">
                  Atmosphere, geometry, and the moments in between.
                </span>
              </h2>
              <p className="text-base sm:text-lg text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed pt-1 text-balance">
                A personal collection exploring coastal horizons, architectural lines, and everyday scenes across Penang and beyond.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto">
              {/* Scroll Navigation Chevrons */}
              <div className="flex items-center gap-1.5 mr-1">
                <button
                  type="button"
                  onClick={() => scrollStep("left")}
                  aria-label="Previous photos"
                  className="relative w-8 h-8 rounded-full flex items-center justify-center bg-[#F5F5F7] dark:bg-[#1C1C1E] hover:bg-[#E5E5EA] dark:hover:bg-[#2C2C2E] text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors border border-[#E5E5EA] dark:border-[#2C2C2E] cursor-pointer after:absolute after:-inset-1.5 after:content-['']"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollStep("right")}
                  aria-label="Next photos"
                  className="relative w-8 h-8 rounded-full flex items-center justify-center bg-[#F5F5F7] dark:bg-[#1C1C1E] hover:bg-[#E5E5EA] dark:hover:bg-[#2C2C2E] text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors border border-[#E5E5EA] dark:border-[#2C2C2E] cursor-pointer after:absolute after:-inset-1.5 after:content-['']"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <Link
                href="/photography"
                prefetch={false}
                className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap text-[#1D1D1F] dark:text-[#F5F5F7] bg-[#F5F5F7] dark:bg-[#1C1C1E] hover:bg-[#E5E5EA] dark:hover:bg-[#2C2C2E] transition-colors border border-[#E5E5EA] dark:border-[#2C2C2E]"
              >
                <span>Gallery</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="https://instagram.com/iamsritulasiram"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap text-[#1D1D1F] dark:text-[#F5F5F7] bg-[#F5F5F7] dark:bg-[#1C1C1E] hover:bg-[#E5E5EA] dark:hover:bg-[#2C2C2E] transition-colors border border-[#E5E5EA] dark:border-[#2C2C2E]"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-[#6E6E73] dark:text-[#A1A1A6]" />
                <span>@iamsritulasiram</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Draggable Moving Photo Ribbon */}
        <div
          ref={viewportRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onMouseEnter={() => {
            isHoveredRef.current = true;
          }}
          onMouseLeave={() => {
            isHoveredRef.current = false;
            isPointerDownRef.current = false;
            if (isDraggingRef.current) {
              isDraggingRef.current = false;
              setIsDraggingState(false);
              setTimeout(() => {
                hasDraggedRef.current = false;
              }, 150);
            }
          }}
          onWheel={handleWheel}
          className={`w-full marquee-mask py-4 overflow-hidden touch-pan-y ${
            isDraggingState ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          <div
            ref={trackRef}
            className="flex will-change-transform"
            style={{ transform: "translate3d(0px, 0, 0)" }}
          >
            {/* Set 1: Used to measure exact pixel width */}
            <div ref={singleSetRef} className="flex gap-6 sm:gap-8 pr-6 sm:pr-8 shrink-0">
              {STRIP_PHOTOS.map((photo, i) => renderPhotoCard(photo, `set1-${i}`))}
            </div>

            {/* Set 2: Seamless duplicate */}
            <div className="flex gap-6 sm:gap-8 pr-6 sm:pr-8 shrink-0" aria-hidden="true">
              {STRIP_PHOTOS.map((photo, i) => renderPhotoCard(photo, `set2-${i}`))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Preview Modal */}
      <PhotoPreviewModal
        photo={previewPhoto}
        onClose={handleClosePreview}
        onNext={handleNextPhoto}
        onPrev={handlePrevPhoto}
        currentIndex={
          previewPhoto
            ? PHOTOGRAPHY_DATA.findIndex((p) => p.id === previewPhoto.id)
            : undefined
        }
        totalCount={PHOTOGRAPHY_DATA.length}
      />
    </>
  );
}
