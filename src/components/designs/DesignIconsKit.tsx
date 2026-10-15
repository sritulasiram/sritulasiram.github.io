"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Sparkles,
  Layers,
  Sliders,
  Compass,
  Bookmark,
  Shield,
  Flag,
  Zap,
  Folder,
  Code,
  Terminal,
  Bell,
  User,
  Grid,
  Star,
  MessageSquare,
  CheckCircle2,
  Eye,
} from "lucide-react";

export default function DesignIconsKit() {
  // 1. Font Awesome State
  const [faStyle, setFaStyle] = useState<"solid" | "regular" | "light" | "duotone">("regular");
  const [faSize, setFaSize] = useState<16 | 24 | 32>(24);

  // 2. Material Symbols State
  const [matWeight, setMatWeight] = useState<200 | 400 | 700>(400);
  const [matFilled, setMatFilled] = useState<boolean>(false);
  const [matSize, setMatSize] = useState<20 | 24 | 36>(24);

  // Closed shape icons for Font Awesome
  const closedShapeIcons = new Set([
    "Flag",
    "Shield",
    "Bookmark",
    "Zap",
    "Heart",
    "Folder",
    "User",
    "Bell",
  ]);

  // Curated Font Awesome Icons
  const faIcons = [
    { name: "Flag", Icon: Flag },
    { name: "Shield", Icon: Shield },
    { name: "Bookmark", Icon: Bookmark },
    { name: "Zap", Icon: Zap },
    { name: "Compass", Icon: Compass },
    { name: "Heart", Icon: Star },
    { name: "Folder", Icon: Folder },
    { name: "Code", Icon: Code },
    { name: "Terminal", Icon: Terminal },
    { name: "Sparkles", Icon: Sparkles },
    { name: "User", Icon: User },
    { name: "Bell", Icon: Bell },
  ];

  // Curated Material Symbols Icons
  const matIcons = [
    { name: "Favorite", Icon: Star },
    { name: "Bookmark", Icon: Bookmark },
    { name: "Notifications", Icon: Bell },
    { name: "Account", Icon: User },
    { name: "Shield", Icon: Shield },
    { name: "Flag", Icon: Flag },
    { name: "Folder", Icon: Folder },
    { name: "Chat", Icon: MessageSquare },
    { name: "Verified", Icon: CheckCircle2 },
    { name: "Compass", Icon: Compass },
    { name: "Visibility", Icon: Eye },
    { name: "Layers", Icon: Layers },
  ];

  // Helper for FA stroke weights
  const getFaStrokeWidth = (iconName: string) => {
    const isClosed = closedShapeIcons.has(iconName);
    if (faStyle === "solid") return isClosed ? 1.0 : 2.5;
    if (faStyle === "light") return 1.1;
    if (faStyle === "duotone") return 1.6;
    return 1.75;
  };

  // Helper for FA classes
  const getFaIconClasses = (iconName: string) => {
    const isClosed = closedShapeIcons.has(iconName);

    if (faStyle === "solid") {
      if (isClosed) {
        return "fill-[#1D1D1F] dark:fill-[#F5F5F7] text-[#1D1D1F] dark:text-[#F5F5F7]";
      }
      return "fill-none text-[#1D1D1F] dark:text-[#F5F5F7]";
    }

    if (faStyle === "duotone") {
      if (isClosed) {
        return "fill-[#0071E3]/25 dark:fill-[#2997FF]/30 text-[#0071E3] dark:text-[#2997FF]";
      }
      return "fill-none text-[#0071E3] dark:text-[#2997FF]";
    }

    return "fill-none text-[#1D1D1F] dark:text-[#F5F5F7]";
  };

  // Helper for Material Symbols stroke weights
  const getMatStrokeWidth = () => {
    const opticalFactor = matSize === 20 ? 1.15 : matSize === 24 ? 1.0 : 0.85;
    if (matWeight === 200) return 1.25 * opticalFactor;
    if (matWeight === 400) return 2.0 * opticalFactor;
    return 3.0 * opticalFactor;
  };

  // Helper for Material Symbols fill state
  const getMatIconClasses = () => {
    if (matFilled) {
      return "fill-[#1D1D1F] dark:fill-[#F5F5F7] text-[#1D1D1F] dark:text-[#F5F5F7]";
    }
    return "fill-none text-[#1D1D1F] dark:text-[#F5F5F7]";
  };

  return (
    <section id="icons" className="scroll-mt-20 py-12 sm:py-16 bg-white dark:bg-black transition-colors overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <h2 className="text-3xl sm:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight leading-[1.08] text-balance">
            Icon systems.
            <br />
            <span className="text-[#6E6E73] dark:text-[#8E8E93] font-medium">
              Scalable vector glyphs and symbol axes.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#6E6E73] dark:text-[#A1A1A6] font-normal leading-relaxed">
            A visual exploration of precision vector glyphs, semantic layers, and optical weight scaling across interface icons.
          </p>
        </div>

        {/* 1. Font Awesome Icon System */}
        <div className="space-y-8 sm:space-y-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="max-w-3xl space-y-2">
              <h3 className="text-2xl sm:text-4xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
                Font Awesome Icon System
              </h3>
              <p className="text-sm sm:text-base text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                Precision vector glyphs crafted across uniform pixel grids, semantic layers, and balanced weights.
              </p>
            </div>

            {/* Link to Font Awesome */}
            <a
              href="https://fontawesome.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0071E3] dark:text-[#2997FF] hover:underline shrink-0 group min-h-[44px]"
            >
              <span>Font Awesome Library</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Font Awesome Interactive Visual Specimen */}
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 py-2">
              {/* Style Variants */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-[#86868B] dark:text-[#8E8E93] mr-2">Style</span>
                {(["solid", "regular", "light", "duotone"] as const).map((style) => (
                  <button
                    key={style}
                    onClick={() => setFaStyle(style)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all duration-200 min-h-[36px] ${
                      faStyle === style
                        ? "bg-[#1D1D1F] dark:bg-white text-white dark:text-[#1D1D1F] shadow-xs"
                        : "text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-white"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>

              {/* Optical Scale Buttons */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-[#86868B] dark:text-[#8E8E93] mr-2">Scale</span>
                {([16, 24, 32] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setFaSize(size)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 min-h-[36px] ${
                      faSize === size
                        ? "bg-[#1D1D1F] dark:bg-white text-white dark:text-[#1D1D1F] shadow-xs"
                        : "text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-white"
                    }`}
                  >
                    {size}px
                  </button>
                ))}
              </div>
            </div>

            {/* Specimen Glyphs Canvas */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 sm:gap-6 py-4">
              {faIcons.map(({ name, Icon }) => (
                <div
                  key={name}
                  className="flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-200 hover:scale-105"
                >
                  <div
                    className="flex items-center justify-center transition-all duration-300"
                    style={{ width: faSize + 20, height: faSize + 20 }}
                  >
                    <Icon
                      style={{ width: faSize, height: faSize }}
                      strokeWidth={getFaStrokeWidth(name)}
                      className={`transition-all duration-200 ${getFaIconClasses(name)}`}
                    />
                  </div>
                  <span className="text-[11px] font-medium text-[#86868B] dark:text-[#8E8E93] mt-2">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 4 Font Awesome Principles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-2">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-[#1D1D1F] dark:text-[#F5F5F7]">
                <Grid className="w-4 h-4 text-[#0071E3] dark:text-[#2997FF]" />
                <h4 className="text-sm font-semibold">Pixel Grid Precision</h4>
              </div>
              <p className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                Icons snap to sixteen and twenty pixel base grids to eliminate blurry fraction rendering on all displays.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-[#1D1D1F] dark:text-[#F5F5F7]">
                <Layers className="w-4 h-4 text-[#AF52DE]" />
                <h4 className="text-sm font-semibold">Multi Weight Harmony</h4>
              </div>
              <p className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                Consistent visual density and stroke weights across solid, regular, light, and thin variants.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-[#1D1D1F] dark:text-[#F5F5F7]">
                <Code className="w-4 h-4 text-[#34C759]" />
                <h4 className="text-sm font-semibold">Scalable Vector Formats</h4>
              </div>
              <p className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                Direct vector paths and web font glyphs ensure infinite scalability without resolution loss.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-[#1D1D1F] dark:text-[#F5F5F7]">
                <Compass className="w-4 h-4 text-[#FF9500]" />
                <h4 className="text-sm font-semibold">Semantic Categorization</h4>
              </div>
              <p className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                Extensive taxonomies engineered for rapid interface development and accessibility compliance.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Google Material Symbols */}
        <div className="space-y-8 sm:space-y-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="max-w-3xl space-y-2">
              <h3 className="text-2xl sm:text-4xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
                Google Material Symbols
              </h3>
              <p className="text-sm sm:text-base text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                Variable icon font technology engineered for continuous weight axes, optical sizing, and high density interfaces.
              </p>
            </div>

            {/* Link to Google Material Symbols */}
            <a
              href="https://fonts.google.com/icons"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0071E3] dark:text-[#2997FF] hover:underline shrink-0 group min-h-[44px]"
            >
              <span>Google Material Symbols Library</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Material Symbols Interactive Specimen */}
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 py-2">
              {/* Weight Axis */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-[#86868B] dark:text-[#8E8E93] mr-2">Weight</span>
                {([200, 400, 700] as const).map((w) => (
                  <button
                    key={w}
                    onClick={() => setMatWeight(w)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 min-h-[36px] ${
                      matWeight === w
                        ? "bg-[#1D1D1F] dark:bg-white text-white dark:text-[#1D1D1F] shadow-xs"
                        : "text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-white"
                    }`}
                  >
                    {w === 200 ? "Light 200" : w === 400 ? "Regular 400" : "Bold 700"}
                  </button>
                ))}
              </div>

              {/* Fill State Buttons */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-[#86868B] dark:text-[#8E8E93] mr-2">Fill State</span>
                <button
                  onClick={() => setMatFilled(false)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 min-h-[36px] ${
                    !matFilled
                      ? "bg-[#1D1D1F] dark:bg-white text-white dark:text-[#1D1D1F] shadow-xs"
                      : "text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-white"
                  }`}
                >
                  Outlined
                </button>
                <button
                  onClick={() => setMatFilled(true)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 min-h-[36px] ${
                    matFilled
                      ? "bg-[#1D1D1F] dark:bg-white text-white dark:text-[#1D1D1F] shadow-xs"
                      : "text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-white"
                  }`}
                >
                  Filled
                </button>
              </div>

              {/* Optical Size Buttons */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-[#86868B] dark:text-[#8E8E93] mr-2">Optical Size</span>
                {([20, 24, 36] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setMatSize(size)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 min-h-[36px] ${
                      matSize === size
                        ? "bg-[#1D1D1F] dark:bg-white text-white dark:text-[#1D1D1F] shadow-xs"
                        : "text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-white"
                    }`}
                  >
                    {size}px
                  </button>
                ))}
              </div>
            </div>

            {/* Variable Glyphs Canvas */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 sm:gap-6 py-4">
              {matIcons.map(({ name, Icon }) => (
                <div
                  key={name}
                  className="flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-200 hover:scale-105"
                >
                  <div
                    className="flex items-center justify-center transition-all duration-300"
                    style={{ width: matSize + 22, height: matSize + 22 }}
                  >
                    <Icon
                      style={{ width: matSize, height: matSize }}
                      strokeWidth={getMatStrokeWidth()}
                      className={`transition-all duration-200 ${getMatIconClasses()}`}
                    />
                  </div>
                  <span className="text-[11px] font-medium text-[#86868B] dark:text-[#8E8E93] mt-2">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 4 Material Symbols Principles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-2">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-[#1D1D1F] dark:text-[#F5F5F7]">
                <Sliders className="w-4 h-4 text-[#0071E3] dark:text-[#2997FF]" />
                <h4 className="text-sm font-semibold">Variable Axis Architecture</h4>
              </div>
              <p className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                A single font file delivers continuous interpolation across weight, fill, grade, and optical size.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-[#1D1D1F] dark:text-[#F5F5F7]">
                <Sparkles className="w-4 h-4 text-[#AF52DE]" />
                <h4 className="text-sm font-semibold">Dynamic State Transitions</h4>
              </div>
              <p className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                Effortless binary switching between outline and filled glyphs to signal active navigation states.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-[#1D1D1F] dark:text-[#F5F5F7]">
                <Eye className="w-4 h-4 text-[#34C759]" />
                <h4 className="text-sm font-semibold">Optical Size Calibration</h4>
              </div>
              <p className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                Stroke geometry automatically adjusts at micro sizes to guarantee high contrast and legibility.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-[#1D1D1F] dark:text-[#F5F5F7]">
                <Compass className="w-4 h-4 text-[#FF9500]" />
                <h4 className="text-sm font-semibold">Screen Native Clarity</h4>
              </div>
              <p className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                Cohesive geometric proportions engineered for instant recognition across dense mobile surfaces.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
