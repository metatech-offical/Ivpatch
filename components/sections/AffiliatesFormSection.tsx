import Image from "next/image";

export default function AffiliatesFormSection() {
  return (
    <section
      id="become-affiliate"
      className="bg-[#E3E4DF] rounded-[16px] w-full max-w-[1252px] h-auto md:h-[697px] shrink-0 relative overflow-hidden flex flex-col md:flex-row items-center md:pr-[60px] pb-12 md:pb-0"
      data-name="Affiliates Form Section"
    >
      {/* Left side Image (Top on mobile) */}
      <img
        src="/aff-form.png"
        alt="Affiliate Products"
        className="w-full md:w-[50%] h-auto md:h-[85%] object-contain shrink-0 mt-6 md:mt-0 md:ml-[40px] px-8 md:px-0"
      />

      {/* Right side form */}
      <div className="w-full md:w-[40%] flex flex-col px-6 md:pl-[20px] relative z-10 justify-center h-full pt-[20px] md:pt-[20px]">
        <h2 className="text-[32px] md:text-[64px] font-['Satoshi:Regular',sans-serif] font-normal leading-[1.1] mb-10 md:mb-[64px] md:ml-[-60px] text-center md:text-left whitespace-nowrap">
          <span className="text-[#1A1A1A]">Become an </span>
          <span className="text-[#B12422]">Affiliate</span>
        </h2>

        <form className="flex flex-col gap-[32px] md:gap-[40px] w-full max-w-[500px]">
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Name"
              className="w-full bg-transparent border-b border-[#7F7F7F] pb-[12px] md:pb-[16px] text-[#1A1A1A] text-[16px] md:text-[18px] font-['Satoshi:Regular',sans-serif] outline-none focus:border-[#1A1A1A] transition-colors placeholder:text-[#7F7F7F]"
            />
          </div>
          <div className="flex flex-col">
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-transparent border-b border-[#7F7F7F] pb-[12px] md:pb-[16px] text-[#1A1A1A] text-[16px] md:text-[18px] font-['Satoshi:Regular',sans-serif] outline-none focus:border-[#1A1A1A] transition-colors placeholder:text-[#7F7F7F]"
            />
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Social/ Website Link"
              className="w-full bg-transparent border-b border-[#7F7F7F] pb-[12px] md:pb-[16px] text-[#1A1A1A] text-[16px] md:text-[18px] font-['Satoshi:Regular',sans-serif] outline-none focus:border-[#1A1A1A] transition-colors placeholder:text-[#7F7F7F]"
            />
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Why do you want to become an affiliate?"
              className="w-full bg-transparent border-b border-[#7F7F7F] pb-[12px] md:pb-[16px] text-[#1A1A1A] text-[16px] md:text-[18px] font-['Satoshi:Regular',sans-serif] outline-none focus:border-[#1A1A1A] transition-colors placeholder:text-[#7F7F7F]"
            />
          </div>

          <div className="flex w-full md:block">
            <button
              type="submit"
              className="mt-[8px] md:mt-[16px] w-[184px] h-[52px] rounded-[12px] md:rounded-[16px] bg-[#2C2C2C] text-white text-[16px] font-['Satoshi:Regular',sans-serif] hover:opacity-90 transition-opacity"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
