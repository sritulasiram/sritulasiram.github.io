import { ArrowUpRight } from "lucide-react";
import { LayoutGrid, PenTool, Rocket } from "lucide-react";
import { ExploreTiles, type ExploreTile } from "@/components/shared/ExploreMore";
import type { DesignItem } from "@/types";

/** "Keep exploring" tiles at the foot of a design page: the next design, all designs, and the source or prototype. */
export default function DesignExploreMore({
  nextDesign,
  figmaUrl,
  githubUrl,
  liveUrl,
}: {
  nextDesign: DesignItem;
  figmaUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
}) {
  const tiles: ExploreTile[] = [
    {
      href: `/designs/${nextDesign.id}`,
      icon: Rocket,
      kicker: "Next design",
      title: nextDesign.title,
      body: nextDesign.subtitle,
    },
    {
      href: "/designs",
      icon: LayoutGrid,
      kicker: "All designs",
      title: "See more of the work.",
      body: "Every design, from mobile apps to web platforms.",
    },
  ];

  const link = figmaUrl
    ? { href: figmaUrl, kicker: "Figma", title: "Open the design file.", body: "Browse the screens, components and flows in Figma.", icon: PenTool }
    : liveUrl
      ? { href: liveUrl, kicker: "Live", title: "See it live.", body: "Open the working site in a new tab.", icon: ArrowUpRight }
      : githubUrl
        ? { href: githubUrl, kicker: "Source", title: "Read the code.", body: "Browse the repository on GitHub.", icon: ArrowUpRight }
        : null;
  if (link) tiles.push({ ...link, external: true });

  return <ExploreTiles tiles={tiles} />;
}
