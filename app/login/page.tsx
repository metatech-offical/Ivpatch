"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import CustomCountrySelect from "@/components/ui/CustomCountrySelect";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithCustomToken,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
  ConfirmationResult,
} from "firebase/auth";
import "react-phone-number-input/style.css";

const IS_DEV = process.env.NODE_ENV === "development";

export default function LoginPage() {
  const [phone, setPhone] = useState<string | undefined>("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(0);
  // Firebase Phone Auth confirmation (production only)
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const { loginWithPhone, loginWithSocial } = useAuth();

  useEffect(() => {
    if (resendTimer > 0) {
      const t = setTimeout(() => setResendTimer((s) => s - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [resendTimer]);

  useEffect(() => {
    if (otpSent && otpRefs.current[0]) otpRefs.current[0]?.focus();
  }, [otpSent]);

  // Cleanup dynamic reCAPTCHA container on unmount
  useEffect(() => {
    return () => {
      document.getElementById("recaptcha-container-login")?.remove();
    };
  }, []);

  // ─── reCAPTCHA: remove + recreate DOM element each time (production) ──────
  const createFreshVerifier = useCallback((): RecaptchaVerifier => {
    document.getElementById("recaptcha-container-login")?.remove();
    const div = document.createElement("div");
    div.id = "recaptcha-container-login";
    document.body.appendChild(div);
    return new RecaptchaVerifier(auth, "recaptcha-container-login", {
      size: "invisible",
    });
  }, []);

  // ─── Send OTP ─────────────────────────────────────────────────────────────
  const handleGetOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!phone || !isValidPhoneNumber(phone)) {
      setError("Please enter a valid phone number.");
      return;
    }
    if (!agreedToTerms) {
      setError("Please agree to the Terms of Service & Privacy Policy.");
      return;
    }

    setLoading(true);

    if (IS_DEV) {
      // ── Development: server-side OTP (printed to terminal) ──
      try {
        const res = await fetch("/api/firebase-otp/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone }),
        });
        const data = await res.json();
        if (!res.ok) { setError(data.error || "Failed to send OTP."); setLoading(false); return; }
        setLoading(false);
        setOtpSent(true);
        setResendTimer(30);
      } catch {
        setError("Network error. Please try again.");
        setLoading(false);
      }
    } else {
      // ── Production: Firebase Phone Auth (real SMS via Firebase) ──
      try {
        if (!auth.app) {
          throw new Error("Firebase is not initialized. Please check your API keys in Vercel settings.");
        }
        const verifier = createFreshVerifier();
        const result = await signInWithPhoneNumber(auth, phone, verifier);
        setConfirmationResult(result);
        setLoading(false);
        setOtpSent(true);
        setResendTimer(30);
      } catch (err: unknown) {
        console.error("OTP send error:", err);
        setError(err instanceof Error ? err.message : "Failed to send OTP (Internal Error).");
        setLoading(false);
      }
    }
  };

  // ─── Verify OTP ───────────────────────────────────────────────────────────
  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const code = otp.join("");
    if (code.length < 6) { setError("Please enter the complete 6-digit code."); return; }

    setLoading(true);

    if (IS_DEV) {
      // ── Development: verify via Admin SDK → get custom token ──
      try {
        const res = await fetch("/api/firebase-otp/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone, code }),
        });
        const data = await res.json();
        if (!res.ok) { setError(data.error || "Invalid OTP."); setLoading(false); return; }
        const credential = await signInWithCustomToken(auth, data.customToken);
        loginWithPhone(credential.user.phoneNumber || phone || "", credential.user.uid);
        router.push("/");
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Sign-in failed.");
        setLoading(false);
      }
    } else {
      // ── Production: verify via Firebase confirmationResult ──
      if (!confirmationResult) { setError("Session expired. Please request a new OTP."); setLoading(false); return; }
      try {
        const credential = await confirmationResult.confirm(code);
        loginWithPhone(credential.user.phoneNumber || phone || "", credential.user.uid);
        router.push("/");
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Invalid OTP. Please try again.");
        setLoading(false);
      }
    }
  };

  // ─── Resend OTP ───────────────────────────────────────────────────────────
  const handleResend = async () => {
    if (resendTimer > 0) return;
    setOtp(["", "", "", "", "", ""]);
    setError("");
    setResendTimer(30);

    if (IS_DEV) {
      try {
        const res = await fetch("/api/firebase-otp/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone }),
        });
        const data = await res.json();
        if (!res.ok) setError(data.error || "Failed to resend OTP.");
      } catch { setError("Network error."); }
    } else {
      try {
        const verifier = createFreshVerifier();
        const result = await signInWithPhoneNumber(auth, phone!, verifier);
        setConfirmationResult(result);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to resend OTP.");
      }
    }
  };

  // ─── OTP input helpers ────────────────────────────────────────────────────
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      const digits = value.replace(/\D/g, "").slice(0, 6);
      const newOtp = [...otp];
      digits.split("").forEach((d, i) => { if (index + i < 6) newOtp[index + i] = d; });
      setOtp(newOtp);
      otpRefs.current[Math.min(index + digits.length, 5)]?.focus();
      return;
    }
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) otpRefs.current[index - 1]?.focus();
  };

  // ─── Social sign-ins ──────────────────────────────────────────────────────
  const handleGoogleSignIn = async () => {
    setError(""); setLoading(true);
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      loginWithSocial(result.user);
      router.push("/");
    } catch (err: unknown) { setError(err instanceof Error ? err.message : "Google sign-in failed."); setLoading(false); }
  };

  const handleAppleSignIn = async () => {
    setError(""); setLoading(true);
    try {
      const provider = new OAuthProvider("apple.com");
      provider.addScope("email"); provider.addScope("name");
      const result = await signInWithPopup(auth, provider);
      loginWithSocial(result.user);
      router.push("/");
    } catch (err: unknown) { setError(err instanceof Error ? err.message : "Apple sign-in failed."); setLoading(false); }
  };

  const Spinner = () => (
    <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );

  return (
    <main className="bg-[#f2f2f2] min-h-screen p-[20px] md:p-[22px]">
      <div className="max-w-[1252px] mx-auto flex flex-col gap-6 items-center">
        <Navbar />
        <div className="w-full max-w-[1252px] min-h-[722px] bg-[#9DA9A3] rounded-[16px] flex items-center justify-center py-12 md:py-16 px-4 relative">

          {otpSent ? (
            <div className="flex flex-col items-center w-full max-w-[627px]">
              <button type="button" onClick={() => { setOtpSent(false); setOtp(["","","","","",""]); setError(""); setConfirmationResult(null); }}
                className="absolute top-6 left-8 flex items-center gap-2 text-white/80 hover:text-white text-[16px] font-['Satoshi:Regular',sans-serif] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                Go Back
              </button>
              <img src="/login-icon.svg" alt="Sign In" className="w-[100px] h-[100px] mb-6" />
              <h1 className="text-white text-[28px] md:text-[30px] font-['Satoshi:Bold',sans-serif] mb-2 text-center">Sign in to continue</h1>
              {IS_DEV && (
                <p className="text-yellow-200 text-[13px] font-['Satoshi:Regular',sans-serif] mb-2 text-center bg-black/20 px-3 py-1 rounded-full">
                  🛠 Dev mode — check your server terminal for the OTP
                </p>
              )}
              <p className="text-white/60 text-[15px] md:text-[17px] font-['Satoshi:Regular',sans-serif] mb-2 text-center">
                {IS_DEV ? "Enter the OTP from your terminal" : "We've sent a 6-digit code to"}
              </p>
              <p className="text-white font-['Satoshi:Bold',sans-serif] text-[16px] mb-8 text-center">{phone}</p>

              <form onSubmit={handleContinue} className="w-full flex flex-col items-center gap-6">
                <div className="flex items-center justify-center gap-[10px] md:gap-[14px]">
                  {otp.map((digit, idx) => (
                    <input key={idx} ref={(el) => { otpRefs.current[idx] = el; }} type="text" inputMode="numeric" maxLength={6} value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)} onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className="w-[50px] h-[72px] md:w-[58px] md:h-[84px] bg-white/20 border border-white/25 rounded-[12px] text-white text-[30px] md:text-[34px] font-['Satoshi:Bold',sans-serif] text-center outline-none focus:border-white/70 focus:bg-white/30 transition-all placeholder:text-white/25"
                      placeholder="–" />
                  ))}
                </div>
                {error && <p className="text-red-200 text-[14px] font-['Satoshi:Regular',sans-serif] text-center">{error}</p>}
                <button type="submit" disabled={loading}
                  className="w-full max-w-[627px] h-[64px] bg-[#445C4F] hover:bg-[#3a5043] text-white rounded-[16px] text-[24px] md:text-[28px] font-['Satoshi:Bold',sans-serif] transition-all active:scale-[0.98] flex items-center justify-center disabled:opacity-60 shadow-lg mt-4">
                  {loading ? <div className="flex items-center gap-3"><Spinner />Verifying…</div> : "Continue"}
                </button>
                <div className="flex flex-col items-center gap-1 mt-2">
                  <p className="text-white/60 text-[15px] font-['Satoshi:Regular',sans-serif]">Didn&apos;t receive OTP?</p>
                  <button type="button" onClick={handleResend} disabled={resendTimer > 0}
                    className={`text-[16px] font-['Satoshi:Bold',sans-serif] underline underline-offset-2 transition-colors ${resendTimer > 0 ? "text-white/40 cursor-not-allowed" : "text-white hover:text-white/90 cursor-pointer"}`}>
                    {resendTimer > 0 ? `Resend Code (${resendTimer}s)` : "Resend Code"}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="flex flex-col items-center w-full max-w-[627px]">
              <img src="/login-icon.svg" alt="Sign In" className="w-[100px] h-[100px] mb-6" />
              <h1 className="text-white text-[28px] md:text-[30px] font-['Satoshi:Bold',sans-serif] mb-8 text-center">Sign in to Continue</h1>
              <form onSubmit={handleGetOtp} className="w-full flex flex-col items-center gap-5">
                <div className="w-full h-[82px] rounded-[16px] flex items-center overflow-visible login-phone-wrapper">
                  <PhoneInput international countryCallingCodeEditable={false} defaultCountry="AE" value={phone}
                    onChange={(value) => setPhone(value)} placeholder="Enter your phone number"
                    className="w-full h-full phone-input-custom" countrySelectComponent={CustomCountrySelect}
                    numberInputProps={{ className: "phone-number-input" }} />
                </div>
                {error && <p className="text-red-200 text-[14px] font-['Satoshi:Regular',sans-serif] w-full text-left">{error}</p>}
                <label className="flex items-center gap-3 w-full cursor-pointer select-none mt-1">
                  <div onClick={(e) => { e.preventDefault(); setAgreedToTerms(!agreedToTerms); }}
                    className={`w-[22px] h-[22px] rounded-[5px] border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200 cursor-pointer ${agreedToTerms ? "bg-white border-white" : "bg-transparent border-white/70"}`}>
                    {agreedToTerms && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#445C4F" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
                  </div>
                  <span className="text-white/80 text-[14px] md:text-[16px] font-['Satoshi:Medium',sans-serif] leading-snug">
                    I agree to the <span className="text-white font-['Satoshi:Bold',sans-serif]">Terms of Service</span> & <span className="text-white font-['Satoshi:Bold',sans-serif]">Privacy Policy</span>
                  </span>
                </label>
                <button type="submit" disabled={loading}
                  className="w-full h-[64px] bg-[#445C4F] hover:bg-[#3a5043] text-white rounded-[16px] text-[24px] md:text-[30px] font-['Satoshi:Bold',sans-serif] transition-all active:scale-[0.98] flex items-center justify-center disabled:opacity-60 shadow-lg mt-2">
                  {loading ? <div className="flex items-center gap-3"><Spinner />Sending OTP…</div> : "Get OTP"}
                </button>
                <div className="flex items-center gap-4 w-full my-2">
                  <div className="flex-1 h-[1px] bg-white/20" />
                  <span className="text-white/60 text-[14px] font-['Satoshi:Regular',sans-serif] whitespace-nowrap">or continue with</span>
                  <div className="flex-1 h-[1px] bg-white/20" />
                </div>
                <div className="flex items-center justify-center gap-6">
                  <button type="button" id="google-signin-btn" onClick={handleGoogleSignIn} disabled={loading}
                    className="w-[56px] h-[56px] rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/25 transition-all disabled:opacity-50">
                    <img src="/google-icon.svg" alt="Google" className="w-[24px] h-[24px] object-contain" />
                  </button>
                  <button type="button" id="apple-signin-btn" onClick={handleAppleSignIn} disabled={loading}
                    className="w-[56px] h-[56px] rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/25 transition-all disabled:opacity-50">
                    <img src="/apple-icon.svg" alt="Apple" className="w-[24px] h-[24px] object-contain" />
                  </button>
                </div>
                <p className="text-white/70 text-[14px] md:text-[16px] font-['Satoshi:Regular',sans-serif] mt-4">
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="text-white font-['Satoshi:Bold',sans-serif] hover:underline underline-offset-2">Register Here</Link>
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
      <style jsx global>{`
        .login-phone-wrapper .PhoneInput { display: flex; align-items: center; height: 100%; width: 100%; gap: 0; position: relative; }
        .login-phone-wrapper .phone-number-input, .login-phone-wrapper .PhoneInputInput {
          background: rgba(255,255,255,0.15) !important; border: none !important; outline: none !important;
          color: white; font-size: 20px; font-family: 'Satoshi', sans-serif; font-weight: 400;
          padding-left: 18px; height: 100%; flex: 1; border-radius: 0 16px 16px 0;
        }
        .login-phone-wrapper .PhoneInputInput::placeholder { color: rgba(255,255,255,0.45); font-weight: 400; }
        .login-phone-wrapper .PhoneInputCountryCallingCode { color: white; font-size: 20px; font-family: 'Satoshi', sans-serif; font-weight: 500; }
      `}</style>
    </main>
  );
}
