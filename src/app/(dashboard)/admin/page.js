"use client";

import { ProtectedRoute } from "@/app/components/auth/ProtectedRoute";
import { AdminDashboard } from "@/app/components/dashboard/AdminDashboard";


export default function AdminPage() {
  return (
    <ProtectedRoute adminOnly>
      <AdminDashboard />
    </ProtectedRoute>
  );
}
