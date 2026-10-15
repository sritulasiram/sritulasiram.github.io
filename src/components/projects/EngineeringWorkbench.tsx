"use client";

import Image from "next/image";

interface ToolItem {
  name: string;
  role: string;
  iconSrc: string;
  description: string;
}

const WORKBENCH_TOOLS: ToolItem[] = [
  {
    name: "Visual Studio Code",
    role: "Code Editor & Systems Workspace",
    iconSrc: "/images/apps/app-vscode.png",
    description: "Full-stack Next.js architecture, Linux daemon scripts, and Python automation workflows.",
  },
  {
    name: "Antigravity",
    role: "Agentic AI Pair Programmer",
    iconSrc: "/images/apps/app-antigravity.png",
    description: "Deep codebase refactoring, architectural system design, and autonomous verification pipelines.",
  },
  {
    name: "Xcode",
    role: "macOS & Swift Developer Suite",
    iconSrc: "/images/apps/app-xcode.png",
    description: "Native Swift 5.9 and SwiftUI desktop applications interfacing with IOKit hardware registers.",
  },
  {
    name: "Arduino IDE",
    role: "Embedded Firmware Toolchain",
    iconSrc: "/images/apps/app-arduino.svg",
    description: "Bare-metal C/C++ firmware compilation, ESP32 FreeRTOS routines, and serial sensor telemetry.",
  },
];

export default function EngineeringWorkbench() {
  return (
    <section
      id="workbench"
      aria-label="Engineering Workbench"
      className="scroll-mt-20 py-12 sm:py-16 bg-white dark:bg-black transition-colors overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-8 sm:space-y-10">
        {/* Section Header */}
        <div className="space-y-2 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight leading-[1.08]">
            Tools &amp; development suite
          </h2>
          <p className="text-base sm:text-lg text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
            The editors, toolchains and AI assistants I build with.
          </p>
        </div>

        {/* 4-Item Open Grid (No Container Boxes) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {WORKBENCH_TOOLS.map((tool) => {
            const isEmblem = tool.iconSrc.includes("arduino");
            return (
              <div
                key={tool.name}
                className="space-y-3.5 group select-none"
              >
                <div className="relative w-12 h-12 rounded-[22%] overflow-hidden border border-black/[0.08] dark:border-white/[0.12] shadow-2xs shrink-0 bg-[#F5F5F7] dark:bg-[#1C1C1E] transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={tool.iconSrc}
                    alt={`${tool.name} Icon`}
                    fill
                    sizes="48px"
                    className={isEmblem ? "object-contain p-1.5" : "object-cover"}
                  />
                </div>
                <div className="space-y-1">
                  <div className="text-[15px] sm:text-base font-bold text-[#1D1D1F] dark:text-white tracking-tight">
                    {tool.name}
                  </div>
                  <span className="text-xs text-[#6E6E73] dark:text-[#8E8E93] font-medium block">
                    {tool.role}
                  </span>
                  <p className="text-xs sm:text-[13px] text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed pt-0.5">
                    {tool.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

