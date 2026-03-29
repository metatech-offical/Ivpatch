"use client";

import { useState } from "react";

const orders = [
  { id: "#ORD-5821", customer: "Riya Sharma", email: "riya@gmail.com", product: "Vitamin B12 Patch ×2", status: "Delivered", payment: "Prepaid", amount: "AED 89", date: "Mar 21, 2024", country: "UAE" },
  { id: "#ORD-5820", customer: "Ahmed Al-Mansoori", email: "ahmed@gmail.com", product: "Energy Boost Bundle ×1", status: "Shipped", payment: "Prepaid", amount: "AED 142", date: "Mar 21, 2024", country: "UAE" },
  { id: "#ORD-5819", customer: "Fatima Zahra", email: "fatima@gmail.com", product: "Sleep & Recovery Patch ×1", status: "Processing", payment: "COD", amount: "AED 65", date: "Mar 20, 2024", country: "GCC" },
  { id: "#ORD-5818", customer: "James Patel", email: "james@gmail.com", product: "Immunity Shield Pack ×3", status: "Paid", payment: "Prepaid", amount: "AED 220", date: "Mar 20, 2024", country: "International" },
  { id: "#ORD-5817", customer: "Sara Hassan", email: "sara@gmail.com", product: "Vitamin D3 Patch ×1", status: "Cancelled", payment: "COD", amount: "AED 49", date: "Mar 19, 2024", country: "UAE" },
  { id: "#ORD-5816", customer: "Kiran Mehta", email: "kiran@gmail.com", product: "Vitamin B12 Patch ×1", status: "Shipped", payment: "Prepaid", amount: "AED 44", date: "Mar 19, 2024", country: "UAE" },
  { id: "#ORD-5815", customer: "Omar Al-Rashid", email: "omar@gmail.com", product: "Energy Bundle ×2", status: "Processing", payment: "Prepaid", amount: "AED 284", date: "Mar 18, 2024", country: "GCC" },
  { id: "#ORD-5814", customer: "Priya Nair", email: "priya@gmail.com", product: "Sleep Patch ×1", status: "Delivered", payment: "COD", amount: "AED 65", date: "Mar 18, 2024", country: "UAE" },
];

const statusOpts = ["All", "Paid", "Processing", "Shipped", "Delivered", "Cancelled"];
const paymentOpts = ["All Payment", "Prepaid", "COD"];

const statusStyle: Record<string, { bg: string; color: string }> = {
  Delivered: { bg: "#ecfdf5", color: "#059669" },
  Shipped: { bg: "#eff6ff", color: "#2563eb" },
  Processing: { bg: "#fffbeb", color: "#d97706" },
  Paid: { bg: "#f3e8ff", color: "#7c3aed" },
  Cancelled: { bg: "#fff1f1", color: "#dc2626" },
};

const statusFlow = ["Paid", "Processing", "Shipped", "Delivered"];

