import Link from "next/link";
import { ABOUT_DATA, CONTACT_DATA } from "@/data/content";
import { NAV_DIRECT_LINKS, NAV_MENUS, type NavLink } from "@/components/layout/nav/navData";

const [PHOTOGRAPHY, ABOUT] = NAV_DIRECT_LINKS;

interface Column {
  heading: string;
  href?: string;
  links: NavLink[];
}

const COLUMNS: Column[] = [
  {
    heading: NAV_MENUS.projects.label,
    href: NAV_MENUS.projects.href,
    links: NAV_MENUS.projects.groups[0].links.concat(NAV_MENUS.projects.groups[1].links),
  },
  { heading: NAV_MENUS.designs.label, href: NAV_MENUS.designs.href, links: NAV_MENUS.designs.groups[0].links },
  {
    heading: "Explore",
    links: [PHOTOGRAPHY, ABOUT, NAV_MENUS.projects.groups[2].links[0]],
  },
  {
    heading: "Connect",
    links: [
      { label: "Email", href: `mailto:${CONTACT_DATA.email}` },
      ...ABOUT_DATA.links.map((l) => ({ label: l.label, href: l.href, external: true })),
    ],
  },
];

const LINK =
  "text-[#424245] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] hover:underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] rounded-xs";

/** Apple-style sitemap footer: a quiet band of link columns with the legal line underneath. */
export default function SitemapFooter() {
  return (
    <div className="bg-white dark:bg-black transition-colors duration-300">
      <nav aria-label="Site map" className="max-w-6xl mx-auto px-6 sm:px-8 pt-10 sm:pt-12 pb-6">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-x-6 gap-y-8 pb-6 md:grid-cols-4 md:gap-x-8">
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h2 className="text-xs font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                {col.href ? (
                  <Link href={col.href} className="hover:underline underline-offset-2">
                    {col.heading}
                  </Link>
                ) : (
                  col.heading
                )}
              </h2>
              <ul className="mt-3 space-y-2.5 text-xs">
                {col.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className={LINK}>
                        {link.label}
                      </a>
                    ) : link.href.startsWith("mailto:") ? (
                      <a href={link.href} className={LINK}>
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className={LINK}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="pt-4 text-center text-xs text-[#6E6E73] dark:text-[#86868B]">
          © {new Date().getFullYear()} Sri Tulasi Ram. All rights reserved.
        </p>
      </nav>
    </div>
  );
}
