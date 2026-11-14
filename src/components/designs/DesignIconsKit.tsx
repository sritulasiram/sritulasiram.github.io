"use client";

import { useState } from "react";
import {
  Sparkles,
  Layers,
  Sliders,
  Compass,
  Grid,
  Code,
  Eye,
  Heart,
  Bookmark,
  Bell,
  User,
  ShieldCheck,
  Flag,
  Folder,
  MessageCircle,
  BadgeCheck,
  Layers as LayersIcon,
  type LucideIcon,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faFlag as solidFlag,
  faBookmark as solidBookmark,
  faHeart as solidHeart,
  faFolder as solidFolder,
  faUser as solidUser,
  faBell as solidBell,
  faCompass as solidCompass,
  faStar as solidStar,
  faEye as solidEye,
  faComment as solidComment,
  faCircleCheck as solidCircleCheck,
  faLightbulb as solidLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFlag as regularFlag,
  faBookmark as regularBookmark,
  faHeart as regularHeart,
  faFolder as regularFolder,
  faUser as regularUser,
  faBell as regularBell,
  faCompass as regularCompass,
  faStar as regularStar,
  faEye as regularEye,
  faComment as regularComment,
  faCircleCheck as regularCircleCheck,
  faLightbulb as regularLightbulb,
} from "@fortawesome/free-regular-svg-icons";
import { MUI_ICON_PATHS, type MuiIconStyle } from "@/data/materialIcons";
import DesignPrincipleGrid, { type Principle } from "./DesignPrincipleGrid";
import DesignSpecimenToggle from "./DesignSpecimenToggle";
import DesignSectionHeading from "./DesignSectionHeading";
import Reveal from "@/components/shared/Reveal";
import { LEAD_GRAY, SECTION_LEAD, SECTION_TITLE, TITLE_INK } from "@/components/shared/typeScale";

// Real Font Awesome Free glyphs: the same icon in its Solid and Regular style.
export const FA_ICONS: { name: string; solid: IconDefinition; regular: IconDefinition }[] = [
  { name: "Flag", solid: solidFlag, regular: regularFlag },
  { name: "Bookmark", solid: solidBookmark, regular: regularBookmark },
  { name: "Heart", solid: solidHeart, regular: regularHeart },
  { name: "Folder", solid: solidFolder, regular: regularFolder },
  { name: "User", solid: solidUser, regular: regularUser },
  { name: "Bell", solid: solidBell, regular: regularBell },
  { name: "Compass", solid: solidCompass, regular: regularCompass },
  { name: "Star", solid: solidStar, regular: regularStar },
  { name: "Eye", solid: solidEye, regular: regularEye },
  { name: "Comment", solid: solidComment, regular: regularComment },
  { name: "Circle check", solid: solidCircleCheck, regular: regularCircleCheck },
  { name: "Lightbulb", solid: solidLightbulb, regular: regularLightbulb },
];

// Real Material Symbols: ligature names in the self-hosted subset font (public/fonts).
export const MATERIAL_ICONS: { name: string; glyph: string }[] = [
  { name: "Favorite", glyph: "favorite" },
  { name: "Bookmark", glyph: "bookmark" },
  { name: "Notifications", glyph: "notifications" },
  { name: "Person", glyph: "person" },
  { name: "Shield", glyph: "shield" },
  { name: "Flag", glyph: "flag" },
  { name: "Folder", glyph: "folder" },
  { name: "Chat", glyph: "chat" },
  { name: "Verified", glyph: "verified" },
  { name: "Explore", glyph: "explore" },
  { name: "Visibility", glyph: "visibility" },
  { name: "Layers", glyph: "layers" },
];

// Material UI Icons: the classic Material Icons set, drawn in five styles.
export const MUI_ICONS: { name: string; key: string }[] = [
  { name: "Favorite", key: "favorite" },
  { name: "Bookmark", key: "bookmark" },
  { name: "Notifications", key: "notifications" },
  { name: "Person", key: "person" },
  { name: "Shield", key: "shield" },
  { name: "Flag", key: "flag" },
  { name: "Folder", key: "folder" },
  { name: "Chat", key: "chat" },
  { name: "Verified", key: "verified" },
  { name: "Explore", key: "explore" },
  { name: "Visibility", key: "visibility" },
  { name: "Layers", key: "layers" },
];

// ReUI icons: ReUI sets lucide as its icon library (components.json).
export const REUI_ICONS: { name: string; icon: LucideIcon }[] = [
  { name: "Heart", icon: Heart },
  { name: "Bookmark", icon: Bookmark },
  { name: "Bell", icon: Bell },
  { name: "User", icon: User },
  { name: "Shield check", icon: ShieldCheck },
  { name: "Flag", icon: Flag },
  { name: "Folder", icon: Folder },
  { name: "Message", icon: MessageCircle },
  { name: "Badge check", icon: BadgeCheck },
  { name: "Compass", icon: Compass },
  { name: "Eye", icon: Eye },
  { name: "Layers", icon: LayersIcon },
];