export default function OrdersSection() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All Payment");
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = orders.filter((o) => {
    const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.includes(search);
    const matchStatus = statusFilter === "All" || o.status === statusFilter;
    const matchPayment = paymentFilter === "All Payment" || o.payment === paymentFilter;
    return matchSearch && matchStatus && matchPayment;
  });

  const toggleSelect = (id: string) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const toggleAll = () => {
    if (selected.length === filtered.length) setSelected([]);
    else setSelected(filtered.map((o) => o.id));
  };

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div
        className="rounded-2xl p-5"
        style={{ background: "#fff", border: "1px solid #eaedf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
      >
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl flex-1 min-w-[200px]" style={{ background: "#f4f6f8", border: "1px solid #eaedf0" }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="#aaa" className="w-4 h-4 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search orders or customers..."
              className="flex-1 outline-none bg-transparent text-sm"
              style={{ color: "#333", fontFamily: "Satoshi, sans-serif" }}
            />
          </div>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl text-sm outline-none"
            style={{ background: "#f4f6f8", border: "1px solid #eaedf0", color: "#555", fontFamily: "Satoshi, sans-serif" }}
          >
            {statusOpts.map((s) => <option key={s}>{s}</option>)}
          </select>

          {/* Payment filter */}
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="px-3 py-2 rounded-xl text-sm outline-none"
            style={{ background: "#f4f6f8", border: "1px solid #eaedf0", color: "#555", fontFamily: "Satoshi, sans-serif" }}
          >
            {paymentOpts.map((p) => <option key={p}>{p}</option>)}
          </select>

          {/* Bulk actions */}
          {selected.length > 0 && (
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-xs text-[#888]" style={{ fontFamily: "Satoshi, sans-serif" }}>{selected.length} selected</span>
              <button
                className="px-3 py-2 rounded-xl text-xs font-semibold"
                style={{ background: "#fff1f1", color: "#dc2626", border: "1px solid #fecaca", fontFamily: "Satoshi, sans-serif" }}
              >
                Cancel Orders
              </button>
              <button
                className="px-3 py-2 rounded-xl text-xs font-semibold"
                style={{ background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe", fontFamily: "Satoshi, sans-serif" }}
              >
                Mark Shipped
              </button>
            </div>
          )}

          {/* Export */}
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold ml-auto transition-colors"
            style={{ background: "#0f0f11", color: "#fff", fontFamily: "Satoshi, sans-serif" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Export CSV
          </button>
        </div>
      </div>

      {/* Order Detail Panel */}
      {selectedOrder && (
        <div
          className="rounded-2xl p-6"
          style={{ background: "#fff", border: "1px solid #eaedf0", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
        >
          <div className="flex items-start justify-between mb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg font-bold text-[#0f0f11]" style={{ fontFamily: "Satoshi, sans-serif", letterSpacing: "-0.02em" }}>{selectedOrder.id}</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={statusStyle[selectedOrder.status]}>{selectedOrder.status}</span>
              </div>
              <p className="text-sm text-[#888]" style={{ fontFamily: "Satoshi, sans-serif" }}>{selectedOrder.date}</p>
            </div>
            <button onClick={() => setSelectedOrder(null)} className="p-2 rounded-lg" style={{ background: "#f4f6f8" }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="#888" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            <div className="p-4 rounded-xl" style={{ background: "#f9fafb" }}>
              <p className="text-xs font-semibold text-[#888] mb-2" style={{ fontFamily: "Satoshi, sans-serif" }}>CUSTOMER</p>
              <p className="text-sm font-bold text-[#1a1a1a]" style={{ fontFamily: "Satoshi, sans-serif" }}>{selectedOrder.customer}</p>
              <p className="text-xs text-[#888]" style={{ fontFamily: "Satoshi, sans-serif" }}>{selectedOrder.email}</p>
            </div>
            <div className="p-4 rounded-xl" style={{ background: "#f9fafb" }}>
              <p className="text-xs font-semibold text-[#888] mb-2" style={{ fontFamily: "Satoshi, sans-serif" }}>PRODUCT</p>
              <p className="text-sm font-bold text-[#1a1a1a]" style={{ fontFamily: "Satoshi, sans-serif" }}>{selectedOrder.product}</p>
              <p className="text-xs text-[#888]" style={{ fontFamily: "Satoshi, sans-serif" }}>{selectedOrder.amount} · {selectedOrder.payment}</p>
            </div>
            <div className="p-4 rounded-xl" style={{ background: "#f9fafb" }}>
              <p className="text-xs font-semibold text-[#888] mb-2" style={{ fontFamily: "Satoshi, sans-serif" }}>SHIPPING</p>
              <p className="text-sm font-bold text-[#1a1a1a]" style={{ fontFamily: "Satoshi, sans-serif" }}>{selectedOrder.country}</p>
              <p className="text-xs text-[#888]" style={{ fontFamily: "Satoshi, sans-serif" }}>Standard Delivery</p>
            </div>
          </div>

          {/* Status workflow */}
          {selectedOrder.status !== "Cancelled" && (
            <div>
              <p className="text-xs font-semibold text-[#888] mb-3" style={{ fontFamily: "Satoshi, sans-serif" }}>UPDATE STATUS</p>
              <div className="flex flex-wrap gap-2">
                {statusFlow.map((s) => (
                  <button
                    key={s}
                    className="px-4 py-2 rounded-xl text-xs font-semibold transition-all"
                    style={{
                      background: selectedOrder.status === s ? "#0f0f11" : "#f4f6f8",
                      color: selectedOrder.status === s ? "#fff" : "#555",
                      border: `1px solid ${selectedOrder.status === s ? "#0f0f11" : "#eaedf0"}`,
                      fontFamily: "Satoshi, sans-serif",
                    }}
                  >
                    {s}
                  </button>
                ))}
                <button
                  className="px-4 py-2 rounded-xl text-xs font-semibold"
                  style={{ background: "#fff1f1", color: "#dc2626", border: "1px solid #fecaca", fontFamily: "Satoshi, sans-serif" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Orders Table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: "#fff", border: "1px solid #eaedf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: "#f9fafb", borderBottom: "1px solid #eaedf0" }}>
                <th className="px-5 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selected.length === filtered.length && filtered.length > 0}
                    onChange={toggleAll}
                    className="rounded"
                  />
                </th>
                {["Order ID", "Customer", "Product", "Date", "Payment", "Amount", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-bold text-[#888] uppercase tracking-wider whitespace-nowrap" style={{ fontFamily: "Satoshi, sans-serif" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "#f4f6f8" }}>
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-[#f9fafb] transition-colors">
                  <td className="px-5 py-3.5">
                    <input
                      type="checkbox"
                      checked={selected.includes(order.id)}
                      onChange={() => toggleSelect(order.id)}
                      className="rounded"
                    />
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs font-bold" style={{ color: "#667eea", fontFamily: "Satoshi, sans-serif" }}>{order.id}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="text-sm font-semibold text-[#1a1a1a]" style={{ fontFamily: "Satoshi, sans-serif" }}>{order.customer}</div>
                    <div className="text-xs text-[#aaa]" style={{ fontFamily: "Satoshi, sans-serif" }}>{order.email}</div>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-[#888] max-w-[140px] truncate" style={{ fontFamily: "Satoshi, sans-serif" }}>{order.product}</td>
                  <td className="px-4 py-3.5 text-xs text-[#888] whitespace-nowrap" style={{ fontFamily: "Satoshi, sans-serif" }}>{order.date}</td>
                  <td className="px-4 py-3.5">
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: order.payment === "COD" ? "#fff7ed" : "#eff6ff", color: order.payment === "COD" ? "#c2410c" : "#1d4ed8" }}
                    >
                      {order.payment}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-sm font-bold text-[#1a1a1a] whitespace-nowrap" style={{ fontFamily: "Satoshi, sans-serif" }}>{order.amount}</td>
                  <td className="px-4 py-3.5">
                    <span className="text-[10px] font-bold px-2 py-1 rounded-full" style={statusStyle[order.status]}>{order.status}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                      style={{ background: "#f4f6f8", color: "#555", fontFamily: "Satoshi, sans-serif" }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-4" style={{ borderTop: "1px solid #eaedf0" }}>
          <span className="text-xs text-[#888]" style={{ fontFamily: "Satoshi, sans-serif" }}>
            Showing {filtered.length} of {orders.length} orders
          </span>
          <div className="flex items-center gap-1">
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                className="w-8 h-8 rounded-lg text-xs font-semibold transition-colors"
                style={{
                  background: p === 1 ? "#0f0f11" : "#f4f6f8",
                  color: p === 1 ? "#fff" : "#555",
                  fontFamily: "Satoshi, sans-serif",
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
