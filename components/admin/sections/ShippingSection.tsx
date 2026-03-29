"use client";

import { useState } from "react";

const zones = [
  {
    id: 1,
    name: "UAE Local",
    regions: "Dubai, Abu Dhabi, Sharjah, Ajman, RAK, Fujairah, UAQ",
    rates: [
      { label: "Standard (2-3 days)", price: "AED 15", minWeight: "0g", maxWeight: "5kg" },
      { label: "Express (Next Day)", price: "AED 30", minWeight: "0g", maxWeight: "5kg" },
    ],
    freeThreshold: "AED 200",
    status: "Active",
  },
  {
    id: 2,
    name: "GCC Countries",
    regions: "Saudi Arabia, Kuwait, Bahrain, Qatar, Oman",
    rates: [
      { label: "Standard (4-6 days)", price: "AED 45", minWeight: "0g", maxWeight: "3kg" },
    ],
    freeThreshold: "AED 500",
    status: "Active",
  },
  {
    id: 3,
    name: "International",
    regions: "UK, US, EU, Rest of World",
    rates: [
      { label: "Standard (7-14 days)", price: "AED 85", minWeight: "0g", maxWeight: "2kg" },
      { label: "Express (3-5 days)", price: "AED 160", minWeight: "0g", maxWeight: "2kg" },
    ],
    freeThreshold: "AED 1,000",
    status: "Active",
  },
];

const trackingData = [
  { orderId: "#ORD-5821", courier: "Aramex", trackingNo: "AR-8842901", status: "Delivered", eta: "Mar 20, 2024", location: "Dubai, UAE" },
  { orderId: "#ORD-5820", courier: "DHL", trackingNo: "DHL-4452291", status: "In Transit", eta: "Mar 22, 2024", location: "Abu Dhabi Hub" },
  { orderId: "#ORD-5819", courier: "Fetchr", trackingNo: "FTR-9912883", status: "Out for Delivery", eta: "Mar 21, 2024", location: "Sharjah" },
  { orderId: "#ORD-5818", courier: "FedEx", trackingNo: "FDX-7239401", status: "Processing", eta: "Mar 25, 2024", location: "Origin" },
];

const trackingStyle: Record<string, { bg: string; color: string }> = {
  Delivered: { bg: "#ecfdf5", color: "#059669" },
  "In Transit": { bg: "#eff6ff", color: "#2563eb" },
  "Out for Delivery": { bg: "#f3e8ff", color: "#7c3aed" },
  Processing: { bg: "#fffbeb", color: "#d97706" },
};

