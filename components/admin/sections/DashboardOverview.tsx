"use client";

const metrics = [
  {
    label: "Total Revenue",
    value: "AED 84,230",
    delta: "+18.2%",
    up: true,
    sub: "vs last month",
    color: "#667eea",
    bg: "#f0f0fe",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="#667eea" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    label: "Total Orders",
    value: "1,284",
    delta: "+9.1%",
    up: true,
    sub: "vs last month",
    color: "#10b981",
    bg: "#ecfdf5",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="#10b981" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z" />
      </svg>
    ),
  },
  {
    label: "Avg. Order Value",
    value: "AED 65.6",
    delta: "+4.3%",
    up: true,
    sub: "vs last month",
    color: "#f59e0b",
    bg: "#fffbeb",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="#f59e0b" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
      </svg>
    ),
  },
  {
    label: "Conversion Rate",
    value: "3.84%",
    delta: "-0.2%",
    up: false,
    sub: "vs last month",
    color: "#ef4444",
    bg: "#fff1f1",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="#ef4444" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
    ),
  },
];

const recentOrders = [
  { id: "#ORD-5821", customer: "Riya Sharma", product: "Vitamin B12 Patch", status: "Delivered", amount: "AED 89", time: "2h ago" },
  { id: "#ORD-5820", customer: "Ahmed Al-Mansoori", product: "Energy Boost Bundle", status: "Shipped", amount: "AED 142", time: "3h ago" },
  { id: "#ORD-5819", customer: "Fatima Zahra", product: "Sleep & Recovery Patch", status: "Processing", amount: "AED 65", time: "5h ago" },
  { id: "#ORD-5818", customer: "James Patel", product: "Immunity Shield Pack", status: "Paid", amount: "AED 220", time: "7h ago" },
  { id: "#ORD-5817", customer: "Sara Hassan", product: "Vitamin D3 Patch", status: "Cancelled", amount: "AED 49", time: "10h ago" },
];

const statusStyle: Record<string, { bg: string; color: string }> = {
  Delivered: { bg: "#ecfdf5", color: "#059669" },
  Shipped: { bg: "#eff6ff", color: "#2563eb" },
  Processing: { bg: "#fffbeb", color: "#d97706" },
  Paid: { bg: "#f3e8ff", color: "#7c3aed" },
  Cancelled: { bg: "#fff1f1", color: "#dc2626" },
};

