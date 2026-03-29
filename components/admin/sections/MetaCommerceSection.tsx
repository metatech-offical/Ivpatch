"use client";

import { useState } from "react";

const pixelEvents = [
  { event: "ViewContent", count: 18420, trend: "+12%", ok: true, description: "Product page views tracked" },
  { event: "AddToCart", count: 5340, trend: "+8%", ok: true, description: "Add-to-cart actions tracked" },
  { event: "InitiateCheckout", count: 2810, trend: "+5%", ok: true, description: "Checkout starts tracked" },
  { event: "Purchase", count: 1284, trend: "+9%", ok: true, description: "Completed purchases tracked" },
  { event: "Search", count: 3210, trend: "+2%", ok: true, description: "Site search events tracked" },
  { event: "CompleteRegistration", count: 764, trend: "+11%", ok: false, description: "Not yet configured via CAPI" },
];

const catalogProducts = [
  { id: "IVP-B12-001", name: "Vitamin B12 Patch", status: "Approved", availability: "in stock", price: "AED 44" },
  { id: "IVP-ENR-002", name: "Energy Boost Bundle", status: "Approved", availability: "in stock", price: "AED 142" },
  { id: "IVP-SLP-003", name: "Sleep & Recovery Patch", status: "Approved", availability: "in stock", price: "AED 65" },
  { id: "IVP-IMM-004", name: "Immunity Shield Pack", status: "Approved", availability: "in stock", price: "AED 220" },
  { id: "IVP-D3-005", name: "Vitamin D3 Patch", status: "Rejected", availability: "out of stock", price: "AED 49" },
  { id: "IVP-DTX-006", name: "Detox Cleanse Patch", status: "Pending Review", availability: "in stock", price: "AED 82" },
];

const complianceChecks = [
  { item: "Shipping Policy page", status: "pass" },
  { item: "Returns & Refunds page", status: "pass" },
  { item: "Privacy Policy page", status: "pass" },
  { item: "Terms of Service page", status: "pass" },
  { item: "Contact page available", status: "pass" },
  { item: "No prohibited medical claims detected", status: "warning" },
  { item: "Domain verified (Meta Business Manager)", status: "pass" },
  { item: "Conversions API server-side events", status: "fail" },
];

const metaTabs = ["Overview", "Pixel & CAPI", "Catalog Sync", "Product Feed", "Compliance"];

