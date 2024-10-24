"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

export function RegisterForm() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const success = await register(formData.username, formData.password);
      if (success) {
        router.push("/login");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="text-3xl font-bold text-center">Register</h2>
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
          />
          <Input
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <Button type="submit">Register</Button>
          <div className="text-center mt-4">
            <Link href="/login" className="text-blue-500 hover:text-blue-600">
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
