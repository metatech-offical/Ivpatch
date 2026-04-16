import Link from "next/link";

export default function NutritionSection() {
  const stats = [
    { label: "Nutrition Absorption", value: "98%" },
    { label: "Natural Ingredients", value: "Natural" },
    { label: "24 hr Energy Release", value: "24 hr" },
  ];

  return (
    <section
      className="bg-[#aab9a9] py-12 md:py-0 md:h-[528px] overflow-hidden relative rounded-[16px] w-full max-w-[1252px]"
      data-name="Nutrition Section"
    >
      {/* Background Accent - Desktop only */}
      <div className="hidden md:block absolute inset-0 pointer-events-none overflow-hidden">
        <img
          alt="Nutrition background hand"
          src="/hand.svg"
          className="w-full h-full object-cover object-right-bottom"
        />
      </div>

      {/* Mobile Background Hand - Removed from absolute positioning */}

      <div className="relative z-10 h-full flex flex-col md:flex-row items-center px-6 md:px-12 gap-10 md:gap-0">
        {/* Content */}
        <div className="flex flex-col gap-6 md:gap-10 max-w-full md:max-w-[450px] text-center md:text-left pt-12 md:py-0">
          <h2 className="font-['Satoshi:Medium',sans-serif] text-[32px] sm:text-[48px] md:text-[60px] text-white leading-tight tracking-[2px] md:tracking-[4.8px]">
            Nutrition That Moves With You
          </h2>
          <p className="font-['Satoshi:Regular',sans-serif] text-[15px] md:text-[18px] text-white/90 leading-relaxed max-w-[320px] mx-auto md:mx-0">
            IVPATCH adapts to your day providing steady support without overstimulation, crashes, or dependency.
          </p>
          <div className="flex justify-center md:justify-start">
            <Link href="/range" className="bg-white/20 backdrop-blur-md border border-white/30 px-8 py-2 md:py-3 rounded-[12px] text-white font-['Satoshi:Bold',sans-serif] text-[18px] md:text-[24px] hover:bg-white/30 transition-all active:scale-95 shadow-md inline-block">
              Explore
            </Link>
          </div>

          {/* Mobile Image - Immersive full-width version */}
          <div className="md:hidden w-[calc(100%+3rem)] -mx-6 mt-12 mb-[-3rem]">
            <img
              alt="Nutrition mobile hand"
              src="/mobile-hand.svg"
              className="w-full h-auto object-contain scale-110 origin-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
