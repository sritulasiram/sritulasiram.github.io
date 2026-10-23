import type { CSSProperties } from "react";

/** Accent per product page: [light mode, dark mode]. Dark values are brighter for contrast. */
export const PROJECT_ACCENTS: Record<string, [string, string]> = {
  "cytron-hr-assistive-intelligence": ["#0D7678", "#40CBE0"],
  "warranty-rma": ["#0A6CB8", "#4DB5F0"],
  "raspberry-pi-diagnostics": ["#C51A4A", "#F0587F"],
  "iot-fertiliser-mixing": ["#1E7E34", "#30D158"],
  "opencore-efi-hackintosh": ["#5856D6", "#7D7AFF"],
  "rog-gaming-center": ["#C62828", "#FF6961"],
};

/** Accent for the About page: graphite in light mode, a lighter grey in dark mode. */
export const ABOUT_ACCENT: [string, string] = ["#48484A", "#AEAEB2"];

export function accentStyle([light, dark]: [string, string]): CSSProperties {
  return { "--pa-l": light, "--pa-d": dark } as CSSProperties;
}

export function projectThemeStyle(id: string): CSSProperties | undefined {
  const accent = PROJECT_ACCENTS[id];
  if (!accent) return undefined;
  return {
    "--pa-l": accent[0],
    "--pa-d": accent[1],
  } as CSSProperties;
}
