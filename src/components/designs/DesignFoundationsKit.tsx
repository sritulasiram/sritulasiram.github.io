"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Sparkles,
  Layers,
  Palette,
  Eye,
  Heart,
  Sliders,
  Compass,
  Copy,
  Bot,
  Check,
} from "lucide-react";
import DesignPrincipleGrid, { type Principle } from "./DesignPrincipleGrid";
import DesignSpecimenToggle from "./DesignSpecimenToggle";
import Reveal from "@/components/shared/Reveal";
import { LEAD_GRAY, SECTION_LEAD, SECTION_TITLE, TITLE_INK } from "@/components/shared/typeScale";

// Apple Liquid Glass
const FOUNDATION_PRINCIPLES_1: Principle[] = [
  {
    icon: Layers,
    color: "text-[#0071E3] dark:text-[#2997FF]",
    title: "Controls above content",
    body: "Liquid Glass is for toolbars, sidebars and navigation. Content never uses it.",
  },
  {
    icon: Sparkles,
    color: "text-[#AF52DE]",
    title: "Adapts to what's underneath",
    body: "It has no color of its own. It blurs and adjusts to the content moving behind it.",
  },
  {
    icon: Sliders,
    color: "text-[#34C759]",
    title: "Few tinted controls",
    body: "At most one or two tinted primary actions per view. Labels stay monochrome.",
  },
  {
    icon: Compass,
    color: "text-[#FF9500]",
    title: "Monochrome Restraint",
    body: "Symbols and labels switch between light and dark to stay legible on any background.",
  },
];

// Google Material 3 Expressive
const FOUNDATION_PRINCIPLES_2: Principle[] = [
  {
    icon: Eye,
    color: "text-[#0071E3] dark:text-[#2997FF]",
    title: "Up to 4× Faster Focus",
    body: "In Google's research across 46 studies, participants spotted key UI elements up to four times faster in Expressive designs.",
  },
  {
    icon: Palette,
    color: "text-[#AF52DE]",
    title: "Color from your wallpaper",
    body: "Material 3 dynamic color builds tonal palettes from the user's wallpaper, so each device feels personal.",
  },
  {
    icon: Layers,
    color: "text-[#34C759]",
    title: "Rounded, grouped shapes",
    body: "Large rounded corners (up to 28dp in Material 3) and pill contours group related elements clearly.",
  },
  {
    icon: Heart,
    color: "text-[#FF9500]",
    title: "Preferred across ages",
    body: "With more than 18,000 participants, Expressive designs were preferred by people of all ages, up to 87% among 18–24-year-olds.",
  },
];

// ReUI
const FOUNDATION_PRINCIPLES_3: Principle[] = [
  {
    icon: Copy,
    color: "text-[#0071E3] dark:text-[#2997FF]",
    title: "Copy, don't install",
    body: "Components are added to your project as source files, so you own and edit every line.",
  },
  {
    icon: Layers,
    color: "text-[#AF52DE]",
    title: "Built on shadcn/ui",
    body: "ReUI extends shadcn/ui with more than a thousand free components, plus blocks and templates.",
  },
  {
    icon: Palette,
    color: "text-[#34C759]",
    title: "Neutral, token-driven",
    body: "A neutral base and CSS variables mean one change to a token re-themes the whole interface.",
  },
  {
    icon: Bot,
    color: "text-[#FF9500]",
    title: "Ready for coding agents",
    body: "A hosted MCP server lets AI coding agents find and add ReUI components to a project.",
  },
];

// Live sample built from ReUI's real "Vega" style tokens (reui.io, MIT): Inter, radius 0.625rem,
// neutral palette. The tokens are scoped to this preview so they never leak into the page.
const REUI_TOKENS = {
  light: {
    "--r-bg": "#ffffff", "--r-fg": "#0a0a0a", "--r-card": "#ffffff", "--r-primary": "#171717",
    "--r-primary-fg": "#fafafa", "--r-secondary": "#f5f5f5", "--r-muted-fg": "#737373",
    "--r-border": "#e5e5e5", "--r-input": "#e5e5e5", "--r-accent": "#f5f5f5",
  },
  dark: {
    "--r-bg": "#0a0a0a", "--r-fg": "#fafafa", "--r-card": "#171717", "--r-primary": "#e5e5e5",
    "--r-primary-fg": "#171717", "--r-secondary": "#262626", "--r-muted-fg": "#a1a1a1",
    "--r-border": "#ffffff1a", "--r-input": "#ffffff26", "--r-accent": "#404040",
  },
} as const;

