/**
 * Grid-size copy of a photo: 800px wide WebP in `photography/thumbs/`, same file name.
 * The full-size JPEG stays for the preview modal. Add a thumb with the same name when adding a photo.
 */
export function photoThumb(src: string): string {
  return src.replace(/\/photography\/([^/]+)\.jpe?g$/i, "/photography/thumbs/$1.webp");
}
