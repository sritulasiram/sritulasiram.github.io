import { Mail } from "lucide-react";
import { GitHubIcon, InstagramIcon, LinkedInIcon } from "@/components/about/BrandIcons";
import { ABOUT_DATA, CONTACT_DATA } from "@/data/content";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";

interface FooterProps {
  className?: string;
}

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  LinkedIn: LinkedInIcon,
  GitHub: GitHubIcon,
  Instagram: InstagramIcon,
};

/** Closing contact block and copyright, shared by every page. Also the target of the #contact links. */
export default function Footer({ className }: FooterProps = {}) {
  return (
    <footer
      id="contact"
      className={cn("scroll-mt-14 bg-white dark:bg-black text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors duration-300", className)}
    >
      <div className="max-w-5xl mx-auto w-full px-6 sm:px-8 pt-24 sm:pt-32 pb-10 text-center">
        <h2 className="mx-auto max-w-3xl text-4xl sm:text-6xl md:text-7xl font-semibold tracking-apple-hero leading-[1.05]">
          {CONTACT_DATA.heading}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg sm:text-xl text-[#68686D] dark:text-[#A1A1A6] leading-relaxed text-balance">
          {CONTACT_DATA.subheading}
        </p>

        <Button
          href={`mailto:${CONTACT_DATA.email}`}
          iconBefore
          icon={<Mail className="h-4 w-4" aria-hidden="true" />}
          className="mt-9"
        >
          {CONTACT_DATA.email}
        </Button>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {ABOUT_DATA.links.map((link) => {
            const Icon = SOCIAL_ICONS[link.label];
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#F5F5F7] dark:bg-[#1C1C1E] px-5 text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors hover:bg-[#E8E8ED] dark:hover:bg-[#2C2C2E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0071E3] dark:focus-visible:outline-[#2997FF]"
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <p className="mt-8 text-sm text-[#68686D] dark:text-[#8E8E93]">{CONTACT_DATA.location}</p>

        <p className="mt-16 border-t border-[#E5E5EA] dark:border-[#2C2C2E] pt-6 text-xs text-[#68686D] dark:text-[#8E8E93]">
          © {new Date().getFullYear()} Sri Tulasi Ram
        </p>
      </div>
    </footer>
  );
}
