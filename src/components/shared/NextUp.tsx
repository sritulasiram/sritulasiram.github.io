import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import IphoneFrame from "@/components/mockups/IphoneFrame";
import Button from "@/components/ui/Button";
import { EYEBROW, LEAD_GRAY, SECTION_TITLE, TILE_TITLE, TITLE_INK } from "@/components/shared/typeScale";

export interface NextUpLink {
  label: string;
  href: string;
  /** Opens in a new tab with a ↗. Links starting with http do this on their own. */
  external?: boolean;
}

export interface NextUpTile {
  /** Small label above the title, e.g. "Next project" or "The companion app". */
  kicker: string;
  title: string;
  body: string;
  href: string;
  imageSrc: string;
  /** The destination's own accent (`--pa-l` / `--pa-d`), so the tile previews where it leads. */
  accent?: CSSProperties;
  /** "phone" shows a tall app screen in an iPhone rising from the bottom; "screenshot" bleeds a wide one off the corner. */
  device?: "screenshot" | "phone";
}

const WRAP = "max-w-5xl mx-auto w-full px-6 sm:px-8";

/**
 * The end of every project and design page, in Apple's style: a quiet centred row of text links for this page's
 * other views, then one large tile for the way forward, with a screenshot that bleeds off its corner. Leave plenty of
 * room below so the tile reads as "keep browsing", apart from the footer's "get in touch".
 */
export default function NextUp({
  id,
  context,
  links,
  next,
}: {
  /** Anchor for the ending, e.g. so a sticky bar can tell when you have reached it. */
  id?: string;
  /** The heading above the links, e.g. "More on Warranty & RMA Management System." */
  context: string;
  links: NextUpLink[];
  next: NextUpTile;
}) {
  return (
    <nav id={id} aria-label="Keep exploring" className={`${WRAP} pt-6 pb-24 sm:pb-36`}>
      {links.length > 0 && (
        <div className="pt-16 text-center sm:pt-20">
          <h2 className={`mx-auto max-w-3xl ${SECTION_TITLE} ${TITLE_INK}`}>{context}</h2>
          {/* Tighter gaps on phones keep three links on one line; each link is already a 44px-tall tap target, so a
              wrapped row needs no extra gap above it. */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-8">
            {links.map((l) => (
              <Button key={l.href} variant="link" href={l.href} external={l.external}>
                {l.label}
              </Button>
            ))}
          </div>
        </div>
      )}

      <Link
        href={next.href}
        style={next.accent}
        className={`project-theme group relative isolate flex flex-col overflow-hidden rounded-[28px] [transform:translateZ(0)] bg-[var(--pa-tint)] md:min-h-[420px] md:flex-row focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)] ${
          links.length > 0 ? "mt-12 sm:mt-14" : ""
        }`}
      >
        <div className="p-7 sm:p-10 md:w-[44%] md:self-center">
          <p className={`${EYEBROW} text-[var(--pa)]`}>{next.kicker}</p>
          {/* h3 under the "More on …" heading; a page with no links has no heading, so the title steps up to h2. */}
          {links.length > 0 ? (
            <h3 className={`mt-2 ${TILE_TITLE} ${TITLE_INK}`}>{next.title}</h3>
          ) : (
            <h2 className={`mt-2 ${TILE_TITLE} ${TITLE_INK}`}>{next.title}</h2>
          )}
          {/* Clamped on phones so the screenshot below keeps its room. */}
          <p className={`mt-4 max-w-md text-base leading-relaxed line-clamp-2 sm:line-clamp-none ${LEAD_GRAY}`}>{next.body}</p>
          <span className="mt-5 inline-flex items-center gap-0.5 text-base font-medium text-[var(--pa)] group-hover:underline">
            Learn more
            <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>

        {next.device === "phone" ? (
          /* The phone rises from the tile's bottom edge and lifts a little on hover. */
          <div className="relative mt-auto h-[300px] sm:h-[340px] md:mt-0 md:h-auto md:flex-1">
            <div className="absolute left-1/2 top-6 w-[220px] -translate-x-1/2 transition-transform duration-700 ease-out group-hover:-translate-y-2 motion-reduce:transition-none sm:w-[240px] md:top-12 dark:brightness-[0.9]">
              <IphoneFrame src={next.imageSrc} theme="light" hideStatusBar noShadow />
            </div>
          </div>
        ) : (
        /* `isolate` + translateZ gives the frame its own layer, so its rounded corner keeps clipping the image while the
           image zooms (without it, browsers can draw the animating image unclipped, with a square corner). */
        <div className="relative isolate mt-auto ml-7 h-[300px] overflow-hidden rounded-tl-2xl shadow-2xl ring-1 ring-black/5 [transform:translateZ(0)] sm:ml-10 sm:h-[340px] dark:ring-white/10 md:ml-0 md:mt-14 md:h-auto md:flex-1">
          <Image
            src={next.imageSrc}
            alt=""
            fill
            sizes="(max-width: 768px) 90vw, 560px"
            className="object-cover object-left-top transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
          {/* Dims a white diagram or screenshot in dark mode so it doesn't glare, and lifts on hover. An overlay, not a
              filter: animating a filter on a large image is heavy and also breaks the corner clipping. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden bg-black/20 transition-opacity duration-700 group-hover:opacity-40 dark:block"
          />
        </div>
        )}
      </Link>
    </nav>
  );
}
