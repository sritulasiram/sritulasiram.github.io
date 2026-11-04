/** The "S" logo mark, with the author's name beside it, as used in the navigation. */
export default function BrandMark() {
  return (
    <span className="flex items-center gap-2">
      <svg viewBox="0 0 128 128" className="size-7 shrink-0" fill="none" aria-hidden="true">
        <circle cx="60" cy="60" r="52" className="fill-[#1D1D1F] dark:fill-[#C7C7CC]" />
        <path
          d="M60.05 78.96Q63.98 78.96 66.43 78.1Q71.07 76.44 71.07 71.94Q71.07 69.31 68.77 67.87Q66.46 66.46 61.53 65.38L55.91 64.12Q47.63 62.25 44.46 60.05Q39.09 56.38 39.09 48.57Q39.09 41.44 44.28 36.72Q49.47 32 59.51 32Q67.9 32 73.83 36.45Q79.75 40.9 80.04 49.36H69.38Q69.09 44.57 65.2 42.55Q62.61 41.22 58.76 41.22Q54.47 41.22 51.92 42.95Q49.36 44.68 49.36 47.77Q49.36 50.62 51.88 52.02Q53.5 52.96 58.79 54.22L67.94 56.42Q73.95 57.86 77.02 60.27Q81.77 64.02 81.77 71.11Q81.77 78.38 76.21 83.19Q70.64 88 60.49 88Q50.11 88 44.17 83.26Q38.23 78.53 38.23 70.25H48.82Q49.32 73.88 50.8 75.68Q53.5 78.96 60.05 78.96Z"
          strokeWidth="2.5"
          strokeLinejoin="round"
          className="fill-[#F5F5F7] stroke-[#F5F5F7] dark:fill-[#1D1D1F] dark:stroke-[#1D1D1F]"
        />
        <circle cx="108" cy="108" r="12" className="fill-[#0071E3] dark:fill-[#2997FF]" />
      </svg>
      <span className="text-xl font-semibold tracking-apple-tight">Sri Tulasi Ram</span>
    </span>
  );
}
