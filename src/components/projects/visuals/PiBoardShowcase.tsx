"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";

const DIR = "/images/projects/raspberry-pi-diagnostics/hardware";

interface Board {
  id: string;
  tab: string;
  name: string;
  soc: string;
  image: string;
  checks: string[];
}

const BOARDS: Board[] = [
  {
    id: "pi-5",
    tab: "Pi 5",
    name: "Raspberry Pi 5",
    soc: "BCM2712 · Cortex-A76",
    image: `${DIR}/pi-5.jpg`,
    checks: [
      "Direct lgpio probing on the RP1 (gpiochip4, 0, 1)",
      "PCIe Gen 2 / 3 link check",
      "Dual micro-HDMI display engines",
      "PMIC telemetry (DA9091)",
    ],
  },
  {
    id: "pi-4",
    tab: "Pi 4",
    name: "Raspberry Pi 4 Model B",
    soc: "BCM2711 · Cortex-A72",
    image: `${DIR}/pi-4.jpg`,
    checks: [
      "VL805 USB 3.0 controller topology",
      "Broadcom GPIO on gpiochip0",
      "Dual micro-HDMI display engines",
      "Under-voltage register decoding",
    ],
  },
  {
    id: "pi-400",
    tab: "Pi 400 / 500",
    name: "Raspberry Pi 400 / 500",
    soc: "BCM2711 / BCM2712",
    image: `${DIR}/pi-400.jpg`,
    checks: ["Keyboard matrix detection", "Every Pi 4 and Pi 5 peripheral check"],
  },
  {
    id: "pi-3",
    tab: "Pi 3",
    name: "Raspberry Pi 3 Model B / B+",
    soc: "BCM2837 / BCM2837B0",
    image: `${DIR}/pi-3.jpg`,
    checks: [
      "Full-size HDMI (tvservice and DRM)",
      "Standard 40-pin GPIO header",
      "2.4 / 5 GHz Wi-Fi and Bluetooth 4.2",
    ],
  },
  {
    id: "pi-zero-2",
    tab: "Zero 2 W",
    name: "Raspberry Pi Zero 2 W",
    soc: "BCM2710A1 · Cortex-A53",
    image: `${DIR}/pi-zero-2.jpg`,
    checks: ["Mini-HDMI display engine", "Wireless interfaces", "Low-power PMIC monitoring"],
  },
];

/**
 * Product-style board picker: a neutral segmented control, one wide photo tile, and beneath it the
 * board name on the left with what the suite checks on the right. No cards or dividers; the only
 * colour is the accent on the check marks.
 */
export default function PiBoardShowcase() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const board = BOARDS[active];

  const onKeyDown = (event: React.KeyboardEvent) => {
    const last = BOARDS.length - 1;
    const next =
      event.key === "ArrowRight" ? (active === last ? 0 : active + 1)
      : event.key === "ArrowLeft" ? (active === 0 ? last : active - 1)
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : null;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Raspberry Pi models"
        onKeyDown={onKeyDown}
        className="flex w-fit max-w-full overflow-x-auto rounded-full bg-black/[0.06] p-1 dark:bg-white/10 [scrollbar-width:none]"
      >
        {BOARDS.map((b, i) => (
          <button
            key={b.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            role="tab"
            id={`board-tab-${b.id}`}
            aria-selected={i === active}
            aria-controls="board-panel"
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={`min-h-11 sm:min-h-10 shrink-0 rounded-full px-4 sm:px-5 text-sm font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 ${
              i === active
                ? "bg-[#ffffff] text-[#1D1D1F] shadow-sm dark:bg-[#48484A] dark:text-[#F5F5F7] focus-visible:outline-[var(--focus-ring)]"
                : "text-[#68686D] hover:text-[#1D1D1F] dark:text-[#A1A1A6] dark:hover:text-[#F5F5F7] focus-visible:outline-[var(--focus-ring)]"
            }`}
          >
            {b.tab}
          </button>
        ))}
      </div>

      <div
        id="board-panel"
        role="tabpanel"
        aria-labelledby={`board-tab-${board.id}`}
        className="mt-8 grid items-center gap-8 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:gap-14"
      >
        {/* Photo tile: all boards stacked and crossfaded so the tile never changes size. */}
        <div className="relative aspect-[3/2] overflow-hidden rounded-[28px] bg-[#E8E8ED] [corner-shape:squircle] dark:bg-[#1C1C1E]">
          {BOARDS.map((b, i) => (
            <Image
              key={b.id}
              src={b.image}
              alt={i === active ? `${b.name}, seen from above` : ""}
              aria-hidden={i !== active}
              fill
              sizes="(max-width: 768px) 100vw, 560px"
              className={`object-cover transition-opacity duration-500 motion-reduce:transition-none ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        <div key={board.id} className="fade-swap">
          <div>
            <h3 className="text-3xl font-semibold leading-[1.08] tracking-apple-hero text-[#1D1D1F] sm:text-4xl dark:text-[#F5F5F7]">
              {board.name}
            </h3>
            <p className="mt-3 text-lg text-[#68686D] dark:text-[#A1A1A6]">{board.soc}</p>
          </div>

          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#68686D] dark:text-[#A1A1A6]">What the suite checks</p>
            <ul className="mt-4 space-y-3.5">
              {board.checks.map((check) => (
                <li key={check} className="flex items-start gap-3 text-base leading-snug text-[#1D1D1F] sm:text-lg dark:text-[#F5F5F7]">
                  <Check className="mt-1 h-[18px] w-[18px] shrink-0 text-[var(--pa)]" strokeWidth={2.5} aria-hidden="true" />
                  {check}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <p className="mt-10 text-sm text-[#68686D] dark:text-[#A1A1A6]">
        Pi 2, Pi 1, Zero and Zero W run in passive mode: peripheral discovery, single-core load testing and firmware checks.
      </p>
    </div>
  );
}
