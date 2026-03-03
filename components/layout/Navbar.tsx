"use client";
import { useState } from "react";
import Link from "next/link";
import ComingSoonTooltip from "@/components/ui/ComingSoonTooltip";

type NavbarProps = {
  active?: "home" | "our-mission" | "benefits";
};

export default function Navbar({ active = "home" }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/", id: "home" },
    { name: "Our Mission", href: "/our-mission", id: "our-mission" },
    { name: "Benefits", href: "/benefits", id: "benefits" },
  ];

  return (
    <div
      className="bg-white px-6 md:px-10 h-[65px] md:h-[55px] relative rounded-[12px] flex items-center justify-between w-full z-[100]"
      data-name="Nav Bar"
    >
      <Link href="/" aria-label="IVPATCH home" className="flex-shrink-0">
        <div className="h-[24px] md:h-[31px] w-[120px] md:w-[157px] relative">
          <img
            alt="IVPATCH"
            className="absolute inset-0 object-contain size-full"
            src="https://www.figma.com/api/mcp/asset/5ab95cff-f10b-4eff-989f-0a5e3bc2e130"
          />
        </div>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center gap-[40px]">
        <nav className="flex items-center gap-[30px] font-['Satoshi:Medium',sans-serif] text-[18px] md:text-[20px] tracking-[-0.4px]">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className={active === link.id ? "text-[#1a1a1a]" : "text-[#808080] hover:text-[#1a1a1a] transition-colors"}
            >
              {link.name}
            </Link>
          ))}
          <ComingSoonTooltip className="text-[#808080] hover:text-[#1a1a1a] transition-colors pointer-events-auto cursor-pointer">
            Range
          </ComingSoonTooltip>
          <ComingSoonTooltip className="text-[#808080] hover:text-[#1a1a1a] transition-colors pointer-events-auto cursor-pointer">
            Affiliates
          </ComingSoonTooltip>
        </nav>

        <ComingSoonTooltip>
          <div className="h-[24px] w-[60px] relative cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
            <img
              alt="Cart and profile"
              className="absolute block size-full object-contain"
              src="https://www.figma.com/api/mcp/asset/bdc4b423-82e5-479f-a857-1eaf02ae9cf1"
            />
          </div>
        </ComingSoonTooltip>
      </div>

      {/* Mobile Hamburger Button */}
      <button
        className="lg:hidden p-2 text-[#1a1a1a]"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
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
        <div className="absolute top-[75px] left-0 right-0 bg-white rounded-[12px] p-6 shadow-xl lg:hidden z-[100] flex flex-col gap-6 font-['Satoshi:Medium',sans-serif] text-[20px]">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className={active === link.id ? "text-[#1a1a1a]" : "text-[#808080]"}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <ComingSoonTooltip className="text-[#808080]">Range</ComingSoonTooltip>
          <ComingSoonTooltip className="text-[#808080]">Affiliates</ComingSoonTooltip>
          <div className="h-[1px] bg-black/5 w-full my-2" />
          <ComingSoonTooltip>
            <div className="flex justify-start">
              <img
                alt="Cart and profile"
                className="h-[24px] w-[60px] object-contain opacity-80"
                src="https://www.figma.com/api/mcp/asset/bdc4b423-82e5-479f-a857-1eaf02ae9cf1"
              />
            </div>
          </ComingSoonTooltip>
        </div>
      )}
    </div>
  );
}