const REUI_TOKEN_CSS = `
.reui-sample{--r-radius:.625rem;font-family:var(--font-inter),sans-serif;${Object.entries(REUI_TOKENS.light).map(([k, v]) => `${k}:${v}`).join(";")}}
:is(.dark) .reui-sample{${Object.entries(REUI_TOKENS.dark).map(([k, v]) => `${k}:${v}`).join(";")}}
`;

type ReuiStyle = "vega" | "nova" | "maia" | "lyra" | "mira" | "luma" | "rhea" | "sera";

// Per-style component shape, read from ReUI's style CSS. Every radius derives from the one
// --radius value, using shadcn's scale: 2xl = 1.8r, 3xl = 2.2r, 4xl = 2.6r.
const R2XL = (r: number) => r * 1.8;
const R3XL = (r: number) => r * 2.2;
const R4XL = (r: number) => r * 2.6;
const REUI_STYLES: Record<
  ReuiStyle,
  { label: string; btn: (r: number) => number; card: (r: number) => number; input: (r: number) => number; badge: (r: number) => number; inputH: number; text: string; underline?: boolean }
> = {
  vega: { label: "Vega", btn: (r) => r - 2, card: (r) => r + 4, input: (r) => r - 2, badge: R4XL, inputH: 36, text: "text-sm" },
  nova: { label: "Nova", btn: (r) => r, card: (r) => r + 4, input: (r) => r, badge: R4XL, inputH: 32, text: "text-sm" },
  maia: { label: "Maia", btn: R4XL, card: R2XL, input: R4XL, badge: R4XL, inputH: 36, text: "text-sm" },
  lyra: { label: "Lyra", btn: () => 0, card: () => 0, input: () => 0, badge: () => 0, inputH: 32, text: "text-xs" },
  mira: { label: "Mira", btn: (r) => r - 2, card: (r) => r, input: (r) => r - 2, badge: R4XL, inputH: 28, text: "text-xs" },
  luma: { label: "Luma", btn: R4XL, card: R4XL, input: R3XL, badge: R3XL, inputH: 36, text: "text-sm" },
  rhea: { label: "Rhea", btn: R2XL, card: (r) => Math.min(R4XL(r), 24), input: R2XL, badge: R2XL, inputH: 32, text: "text-sm" },
  sera: { label: "Sera", btn: () => 0, card: (r) => r, input: () => 0, badge: () => 0, inputH: 40, text: "text-xs", underline: true },
};

const REUI_RADII = [
  { value: 0, label: "None" },
  { value: 6, label: "Small" },
  { value: 10, label: "Default" },
  { value: 14, label: "Medium" },
  { value: 20, label: "Large" },
] as const;

function ReuiToggle<T extends string | number>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return <DesignSpecimenToggle label={label} value={value} onChange={onChange} options={options} />;
}

