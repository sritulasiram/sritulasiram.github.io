"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useMediaQuery } from "@/components/layout/nav/useMediaQuery";
import PhotographyHighlights from "./PhotographyHighlights";
import type { PhotoItem } from "@/types";

/**
 * Scroll-driven hero: a Camera app that "takes" the featured frames, then the frames leave
 * the viewfinder and land on the cards of the Highlights shelf, which lives in the same
 * pinned stage (so the real cards are what the frames morph into).
 *
 *   p 0.00-0.20  headline fades up and out
 *   p 0.12-0.76  frames travel from the viewfinder to their card positions
 *   p 0.20-0.60  the phone shrinks and fades
 *   p 0.50-0.80  Highlights band and heading fade in
 *   p 0.80       real cards replace the travelling frames
 *   p 0.85-1.00  hold, then the page unpins
 *
 * Desktop only (lg+) and only when motion is allowed; the page renders the static header
 * and a plain Highlights shelf otherwise. Per-frame work goes straight to refs; React state
 * only changes for the slow shutter cycle.
 */

// The camera mockup is a square PNG with the phone centred and a transparent viewfinder.
// Fractions of the image width (it is square, so they apply to height too).
const IMG_PHONE_W = 0.4627;
const IMG_PHONE_TOP = 0.017;
const IMG_PHONE_H = 0.965;
const IMG_VF_CY = 0.4545; // viewfinder centre
const IMG_VF_W = 0.4344; // viewfinder width
const PHONE_ASPECT = IMG_PHONE_H / IMG_PHONE_W;
const CAMERA_UI = "/images/devices/iphone-camera-ui.png";
const TRACK_VH = 270;
const MORPH_DONE = 0.85;
const SWAP_AT = 0.8;
const PHOTO_ASPECT = 4 / 3; // height / width, matches the 3:4 viewfinder
const TOP_INSET = 64;
const HEADER_H = 364;

const FOCUS_POINTS = [
  { x: 52, y: 58 },
  { x: 44, y: 40 },
  { x: 58, y: 48 },
  { x: 38, y: 55 },
  { x: 50, y: 36 },
];

const BASE_W_CSS = `clamp(140px, calc((105vh - ${HEADER_H + 8}px) / ${PHONE_ASPECT.toFixed(4)}), 340px)`;
const IMG_W_CSS = `calc(var(--bw) / ${IMG_PHONE_W})`;

// A little hand-placed tilt so the frames leave the phone like prints, not a grid.
const TILTS = [-5, 3, -2, 4, -3];

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function CameraPhone({
  photos,
  index,
  shotIndex,
  flashKey,
  pressed,
}: {
  photos: PhotoItem[];
  index: number;
  shotIndex: number;
  flashKey: number;
  pressed: boolean;
}) {
  const focus = FOCUS_POINTS[index % FOCUS_POINTS.length];
  return (
    <div className="absolute inset-0">
      {/* Black screen behind the semi-transparent camera bars */}
      <div
        className="absolute bg-black"
        style={{ left: "28.67%", right: "27.9%", top: "3.1%", bottom: "3.2%", borderRadius: "13.7% / 6.35%" }}
      />

      {/* Viewfinder: the photo shows through the transparent middle of the mockup */}
      <div className="absolute overflow-hidden" style={{ left: "28.67%", width: "43.43%", top: "14.7%", height: "61.5%" }}>
        {photos.map((photo, i) => (
          <Image
            key={photo.id}
            src={photo.imageSrc}
            alt=""
            fill
            sizes="320px"
            className="object-cover"
            style={{ opacity: i === index ? 1 : 0, transition: "opacity 0.35s ease-out" }}
          />
        ))}
        {[33.33, 66.66].map((p) => (
          <span key={`v${p}`} className="absolute top-0 bottom-0 w-px bg-white/25" style={{ left: `${p}%` }} />
        ))}
        {[33.33, 66.66].map((p) => (
          <span key={`h${p}`} className="absolute left-0 right-0 h-px bg-white/25" style={{ top: `${p}%` }} />
        ))}
        <span
          key={`focus-${index}`}
          className="absolute border-[1.5px] border-[#FFD60A]"
          style={{
            left: `${focus.x}%`,
            top: `${focus.y}%`,
            width: "22%",
            aspectRatio: "1",
            marginLeft: "-11%",
            marginTop: "-11%",
            opacity: pressed ? 0 : 1,
            transition: "opacity 0.2s",
            animation: "cameraFocus 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
          }}
        />
        {flashKey > 0 && (
          <span
            key={`flash-${flashKey}`}
            className="absolute inset-0 bg-white"
            style={{ animation: "cameraFlash 0.28s ease-out both", opacity: 0 }}
          />
        )}
      </div>

      {/* Camera app chrome: zoom pills, modes, shutter and flip */}
      <Image src={CAMERA_UI} alt="" fill sizes="700px" className="object-contain" />

      {/* Last shot, bottom left */}
      <span
        className="absolute overflow-hidden border border-white/25 bg-white/10"
        style={{ left: "30.5%", top: "83.6%", width: "5.2%", aspectRatio: "1", borderRadius: "18%" }}
      >
        {shotIndex >= 0 && (
          <Image
            key={`thumb-${shotIndex}-${flashKey}`}
            src={photos[shotIndex].imageSrc}
            alt=""
            fill
            sizes="48px"
            className="object-cover"
          />
        )}
      </span>

      {/* Shutter press */}
      <span
        className="absolute rounded-full bg-[#B8B8BC]"
        style={{
          left: "50.35%",
          top: "86.2%",
          width: "6.4%",
          aspectRatio: "1",
          transform: "translate(-50%, -50%)",
          opacity: pressed ? 1 : 0,
          transition: "opacity 0.08s",
        }}
      />
    </div>
  );
}

