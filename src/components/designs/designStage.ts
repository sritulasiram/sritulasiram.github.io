import { DESIGNS_DATA } from "@/data/designDetails";

export interface StageDesign {
  id: string;
  name: string;
  subtitle: string;
  shortSubtitle: string;
  category: string;
  /** Portrait app screen shown in the phone frame. */
  imageSrc: string;
  caseStudyUrl: string;
  /** Label for the link to the case study, specific to this design. */
  cta: string;
  /** What the design is shown on: phones for apps, a laptop for websites. */
  device: "phone" | "laptop";
}

// Presentation-only settings for the hero lineup, left to right.
// Names, categories and subtitles come from DESIGNS_DATA so they cannot drift.
const HERO_CONFIG: { id: string; shortSubtitle: string; screen: string; color: string; cta: string; device?: "phone" | "laptop" }[] = [
  { id: "kopiesatu", shortSubtitle: "Coffee Ordering", screen: "/images/designs/kopiesatu/screen-menu.png", color: "#3A3AB8", cta: "See the ordering flow" },
  { id: "void", shortSubtitle: "Project Management", screen: "/images/designs/void/app-project.jpg", color: "#2B4FE0", cta: "See the submission flow" },
  { id: "sage", shortSubtitle: "Student Counselling", screen: "/images/designs/sage/screen-home.jpg", color: "#16803C", cta: "See the check-in flow" },
  { id: "recycle-ai", shortSubtitle: "Second-Hand Marketplace", screen: "/images/designs/recycle-ai/screen-home.jpg", color: "#8B5E3C", cta: "See the scan-to-sell flow" },
  { id: "pmc-clinic", shortSubtitle: "Clinical Portal", screen: "/images/designs/pmc-clinic/mobile-home.jpg", color: "#102695", cta: "See the six pages" },
];

export const STAGE_DESIGNS: StageDesign[] = HERO_CONFIG.flatMap((cfg) => {
  const design = DESIGNS_DATA.find((d) => d.id === cfg.id);
  if (!design) return [];
  return [
    {
      id: cfg.id,
      name: design.shortTitle ?? design.title,
      subtitle: design.subtitle,
      shortSubtitle: cfg.shortSubtitle,
      category: design.category,
      imageSrc: cfg.screen,
      caseStudyUrl: `/designs/${cfg.id}`,
      cta: cfg.cta,
      device: cfg.device ?? "phone",
    },
  ];
});

export const DESIGN_ACCENT: Record<string, string> = Object.fromEntries(
  HERO_CONFIG.map((c) => [c.id, c.color]),
);
