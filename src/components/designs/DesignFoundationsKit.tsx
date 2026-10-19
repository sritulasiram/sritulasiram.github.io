"use client";

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
} from "lucide-react";
import DesignPrincipleGrid, { type Principle } from "./DesignPrincipleGrid";

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

export default function DesignFoundationsKit() {
  return (
    <section id="design" className="scroll-mt-20 py-12 sm:py-16 bg-white dark:bg-black transition-colors overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <h2 className="text-3xl sm:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight leading-[1.08] text-balance">
            Design languages.
            <br />
            <span className="text-[#6E6E73] dark:text-[#8E8E93] font-medium">
              Apple and Google design systems.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#6E6E73] dark:text-[#A1A1A6] font-normal leading-relaxed">
            Two ways to build an interface: Apple&apos;s translucent Liquid Glass and Google&apos;s color-led Material 3 Expressive.
          </p>
        </div>

        {/* 1. Top Section Apple Design Language Liquid Glass */}
        <div className="space-y-8 sm:space-y-10">
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

          {/* Official Apple Liquid Glass Showcase Image */}
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

          {/* 4 Apple Liquid Glass Principles */}
          <DesignPrincipleGrid items={FOUNDATION_PRINCIPLES_1} />
        </div>

        {/* 2. Middle Section Google Material 3 Expressive */}
        <div className="space-y-8 sm:space-y-10">
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

          {/* Official Google Material 3 Expressive Showcase Image */}
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

          {/* 4 Google Expressive UX Pillars from Research */}
          <DesignPrincipleGrid items={FOUNDATION_PRINCIPLES_2} />
        </div>
      </div>
    </section>
  );
}