function ReuiPreview() {
  const [style, setStyle] = useState<ReuiStyle>("vega");
  const [radius, setRadius] = useState<number>(10);
  const [notify, setNotify] = useState(true);
  const [tab, setTab] = useState<"account" | "team">("account");

  const st = REUI_STYLES[style];
  const px = (n: number) => `${Math.max(0, n)}px`;
  const card = `bg-[var(--r-card)] text-[var(--r-fg)] p-5 space-y-4 shadow-xs ring-1 ring-[color:var(--r-border)] ${st.text}`;
  const btn = `inline-flex items-center justify-center border px-3 font-medium cursor-default ${st.text}`;
  const field = st.underline
    ? "border-0 border-b border-[var(--r-input)] px-0"
    : "border border-[var(--r-input)] px-2.5 shadow-xs";

  return (
    <div className="w-full max-w-5xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 sm:gap-4">
        <ReuiToggle
          label="Style"
          value={style}
          onChange={setStyle}
          options={(Object.keys(REUI_STYLES) as ReuiStyle[]).map((k) => ({ value: k, label: REUI_STYLES[k].label }))}
        />
        <ReuiToggle label="Radius" value={radius} onChange={setRadius} options={[...REUI_RADII]} />
      </div>

      <div className="reui-sample rounded-3xl bg-[#F5F5F7]/70 dark:bg-[#141416]/70 p-6 sm:p-10 transition-all">
        <style>{REUI_TOKEN_CSS}</style>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2" aria-label={`ReUI ${st.label} style sample`}>
          {/* Form card */}
          <div className={card} style={{ borderRadius: px(st.card(radius)) }}>
            <div className="flex items-center justify-between gap-3">
              <p className="text-base font-medium">Team access</p>
              <span
                className="inline-flex h-5 items-center gap-1 bg-[var(--r-primary)] px-2 text-xs font-medium text-[var(--r-primary-fg)]"
                style={{ borderRadius: px(st.badge(radius)) }}
              >
                <Check className="w-3 h-3" aria-hidden="true" /> Active
              </span>
            </div>
            <p className="text-[var(--r-muted-fg)]">Invite people and choose what each role can change.</p>
            <div
              className={`flex items-center text-[var(--r-muted-fg)] ${field}`}
              style={{ height: st.inputH, borderRadius: px(st.input(radius)) }}
            >
              name@company.com
            </div>
            <div className="flex gap-2">
              <span
                className={`${btn} h-9 border-transparent bg-[var(--r-primary)] text-[var(--r-primary-fg)]`}
                style={{ borderRadius: px(st.btn(radius)) }}
              >
                Send invite
              </span>
              <span
                className={`${btn} h-9 border-[var(--r-border)] bg-[var(--r-bg)] shadow-xs`}
                style={{ borderRadius: px(st.btn(radius)) }}
              >
                Cancel
              </span>
            </div>
          </div>

          {/* Settings card: segmented tabs and a switch */}
          <div className={card} style={{ borderRadius: px(st.card(radius)) }}>
            <div
              role="tablist"
              aria-label="Sample tabs"
              className="inline-flex bg-[var(--r-secondary)] p-1"
              style={{ borderRadius: px(st.btn(radius) + 2) }}
            >
              {(["account", "team"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  role="tab"
                  aria-selected={tab === t}
                  onClick={() => setTab(t)}
                  className={`px-3 py-1 font-medium capitalize cursor-pointer ${st.text} ${
                    tab === t ? "bg-[var(--r-bg)] shadow-xs" : "text-[var(--r-muted-fg)]"
                  }`}
                  style={{ borderRadius: px(st.btn(radius)) }}
                >
                  {t}
                </button>
              ))}
            </div>
            <p className="text-base font-medium">{tab === "account" ? "Notifications" : "Members"}</p>
            <div className="flex items-center justify-between gap-4">
              <span className="text-[var(--r-muted-fg)]">
                {tab === "account" ? "Email me about activity" : "Let members invite others"}
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={notify}
                aria-label="Toggle setting"
                onClick={() => setNotify((v) => !v)}
                className={`relative h-5 w-9 shrink-0 cursor-pointer transition-colors ${notify ? "bg-[var(--r-primary)]" : "bg-[var(--r-input)]"}`}
                style={{ borderRadius: st.btn(radius) === 0 ? 0 : 999 }}
              >
                <span
                  className={`absolute top-0.5 h-4 w-4 bg-[var(--r-bg)] transition-all ${notify ? "left-[18px]" : "left-0.5"}`}
                  style={{ borderRadius: st.btn(radius) === 0 ? 0 : 999 }}
                />
              </button>
            </div>
            <pre
              className="bg-[var(--r-secondary)] px-3 py-3 text-xs overflow-x-auto"
              style={{ borderRadius: px(st.input(radius)) }}
            >
              <code>npx shadcn add @reui/badge</code>
            </pre>
          </div>
        </div>
      </div>
      <p className="text-xs text-[#6E6E73] dark:text-[#8E8E93]">
        Built from ReUI&apos;s style rules and neutral tokens, set in Inter. Not a screenshot of ReUI. Lyra and Sera are always sharp, so the radius only changes the other styles.
      </p>
    </div>
  );
}

