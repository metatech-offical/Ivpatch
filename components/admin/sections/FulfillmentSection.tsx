"use client";

import { useState } from "react";

const providers = {
  uae: [
    { id: "quiqup", name: "Quiqup", logo: "🚚", region: "UAE Last-Mile", apiReady: true, description: "Same-day & next-day delivery across UAE" },
    { id: "shyft", name: "Shyft", logo: "⚡", region: "UAE Last-Mile", apiReady: true, description: "Express last-mile logistics UAE" },
    { id: "jeebly", name: "Jeebly", logo: "📦", region: "UAE Last-Mile", apiReady: false, description: "UAE & GCC on-demand delivery" },
  ],
  international: [
    { id: "aramex", name: "Aramex", logo: "🌍", region: "GCC & International", apiReady: true, description: "MENA & global express shipping" },
    { id: "dhl", name: "DHL Express", logo: "🟡", region: "International", apiReady: true, description: "Worldwide express delivery" },
    { id: "fedex", name: "FedEx", logo: "🟣", region: "International", apiReady: true, description: "Global courier & logistics" },
    { id: "ups", name: "UPS", logo: "🟤", region: "International", apiReady: false, description: "Worldwide package delivery" },
    { id: "emiratespost", name: "Emirates Post", logo: "🇦🇪", region: "UAE & International", apiReady: false, description: "Official UAE postal service" },
  ],
};

type ProviderKey = "quiqup" | "shyft" | "jeebly" | "aramex" | "dhl" | "fedex" | "ups" | "emiratespost";

const pendingOrders = [
  { id: "#ORD-5818", customer: "James Patel", items: "Immunity Shield Pack ×3", status: "Paid", payment: "Prepaid", address: "123 Sheikh Zayed Rd, Dubai, UAE", weight: "0.45kg", zone: "UAE" },
  { id: "#ORD-5819", customer: "Fatima Zahra", items: "Sleep & Recovery Patch ×1", status: "Paid", payment: "COD", address: "45 Al Wasl Rd, Dubai, UAE", weight: "0.15kg", zone: "UAE" },
  { id: "#ORD-5815", customer: "Omar Al-Rashid", items: "Energy Bundle ×2", status: "Paid", payment: "Prepaid", address: "Riyadh, Saudi Arabia", weight: "0.3kg", zone: "GCC" },
];

const trackingQueue = [
  { id: "#ORD-5820", provider: "DHL", trackingNo: "DHL-4452291", pushed: true, status: "In Transit", lastUpdate: "5h ago" },
  { id: "#ORD-5821", provider: "Aramex", trackingNo: "AR-8842901", pushed: true, status: "Delivered", lastUpdate: "2h ago" },
  { id: "#ORD-5819", provider: "Quiqup", trackingNo: "—", pushed: false, status: "Pending Push", lastUpdate: "—" },
];

const fulfillmentTabs = ["Provider Setup", "Order Queue", "Tracking", "Email & SMS Triggers"];

