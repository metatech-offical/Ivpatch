import Link from "next/link";

export default function NutritionSection() {
  const stats = [
    { label: "Natural Ingredients", icon: "/circle.svg", value: "Natural" },
    { label: "Nutrition Absorption", icon: "/circle.svg", value: "98%" },
    { label: "24 hr Energy Release", icon: "/circle.svg", value: "24 hr" },
  ];

  return (
    <section
      className="bg-[#aab9a9] py-12 md:py-0 md:h-[528px] overflow-hidden relative rounded-[16px] w-full max-w-[1252px]"
      data-name="Nutrition Section"
    >
      {/* Background Accent - Desktop only as requested */}
      <div className="hidden md:block absolute inset-0 pointer-events-none overflow-hidden">
        <img
          alt="Nutrition background hand"
          src="/hand.svg"
          className="w-full h-full object-cover object-right-bottom"
        />
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
            <Link href="/range" className="bg-white/10 backdrop-blur-md border border-white/20 px-8 py-3 rounded-[12px] text-white font-['Satoshi:Bold',sans-serif] text-[20px] md:text-[24px] hover:bg-white/20 transition-all active:scale-95 shadow-lg inline-block">
              Explore
            </Link>
          </div>
        </div>

        {/* Floating Stats - Hidden on desktop as requested */}
        <div className="flex flex-wrap md:hidden items-center justify-center gap-6 p-2">
          {stats.map((stat, idx) => (
            <div key={idx} className="relative w-[100px] h-[100px] flex flex-col items-center justify-center text-center">
              <img
                src={stat.icon}
                className="absolute inset-0 w-full h-full object-contain opacity-80"
                alt=""
              />
              <div className="relative z-10 flex flex-col items-center gap-1 group">
                {stat.value !== "Natural" && (
                  <span className="text-white font-bold text-lg leading-tight">{stat.value}</span>
                )}
                <span className="text-white text-[10px] font-['Satoshi:Medium',sans-serif] leading-tight px-2">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
