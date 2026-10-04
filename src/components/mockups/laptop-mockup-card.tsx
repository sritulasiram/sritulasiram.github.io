import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

const laptopFrameVariants = {
  gray: {
    border: "border-neutral-300 dark:border-neutral-700",
    base: "bg-gradient-to-b from-neutral-300 to-neutral-400 dark:from-neutral-700 dark:to-neutral-800",
    notch: "bg-neutral-500 dark:bg-neutral-600",
  },
  titanium: {
    border: "border-[#7a7671] dark:border-[#54514d]",
    base: "bg-gradient-to-b from-[#8a8580] to-[#6a6560] dark:from-[#5a5652] dark:to-[#3e3b38]",
    notch: "bg-[#5c5854] dark:bg-[#2d2b29]",
  },
  white: {
    border: "border-neutral-200 dark:border-neutral-700",
    base: "bg-gradient-to-b from-neutral-100 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800",
    notch: "bg-neutral-400 dark:bg-neutral-500",
  },
  purple: {
    border: "border-[#5a515f]",
    base: "bg-gradient-to-b from-[#5a515f] to-[#403948]",
    notch: "bg-[#332d3a]",
  },
  orange: {
    border: "border-[#c97f52]",
    base: "bg-gradient-to-b from-[#dc9268] to-[#c26f45]",
    notch: "bg-[#a85e39]",
  },
  cherry: {
    border: "border-[#c48a98]",
    base: "bg-gradient-to-b from-[#daa8b5] to-[#c48a98]",
    notch: "bg-[#b57987]",
  },
  midnight: {
    border: "border-[#26262c]",
    base: "bg-gradient-to-b from-[#34343c] to-[#1c1c22]",
    notch: "bg-[#131318]",
  },
  starlight: {
    border: "border-[#d8cdb8]",
    base: "bg-gradient-to-b from-[#f0e6d4] to-[#dcd0b8]",
    notch: "bg-[#c9bc9e]",
  },
  skyBlue: {
    border: "border-[#a9c4d8]",
    base: "bg-gradient-to-b from-[#c3dbe8] to-[#9fc0d4]",
    notch: "bg-[#87abc2]",
  },
  gold: {
    border: "border-[#c9a13b]",
    base: "bg-gradient-to-b from-[#e8c563] to-[#d4a93f]",
    notch: "bg-[#b8902e]",
  },
} as const;

export type LaptopFrameVariant = keyof typeof laptopFrameVariants;

export type LaptopMockupCardProps = Readonly<
  ComponentPropsWithoutRef<"div"> & {
    variant?: LaptopFrameVariant;
    children?: ReactNode;
    /**
     * If fluid=true, scales dynamically to fill container width with authentic lid/base proportions.
     */
    fluid?: boolean;
    /**
     * Aspect ratio for the screen viewport (e.g. "16/9", "16/10", "4/3", etc.).
     * The laptop display smoothly adjusts its height based on the active screenshot.
     */
    aspectRatio?: string;
    /**
     * Optional class applied to the inner display viewport.
     */
    screenClassName?: string;
  }
>;

export const LaptopMockupCard = forwardRef<
  HTMLDivElement,
  LaptopMockupCardProps
>(({ className, children, variant = "gray", fluid = false, aspectRatio, screenClassName, ...props }, ref) => {
  const frame = laptopFrameVariants[variant] ?? laptopFrameVariants.gray;

  if (fluid) {
    return (
      <div
        ref={ref}
        data-slot="laptop-mockup-card"
        data-variant={variant}
        className={cn("flex flex-col items-center font-sans w-full select-none", className)}
        {...props}
      >
        {/* Screen Lid (91% width of the laptop chassis base) */}
        <div
          className={cn(
            "w-[91%] overflow-hidden rounded-t-xl sm:rounded-t-2xl border-2 border-b-0 shadow-2xl transition-all duration-500 ease-out",
            frame.border,
          )}
        >
          {/* Black screen bezel */}
          <div className="bg-neutral-900 p-1.5 sm:p-2 md:p-2.5 pb-0">
            {/* Top camera housing */}
            <div className="flex justify-center pb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#080812] ring-1 ring-white/15" />
            </div>
            {/* Inner display viewport that dynamically adjusts to screenshot aspect ratio */}
            <div
              className={cn(
                "relative w-full overflow-hidden rounded-t-xs sm:rounded-t-sm bg-neutral-950",
                screenClassName,
              )}
              style={{
                aspectRatio: aspectRatio ?? "16/10",
              }}
            >
              <div className="relative size-full overflow-hidden rounded-t-xs sm:rounded-t-sm">
                {children}
              </div>
            </div>
          </div>
        </div>

        {/* Laptop Base with Opening Thumb Notch */}
        <div
          className={cn(
            "relative h-2.5 sm:h-3 md:h-3.5 w-full rounded-b-xl sm:rounded-b-2xl shadow-lg transition-all duration-300",
            frame.base,
          )}
        >
          <div
            className={cn(
              "absolute top-0 left-1/2 h-1 sm:h-1.5 w-14 sm:w-16 md:w-20 -translate-x-1/2 rounded-b-md transition-all duration-300",
              frame.notch,
            )}
            aria-hidden="true"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      data-slot="laptop-mockup-card"
      data-variant={variant}
      className={cn("flex flex-col items-center font-sans select-none", className)}
      {...props}
    >
      <div
        className={cn(
          "w-70 overflow-hidden rounded-t-xl border-2 border-b-0 shadow-xl md:w-[384px] transition-all duration-300",
          frame.border,
        )}
      >
        <div className="bg-neutral-800 p-1.5 pb-0">
          <div
            className={cn(
              "relative w-full overflow-hidden rounded-t-sm bg-neutral-900",
              aspectRatio ? "" : "h-46 md:h-63 transition-[height] duration-500 ease-out",
              screenClassName,
            )}
            style={aspectRatio ? { aspectRatio } : undefined}
          >
            <div className="relative size-full overflow-hidden rounded-t-sm">
              {children}
            </div>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "relative h-2.5 w-[315px] rounded-b-xl md:h-3 md:w-[432px] transition-all duration-300",
          frame.base,
        )}
      >
        <div
          className={cn(
            "absolute top-0 left-1/2 h-1 w-14 -translate-x-1/2 rounded-b-md md:w-16 transition-all duration-300",
            frame.notch,
          )}
          aria-hidden="true"
        />
      </div>
    </div>
  );
});

LaptopMockupCard.displayName = "LaptopMockupCard";
