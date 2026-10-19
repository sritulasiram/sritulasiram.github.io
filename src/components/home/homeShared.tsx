import Button from "@/components/ui/Button";

export const INK = "text-[#1D1D1F] dark:text-[#F5F5F7]";
export const GRAY = "text-[#68686D] dark:text-[#A1A1A6]";
export const WRAP = "max-w-5xl mx-auto w-full px-6 sm:px-8";
export const WRAP_WIDE = "max-w-6xl mx-auto w-full px-6 sm:px-8";

/** Apple-style "Learn more ›" text link: the shared link button. */
export function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Button variant="link" href={href} className={className}>
      {children}
    </Button>
  );
}

/** Two-tone section headline: a gray lead-in, then the point in full ink. */
export function Headline({
  gray,
  ink,
  className = "",
  onDark = false,
}: {
  gray: string;
  ink: string;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <h2 className={`text-4xl sm:text-5xl md:text-6xl font-semibold tracking-apple-hero leading-[1.08] ${className}`}>
      <span className={onDark ? "text-[#86868B]" : GRAY}>{gray}</span>{" "}
      <span className={onDark ? "text-white" : INK}>{ink}</span>
    </h2>
  );
}
