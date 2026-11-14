"use client";

import { useRef, useState } from "react";
import { ChevronRight, Compass, Eye, Layers } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DesignSpecimenToggle from "./DesignSpecimenToggle";
import type { Principle } from "./DesignPrincipleGrid";
import {
  APPLE_FAMILIES,
  GOOGLE_FAMILIES,
  TYPE_PRINCIPLES_1,
  TYPE_PRINCIPLES_2,
  TYPE_PRINCIPLES_3,
} from "./DesignTypographyKit";
import {
  FA_ICONS,
  ICON_PRINCIPLES_1,
  ICON_PRINCIPLES_2,
  ICON_PRINCIPLES_3,
  ICON_PRINCIPLES_4,
  MATERIAL_ICONS,
  MUI_ICONS,
  REUI_ICONS,
} from "./DesignIconsKit";
import { MUI_ICON_PATHS, type MuiIconStyle } from "@/data/materialIcons";
import Reveal from "@/components/shared/Reveal";
import { LEAD_GRAY, SECTION_LEAD, SECTION_TITLE, TITLE_INK } from "@/components/shared/typeScale";

type SystemId = "apple" | "google" | "reui-type" | "antique" | "beyno" | "fa" | "symbols" | "mui" | "reui-icons";

interface System {
  id: SystemId;
  group: "type" | "icons";
  label: string;
  /** Not every system has a page to point to. */
  href?: string;
  linkLabel?: string;
  principles: Principle[];
}

const SYSTEMS: System[] = [
  { id: "apple", group: "type", label: "San Francisco", href: "https://developer.apple.com/fonts/", linkLabel: "Apple Developer Fonts", principles: TYPE_PRINCIPLES_1 },
  { id: "google", group: "type", label: "Google Fonts", href: "https://fonts.google.com/", linkLabel: "Google Fonts", principles: TYPE_PRINCIPLES_2 },
  { id: "reui-type", group: "type", label: "ReUI Type", href: "https://reui.io/", linkLabel: "ReUI", principles: TYPE_PRINCIPLES_3 },
  {
    id: "antique",
    group: "type",
    label: "Antique Olive",
    principles: [
      { icon: Layers, color: "text-[#0071E3] dark:text-[#2997FF]", title: "Heavy and wide", body: "The Nord style is a very bold, extended cut, built to be seen at large sizes." },
      { icon: Compass, color: "text-[#AF52DE]", title: "Designed by Roger Excoffon", body: "Antique Olive was drawn for the French foundry Fonderie Olive in the 1960s." },
      { icon: Eye, color: "text-[#34C759]", title: "A single style", body: "This specimen is the Nord Italic file, so there is one weight and no weight slider." },
    ],
  },
  {
    id: "beyno",
    group: "type",
    label: "Beyno",
    principles: [
      { icon: Layers, color: "text-[#0071E3] dark:text-[#2997FF]", title: "Thin and angular", body: "Fine, even strokes and sharp geometric shapes give it a sci-fi look." },
      { icon: Compass, color: "text-[#AF52DE]", title: "One case", body: "Lowercase letters draw as capitals, so words always read in a single case." },
      { icon: Eye, color: "text-[#34C759]", title: "Letters, not numbers", body: "The font draws letters and a few marks only, so numerals are left out of the specimen." },
    ],
  },
  { id: "fa", group: "icons", label: "Font Awesome", href: "https://fontawesome.com/", linkLabel: "Font Awesome", principles: ICON_PRINCIPLES_1 },
  { id: "symbols", group: "icons", label: "Material Symbols", href: "https://fonts.google.com/icons", linkLabel: "Google Material Symbols", principles: ICON_PRINCIPLES_2 },
  { id: "mui", group: "icons", label: "Material UI", href: "https://mui.com/material-ui/material-icons/", linkLabel: "Material UI Icons", principles: ICON_PRINCIPLES_3 },
  { id: "reui-icons", group: "icons", label: "ReUI Icons", href: "https://reui.io/", linkLabel: "ReUI", principles: ICON_PRINCIPLES_4 },
];