export type IconSystem = "fa" | "symbols" | "mui" | "reui";

export const ICON_SYSTEM_OPTIONS: { value: IconSystem; label: string }[] = [
  { value: "fa", label: "Font Awesome" },
  { value: "symbols", label: "Material Symbols" },
  { value: "mui", label: "Material UI Icons" },
  { value: "reui", label: "ReUI" },
];

// Font Awesome Icon System
export const ICON_PRINCIPLES_1: Principle[] = [
  {
    icon: Grid,
    color: "text-[#0071E3] dark:text-[#2997FF]",
    title: "Drawn on a grid",
    body: "Each icon is drawn on a consistent grid, so strokes line up at common sizes.",
  },
  {
    icon: Layers,
    color: "text-[#AF52DE]",
    title: "Multi Weight Harmony",
    body: "Consistent visual density across the solid and regular styles shown here. Light, thin, and duotone are Pro styles.",
  },
  {
    icon: Code,
    color: "text-[#34C759]",
    title: "Scalable Vector Formats",
    body: "Vectors stay sharp at any size.",
  },
  {
    icon: Compass,
    color: "text-[#FF9500]",
    title: "Searchable names",
    body: "Icons are named and grouped by meaning, so they're easy to find.",
  },
];

// Google Material Symbols
export const ICON_PRINCIPLES_2: Principle[] = [
  {
    icon: Sliders,
    color: "text-[#0071E3] dark:text-[#2997FF]",
    title: "One file, four axes",
    body: "Weight, fill, grade and optical size all adjust continuously from a single font file.",
  },
  {
    icon: Sparkles,
    color: "text-[#AF52DE]",
    title: "Outlined to filled",
    body: "Switch between outlined and filled glyphs to show which item is active.",
  },
  {
    icon: Eye,
    color: "text-[#34C759]",
    title: "Optical size",
    body: "Strokes thicken slightly at small sizes so icons stay clear.",
  },
  {
    icon: Compass,
    color: "text-[#FF9500]",
    title: "Built for screens",
    body: "Simple shapes that stay recognizable in dense mobile layouts.",
  },
];

// Material UI Icons
export const ICON_PRINCIPLES_3: Principle[] = [
  {
    icon: Layers,
    color: "text-[#0071E3] dark:text-[#2997FF]",
    title: "Five styles",
    body: "Filled, Outlined, Rounded, Sharp and Two Tone cover the same glyphs in different tones.",
  },
  {
    icon: Grid,
    color: "text-[#AF52DE]",
    title: "24px grid",
    body: "Every glyph sits on the same 24px grid with consistent padding and stroke.",
  },
  {
    icon: Code,
    color: "text-[#34C759]",
    title: "Ready for React",
    body: "Each icon ships as a React component built on SVG, so it scales and takes any colour.",
  },
  {
    icon: Compass,
    color: "text-[#FF9500]",
    title: "Same names as Google",
    body: "Names match Google's Material Icons, so a design and its code stay in sync.",
  },
];

// ReUI
export const ICON_PRINCIPLES_4: Principle[] = [
  {
    icon: Sliders,
    color: "text-[#0071E3] dark:text-[#2997FF]",
    title: "Adjustable stroke",
    body: "Stroke width is a single value, so one set can run from light to bold.",
  },
  {
    icon: Grid,
    color: "text-[#AF52DE]",
    title: "Consistent 24px grid",
    body: "Every icon uses the same grid, round caps and round joins.",
  },
  {
    icon: Code,
    color: "text-[#34C759]",
    title: "Lucide in ReUI",
    body: "ReUI is configured with Lucide as its icon library, so components pull from this set.",
  },
  {
    icon: Sparkles,
    color: "text-[#FF9500]",
    title: "Tree-shakeable",
    body: "Each icon is its own React component, so only the icons you use ship.",
  },
];

function SpecimenTile({ name, children, box }: { name: string; children: React.ReactNode; box: number }) {
  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-4 rounded-2xl transition-all duration-200 motion-safe:hover:scale-105">
      <div className="flex items-center justify-center transition-all duration-300" style={{ width: box, height: box }}>
        {children}
      </div>
      <span className="text-xs font-medium text-[#6E6E73] dark:text-[#8E8E93] mt-2">{name}</span>
    </div>
  );
}

function Wrapper({ embedded, id, children }: { embedded: boolean; id: string; children: React.ReactNode }) {
  if (embedded) return <div className="space-y-8 sm:space-y-10">{children}</div>;
  return (
    <section id={id} className="scroll-mt-20 py-12 sm:py-16 bg-white dark:bg-black transition-colors overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-12 sm:space-y-16">{children}</div>
    </section>
  );
}