export default function FulfillmentSection() {
  const [tab, setTab] = useState("Provider Setup");
  const [uaeProvider, setUaeProvider] = useState<ProviderKey>("quiqup");
  const [intlProvider, setIntlProvider] = useState<ProviderKey>("dhl");
  const [autoPush, setAutoPush] = useState(true);
  const [pushTrigger, setPushTrigger] = useState("on_payment");
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [pushing, setPushing] = useState<string | null>(null);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);

  const handlePush = async (orderId: string) => {
    setPushing(orderId);
    await new Promise((r) => setTimeout(r, 1200));
    setPushing(null);
  };

  return (
    <div className="space-y-5">
      {/* Tab Nav */}
      <div className="flex flex-wrap items-center gap-1 p-1 rounded-2xl" style={{ background: "#fff", border: "1px solid #eaedf0", width: "fit-content" }}>
        {fulfillmentTabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
            style={{
              background: tab === t ? "#0f0f11" : "transparent",
              color: tab === t ? "#fff" : "#888",
              fontFamily: "Satoshi, sans-serif",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* PROVIDER SETUP */}
      {tab === "Provider Setup" && (
        <div className="space-y-5">
          {/* Auto-push config */}
          <div className="rounded-2xl p-6" style={{ background: "#fff", border: "1px solid #eaedf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 className="text-sm font-bold text-[#0f0f11]" style={{ fontFamily: "Satoshi, sans-serif" }}>Auto-Push to Fulfillment Partner</h3>
                <p className="text-xs text-[#aaa] mt-0.5" style={{ fontFamily: "Satoshi, sans-serif" }}>
                  Automatically send paid orders with customer details, items, quantities & COD/prepaid flag
                </p>
              </div>
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => setAutoPush(!autoPush)}>
                <span className="text-xs text-[#888]" style={{ fontFamily: "Satoshi, sans-serif" }}>{autoPush ? "Enabled" : "Disabled"}</span>
                <div className="w-11 h-6 rounded-full flex items-center px-0.5 transition-all" style={{ background: autoPush ? "#10b981" : "#d1d5db" }}>
                  <div className="w-5 h-5 rounded-full bg-white shadow transition-transform" style={{ transform: autoPush ? "translateX(20px)" : "translateX(0)" }} />
                </div>
              </div>
            </div>
            {autoPush && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#555] mb-1" style={{ fontFamily: "Satoshi, sans-serif" }}>Push Trigger</label>
                  <select
                    value={pushTrigger}
                    onChange={(e) => setPushTrigger(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                    style={{ background: "#f7f7f7", border: "1.5px solid #ebebeb", color: "#1a1a1a", fontFamily: "Satoshi, sans-serif" }}
                  >
                    <option value="on_payment">On Payment Confirmation</option>
                    <option value="on_manual">Manual Approval Only</option>
                    <option value="on_processing">When Status = Processing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#555] mb-1" style={{ fontFamily: "Satoshi, sans-serif" }}>Payload Fields</label>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {["Customer Name", "Phone", "Address", "Items", "Quantities", "Order Value", "COD/Prepaid Flag"].map((f) => (
                      <span key={f} className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "#ecfdf5", color: "#059669" }}>✓ {f}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* UAE Providers */}
          <div className="rounded-2xl p-6" style={{ background: "#fff", border: "1px solid #eaedf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <h3 className="text-sm font-bold text-[#0f0f11] mb-1" style={{ fontFamily: "Satoshi, sans-serif" }}>UAE Local Last-Mile Partner</h3>
            <p className="text-xs text-[#aaa] mb-4" style={{ fontFamily: "Satoshi, sans-serif" }}>Quiqup / Shyft / Jeebly — select your active provider</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
              {providers.uae.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setUaeProvider(p.id as ProviderKey)}
                  className="p-4 rounded-xl cursor-pointer transition-all"
                  style={{
                    border: `2px solid ${uaeProvider === p.id ? "#667eea" : "#eaedf0"}`,
                    background: uaeProvider === p.id ? "#f0f0fe" : "#f9fafb",
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{p.logo}</span>
                    {p.apiReady && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: "#ecfdf5", color: "#059669" }}>API Ready</span>}
                  </div>
                  <p className="text-sm font-bold text-[#1a1a1a] mb-0.5" style={{ fontFamily: "Satoshi, sans-serif" }}>{p.name}</p>
                  <p className="text-[10px] text-[#888]" style={{ fontFamily: "Satoshi, sans-serif" }}>{p.description}</p>
                </div>
              ))}
            </div>

            {/* API Config for selected UAE provider */}
            <div className="p-4 rounded-xl" style={{ background: "#f9fafb", border: "1px solid #eaedf0" }}>
              <p className="text-xs font-bold text-[#555] mb-3" style={{ fontFamily: "Satoshi, sans-serif" }}>
                {providers.uae.find(p => p.id === uaeProvider)?.name} · API Configuration
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: "API Key", placeholder: "Enter API key..." },
                  { label: "Account ID", placeholder: "Enter account ID..." },
                  { label: "Webhook URL (Incoming)", placeholder: "https://ivpatch.com/api/fulfillment/webhook" },
                  { label: "Default Service Type", placeholder: "Standard / Express" },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="block text-[10px] font-semibold text-[#555] mb-1" style={{ fontFamily: "Satoshi, sans-serif" }}>{f.label}</label>
                    <input
                      placeholder={f.placeholder}
                      type={f.label === "API Key" ? "password" : "text"}
                      className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                      style={{ background: "#fff", border: "1.5px solid #ebebeb", color: "#1a1a1a", fontFamily: "Satoshi, sans-serif" }}
                      onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                      onBlur={(e) => (e.target.style.borderColor = "#ebebeb")}
                    />
                  </div>
                ))}
              </div>
              <button className="mt-3 px-4 py-2 rounded-xl text-xs font-bold text-white" style={{ background: "#0f0f11", fontFamily: "Satoshi, sans-serif" }}>Save & Test Connection</button>
            </div>
          </div>

          {/* International Providers */}
          <div className="rounded-2xl p-6" style={{ background: "#fff", border: "1px solid #eaedf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <h3 className="text-sm font-bold text-[#0f0f11] mb-1" style={{ fontFamily: "Satoshi, sans-serif" }}>International Shipping Partner</h3>
            <p className="text-xs text-[#aaa] mb-4" style={{ fontFamily: "Satoshi, sans-serif" }}>Aramex / DHL / FedEx / UPS / Emirates Post</p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-5">
              {providers.international.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setIntlProvider(p.id as ProviderKey)}
                  className="p-3 rounded-xl cursor-pointer transition-all text-center"
                  style={{
                    border: `2px solid ${intlProvider === p.id ? "#667eea" : "#eaedf0"}`,
                    background: intlProvider === p.id ? "#f0f0fe" : "#f9fafb",
                  }}
                >
                  <div className="text-xl mb-1">{p.logo}</div>
                  <p className="text-[11px] font-bold text-[#1a1a1a]" style={{ fontFamily: "Satoshi, sans-serif" }}>{p.name}</p>
                  {p.apiReady && <div className="text-[9px] font-semibold text-[#059669] mt-0.5">API Ready</div>}
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl" style={{ background: "#f9fafb", border: "1px solid #eaedf0" }}>
              <p className="text-xs font-bold text-[#555] mb-3" style={{ fontFamily: "Satoshi, sans-serif" }}>
                {providers.international.find(p => p.id === intlProvider)?.name} · API Configuration
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: "Account Number", placeholder: "e.g. 12345678" },
                  { label: "API Key / Password", placeholder: "Enter credentials..." },
                  { label: "Origin Airport/Hub", placeholder: "e.g. DXB" },
                  { label: "Service Level", placeholder: "e.g. Express, Economy" },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="block text-[10px] font-semibold text-[#555] mb-1" style={{ fontFamily: "Satoshi, sans-serif" }}>{f.label}</label>
                    <input
                      placeholder={f.placeholder}
                      type={f.label.includes("Key") || f.label.includes("Password") ? "password" : "text"}
                      className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                      style={{ background: "#fff", border: "1.5px solid #ebebeb", color: "#1a1a1a", fontFamily: "Satoshi, sans-serif" }}
                      onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                      onBlur={(e) => (e.target.style.borderColor = "#ebebeb")}
                    />
                  </div>
                ))}
              </div>
              <button className="mt-3 px-4 py-2 rounded-xl text-xs font-bold text-white" style={{ background: "#0f0f11", fontFamily: "Satoshi, sans-serif" }}>Save & Test Connection</button>
            </div>
          </div>
        </div>
      )}

      {/* ORDER QUEUE */}
      {tab === "Order Queue" && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: "#fffbeb", border: "1px solid #fde68a" }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="#d97706" className="w-5 h-5 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
            <span className="text-sm font-semibold text-[#92400e]" style={{ fontFamily: "Satoshi, sans-serif" }}>
              {pendingOrders.length} paid orders awaiting fulfillment push
            </span>
          </div>

          <div className="rounded-2xl overflow-hidden" style={{ background: "#fff", border: "1px solid #eaedf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid #eaedf0" }}>
              <h3 className="text-sm font-bold text-[#0f0f11]" style={{ fontFamily: "Satoshi, sans-serif" }}>Orders Pending Fulfillment Push</h3>
              <button
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold text-white"
                style={{ background: "#0f0f11", fontFamily: "Satoshi, sans-serif" }}
              >
                Push All Paid Orders
              </button>
            </div>

            <div className="divide-y" style={{ borderColor: "#f4f6f8" }}>
              {pendingOrders.map((order) => (
                <div key={order.id} className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold" style={{ color: "#667eea", fontFamily: "Satoshi, sans-serif" }}>{order.id}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "#ecfdf5", color: "#059669" }}>{order.status}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: order.payment === "COD" ? "#fff7ed" : "#eff6ff", color: order.payment === "COD" ? "#c2410c" : "#1d4ed8" }}>
                          {order.payment}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-[#1a1a1a] mb-0.5" style={{ fontFamily: "Satoshi, sans-serif" }}>{order.customer}</p>
                      <p className="text-xs text-[#888] mb-0.5" style={{ fontFamily: "Satoshi, sans-serif" }}>{order.items}</p>
                      <p className="text-xs text-[#aaa]" style={{ fontFamily: "Satoshi, sans-serif" }}>📍 {order.address}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#888]" style={{ fontFamily: "Satoshi, sans-serif" }}>{order.weight}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "#f0f0fe", color: "#667eea" }}>{order.zone}</span>
                      </div>
                      <div className="flex gap-2">
                        <select
                          className="px-2 py-1.5 rounded-xl text-xs outline-none"
                          style={{ background: "#f4f6f8", border: "1px solid #eaedf0", color: "#555", fontFamily: "Satoshi, sans-serif" }}
                        >
                          {order.zone === "UAE" ? (
                            <>
                              <option>Quiqup</option>
                              <option>Shyft</option>
                              <option>Jeebly</option>
                            </>
                          ) : (
                            <>
                              <option>Aramex</option>
                              <option>DHL</option>
                              <option>FedEx</option>
                            </>
                          )}
                        </select>
                        <button
                          onClick={() => handlePush(order.id)}
                          disabled={pushing === order.id}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white transition-all"
                          style={{ background: pushing === order.id ? "#aaa" : "#0f0f11", fontFamily: "Satoshi, sans-serif" }}
                        >
                          {pushing === order.id ? (
                            <svg className="animate-spin w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                          ) : null}
                          {pushing === order.id ? "Pushing..." : "Push Order"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TRACKING */}
      {tab === "Tracking" && (
        <div className="space-y-4">
          <div className="rounded-2xl overflow-hidden" style={{ background: "#fff", border: "1px solid #eaedf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid #eaedf0" }}>
              <div>
                <h3 className="text-sm font-bold text-[#0f0f11]" style={{ fontFamily: "Satoshi, sans-serif" }}>Tracking Number Registry</h3>
                <p className="text-xs text-[#aaa] mt-0.5" style={{ fontFamily: "Satoshi, sans-serif" }}>Retrieved from fulfillment partners & shown to customers</p>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-[#888]" style={{ fontFamily: "Satoshi, sans-serif" }}>Polling every 2h</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ background: "#f9fafb", borderBottom: "1px solid #eaedf0" }}>
                    {["Order ID", "Provider", "Tracking No.", "Status", "Last Update", "Actions"].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-[#888] uppercase tracking-wider whitespace-nowrap" style={{ fontFamily: "Satoshi, sans-serif" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: "#f4f6f8" }}>
                  {trackingQueue.map((t) => (
                    <tr key={t.id} className="hover:bg-[#f9fafb] transition-colors">
                      <td className="px-5 py-3.5 text-xs font-bold" style={{ color: "#667eea" }}>{t.id}</td>
                      <td className="px-5 py-3.5 text-sm font-semibold text-[#1a1a1a]" style={{ fontFamily: "Satoshi, sans-serif" }}>{t.provider}</td>
                      <td className="px-5 py-3.5 text-xs font-mono text-[#888]">{t.trackingNo}</td>
                      <td className="px-5 py-3.5">
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={
                            t.status === "Delivered" ? { background: "#ecfdf5", color: "#059669" } :
                            t.status === "In Transit" ? { background: "#eff6ff", color: "#2563eb" } :
                            { background: "#fffbeb", color: "#d97706" }
                          }
                        >
                          {t.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-[#aaa]" style={{ fontFamily: "Satoshi, sans-serif" }}>{t.lastUpdate}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1.5">
                          {t.pushed ? (
                            <button className="px-2 py-1 rounded-lg text-xs font-semibold" style={{ background: "#eff6ff", color: "#2563eb", fontFamily: "Satoshi, sans-serif" }}>Track</button>
                          ) : (
                            <button className="px-2 py-1 rounded-lg text-xs font-semibold" style={{ background: "#fff1f1", color: "#dc2626", fontFamily: "Satoshi, sans-serif" }}>Push</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* EMAIL & SMS TRIGGERS */}
      {tab === "Email & SMS Triggers" && (
        <div className="space-y-4">
          <div className="rounded-2xl p-6" style={{ background: "#fff", border: "1px solid #eaedf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <h3 className="text-sm font-bold text-[#0f0f11] mb-5" style={{ fontFamily: "Satoshi, sans-serif" }}>Automated Transactional Notifications</h3>

            {/* Email Toggle */}
            <div className="flex items-center justify-between mb-4 p-4 rounded-xl" style={{ background: "#f9fafb", border: "1px solid #eaedf0" }}>
              <div>
                <p className="text-sm font-bold text-[#1a1a1a]" style={{ fontFamily: "Satoshi, sans-serif" }}>Email Notifications</p>
                <p className="text-xs text-[#888]" style={{ fontFamily: "Satoshi, sans-serif" }}>Automated emails sent via your email provider</p>
              </div>
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => setEmailEnabled(!emailEnabled)}>
                <div className="w-11 h-6 rounded-full flex items-center px-0.5 transition-all" style={{ background: emailEnabled ? "#10b981" : "#d1d5db" }}>
                  <div className="w-5 h-5 rounded-full bg-white shadow transition-transform" style={{ transform: emailEnabled ? "translateX(20px)" : "translateX(0)" }} />
                </div>
              </div>
            </div>

            {/* SMS Toggle */}
            <div className="flex items-center justify-between mb-5 p-4 rounded-xl" style={{ background: "#f9fafb", border: "1px solid #eaedf0" }}>
              <div>
                <p className="text-sm font-bold text-[#1a1a1a]" style={{ fontFamily: "Satoshi, sans-serif" }}>SMS Notifications</p>
                <p className="text-xs text-[#888]" style={{ fontFamily: "Satoshi, sans-serif" }}>Via Twilio / local SMS gateway</p>
              </div>
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSmsEnabled(!smsEnabled)}>
                <div className="w-11 h-6 rounded-full flex items-center px-0.5 transition-all" style={{ background: smsEnabled ? "#10b981" : "#d1d5db" }}>
                  <div className="w-5 h-5 rounded-full bg-white shadow transition-transform" style={{ transform: smsEnabled ? "translateX(20px)" : "translateX(0)" }} />
                </div>
              </div>
            </div>

            {/* Trigger Table */}
            <div className="space-y-2">
              {[
                { event: "Order Placed", trigger: "Status = Paid", email: true, sms: true, template: "order-confirmation" },
                { event: "Order Confirmed / Processing", trigger: "Status = Processing", email: true, sms: false, template: "order-processing" },
                { event: "Order Shipped", trigger: "Tracking number assigned", email: true, sms: true, template: "shipping-confirmation" },
                { event: "Out for Delivery", trigger: "Carrier status update", email: false, sms: true, template: "out-for-delivery" },
                { event: "Order Delivered", trigger: "Status = Delivered", email: true, sms: false, template: "delivery-confirmation" },
                { event: "Order Cancelled", trigger: "Status = Cancelled", email: true, sms: false, template: "cancellation-notice" },
                { event: "Refund Processed", trigger: "Refund issued", email: true, sms: false, template: "refund-notice" },
              ].map((trigger) => (
                <div key={trigger.event} className="flex items-center gap-3 p-3.5 rounded-xl" style={{ background: "#f9fafb", border: "1px solid #eaedf0" }}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-semibold text-[#1a1a1a]" style={{ fontFamily: "Satoshi, sans-serif" }}>{trigger.event}</p>
                    </div>
                    <p className="text-[10px] text-[#aaa]" style={{ fontFamily: "Satoshi, sans-serif" }}>Trigger: {trigger.trigger}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {emailEnabled && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full`} style={trigger.email ? { background: "#ecfdf5", color: "#059669" } : { background: "#f4f6f8", color: "#aaa" }}>
                        📧 {trigger.email ? "Email" : "No Email"}
                      </span>
                    )}
                    {smsEnabled && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full`} style={trigger.sms ? { background: "#eff6ff", color: "#2563eb" } : { background: "#f4f6f8", color: "#aaa" }}>
                        💬 {trigger.sms ? "SMS" : "No SMS"}
                      </span>
                    )}
                    <button className="px-2 py-1 rounded-lg text-[10px] font-bold" style={{ background: "#fff", color: "#555", border: "1px solid #eaedf0", fontFamily: "Satoshi, sans-serif" }}>
                      Edit Template
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
