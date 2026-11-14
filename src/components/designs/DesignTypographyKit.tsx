"use client";

import { useState } from "react";
import {
  Sparkles,
  Layers,
  Sliders,
  Compass,
  Eye,
  Globe,
  Cpu,
} from "lucide-react";
import DesignPrincipleGrid, { type Principle } from "./DesignPrincipleGrid";
import DesignSpecimenToggle from "./DesignSpecimenToggle";
import DesignSectionHeading from "./DesignSectionHeading";
import Reveal from "@/components/shared/Reveal";
import { LEAD_GRAY, SECTION_LEAD, SECTION_TITLE, TITLE_INK } from "@/components/shared/typeScale";

export type TypeSystem = "apple" | "google" | "reui";

export const TYPE_SYSTEM_OPTIONS: { value: TypeSystem; label: string }[] = [
  { value: "apple", label: "San Francisco" },
  { value: "google", label: "Google Fonts" },
  { value: "reui", label: "ReUI" },
];

// Apple San Francisco
export const TYPE_PRINCIPLES_1: Principle[] = [
  {
    icon: Sliders,
    color: "text-[#0071E3] dark:text-[#2997FF]",
    title: "Spacing adapts to size",
    body: "Tighter spacing on large titles, looser spacing on small text.",
  },
  {
    icon: Eye,
    color: "text-[#AF52DE]",
    title: "Text and Display cuts",
    body: "Letter shapes change between the Text and Display cuts as size increases.",
  },
  {
    icon: Layers,
    color: "text-[#34C759]",
    title: "Rounded option",
    body: "SF Rounded gives a friendlier tone for consumer apps.",
  },
  {
    icon: Cpu,
    color: "text-[#FF9500]",
    title: "One family across Apple devices",
    body: "The same typeface runs on iPhone, iPad, Mac and Apple Watch.",
  },
];

// Google Fonts and Variable Systems
export const TYPE_PRINCIPLES_2: Principle[] = [
  {
    icon: Sliders,
    color: "text-[#0071E3] dark:text-[#2997FF]",
    title: "One file, every weight",
    body: "A variable font covers weights 100 to 900 from a single file.",
  },
  {
    icon: Sparkles,
    color: "text-[#AF52DE]",
    title: "Open letterforms",
    body: "Wide letter openings keep text readable at small sizes.",
  },
  {
    icon: Globe,
    color: "text-[#34C759]",
    title: "Many scripts",
    body: "Google Fonts covers Latin, Cyrillic, Greek and many other scripts.",
  },
  {
    icon: Compass,
    color: "text-[#FF9500]",
    title: "Open licensing",
    body: "Most Google Fonts are open source, so designers and developers can use the same files.",
  },
];

// ReUI
export const TYPE_PRINCIPLES_3: Principle[] = [
  {
    icon: Sliders,
    color: "text-[#0071E3] dark:text-[#2997FF]",
    title: "Inter, end to end",
    body: "ReUI sets every component in Inter, so headings, labels and tables share one voice.",
  },
  {
    icon: Eye,
    color: "text-[#AF52DE]",
    title: "Built for interfaces",
    body: "Tall x-height and open shapes keep dense UI text clear at small sizes.",
  },
  {
    icon: Layers,
    color: "text-[#34C759]",
    title: "Variable weights",
    body: "One variable file covers weights 100 to 900, so hierarchy comes from weight, not extra fonts.",
  },
  {
    icon: Cpu,
    color: "text-[#FF9500]",
    title: "Neutral by design",
    body: "A quiet typeface lets the component styling carry the look.",
  },
];

const WEIGHT_OPTIONS = [
  { value: 300, label: "Light 300" },
  { value: 400, label: "Regular 400" },
  { value: 600, label: "Semibold 600" },
  { value: 700, label: "Bold 700" },
] as const;

const SIZE_OPTIONS = [
  { value: 18, label: "18px" },
  { value: 24, label: "24px" },
  { value: 40, label: "40px" },
] as const;

type Weight = (typeof WEIGHT_OPTIONS)[number]["value"];
type Size = (typeof SIZE_OPTIONS)[number]["value"];

