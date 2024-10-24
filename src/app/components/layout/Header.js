"use client";

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold">MACHINE TEST</span>
            </Link>
          </div>
          {user && (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user.username}</span>
              <button
                onClick={logout}
                className="text-gray-600 hover:text-gray-900"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
