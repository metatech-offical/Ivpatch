import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Sends a phone verification code via Firebase Identity Toolkit v1 REST API.
 *
 * The previous implementation used the v2 Identity Platform endpoint
 * (`/v2/projects/.../phoneNumbers:sendVerificationCode`) which requires
 * Identity Platform (paid upgrade) to be enabled. If it isn't, Google
 * returns an HTML 404 page, which blows up `response.json()`.
 *
 * This version uses the standard v1 endpoint that works with basic
 * Firebase Authentication out of the box.
 */
export async function POST(req: NextRequest) {
  try {
    const { phone, recaptchaToken } = await req.json();

    if (!phone) {
      return NextResponse.json(
        { error: "Phone number is required." },
        { status: 400 }
      );
    }

    const FIREBASE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

    if (!FIREBASE_API_KEY) {
      return NextResponse.json(
        {
          error: "Server configuration missing.",
          details: "Missing FIREBASE_API_KEY",
        },
        { status: 500 }
      );
    }

    // Call Firebase Identity Toolkit v1 REST API to send verification code
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendVerificationCode?key=${FIREBASE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: phone,
          recaptchaToken: recaptchaToken,
        }),
      }
    );

    // Safely parse the response — it might not be JSON if something is
    // misconfigured on Google's side (e.g. wrong API key, disabled API).
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      const text = await response.text();
      console.error(
        "Firebase API returned non-JSON response:",
        response.status,
        text.slice(0, 500)
      );
      return NextResponse.json(
        {
          error:
            "Firebase API returned an unexpected response. Please check your Firebase project configuration.",
          details: `Status ${response.status}, Content-Type: ${contentType}`,
        },
        { status: 502 }
      );
    }

    const data = await response.json();

    if (!response.ok) {
      console.error("Firebase REST API Error:", data);

      return NextResponse.json(
        {
          error:
            data.error?.message || "Failed to send verification code.",
          details: data.error,
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
    return NextResponse.json(
      {
        error: "Internal server error",
        details: err.message || err.toString(),
      },
      { status: 500 }
    );
  }
}
