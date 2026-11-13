/**
 * The site's heading scale. Every page title, section title, eyebrow and lead paragraph uses these, so the same role
 * looks the same everywhere. Colour is left to the caller (INK, two-tone spans, or white on the dark band); spacing
 * between the pieces is: eyebrow → title `mt-2`, title → lead `mt-4`.
 *
 * Deliberate exceptions that keep their own sizes: the home hero name, the About hero (it sits beside the portrait),
 * the launch gate, the maintenance screen, the footer's closing line, the side-by-side "showcase morph" intros
 * (narrow column), card titles inside hero stages, and the animated *Statement pieces.
 */

/** The product or person name that sits above a hero title (Apple's "iPhone 16 Pro" line). */
export const NAME_LABEL = "text-xl sm:text-2xl font-semibold tracking-apple-tight";

/** The page's h1 in its hero. */
export const PAGE_TITLE = "text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-apple-hero leading-[1.03] text-balance";

/** Every section headline (h2) on every page. */
export const SECTION_TITLE = "text-3xl sm:text-5xl font-semibold tracking-apple-hero leading-[1.08] text-balance";

/** The name on a large project or design tile (home Systems tiles, the "Next project" tile). */
export const TILE_TITLE = "text-3xl sm:text-4xl font-semibold tracking-apple-hero leading-[1.1] text-balance";

/** A heading inside a section, e.g. each group on a Tech Specs page. */
export const SUBSECTION_TITLE = "text-2xl sm:text-[28px] font-semibold tracking-apple-tight leading-[1.14] text-balance";

/** The big one-line subtitle under a landing page's h1 (Projects, Designs, Photography), e.g. "Hardware and software, engineered as one." */
export const HERO_SUBTITLE = "text-xl sm:text-2xl md:text-3xl font-medium leading-snug tracking-apple-tight text-balance";

/** The paragraph directly under a page or section title. Add `max-w-2xl` (and `mx-auto` when centred). */
export const SECTION_LEAD = "text-lg sm:text-xl leading-relaxed tracking-apple-subhead text-pretty";

/** The small label above a title. Accent colour (`text-[var(--pa)]`) on light bands, `text-[#86868B]` on the dark band. */
export const EYEBROW = "text-sm font-semibold";

/** Title ink and lead gray for light/dark mode on ordinary bands. Both pass 4.5:1 on white and on #F5F5F7. */
export const TITLE_INK = "text-[#1D1D1F] dark:text-[#F5F5F7]";
export const LEAD_GRAY = "text-[#6E6E73] dark:text-[#A1A1A6]";
/** On the dark band. */
export const LEAD_GRAY_ON_DARK = "text-[#A1A1A6]";
