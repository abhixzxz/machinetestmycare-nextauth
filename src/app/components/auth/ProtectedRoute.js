"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoadingSpinner } from "../ui/LoadingSpinner";

export function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("[ProtectedRoute] Current state:", {
      user,
      loading,
      adminOnly,
    });

    const handleAuth = async () => {
      if (!loading) {
        if (!user) {
          console.log("[ProtectedRoute] No user, redirecting to login");
          await router.replace("/login");
        } else if (adminOnly && user.role !== "admin") {
          console.log(
            "[ProtectedRoute] User is not admin, redirecting to dashboard"
          );
          await router.replace("/dashboard");
        }
      }
    };

    handleAuth();
  }, [user, loading, adminOnly, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user || (adminOnly && user.role !== "admin")) {
    return null;
  }

  return <>{children}</>;
}
