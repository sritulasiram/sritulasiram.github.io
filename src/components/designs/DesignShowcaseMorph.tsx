"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import StageDevice from "./StageDevice";
import { STAGE_DESIGNS } from "./designStage";

/**
 * Scroll-driven hero: the five-phone fan unfurls into the Selected Work lineup.
 *
 * A tall track holds a sticky full-viewport stage. Scroll progress through the
 * track drives every element directly via refs (no React state per frame):
 *   p 0.00-0.20  headline fades up and out
 *   p 0.08-0.65  phones travel from the fan to their tile positions
 *   p 0.55-0.86  captions and the "Selected work" heading fade in
 *   p 0.85-1.00  hold, so the finished row can be read and clicked
 *
 * Desktop only (lg+) and only when motion is allowed; the page renders the
 * static hero and grid otherwise.
 */

const PHONE_ASPECT = 870 / 420;
const TRACK_VH = 260;
const TOP_INSET = 64;
// Fixed so the server-rendered fan (CSS) and the measured fan (JS) agree exactly.
const HEADER_H = 380;
const CENTER_SCALE = 1.04;
const TILE_GAP = 16;
const CAPTION_H = 76;
// Fraction of the track's scroll distance at which the finished row is "reached".
const WORK_ANCHOR = 0.9;
const MORPH_DONE = 0.85;

const SLOTS = [
  { x: -130, s: 0.8, r: -10, b: 0.84, z: 10 },
  { x: -68, s: 0.9, r: -5, b: 0.92, z: 20 },
  { x: 0, s: 1.04, r: 0, b: 1, z: 30 },
  { x: 68, s: 0.9, r: 5, b: 0.92, z: 20 },
  { x: 130, s: 0.8, r: 10, b: 0.84, z: 10 },
];

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// Phone width at p = 0, as CSS, so the fan is visible before hydration.
const BASE_W_CSS = `clamp(140px, calc((104vh - ${HEADER_H + 8}px) / ${(PHONE_ASPECT * CENTER_SCALE).toFixed(5)}), 300px)`;

// The p = 0 transform for a slot, in CSS (phones are positioned at left: 50%).
const startTransform = (i: number) =>
  `translate(calc(var(--bw) * ${(SLOTS[i].x / 100 - 0.5).toFixed(3)}), calc(${HEADER_H + 8}px + var(--bw) * ${((PHONE_ASPECT * (CENTER_SCALE - 1)) / 2).toFixed(4)})) rotate(${SLOTS[i].r}deg) scale(${SLOTS[i].s})`;

interface Geometry {
  stageW: number;
  baseW: number;
  start: { cx: number; cy: number }[];
  end: { cx: number; cy: number; scale: number };
  endCenters: number[];
}

