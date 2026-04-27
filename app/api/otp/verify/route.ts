import { NextRequest, NextResponse } from "next/server";

// Shared in-memory store — must import from the same module instance
// Next.js App Router keeps API routes as separate module instances.
// We use a global to share state across hot-reloads in dev.
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
      return NextResponse.json(
        { error: "Phone and code are required." },
        { status: 400 }
      );
    }

    const entry = otpStore.get(phone);

    if (!entry) {
      return NextResponse.json(
        { error: "No OTP found for this number. Please request a new code." },
        { status: 400 }
      );
    }

    if (Date.now() > entry.expiresAt) {
      otpStore.delete(phone);
      return NextResponse.json(
        { error: "OTP has expired. Please request a new code." },
        { status: 400 }
      );
    }

    if (entry.code !== code) {
      return NextResponse.json(
        { error: "Invalid OTP. Please check and try again." },
        { status: 400 }
      );
    }

    // OTP verified — remove it so it can't be reused
    otpStore.delete(phone);

    return NextResponse.json({ success: true, message: "Phone verified successfully." });
  } catch (err: unknown) {
    console.error("OTP verify error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
