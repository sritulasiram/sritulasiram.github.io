import { GitHubIcon, InstagramIcon, LinkedInIcon } from "@/components/about/BrandIcons";
import { ABOUT_DATA, CONTACT_DATA } from "@/data/content";
import EmailButton from "@/components/ui/EmailButton";
import SitemapFooter from "@/components/layout/SitemapFooter";
import { cn } from "@/lib/cn";

interface FooterProps {
  className?: string;
  /** Page-specific closing line. Defaults to the site-wide one in CONTACT_DATA. */
  heading?: string;
  subheading?: string;
}

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  LinkedIn: LinkedInIcon,
  GitHub: GitHubIcon,
  Instagram: InstagramIcon,
};

/** Closing contact block with the sitemap footer (and copyright) underneath, shared by every page. Also the target of the #contact links. */
export default function Footer({
  className,
  heading: headingText = CONTACT_DATA.heading,
  subheading = CONTACT_DATA.subheading,
}: FooterProps = {}) {
  // Two-tone headline: the last word drops to gray on its own line.
  const words = headingText.split(" ");
  const last = words.pop();
  const heading = words;
  return (
    <footer
      id="contact"
      className={cn("scroll-mt-14 bg-white dark:bg-black text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors duration-300", className)}
    >
      <div className="max-w-5xl mx-auto w-full px-6 sm:px-8 pt-24 sm:pt-36 pb-10 text-center">
        <h2 className="mx-auto max-w-4xl text-4xl sm:text-6xl md:text-7xl font-semibold tracking-apple-hero leading-[1.03] text-balance">
          {heading.join(" ")}
          <span className="block text-[#68686D] dark:text-[#8E8E93]">{last}</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg sm:text-2xl text-[#68686D] dark:text-[#A1A1A6] tracking-apple-subhead text-balance">
          {subheading}
        </p>

        <EmailButton className="mt-10" />

        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-1">
          {ABOUT_DATA.links.map((link) => {
            const Icon = SOCIAL_ICONS[link.label];
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-xs text-[17px] text-[#1D1D1F] dark:text-[#F5F5F7] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D1D1F] dark:focus-visible:outline-[#F5F5F7]"
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <SitemapFooter />
    </footer>
  );
}
