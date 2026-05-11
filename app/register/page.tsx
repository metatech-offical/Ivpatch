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
type Step = "phone" | "otp" | "details";

export default function RegisterPage() {
  const [phone, setPhone] = useState<string | undefined>("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<Step>("phone");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(0);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const { registerUser, loginWithSocial } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");

  useEffect(() => {
    if (resendTimer > 0) {
      const t = setTimeout(() => setResendTimer((s) => s - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [resendTimer]);

  useEffect(() => {
    if (step === "otp" && otpRefs.current[0]) otpRefs.current[0]?.focus();
  }, [step]);

  // ─── reCAPTCHA initialization ──────
  const verifierRef = useRef<RecaptchaVerifier | null>(null);

  const getVerifier = useCallback(() => {
    if (verifierRef.current) return verifierRef.current;
    
    // Use the element from the DOM (defined in the JSX below)
    const container = document.getElementById("recaptcha-container-register");
    if (!container) return null;

    const verifier = new RecaptchaVerifier(auth, container, {
      size: "invisible",
      callback: () => {
        // reCAPTCHA solved
      },
      "expired-callback": () => {
        setError("reCAPTCHA expired. Please try again.");
      }
    });
    verifierRef.current = verifier;
    return verifier;
  }, []);

  // ─── Send OTP ─────────────────────────────────────────────────────────────
  const handleGetOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!phone || !isValidPhoneNumber(phone)) { setError("Please enter a valid phone number."); return; }
    if (!agreedToTerms) { setError("Please agree to the Terms of Service & Privacy Policy."); return; }

    setLoading(true);
    if (IS_DEV) {
      try {
        const res = await fetch("/api/firebase-otp/send", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone }),
        });
        const data = await res.json();
        if (!res.ok) { setError(data.error || "Failed to send OTP."); setLoading(false); return; }
        setLoading(false); setStep("otp"); setResendTimer(30);
      } catch { setError("Network error."); setLoading(false); }
    } else {
      try {
        if (!auth.app) {
          throw new Error("Firebase is not initialized. Please check your API keys in Vercel settings.");
        }
        const verifier = getVerifier();
        if (!verifier) throw new Error("reCAPTCHA container not found.");

        const result = await signInWithPhoneNumber(auth, phone, verifier);
        setConfirmationResult(result);
        setLoading(false); setStep("otp"); setResendTimer(30);
      } catch (err: unknown) {
        console.error("OTP send error:", err);
        // If it's a reCAPTCHA error, we might need to reset it
        if (verifierRef.current) {
          try { verifierRef.current.clear(); verifierRef.current = null; } catch {}
        }
        setError(err instanceof Error ? err.message : "Failed to send OTP (Internal Error).");
        setLoading(false);
      }
    }
  };

  // ─── Verify OTP ───────────────────────────────────────────────────────────
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const code = otp.join("");
    if (code.length < 6) { setError("Please enter the complete 6-digit code."); return; }

    setLoading(true);
    if (IS_DEV) {
      try {
        const res = await fetch("/api/firebase-otp/verify", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone, code }),
        });
        const data = await res.json();
        if (!res.ok) { setError(data.error || "Invalid OTP."); setLoading(false); return; }
        await signInWithCustomToken(auth, data.customToken);
        setLoading(false); setStep("details");
      } catch (err: unknown) { setError(err instanceof Error ? err.message : "Verification failed."); setLoading(false); }
    } else {
      if (!confirmationResult) { setError("Session expired. Please request a new OTP."); setLoading(false); return; }
      try {
        await confirmationResult.confirm(code);
        setLoading(false); setStep("details");
      } catch (err: unknown) { setError(err instanceof Error ? err.message : "Invalid OTP."); setLoading(false); }
    }
  };

  // ─── Resend OTP ───────────────────────────────────────────────────────────
  const handleResend = async () => {
    if (resendTimer > 0) return;
    setOtp(["", "", "", "", "", ""]); setError(""); setResendTimer(30);
    if (IS_DEV) {
      try {
        const res = await fetch("/api/firebase-otp/send", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone }),
        });
        const data = await res.json();
        if (!res.ok) setError(data.error || "Failed to resend.");
      } catch { setError("Network error."); }
    } else {
      try {
        const verifier = getVerifier();
        if (!verifier) throw new Error("reCAPTCHA container not found.");
        const result = await signInWithPhoneNumber(auth, phone!, verifier);
        setConfirmationResult(result);
      } catch (err: unknown) { setError(err instanceof Error ? err.message : "Failed to resend."); }
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
    const newOtp = [...otp]; newOtp[index] = value; setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) otpRefs.current[index - 1]?.focus();
  };

  // ─── Details form ─────────────────────────────────────────────────────────
  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError("");
    if (!firstName.trim() || !lastName.trim()) { setError("Please enter your full name."); return; }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) { setError("Please enter a valid email address."); return; }
    setLoading(true);
    setTimeout(() => { registerUser({ phone: phone || "", firstName, lastName, email, gender }); setLoading(false); router.push("/profile"); }, 600);
  };

  // ─── Social sign-ins ──────────────────────────────────────────────────────
  const handleGoogleSignIn = async () => {
    setError(""); setLoading(true);
    try { const r = await signInWithPopup(auth, new GoogleAuthProvider()); loginWithSocial(r.user); router.push("/"); }
    catch (err: unknown) { setError(err instanceof Error ? err.message : "Google sign-in failed."); setLoading(false); }
  };

  const handleAppleSignIn = async () => {
    setError(""); setLoading(true);
    try {
      const p = new OAuthProvider("apple.com"); p.addScope("email"); p.addScope("name");
      const r = await signInWithPopup(auth, p); loginWithSocial(r.user); router.push("/");
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

          {/* Step 3: Details */}
          {step === "details" && (
            <div className="flex flex-col items-center w-full max-w-[627px]">
              <button type="button" onClick={() => { setStep("otp"); setError(""); }}
                className="absolute top-6 left-8 flex items-center gap-2 text-white/80 hover:text-white text-[16px] font-['Satoshi:Regular',sans-serif] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                Go Back
              </button>
              <img src="/login-icon.svg" alt="Details" className="w-[100px] h-[100px] mb-6" />
              <h1 className="text-white text-[28px] md:text-[30px] font-['Satoshi:Bold',sans-serif] mb-10 text-center">Add additional details</h1>
              <form onSubmit={handleDetailsSubmit} className="w-full flex flex-col items-center gap-5">
                <div className="w-full flex flex-col md:flex-row gap-4">
                  <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                    className="flex-1 h-[58px] bg-white rounded-[12px] px-5 text-[16px] md:text-[18px] font-['Satoshi:Regular',sans-serif] text-[#1a1a1a] outline-none placeholder:text-[#999]" required disabled={loading} />
                  <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}
                    className="flex-1 h-[58px] bg-white rounded-[12px] px-5 text-[16px] md:text-[18px] font-['Satoshi:Regular',sans-serif] text-[#1a1a1a] outline-none placeholder:text-[#999]" required disabled={loading} />
                </div>
                <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[58px] bg-white rounded-[12px] px-5 text-[16px] md:text-[18px] font-['Satoshi:Regular',sans-serif] text-[#1a1a1a] outline-none placeholder:text-[#999]" required disabled={loading} />
                <div className="w-full flex items-center gap-6 mt-1">
                  {["Male", "Female", "Other"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer select-none" onClick={() => setGender(opt)}>
                      <div className={`w-[20px] h-[20px] rounded-full border-2 flex items-center justify-center ${gender === opt ? "border-white" : "border-white/50"}`}>
                        {gender === opt && <div className="w-[10px] h-[10px] rounded-full bg-white" />}
                      </div>
                      <span className={`text-[16px] font-['Satoshi:Medium',sans-serif] ${gender === opt ? "text-white" : "text-white/60"}`}>{opt}</span>
                    </label>
                  ))}
                </div>
                {error && <p className="text-red-200 text-[14px] w-full text-left">{error}</p>}
                <button type="submit" disabled={loading}
                  className="w-full h-[64px] bg-[#445C4F] hover:bg-[#3a5043] text-white rounded-[16px] text-[24px] md:text-[28px] font-['Satoshi:Bold',sans-serif] transition-all flex items-center justify-center disabled:opacity-60 shadow-lg mt-4">
                  {loading ? <div className="flex items-center gap-3"><Spinner />Setting up…</div> : "Complete Registration"}
                </button>
              </form>
            </div>
          )}

          {/* Step 2: OTP */}
          {step === "otp" && (
            <div className="flex flex-col items-center w-full max-w-[627px]">
              <button type="button" onClick={() => { setStep("phone"); setOtp(["","","","","",""]); setError(""); setConfirmationResult(null); }}
                className="absolute top-6 left-8 flex items-center gap-2 text-white/80 hover:text-white text-[16px] font-['Satoshi:Regular',sans-serif] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                Go Back
              </button>
              <img src="/login-icon.svg" alt="Register" className="w-[100px] h-[100px] mb-6" />
              <h1 className="text-white text-[28px] md:text-[30px] font-['Satoshi:Bold',sans-serif] mb-2 text-center">Verify your number</h1>
              {IS_DEV && (
                <p className="text-yellow-200 text-[13px] font-['Satoshi:Regular',sans-serif] mb-2 text-center bg-black/20 px-3 py-1 rounded-full">
                  🛠 Dev mode — check your server terminal for the OTP
                </p>
              )}
              <p className="text-white/60 text-[15px] font-['Satoshi:Regular',sans-serif] mb-2 text-center">
                {IS_DEV ? "Enter the OTP from your terminal" : "We've sent a 6-digit code to"}
              </p>
              <p className="text-white font-['Satoshi:Bold',sans-serif] text-[16px] mb-8 text-center">{phone}</p>
              <form onSubmit={handleVerifyOtp} className="w-full flex flex-col items-center gap-6">
                <div className="flex items-center justify-center gap-[10px] md:gap-[14px]">
                  {otp.map((digit, idx) => (
                    <input key={idx} ref={(el) => { otpRefs.current[idx] = el; }} type="text" inputMode="numeric" maxLength={6} value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)} onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className="w-[50px] h-[72px] md:w-[58px] md:h-[84px] bg-white/20 border border-white/25 rounded-[12px] text-white text-[30px] md:text-[34px] font-['Satoshi:Bold',sans-serif] text-center outline-none focus:border-white/70 focus:bg-white/30 transition-all placeholder:text-white/25"
                      placeholder="–" />
                  ))}
                </div>
                {error && <p className="text-red-200 text-[14px] text-center">{error}</p>}
                <button type="submit" disabled={loading}
                  className="w-full h-[64px] bg-[#445C4F] hover:bg-[#3a5043] text-white rounded-[16px] text-[24px] md:text-[28px] font-['Satoshi:Bold',sans-serif] transition-all flex items-center justify-center disabled:opacity-60 shadow-lg mt-4">
                  {loading ? <div className="flex items-center gap-3"><Spinner />Verifying…</div> : "Verify & Continue"}
                </button>
                <div className="flex flex-col items-center gap-1 mt-2">
                  <p className="text-white/60 text-[15px]">Didn&apos;t receive OTP?</p>
                  <button type="button" onClick={handleResend} disabled={resendTimer > 0}
                    className={`text-[16px] font-['Satoshi:Bold',sans-serif] underline underline-offset-2 ${resendTimer > 0 ? "text-white/40 cursor-not-allowed" : "text-white cursor-pointer"}`}>
                    {resendTimer > 0 ? `Resend Code (${resendTimer}s)` : "Resend Code"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Step 1: Phone */}
          {step === "phone" && (
            <div className="flex flex-col items-center w-full max-w-[627px]">
              <img src="/login-icon.svg" alt="Register" className="w-[100px] h-[100px] mb-6" />
              <h1 className="text-white text-[28px] md:text-[30px] font-['Satoshi:Bold',sans-serif] mb-8 text-center">Create Your Account</h1>
              <form onSubmit={handleGetOtp} className="w-full flex flex-col items-center gap-5">
                <div className="w-full h-[82px] rounded-[16px] flex items-center overflow-visible register-phone-wrapper">
                  <PhoneInput international countryCallingCodeEditable={false} defaultCountry="AE" value={phone}
                    onChange={(value) => setPhone(value)} placeholder="Enter your phone number"
                    className="w-full h-full phone-input-custom" countrySelectComponent={CustomCountrySelect}
                    numberInputProps={{ className: "phone-number-input" }} />
                </div>
                {error && <p className="text-red-200 text-[14px] w-full text-left">{error}</p>}
                <label className="flex items-center gap-3 w-full cursor-pointer select-none mt-1">
                  <div onClick={(e) => { e.preventDefault(); setAgreedToTerms(!agreedToTerms); }}
                    className={`w-[22px] h-[22px] rounded-[5px] border-2 flex-shrink-0 flex items-center justify-center transition-all cursor-pointer ${agreedToTerms ? "bg-white border-white" : "bg-transparent border-white/70"}`}>
                    {agreedToTerms && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#445C4F" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                  </div>
                  <span className="text-white/80 text-[14px] md:text-[16px] font-['Satoshi:Medium',sans-serif] leading-snug">
                    I agree to the <span className="text-white font-['Satoshi:Bold',sans-serif]">Terms of Service</span> & <span className="text-white font-['Satoshi:Bold',sans-serif]">Privacy Policy</span>
                  </span>
                </label>
                <button type="submit" disabled={loading}
                  className="w-full h-[64px] bg-[#445C4F] hover:bg-[#3a5043] text-white rounded-[16px] text-[24px] md:text-[30px] font-['Satoshi:Bold',sans-serif] transition-all flex items-center justify-center disabled:opacity-60 shadow-lg mt-2">
                  {loading ? <div className="flex items-center gap-3"><Spinner />Sending OTP…</div> : "Get OTP"}
                </button>
                <div className="flex items-center gap-4 w-full my-2">
                  <div className="flex-1 h-[1px] bg-white/20" />
                  <span className="text-white/60 text-[14px] whitespace-nowrap">or continue with</span>
                  <div className="flex-1 h-[1px] bg-white/20" />
                </div>
                <div className="flex items-center justify-center gap-6">
                  <button type="button" id="google-register-btn" onClick={handleGoogleSignIn} disabled={loading}
                    className="w-[56px] h-[56px] rounded-full bg-white/15 border border-white/20 flex items-center justify-center hover:bg-white/25 transition-all disabled:opacity-50">
                    <img src="/google-icon.svg" alt="Google" className="w-[24px] h-[24px] object-contain" />
                  </button>
                  <button type="button" id="apple-register-btn" onClick={handleAppleSignIn} disabled={loading}
                    className="w-[56px] h-[56px] rounded-full bg-white/15 border border-white/20 flex items-center justify-center hover:bg-white/25 transition-all disabled:opacity-50">
                    <img src="/apple-icon.svg" alt="Apple" className="w-[24px] h-[24px] object-contain" />
                  </button>
                </div>
                <p className="text-white/70 text-[14px] md:text-[16px] mt-4">
                  Already have an account?{" "}
                  <Link href="/login" className="text-white font-['Satoshi:Bold',sans-serif] hover:underline underline-offset-2">Sign In</Link>
                </p>
              </form>
            </div>
          )}
        </div>
        <div id="recaptcha-container-register"></div>
      </div>
      <style jsx global>{`
        .register-phone-wrapper .PhoneInput { display: flex; align-items: center; height: 100%; width: 100%; gap: 0; }
        .register-phone-wrapper .phone-number-input, .register-phone-wrapper .PhoneInputInput {
          background: rgba(255,255,255,0.15) !important; border: none !important; outline: none !important;
          color: white; font-size: 20px; font-family: 'Satoshi', sans-serif; font-weight: 400;
          padding-left: 18px; height: 100%; flex: 1; border-radius: 0 16px 16px 0;
        }
        .register-phone-wrapper .PhoneInputInput::placeholder { color: rgba(255,255,255,0.45); }
        .register-phone-wrapper .PhoneInputCountryCallingCode { color: white; font-size: 20px; font-family: 'Satoshi', sans-serif; font-weight: 500; }
      `}</style>
    </main>
  );
}
