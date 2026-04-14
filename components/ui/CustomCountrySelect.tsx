"use client";

import React, { useState, useRef, useEffect } from "react";
import { getCountries, getCountryCallingCode } from "react-phone-number-input";
import en from "react-phone-number-input/locale/en";
import flags from "react-phone-number-input/flags";

type CountryCode = Parameters<typeof getCountryCallingCode>[0];

interface CustomCountrySelectProps {
  value?: CountryCode;
  onChange: (country: CountryCode) => void;
  labels?: Record<string, string>;
}

export default function CustomCountrySelect({ value, onChange }: CustomCountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const countries = getCountries();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search on open
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const getLabel = (code: CountryCode) => {
    return (en as Record<string, string>)[code] || code;
  };

  const filteredCountries = countries.filter((country) => {
    const label = getLabel(country).toLowerCase();
    const callingCode = `+${getCountryCallingCode(country)}`;
    const q = search.toLowerCase();
    return label.includes(q) || callingCode.includes(q) || country.toLowerCase().includes(q);
  });

  const FlagComponent = value && flags[value] ? flags[value] : null;

  return (
    <div ref={dropdownRef} className="relative h-full flex items-center">
      {/* Selected Country Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 h-full px-4 bg-white/80 rounded-l-[16px] cursor-pointer hover:bg-white/90 transition-all"
      >
        {/* Flag */}
        <div className="w-[36px] h-[26px] rounded-[4px] overflow-hidden shadow-sm flex-shrink-0">
          {FlagComponent ? (
            <FlagComponent title={value || ""} />
          ) : (
            <div className="w-full h-full bg-gray-200" />
          )}
        </div>
        {/* Dropdown Arrow */}
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#555"
          strokeWidth="2.5"
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] left-0 w-[320px] max-h-[340px] bg-white rounded-[12px] shadow-[0_12px_40px_rgba(0,0,0,0.15)] border border-black/5 z-[100] flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Search */}
          <div className="p-3 border-b border-black/5">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-[40px] bg-[#f2f2f2] rounded-[10px] px-4 text-[14px] font-['Satoshi:Regular',sans-serif] text-[#1a1a1a] outline-none placeholder:text-[#999]"
            />
          </div>
          {/* Country List */}
          <div className="overflow-y-auto flex-1 py-1 custom-scrollbar">
            {filteredCountries.map((country) => {
              const FlagItem = flags[country];
              const callingCode = `+${getCountryCallingCode(country)}`;
              const label = getLabel(country);
              const isSelected = country === value;

              return (
                <button
                  key={country}
                  type="button"
                  onClick={() => {
                    onChange(country);
                    setIsOpen(false);
                    setSearch("");
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-[#f5f5f5] ${
                    isSelected ? "bg-[#f0f7f3]" : ""
                  }`}
                >
                  {/* Flag */}
                  <div className="w-[28px] h-[20px] rounded-[3px] overflow-hidden shadow-sm flex-shrink-0">
                    {FlagItem ? <FlagItem title={country} /> : <div className="w-full h-full bg-gray-200" />}
                  </div>
                  {/* Country Name */}
                  <span className={`flex-1 text-[14px] font-['Satoshi:Regular',sans-serif] truncate ${isSelected ? "text-[#445C4F] font-['Satoshi:Medium',sans-serif]" : "text-[#1a1a1a]"}`}>
                    {label}
                  </span>
                  {/* Calling Code */}
                  <span className="text-[14px] font-['Satoshi:Medium',sans-serif] text-[#808080] flex-shrink-0">
                    {callingCode}
                  </span>
                  {/* Selected Check */}
                  {isSelected && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#445C4F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              );
            })}
            {filteredCountries.length === 0 && (
              <p className="text-center text-[#999] text-[14px] py-6 font-['Satoshi:Regular',sans-serif]">No results found</p>
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ddd;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #bbb;
        }
      `}</style>
    </div>
  );
}
