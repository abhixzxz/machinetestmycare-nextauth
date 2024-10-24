"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerValidation } from "@/app/validations/registerSchema";
import {
  LockKeyhole,
  Mail,
  User,
  ArrowRight,
  ChevronRight,
  KeyRound,
} from "lucide-react";

export function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const validateField = (name, value, allValues = formData) => {
    const validation = registerValidation[name];
    if (!validation) return "";

    if (validation.required && !value) return validation.required;
    if (validation.minLength && value.length < validation.minLength.value) {
      return validation.minLength.message;
    }
    if (validation.pattern && !validation.pattern.value.test(value)) {
      return validation.pattern.message;
    }
    if (validation.validate) {
      const customError = validation.validate(value, allValues);
      if (customError !== true) return customError;
    }
    return "";
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(registerValidation).forEach((field) => {
      const error = validateField(field, formData[field], formData);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
      const success = await register(
        formData.username,
        formData.password,
        formData.firstName,
        formData.lastName
      );
      if (success) {
        toast.success("Account created successfully!");
        setTimeout(() => router.push("/login"), 2000);
      }
    } catch (error) {
      toast.error(error.message || "Registration failed");
      setErrors({ submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-4 py-8 sm:px-6 sm:py-12">
      <div className="w-full max-w-xl">
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 border border-gray-100">
          <ToastContainer position="top-right" theme="colored" />

          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-block p-2 sm:p-3 rounded-full bg-emerald-500 mb-3 sm:mb-4">
              <User className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Create Account
            </h2>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Join us and start your journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <Input
                label="First Name"
                name="firstName"
                icon={<User className="w-4 h-4 text-gray-500" />}
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName}
                disabled={isLoading}
                required
                className="bg-gray-50 border-transparent focus:border-emerald-500 text-sm sm:text-base py-2 sm:py-2.5"
              />

              <Input
                label="Last Name"
                name="lastName"
                icon={<User className="w-4 h-4 text-gray-500" />}
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
                disabled={isLoading}
                required
                className="bg-gray-50 border-transparent focus:border-emerald-500 text-sm sm:text-base py-2 sm:py-2.5"
              />
            </div>

            <Input
              label="Username"
              name="username"
              icon={<Mail className="w-4 h-4 text-gray-500" />}
              value={formData.username}
              onChange={handleChange}
              error={errors.username}
              disabled={isLoading}
              required
              className="bg-gray-50 border-transparent focus:border-emerald-500 text-sm sm:text-base py-2 sm:py-2.5"
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
              className="bg-gray-50 border-transparent focus:border-emerald-500 text-sm sm:text-base py-2 sm:py-2.5"
            />

            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              icon={<KeyRound className="w-4 h-4 text-gray-500" />}
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              disabled={isLoading}
              required
              className="bg-gray-50 border-transparent focus:border-emerald-500 text-sm sm:text-base py-2 sm:py-2.5"
            />

            {errors.submit && (
              <div className="text-red-500 text-xs sm:text-sm text-center bg-red-50 p-2 sm:p-3 rounded-lg">
                {errors.submit}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white group text-sm sm:text-base py-2 sm:py-2.5"
              disabled={isLoading}
            >
              {isLoading ? (
                "Creating Account..."
              ) : (
                <>
                  Create Account
                  <ChevronRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-4 sm:mt-6 text-center">
            <Link
              href="/login"
              className="text-emerald-600 hover:text-emerald-700 font-medium inline-flex items-center group text-sm sm:text-base"
            >
              Already have an account? Sign in
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
