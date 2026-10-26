import Link from "next/link";
import type { NavGroup, NavLink, NavMenu } from "./navData";

const SPAN = { 3: "col-span-3", 4: "col-span-4", 5: "col-span-5", 7: "col-span-7" } as const;
const STAGGER = [
  "apple-stagger-1",
  "apple-stagger-2",
  "apple-stagger-3",
  "apple-stagger-4",
  "apple-stagger-5",
  "apple-stagger-6",
];

const HEADING =
  "text-[11px] font-semibold uppercase tracking-widest text-[#6E6E73] dark:text-[#8E8E93] apple-stagger-1";
const PRIMARY =
  "block font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] hover:text-black dark:hover:text-white hover:bg-[#F5F5F7] dark:hover:bg-[#1C1C1E] px-2.5 -mx-2.5 py-1 rounded-xl transition-all duration-150 tracking-apple-tight hover:translate-x-0.5 motion-reduce:hover:translate-x-0 focus:outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]";
const SMALL =
  "block text-xs text-[#6E6E73] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] hover:bg-[#F5F5F7] dark:hover:bg-[#1C1C1E] px-2.5 py-1 rounded-lg transition-all duration-150 focus:outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]";

function MegaLink({
  link,
  className,
  onNavigate,
}: {
  link: NavLink;
  className: string;
  onNavigate: () => void;
}) {
  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
        className={className}
      >
        {link.label}
        <span aria-hidden="true"> ↗</span>
      </a>
    );
  }
  return (
    <Link prefetch={false} href={link.href} onClick={onNavigate} className={className}>
      {link.label}
    </Link>
  );
}

function Group({
  group,
  menu,
  isFirst,
  onNavigate,
}: {
  group: NavGroup;
  menu: NavMenu;
  isFirst: boolean;
  onNavigate: () => void;
}) {
  if (group.variant === "small") {
    return (
      <div className={`${SPAN[group.span]} space-y-2`}>
        <p className={HEADING}>{group.heading}</p>
        <ul className="space-y-0.5">
          {group.links.map((link, i) => (
            <li key={link.href + link.label} className={STAGGER[Math.min(i + 1, 5)]}>
              <MegaLink link={link} className={SMALL} onNavigate={onNavigate} />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className={`${SPAN[group.span]} space-y-2.5`}>
      <p className={HEADING}>{group.heading}</p>
      <div className="space-y-1">
        {isFirst && (
          <MegaLink
            link={{ label: menu.allLabel, href: menu.href }}
            className={`${PRIMARY} text-xl apple-stagger-2`}
            onNavigate={onNavigate}
          />
        )}
        {group.links.map((link, i) => (
          <MegaLink
            key={link.href}
            link={link}
            className={`${PRIMARY} text-lg ${STAGGER[Math.min(i + (isFirst ? 2 : 1), 5)]}`}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Desktop dropdown content. Arrow keys, Home and End move between the links, so the menu is
 * usable from the keyboard (Escape and focus return are handled by the navigation).
 */
export default function MegaMenu({ menu, onNavigate }: { menu: NavMenu; onNavigate: () => void }) {
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const keys = ["ArrowDown", "ArrowUp", "Home", "End"];
    if (!keys.includes(event.key)) return;
    const links = Array.from(event.currentTarget.querySelectorAll<HTMLElement>("a[href]"));
    if (links.length === 0) return;
    const index = links.indexOf(document.activeElement as HTMLElement);
    let next = index;
    if (event.key === "ArrowDown") next = (index + 1) % links.length;
    else if (event.key === "ArrowUp") next = (index - 1 + links.length) % links.length;
    else if (event.key === "Home") next = 0;
    else next = links.length - 1;
    event.preventDefault();
    links[next].focus();
  };

  return (
    <div data-mega-menu={menu.id} onKeyDown={onKeyDown} className="grid grid-cols-12 gap-8">
      {menu.groups.map((group, i) => (
        <Group key={group.heading} group={group} menu={menu} isFirst={i === 0} onNavigate={onNavigate} />
      ))}
    </div>
  );
}
