"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from "react";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "./AuthContext";

export interface CartItem {
  id: string;
  product_id: string;
  variant_id?: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  plan: string;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (product: Omit<CartItem, "quantity" | "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  totalItems: number;
  subtotal: number;
  hasItems: boolean;
  addToCart: () => void;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "iv_cart_items";
const SESSION_KEY = "iv_cart_session";

// ─── LocalStorage helpers ─────────────────────────────────
function saveCartToLocal(items: CartItem[]) {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  } catch { /* ignore */ }
}

function loadCartFromLocal(): CartItem[] {
  try {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    }
  } catch { /* ignore */ }
  return [];
}

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let sessionId = localStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

export function CartProvider({ children }: { children: ReactNode }) {
  // Start from localStorage immediately so cart renders instantly
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, isLoggedIn, isLoading: authLoading } = useAuth();
  const didInitialLoad = useRef(false);

  // Load from localStorage on first render (instant, no async)
  useEffect(() => {
    const localItems = loadCartFromLocal();
    if (localItems.length > 0) {
      setItems(localItems);
    }
  }, []);

  // Persist to localStorage whenever items change
  useEffect(() => {
    saveCartToLocal(items);
  }, [items]);

  // ─── Fetch or create cart ─────────────────────────────────
  const getOrCreateCart = useCallback(async (): Promise<string | null> => {
    try {
      if (isLoggedIn && user) {
        const { data: existingCart } = await supabase
          .from("carts")
          .select("id")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (existingCart) return existingCart.id;

        const { data: newCart, error } = await supabase
          .from("carts")
          .insert({ user_id: user.id })
          .select("id")
          .single();

        if (error) throw error;
        return newCart?.id || null;
      } else {
        const sessionId = getSessionId();
        if (!sessionId) return null;

        const { data: existingCart } = await supabase
          .from("carts")
          .select("id")
          .eq("session_id", sessionId)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (existingCart) return existingCart.id;

        const { data: newCart, error } = await supabase
          .from("carts")
          .insert({ session_id: sessionId })
          .select("id")
          .single();

        if (error) throw error;
        return newCart?.id || null;
      }
    } catch (err) {
      console.error("Cart error:", err);
      return null;
    }
  }, [isLoggedIn, user, supabase]);

  // ─── Load cart items from Supabase (background sync) ──────
  const syncCartFromDB = useCallback(async () => {
    try {
      const id = await getOrCreateCart();
      if (!id) return;
      setCartId(id);

      const { data: cartItems, error } = await supabase
        .from("cart_items")
        .select(`
          id,
          product_id,
          variant_id,
          quantity,
          price_at_time,
          products:product_id (name, slug, product_images (image_url, is_primary)),
          variants:variant_id (variant_name)
        `)
        .eq("cart_id", id);

      if (error) throw error;

      if (!cartItems || cartItems.length === 0) {
        // DB has no items — don't overwrite local items
        return;
      }

      const mapped: CartItem[] = cartItems.map((ci: Record<string, unknown>) => {
        const product = ci.products as Record<string, unknown> | null;
        const variant = ci.variants as Record<string, unknown> | null;
        const images = product?.product_images as Array<{ image_url: string; is_primary: boolean }> | undefined;
        const primaryImage = images?.find((img) => img.is_primary) || images?.[0];

        return {
          id: ci.id as string,
          product_id: ci.product_id as string,
          variant_id: ci.variant_id as string | undefined,
          name: (product?.name as string) || "Product",
          price: ci.price_at_time as number,
          image: primaryImage?.image_url || "/product1.svg",
          quantity: ci.quantity as number,
          plan: (variant?.variant_name as string) || "Single",
        };
      });

      setItems(mapped);
      saveCartToLocal(mapped);
    } catch (err) {
      console.error("Load cart error:", err);
      // Keep local items — don't blank the cart
    }
  }, [getOrCreateCart, supabase]);

  // Sync from DB once auth is settled
  useEffect(() => {
    if (authLoading) return; // Wait for auth to settle
    if (didInitialLoad.current) return; // Only once
    didInitialLoad.current = true;

    setIsLoading(true);
    syncCartFromDB().finally(() => setIsLoading(false));
  }, [authLoading, syncCartFromDB]);

  // Re-sync when user changes (login/logout)
  useEffect(() => {
    if (authLoading || !didInitialLoad.current) return;
    syncCartFromDB();
  }, [user?.id, authLoading, syncCartFromDB]);

  // ─── Add item ─────────────────────────────────────────────
  const addItem = async (product: Omit<CartItem, "quantity" | "id">) => {
    // Optimistic local update
    setItems((prev) => {
      const key = `${product.product_id}-${product.variant_id || "none"}`;
      const existing = prev.find(
        (i) => `${i.product_id}-${i.variant_id || "none"}` === key
      );
      if (existing) {
        return prev.map((i) =>
          `${i.product_id}-${i.variant_id || "none"}` === key
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...product, id: `temp-${Date.now()}`, quantity: 1 }];
    });
    setIsOpen(true);

    // Persist to Supabase in background
    try {
      let currentCartId = cartId;
      if (!currentCartId) {
        currentCartId = await getOrCreateCart();
        if (!currentCartId) return;
        setCartId(currentCartId);
      }

      const matchQuery = supabase
        .from("cart_items")
        .select("id, quantity")
        .eq("cart_id", currentCartId)
        .eq("product_id", product.product_id);

      if (product.variant_id) {
        matchQuery.eq("variant_id", product.variant_id);
      } else {
        matchQuery.is("variant_id", null);
      }

      const { data: existing } = await matchQuery.maybeSingle();

      if (existing) {
        await supabase
          .from("cart_items")
          .update({
            quantity: existing.quantity + 1,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existing.id);
      } else {
        await supabase.from("cart_items").insert({
          cart_id: currentCartId,
          product_id: product.product_id,
          variant_id: product.variant_id || null,
          quantity: 1,
          price_at_time: product.price,
        });
      }

      // Reload from DB to get real IDs
      await syncCartFromDB();
    } catch (err) {
      console.error("Add to cart error:", err);
      // Keep optimistic local state
    }
  };

  // ─── Remove item ──────────────────────────────────────────
  const removeItem = async (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));

    if (!id.startsWith("temp-")) {
      try {
        await supabase.from("cart_items").delete().eq("id", id);
      } catch (err) {
        console.error("Remove item error:", err);
      }
    }
  };

  // ─── Update quantity ──────────────────────────────────────
  const updateQuantity = async (id: string, delta: number) => {
    let newQty = 0;
    setItems((prev) =>
      prev.map((i) => {
        if (i.id === id) {
          newQty = Math.max(1, i.quantity + delta);
          return { ...i, quantity: newQty };
        }
        return i;
      })
    );

    if (!id.startsWith("temp-") && newQty > 0) {
      try {
        await supabase
          .from("cart_items")
          .update({
            quantity: newQty,
            updated_at: new Date().toISOString(),
          })
          .eq("id", id);
      } catch (err) {
        console.error("Update qty error:", err);
      }
    }
  };

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const hasItems = items.length > 0;

  const addToCart = () => {
    setIsOpen(true);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,
        addItem,
        removeItem,
        updateQuantity,
        totalItems,
        subtotal,
        hasItems,
        addToCart,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
