"use client";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const revenueData = [18, 25, 22, 38, 30, 42, 35, 48, 44, 55, 52, 60];
const orderData = [82, 105, 98, 145, 130, 178, 155, 189, 172, 210, 198, 234];

const topSources = [
  { label: "Instagram", pct: 38, color: "#c026d3" },
  { label: "Google Organic", pct: 27, color: "#2563eb" },
  { label: "Direct", pct: 18, color: "#059669" },
  { label: "WhatsApp", pct: 12, color: "#16a34a" },
  { label: "Other", pct: 5, color: "#aaa" },
];

const geoData = [
  { region: "UAE – Dubai", orders: 542, pct: 42 },
  { region: "UAE – Abu Dhabi", orders: 214, pct: 17 },
  { region: "Saudi Arabia", orders: 198, pct: 15 },
  { region: "UK", orders: 134, pct: 10 },
  { region: "Other GCC", orders: 118, pct: 9 },
  { region: "International", orders: 78, pct: 6 },
];

const funnelSteps = [
  { label: "Site Visits", value: "28,450", pct: 100 },
  { label: "Product Views", value: "14,820", pct: 52 },
  { label: "Add to Cart", value: "5,340", pct: 19 },
  { label: "Checkout Started", value: "2,810", pct: 10 },
  { label: "Orders Placed", value: "1,284", pct: 4.5 },
];

const customerSegment = [
  { label: "New Customers", value: 764, color: "#667eea" },
  { label: "Returning", value: 520, color: "#10b981" },
];

