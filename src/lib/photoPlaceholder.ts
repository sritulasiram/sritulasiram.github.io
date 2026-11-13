import type { CSSProperties } from "react";
import { PHOTO_PLACEHOLDERS } from "@/data/photoPlaceholders";

/**
 * Background for a photo's tile while the photo loads: its average colour plus a soft ThumbHash preview, both in the
 * HTML from the first paint (see scripts/photo-placeholders.mjs). Put it on the element that holds the image; the
 * image fades in over it. Pass the photo's original `imageSrc` (the full-size JPEG path). Unknown photos get nothing,
 * so the tile's own grey background still shows.
 */
export function photoPlaceholderStyle(src: string): CSSProperties | undefined {
  const p = PHOTO_PLACEHOLDERS[src];
  if (!p) return undefined;
  return {
    backgroundColor: p.color,
    backgroundImage: `url("${p.image}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
}
