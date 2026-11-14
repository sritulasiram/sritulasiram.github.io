import Footer from "@/components/layout/Footer";
import { FOOTER_COPY } from "@/data/footerCopy";
import SectionNav from "@/components/layout/SectionNav";
import DesignHeroStage from "@/components/designs/DesignHeroStage";
import DesignShowcaseMorph from "@/components/designs/DesignShowcaseMorph";
import DesignWorkGrid from "@/components/designs/DesignWorkGrid";
import DesignFoundationsKit from "@/components/designs/DesignFoundationsKit";
import DesignFoundationsStudio from "@/components/designs/DesignFoundationsStudio";
import DesignToolsStudio from "@/components/designs/DesignToolsStudio";

const DESIGN_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "work", label: "Work" },
  { id: "design", label: "Design" },
  { id: "workflow", label: "Tools" },
  { id: "foundations", label: "Typography & Icons" },
];

export default function DesignsPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-white dark:bg-black text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors duration-300 flex flex-col selection:bg-[#0071E3]/15 selection:text-[#1D1D1F] dark:selection:text-[#F5F5F7]">
      {/* 1-3. Hero + Selected Work.
          lg+ with motion: scroll-driven morph (phones turn into work tiles).
          Otherwise: static hero carousel followed by the work grid. */}
      <div className="hidden lg:motion-safe:block">
        <DesignShowcaseMorph />
      </div>
      <div className="lg:motion-safe:hidden">
        <DesignHeroStage />
        <DesignWorkGrid />
      </div>

      {/* 2. Optical Ruler Scrubber Side Navigation */}
      <SectionNav sections={DESIGN_SECTIONS} ariaLabel="Design page chapters" />

      {/* 4. Design Languages */}
      <DesignFoundationsKit />

      {/* 5. Tools, tied to the projects they were used on */}
      <DesignToolsStudio />

      {/* 6. Typography and icons, merged: a reference section to close the page */}
      <DesignFoundationsStudio />

      {/* 8. Contact Footer */}
      <Footer {...FOOTER_COPY.designs} />
    </main>
  );
}
