import type { Metadata } from "next";
import MaintenanceScreen from "@/components/layout/MaintenanceScreen";

export const metadata: Metadata = {
  title: "Back in a moment",
  description: "The site is being upgraded and will be back shortly.",
};

export default function Maintenance() {
  return <MaintenanceScreen variant="upgrade" />;
}
