"use client";

import { useState } from "react";
import Image from "next/image";
import ImageLightbox from "@/components/shared/ImageLightbox";
import { Maximize2, Smartphone, LayoutGrid, GalleryHorizontal } from "lucide-react";
import type { DesignScreen } from "@/types";

interface MetaRow {
  label: string;
  value: string;
}

export default function DesignScreensMarquee({
  screens,
  meta = [],
  title = "Screen flow",
  subtitle = "Select a screen to inspect it.",
}: {
  screens: DesignScreen[];
  /** Rows shown under the description in the inspect dialog, e.g. tool and platform. */
  meta?: MetaRow[];
  title?: string;
  subtitle?: string;
}) {
  // Index of the screen open in the viewer, or null when closed.
  const [selectedAt, setSelectedAt] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"ribbon" | "grid">("ribbon");

  // Duplicate screens for an uninterrupted infinite loop
  const marqueeScreens = [...screens, ...screens];

  const switcherButton = (mode: "ribbon" | "grid", label: string, hint: string, Icon: typeof Smartphone) => (
    <button
      type="button"
      onClick={() => setViewMode(mode)}
      aria-pressed={viewMode === mode}
      title={hint}
      className={`flex items-center gap-1.5 px-3 min-h-[32px] rounded-full text-xs font-medium transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)] ${
        viewMode === mode
          ? "bg-white dark:bg-[#2C2C2E] text-[#1D1D1F] dark:text-white shadow-2xs"
          : "text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-white"
      }`}
    >
      <Icon className="w-3.5 h-3.5" />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="w-full space-y-6 py-6">
      {/* Header Info with View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between px-2 gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#6E6E73] dark:text-[#A1A1A6]">
            <Smartphone className="w-3.5 h-3.5 text-[#0071E3] dark:text-[#2997FF]" />
            <span>{title}</span>
          </div>
          <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#A1A1A6]">{subtitle}</p>
        </div>

        {/* Ribbon vs Grid Switcher */}
        <div className="flex items-center gap-1 p-1 bg-[#F5F5F7] dark:bg-[#1C1C1E] rounded-full border border-[#E5E5EA] dark:border-white/10 self-start sm:self-auto">
          {switcherButton("ribbon", "Flow", "Continuous ribbon flow", GalleryHorizontal)}
          {switcherButton("grid", "Grid", "Inspectable grid view", LayoutGrid)}
        </div>
      </div>

      {/* Mode A: Infinite Moving Ribbon with Pause on Hover */}
      {viewMode === "ribbon" && (
        <div className="group w-full overflow-hidden marquee-mask py-4 -mx-2">
          <div className="animate-photo-marquee group-hover:[animation-play-state:paused] flex gap-6 sm:gap-8 px-4">
            {marqueeScreens.map((screen, index) => {
              const isCopy = index >= screens.length;
              return (
                <button
                  key={`${screen.id}-${index}`}
                  type="button"
                  onClick={() => setSelectedAt(screens.indexOf(screen))}
                  aria-hidden={isCopy}
                  tabIndex={isCopy ? -1 : 0}
                  aria-label={`Inspect screen ${screen.number}: ${screen.title}`}
                  className="group/card relative w-[220px] sm:w-[260px] md:w-[290px] aspect-[9/19] shrink-0 rounded-[2.5rem] p-3 overflow-hidden border border-[#E5E5EA] dark:border-white/10 bg-[#1D1D1F] apple-card-shadow transition-all duration-500 hover:-translate-y-2.5 hover:shadow-[0_24px_48px_rgba(0,0,0,0.2)] text-left cursor-pointer flex flex-col justify-between focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]"
                >
                  {/* Phone Speaker & Camera Notch Simulator */}
                  <div className="w-full flex justify-center pb-1">
                    <div className="w-16 h-1 rounded-full bg-white/20" />
                  </div>

                  {/* High-Resolution Screen UI */}
                  <div className="relative w-full flex-1 rounded-[1.75rem] overflow-hidden bg-black/40 border border-white/5">
                    <Image
                      src={screen.imageSrc}
                      alt={screen.title}
                      fill
                      sizes="290px"
                      className="object-contain group-hover/card:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Hover Quick Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#2997FF]">
                        {screen.role}
                      </span>
                      <p className="text-xs font-semibold leading-tight line-clamp-1">
                        {screen.title}
                      </p>
                      <div className="flex items-center gap-1 text-[11px] text-white/80 pt-1">
                        <Maximize2 className="w-3 h-3" />
                        <span>Expand view</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Card Pill */}
                  <div className="pt-2 px-1 flex items-center justify-between text-white/80">
                    <span className="text-[11px] font-medium text-white/65">
                      SCREEN {screen.number}
                    </span>
                    <span className="text-xs font-medium text-white truncate max-w-[170px]">
                      {screen.title.replace(/^\d+\s*·\s*/, "")}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Mode B: Inspectable Grid */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 py-4">
          {screens.map((screen) => (
            <button
              key={screen.id}
              type="button"
              onClick={() => setSelectedAt(screens.indexOf(screen))}
              aria-label={`Inspect screen ${screen.number}: ${screen.title}`}
              className="group/card relative aspect-[9/19] rounded-[2rem] p-2.5 overflow-hidden border border-[#E5E5EA] dark:border-white/10 bg-[#1D1D1F] apple-card-shadow transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg text-left cursor-pointer flex flex-col justify-between focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]"
            >
              <div className="w-full flex justify-center pb-1">
                <div className="w-12 h-1 rounded-full bg-white/20" />
              </div>

              <div className="relative w-full flex-1 rounded-[1.35rem] overflow-hidden bg-black/40 border border-white/5">
                <Image
                  src={screen.imageSrc}
                  alt={screen.title}
                  fill
                  sizes="(max-width: 640px) 50vw, 240px"
                  className="object-contain group-hover/card:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>

              <div className="pt-2 px-1 flex items-center justify-between text-white/90">
                <span className="text-[11px] font-medium text-white/65">{screen.number}</span>
                <span className="text-xs font-medium text-white truncate max-w-[120px]">
                  {screen.title.replace(/^\d+\s*·\s*/, "")}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Full-size viewer */}
      {selectedAt !== null && (
        <ImageLightbox
          src={screens[selectedAt].imageSrc}
          alt={screens[selectedAt].title}
          onClose={() => setSelectedAt(null)}
          index={selectedAt}
          count={screens.length}
          onPrev={() => setSelectedAt((selectedAt - 1 + screens.length) % screens.length)}
          onNext={() => setSelectedAt((selectedAt + 1) % screens.length)}
          caption={
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
                Screen {screens[selectedAt].number} · {screens[selectedAt].role}
              </p>
              <p className="text-lg font-semibold text-white">{screens[selectedAt].title}</p>
              <p className="text-sm leading-relaxed text-white/70">{screens[selectedAt].description}</p>
              {meta.length > 0 && (
                <p className="pt-1 text-xs text-white/50">{meta.map((row) => `${row.label}: ${row.value}`).join(" · ")}</p>
              )}
            </div>
          }
        />
      )}
    </div>
  );
}
