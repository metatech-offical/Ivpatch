"use client";

export default function MissionHeroSection() {
  const footerBadges = [
    ["Steady absorption", "No digestive strain"],
    ["Consistent daily support", "Easy to maintain"],
    ["No needles", "No clinic visits", "Reduced nutrient loss"]
  ];

  return (
    <section
      className="relative w-full rounded-[20px] overflow-hidden flex flex-col gap-5 bg-[#DCE2D9]"
      data-name="MissionHero"
    >
      {/* Top: Product image + Heading */}
      <div className="relative w-full flex flex-col md:flex-row min-h-[550px] md:min-h-[700px]">
        {/* Left: layered hand + product box images */}
        <div className="relative w-full md:w-[55%] flex items-end justify-start pt-8 md:pt-0">
          <img
            alt="Hand holding IVPATCH product box"
            src="/hand-box.svg"
            className="w-full max-w-[750px] h-auto object-contain relative left-[-40px] bottom-[-60px] md:bottom-[-100px]"
          />
        </div>

        {/* Right: Heading + Button */}
        <div className="flex-1 flex flex-col justify-center px-6 md:pl-[60px] md:pr-[80px] pb-12 pt-8 md:py-0 text-center md:text-left z-10">
          <h1
            className="text-[44px] sm:text-[52px] md:text-[64px] leading-[1.1] text-[#1A1A1A] mb-8 md:mb-[40px] font-['Satoshi:Regular',sans-serif] tracking-[-1px]"
          >
            Support that<br /> Feels Natural
          </h1>
          <div className="flex justify-center md:justify-start">
            <button
              className="inline-flex items-center px-10 py-3.5 rounded-[16px] cursor-pointer bg-[#333333] text-white text-[20px] md:text-[24px] font-['Satoshi:Bold',sans-serif] hover:bg-black transition-all active:scale-95 shadow-lg"
            >
              View the Range
            </button>
          </div>
        </div>
      </div>

      {/* Row 1: Feature Grid */}
      <div className="flex flex-col lg:flex-row gap-5 px-5 pb-5 w-full">
        {/* Left Stack: 95% & 24 Hours */}
        <div className="flex flex-col gap-5 shrink-0 w-[420px]">
          <div
            className="rounded-[8px] p-10 flex flex-col bg-[#E6E9E1] w-full"
            style={{ height: '420px' }}
          >
            <h3 className="text-[40px] font-['Satoshi:Medium',sans-serif] text-black leading-none">95%</h3>
            <p className="text-[20px] leading-[1.3] text-[#666666] font-['Satoshi:Medium',sans-serif] mt-auto">
              This 95% absorption rate ensures faster, more effective results with no stomach discomfort.
            </p>
          </div>
          <div
            className="rounded-[8px] p-10 flex flex-col bg-[#E6E9E1] w-full"
            style={{ height: '466px' }}
          >
            <h3 className="text-[40px] font-['Satoshi:Medium',sans-serif] text-black leading-none">24 Hours</h3>
            <p className="text-[20px] leading-[1.3] text-[#666666] font-['Satoshi:Medium',sans-serif] mt-auto">
              of steady, controlled nutrient release from a single patch.
            </p>
          </div>
        </div>

        {/* Right Wide: Backed by Science */}
        <div
          className="flex-1 flex-grow rounded-[8px] overflow-hidden relative bg-[#E6E9E1] flex flex-col"
          style={{ minHeight: '905px' }}
        >
          <div className="p-10 flex flex-col justify-start relative z-10 w-full h-full">
            <h2 className="text-[40px] font-['Satoshi:Medium',sans-serif] text-black mb-[16px]">Backed by Science</h2>
            <p className="text-[20px] leading-[1.4] text-[#666666] font-['Satoshi:Medium',sans-serif] max-w-[550px]">
              The skin has the ability to absorb certain vitamins and minerals directly. When these nutrients have a molecular weight of 500 Daltons or less, our skin can pick it up. Unlike oral supplements, which must pass through the digestive system (losing potency along the way), our patches deliver nutrients directly through the skin and into the bloodstream. This 95% absorption rate ensures faster, more effective results with no stomach discomfort.
            </p>

            {/* Image - anchored far right bottom */}
            <div className="absolute right-0 bottom-0 w-[550px] h-[550px] pointer-events-none">
              <img
                alt="Scientifically backed results"
                src="/girl-img.svg"
                className="w-full h-full object-contain object-right-bottom"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: You Deserve Better | Up to 5x */}
      <div className="flex flex-col lg:flex-row gap-5 px-5 pb-8">
        {/* You Deserve Better */}
        <div
          className="rounded-[8px] overflow-hidden relative bg-[#ECEBE3]"
          style={{ width: 'min(732px, 100%)', height: '357px' }}
        >
          <div className="absolute inset-0">
            <img
              alt="Person exercising"
              src="/workout-img.svg"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/15" />
          </div>
          <div className="relative z-10 p-10 h-full flex flex-col justify-between">
            <h2 className="text-[50px] font-['Satoshi:Medium',sans-serif] text-white">You deserve Better</h2>

            <div className="flex flex-col gap-4 overflow-hidden -mx-10 whitespace-nowrap">
              {/* Row 1: Right to Left (4 items) */}
              <div className="flex gap-4 animate-marquee-left">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex gap-4">
                    {["Steady absorption", "No digestive strain", "Consistent daily support", "Zero caffine"].map((text) => (
                      <div
                        key={text}
                        className="h-[50px] flex items-center px-6 rounded-[8px] bg-[#D3DCCF] text-[#666666] text-[20px] font-['Satoshi:Medium',sans-serif]"
                      >
                        {text}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Row 2: Left to Right (5 items) */}
              <div className="flex gap-4 animate-marquee-right">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex gap-4">
                    {["Easy to maintain", "No needles", "No clinic visits", "Reduced nutrient loss", "Safe & Natural"].map((text) => (
                      <div
                        key={text}
                        className="h-[50px] flex items-center px-6 rounded-[8px] bg-[#D3DCCF] text-[#666666] text-[20px] font-['Satoshi:Medium',sans-serif]"
                      >
                        {text}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <style jsx>{`
            @keyframes marqueeLeft {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes marqueeRight {
              0% { transform: translateX(-50%); }
              100% { transform: translateX(0); }
            }
            .animate-marquee-left {
              animation: marqueeLeft 20s linear infinite;
            }
            .animate-marquee-right {
              animation: marqueeRight 25s linear infinite;
            }
          `}</style>
        </div>

        {/* Up to 5x */}
        <div
          className="shrink-0 rounded-[8px] p-10 flex flex-col bg-[#ECEBE3]"
          style={{ width: 'min(455px, 100%)', height: '357px' }}
        >
          <h3 className="text-[40px] font-['Satoshi:Medium',sans-serif] text-black leading-none">Up to 5×</h3>
          <div style={{ marginTop: '94px' }}>
            <p className="text-[20px] leading-tight text-[#666666] font-['Satoshi:Medium',sans-serif]">
              more efficient nutrient utilization compared to traditional oral supplements, based on delivery method and reduced digestive breakdown.
            </p>
          </div>
        </div>
      </div>
    </section>

  );
}
