export default function BenefitsHeroSection() {
  return (
    <section
      className="bg-[#366436] min-h-[500px] md:h-[731px] overflow-hidden relative rounded-[16px] w-full max-w-[1252px]"
      data-name="Benefits hero"
    >
      {/* Background Image - Desktop only as requested */}
      <div className="hidden md:block absolute inset-0 z-0">
        <img
          alt=""
          className="w-full h-full object-cover"
          src="/benefits-bg.svg"
        />
        <div className="absolute inset-0 bg-black/5" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row h-full">
        {/* Text Content */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-[70px] py-16 md:py-0 gap-6 md:gap-[20px] text-center md:text-left">
          <h1 className="font-['Satoshi:Bold',sans-serif] text-[48px] sm:text-[60px] md:text-[60px] text-white leading-tight tracking-[-1.2px]">
            Feel The <br />
            Difference
          </h1>
          <div className="font-['Satoshi:Regular',sans-serif] text-[18px] md:text-[22px] text-white/90 leading-relaxed tracking-[0.22px]">
            <p>Discover the next level of wellness</p>
            <p>with our premium transdermal patches.</p>
          </div>
          <div className="flex justify-center md:justify-start">
            <button className="bg-white px-8 py-3 rounded-[16px] shadow-xl hover:bg-white/90 transition-all active:scale-95">
              <span className="font-['Satoshi:Bold',sans-serif] text-[20px] md:text-[24px] text-black tracking-[0.48px]">
                Get the Patch
              </span>
            </button>
          </div>
        </div>

        {/* Empty space for layout balance if needed */}
        <div className="flex-1" />
      </div>

      {/* Decorative Elements - Hidden on mobile or made subtle */}
      <div className="hidden md:block absolute right-[15%] top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
        {/* Custom decorative dots/shapes if needed */}
      </div>
    </section>
  );
}
