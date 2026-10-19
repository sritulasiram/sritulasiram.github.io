import IphoneFrame from "@/components/mockups/IphoneFrame";
import { MacbookPro } from "@/components/mockups/MacbookPro";

/**
 * The device a design is shown on in the lineups. Phones are drawn as is. A website is a laptop,
 * centred in a phone-shaped box (and a little wider than it), so the carousels and the scroll morph,
 * which are laid out around phone proportions, keep working.
 */
export default function StageDevice({
  device,
  src,
  alt,
}: {
  device: "phone" | "laptop";
  src: string;
  alt?: string;
}) {
  if (device === "phone") {
    return <IphoneFrame src={src} theme="light" hideStatusBar noShadow />;
  }
  return (
    <div className="flex aspect-[420/870] w-full items-center justify-center" role={alt ? "img" : undefined} aria-label={alt}>
      <div className="w-[150%] shrink-0">
        <MacbookPro src={src} width="100%" height="auto" className="h-auto w-full drop-shadow-xl" />
      </div>
    </div>
  );
}
