import { ABOUT_DATA, CONTACT_DATA } from "@/data/content";
import { cn } from "@/lib/cn";

const RING =
  "focus:outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]";

/**
 * Contact at the bottom of the mobile menu, kept as plain as the rest of it: one pill that opens an email,
 * and the profile links underneath.
 */
export default function ContactLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="space-y-5">
      <a
        href={`mailto:${CONTACT_DATA.email}`}
        onClick={onNavigate}
        className={cn(
          "flex h-11 w-full items-center justify-center rounded-full bg-[#1D1D1F] px-6 text-[14px] font-medium text-white shadow-xs hover:bg-black dark:bg-white dark:text-[#1D1D1F] dark:hover:bg-[#F5F5F7]",
          RING,
        )}
      >
        Let&apos;s Talk
      </a>
      <ul className="flex items-center justify-center gap-5 text-[13px] font-medium text-[#6E6E73] dark:text-[#8E8E93]">
        {ABOUT_DATA.links.map((link, i) => (
          <li key={link.label} className="flex items-center gap-5">
            {i > 0 && <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#86868B]/40 dark:bg-[#8E8E93]/40" />}
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onNavigate}
              className="transition-colors hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7]"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
