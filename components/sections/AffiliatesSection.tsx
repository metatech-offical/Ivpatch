export default function AffiliatesSection() {
  return (
    <section
      className="min-h-[501px] py-12 md:py-0 overflow-hidden relative rounded-[16px] w-full max-w-[1252px]"
      data-name="Affiliates"
      style={{
        backgroundImage:
          "linear-gradient(179.99999999999994deg, rgb(157, 145, 131) 0%, rgb(158, 146, 132) 8.742%, rgb(155, 143, 129) 26.795%, rgb(150, 138, 124) 42.098%, rgb(144, 132, 120) 54.651%, rgb(136, 124, 112) 65.411%, rgb(127, 115, 103) 77.128%, rgb(122, 110, 98) 85.975%, rgb(119, 107, 95) 93.268%, rgb(121, 108, 99) 100%)",
      }}
    >
      <div className="flex flex-col md:flex-row h-full">
        {/* Profile Image - Half width on desktop, full height/width on mobile */}
        <div className="w-full md:w-[45%] h-[400px] md:h-full relative overflow-hidden order-2 md:order-1">
          <img
            alt="Affiliate testimonial"
            className="absolute inset-0 w-full h-full object-cover"
            src="https://www.figma.com/api/mcp/asset/c1354583-b8bc-4749-af17-e8b136780625"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/20 to-transparent" />
        </div>

        {/* Testimonial Content */}
        <div className="w-full md:w-[55%] flex flex-col justify-center px-8 md:px-16 py-10 md:py-0 gap-6 md:gap-[20px] order-1 md:order-2">
          <h4 className="font-['Satoshi:Medium',sans-serif] leading-tight text-[48px] sm:text-[60px] md:text-[75px] text-white">
            My New Daily Fix
          </h4>
          <div className="font-['Satoshi:Regular',sans-serif] text-[18px] md:text-[22px] text-white/70 leading-relaxed tracking-[-0.11px]">
            <p>
              I wanted something simple, effective, and easy to stay consistent with without adding another complicated step to my routine.
              These patches fit seamlessly into my day, delivering exactly what my body needs, exactly when I need it.
            </p>
          </div>
          <div className="font-['Satoshi:Medium',sans-serif] text-[20px] md:text-[24px] text-white/90 tracking-[-0.12px]">
            <p>Michelle Ray</p>
          </div>
        </div>
      </div>
    </section>
  );
}
