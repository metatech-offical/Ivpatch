export default function BenefitsComparisonSection() {
  const comparisonData = [
    "Absorbs nutrients efficiently",
    "Delivers nutrients steadily over time",
    "Avoids digestive breakdown",
    "Easy to use daily",
    "Non invasive",
    "Designed for consistent everyday use",
    "Cost effective over time",
  ];

  return (
    <section
      className="bg-white py-12 md:py-20 px-6 md:px-10 rounded-[12px] w-full max-w-[1252px] relative overflow-hidden"
      data-name="Comparison Table"
    >
      {/* Introduction */}
      <div className="flex flex-col gap-4 mb-10 md:mb-16 max-w-[800px] text-center md:text-left">
        <h2 className="font-['Satoshi:Medium',sans-serif] text-[36px] md:text-[64px] text-black leading-tight">
          The Smarter <br className="hidden md:block" /> Way to Supplement
        </h2>
        <p className="font-['Satoshi:Regular',sans-serif] text-[18px] md:text-[24px] text-black/80">
          Designed to deliver more of what your body needs, with less effort and fewer compromises.
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="w-full overflow-x-auto md:overflow-visible">
        <div className="min-w-[800px] md:min-w-full">
          {/* Header */}
          <div className="grid grid-cols-4 border-y border-black/10 py-5 items-center">
            <div className="col-span-1"></div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-[60px] md:h-[80px] w-auto">
                <img src="https://www.figma.com/api/mcp/asset/2f941832-45cd-4bc7-a262-4b6e15fea692" alt="IVPatch" className="h-full object-contain" />
              </div>
              <span className="font-['Satoshi:Bold',sans-serif] text-[#445c4f] text-[18px] md:text-[24px]">IVPatch</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-[60px] md:h-[80px] w-auto">
                <img src="https://www.figma.com/api/mcp/asset/58ddf036-8038-45fb-b3bf-dbe7c9b2af73" alt="Oral" className="h-full object-contain" />
              </div>
              <span className="font-['Satoshi:Regular',sans-serif] text-black/50 text-[18px] md:text-[20px]">Oral</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-[60px] md:h-[80px] w-auto">
                <img src="https://www.figma.com/api/mcp/asset/58ddf036-8038-45fb-b3bf-dbe7c9b2af73" alt="IV Drips" className="h-full object-contain" />
              </div>
              <span className="font-['Satoshi:Regular',sans-serif] text-black/50 text-[18px] md:text-[20px]">IV Drips</span>
            </div>
          </div>

          {/* Rows */}
          {comparisonData.map((text, idx) => (
            <div key={idx} className="grid grid-cols-4 border-b border-black/5 py-6 items-center hover:bg-black/[0.02] transition-colors">
              <div className="col-span-1 pr-4">
                <p className="font-['Satoshi:Regular',sans-serif] text-[16px] md:text-[22px] text-black/80">{text}</p>
              </div>
              <div className="flex justify-center">
                <div className="w-6 h-6 rounded-full bg-[#445c4f] flex items-center justify-center p-1.5 shadow-sm">
                  <div className="w-full h-full bg-white rounded-full" />
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-5 h-5 rounded-full border-2 border-black/10" />
              </div>
              <div className="flex justify-center">
                <div className="w-5 h-5 rounded-full border-2 border-black/10" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Swipe Hint */}
      <div className="md:hidden mt-4 text-center text-black/40 text-sm italic">
        Swipe to compare &rarr;
      </div>
    </section>
  );
}
