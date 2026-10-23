"use client";

import { useId, useRef, type ReactNode, type HTMLAttributes } from "react";

const PHONE_WIDTH = 420;
const PHONE_HEIGHT = 870;

const CHASSIS_X = 4;
const CHASSIS_Y = 2;
const CHASSIS_WIDTH = 412;
const CHASSIS_HEIGHT = 866;
const CHASSIS_RADIUS = 60.25;

const SCREEN_X = 15.25;
const SCREEN_Y = 13.25;
const SCREEN_WIDTH = 389.5;
const SCREEN_HEIGHT = 843.5;
const SCREEN_RADIUS = 49;

export interface IphoneScreenItem {
  id: string;
  src: string;
  active: boolean;
}

export interface IphoneFrameProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  screens?: IphoneScreenItem[];
  children?: ReactNode;
  className?: string;
  theme?: "light" | "dark";
  hideStatusBar?: boolean;
  noShadow?: boolean;
  /**
   * Cross-dissolve between `screens`: the new screen fades in over the old one, which stays fully
   * opaque underneath, so the frame never dips to the backing. Turn off to swap instantly.
   */
  fade?: boolean;
}

/**
 * Authentic iPhone 17 Figma-Grade Mockup
 * - Precise iPhone 17 hardware profile: Action Button, Volume Up/Down, Power, and Camera Control sapphire sensor
 * - 100% mathematically concentric uniform 11.25px bezels on all 4 borders
 * - Subtle titanium metallic gradients and specular edge highlights styled like professional Figma UI kits
 * - Centered Apple Dynamic Island with TrueDepth camera optics
 * - Zero artificial antenna stripes or awkward button geometry
 */
