import type { Metadata } from "next";
import MaintenanceScreen from "@/components/layout/MaintenanceScreen";

export const metadata: Metadata = {
  title: "Not Found",
  description: "The requested page could not be found.",
};

export default function NotFound() {
  return <MaintenanceScreen variant="invalid" />;
}
