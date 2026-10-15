"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Image as ImageIcon, Camera } from "lucide-react";

export interface ProjectImageProps {
  src: string;
  alt: string;
  placeholderLabel?: string;
  ratioText?: string;
  className?: string;
  priority?: boolean;
  type?: "photo" | "screenshot" | "portrait";
  objectPosition?: string;
  seamless?: boolean;
  onDimensionsLoad?: (aspectRatio: string, width: number, height: number) => void;
}

export default function ProjectImage({
  src,
  alt,
  placeholderLabel,
  ratioText,
  className = "",
  priority = false,
  type = "screenshot",
  objectPosition,
  seamless = false,
  onDimensionsLoad,
}: ProjectImageProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const checkImageComplete = useCallback(
    (img: HTMLImageElement | null) => {
      if (!img) return;
      imgRef.current = img;
      if (img.complete && img.naturalWidth > 0 && !imageLoaded) {
        setImageLoaded(true);
        if (onDimensionsLoad) {
          onDimensionsLoad(
            `${img.naturalWidth}/${img.naturalHeight}`,
            img.naturalWidth,
            img.naturalHeight,
          );
        }
      }
    },
    [imageLoaded, onDimensionsLoad],
  );

  const defaultClasses =
    type === "portrait"
      ? "object-contain object-bottom"
      : "object-cover object-center";

  const containerBg = seamless
    ? "bg-transparent border-transparent"
    : "bg-gradient-to-b from-[#FAFAFA] to-[#EDEDF0] dark:from-[#1C1C1E] dark:to-[#121214]";

  const isReady = priority || imageLoaded;

  return (
    <div
      className={`relative ${
        seamless ? "overflow-visible" : "overflow-hidden"
      } transition-all duration-300 rounded-[inherit] ${containerBg} ${className}`}
    >
      {/* Hardware-accelerated Apple Shimmer Placeholder while image is loading */}
      {!imageLoaded && !imageError && src && !seamless && (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 bg-[#E8E8ED] dark:bg-[#18181A] flex items-center justify-center overflow-hidden pointer-events-none rounded-[inherit]"
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-black/[0.04] dark:via-white/[0.06] to-transparent animate-pulse" />
        </div>
      )}

      {/* Real image if present in public/images/ */}
      {!imageError && src && (
        <Image
          ref={checkImageComplete}
          src={src}
          alt={alt}
          fill
          priority={priority}
          placeholder="empty"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 420px"
          style={{ objectFit: type === "portrait" ? "contain" : "cover" }}
          className={`${objectPosition || defaultClasses} ${
            seamless
              ? "drop-shadow-[0_24px_42px_rgba(0,0,0,0.22)] drop-shadow-[0_8px_16px_rgba(0,0,0,0.12)] dark:drop-shadow-[0_20px_50px_rgba(255,255,255,0.08)] dark:drop-shadow-[0_4px_12px_rgba(255,255,255,0.04)] opacity-100"
              : `transition-opacity duration-300 ease-out will-change-opacity ${
                  isReady
                    ? "opacity-100"
                    : "opacity-0"
                }`
          } rounded-[inherit]`}
          onLoad={(e) => {
            setImageLoaded(true);
            const img = e.currentTarget;
            if (img.naturalWidth && img.naturalHeight && onDimensionsLoad) {
              onDimensionsLoad(
                `${img.naturalWidth}/${img.naturalHeight}`,
                img.naturalWidth,
                img.naturalHeight,
              );
            }
          }}
          onError={() => setImageError(true)}
        />
      )}

      {/* Styled Apple-like placeholder state ONLY if image truly failed to load or no src */}
      {(imageError || !src) && (
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none rounded-[inherit] transition-colors duration-200 ${
            seamless
              ? "bg-transparent border-transparent"
              : "bg-[#F5F5F7] dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#2C2C2E]"
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#2C2C2E] border border-[#E5E5EA] dark:border-[#3A3A3C] shadow-xs flex items-center justify-center mb-3.5 text-[#6E6E73] dark:text-[#A1A1A6]">
            {type === "photo" ? (
              <Camera className="w-5 h-5 stroke-[1.5]" />
            ) : (
              <ImageIcon className="w-5 h-5 stroke-[1.5]" />
            )}
          </div>
          {placeholderLabel && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 dark:bg-[#2C2C2E]/90 border border-[#E5E5EA] dark:border-[#3A3A3C] text-[12px] font-medium text-[#1D1D1F] dark:text-[#F5F5F7] shadow-2xs mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3]"></span>
              {placeholderLabel}
            </div>
          )}
          {ratioText && (
            <p className="text-[11px] text-[#6E6E73] dark:text-[#A1A1A6] tracking-normal font-sans max-w-[220px]">
              {ratioText}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