export default function ShippingSection() {
  const [selectedZone, setSelectedZone] = useState<typeof zones[0] | null>(null);

  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "Avg. Delivery Time", value: "2.4 days", color: "#667eea" },
          { label: "On-Time Delivery", value: "94.2%", color: "#10b981" },
          { label: "Shipments Active", value: "34", color: "#f59e0b" },
          { label: "Failed Deliveries", value: "3", color: "#ef4444" },
        ].map((m) => (
          <div key={m.label} className="rounded-2xl p-5" style={{ background: "#fff", border: "1px solid #eaedf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <p className="text-xs font-semibold text-[#888] mb-2" style={{ fontFamily: "Satoshi, sans-serif" }}>{m.label}</p>
            <p className="text-2xl font-bold" style={{ color: m.color, fontFamily: "Satoshi, sans-serif", letterSpacing: "-0.03em" }}>{m.value}</p>
          </div>
        ))}
      </div>

      {/* Shipping Zones */}
      <div className="rounded-2xl" style={{ background: "#fff", border: "1px solid #eaedf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid #eaedf0" }}>
          <div>
            <h3 className="text-sm font-bold text-[#0f0f11]" style={{ fontFamily: "Satoshi, sans-serif" }}>Shipping Zones</h3>
            <p className="text-xs text-[#aaa]" style={{ fontFamily: "Satoshi, sans-serif" }}>Configure rates and free threshold per region</p>
          </div>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white"
            style={{ background: "#0f0f11", fontFamily: "Satoshi, sans-serif" }}
          >
            + Add Zone
          </button>
        </div>

        <div className="divide-y" style={{ borderColor: "#eaedf0" }}>
          {zones.map((zone) => (
            <div key={zone.id} className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-bold text-[#1a1a1a]" style={{ fontFamily: "Satoshi, sans-serif" }}>{zone.name}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "#ecfdf5", color: "#059669" }}>{zone.status}</span>
                  </div>
                  <p className="text-xs text-[#888]" style={{ fontFamily: "Satoshi, sans-serif" }}>{zone.regions}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedZone(selectedZone?.id === zone.id ? null : zone)}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold"
                    style={{ background: "#f4f6f8", color: "#555", fontFamily: "Satoshi, sans-serif" }}
                  >
                    {selectedZone?.id === zone.id ? "Collapse" : "Edit Rates"}
                  </button>
                </div>
              </div>

              {/* Rate Summary */}
              <div className="flex flex-wrap gap-2 mb-2">
                {zone.rates.map((r) => (
                  <div
                    key={r.label}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                    style={{ background: "#f4f6f8" }}
                  >
                    <span className="text-xs text-[#555]" style={{ fontFamily: "Satoshi, sans-serif" }}>{r.label}</span>
                    <span className="text-xs font-bold" style={{ color: "#667eea", fontFamily: "Satoshi, sans-serif" }}>{r.price}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: "#ecfdf5" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="#059669" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span className="text-xs font-semibold text-[#059669]" style={{ fontFamily: "Satoshi, sans-serif" }}>Free ≥ {zone.freeThreshold}</span>
                </div>
              </div>

              {/* Expanded Edit */}
              {selectedZone?.id === zone.id && (
                <div className="mt-4 p-4 rounded-xl" style={{ background: "#f9fafb", border: "1px solid #eaedf0" }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#555] mb-1" style={{ fontFamily: "Satoshi, sans-serif" }}>Zone Name</label>
                      <input defaultValue={zone.name} className="w-full px-3 py-2 rounded-xl text-sm outline-none" style={{ background: "#fff", border: "1.5px solid #eaedf0", color: "#1a1a1a", fontFamily: "Satoshi, sans-serif" }} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#555] mb-1" style={{ fontFamily: "Satoshi, sans-serif" }}>Free Shipping Threshold</label>
                      <input defaultValue={zone.freeThreshold.replace("AED ", "")} className="w-full px-3 py-2 rounded-xl text-sm outline-none" style={{ background: "#fff", border: "1.5px solid #eaedf0", color: "#1a1a1a", fontFamily: "Satoshi, sans-serif" }} />
                    </div>
                  </div>
                  <button className="px-4 py-2 rounded-xl text-xs font-bold text-white" style={{ background: "#0f0f11", fontFamily: "Satoshi, sans-serif" }}>Save Changes</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Real-Time Tracking */}
      <div className="rounded-2xl" style={{ background: "#fff", border: "1px solid #eaedf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid #eaedf0" }}>
          <div>
            <h3 className="text-sm font-bold text-[#0f0f11]" style={{ fontFamily: "Satoshi, sans-serif" }}>Live Shipment Tracking</h3>
            <p className="text-xs text-[#aaa]" style={{ fontFamily: "Satoshi, sans-serif" }}>Real-time status from fulfillment partners</p>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-[#888]" style={{ fontFamily: "Satoshi, sans-serif" }}>Live</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: "#f9fafb", borderBottom: "1px solid #eaedf0" }}>
                {["Order ID", "Courier", "Tracking No.", "Current Location", "ETA", "Status"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-[#888] uppercase tracking-wider whitespace-nowrap" style={{ fontFamily: "Satoshi, sans-serif" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "#f4f6f8" }}>
              {trackingData.map((t) => (
                <tr key={t.orderId} className="hover:bg-[#f9fafb] transition-colors">
                  <td className="px-5 py-3.5 text-xs font-bold" style={{ color: "#667eea", fontFamily: "Satoshi, sans-serif" }}>{t.orderId}</td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-[#1a1a1a]" style={{ fontFamily: "Satoshi, sans-serif" }}>{t.courier}</td>
                  <td className="px-5 py-3.5 text-xs font-mono text-[#888]">{t.trackingNo}</td>
                  <td className="px-5 py-3.5 text-xs text-[#555]" style={{ fontFamily: "Satoshi, sans-serif" }}>{t.location}</td>
                  <td className="px-5 py-3.5 text-xs text-[#888] whitespace-nowrap" style={{ fontFamily: "Satoshi, sans-serif" }}>{t.eta}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={trackingStyle[t.status]}>{t.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Webhook config */}
        <div className="px-6 py-4" style={{ borderTop: "1px solid #eaedf0" }}>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl flex-1 min-w-[200px]" style={{ background: "#f4f6f8", border: "1px solid #eaedf0" }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="#aaa" className="w-4 h-4 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
              </svg>
              <input placeholder="Webhook URL for tracking updates..." className="flex-1 outline-none bg-transparent text-xs" style={{ color: "#555", fontFamily: "Satoshi, sans-serif" }} />
            </div>
            <button className="px-4 py-2 rounded-xl text-xs font-bold text-white" style={{ background: "#0f0f11", fontFamily: "Satoshi, sans-serif" }}>Save Webhook</button>
          </div>
        </div>
      </div>
    </div>
  );
}
