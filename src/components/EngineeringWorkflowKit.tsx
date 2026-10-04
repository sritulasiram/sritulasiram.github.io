"use client";

import Image from "next/image";

interface WorkflowItem {
  name: string;
  category?: string;
  iconSrc: string;
  description: string;
}

const DEV_SUITE: WorkflowItem[] = [
  {
    name: "Visual Studio Code",
    iconSrc: "/images/apps/app-vscode.png",
    description: "Primary IDE for full-stack systems engineering, Python Flask services, automated test suites, and Linux system scripting.",
  },
  {
    name: "Antigravity",
    iconSrc: "/images/apps/app-antigravity.png",
    description: "Agentic AI pair programming environment for architectural planning, rapid full-stack prototyping, and automated codebase refactoring.",
  },
  {
    name: "Arduino IDE",
    iconSrc: "/images/apps/app-arduino.svg",
    description: "Embedded C++ firmware development, sensor calibration, hardware interrupt handling, and serial telemetry for microcontrollers.",
  },
  {
    name: "Xcode",
    iconSrc: "/images/apps/app-xcode.png",
    description: "Native Swift 5.9 and SwiftUI engineering, Apple HIG interface design, user-space IOKit integration, and Instruments profiling.",
  },
];

const PLATFORMS_SILICON: WorkflowItem[] = [
  {
    name: "Raspberry Pi",
    iconSrc: "/images/apps/app-raspberrypi.svg",
    description: "Single-board computer (SBC) testbed hosting automated hardware QA sweeps, RP1 southbridge GPIO validation, and edge service daemons.",
  },
  {
    name: "ESP32 SoC",
    iconSrc: "/images/apps/app-esp32.svg",
    description: "Dual-core Wi-Fi & Bluetooth microcontroller (SoC) for autonomous IoT systems, ADC sensor acquisition, and real-time interrupt-driven actuation.",
  },
  {
    name: "Arduino Uno",
    iconSrc: "/images/apps/app-arduino-uno.svg",
    description: "8-bit ATmega328P microcontroller board for rapid prototyping, GPIO sensor interfacing, and fundamental embedded robotics.",
  },
];

export default function EngineeringWorkflowKit() {
  return (
    <section id="workflow" aria-label="Engineering Workflow" className="scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-10 sm:space-y-12">
        {/* Section Header matching Design Workflow layout */}
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#6E6E73] dark:text-[#8E8E93] block">
            Engineering Workflow
          </span>
          <h3 className="text-3xl sm:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight leading-[1.08] text-balance">
            Tools &amp; platforms used
          </h3>
          <p className="text-base sm:text-lg text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
            From single-board computers and microcontrollers to modern development environments and AI agents, each tool and platform is chosen for low-level hardware control and execution reliability.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          {/* Column 1: Development Suite & IDEs */}
          <div className="space-y-4">
            <div className="flex items-baseline justify-between pb-2.5">
              <h4 className="text-base sm:text-lg font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                Development Suite
              </h4>
              <span className="text-xs text-[#86868B] dark:text-[#6E6E73] font-medium">
                IDEs &amp; Agents
              </span>
            </div>

            <ul className="space-y-4 pt-1">
              {DEV_SUITE.map((item) => {
                const isEmblem = item.iconSrc.includes("arduino");
                return (
                  <li key={item.name}>
                    <div className="flex items-start gap-3.5 sm:gap-4 p-2 -m-2">
                      <div className="relative w-11 h-11 rounded-[22%] overflow-hidden border border-black/[0.08] dark:border-white/[0.12] shadow-2xs shrink-0 bg-[#F5F5F7] dark:bg-[#1C1C1E]">
                        <Image
                          src={item.iconSrc}
                          alt={`${item.name} Icon`}
                          fill
                          sizes="44px"
                          className={isEmblem ? "object-contain p-1.5" : "object-cover"}
                        />
                      </div>
                      <div className="space-y-0.5 min-w-0 flex-1">
                        <div className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                          {item.name}
                        </div>
                        <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 2: Silicon & Operating Platforms */}
          <div className="space-y-4">
            <div className="flex items-baseline justify-between pb-2.5">
              <h4 className="text-base sm:text-lg font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                Silicon &amp; Platforms
              </h4>
              <span className="text-xs text-[#86868B] dark:text-[#6E6E73] font-medium">
                Hardware &amp; Embedded
              </span>
            </div>

            <ul className="space-y-4 pt-1">
              {PLATFORMS_SILICON.map((item) => {
                const isEmblem = item.iconSrc.includes("raspberrypi");
                return (
                  <li key={item.name}>
                    <div className="flex items-start gap-3.5 sm:gap-4 p-2 -m-2">
                      <div className="relative w-11 h-11 rounded-[22%] overflow-hidden border border-black/[0.08] dark:border-white/[0.12] shadow-2xs shrink-0 bg-[#F5F5F7] dark:bg-[#1C1C1E]">
                        <Image
                          src={item.iconSrc}
                          alt={`${item.name} Icon`}
                          fill
                          sizes="44px"
                          className={isEmblem ? "object-contain p-1.5" : "object-cover"}
                        />
                      </div>
                      <div className="space-y-0.5 min-w-0 flex-1">
                        <div className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                          {item.name}
                        </div>
                        <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#8E8E93] leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Core Motivation Callout Banner */}
        <div className="pt-6 sm:pt-8 border-t border-[#E5E5EA] dark:border-white/10">
          <div className="p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#FAFAFA] dark:bg-[#121214] border border-[#E5E5EA] dark:border-white/10 apple-card-shadow space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#0071E3] dark:text-[#2997FF] block">
              The Guiding Motivation
            </span>
            <h4 className="text-lg sm:text-xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
              Building Unified Systems
            </h4>
            <p className="text-sm sm:text-base text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed max-w-3xl">
              Hardware microcontrollers, single-board testbeds, and native desktop software shouldn&apos;t live in disconnected silos. The goal of every project is bridging them into one cohesive, automated ecosystem with zero operational friction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
