"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, MapPin, RotateCw, ZoomIn, ZoomOut, Camera, Info } from "lucide-react";
import type { PhotoItem } from "@/types";
import { PHOTO_SPECS, type PhotoExifSpec } from "@/data/content";

const DEFAULT_SPEC: PhotoExifSpec = {
  camera: "iPhone 16 Pro",
  focalLength: "24 mm Fusion (1x)",
  aperture: "ƒ/1.78",
  shutterSpeed: "1/250s",
  iso: "100",
  filmStock: "Apple ProRAW",
  metering: "Center-Weighted",
  lighting: "Natural Ambient",
  darkroomNote:
    "Captured with computational mobile optics balancing highlight roll-off and dynamic range.",
};

interface PhotoPreviewModalProps {
  photo: PhotoItem | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  currentIndex?: number;
  totalCount?: number;
}

const emptySubscribe = () => () => {};

export default function PhotoPreviewModal({
  photo,
  onClose,
  onNext,
  onPrev,
  currentIndex,
  totalCount,
}: PhotoPreviewModalProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [prevPhotoId, setPrevPhotoId] = useState(photo?.id);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const isOpen = Boolean(photo);
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  // Reset flip, zoom, and loaded state whenever photo changes
  if (photo?.id !== prevPhotoId) {
    setPrevPhotoId(photo?.id);
    setIsFlipped(false);
    setIsZoomed(false);
    setIsImageLoaded(false);
  }

  // Fast-path for already cached browser images
  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setIsImageLoaded(true);
    }
  }, [photo?.id]);

  // Touch gesture swipe handling for fluid mobile browsing
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isZoomed) return;
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isZoomed || touchStartXRef.current === null || touchStartYRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;

    touchStartXRef.current = null;
    touchStartYRef.current = null;

    // Detect intentional horizontal swipe (ignore vertical scrolling)
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
      if (deltaX < 0 && onNext) {
        // Swiped left -> advance to next photo
        setIsFlipped(false);
        setIsZoomed(false);
        onNext();
      } else if (deltaX > 0 && onPrev) {
        // Swiped right -> go to previous photo
        setIsFlipped(false);
        setIsZoomed(false);
        onPrev();
      }
    }
  };

  const handleTouchCancel = () => {
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  // Move focus into the dialog when it opens and hand it back to the opener on close
  useEffect(() => {
    if (!isOpen || !mounted) return;
    const opener = document.activeElement as HTMLElement | null;
    dialogRef.current?.querySelector<HTMLElement>('[aria-label="Close preview"]')?.focus();
    return () => opener?.focus?.();
  }, [isOpen, mounted]);

  useEffect(() => {
    if (!photo) return;

    // Explicitly hide the navbar while preview is open
    const nav = document.querySelector("header");
    const originalNavDisplay = nav ? nav.style.display : "";
    if (nav) nav.style.display = "none";

    // Lock body scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        // Keep Tab inside the dialog
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        } else if (!dialogRef.current?.contains(active)) {
          e.preventDefault();
          first.focus();
        }
      } else if (e.key === "Escape") {
        if (isZoomed) {
          setIsZoomed(false);
        } else {
          onClose();
        }
      } else if (e.key === "ArrowRight" && onNext) {
        setIsFlipped(false);
        setIsZoomed(false);
        onNext();
      } else if (e.key === "ArrowLeft" && onPrev) {
        setIsFlipped(false);
        setIsZoomed(false);
        onPrev();
      } else if (e.key.toLowerCase() === "f") {
        setIsZoomed(false);
        setIsFlipped((prev) => !prev);
      } else if (e.key.toLowerCase() === "z") {
        setIsZoomed((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      if (nav) nav.style.display = originalNavDisplay;
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [photo, onClose, onNext, onPrev, isZoomed]);

  if (!mounted || !photo) return null;

  const spec = PHOTO_SPECS[photo.id] || DEFAULT_SPEC;

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={photo.title || "Photo Preview"}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/92 backdrop-blur-2xl animate-in fade-in duration-200 select-none overflow-hidden touch-pan-y"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Top Header Bar: Counter, Zoom Loupe & Close Button */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between z-30 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          {totalCount !== undefined && currentIndex !== undefined && (
            <span className="text-xs font-semibold tracking-wide tabular-nums text-white/80 bg-white/10 px-3 py-1.5 rounded-full border border-white/15 backdrop-blur-md shadow-md">
              {currentIndex + 1} / {totalCount}
            </span>
          )}
          {!isFlipped && (
            <button
              type="button"
              onClick={() => setIsZoomed((prev) => !prev)}
              aria-label={isZoomed ? "Reset zoom" : "Zoom 100% detail"}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white text-xs font-medium backdrop-blur-md transition-colors border border-white/15 shadow-md cursor-pointer"
            >
              {isZoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isZoomed ? "Fit screen" : "100% Loupe"}</span>
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close preview"
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-colors border border-white/20 cursor-pointer pointer-events-auto shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Prev Navigation Button - Responsive & touch accessible */}
      {onPrev && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsFlipped(false);
            onPrev();
          }}
          aria-label="Previous photo"
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 min-h-[44px] min-w-[44px] rounded-full bg-black/50 hover:bg-black/75 sm:bg-white/10 sm:hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 border border-white/20 sm:border-white/15 cursor-pointer z-30 shadow-xl hover:scale-105 active:scale-95"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {/* Next Navigation Button - Responsive & touch accessible */}
      {onNext && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsFlipped(false);
            onNext();
          }}
          aria-label="Next photo"
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 min-h-[44px] min-w-[44px] rounded-full bg-black/50 hover:bg-black/75 sm:bg-white/10 sm:hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 border border-white/20 sm:border-white/15 cursor-pointer z-30 shadow-xl hover:scale-105 active:scale-95"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      {/* Main Flipping Image Frame */}
      <div
        className="relative flex flex-col items-center justify-center max-h-[96vh] max-w-[92vw] mx-auto z-20 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 3D Perspective Card Wrapper */}
        <div className="perspective-1200 relative inline-flex items-center justify-center">
          <div
            className={`relative transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] preserve-3d ${
              isFlipped ? "rotate-y-180" : ""
            }`}
          >
            {/* Front Face: Photograph */}
            <div className="relative backface-hidden rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-[#121214] flex items-center justify-center min-w-[280px] sm:min-w-[360px] min-h-[260px] sm:min-h-[320px]">
              {/* Skeleton Shimmer while master image loads */}
              {!isImageLoaded && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#151518] pointer-events-none select-none">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-2 border-white/10 border-t-white/70 animate-spin" />
                    <Camera className="w-5 h-5 text-white/40" />
                  </div>
                  <span className="text-[11px] font-medium text-white/50 mt-3 tracking-wide animate-pulse">
                    Loading Archival Master...
                  </span>
                </div>
              )}

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imgRef}
                src={photo.imageSrc}
                alt={photo.altText}
                style={{ objectFit: "contain" }}
                onLoad={() => setIsImageLoaded(true)}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsZoomed((prev) => !prev);
                }}
                className={`max-h-[calc(100vh-210px)] sm:max-h-[calc(100vh-220px)] max-w-[88vw] sm:max-w-[80vw] w-auto h-auto object-contain block select-none transition-all duration-500 ease-out ${
                  isImageLoaded
                    ? "opacity-100 scale-100 blur-0"
                    : "opacity-0 scale-[0.98] blur-sm"
                } ${
                  isZoomed ? "scale-[1.65] cursor-zoom-out" : "cursor-zoom-in"
                }`}
                title={isZoomed ? "Click to reset zoom" : "Click to inspect 100% detail"}
              />

              {/* Tactile Photo Details Button on the photograph */}
              {!isZoomed && isImageLoaded && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(true);
                  }}
                  className="group absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/65 hover:bg-black/85 text-white/90 hover:text-white text-[12px] font-medium backdrop-blur-md border border-white/20 transition-all duration-200 cursor-pointer shadow-lg hover:scale-105 z-10"
                  title="View camera specifications and optical details"
                >
                  <Info className="w-3.5 h-3.5 text-white/70 group-hover:text-white transition-colors" />
                  <span className="tracking-tight">Photo Details</span>
                </button>
              )}
            </div>

            {/* Back Face: Archival Darkroom Print Card */}
            <div
              onClick={() => setIsFlipped(false)}
              className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl sm:rounded-3xl overflow-y-auto shadow-2xl border border-white/20 bg-[#121214] text-white p-4 sm:p-6 md:p-8 flex flex-col justify-between cursor-pointer select-none max-w-[620px] mx-auto"
            >
              {/* Top Darkroom Header Bar */}
              <div className="flex items-center justify-between pb-3.5 sm:pb-4 border-b border-white/10 text-[11px] sm:text-xs font-medium tracking-wide text-white/70">
                <div className="flex items-center gap-2">
                  <div className="relative w-5 h-5 shrink-0">
                    <Image
                      src="/images/devices/iphone-16-pro-desert-titanium.png"
                      alt="iPhone 16 Pro Camera"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-white/90 font-medium">
                    {spec.camera} · Desert Titanium
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-white/10 text-white/90 text-[10px] sm:text-[11px]">
                  {photo.location || "Penang Malaysia"}
                </span>
              </div>

              {/* Middle Specs & Notes */}
              <div className="my-auto py-3 sm:py-4 space-y-3.5 sm:space-y-4">
                {/* Title */}
                <div>
                  <span className="text-[10px] font-semibold tracking-wider text-white/65 uppercase block mb-1">
                    Photo Title
                  </span>
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white tracking-tight">
                    {photo.title || "Untitled Photograph"}
                  </h3>
                </div>

                {/* Grid of Camera & Lens Parameters */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 py-2 border-y border-white/10">
                  <div className="bg-white/5 rounded-xl p-2 sm:p-2.5 border border-white/5">
                    <span className="text-[10px] font-semibold tracking-wider text-white/70 block mb-0.5">
                      Optics
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-white block truncate">
                      {spec.focalLength}
                    </span>
                  </div>

                  <div className="bg-white/5 rounded-xl p-2 sm:p-2.5 border border-white/5">
                    <span className="text-[10px] font-semibold tracking-wider text-white/70 block mb-0.5">
                      Aperture
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-white block">
                      {spec.aperture}
                    </span>
                  </div>

                  <div className="bg-white/5 rounded-xl p-2 sm:p-2.5 border border-white/5">
                    <span className="text-[10px] font-semibold tracking-wider text-white/70 block mb-0.5">
                      Shutter
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-white block">
                      {spec.shutterSpeed}
                    </span>
                  </div>

                  <div className="bg-white/5 rounded-xl p-2 sm:p-2.5 border border-white/5">
                    <span className="text-[10px] font-semibold tracking-wider text-white/70 block mb-0.5">
                      ISO
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-white block">
                      {spec.iso}
                    </span>
                  </div>
                </div>

                {/* Film Profile & Metering */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/5">
                    <span className="text-white/70 font-medium text-[10px] sm:text-[11px]">Capture Pipeline</span>
                    <span className="text-white/90 font-medium truncate ml-2">{spec.filmStock}</span>
                  </div>
                  <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/5">
                    <span className="text-white/70 font-medium text-[10px] sm:text-[11px]">Metering</span>
                    <span className="text-white/90 font-medium truncate ml-2">{spec.metering}</span>
                  </div>
                </div>

                {/* Darkroom Field Observation */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[10px] font-semibold tracking-wider text-white/70 block mb-1 uppercase">
                    Field Observation
                  </span>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
                    {spec.darkroomNote}
                  </p>
                </div>
              </div>

              {/* Bottom Archival Stamp */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/70">
                <div className="flex items-center gap-2">
                  <span className="font-semibold uppercase tracking-wider text-white/80 text-[10px] sm:text-[11px]">
                    Photographed by Sri Tulasi Ram
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors">
                  <RotateCw className="w-3 h-3" />
                  <span className="text-[11px]">Back to Photo</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Capsule Below Image (Only when viewing photograph on front face, not zoomed) */}
        {!isFlipped && !isZoomed && (photo.title || photo.description || photo.location) && (
          <div className="mt-2.5 sm:mt-3 px-4 sm:px-6 py-2 sm:py-2.5 rounded-2xl bg-black/60 dark:bg-[#18181A]/85 border border-white/15 backdrop-blur-xl text-center max-w-lg w-full space-y-1 shadow-2xl animate-in fade-in duration-200 shrink-0">
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {photo.title && (
                <h3 className="text-xs sm:text-sm font-semibold text-white tracking-tight">
                  {photo.title}
                </h3>
              )}
              {photo.location && (
                <span className="text-[11px] text-white/80 font-medium flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-white/60 shrink-0" />
                  <span>{photo.location}</span>
                </span>
              )}
              {spec && (
                <span className="text-[10px] font-medium text-white/65 px-2 py-0.5 rounded-full bg-white/10 shrink-0 tabular-nums">
                  {spec.focalLength.split(" ")[0]} · {spec.aperture}
                </span>
              )}
            </div>
            {photo.description && (
              <p className="text-[11px] sm:text-xs text-white/75 leading-relaxed line-clamp-2">
                {photo.description}
              </p>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