export default function DesignShowcaseMorph() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const crumbRef = useRef<HTMLElement>(null);
  const workHeaderRef = useRef<HTMLDivElement>(null);
  const phonesRef = useRef<HTMLDivElement>(null);
  const phoneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tileRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const tileTextRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    const header = headerRef.current;
    const workHeader = workHeaderRef.current;
    const phones = phonesRef.current;
    if (!track || !stage || !header || !workHeader || !phones) return;

    let geo: Geometry | null = null;
    let raf = 0;
    let introCancelled = false;

    const measure = () => {
      const w = stage.clientWidth;
      const h = stage.clientHeight;
      if (!w || !h) {
        geo = null;
        return;
      }

      // Start: fan under the headline, bleeding slightly past the bottom edge.
      const room = h - HEADER_H - 8 + h * 0.04;
      const baseW = clamp(room / (PHONE_ASPECT * CENTER_SCALE), 140, 300);
      const baseH = baseW * PHONE_ASPECT;
      const cy0 = HEADER_H + 8 + (baseH * CENTER_SCALE) / 2;
      const start = SLOTS.map((slot) => ({
        cx: w / 2 + (slot.x / 100) * baseW,
        cy: cy0,
      }));

      // End: five equal tiles under the "Selected work" heading.
      const rowW = Math.min(1152, w - 64);
      const rowLeft = (w - rowW) / 2;
      const tileW = (rowW - TILE_GAP * 4) / 5;
      const workBottom = workHeader.offsetHeight + 20;
      const avail = h - workBottom - 28;
      const endW = Math.min(tileW * 0.9, (avail - CAPTION_H) / PHONE_ASPECT);
      const endH = endW * PHONE_ASPECT;
      const tileH = endH + CAPTION_H;
      const tileTop = workBottom + (avail - tileH) / 2;
      const endCenters = STAGE_DESIGNS.map(
        (_, i) => rowLeft + i * (tileW + TILE_GAP) + tileW / 2,
      );

      STAGE_DESIGNS.forEach((_, i) => {
        const tile = tileRefs.current[i];
        if (!tile) return;
        tile.style.left = `${endCenters[i] - tileW / 2}px`;
        tile.style.top = `${tileTop}px`;
        tile.style.width = `${tileW}px`;
        tile.style.height = `${tileH}px`;
        const phone = phoneRefs.current[i];
        if (phone) {
          phone.style.width = `${baseW}px`;
        }
      });

      geo = {
        stageW: w,
        baseW,
        start,
        end: {
          cx: 0,
          cy: tileTop + endH / 2,
          scale: endW / baseW,
        },
        endCenters,
      };
    };

    const render = () => {
      raf = 0;
      if (!geo) return;
      const h = stage.clientHeight;
      const total = track.offsetHeight - h;
      const s = total > 0 ? clamp(-track.getBoundingClientRect().top / total) : 0;
      const p = clamp(s / MORPH_DONE);
      if (!introCancelled && p > 0.02) {
        introCancelled = true;
        phoneRefs.current.forEach((el) => el && (el.style.animation = "none"));
      }
      const q = easeInOut(clamp((p - 0.08) / 0.57));
      const baseH = geo.baseW * PHONE_ASPECT;

      STAGE_DESIGNS.forEach((_, i) => {
        const phone = phoneRefs.current[i];
        if (!phone) return;
        const slot = SLOTS[i];
        const cx = lerp(geo!.start[i].cx, geo!.endCenters[i], q);
        const cy = lerp(geo!.start[i].cy, geo!.end.cy, q);
        const scale = lerp(slot.s, geo!.end.scale, q);
        const rotate = lerp(slot.r, 0, q);
        phone.style.transform = `translate(${cx - geo!.stageW / 2 - geo!.baseW / 2}px, ${cy - baseH / 2}px) rotate(${rotate}deg) scale(${scale})`;
        phone.style.filter = q < 1 ? `brightness(${lerp(slot.b, 1, q)})` : "none";
      });

      const hp = clamp(p / 0.2);
      header.style.opacity = String(1 - hp);
      if (glowRef.current) glowRef.current.style.opacity = String(1 - hp);
      header.style.transform = `translateY(${-hp * 40}px)`;
      if (crumbRef.current) {
        crumbRef.current.style.visibility = hp >= 1 ? "hidden" : "visible";
      }

      const wp = clamp((p - 0.58) / 0.22);
      workHeader.style.opacity = String(wp);
      workHeader.style.transform = `translateY(${(1 - wp) * 16}px)`;

      const ttp = clamp((p - 0.62) / 0.24);
      STAGE_DESIGNS.forEach((_, i) => {
        const tile = tileRefs.current[i];
        if (!tile) return;
        tile.style.visibility = ttp > 0 ? "visible" : "hidden";
        tile.style.pointerEvents = ttp >= 1 ? "auto" : "none";
        const text = tileTextRefs.current[i];
        if (text) text.style.opacity = String(ttp);
      });

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
    ro.observe(header);
    ro.observe(workHeader);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", remeasure);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={trackRef}
      data-section="overview"
      className="relative"
      style={{ height: `${TRACK_VH}vh` }}
    >
      {/* The finished tile row is reached here; the subnav "Work" item scrolls to it. */}
      <div
        aria-hidden="true"
        data-section="work"
        className="absolute left-0 w-px h-px pointer-events-none"
        style={{ top: `calc((100% - 100vh) * ${WORK_ANCHOR})` }}
      />

      <div
        ref={stageRef}
        className="sticky top-0 h-screen overflow-hidden bg-white dark:bg-black"
      >
        <div
          ref={glowRef}
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[920px] h-[480px] rounded-full bg-gradient-to-b from-[#1D1D1F]/8 via-[#6E6E73]/4 to-transparent dark:from-white/10 dark:via-white/5 blur-3xl"
        />

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
                  Designs
                </span>
              </li>
            </ol>
          </nav>
          <div className="max-w-4xl mx-auto space-y-3">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-hero leading-[1.03]">
              Design
              <br />
              <span className="block mt-1 text-3xl lg:text-4xl xl:text-5xl text-[#6E6E73] dark:text-[#8E8E93] font-medium">Effortlessly natural</span>
            </h1>
            <p className="text-lg xl:text-xl text-[#6E6E73] dark:text-[#A1A1A6] max-w-2xl mx-auto leading-relaxed tracking-apple-subhead">
              Five products across health, retail, education and sustainability. Each starts with a problem worth solving.
            </p>
          </div>
        </div>

        {/* Heading the phones turn into (p = 1) */}
        <div
          ref={workHeaderRef}
          className="absolute inset-x-0 top-0 z-40 px-8 text-center pointer-events-none"
          style={{ paddingTop: TOP_INSET, opacity: 0 }}
        >
          <h2 className="text-4xl xl:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight leading-[1.08] text-balance">
            Selected work.
            <br />
            <span className="block mt-1 text-3xl lg:text-4xl xl:text-5xl text-[#6E6E73] dark:text-[#8E8E93] font-medium">
              Where ideas become interfaces.
            </span>
          </h2>
        </div>

        {/* Lineup: captions and click targets the phones land on */}
        {STAGE_DESIGNS.map((design, i) => (
          <Link
            key={design.id}
            ref={(el) => {
              tileRefs.current[i] = el;
            }}
            href={design.caseStudyUrl}
            aria-label={`${design.name}: ${design.subtitle}`}
            className="group absolute z-[5] block rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0071E3]"
            style={{ visibility: "hidden", pointerEvents: "none" }}
          >
            <div
              ref={(el) => {
                tileTextRefs.current[i] = el;
              }}
              className="absolute inset-x-0 bottom-0 text-center space-y-1"
              style={{ opacity: 0 }}
            >
              <p className="inline-flex items-center gap-0.5 text-xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight">
                {design.name}
                <ChevronRight
                  aria-hidden="true"
                  className="w-4 h-4 mt-0.5 text-[#6E6E73] dark:text-[#8E8E93] transition-transform duration-300 group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5"
                />
              </p>
              <p className="text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-snug">
                {design.shortSubtitle}
              </p>
            </div>
          </Link>
        ))}

        {/* Phones: fan at the start, tile contents at the end */}
        <div
          ref={phonesRef}
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            ["--bw" as string]: BASE_W_CSS,
            ["--fan-y" as string]: `calc(${HEADER_H + 8}px + var(--bw) * ${((PHONE_ASPECT * (CENTER_SCALE - 1)) / 2).toFixed(4)})`,
          }}
        >
          {STAGE_DESIGNS.map((design, i) => (
            <div
              key={design.id}
              ref={(el) => {
                phoneRefs.current[i] = el;
              }}
              className="absolute left-1/2 top-0 will-change-transform"
              style={{
                zIndex: SLOTS[i].z,
                width: "var(--bw)",
                transform: startTransform(i),
                filter: `brightness(${SLOTS[i].b})`,
                // Intro: fan out from the centre, outer phones last.
                animation: `phoneFanOut 1000ms cubic-bezier(0.16, 1, 0.3, 1) ${Math.abs(i - 2) * 70}ms backwards`,
              }}
            >
              <StageDevice device={design.device} src={design.imageSrc} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
