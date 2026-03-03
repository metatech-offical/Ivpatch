export default function MissionBenefitsStrip() {
  const thumbnails = [
    "https://www.figma.com/api/mcp/asset/70c40b9e-e82d-480d-a639-29f86445224b",
    "https://www.figma.com/api/mcp/asset/e4b33ecf-2d97-4116-84d1-23ea33413d4f"
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
          src="https://www.figma.com/api/mcp/asset/1e99b3e8-5e0b-4f10-8f7d-b488abec7432"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6">
        <div className="flex flex-col items-center gap-3 text-center max-w-[480px]">
          <span
            className="text-[18px] md:text-[22px] font-medium text-white/80"
            style={{ fontFamily: "'Satoshi', sans-serif" }}
          >
            Benefits that add up
          </span>
          <h2
            className="text-[32px] sm:text-[36px] md:text-[40px] leading-tight text-white font-bold tracking-[-0.8px]"
            style={{ fontFamily: "'Satoshi', sans-serif" }}
          >
            Crafted for busy lives and health-conscious minds.
          </h2>
        </div>

        {/* Shop Now button */}
        <button className="bg-white border border-black/15 px-8 py-3 rounded-full cursor-pointer hover:bg-white/90 transition-all active:scale-95 shadow-xl">
          <span
            className="text-[20px] md:text-[24px] text-[#1a1a1a] font-bold tracking-[0.48px] whitespace-nowrap"
            style={{ fontFamily: "'Satoshi', sans-serif" }}
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
