"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { MacbookPro } from "@/components/mockups/MacbookPro";
import { STAGE_PROJECTS, type StageProject } from "./ProjectsHeroStage";
import HrAssistiveMacbook from "./visuals/HrAssistiveMacbook";


/**
 * Scroll-driven hero: the three-laptop fan unfurls into the Selected Projects
 * lineup. The full project list follows below the track.
 *
 * Same technique as DesignShowcaseMorph: a tall track with a sticky stage, and
 * scroll progress drives every element through refs (no React state per frame):
 *   p 0.00-0.20  headline fades up and out
 *   p 0.08-0.65  laptops travel from the fan to their lineup positions
 *   p 0.58-0.86  captions and heading fade in
 *   p 0.85-1.00  hold, so the finished lineup can be read and clicked
 *
 * Desktop only (lg+) and only when motion is allowed; the page renders the
 * carousel hero otherwise.
 */

const ASPECT = 400 / 650; // laptop height / width
const TRACK_VH = 260;
const TOP_INSET = 64;
// Fixed so the server-rendered fan (CSS) and the measured fan (JS) agree exactly.
const HEADER_H = 392;
const TILE_GAP = 32;
const CAPTION_H = 96;
const WORK_ANCHOR = 0.9;
const MORPH_DONE = 0.85;
// Side laptops sit behind the centre one; spread is in laptop widths.
const FAN_SPREAD = 0.56;
const FAN_SIDE_SCALE = 0.82;

// Left to right, with the lead project (Cytron HR Assistive Intelligence) in the middle.
const ORDER = ["warranty-rma", "cytron-hr-assistive-intelligence", "raspberry-pi-diagnostics"];
const PROJECTS = ORDER.map((id) => STAGE_PROJECTS.find((p) => p.id === id)).filter(
  (p): p is StageProject => Boolean(p),
);

const SLOTS = [
  { x: -FAN_SPREAD, s: FAN_SIDE_SCALE, b: 0.88, z: 20 },
  { x: 0, s: 1, b: 1, z: 30 },
  { x: FAN_SPREAD, s: FAN_SIDE_SCALE, b: 0.88, z: 20 },
];

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// Laptop width at p = 0, as CSS, so the fan is visible before hydration.
const FAN_EXTENT = 2 * (FAN_SPREAD + FAN_SIDE_SCALE / 2);
const BASE_W_CSS = `clamp(360px, min(calc((104vh - ${HEADER_H + 8}px) / ${ASPECT.toFixed(5)}), calc((100vw - 64px) / ${FAN_EXTENT.toFixed(3)})), 700px)`;

// The p = 0 transform for a slot, in CSS (laptops are positioned at left: 50%).
const startTransform = (i: number) =>
  `translate(calc(var(--bw) * ${(SLOTS[i].x - 0.5).toFixed(3)}), ${HEADER_H + 8}px) rotate(0deg) scale(${SLOTS[i].s})`;

interface Geometry {
  stageW: number;
  baseW: number;
  startCy: number;
  endCenters: number[];
  endCy: number;
  endScale: number;
}

function LaptopScreen({ project }: { project: StageProject }) {
  if (project.id === "cytron-hr-assistive-intelligence") {
    return <HrAssistiveMacbook className="w-full h-full drop-shadow-2xl" />;
  }
  return (
    <MacbookPro
      src={project.imageSrc}
      fit="fill"
      showNotch={false}
      className="w-full h-full drop-shadow-2xl"
    />
  );
}

