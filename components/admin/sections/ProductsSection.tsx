"use client";

import { useState } from "react";

type Variant = { name: string; sku: string; price: string; stock: number };
type Product = {
  id: number; name: string; sku: string; price: string; stock: number;
  status: string; category: string; variants: Variant[]; sales: number; description: string;
};

const initialProducts: Product[] = [
  {
    id: 1, name: "Vitamin B12 Patch", sku: "IVP-B12-001", price: "AED 44", stock: 84,
    status: "Active", category: "Vitamins", sales: 342,
    description: "High-absorption B12 delivered transdermally for energy & brain health.",
    variants: [
      { name: "Single Patch", sku: "IVP-B12-001-S", price: "AED 44", stock: 40 },
      { name: "Pack of 3", sku: "IVP-B12-001-P3", price: "AED 120", stock: 24 },
      { name: "Pack of 6", sku: "IVP-B12-001-P6", price: "AED 220", stock: 20 },
    ],
  },
  {
    id: 2, name: "Energy Boost Bundle", sku: "IVP-ENR-002", price: "AED 142", stock: 42,
    status: "Active", category: "Bundles", sales: 218,
    description: "Wellness bundle combining B12, D3, and Energy patches for daily vitality.",
    variants: [
      { name: "Starter Bundle", sku: "IVP-ENR-002-ST", price: "AED 142", stock: 42 },
    ],
  },
  {
    id: 3, name: "Sleep & Recovery Patch", sku: "IVP-SLP-003", price: "AED 65", stock: 120,
    status: "Active", category: "Recovery", sales: 197,
    description: "Magnesium & melatonin patch for deep sleep and muscle recovery.",
    variants: [
      { name: "Single (30-day)", sku: "IVP-SLP-003-M", price: "AED 65", stock: 80 },
      { name: "Pack of 2", sku: "IVP-SLP-003-P2", price: "AED 118", stock: 40 },
    ],
  },
  {
    id: 4, name: "Immunity Shield Pack", sku: "IVP-IMM-004", price: "AED 220", stock: 18,
    status: "Active", category: "Immunity", sales: 156,
    description: "4-in-1 immunity support combining Zinc, Vitamin C, D3, and elderberry.",
    variants: [
      { name: "Small (7-day)", sku: "IVP-IMM-004-SM", price: "AED 80", stock: 8 },
      { name: "Medium (14-day)", sku: "IVP-IMM-004-MD", price: "AED 148", stock: 6 },
      { name: "Large (30-day)", sku: "IVP-IMM-004-LG", price: "AED 220", stock: 4 },
    ],
  },
  {
    id: 5, name: "Vitamin D3 Patch", sku: "IVP-D3-005", price: "AED 49", stock: 0,
    status: "Archived", category: "Vitamins", sales: 98,
    description: "D3 + K2 combo patch for bone health and immune support.",
    variants: [{ name: "Single Patch", sku: "IVP-D3-005-S", price: "AED 49", stock: 0 }],
  },
  {
    id: 6, name: "Detox Cleanse Patch", sku: "IVP-DTX-006", price: "AED 82", stock: 200,
    status: "Draft", category: "Wellness", sales: 0,
    description: "Charcoal & ginger patch for gentle daily detox support.",
    variants: [
      { name: "Sensitive Formula", sku: "IVP-DTX-006-SF", price: "AED 82", stock: 100 },
      { name: "Intensive Formula", sku: "IVP-DTX-006-IF", price: "AED 99", stock: 100 },
    ],
  },
];

const statusStyle: Record<string, { bg: string; color: string }> = {
  Active: { bg: "#ecfdf5", color: "#059669" },
  Draft: { bg: "#fffbeb", color: "#d97706" },
  Archived: { bg: "#f4f6f8", color: "#888" },
};

const productTabs = ["All Products", "Variants", "Bundles"];

