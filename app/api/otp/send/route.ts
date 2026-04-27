import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

// Shared global OTP store so send & verify routes share state across Next.js module instances
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

    // Store OTP
    otpStore.set(phone, { code, expiresAt });

    // Send via Twilio
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromPhone = process.env.TWILIO_PHONE_NUMBER;

    if (!accountSid || !authToken || !fromPhone) {
      console.error("Twilio credentials missing from environment.");
      return NextResponse.json({ error: "SMS service is not configured." }, { status: 500 });
    }

    const client = twilio(accountSid, authToken);

    await client.messages.create({
      body: `Your IV Patch verification code is: ${code}. Valid for 10 minutes. Do not share this with anyone.`,
      from: fromPhone,
      to: phone,
    });

    return NextResponse.json({ success: true, message: "OTP sent successfully." });
  } catch (err: unknown) {
    console.error("OTP send error:", err);
    const message =
      err instanceof Error ? err.message : "Failed to send OTP.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
