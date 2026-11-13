"use client";

import { useCallback, useState } from "react";
import Image, { type ImageProps } from "next/image";

/**
 * A next/image that stays transparent until it has loaded, then fades in over its container's background. Give the
 * container a neutral background (e.g. `bg-[#E5E5EA] dark:bg-[#1C1C1E]`): that tile is the placeholder, the way Apple's
 * pages show a quiet grey shape instead of a half-drawn photo. Images that finished before React started still show.
 * Pass `style.opacity` to hide it for other reasons too (it is combined with the load state).
 */
export default function FadeImage({ alt, className = "", style, onLoad, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  // An image can finish loading before hydration, when its load event has already gone.
  const ref = useCallback((img: HTMLImageElement | null) => {
    if (img?.complete && img.naturalWidth > 0) setLoaded(true);
  }, []);

  const wanted = style?.opacity ?? 1;
  return (
    <Image
      {...props}
      alt={alt}
      ref={ref}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
      className={`${className} motion-reduce:!transition-none`}
      style={{
        ...style,
        opacity: loaded ? wanted : 0,
        // Inline, so it replaces any transition class: keep the usual hover zoom easing alongside the fade. Tailwind v4's
        // `scale-*` classes set the `scale` property, not `transform`, so `scale` has to be listed or the zoom snaps.
        transition: style?.transition ?? "opacity 0.5s ease-out, transform 0.7s ease-out, scale 0.7s ease-out",
      }}
    />
  );
}
