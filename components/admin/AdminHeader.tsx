"use client";

import { AdminSection } from "@/app/admin/page";

const sectionTitles: Record<AdminSection, { title: string; subtitle: string }> = {
  dashboard:   { title: "Dashboard",           subtitle: "Welcome back — here's your store at a glance" },
  orders:      { title: "Order Management",    subtitle: "Track, manage and fulfill customer orders" },
  products:    { title: "Products & Inventory", subtitle: "Manage your product catalog, variants and bundles" },
  analytics:   { title: "Analytics",           subtitle: "Revenue insights, funnels and performance data" },
  cms:         { title: "Content Management",  subtitle: "Build and edit pages, blogs and media" },
  marketing:   { title: "Marketing & Promotions", subtitle: "Create discounts, coupons and campaigns" },
  shipping:    { title: "Shipping Zones",      subtitle: "Configure zones, rates and free-shipping thresholds" },
  fulfillment: { title: "Fulfillment Partners", subtitle: "Auto-push orders to Quiqup, Aramex, DHL and more" },
  meta:        { title: "Meta Commerce",       subtitle: "Instagram Shopping, Pixel events, catalog sync & compliance" },
  settings:    { title: "Settings",            subtitle: "Payment, taxes, email templates, integrations and permissions" },
};

interface Props {
  activeSection: AdminSection;
  onToggleSidebar: () => void;
}

export default function AdminHeader({ activeSection, onToggleSidebar }: Props) {
  const info = sectionTitles[activeSection];

  return (
    <header
      className="shrink-0 flex items-center justify-between px-6 py-4 gap-4"
      style={{ background: "#fff", borderBottom: "1px solid #eaedf0", minHeight: 64 }}
    >
      <div className="flex items-center gap-3 min-w-0">
        {/* Hamburger */}
        <button
          onClick={onToggleSidebar}
          className="p-1.5 rounded-lg transition-colors lg:hidden"
          style={{ color: "#888" }}
          aria-label="Toggle sidebar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>

        <div className="min-w-0">
          <h1
            className="text-base font-bold text-[#0f0f11] truncate"
            style={{ fontFamily: "Satoshi, sans-serif", letterSpacing: "-0.02em" }}
          >
            {info.title}
          </h1>
          <p className="text-xs text-[#888] truncate hidden sm:block" style={{ fontFamily: "Satoshi, sans-serif" }}>
            {info.subtitle}
          </p>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: "#f4f6f8", border: "1px solid #eaedf0" }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="#aaa" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            type="search"
            placeholder="Search..."
            className="outline-none bg-transparent text-sm text-[#333] w-36 placeholder:text-[#aaa]"
            style={{ fontFamily: "Satoshi, sans-serif" }}
          />
        </div>

        {/* Notifications */}
        <button
          className="relative p-2 rounded-lg transition-colors"
          style={{ color: "#555" }}
          aria-label="Notifications"
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#f4f6f8")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
          </svg>
          <span
            className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
            style={{ background: "#ef4444" }}
          />
        </button>

        {/* Date */}
        <div
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
          style={{ background: "#f4f6f8", color: "#666", fontFamily: "Satoshi, sans-serif" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 9v7.5" />
          </svg>
          {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </div>
      </div>
    </header>
  );
}
