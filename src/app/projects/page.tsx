import Footer from "@/components/layout/Footer";
import { FOOTER_COPY } from "@/data/footerCopy";
import SectionNav from "@/components/layout/SectionNav";
import { ProjectsLineup, ProjectsImpact, EngineeringWorkbench } from "@/components/projects";

const PROJECT_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "lineup", label: "Selected" },
  { id: "all-projects", label: "All projects" },
  { id: "results", label: "Results" },
  { id: "workbench", label: "Workbench" },
];

export default function ProjectsPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-white dark:bg-black text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors duration-300 flex flex-col selection:bg-[#0071E3]/15 selection:text-[#1D1D1F] dark:selection:text-[#F5F5F7]">
      {/* 1-3. Hero, top three projects, and the full list that expands under them */}
      <ProjectsLineup />

      {/* 4. Optical Ruler Scrubber Chapter Navigation */}
      <SectionNav sections={PROJECT_SECTIONS} ariaLabel="Projects page chapters" />

      {/* 4b. Headline results */}
      <ProjectsImpact />

      {/* 5. Engineering Workbench & Development Suite */}
      <EngineeringWorkbench />

      {/* 6. Bottom Contact Banner */}
      <Footer {...FOOTER_COPY.projects} />
    </main>
  );
}
