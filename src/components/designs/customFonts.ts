import localFont from "next/font/local";

// Self-hosted display fonts for the Designs specimens. Each is one style, converted to woff2 from the
// supplied .otf files, and not preloaded: the file downloads the first time its specimen is selected.
export const antiqueOlive = localFont({
  src: "../../fonts/antique-olive-nord-italic.woff2",
  weight: "400",
  style: "normal",
  display: "swap",
  preload: false,
  variable: "--font-antique-olive",
});

export const beyno = localFont({
  src: "../../fonts/beyno.woff2",
  weight: "400",
  style: "normal",
  display: "swap",
  preload: false,
  variable: "--font-beyno",
});
