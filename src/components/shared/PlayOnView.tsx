"use client";

import { useEffect, useRef } from "react";

/**
 * Sets data-play on its wrapper the first time it scrolls into view, so CSS can run an entrance
 * animation keyed to [data-play]. Renders a plain div, so the markup (and the final state) is the same
 * with or without JavaScript; the animation CSS itself only applies when motion is allowed.
 */
export default function PlayOnView({
  children,
  className,
  threshold = 0.45,
}: {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-play", "");
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
