export default function BenefitsHighlightsSection() {
  const highlights = [
    { label: "Effortless Convenience", icon: "https://www.figma.com/api/mcp/asset/73513955-2184-4668-96d7-6e59720bdd5a" },
    { label: "Enhanced Absorption", icon: "https://www.figma.com/api/mcp/asset/73513955-2184-4668-96d7-6e59720bdd5a" },
    { label: "No More Pills", icon: "https://www.figma.com/api/mcp/asset/73513955-2184-4668-96d7-6e59720bdd5a" },
    { label: "Inclusive for All", icon: "https://www.figma.com/api/mcp/asset/73513955-2184-4668-96d7-6e59720bdd5a" },
    { label: "Clinically Backed", icon: "https://www.figma.com/api/mcp/asset/73513955-2184-4668-96d7-6e59720bdd5a" },
  ];

  return (
    <section
      className="py-12 md:py-16 px-6 md:px-10 rounded-[12px] w-full max-w-[1252px] relative overflow-hidden min-h-[500px] flex items-center"
      data-name="Benefits Highlights"
    >
      {/* Background Image - Optimized for mobile/desktop */}
      <div className="absolute inset-0 z-0">
        <img
          alt=""
          className="w-full h-full object-cover"
          src="/benefits-add.svg"
        />
        {/* Subtle overlay for text legibility */}
        <div className="absolute inset-0 bg-white/10" />
      </div>

      <div className="relative z-10 w-full flex flex-col md:flex-row items-center md:justify-end gap-12 md:gap-20">
        {/* List of Benefits */}
        <div className="w-full md:w-[480px] flex flex-col items-center md:items-start text-center md:text-left gap-10 bg-white/10 backdrop-blur-sm p-6 md:p-10 rounded-[20px] border border-white/20 shadow-xl">
          <h2 className="font-['Satoshi:Medium',sans-serif] text-[36px] md:text-[44px] text-[#190f0d] tracking-[-0.8px] leading-tight">
            Benefits that <br className="hidden md:block" /> add up
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-8 md:gap-6 w-full">
            {highlights.map((h, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 border border-[#190f0d]/30 rounded-full flex items-center justify-center p-3 group-hover:bg-[#190f0d] group-hover:border-[#190f0d] transition-all">
                  <img src={h.icon} alt="" className="w-full h-full object-contain group-hover:invert transition-all opacity-80" />
                </div>
                <span className="font-['Satoshi:Medium',sans-serif] text-[18px] md:text-[22px] text-[#190f0d]/80 leading-tight">
                  {h.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
