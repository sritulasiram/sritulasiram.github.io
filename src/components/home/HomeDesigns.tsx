import Link from "next/link";
import IphoneFrame from "@/components/mockups/IphoneFrame";
import Reveal from "@/components/shared/Reveal";
import Button from "@/components/ui/Button";
import { STAGE_DESIGNS } from "@/components/designs/designStage";
import { Headline, GRAY, WRAP_WIDE } from "./homeShared";

const FEATURED = STAGE_DESIGNS.slice(0, 3);

/** The top three app designs, each in its own phone. */
export default function HomeDesigns() {
  return (
    <section id="designs" aria-label="Design" className="scroll-mt-14 py-24 sm:py-32">
      <div className={`${WRAP_WIDE} grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10`}>
        {/* Left: title and the list of designs */}
        <Reveal>
          <Headline gray="Designs." ink="Every screen, considered." className="text-balance" />
          <p className={`mt-5 max-w-md text-pretty text-lg sm:text-xl leading-relaxed ${GRAY}`}>
            A collection of my app designs, from the first screen to the last. Each one covers the problem, the decisions, and the result.
          </p>
          <Button
            variant="secondary"
            href="/designs"
            className="mt-8 border-black bg-black text-white hover:bg-[#1D1D1F] dark:border-white dark:bg-white dark:text-black dark:hover:bg-[#E8E8ED]"
          >
            See all designs
          </Button>
        </Reveal>

        {/* Right: the phones, stacked toward the right, the front one on the right edge */}
        <ul className="relative mx-auto aspect-[1/1.05] w-full max-w-[640px] lg:mr-0">
          {FEATURED.map((design, i) => (
            <li
              key={design.id}
              className="absolute w-[44%]"
              style={{ left: `${i * 31}%`, top: `${(FEATURED.length - 1 - i) * 2 + 3}%`, zIndex: i + 1 }}
            >
              <Reveal delay={i * 120}>
                <Link
                  href={design.caseStudyUrl}
                  aria-label={`${design.name}: ${design.shortSubtitle}`}
                  className="group block rounded-[2rem] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]"
                >
                  <div
                    role="img"
                    aria-label={`${design.name} app screen`}
                    className="aspect-[420/870] w-full drop-shadow-[0_20px_30px_rgba(0,0,0,0.18)] transition-transform duration-500 ease-out group-hover:-translate-y-3"
                  >
                    <IphoneFrame src={design.imageSrc} theme="light" hideStatusBar noShadow />
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
