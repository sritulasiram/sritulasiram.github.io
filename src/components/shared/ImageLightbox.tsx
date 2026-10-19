"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

/** Full-size image in a native modal dialog. Esc, the close button or a click outside closes it. */
export default function ImageLightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    dialog?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
      dialog?.close();
    };
  }, []);

  return (
    <dialog
      ref={ref}
      aria-label={alt}
      // React's dev double-run closes and reopens the dialog; that first, stale "close" event
      // must not unmount it, so only a dialog that is really closed counts.
      onClose={() => {
        if (!ref.current?.open) onClose();
      }}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
      className="m-auto max-h-[92vh] max-w-[94vw] overflow-visible bg-transparent p-0 backdrop:bg-black/80 backdrop:backdrop-blur-sm"
    >
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="max-h-[92vh] max-w-[94vw] rounded-2xl object-contain shadow-2xl" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1D1D1F] shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </dialog>
  );
}
