export default function BenefitsHighlightsSection() {
  const highlights = [
    { label: "Effortless Convenience", icon: "/be1.svg" },
    { label: "Enhanced Absorption", icon: "/be2.svg" },
    { label: "No More Pills", icon: "/be3.svg" },
    { label: "Inclusive for All", icon: "/be4.svg" },
    { label: "Clinically Backed", icon: "/be5.svg" },
  ];

  return (
    <section
      className="rounded-[12px] w-full max-w-[1252px] relative overflow-hidden min-h-[500px] flex items-center"
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

      <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-end px-12 md:pr-0">

        {/* Right content column */}
        <div className="w-full md:w-[600px] flex flex-col items-center justify-center gap-10 py-12">

          <h2 className="font-['Satoshi:Medium',sans-serif] text-[40px] text-[#190F0D] text-center mb-4">
            Benefits that add up
          </h2>

          <div className="flex flex-col gap-10 w-full items-center">
            {highlights.map((h, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="w-[45px] h-[45px] flex items-center justify-center pointer-events-none">
                  <img src={h.icon} alt="" className="w-full h-full object-contain" />
                </div>
                <span className="font-['Satoshi:Medium',sans-serif] text-[24px] text-[#666666] text-center leading-tight">
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
