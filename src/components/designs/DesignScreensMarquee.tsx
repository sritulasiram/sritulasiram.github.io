"use client";

import { useState } from "react";
import { Maximize2, X, Smartphone, LayoutGrid, GalleryHorizontal } from "lucide-react";

export interface DesignScreen {
  id: string;
  number: string;
  title: string;
  role: string;
  description: string;
  imageSrc: string;
}

const DESIGN_SCREENS: DesignScreen[] = [
  {
    id: "welcome",
    number: "01",
    title: "Onboarding & Welcome",
    role: "Authentication Flow",
    description: "High-contrast minimalist splash with instant role onboarding and biometric security tokens.",
    imageSrc: "/images/designs/void/screen-welcome.png",
  },
  {
    id: "home",
    number: "02",
    title: "FYP Session Dashboard",
    role: "Workspace Switcher",
    description: "Active academic semester hub displaying Final Year Project 1 & 2 cards with supervisor metadata.",
    imageSrc: "/images/designs/void/screen-home.png",
  },
  {
    id: "submissions",
    number: "03",
    title: "Digital Submissions Hub",
    role: "Student Toolset",
    description: "Centralized P1 A-D form milestone verification, checklist tracking, and fast document uploads.",
    imageSrc: "/images/designs/void/screen-submissions.png",
  },
  {
    id: "notifications",
    number: "04",
    title: "Broadcast Notifications",
    role: "Department Feed",
    description: "Real-time coordinator alerts for lecture cancellations, DK2 venue briefings, and proposal deadlines.",
    imageSrc: "/images/designs/void/screen-notifications.png",
  },
  {
    id: "drawer",
    number: "05",
    title: "Module Navigation Drawer",
    role: "System Hub",
    description: "Slide-out navigation linking direct supervisor chat, digital log books, downloads, and app settings.",
    imageSrc: "/images/designs/void/screen-drawer.png",
  },
];

