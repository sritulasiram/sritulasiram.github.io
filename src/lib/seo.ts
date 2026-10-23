import type { Metadata } from "next";

type Social = { title: string; description: string; path: string; image?: string };

/**
 * Open Graph and Twitter fields for a page. A page-level `openGraph` replaces the root one
 * wholesale, so the shared fields are repeated here; `image` falls back to the root portrait.
 */
export function pageSocial({ title, description, path, image }: Social): Pick<Metadata, "openGraph" | "twitter"> {
  const images = image ? [{ url: image, alt: title }] : undefined;
  return {
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Sri Tulasi Ram",
      locale: "en_US",
      type: "article",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}
