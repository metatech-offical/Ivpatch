import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { clerkUserId, phone, firstName, lastName, email, gender } = body;

    if (!clerkUserId || !phone) {
      return NextResponse.json(
        { error: "Missing required fields: clerkUserId, phone" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseClient();

    // Check if profile already exists
    const { data: existing } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", clerkUserId)
      .single();

    if (existing) {
      // Update existing profile
      const { data, error } = await supabase
        .from("profiles")
        .update({
          first_name: firstName || null,
          last_name: lastName || null,
          email: email || null,
          phone: phone,
          updated_at: new Date().toISOString(),
        })
        .eq("id", clerkUserId)
        .select()
        .single();

      if (error) {
        console.error("Profile update error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ profile: data, isNew: false });
    }

    // Create new profile
    const { data, error } = await supabase
      .from("profiles")
      .insert({
        id: clerkUserId,
        email: email || "",
        first_name: firstName || null,
        last_name: lastName || null,
        phone: phone,
        role: "customer",
        is_active: true,
      })
      .select()
      .single();

    if (error) {
      console.error("Profile creation error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ profile: data, isNew: true });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
