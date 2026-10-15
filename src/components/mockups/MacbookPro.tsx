"use client";

import { useId, type ReactNode, type SVGProps } from "react";
import { preload } from "react-dom";
import { cn } from "@/lib/cn";

export interface MacbookProProps extends SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  src?: string;
  children?: ReactNode;
  /**
   * Controls how the screenshot fits within the MacBook display surface.
   * - "fill" (default): Fits the entire image into the display with 0% side cropping.
   * - "contain": Preserves aspect ratio with letterboxing.
   * - "cover": Fills the display but may crop edges.
   */
  fit?: "fill" | "contain" | "cover";
  /**
   * Controls whether the top camera notch is drawn inside the display.
   * Defaults to false so web application navigation and search bars are never clipped.
   */
  showNotch?: boolean;
  /**
   * Preload hint and fetch priority for critical above-the-fold hero rendering.
   */
  priority?: boolean;
}

export function MacbookPro({
  width = 650,
  height = 400,
  src,
  children,
  fit = "fill",
  showNotch = false,
  priority = false,
  className,
  style,
  ...props
}: MacbookProProps) {
  if (priority && src) {
    preload(src, { as: "image", fetchPriority: "high" });
  }

  const rawId = useId();
  const safeId = rawId.replace(/[^a-zA-Z0-9_-]/g, "");
  const clipId = `macbook-corners-${safeId || "frame"}`;

  const preserveAspectRatioValue =
    fit === "contain"
      ? "xMidYMid meet"
      : fit === "cover"
      ? "xMidYMid slice"
      : "none";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 650 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={cn("w-full h-auto select-none", className)}
      style={{
        aspectRatio: "650 / 400",
        maxWidth: "100%",
        display: "block",
        ...style,
      }}
      {...props}
    >
      <defs>
        <clipPath id={clipId}>
          <rect
            fill="#ffffff"
            x="74.52"
            y="21.32"
            width="501.22"
            height="323.85"
            rx="6"
            ry="6"
          />
        </clipPath>
      </defs>

      {/* Screen outer bezel / aluminum lid border */}
      <path
        fill="#8a8b8e"
        d="M79.56,13.18h491.32c7.23,0,13.1,5.87,13.1,13.1v336.61H66.46V26.28c0-7.23,5.87-13.1,13.1-13.1Z"
      />

      {/* Bezel inner edge */}
      <path
        fill="#222222"
        d="M79.96,14.24h490.45c6.83,0,12.37,5.54,12.37,12.37v336.28H67.59V26.6c0-6.83,5.54-12.37,12.37-12.37Z"
      />

      {/* Black display glass bezel */}
      <path
        fill="#050505"
        d="M570.25,15.74H80.34c-6.12,0-11.08,4.96-11.08,11.08v336.07h512.08V26.82c0-6.12-4.96-11.08-11.08-11.08ZM575.74,345.17H74.52V27.31c0-3.31,2.68-5.99,5.99-5.99h489.24c3.31,0,5.99,2.68,5.99,5.99v317.86Z"
      />

      {/* Active display surface */}
      <rect
        fill="#0b0b0d"
        x="74.52"
        y="21.32"
        width="501.22"
        rx="6"
        ry="6"
        height="323.85"
      />

      {/* Screen Image Content with both href and xlinkHref for maximum browser compatibility */}
      {src && !children && (
        <image
          href={src}
          xlinkHref={src}
          x="74.52"
          y="21.32"
          width="501.22"
          height="323.85"
          preserveAspectRatio={preserveAspectRatioValue}
          clipPath={`url(#${clipId})`}
        />
      )}

      {/* Screen Interactive / Custom Children Content */}
      {children && (
        <foreignObject
          x="74.52"
          y="21.32"
          width="501.22"
          height="323.85"
          clipPath={`url(#${clipId})`}
        >
          <div className="w-full h-full overflow-hidden flex flex-col justify-center items-center bg-black">
            {children}
          </div>
        </foreignObject>
      )}

      {/* Display hinge bar */}
      <rect fill="#1d1d1d" x="69.09" y="350.51" width="512.11" height="12.48" />

      {/* MacBook notch or bezel camera */}
      {showNotch ? (
        <>
          <path
            fill="#000000"
            d="M298.14,21.02h54.07v6.5c0,1.56-1.27,2.82-2.82,2.82h-48.42c-1.56,0-2.82-1.27-2.82-2.82v-6.5h0Z"
          />
          <path
            fill="#080d4c"
            d="M325.11,25.14c-1.99.03-1.99-3.09,0-3.06,1.99-.03,1.99,3.09,0,3.06Z"
          />
        </>
      ) : (
        /* Subtle camera dot centered in the top bezel above the display glass */
        <circle cx="325.11" cy="18.5" r="1.6" fill="#080d4c" opacity="0.9" />
      )}

      {/* Aluminum lower unibody chassis */}
      <path
        fill="#acadaf"
        d="M19.04,362.77h611.92v10.39c0,5.95-4.83,10.79-10.79,10.79H29.83c-5.95,0-10.79-4.83-10.79-10.79v-10.39h0Z"
      />

      {/* Chassis bottom feet & bevels */}
      <polygon
        fill="#b9b9bb"
        points="600.06 385.39 567.29 385.39 565.84 383.95 601.82 383.95 600.06 385.39"
      />
      <polygon
        fill="#292929"
        points="598.73 386.82 568.64 386.82 567.32 385.39 600.35 385.39 598.73 386.82"
      />
      <polygon
        fill="#b9b9bb"
        points="82.64 385.39 49.87 385.39 48.43 383.95 84.41 383.95 82.64 385.39"
      />
      <polygon
        fill="#292929"
        points="81.31 386.82 51.23 386.82 49.9 385.39 82.93 385.39 81.31 386.82"
      />

      {/* Display opening thumb groove */}
      <path
        fill="#8f9091"
        d="M278.11,362.6h94.05c0,3.63-2.95,6.58-6.58,6.58h-80.89c-3.63,0-6.58-2.95-6.58-6.58h0Z"
      />
    </svg>
  );
}

export function MacbookProDemo() {
  return (
    <div className="relative w-full max-w-[650px] mx-auto">
      <MacbookPro
        src="https://cdn.21st.dev/assets/mirror/b3/b35fa0ff86bea6f4568fa71cee2aad0c5af00d525cb267e01440fddbf8f5049b.jpg"
        className="w-full h-auto drop-shadow-2xl"
      />
    </div>
  );
}
