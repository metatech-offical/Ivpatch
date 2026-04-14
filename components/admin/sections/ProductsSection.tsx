"use client";

import { useState, useEffect } from "react";
import { getProducts, createProduct, updateProduct, deleteProduct, createVariant, updateVariant, deleteVariant, addProductImageUrl } from "@/lib/supabase/products";
import { supabase } from "@/lib/supabase/client";
import type { ProductWithRelations, ProductVariant } from "@/lib/supabase/types";

const statusStyle: Record<string, { bg: string; color: string }> = {
  active: { bg: "#ecfdf5", color: "#059669" },
  draft: { bg: "#fffbeb", color: "#d97706" },
  archived: { bg: "#f4f6f8", color: "#888" },
};

const productTabs = ["All Products", "Variants", "Bundles"];

// Convert DB style to UI style
function VariantRow({ variant, onUpdate, onDelete }: { variant: ProductVariant; onUpdate: (v: Partial<ProductVariant>) => void; onDelete: () => void }) {
  return (
    <div className="flex items-center gap-3 py-2.5 px-3 rounded-xl" style={{ background: "#f9fafb", border: "1px solid #eaedf0" }}>
      <div className="flex-1 min-w-0 grid grid-cols-2 sm:grid-cols-4 gap-2">
        <input value={variant.variant_name} onChange={e => onUpdate({ variant_name: e.target.value })} className="px-2 py-1 rounded-lg text-xs outline-none bg-white border border-[#e5e7eb] text-[#1a1a1a] font-['Satoshi']" />
        <input value={variant.sku || ""} onChange={e => onUpdate({ sku: e.target.value })} className="px-2 py-1 rounded-lg text-xs font-mono outline-none bg-white border border-[#e5e7eb] text-[#667eea]" />
        <input type="number" value={variant.price} onChange={e => onUpdate({ price: parseFloat(e.target.value) || 0 })} className="px-2 py-1 rounded-lg text-xs outline-none bg-white border border-[#e5e7eb] text-[#1a1a1a] font-['Satoshi']" />
        <input type="number" value={variant.inventory_quantity} onChange={e => onUpdate({ inventory_quantity: parseInt(e.target.value) || 0 })} className="px-2 py-1 rounded-lg text-xs outline-none bg-white border border-[#e5e7eb] font-['Satoshi']" style={{ color: variant.inventory_quantity < 10 ? "#dc2626" : "#1a1a1a" }} />
      </div>
      <button onClick={onDelete} className="p-1 rounded-lg shrink-0 bg-[#fff1f1]">
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
  // Unified modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [productForm, setProductForm] = useState({ 
    id: "", name: "", sku: "", price: "", compare_at_price: "", stock: "", status: "draft" as "active" | "draft" | "archived", 
    short_description: "", description: "", ingredients: "",
    splash_image_url: "", splash_title: "", splash_subtitle: "" 
  });
  const [variantForm, setVariantForm] = useState<{id?: string, name: string, sku: string, price: string, stock: number}[]>([{ name: "", sku: "", price: "", stock: 0 }]);
  const [isSaving, setIsSaving] = useState(false);
  
  const [productList, setProductList] = useState<ProductWithRelations[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Image states: file objects for upload, strings for existing previews
  const [imageFiles, setImageFiles] = useState<(File | null)[]>([null, null, null]);
  const [imagePreviews, setImagePreviews] = useState<string[]>(["", "", ""]);
  const [existingImageIds, setExistingImageIds] = useState<string[]>(["", "", ""]);
  const [splashFile, setSplashFile] = useState<File | null>(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const { products } = await getProducts({ limit: 100, status: "" as any });
      setProductList(products);
    } catch (err) {
      console.error("Failed fetching products", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    const forceUnlock = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(forceUnlock);
  }, []);

  const filtered = productList.filter(
    (p) => p.name.toLowerCase().includes(search.toLowerCase()) || (p.sku && p.sku.toLowerCase().includes(search.toLowerCase()))
  );
  
  const lowStock = productList.filter((p) => p.total_inventory > 0 && p.total_inventory < 25);
  const outOfStock = productList.filter((p) => p.total_inventory === 0);
  // Add Variant inside Edit mode
  const handleAddVariantToExisting = async () => {};
  const saveVariantChanges = async () => {};
  const handleDeleteVariantFromExisting = async (id: string) => {};
  const editProduct = null;
  // Unified Add / Edit
  const handleSave = async () => {
    if (!productForm.name) return alert("Product Name is required!");
    setIsSaving(true);
    try {
      const baseSlug = productForm.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
      const basePrice = parseFloat(productForm.price) || 0;
      let productId = productForm.id;

      // Auto-generate unique SKU if empty (format: IVP-XXXXX)
      const autoSku = productForm.sku || `IVP-${Date.now().toString(36).toUpperCase().slice(-5)}`;

      // For new products, append a short suffix to slug to guarantee uniqueness
      const slug = modalMode === "add" ? `${baseSlug}-${Date.now().toString(36).slice(-4)}` : baseSlug;
      
      const payload = {
        name: productForm.name,
        slug,
        sku: autoSku,
        base_price: basePrice,
        compare_at_price: parseFloat(productForm.compare_at_price) || undefined,
        total_inventory: parseInt(productForm.stock) || 0,
        status: productForm.status,
        short_description: productForm.short_description,
        description: productForm.description,
        ingredients: productForm.ingredients,
        featured: false,
        ...( {
          splash_image_url: productForm.splash_image_url,
          splash_title: productForm.splash_title,
          splash_subtitle: productForm.splash_subtitle,
        } as any)
      };

      // Handle Splash Image Upload
      if (splashFile) {
        const fileExt = splashFile.name.split(".").pop();
        const fileName = `splash_${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(fileName, splashFile, { 
            upsert: true,
            contentType: splashFile.type || undefined
          });
        
        if (uploadError) {
          console.error("Splash upload error:", uploadError);
        } else {
          const { data: { publicUrl } } = supabase.storage.from("product-images").getPublicUrl(fileName);
          (payload as any).splash_image_url = publicUrl;
        }
      }

      if (modalMode === "add") {
        const created = await createProduct(payload);
        productId = created.id;
      } else {
        await updateProduct(productId, payload);
      }

      // Upsert Variants
      for (const v of variantForm.filter(x => x.name)) {
        if (v.id) {
          await updateVariant(v.id, {
            variant_name: v.name,
            sku: v.sku || undefined,
            price: parseFloat(v.price) || basePrice,
            inventory_quantity: v.stock
          });
        } else {
          await createVariant({
            product_id: productId,
            variant_name: v.name,
            sku: v.sku || undefined,
            price: parseFloat(v.price) || basePrice,
            inventory_quantity: v.stock
          });
        }
      }

      // Upload Images & preserve DB sort order
      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        if (file) {
          const fileExt = file.name.split(".").pop();
          const fileName = `${productId}/${Date.now()}_${i}.${fileExt}`;
          const { error: uploadError } = await supabase.storage
            .from("product-images")
            .upload(fileName, file, { 
              upsert: true,
              contentType: file.type || undefined
            });
          
          if (uploadError) {
            console.error(`Image ${i} upload error:`, uploadError);
          } else {
            const { data: { publicUrl } } = supabase.storage.from("product-images").getPublicUrl(fileName);
            const oldId = existingImageIds[i];
            
            if (oldId) {
               await supabase.from("product_images").update({ image_url: publicUrl, sort_order: i }).eq("id", oldId);
            } else {
               await supabase.from("product_images").insert({
                 product_id: productId, image_url: publicUrl, alt_text: `Image ${i+1}`, is_primary: i === 0, sort_order: i
               });
            }
          }
        }
      }

      await fetchProducts();
      closeModal();
    } catch (err: any) {
      console.error("Failed to save product", err);
      const msg = (err.message || err.code || "").toLowerCase();
      if (msg.includes("unique") || msg.includes("duplicate") || msg.includes("23505")) {
        // Auto-retry with a completely fresh slug and SKU
        try {
          const retrySlug = `${productForm.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}-${Date.now().toString(36)}`;
          const retrySku = `IVP-${Date.now().toString(36).toUpperCase()}`;
          const created = await createProduct({
            name: productForm.name,
            slug: retrySlug,
            sku: retrySku,
            base_price: parseFloat(productForm.price) || 0,
            compare_at_price: parseFloat(productForm.compare_at_price) || undefined,
            total_inventory: parseInt(productForm.stock) || 0,
            status: productForm.status,
            short_description: productForm.short_description,
            description: productForm.description,
            ingredients: productForm.ingredients,
            featured: false,
          });
          await fetchProducts();
          closeModal();
          return;
        } catch (retryErr: any) {
          alert(`Failed to save product: ${retryErr.message || "Unknown error"}`);
        }
      } else {
        alert(`Failed to save product! ${err.message || ""}`);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const openAddModal = () => {
    setModalMode("add");
    setProductForm({ id: "", name: "", sku: "", price: "", compare_at_price: "", stock: "", status: "draft", short_description: "", description: "", ingredients: "", splash_image_url: "", splash_title: "", splash_subtitle: "" });
    setVariantForm([{ name: "", sku: "", price: "", stock: 0 }]);
    setImageFiles([null, null, null]);
    setImagePreviews(["", "", ""]);
    setExistingImageIds(["", "", ""]);
    setSplashFile(null);
    setIsModalOpen(true);
  };

  const openEditModal = (p: ProductWithRelations) => {
    setModalMode("edit");
    setProductForm({ 
      id: p.id, name: p.name, sku: p.sku || "", price: p.base_price.toString(), compare_at_price: p.compare_at_price?.toString() || "", 
      stock: p.total_inventory.toString(), status: p.status || "draft", 
      short_description: (p as any).short_description || "", description: p.description || "", ingredients: p.ingredients || "", 
      splash_image_url: (p as any).splash_image_url || "", splash_title: (p as any).splash_title || "", splash_subtitle: (p as any).splash_subtitle || "" 
    });
    setVariantForm(p.product_variants?.length > 0 ? p.product_variants.map(v => ({
      id: v.id, name: v.variant_name, sku: v.sku || "", price: v.price.toString(), stock: v.inventory_quantity
    })) : [{ name: "", sku: "", price: "", stock: 0 }]);
    
    // Existing DB images into preview (preserve ordering keys)
    const existingImgs = ["", "", ""];
    const existingIds = ["", "", ""];
    if (p.product_images) {
      const sorted = p.product_images.slice().sort((a,b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
      if (sorted[0]) { existingImgs[0] = sorted[0].image_url; existingIds[0] = sorted[0].id; }
      if (sorted[1]) { existingImgs[1] = sorted[1].image_url; existingIds[1] = sorted[1].id; }
      if (sorted[2]) { existingImgs[2] = sorted[2].image_url; existingIds[2] = sorted[2].id; }
    }
    setImagePreviews(existingImgs);
    setExistingImageIds(existingIds);
    setImageFiles([null, null, null]);
    setSplashFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  // Delete Product from DB
  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(id);
      setProductList(productList.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete product.");
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: "active" | "draft" | "archived") => {
    try {
      await updateProduct(id, { status: newStatus });
      setProductList(productList.map(p => p.id === id ? { ...p, status: newStatus } : p));
    } catch (err) {
      console.error(err);
    }
  };

  const addVariantToNew = () => {
    const baseSku = productForm.sku || "SKU";
    const nextIndex = variantForm.length + 1;
    setVariantForm([...variantForm, { name: "", sku: `${baseSku}-V${nextIndex}`, price: productForm.price || "", stock: 0 }]);
  };
  const removeVariantFromNew = (i: number) => setVariantForm(variantForm.filter((_, idx) => idx !== i));

  if (isLoading && productList.length === 0) {
    return <div className="p-10 text-center text-gray-500 font-['Satoshi']">Loading products...</div>;
  }

  return (
    <div className="space-y-5">
      {/* Tab Nav + Toolbar */}
      <div className="rounded-2xl p-4 bg-white border border-[#eaedf0] shadow-sm">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#f4f6f8]">
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
              </button>
            ))}
          </div>

          <div className="flex flex-1 items-center gap-2 px-3 py-2 rounded-xl min-w-[200px] bg-[#f4f6f8] border border-[#eaedf0]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="#aaa" className="w-4 h-4 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products or SKU..." className="flex-1 outline-none bg-transparent text-sm text-[#333] font-['Satoshi']" />
          </div>

          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white ml-auto bg-[#0f0f11] font-['Satoshi']"
          >
            + Add Product
          </button>
        </div>
      </div>

      {/* UNIFIED MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f0f11]/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 sticky top-0 bg-white border-b border-[#eaedf0] z-10">
              <h3 className="text-lg font-bold text-[#0f0f11] font-['Satoshi']">{modalMode === "add" ? "Create New Product" : "Edit Product Details"}</h3>
              <button onClick={closeModal} className="p-1.5 rounded-lg bg-[#f4f6f8] hover:bg-[#ebebeb] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="#888" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="bg-[#fcfdfd] border border-[#eaedf0] p-4 rounded-xl">
                <p className="text-xs font-bold text-[#0f0f11] mb-3 uppercase tracking-wider font-['Satoshi'] border-b pb-2">Core Identity</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#555] mb-1 font-['Satoshi']">Product Name</label>
                    <input value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} placeholder="e.g. Muscle Fuel Patch" className="w-full px-3 py-2 rounded-xl text-sm border border-[#eaedf0] bg-white font-['Satoshi'] outline-none focus:border-[#1a1a1a]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#555] mb-1 font-['Satoshi']">Base SKU</label>
                    <input value={productForm.sku} onChange={e => setProductForm({...productForm, sku: e.target.value})} placeholder="e.g. MSCL-FL-01" className="w-full px-3 py-2 rounded-xl text-sm border border-[#eaedf0] bg-white font-['Satoshi'] outline-none focus:border-[#1a1a1a]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#555] mb-1 font-['Satoshi']">Base Price (AED)</label>
                    <input type="number" value={productForm.price} onChange={e => setProductForm({...productForm, price: e.target.value})} placeholder="e.g. 94" className="w-full px-3 py-2 rounded-xl text-sm border border-[#eaedf0] bg-white font-['Satoshi'] outline-none focus:border-[#1a1a1a]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#555] mb-1 font-['Satoshi']">Compare At Price (Discount)</label>
                    <input type="number" value={productForm.compare_at_price} onChange={e => setProductForm({...productForm, compare_at_price: e.target.value})} placeholder="Optional retail price. e.g. 129" className="w-full px-3 py-2 rounded-xl text-sm border border-[#eaedf0] bg-white font-['Satoshi'] outline-none focus:border-[#1a1a1a]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#555] mb-1 font-['Satoshi']">Total Inventory</label>
                    <input type="number" value={productForm.stock} onChange={e => setProductForm({...productForm, stock: e.target.value})} className="w-full px-3 py-2 rounded-xl text-sm border border-[#eaedf0] bg-white font-['Satoshi'] outline-none focus:border-[#1a1a1a]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#555] mb-1 font-['Satoshi']">Status</label>
                    <select value={productForm.status} onChange={e => setProductForm({...productForm, status: e.target.value as any})} className="w-full px-3 py-2 rounded-xl text-sm border border-[#eaedf0] bg-white font-['Satoshi'] outline-none focus:border-[#1a1a1a]">
                      <option value="draft">Draft</option>
                      <option value="active">Active</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Descriptions */}
              <div className="bg-[#fcfdfd] border border-[#eaedf0] p-4 rounded-xl space-y-4">
                <p className="text-xs font-bold text-[#0f0f11] uppercase tracking-wider font-['Satoshi'] border-b pb-2">Copywriting</p>
                <div>
                  <label className="block text-xs font-semibold text-[#555] mb-1 font-['Satoshi']">Short Description (About the product)</label>
                  <textarea value={productForm.short_description} onChange={e => setProductForm({...productForm, short_description: e.target.value})} placeholder="Brief hook, e.g. Designed for athletes and fitness enthusiasts..." rows={2} className="w-full px-3 py-2 rounded-xl text-sm border border-[#eaedf0] bg-white font-['Satoshi'] outline-none focus:border-[#1a1a1a]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#555] mb-1 font-['Satoshi']">Long Description (Dropdown)</label>
                  <textarea value={productForm.description} onChange={e => setProductForm({...productForm, description: e.target.value})} placeholder="Full details to display in the Description accordion..." rows={3} className="w-full px-3 py-2 rounded-xl text-sm border border-[#eaedf0] bg-white font-['Satoshi'] outline-none focus:border-[#1a1a1a]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#555] mb-1 font-['Satoshi']">Ingredients (One per line — <span className="text-[#667eea]">Name: Detail</span>)</label>
                  <textarea value={productForm.ingredients} onChange={e => setProductForm({...productForm, ingredients: e.target.value})} placeholder={"Vitamin B12: Supports energy metabolism and reduces fatigue\nIron: Essential mineral for oxygen transport in blood\nMagnesium: Helps with muscle recovery and relaxation"} rows={5} className="w-full px-3 py-2 rounded-xl text-sm border border-[#eaedf0] bg-white font-['Satoshi'] outline-none focus:border-[#1a1a1a]" />
                </div>
              </div>

              {/* Upload Files */}
              <div className="bg-[#fcfdfd] border border-[#eaedf0] p-4 rounded-xl">
                <p className="text-xs font-bold text-[#0f0f11] mb-3 uppercase tracking-wider font-['Satoshi'] border-b pb-2">Images Upload (Optional)</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {["Primary (White BG)", "Secondary (Color BG)", "Preview/Action"].map((label, i) => (
                    <div key={label} className="bg-white p-3 rounded-lg border border-dashed border-[#ccc] text-center">
                      <label className="block text-[10px] font-semibold text-[#555] mb-3 font-['Satoshi']">{label}</label>
                      {imagePreviews[i] && !imageFiles[i] ? (
                        <div className="flex flex-col items-center">
                           <img src={imagePreviews[i]} alt="Preview" className="w-16 h-16 object-cover mb-2 rounded-md" />
                           <span className="text-[9px] text-[#888] font-mono truncate w-full">Current Image</span>
                        </div>
                      ) : null}
                      <input type="file" accept="image/*" onChange={e => {
                        const file = e.target.files?.[0] || null;
                        const upd = [...imageFiles]; upd[i] = file; setImageFiles(upd);
                      }} className="w-full text-[10px] text-[#555] file:text-[10px] file:border-0 file:bg-[#f4f6f8] file:rounded file:px-2 file:py-1 file:font-semibold" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Splash */}
              <div className="bg-[#fcfdfd] border border-[#eaedf0] p-4 rounded-xl">
                <p className="text-xs font-bold text-[#0f0f11] mb-3 uppercase tracking-wider font-['Satoshi'] border-b pb-2">Splash Page Banner</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#555] mb-1 font-['Satoshi']">Splash Image Upload</label>
                    {productForm.splash_image_url && !splashFile && (
                       <p className="text-[10px] text-green-600 mb-1 font-['Satoshi']">Current image exists in system.</p>
                    )}
                    <input type="file" accept="image/*" onChange={e => setSplashFile(e.target.files?.[0] || null)} className="w-full text-xs text-[#555] file:border-0 file:bg-[#f4f6f8] file:rounded file:px-3 file:py-1.5 file:font-semibold" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#555] mb-1 font-['Satoshi']">Splash Title</label>
                    <input value={productForm.splash_title} onChange={e => setProductForm({...productForm, splash_title: e.target.value})} placeholder="e.g. Muscle Relief" className="w-full px-3 py-2 rounded-xl text-sm border border-[#eaedf0] bg-white font-['Satoshi'] outline-none focus:border-[#1a1a1a]" />
                  </div>
                </div>
                <label className="block text-xs font-semibold text-[#555] mb-1 font-['Satoshi']">Splash Subtitle Snippet</label>
                <textarea value={productForm.splash_subtitle} onChange={e => setProductForm({...productForm, splash_subtitle: e.target.value})} placeholder="e.g. Crafted to ease tension..." rows={2} className="w-full px-3 py-2 rounded-xl text-sm border border-[#eaedf0] bg-white font-['Satoshi'] outline-none focus:border-[#1a1a1a]" />
              </div>

              {/* Variants */}
              <div className="bg-[#fcfdfd] border border-[#eaedf0] p-4 rounded-xl">
                <div className="flex items-center justify-between mb-3 border-b pb-2">
                  <p className="text-xs font-bold text-[#0f0f11] uppercase tracking-wider font-['Satoshi']">Variants Engine</p>
                  <button onClick={addVariantToNew} className="flex items-center gap-1 text-xs font-bold text-[#0f0f11] font-['Satoshi'] bg-[#eaedf0] px-3 py-1 rounded-full hover:bg-[#e0e3e6] transition">+ Add Variant</button>
                </div>
                <div className="space-y-3">
                  {variantForm.map((v, i) => (
                    <div key={i} className="flex flex-col sm:flex-row items-center gap-2 p-2 bg-white border border-[#eaedf0] rounded-xl shadow-sm">
                      <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-2 w-full">
                        <input value={v.name} onChange={e => { const up = [...variantForm]; up[i].name = e.target.value; setVariantForm(up); }} placeholder="Variant Name" className="px-3 py-1.5 rounded-lg text-xs bg-[#fdfdfd] border border-[#eaedf0] font-['Satoshi'] outline-none" />
                        <input value={v.sku} onChange={e => { const up = [...variantForm]; up[i].sku = e.target.value; setVariantForm(up); }} placeholder="SKU" className="px-3 py-1.5 rounded-lg text-xs bg-[#fdfdfd] border border-[#eaedf0] font-mono outline-none" />
                        <input type="number" value={v.price} onChange={e => { const up = [...variantForm]; up[i].price = e.target.value; setVariantForm(up); }} placeholder="Price AED" className="px-3 py-1.5 rounded-lg text-xs bg-[#fdfdfd] border border-[#eaedf0] font-['Satoshi'] outline-none" />
                        <input type="number" value={v.stock} onChange={e => { const up = [...variantForm]; up[i].stock = parseInt(e.target.value)||0; setVariantForm(up); }} placeholder="Stock" className="px-3 py-1.5 rounded-lg text-xs bg-[#fdfdfd] border border-[#eaedf0] font-['Satoshi'] outline-none" />
                      </div>
                      <button onClick={() => removeVariantFromNew(i)} className="p-2 lg:p-1.5 rounded-lg shrink-0 bg-[#fff1f1] hover:bg-[#fee2e2] transition">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#dc2626" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 px-6 pb-6 bg-white sticky bottom-0 pt-4 border-t border-[#eaedf0]">
              <button onClick={closeModal} disabled={isSaving} className="flex-1 py-3 rounded-xl text-sm font-bold bg-[#f4f6f8] text-[#555] font-['Satoshi'] hover:bg-[#eaedf0] transition disabled:opacity-50">Discard</button>
              <button onClick={handleSave} disabled={isSaving} className="flex-1 py-3 rounded-xl text-sm font-bold text-white bg-[#0f0f11] font-['Satoshi'] hover:bg-[#1a1a1a] shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2">
                {isSaving ? "Saving..." : (modalMode === 'add' ? 'Publish Product' : 'Save Changes')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ALL PRODUCTS TAB */}
      {activeTab === "All Products" && (
        <div className="rounded-2xl overflow-hidden bg-white border border-[#eaedf0] shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#f9fafb] border-b border-[#eaedf0]">
                  {["Product", "SKU", "Price", "Stock", "Variants", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[10px] font-bold text-[#888] uppercase tracking-wider whitespace-nowrap font-['Satoshi']">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y border-[#f4f6f8]">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-10 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#d1d5db" className="w-12 h-12 mb-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                          </svg>
                          <p className="text-sm font-semibold text-[#555] font-['Satoshi']">No products found</p>
                          <p className="text-xs text-[#aaa] font-['Satoshi'] mt-1">Your inventory is currently empty.</p>
                          <button onClick={openAddModal} className="mt-4 px-4 py-2 bg-[#0f0f11] text-white rounded-xl text-xs font-bold font-['Satoshi']">+ Add First Product</button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filtered.map((p) => (
                      <tr key={p.id} className="hover:bg-[#f9fafb] transition-colors">
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl shrink-0 flex items-center justify-center text-white text-xs font-bold" style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}>IV</div>
                            <div>
                              <div className="text-sm font-semibold text-[#1a1a1a] font-['Satoshi']">{p.name}</div>
                              <div className="text-[10px] text-[#aaa] line-clamp-1 max-w-[160px] font-['Satoshi']">{p.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-xs font-mono text-[#667eea]">{p.sku || "-"}</td>
                        <td className="px-4 py-3.5 text-sm font-bold text-[#1a1a1a] font-['Satoshi']">AED {p.base_price}</td>
                        <td className="px-4 py-3.5">
                          <span className="text-sm font-bold font-['Satoshi']" style={{ color: p.total_inventory === 0 ? "#dc2626" : p.total_inventory < 25 ? "#d97706" : "#059669" }}>
                            {p.total_inventory}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <button
                            onClick={() => openEditModal(p)}
                            className="text-[10px] font-bold px-2.5 py-1.5 rounded-lg transition-all font-['Satoshi'] bg-[#f4f6f8] text-[#555] hover:bg-[#ebebeb]"
                          >
                            {p.product_variants?.length || 0} variant{(p.product_variants?.length || 0) !== 1 ? "s" : ""}
                          </button>
                        </td>
                        <td className="px-4 py-3.5">
                          <select
                            className="text-[10px] font-bold px-2 py-1 rounded-full outline-none cursor-pointer"
                            style={statusStyle[p.status || "draft"]}
                            onChange={(e) => handleUpdateStatus(p.id, e.target.value as any)}
                            value={p.status}
                          >
                            <option value="active">Active</option>
                            <option value="draft">Draft</option>
                            <option value="archived">Archived</option>
                          </select>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-1.5">
                            <button onClick={() => openEditModal(p)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#f4f6f8] text-[#1a1a1a] hover:bg-[#ebebeb] transition font-['Satoshi']">Edit Details</button>
                            <button onClick={() => handleDeleteProduct(p.id)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#fff1f1] text-[#dc2626] hover:bg-[#fee2e2] transition font-['Satoshi']">Del</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VARIANTS TAB */}
      {activeTab === "Variants" && (
        <div className="rounded-2xl bg-white border border-[#eaedf0] shadow-sm">
          <div className="px-6 py-4 border-b border-[#eaedf0]">
            <h3 className="text-sm font-bold text-[#0f0f11] font-['Satoshi']">All Variants Across Products</h3>
          </div>
          <div className="divide-y border-[#f4f6f8]">
            {productList.map((p) =>
              p.product_variants?.map((v) => (
                <div key={v.id} className="flex items-center gap-4 px-6 py-3 hover:bg-[#f9fafb] transition-colors">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: p.status === "active" ? "#10b981" : "#d1d5db" }} />
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-[#aaa] mr-2 font-['Satoshi']">{p.name}</span>
                    <span className="text-sm font-semibold text-[#1a1a1a] font-['Satoshi']">{v.variant_name}</span>
                  </div>
                  <span className="text-xs font-mono text-[#667eea]">{v.sku}</span>
                  <span className="text-sm font-bold text-[#1a1a1a] font-['Satoshi']">AED {v.price}</span>
                  <span className="text-sm font-bold font-['Satoshi']" style={{ color: v.inventory_quantity === 0 ? "#dc2626" : v.inventory_quantity < 10 ? "#d97706" : "#059669" }}>{v.inventory_quantity} units</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* BUNDLES TAB */}
      {activeTab === "Bundles" && (
        <div className="space-y-4">
          <div className="rounded-2xl p-6 bg-white border border-[#eaedf0] shadow-sm">
            <h3 className="text-sm font-bold text-[#0f0f11] mb-2 font-['Satoshi']">Bundles (Coming soon)</h3>
            <p className="text-xs text-[#888] font-['Satoshi']">Complex multi-product bundles require advanced database relations. Feature in development.</p>
          </div>
        </div>
      )}
    </div>
  );
}