export default function PhotographyIntroMorph({ photos }: { photos: PhotoItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const crumbRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const shelfRef = useRef<HTMLDivElement>(null);
  const photoRefs = useRef<(HTMLDivElement | null)[]>([]);

  const enabled = useMediaQuery("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
  const [nearTop, setNearTop] = useState(true);
  const [index, setIndex] = useState(0);
  const [shotIndex, setShotIndex] = useState(-1);
  const [flashKey, setFlashKey] = useState(0);
  const [pressed, setPressed] = useState(false);

  const count = photos.length;
  const cycling = enabled && nearTop && count > 0;

  // Shutter cycle: frame the scene, press the shutter, move on.
  useEffect(() => {
    if (!cycling) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const step = (i: number) => {
      timers.push(
        setTimeout(() => {
          setPressed(true);
          setFlashKey((k) => k + 1);
          setShotIndex(i);
          timers.push(setTimeout(() => setPressed(false), 160));
          timers.push(
            setTimeout(() => {
              const next = (i + 1) % count;
              setIndex(next);
              step(next);
            }, 800),
          );
        }, 1800),
      );
    };
    step(index);
    return () => timers.forEach(clearTimeout);
    // `index` is only the starting frame; the loop advances itself.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cycling, count]);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    const header = headerRef.current;
    const phone = phoneRef.current;
    const shelf = shelfRef.current;
    if (!track || !stage || !header || !phone || !shelf) return;

    type Geo = {
      startCx: number;
      startCy: number;
      startScale: number;
      endW: number;
      ends: { cx: number; cy: number }[];
    };
    let geo: Geo | null = null;
    let raf = 0;
    let lastNear = true;

    const measure = () => {
      const w = stage.clientWidth;
      const h = stage.clientHeight;
      if (!w || !h) {
        geo = null;
        return;
      }

      // Phone under the headline, bleeding slightly past the bottom edge.
      const room = h - HEADER_H - 8 + h * 0.045;
      const baseW = clamp(room / PHONE_ASPECT, 140, 340);
      const imgW = baseW / IMG_PHONE_W;
      const imgTop = HEADER_H + 8 - IMG_PHONE_TOP * imgW;
      phone.style.width = `${imgW}px`;
      phone.style.top = `${imgTop}px`;

      // Targets are the real cards in the Highlights shelf, in stage coordinates.
      const cards = Array.from(shelf.querySelectorAll<HTMLElement>("[data-highlight-card]"));
      const sr = stage.getBoundingClientRect();
      const rects = cards.map((c) => c.getBoundingClientRect());
      if (rects.length < photos.length) {
        geo = null;
        return;
      }
      const endW = rects[0].width;
      const endH = endW * PHOTO_ASPECT;
      photos.forEach((_, i) => {
        const el = photoRefs.current[i];
        if (!el) return;
        el.style.width = `${endW}px`;
        el.style.height = `${endH}px`;
      });

      geo = {
        startCx: w / 2,
        startCy: imgTop + IMG_VF_CY * imgW,
        startScale: (IMG_VF_W * imgW) / endW,
        endW,
        ends: rects.map((r) => ({ cx: r.left - sr.left + r.width / 2, cy: r.top - sr.top + r.height / 2 })),
      };
    };

    const render = () => {
      raf = 0;
      if (!geo) return;
      const g = geo;
      const h = stage.clientHeight;
      const total = track.offsetHeight - h;
      const s = total > 0 ? clamp(-track.getBoundingClientRect().top / total) : 0;
      const p = clamp(s / MORPH_DONE);

      const near = p < 0.1;
      if (near !== lastNear) {
        lastNear = near;
        setNearTop(near);
      }

      // Phone steps aside.
      const pp = easeInOut(clamp((p - 0.2) / 0.4));
      phone.style.transform = `translateX(-50%) translateY(${-pp * 30}px) scale(${lerp(1, 0.82, pp)})`;
      phone.style.opacity = String(1 - pp);

      // Frames spill out of the viewfinder onto the shelf, then the real cards take over.
      const swapped = p >= SWAP_AT;
      photos.forEach((_, i) => {
        const el = photoRefs.current[i];
        if (!el) return;
        const q = easeInOut(clamp((p - 0.12 - i * 0.035) / 0.5));
        const end = g.ends[i];
        const cx = lerp(g.startCx, end.cx, q);
        const cy = lerp(g.startCy, end.cy, q);
        const scale = lerp(g.startScale, 1, q);
        const tilt = TILTS[i % TILTS.length] * Math.sin(Math.PI * q);
        el.style.transform = `translate(${cx - g.endW / 2}px, ${cy - (g.endW * PHOTO_ASPECT) / 2}px) rotate(${tilt}deg) scale(${scale})`;
        el.style.opacity = swapped ? "0" : String(clamp(q * 6));
      });
      // Real cards fade in under the (identical) frames, which then drop out: no pop at the swap.
      stage.style.setProperty("--cards-o", String(clamp((p - (SWAP_AT - 0.08)) / 0.08)));

      const sp = clamp((p - 0.5) / 0.3);
      shelf.style.opacity = String(sp);
      shelf.style.pointerEvents = swapped ? "auto" : "none";

      const hp = clamp(p / 0.2);
      header.style.opacity = String(1 - hp);
      header.style.transform = `translateY(${-hp * 40}px)`;
      if (crumbRef.current) crumbRef.current.style.visibility = hp >= 1 ? "hidden" : "visible";
      if (glowRef.current) glowRef.current.style.opacity = String(1 - hp);
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };
    const remeasure = () => {
      measure();
      schedule();
    };

    remeasure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", remeasure);
    const ro = new ResizeObserver(remeasure);
    ro.observe(stage);
    ro.observe(shelf);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", remeasure);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [photos]);

  return (
    <div ref={trackRef} data-section="overview" className="relative" style={{ height: `${TRACK_VH}vh` }}>
      <div
        ref={stageRef}
        className="sticky top-0 h-screen overflow-hidden bg-white dark:bg-black"
        style={{ ["--cards-o" as string]: 0 }}
      >
        <div
          ref={glowRef}
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[920px] h-[480px] rounded-full bg-gradient-to-b from-[#1D1D1F]/8 via-[#6E6E73]/4 to-transparent dark:from-white/10 dark:via-white/5 blur-3xl"
        />

        {/* The real Highlights shelf; its cards stay hidden until the frames have landed */}
        <div ref={shelfRef} data-section="highlights" className="absolute inset-0 z-10" style={{ opacity: 0, pointerEvents: "none" }}>
          <PhotographyHighlights photos={photos} embedded />
        </div>

        {/* Frames: inside the viewfinder at the start, on the cards at the end */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-30">
          {photos.map((photo, i) => (
            <div
              key={photo.id}
              ref={(el) => {
                photoRefs.current[i] = el;
              }}
              className="absolute left-0 top-0 rounded-3xl overflow-hidden shadow-xl will-change-transform"
              style={{ opacity: 0, zIndex: photos.length - i }}
            >
              <Image src={photo.imageSrc} alt="" fill sizes="420px" className="object-cover" />
            </div>
          ))}
        </div>

        {/* Headline (p = 0) */}
        <div
          ref={headerRef}
          className="absolute inset-x-0 top-0 z-40 px-8 text-center will-change-transform pointer-events-none"
          style={{ paddingTop: TOP_INSET, height: HEADER_H }}
        >
          <nav ref={crumbRef} aria-label="Breadcrumb" className="mb-4 pointer-events-auto">
            <ol className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6E6E73] dark:text-[#A1A1A6]">
              <li>
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] transition-colors min-h-[44px]"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Home</span>
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="w-3.5 h-3.5 text-[#6E6E73] dark:text-[#8E8E93] shrink-0" />
              </li>
              <li>
                <span className="text-[#1D1D1F] dark:text-[#F5F5F7] font-semibold" aria-current="page">
                  Photography
                </span>
              </li>
            </ol>
          </nav>
          <div className="max-w-4xl mx-auto space-y-3">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-hero leading-[1.03]">
              Photography
              <br />
              <span className="block mt-1 text-3xl lg:text-4xl xl:text-5xl text-[#6E6E73] dark:text-[#8E8E93] font-medium">Perspective and light</span>
            </h1>
            <p className="text-lg xl:text-xl text-[#6E6E73] dark:text-[#A1A1A6] max-w-2xl mx-auto leading-relaxed tracking-apple-subhead">
              Curated frames capturing coastal atmosphere, architectural geometry, and fleeting moments.
            </p>
          </div>
        </div>

        {/* Phone running the Camera app */}
        <div
          ref={phoneRef}
          aria-hidden="true"
          className="absolute left-1/2 z-20 will-change-transform pointer-events-none"
          style={{
            ["--bw" as string]: BASE_W_CSS,
            top: `calc(${HEADER_H + 8}px - var(--bw) / ${IMG_PHONE_W} * ${IMG_PHONE_TOP})`,
            width: IMG_W_CSS,
            aspectRatio: "1",
            transform: "translateX(-50%)",
          }}
        >
          <CameraPhone photos={photos} index={index} shotIndex={shotIndex} flashKey={flashKey} pressed={pressed} />
        </div>
      </div>
    </div>
  );
}