export default function DesignIconsKit({
  embedded = false,
  system: systemProp,
}: {
  embedded?: boolean;
  /** When embedded, the parent owns the system switcher and passes the choice in. */
  system?: IconSystem;
}) {
  const [ownSystem, setSystem] = useState<IconSystem>("fa");
  const system = systemProp ?? ownSystem;

  const [muiStyle, setMuiStyle] = useState<MuiIconStyle>("outlined");
  const [muiSize, setMuiSize] = useState<20 | 24 | 36>(24);

  const [reuiStroke, setReuiStroke] = useState<1 | 1.5 | 2>(2);
  const [reuiSize, setReuiSize] = useState<20 | 24 | 36>(24);
  const [faStyle, setFaStyle] = useState<"solid" | "regular">("regular");
  const [faSize, setFaSize] = useState<16 | 24 | 32>(24);

  const [matWeight, setMatWeight] = useState<200 | 400 | 700>(400);
  const [matFilled, setMatFilled] = useState<boolean>(false);
  const [matSize, setMatSize] = useState<20 | 24 | 36>(24);

  return (
    <Wrapper embedded={embedded} id="icons">
        {/* Section Header */}
        {!embedded && (
        <Reveal>
          <div className="max-w-3xl">
            <h2 className={`${SECTION_TITLE} ${TITLE_INK}`}>
              Icon systems.
              <br />
              <span className="text-[#6E6E73] dark:text-[#8E8E93] font-medium">
                Four icon systems in one place.
              </span>
            </h2>
            <p className={`mt-4 max-w-2xl ${SECTION_LEAD} ${LEAD_GRAY}`}>
              Font Awesome&apos;s fixed styles, Material Symbols&apos; variable axes and the Material UI icon set and ReUI&apos;s Lucide icons. Pick a system, then change its settings.
            </p>
            <div className="mt-6">
              <DesignSpecimenToggle
                label="System"
                value={system}
                onChange={setSystem}
                options={[
                  { value: "fa", label: "Font Awesome" },
                  { value: "symbols", label: "Material Symbols" },
                  { value: "mui", label: "Material UI Icons" },
                  { value: "reui", label: "ReUI" },
                ]}
              />
            </div>
          </div>
        </Reveal>

        )}

        {/* 1. Font Awesome Icon System */}
        {system === "fa" && (
        <div className="space-y-8 sm:space-y-10">
          <Reveal>
            <DesignSectionHeading
              title="Font Awesome Icon System"
              description="Two fixed styles, Solid and Regular. Switch between them to compare."
              href="https://fontawesome.com/"
              linkLabel="Font Awesome Library"
            />
          </Reveal>

          <Reveal delay={100}>
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 sm:gap-4 py-2">
                <DesignSpecimenToggle
                  label="Style"
                  value={faStyle}
                  onChange={setFaStyle}
                  options={[
                    { value: "solid", label: "Solid" },
                    { value: "regular", label: "Regular" },
                  ]}
                />
                <DesignSpecimenToggle
                  label="Scale"
                  value={faSize}
                  onChange={setFaSize}
                  options={[
                    { value: 16, label: "16px" },
                    { value: 24, label: "24px" },
                    { value: 32, label: "32px" },
                  ]}
                />
              </div>
  
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-x-2 gap-y-4 sm:gap-6 py-2 sm:py-4">
                {FA_ICONS.map((icon, i) => (
                  <Reveal key={icon.name} delay={(i % 6) * 50}>
                    <SpecimenTile name={icon.name} box={faSize + 20}>
                      <FontAwesomeIcon
                        icon={faStyle === "solid" ? icon.solid : icon.regular}
                        style={{ fontSize: faSize }}
                        className="text-[#1D1D1F] dark:text-[#F5F5F7] transition-all duration-200"
                        fixedWidth
                      />
                    </SpecimenTile>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>

          <DesignPrincipleGrid items={ICON_PRINCIPLES_1} />
        </div>
        )}

        {/* 2. Google Material Symbols */}
        {system === "symbols" && (
        <div className="space-y-8 sm:space-y-10">
          <Reveal>
            <DesignSectionHeading
              title="Google Material Symbols"
              description="A variable icon font with continuous weight, fill, and optical-size axes, set live below."
              href="https://fonts.google.com/icons"
              linkLabel="Google Material Symbols Library"
            />
          </Reveal>

          <Reveal delay={100}>
            <div className="space-y-8">
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 sm:gap-4 py-2">
                <DesignSpecimenToggle
                  label="Weight"
                  value={matWeight}
                  onChange={setMatWeight}
                  options={[
                    { value: 200, label: "Light 200" },
                    { value: 400, label: "Regular 400" },
                    { value: 700, label: "Bold 700" },
                  ]}
                />
                <DesignSpecimenToggle
                  label="Fill"
                  value={matFilled}
                  onChange={setMatFilled}
                  options={[
                    { value: false, label: "Outlined" },
                    { value: true, label: "Filled" },
                  ]}
                />
                <DesignSpecimenToggle
                  label="Optical size"
                  value={matSize}
                  onChange={setMatSize}
                  options={[
                    { value: 20, label: "20px" },
                    { value: 24, label: "24px" },
                    { value: 36, label: "36px" },
                  ]}
                />
              </div>
  
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-x-2 gap-y-4 sm:gap-6 py-2 sm:py-4">
                {MATERIAL_ICONS.map((icon, i) => (
                  <Reveal key={icon.name} delay={(i % 6) * 50}>
                    <SpecimenTile name={icon.name} box={matSize + 22}>
                      <span
                        aria-hidden="true"
                        className="material-symbols text-[#1D1D1F] dark:text-[#F5F5F7]"
                        style={{
                          fontSize: matSize,
                          fontVariationSettings: `'FILL' ${matFilled ? 1 : 0}, 'wght' ${matWeight}, 'opsz' ${matSize}`,
                        }}
                      >
                        {icon.glyph}
                      </span>
                    </SpecimenTile>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>

          <DesignPrincipleGrid items={ICON_PRINCIPLES_2} />
        </div>
        )}

        {/* 3. Material UI Icons */}
        {system === "mui" && (
        <div className="space-y-8 sm:space-y-10">
          <Reveal>
            <DesignSectionHeading
              title="Material UI Icons"
              description="Google's classic Material Icons as SVG, in five styles. Switch style and size to compare."
              href="https://mui.com/material-ui/material-icons/"
              linkLabel="Material UI Icons Library"
            />
          </Reveal>

          <Reveal delay={100}>
            <div className="space-y-8">
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 sm:gap-4 py-2">
                <DesignSpecimenToggle
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
                <DesignSpecimenToggle
                  label="Scale"
                  value={muiSize}
                  onChange={setMuiSize}
                  options={[
                    { value: 20, label: "20px" },
                    { value: 24, label: "24px" },
                    { value: 36, label: "36px" },
                  ]}
                />
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-x-2 gap-y-4 sm:gap-6 py-2 sm:py-4">
                {MUI_ICONS.map((icon, i) => (
                  <Reveal key={icon.name} delay={(i % 6) * 50}>
                    <SpecimenTile name={icon.name} box={muiSize + 22}>
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        width={muiSize}
                        height={muiSize}
                        fill="currentColor"
                        className="text-[#1D1D1F] dark:text-[#F5F5F7] transition-all duration-200"
                        dangerouslySetInnerHTML={{ __html: MUI_ICON_PATHS[icon.key][muiStyle] }}
                      />
                    </SpecimenTile>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>

          <DesignPrincipleGrid items={ICON_PRINCIPLES_3} />
        </div>
        )}

        {/* 4. ReUI */}
        {system === "reui" && (
        <div className="space-y-8 sm:space-y-10">
          <Reveal>
            <DesignSectionHeading
              title="ReUI"
              description="The Lucide icons ReUI uses across its components, with stroke width set live below."
              href="https://reui.io/"
              linkLabel="ReUI Library"
            />
          </Reveal>

          <Reveal delay={100}>
            <div className="space-y-8">
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 sm:gap-4 py-2">
                <DesignSpecimenToggle
                  label="Stroke"
                  value={reuiStroke}
                  onChange={setReuiStroke}
                  options={[
                    { value: 1, label: "Thin 1" },
                    { value: 1.5, label: "Light 1.5" },
                    { value: 2, label: "Regular 2" },
                  ]}
                />
                <DesignSpecimenToggle
                  label="Scale"
                  value={reuiSize}
                  onChange={setReuiSize}
                  options={[
                    { value: 20, label: "20px" },
                    { value: 24, label: "24px" },
                    { value: 36, label: "36px" },
                  ]}
                />
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-x-2 gap-y-4 sm:gap-6 py-2 sm:py-4">
                {REUI_ICONS.map(({ name, icon: Icon }, i) => (
                  <Reveal key={name} delay={(i % 6) * 50}>
                    <SpecimenTile name={name} box={reuiSize + 22}>
                      <Icon
                        aria-hidden="true"
                        size={reuiSize}
                        strokeWidth={reuiStroke}
                        className="text-[#1D1D1F] dark:text-[#F5F5F7] transition-all duration-200"
                      />
                    </SpecimenTile>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>

          <DesignPrincipleGrid items={ICON_PRINCIPLES_4} />
        </div>
        )}
    </Wrapper>
  );
}
