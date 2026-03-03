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
      className="py-12 md:py-16 px-6 md:px-10 rounded-[12px] w-full max-w-[1252px] relative overflow-hidden"
      style={{
        backgroundImage: "linear-gradient(118.75deg, rgb(224, 224, 222) 0%, rgb(225, 225, 223) 100%)",
      }}
      data-name="Benefits Highlights"
    >
      {/* Background Decorative - High quality face image */}
      <div className="absolute left-0 top-0 bottom-0 w-full md:w-[40%] opacity-20 md:opacity-100 pointer-events-none">
        <img
          alt=""
          className="w-full h-full object-cover"
          src="https://www.figma.com/api/mcp/asset/866d0b88-6d0f-4e2a-9f26-8d222f355edc"
        />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 md:gap-20">
        {/* Product Visual Stack - Mobile simplified, Desktop detailed */}
        <div className="flex-1 flex justify-center relative w-full h-[300px] md:h-[500px]">
          <div className="relative scale-75 md:scale-100 flex items-center justify-center">
            {/* Central Box */}
            <div className="relative z-20 shadow-2xl rounded-2xl overflow-hidden w-[280px] md:w-[364px]">
              <img src="https://www.figma.com/api/mcp/asset/411434d9-6d49-4ab0-8be1-bc6a73072b4f" alt="Product box" className="w-full" />
            </div>
            {/* Tilted Packages */}
            <div className="absolute -left-12 md:-left-20 top-1/2 -translate-y-1/2 -rotate-15 z-10 opacity-80 md:opacity-100">
              <img src="https://www.figma.com/api/mcp/asset/064abb51-e825-43c0-9196-2de228c3d870" alt="" className="w-[140px] md:w-[180px]" />
            </div>
            <div className="absolute -right-12 md:-right-20 top-1/2 -translate-y-1/2 rotate-15 z-10 opacity-80 md:opacity-100">
              <img src="https://www.figma.com/api/mcp/asset/064abb51-e825-43c0-9196-2de228c3d870" alt="" className="w-[140px] md:w-[180px]" />
            </div>
          </div>
        </div>

        {/* List of Benefits */}
        <div className="w-full md:w-[400px] flex flex-col items-center md:items-start text-center md:text-left gap-10">
          <h2 className="font-['Satoshi:Medium',sans-serif] text-[36px] md:text-[40px] text-[#190f0d] tracking-[-0.8px]">
            Benefits that add up
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-6 w-full">
            {highlights.map((h, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 border border-[#666] rounded-full flex items-center justify-center p-3 group-hover:bg-black group-hover:border-black transition-all">
                  <img src={h.icon} alt="" className="w-full h-full object-contain group-hover:invert transition-all" />
                </div>
                <span className="font-['Satoshi:Medium',sans-serif] text-[18px] md:text-[24px] text-[#666] leading-tight">
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
