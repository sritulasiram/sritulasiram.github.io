"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Sparkles,
  Layers,
  Sliders,
  Compass,
  Eye,
  Globe,
  Cpu,
} from "lucide-react";

export default function DesignTypographyKit() {
  // 1. Apple Typography State
  const [appleWeight, setAppleWeight] = useState<300 | 400 | 600 | 700>(400);
  const [appleVariant, setAppleVariant] = useState<"display" | "text" | "rounded">("display");
  const [appleSize, setAppleSize] = useState<18 | 24 | 40>(24);

  // 2. Google Typography State
  const [googleWeight, setGoogleWeight] = useState<300 | 400 | 600 | 700>(400);
  const [googleFont, setGoogleFont] = useState<"roboto" | "inter" | "sans">("roboto");
  const [googleSize, setGoogleSize] = useState<18 | 24 | 40>(24);

  // Apple Font Family mapping
  const getAppleFontFamily = () => {
    if (appleVariant === "rounded") return '"SF Pro Rounded", -apple-system, BlinkMacSystemFont, "SF Pro", sans-serif';
    if (appleVariant === "text") return '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';
    return '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif';
  };

  // Google Font Family mapping
  const getGoogleFontFamily = () => {
    if (googleFont === "inter") return "var(--font-inter), sans-serif";
    if (googleFont === "sans") return '"Open Sans", system-ui, sans-serif';
    return '"Roboto", "Roboto Flex", "Segoe UI", sans-serif';
  };

  return (
    <section id="typography" className="scroll-mt-20 py-12 sm:py-16 bg-white dark:bg-black transition-colors overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <h2 className="text-3xl sm:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight leading-[1.08] text-balance">
            Typography systems.
            <br />
            <span className="text-[#6E6E73] dark:text-[#8E8E93] font-medium">
              Interface typefaces and variable axes.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#6E6E73] dark:text-[#A1A1A6] font-normal leading-relaxed">
            A visual exploration of dynamic optical tracking, compact apertures, and continuous variable font axes across digital displays.
          </p>
        </div>

        {/* 1. Apple San Francisco */}
        <div className="space-y-8 sm:space-y-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="max-w-3xl space-y-2">
              <h3 className="text-2xl sm:text-4xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
                Apple San Francisco
              </h3>
              <p className="text-sm sm:text-base text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                Dynamic optical tracking, compact apertures, and responsive weights engineered for Apple Retina screens.
              </p>
            </div>

            {/* Link to Apple Developer Fonts */}
            <a
              href="https://developer.apple.com/fonts/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0071E3] dark:text-[#2997FF] hover:underline shrink-0 group min-h-[44px]"
            >
              <span>Apple Developer Fonts</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Apple Interactive Visual Specimen */}
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 py-2">
              {/* Variant Toggles */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-[#86868B] dark:text-[#8E8E93] mr-2">Cut</span>
                {(["display", "text", "rounded"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setAppleVariant(v)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all duration-200 min-h-[36px] ${
                      appleVariant === v
                        ? "bg-[#1D1D1F] dark:bg-white text-white dark:text-[#1D1D1F] shadow-xs"
                        : "text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-white"
                    }`}
                  >
                    {v === "display" ? "SF Display" : v === "text" ? "SF Text" : "SF Rounded"}
                  </button>
                ))}
              </div>

              {/* Weight Toggles */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-[#86868B] dark:text-[#8E8E93] mr-2">Weight</span>
                {([300, 400, 600, 700] as const).map((w) => (
                  <button
                    key={w}
                    onClick={() => setAppleWeight(w)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 min-h-[36px] ${
                      appleWeight === w
                        ? "bg-[#1D1D1F] dark:bg-white text-white dark:text-[#1D1D1F] shadow-xs"
                        : "text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-white"
                    }`}
                  >
                    {w === 300 ? "Light 300" : w === 400 ? "Regular 400" : w === 600 ? "Semibold 600" : "Bold 700"}
                  </button>
                ))}
              </div>

              {/* Size Toggles */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-[#86868B] dark:text-[#8E8E93] mr-2">Size</span>
                {([18, 24, 40] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setAppleSize(s)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 min-h-[36px] ${
                      appleSize === s
                        ? "bg-[#1D1D1F] dark:bg-white text-white dark:text-[#1D1D1F] shadow-xs"
                        : "text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-white"
                    }`}
                  >
                    {s}px
                  </button>
                ))}
              </div>
            </div>

            {/* Specimen Showcase Canvas */}
            <div className="p-6 sm:p-10 rounded-3xl bg-[#F5F5F7]/70 dark:bg-[#141416]/70 space-y-6">
              <div className="flex items-center justify-between text-xs text-[#86868B] dark:text-[#8E8E93]">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">San Francisco</span>
                  <span>·</span>
                  <span>Apple Typography</span>
                  <span>·</span>
                  <span className="capitalize">{appleVariant}</span>
                </div>
                <span>Weight {appleWeight}</span>
              </div>

              <div
                className="text-4xl sm:text-6xl text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight transition-all duration-300 break-words"
                style={{
                  fontFamily: getAppleFontFamily(),
                  fontWeight: appleWeight,
                }}
              >
                Aa Bb Gg Rr 123
              </div>

              <div
                className="text-[#1D1D1F]/90 dark:text-[#F5F5F7]/90 transition-all duration-300 leading-snug"
                style={{
                  fontSize: appleSize,
                  fontFamily: getAppleFontFamily(),
                  fontWeight: appleWeight,
                }}
              >
                Sphinx of black quartz, judge my vow
              </div>

              <div
                className="text-xs text-[#86868B] dark:text-[#8E8E93] tracking-widest uppercase transition-all duration-300 pt-2"
                style={{ fontFamily: getAppleFontFamily() }}
              >
                A B C D E F G H I J K L M N O P Q R S T U V W X Y Z 0 1 2 3 4 5 6 7 8 9
              </div>
            </div>
          </div>

          {/* 4 Apple Typography Principles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-2">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-[#1D1D1F] dark:text-[#F5F5F7]">
                <Sliders className="w-4 h-4 text-[#0071E3] dark:text-[#2997FF]" />
                <h4 className="text-sm font-semibold">Dynamic Tracking</h4>
              </div>
              <p className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                Negative letter spacing at display titles and generous tracking at body text sizes maintain effortless reading.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-[#1D1D1F] dark:text-[#F5F5F7]">
                <Eye className="w-4 h-4 text-[#AF52DE]" />
                <h4 className="text-sm font-semibold">Optical Cut Transitions</h4>
              </div>
              <p className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                Automatic interpolation between Text and Display cuts ensures characters never pinch or blur at any scale.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-[#1D1D1F] dark:text-[#F5F5F7]">
                <Layers className="w-4 h-4 text-[#34C759]" />
                <h4 className="text-sm font-semibold">Compact Proportions</h4>
              </div>
              <p className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                Engineered with tight ascenders and descenders to maximize information density inside navigation bars.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-[#1D1D1F] dark:text-[#F5F5F7]">
                <Cpu className="w-4 h-4 text-[#FF9500]" />
                <h4 className="text-sm font-semibold">Cross Platform Hierarchy</h4>
              </div>
              <p className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                A unified design grammar shared seamlessly across watchOS, iOS, iPadOS, and macOS ecosystems.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Google Fonts and Variable Systems */}
        <div className="space-y-8 sm:space-y-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="max-w-3xl space-y-2">
              <h3 className="text-2xl sm:text-4xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
                Google Fonts and Variable Systems
              </h3>
              <p className="text-sm sm:text-base text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                Continuous weight axes, open counters, and universal font distribution engineered for global web surfaces.
              </p>
            </div>

            {/* Link to Google Fonts */}
            <a
              href="https://fonts.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0071E3] dark:text-[#2997FF] hover:underline shrink-0 group min-h-[44px]"
            >
              <span>Google Fonts Library</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Google Interactive Visual Specimen */}
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 py-2">
              {/* Typeface Toggles */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-[#86868B] dark:text-[#8E8E93] mr-2">Family</span>
                {(["roboto", "inter", "sans"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setGoogleFont(f)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all duration-200 min-h-[36px] ${
                      googleFont === f
                        ? "bg-[#1D1D1F] dark:bg-white text-white dark:text-[#1D1D1F] shadow-xs"
                        : "text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-white"
                    }`}
                  >
                    {f === "roboto" ? "Roboto Flex" : f === "inter" ? "Inter" : "Open Sans"}
                  </button>
                ))}
              </div>

              {/* Weight Toggles */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-[#86868B] dark:text-[#8E8E93] mr-2">Weight</span>
                {([300, 400, 600, 700] as const).map((w) => (
                  <button
                    key={w}
                    onClick={() => setGoogleWeight(w)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 min-h-[36px] ${
                      googleWeight === w
                        ? "bg-[#1D1D1F] dark:bg-white text-white dark:text-[#1D1D1F] shadow-xs"
                        : "text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-white"
                    }`}
                  >
                    {w === 300 ? "Light 300" : w === 400 ? "Regular 400" : w === 600 ? "Semibold 600" : "Bold 700"}
                  </button>
                ))}
              </div>

              {/* Size Toggles */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-[#86868B] dark:text-[#8E8E93] mr-2">Size</span>
                {([18, 24, 40] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setGoogleSize(s)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 min-h-[36px] ${
                      googleSize === s
                        ? "bg-[#1D1D1F] dark:bg-white text-white dark:text-[#1D1D1F] shadow-xs"
                        : "text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-white"
                    }`}
                  >
                    {s}px
                  </button>
                ))}
              </div>
            </div>

            {/* Specimen Showcase Canvas */}
            <div className="p-6 sm:p-10 rounded-3xl bg-[#F5F5F7]/70 dark:bg-[#141416]/70 space-y-6">
              <div className="flex items-center justify-between text-xs text-[#86868B] dark:text-[#8E8E93]">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                    {googleFont === "roboto" ? "Roboto Flex" : googleFont === "inter" ? "Inter" : "Open Sans"}
                  </span>
                  <span>·</span>
                  <span>Google Fonts Ecosystem</span>
                  <span>·</span>
                  <span>Variable Axis</span>
                </div>
                <span>Weight {googleWeight}</span>
              </div>

              <div
                className="text-4xl sm:text-6xl text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight transition-all duration-300 break-words"
                style={{
                  fontFamily: getGoogleFontFamily(),
                  fontWeight: googleWeight,
                }}
              >
                Aa Bb Gg Rr 123
              </div>

              <div
                className="text-[#1D1D1F]/90 dark:text-[#F5F5F7]/90 transition-all duration-300 leading-snug"
                style={{
                  fontSize: googleSize,
                  fontFamily: getGoogleFontFamily(),
                  fontWeight: googleWeight,
                }}
              >
                The quick brown fox jumps over the lazy dog
              </div>

              <div
                className="text-xs text-[#86868B] dark:text-[#8E8E93] tracking-widest uppercase transition-all duration-300 pt-2"
                style={{ fontFamily: getGoogleFontFamily() }}
              >
                A B C D E F G H I J K L M N O P Q R S T U V W X Y Z 0 1 2 3 4 5 6 7 8 9
              </div>
            </div>
          </div>

          {/* 4 Google Fonts Principles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-2">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-[#1D1D1F] dark:text-[#F5F5F7]">
                <Sliders className="w-4 h-4 text-[#0071E3] dark:text-[#2997FF]" />
                <h4 className="text-sm font-semibold">Continuous Weight Axes</h4>
              </div>
              <p className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                Single font asset technology delivering infinite weight steps between one hundred and nine hundred.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-[#1D1D1F] dark:text-[#F5F5F7]">
                <Sparkles className="w-4 h-4 text-[#AF52DE]" />
                <h4 className="text-sm font-semibold">Open Geometry Counters</h4>
              </div>
              <p className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                Generous letter openings prevent visual clutter and eye strain across low resolution mobile viewports.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-[#1D1D1F] dark:text-[#F5F5F7]">
                <Globe className="w-4 h-4 text-[#34C759]" />
                <h4 className="text-sm font-semibold">Global Script Delivery</h4>
              </div>
              <p className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                Comprehensive unicode coverage spanning Latin, Cyrillic, Greek, and thousands of international scripts.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-[#1D1D1F] dark:text-[#F5F5F7]">
                <Compass className="w-4 h-4 text-[#FF9500]" />
                <h4 className="text-sm font-semibold">Open Universal Licensing</h4>
              </div>
              <p className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                Freely accessible typefaces engineered for seamless collaboration between designers and software engineers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
