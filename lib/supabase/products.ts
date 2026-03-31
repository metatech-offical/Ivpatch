import { supabase } from "./client";
import type { ProductWithRelations } from "./types";

// ─── Public product queries ─────────────────────────────────

export interface ProductFilters {
  status?: "active" | "draft" | "archived";
  featured?: boolean;
  collection?: string;
  search?: string;
  page?: number;
  limit?: number;
  sort?: "relevance" | "newest" | "price_high" | "price_low";
}

export async function getProducts(filters: ProductFilters = {}) {
  const {
    status = "active",
    featured,
    search,
    page = 1,
    limit = 20,
    sort = "relevance",
  } = filters;

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("products")
    .select(
      `
      *,
      product_images (*),
      product_variants (*)
    `,
      { count: "exact" }
    )
    .eq("status", status);

  if (featured !== undefined) {
    query = query.eq("featured", featured);
  }

  if (search) {
    query = query.or(
      `name.ilike.%${search}%,description.ilike.%${search}%,sku.ilike.%${search}%`
    );
  }

  // Sorting
  switch (sort) {
    case "newest":
      query = query.order("created_at", { ascending: false });
      break;
    case "price_high":
      query = query.order("base_price", { ascending: false });
      break;
    case "price_low":
      query = query.order("base_price", { ascending: true });
      break;
    default:
      query = query
        .order("featured", { ascending: false })
        .order("created_at", { ascending: false });
  }

  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) throw error;

  return {
    products: (data as ProductWithRelations[]) || [],
    pagination: {
      page,
      limit,
      total: count || 0,
      pages: Math.ceil((count || 0) / limit),
    },
  };
}

export async function getProductBySlug(slug: string) {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      product_images (*),
      product_variants (*)
    `
    )
    .eq("slug", slug)
    .single();

  if (error) throw error;
  return data as ProductWithRelations;
}

// ─── Admin product operations ───────────────────────────────

export async function createProduct(
  productData: {
    name: string;
    slug: string;
    description?: string;
    short_description?: string;
    base_price: number;
    compare_at_price?: number;
    sku?: string;
    status?: "active" | "draft" | "archived";
    featured?: boolean;
    total_inventory?: number;
    ingredients?: string;
    usage_instructions?: string;
    benefits?: string;
  }
) {
  const { data, error } = await supabase
    .from("products")
    .insert(productData)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateProduct(
  id: string,
  updates: Record<string, unknown>
) {
  const { data, error } = await supabase
    .from("products")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteProduct(id: string) {
  // Soft delete — set status to archived
  return updateProduct(id, { status: "archived" });
}

// ─── Product variants ───────────────────────────────────────

export async function createVariant(variantData: {
  product_id: string;
  variant_name: string;
  sku?: string;
  price: number;
  compare_at_price?: number;
  inventory_quantity?: number;
  option1_name?: string;
  option1_value?: string;
}) {
  const { data, error } = await supabase
    .from("product_variants")
    .insert(variantData)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateVariant(
  id: string,
  updates: Record<string, unknown>
) {
  const { data, error } = await supabase
    .from("product_variants")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteVariant(id: string) {
  const { error } = await supabase
    .from("product_variants")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

// ─── Product images ─────────────────────────────────────────

export async function uploadProductImage(
  productId: string,
  file: File,
  altText?: string,
  isPrimary?: boolean
) {
  // Upload to Supabase Storage
  const fileExt = file.name.split(".").pop();
  const fileName = `${productId}/${Date.now()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("product-images")
    .upload(fileName, file);

  if (uploadError) throw uploadError;

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("product-images").getPublicUrl(fileName);

  // Insert image record
  const { data, error } = await supabase
    .from("product_images")
    .insert({
      product_id: productId,
      image_url: publicUrl,
      alt_text: altText || file.name,
      is_primary: isPrimary || false,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteProductImage(imageId: string) {
  const { error } = await supabase
    .from("product_images")
    .delete()
    .eq("id", imageId);

  if (error) throw error;
}

// ─── Collections ─────────────────────────────────────────────

export async function getCollections() {
  const { data, error } = await supabase
    .from("collections")
    .select("*")
    .eq("is_visible", true)
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data || [];
}
