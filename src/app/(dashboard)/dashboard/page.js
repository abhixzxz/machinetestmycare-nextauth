"use client";

import { ProtectedRoute } from "@/app/components/auth/ProtectedRoute";
import { UserDashboard } from "@/app/components/dashboard/UserDashboard";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <UserDashboard />
    </ProtectedRoute>
  );
}
