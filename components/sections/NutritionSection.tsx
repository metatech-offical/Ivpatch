export default function NutritionSection() {
  const stats = [
    { label: "Natural Ingredients", icon: "https://www.figma.com/api/mcp/asset/34cfc50e-814f-4f0c-a081-09a19855ca63", value: "Natural" },
    { label: "Nutrition Absorption", icon: "https://www.figma.com/api/mcp/asset/34cfc50e-814f-4f0c-a081-09a19855ca63", value: "98%" },
    { label: "24 hr Energy Release", icon: "https://www.figma.com/api/mcp/asset/34cfc50e-814f-4f0c-a081-09a19855ca63", value: "24 hr" },
  ];

  return (
    <section
      className="bg-[#aab9a9] py-12 md:py-0 md:h-[528px] overflow-hidden relative rounded-[16px] w-full max-w-[1252px]"
      data-name="Nutrition Section"
    >
      {/* Background Accent - Adjusted for mobile */}
      <div className="absolute right-[-10%] md:right-[-5%] top-[-10%] opacity-20 md:opacity-100 pointer-events-none">
        <div className="rotate-[-30deg]">
          <img
            alt=""
            className="w-[300px] md:w-[724px] h-auto"
            src="https://www.figma.com/api/mcp/asset/54b3397d-0128-4d03-81d1-f1278da1f546"
          />
        </div>
      </div>

      <div className="relative z-10 h-full flex flex-col md:flex-row items-center px-6 md:px-12 gap-10 md:gap-0">
        {/* Left Content */}
        <div className="flex flex-col gap-6 md:gap-10 max-w-full md:max-w-[450px] text-center md:text-left">
          <h2 className="font-['Satoshi:Medium',sans-serif] text-[36px] sm:text-[48px] md:text-[60px] text-white leading-tight tracking-[2px] md:tracking-[4.8px]">
            Nutrition That Moves With You
          </h2>
          <p className="font-['Satoshi:Regular',sans-serif] text-[16px] md:text-[18px] text-white/90 leading-relaxed">
            IVPATCH adapts to your day providing steady support without overstimulation, crashes, or dependency.
          </p>
          <div className="flex justify-center md:justify-start">
            <button className="bg-white/10 backdrop-blur-md border border-white/20 px-8 py-3 rounded-[12px] text-white font-['Satoshi:Bold',sans-serif] text-[20px] md:text-[24px] hover:bg-white/20 transition-all active:scale-95 shadow-lg">
              Explore
            </button>
          </div>
        </div>

        {/* Floating Stats - Hidden on mobile or restructured */}
        <div className="flex flex-wrap md:flex-col items-center justify-center gap-6 md:gap-12 md:ml-auto">
          {stats.map((stat, idx) => (
            <div key={idx} className="relative w-[100px] md:w-[122px] h-[100px] md:h-[122px] flex flex-col items-center justify-center text-center p-2">
              <img
                src={stat.icon}
                className="absolute inset-0 w-full h-full object-contain opacity-80"
                alt=""
              />
              <div className="relative z-10 flex flex-col items-center gap-1 group">
                {stat.value !== "Natural" && (
                  <span className="text-white font-bold text-lg leading-tight">{stat.value}</span>
                )}
                <span className="text-white text-[10px] md:text-[12px] font-['Satoshi:Medium',sans-serif] leading-tight px-2">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Product Image - Adjusted for desktop only mockup style */}
        <div className="hidden lg:block absolute right-0 bottom-0 h-full w-[450px]">
          <img
            alt=""
            className="w-full h-full object-contain object-bottom translate-x-12"
            src="https://www.figma.com/api/mcp/asset/3f78b4f0-4d36-4cb5-b1b3-134687f8fecc"
          />
        </div>
      </div>
    </section>
  );
}
