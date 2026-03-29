"use client";

import { useState } from "react";

const pages = [
  { id: 1, title: "Home Page", slug: "/", type: "Builder", lastEdited: "Mar 21, 2024", status: "Published" },
  { id: 2, title: "Our Mission", slug: "/our-mission", type: "Marketing", lastEdited: "Mar 18, 2024", status: "Published" },
  { id: 3, title: "Science Behind IV", slug: "/science", type: "Marketing", lastEdited: "Mar 15, 2024", status: "Published" },
  { id: 4, title: "FAQs", slug: "/faqs", type: "Marketing", lastEdited: "Mar 10, 2024", status: "Published" },
  { id: 5, title: "About Us", slug: "/about", type: "Marketing", lastEdited: "Mar 8, 2024", status: "Draft" },
  { id: 6, title: "Contact", slug: "/contact", type: "Marketing", lastEdited: "Mar 5, 2024", status: "Published" },
];

const articles = [
  { id: 1, title: "The Science of Transdermal Patches", date: "Mar 20, 2024", status: "Published", views: 1204 },
  { id: 2, title: "Top 5 Vitamins for UAE Summer", date: "Mar 15, 2024", status: "Published", views: 876 },
  { id: 3, title: "How to Build a Wellness Routine", date: "Mar 10, 2024", status: "Draft", views: 0 },
];

const homeBlocks = [
  { id: "hero", label: "🎯 Hero Banner", active: true },
  { id: "benefits", label: "✅ Benefits", active: true },
  { id: "featured", label: "🛍 Featured Products", active: true },
  { id: "testimonials", label: "⭐ Testimonials", active: true },
  { id: "instagram", label: "📸 Instagram Feed", active: false },
  { id: "newsletter", label: "📧 Newsletter", active: true },
];

const mediaFiles = [
  { name: "hero-patch.jpg", size: "340 KB", type: "image" },
  { name: "b12-patch.png", size: "210 KB", type: "image" },
  { name: "energy-bundle.png", size: "195 KB", type: "image" },
  { name: "logo-white.svg", size: "12 KB", type: "svg" },
  { name: "mission-bg.jpg", size: "520 KB", type: "image" },
  { name: "testimonial-1.jpg", size: "88 KB", type: "image" },
];

const cmsNavTabs = ["Pages", "Blog", "Media Library", "SEO"];

