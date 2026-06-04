"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";
import { supabase } from "@/lib/supabase/client";

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "customer" | "admin";
};

type AuthContextType = {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loginWithPhone: (phone: string, uid: string, existingProfile?: User) => void;
  loginWithSocial: (fbUser: FirebaseUser, existingProfile?: User) => void;
  loginAdmin: (email: string, password: string) => boolean;
  registerUser: (data: {
    id?: string;
    phone: string;
    firstName: string;
    lastName: string;
    email: string;
    gender?: string;
  }) => void;
  checkUserProfile: (uid: string) => Promise<User | null>;
  createUserProfile: (data: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
  }) => Promise<User | null>;
  updateUser: (updatedUser: User) => void;
  logout: () => Promise<void>;
  isLoggedIn: boolean;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Listen to Firebase auth state changes
  // Check if user profile exists in Supabase
  const checkUserProfile = useCallback(async (uid: string): Promise<User | null> => {
    try {
      const { data, error } = await (supabase as any)
        .from("profiles")
        .select("*")
        .eq("id", uid)
        .single();

      if (error || !data) return null;

      return {
        id: data.id,
        name: `${data.first_name || ""} ${data.last_name || ""}`.trim() || "User",
        email: data.email || "",
        phone: data.phone || "",
        role: data.role as "customer" | "admin",
      };
    } catch (e) {
      console.error("checkUserProfile error:", e);
      return null;
    }
  }, []);

  // Create a profile in Supabase
  const createUserProfile = useCallback(async (data: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
  }): Promise<User | null> => {
    try {
      const { data: profile, error } = await (supabase as any)
        .from("profiles")
        .insert({
          id: data.id,
          email: data.email || null,
          first_name: data.firstName || null,
          last_name: data.lastName || null,
          phone: data.phone || null,
          role: "customer",
          is_active: true,
        })
        .select()
        .single();

      if (error || !profile) {
        console.error("createUserProfile DB error:", error);
        return null;
      }

      return {
        id: profile.id,
        name: `${profile.first_name || ""} ${profile.last_name || ""}`.trim() || "User",
        email: profile.email || "",
        phone: profile.phone || "",
        role: profile.role as "customer" | "admin",
      };
    } catch (e) {
      console.error("createUserProfile error:", e);
      return null;
    }
  }, []);

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);

      if (fbUser) {
        // Try to restore full user profile from localStorage
        let restoredUser: User | null = null;
        if (typeof window !== "undefined") {
          try {
            const saved = localStorage.getItem("iv-patch-user");
            if (saved) {
              const parsed: User = JSON.parse(saved);
              // Only restore if it matches the current Firebase UID (not the admin profile)
              if (parsed.id === fbUser.uid || parsed.role === "admin") {
                restoredUser = parsed;
              }
            }
          } catch {}
        }

        if (restoredUser) {
          setUser(restoredUser);
        } else {
          // No saved profile or uid mismatch — fetch from Supabase
          const profile = await checkUserProfile(fbUser.uid);
          if (profile) {
            setUser(profile);
            if (typeof window !== "undefined") {
              localStorage.setItem("iv-patch-user", JSON.stringify(profile));
            }
          } else {
            // No profile exists in Supabase yet — build a minimal one from Firebase data
            const minimalUser: User = {
              id: fbUser.uid,
              name: fbUser.displayName || "User",
              email: fbUser.email || "",
              phone: fbUser.phoneNumber || "",
              role: "customer",
            };
            setUser(minimalUser);
            if (typeof window !== "undefined") {
              localStorage.setItem("iv-patch-user", JSON.stringify(minimalUser));
            }
          }
        }
      } else {
        // Firebase signed out — check if there's an admin session in localStorage
        if (typeof window !== "undefined") {
          try {
            const saved = localStorage.getItem("iv-patch-user");
            if (saved) {
              const parsed: User = JSON.parse(saved);
              if (parsed.role === "admin") {
                setUser(parsed); // Keep admin session alive (admin doesn't use Firebase)
              } else {
                setUser(null);
              }
            } else {
              setUser(null);
            }
          } catch {
            setUser(null);
          }
        }
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [checkUserProfile]);

  // Called after successful Firebase phone OTP verification
  const loginWithPhone = useCallback((phone: string, uid: string, existingProfile?: User) => {
    const newUser: User = existingProfile || {
      id: uid,
      name: "User",
      email: "",
      phone,
      role: "customer",
    };
    setUser(newUser);

    if (typeof window !== "undefined") {
      localStorage.setItem("iv-patch-user", JSON.stringify(newUser));
    }
  }, []);

  // Called after successful Google/Apple sign-in via Firebase popup
  const loginWithSocial = useCallback((fbUser: FirebaseUser, existingProfile?: User) => {
    const newUser: User = existingProfile || {
      id: fbUser.uid,
      name: fbUser.displayName || "User",
      email: fbUser.email || "",
      phone: fbUser.phoneNumber || "",
      role: "customer",
    };
    setUser(newUser);
    if (typeof window !== "undefined") {
      localStorage.setItem("iv-patch-user", JSON.stringify(newUser));
    }
  }, []);

  // Admin login with email/password (not Firebase — local only)
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

  // Called after OTP verification + registration details form
  const registerUser = useCallback(
    (data: {
      id?: string;
      phone: string;
      firstName: string;
      lastName: string;
      email: string;
      gender?: string;
    }) => {
      const uid = data.id || firebaseUser?.uid || `user_${Date.now()}`;
      const newUser: User = {
        id: uid,
        name: `${data.firstName} ${data.lastName}`.trim() || "User",
        email: data.email,
        phone: data.phone,
        role: "customer",
      };
      setUser(newUser);

      if (typeof window !== "undefined") {
        localStorage.setItem("iv-patch-user", JSON.stringify(newUser));
      }
    },
    [firebaseUser]
  );

  const updateUser = useCallback((updatedUser: User) => {
    setUser(updatedUser);
    if (typeof window !== "undefined") {
      localStorage.setItem("iv-patch-user", JSON.stringify(updatedUser));
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
    } catch {
      // Firebase signOut may fail if user was an admin (not signed in via Firebase)
    }
    setUser(null);
    setFirebaseUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("iv-patch-user");
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        loginWithPhone,
        loginWithSocial,
        loginAdmin,
        registerUser,
        checkUserProfile,
        createUserProfile,
        updateUser,
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
