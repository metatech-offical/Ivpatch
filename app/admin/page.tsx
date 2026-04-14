"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import DashboardOverview from "@/components/admin/sections/DashboardOverview";
import OrdersSection from "@/components/admin/sections/OrdersSection";
import ProductsSection from "@/components/admin/sections/ProductsSection";
import AnalyticsSection from "@/components/admin/sections/AnalyticsSection";
import CMSSection from "@/components/admin/sections/CMSSection";
import MarketingSection from "@/components/admin/sections/MarketingSection";
import ShippingSection from "@/components/admin/sections/ShippingSection";
import SettingsSection from "@/components/admin/sections/SettingsSection";
import MetaCommerceSection from "@/components/admin/sections/MetaCommerceSection";
import FulfillmentSection from "@/components/admin/sections/FulfillmentSection";

export type AdminSection =
  | "dashboard"
  | "orders"
  | "products"
  | "analytics"
  | "cms"
  | "marketing"
  | "shipping"
  | "fulfillment"
  | "meta"
  | "settings";

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState<AdminSection>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, isLoggedIn, loginAdmin } = useAuth();

  // Admin login form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const isAdmin = isLoggedIn && user?.role === "admin";

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    setTimeout(() => {
      const success = loginAdmin(email, password);
      setLoginLoading(false);

      if (!success) {
        setLoginError("Invalid email or password. Please try again.");
      }
    }, 800);
  };

  // ─── Admin Login Screen ───
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0f0f11", fontFamily: "Satoshi, sans-serif" }}>
        <div className="w-full max-w-[440px] bg-[#1a1a1d] rounded-[20px] p-10 shadow-2xl border border-white/5">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <div className="w-[48px] h-[48px] rounded-[12px] bg-gradient-to-br from-[#445C4F] to-[#2d3e35] flex items-center justify-center mr-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <span className="text-white text-[24px] font-bold tracking-wider">IVPATCH</span>
          </div>

          <h1 className="text-white text-[26px] font-bold text-center mb-2">Admin Login</h1>
          <p className="text-white/40 text-[14px] text-center mb-8">Enter your credentials to access the dashboard</p>

          <form onSubmit={handleAdminLogin} className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-white/50 text-[13px] font-medium uppercase tracking-wider">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ivpatch.com"
                autoComplete="email"
                required
                disabled={loginLoading}
                className="w-full h-[52px] bg-white/5 border border-white/10 rounded-[12px] px-4 text-white text-[15px] outline-none placeholder:text-white/20 focus:border-[#445C4F] transition-all"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-white/50 text-[13px] font-medium uppercase tracking-wider">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  disabled={loginLoading}
                  className="w-full h-[52px] bg-white/5 border border-white/10 rounded-[12px] px-4 pr-12 text-white text-[15px] outline-none placeholder:text-white/20 focus:border-[#445C4F] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {showPassword ? (
                      <>
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </>
                    ) : (
                      <>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </>
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Error */}
            {loginError && (
              <p className="text-red-400 text-[13px] text-center">{loginError}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full h-[52px] bg-[#445C4F] hover:bg-[#3a5043] text-white rounded-[12px] text-[16px] font-bold mt-2 transition-all active:scale-[0.98] flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loginLoading ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in…
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="text-white/20 text-[12px] text-center mt-6">
            Authorized personnel only
          </p>
        </div>
      </div>
    );
  }

  // ─── Admin Dashboard ───
  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":   return <DashboardOverview />;
      case "orders":      return <OrdersSection />;
      case "products":    return <ProductsSection />;
      case "analytics":   return <AnalyticsSection />;
      case "cms":         return <CMSSection />;
      case "marketing":   return <MarketingSection />;
      case "shipping":    return <ShippingSection />;
      case "fulfillment": return <FulfillmentSection />;
      case "meta":        return <MetaCommerceSection />;
      case "settings":    return <SettingsSection />;
      default:            return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#0f0f11", fontFamily: "Satoshi, sans-serif" }}>
      <AdminSidebar
        active={activeSection}
        onNavigate={setActiveSection}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <AdminHeader
          activeSection={activeSection}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="flex-1 overflow-y-auto" style={{ background: "#f4f6f8" }}>
          <div className="p-6 md:p-8">
            {renderSection()}
          </div>
        </main>
      </div>
    </div>
  );
}
