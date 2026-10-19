import Link from "next/link";
import CaseStudyBreadcrumb from "@/components/shared/CaseStudyBreadcrumb";
import { COMPARE_COLUMNS, COMPARE_ROWS } from "@/data/projectCompare";
import { PROJECT_ACCENTS } from "@/data/projectTheme";

const dotStyle = (id: string) => {
  const [l, d] = PROJECT_ACCENTS[id];
  return { "--cl": l, "--cd": d } as React.CSSProperties;
};

const Dot = ({ id }: { id: string }) => (
  <span
    aria-hidden="true"
    style={dotStyle(id)}
    className="inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--cl)] dark:bg-[var(--cd)]"
  />
);

export default function ProjectCompare({ projectId, title }: { projectId: string; title: string }) {
  return (
    <div>
      <section className="pt-10 sm:pt-14 pb-10 sm:pb-14 px-6 sm:px-8 max-w-5xl mx-auto w-full">
        <CaseStudyBreadcrumb title={title} />
        <p className="text-sm font-semibold text-[var(--pa)]">{title}</p>
        <h1 className="mt-1 text-5xl sm:text-6xl md:text-7xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-hero leading-[1.04]">
          Compare.
        </h1>
        <p className="mt-5 max-w-2xl text-lg sm:text-xl text-[#68686D] dark:text-[#A1A1A6] leading-relaxed tracking-apple-subhead">
          Three internal tools built at Cytron, side by side.
        </p>
      </section>

      <section aria-label="Project comparison" className="px-6 sm:px-8 max-w-5xl mx-auto w-full pb-24">
        {/* Desktop: a table with the three projects as columns */}
        <div className="hidden md:block">
          <div className="grid grid-cols-[9rem_repeat(3,minmax(0,1fr))] gap-x-8 border-b border-[#D2D2D7] dark:border-[#424245] pb-6">
            <span />
            {COMPARE_COLUMNS.map((col) => (
              <div key={col.id}>
                <Link
                  href={`/projects/${col.id}`}
                  className="group inline-flex items-center gap-2 text-xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight hover:text-[var(--pa)] transition-colors"
                >
                  <Dot id={col.id} />
                  {col.name}
                </Link>
                {col.id === projectId && (
                  <p className="mt-1 text-xs font-semibold text-[#68686D] dark:text-[#A1A1A6]">You are here</p>
                )}
              </div>
            ))}
          </div>
          <dl>
            {COMPARE_ROWS.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[9rem_repeat(3,minmax(0,1fr))] gap-x-8 border-b border-black/[0.07] dark:border-white/10 py-5"
              >
                <dt className="text-[13px] font-semibold text-[#68686D] dark:text-[#86868B] pt-0.5">{row.label}</dt>
                {COMPARE_COLUMNS.map((col) => (
                  <dd
                    key={col.id}
                    className={`text-[15px] leading-relaxed ${
                      col.id === projectId ? "text-[#1D1D1F] dark:text-[#F5F5F7] font-medium" : "text-[#3A3A3C] dark:text-[#D1D1D6]"
                    }`}
                  >
                    {row.values[col.id]}
                  </dd>
                ))}
              </div>
            ))}
          </dl>
        </div>

        {/* Mobile: one block per project */}
        <div className="md:hidden space-y-10">
          {COMPARE_COLUMNS.map((col) => (
            <div key={col.id}>
              <Link
                href={`/projects/${col.id}`}
                className="inline-flex items-center gap-2 text-xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight"
              >
                <Dot id={col.id} />
                {col.name}
              </Link>
              {col.id === projectId && (
                <p className="mt-1 text-xs font-semibold text-[#68686D] dark:text-[#A1A1A6]">You are here</p>
              )}
              <dl className="mt-3 divide-y divide-black/[0.07] dark:divide-white/10 border-y border-black/[0.07] dark:border-white/10">
                {COMPARE_ROWS.map((row) => (
                  <div key={row.label} className="py-3">
                    <dt className="text-[13px] font-semibold text-[#68686D] dark:text-[#86868B]">{row.label}</dt>
                    <dd className="mt-0.5 text-[15px] leading-relaxed text-[#1D1D1F] dark:text-[#F5F5F7]">{row.values[col.id]}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm">
          <Link href={`/projects/${projectId}`} className="font-medium text-[var(--pa)] hover:underline">
            Back to Overview
          </Link>
        </p>
      </section>
    </div>
  );
}
