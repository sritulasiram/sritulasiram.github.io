"use client";

interface Option<T> {
  value: T;
  label: string;
}

/** A labelled group of pill buttons for choosing one specimen setting. */
export default function DesignSpecimenToggle<T extends string | number | boolean>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
      <span className="basis-full sm:basis-auto text-xs font-semibold text-[#6E6E73] dark:text-[#8E8E93] sm:mr-2">{label}</span>
      <div className="inline-flex max-w-full items-center p-1 rounded-full bg-[#F5F5F7] dark:bg-[#1C1C1E] border border-black/[0.04] dark:border-white/[0.08] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={String(option.value)}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={selected}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap text-xs font-medium transition-all duration-200 min-h-[38px] sm:min-h-[32px] cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)] ${
              selected
                ? "bg-white dark:bg-[#2C2C2E] text-[#1D1D1F] dark:text-white shadow-xs"
                : "text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-white"
            }`}
          >
            {option.label}
          </button>
        );
      })}
      </div>
    </div>
  );
}
