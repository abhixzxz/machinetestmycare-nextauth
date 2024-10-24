"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

export function LoginForm() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("[LoginForm] Current user state:", user);
    if (user) {
      const redirectPath = user.role === "admin" ? "/admin" : "/dashboard";
      console.log("[LoginForm] Redirecting to:", redirectPath);
      router.replace(redirectPath);
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      console.log("[LoginForm] Attempting login...");
      const success = await login(formData.username, formData.password);
      console.log("[LoginForm] Login success:", success);

      if (!success) {
        setError("Invalid credentials");
      }
    } catch (err) {
      console.error("[LoginForm] Login error:", err);
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Only return null if we're already redirecting
  if (user && typeof window !== "undefined") {
    console.log("[LoginForm] User exists, not rendering form");
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="text-3xl font-bold text-center">Login</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Username"
            type="text"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            required
            disabled={isLoading}
          />
          <Input
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
            disabled={isLoading}
          />
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </Button>
          <div className="text-center mt-4">
            <Link
              href="/register"
              className="text-blue-500 hover:text-blue-600"
            >
              Don&apos;t have an account? Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
