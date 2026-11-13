import Reveal from "@/components/shared/Reveal";
import AppGrid, { type AppGridGroup } from "@/components/shared/AppGrid";
import { SECTION_TITLE, TITLE_INK } from "@/components/shared/typeScale";

const DESIGN_TOOLS: AppGridGroup[] = [
  {
    items: [
      {
        name: "Figma",
        iconSrc: "/images/apps/app-figma.png",
        description: "Interface design, components and design systems.",
      },
      {
        name: "Adobe XD",
        iconSrc: "/images/apps/app-xd.png",
        description: "Interactive prototypes and screen flows, like Void.",
      },
      {
        name: "Adobe Photoshop",
        iconSrc: "/images/apps/app-photoshop.png",
        description: "Image editing and production assets.",
      },
      {
        name: "Canva",
        iconSrc: "/images/apps/app-canva.png",
        description: "Quick slide decks and social graphics.",
      },
    ],
  },
];

/** The apps behind the designs, in the same app grid as the Projects and Photography pages. */
export default function DesignWorkflowKit() {
  return (
    <section
      id="workflow"
      aria-label="Design tools"
      className="scroll-mt-20 py-16 sm:py-24 bg-white dark:bg-black transition-colors overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <Reveal>
          <h2 className={`max-w-3xl ${SECTION_TITLE} ${TITLE_INK}`}>
            Tools &amp; design suite.{" "}
            <span className="text-[#6E6E73] dark:text-[#A1A1A6]">The apps I design, prototype and produce assets with.</span>
          </h2>
        </Reveal>
        {/* The grid staggers its own apps in, so it isn't wrapped in a Reveal (that would animate it twice). */}
        <AppGrid groups={DESIGN_TOOLS} className="mt-12 sm:mt-16" />
      </div>
    </section>
  );
}
