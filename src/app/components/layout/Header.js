"use client";

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { Menu, X, Home, UserCircle, LogOut, Bell, Search } from "lucide-react";
import { useState } from "react";

export function Header() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="bg-white border-b">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-3 hover:opacity-90 transition-opacity"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden md:block">
                MACHINE TEST
              </span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              href="/"
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Home size={18} />
              <span>Dashboard</span>
            </Link>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-64 px-4 py-2 rounded-full bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              />
              <Search
                className="absolute right-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>
          </div>
          {user && (
            <div className="hidden md:flex items-center space-x-6">
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="flex items-center space-x-3 px-4 py-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors">
                <UserCircle size={20} className="text-gray-600" />
                <span className="text-gray-700 font-medium">
                  {user.username}
                </span>
              </div>

              <button
                onClick={logout}
                className="flex items-center space-x-2 px-4 py-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          )}

          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              >
                <Home size={18} />
                <span>Dashboard</span>
              </Link>

              <div className="px-4">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-4 py-2 rounded-full bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {user && (
                <>
                  <div className="flex items-center space-x-2 px-4 py-2">
                    <UserCircle size={18} className="text-gray-600" />
                    <span className="text-gray-700">{user.username}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
