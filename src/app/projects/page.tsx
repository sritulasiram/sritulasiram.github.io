import Footer from "@/components/layout/Footer";
import {
  ProjectsHeroStage,
  ProjectsStickySubnav,
  ProjectsDirectory,
  EngineeringWorkbench,
} from "@/components/projects";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors duration-300 flex flex-col selection:bg-[#0071E3]/15 selection:text-[#1D1D1F] dark:selection:text-[#F5F5F7]">
      {/* 1. Page Header & Apple MacBook Pro Staging Hero with Scroll-Morph */}
      <ProjectsHeroStage />

      {/* 2. Optical Ruler Scrubber Chapter Navigation */}
      <ProjectsStickySubnav />

      {/* 3. Systems Directory */}
      <ProjectsDirectory />

      {/* 4. Engineering Workbench & Development Suite */}
      <EngineeringWorkbench />

      {/* 5. Bottom Contact Banner */}
      <Footer />
    </main>
  );
}
