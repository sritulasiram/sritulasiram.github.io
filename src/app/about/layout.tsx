import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: "/about" },
  description:
    "About Sri Tulasi Ram — Support Engineer at Cytron Technologies, building hardware diagnostic platforms, embedded telemetry, and intuitive interfaces.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
