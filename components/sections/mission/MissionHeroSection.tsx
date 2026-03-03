export default function MissionHeroSection() {
  const footerBadges = [
    ["Steady absorption", "No digestive strain"],
    ["Consistent daily support", "Easy to maintain"],
    ["No needles", "No clinic visits", "Reduced nutrient loss"]
  ];

  return (
    <section
      className="relative w-full rounded-[20px] overflow-hidden flex flex-col gap-3"
      style={{
        background: "linear-gradient(165deg, #c8d6c3 0%, #dbd8cc 55%, #e4e0d4 100%)",
      }}
      data-name="MissionHero"
    >
      {/* Top: Product image + Heading */}
      <div className="relative w-full flex flex-col md:flex-row min-h-[550px] md:min-h-[480px]">
        {/* Left: layered hand + product box images */}
        <div className="relative w-full md:w-[52%] h-[350px] sm:h-[400px] md:h-auto overflow-hidden">
          <img
            alt="Hand holding IVPATCH product box"
            src="/hand-box.svg"
            className="absolute max-w-none md:max-w-full md:object-contain object-bottom w-[160%] sm:w-[120%] md:w-[135%] left-[40%] md:left-[-25%] -translate-x-1/2 md:translate-x-0 bottom-[-5%] sm:bottom-[-10%] md:bottom-[-30%] h-full"
          />
        </div>

        {/* Right: Heading + Button */}
        <div className="flex-1 flex flex-col justify-start md:justify-center px-6 md:pl-[36px] md:pr-[56px] pb-12 pt-4 md:py-[50px] text-center md:text-left z-10">
          <h1
            className="text-[44px] sm:text-[52px] md:text-[64px] leading-[1.1] text-black mb-10 md:mb-[30px] font-['Satoshi',sans-serif] tracking-[-1px]"
            style={{ fontWeight: 500 }}
          >
            Support that<br /> Feels Natural
          </h1>
          <div className="flex justify-center md:justify-start">
            <button
              className="inline-flex items-center px-12 py-4 rounded-full cursor-pointer bg-[#1a1a1a] border border-black/15 text-white text-[18px] md:text-[19px] font-bold tracking-[0.38px] hover:bg-black transition-all active:scale-95 shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
            >
              View the Range
            </button>
          </div>
        </div>
      </div>

      {/* Row 1: 95% + 24 Hours | Backed by Science */}
      <div className="flex flex-col lg:flex-row gap-3 px-3 md:px-5 pb-3">
        {/* Left column: 95% + 24 Hours stacked */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:w-[340px] shrink-0">
          {/* 95% */}
          <div className="flex-1 rounded-[14px] p-6 md:p-8 flex flex-col bg-white/55 backdrop-blur-xl border border-white/60 min-h-[180px]">
            <span className="text-[40px] md:text-[48px] font-medium text-black">95%</span>
            <p className="text-[15px] md:text-[16px] leading-relaxed text-[#555] mt-auto">
              This 95% absorption rate ensures faster, more effective results with no stomach discomfort.
            </p>
          </div>
          {/* 24 Hours */}
          <div className="flex-1 rounded-[14px] p-6 md:p-8 flex flex-col bg-white/55 backdrop-blur-xl border border-white/60 min-h-[180px]">
            <span className="text-[40px] md:text-[48px] font-medium text-black">24 Hours</span>
            <p className="text-[15px] md:text-[16px] leading-relaxed text-[#555] mt-auto">
              of steady, controlled nutrient release from a single patch.
            </p>
          </div>
        </div>

        {/* Right: Backed by Science */}
        <div className="flex-1 rounded-[14px] overflow-hidden relative bg-white/45 backdrop-blur-xl border border-white/60 flex flex-col sm:flex-row min-h-[400px]">
          {/* Text content */}
          <div className="flex-1 p-6 md:p-10 flex flex-col justify-start relative z-10">
            <h2 className="text-[32px] md:text-[36px] font-medium text-black mb-4">Backed by Science</h2>
            <p className="text-[15px] md:text-[16px] leading-relaxed text-[#555] max-w-[500px]">
              The skin has the ability to absorb certain vitamins and minerals directly. When these nutrients have a molecular weight of 500 Daltons or less, our skin can pick it up. Unlike oral supplements, which must pass through the digestive system (losing potency along the way), our patches deliver nutrients directly through the skin and into the bloodstream. This 95% absorption rate ensures faster, more effective results with no stomach discomfort.
            </p>
          </div>
          {/* Profile image - Hidden or positioned well on mobile */}
          <div className="relative w-full sm:w-[35%] lg:w-[40%] h-[250px] sm:h-auto">
            <img
              alt="Scientifically backed results"
              src="https://www.figma.com/api/mcp/asset/e821f484-64e5-460e-815a-fa595c168c9f"
              className="w-full h-full object-cover object-[center_20%]"
            />
          </div>
        </div>
      </div>

      {/* Row 2: You Deserve Better | Up to 5x */}
      <div className="flex flex-col lg:flex-row gap-3 px-3 md:px-5 pb-5">
        {/* You Deserve Better */}
        <div className="flex-1 rounded-[14px] overflow-hidden relative min-h-[350px] md:min-h-[310px]">
          <div className="absolute inset-0">
            <img
              alt="Person exercising"
              src="https://www.figma.com/api/mcp/asset/5b901abf-7cb2-4dbe-9b14-d324a8bb36d3"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          </div>
          <div className="relative z-10 p-6 md:p-10 h-full flex flex-col justify-between">
            <h2 className="text-[36px] md:text-[40px] font-medium text-white">You deserve Better</h2>
            <div className="flex flex-col gap-2 mt-auto">
              <div className="flex flex-wrap gap-2">
                {["Steady absorption", "No digestive strain", "Consistent daily support", "Easy to maintain", "No needles", "No clinic visits"].map((l) => (
                  <span
                    key={l}
                    className="bg-[#d3dccf] text-[#444] text-[12px] md:text-[14px] px-3 py-1.5 rounded-lg font-medium whitespace-nowrap"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Up to 5x */}
        <div className="lg:w-[400px] shrink-0 rounded-[14px] p-8 flex flex-col bg-white/55 backdrop-blur-xl border border-white/60 min-h-[220px]">
          <span className="text-[40px] md:text-[48px] font-medium text-black">Up to 5×</span>
          <p className="text-[15px] md:text-[16px] leading-relaxed text-[#555] mt-auto pt-8">
            more efficient nutrient utilization compared to traditional oral supplements, based on delivery method and reduced digestive breakdown.
          </p>
        </div>
      </div>
    </section>
  );
}
