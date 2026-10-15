"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface CaseStudyBreadcrumbProps {
  title: string;
}

/**
 * Accessible Apple HIG Breadcrumb Navigation
 * Meets WCAG AA contrast (minimum 4.5:1), provides 44px vertical touch targets on mobile,
 * and seamlessly adapts to Apple dark mode.
 */
export default function CaseStudyBreadcrumb({ title }: CaseStudyBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-5 sm:mb-6">
      <ol className="flex items-center gap-2 text-xs font-medium text-[#6E6E73] dark:text-[#A1A1A6] flex-wrap">
        <li className="flex items-center">
          <Link
            href="/"
            className="hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] transition-colors py-2 -my-2 min-h-[44px] flex items-center"
          >
            Home
          </Link>
        </li>
        <li className="flex items-center" aria-hidden="true">
          <ChevronRight className="w-3.5 h-3.5 text-[#86868B] dark:text-[#8E8E93] shrink-0" />
        </li>
        <li className="flex items-center">
          <Link
            href="/projects"
            className="hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] transition-colors py-2 -my-2 min-h-[44px] flex items-center"
          >
            Projects
          </Link>
        </li>
        <li className="flex items-center" aria-hidden="true">
          <ChevronRight className="w-3.5 h-3.5 text-[#86868B] dark:text-[#8E8E93] shrink-0" />
        </li>
        <li className="flex items-center">
          <span
            className="text-[#1D1D1F] dark:text-[#F5F5F7] font-semibold truncate max-w-[260px] sm:max-w-md"
            aria-current="page"
          >
            {title}
          </span>
        </li>
      </ol>
    </nav>
  );
}
