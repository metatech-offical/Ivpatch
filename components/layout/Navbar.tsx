"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

type NavbarProps = {
  active?: "home" | "range" | "our-mission" | "benefits" | "affiliates";
};

export default function Navbar({ active = "home" }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { hasItems, setIsOpen } = useCart();
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const handleProfileClick = () => {
    if (isLoggedIn) {
      router.push("/profile");
    } else {
      router.push("/login");
    }
  };

  const navLinks = [
    { name: "Home", href: "/", id: "home" },
    { name: "Range", href: "/range", id: "range" },
    { name: "Our Mission", href: "/our-mission", id: "our-mission" },
    { name: "Benefits", href: "/benefits", id: "benefits" },
    { name: "Affiliates", href: "#", id: "affiliates" },
  ];

  return (
    <div
      className="bg-white h-[55px] rounded-[12px] flex items-center justify-between w-full max-w-[1252px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] sticky top-[24px] z-[1001]"
      data-name="Nav Bar"
    >
      {/* Logo Section */}
      <Link href="/" aria-label="IVPATCH home" className="pl-[40px] flex-shrink-0">
        <div className="h-full flex items-center">
          <img
            alt="IVPATCH"
            className="h-[24px] w-auto"
            src="/iv-black-logo.svg"
          />
        </div>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center gap-[24px] pr-[40px]">
        <nav className="flex items-center gap-[24px] text-[20px] font-medium font-sans">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className={active === link.id ? "text-[#1A1A1A]" : "text-[#808080] hover:text-[#1A1A1A] transition-colors"}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Icons & Divider */}
        <div className="flex items-center gap-[8px] ml-[8px]">
          <button 
            onClick={() => setIsOpen(true)}
            aria-label="Cart" 
            className="p-1 text-[#808080] hover:text-[#1A1A1A] transition-colors flex items-center group relative">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[24px] h-[24px]">
              <path d="M8.99984 9H6.84697C6.35813 9 5.94094 9.35341 5.86057 9.8356L4.19391 19.8356C4.09232 20.4451 4.56236 21 5.1803 21H18.8193C19.4373 21 19.9073 20.4451 19.8057 19.8356L18.1391 9.8356C18.0587 9.35341 17.6415 9 17.1527 9H14.9998M8.99984 9H14.9998M8.99984 9C8.66651 7.66667 7.99984 3 11.9998 3C15.9998 3 15.3331 7.66667 14.9998 9" stroke="currentColor" strokeLinejoin="round"/>
            </svg>
            {hasItems && (
              <div className="absolute top-[4px] right-[4px] w-[9px] h-[9px] bg-[#FF0000] rounded-full border-[1.5px] border-white" />
            )}
          </button>
          <div className="w-[1px] h-[20px] bg-[#D9D9D9]" />
          <button 
            aria-label="User" 
            onClick={handleProfileClick}
            className="p-1 text-[#808080] hover:text-[#1A1A1A] transition-colors flex items-center group"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[24px] h-[24px]">
              <path d="M12.0001 12.5664C14.3913 12.5664 16.3297 10.628 16.3297 8.2368C16.3297 5.84562 14.3913 3.9072 12.0001 3.9072C9.60895 3.9072 7.67053 5.84562 7.67053 8.2368C7.67053 10.628 9.60895 12.5664 12.0001 12.5664Z" stroke="currentColor" strokeWidth="0.96" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9.10062 11.4336C9.09102 11.4336 9.09102 11.4336 9.08142 11.4432" stroke="currentColor" strokeWidth="0.96" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16.7714 12.3072C19.2578 13.824 20.9474 16.5024 21.1202 19.584C21.1298 19.8624 20.909 20.0928 20.6306 20.0928H3.36978C3.09138 20.0928 2.87058 19.8624 2.88018 19.584C3.05298 16.5216 4.73298 13.8528 7.19058 12.336" stroke="currentColor" strokeWidth="0.96" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Hamburger Button */}
      <button
        className="lg:hidden pr-[20px] text-black"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          )}
        </svg>
      </button>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="absolute top-[65px] left-0 right-0 bg-white rounded-[12px] p-6 shadow-xl lg:hidden z-[100] flex flex-col gap-4 font-medium text-[18px]">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className={active === link.id ? "text-[#1A1A1A]" : "text-[#808080]"}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-[1px] bg-[#E5E5E5] w-full my-2" />
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsOpen(true)}
                aria-label="Cart" 
                className="text-[#808080] hover:text-[#1A1A1A] transition-colors flex items-center group relative">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[24px] h-[24px]">
                  <path d="M8.99984 9H6.84697C6.35813 9 5.94094 9.35341 5.86057 9.8356L4.19391 19.8356C4.09232 20.4451 4.56236 21 5.1803 21H18.8193C19.4373 21 19.9073 20.4451 19.8057 19.8356L18.1391 9.8356C18.0587 9.35341 17.6415 9 17.1527 9H14.9998M8.99984 9H14.9998M8.99984 9C8.66651 7.66667 7.99984 3 11.9998 3C15.9998 3 15.3331 7.66667 14.9998 9" stroke="currentColor" strokeLinejoin="round"/>
                </svg>
                {hasItems && (
                  <div className="absolute top-[3px] right-[3px] w-[8px] h-[8px] bg-[#FF0000] rounded-full border border-white" />
                )}
              </button>
              <div className="w-[1px] h-[20px] bg-[#D9D9D9]" />
              <button 
                aria-label="User" 
                onClick={() => {
                  setIsMenuOpen(false);
                  handleProfileClick();
                }}
                className="text-[#808080] hover:text-[#1A1A1A] transition-colors flex items-center group"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[24px] h-[24px]">
                  <path d="M12.0001 12.5664C14.3913 12.5664 16.3297 10.628 16.3297 8.2368C16.3297 5.84562 14.3913 3.9072 12.0001 3.9072C9.60895 3.9072 7.67053 5.84562 7.67053 8.2368C7.67053 10.628 9.60895 12.5664 12.0001 12.5664Z" stroke="currentColor" strokeWidth="0.96" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9.10062 11.4336C9.09102 11.4336 9.09102 11.4336 9.08142 11.4432" stroke="currentColor" strokeWidth="0.96" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16.7714 12.3072C19.2578 13.824 20.9474 16.5024 21.1202 19.584C21.1298 19.8624 20.909 20.0928 20.6306 20.0928H3.36978C3.09138 20.0928 2.87058 19.8624 2.88018 19.584C3.05298 16.5216 4.73298 13.8528 7.19058 12.336" stroke="currentColor" strokeWidth="0.96" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
        </div>
      )}
    </div>

  );
}
