import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { CONTACT_DATA } from "@/data/content";
import { NAV_DIRECT_LINKS, NAV_MENUS, isActivePath, type NavLink } from "./navData";

const TOP_LEVEL = "text-[26px] sm:text-[28px] font-semibold tracking-apple-tight transition-colors";
const RING =
  "focus:outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]";

interface MobileMenuProps {
  open: boolean;
  pathname: string;
  expanded: Record<string, boolean>;
  onToggle: (id: string) => void;
  onNavigate: () => void;
  onContact: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

function SubLink({ link, small, onNavigate }: { link: NavLink; small: boolean; onNavigate: () => void }) {
  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
        className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#6E6E73] dark:text-[#A1A1A6] hover:text-black dark:hover:text-white py-1.5 transition-colors"
      >
        <span>{link.label}</span>
        <ArrowUpRight className="w-3.5 h-3.5 text-[#86868B]" />
      </a>
    );
  }
  return (
    <Link
      prefetch={false}
      href={link.href}
      onClick={onNavigate}
      className={
        small
          ? "block text-[14px] font-medium text-[#6E6E73] dark:text-[#A1A1A6] hover:text-black dark:hover:text-white py-1.5 transition-colors"
          : "block text-[15px] font-medium text-[#1D1D1F]/80 dark:text-[#F5F5F7]/80 hover:text-black dark:hover:text-white py-1.5 transition-colors"
      }
    >
      {link.label}
    </Link>
  );
}

export default function MobileMenu({ open, pathname, expanded, onToggle, onNavigate, onContact }: MobileMenuProps) {
  return (
    <div
      id="mobile-menu"
      aria-hidden={!open}
      inert={!open}
      className={`md:hidden fixed inset-0 z-40 bg-white/85 dark:bg-[#0a0a0c]/85 ${
        open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
    >
      <div className="h-full overflow-y-auto mobile-nav-panel px-6 sm:px-8 pt-16 pb-12 w-full max-w-6xl mx-auto flex flex-col justify-between">
        <nav aria-label="Mobile navigation" className="flex flex-col space-y-1">
          {Object.values(NAV_MENUS).map((menu, index) => {
            const isOpen = Boolean(expanded[menu.id]);
            const active = isActivePath(pathname, menu.href);
            return (
              <div key={menu.id} className={open ? `mobile-item-${index + 1}` : ""}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`mobile-${menu.id}-submenu`}
                  onClick={() => onToggle(menu.id)}
                  className={`w-full flex items-center justify-between py-2 text-left group rounded-lg ${RING}`}
                >
                  <span
                    className={`${TOP_LEVEL} ${
                      active
                        ? "text-[#0071E3] dark:text-[#2997FF]"
                        : "text-[#1D1D1F] dark:text-[#F5F5F7] group-hover:text-black dark:group-hover:text-white"
                    }`}
                  >
                    {menu.label}
                  </span>
                  <div className="w-8 h-8 flex items-center justify-center rounded-full group-hover:bg-black/5 dark:group-hover:bg-white/10 transition-colors">
                    <ChevronDown
                      className={`w-5 h-5 text-[#86868B] dark:text-[#8E8E93] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isOpen ? "rotate-180 text-[#1D1D1F] dark:text-[#F5F5F7]" : ""
                      }`}
                    />
                  </div>
                </button>

                {/* Animated accordion. `inert` keeps the collapsed links out of the tab order. */}
                <div
                  id={`mobile-${menu.id}-submenu`}
                  inert={!isOpen}
                  className={`grid transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? "grid-rows-[1fr] opacity-100 pt-1 pb-3" : "grid-rows-[0fr] opacity-0 pt-0 pb-0 pointer-events-none"
                  }`}
                >
                  <div className="overflow-hidden pl-1">
                    <Link
                      prefetch={false}
                      href={menu.href}
                      onClick={onNavigate}
                      className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#0071E3] dark:text-[#2997FF] py-1.5 hover:underline"
                    >
                      <span>{menu.allLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    {menu.groups.map((group) => (
                      <div key={group.heading} className="pt-3 pb-1">
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#6E6E73] dark:text-[#8E8E93]">
                          {group.heading}
                        </p>
                        <div className="space-y-0.5 pt-1.5">
                          {group.links.map((link) => (
                            <SubLink
                              key={link.href}
                              link={link}
                              small={group.variant === "small"}
                              onNavigate={onNavigate}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          {NAV_DIRECT_LINKS.map((link, index) => (
            <div key={link.href} className={open ? `mobile-item-${index + 3}` : ""}>
              <Link
                prefetch={false}
                href={link.href}
                onClick={onNavigate}
                aria-current={isActivePath(pathname, link.href) ? "page" : undefined}
                className={`block py-2 ${TOP_LEVEL} ${
                  isActivePath(pathname, link.href)
                    ? "text-[#0071E3] dark:text-[#2997FF]"
                    : "text-[#1D1D1F] dark:text-[#F5F5F7] hover:text-black dark:hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            </div>
          ))}
        </nav>

        {/* Bottom actions and quick links */}
        <div className={`pt-4 mt-6 space-y-5 ${open ? "mobile-item-5" : ""}`}>
          <Link
            prefetch={false}
            href="/#contact"
            onClick={onContact}
            className="w-full h-11 px-6 rounded-full text-[14px] font-medium text-white dark:text-[#1D1D1F] bg-[#1D1D1F] dark:bg-white hover:bg-black dark:hover:bg-[#F5F5F7] shadow-xs hover:shadow-sm flex items-center justify-center transition-all duration-200"
          >
            Let&apos;s Talk
          </Link>

          <div className="flex items-center justify-center gap-5 text-[13px] font-medium text-[#6E6E73] dark:text-[#8E8E93]">
            <a
              href="https://www.linkedin.com/in/sritulasiram"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] transition-colors"
            >
              LinkedIn
            </a>
            <span className="w-1 h-1 rounded-full bg-[#86868B]/40 dark:bg-[#8E8E93]/40" />
            <a
              href="https://github.com/sritulasiram"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] transition-colors"
            >
              GitHub
            </a>
            <span className="w-1 h-1 rounded-full bg-[#86868B]/40 dark:bg-[#8E8E93]/40" />
            <a
              href={`mailto:${CONTACT_DATA.email}`}
              className="hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