function VariantRow({ variant, onDelete }: { variant: Variant; onDelete: () => void }) {
  return (
    <div className="flex items-center gap-3 py-2.5 px-3 rounded-xl" style={{ background: "#f9fafb", border: "1px solid #eaedf0" }}>
      <div className="flex-1 min-w-0 grid grid-cols-2 sm:grid-cols-4 gap-2">
        <input defaultValue={variant.name} className="px-2 py-1 rounded-lg text-xs outline-none" style={{ background: "#fff", border: "1px solid #e5e7eb", color: "#1a1a1a", fontFamily: "Satoshi, sans-serif" }} />
        <input defaultValue={variant.sku} className="px-2 py-1 rounded-lg text-xs font-mono outline-none" style={{ background: "#fff", border: "1px solid #e5e7eb", color: "#667eea" }} />
        <input defaultValue={variant.price} className="px-2 py-1 rounded-lg text-xs outline-none" style={{ background: "#fff", border: "1px solid #e5e7eb", color: "#1a1a1a", fontFamily: "Satoshi, sans-serif" }} />
        <input defaultValue={String(variant.stock)} className="px-2 py-1 rounded-lg text-xs outline-none" style={{ background: "#fff", border: "1px solid #e5e7eb", color: variant.stock < 10 ? "#dc2626" : "#1a1a1a", fontFamily: "Satoshi, sans-serif" }} />
      </div>
      <button onClick={onDelete} className="p-1 rounded-lg shrink-0" style={{ background: "#fff1f1" }}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#dc2626" className="w-3 h-3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

export default function ProductsSection() {
  const [activeTab, setActiveTab] = useState("All Products");
  const [search, setSearch] = useState("");
  const [addModal, setAddModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [newProduct, setNewProduct] = useState({ name: "", sku: "", price: "", stock: "", category: "", description: "" });
  const [newVariants, setNewVariants] = useState<Variant[]>([{ name: "", sku: "", price: "", stock: 0 }]);

  const filtered = productList.filter(
    (p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase())
  );
  const lowStock = productList.filter((p) => p.stock > 0 && p.stock < 25);
  const outOfStock = productList.filter((p) => p.stock === 0);
  const bundles = productList.filter((p) => p.category === "Bundles");

  const handleAdd = () => {
    if (!newProduct.name || !newProduct.sku) return;
    const product: Product = {
      id: productList.length + 1,
      name: newProduct.name,
      sku: newProduct.sku,
      price: `AED ${newProduct.price}`,
      stock: parseInt(newProduct.stock) || 0,
      status: "Draft",
      category: newProduct.category || "General",
      variants: newVariants.filter((v) => v.name),
      sales: 0,
      description: newProduct.description,
    };
    setProductList([product, ...productList]);
    setNewProduct({ name: "", sku: "", price: "", stock: "", category: "", description: "" });
    setNewVariants([{ name: "", sku: "", price: "", stock: 0 }]);
    setAddModal(false);
  };

  const addVariant = () => setNewVariants([...newVariants, { name: "", sku: "", price: "", stock: 0 }]);
  const removeVariant = (i: number) => setNewVariants(newVariants.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-5">
      {/* Alerts */}
      {(lowStock.length > 0 || outOfStock.length > 0) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {lowStock.length > 0 && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: "#fffbeb", border: "1px solid #fde68a" }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="#d97706" className="w-5 h-5 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
              <span className="text-sm font-semibold text-[#92400e]" style={{ fontFamily: "Satoshi, sans-serif" }}>
                {lowStock.length} product{lowStock.length > 1 ? "s" : ""} with low stock (&lt;25 units)
              </span>
            </div>
          )}
          {outOfStock.length > 0 && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: "#fff1f1", border: "1px solid #fecaca" }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="#dc2626" className="w-5 h-5 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
              <span className="text-sm font-semibold text-[#991b1b]" style={{ fontFamily: "Satoshi, sans-serif" }}>
                {outOfStock.length} product{outOfStock.length > 1 ? "s" : ""} out of stock
              </span>
            </div>
          )}
        </div>
      )}

      {/* Tab Nav + Toolbar */}
      <div className="rounded-2xl p-4" style={{ background: "#fff", border: "1px solid #eaedf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: "#f4f6f8" }}>
            {productTabs.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={{
                  background: activeTab === t ? "#fff" : "transparent",
                  color: activeTab === t ? "#1a1a1a" : "#888",
                  boxShadow: activeTab === t ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                  fontFamily: "Satoshi, sans-serif",
                }}
              >
                {t}
                {t === "Bundles" && <span className="ml-1.5 text-[9px] font-bold px-1 py-0.5 rounded-full" style={{ background: "#f0f0fe", color: "#667eea" }}>{bundles.length}</span>}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 px-3 py-2 rounded-xl flex-1 min-w-[200px]" style={{ background: "#f4f6f8", border: "1px solid #eaedf0" }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="#aaa" className="w-4 h-4 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products or SKU..." className="flex-1 outline-none bg-transparent text-sm" style={{ color: "#333", fontFamily: "Satoshi, sans-serif" }} />
          </div>

          <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold" style={{ background: "#f4f6f8", color: "#555", border: "1px solid #eaedf0", fontFamily: "Satoshi, sans-serif" }}>
            📥 Import CSV
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold" style={{ background: "#f4f6f8", color: "#555", border: "1px solid #eaedf0", fontFamily: "Satoshi, sans-serif" }}>
            📤 Export CSV
          </button>
          <button
            onClick={() => setAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white ml-auto"
            style={{ background: "#0f0f11", fontFamily: "Satoshi, sans-serif" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Product
          </button>
        </div>
      </div>

      {/* Add Product Modal */}
      {addModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-2xl overflow-hidden" style={{ background: "#fff", boxShadow: "0 20px 60px rgba(0,0,0,0.2)", maxHeight: "90vh", overflowY: "auto" }}>
            <div className="flex items-center justify-between px-6 py-4 sticky top-0 bg-white" style={{ borderBottom: "1px solid #eaedf0" }}>
              <h3 className="text-base font-bold text-[#0f0f11]" style={{ fontFamily: "Satoshi, sans-serif" }}>New Product</h3>
              <button onClick={() => setAddModal(false)} className="p-1.5 rounded-lg" style={{ background: "#f4f6f8" }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="#888" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-5">
              {/* Basic Info */}
              <div>
                <p className="text-xs font-bold text-[#555] mb-3 uppercase tracking-wider" style={{ fontFamily: "Satoshi, sans-serif" }}>Basic Info</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { k: "name", l: "Product Name", p: "e.g. Magnesium Sleep Patch" },
                    { k: "sku", l: "Base SKU", p: "e.g. IVP-MGN-007" },
                    { k: "price", l: "Base Price (AED)", p: "e.g. 79" },
                    { k: "stock", l: "Initial Stock", p: "e.g. 100" },
                    { k: "category", l: "Category", p: "e.g. Wellness" },
                  ].map((f) => (
                    <div key={f.k}>
                      <label className="block text-xs font-semibold text-[#555] mb-1" style={{ fontFamily: "Satoshi, sans-serif" }}>{f.l}</label>
                      <input
                        value={newProduct[f.k as keyof typeof newProduct]}
                        onChange={(e) => setNewProduct({ ...newProduct, [f.k]: e.target.value })}
                        placeholder={f.p}
                        className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                        style={{ background: "#f7f7f7", border: "1.5px solid #ebebeb", color: "#1a1a1a", fontFamily: "Satoshi, sans-serif" }}
                        onFocus={(e) => (e.target.style.borderColor = "#1a1a1a")}
                        onBlur={(e) => (e.target.style.borderColor = "#ebebeb")}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-semibold text-[#555] mb-1" style={{ fontFamily: "Satoshi, sans-serif" }}>Status</label>
                    <select className="w-full px-3 py-2 rounded-xl text-sm outline-none" style={{ background: "#f7f7f7", border: "1.5px solid #ebebeb", color: "#1a1a1a", fontFamily: "Satoshi, sans-serif" }}>
                      <option>Draft</option>
                      <option>Active</option>
                    </select>
                  </div>
                </div>
                <div className="mt-3">
                  <label className="block text-xs font-semibold text-[#555] mb-1" style={{ fontFamily: "Satoshi, sans-serif" }}>Description</label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    rows={3} placeholder="Product description for Meta catalog, website, and SEO..."
                    className="w-full px-3 py-2 rounded-xl text-sm outline-none resize-none"
                    style={{ background: "#f7f7f7", border: "1.5px solid #ebebeb", color: "#1a1a1a", fontFamily: "Satoshi, sans-serif" }}
                    onFocus={(e) => (e.target.style.borderColor = "#1a1a1a")}
                    onBlur={(e) => (e.target.style.borderColor = "#ebebeb")}
                  />
                </div>
              </div>

              {/* Variants */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-bold text-[#555] uppercase tracking-wider" style={{ fontFamily: "Satoshi, sans-serif" }}>Variants / Options</p>
                  <button onClick={addVariant} className="flex items-center gap-1 text-xs font-semibold" style={{ color: "#667eea", fontFamily: "Satoshi, sans-serif" }}>
                    + Add Variant
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2 px-3">
                  {["Variant Name", "SKU", "Price (AED)", "Stock"].map((h) => (
                    <span key={h} className="text-[10px] font-bold text-[#888] uppercase" style={{ fontFamily: "Satoshi, sans-serif" }}>{h}</span>
                  ))}
                </div>
                <div className="space-y-2">
                  {newVariants.map((v, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { k: "name", p: "e.g. Pack of 3" },
                          { k: "sku", p: "e.g. IVP-001-P3" },
                          { k: "price", p: "e.g. 120" },
                          { k: "stock", p: "e.g. 50" },
                        ].map((f) => (
                          <input
                            key={f.k}
                            value={f.k === "stock" ? String(v[f.k]) : v[f.k as "name" | "sku" | "price"]}
                            onChange={(e) => {
                              const updated = [...newVariants];
                              (updated[i] as Record<string, string | number>)[f.k] = f.k === "stock" ? parseInt(e.target.value) || 0 : e.target.value;
                              setNewVariants(updated);
                            }}
                            placeholder={f.p}
                            className="px-2 py-2 rounded-lg text-xs outline-none"
                            style={{ background: "#f7f7f7", border: "1px solid #ebebeb", color: "#1a1a1a", fontFamily: f.k === "sku" ? "monospace" : "Satoshi, sans-serif" }}
                          />
                        ))}
                      </div>
                      <button onClick={() => removeVariant(i)} className="p-1.5 rounded-lg shrink-0" style={{ background: "#fff1f1" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#dc2626" className="w-3.5 h-3.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <p className="text-xs font-bold text-[#555] mb-3 uppercase tracking-wider" style={{ fontFamily: "Satoshi, sans-serif" }}>Product Images</p>
                <div className="border-2 border-dashed rounded-xl p-6 flex flex-col items-center gap-2 cursor-pointer" style={{ borderColor: "#c7d2fe", background: "#f8f7ff" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.4} stroke="#667eea" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                  <p className="text-sm font-semibold text-[#1a1a1a]" style={{ fontFamily: "Satoshi, sans-serif" }}>Drop images or click to upload</p>
                  <p className="text-xs text-[#aaa]" style={{ fontFamily: "Satoshi, sans-serif" }}>PNG, JPG, WebP up to 10MB · First image = primary</p>
                  <button className="px-4 py-1.5 rounded-xl text-xs font-bold text-white" style={{ background: "#667eea" }}>Browse</button>
                </div>
              </div>
            </div>
            <div className="flex gap-3 px-6 pb-6">
              <button onClick={() => setAddModal(false)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold" style={{ background: "#f4f6f8", color: "#555", fontFamily: "Satoshi, sans-serif" }}>Cancel</button>
              <button onClick={handleAdd} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: "#0f0f11", fontFamily: "Satoshi, sans-serif" }}>Save Product</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Variants Panel */}
      {editProduct && (
        <div className="rounded-2xl p-6" style={{ background: "#fff", border: "1px solid #667eea", boxShadow: "0 4px 16px rgba(102,126,234,0.1)" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-[#0f0f11]" style={{ fontFamily: "Satoshi, sans-serif" }}>
                Editing variants for: {editProduct.name}
              </h3>
              <p className="text-xs text-[#888]" style={{ fontFamily: "Satoshi, sans-serif" }}>All inventory counts update in real-time</p>
            </div>
            <button onClick={() => setEditProduct(null)} className="p-1.5 rounded-lg" style={{ background: "#f4f6f8" }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="#888" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2 mb-2 px-3">
            {["Variant Name", "SKU", "Price", "Stock"].map((h) => (
              <span key={h} className="text-[10px] font-bold text-[#888] uppercase" style={{ fontFamily: "Satoshi, sans-serif" }}>{h}</span>
            ))}
          </div>
          <div className="space-y-2 mb-3">
            {editProduct.variants.map((v, i) => (
              <VariantRow key={i} variant={v} onDelete={() => {
                const updated = { ...editProduct, variants: editProduct.variants.filter((_, idx) => idx !== i) };
                setEditProduct(updated);
                setProductList(productList.map((p) => p.id === updated.id ? updated : p));
              }} />
            ))}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                const updated = { ...editProduct, variants: [...editProduct.variants, { name: "New Variant", sku: `${editProduct.sku}-NEW`, price: editProduct.price, stock: 0 }] };
                setEditProduct(updated);
                setProductList(productList.map((p) => p.id === updated.id ? updated : p));
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold"
              style={{ background: "#f0f0fe", color: "#667eea", fontFamily: "Satoshi, sans-serif" }}
            >
              + Add Variant
            </button>
            <button className="px-4 py-2 rounded-xl text-xs font-bold text-white" style={{ background: "#0f0f11", fontFamily: "Satoshi, sans-serif" }}>Save Changes</button>
          </div>
        </div>
      )}

      {/* ALL PRODUCTS TAB */}
      {activeTab === "All Products" && (
        <div className="rounded-2xl overflow-hidden" style={{ background: "#fff", border: "1px solid #eaedf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: "#f9fafb", borderBottom: "1px solid #eaedf0" }}>
                  {["Product", "SKU", "Category", "Price", "Stock", "Variants", "Sales", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[10px] font-bold text-[#888] uppercase tracking-wider whitespace-nowrap" style={{ fontFamily: "Satoshi, sans-serif" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: "#f4f6f8" }}>
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-[#f9fafb] transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl shrink-0 flex items-center justify-center text-white text-xs font-bold" style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}>IV</div>
                        <div>
                          <div className="text-sm font-semibold text-[#1a1a1a]" style={{ fontFamily: "Satoshi, sans-serif" }}>{p.name}</div>
                          <div className="text-[10px] text-[#aaa] line-clamp-1" style={{ fontFamily: "Satoshi, sans-serif", maxWidth: 160 }}>{p.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-xs font-mono text-[#667eea]">{p.sku}</td>
                    <td className="px-4 py-3.5 text-xs text-[#888]" style={{ fontFamily: "Satoshi, sans-serif" }}>{p.category}</td>
                    <td className="px-4 py-3.5 text-sm font-bold text-[#1a1a1a]" style={{ fontFamily: "Satoshi, sans-serif" }}>{p.price}</td>
                    <td className="px-4 py-3.5">
                      <span className="text-sm font-bold" style={{ color: p.stock === 0 ? "#dc2626" : p.stock < 25 ? "#d97706" : "#059669", fontFamily: "Satoshi, sans-serif" }}>
                        {p.stock}
                      </span>
                      {p.stock > 0 && p.stock < 25 && <span className="text-[10px] text-[#d97706] ml-1">⚠</span>}
                    </td>
                    <td className="px-4 py-3.5">
                      <button
                        onClick={() => setEditProduct(editProduct?.id === p.id ? null : p)}
                        className="text-xs font-semibold px-2 py-1 rounded-lg transition-all"
                        style={{ background: editProduct?.id === p.id ? "#f0f0fe" : "#f4f6f8", color: editProduct?.id === p.id ? "#667eea" : "#555", fontFamily: "Satoshi, sans-serif" }}
                      >
                        {p.variants.length} variant{p.variants.length !== 1 ? "s" : ""}
                      </button>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-[#555]" style={{ fontFamily: "Satoshi, sans-serif" }}>{p.sales}</td>
                    <td className="px-4 py-3.5">
                      <select
                        className="text-[10px] font-bold px-2 py-1 rounded-full outline-none cursor-pointer"
                        style={statusStyle[p.status]}
                        onChange={(e) => setProductList(productList.map((prod) => prod.id === p.id ? { ...prod, status: e.target.value } : prod))}
                        value={p.status}
                      >
                        <option>Active</option>
                        <option>Draft</option>
                        <option>Archived</option>
                      </select>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => setEditProduct(p)} className="px-2 py-1 rounded-lg text-xs font-semibold" style={{ background: "#f4f6f8", color: "#555", fontFamily: "Satoshi, sans-serif" }}>Edit</button>
                        <button onClick={() => setProductList(productList.filter((prod) => prod.id !== p.id))} className="px-2 py-1 rounded-lg text-xs font-semibold" style={{ background: "#fff1f1", color: "#dc2626", fontFamily: "Satoshi, sans-serif" }}>Del</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VARIANTS TAB */}
      {activeTab === "Variants" && (
        <div className="rounded-2xl" style={{ background: "#fff", border: "1px solid #eaedf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <div className="px-6 py-4" style={{ borderBottom: "1px solid #eaedf0" }}>
            <h3 className="text-sm font-bold text-[#0f0f11]" style={{ fontFamily: "Satoshi, sans-serif" }}>All Variants Across Products</h3>
            <p className="text-xs text-[#aaa] mt-0.5" style={{ fontFamily: "Satoshi, sans-serif" }}>
              Total: {productList.reduce((acc, p) => acc + p.variants.length, 0)} variants · {productList.reduce((acc, p) => acc + p.variants.filter(v => v.stock === 0).length, 0)} out of stock
            </p>
          </div>
          <div className="divide-y" style={{ borderColor: "#f4f6f8" }}>
            {productList.map((p) =>
              p.variants.map((v) => (
                <div key={v.sku} className="flex items-center gap-4 px-6 py-3 hover:bg-[#f9fafb] transition-colors">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: p.status === "Active" ? "#10b981" : "#d1d5db" }} />
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-[#aaa] mr-2" style={{ fontFamily: "Satoshi, sans-serif" }}>{p.name}</span>
                    <span className="text-sm font-semibold text-[#1a1a1a]" style={{ fontFamily: "Satoshi, sans-serif" }}>{v.name}</span>
                  </div>
                  <span className="text-xs font-mono text-[#667eea]">{v.sku}</span>
                  <span className="text-sm font-bold text-[#1a1a1a]" style={{ fontFamily: "Satoshi, sans-serif" }}>{v.price}</span>
                  <span className="text-sm font-bold" style={{ color: v.stock === 0 ? "#dc2626" : v.stock < 10 ? "#d97706" : "#059669", fontFamily: "Satoshi, sans-serif" }}>{v.stock} units</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* BUNDLES TAB */}
      {activeTab === "Bundles" && (
        <div className="space-y-4">
          <div className="rounded-2xl p-6" style={{ background: "#fff", border: "1px solid #eaedf0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-[#0f0f11]" style={{ fontFamily: "Satoshi, sans-serif" }}>Bundle / Kit Configuration</h3>
                <p className="text-xs text-[#aaa] mt-0.5" style={{ fontFamily: "Satoshi, sans-serif" }}>Build multi-product kits with combined pricing</p>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white" style={{ background: "#0f0f11", fontFamily: "Satoshi, sans-serif" }}>+ Create Bundle</button>
            </div>
            <div className="space-y-4">
              {bundles.map((bundle) => (
                <div key={bundle.id} className="p-5 rounded-xl" style={{ background: "#f9fafb", border: "1px solid #eaedf0" }}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-sm font-bold text-[#1a1a1a]" style={{ fontFamily: "Satoshi, sans-serif" }}>{bundle.name}</p>
                      <p className="text-xs text-[#888]" style={{ fontFamily: "Satoshi, sans-serif" }}>{bundle.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-[#667eea]" style={{ fontFamily: "Satoshi, sans-serif" }}>{bundle.price}</div>
                      <div className="text-[10px] text-[#aaa]">{bundle.stock} in stock</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Vitamin B12 Patch ×1", "Vitamin D3 Patch ×1", "Sleep Patch ×1"].map((item) => (
                      <span key={item} className="text-[10px] font-semibold px-2 py-1 rounded-lg" style={{ background: "#e8eaf6", color: "#667eea" }}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* New Bundle Builder */}
            <div className="mt-5 p-5 rounded-xl" style={{ background: "#f0f0fe", border: "2px dashed #c7d2fe" }}>
              <p className="text-xs font-bold text-[#667eea] mb-3" style={{ fontFamily: "Satoshi, sans-serif" }}>+ Quick Bundle Builder</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-[10px] font-semibold text-[#667eea] mb-1">Bundle Name</label>
                  <input placeholder="e.g. Immunity + Sleep Bundle" className="w-full px-3 py-2 rounded-xl text-xs outline-none" style={{ background: "#fff", border: "1.5px solid #c7d2fe", color: "#1a1a1a", fontFamily: "Satoshi, sans-serif" }} />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-[#667eea] mb-1">Bundle Price (AED)</label>
                  <input placeholder="e.g. 189" className="w-full px-3 py-2 rounded-xl text-xs outline-none" style={{ background: "#fff", border: "1.5px solid #c7d2fe", color: "#1a1a1a", fontFamily: "Satoshi, sans-serif" }} />
                </div>
              </div>
              <div className="mb-3">
                <label className="block text-[10px] font-semibold text-[#667eea] mb-1">Select Products</label>
                <div className="flex flex-wrap gap-2">
                  {productList.filter(p => p.status === "Active").map((p) => (
                    <label key={p.id} className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-[10px]" style={{ fontFamily: "Satoshi, sans-serif", color: "#667eea" }}>{p.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <button className="px-4 py-2 rounded-xl text-xs font-bold text-white" style={{ background: "#667eea", fontFamily: "Satoshi, sans-serif" }}>Create Bundle</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
