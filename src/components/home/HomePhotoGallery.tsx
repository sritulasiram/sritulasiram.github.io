"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import FadeImage from "@/components/shared/FadeImage";
import { photoPlaceholderStyle } from "@/lib/photoPlaceholder";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PhotoPreviewModal from "@/components/photography/PhotoPreviewModal";
import AppleCarouselController from "@/components/ui/AppleCarouselController";
import { PHOTOGRAPHY_DATA } from "@/data/content";
import type { PhotoItem } from "@/types";
import { GRAY, INK } from "./homeShared";

const PHOTOS = PHOTOGRAPHY_DATA.slice(0, 8);
const N = PHOTOS.length;
/** Three copies of the photos side by side. You always sit in the middle one; see `settle`. */
const SLIDES = [...PHOTOS, ...PHOTOS, ...PHOTOS];
/** How long the row has to be still before it counts as settled. */
const SETTLE_MS = 140;
/** How far a photo one place from the centre shrinks and fades. */
const SIDE_SCALE = 0.88;
const SIDE_OPACITY = 0.55;

/**
 * A "Shot on iPhone" gallery: one photo at a time, centred, with its neighbours peeking in smaller at either side.
 * It snaps as you swipe or scroll sideways, loops endlessly in both directions, and advances on its own with the
 * Apple-style dot pill (hovering, touching or opening a photo holds it). The active photo's title, place and camera
 * settings sit underneath. Tap a side photo to bring it to the centre, or the centre photo to open the full-size
 * viewer; the arrow keys and the side arrows step through it too.
 *
 * Each photo's size and fade are worked out from its distance to the centre on every scroll frame and written
 * straight to the DOM, so they follow your finger (or the smooth scroll) exactly, with no separate CSS animation to
 * fall out of step with it.
 */