function Specimen({
  title,
  caption,
  detail,
  family,
  weight,
  size,
  note,
}: {
  title: string;
  caption: string;
  detail: string;
  family: string;
  weight: number;
  size: number;
  note?: string;
}) {
  return (
    <div className="p-6 sm:p-10 rounded-3xl bg-[#F5F5F7]/70 dark:bg-[#141416]/70 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs text-[#6E6E73] dark:text-[#8E8E93]">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">{title}</span>
          <span aria-hidden="true">·</span>
          <span>{caption}</span>
          <span aria-hidden="true">·</span>
          <span>{detail}</span>
        </div>
        <span>Weight {weight}</span>
      </div>

      <div
        className="text-4xl sm:text-6xl text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight transition-all duration-300 break-words"
        style={{ fontFamily: family, fontWeight: weight }}
      >
        Aa Bb Gg Rr 123
      </div>

      <div
        className="text-[#1D1D1F]/90 dark:text-[#F5F5F7]/90 transition-all duration-300 leading-snug"
        style={{ fontSize: size, fontFamily: family, fontWeight: weight }}
      >
        Sphinx of black quartz, judge my vow
      </div>

      <div
        className="text-xs text-[#6E6E73] dark:text-[#8E8E93] tracking-widest uppercase transition-all duration-300 pt-2"
        style={{ fontFamily: family }}
      >
        A B C D E F G H I J K L M N O P Q R S T U V W X Y Z 0 1 2 3 4 5 6 7 8 9
      </div>

      {note && <p className="text-xs text-[#6E6E73] dark:text-[#8E8E93] border-t border-black/[0.06] dark:border-white/10 pt-4">{note}</p>}
    </div>
  );
}

export const APPLE_FAMILIES = {
  display: { label: "SF Display", css: '-apple-system, BlinkMacSystemFont, "SF Pro Display", var(--font-inter), sans-serif' },
  text: { label: "SF Text", css: '-apple-system, BlinkMacSystemFont, "SF Pro Text", var(--font-inter), sans-serif' },
  rounded: { label: "SF Rounded", css: '"SF Pro Rounded", -apple-system, BlinkMacSystemFont, var(--font-inter), sans-serif' },
} as const;

// Loaded for this route in app/designs/layout.tsx (Inter is loaded site-wide).
export const GOOGLE_FAMILIES = {
  roboto: { label: "Roboto Flex", css: "var(--font-roboto-flex), sans-serif" },
  sans: { label: "Google Sans", css: "var(--font-google-sans), sans-serif" },
} as const;

function Wrapper({ embedded, id, children }: { embedded: boolean; id: string; children: React.ReactNode }) {
  if (embedded) return <div className="space-y-8 sm:space-y-10">{children}</div>;
  return (
    <section id={id} className="scroll-mt-20 py-12 sm:py-16 bg-white dark:bg-black transition-colors overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-12 sm:space-y-16">{children}</div>
    </section>
  );
}

const REUI_FAMILY = "var(--font-inter), sans-serif";