export default function IphoneFrame({
  src,
  screens,
  children,
  className = "",
  theme = "light",
  hideStatusBar = false,
  noShadow = false,
  fade = true,
  style,
  ...props
}: IphoneFrameProps) {
  const isDark = theme === "dark";
  const statusColor = isDark ? "text-white" : "text-[#1D1D1F]";
  const homeBarColor = isDark ? "bg-white/40" : "bg-black/30";
  const rawId = useId();

  // The screen shown before the current one, kept under the incoming screen while it fades in.
  const activeId = screens?.find((s) => s.active)?.id;
  const shown = useRef<{ cur?: string; prev?: string }>({ cur: activeId });
  if (shown.current.cur !== activeId) shown.current = { cur: activeId, prev: shown.current.cur };
  const prevId = shown.current.prev;
  const clipId = `iphone17-screen-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <div
      className={`relative inline-block w-full align-middle select-none ${
        noShadow
          ? ""
          : "drop-shadow-[0_25px_60px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_30px_70px_rgba(0,0,0,0.65)]"
      } transition-all duration-300 ${className}`}
      style={{
        aspectRatio: `${PHONE_WIDTH}/${PHONE_HEIGHT}`,
        ...style,
      }}
      {...props}
    >
      <svg
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${PHONE_WIDTH} ${PHONE_HEIGHT}`}
        className="w-full h-full block"
      >
        <defs>
          {/* Screen Content Clip Path: 100% concentric with chassis corners */}
          <clipPath id={clipId}>
            <rect
              x={SCREEN_X}
              y={SCREEN_Y}
              width={SCREEN_WIDTH}
              height={SCREEN_HEIGHT}
              rx={SCREEN_RADIUS}
              ry={SCREEN_RADIUS}
            />
          </clipPath>

          {/* Figma Titanium Chassis Gradient (Light Mode) */}
          <linearGradient id="chassis-titanium-light" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2E2E6" />
            <stop offset="35%" stopColor="#CECED4" />
            <stop offset="70%" stopColor="#DFDFE3" />
            <stop offset="100%" stopColor="#C2C2C8" />
          </linearGradient>

          {/* Figma Titanium Chassis Gradient (Dark Mode) */}
          <linearGradient id="chassis-titanium-dark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#444448" />
            <stop offset="35%" stopColor="#2A2A2E" />
            <stop offset="70%" stopColor="#3C3C40" />
            <stop offset="100%" stopColor="#242426" />
          </linearGradient>

          {/* Button Metal Gradient (Light Mode) */}
          <linearGradient id="button-metal-light" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#BCBCC2" />
            <stop offset="50%" stopColor="#D8D8DC" />
            <stop offset="100%" stopColor="#C4C4CA" />
          </linearGradient>

          {/* Button Metal Gradient (Dark Mode) */}
          <linearGradient id="button-metal-dark" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2D2D31" />
            <stop offset="50%" stopColor="#48484E" />
            <stop offset="100%" stopColor="#323236" />
          </linearGradient>
        </defs>

        {/* 1. Hardware Buttons Layer (Rendered cleanly under the chassis rim) */}
        {/* 1A. Action Button (Left Rail, Top) */}
        <rect
          x="1.5"
          y="175"
          width="2.5"
          height="35"
          rx="1.25"
          className="fill-[url(#button-metal-light)] dark:fill-[url(#button-metal-dark)] stroke-[#A8A8B0] dark:stroke-[#202024] stroke-[0.5]"
        />

        {/* 1B. Volume Up Button (Left Rail, Middle) */}
        <rect
          x="1.5"
          y="230"
          width="2.5"
          height="64"
          rx="1.25"
          className="fill-[url(#button-metal-light)] dark:fill-[url(#button-metal-dark)] stroke-[#A8A8B0] dark:stroke-[#202024] stroke-[0.5]"
        />

        {/* 1C. Volume Down Button (Left Rail, Lower) */}
        <rect
          x="1.5"
          y="312"
          width="2.5"
          height="64"
          rx="1.25"
          className="fill-[url(#button-metal-light)] dark:fill-[url(#button-metal-dark)] stroke-[#A8A8B0] dark:stroke-[#202024] stroke-[0.5]"
        />

        {/* 1D. Side / Power Button (Right Rail, Middle) */}
        <rect
          x="416"
          y="270"
          width="2.5"
          height="98"
          rx="1.25"
          className="fill-[url(#button-metal-light)] dark:fill-[url(#button-metal-dark)] stroke-[#A8A8B0] dark:stroke-[#202024] stroke-[0.5]"
        />

        {/* 2. Outer Titanium Chassis (Seamless Apple squircle perimeter) */}
        <rect
          x={CHASSIS_X}
          y={CHASSIS_Y}
          width={CHASSIS_WIDTH}
          height={CHASSIS_HEIGHT}
          rx={CHASSIS_RADIUS}
          ry={CHASSIS_RADIUS}
          className="fill-[url(#chassis-titanium-light)] dark:fill-[url(#chassis-titanium-dark)] stroke-[#B4B4BA] dark:stroke-[#46464C] stroke-[1.25]"
        />

        {/* 3. Inner OLED Black Bezel Base (Uniform 11.25px border around entire display) */}
        <rect
          x={CHASSIS_X + 2.5}
          y={CHASSIS_Y + 2.5}
          width={CHASSIS_WIDTH - 5}
          height={CHASSIS_HEIGHT - 5}
          rx={CHASSIS_RADIUS - 2.5}
          ry={CHASSIS_RADIUS - 2.5}
          className="fill-black"
        />

        {/* 4. Top Speaker Micro-Earpiece Grille (Centered in top bezel) */}
        <rect
          x={(PHONE_WIDTH - 54) / 2}
          y={CHASSIS_Y + 3.5}
          width="54"
          height="2.5"
          rx="1.25"
          className="fill-[#38383C] dark:fill-[#222226]"
        />

        {/* 5. Screen Opaque Canvas Backing (Ensures 100% solid non-transparent base) */}
        <rect
          x={SCREEN_X}
          y={SCREEN_Y}
          width={SCREEN_WIDTH}
          height={SCREEN_HEIGHT}
          rx={SCREEN_RADIUS}
          ry={SCREEN_RADIUS}
          className="fill-[#F5F5F7] dark:fill-[#000000]"
        />

        {/* 5A. Screen Images (Native vector clip path with smooth cross-dissolve support) */}
        {screens && screens.length > 0 && fade ? (
          <>
            {/* Every screen stays loaded, hidden, so a new one never waits on the network. */}
            {screens.map((screen) => (
              <image
                key={`load-${screen.id}`}
                x={SCREEN_X}
                y={SCREEN_Y}
                width={SCREEN_WIDTH}
                height={SCREEN_HEIGHT}
                preserveAspectRatio="xMidYMid slice"
                clipPath={`url(#${clipId})`}
                href={screen.src}
                style={{ opacity: 0 }}
              />
            ))}
            {screens
              .filter((screen) => screen.id === prevId && !screen.active)
              .map((screen) => (
                <image
                  key={`prev-${screen.id}`}
                  x={SCREEN_X}
                  y={SCREEN_Y}
                  width={SCREEN_WIDTH}
                  height={SCREEN_HEIGHT}
                  preserveAspectRatio="xMidYMid slice"
                  clipPath={`url(#${clipId})`}
                  href={screen.src}
                />
              ))}
            {screens
              .filter((screen) => screen.active)
              .map((screen) => (
                <image
                  key={`active-${screen.id}`}
                  className={prevId ? "screen-fade-in" : undefined}
                  x={SCREEN_X}
                  y={SCREEN_Y}
                  width={SCREEN_WIDTH}
                  height={SCREEN_HEIGHT}
                  preserveAspectRatio="xMidYMid slice"
                  clipPath={`url(#${clipId})`}
                  href={screen.src}
                />
              ))}
          </>
        ) : screens && screens.length > 0 ? (
          screens.map((screen) => (
            <image
              key={screen.id}
              x={SCREEN_X}
              y={SCREEN_Y}
              width={SCREEN_WIDTH}
              height={SCREEN_HEIGHT}
              preserveAspectRatio="xMidYMid slice"
              clipPath={`url(#${clipId})`}
              href={screen.src}
              style={{
                opacity: screen.active ? 1 : 0,
                transition: "none",
                pointerEvents: screen.active ? "auto" : "none",
              }}
            />
          ))
        ) : src ? (
          <image
            x={SCREEN_X}
            y={SCREEN_Y}
            width={SCREEN_WIDTH}
            height={SCREEN_HEIGHT}
            preserveAspectRatio="xMidYMid slice"
            clipPath={`url(#${clipId})`}
            href={src}
          />
        ) : null}

        {/* 5B. Interactive Screen Content (via foreignObject) */}
        {!src && (!screens || screens.length === 0) && children && (
          <foreignObject
            x={SCREEN_X}
            y={SCREEN_Y}
            width={SCREEN_WIDTH}
            height={SCREEN_HEIGHT}
            clipPath={`url(#${clipId})`}
          >
            <div className="w-full h-full relative flex flex-col justify-between overflow-hidden">
              {children}
            </div>
          </foreignObject>
        )}

        {/* 6. Dynamic Island Pill & Optical Sensor System (Centered over screen) */}
        <rect
          x={(PHONE_WIDTH - 122) / 2}
          y={SCREEN_Y + 11}
          width="122"
          height="35"
          rx="17.5"
          className="fill-black"
        />
        {/* TrueDepth Front Camera Lens */}
        <circle
          cx={(PHONE_WIDTH / 2) + 40}
          cy={SCREEN_Y + 11 + 17.5}
          r="5.5"
          className="fill-[#080812]"
        />
        {/* Optical Glass Specular Dot */}
        <circle
          cx={(PHONE_WIDTH / 2) + 41}
          cy={SCREEN_Y + 11 + 16.5}
          r="2"
          className="fill-[#1A2542]"
        />

        {/* 7. Subtle Screen Perimeter Glass Edge Highlight (Apple polished edge reflection) */}
        <rect
          x={SCREEN_X}
          y={SCREEN_Y}
          width={SCREEN_WIDTH}
          height={SCREEN_HEIGHT}
          rx={SCREEN_RADIUS}
          ry={SCREEN_RADIUS}
          fill="none"
          className="stroke-white/10 dark:stroke-white/5 stroke-[0.75] pointer-events-none"
        />
      </svg>

      {/* 8. iOS Status Bar & Home Indicator (For interactive synthetic mockups) */}
      {!hideStatusBar && !src && (!screens || screens.length === 0) && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            left: `${(SCREEN_X / PHONE_WIDTH) * 100}%`,
            top: `${(SCREEN_Y / PHONE_HEIGHT) * 100}%`,
            width: `${(SCREEN_WIDTH / PHONE_WIDTH) * 100}%`,
            height: `${(SCREEN_HEIGHT / PHONE_HEIGHT) * 100}%`,
          }}
        >
          {/* iOS Status Bar */}
          <div
            className={`absolute top-0 inset-x-0 px-6 pt-3 flex items-center justify-between text-[11px] font-semibold tracking-tight ${statusColor}`}
          >
            <span className="font-semibold tracking-tight text-[11px] pl-1">9:41</span>
            <div className="flex items-center gap-1.5 pr-1">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <rect x="2" y="15" width="3" height="7" rx="1" />
                <rect x="7" y="11" width="3" height="11" rx="1" />
                <rect x="12" y="7" width="3" height="15" rx="1" />
                <rect x="17" y="3" width="3" height="19" rx="1" />
              </svg>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 18c-.8 0-1.5.7-1.5 1.5S11.2 21 12 21s1.5-.7 1.5-1.5S12.8 18 12 18zm-4.9-3.2c1.3-1.3 3.3-2.1 4.9-2.1s3.6.8 4.9 2.1l1.4-1.4c-1.7-1.7-4-2.7-6.3-2.7s-4.6 1-6.3 2.7l1.4 1.4zm-3.6-3.6c2.4-2.4 5.7-3.7 8.5-3.7s6.1 1.3 8.5 3.7l1.4-1.4C19 7 15.6 5.5 12 5.5S5 7 2.1 9.8l1.4 1.4z" />
              </svg>
              <div className="relative w-5 h-2.5 rounded-[3px] border border-current flex items-center p-[1px]">
                <div className="h-full w-4/5 bg-current rounded-[1.5px]" />
                <div className="absolute -right-1 top-0.5 bottom-0.5 w-0.5 bg-current rounded-r-[1px]" />
              </div>
            </div>
          </div>

          {/* iOS Home Indicator Bar */}
          <div className="absolute bottom-2 inset-x-0 flex justify-center">
            <div className={`w-32 h-1 rounded-full ${homeBarColor}`} />
          </div>
        </div>
      )}
    </div>
  );
}
