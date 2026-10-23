import { PHOTOGRAPHY_DATA } from "@/data/content";
import type { PhotoItem } from "@/types";

// Order of the Highlights shelf shared by the photography pages.
export const HIGHLIGHT_IDS = [
  "photo-fire",
  "photo-petronas-twin-spires",
  "photo-penang-breakwater-shore",
  "photo-peacock",
  "photo-crimson-dusk-skyline",
];

export const HIGHLIGHT_PHOTOS: PhotoItem[] = HIGHLIGHT_IDS.map((id) =>
  PHOTOGRAPHY_DATA.find((p) => p.id === id),
).filter((p): p is PhotoItem => Boolean(p));
