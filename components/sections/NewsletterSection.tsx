export default function NewsletterSection() {
  return (
    <section
      className="min-h-[400px] md:h-[551px] overflow-hidden relative rounded-[16px] w-full max-w-[1252px] py-16 px-6"
      data-name="Join our newsletter"
    >
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          alt=""
          className="w-full h-full object-cover"
          src="/newsletter.svg"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center gap-8 md:gap-10">
        <h2 className="font-['Satoshi:Bold',sans-serif] text-[32px] sm:text-[36px] md:text-[40px] leading-tight text-white tracking-[-0.8px] max-w-[600px]">
          News straight to the inbox
        </h2>

        <div className="w-full max-w-[500px]">
          <div className="flex flex-col sm:flex-row items-stretch gap-3 md:gap-0 relative border-b border-white/30 md:pb-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-grow bg-transparent text-[#E6E6E6] placeholder:text-[#E6E6E6]/60 font-['Satoshi:Medium',sans-serif] text-[18px] md:text-[20px] outline-none py-2 px-1 text-center sm:text-left"
            />
            <button className="bg-white/10 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none py-2 px-6 rounded-lg sm:rounded-none text-[#CCCCCC] font-['Satoshi:Bold',sans-serif] text-[18px] md:text-[20px] hover:text-white transition-colors">
              Submit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
