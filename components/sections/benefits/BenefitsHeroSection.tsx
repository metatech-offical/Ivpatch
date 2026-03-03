export default function BenefitsHeroSection() {
  return (
    <section
      className="bg-gradient-to-b from-[#425142] to-[#366436]/70 min-h-[500px] md:h-[731px] overflow-hidden relative rounded-[16px] w-full max-w-[1252px]"
      data-name="Benefits hero"
    >
      <div className="flex flex-col md:flex-row h-full">
        {/* Text Content */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-[70px] py-16 md:py-0 gap-6 md:gap-[20px] text-center md:text-left z-10">
          <h1 className="font-['Satoshi:Bold',sans-serif] text-[48px] sm:text-[60px] md:text-[60px] text-white leading-tight tracking-[-1.2px]">
            Feel The Difference
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

        {/* Hero Image - Optimized for desktop/mobile positioning */}
        <div className="flex-1 relative h-[300px] md:h-auto overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center md:translate-x-12 translate-y-8 md:translate-y-0">
            <img
              alt="Premium wellnes patch"
              className="w-[120%] md:w-[925px] h-full object-contain md:object-cover scale-x-[-1] opacity-90"
              src="https://www.figma.com/api/mcp/asset/829ec289-1dfd-4987-9ec9-8640d7373291"
            />
          </div>
        </div>
      </div>

      {/* Decorative Elements - Hidden on mobile or made subtle */}
      <div className="hidden md:block absolute right-[15%] top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
        {/* Custom decorative dots/shapes if needed */}
      </div>
    </section>
  );
}
