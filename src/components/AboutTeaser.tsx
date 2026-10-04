
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutTeaser() {
  return (
    <section
      id="about"
      className="py-14 sm:py-20 bg-white dark:bg-black transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Column: Monumental Headline */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#6E6E73] dark:text-[#A1A1A6] block">
              Philosophy &amp; Vision
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight leading-[1.12]">
              Engineering makes it work.
              <br />
              <span className="text-[#6E6E73] dark:text-[#8E8E93] font-medium">
                Design makes it effortless.
              </span>
            </h2>
          </div>

          {/* Right Column: Lead Narrative & Action Button */}
          <div className="lg:col-span-7 space-y-6 lg:pt-8">
            <p className="text-base sm:text-lg md:text-xl text-[#6E6E73] dark:text-[#A1A1A6] font-normal leading-relaxed tracking-apple-subhead">
              At Cytron Technologies, my daily work focuses on hardware diagnostics, support operations, and internal tools. But design completely changes how I build. It pushes me to strip away unnecessary complexity, obsess over typographic balance, and refine spatial proportions until an interface feels second nature. While traditional engineering often adds more controls and clutter, design forces me to simplify.
            </p>

            {/* Quick Credential Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-[#F5F5F7] dark:bg-[#161618] border border-black/[0.04] dark:border-white/[0.06] space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86868B] dark:text-[#8E8E93] block">
                  Credential
                </span>
                <p className="text-xs sm:text-[13px] font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                  BEM Graduate Engineer
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#F5F5F7] dark:bg-[#161618] border border-black/[0.04] dark:border-white/[0.06] space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86868B] dark:text-[#8E8E93] block">
                  Operations
                </span>
                <p className="text-xs sm:text-[13px] font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                  Cytron Support &amp; QA
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#F5F5F7] dark:bg-[#161618] border border-black/[0.04] dark:border-white/[0.06] space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86868B] dark:text-[#8E8E93] block">
                  Research
                </span>
                <p className="text-xs sm:text-[13px] font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                  Published Scopus Author
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                prefetch={false}
                className="apple-btn-secondary group"
              >
                <span>More about my background</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
