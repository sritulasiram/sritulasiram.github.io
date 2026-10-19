"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  projectId: string;
  title: string;
  githubUrl?: string;
}

/**
 * Apple-style local nav for a product page: project name on the left, Overview / Tech Specs
 * on the right. Sits under the global navigation, then sticks to the top once that scrolls away with a blurred backdrop.
 */
export default function ProjectLocalNav({ projectId, title, githubUrl }: Props) {
  const pathname = usePathname();
  const path = pathname.replace(/\/$/, "");
  const onSpecs = path.endsWith("/specs");
  const onCompare = path.endsWith("/compare");

  const tabs = [
    { label: "Overview", href: `/projects/${projectId}`, active: !onSpecs && !onCompare },
    { label: "Tech Specs", href: `/projects/${projectId}/specs`, active: onSpecs },
    { label: "Compare", href: `/projects/${projectId}/compare`, active: onCompare },
  ];

  return (
    <div className="sticky top-0 z-40 w-full border-b border-black/[0.08] dark:border-white/10 bg-white/80 dark:bg-black/80 backdrop-blur-xl backdrop-saturate-150">
      <nav
        aria-label={`${title} sections`}
        className="max-w-5xl mx-auto px-6 sm:px-8 h-[52px] flex items-center justify-between gap-4"
      >
        <p className="text-[17px] sm:text-xl font-semibold tracking-apple-tight text-[#1D1D1F] dark:text-[#F5F5F7] truncate">
          {title}
        </p>

        <div className="flex items-center gap-5 sm:gap-7 shrink-0">
          <ul className="flex items-center gap-5 sm:gap-7">
            {tabs.map((tab) => (
              <li key={tab.href}>
                <Link
                  href={tab.href}
                  aria-current={tab.active ? "page" : undefined}
                  className={`relative inline-flex items-center min-h-11 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--pa)] rounded-xs ${
                    tab.active
                      ? "text-[var(--pa)]"
                      : "text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7]"
                  }`}
                >
                  {tab.label}
                  {tab.active && (
                    <span
                      aria-hidden="true"
                      className="absolute left-0 right-0 -bottom-px h-[2px] bg-[var(--pa)]"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center h-7 px-3.5 rounded-full text-xs font-medium text-white bg-[var(--pa)] hover:opacity-90 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--pa)]"
            >
              View on GitHub
            </a>
          )}
        </div>
      </nav>
    </div>
  );
}
