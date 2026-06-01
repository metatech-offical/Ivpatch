import { NextRequest, NextResponse } from "next/server";
import { getAdminAuth } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

/**
 * Verifies the phone code via Firebase Identity Toolkit v1 REST API.
 * On success, it creates a custom token via Admin SDK for the client.
 *
 * Uses the v1 endpoint (`/v1/accounts:signInWithPhoneNumber`) which works
 * with standard Firebase Authentication — no Identity Platform upgrade needed.
 */
export async function POST(req: NextRequest) {
  try {
    const { phone, code, sessionInfo } = await req.json();

    if (!code || !sessionInfo) {
      return NextResponse.json(
        { error: "Code and session info are required." },
        { status: 400 }
      );
    }

    const FIREBASE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

    if (!FIREBASE_API_KEY) {
      return NextResponse.json(
        { error: "Server configuration missing." },
        { status: 500 }
      );
    }

    // 1. Verify the code via Firebase Identity Toolkit v1 REST API
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPhoneNumber?key=${FIREBASE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionInfo,
          code,
        }),
      }
    );

    // Safely parse the response — guard against non-JSON replies
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      const text = await response.text();
      console.error(
        "Firebase Verify API returned non-JSON response:",
        response.status,
        text.slice(0, 500)
      );
      return NextResponse.json(
        {
          error:
            "Firebase API returned an unexpected response. Please check your Firebase project configuration.",
        },
        { status: 502 }
      );
    }

    const data = await response.json();

    if (!response.ok) {
      console.error("Firebase Verify API Error:", data);
      return NextResponse.json(
        {
          error:
            data.error?.message ||
            "Invalid or expired verification code.",
        },
        { status: response.status }
      );
    }

    // 2. Get the UID (localId) from the response
    const uid = data.localId;

    if (!uid) {
      console.error("Firebase Verify API did not return localId:", data);
      return NextResponse.json(
        { error: "Verification succeeded but no user ID was returned." },
        { status: 500 }
      );
    }

    // 3. (Optional) Update user profile or fetch existing user
    try {
      await getAdminAuth().getUser(uid);
    } catch (err: any) {
      if (err.code === "auth/user-not-found") {
        // Create new user if they don't exist
        await getAdminAuth().createUser({
          uid,
          phoneNumber: phone,
        });
      } else {
        throw err;
      }
    }

    // 4. Create a custom token for the frontend to sign in with
    const customToken = await getAdminAuth().createCustomToken(uid);

    return NextResponse.json({
      success: true,
      customToken,
      uid,
    });
  } catch (err: any) {
    console.error("OTP verify error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
