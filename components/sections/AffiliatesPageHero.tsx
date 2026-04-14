import Image from "next/image";

export default function AffiliatesPageHero() {
  return (
    <section
      className="w-full max-w-[1252px] h-[624px] relative rounded-[16px] overflow-hidden shrink-0"
      data-name="Affiliates Hero"
    >
      {/* Background Image */}
      <Image
        src="/affiliates-hero.svg"
        alt="Affiliates Hero Background"
        fill
        className="object-cover absolute inset-0 z-0"
        priority
      />

      {/* Girl Image (Right Bottom) */}
      <div className="absolute right-0 bottom-0 z-10 w-[850px] h-[641px] pointer-events-none">
        <Image
          src="/girl-aff-hero.svg"
          alt="Affiliates Hero Girl"
          fill
          className="object-contain object-bottom right-0"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-center px-6 lg:px-[120px] max-w-[700px] gap-6">
        <h1 className="font-['Satoshi:Bold',sans-serif] font-bold text-[40px] text-white leading-[1.2] whitespace-pre-line">
          Earn With{"\n"}What You Believe In
        </h1>
        <p className="font-['Satoshi:Medium',sans-serif] font-medium text-[22px] text-white/70 leading-[1.4] max-w-[450px]">
          Join IVPatch and share a smarter way to live well, while earning along the way.
        </p>
        <div className="mt-2">
          <button className="bg-white text-black font-['Satoshi:Bold',sans-serif] font-bold text-[24px] w-[171px] h-[52px] rounded-[16px] flex items-center justify-center hover:opacity-90 transition-opacity">
            Apply Now
          </button>
        </div>
      </div>
    </section>
  );
}
