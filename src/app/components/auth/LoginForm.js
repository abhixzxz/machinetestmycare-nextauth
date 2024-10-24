"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import {
  LockKeyhole,
  Mail,
  User,
  ArrowRight,
  ChevronRight,
  KeyRound,
} from "lucide-react";
import { loginValidation } from "@/app/validations/loginSchema";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function LoginForm() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { login, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const redirectPath = user.role === "admin" ? "/admin" : "/dashboard";
      router.replace(redirectPath);
    }
  }, [user, router]);

  const validateField = (name, value) => {
    const validation = loginValidation[name];
    if (validation.required && !value) return validation.required;
    if (validation.minLength && value.length < validation.minLength.value) {
      return validation.minLength.message;
    }
    return "";
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(loginValidation).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      toast.error("Please check all required fields");
      return;
    }

    try {
      const success = await login(formData.username, formData.password);
      if (success) {
        toast.success("Welcome back! Redirecting...");
      } else {
        toast.error("Invalid credentials");
        setErrors({ submit: "Invalid credentials" });
      }
    } catch (err) {
      toast.error(err.message || "An error occurred");
      setErrors({ submit: err.message || "An error occurred" });
    } finally {
      setIsLoading(false);
    }
  };

  if (user && typeof window !== "undefined") return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 via-white to-purple-50 px-4 py-8 sm:px-6 sm:py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 border border-gray-100">
          <ToastContainer position="top-right" theme="colored" />

          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-block p-2 sm:p-3 rounded-full bg-blue-500 mb-3 sm:mb-4">
              <LockKeyhole className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              <Input
                label="Username"
                name="username"
                icon={<Mail className="w-4 h-4 text-gray-500" />}
                value={formData.username}
                onChange={handleChange}
                error={errors.username}
                disabled={isLoading}
                required
                className="bg-gray-50 border-transparent focus:border-blue-500 text-sm sm:text-base py-2 sm:py-2.5"
              />

              <Input
                label="Password"
                name="password"
                type="password"
                icon={<KeyRound className="w-4 h-4 text-gray-500" />}
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                disabled={isLoading}
                required
                className="bg-gray-50 border-transparent focus:border-blue-500 text-sm sm:text-base py-2 sm:py-2.5"
              />
            </div>

            {errors.submit && (
              <div className="text-red-500 text-xs sm:text-sm text-center bg-red-50 p-2 sm:p-3 rounded-lg">
                {errors.submit}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white group text-sm sm:text-base py-2 sm:py-2.5"
              disabled={isLoading}
            >
              {isLoading ? (
                "Signing in..."
              ) : (
                <>
                  Sign in
                  <ChevronRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-4 sm:mt-6 text-center">
            <Link
              href="/register"
              className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center group text-sm sm:text-base"
            >
              Create new account
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