export default function HomePhotoGallery() {
  const track = useRef<HTMLDivElement>(null);
  /** Index into SLIDES of the card nearest the centre. */
  const [abs, setAbs] = useState(N);
  const absRef = useRef(N);
  /** Where a button or autoplay is currently scrolling to, so repeated presses keep counting from there. */
  const targetRef = useRef<number | null>(null);
  const [preview, setPreview] = useState<PhotoItem | null>(null);
  const [hovered, setHovered] = useState(false);
  const [touching, setTouching] = useState(false);
  const touchingRef = useRef(false);
  /** Recomputes sizes and the centred card; set up in the effect below. */
  const paintRef = useRef<() => void>(() => {});

  const active = abs % N;

  const centreLeft = (el: HTMLElement, card: HTMLElement) => card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2;

  // Start centred on the first photo of the middle copy, before the first paint, so there are photos on both sides.
  useLayoutEffect(() => {
    const el = track.current;
    const card = el?.children[N] as HTMLElement | undefined;
    if (el && card) el.scrollLeft = centreLeft(el, card);
    paintRef.current();
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const cards = Array.from(el.children) as HTMLElement[];
    let raf = 0;
    let settleTimer: ReturnType<typeof setTimeout> | undefined;

    // offsetLeft ignores transforms, so reading it never fights the scale we write.
    const paint = () => {
      raf = 0;
      const mid = el.scrollLeft + el.clientWidth / 2;
      const pitch = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : 1;
      let best = 0;
      let bestDist = Infinity;
      for (let i = 0; i < cards.length; i++) {
        const c = cards[i];
        const dist = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
        const t = Math.min(1, dist / pitch);
        c.style.transform = `scale(${1 - (1 - SIDE_SCALE) * t})`;
        c.style.opacity = String(1 - (1 - SIDE_OPACITY) * t);
      }
      if (best !== absRef.current) {
        absRef.current = best;
        setAbs(best);
      }
    };
    paintRef.current = paint;

    // Once the row comes to rest in the first or last copy, jump by one copy's width to the same photo in the middle
    // copy. The copies are identical and every card is styled from its position, so the jump is invisible.
    const settle = () => {
      targetRef.current = null;
      if (touchingRef.current) return;
      const i = absRef.current;
      if (i >= N && i < 2 * N) return;
      const copy = cards[N].offsetLeft - cards[0].offsetLeft;
      el.scrollLeft += (i < N ? 1 : -1) * copy;
      paint();
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(paint);
      clearTimeout(settleTimer);
      settleTimer = setTimeout(settle, SETTLE_MS);
    };
    const onResize = () => {
      el.scrollLeft = centreLeft(el, cards[absRef.current]);
      paint();
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    paint();
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(settleTimer);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const goToAbs = useCallback((i: number) => {
    const el = track.current;
    const target = Math.max(0, Math.min(SLIDES.length - 1, i));
    const card = el?.children[target] as HTMLElement | undefined;
    if (!el || !card) return;
    targetRef.current = target;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: centreLeft(el, card), behavior: reduce ? "auto" : "smooth" });
  }, []);

  const from = () => targetRef.current ?? absRef.current;

  /** Go to a photo by its place in PHOTOS, taking the shortest way round (forwards on a tie, so autoplay wraps ahead). */
  const goToPhoto = useCallback(
    (index: number) => {
      const current = targetRef.current ?? absRef.current;
      let delta = (index - (current % N) + N) % N;
      if (delta > N / 2) delta -= N;
      goToAbs(current + delta);
    },
    [goToAbs],
  );

  const stepBy = (d: 1 | -1) => goToAbs(from() + d);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      stepBy(e.key === "ArrowRight" ? 1 : -1);
    }
  };

  const touch = (on: boolean) => {
    touchingRef.current = on;
    setTouching(on);
    if (on) targetRef.current = null;
    // A drag that ends at rest (no momentum) fires no more scroll events, so check for the loop jump here too.
    else track.current?.dispatchEvent(new Event("scroll"));
  };

  const previewStep = (direction: 1 | -1) => {
    if (!preview) return;
    const index = PHOTOGRAPHY_DATA.findIndex((p) => p.id === preview.id);
    setPreview(PHOTOGRAPHY_DATA[(index + direction + PHOTOGRAPHY_DATA.length) % PHOTOGRAPHY_DATA.length]);
  };

  const current = PHOTOS[active];
  const paddle =
    "absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#1D1D1F] shadow-sm backdrop-blur-xl transition-opacity duration-300 hover:bg-white focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] dark:bg-[#323236]/80 dark:text-white dark:hover:bg-[#3E3E42] lg:flex";

  return (
    <>
      <div
        className="relative [--slide:72vw] sm:[--slide:340px] lg:[--slide:360px]"
        onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
        onPointerLeave={(e) => e.pointerType === "mouse" && setHovered(false)}
      >
        <div
          ref={track}
          role="group"
          aria-roledescription="carousel"
          aria-label="Shot on iPhone gallery. Use the left and right arrow keys to move between photos."
          onKeyDown={onKeyDown}
          onTouchStart={() => touch(true)}
          onTouchEnd={() => touch(false)}
          onTouchCancel={() => touch(false)}
          className="relative -my-4 flex snap-x snap-mandatory items-center gap-3 overflow-x-auto overscroll-x-contain py-8 sm:gap-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          // Half the row minus half a card on each side, so any card can sit in the centre.
          style={{ paddingInline: "calc(50% - var(--slide) / 2)" }}
        >
          {SLIDES.map((photo, i) => {
            const isActive = i === abs;
            const isClone = i < N || i >= 2 * N;
            return (
              <button
                key={`${photo.id}-${i}`}
                type="button"
                onClick={() => (isActive ? setPreview(photo) : goToAbs(i))}
                tabIndex={isActive ? 0 : -1}
                aria-hidden={isClone && !isActive ? true : undefined}
                aria-label={`${isActive ? "Open photo" : "Show photo"} ${(i % N) + 1} of ${N}: ${photo.title ?? photo.altText}`}
                aria-current={isActive || undefined}
                // Starts at the side size, so nothing pops before the first paint() runs.
                style={{ transform: `scale(${SIDE_SCALE})`, opacity: SIDE_OPACITY }}
                className="group relative w-[var(--slide)] shrink-0 snap-center cursor-pointer overflow-hidden rounded-[28px] bg-[var(--pa-tint)] shadow-[0_20px_50px_-24px_rgba(0,0,0,0.45)] [will-change:transform,opacity] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]"
              >
                <div className="relative aspect-[3/4]" style={photoPlaceholderStyle(photo.imageSrc)}>
                  {/* The slide's neutral background is the placeholder; the photo fades in over it once loaded. */}
                  <FadeImage
                    src={photo.imageSrc}
                    alt={isClone ? "" : photo.altText}
                    fill
                    sizes="(max-width: 640px) 72vw, 360px"
                    draggable={false}
                    className={`select-none object-cover ${isActive ? "group-hover:scale-[1.04]" : ""}`}
                    style={{ transition: "opacity 0.5s ease-out, transform 1.2s ease-out, scale 1.2s ease-out" }}
                  />
                </div>
                {photo.focalLengthTag && (
                  <span
                    className={`absolute left-4 top-4 rounded-full bg-black/45 px-2.5 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur-md transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {photo.focalLengthTag}
                  </span>
                )}
                {/* "View full size" hint on the centred photo for mouse users. */}
                {isActive && (
                  <span className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-black/45 px-3 py-1 text-xs font-medium text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                    View full size
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Side arrows, on wide screens only. They sit just outside the centre photo and show while you hover. */}
        <button
          type="button"
          onClick={() => stepBy(-1)}
          aria-label="Previous photo"
          className={`${paddle} ${hovered ? "opacity-100" : "opacity-0"}`}
          style={{ left: "calc(50% - var(--slide) / 2 - 4.25rem)" }}
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => stepBy(1)}
          aria-label="Next photo"
          className={`${paddle} ${hovered ? "opacity-100" : "opacity-0"}`}
          style={{ right: "calc(50% - var(--slide) / 2 - 4.25rem)" }}
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* Caption for the centred photo. Keyed so it eases in fresh on each change. */}
      <div className="mx-auto mt-5 min-h-[4.5rem] max-w-md px-6 text-center">
        <div key={current.id} className="animate-[gallery-caption_400ms_cubic-bezier(0.16,1,0.3,1)] motion-reduce:animate-none">
          {current.title && <p className={`text-lg font-semibold tracking-apple-tight ${INK}`}>{current.title}</p>}
          {current.location && <p className={`text-sm ${GRAY}`}>{current.location}</p>}
          {/* Settings only: the section's "Shot on iPhone 16 Pro" label already names the camera. */}
          {current.settings && <p className={`mt-1 text-xs ${GRAY}`}>{current.settings}</p>}
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <AppleCarouselController
          itemCount={N}
          activeIndex={active}
          onSelectIndex={goToPhoto}
          slideDuration={5000}
          paused={hovered || touching || preview !== null}
          ariaLabel="Gallery controls"
        />
      </div>

      <PhotoPreviewModal
        photo={preview}
        onClose={() => setPreview(null)}
        onNext={() => previewStep(1)}
        onPrev={() => previewStep(-1)}
        currentIndex={preview ? PHOTOGRAPHY_DATA.findIndex((p) => p.id === preview.id) : undefined}
        totalCount={PHOTOGRAPHY_DATA.length}
      />
    </>
  );
}