// Jan–Mar = actual data (live months so far in 2026), Apr–Dec = projected
const revenueData = [12, 18, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const revenueProjected = [0, 0, 0, 28, 34, 40, 38, 45, 50, 55, 58, 65];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const topProducts = [
  { name: "Vitamin B12 Patch", sold: 342, revenue: "AED 16,758", stock: 84 },
  { name: "Energy Boost Bundle", sold: 218, revenue: "AED 30,952", stock: 42 },
  { name: "Sleep & Recovery Patch", sold: 197, revenue: "AED 12,805", stock: 120 },
  { name: "Immunity Shield Pack", sold: 156, revenue: "AED 34,320", stock: 18 },
];

const integrations = [
  { name: "Stripe", status: "Connected", ok: true },
  { name: "Meta Pixel", status: "Active", ok: true },
  { name: "Fulfillment Partner", status: "Connected", ok: true },
  { name: "Instagram Catalog", status: "Sync Error", ok: false },
];

export default function DashboardOverview() {
  const maxVal = Math.max(...revenueData, ...revenueProjected);

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-2xl p-5 flex flex-col gap-3"
            style={{ background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", border: "1px solid #eaedf0" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#888]" style={{ fontFamily: "Satoshi, sans-serif" }}>{m.label}</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: m.bg }}>
                {m.icon}
              </div>
            </div>
            <div className="text-2xl font-bold text-[#0f0f11]" style={{ fontFamily: "Satoshi, sans-serif", letterSpacing: "-0.03em" }}>
              {m.value}
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className="text-xs font-semibold px-1.5 py-0.5 rounded-full"
                style={{
                  background: m.up ? "#ecfdf5" : "#fff1f1",
                  color: m.up ? "#059669" : "#dc2626",
                }}
              >
                {m.delta}
              </span>
              <span className="text-xs text-[#aaa]" style={{ fontFamily: "Satoshi, sans-serif" }}>{m.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart + Quick Stats */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Revenue Bar Chart */}
        <div
          className="xl:col-span-2 rounded-2xl p-6"
          style={{ background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", border: "1px solid #eaedf0" }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-[#0f0f11]" style={{ fontFamily: "Satoshi, sans-serif" }}>Revenue Trend</h3>
              <p className="text-xs text-[#aaa] mt-0.5" style={{ fontFamily: "Satoshi, sans-serif" }}>Monthly revenue (AED thousands) · 2026</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-sm" style={{ background: "linear-gradient(135deg,#667eea,#764ba2)" }} />
                <span className="text-[10px] text-[#888]" style={{ fontFamily: "Satoshi, sans-serif" }}>Actual</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-sm" style={{ background: "#e8eaf6" }} />
                <span className="text-[10px] text-[#888]" style={{ fontFamily: "Satoshi, sans-serif" }}>Projected</span>
              </div>
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full ml-2"
                style={{ background: "#f0f0fe", color: "#667eea", fontFamily: "Satoshi, sans-serif" }}
              >
                2026
              </span>
            </div>
          </div>
          <div className="flex items-end gap-2 h-40">
            {months.map((month, i) => {
              const actual = revenueData[i];
              const projected = revenueProjected[i];
              const val = actual > 0 ? actual : projected;
              const isActual = actual > 0;
              const isEmpty = val === 0;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                  <div
                    className="w-full rounded-t-lg transition-all duration-300 group-hover:opacity-80 relative"
                    style={{
                      height: isEmpty ? "8px" : `${(val / maxVal) * 100}%`,
                      background: isActual
                        ? "linear-gradient(180deg, #667eea, #764ba2)"
                        : "#e8eaf6",
                      minHeight: 8,
                      opacity: isActual ? 1 : 0.55,
                    }}
                  >
                    <div
                      className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                      style={{ color: isActual ? "#667eea" : "#aaa" }}
                    >
                      {isEmpty ? "—" : `${val}k`}
                    </div>
                  </div>
                  <span
                    className="text-[9px]"
                    style={{ fontFamily: "Satoshi, sans-serif", color: isActual ? "#667eea" : "#ccc", fontWeight: isActual ? 700 : 400 }}
                  >
                    {month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Integration Status */}
        <div
          className="rounded-2xl p-6"
          style={{ background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", border: "1px solid #eaedf0" }}
        >
          <h3 className="text-sm font-bold text-[#0f0f11] mb-4" style={{ fontFamily: "Satoshi, sans-serif" }}>Integration Status</h3>
          <div className="space-y-3">
            {integrations.map((int) => (
              <div key={int.name} className="flex items-center justify-between py-2" style={{ borderBottom: "1px solid #f4f6f8" }}>
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: int.ok ? "#10b981" : "#ef4444", boxShadow: int.ok ? "0 0 6px #10b98166" : "0 0 6px #ef444466" }}
                  />
                  <span className="text-sm font-medium text-[#333]" style={{ fontFamily: "Satoshi, sans-serif" }}>{int.name}</span>
                </div>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    background: int.ok ? "#ecfdf5" : "#fff1f1",
                    color: int.ok ? "#059669" : "#dc2626",
                  }}
                >
                  {int.status}
                </span>
              </div>
            ))}
          </div>
          <button
            className="mt-4 w-full py-2 rounded-xl text-xs font-semibold transition-colors"
            style={{ background: "#f4f6f8", color: "#555", fontFamily: "Satoshi, sans-serif" }}
          >
            Manage Integrations
          </button>
        </div>
      </div>

      {/* Recent Orders + Top Products */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Recent Orders */}
        <div
          className="xl:col-span-2 rounded-2xl"
          style={{ background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", border: "1px solid #eaedf0" }}
        >
          <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid #eaedf0" }}>
            <h3 className="text-sm font-bold text-[#0f0f11]" style={{ fontFamily: "Satoshi, sans-serif" }}>Recent Orders</h3>
            <button className="text-xs font-semibold" style={{ color: "#667eea", fontFamily: "Satoshi, sans-serif" }}>View all →</button>
          </div>
          <div className="divide-y" style={{ borderColor: "#f4f6f8" }}>
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center gap-4 px-6 py-3 hover:bg-[#f9fafb] transition-colors">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-bold text-[#667eea]" style={{ fontFamily: "Satoshi, sans-serif" }}>{order.id}</span>
                    <span className="text-xs text-[#aaa]">{order.time}</span>
                  </div>
                  <div className="text-sm font-semibold text-[#1a1a1a] truncate" style={{ fontFamily: "Satoshi, sans-serif" }}>{order.customer}</div>
                  <div className="text-xs text-[#888] truncate" style={{ fontFamily: "Satoshi, sans-serif" }}>{order.product}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-bold text-[#1a1a1a] mb-1" style={{ fontFamily: "Satoshi, sans-serif" }}>{order.amount}</div>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={statusStyle[order.status]}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div
          className="rounded-2xl"
          style={{ background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", border: "1px solid #eaedf0" }}
        >
          <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid #eaedf0" }}>
            <h3 className="text-sm font-bold text-[#0f0f11]" style={{ fontFamily: "Satoshi, sans-serif" }}>Top Products</h3>
            <button className="text-xs font-semibold" style={{ color: "#667eea", fontFamily: "Satoshi, sans-serif" }}>See all →</button>
          </div>
          <div className="divide-y px-6" style={{ borderColor: "#f4f6f8" }}>
            {topProducts.map((p, i) => (
              <div key={p.name} className="py-3">
                <div className="flex items-start gap-2 mb-2">
                  <span
                    className="text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: i === 0 ? "#fef3c7" : "#f4f6f8", color: i === 0 ? "#d97706" : "#888" }}
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-[#1a1a1a] leading-tight" style={{ fontFamily: "Satoshi, sans-serif" }}>{p.name}</div>
                    <div className="text-[10px] text-[#aaa] mt-0.5" style={{ fontFamily: "Satoshi, sans-serif" }}>{p.sold} sold · {p.revenue}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full" style={{ background: "#f4f6f8" }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(p.sold / topProducts[0].sold) * 100}%`,
                        background: "linear-gradient(90deg, #667eea, #764ba2)",
                      }}
                    />
                  </div>
                  <span
                    className="text-[10px] font-medium shrink-0"
                    style={{ color: p.stock < 25 ? "#ef4444" : "#888", fontFamily: "Satoshi, sans-serif" }}
                  >
                    {p.stock} left
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
