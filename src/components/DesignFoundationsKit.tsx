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
              Apple and Android design systems.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#6E6E73] dark:text-[#A1A1A6] font-normal leading-relaxed">
            A visual exploration of two distinct design philosophies. Apple&apos;s physical translucency and Google&apos;s research-backed Material 3 Expressive system.
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
                Translucent optical materials and floating functional controls designed to let rich content take center stage.
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
            <div className="relative w-full max-w-5xl aspect-[16/9] sm:aspect-[16/8]">
              <Image
                src="/images/apple-liquid-glass.png"
                alt="Apple Liquid Glass across Mac, iPad, and iPhone"
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-contain block select-none"
              />
            </div>
          </div>

          {/* 4 Apple Liquid Glass Principles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-2">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-[#1D1D1F] dark:text-[#F5F5F7]">
                <Layers className="w-4 h-4 text-[#0071E3] dark:text-[#2997FF]" />
                <h4 className="text-sm font-semibold">Functional Layer Separation</h4>
              </div>
              <p className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                Liquid Glass is reserved for floating toolbars, sidebars, and navigation, keeping primary content in clear focus.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-[#1D1D1F] dark:text-[#F5F5F7]">
                <Sparkles className="w-4 h-4 text-[#AF52DE]" />
                <h4 className="text-sm font-semibold">Dynamic Luminosity</h4>
              </div>
              <p className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                The material has no inherent color, dynamically blurring and adapting to rich visual media scrolling underneath.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-[#1D1D1F] dark:text-[#F5F5F7]">
                <Sliders className="w-4 h-4 text-[#34C759]" />
                <h4 className="text-sm font-semibold">Specular Edge Reflection</h4>
              </div>
              <p className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                Delicate one-pixel inner highlights define clear tactile physical planes without heavy dark drop shadows.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-[#1D1D1F] dark:text-[#F5F5F7]">
                <Compass className="w-4 h-4 text-[#FF9500]" />
                <h4 className="text-sm font-semibold">Monochrome Restraint</h4>
              </div>
              <p className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                Symbols and labels adapt between light and dark states automatically to ensure legibility across every surface.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Middle Section Google Material 3 Expressive */}
        <div className="space-y-8 sm:space-y-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="max-w-3xl space-y-2">
              <h3 className="text-2xl sm:text-4xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
                Google Material 3 Expressive
              </h3>
              <p className="text-sm sm:text-base text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                Emotion-driven UX, dynamic color, and organic geometry rooted in Google design research.
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
                src="/images/material-3-preview.jpg"
                alt="Google Material 3 Expressive Design Language Showcase"
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover block select-none"
              />
            </div>
          </div>

          {/* 4 Google Expressive UX Pillars from Research */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-2">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-[#1D1D1F] dark:text-[#F5F5F7]">
                <Eye className="w-4 h-4 text-[#0071E3] dark:text-[#2997FF]" />
                <h4 className="text-sm font-semibold">4× Faster Visual Focus</h4>
              </div>
              <p className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                Eye-tracking research across 46 studies showed users spot primary actions up to four times faster.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-[#1D1D1F] dark:text-[#F5F5F7]">
                <Palette className="w-4 h-4 text-[#AF52DE]" />
                <h4 className="text-sm font-semibold">Dynamic Color Extraction</h4>
              </div>
              <p className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                Tonal containers automatically adapt to user wallpapers, generating an intimate, personalized aesthetic.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-[#1D1D1F] dark:text-[#F5F5F7]">
                <Layers className="w-4 h-4 text-[#34C759]" />
                <h4 className="text-sm font-semibold">Organic Shape Containment</h4>
              </div>
              <p className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                Distinctive 28px rounded corners and pill contours group elements intuitively to reduce cognitive friction.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-[#1D1D1F] dark:text-[#F5F5F7]">
                <Heart className="w-4 h-4 text-[#FF9500]" />
                <h4 className="text-sm font-semibold">Emotion-Driven Usability</h4>
              </div>
              <p className="text-xs text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                Tested across 18,000 global participants, expressive UX delivered an 87% preference boost among younger demographics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
