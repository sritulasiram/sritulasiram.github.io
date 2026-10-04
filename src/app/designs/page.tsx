"use client";

import Footer from "@/components/Footer";
import DesignStickySubnav from "@/components/DesignStickySubnav";
import DesignHeroStage from "@/components/DesignHeroStage";
import DesignFoundationsKit from "@/components/DesignFoundationsKit";
import DesignIconsKit from "@/components/DesignIconsKit";
import DesignTypographyKit from "@/components/DesignTypographyKit";
import DesignWorkflowKit from "@/components/DesignWorkflowKit";

export default function DesignsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors duration-300 flex flex-col selection:bg-[#0071E3]/15 selection:text-[#1D1D1F] dark:selection:text-[#F5F5F7]">
      {/* 1. Apple OS 5-Phone Fan Staging Hero Viewport */}
      <DesignHeroStage />

      {/* 2. Optical Ruler Scrubber Side Navigation */}
      <DesignStickySubnav />

      {/* 4. Design Languages */}
      <DesignFoundationsKit />

      {/* 4. Icon Systems */}
      <DesignIconsKit />

      {/* 5. Typography Systems */}
      <DesignTypographyKit />

      {/* 6. Studio Workflow Apps */}
      <DesignWorkflowKit />

      {/* 7. Contact Footer */}
      <Footer />
    </main>
  );
}
