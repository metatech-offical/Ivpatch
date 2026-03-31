"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
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
  const [mounted, setMounted] = useState(false);
  const { user, isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    if (mounted && !isLoading && (!isLoggedIn || user?.role !== "admin")) {
      router.push("/login");
    }
  }, [mounted, isLoading, isLoggedIn, user, router]);

  if (!mounted || isLoading || !isLoggedIn || user?.role !== "admin") return null;

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
