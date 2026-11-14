import Reveal from "@/components/shared/Reveal";
import AppGrid, { type AppGridGroup } from "@/components/shared/AppGrid";
import { DESIGNS_DATA } from "@/data/designDetails";
import { SECTION_TITLE, TITLE_INK } from "@/components/shared/typeScale";

const TOOLS = [
  { name: "Figma", iconSrc: "/images/apps/app-figma.png", fallback: "Interface design, components and design systems." },
  { name: "Adobe XD", iconSrc: "/images/apps/app-xd.png", fallback: "Interactive prototypes and screen flows." },
  { name: "Adobe Photoshop", iconSrc: "/images/apps/app-photoshop.png", fallback: "Image editing and production assets." },
  { name: "Canva", iconSrc: "/images/apps/app-canva.png", fallback: "Quick slide decks and social graphics." },
];

// Each tool's caption lists the projects whose `tool` field names it, so it can't drift from the work.
const GROUPS: AppGridGroup[] = [
  {
    items: TOOLS.map((t) => {
      const used = DESIGNS_DATA.filter((d) => d.tool.split("·").map((x) => x.trim()).includes(t.name)).map((d) => d.shortTitle);
      return {
        name: t.name,
        iconSrc: t.iconSrc,
        description: used.length ? `${t.fallback} Used for ${used.join(", ")}.` : t.fallback,
      };
    }),
  },
];

/** The apps behind the designs, each tied to the projects it was used on. */
export default function DesignToolsStudio() {
  return (
    <section id="workflow" aria-label="Design tools" className="scroll-mt-20 py-16 sm:py-24 bg-white dark:bg-black transition-colors overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <Reveal>
          <h2 className={`max-w-3xl ${SECTION_TITLE} ${TITLE_INK}`}>
            Tools &amp; design suite.{" "}
            <span className="text-[#6E6E73] dark:text-[#A1A1A6]">What each app was used for, and where.</span>
          </h2>
        </Reveal>
        <AppGrid groups={GROUPS} className="mt-12 sm:mt-16" />
      </div>
    </section>
  );
}
