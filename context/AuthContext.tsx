"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getSupabaseClient } from "@/lib/supabase/client";
import type { Profile } from "@/lib/supabase/types";

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "customer" | "admin";
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<User | null>;
  register: (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }) => Promise<User | null>;
  logout: () => Promise<void>;
  isLoggedIn: boolean;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function profileToUser(profile: Profile): User {
  return {
    id: profile.id,
    name: [profile.first_name, profile.last_name].filter(Boolean).join(" ") || profile.email,
    email: profile.email,
    phone: profile.phone || "",
    role: profile.role as "customer" | "admin",
  };
}

// Helper: wrap a promise with a timeout so it never hangs forever
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T | null> {
  return Promise.race([
    promise,
    new Promise<null>((resolve) => setTimeout(() => resolve(null), ms)),
  ]);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const supabase = getSupabaseClient();

  // Fetch profile from Supabase profiles table
  const fetchProfile = useCallback(async (userId: string): Promise<User | null> => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error || !data) return null;
      return profileToUser(data as Profile);
    } catch {
      return null;
    }
  }, [supabase]);

  // Check session on mount — with timeout protection
  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      try {
        const result = await withTimeout(supabase.auth.getSession(), 4000);

        if (!mounted) return;

        if (result && result.data?.session?.user) {
          const profile = await withTimeout(
            fetchProfile(result.data.session.user.id),
            3000
          );
          if (mounted) setUser(profile);
        }
      } catch (err) {
        console.error("Auth init error:", err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    initAuth();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      if (event === "SIGNED_IN" && session?.user) {
        const profile = await fetchProfile(session.user.id);
        if (mounted) setUser(profile);
      } else if (event === "SIGNED_OUT") {
        if (mounted) setUser(null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase, fetchProfile]);

  const login = async (email: string, password: string): Promise<User | null> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login error:", error.message);
      throw new Error(error.message);
    }

    if (data.user) {
      const profile = await fetchProfile(data.user.id);
      setUser(profile);
      return profile;
    }

    return null;
  };

  const register = async (registerData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }): Promise<User | null> => {
    const { data, error } = await supabase.auth.signUp({
      email: registerData.email,
      password: registerData.password,
      options: {
        data: {
          first_name: registerData.firstName,
          last_name: registerData.lastName,
          phone: registerData.phone,
        },
      },
    });

    if (error) {
      console.error("Register error:", error.message);
      throw new Error(error.message);
    }

    if (data.user) {
      // Wait a moment for the trigger to create the profile
      await new Promise((resolve) => setTimeout(resolve, 500));
      const profile = await fetchProfile(data.user.id);
      setUser(profile);
      return profile;
    }

    return null;
  };

  const logout = async () => {
    // Clear user state immediately for instant UI feedback
    setUser(null);

    try {
      // Sign out with timeout to prevent hanging
      await withTimeout(supabase.auth.signOut(), 3000);
    } catch (err) {
      console.error("Logout error:", err);
    }

    // Force clear auth storage as backup
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("iv-patch-auth");
        // Also clear any stale Supabase keys
        Object.keys(localStorage).forEach((key) => {
          if (key.startsWith("sb-")) {
            localStorage.removeItem(key);
          }
        });
      } catch {
        // Ignore storage errors
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, isLoggedIn: !!user, isLoading }}
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
