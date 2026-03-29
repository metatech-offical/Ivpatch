"use client";

import { useState } from "react";

const settingsTabs = ["Payment", "Email", "Policies", "Tax", "Roles", "Integrations"];

const roles = [
  { name: "Super Admin", email: "ivadmin@gmail.com", permissions: ["All Access"], color: "#667eea" },
  { name: "Store Manager", email: "manager@ivpatch.com", permissions: ["Orders", "Products", "Shipping"], color: "#10b981" },
  { name: "Marketing", email: "marketing@ivpatch.com", permissions: ["Marketing", "CMS", "Analytics"], color: "#f59e0b" },
];

export default function SettingsSection() {
  const [tab, setTab] = useState("Payment");
  const [codEnabled, setCodEnabled] = useState(true);
  const [stripeEnabled, setStripeEnabled] = useState(true);

  return (
    <div className="space-y-5">
      {/* Tab nav */}
      <div className="flex flex-wrap items-center gap-1 p-1 rounded-2xl" style={{ background: "#fff", border: "1px solid #eaedf0", width: "fit-content" }}>
        {settingsTabs.map((t) => (
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

      {/* Payment Tab */}
      {tab === "Payment" && (
        <div className="space-y-4">
          {/* Stripe */}
          <div className="rounded-2xl p-6" style={{ background: "#fff", border: "1px solid #eaedf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 className="text-sm font-bold text-[#0f0f11] mb-0.5" style={{ fontFamily: "Satoshi, sans-serif" }}>Stripe Payment Gateway</h3>
                <p className="text-xs text-[#888]" style={{ fontFamily: "Satoshi, sans-serif" }}>Accept cards, Apple Pay, and Google Pay</p>
              </div>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setStripeEnabled(!stripeEnabled)}
              >
                <span className="text-xs text-[#888]" style={{ fontFamily: "Satoshi, sans-serif" }}>{stripeEnabled ? "Enabled" : "Disabled"}</span>
                <div className="w-11 h-6 rounded-full flex items-center px-0.5 transition-all" style={{ background: stripeEnabled ? "#667eea" : "#d1d5db" }}>
                  <div className="w-5 h-5 rounded-full bg-white shadow transition-transform" style={{ transform: stripeEnabled ? "translateX(20px)" : "translateX(0)" }} />
                </div>
              </div>
            </div>
            {stripeEnabled && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Publishable Key", placeholder: "pk_live_..." },
                  { label: "Secret Key", placeholder: "sk_live_..." },
                  { label: "Webhook Secret", placeholder: "whsec_..." },
                  { label: "Currency", placeholder: "AED" },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="block text-xs font-semibold text-[#555] mb-1" style={{ fontFamily: "Satoshi, sans-serif" }}>{f.label}</label>
                    <input
                      type={f.label.includes("Key") || f.label.includes("Secret") ? "password" : "text"}
                      placeholder={f.placeholder}
                      className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                      style={{ background: "#f7f7f7", border: "1.5px solid #ebebeb", color: "#1a1a1a", fontFamily: f.label.includes("Key") ? "monospace" : "Satoshi, sans-serif" }}
                      onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                      onBlur={(e) => (e.target.style.borderColor = "#ebebeb")}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* COD */}
          <div className="rounded-2xl p-6" style={{ background: "#fff", border: "1px solid #eaedf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#0f0f11] mb-0.5" style={{ fontFamily: "Satoshi, sans-serif" }}>Cash on Delivery (COD)</h3>
                <p className="text-xs text-[#888]" style={{ fontFamily: "Satoshi, sans-serif" }}>Allow customers to pay when they receive their order</p>
              </div>
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCodEnabled(!codEnabled)}>
                <span className="text-xs text-[#888]" style={{ fontFamily: "Satoshi, sans-serif" }}>{codEnabled ? "Enabled" : "Disabled"}</span>
                <div className="w-11 h-6 rounded-full flex items-center px-0.5 transition-all" style={{ background: codEnabled ? "#10b981" : "#d1d5db" }}>
                  <div className="w-5 h-5 rounded-full bg-white shadow transition-transform" style={{ transform: codEnabled ? "translateX(20px)" : "translateX(0)" }} />
                </div>
              </div>
            </div>
            {codEnabled && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#555] mb-1" style={{ fontFamily: "Satoshi, sans-serif" }}>COD Fee (AED)</label>
                  <input placeholder="e.g. 10" className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={{ background: "#f7f7f7", border: "1.5px solid #ebebeb", color: "#1a1a1a", fontFamily: "Satoshi, sans-serif" }} onFocus={(e) => (e.target.style.borderColor = "#10b981")} onBlur={(e) => (e.target.style.borderColor = "#ebebeb")} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#555] mb-1" style={{ fontFamily: "Satoshi, sans-serif" }}>Available in Zones</label>
                  <select className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={{ background: "#f7f7f7", border: "1.5px solid #ebebeb", color: "#1a1a1a", fontFamily: "Satoshi, sans-serif" }}>
                    <option>UAE Only</option>
                    <option>UAE + GCC</option>
                    <option>All Zones</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          <button className="px-6 py-3 rounded-xl text-sm font-bold text-white" style={{ background: "#0f0f11", fontFamily: "Satoshi, sans-serif" }}>Save Payment Settings</button>
        </div>
      )}

      {/* Email Templates Tab */}
      {tab === "Email" && (
        <div className="space-y-4">
          <div className="rounded-2xl p-6" style={{ background: "#fff", border: "1px solid #eaedf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <h3 className="text-sm font-bold text-[#0f0f11] mb-4" style={{ fontFamily: "Satoshi, sans-serif" }}>Email Templates</h3>
            <div className="space-y-3">
              {[
                { name: "Order Confirmation", trigger: "When order is placed" },
                { name: "Shipping Notification", trigger: "When order is shipped" },
                { name: "Delivery Confirmation", trigger: "When order is delivered" },
                { name: "Abandoned Cart Recovery", trigger: "After 2 hours of cart abandonment" },
                { name: "Welcome Email", trigger: "When new user registers" },
              ].map((t) => (
                <div key={t.name} className="flex items-center justify-between p-4 rounded-xl" style={{ background: "#f9fafb", border: "1px solid #eaedf0" }}>
                  <div>
                    <p className="text-sm font-semibold text-[#1a1a1a]" style={{ fontFamily: "Satoshi, sans-serif" }}>{t.name}</p>
                    <p className="text-xs text-[#888]" style={{ fontFamily: "Satoshi, sans-serif" }}>Trigger: {t.trigger}</p>
                  </div>
                  <button className="px-3 py-1.5 rounded-xl text-xs font-semibold" style={{ background: "#fff", color: "#555", border: "1px solid #eaedf0", fontFamily: "Satoshi, sans-serif" }}>Edit Template</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Policies Tab */}
      {tab === "Policies" && (
        <div className="space-y-4">
          {["Shipping Policy", "Returns & Refunds", "Privacy Policy", "Terms of Service"].map((policy) => (
            <div key={policy} className="rounded-2xl p-6" style={{ background: "#fff", border: "1px solid #eaedf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
              <h3 className="text-sm font-bold text-[#0f0f11] mb-3" style={{ fontFamily: "Satoshi, sans-serif" }}>{policy}</h3>
              <textarea
                rows={6}
                placeholder={`Enter ${policy.toLowerCase()} content here...`}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                style={{ background: "#f7f7f7", border: "1.5px solid #ebebeb", color: "#1a1a1a", fontFamily: "Satoshi, sans-serif" }}
                onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                onBlur={(e) => (e.target.style.borderColor = "#ebebeb")}
              />
              <button className="mt-3 px-4 py-2 rounded-xl text-xs font-bold text-white" style={{ background: "#0f0f11", fontFamily: "Satoshi, sans-serif" }}>Save Policy</button>
            </div>
          ))}
        </div>
      )}

      {/* Tax Tab */}
      {tab === "Tax" && (
        <div className="rounded-2xl p-6" style={{ background: "#fff", border: "1px solid #eaedf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <h3 className="text-sm font-bold text-[#0f0f11] mb-5" style={{ fontFamily: "Satoshi, sans-serif" }}>Tax Configuration</h3>
          <div className="space-y-4">
            {[
              { region: "UAE", rate: "5", note: "VAT applicable on all goods" },
              { region: "GCC Countries", rate: "0", note: "GCC VAT treaty — confirm per country" },
              { region: "EU", rate: "20", note: "Standard VAT rate" },
              { region: "UK", rate: "20", note: "UK VAT post-Brexit" },
            ].map((t) => (
              <div key={t.region} className="flex items-center gap-4 p-4 rounded-xl" style={{ background: "#f9fafb", border: "1px solid #eaedf0" }}>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#1a1a1a]" style={{ fontFamily: "Satoshi, sans-serif" }}>{t.region}</p>
                  <p className="text-xs text-[#888]" style={{ fontFamily: "Satoshi, sans-serif" }}>{t.note}</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    defaultValue={t.rate}
                    className="w-16 px-2 py-1 rounded-lg text-sm font-bold text-right outline-none"
                    style={{ background: "#fff", border: "1.5px solid #eaedf0", color: "#1a1a1a", fontFamily: "Satoshi, sans-serif" }}
                    onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                    onBlur={(e) => (e.target.style.borderColor = "#eaedf0")}
                  />
                  <span className="text-xs text-[#888]" style={{ fontFamily: "Satoshi, sans-serif" }}>%</span>
                </div>
              </div>
            ))}
            <button className="px-6 py-3 rounded-xl text-sm font-bold text-white" style={{ background: "#0f0f11", fontFamily: "Satoshi, sans-serif" }}>Save Tax Settings</button>
          </div>
        </div>
      )}

      {/* Roles Tab */}
      {tab === "Roles" && (
        <div className="space-y-4">
          <div className="rounded-2xl" style={{ background: "#fff", border: "1px solid #eaedf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid #eaedf0" }}>
              <h3 className="text-sm font-bold text-[#0f0f11]" style={{ fontFamily: "Satoshi, sans-serif" }}>User Roles & Permissions</h3>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white" style={{ background: "#0f0f11", fontFamily: "Satoshi, sans-serif" }}>+ Invite User</button>
            </div>
            <div className="divide-y" style={{ borderColor: "#eaedf0" }}>
              {roles.map((r) => (
                <div key={r.email} className="flex items-center gap-4 px-6 py-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                    style={{ background: r.color }}
                  >
                    {r.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#1a1a1a]" style={{ fontFamily: "Satoshi, sans-serif" }}>{r.name}</p>
                    <p className="text-xs text-[#888]" style={{ fontFamily: "Satoshi, sans-serif" }}>{r.email}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {r.permissions.map((p) => (
                      <span key={p} className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "#f0f0fe", color: "#667eea" }}>{p}</span>
                    ))}
                  </div>
                  <button className="px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0" style={{ background: "#f4f6f8", color: "#555", fontFamily: "Satoshi, sans-serif" }}>Edit</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Integrations Tab */}
      {tab === "Integrations" && (
        <div className="space-y-4">
          {[
            {
              name: "Meta Pixel & Conversions API",
              desc: "Track ad performance and send server-side events",
              fields: [
                { label: "Pixel ID", placeholder: "e.g. 123456789012345" },
                { label: "Conversions API Token", placeholder: "EAAG..." },
              ],
              status: "Active",
              statusOk: true,
            },
            {
              name: "Instagram Shopping Catalog",
              desc: "Sync products to Instagram and Facebook Shop",
              fields: [
                { label: "Catalog ID", placeholder: "e.g. 987654321" },
                { label: "Business Manager ID", placeholder: "e.g. 112233445566" },
              ],
              status: "Sync Error",
              statusOk: false,
            },
          ].map((intg) => (
            <div key={intg.name} className="rounded-2xl p-6" style={{ background: "#fff", border: "1px solid #eaedf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-bold text-[#0f0f11]" style={{ fontFamily: "Satoshi, sans-serif" }}>{intg.name}</h3>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={intg.statusOk ? { background: "#ecfdf5", color: "#059669" } : { background: "#fff1f1", color: "#dc2626" }}
                    >
                      {intg.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#888]" style={{ fontFamily: "Satoshi, sans-serif" }}>{intg.desc}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {intg.fields.map((f) => (
                  <div key={f.label}>
                    <label className="block text-xs font-semibold text-[#555] mb-1" style={{ fontFamily: "Satoshi, sans-serif" }}>{f.label}</label>
                    <input
                      placeholder={f.placeholder}
                      className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                      style={{ background: "#f7f7f7", border: "1.5px solid #ebebeb", color: "#1a1a1a", fontFamily: "Satoshi, sans-serif" }}
                      onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                      onBlur={(e) => (e.target.style.borderColor = "#ebebeb")}
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-4">
                <button className="px-4 py-2 rounded-xl text-xs font-bold text-white" style={{ background: "#0f0f11", fontFamily: "Satoshi, sans-serif" }}>Save & Test</button>
                {!intg.statusOk && (
                  <button className="px-4 py-2 rounded-xl text-xs font-bold" style={{ background: "#fff1f1", color: "#dc2626", border: "1px solid #fecaca", fontFamily: "Satoshi, sans-serif" }}>Re-sync Now</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