export default function DesignFoundationsKit() {
  return (
    <section id="design" className="scroll-mt-20 py-12 sm:py-16 bg-white dark:bg-black transition-colors overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <Reveal>
          <div className="max-w-3xl">
            <h2 className={`${SECTION_TITLE} ${TITLE_INK}`}>
              Design languages.
              <br />
              <span className="text-[#6E6E73] dark:text-[#8E8E93] font-medium">
                Apple, Google and ReUI design systems.
              </span>
            </h2>
            <p className={`mt-4 max-w-2xl ${SECTION_LEAD} ${LEAD_GRAY}`}>
              Three ways to build an interface: Apple&apos;s translucent Liquid Glass, Google&apos;s color-led Material 3 Expressive and ReUI&apos;s neutral, copy-in components.
            </p>
          </div>
        </Reveal>

        {/* 1. Top Section Apple Design Language Liquid Glass */}
        <div className="space-y-8 sm:space-y-10">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div className="max-w-3xl space-y-2">
                <h3 className="text-2xl sm:text-4xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
                  Apple Liquid Glass
                </h3>
                <p className="text-sm sm:text-base text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                  A translucent material for controls that float above content, so the content stays in focus.
                </p>
              </div>
  
              {/* Link to Apple Developer Documentation */}
              <a
                href="https://developer.apple.com/documentation/technologyoverviews/adopting-liquid-glass"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0071E3] dark:text-[#2997FF] hover:underline shrink-0 group min-h-[44px]"
              >
                <span>Apple Developer Adopting Liquid Glass</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </Reveal>

          {/* Official Apple Liquid Glass Showcase Image */}
          <Reveal delay={100}>
            <div className="w-full flex justify-center py-2 sm:py-4">
              <div className="relative w-full max-w-5xl aspect-[1024/481]">
                <Image
                  src="/images/designs/foundations/apple-liquid-glass.png"
                  alt="Apple Liquid Glass across Mac, iPad, and iPhone"
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-contain block select-none"
                />
              </div>
            </div>
          </Reveal>

          {/* 4 Apple Liquid Glass Principles */}
          <DesignPrincipleGrid items={FOUNDATION_PRINCIPLES_1} />
        </div>

        {/* 2. Middle Section Google Material 3 Expressive */}
        <div className="space-y-8 sm:space-y-10">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div className="max-w-3xl space-y-2">
                <h3 className="text-2xl sm:text-4xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
                  Google Material 3 Expressive
                </h3>
                <p className="text-sm sm:text-base text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                  Color, shape and motion tuned for emotion, based on Google&apos;s research with more than 18,000 people.
                </p>
              </div>
  
              {/* Link to Google Research */}
              <a
                href="https://design.google/library/expressive-material-design-google-research"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0071E3] dark:text-[#2997FF] hover:underline shrink-0 group min-h-[44px]"
              >
                <span>Google Design UX Research</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </Reveal>

          {/* Official Google Material 3 Expressive Showcase Image */}
          <Reveal delay={100}>
            <div className="w-full flex justify-center py-2 sm:py-4">
              <div className="relative w-full max-w-5xl aspect-[16/9] sm:aspect-[16/9] rounded-3xl overflow-hidden">
                <Image
                  src="/images/designs/foundations/material-3-preview.jpg"
                  alt="Google Material 3 Expressive Design Language Showcase"
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover block select-none"
                />
              </div>
            </div>
          </Reveal>

          {/* 4 Google Expressive UX Pillars from Research */}
          <DesignPrincipleGrid items={FOUNDATION_PRINCIPLES_2} />
        </div>

        {/* 3. ReUI */}
        <div className="space-y-8 sm:space-y-10">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div className="max-w-3xl space-y-2">
                <h3 className="text-2xl sm:text-4xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
                  ReUI
                </h3>
                <p className="text-sm sm:text-base text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                  A shadcn/ui-based component system: neutral surfaces, thin borders and source you own.
                </p>
              </div>

              <a
                href="https://reui.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0071E3] dark:text-[#2997FF] hover:underline shrink-0 group min-h-[44px]"
              >
                <span>ReUI Library</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </Reveal>

          {/* Screenshot of ReUI's Strata template, built from the same components */}
          <Reveal delay={100}>
            <figure className="w-full flex flex-col items-center gap-3 py-2 sm:py-4">
              <div className="relative w-full max-w-5xl aspect-[16/10] rounded-3xl overflow-hidden ring-1 ring-black/[0.08] dark:ring-white/10">
                <Image
                  src="/images/designs/foundations/reui-strata.jpg"
                  alt="ReUI Strata observability dashboard template, showing a sidebar, summary cards and a jobs table"
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover object-top block select-none"
                />
              </div>
            </figure>
          </Reveal>

          <Reveal delay={100}>
            <div className="w-full flex justify-center py-2 sm:py-4">
              <ReuiPreview />
            </div>
          </Reveal>

          <DesignPrincipleGrid items={FOUNDATION_PRINCIPLES_3} />
        </div>
      </div>
    </section>
  );
}
