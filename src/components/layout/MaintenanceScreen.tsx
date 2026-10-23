import { ArrowLeft, RefreshCw } from "lucide-react";
import Button from "@/components/ui/Button";
import EmailButton from "@/components/ui/EmailButton";
import { InstagramIcon, LinkedInIcon } from "@/components/about/BrandIcons";
import { ABOUT_DATA, CONTACT_DATA } from "@/data/content";

export type MaintenanceVariant = "upgrade" | "invalid" | "error";

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  LinkedIn: LinkedInIcon,
  Instagram: InstagramIcon,
};

const COPY = {
  upgrade: {
    eyebrow: null,
    lead: "Upgrading the site.",
    follow: "Back in a moment.",
    body: "I’m improving a few things behind the scenes. Everything will be back shortly.",
  },
  invalid: {
    eyebrow: "Page not found",
    lead: "This page isn’t here.",
    follow: "Let’s get you back.",
    body: "The link may be wrong, or the page may have moved. Try one of these instead.",
  },
  error: {
    eyebrow: "Something went wrong",
    lead: "That didn’t load.",
    follow: "Let’s try again.",
    body: "An unexpected error stopped this page from loading. Try again, or head back home.",
  },
} as const;

/**
 * One screen for both "the site is being upgraded" and "this page doesn't exist". The upgrade
 * variant draws its own header, because the site navigation is hidden while it is shown; the
 * invalid variant sits under the normal navigation.
 */
export default function MaintenanceScreen({
  variant,
  onRetry,
}: {
  variant: MaintenanceVariant;
  /** The error variant's "Try again" action (the route error boundary's reset). */
  onRetry?: () => void;
}) {
  const copy = COPY[variant];
  const upgrading = variant === "upgrade";

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen flex flex-col bg-white dark:bg-black text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors duration-300"
    >
      {upgrading && (
        <div role="banner" className="px-6 sm:px-8 py-5">
          <span className="text-xl font-semibold tracking-apple-tight">Sri Tulasi Ram</span>
        </div>
      )}

      <section
        className={`flex-1 flex flex-col items-center justify-center text-center px-6 pb-16 ${upgrading ? "" : "pt-24"}`}
      >
        {copy.eyebrow && (
          <p className="inline-flex items-center rounded-full bg-[#F5F5F7] dark:bg-[#1C1C1E] px-4 py-1.5 text-sm font-medium text-[#68686D] dark:text-[#A1A1A6]">
            {copy.eyebrow}
          </p>
        )}

        <h1 className={`${copy.eyebrow ? "mt-8" : ""} text-5xl sm:text-6xl md:text-7xl font-semibold tracking-apple-hero leading-[1.05]`}>
          <span className="block">{copy.lead}</span>
          <span className="block text-[#68686D] dark:text-[#8E8E93] font-medium">{copy.follow}</span>
        </h1>

        <p className="mt-6 max-w-md text-lg sm:text-xl leading-relaxed text-[#68686D] dark:text-[#A1A1A6] text-balance">
          {copy.body}
        </p>

        {upgrading ? (
          <div className="mt-14 text-sm text-[#68686D] dark:text-[#A1A1A6]">
            <p>Need to reach me in the meantime?</p>
            <ul className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <li>
                <EmailButton />
              </li>
              {ABOUT_DATA.links
                .filter((link) => link.label !== "GitHub")
                .map((link) => {
                  const Icon = SOCIAL_ICONS[link.label];
                  return (
                  <li key={link.label}>
                    <Button
                      variant="secondary"
                      href={link.href}
                      external
                      icon={Icon && <Icon className="h-4 w-4" />}
                      iconBefore
                    >
                      {link.label}
                    </Button>
                  </li>
                  );
                })}
            </ul>
          </div>
        ) : (
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            {variant === "error" && onRetry ? (
              <>
                <Button onClick={onRetry} accent={["#1D1D1F", "#F5F5F7"]} iconBefore icon={<RefreshCw className="h-4 w-4" aria-hidden="true" />} className="w-full sm:w-auto">
                  Try again
                </Button>
                <Button variant="secondary" href="/" className="w-full sm:w-auto">
                  Return home
                </Button>
              </>
            ) : (
              <>
                <Button href="/" accent={["#1D1D1F", "#F5F5F7"]} iconBefore icon={<ArrowLeft className="h-4 w-4" aria-hidden="true" />} className="w-full sm:w-auto">
                  Return home
                </Button>
                <Button variant="secondary" href="/projects" className="w-full sm:w-auto">
                  See projects
                </Button>
              </>
            )}
          </div>
        )}
      </section>

      {upgrading && (
        <footer className="py-6 text-center text-xs text-[#68686D] dark:text-[#8E8E93]">
          © {new Date().getFullYear()} Sri Tulasi Ram. All rights reserved.
        </footer>
      )}
    </main>
  );
}
