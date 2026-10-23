"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const ROUND =
  "flex items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-white/20 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

/**
 * The site's full-size image viewer, matching the photo preview: a dark blurred backdrop, a counter
 * and a close button along the top, and previous and next buttons when the image belongs to a set.
 * Esc, the close button or a click outside closes it. The arrow keys and a swipe move through the set.
 */
export default function ImageLightbox({
  src,
  alt,
  onClose,
  index,
  count,
  onPrev,
  onNext,
  caption,
}: {
  src: string;
  alt: string;
  onClose: () => void;
  /** Zero-based position in the set, shown as "2 / 5" next to `count`. */
  index?: number;
  count?: number;
  onPrev?: () => void;
  onNext?: () => void;
  /** Text under the image, such as a title and description. */
  caption?: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const dialog = ref.current;
    dialog?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
      dialog?.close();
    };
  }, []);

  return (
    <dialog
      ref={ref}
      aria-label={alt}
      // React's dev double-run closes and reopens the dialog; that first, stale "close" event
      // must not unmount it, so only a dialog that is really closed counts.
      onClose={() => {
        if (!ref.current?.open) onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" && onPrev) onPrev();
        else if (event.key === "ArrowRight" && onNext) onNext();
      }}
      onTouchStart={(event) => {
        touchX.current = event.touches[0].clientX;
      }}
      onTouchEnd={(event) => {
        if (touchX.current === null) return;
        const dx = event.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) < 60) return;
        if (dx > 0) onPrev?.();
        else onNext?.();
      }}
      className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none overflow-hidden bg-transparent p-0 text-white backdrop:bg-black/90 backdrop:backdrop-blur-2xl animate-in fade-in duration-200"
    >
      <div
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
        className="relative flex h-full w-full flex-col items-center justify-center gap-5 p-3 sm:p-8"
      >
        <div className="pointer-events-none absolute left-4 right-4 top-4 flex items-center justify-between sm:left-8 sm:right-8 sm:top-6">
          {count !== undefined && index !== undefined ? (
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold tabular-nums tracking-wide text-white/80 shadow-md backdrop-blur-md">
              {index + 1} / {count}
            </span>
          ) : (
            <span />
          )}
          <button type="button" onClick={onClose} aria-label="Close preview" className={`pointer-events-auto h-10 w-10 ${ROUND}`}>
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {onPrev && (
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous"
            className={`absolute left-2 top-1/2 z-10 h-11 w-11 -translate-y-1/2 sm:left-6 ${ROUND}`}
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
        {onNext && (
          <button
            type="button"
            onClick={onNext}
            aria-label="Next"
            className={`absolute right-2 top-1/2 z-10 h-11 w-11 -translate-y-1/2 sm:right-6 ${ROUND}`}
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        )}

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={src}
          src={src}
          alt={alt}
          className={`animate-in fade-in rounded-2xl border border-white/15 object-contain shadow-2xl duration-300 max-w-[88vw] sm:max-w-[84vw] ${
            caption ? "max-h-[calc(100vh-15rem)]" : "max-h-[calc(100vh-7rem)]"
          }`}
        />
        {caption && <div className="max-w-2xl px-12 text-center sm:px-0">{caption}</div>}
      </div>
    </dialog>
  );
}
