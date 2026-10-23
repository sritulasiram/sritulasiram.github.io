"use client";

import { useState } from "react";
import { Play } from "lucide-react";

/**
 * A YouTube video that costs nothing until it is played: a thumbnail and a play button, with the
 * player (on the privacy-friendly youtube-nocookie domain) loaded on the first click.
 */
export default function YouTubeEmbed({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  const [thumb, setThumb] = useState("maxresdefault");

  return (
    <div className="relative aspect-video overflow-hidden rounded-[28px] bg-black ring-1 ring-black/5 dark:ring-white/10">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[var(--pa)]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${id}/${thumb}.jpg`}
            alt=""
            loading="lazy"
            onError={() => thumb !== "hqdefault" && setThumb("hqdefault")}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10" />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black shadow-lg backdrop-blur transition-transform duration-300 group-hover:scale-105 sm:h-20 sm:w-20">
            <Play className="ml-1 h-7 w-7 fill-current sm:h-8 sm:w-8" aria-hidden="true" />
          </span>
        </button>
      )}
    </div>
  );
}
