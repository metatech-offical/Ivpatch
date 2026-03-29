"use client";

import { useState } from "react";

const discounts = [
  { code: "IVWELCOME10", type: "Percentage", value: "10%", minOrder: "AED 50", uses: "248/500", status: "Active", expiry: "Apr 30, 2024" },
  { code: "FLAT20AED", type: "Fixed", value: "AED 20", minOrder: "AED 100", uses: "87/200", status: "Active", expiry: "May 15, 2024" },
  { code: "BOGODEAL", type: "BOGO", value: "Buy 1 Get 1", minOrder: "—", uses: "56/100", status: "Active", expiry: "Mar 31, 2024" },
  { code: "SUMMER25", type: "Percentage", value: "25%", minOrder: "AED 80", uses: "312/300", status: "Expired", expiry: "Mar 1, 2024" },
  { code: "VIP50", type: "Fixed", value: "AED 50", minOrder: "AED 200", uses: "12/50", status: "Scheduled", expiry: "Jun 1, 2024" },
];

const statusStyle: Record<string, { bg: string; color: string }> = {
  Active: { bg: "#ecfdf5", color: "#059669" },
  Expired: { bg: "#f4f6f8", color: "#888" },
  Scheduled: { bg: "#fffbeb", color: "#d97706" },
};

