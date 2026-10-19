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
import DesignPrincipleGrid, { type Principle } from "./DesignPrincipleGrid";
import DesignSpecimenToggle from "./DesignSpecimenToggle";
import DesignSectionHeading from "./DesignSectionHeading";

// Real Font Awesome Free glyphs: the same icon in its Solid and Regular style.
const FA_ICONS: { name: string; solid: IconDefinition; regular: IconDefinition }[] = [
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
const MATERIAL_ICONS: { name: string; glyph: string }[] = [
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

// Font Awesome Icon System
const ICON_PRINCIPLES_1: Principle[] = [
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
const ICON_PRINCIPLES_2: Principle[] = [
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

export default function DesignIconsKit() {
  const [faStyle, setFaStyle] = useState<"solid" | "regular">("regular");
  const [faSize, setFaSize] = useState<16 | 24 | 32>(24);

  const [matWeight, setMatWeight] = useState<200 | 400 | 700>(400);
  const [matFilled, setMatFilled] = useState<boolean>(false);
  const [matSize, setMatSize] = useState<20 | 24 | 36>(24);

  return (
    <section id="icons" className="scroll-mt-20 py-12 sm:py-16 bg-white dark:bg-black transition-colors overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <h2 className="text-3xl sm:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight leading-[1.08] text-balance">
            Icon systems.
            <br />
            <span className="text-[#6E6E73] dark:text-[#8E8E93] font-medium">
              Two icon systems, side by side.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#6E6E73] dark:text-[#A1A1A6] font-normal leading-relaxed">
            Font Awesome&apos;s fixed styles next to Material Symbols&apos; variable axes. Change the settings to compare.
          </p>
        </div>

        {/* 1. Font Awesome Icon System */}
        <div className="space-y-8 sm:space-y-10">
          <DesignSectionHeading
            title="Font Awesome Icon System"
            description="Two fixed styles, Solid and Regular. Switch between them to compare."
            href="https://fontawesome.com/"
            linkLabel="Font Awesome Library"
          />

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
              {FA_ICONS.map((icon) => (
                <SpecimenTile key={icon.name} name={icon.name} box={faSize + 20}>
                  <FontAwesomeIcon
                    icon={faStyle === "solid" ? icon.solid : icon.regular}
                    style={{ fontSize: faSize }}
                    className="text-[#1D1D1F] dark:text-[#F5F5F7] transition-all duration-200"
                    fixedWidth
                  />
                </SpecimenTile>
              ))}
            </div>
          </div>

          <DesignPrincipleGrid items={ICON_PRINCIPLES_1} />
        </div>

        {/* 2. Google Material Symbols */}
        <div className="space-y-8 sm:space-y-10">
          <DesignSectionHeading
            title="Google Material Symbols"
            description="A variable icon font with continuous weight, fill, and optical-size axes, set live below."
            href="https://fonts.google.com/icons"
            linkLabel="Google Material Symbols Library"
          />

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
              {MATERIAL_ICONS.map((icon) => (
                <SpecimenTile key={icon.name} name={icon.name} box={matSize + 22}>
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
              ))}
            </div>
          </div>

          <DesignPrincipleGrid items={ICON_PRINCIPLES_2} />
        </div>
      </div>
    </section>
  );
}
