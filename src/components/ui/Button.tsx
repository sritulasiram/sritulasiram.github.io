import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import type { MouseEventHandler, ReactNode } from "react";
import { accentStyle } from "@/data/projectTheme";
import { cn } from "@/lib/cn";

/*
 * The site's one button system, after Apple's:
 *   primary    a filled pill in the page accent, for the main action
 *   secondary  a quiet gray pill, for a second action beside it
 *   link       blue "Learn more ›" text, for everything else
 * The accent is --pa on case-study pages, and Apple blue everywhere else.
 */

// Written out in full: Tailwind only generates classes it can read literally in the source.
const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]";

export const PILL =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--pa,var(--btn-accent))] px-6 text-[15px] font-medium text-white dark:text-black transition-opacity hover:opacity-90 " +
  FOCUS;
export const PILL_QUIET =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#E5E5EA] bg-[#F5F5F7] px-6 text-[15px] font-medium text-[#1D1D1F] transition-colors hover:bg-[#E8E8ED] dark:border-white/10 dark:bg-[#1C1C1E] dark:text-[#F5F5F7] dark:hover:bg-[#2C2C2E] " +
  FOCUS;
export const LINK =
  "inline-flex min-h-11 items-center gap-1 rounded-xs text-[17px] text-[var(--pa,var(--btn-accent))] hover:underline " +
  FOCUS;

type Variant = "primary" | "secondary" | "link";

interface ButtonProps {
  variant?: Variant;
  /** Renders a link. Without it, a <button>. */
  href?: string;
  /** Open in a new tab. Defaults to true for http(s) links. */
  external?: boolean;
  download?: boolean;
  prefetch?: boolean;
  /** Shown after the label, or before it with iconBefore. Links get a › (or ↗ if external) by default. */
  icon?: ReactNode;
  iconBefore?: boolean;
  /** [light, dark] colour for this button only, e.g. a design's own accent. */
  accent?: [string, string];
  onClick?: MouseEventHandler<HTMLElement>;
  ariaLabel?: string;
  className?: string;
  children: ReactNode;
}

const STYLES: Record<Variant, string> = { primary: PILL, secondary: PILL_QUIET, link: LINK };

export default function Button({
  variant = "primary",
  href,
  external,
  download,
  prefetch,
  icon,
  iconBefore = false,
  accent,
  onClick,
  ariaLabel,
  className,
  children,
}: ButtonProps) {
  const cls = cn(STYLES[variant], accent && "project-theme", className);
  const style = accent ? accentStyle(accent) : undefined;
  const isHttp = !!href && /^https?:/.test(href);
  const newTab = !!href && (external ?? isHttp);
  // Links get a › by default, or a ↗ when they leave the site.
  const Arrow = newTab ? ArrowUpRight : ChevronRight;
  const trailing = icon ?? (variant === "link" ? <Arrow aria-hidden="true" className="h-4 w-4" /> : null);
  const content = (
    <>
      {iconBefore && icon}
      {children}
      {!iconBefore && trailing}
    </>
  );

  if (!href) {
    return (
      <button type="button" onClick={onClick} aria-label={ariaLabel} className={cn(cls, "cursor-pointer")} style={style}>
        {content}
      </button>
    );
  }

  if (href.startsWith("/") && !newTab) {
    return (
      <Link href={href} prefetch={prefetch} onClick={onClick} aria-label={ariaLabel} className={cls} style={style}>
        {content}
      </Link>
    );
  }
  return (
    <a
      href={href}
      download={download}
      onClick={onClick}
      aria-label={ariaLabel}
      className={cls}
      style={style}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {content}
    </a>
  );
}
