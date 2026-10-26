"use client";

import { useState, useEffect, useCallback } from "react";
import {
  MapPin,
  Expand,
  Camera,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import ProjectImage from "@/components/ui/ProjectImage";
import { photoThumb } from "@/lib/photoThumb";
import PhotoPreviewModal from "./PhotoPreviewModal";
import type { PhotoItem, PhotoAlbumId } from "@/types";
import { PHOTO_ALBUMS, PHOTO_SPECS } from "@/data/content";

interface PhotographyGalleryProps {
  photos: PhotoItem[];
}

/**
 * Modern Apple Photography Gallery:
 * Option 1: "Curated Days" Mosaic Architecture
 * - Celebrates authentic 3:4 vertical iPhone portrait photography (zero horizontal letterbox cropping)
 * - Curated Editorial View: Alternates prominent 2-column Hero Portraits with 2x2 compact companion quads and rhythmic ribbons
 * - Library Grid View: Uniform 4-column catalog for rapid visual scanning
 * - Automated Fisher-Yates randomization on every initial page visit / refresh
 */
export default function PhotographyGallery({ photos }: PhotographyGalleryProps) {
  const [selectedAlbum, setSelectedAlbum] = useState<PhotoAlbumId>("all");
  const [previewPhoto, setPreviewPhoto] = useState<PhotoItem | null>(null);
  const [shuffledPhotos, setShuffledPhotos] = useState<PhotoItem[]>(photos);

  // Fisher-Yates shuffle algorithm
  const performShuffle = useCallback((sourceList: PhotoItem[]) => {
    const list = [...sourceList];
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  }, []);

  // Randomize photo sequence on each page visit / refresh
  useEffect(() => {
    setShuffledPhotos(performShuffle(photos));
  }, [photos, performShuffle]);

  const filteredPhotos = shuffledPhotos.filter(
    (p) => selectedAlbum === "all" || p.album === selectedAlbum
  );

  const handleOpenPreview = (photo: PhotoItem) => {
    setPreviewPhoto(photo);
  };

  const handleClosePreview = () => {
    setPreviewPhoto(null);
  };

  const handleNextPhoto = () => {
    if (!previewPhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === previewPhoto.id);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setPreviewPhoto(filteredPhotos[nextIndex]);
  };

  const handlePrevPhoto = () => {
    if (!previewPhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === previewPhoto.id);
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setPreviewPhoto(filteredPhotos[prevIndex]);
  };

  // Reusable Photo Card Renderer
  const renderPhotoCard = (photo: PhotoItem, isHero: boolean = false) => {
    const spec = PHOTO_SPECS[photo.id];

    if (isHero) {
      // -----------------------------------------------------------
      // HERO PORTRAIT CARD: Immersive, uncropped 3:4 exhibition frame
      // -----------------------------------------------------------
      return (
        <div key={photo.id} className="flex flex-col space-y-3 text-left">
          <div
            role="button"
            tabIndex={0}
            onClick={() => handleOpenPreview(photo)}
            aria-label={`View ${photo.title}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleOpenPreview(photo);
              }
            }}
            className="group aspect-[3/4] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#F5F5F7] dark:bg-[#151518] border border-black/[0.05] dark:border-white/[0.08] apple-card-shadow cursor-pointer relative select-none"
          >
            <ProjectImage
              src={photoThumb(photo.imageSrc)}
              alt={photo.altText}
              placeholderLabel={photo.placeholderLabel}
              ratioText="High-Res Portrait"
              type="photo"
              className="w-full h-full pointer-events-none transition-transform duration-700 ease-out group-hover:scale-[1.015]"
            />

            {/* Desktop Hover Overlay with Loupe Affordance */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 sm:p-6 pointer-events-none">
              <div className="space-y-1.5 text-left">
                {photo.location && (
                  <span className="text-xs font-medium text-white/90 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{photo.location}</span>
                  </span>
                )}
                <h4 className="text-lg sm:text-xl font-semibold text-white tracking-tight leading-snug">
                  {photo.title}
                </h4>
                {photo.description && (
                  <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">
                    {photo.description}
                  </p>
                )}
                {spec && (
                  <div className="pt-0.5 flex items-center gap-1.5 text-[11px] font-medium text-white/80 tabular-nums">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-white/80 shrink-0" />
                    <span>{spec.focalLength} · {spec.aperture} · {spec.shutterSpeed}</span>
                  </div>
                )}
                <div className="pt-0.5 flex items-center gap-1.5 text-[11px] font-medium text-white/90">
                  <Expand className="w-3.5 h-3.5 text-white/80 shrink-0" />
                  <span>View photo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Narrative Typography */}
          <div className="space-y-1.5 px-0.5">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[#1D1D1F] dark:text-[#F5F5F7] bg-black/[0.05] dark:bg-white/[0.08] px-2 py-0.5 rounded-full">
                  <Sparkles className="w-2.5 h-2.5" />
                  Featured
                </span>
                {photo.location && (
                  <span className="text-xs text-[#6E6E73] dark:text-[#8E8E93] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#6E6E73] dark:text-[#8E8E93] shrink-0" />
                    <span>{photo.location}</span>
                  </span>
                )}
              </div>

              {spec && (
                <span className="text-[11px] font-medium text-[#86868B] dark:text-[#8E8E93] px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] tabular-nums">
                  {spec.focalLength.split(" ")[0]} · {spec.aperture}
                </span>
              )}
            </div>

            <h3 className="text-lg sm:text-xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
              {photo.title}
            </h3>

            {photo.description && (
              <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed line-clamp-2">
                {photo.description}
              </p>
            )}
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------
    // COMPANION / CATALOG CARD: Compact 3:4 vertical thumbnail
    // -------------------------------------------------------------
    return (
      <div key={photo.id} className="flex flex-col space-y-2 text-left">
        <div
          role="button"
          tabIndex={0}
          onClick={() => handleOpenPreview(photo)}
          aria-label={`View ${photo.title}`}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleOpenPreview(photo);
            }
          }}
          className="group aspect-[3/4] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#F5F5F7] dark:bg-[#151518] border border-black/[0.04] dark:border-white/[0.08] apple-card-shadow cursor-pointer relative select-none"
        >
          <ProjectImage
            src={photoThumb(photo.imageSrc)}
            alt={photo.altText}
            placeholderLabel={photo.placeholderLabel}
            ratioText="High-Res Portrait"
            type="photo"
            className="w-full h-full pointer-events-none transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />

          {/* Desktop Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5 sm:p-4 pointer-events-none">
            <div className="space-y-1 text-left">
              {photo.location && (
                <span className="text-[10px] font-medium text-white/90 flex items-center gap-1">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span className="truncate">{photo.location}</span>
                </span>
              )}
              <h4 className="text-xs sm:text-sm font-semibold text-white tracking-tight leading-snug truncate">
                {photo.title}
              </h4>
            </div>
          </div>
        </div>

        {/* Caption Row */}
        <div className="px-0.5 flex items-center justify-between text-left gap-1.5 min-h-[30px]">
          <div className="min-w-0">
            <h4 className="text-xs sm:text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] truncate tracking-tight">
              {photo.title}
            </h4>
            {photo.location && (
              <p className="text-[10px] sm:text-[11px] text-[#6E6E73] dark:text-[#8E8E93] flex items-center gap-1 truncate">
                <MapPin className="w-2.5 h-2.5 text-[#6E6E73] dark:text-[#8E8E93] shrink-0" />
                <span className="truncate">{photo.location}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  /**
   * Editorial Mosaic Generator:
   * Dynamically groups 3:4 vertical portraits into Apple "Curated Days" blocks:
   * - Block A: Large Hero Portrait Left (2 cols) + 4 Compact Portraits Right (2x2 quad, matching height)
   * - Block B: 4-across Compact Ribbon
   * - Block C: 4 Compact Portraits Left (2x2 quad) + Large Hero Portrait Right (2 cols)
   */
  const renderEditorialMosaic = (items: PhotoItem[]) => {
    const blocks: React.ReactNode[] = [];
    let cursor = 0;
    let blockIndex = 0;

    while (cursor < items.length) {
      const remaining = items.length - cursor;

      // When fewer than 5 items remain, render a balanced tail grid
      if (remaining < 5) {
        const chunk = items.slice(cursor);
        blocks.push(
          <div
            key={`tail-${cursor}`}
            className={`grid gap-4 sm:gap-5 ${
              chunk.length === 1
                ? "grid-cols-1 max-w-sm mx-auto"
                : chunk.length === 2
                ? "grid-cols-2 max-w-2xl mx-auto"
                : chunk.length === 3
                ? "grid-cols-1 sm:grid-cols-3"
                : "grid-cols-2 sm:grid-cols-4"
            }`}
          >
            {chunk.map((photo) => renderPhotoCard(photo, chunk.length === 1))}
          </div>
        );
        break;
      }

      // Alternating Apple Story Cadence
      const pattern = blockIndex % 3;

      if (pattern === 0 && remaining >= 5) {
        // Pattern A: Large Hero Left (2 cols) + 2x2 Quad of Compact Portraits Right (2 cols)
        const hero = items[cursor];
        const quad = items.slice(cursor + 1, cursor + 5);
        cursor += 5;

        blocks.push(
          <div
            key={`mosaic-hero-left-${blockIndex}`}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-5 items-start [content-visibility:auto] [contain-intrinsic-size:auto_650px]"
          >
            <div className="md:col-span-2">
              {renderPhotoCard(hero, true)}
            </div>
            <div className="md:col-span-2 grid grid-cols-2 gap-4 sm:gap-5">
              {quad.map((p) => renderPhotoCard(p, false))}
            </div>
          </div>
        );
      } else if (pattern === 1 && remaining >= 4) {
        // Pattern B: 4-across Ribbon (Pure visual rhythm)
        const ribbon = items.slice(cursor, cursor + 4);
        cursor += 4;

        blocks.push(
          <div
            key={`mosaic-ribbon-${blockIndex}`}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 [content-visibility:auto] [contain-intrinsic-size:auto_350px]"
          >
            {ribbon.map((p) => renderPhotoCard(p, false))}
          </div>
        );
      } else {
        // Pattern C: 2x2 Quad of Compact Portraits Left + Large Hero Right (2 cols)
        const quad = items.slice(cursor, cursor + 4);
        const hero = items[cursor + 4];
        cursor += 5;

        blocks.push(
          <div
            key={`mosaic-hero-right-${blockIndex}`}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-5 items-start [content-visibility:auto] [contain-intrinsic-size:auto_650px]"
          >
            <div className="md:col-span-2 grid grid-cols-2 gap-4 sm:gap-5 order-2 md:order-1">
              {quad.map((p) => renderPhotoCard(p, false))}
            </div>
            <div className="md:col-span-2 order-1 md:order-2">
              {renderPhotoCard(hero, true)}
            </div>
          </div>
        );
      }

      blockIndex++;
    }

    return <div className="space-y-8 sm:space-y-12">{blocks}</div>;
  };

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Heading and album filter chips */}
      <div id="gallery" className="text-center scroll-mt-24">
        <h2
          id="gallery-title"
          className="text-3xl sm:text-5xl font-semibold tracking-apple-headline leading-[1.08] text-[#1D1D1F] dark:text-[#F5F5F7]"
        >
          Every frame.
          <span className="block text-[#6E6E73] dark:text-[#8E8E93]">Browse by place and light.</span>
        </h2>

        <div role="tablist" aria-label="Photography albums" className="mt-8 flex flex-wrap justify-center gap-2">
          {PHOTO_ALBUMS.map((album) => {
            const on = album.id === selectedAlbum;
            return (
              <button
                key={album.id}
                role="tab"
                aria-selected={on}
                onClick={() => setSelectedAlbum(album.id)}
                className={`px-4 min-h-[44px] rounded-full text-sm font-medium transition-colors cursor-pointer ${
                  on
                    ? "bg-[#1D1D1F] text-white dark:bg-[#F5F5F7] dark:text-[#1D1D1F]"
                    : "bg-[#F5F5F7] text-[#1D1D1F] hover:bg-[#E8E8ED] dark:bg-[#1C1C1E] dark:text-[#F5F5F7] dark:hover:bg-[#2C2C2E]"
                }`}
              >
                {album.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Photo Gallery Display */}
      {filteredPhotos.length > 0 ? (
        <div
          key={`${selectedAlbum}-${filteredPhotos.map((p) => p.id).slice(0, 3).join("-")}`}
          className="animate-in fade-in duration-300"
        >
          {renderEditorialMosaic(filteredPhotos)}
        </div>
      ) : (
        <div className="py-20 text-center space-y-3 p-8 rounded-3xl bg-[#FAFAFA] dark:bg-[#121214] border border-[#E5E5EA] dark:border-white/[0.08] apple-card-shadow max-w-md mx-auto">
          <Camera className="w-8 h-8 mx-auto text-[#86868B] dark:text-[#8E8E93]" />
          <h3 className="text-base font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">No photos here yet</h3>
          <p className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
            This album doesn’t have any photos yet.
          </p>
        </div>
      )}

      {/* 3. Lightbox Preview Modal */}
      <PhotoPreviewModal
        photo={previewPhoto}
        onClose={handleClosePreview}
        onNext={handleNextPhoto}
        onPrev={handlePrevPhoto}
        currentIndex={
          previewPhoto
            ? filteredPhotos.findIndex((p) => p.id === previewPhoto.id)
            : undefined
        }
        totalCount={filteredPhotos.length}
      />
    </div>
  );
}
