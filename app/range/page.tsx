import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RangeProductsGrid from "@/components/sections/range/RangeProductsGrid";
import NewsletterSection from "@/components/sections/NewsletterSection";
import SocialsSection from "@/components/sections/SocialsSection";

const SPOTLIGHT_IMAGE = "/range-black-box.svg";

export default function RangePage() {
  return (
    <main className="bg-[#f2f2f2] min-h-screen px-[20px] py-[22px]">
      <div className="w-full max-w-[1252px] mx-auto flex flex-col gap-[20px] md:gap-[30px]">
        <Navbar active="range" />

        {/* Range Header Section */}
        <section 
          className="w-full h-[450px] md:h-[624px] rounded-[16px] overflow-hidden relative shadow-sm"
          data-name="Range Header"
        >
          {/* Background image */}
          <div className="absolute inset-0">
            <img 
              src="/range-header-bg.svg" 
              alt="Superior absorption" 
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Text Overlay - Left Aligned */}
          <div className="absolute inset-x-0 bottom-0 top-0 flex items-center px-[30px] md:px-[64px] z-10">
            <div className="max-w-[600px] flex flex-col gap-6">
              <h1 className="text-white text-[32px] md:text-[40px] font-['Satoshi:Bold',sans-serif] leading-tight tracking-[-1px]">
                Superior absorption,<br />
                effortless results
              </h1>
              <p className="text-white/70 text-[18px] md:text-[22px] font-['Satoshi:Medium',sans-serif] leading-relaxed max-w-[380px]">
                Crafted for busy lives and<br /> health-conscious minds.
              </p>
            </div>
          </div>
        </section>

        <RangeProductsGrid />

        {/* Spotlight / Social Section */}
        <section className="h-[520px] md:h-[725px] rounded-[16px] overflow-hidden relative shadow-sm">
          {/* Main Background Image */}
          <div className="absolute inset-0">
            <img src="/range-socials.svg" alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/10" />
          </div>

          {/* Content Group - Centered */}
          <div className="absolute top-[50px] md:top-[70px] left-1/2 -translate-x-1/2 w-full max-w-[600px] text-center z-10 px-6">
            <p className="text-white/70 text-[18px] md:text-[22px] font-['Satoshi:Medium',sans-serif] tracking-tight">
              A touch of Effortless nutrition
            </p>
            <h3 className="mt-4 text-white text-[32px] md:text-[40px] font-['Satoshi:Bold',sans-serif] leading-tight tracking-[-1px]">
              Where care meets comfort
            </h3>
            <button className="mt-10 mx-auto bg-white w-[140px] md:w-[163px] h-[48px] md:h-[52px] flex items-center justify-center rounded-[16px] text-[#1A1A1A] text-[18px] md:text-[24px] font-['Satoshi:Bold',sans-serif] shadow-lg transition-transform hover:scale-105 active:scale-95">
              Shop Now
            </button>
          </div>

          {/* Product Spotlight Pill */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[40px] md:bottom-[100px] w-[calc(100%-40px)] md:max-w-[460px] h-[100px] md:h-[119px] rounded-[24px] border border-white/20 bg-black/30 backdrop-blur-[15px] p-[10px] z-10 flex items-center">
            <div className="flex items-center h-full w-full gap-4 md:gap-5">
              {/* Image Box */}
              <div className="w-[80px] md:w-[119px] h-full rounded-[18px] overflow-hidden bg-white flex shrink-0 items-center justify-center">
                <img src={SPOTLIGHT_IMAGE} alt="Product Spotlight" className="w-full h-full object-contain p-2" />
              </div>

              {/* Text Wrapper - Horizontal Layout */}
              <div className="flex flex-1 items-center justify-between pr-2 md:pr-6 whitespace-nowrap">
                <p className="text-white text-[16px] md:text-[22px] font-['Satoshi:Medium',sans-serif] tracking-wide">
                  NMN/NAD+
                </p>
                <div className="flex items-baseline">
                  <span className="text-white text-[24px] md:text-[34px] font-['Satoshi:Medium',sans-serif]">$94</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SocialsSection />

        <NewsletterSection />

        <Footer />
      </div>
    </main>
  );
}
