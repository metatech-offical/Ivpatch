import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";

declare global {
  // eslint-disable-next-line no-var
  var _otpStore: Map<string, { code: string; expiresAt: number }> | undefined;
}
const otpStore: Map<string, { code: string; expiresAt: number }> =
  global._otpStore ?? (global._otpStore = new Map());

export async function POST(req: NextRequest) {
  try {
    const { phone, code } = await req.json();

    if (!phone || !code) {
      return NextResponse.json({ error: "Phone and code are required." }, { status: 400 });
    }

    const entry = otpStore.get(phone);

    if (!entry) {
      return NextResponse.json({ error: "No OTP found. Please request a new code." }, { status: 400 });
    }

    if (Date.now() > entry.expiresAt) {
      otpStore.delete(phone);
      return NextResponse.json({ error: "OTP has expired. Please request a new code." }, { status: 400 });
    }

    if (entry.code !== code) {
      return NextResponse.json({ error: "Invalid OTP. Please try again." }, { status: 400 });
    }

    // OTP verified — delete so it can't be reused
    otpStore.delete(phone);

    // Get or create the Firebase Auth user for this phone number
    let uid: string;
    try {
      const existingUser = await adminAuth.getUserByPhoneNumber(phone);
      uid = existingUser.uid;
    } catch {
      // User doesn't exist yet — create them
      const newUser = await adminAuth.createUser({ phoneNumber: phone });
      uid = newUser.uid;
    }

    // Create a Firebase custom token for this UID
    // The client will use signInWithCustomToken() to create a real Firebase session
    const customToken = await adminAuth.createCustomToken(uid);

    return NextResponse.json({ success: true, customToken });
  } catch (err: unknown) {
    console.error("OTP verify error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