export default function MetaCommerceSection() {
  const [tab, setTab] = useState("Overview");
  const [domainVerified, setDomainVerified] = useState(true);
  const [syncLoading, setSyncLoading] = useState(false);
  const [lastSync, setLastSync] = useState("Mar 21, 2026 · 18:42");

  const handleSync = async () => {
    setSyncLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setSyncLoading(false);
    setLastSync("Mar 21, 2026 · " + new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }));
  };

  const compliancePass = complianceChecks.filter((c) => c.status === "pass").length;
  const complianceTotal = complianceChecks.length;

  return (
    <div className="space-y-5">
      {/* Tab Nav */}
      <div className="flex flex-wrap items-center gap-1 p-1 rounded-2xl" style={{ background: "#fff", border: "1px solid #eaedf0", width: "fit-content" }}>
        {metaTabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
            style={{
              background: tab === t ? "#1877f2" : "transparent",
              color: tab === t ? "#fff" : "#888",
              fontFamily: "Satoshi, sans-serif",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {tab === "Overview" && (
        <div className="space-y-5">
          {/* Status Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {[
              { label: "Pixel Status", value: "Active", ok: true, sub: "Pixel ID: 1234567890", color: "#1877f2", bg: "#eff6ff" },
              { label: "Conversions API", value: "Partial", ok: false, sub: "Missing: CompleteRegistration", color: "#d97706", bg: "#fffbeb" },
              { label: "Catalog Products", value: `${catalogProducts.filter(p => p.status === "Approved").length}/${catalogProducts.length}`, ok: true, sub: "Approved & live", color: "#059669", bg: "#ecfdf5" },
              { label: "Compliance Score", value: `${compliancePass}/${complianceTotal}`, ok: compliancePass >= 6, sub: "Checks passed", color: compliancePass >= 6 ? "#059669" : "#dc2626", bg: compliancePass >= 6 ? "#ecfdf5" : "#fff1f1" },
            ].map((c) => (
              <div key={c.label} className="rounded-2xl p-5" style={{ background: "#fff", border: "1px solid #eaedf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#888]" style={{ fontFamily: "Satoshi, sans-serif" }}>{c.label}</span>
                  <div className="w-2 h-2 rounded-full" style={{ background: c.ok ? "#10b981" : "#f59e0b", boxShadow: `0 0 6px ${c.ok ? "#10b98166" : "#f59e0b66"}` }} />
                </div>
                <div className="text-xl font-bold mb-1" style={{ color: c.color, fontFamily: "Satoshi, sans-serif", letterSpacing: "-0.02em" }}>{c.value}</div>
                <div className="text-xs text-[#aaa]" style={{ fontFamily: "Satoshi, sans-serif" }}>{c.sub}</div>
              </div>
            ))}
          </div>

          {/* Domain Verification + Business Manager */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <div className="rounded-2xl p-6" style={{ background: "#fff", border: "1px solid #eaedf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
              <h3 className="text-sm font-bold text-[#0f0f11] mb-4" style={{ fontFamily: "Satoshi, sans-serif" }}>Domain Verification</h3>
              <div className="flex items-center gap-3 p-4 rounded-xl mb-4" style={{ background: domainVerified ? "#ecfdf5" : "#fff1f1", border: `1px solid ${domainVerified ? "#a7f3d0" : "#fecaca"}` }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: domainVerified ? "#d1fae5" : "#fee2e2" }}>
                  {domainVerified ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#059669" className="w-4 h-4">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#dc2626" className="w-4 h-4">
                      <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: domainVerified ? "#059669" : "#dc2626", fontFamily: "Satoshi, sans-serif" }}>
                    {domainVerified ? "Domain Verified" : "Domain Not Verified"}
                  </p>
                  <p className="text-xs" style={{ color: domainVerified ? "#059669" : "#dc2626", fontFamily: "Satoshi, sans-serif" }}>ivpatch.com</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-[#555] mb-1" style={{ fontFamily: "Satoshi, sans-serif" }}>Method</label>
                  <select className="w-full px-3 py-2 rounded-xl text-sm outline-none" style={{ background: "#f7f7f7", border: "1.5px solid #ebebeb", color: "#1a1a1a", fontFamily: "Satoshi, sans-serif" }}>
                    <option>DNS TXT Record</option>
                    <option>Meta Tag (HTML)</option>
                  </select>
                </div>
                <div className="p-3 rounded-xl font-mono text-xs" style={{ background: "#f4f6f8", color: "#667eea" }}>
                  facebook-domain-verification=a1b2c3d4e5f6g7h8i9j0
                </div>
                <button className="w-full py-2 rounded-xl text-xs font-bold text-white" style={{ background: "#1877f2", fontFamily: "Satoshi, sans-serif" }}>Re-verify Domain</button>
              </div>
            </div>

            <div className="rounded-2xl p-6" style={{ background: "#fff", border: "1px solid #eaedf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
              <h3 className="text-sm font-bold text-[#0f0f11] mb-4" style={{ fontFamily: "Satoshi, sans-serif" }}>Meta Business Manager</h3>
              <div className="space-y-3">
                {[
                  { label: "Business Manager ID", value: "112233445566" },
                  { label: "Ad Account ID", value: "act_998877665544" },
                  { label: "Facebook Page ID", value: "IVPATCHOfficial" },
                  { label: "Instagram Account", value: "@ivpatch.ae" },
                ].map((f) => (
                  <div key={f.label} className="flex items-center justify-between py-2" style={{ borderBottom: "1px solid #f4f6f8" }}>
                    <span className="text-xs text-[#888]" style={{ fontFamily: "Satoshi, sans-serif" }}>{f.label}</span>
                    <span className="text-xs font-bold text-[#1a1a1a] font-mono" style={{ fontFamily: "Satoshi, sans-serif" }}>{f.value}</span>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full py-2 rounded-xl text-xs font-bold" style={{ background: "#f4f6f8", color: "#555", fontFamily: "Satoshi, sans-serif" }}>Edit Connection</button>
            </div>
          </div>
        </div>
      )}

      {/* PIXEL & CAPI TAB */}
      {tab === "Pixel & CAPI" && (
        <div className="space-y-5">
          <div className="rounded-2xl p-6" style={{ background: "#fff", border: "1px solid #eaedf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-bold text-[#0f0f11]" style={{ fontFamily: "Satoshi, sans-serif" }}>Meta Pixel Events (Last 30 days)</h3>
                <p className="text-xs text-[#aaa] mt-0.5" style={{ fontFamily: "Satoshi, sans-serif" }}>Pixel ID: 1234567890123456</p>
              </div>
              <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: "#ecfdf5", color: "#059669" }}>
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Firing Correctly
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {pixelEvents.map((ev) => (
                <div key={ev.event} className="p-4 rounded-xl" style={{ background: "#f9fafb", border: "1px solid #eaedf0" }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: ev.ok ? "#10b981" : "#f59e0b" }} />
                      <span className="text-xs font-bold text-[#1a1a1a] font-mono">{ev.event}</span>
                    </div>
                    <span className="text-[10px] font-semibold text-[#059669]">{ev.trend}</span>
                  </div>
                  <div className="text-xl font-bold text-[#0f0f11] mb-1" style={{ fontFamily: "Satoshi, sans-serif", letterSpacing: "-0.02em" }}>
                    {ev.count.toLocaleString()}
                  </div>
                  <p className="text-[10px] text-[#aaa]" style={{ fontFamily: "Satoshi, sans-serif" }}>{ev.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Conversions API Config */}
          <div className="rounded-2xl p-6" style={{ background: "#fff", border: "1px solid #eaedf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-bold text-[#0f0f11]" style={{ fontFamily: "Satoshi, sans-serif" }}>Conversions API (Server-Side)</h3>
                <p className="text-xs text-[#aaa] mt-0.5" style={{ fontFamily: "Satoshi, sans-serif" }}>Send events server-to-server for better accuracy</p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "#fff1f1", color: "#dc2626" }}>Partial Setup</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {[
                { label: "Access Token", placeholder: "EAAG..." },
                { label: "Pixel ID", placeholder: "1234567890123456" },
                { label: "Test Event Code", placeholder: "TEST12345" },
                { label: "User Data Hashing", value: "SHA-256 (auto)" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="block text-xs font-semibold text-[#555] mb-1" style={{ fontFamily: "Satoshi, sans-serif" }}>{f.label}</label>
                  <input
                    defaultValue={f.value || ""}
                    placeholder={f.placeholder}
                    type={f.label.includes("Token") ? "password" : "text"}
                    className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                    style={{ background: "#f7f7f7", border: "1.5px solid #ebebeb", color: "#1a1a1a", fontFamily: "Satoshi, sans-serif" }}
                    onFocus={(e) => (e.target.style.borderColor = "#1877f2")}
                    onBlur={(e) => (e.target.style.borderColor = "#ebebeb")}
                  />
                </div>
              ))}
            </div>
            <div className="mb-4 p-4 rounded-xl" style={{ background: "#eff6ff", border: "1px solid #bfdbfe" }}>
              <p className="text-xs font-semibold text-[#1d4ed8] mb-2" style={{ fontFamily: "Satoshi, sans-serif" }}>📡 Server-side events being sent:</p>
              <div className="flex flex-wrap gap-2">
                {["Purchase ✓", "AddToCart ✓", "InitiateCheckout ✓", "ViewContent ✓", "CompleteRegistration ✗"].map((e) => (
                  <span key={e} className="text-[10px] font-mono px-2 py-1 rounded-lg" style={{ background: "#fff", color: e.includes("✗") ? "#dc2626" : "#059669" }}>{e}</span>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2.5 rounded-xl text-xs font-bold text-white" style={{ background: "#1877f2", fontFamily: "Satoshi, sans-serif" }}>Save & Test Events</button>
              <button className="px-4 py-2.5 rounded-xl text-xs font-bold" style={{ background: "#f4f6f8", color: "#555", fontFamily: "Satoshi, sans-serif" }}>Send Test Event</button>
            </div>
          </div>
        </div>
      )}

      {/* CATALOG SYNC TAB */}
      {tab === "Catalog Sync" && (
        <div className="space-y-5">
          <div className="rounded-2xl p-6" style={{ background: "#fff", border: "1px solid #eaedf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-bold text-[#0f0f11]" style={{ fontFamily: "Satoshi, sans-serif" }}>Instagram / Facebook Catalog</h3>
                <p className="text-xs text-[#aaa] mt-0.5" style={{ fontFamily: "Satoshi, sans-serif" }}>Last synced: {lastSync}</p>
              </div>
              <button
                onClick={handleSync}
                disabled={syncLoading}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all"
                style={{ background: syncLoading ? "#aaa" : "#1877f2", fontFamily: "Satoshi, sans-serif" }}
              >
                {syncLoading ? (
                  <>
                    <svg className="animate-spin w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Syncing...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.990" />
                    </svg>
                    Sync Now
                  </>
                )}
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ background: "#f9fafb", borderBottom: "1px solid #eaedf0" }}>
                    {["Product ID", "Name", "Price", "Availability", "Catalog Status", "Actions"].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-[#888] uppercase tracking-wider whitespace-nowrap" style={{ fontFamily: "Satoshi, sans-serif" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: "#f4f6f8" }}>
                  {catalogProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-[#f9fafb] transition-colors">
                      <td className="px-5 py-3.5 text-xs font-mono text-[#667eea]">{p.id}</td>
                      <td className="px-5 py-3.5 text-sm font-semibold text-[#1a1a1a]" style={{ fontFamily: "Satoshi, sans-serif" }}>{p.name}</td>
                      <td className="px-5 py-3.5 text-sm font-bold text-[#1a1a1a]" style={{ fontFamily: "Satoshi, sans-serif" }}>{p.price}</td>
                      <td className="px-5 py-3.5">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                          style={p.availability === "in stock" ? { background: "#ecfdf5", color: "#059669" } : { background: "#fff1f1", color: "#dc2626" }}>
                          {p.availability}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={
                            p.status === "Approved" ? { background: "#ecfdf5", color: "#059669" } :
                            p.status === "Rejected" ? { background: "#fff1f1", color: "#dc2626" } :
                            { background: "#fffbeb", color: "#d97706" }
                          }>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <button className="px-2 py-1 rounded-lg text-xs font-semibold" style={{ background: "#f4f6f8", color: "#555", fontFamily: "Satoshi, sans-serif" }}>
                          {p.status === "Rejected" ? "Fix & Resubmit" : "View on Meta"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* PRODUCT FEED TAB */}
      {tab === "Product Feed" && (
        <div className="space-y-4">
          <div className="rounded-2xl p-6" style={{ background: "#fff", border: "1px solid #eaedf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <h3 className="text-sm font-bold text-[#0f0f11] mb-1" style={{ fontFamily: "Satoshi, sans-serif" }}>Product Feed Management</h3>
            <p className="text-xs text-[#aaa] mb-5" style={{ fontFamily: "Satoshi, sans-serif" }}>
              Generate & host a product feed for Meta Catalog API. Auto-updates every 6 hours.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
              {[
                { format: "CSV", icon: "📄", desc: "Comma-separated values", url: "https://ivpatch.com/feeds/products.csv" },
                { format: "XML (RSS)", icon: "📋", desc: "Meta Catalog XML format", url: "https://ivpatch.com/feeds/products.xml" },
                { format: "JSON", icon: "📦", desc: "Catalog API JSON format", url: "https://ivpatch.com/feeds/products.json" },
              ].map((f) => (
                <div key={f.format} className="p-4 rounded-xl" style={{ background: "#f9fafb", border: "1px solid #eaedf0" }}>
                  <div className="text-2xl mb-2">{f.icon}</div>
                  <p className="text-sm font-bold text-[#1a1a1a] mb-0.5" style={{ fontFamily: "Satoshi, sans-serif" }}>{f.format}</p>
                  <p className="text-[10px] text-[#aaa] mb-3" style={{ fontFamily: "Satoshi, sans-serif" }}>{f.desc}</p>
                  <div className="p-2 rounded-lg font-mono text-[9px] break-all mb-2" style={{ background: "#fff", color: "#667eea", border: "1px solid #e0e7ff" }}>{f.url}</div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-1.5 rounded-lg text-[10px] font-bold text-white" style={{ background: "#1877f2", fontFamily: "Satoshi, sans-serif" }}>Copy URL</button>
                    <button className="flex-1 py-1.5 rounded-lg text-[10px] font-bold" style={{ background: "#f4f6f8", color: "#555", fontFamily: "Satoshi, sans-serif" }}>Download</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Feed fields preview */}
            <div>
              <p className="text-xs font-bold text-[#555] mb-3" style={{ fontFamily: "Satoshi, sans-serif" }}>CSV FIELD MAPPING</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { field: "id", source: "Product SKU" },
                  { field: "title", source: "Product Name" },
                  { field: "description", source: "Product Description" },
                  { field: "availability", source: "Stock > 0" },
                  { field: "condition", source: "new (always)" },
                  { field: "price", source: "Price (AED)" },
                  { field: "link", source: "Product URL" },
                  { field: "image_link", source: "Primary Image" },
                  { field: "brand", source: "IVPATCH (fixed)" },
                  { field: "gtin", source: "Barcode (if set)" },
                  { field: "google_product_category", source: "Health > Vitamins" },
                  { field: "custom_label_0", source: "Product Category" },
                ].map((m) => (
                  <div key={m.field} className="flex items-center justify-between p-2 rounded-lg" style={{ background: "#f4f6f8" }}>
                    <span className="text-[10px] font-bold font-mono text-[#667eea]">{m.field}</span>
                    <span className="text-[9px] text-[#888]" style={{ fontFamily: "Satoshi, sans-serif" }}>→ {m.source}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* COMPLIANCE TAB */}
      {tab === "Compliance" && (
        <div className="space-y-4">
          <div className="rounded-2xl p-6" style={{ background: "#fff", border: "1px solid #eaedf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-bold text-[#0f0f11]" style={{ fontFamily: "Satoshi, sans-serif" }}>Instagram Commerce Compliance</h3>
                <p className="text-xs text-[#aaa] mt-0.5" style={{ fontFamily: "Satoshi, sans-serif" }}>Required to maintain a healthy product catalog on Meta</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: "#059669", fontFamily: "Satoshi, sans-serif" }}>{compliancePass}/{complianceTotal}</div>
                <div className="text-[10px] text-[#888]" style={{ fontFamily: "Satoshi, sans-serif" }}>Checks passed</div>
              </div>
            </div>
            <div className="space-y-2.5">
              {complianceChecks.map((c) => (
                <div key={c.item} className="flex items-center gap-3 p-3.5 rounded-xl" style={{ background: "#f9fafb", border: "1px solid #eaedf0" }}>
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background: c.status === "pass" ? "#d1fae5" : c.status === "warning" ? "#fef3c7" : "#fee2e2",
                    }}
                  >
                    {c.status === "pass" ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#059669" className="w-3.5 h-3.5">
                        <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                      </svg>
                    ) : c.status === "warning" ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#d97706" className="w-3.5 h-3.5">
                        <path fillRule="evenodd" d="M6.701 2.25c.577-1 2.02-1 2.598 0l5.196 9a1.5 1.5 0 0 1-1.299 2.25H2.804a1.5 1.5 0 0 1-1.3-2.25l5.197-9ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#dc2626" className="w-3.5 h-3.5">
                        <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#1a1a1a]" style={{ fontFamily: "Satoshi, sans-serif" }}>{c.item}</p>
                    {c.status === "warning" && (
                      <p className="text-[10px] text-[#d97706] mt-0.5" style={{ fontFamily: "Satoshi, sans-serif" }}>Review product copy for unverified medical claims</p>
                    )}
                    {c.status === "fail" && (
                      <p className="text-[10px] text-[#dc2626] mt-0.5" style={{ fontFamily: "Satoshi, sans-serif" }}>Action required — configure in Pixel & CAPI tab</p>
                    )}
                  </div>
                  {c.status !== "pass" && (
                    <button className="px-2 py-1 rounded-lg text-[10px] font-bold shrink-0" style={{ background: "#fff1f1", color: "#dc2626", fontFamily: "Satoshi, sans-serif" }}>Fix</button>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-5 p-4 rounded-xl" style={{ background: "#eff6ff", border: "1px solid #bfdbfe" }}>
              <p className="text-sm font-bold text-[#1d4ed8] mb-1" style={{ fontFamily: "Satoshi, sans-serif" }}>ℹ️ Medical Claims Policy</p>
              <p className="text-xs text-[#1d4ed8]" style={{ fontFamily: "Satoshi, sans-serif" }}>
                Meta prohibits unverified medical claims. Ensure all product descriptions focus on wellness &amp; lifestyle benefits rather than medical treatments. Avoid phrases like &ldquo;cures&rdquo;, &ldquo;treats&rdquo;, &ldquo;diagnoses&rdquo;, or &ldquo;prevents disease&rdquo;.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
