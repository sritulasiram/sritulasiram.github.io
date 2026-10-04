import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Projects",
    template: "%s",
  },
  description:
    "Internal operations architecture, automated hardware diagnostics, and published IoT precision agriculture research by Sri Tulasi Ram.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
