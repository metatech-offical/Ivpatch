export default function RangeSection() {
  const products = [
    { name: "Energy Release", img: "/green.svg", size: "large" },
    { name: "Muscle Fuel", img: "/red.svg", size: "large" },
    { name: "Immunity", img: "/yellow.svg", size: "wide" },
    { name: "Collagen", img: "/brown.svg", size: "wide" },
    { name: "Neuro", img: "/lemon.svg", size: "small" },
    { name: "ED", img: "/blue.svg", size: "small" },
    { name: "NMN-NAD+", img: "/black.svg", size: "small" },
  ];

  return (
    <section
      className="bg-white py-12 md:py-16 px-6 md:px-10 rounded-[16px] w-full max-w-[1252px]"
      data-name="Range Section"
    >
      <div className="flex flex-col gap-10 md:gap-12 items-center">
        {/* Headline */}
        <div className="text-center flex flex-col gap-4 max-w-[800px]">
          <h2 className="text-[#190f0d] text-[32px] sm:text-[40px] md:text-[50px] font-['Satoshi:Medium',sans-serif] leading-tight tracking-[-1px]">
            View our Range
          </h2>
          <p className="text-[#333333] text-[18px] md:text-[22px] font-['Satoshi:Regular',sans-serif] leading-relaxed">
            Discover our targeted wellness patches designed for your unique needs
          </p>
        </div>

        {/* Product Grid */}
        <div className="w-full flex flex-col gap-5">
          {/* Top Row for Desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Energy Release */}
            <div className="bg-[#cfcfcf] h-[280px] md:h-[398px] overflow-hidden rounded-[16px] relative group cursor-pointer lg:col-span-1">
              <img src={products[0].img} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            {/* Muscle Fuel */}
            <div className="bg-[#cfcfcf] h-[280px] md:h-[398px] overflow-hidden rounded-[16px] relative group cursor-pointer lg:col-span-1">
              <img src={products[1].img} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            {/* Wide stack for Immunity and Collagen */}
            <div className="flex flex-col gap-5 md:col-span-2 lg:col-span-2">
              <div className="bg-[#cfcfcf] h-[160px] md:h-[190px] overflow-hidden rounded-[16px] relative group cursor-pointer">
                <img src={products[2].img} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-md text-white text-sm">Immunity</div>
              </div>
              <div className="bg-[#cfcfcf] h-[160px] md:h-[190px] overflow-hidden rounded-[16px] relative group cursor-pointer">
                <img src={products[3].img} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
            </div>
          </div>

          {/* Bottom Row for Desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-[#cfcfcf] h-[200px] md:h-[220px] overflow-hidden rounded-[16px] relative group cursor-pointer">
              <img src={products[4].img} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="bg-[#cfcfcf] h-[200px] md:h-[220px] overflow-hidden rounded-[16px] relative group cursor-pointer">
              <img src={products[5].img} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="bg-[#cfcfcf] h-[200px] md:h-[220px] overflow-hidden rounded-[16px] relative group cursor-pointer">
              <img src={products[6].img} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