const FONT_BLURB: Record<string, string> = {
  apple: "Apple's system typeface. Spacing and shapes adjust with size, from small labels to large titles.",
  google: "Open-source variable fonts you can load on any site, with a continuous weight range.",
  "reui-type": "The typeface behind ReUI's components: Inter, a variable font tuned for interfaces.",
  antique: "Antique Olive Std Nord Italic: a heavy, extended display italic with a strong personality.",
  beyno: "A thin, geometric display font with angular, sci-fi lettering.",
};

const ICON_BLURB: Record<string, string> = {
  fa: "Two fixed styles, Solid and Regular, on one consistent grid.",
  symbols: "A variable icon font with continuous weight, fill and optical-size axes.",
  mui: "Google's classic Material Icons as SVG, in five styles.",
  "reui-icons": "The Lucide icons ReUI uses across its components, with stroke width set live.",
};

const SIZES = [24, 36, 48] as const;
type IconSize = (typeof SIZES)[number];

/**
 * A custom slider: drag the thumb, tap the track to jump, or use the arrow keys. Dragging snaps to `step`
 * (use a small one for a smooth, continuous feel); the arrow keys move by `keyStep`.
 * Built on pointer events instead of a native range input, so it looks and behaves the same everywhere.
 */
function Slider({
  label,
  value,
  min,
  max,
  step,
  keyStep = step,
  onChange,
  display,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  keyStep?: number;
  onChange: (v: number) => void;
  display: string;
}) {
  const rail = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const pct = ((value - min) / (max - min)) * 100;
  const decimals = (String(step).split(".")[1] ?? "").length;

  const setFromX = (clientX: number) => {
    const el = rail.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const t = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    const snapped = Math.round((min + t * (max - min) - min) / step) * step + min;
    onChange(Number(Math.min(max, Math.max(min, snapped)).toFixed(decimals)));
  };

  const nudge = (delta: number) => onChange(Number(Math.min(max, Math.max(min, value + delta)).toFixed(decimals)));

  return (
    <div className="flex w-full items-center gap-3 text-xs font-semibold text-[#6E6E73] dark:text-[#8E8E93]">
      <span className="shrink-0">{label}</span>
      <div
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={display}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          setDragging(true);
          setFromX(e.clientX);
        }}
        onPointerMove={(e) => dragging && setFromX(e.clientX)}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
        onKeyDown={(e) => {
          const keys: Record<string, () => void> = {
            ArrowLeft: () => nudge(-keyStep),
            ArrowDown: () => nudge(-keyStep),
            ArrowRight: () => nudge(keyStep),
            ArrowUp: () => nudge(keyStep),
            PageDown: () => nudge(-keyStep * 2),
            PageUp: () => nudge(keyStep * 2),
            Home: () => onChange(min),
            End: () => onChange(max),
          };
          if (keys[e.key]) {
            e.preventDefault();
            keys[e.key]();
          }
        }}
        className="group relative flex h-10 flex-1 cursor-pointer touch-none select-none items-center rounded-full outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
      >
        {/* The rail is inset by half a thumb, so the thumb never overhangs the ends. */}
        <div ref={rail} className="relative mx-3 h-1.5 flex-1 rounded-full bg-black/[0.1] dark:bg-white/[0.18]">
          <div className="absolute inset-y-0 left-0 rounded-full bg-[#0071E3] dark:bg-[#2997FF]" style={{ width: `${pct}%` }} />
          <div
            className={`absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#fff] shadow-[0_1px_4px_rgba(0,0,0,0.35)] ring-1 ring-black/10 transition-transform duration-150 ${
              dragging ? "scale-110" : "group-hover:scale-105"
            }`}
            style={{ left: `${pct}%` }}
          />
        </div>
      </div>
      <span className="w-10 shrink-0 text-right tabular-nums text-[#1D1D1F] dark:text-[#F5F5F7]">{display}</span>
    </div>
  );
}

// Weight range each family really has. Google Sans only has 400 to 700, so the slider can't go past them.
const WEIGHT_RANGE: Record<string, [number, number]> = { sans: [400, 700] };

