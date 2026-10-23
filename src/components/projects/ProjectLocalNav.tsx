"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { hasCompare } from "@/data/projectCompare";
import { usePathname } from "next/navigation";

interface Props {
  projectId: string;
  title: string;
  githubUrl?: string;
  /** Overview / Tech Specs / Compare. Only projects with spec and compare pages have them. */
  showTabs?: boolean;
}

/**
 * Apple-style local nav for a product page: project name on the left, Overview / Tech Specs
 * on the right. Stays hidden while the global navigation is on screen, then fades in and sticks to the top
 * once that scrolls away, with a blurred backdrop.
 */
export default function ProjectLocalNav({ projectId, title, githubUrl, showTabs = true }: Props) {
  const pathname = usePathname();
  const path = pathname.replace(/\/$/, "");
  const onSpecs = path.endsWith("/specs");
  const onCompare = path.endsWith("/compare");

  // The global bar is 48px tall and scrolls away on product pages; show this one only after it has gone.
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const update = () => setVisible(window.scrollY >= 48);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const tabs = [
    { label: "Overview", href: `/projects/${projectId}`, active: !onSpecs && !onCompare },
    { label: "Tech Specs", href: `/projects/${projectId}/specs`, active: onSpecs },
    ...(hasCompare(projectId) ? [{ label: "Compare", href: `/projects/${projectId}/compare`, active: onCompare }] : []),
  ];

  return (
    <div
      inert={!visible}
      className={`sticky top-0 z-40 w-full transition-opacity duration-300 motion-reduce:transition-none ${
        visible ? "opacity-100" : "opacity-0"
      } border-b border-[#E5E5EA]/60 dark:border-white/[0.08] bg-white/80 dark:bg-[#0a0a0c]/72 backdrop-blur-3xl backdrop-saturate-150 dark:backdrop-blur-[28px] dark:backdrop-saturate-[1.8] dark:backdrop-brightness-[0.85] shadow-[0_1px_2px_rgba(0,0,0,0.02)] dark:shadow-none`}
    >
      <nav
        aria-label={`${title} sections`}
        className="max-w-5xl mx-auto px-6 sm:px-8 h-[52px] flex items-center justify-between gap-4"
      >
        <p className="text-[17px] sm:text-xl font-semibold tracking-apple-tight text-[#1D1D1F] dark:text-[#F5F5F7] truncate">
          {title}
        </p>

        <div className="flex items-center gap-5 sm:gap-7 shrink-0">
          {showTabs && (
          <ul className="flex items-center gap-1">
            {tabs.map((tab) => (
              <li key={tab.href}>
                <Link
                  href={tab.href}
                  aria-current={tab.active ? "page" : undefined}
                  className={`inline-flex h-7.5 items-center justify-center rounded-full px-3.5 text-[13px] font-medium leading-none transition-all duration-200 pointer-coarse:min-h-11 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] ${
                    tab.active
                      ? "bg-[#1D1D1F]/5 text-[#1D1D1F] dark:bg-white/10 dark:text-[#F5F5F7]"
                      : "text-[#6E6E73] hover:bg-[#1D1D1F]/5 hover:text-[#1D1D1F] dark:text-[#A1A1A6] dark:hover:bg-white/10 dark:hover:text-[#F5F5F7]"
                  }`}
                >
                  {tab.label}
                </Link>
              </li>
            ))}
          </ul>
          )}

          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center h-7 px-3.5 rounded-full text-xs font-medium text-white bg-[var(--pa)] hover:opacity-90 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
            >
              View on GitHub
            </a>
          )}
        </div>
      </nav>
    </div>
  );
}