export default function ProjectsShowcaseMorph() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const crumbRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const workHeaderRef = useRef<HTMLDivElement>(null);
  const deviceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tileRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const tileTextRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    const header = headerRef.current;
    const workHeader = workHeaderRef.current;
    if (!track || !stage || !header || !workHeader) return;

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

      // Start: fan under the headline.
      const room = h - HEADER_H - 8 + h * 0.04;
      const baseW = clamp(
        Math.min(room / ASPECT, (w - 64) / FAN_EXTENT),
        360,
        700,
      );
      const baseH = baseW * ASPECT;
      const startCy = HEADER_H + 8 + baseH / 2;

      // End: three equal columns under the "Selected projects" heading.
      const rowW = Math.min(1152, w - 64);
      const rowLeft = (w - rowW) / 2;
      const tileW = (rowW - TILE_GAP * 2) / 3;
      const workBottom = workHeader.offsetHeight + 20;
      const avail = h - workBottom - 28;
      const endW = Math.min(tileW, (avail - CAPTION_H) / ASPECT);
      const endH = endW * ASPECT;
      const colH = endH + CAPTION_H;
      const colTop = workBottom + (avail - colH) / 2;
      const endCenters = PROJECTS.map(
        (_, i) => rowLeft + i * (tileW + TILE_GAP) + tileW / 2,
      );

      PROJECTS.forEach((_, i) => {
        const tile = tileRefs.current[i];
        if (tile) {
          tile.style.left = `${endCenters[i] - tileW / 2}px`;
          tile.style.top = `${colTop}px`;
          tile.style.width = `${tileW}px`;
          tile.style.height = `${colH}px`;
        }
        const device = deviceRefs.current[i];
        if (device) device.style.width = `${baseW}px`;
      });

      // The lineup is centred in a full-height stage, which leaves empty space under the
      // captions. Pull the next section up over that space (it paints above the stage).
      track.style.marginBottom = `-${Math.max(0, Math.round(h - (colTop + colH) - 24))}px`;

      geo = {
        stageW: w,
        baseW,
        startCy,
        endCenters,
        endCy: colTop + endH / 2,
        endScale: endW / baseW,
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
        deviceRefs.current.forEach((el) => el && (el.style.animation = "none"));
      }
      const q = easeInOut(clamp((p - 0.08) / 0.57));
      const baseH = geo.baseW * ASPECT;
      const startX = (i: number) => geo!.stageW / 2 + SLOTS[i].x * geo!.baseW;

      PROJECTS.forEach((_, i) => {
        const device = deviceRefs.current[i];
        if (!device) return;
        const cx = lerp(startX(i), geo!.endCenters[i], q);
        const cy = lerp(geo!.startCy, geo!.endCy, q);
        const scale = lerp(SLOTS[i].s, geo!.endScale, q);
        device.style.transform = `translate(${cx - geo!.stageW / 2 - geo!.baseW / 2}px, ${cy - baseH / 2}px) rotate(0deg) scale(${scale})`;
        device.style.filter = q < 1 ? `brightness(${lerp(SLOTS[i].b, 1, q)})` : "none";
      });

      const hp = clamp(p / 0.2);
      header.style.opacity = String(1 - hp);
      header.style.transform = `translateY(${-hp * 40}px)`;
      if (crumbRef.current) {
        crumbRef.current.style.visibility = hp >= 1 ? "hidden" : "visible";
      }
      if (glowRef.current) glowRef.current.style.opacity = String(1 - hp);

      const wp = clamp((p - 0.58) / 0.22);
      workHeader.style.opacity = String(wp);
      workHeader.style.transform = `translateY(${(1 - wp) * 16}px)`;

      const ttp = clamp((p - 0.62) / 0.24);
      PROJECTS.forEach((_, i) => {
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
    ro.observe(workHeader);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", remeasure);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
      track.style.marginBottom = "";
    };
  }, []);

  return (
    <div
      ref={trackRef}
      data-section="overview"
      className="relative"
      style={{ height: `${TRACK_VH}vh` }}
    >
      {/* The finished lineup is reached here; the subnav item scrolls to it. */}
      <div
        aria-hidden="true"
        data-section="lineup"
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
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[920px] h-[480px] rounded-full bg-gradient-to-b from-[#0071E3]/12 via-[#2997FF]/6 to-transparent blur-3xl"
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
                  Projects
                </span>
              </li>
            </ol>
          </nav>
          <div className="max-w-4xl mx-auto space-y-3">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-hero leading-[1.03]">
              Projects
              <br />
              <span className="block mt-1 text-3xl lg:text-4xl xl:text-5xl text-[#6E6E73] dark:text-[#8E8E93] font-medium">
                Hardware, software and the space between.
              </span>
            </h1>
            <p className="text-lg xl:text-xl text-[#6E6E73] dark:text-[#A1A1A6] max-w-2xl mx-auto leading-relaxed tracking-apple-subhead">
              Hardware and software engineered as one.
              <br />
              From low-level silicon to production platforms.
            </p>
          </div>
        </div>

        {/* Heading the laptops turn into (p = 1) */}
        <div
          ref={workHeaderRef}
          className="absolute inset-x-0 top-0 z-40 px-8 text-center pointer-events-none"
          style={{ paddingTop: TOP_INSET, opacity: 0 }}
        >
          <h2 className="text-4xl xl:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight leading-[1.08] text-balance">
            Selected projects.
            <br />
            <span className="block mt-1 text-3xl lg:text-4xl xl:text-5xl text-[#6E6E73] dark:text-[#8E8E93] font-medium">
              Two in production, one in pilot.
            </span>
          </h2>
        </div>

        {/* Lineup: captions and click targets the laptops land on */}
        {PROJECTS.map((project, i) => (
          <Link
            key={project.id}
            ref={(el) => {
              tileRefs.current[i] = el;
            }}
            href={project.caseStudyUrl}
            aria-label={`${project.name}: ${project.subtitle}`}
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
                {project.name}
                <ChevronRight
                  aria-hidden="true"
                  className="w-4 h-4 mt-0.5 text-[#6E6E73] dark:text-[#8E8E93] transition-transform duration-300 group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5"
                />
              </p>
              <p className="text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-snug text-balance">
                {project.subtitle}
              </p>
            </div>
          </Link>
        ))}

        {/* Laptops: fan at the start, lineup visuals at the end */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            ["--bw" as string]: BASE_W_CSS,
            ["--fan-y" as string]: `${HEADER_H + 8}px`,
          }}
        >
          {PROJECTS.map((project, i) => (
            <div
              key={project.id}
              ref={(el) => {
                deviceRefs.current[i] = el;
              }}
              className="absolute left-1/2 top-0 will-change-transform"
              style={{
                zIndex: SLOTS[i].z,
                width: "var(--bw)",
                aspectRatio: "650 / 400",
                transform: startTransform(i),
                filter: `brightness(${SLOTS[i].b})`,
                // Intro: fan out from the centre, side laptops last.
                animation: `phoneFanOut 1000ms cubic-bezier(0.16, 1, 0.3, 1) ${Math.abs(i - 1) * 90}ms backwards`,
              }}
            >
              <LaptopScreen project={project} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
