"use client";

import Image from "next/image";

export default function DesignWorkflowKit() {
  return (
    <section id="workflow" className="scroll-mt-20 py-12 sm:py-16 bg-white dark:bg-black transition-colors overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-8">
        {/* Section Header matching Photography layout */}
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#6E6E73] dark:text-[#8E8E93] block">
            Design Workflow
          </span>
          <h3 className="text-3xl sm:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight leading-[1.08] text-balance">
            Apps used in design
          </h3>
          <p className="text-base sm:text-lg text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
            From multi-screen interactive prototypes to production token architecture, each application is selected for its specialized interface and graphical precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          {/* Column 1 Interface and Prototyping */}
          <div className="space-y-4">
            <div className="flex items-baseline justify-between pb-2.5">
              <h4 className="text-base sm:text-lg font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                Interface &amp; Prototyping
              </h4>
              <span className="text-xs text-[#86868B] dark:text-[#6E6E73] font-medium">
                Systems &amp; Tokens
              </span>
            </div>

            <ul className="space-y-4 pt-1">
              <li>
                <div className="flex items-start gap-3.5 sm:gap-4 p-2 -m-2">
                  <div className="relative w-11 h-11 rounded-[22%] overflow-hidden border border-black/[0.08] dark:border-white/[0.12] shadow-2xs shrink-0 bg-[#F5F5F7] dark:bg-[#1C1C1E]">
                    <Image
                      src="/images/apps/app-figma.png"
                      alt="Figma App Icon"
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <div className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                      Figma
                    </div>
                    <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed">
                      Component token architecture, auto-layout responsive hierarchies, and cross-platform design systems.
                    </p>
                  </div>
                </div>
              </li>

              <li>
                <div className="flex items-start gap-3.5 sm:gap-4 p-2 -m-2">
                  <div className="relative w-11 h-11 rounded-[22%] overflow-hidden border border-black/[0.08] dark:border-white/[0.12] shadow-2xs shrink-0 bg-[#F5F5F7] dark:bg-[#1C1C1E]">
                    <Image
                      src="/images/apps/app-xd.png"
                      alt="Adobe XD App Icon"
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <div className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                      Adobe XD
                    </div>
                    <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed">
                      Multi-screen stateful prototyping, rapid user journey wireframing, and interactive transition mapping.
                    </p>
                  </div>
                </div>
              </li>

              <li>
                <div className="flex items-start gap-3.5 sm:gap-4 p-2 -m-2">
                  <div className="relative w-11 h-11 rounded-[22%] overflow-hidden border border-black/[0.08] dark:border-white/[0.12] shadow-2xs shrink-0 bg-[#F5F5F7] dark:bg-[#1C1C1E]">
                    <Image
                      src="/images/apps/app-framer.svg"
                      alt="Framer App Icon"
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <div className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                      Framer
                    </div>
                    <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed">
                      Code-backed micro-interactions, responsive spring physics, and production-ready interaction design.
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 2 Visual Craft and Assets */}
          <div className="space-y-4">
            <div className="flex items-baseline justify-between pb-2.5">
              <h4 className="text-base sm:text-lg font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                Visual Craft &amp; Assets
              </h4>
              <span className="text-xs text-[#86868B] dark:text-[#6E6E73] font-medium">
                Graphics &amp; Production
              </span>
            </div>

            <ul className="space-y-4 pt-1">
              <li>
                <div className="flex items-start gap-3.5 sm:gap-4 p-2 -m-2">
                  <div className="relative w-11 h-11 rounded-[22%] overflow-hidden border border-black/[0.08] dark:border-white/[0.12] shadow-2xs shrink-0 bg-[#F5F5F7] dark:bg-[#1C1C1E]">
                    <Image
                      src="/images/apps/app-photoshop.png"
                      alt="Adobe Photoshop App Icon"
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <div className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                      Adobe Photoshop
                    </div>
                    <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed">
                      Pixel-level master retouching, dark-mode asset rendering, multi-layer color grading, and texture composites.
                    </p>
                  </div>
                </div>
              </li>

              <li>
                <div className="flex items-start gap-3.5 sm:gap-4 p-2 -m-2">
                  <div className="relative w-11 h-11 rounded-[22%] overflow-hidden border border-black/[0.08] dark:border-white/[0.12] shadow-2xs shrink-0 bg-[#F5F5F7] dark:bg-[#1C1C1E]">
                    <Image
                      src="/images/apps/app-illustrator.svg"
                      alt="Adobe Illustrator App Icon"
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <div className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                      Adobe Illustrator
                    </div>
                    <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed">
                      Precision geometric vector iconography, bezier curve calibration, brand identity assets, and SVG optimization.
                    </p>
                  </div>
                </div>
              </li>

              <li>
                <div className="flex items-start gap-3.5 sm:gap-4 p-2 -m-2">
                  <div className="relative w-11 h-11 rounded-[22%] overflow-hidden border border-black/[0.08] dark:border-white/[0.12] shadow-2xs shrink-0 bg-[#F5F5F7] dark:bg-[#1C1C1E]">
                    <Image
                      src="/images/apps/app-canva.png"
                      alt="Canva App Icon"
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <div className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                      Canva
                    </div>
                    <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed">
                      Rapid visual pitch decks, social media collateral, presentation templates, and brand asset distribution.
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
