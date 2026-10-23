"use client";

import { useState } from "react";

/**
 * Switch a panel between the old way and the new way. Opens on "After" so the default view
 * is the solution.
 */
export default function BeforeAfter({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
}: {
  before: React.ReactNode;
  after: React.ReactNode;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const [view, setView] = useState<"before" | "after">("after");

  const tab = (id: "before" | "after", label: string) => (
    <button
      type="button"
      aria-pressed={view === id}
      onClick={() => setView(id)}
      className={`min-h-9 rounded-full px-4 text-sm font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 ${
        view === id
          ? "bg-[var(--pa)] text-white dark:text-[#0B0B0C] focus-visible:outline-[#1D1D1F] dark:focus-visible:outline-white"
          : "text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-black/[0.06] dark:hover:bg-white/10 focus-visible:outline-[var(--focus-ring)]"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div>
      <div role="group" aria-label="Compare the old way and the new way" className="mb-6 flex w-fit rounded-full bg-[var(--pa-soft)] p-1">
        {tab("before", beforeLabel)}
        {tab("after", afterLabel)}
      </div>
      <div key={view} className="fade-swap">
        {view === "before" ? before : after}
      </div>
    </div>
  );
}