export default function DesignScreensMarquee({
  title = "Individual Screen Flow",
  subtitle = "Interactive mobile flow · Select any screen to inspect details",
}: {
  title?: string;
  subtitle?: string;
}) {
  const [selectedScreen, setSelectedScreen] = useState<DesignScreen | null>(null);
  const [viewMode, setViewMode] = useState<"ribbon" | "grid">("ribbon");

  // Duplicate screens for an uninterrupted infinite loop
  const marqueeScreens = [...DESIGN_SCREENS, ...DESIGN_SCREENS];

  return (
    <div className="w-full space-y-6 py-6">
      {/* Header Info with View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between px-2 gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#86868B]">
            <Smartphone className="w-3.5 h-3.5 text-[#0071E3]" />
            <span>{title}</span>
          </div>
          <p className="text-xs sm:text-sm text-[#6E6E73]">{subtitle}</p>
        </div>

        {/* Ribbon vs Grid Switcher */}
        <div className="flex items-center gap-1 p-1 bg-[#F5F5F7] rounded-full border border-[#E5E5EA] self-start sm:self-auto">
          <button
            onClick={() => setViewMode("ribbon")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
              viewMode === "ribbon"
                ? "bg-white text-[#1D1D1F] shadow-2xs"
                : "text-[#86868B] hover:text-[#1D1D1F]"
            }`}
            title="Continuous Ribbon Flow"
          >
            <GalleryHorizontal className="w-3.5 h-3.5" />
            <span>Flow</span>
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
              viewMode === "grid"
                ? "bg-white text-[#1D1D1F] shadow-2xs"
                : "text-[#86868B] hover:text-[#1D1D1F]"
            }`}
            title="Inspectable Grid View"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Grid</span>
          </button>
        </div>
      </div>

      {/* Mode A: Infinite Moving Ribbon with Pause on Hover */}
      {viewMode === "ribbon" && (
        <div className="group w-full overflow-hidden marquee-mask py-4 -mx-2">
          <div className="animate-photo-marquee group-hover:[animation-play-state:paused] flex gap-6 sm:gap-8 px-4">
            {marqueeScreens.map((screen, index) => (
              <button
                key={`${screen.id}-${index}`}
                onClick={() => setSelectedScreen(screen)}
                className="group/card relative w-[220px] sm:w-[260px] md:w-[290px] aspect-[9/19] shrink-0 rounded-[2.5rem] p-3 overflow-hidden border border-[#E5E5EA] bg-[#1D1D1F] apple-card-shadow transition-all duration-500 hover:-translate-y-2.5 hover:shadow-[0_24px_48px_rgba(0,0,0,0.2)] text-left cursor-pointer flex flex-col justify-between"
              >
                {/* Phone Speaker & Camera Notch Simulator */}
                <div className="w-full flex justify-center pb-1">
                  <div className="w-16 h-1 rounded-full bg-white/20" />
                </div>

                {/* High-Resolution Screen UI */}
                <div className="relative w-full flex-1 rounded-[1.75rem] overflow-hidden bg-black/40 border border-white/5 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={screen.imageSrc}
                    alt={screen.title}
                    className="w-full h-full object-contain group-hover/card:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Hover Quick Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0071E3]">
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
                  <span className="text-[11px] font-medium text-white/40">
                    SCREEN {screen.number}
                  </span>
                  <span className="text-xs font-medium text-white truncate max-w-[170px]">
                    {screen.title.replace(/^\d+\s*·\s*/, "")}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mode B: Inspectable 5-Screen Grid */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 py-4">
          {DESIGN_SCREENS.map((screen) => (
            <button
              key={screen.id}
              onClick={() => setSelectedScreen(screen)}
              className="group/card relative aspect-[9/19] rounded-[2rem] p-2.5 overflow-hidden border border-[#E5E5EA] bg-[#1D1D1F] apple-card-shadow transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg text-left cursor-pointer flex flex-col justify-between"
            >
              <div className="w-full flex justify-center pb-1">
                <div className="w-12 h-1 rounded-full bg-white/20" />
              </div>

              <div className="relative w-full flex-1 rounded-[1.35rem] overflow-hidden bg-black/40 border border-white/5 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={screen.imageSrc}
                  alt={screen.title}
                  className="w-full h-full object-contain group-hover/card:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>

              <div className="pt-2 px-1 flex items-center justify-between text-white/90">
                <span className="text-[10px] font-medium text-white/40">
                  {screen.number}
                </span>
                <span className="text-[11px] font-medium text-white truncate max-w-[120px]">
                  {screen.title.replace(/^\d+\s*·\s*/, "")}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Screen Lightbox Modal */}
      {selectedScreen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 animate-page-enter"
          onClick={() => setSelectedScreen(null)}
        >
          <div
            className="relative max-w-2xl w-full max-h-[92vh] bg-[#1D1D1F] border border-[#2C2E35] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 sm:gap-8 apple-card-shadow text-white overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedScreen(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Close preview"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Screen Viewport */}
            <div className="w-[240px] sm:w-[270px] aspect-[9/19] shrink-0 rounded-[2.5rem] p-3 border border-white/10 bg-black flex flex-col justify-between shadow-2xl">
              <div className="w-full flex justify-center pb-1">
                <div className="w-16 h-1 rounded-full bg-white/20" />
              </div>
              <div className="w-full flex-1 rounded-[1.75rem] overflow-hidden bg-[#111] flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedScreen.imageSrc}
                  alt={selectedScreen.title}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Detailed Metadata Breakdown */}
            <div className="space-y-4 max-w-sm">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#0071E3] bg-[#0071E3]/20 px-2.5 py-0.5 rounded-full border border-[#0071E3]/30">
                  SCREEN {selectedScreen.number}
                </span>
                <span className="text-xs text-neutral-400">
                  {selectedScreen.role}
                </span>
              </div>

              <h3 className="text-2xl font-semibold text-white tracking-apple-tight">
                {selectedScreen.title}
              </h3>

              <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                {selectedScreen.description}
              </p>

              <div className="pt-3 border-t border-white/10 space-y-2 text-xs text-neutral-400">
                <div className="flex items-center justify-between">
                  <span>Prototyping Tool</span>
                  <span className="text-white font-medium">Adobe XD</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Asset Production</span>
                  <span className="text-white font-medium">Adobe Photoshop</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Target Surface</span>
                  <span className="text-white font-medium">Android Mobile</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
