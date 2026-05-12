import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Sends a phone verification code via Firebase Identity Toolkit REST API.
 * This bypasses the flaky client-side RecaptchaVerifier and uses reCAPTCHA Enterprise.
 */
export async function POST(req: NextRequest) {
  try {
    const { phone, recaptchaToken } = await req.json();

    if (!phone) {
      return NextResponse.json({ error: "Phone number is required." }, { status: 400 });
    }

    const FIREBASE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

    // 1. Call Firebase Identity Toolkit REST API to send verification code
    // This requires the 'reCAPTCHA Enterprise' token from the frontend.
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendVerificationCode?key=${FIREBASE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: phone,
          recaptchaToken: recaptchaToken,
          recaptchaVersion: "RECAPTCHA_ENTERPRISE"
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Firebase REST API Error:", data);
      
      // Return the detailed error to the client for debugging
      return NextResponse.json(
        { 
          error: data.error?.message || "Failed to send verification code.",
          details: data.error // Added full error details
        },
        { status: response.status }
      );
    }

    // Return the sessionInfo (required for verification)
    return NextResponse.json({
      success: true,
      sessionInfo: data.sessionInfo,
    });
  } catch (err: any) {
    console.error("OTP send error:", err);
    return NextResponse.json({ 
      error: "Internal server error",
      details: err.message || err.toString()
    }, { status: 500 });
  }
}
