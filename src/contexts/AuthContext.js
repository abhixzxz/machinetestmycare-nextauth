"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { storage } from "@/lib/localStorage";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    console.log("[AuthProvider] Initializing...");
    storage.initializeStorage();
    try {
      const storedUser = storage.getCurrentUser();
      console.log("[AuthProvider] Stored user:", storedUser);
      if (storedUser) {
        setUser(storedUser);
      }
    } catch (error) {
      console.error("[AuthProvider] Error loading stored user:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === storage.CURRENT_USER_KEY) {
        const newUser = e.newValue ? JSON.parse(e.newValue) : null;
        setUser(newUser);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = async (username, password) => {
    console.log("[AuthProvider] Login attempt:", username);
    try {
      const authenticatedUser = storage.validateUser(username, password);
      console.log("[AuthProvider] Validation result:", authenticatedUser);
      if (authenticatedUser) {
        localStorage.setItem(
          storage.CURRENT_USER_KEY,
          JSON.stringify(authenticatedUser)
        );
        setUser(authenticatedUser);
        const redirectPath =
          authenticatedUser.role === "admin" ? "/admin" : "/dashboard";
        console.log("[AuthProvider] Redirecting to:", redirectPath);
        await router.push(redirectPath);
        return true;
      }
      console.log("[AuthProvider] Login failed: Invalid credentials");
      return false;
    } catch (error) {
      console.error("[AuthProvider] Login error:", error);
      throw error;
    }
  };

  const register = async (username, password, firstName, lastName) => {
    console.log("[AuthProvider] Registration attempt:", username);
    try {
      const newUser = storage.saveUser({
        username,
        password,
        firstName,
        lastName,
      });
      console.log("[AuthProvider] User saved successfully:", newUser);
      return true;
    } catch (error) {
      console.error("[AuthProvider] Registration error:", error);
      throw error;
    }
  };

  const logout = async () => {
    console.log("[AuthProvider] Logout initiated");
    storage.clearSession();
    setUser(null);
    console.log("[AuthProvider] Redirecting to login");
    await router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
