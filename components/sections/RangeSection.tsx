import Link from "next/link";

export default function RangeSection() {
  const products = [
    { name: "Energy Release", img: "/green.svg", size: "large" },
    { name: "Muscle Fuel", img: "/red.svg", size: "large" },
    { name: "Immunity", img: "/yellow.svg", size: "wide" },
    { name: "Collagen Formula", img: "/brown.svg", size: "wide" },
    { name: "Neuro", img: "/lemon.svg", size: "small" },
    { name: "ED", img: "/blue.svg", size: "small" },
    { name: "NMN-NAD+", img: "/black.svg", size: "small" },
  ];

  const CardContent = ({ product }: { product: typeof products[0] }) => (
    <>
      <Link href="/range" className="absolute inset-0 z-0">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover max-md:object-bottom transition-all duration-500 group-hover:blur-[4px]"
        />
      </Link>

      {/* Product Name Box - Top Right */}
      <div className="absolute top-4 right-4 min-w-[106px] w-fit h-[48px] bg-black/40 backdrop-blur-md rounded-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none px-4">
        <span className="text-white text-[20px] font-['Satoshi:Medium',sans-serif] whitespace-nowrap leading-none">
          {product.name}
        </span>
      </div>

      {/* Buy Now Button - Bottom Right */}
      <Link
        href="/range#products"
        className="absolute bottom-4 right-4 w-[138px] h-[44px] bg-white/90 backdrop-blur-sm rounded-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 hover:bg-white transition-all shadow-sm"
      >
        <span className="text-black text-[20px] font-['Satoshi:Medium',sans-serif]">Buy Now</span>
      </Link>
    </>
  );

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
            <div className="bg-[#cfcfcf] h-[360px] md:h-[398px] overflow-hidden rounded-[16px] relative group cursor-pointer lg:col-span-1">
              <CardContent product={products[0]} />
            </div>
            {/* Muscle Fuel */}
            <div className="bg-[#cfcfcf] h-[360px] md:h-[398px] overflow-hidden rounded-[16px] relative group cursor-pointer lg:col-span-1">
              <CardContent product={products[1]} />
            </div>
            {/* Wide stack for Immunity and Collagen */}
            <div className="hidden md:flex flex-col gap-5 md:col-span-2 lg:col-span-2">
              <div className="bg-[#cfcfcf] h-[160px] md:h-[190px] overflow-hidden rounded-[16px] relative group cursor-pointer">
                <CardContent product={products[2]} />
              </div>
              <div className="bg-[#cfcfcf] h-[160px] md:h-[190px] overflow-hidden rounded-[16px] relative group cursor-pointer">
                <CardContent product={products[3]} />
              </div>
            </div>
          </div>

          {/* Bottom Row for Desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-[#cfcfcf] h-[200px] md:h-[220px] overflow-hidden rounded-[16px] relative group cursor-pointer">
              <CardContent product={products[4]} />
            </div>
            <div className="bg-[#cfcfcf] h-[200px] md:h-[220px] overflow-hidden rounded-[16px] relative group cursor-pointer">
              <CardContent product={products[5]} />
            </div>
            <div className="bg-[#cfcfcf] h-[200px] md:h-[220px] overflow-hidden rounded-[16px] relative group cursor-pointer">
              <CardContent product={products[6]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
