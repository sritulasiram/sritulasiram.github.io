import type { Metadata } from "next";
import { Open_Sans, Roboto_Flex } from "next/font/google";

// Only the Designs page specimens use these, so they are scoped to this route and
// not preloaded: each file downloads the first time its family is selected.
const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-roboto-flex",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Designs",
    template: "%s",
  },
  alternates: { canonical: "/designs" },
  description:
    "UI/UX prototypes, mobile companion applications, and ergonomic design systems created in Figma and Adobe XD by Sri Tulasi Ram.",
};

export default function DesignsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={`${robotoFlex.variable} ${openSans.variable}`}>{children}</div>;
}
