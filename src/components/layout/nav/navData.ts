/**
 * Single source for the Projects and Designs menus. The desktop mega menu and the mobile
 * accordions both render from this, so a link added here shows up in both.
 */
export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface NavGroup {
  heading: string;
  /** Desktop grid columns out of 12. */
  span: 3 | 4 | 5 | 7;
  /** "primary" = large rows, "small" = compact secondary list. */
  variant: "primary" | "small";
  links: NavLink[];
}

export interface NavMenu {
  id: "projects" | "designs";
  label: string;
  href: string;
  allLabel: string;
  groups: NavGroup[];
}

export const NAV_MENUS: Record<NavMenu["id"], NavMenu> = {
  projects: {
    id: "projects",
    label: "Projects",
    href: "/projects",
    allLabel: "Explore All Projects",
    groups: [
      {
        heading: "Featured",
        span: 5,
        variant: "primary",
        links: [
          { label: "Cytron HR Assistive Intelligence", href: "/projects/cytron-hr-assistive-intelligence" },
          { label: "Raspberry Pi Diagnostic Suite", href: "/projects/raspberry-pi-diagnostics" },
          { label: "Warranty & RMA Management System", href: "/projects/warranty-rma" },
        ],
      },
      {
        heading: "More projects",
        span: 4,
        variant: "primary",
        links: [
          { label: "IoT Fertiliser Mixing System", href: "/projects/iot-fertiliser-mixing" },
          { label: "OpenCore EFI Hackintosh Build", href: "/projects/opencore-efi-hackintosh" },
          { label: "ROG Gaming Center macOS App", href: "/projects/rog-gaming-center" },
        ],
      },
      {
        heading: "Research & Publications",
        span: 3,
        variant: "small",
        links: [
          {
            label: "Published Research Paper (IJIE · UTHM)",
            href: "https://journal.uthm.edu.my/index.php/ijie/article/view/24386",
            external: true,
          },
          {
            label: "IoT Fertiliser Firmware (GitHub)",
            href: "https://github.com/sritulasiram/iot-fertiliser-mixing-esp32",
            external: true,
          },
        ],
      },
    ],
  },
  designs: {
    id: "designs",
    label: "Designs",
    href: "/designs",
    allLabel: "Explore All Designs",
    groups: [
      {
        heading: "UI/UX & Design",
        span: 5,
        variant: "primary",
        links: [
          { label: "Sage", href: "/designs/sage" },
          { label: "ReLife", href: "/designs/recycle-ai" },
          { label: "KopieSatu", href: "/designs/kopiesatu" },
          { label: "Perak Medical Centre", href: "/designs/pmc-clinic" },
          { label: "Void", href: "/designs/void" },
        ],
      },
    ],
  },
};

/** Top-level links that have no dropdown. */
export const NAV_DIRECT_LINKS: NavLink[] = [
  { label: "Photography", href: "/photography" },
  { label: "About", href: "/about" },
];

/** True when `pathname` is the link's page or one of its sub-pages. */
export const isActivePath = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);
