"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import PhotoPreviewModal from "@/components/photography/PhotoPreviewModal";
import { PHOTOGRAPHY_DATA } from "@/data/content";
import type { PhotoItem } from "@/types";
import { GRAY, INK } from "./homeShared";

const RIBBON_PHOTOS = PHOTOGRAPHY_DATA.slice(0, 10);

/** About 40px a second, the same gentle pace as before. */
const DRIFT_PX_PER_S = 40;
/** How long the drift takes to build back up to full pace after you let go, so it never lurches. */
const EASE_IN_MS = 1000;
/** How long after you let go before the ribbon starts drifting again. */
const RESUME_MS = 1800;

/**
 * A slow, endless ribbon of photos that fades out at both edges. It is an ordinary scrollable row that drifts
 * on its own, so you can touch and drag it (or scroll sideways with a trackpad) and it carries on from
 * wherever you left it. It pauses while you hover, touch or have a photo open, and any photo opens the
 * full-size viewer. Reduced-motion visitors get the plain scrollable row, with no drifting.
 */
export default function HomePhotoRibbon() {
  const [preview, setPreview] = useState<PhotoItem | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const holds = useRef({ pointer: false, touch: false, hidden: false, preview: false });
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    holds.current.preview = preview !== null;
  }, [preview]);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = 0;
    let pos = el.scrollLeft;
    let ours = pos;
    // 0 to 1: how much of full drift speed we are at. It is 0 while held and eases back up on release.
    let speed = 0;

    // The row holds two identical copies, so jumping by one copy's width is invisible: that is the endless loop.
    const wrap = () => {
      const half = el.scrollWidth / 2;
      if (half <= 0) return;
      if (el.scrollLeft >= half) el.scrollLeft -= half;
      else if (el.scrollLeft <= 0) el.scrollLeft += half;
    };
    const onScroll = () => {
      // Our own drift moves scrollLeft by under a pixel or two; anything more is you.
      if (Math.abs(el.scrollLeft - ours) > 2) {
        wrap();
        pos = el.scrollLeft;
        ours = pos;
      }
    };
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(64, now - last) / 1000;
      last = now;
      const h = holds.current;
      if (h.pointer || h.touch || h.hidden || h.preview) {
        pos = el.scrollLeft;
        speed = 0;
        return;
      }
      speed = Math.min(1, speed + dt / (EASE_IN_MS / 1000));
      pos += DRIFT_PX_PER_S * speed * speed * (3 - 2 * speed) * dt;
      const half = el.scrollWidth / 2;
      if (half > 0 && pos >= half) pos -= half;
      el.scrollLeft = pos;
      ours = el.scrollLeft;
    };

    // Start in the middle of the first copy's width so you can drag backwards straight away.
    el.scrollLeft = 1;
    pos = el.scrollLeft;
    ours = pos;
    el.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(([entry]) => {
      holds.current.hidden = !entry.isIntersecting;
    });
    io.observe(el);
    if (!reduced) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      el.removeEventListener("scroll", onScroll);
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, []);

  const hold = (key: "pointer" | "touch", on: boolean) => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    if (on) {
      holds.current[key] = true;
      return;
    }
    resumeTimer.current = setTimeout(() => {
      holds.current[key] = false;
    }, key === "touch" ? RESUME_MS : 0);
  };

  const step = (direction: 1 | -1) => {
    if (!preview) return;
    const index = PHOTOGRAPHY_DATA.findIndex((p) => p.id === preview.id);
    setPreview(PHOTOGRAPHY_DATA[(index + direction + PHOTOGRAPHY_DATA.length) % PHOTOGRAPHY_DATA.length]);
  };

  const card = (photo: PhotoItem, copy: boolean) => (
    <button
      key={`${photo.id}-${copy ? "b" : "a"}`}
      type="button"
      onClick={() => setPreview(photo)}
      tabIndex={copy ? -1 : 0}
      aria-hidden={copy || undefined}
      aria-label={copy ? undefined : `Open photo: ${photo.title ?? photo.altText}`}
      className="group w-[240px] shrink-0 cursor-pointer text-center sm:w-[300px] md:w-[340px] rounded-[28px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-[var(--pa-tint)]">
        <Image
          src={photo.imageSrc}
          alt={copy ? "" : photo.altText}
          fill
          sizes="(max-width: 640px) 240px, (max-width: 768px) 300px, 340px"
          draggable={false}
          loading="eager"
          decoding="async"
          className="select-none object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
      {photo.title && <p className={`mt-4 text-base font-semibold tracking-apple-tight ${INK}`}>{photo.title}</p>}
      {photo.location && <p className={`text-sm ${GRAY}`}>{photo.location}</p>}
    </button>
  );

  return (
    <>
      <div className="relative">
      <div
        ref={scroller}
        className="overflow-x-auto overscroll-x-contain py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onPointerEnter={(e) => e.pointerType === "mouse" && hold("pointer", true)}
        onPointerLeave={(e) => e.pointerType === "mouse" && hold("pointer", false)}
        onTouchStart={() => hold("touch", true)}
        onTouchEnd={() => hold("touch", false)}
        onTouchCancel={() => hold("touch", false)}
      >
        <div className="flex w-max">
          <div className="flex shrink-0 gap-5 pr-5 sm:gap-6 sm:pr-6">{RIBBON_PHOTOS.map((p) => card(p, false))}</div>
          <div className="flex shrink-0 gap-5 pr-5 sm:gap-6 sm:pr-6" aria-hidden="true">
            {RIBBON_PHOTOS.map((p) => card(p, true))}
          </div>
        </div>
      </div>
      {/* Edge fades */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-6 sm:w-16 bg-gradient-to-r from-white to-transparent dark:from-black motion-reduce:hidden" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-6 sm:w-16 bg-gradient-to-l from-white to-transparent dark:from-black motion-reduce:hidden" />
      </div>

      <PhotoPreviewModal
        photo={preview}
        onClose={() => setPreview(null)}
        onNext={() => step(1)}
        onPrev={() => step(-1)}
        currentIndex={preview ? PHOTOGRAPHY_DATA.findIndex((p) => p.id === preview.id) : undefined}
        totalCount={PHOTOGRAPHY_DATA.length}
      />
    </>
  );
}
