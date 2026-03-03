export default function NewsletterSection() {
  return (
    <section
      className="min-h-[400px] md:h-[551px] overflow-hidden relative rounded-[16px] w-full max-w-[1252px] py-16 px-6"
      data-name="Join our newsletter"
      style={{
        backgroundImage:
          "linear-gradient(179.99999999999994deg, rgb(157, 145, 131) 0%, rgb(158, 146, 132) 8.742%, rgb(155, 143, 129) 26.795%, rgb(150, 138, 124) 42.098%, rgb(144, 132, 120) 54.651%, rgb(136, 124, 112) 65.411%, rgb(127, 115, 103) 77.128%, rgb(122, 110, 98) 85.975%, rgb(119, 107, 95) 93.268%, rgb(121, 108, 99) 100%)",
      }}
    >
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          alt=""
          className="w-full h-full object-cover opacity-30 md:opacity-100"
          src="https://www.figma.com/api/mcp/asset/a1c206db-f0e0-4bb5-9ea1-2b0c330f7644"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center gap-8 md:gap-10">
        <h2 className="font-['Satoshi:Bold',sans-serif] text-[32px] sm:text-[40px] md:text-[50px] leading-tight text-white tracking-[-0.8px] max-w-[600px]">
          News straight to the inbox
        </h2>

        <div className="w-full max-w-[500px]">
          <div className="flex flex-col sm:flex-row items-stretch gap-3 md:gap-0 relative border-b border-white/30 md:pb-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-grow bg-transparent text-white placeholder:text-white/60 font-['Satoshi:Medium',sans-serif] text-[18px] md:text-[20px] outline-none py-2 px-1 text-center sm:text-left"
            />
            <button className="bg-white/10 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none py-2 px-6 rounded-lg sm:rounded-none text-white/80 font-['Satoshi:Medium',sans-serif] text-[18px] md:text-[20px] hover:text-white transition-colors">
              Submit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
