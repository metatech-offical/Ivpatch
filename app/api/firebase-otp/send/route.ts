import { NextRequest, NextResponse } from "next/server";

// Shared OTP store (survives Next.js hot-reloads in dev)
declare global {
  // eslint-disable-next-line no-var
  var _otpStore: Map<string, { code: string; expiresAt: number }> | undefined;
}
const otpStore: Map<string, { code: string; expiresAt: number }> =
  global._otpStore ?? (global._otpStore = new Map());

export async function POST(req: NextRequest) {
  try {
    const { phone } = await req.json();

    if (!phone || typeof phone !== "string") {
      return NextResponse.json({ error: "Phone number is required." }, { status: 400 });
    }

    // Generate 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    otpStore.set(phone, { code, expiresAt });

    // ─── SMS Integration ──────────────────────────────────────────────────────
    // Plug in your preferred SMS provider here (Twilio, Fast2SMS, MSG91, etc.)
    // Example with Fast2SMS (free tier, great for India):
    //
    // await fetch("https://www.fast2sms.com/dev/bulkV2", {
    //   method: "POST",
    //   headers: { authorization: process.env.FAST2SMS_API_KEY!, "Content-Type": "application/json" },
    //   body: JSON.stringify({ variables_values: code, route: "otp", numbers: phone.replace("+91", "") }),
    // });
    //
    // For now, OTP is logged to the server console for local development:
    console.log(`\n📱 OTP for ${phone}: ${code}\n`);
    // ─────────────────────────────────────────────────────────────────────────

    return NextResponse.json({ success: true, message: "OTP sent." });
  } catch (err: unknown) {
    console.error("OTP send error:", err);
    return NextResponse.json({ error: "Failed to send OTP." }, { status: 500 });
  }
}
