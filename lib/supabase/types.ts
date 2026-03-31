// Auto-generated types for Supabase database
// These mirror the schema deployed to Supabase

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          first_name: string | null;
          last_name: string | null;
          phone: string | null;
          role: "customer" | "admin";
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          first_name?: string | null;
          last_name?: string | null;
          phone?: string | null;
          role?: "customer" | "admin";
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          first_name?: string | null;
          last_name?: string | null;
          phone?: string | null;
          role?: "customer" | "admin";
          is_active?: boolean;
          updated_at?: string;
        };
      };
      user_addresses: {
        Row: {
          id: string;
          user_id: string;
          address_type: "shipping" | "billing";
          first_name: string | null;
          last_name: string | null;
          phone: string | null;
          address_line1: string;
          address_line2: string | null;
          city: string;
          state: string | null;
          country: string;
          postal_code: string;
          is_default: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          address_type?: "shipping" | "billing";
          first_name?: string | null;
          last_name?: string | null;
          phone?: string | null;
          address_line1: string;
          address_line2?: string | null;
          city: string;
          state?: string | null;
          country: string;
          postal_code: string;
          is_default?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          address_type?: "shipping" | "billing";
          first_name?: string | null;
          last_name?: string | null;
          phone?: string | null;
          address_line1?: string;
          address_line2?: string | null;
          city?: string;
          state?: string | null;
          country?: string;
          postal_code?: string;
          is_default?: boolean;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          short_description: string | null;
          base_price: number;
          compare_at_price: number | null;
          cost_per_item: number | null;
          sku: string | null;
          barcode: string | null;
          status: "active" | "draft" | "archived";
          featured: boolean;
          track_inventory: boolean;
          total_inventory: number;
          low_stock_threshold: number;
          meta_title: string | null;
          meta_description: string | null;
          ingredients: string | null;
          usage_instructions: string | null;
          benefits: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          short_description?: string | null;
          base_price: number;
          compare_at_price?: number | null;
          cost_per_item?: number | null;
          sku?: string | null;
          barcode?: string | null;
          status?: "active" | "draft" | "archived";
          featured?: boolean;
          track_inventory?: boolean;
          total_inventory?: number;
          low_stock_threshold?: number;
          meta_title?: string | null;
          meta_description?: string | null;
          ingredients?: string | null;
          usage_instructions?: string | null;
          benefits?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          slug?: string;
          description?: string | null;
          short_description?: string | null;
          base_price?: number;
          compare_at_price?: number | null;
          cost_per_item?: number | null;
          sku?: string | null;
          barcode?: string | null;
          status?: "active" | "draft" | "archived";
          featured?: boolean;
          track_inventory?: boolean;
          total_inventory?: number;
          low_stock_threshold?: number;
          meta_title?: string | null;
          meta_description?: string | null;
          ingredients?: string | null;
          usage_instructions?: string | null;
          benefits?: string | null;
          updated_at?: string;
        };
      };
      product_images: {
        Row: {
          id: string;
          product_id: string;
          image_url: string;
          alt_text: string | null;
          sort_order: number;
          is_primary: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          image_url: string;
          alt_text?: string | null;
          sort_order?: number;
          is_primary?: boolean;
          created_at?: string;
        };
        Update: {
          image_url?: string;
          alt_text?: string | null;
          sort_order?: number;
          is_primary?: boolean;
        };
      };
      product_variants: {
        Row: {
          id: string;
          product_id: string;
          variant_name: string;
          sku: string | null;
          barcode: string | null;
          price: number;
          compare_at_price: number | null;
          cost_per_item: number | null;
          inventory_quantity: number;
          weight: number | null;
          option1_name: string | null;
          option1_value: string | null;
          option2_name: string | null;
          option2_value: string | null;
          option3_name: string | null;
          option3_value: string | null;
          is_available: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          variant_name: string;
          sku?: string | null;
          barcode?: string | null;
          price: number;
          compare_at_price?: number | null;
          cost_per_item?: number | null;
          inventory_quantity?: number;
          weight?: number | null;
          option1_name?: string | null;
          option1_value?: string | null;
          option2_name?: string | null;
          option2_value?: string | null;
          option3_name?: string | null;
          option3_value?: string | null;
          is_available?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          variant_name?: string;
          sku?: string | null;
          barcode?: string | null;
          price?: number;
          compare_at_price?: number | null;
          cost_per_item?: number | null;
          inventory_quantity?: number;
          weight?: number | null;
          option1_name?: string | null;
          option1_value?: string | null;
          option2_name?: string | null;
          option2_value?: string | null;
          option3_name?: string | null;
          option3_value?: string | null;
          is_available?: boolean;
          updated_at?: string;
        };
      };
      collections: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          image_url: string | null;
          sort_order: number;
          is_visible: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          image_url?: string | null;
          sort_order?: number;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          slug?: string;
          description?: string | null;
          image_url?: string | null;
          sort_order?: number;
          is_visible?: boolean;
          updated_at?: string;
        };
      };
      product_collections: {
        Row: {
          product_id: string;
          collection_id: string;
          sort_order: number;
        };
        Insert: {
          product_id: string;
          collection_id: string;
          sort_order?: number;
        };
        Update: {
          sort_order?: number;
        };
      };
      carts: {
        Row: {
          id: string;
          user_id: string | null;
          session_id: string | null;
          created_at: string;
          updated_at: string;
          expires_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          session_id?: string | null;
          created_at?: string;
          updated_at?: string;
          expires_at?: string;
        };
        Update: {
          user_id?: string | null;
          session_id?: string | null;
          updated_at?: string;
          expires_at?: string;
        };
      };
      cart_items: {
        Row: {
          id: string;
          cart_id: string;
          product_id: string;
          variant_id: string | null;
          quantity: number;
          price_at_time: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          cart_id: string;
          product_id: string;
          variant_id?: string | null;
          quantity?: number;
          price_at_time: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          quantity?: number;
          price_at_time?: number;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

// Convenience type aliases
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Product = Database["public"]["Tables"]["products"]["Row"];
export type ProductImage = Database["public"]["Tables"]["product_images"]["Row"];
export type ProductVariant = Database["public"]["Tables"]["product_variants"]["Row"];
export type Collection = Database["public"]["Tables"]["collections"]["Row"];
export type Cart = Database["public"]["Tables"]["carts"]["Row"];
export type CartItem = Database["public"]["Tables"]["cart_items"]["Row"];
export type UserAddress = Database["public"]["Tables"]["user_addresses"]["Row"];

// Extended types with joins
export type ProductWithRelations = Product & {
  product_images: ProductImage[];
  product_variants: ProductVariant[];
};
