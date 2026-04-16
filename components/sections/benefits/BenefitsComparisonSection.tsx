"use client";

import { useState } from "react";

export default function BenefitsComparisonSection() {
  const [comparisonTarget, setComparisonTarget] = useState<"oral" | "drips">("oral");

  const comparisonData = [
    { text: "Absorbs nutrients efficiently", oral: false, drips: true },
    { text: "Delivers nutrients steadily over time", oral: false, drips: false },
    { text: "Avoids digestive breakdown", oral: false, drips: true },
    { text: "Easy to use daily", oral: true, drips: false },
    { text: "Non invasive", oral: true, drips: false },
    { text: "Designed for consistent everyday use", oral: false, drips: false },
    { text: "Cost effective over time", oral: true, drips: false },
  ];

  const Dot = ({ active }: { active: boolean }) => (
    <div 
      className={`w-[14px] h-[14px] md:w-[18px] md:h-[18px] rounded-full ${active ? 'bg-[#445C4F]' : 'bg-[#CCCCCC]'}`} 
    />
  );

  return (
    <section
      className="bg-white py-12 md:py-20 px-4 md:px-10 rounded-[12px] w-full max-w-[1252px] relative overflow-hidden"
      data-name="Comparison Table"
    >
      {/* Introduction */}
      <div className="flex flex-col gap-4 mb-8 md:mb-16 max-w-[900px] text-center md:text-left">
        <h2 className="font-['Satoshi:Regular',sans-serif] text-[36px] md:text-[64px] text-black leading-[1.1]">
          The Smarter Way to Supplement
        </h2>
        <p className="font-['Satoshi:Regular',sans-serif] text-[16px] md:text-[24px] text-[#141413]">
          Designed to deliver more of what your body needs, with less effort and fewer compromises.
        </p>
      </div>

      {/* Mobile Selector Toggle */}
      <div className="md:hidden flex bg-[#E1E1E1] rounded-full p-1 mb-10 w-full max-w-[320px] mx-auto">
        <button 
          onClick={() => setComparisonTarget("oral")}
          className={`flex-1 py-2.5 rounded-full text-[14px] transition-all duration-300 ${comparisonTarget === "oral" ? 'bg-[#445C4F] text-white font-bold' : 'text-[#535353] font-medium'}`}
        >
          Oral Supplements
        </button>
        <button 
          onClick={() => setComparisonTarget("drips")}
          className={`flex-1 py-2.5 rounded-full text-[14px] transition-all duration-300 ${comparisonTarget === "drips" ? 'bg-[#445C4F] text-white font-bold' : 'text-[#535353] font-medium'}`}
        >
          IV Drips
        </button>
      </div>

      {/* Comparison Grid */}
      <div className="w-full relative">
        
        {/* DESKTOP VIEW (4 Columns) */}
        <div className="hidden md:block w-full">
          <div className="min-w-full relative z-10">
            {/* Vertical Highlight Pill */}
            <div className="absolute top-[-40px] bottom-[-40px] left-[35%] right-[40%] bg-[#F0F0F0] rounded-[22px] z-0 pointer-events-none" />

            <div className="grid grid-cols-[40%_20%_20%_20%] border-b border-black/10 pb-8 items-end relative z-10">
              <div />
              <div className="flex flex-col items-center gap-4">
                <div className="h-[120px] w-auto"><img src="/orange-box.svg" alt="IVPatch" className="h-full object-contain" /></div>
                <span className="font-['Satoshi:Bold',sans-serif] text-[#445C4F] text-[24px]">IVPatch</span>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="h-[120px] w-auto"><img src="/medicine.svg" alt="Oral" className="h-full object-contain" /></div>
                <span className="font-['Satoshi:Medium',sans-serif] text-black/60 text-[24px]">Oral Supplements</span>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="h-[120px] w-auto"><img src="/saline.svg" alt="IV Drips" className="h-full object-contain" /></div>
                <span className="font-['Satoshi:Medium',sans-serif] text-black/60 text-[24px]">IV Drips</span>
              </div>
            </div>

            <div className="relative z-10">
              {comparisonData.map((row, idx) => (
                <div key={idx} className="grid grid-cols-[40%_20%_20%_20%] border-b border-black/5 py-8 items-center group">
                  <div className="col-span-1 pr-10">
                    <p className="font-['Satoshi:Regular',sans-serif] text-[24px] text-[#333333] leading-tight">{row.text}</p>
                  </div>
                  <div className="flex justify-center"><Dot active={true} /></div>
                  <div className="flex justify-center"><Dot active={row.oral} /></div>
                  <div className="flex justify-center"><Dot active={row.drips} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MOBILE VIEW (3 Columns with Toggle Logic) */}
        <div className="md:hidden w-full overflow-hidden">
          {/* Vertical Highlight Pill for IVPatch (Col 2: from 50% to 75%) */}
          <div className="absolute top-[-20px] bottom-[-20px] left-[50%] right-[25%] bg-[#F0F0F0] rounded-[16px] z-0 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-[50%_25%_25%] items-end border-b border-black/10 pb-6 mb-4">
            <div />
            <div className="flex flex-col items-center">
              <div className="h-[60px] w-auto flex justify-center"><img src="/orange-box.svg" alt="IVPatch" className="h-full object-contain" /></div>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-[60px] w-auto flex justify-center">
                <img 
                  src={comparisonTarget === "oral" ? "/medicine.svg" : "/saline.svg"} 
                  alt={comparisonTarget} 
                  className="h-full object-contain" 
                />
              </div>
            </div>
          </div>

          <div className="relative z-10">
            {comparisonData.map((row, idx) => (
              <div key={idx} className="grid grid-cols-[50%_25%_25%] border-b border-black/5 py-5 items-center">
                <div className="pr-4">
                  <p className="font-['Satoshi:Regular',sans-serif] text-[15px] text-[#333333] leading-snug">
                    {row.text}
                  </p>
                </div>
                <div className="flex justify-center items-center">
                  <Dot active={true} />
                </div>
                <div className="flex justify-center items-center">
                  <Dot active={comparisonTarget === "oral" ? row.oral : row.drips} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
