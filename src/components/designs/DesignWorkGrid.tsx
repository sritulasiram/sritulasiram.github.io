import Image from "next/image";
import Link from "next/link";
import { DESIGNS_DATA, DESIGN_DETAILS } from "@/data/designDetails";
import { MacbookPro } from "@/components/mockups/MacbookPro";
import DesignPhoneStage from "./DesignPhoneStage";
import { DESIGN_ACCENT, STAGE_DESIGNS } from "./designStage";

export default function DesignWorkGrid() {
  return (
    <section data-section="work" className="scroll-mt-20 py-12 sm:py-16 bg-white dark:bg-black transition-colors">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-10 sm:space-y-12">
        <div className="max-w-3xl space-y-3">
          <h2 className="text-3xl sm:text-5xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight leading-[1.08] text-balance">
            Selected work.
            <br />
            <span className="text-[#6E6E73] dark:text-[#8E8E93] font-medium">
              Where ideas become interfaces.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#6E6E73] dark:text-[#A1A1A6] font-normal leading-relaxed">
            Four mobile apps and one website. Each page covers the problem, the decisions, and the result.
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {DESIGNS_DATA.map((design) => {
            // Void's own hero image is a five-phone Android presentation that crops badly in a
            // card, so the lineup shows its home screen in the same phone frame as the others.
            const isPhone = DESIGN_DETAILS[design.id]?.heroLayout === "phone" || STAGE_DESIGNS.some((s) => s.id === design.id);
            const stage = STAGE_DESIGNS.find((s) => s.id === design.id);
            const screen = stage?.imageSrc ?? design.imageSrc;
            return (
              <li key={design.id} className="sm:[&:last-child:nth-child(odd)]:col-span-2">
                <Link
                  href={`/designs/${design.id}`}
                  className="group block rounded-3xl overflow-hidden bg-[#F5F5F7] dark:bg-[#1C1C1E] border border-black/[0.06] dark:border-white/10 transition-shadow duration-300 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0071E3]"
                >
                  {stage?.device === "laptop" ? (
                    <div
                      className="relative flex aspect-[4/3] items-center justify-center overflow-hidden px-6"
                      style={{
                        backgroundImage: `radial-gradient(110% 80% at 50% 0%, ${DESIGN_ACCENT[design.id] ?? "#0071E3"}38, transparent 70%), linear-gradient(180deg, ${DESIGN_ACCENT[design.id] ?? "#0071E3"}1A, ${DESIGN_ACCENT[design.id] ?? "#0071E3"}0A)`,
                      }}
                    >
                      <div role="img" aria-label={`${design.shortTitle} website`} className="w-full max-w-[460px]">
                        <MacbookPro src={screen} width="100%" height="auto" className="h-auto w-full drop-shadow-xl" />
                      </div>
                    </div>
                  ) : isPhone ? (
                    <DesignPhoneStage
                      src={screen}
                      alt={`${design.shortTitle} app screen`}
                      color={DESIGN_ACCENT[design.id] ?? "#0071E3"}
                      bleed
                      className="aspect-[4/3]"
                    />
                  ) : (
                    <div className="relative w-full aspect-[4/3] overflow-hidden">
                      <Image
                        src={design.imageSrc}
                        alt={`${design.shortTitle} app screens`}
                        fill
                        sizes="(max-width: 640px) 100vw, 570px"
                        className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-[1.03]"
                      />
                    </div>
                  )}
                  <div className="space-y-1 p-5 sm:p-6">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#6E6E73] dark:text-[#A1A1A6]">
                      {design.category}
                    </p>
                    <h3 className="text-xl sm:text-2xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-apple-tight">
                      {design.shortTitle}
                    </h3>
                    <p className="text-sm text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                      {design.subtitle}
                    </p>
                    <p className="pt-1 text-[13px] text-[#6E6E73] dark:text-[#A1A1A6]">
                      {design.tool.split(" · ")[0]} · {design.platform}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
