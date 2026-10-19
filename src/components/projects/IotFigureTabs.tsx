"use client";

import { useState } from "react";
import Image from "next/image";

interface Figure {
  id: string;
  label: string;
  title: string;
  description: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Optional narrower frame for tall figures. */
  narrow?: boolean;
}

/** Segmented control that swaps between the paper's figures, one at a time. */
export default function IotFigureTabs({ figures }: { figures: Figure[] }) {
  const [active, setActive] = useState(figures[0].id);
  const figure = figures.find((f) => f.id === active) ?? figures[0];

  return (
    <div>
      <div className="flex justify-center">
        <div
          role="group"
          aria-label="Figures"
          className="inline-flex max-w-full items-center overflow-x-auto rounded-full border border-black/[0.04] dark:border-white/[0.08] bg-[#F5F5F7] dark:bg-[#1C1C1E] p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {figures.map((f) => {
            const selected = f.id === active;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(f.id)}
                className={`min-h-[38px] cursor-pointer whitespace-nowrap rounded-full px-4 text-xs font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[var(--pa)] ${
                  selected
                    ? "bg-white dark:bg-[#2C2C2E] text-[#1D1D1F] dark:text-white shadow-xs"
                    : "text-[#68686D] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-white"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      <div key={figure.id} className="fade-swap mt-10">
        <div className={`mx-auto ${figure.narrow ? "max-w-2xl" : "max-w-4xl"} rounded-[28px] bg-[#FFFFFF] p-3 sm:p-5 shadow-sm ring-1 ring-black/[0.05] dark:ring-white/10`}>
          <Image
            src={figure.src}
            alt={figure.alt}
            width={figure.width}
            height={figure.height}
            sizes="(max-width: 1024px) 100vw, 880px"
            className="h-auto w-full rounded-2xl"
          />
        </div>
        <div className="mx-auto mt-6 max-w-2xl text-center">
          <h3 className="text-xl sm:text-2xl font-semibold tracking-apple-tight text-[#1D1D1F] dark:text-[#F5F5F7]">{figure.title}</h3>
          <p className="mt-2 text-[15px] sm:text-base leading-relaxed text-[#68686D] dark:text-[#A1A1A6]">{figure.description}</p>
        </div>
      </div>
    </div>
  );
}
