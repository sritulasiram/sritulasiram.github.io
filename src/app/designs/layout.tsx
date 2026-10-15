import type { Metadata } from "next";

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
  return children;
}
