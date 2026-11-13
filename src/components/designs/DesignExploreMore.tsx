import NextUp, { type NextUpLink } from "@/components/shared/NextUp";
import { accentStyle } from "@/data/projectTheme";
import type { DesignItem } from "@/types";
import { APP_STUDIES } from "./appStudies";
import { WEB_STUDIES } from "./webStudies";

/** The end of a design page: links to the design file or source and to all designs, then the next design. */
export default function DesignExploreMore({
  title,
  nextDesign,
  figmaUrl,
  githubUrl,
  liveUrl,
}: {
  title: string;
  nextDesign: DesignItem;
  figmaUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
}) {
  const links: NextUpLink[] = [];
  if (figmaUrl) links.push({ label: "Open in Figma", href: figmaUrl, external: true });
  else if (liveUrl) links.push({ label: "See it live", href: liveUrl, external: true });
  else if (githubUrl) links.push({ label: "Read the code", href: githubUrl, external: true });
  links.push({ label: "All designs", href: "/designs" });

  const nextAccent = (APP_STUDIES[nextDesign.id] ?? WEB_STUDIES[nextDesign.id])?.accent;

  return (
    <NextUp
      // "More on …" only when a link is actually about this design; "All designs" alone isn't.
      context={links.length > 1 ? `More on ${title}.` : "Keep exploring."}
      links={links}
      next={{
        kicker: "Next design",
        title: nextDesign.title,
        body: nextDesign.subtitle,
        href: `/designs/${nextDesign.id}`,
        imageSrc: nextDesign.imageSrc,
        accent: nextAccent ? accentStyle(nextAccent) : undefined,
        device: APP_STUDIES[nextDesign.id] ? "phone" : "screenshot",
      }}
    />
  );
}