export default function CMSSection() {
  const [tab, setTab] = useState("Pages");
  const [blocks, setBlocks] = useState(homeBlocks);

  const toggleBlock = (id: string) => {
    setBlocks((prev) => prev.map((b) => b.id === id ? { ...b, active: !b.active } : b));
  };

  return (
    <div className="space-y-5">
      {/* Tab nav */}
      <div className="flex items-center gap-1 p-1 rounded-2xl" style={{ background: "#fff", border: "1px solid #eaedf0", width: "fit-content" }}>
        {cmsNavTabs.map((t) => (
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

      {/* Pages Tab */}
      {tab === "Pages" && (
        <div className="space-y-4">
          {/* Home Page Builder */}
          <div className="rounded-2xl p-6" style={{ background: "#fff", border: "1px solid #eaedf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-[#0f0f11]" style={{ fontFamily: "Satoshi, sans-serif" }}>Home Page Builder</h3>
                <p className="text-xs text-[#aaa]" style={{ fontFamily: "Satoshi, sans-serif" }}>Toggle and reorder page sections</p>
              </div>
              <button
                className="px-4 py-2 rounded-xl text-xs font-bold text-white"
                style={{ background: "linear-gradient(135deg,#667eea,#764ba2)", fontFamily: "Satoshi, sans-serif" }}
              >
                Save Layout
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {blocks.map((b) => (
                <div
                  key={b.id}
                  onClick={() => toggleBlock(b.id)}
                  className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all"
                  style={{
                    border: `1.5px solid ${b.active ? "#667eea" : "#eaedf0"}`,
                    background: b.active ? "#f0f0fe" : "#f9fafb",
                  }}
                >
                  <div
                    className="w-9 h-5 rounded-full flex items-center px-0.5 transition-all shrink-0"
                    style={{ background: b.active ? "#667eea" : "#d1d5db" }}
                  >
                    <div
                      className="w-4 h-4 rounded-full bg-white transition-transform shadow-sm"
                      style={{ transform: b.active ? "translateX(16px)" : "translateX(0)" }}
                    />
                  </div>
                  <span className="text-xs font-medium text-[#1a1a1a]" style={{ fontFamily: "Satoshi, sans-serif" }}>{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* All Pages */}
          <div className="rounded-2xl overflow-hidden" style={{ background: "#fff", border: "1px solid #eaedf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid #eaedf0" }}>
              <h3 className="text-sm font-bold text-[#0f0f11]" style={{ fontFamily: "Satoshi, sans-serif" }}>All Pages</h3>
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white"
                style={{ background: "#0f0f11", fontFamily: "Satoshi, sans-serif" }}
              >
                + New Page
              </button>
            </div>
            <table className="w-full">
              <thead>
                <tr style={{ background: "#f9fafb", borderBottom: "1px solid #eaedf0" }}>
                  {["Page", "URL", "Type", "Last Edited", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-[#888] uppercase tracking-wider" style={{ fontFamily: "Satoshi, sans-serif" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: "#f4f6f8" }}>
                {pages.map((p) => (
                  <tr key={p.id} className="hover:bg-[#f9fafb] transition-colors">
                    <td className="px-5 py-3.5 text-sm font-semibold text-[#1a1a1a]" style={{ fontFamily: "Satoshi, sans-serif" }}>{p.title}</td>
                    <td className="px-5 py-3.5 text-xs font-mono text-[#667eea]">{p.slug}</td>
                    <td className="px-5 py-3.5 text-xs text-[#888]" style={{ fontFamily: "Satoshi, sans-serif" }}>{p.type}</td>
                    <td className="px-5 py-3.5 text-xs text-[#aaa]" style={{ fontFamily: "Satoshi, sans-serif" }}>{p.lastEdited}</td>
                    <td className="px-5 py-3.5">
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={p.status === "Published" ? { background: "#ecfdf5", color: "#059669" } : { background: "#fffbeb", color: "#d97706" }}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <button className="px-2 py-1 rounded-lg text-xs font-semibold" style={{ background: "#f4f6f8", color: "#555", fontFamily: "Satoshi, sans-serif" }}>Edit</button>
                        <button className="px-2 py-1 rounded-lg text-xs font-semibold" style={{ background: "#eff6ff", color: "#2563eb", fontFamily: "Satoshi, sans-serif" }}>SEO</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Blog Tab */}
      {tab === "Blog" && (
        <div className="rounded-2xl overflow-hidden" style={{ background: "#fff", border: "1px solid #eaedf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid #eaedf0" }}>
            <h3 className="text-sm font-bold text-[#0f0f11]" style={{ fontFamily: "Satoshi, sans-serif" }}>Blog Articles</h3>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white" style={{ background: "#0f0f11", fontFamily: "Satoshi, sans-serif" }}>
              + New Article
            </button>
          </div>
          <div className="divide-y" style={{ borderColor: "#f4f6f8" }}>
            {articles.map((a) => (
              <div key={a.id} className="flex items-center gap-4 px-6 py-4 hover:bg-[#f9fafb] transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-[#1a1a1a] truncate" style={{ fontFamily: "Satoshi, sans-serif" }}>{a.title}</div>
                  <div className="text-xs text-[#aaa] mt-0.5" style={{ fontFamily: "Satoshi, sans-serif" }}>{a.date} · {a.views.toLocaleString()} views</div>
                </div>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0"
                  style={a.status === "Published" ? { background: "#ecfdf5", color: "#059669" } : { background: "#fffbeb", color: "#d97706" }}
                >
                  {a.status}
                </span>
                <button className="px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0" style={{ background: "#f4f6f8", color: "#555", fontFamily: "Satoshi, sans-serif" }}>Edit</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Media Library Tab */}
      {tab === "Media Library" && (
        <div className="space-y-4">
          <div
            className="border-2 border-dashed rounded-2xl p-8 flex flex-col items-center gap-3"
            style={{ borderColor: "#c7d2fe", background: "#f8f7ff" }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "#e8eaf6" }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.4} stroke="#667eea" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-[#1a1a1a]" style={{ fontFamily: "Satoshi, sans-serif" }}>Drop files here or click to upload</p>
              <p className="text-xs text-[#888] mt-0.5" style={{ fontFamily: "Satoshi, sans-serif" }}>PNG, JPG, SVG, GIF up to 10MB</p>
            </div>
            <button className="px-6 py-2 rounded-xl text-xs font-bold text-white" style={{ background: "#667eea", fontFamily: "Satoshi, sans-serif" }}>Browse Files</button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
            {mediaFiles.map((f) => (
              <div key={f.name} className="rounded-xl overflow-hidden" style={{ background: "#fff", border: "1px solid #eaedf0" }}>
                <div className="h-20 flex items-center justify-center" style={{ background: "#f4f6f8" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.4} stroke="#ccc" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                </div>
                <div className="px-2 py-1.5">
                  <p className="text-[10px] font-semibold text-[#333] truncate" style={{ fontFamily: "Satoshi, sans-serif" }}>{f.name}</p>
                  <p className="text-[9px] text-[#aaa]">{f.size}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SEO Tab */}
      {tab === "SEO" && (
        <div className="space-y-4">
          <div className="rounded-2xl p-6" style={{ background: "#fff", border: "1px solid #eaedf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <h3 className="text-sm font-bold text-[#0f0f11] mb-4" style={{ fontFamily: "Satoshi, sans-serif" }}>SEO Settings — Home Page</h3>
            <div className="space-y-4">
              {[
                { label: "Meta Title", placeholder: "IV PATCH – Wellness Patches", maxLen: 60 },
                { label: "Meta Description", placeholder: "Care that fits life. Discover IVPATCH wellness patches designed to fit seamlessly into your daily routine.", maxLen: 160 },
                { label: "OG Image URL", placeholder: "https://ivpatch.com/og-image.jpg", maxLen: undefined },
                { label: "URL Slug", placeholder: "/", maxLen: undefined },
              ].map((f) => (
                <div key={f.label}>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-[#555]" style={{ fontFamily: "Satoshi, sans-serif" }}>{f.label}</label>
                    {f.maxLen && <span className="text-[10px] text-[#aaa]">Max {f.maxLen} chars</span>}
                  </div>
                  <input
                    placeholder={f.placeholder}
                    className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                    style={{ background: "#f7f7f7", border: "1.5px solid #ebebeb", color: "#1a1a1a", fontFamily: "Satoshi, sans-serif" }}
                    onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                    onBlur={(e) => (e.target.style.borderColor = "#ebebeb")}
                  />
                </div>
              ))}
              <div className="flex items-center gap-3">
                <button className="px-4 py-2.5 rounded-xl text-xs font-bold text-white" style={{ background: "#0f0f11", fontFamily: "Satoshi, sans-serif" }}>Save SEO Settings</button>
                <button className="px-4 py-2.5 rounded-xl text-xs font-bold" style={{ background: "#f4f6f8", color: "#555", fontFamily: "Satoshi, sans-serif" }}>Generate Sitemap</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
