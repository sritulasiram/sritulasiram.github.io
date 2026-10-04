"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import type { PhotoItem } from "@/types";
import AppleCarouselController from "./AppleCarouselController";

interface PhotographyHeroSpotlightProps {
  photos: PhotoItem[];
  onSelectPhoto: (photo: PhotoItem) => void;
}

const APPLE_PHOTO_BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4IDEwIj48ZmlsdGVyIGlkPSJiIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIiLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSIxMCIgZmlsbD0iIzFDMUMxRSIvPjxjaXJjbGUgY3g9IjQiIGN5PSI1IiByPSIzIiBmaWxsPSIjMkMyQzJFIiBmaWx0ZXI9InVybCgjYikiIG9wYWNpdHk9IjAuNiIvPjwvc3ZnPg==";

export default function PhotographyHeroSpotlight({
  photos,
  onSelectPhoto,
}: PhotographyHeroSpotlightProps) {
  // Priority sequence for signature spotlight showcase:
  // 1. Golden Hour Waters (24mm Coastal)
  // 2. Petronas Spires (24mm Urban)
  // 3. Limestone Oculus (13mm Ultra-Wide)
  // 4. Scarlet Perch (120mm Telephoto)
  // 5. Starlight Vault (Noir Architectural)
  const SPOTLIGHT_ORDER = [
    "photo-sunset",
    "photo-petronas-twin-spires",
    "photo-batu-caves-cathedral-skylight",
    "photo-scarlet-macaw-perch",
    "photo-starlight-optic-vault",
  ];

  const featuredCandidates = photos
    .filter((p) => p.featured)
    .sort((a, b) => {
      const idxA = SPOTLIGHT_ORDER.indexOf(a.id);
      const idxB = SPOTLIGHT_ORDER.indexOf(b.id);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return 0;
    });

  const spotlightPhotos = (featuredCandidates.length > 0 ? featuredCandidates : photos).slice(0, 5);

  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedPhotos, setLoadedPhotos] = useState<Record<string, boolean>>({});
  const touchStartXRef = useRef<number | null>(null);

  // Clamp index if photos count changes
  useEffect(() => {
    if (activeIndex >= spotlightPhotos.length) {
      setActiveIndex(0);
    }
  }, [spotlightPhotos.length, activeIndex]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % spotlightPhotos.length);
  }, [spotlightPhotos.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + spotlightPhotos.length) % spotlightPhotos.length);
  }, [spotlightPhotos.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartXRef.current;
    if (diff > 50) {
      handlePrev();
    } else if (diff < -50) {
      handleNext();
    }
    touchStartXRef.current = null;
  };

  return (
    <section
      aria-label="Photography Highlights Showcase"
      className="w-full mb-16 sm:mb-20 text-left"
    >
      {/* 1. Header Bar: Aligned Apple 'Get the highlights' Pattern */}
      <div className="flex items-end justify-between mb-8 sm:mb-10 px-1 text-left">
        <div className="space-y-1 text-left">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#6E6E73] dark:text-[#8E8E93] block">
            Signature Frames
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-hero leading-tight text-left">
            Perspective is everything.
          </h2>
        </div>

        <a
          href="#gallery"
          className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7] hover:opacity-70 transition-opacity"
        >
          <span>Explore all frames</span>
          <ArrowDown className="w-4 h-4" />
        </a>
      </div>

      {/* 2. Unified Stage Container (Unclipped Soft Shadows, Zero Boundary Slicing) */}
      <div
        className="relative w-full select-none py-4 sm:py-6 text-left"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full min-h-[440px] sm:min-h-[480px] md:min-h-[500px] flex items-center">
          {spotlightPhotos.map((photo, idx) => {
            const isActive = idx === activeIndex;
            const isPortrait =
              photo.aspectRatio?.includes("3/4") ||
              photo.aspectRatio?.includes("9/16") ||
              photo.aspectRatio?.includes("2/3");

            const editorial = {
              title: photo.spotlightTitle || photo.title || "Curated Frame",
              subtitle: photo.spotlightSubtitle || photo.location || "Penang, Malaysia",
            };

            return (
              <div
                key={photo.id}
                className={`w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] text-left ${
                  isActive
                    ? "opacity-100 translate-x-0 relative z-10 pointer-events-auto"
                    : "opacity-0 absolute inset-0 pointer-events-none z-0 translate-x-4"
                }`}
              >
                {isPortrait ? (
                  /* Portrait Orientation: Title & Description on the SIDE */
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-10 md:gap-12 items-center w-full text-left">
                    {/* Left Column: Title & Description (Col 1-5) */}
                    <div className="md:col-span-5 space-y-2 text-left">
                      <span className="text-xs font-semibold uppercase tracking-widest text-[#86868B] dark:text-[#8E8E93] block">
                        {photo.location || "Penang, Malaysia"}
                      </span>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight leading-tight text-left">
                        {editorial.title}
                      </h3>
                      <p className="text-base sm:text-lg text-[#6E6E73] dark:text-[#8E8E93] font-normal leading-relaxed text-left">
                        {editorial.subtitle}
                      </p>
                      {photo.description && (
                        <p className="text-xs sm:text-sm text-[#86868B] dark:text-[#636366] leading-relaxed pt-1 text-left">
                          {photo.description}
                        </p>
                      )}
                    </div>

                    {/* Right Column: Portrait Photo Media (Col 6-12) */}
                    <div className="md:col-span-7 flex justify-center md:justify-end">
                      <div
                        onClick={() => onSelectPhoto(photo)}
                        className="relative w-full max-w-[360px] sm:max-w-[440px] md:max-w-[480px] aspect-[3/4] rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.07)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.55)] cursor-pointer group bg-[#E8E8ED] dark:bg-[#1C1C1E]"
                      >
                        <Image
                          src={photo.imageSrc}
                          alt={photo.altText}
                          fill
                          priority={idx === 0}
                          placeholder="blur"
                          blurDataURL={APPLE_PHOTO_BLUR_DATA_URL}
                          sizes="(max-width: 768px) 90vw, 480px"
                          onLoad={() =>
                            setLoadedPhotos((prev) => ({ ...prev, [photo.id]: true }))
                          }
                          className={`object-cover object-center transition-[transform,opacity] duration-500 ease-out group-hover:scale-[1.02] will-change-transform ${
                            idx === 0 || loadedPhotos[photo.id]
                              ? "opacity-100 scale-100"
                              : "opacity-50 scale-105"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Landscape Orientation: Title & Description on TOP of Picture */
                  <div className="flex flex-col space-y-4 w-full text-left">
                    {/* Top: Title & Description */}
                    <div className="space-y-1 text-left max-w-2xl">
                      <span className="text-xs font-semibold uppercase tracking-widest text-[#86868B] dark:text-[#8E8E93] block">
                        {photo.location || "Penang, Malaysia"}
                      </span>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight leading-tight text-left">
                        {editorial.title}
                      </h3>
                      <p className="text-base sm:text-lg text-[#6E6E73] dark:text-[#8E8E93] font-normal leading-relaxed text-left">
                        {editorial.subtitle}
                      </p>
                    </div>

                    {/* Below: Landscape Photo Media */}
                    <div
                      onClick={() => onSelectPhoto(photo)}
                      className="relative w-full aspect-[16/9] sm:aspect-[2.2/1] rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.07)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.55)] cursor-pointer group bg-[#E8E8ED] dark:bg-[#1C1C1E]"
                    >
                      <Image
                        src={photo.imageSrc}
                        alt={photo.altText}
                        fill
                        priority={idx === 0}
                        placeholder="blur"
                        blurDataURL={APPLE_PHOTO_BLUR_DATA_URL}
                        sizes="(max-width: 768px) 90vw, 1100px"
                        onLoad={() =>
                          setLoadedPhotos((prev) => ({ ...prev, [photo.id]: true }))
                        }
                        className={`object-cover object-center transition-[transform,opacity] duration-500 ease-out group-hover:scale-[1.02] will-change-transform ${
                          idx === 0 || loadedPhotos[photo.id]
                            ? "opacity-100 scale-100"
                            : "opacity-50 scale-105"
                        }`}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Centered Apple Highlights Carousel Controller (No Chevron Clutter) */}
      <div className="mt-6 sm:mt-8 flex items-center justify-center">
        <AppleCarouselController
          itemCount={spotlightPhotos.length}
          activeIndex={activeIndex}
          onSelectIndex={setActiveIndex}
          slideDuration={5500}
          ariaLabel="Photography highlights scrub controller"
        />
      </div>
    </section>
  );
}
