"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type User = {
  name: string;
  email: string;
  phone: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (data: { firstName: string; lastName: string; email: string; phone: string }) => void;
  logout: () => void;
  isLoggedIn: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DUMMY_USER: User = {
  name: "Serene Williams",
  email: "serenew2021@gmail.com",
  phone: "+971 4 XXX XXXX"
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Check storage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, password: string) => {
    if (email === "serenew2021@gmail.com" && password === "password123") {
      setUser(DUMMY_USER);
      localStorage.setItem("user", JSON.stringify(DUMMY_USER));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const register = (data: { firstName: string; lastName: string; email: string; phone: string }) => {
    const newUser: User = {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone
    };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoggedIn: !!user }}>
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
