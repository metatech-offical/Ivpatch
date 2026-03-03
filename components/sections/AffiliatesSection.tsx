export default function AffiliatesSection() {
  return (
    <section
      className="min-h-[501px] md:h-[501px] pt-12 pb-0 md:py-0 overflow-hidden relative rounded-[16px] w-full max-w-[1252px]"
      data-name="Affiliates"
      style={{
        backgroundImage:
          "linear-gradient(179.99999999999994deg, rgb(157, 145, 131) 0%, rgb(158, 146, 132) 8.742%, rgb(155, 143, 129) 26.795%, rgb(150, 138, 124) 42.098%, rgb(144, 132, 120) 54.651%, rgb(136, 124, 112) 65.411%, rgb(127, 115, 103) 77.128%, rgb(122, 110, 98) 85.975%, rgb(119, 107, 95) 93.268%, rgb(121, 108, 99) 100%)",
      }}
    >
      <div className="flex flex-col md:flex-row h-full items-stretch">
        {/* Profile Image - Optimized for full-height visibility */}
        <div className="w-full md:w-[45%] h-[400px] md:h-full relative overflow-hidden order-2 md:order-1">
          <img
            alt="Affiliate testimonial"
            className="absolute inset-0 w-full h-full object-top object-cover translate-y-4 md:translate-y-0"
            src="/lady.svg"
          />
        </div>

        {/* Testimonial Content - Styled to match screenshot */}
        <div className="w-full md:w-[55%] flex flex-col justify-center px-8 md:px-14 py-12 md:py-0 gap-6 md:gap-[24px] order-1 md:order-2">
          <h4 className="font-['Satoshi:Medium',sans-serif] leading-[1.1] text-[44px] sm:text-[54px] md:text-[72px] text-white tracking-[-0.02em]">
            My New <br className="hidden md:block" /> Daily Fix
          </h4>
          <div className="font-['Satoshi:Regular',sans-serif] text-[16px] md:text-[18px] text-white/80 leading-relaxed max-w-[460px]">
            <p>
              I wanted something simple, effective, and easy to stay consistent with without adding another complicated step to my routine.
              These patches fit seamlessly into my day, delivering exactly what my body needs, exactly when I need it.
            </p>
          </div>
          <div className="font-['Satoshi:Medium',sans-serif] text-[18px] md:text-[22px] text-white tracking-[-0.01em]">
            <p>Michelle Ray</p>
          </div>
        </div>
      </div>
    </section>
  );
}
