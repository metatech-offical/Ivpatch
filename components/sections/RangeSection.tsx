export default function RangeSection() {
  const products = [
    { name: "Energy Release", img: "https://www.figma.com/api/mcp/asset/7abb1c5a-372f-4e94-9054-521bbbf8b180", size: "large" },
    { name: "Muscle Fuel", img: "https://www.figma.com/api/mcp/asset/ea9e0723-ff80-44bc-8c16-91f8bc6f320f", size: "large" },
    { name: "Immunity", img: "https://www.figma.com/api/mcp/asset/52af06f0-836b-4599-9041-a9db399f29bf", size: "wide" },
    { name: "Collagen", img: "https://www.figma.com/api/mcp/asset/0e2f7327-7746-4f9e-bbbd-4c21798a6279", size: "wide" },
    { name: "Neuro", img: "https://www.figma.com/api/mcp/asset/2ee919c6-b8cb-4826-9fb9-257b0084d44c", size: "small" },
    { name: "ED", img: "https://www.figma.com/api/mcp/asset/f5396908-1073-42b8-a8cd-f61832b9fc56", size: "small" },
    { name: "NMN-NAD+", img: "https://www.figma.com/api/mcp/asset/a849640c-02f5-4fd2-b8d1-f6738c030dc4", size: "small" },
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
            <div className="bg-[#cfcfcf] h-[300px] md:h-[398px] overflow-hidden rounded-[16px] relative group cursor-pointer lg:col-span-1">
              <img src={products[0].img} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            {/* Muscle Fuel */}
            <div className="bg-[#cfcfcf] h-[300px] md:h-[398px] overflow-hidden rounded-[16px] relative group cursor-pointer lg:col-span-1">
              <img src={products[1].img} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            {/* Wide stack for Immunity and Collagen */}
            <div className="flex flex-col gap-5 md:col-span-2 lg:col-span-2">
              <div className="bg-[#cfcfcf] h-[190px] overflow-hidden rounded-[16px] relative group cursor-pointer">
                <img src={products[2].img} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-md text-white text-sm">Immunity</div>
              </div>
              <div className="bg-[#cfcfcf] h-[190px] overflow-hidden rounded-[16px] relative group cursor-pointer">
                <img src={products[3].img} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
            </div>
          </div>

          {/* Bottom Row for Desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-[#cfcfcf] h-[220px] overflow-hidden rounded-[16px] relative group cursor-pointer">
              <img src={products[4].img} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="bg-[#cfcfcf] h-[220px] overflow-hidden rounded-[16px] relative group cursor-pointer">
              <img src={products[5].img} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="bg-[#cfcfcf] h-[220px] overflow-hidden rounded-[16px] relative group cursor-pointer">
              <img src={products[6].img} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
