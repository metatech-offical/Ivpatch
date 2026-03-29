export default function MissionBenefitsStrip() {
  const thumbnails = [
    "/white-box.svg",
    "/black-box.svg"
  ];

  return (
    <section
      className="relative bg-[#f7f4f3] h-[550px] md:h-[725px] overflow-hidden rounded-[12px] w-full"
      data-name="Benefits Strip"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          alt="Yoga wellness background"
          className="w-full h-full object-cover"
          src="/girl-yoga.svg"
        />
      </div>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6">
        <div className="flex flex-col items-center gap-3 text-center max-w-[580px]">
          <span
            className="text-[22px] font-['Satoshi:Medium',sans-serif] text-white/70"
          >
            Benefits that add up
          </span>
          <h1
            className="text-[40px] leading-tight text-white font-['Satoshi:Bold',sans-serif] tracking-[-0.8px]"
          >
            Crafted for busy lives<br /> and health-conscious minds.
          </h1>
        </div>

        {/* Shop Now button */}
        <button className="bg-white border border-black/15 px-10 py-3.5 rounded-[16px] cursor-pointer hover:bg-white/90 transition-all active:scale-95 shadow-xl">
          <span
            className="text-[24px] text-[#1A1A1A] font-['Satoshi:Bold',sans-serif] tracking-[0.48px] whitespace-nowrap"
          >
            Shop Now
          </span>
        </button>
      </div>

      {/* Product thumbnails - Adjusted for mobile */}
      <div className="absolute bottom-6 md:bottom-[32px] right-6 md:right-[32px] hidden sm:flex gap-4">
        {thumbnails.map((thumb, i) => (
          <div key={i} className="bg-black/20 backdrop-blur-md border border-white/20 h-[100px] md:h-[119px] w-[120px] md:w-[150px] overflow-hidden rounded-2xl flex items-center justify-center p-2">
            <div className="w-full h-full bg-white/20 border border-white/20 overflow-hidden rounded-xl">
              <img
                alt=""
                className="w-full h-full object-cover"
                src={thumb}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