function TypeStage({ id }: { id: SystemId }) {
  const [rawWeight, setWeight] = useState(400);
  const [size, setSize] = useState<18 | 24 | 40>(24);
  const [googleFont, setGoogleFont] = useState<keyof typeof GOOGLE_FAMILIES>("roboto");

  // These two display fonts are single-style files, so there is no weight to change.
  const single = id === "antique" || id === "beyno";
  const [minW, maxW] = (id === "google" && WEIGHT_RANGE[googleFont]) || [100, 900];
  const weight = single ? 400 : Math.min(maxW, Math.max(minW, rawWeight));

  const family =
    id === "apple"
      ? APPLE_FAMILIES.display.css
      : id === "google"
        ? GOOGLE_FAMILIES[googleFont].css
        : id === "antique"
          ? "var(--font-antique-olive), sans-serif"
          : id === "beyno"
            ? "var(--font-beyno), sans-serif"
            : "var(--font-inter), sans-serif";
  const name =
    id === "apple"
      ? "San Francisco"
      : id === "google"
        ? GOOGLE_FAMILIES[googleFont].label
        : id === "antique"
          ? "Antique Olive Std Nord Italic"
          : id === "beyno"
            ? "Beyno"
            : "Inter";

  return (
    <div className="space-y-8">
      {id === "google" && (
        <div className="flex justify-center">
          <DesignSpecimenToggle
            onCard
            label="Family"
            value={googleFont}
            onChange={setGoogleFont}
            options={(Object.keys(GOOGLE_FAMILIES) as (keyof typeof GOOGLE_FAMILIES)[]).map((k) => ({ value: k, label: GOOGLE_FAMILIES[k].label }))}
          />
        </div>
      )}

      <div className="overflow-hidden text-center">
        <p
          aria-hidden="true"
          className="leading-none tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7]"
          style={{ fontFamily: family, fontWeight: weight, fontSize: "clamp(7rem, 22vw, 15rem)" }}
        >
          {id === "beyno" ? "Wk" : "Aa"}
        </p>
        <p className="mt-2 text-sm font-semibold text-[#6E6E73] dark:text-[#8E8E93]">
          {name} · {single ? "One style" : `Weight ${Math.round(weight)}`}
        </p>
        <p
          className="mx-auto mt-6 max-w-3xl leading-snug text-[#1D1D1F] dark:text-[#F5F5F7]"
          style={{ fontFamily: family, fontWeight: weight, fontSize: size }}
        >
          {id === "beyno"
            ? "Wakanda Forever"
            : id === "antique"
              ? "I live my life a quarter mile at a time."
              : "Sphinx of black quartz, judge my vow"}
        </p>
        <p
          className="mx-auto mt-4 max-w-3xl break-words text-xs uppercase tracking-widest text-[#6E6E73] dark:text-[#8E8E93]"
          style={{ fontFamily: family }}
        >
          {id === "beyno" ? "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z" : "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z 0 1 2 3 4 5 6 7 8 9"}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {!single && (
          <div className="w-full max-w-sm">
            <Slider label="Weight" value={weight} min={minW} max={maxW} step={1} keyStep={50} onChange={setWeight} display={String(Math.round(weight))} />
          </div>
        )}
        <DesignSpecimenToggle
          onCard
          label="Text size"
          value={size}
          onChange={setSize}
          options={[
            { value: 18, label: "18" },
            { value: 24, label: "24" },
            { value: 40, label: "40" },
          ]}
        />
      </div>
    </div>
  );
}

