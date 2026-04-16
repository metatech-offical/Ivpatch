import Image from "next/image";

export default function AffiliatesPageHero() {
  return (
    <section
      className="w-full max-w-[1252px] h-[750px] md:h-[624px] relative rounded-[16px] overflow-hidden bg-[#1B2551]"
      data-name="Affiliates Hero"
    >
      {/* Background Image (Mainly for Desktop) */}
      <Image
        src="/affiliates-hero.svg"
        alt="Affiliates Hero Background"
        fill
        className="object-cover absolute inset-0 z-0"
        priority
      />
      
      {/* Subtle Mobile Gradient Overlay */}
      <div className="md:hidden absolute inset-0 bg-gradient-to-b from-[#1B2551]/20 via-transparent to-transparent z-1" />

      {/* Girl Image (Right Bottom) - Increased size for mobile */}
      <div className="absolute right-0 bottom-0 z-10 w-full md:w-[850px] h-full md:h-[641px] pointer-events-none scale-115 md:scale-100 origin-bottom-right">
        <Image
          src="/girl-aff-hero.svg"
          alt="Affiliates Hero Girl"
          fill
          className="object-contain object-bottom md:object-right-bottom"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center md:items-start justify-start md:justify-center px-6 lg:px-[120px] pt-24 md:pt-0 max-w-full md:max-w-[700px] gap-6 text-center md:text-left">
        <h1 className="font-['Satoshi:Bold',sans-serif] font-bold text-[32px] md:text-[40px] text-white leading-[1.1] max-w-[300px] md:max-w-full">
          Earn With What You Believe In
        </h1>
        <p className="font-['Satoshi:Medium',sans-serif] font-medium text-[15px] md:text-[22px] text-white/80 md:text-white/70 leading-[1.4] max-w-[320px] md:max-w-[450px]">
          Join IVPatch and share a smarter way to live well, while earning along the way.
        </p>
        <div className="mt-2">
          <button className="bg-white text-black font-['Satoshi:Bold',sans-serif] font-bold text-[18px] md:text-[24px] px-8 md:w-[171px] py-3 md:h-[52px] rounded-[16px] flex items-center justify-center hover:bg-white/90 transition-all shadow-lg active:scale-95">
            Apply Now
          </button>
        </div>
      </div>
    </section>
  );
}
