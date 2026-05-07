"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";

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
  loginWithPhone: (phone: string, uid: string) => void;
  loginWithSocial: (fbUser: FirebaseUser) => void;
  loginAdmin: (email: string, password: string) => boolean;
  registerUser: (data: {
    phone: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
  }) => void;
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
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      setFirebaseUser(fbUser);

      if (fbUser) {
        // Try to restore full user profile from localStorage
        if (typeof window !== "undefined") {
          try {
            const saved = localStorage.getItem("iv-patch-user");
            if (saved) {
              const parsed: User = JSON.parse(saved);
              // Only restore if it matches the current Firebase UID (not the admin profile)
              if (parsed.id === fbUser.uid || parsed.role === "admin") {
                setUser(parsed);
              } else {
                // Firebase user logged in but no matching profile → create a minimal one
                const minimalUser: User = {
                  id: fbUser.uid,
                  name: fbUser.displayName || "User",
                  email: fbUser.email || "",
                  phone: fbUser.phoneNumber || "",
                  role: "customer",
                };
                setUser(minimalUser);
                localStorage.setItem("iv-patch-user", JSON.stringify(minimalUser));
              }
            } else {
              // No saved profile — build one from Firebase data
              const minimalUser: User = {
                id: fbUser.uid,
                name: fbUser.displayName || "User",
                email: fbUser.email || "",
                phone: fbUser.phoneNumber || "",
                role: "customer",
              };
              setUser(minimalUser);
              localStorage.setItem("iv-patch-user", JSON.stringify(minimalUser));
            }
          } catch {
            // Ignore parse errors
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
  }, []);

  // Called after successful Firebase phone OTP verification
  const loginWithPhone = useCallback((phone: string, uid: string) => {
    const newUser: User = {
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
  const loginWithSocial = useCallback((fbUser: FirebaseUser) => {
    const newUser: User = {
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
      phone: string;
      firstName: string;
      lastName: string;
      email: string;
      gender: string;
    }) => {
      const uid = firebaseUser?.uid ?? `user_${Date.now()}`;
      const newUser: User = {
        id: uid,
        name: `${data.firstName} ${data.lastName}`.trim(),
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
