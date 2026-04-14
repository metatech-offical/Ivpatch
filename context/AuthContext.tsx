"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "customer" | "admin";
};

type AuthContextType = {
  user: User | null;
  loginWithPhone: (phone: string) => void;
  loginAdmin: (email: string, password: string) => boolean;
  registerUser: (data: {
    phone: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
  }) => void;
  logout: () => void;
  isLoggedIn: boolean;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading] = useState(false);

  // Login for regular users (after OTP verification)
  const loginWithPhone = useCallback((phone: string) => {
    const mockUser: User = {
      id: `user_${Date.now()}`,
      name: "User",
      email: "",
      phone,
      role: "customer",
    };
    setUser(mockUser);

    if (typeof window !== "undefined") {
      localStorage.setItem("iv-patch-user", JSON.stringify(mockUser));
    }
  }, []);

  // Admin login with email/password
  const loginAdmin = useCallback((email: string, password: string): boolean => {
    if (email === "admin@ivpatch.com" && password === "admin@123") {
      const adminUser: User = {
        id: "admin_001",
        name: "Admin",
        email: "admin@ivpatch.com",
        phone: "",
        role: "admin",
      };
      setUser(adminUser);

      if (typeof window !== "undefined") {
        localStorage.setItem("iv-patch-user", JSON.stringify(adminUser));
      }
      return true;
    }
    return false;
  }, []);

  // Register a new user (after OTP + details form)
  const registerUser = useCallback((data: {
    phone: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
  }) => {
    const newUser: User = {
      id: `user_${Date.now()}`,
      name: `${data.firstName} ${data.lastName}`.trim(),
      email: data.email,
      phone: data.phone,
      role: "customer",
    };
    setUser(newUser);

    if (typeof window !== "undefined") {
      localStorage.setItem("iv-patch-user", JSON.stringify(newUser));
    }

    // TODO: Save to Supabase profiles table when Clerk is integrated
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("iv-patch-user");
    }
  }, []);

  // Restore session from localStorage on mount
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("iv-patch-user");
        if (saved) {
          setUser(JSON.parse(saved));
        }
      } catch {
        // Ignore parse errors
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithPhone,
        loginAdmin,
        registerUser,
        logout,
        isLoggedIn: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