export default function DesignTypographyKit({
  embedded = false,
  system: systemProp,
}: {
  embedded?: boolean;
  /** When embedded, the parent owns the system switcher and passes the choice in. */
  system?: TypeSystem;
}) {
  const [ownSystem, setSystem] = useState<TypeSystem>("apple");
  const system = systemProp ?? ownSystem;

  const [reuiWeight, setReuiWeight] = useState<Weight>(400);
  const [reuiSize, setReuiSize] = useState<Size>(24);
  const [appleWeight, setAppleWeight] = useState<Weight>(400);
  const [appleVariant, setAppleVariant] = useState<keyof typeof APPLE_FAMILIES>("display");
  const [appleSize, setAppleSize] = useState<Size>(24);

  const [googleWeight, setGoogleWeight] = useState<Weight>(400);
  const [googleFont, setGoogleFont] = useState<keyof typeof GOOGLE_FAMILIES>("roboto");
  const [googleSize, setGoogleSize] = useState<Size>(24);

  return (
    <Wrapper embedded={embedded} id="typography">
        {/* Section Header */}
        {!embedded && (
        <Reveal>
          <div className="max-w-3xl">
            <h2 className={`${SECTION_TITLE} ${TITLE_INK}`}>
              Typography systems.
              <br />
              <span className="text-[#6E6E73] dark:text-[#8E8E93] font-medium">
                San Francisco, Google Fonts and ReUI.
              </span>
            </h2>
            <p className={`mt-4 max-w-2xl ${SECTION_LEAD} ${LEAD_GRAY}`}>
              Pick a system, then change the weight and size to see how each typeface behaves.
            </p>
            <div className="mt-6">
              <DesignSpecimenToggle
                label="System"
                value={system}
                onChange={setSystem}
                options={[
                  { value: "apple", label: "San Francisco" },
                  { value: "google", label: "Google Fonts" },
                  { value: "reui", label: "ReUI" },
                ]}
              />
            </div>
          </div>
        </Reveal>

        )}

        {/* 1. Apple San Francisco */}
        {system === "apple" && (
        <div className="space-y-8 sm:space-y-10">
          <Reveal>
            <DesignSectionHeading
              title="Apple San Francisco"
              description="Apple's system typeface. Spacing and shapes adjust with size, from small labels to large titles."
              href="https://developer.apple.com/fonts/"
              linkLabel="Apple Developer Fonts"
            />
          </Reveal>

          <Reveal delay={100}>
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 py-2">
                <DesignSpecimenToggle
                  label="Cut"
                  value={appleVariant}
                  onChange={setAppleVariant}
                  options={(Object.keys(APPLE_FAMILIES) as (keyof typeof APPLE_FAMILIES)[]).map((key) => ({
                    value: key,
                    label: APPLE_FAMILIES[key].label,
                  }))}
                />
                <DesignSpecimenToggle label="Weight" value={appleWeight} onChange={setAppleWeight} options={[...WEIGHT_OPTIONS]} />
                <DesignSpecimenToggle label="Size" value={appleSize} onChange={setAppleSize} options={[...SIZE_OPTIONS]} />
              </div>
  
              <Specimen
                title="San Francisco"
                caption="Apple Typography"
                detail={APPLE_FAMILIES[appleVariant].label}
                family={APPLE_FAMILIES[appleVariant].css}
                weight={appleWeight}
                size={appleSize}
                note="San Francisco is licensed to Apple platforms, so it renders on Mac, iPhone and iPad. On other devices this specimen falls back to Inter."
              />
            </div>
          </Reveal>

          <DesignPrincipleGrid items={TYPE_PRINCIPLES_1} />
        </div>
        )}

        {/* 2. Google Fonts and Variable Systems */}
        {system === "google" && (
        <div className="space-y-8 sm:space-y-10">
          <Reveal>
            <DesignSectionHeading
              title="Google Fonts and Variable Systems"
              description="Open-source variable fonts you can load on any site, with a continuous weight range."
              href="https://fonts.google.com/"
              linkLabel="Google Fonts Library"
            />
          </Reveal>

          <Reveal delay={100}>
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 py-2">
                <DesignSpecimenToggle
                  label="Family"
                  value={googleFont}
                  onChange={setGoogleFont}
                  options={(Object.keys(GOOGLE_FAMILIES) as (keyof typeof GOOGLE_FAMILIES)[]).map((key) => ({
                    value: key,
                    label: GOOGLE_FAMILIES[key].label,
                  }))}
                />
                <DesignSpecimenToggle label="Weight" value={googleWeight} onChange={setGoogleWeight} options={[...WEIGHT_OPTIONS]} />
                <DesignSpecimenToggle label="Size" value={googleSize} onChange={setGoogleSize} options={[...SIZE_OPTIONS]} />
              </div>
  
              <Specimen
                title={GOOGLE_FAMILIES[googleFont].label}
                caption="Google Fonts"
                detail="Variable"
                family={GOOGLE_FAMILIES[googleFont].css}
                weight={googleWeight}
                size={googleSize}
              />
            </div>
          </Reveal>

          <DesignPrincipleGrid items={TYPE_PRINCIPLES_2} />
        </div>
        )}

        {/* 3. ReUI */}
        {system === "reui" && (
        <div className="space-y-8 sm:space-y-10">
          <Reveal>
            <DesignSectionHeading
              title="ReUI"
              description="The typeface behind ReUI's components: Inter, a variable font tuned for interfaces."
              href="https://reui.io/"
              linkLabel="ReUI Library"
            />
          </Reveal>

          <Reveal delay={100}>
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 py-2">
                <DesignSpecimenToggle label="Weight" value={reuiWeight} onChange={setReuiWeight} options={[...WEIGHT_OPTIONS]} />
                <DesignSpecimenToggle label="Size" value={reuiSize} onChange={setReuiSize} options={[...SIZE_OPTIONS]} />
              </div>

              <Specimen
                title="Inter"
                caption="ReUI"
                detail="Variable"
                family={REUI_FAMILY}
                weight={reuiWeight}
                size={reuiSize}
              />
            </div>
          </Reveal>

          <DesignPrincipleGrid items={TYPE_PRINCIPLES_3} />
        </div>
        )}
    </Wrapper>
  );
}