function IconStage({ id }: { id: SystemId }) {
  const [size, setSize] = useState<IconSize>(36);
  const [faStyle, setFaStyle] = useState<"solid" | "regular">("regular");
  const [matWeight, setMatWeight] = useState(400);
  const [matFilled, setMatFilled] = useState(false);
  const [muiStyle, setMuiStyle] = useState<MuiIconStyle>("outlined");
  const [stroke, setStroke] = useState(2);

  const ink = "text-[#1D1D1F] dark:text-[#F5F5F7]";
  let items: { name: string; node: React.ReactNode }[] = [];
  let controls: React.ReactNode = null;

  if (id === "fa") {
    items = FA_ICONS.map((i) => ({
      name: i.name,
      node: <FontAwesomeIcon icon={faStyle === "solid" ? i.solid : i.regular} style={{ fontSize: size }} className={ink} fixedWidth />,
    }));
    controls = (
      <DesignSpecimenToggle onCard
        label="Style"
        value={faStyle}
        onChange={setFaStyle}
        options={[
          { value: "solid", label: "Solid" },
          { value: "regular", label: "Regular" },
        ]}
      />
    );
  } else if (id === "symbols") {
    items = MATERIAL_ICONS.map((i) => ({
      name: i.name,
      node: (
        <span
          aria-hidden="true"
          className={`material-symbols ${ink}`}
          style={{ fontSize: size, fontVariationSettings: `'FILL' ${matFilled ? 1 : 0}, 'wght' ${matWeight}, 'opsz' ${Math.min(48, Math.max(20, size))}` }}
        >
          {i.glyph}
        </span>
      ),
    }));
    controls = (
      <>
        <DesignSpecimenToggle onCard
          label="Fill"
          value={matFilled}
          onChange={setMatFilled}
          options={[
            { value: false, label: "Outlined" },
            { value: true, label: "Filled" },
          ]}
        />
        <Slider label="Weight" value={matWeight} min={200} max={700} step={1} keyStep={50} onChange={setMatWeight} display={String(Math.round(matWeight))} />
      </>
    );
  } else if (id === "mui") {
    items = MUI_ICONS.map((i) => ({
      name: i.name,
      node: (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          width={size}
          height={size}
          fill="currentColor"
          className={ink}
          dangerouslySetInnerHTML={{ __html: MUI_ICON_PATHS[i.key][muiStyle] }}
        />
      ),
    }));
    controls = (
      <DesignSpecimenToggle onCard
        label="Style"
        value={muiStyle}
        onChange={setMuiStyle}
        options={[
          { value: "filled", label: "Filled" },
          { value: "outlined", label: "Outlined" },
          { value: "round", label: "Rounded" },
          { value: "sharp", label: "Sharp" },
          { value: "two-tone", label: "Two Tone" },
        ]}
      />
    );
  } else {
    items = REUI_ICONS.map(({ name, icon: Icon }) => ({
      name,
      node: <Icon aria-hidden="true" size={size} strokeWidth={stroke} className={ink} />,
    }));
    controls = <Slider label="Stroke" value={stroke} min={0.5} max={3} step={0.05} keyStep={0.25} onChange={setStroke} display={stroke.toFixed(2)} />;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
        <div className="flex flex-1 flex-wrap items-center gap-x-6 gap-y-3">{controls}</div>
        <DesignSpecimenToggle onCard
          label="Scale"
          value={size}
          onChange={setSize}
          options={SIZES.map((s) => ({ value: s, label: `${s}px` }))}
        />
      </div>
      <ul className="grid grid-cols-3 gap-x-2 gap-y-8 sm:grid-cols-4 md:grid-cols-6">
        {items.map((it) => (
          <li key={it.name} className="flex flex-col items-center gap-3">
            <div className="flex items-center justify-center" style={{ height: 60 }}>
              {it.node}
            </div>
            <span className="text-xs font-medium text-[#6E6E73] dark:text-[#8E8E93]">{it.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Two labelled pills, one per group, so each stays short enough to fit and can scroll by itself on a phone. */
function SystemSwitcher({ value, onChange }: { value: SystemId; onChange: (id: SystemId) => void }) {
  return (
    <div className="flex w-full flex-wrap items-end justify-center gap-x-6 gap-y-4">
      {(["type", "icons"] as const).map((group) => (
        <div key={group} className="flex max-w-full flex-col items-start gap-2">
          <span className="px-3 text-xs font-semibold uppercase tracking-widest text-[#6E6E73] dark:text-[#8E8E93]">
            {group === "type" ? "Typography" : "Icons"}
          </span>
          <div
            role="group"
            aria-label={group === "type" ? "Typefaces" : "Icon sets"}
            className="inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-black/[0.04] bg-[#F5F5F7] p-1 [scrollbar-width:none] dark:border-white/[0.08] dark:bg-[#1C1C1E] [&::-webkit-scrollbar]:hidden"
          >
            {SYSTEMS.filter((s) => s.group === group).map((s) => {
              const selected = s.id === value;
              return (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={(e) => {
                    onChange(s.id);
                    // The pill scrolls sideways on a phone, so bring the choice into view.
                    e.currentTarget.scrollIntoView({ inline: "nearest", block: "nearest", behavior: "smooth" });
                  }}
                  className={`min-h-[38px] cursor-pointer whitespace-nowrap rounded-full px-3.5 text-sm font-medium transition-colors duration-200 sm:min-h-[36px] focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)] ${
                    selected
                      ? "bg-white text-[#1D1D1F] shadow-xs dark:bg-[#2C2C2E] dark:text-white"
                      : "text-[#6E6E73] hover:text-[#1D1D1F] dark:text-[#A1A1A6] dark:hover:text-white"
                  }`}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Typography and icons in Apple's product-page language: a centred headline, one switcher, a big stage, three plain facts. */
export default function DesignFoundationsStudio() {
  const [id, setId] = useState<SystemId>("apple");
  const system = SYSTEMS.find((s) => s.id === id) ?? SYSTEMS[0];
  const blurb = system.group === "type" ? FONT_BLURB[id] : ICON_BLURB[id];

  return (
    <section id="foundations" className="scroll-mt-20 bg-white py-16 transition-colors sm:py-24 dark:bg-black overflow-hidden">
      <div className="mx-auto max-w-6xl space-y-10 px-6 sm:space-y-14 sm:px-8">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className={`${SECTION_TITLE} ${TITLE_INK}`}>
              Typography and icons.
              <br />
              <span className="font-medium text-[#6E6E73] dark:text-[#8E8E93]">The building blocks I choose from.</span>
            </h2>
            <p className={`mx-auto mt-4 max-w-2xl ${SECTION_LEAD} ${LEAD_GRAY}`}>
              Pick a typeface or an icon set, then change its settings to compare.
            </p>
          </div>
        </Reveal>

        <div className="flex justify-center">
          <SystemSwitcher value={id} onChange={setId} />
        </div>

        <div className="rounded-[2rem] bg-[#F5F5F7] p-6 sm:p-12 dark:bg-[#1C1C1E]">
          <div className="mb-8 flex flex-col gap-1 sm:mb-10 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight text-[#1D1D1F] sm:text-3xl dark:text-[#F5F5F7]">{system.label}</h3>
              <p className="mt-1 max-w-xl text-sm text-[#6E6E73] sm:text-base dark:text-[#A1A1A6]">{blurb}</p>
              {id === "apple" && (
                <p className="mt-2 max-w-xl text-xs text-[#6E6E73] dark:text-[#8E8E93]">
                  Licensed to Apple platforms, so it renders on Mac, iPhone and iPad. Elsewhere it falls back to Inter.
                </p>
              )}
            </div>
            {system.href && (
              <a
                href={system.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] shrink-0 items-center gap-0.5 text-sm font-semibold text-[#0066CC] hover:underline dark:text-[#2997FF]"
              >
                {system.linkLabel}
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </div>
          {/* key remounts the stage per system, so each starts from its own defaults and fades in */}
          <div key={id} className="fade-swap" style={{ animationDuration: "0.28s" }}>
            {system.group === "type" ? <TypeStage id={id} /> : <IconStage id={id} />}
          </div>
        </div>

        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-10">
          {system.principles.slice(0, 3).map((p, i) => (
            <li key={p.title}>
              <Reveal delay={i * 80}>
                <p.icon className={`h-7 w-7 ${p.color}`} aria-hidden="true" />
                <h4 className="mt-4 text-lg font-semibold tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7]">{p.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-[#6E6E73] sm:text-base dark:text-[#A1A1A6]">{p.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