export default function AnalyticsSection() {
  const maxRevenue = Math.max(...revenueData);
  const maxOrders = Math.max(...orderData);

  return (
    <div className="space-y-5">
      {/* Headline KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "Sessions", value: "28,450", delta: "+22%", color: "#667eea" },
          { label: "New Customers", value: "764", delta: "+11%", color: "#10b981" },
          { label: "Cart Abandonment", value: "47.2%", delta: "-3.1%", up: false, color: "#ef4444" },
          { label: "Fulfillment Rate", value: "96.4%", delta: "+1.2%", color: "#f59e0b" },
        ].map((k) => (
          <div
            key={k.label}
            className="rounded-2xl p-5"
            style={{ background: "#fff", border: "1px solid #eaedf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
          >
            <p className="text-xs font-semibold text-[#888] mb-2" style={{ fontFamily: "Satoshi, sans-serif" }}>{k.label}</p>
            <p className="text-2xl font-bold text-[#0f0f11] mb-1" style={{ fontFamily: "Satoshi, sans-serif", letterSpacing: "-0.03em" }}>{k.value}</p>
            <span
              className="text-xs font-semibold px-1.5 py-0.5 rounded-full"
              style={{ background: (k.up === false) ? "#fff1f1" : "#ecfdf5", color: (k.up === false) ? "#dc2626" : "#059669" }}
            >
              {k.delta}
            </span>
          </div>
        ))}
      </div>

      {/* Revenue + Orders Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Revenue Chart */}
        <div className="rounded-2xl p-6" style={{ background: "#fff", border: "1px solid #eaedf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <h3 className="text-sm font-bold text-[#0f0f11] mb-1" style={{ fontFamily: "Satoshi, sans-serif" }}>Monthly Revenue (AED K)</h3>
          <p className="text-xs text-[#aaa] mb-5" style={{ fontFamily: "Satoshi, sans-serif" }}>Last 12 months</p>
          <div className="flex items-end gap-1.5 h-36">
            {revenueData.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                <div
                  className="w-full rounded-t-md transition-all group-hover:opacity-80"
                  style={{
                    height: `${(v / maxRevenue) * 100}%`,
                    background: i >= 9 ? "linear-gradient(180deg,#667eea,#764ba2)" : "#e8eaf6",
                    minHeight: 4,
                  }}
                />
                <span className="text-[8px] text-[#ccc]" style={{ fontFamily: "Satoshi, sans-serif" }}>{months[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Order Volume Chart */}
        <div className="rounded-2xl p-6" style={{ background: "#fff", border: "1px solid #eaedf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <h3 className="text-sm font-bold text-[#0f0f11] mb-1" style={{ fontFamily: "Satoshi, sans-serif" }}>Order Volume</h3>
          <p className="text-xs text-[#aaa] mb-5" style={{ fontFamily: "Satoshi, sans-serif" }}>Orders per month</p>
          <div className="flex items-end gap-1.5 h-36">
            {orderData.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                <div
                  className="w-full rounded-t-md transition-all group-hover:opacity-80"
                  style={{
                    height: `${(v / maxOrders) * 100}%`,
                    background: i >= 9 ? "linear-gradient(180deg,#10b981,#059669)" : "#d1fae5",
                    minHeight: 4,
                  }}
                />
                <span className="text-[8px] text-[#ccc]" style={{ fontFamily: "Satoshi, sans-serif" }}>{months[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Funnel + Traffic Sources */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Conversion Funnel */}
        <div className="xl:col-span-2 rounded-2xl p-6" style={{ background: "#fff", border: "1px solid #eaedf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <h3 className="text-sm font-bold text-[#0f0f11] mb-5" style={{ fontFamily: "Satoshi, sans-serif" }}>Conversion Funnel</h3>
          <div className="space-y-3">
            {funnelSteps.map((step, i) => (
              <div key={step.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-[#555]" style={{ fontFamily: "Satoshi, sans-serif" }}>{step.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#1a1a1a]" style={{ fontFamily: "Satoshi, sans-serif" }}>{step.value}</span>
                    <span className="text-[10px] text-[#888]" style={{ fontFamily: "Satoshi, sans-serif" }}>{step.pct}%</span>
                  </div>
                </div>
                <div className="h-2.5 rounded-full" style={{ background: "#f4f6f8" }}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${step.pct}%`,
                      background: `hsl(${230 - i * 30}, 70%, ${55 + i * 5}%)`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="rounded-2xl p-6" style={{ background: "#fff", border: "1px solid #eaedf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <h3 className="text-sm font-bold text-[#0f0f11] mb-5" style={{ fontFamily: "Satoshi, sans-serif" }}>Traffic Sources</h3>
          <div className="space-y-3.5">
            {topSources.map((s) => (
              <div key={s.label}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                    <span className="text-xs font-medium text-[#555]" style={{ fontFamily: "Satoshi, sans-serif" }}>{s.label}</span>
                  </div>
                  <span className="text-xs font-bold text-[#1a1a1a]" style={{ fontFamily: "Satoshi, sans-serif" }}>{s.pct}%</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: "#f4f6f8" }}>
                  <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: s.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Geo Distribution + Customer Segment */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Geo */}
        <div className="rounded-2xl p-6" style={{ background: "#fff", border: "1px solid #eaedf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <h3 className="text-sm font-bold text-[#0f0f11] mb-4" style={{ fontFamily: "Satoshi, sans-serif" }}>Geographic Distribution</h3>
          <div className="space-y-2.5">
            {geoData.map((g) => (
              <div key={g.region} className="flex items-center gap-3">
                <div className="w-28 shrink-0 text-xs text-[#555]" style={{ fontFamily: "Satoshi, sans-serif" }}>{g.region}</div>
                <div className="flex-1 h-2 rounded-full" style={{ background: "#f4f6f8" }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${g.pct}%`, background: "linear-gradient(90deg,#667eea,#764ba2)" }}
                  />
                </div>
                <div className="text-xs font-bold text-[#1a1a1a] w-10 text-right shrink-0" style={{ fontFamily: "Satoshi, sans-serif" }}>{g.orders}</div>
                <div className="text-[10px] text-[#aaa] w-8 shrink-0" style={{ fontFamily: "Satoshi, sans-serif" }}>{g.pct}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Segment */}
        <div className="rounded-2xl p-6" style={{ background: "#fff", border: "1px solid #eaedf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <h3 className="text-sm font-bold text-[#0f0f11] mb-4" style={{ fontFamily: "Satoshi, sans-serif" }}>Customer Segments</h3>
          <div className="flex items-center justify-center gap-6 mb-6">
            {customerSegment.map((seg) => (
              <div key={seg.label} className="text-center">
                <div className="text-3xl font-bold mb-1" style={{ color: seg.color, fontFamily: "Satoshi, sans-serif", letterSpacing: "-0.03em" }}>{seg.value}</div>
                <div className="text-xs text-[#888]" style={{ fontFamily: "Satoshi, sans-serif" }}>{seg.label}</div>
              </div>
            ))}
          </div>

          {/* Visual donut approximation with bars */}
          <div className="flex gap-2 mb-3">
            {customerSegment.map((seg) => {
              const total = customerSegment.reduce((a, s) => a + s.value, 0);
              return (
                <div
                  key={seg.label}
                  className="h-3 rounded-full"
                  style={{ flex: seg.value / total, background: seg.color }}
                />
              );
            })}
          </div>

          <div className="flex items-center gap-4 justify-center">
            {customerSegment.map((seg) => {
              const total = customerSegment.reduce((a, s) => a + s.value, 0);
              return (
                <div key={seg.label} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: seg.color }} />
                  <span className="text-xs text-[#555]" style={{ fontFamily: "Satoshi, sans-serif" }}>
                    {seg.label} ({Math.round((seg.value / total) * 100)}%)
                  </span>
                </div>
              );
            })}
          </div>

          {/* Abandoned Cart */}
          <div className="mt-6 p-4 rounded-xl" style={{ background: "#fffbeb", border: "1px solid #fde68a" }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#92400e]" style={{ fontFamily: "Satoshi, sans-serif" }}>
                🛒 Abandoned Carts
              </span>
              <span className="text-xs font-bold text-[#d97706]" style={{ fontFamily: "Satoshi, sans-serif" }}>2,341 carts</span>
            </div>
            <p className="text-xs text-[#92400e]" style={{ fontFamily: "Satoshi, sans-serif" }}>
              Est. recoverable revenue: <strong>AED 36,400</strong>
            </p>
            <button
              className="mt-3 w-full py-2 rounded-xl text-xs font-bold text-white"
              style={{ background: "#d97706", fontFamily: "Satoshi, sans-serif" }}
            >
              Send Recovery Emails
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
