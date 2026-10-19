import IphoneFrame from "@/components/mockups/IphoneFrame";
import { cn } from "@/lib/cn";

/**
 * A portrait app screen in a phone frame, on a stage tinted with the brand colour.
 * Use it wherever a portrait screenshot would otherwise be cropped into a landscape box.
 */
export default function DesignPhoneStage({
  src,
  alt,
  color,
  bleed = false,
  className,
}: {
  src: string;
  alt: string;
  color: string;
  /** Let the phone run off the bottom edge, so a short card still shows a large phone. */
  bleed?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{
        backgroundImage: `radial-gradient(110% 80% at 50% 0%, ${color}38, transparent 70%), linear-gradient(180deg, ${color}1A, ${color}0A)`,
      }}
    >
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "absolute left-1/2 -translate-x-1/2 aspect-[420/870]",
          bleed ? "top-[12%] h-[110%]" : "top-1/2 -translate-y-1/2 h-[90%]",
        )}
      >
        <IphoneFrame src={src} theme="light" hideStatusBar />
      </div>
    </div>
  );
}
