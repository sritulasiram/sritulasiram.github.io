import CountUp from "@/components/shared/CountUp";

const FIGURES = [
  { value: "19", label: "Automated checks", detail: "Raspberry Pi Diagnostic Suite, from one Run All button" },
  { value: "99.6%", label: "TDS sensor accuracy", detail: "Peer-reviewed in IJIE, UTHM" },
  { value: "300+", label: "Automated tests", detail: "Warranty & RMA Management System" },
];

/** Light-gray band with three headline results, in the style of an Apple product stats row. */
export default function ProjectsImpact() {
  return (
    <section
      id="results"
      aria-label="Results"
      className="scroll-mt-20 py-16 sm:py-24 bg-[#F5F5F7] dark:bg-[#1C1C1E] transition-colors"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <h2 className="max-w-2xl text-3xl sm:text-5xl font-semibold tracking-apple-tight leading-[1.08] text-[#1D1D1F] dark:text-[#F5F5F7]">
          Built to be measured.{" "}
          <span className="text-[#6E6E73] dark:text-[#A1A1A6]">Shipped with the numbers to prove it.</span>
        </h2>
        <dl className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
          {FIGURES.map((f) => (
            <div key={f.label}>
              <dt className="sr-only">{f.label}</dt>
              <dd>
                <CountUp
                  value={f.value}
                  className="block text-5xl sm:text-6xl md:text-7xl font-semibold tracking-apple-tight text-[#1D1D1F] dark:text-[#F5F5F7] tabular-nums"
                />
                <span className="mt-3 block text-lg font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">{f.label}</span>
                <span className="mt-1 block text-[15px] text-[#6E6E73] dark:text-[#A1A1A6]">{f.detail}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
