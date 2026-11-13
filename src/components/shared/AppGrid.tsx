import Image from "next/image";
import Reveal from "@/components/shared/Reveal";
import { EYEBROW, LEAD_GRAY, TITLE_INK } from "@/components/shared/typeScale";

export interface AppGridItem {
  name: string;
  /** One plain line on what it's for. Keep it to what the work actually shows. */
  description: string;
  /** A full app icon, drawn as is. */
  iconSrc?: string;
  /** A single-colour logo SVG, painted in `paint` (a colour or gradient) on a white app-icon tile. */
  glyph?: { src: string; paint: string };
  /** A mark without its own app-icon background, drawn on a white tile like the real app icon. */
  emblem?: boolean;
}

export interface AppGridGroup {
  /** Small label above the group, e.g. "Capture". Leave out for a single group. */
  title?: string;
  items: AppGridItem[];
}

/** Same squircle and hairline edge for every icon, so dark icons don't vanish on the dark page. */
const TILE =
  "relative h-16 w-16 overflow-hidden rounded-[22%] shadow-sm ring-1 ring-black/[0.06] sm:h-[72px] sm:w-[72px] dark:ring-white/[0.12]";
// Not `bg-white`: globals.css turns that black in dark mode, and an app icon stays white.
const WHITE = "bg-[#fff]";

function AppIcon({ item }: { item: AppGridItem }) {
  if (item.glyph) {
    const mask = `url(${item.glyph.src}) center / contain no-repeat`;
    return (
      <div className={`${TILE} ${WHITE}`}>
        {/* The logo is used as a mask, so it can be filled with a brand colour or gradient. */}
        <span className="absolute inset-[20%]" style={{ background: item.glyph.paint, mask, WebkitMask: mask }} />
      </div>
    );
  }
  return (
    <div className={`${TILE} ${item.emblem ? WHITE : ""}`}>
      {item.iconSrc && (
        <Image src={item.iconSrc} alt="" fill sizes="72px" className={item.emblem ? "object-contain p-[18%]" : "object-cover"} />
      )}
    </div>
  );
}

/**
 * The apps behind the work, laid out like the app grids on Apple's product pages: the real icon, its name and one
 * plain line, with no cards around them. Used by the Projects, Designs and Photography tool sections.
 */
export default function AppGrid({ groups, className = "" }: { groups: AppGridGroup[]; className?: string }) {
  // Every group shares one column count, so icons line up from group to group: 3 across only when no group has more.
  const cols = Math.max(...groups.map((g) => g.items.length)) <= 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";
  return (
    <div className={className}>
      {groups.map((group, gi) => (
        <div key={group.title ?? gi} className={gi === 0 ? "" : "mt-14 sm:mt-20"}>
          {group.title && <h3 className={`mb-6 ${EYEBROW} ${LEAD_GRAY}`}>{group.title}</h3>}
          <ul
            className={`grid grid-cols-2 gap-x-6 gap-y-12 lg:gap-x-10 ${cols}`}
          >
            {group.items.map((item, i) => (
              <li key={item.name}>
                {/* Each app fades up in turn, left to right, the way Apple's app grids arrive. Reveal plays once,
                    never hides what is already on screen, and is off for reduced motion. */}
                <Reveal delay={i * 70}>
                  <AppIcon item={item} />
                  <p className={`mt-5 text-[17px] sm:text-[19px] font-semibold tracking-apple-subhead ${TITLE_INK}`}>{item.name}</p>
                  <p className={`mt-1.5 max-w-[16rem] text-sm sm:text-[15px] leading-relaxed ${LEAD_GRAY}`}>{item.description}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