export default function MarketingSection() {
  const [createModal, setCreateModal] = useState(false);
  const [newDiscount, setNewDiscount] = useState({
    code: "", type: "Percentage", value: "", minOrder: "", maxUses: "", startDate: "", endDate: "",
  });

  return (
    <div className="space-y-5">
      {/* Stats Row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "Active Coupons", value: "3", color: "#667eea" },
          { label: "Total Redemptions", value: "715", color: "#10b981" },
          { label: "Discount Revenue Loss", value: "AED 8,320", color: "#ef4444" },
          { label: "Avg. Discount %", value: "14.2%", color: "#f59e0b" },
        ].map((m) => (
          <div key={m.label} className="rounded-2xl p-5" style={{ background: "#fff", border: "1px solid #eaedf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <p className="text-xs font-semibold text-[#888] mb-2" style={{ fontFamily: "Satoshi, sans-serif" }}>{m.label}</p>
            <p className="text-2xl font-bold" style={{ color: m.color, fontFamily: "Satoshi, sans-serif", letterSpacing: "-0.03em" }}>{m.value}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="rounded-2xl p-5 flex flex-wrap items-center gap-3" style={{ background: "#fff", border: "1px solid #eaedf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl flex-1 min-w-[200px]" style={{ background: "#f4f6f8", border: "1px solid #eaedf0" }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="#aaa" className="w-4 h-4 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input placeholder="Search discount codes..." className="flex-1 outline-none bg-transparent text-sm" style={{ color: "#333", fontFamily: "Satoshi, sans-serif" }} />
        </div>
        <button
          onClick={() => setCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white ml-auto"
          style={{ background: "linear-gradient(135deg,#667eea,#764ba2)", fontFamily: "Satoshi, sans-serif" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Create Discount
        </button>
      </div>

      {/* Create Discount Modal */}
      {createModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-lg mx-4 rounded-2xl p-6" style={{ background: "#fff", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-[#0f0f11]" style={{ fontFamily: "Satoshi, sans-serif" }}>Create Discount Code</h3>
              <button onClick={() => setCreateModal(false)} className="p-1.5 rounded-lg" style={{ background: "#f4f6f8" }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="#888" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#555] mb-1" style={{ fontFamily: "Satoshi, sans-serif" }}>Discount Code</label>
                  <input
                    value={newDiscount.code}
                    onChange={(e) => setNewDiscount({ ...newDiscount, code: e.target.value.toUpperCase() })}
                    placeholder="e.g. SUMMER20"
                    className="w-full px-3 py-2 rounded-xl text-sm font-mono outline-none uppercase"
                    style={{ background: "#f7f7f7", border: "1.5px solid #ebebeb", color: "#1a1a1a" }}
                    onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                    onBlur={(e) => (e.target.style.borderColor = "#ebebeb")}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#555] mb-1" style={{ fontFamily: "Satoshi, sans-serif" }}>Type</label>
                  <select
                    value={newDiscount.type}
                    onChange={(e) => setNewDiscount({ ...newDiscount, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                    style={{ background: "#f7f7f7", border: "1.5px solid #ebebeb", color: "#1a1a1a", fontFamily: "Satoshi, sans-serif" }}
                  >
                    <option>Percentage</option>
                    <option>Fixed Amount</option>
                    <option>BOGO</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#555] mb-1" style={{ fontFamily: "Satoshi, sans-serif" }}>Discount Value</label>
                  <input
                    value={newDiscount.value}
                    onChange={(e) => setNewDiscount({ ...newDiscount, value: e.target.value })}
                    placeholder={newDiscount.type === "Percentage" ? "e.g. 20" : "e.g. 30"}
                    className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                    style={{ background: "#f7f7f7", border: "1.5px solid #ebebeb", color: "#1a1a1a", fontFamily: "Satoshi, sans-serif" }}
                    onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                    onBlur={(e) => (e.target.style.borderColor = "#ebebeb")}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#555] mb-1" style={{ fontFamily: "Satoshi, sans-serif" }}>Min. Order (AED)</label>
                  <input
                    value={newDiscount.minOrder}
                    onChange={(e) => setNewDiscount({ ...newDiscount, minOrder: e.target.value })}
                    placeholder="e.g. 100"
                    className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                    style={{ background: "#f7f7f7", border: "1.5px solid #ebebeb", color: "#1a1a1a", fontFamily: "Satoshi, sans-serif" }}
                    onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                    onBlur={(e) => (e.target.style.borderColor = "#ebebeb")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#555] mb-1" style={{ fontFamily: "Satoshi, sans-serif" }}>Max Uses</label>
                  <input
                    value={newDiscount.maxUses}
                    onChange={(e) => setNewDiscount({ ...newDiscount, maxUses: e.target.value })}
                    placeholder="e.g. 500"
                    className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                    style={{ background: "#f7f7f7", border: "1.5px solid #ebebeb", color: "#1a1a1a", fontFamily: "Satoshi, sans-serif" }}
                    onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                    onBlur={(e) => (e.target.style.borderColor = "#ebebeb")}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#555] mb-1" style={{ fontFamily: "Satoshi, sans-serif" }}>Expiry Date</label>
                  <input
                    type="date"
                    value={newDiscount.endDate}
                    onChange={(e) => setNewDiscount({ ...newDiscount, endDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                    style={{ background: "#f7f7f7", border: "1.5px solid #ebebeb", color: "#1a1a1a", fontFamily: "Satoshi, sans-serif" }}
                    onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                    onBlur={(e) => (e.target.style.borderColor = "#ebebeb")}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-5">
              <button onClick={() => setCreateModal(false)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold" style={{ background: "#f4f6f8", color: "#555", fontFamily: "Satoshi, sans-serif" }}>Cancel</button>
              <button className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: "linear-gradient(135deg,#667eea,#764ba2)", fontFamily: "Satoshi, sans-serif" }}>
                Create Discount
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Discounts Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "#fff", border: "1px solid #eaedf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: "#f9fafb", borderBottom: "1px solid #eaedf0" }}>
                {["Code", "Type", "Value", "Min Order", "Uses", "Expiry", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-[#888] uppercase tracking-wider whitespace-nowrap" style={{ fontFamily: "Satoshi, sans-serif" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "#f4f6f8" }}>
              {discounts.map((d) => (
                <tr key={d.code} className="hover:bg-[#f9fafb] transition-colors">
                  <td className="px-5 py-3.5">
                    <span className="text-xs font-bold font-mono px-2 py-1 rounded-lg" style={{ background: "#f0f0fe", color: "#667eea" }}>{d.code}</span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-[#888]" style={{ fontFamily: "Satoshi, sans-serif" }}>{d.type}</td>
                  <td className="px-5 py-3.5 text-sm font-bold text-[#1a1a1a]" style={{ fontFamily: "Satoshi, sans-serif" }}>{d.value}</td>
                  <td className="px-5 py-3.5 text-xs text-[#888]" style={{ fontFamily: "Satoshi, sans-serif" }}>{d.minOrder}</td>
                  <td className="px-5 py-3.5 text-xs text-[#555]" style={{ fontFamily: "Satoshi, sans-serif" }}>{d.uses}</td>
                  <td className="px-5 py-3.5 text-xs text-[#888] whitespace-nowrap" style={{ fontFamily: "Satoshi, sans-serif" }}>{d.expiry}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={statusStyle[d.status]}>{d.status}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <button className="px-2 py-1 rounded-lg text-xs font-semibold" style={{ background: "#f4f6f8", color: "#555", fontFamily: "Satoshi, sans-serif" }}>Edit</button>
                      <button className="px-2 py-1 rounded-lg text-xs font-semibold" style={{ background: "#fff1f1", color: "#dc2626", fontFamily: "Satoshi, sans-serif" }}>Del</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
