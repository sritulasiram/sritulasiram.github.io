"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface CaseStudyBreadcrumbProps {
  title: string;
  /** A page below the project (e.g. "Tech Specs"). The project title then links back to `titleHref`. */
  current?: string;
  titleHref?: string;
  /** Centre the trail, for centred page headers. Wrapped lines stay centred too. */
  centered?: boolean;
}

const LINK = "hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] transition-colors py-2 -my-2 min-h-[44px] flex items-center";
const CURRENT = "text-[#1D1D1F] dark:text-[#F5F5F7] font-semibold";

function Sep() {
  return (
    <li className="flex items-center" aria-hidden="true">
      <ChevronRight className="w-3.5 h-3.5 text-[#86868B] dark:text-[#8E8E93] shrink-0" />
    </li>
  );
}

/**
 * Accessible Apple HIG Breadcrumb Navigation
 * Meets WCAG AA contrast (minimum 4.5:1), provides 44px vertical touch targets on mobile,
 * and seamlessly adapts to Apple dark mode.
 */
export default function CaseStudyBreadcrumb({ title, current, titleHref, centered = false }: CaseStudyBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-5 sm:mb-6">
      <ol
        className={`flex items-center gap-x-2 text-xs font-medium text-[#6E6E73] dark:text-[#A1A1A6] flex-wrap ${
          centered ? "justify-center" : ""
        }`}
      >
        <li className="flex items-center">
          <Link href="/" className={LINK}>
            Home
          </Link>
        </li>
        <Sep />
        <li className="flex items-center">
          <Link href="/projects" className={LINK}>
            Projects
          </Link>
        </li>
        <Sep />
        <li className="flex min-w-0 items-center">
          {current && titleHref ? (
            <Link href={titleHref} className={`${LINK} min-w-0`}>
              <span className="truncate max-w-[180px] sm:max-w-md">{title}</span>
            </Link>
          ) : (
            <span className={`${CURRENT} truncate max-w-[260px] sm:max-w-md`} aria-current="page">
              {title}
            </span>
          )}
        </li>
        {current && (
          <>
            <Sep />
            <li className="flex items-center">
              <span className={CURRENT} aria-current="page">
                {current}
              </span>
            </li>
          </>
        )}
      </ol>
    </nav>
  );
}
