"use client";

import { useEffect } from "react";
import MaintenanceScreen from "@/components/layout/MaintenanceScreen";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime route error caught:", error);
  }, [error]);

  return <MaintenanceScreen variant="error" onRetry={reset} />;
}
