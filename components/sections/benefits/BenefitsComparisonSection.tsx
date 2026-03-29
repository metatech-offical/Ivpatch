export default function BenefitsComparisonSection() {
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
      className={`w-[18px] h-[18px] rounded-full ${active ? 'bg-[#445C4F]' : 'bg-[#CCCCCC]'}`} 
    />
  );

  return (
    <section
      className="bg-white py-12 md:py-20 px-6 md:px-10 rounded-[12px] w-full max-w-[1252px] relative overflow-hidden"
      data-name="Comparison Table"
    >
      {/* Introduction */}
      <div className="flex flex-col gap-4 mb-10 md:mb-16 max-w-[900px]">
        <h2 className="font-['Satoshi:Regular',sans-serif] text-[40px] md:text-[64px] text-black leading-[1.1]">
          The Smarter Way to Supplement
        </h2>
        <p className="font-['Satoshi:Regular',sans-serif] text-[20px] md:text-[24px] text-[#141413]">
          Designed to deliver more of what your body needs, with less effort and fewer compromises.
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="w-full overflow-x-auto md:overflow-visible relative">
        <div className="min-w-[800px] md:min-w-full relative z-10">
          
          {/* Vertical Highlight Pill - Adjusted for new 40-20-20-20 grid */}
          <div className="absolute top-[-40px] bottom-[-40px] left-[40%] right-[40%] bg-[#F0F0F0] rounded-[22px] z-0 pointer-events-none" />

          {/* Table Header */}
          <div className="grid grid-cols-[40%_20%_20%_20%] border-b border-black/10 pb-8 items-end relative z-10">
            <div className="col-span-1"></div>
            
            <div className="flex flex-col items-center gap-4">
              <div className="h-[100px] md:h-[120px] w-auto">
                <img src="/orange-box.svg" alt="IVPatch" className="h-full object-contain" />
              </div>
              <span className="font-['Satoshi:Bold',sans-serif] text-[#445C4F] text-[20px] md:text-[24px]">IVPatch</span>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="h-[100px] md:h-[120px] w-auto">
                <img src="/medicine.svg" alt="Oral" className="h-full object-contain" />
              </div>
              <span className="font-['Satoshi:Medium',sans-serif] text-black/60 text-[20px] md:text-[24px]">Oral Supplements</span>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="h-[100px] md:h-[120px] w-auto">
                <img src="/saline.svg" alt="IV Drips" className="h-full object-contain" />
              </div>
              <span className="font-['Satoshi:Medium',sans-serif] text-black/60 text-[20px] md:text-[24px]">IV Drips</span>
            </div>
          </div>

          {/* Table Rows */}
          <div className="relative z-10">
            {comparisonData.map((row, idx) => (
              <div key={idx} className="grid grid-cols-[40%_20%_20%_20%] border-b border-black/5 py-8 items-center group">
                <div className="col-span-1 pr-10">
                  <p className="font-['Satoshi:Regular',sans-serif] text-[20px] md:text-[24px] text-[#333333] leading-tight">
                    {row.text}
                  </p>
                </div>
                
                {/* IVPatch Column */}
                <div className="flex justify-center">
                  <Dot active={true} />
                </div>

                {/* Oral Column */}
                <div className="flex justify-center">
                  <Dot active={row.oral} />
                </div>

                {/* IV Drips Column */}
                <div className="flex justify-center">
                  <Dot active={row.drips} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Swipe Hint */}
      <div className="md:hidden mt-8 text-center text-black/30 font-medium text-sm">
        Swipe to compare products &rarr;
      </div>
    </section>
  );
}
