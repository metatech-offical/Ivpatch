import Image from "next/image";

export default function AffiliatesFormSection() {
  return (
    <section
      className="bg-[#E3E4DF] rounded-[16px] w-full max-w-[1252px] h-[697px] shrink-0 relative overflow-hidden flex items-center pr-[60px]"
      data-name="Affiliates Form Section"
    >
      {/* Left side Image */}
      <img
        src="/aff-form.png"
        alt="Affiliate Products"
        className="w-[50%] h-[85%] object-contain shrink-0 ml-[40px]"
      />

      {/* Right side form */}
      <div className="w-[40%] flex flex-col pl-[20px] relative z-10 justify-center h-full pt-[20px]">
        <h2 className="text-[64px] font-['Satoshi:Regular',sans-serif] font-normal leading-[1.1] mb-[64px] ml-[-60px] whitespace-nowrap">
          <span className="text-[#1A1A1A]">Become an </span>
          <span className="text-[#B12422]">Affiliate</span>
        </h2>

        <form className="flex flex-col gap-[40px] w-full max-w-[500px]">
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Name"
              className="w-full bg-transparent border-b border-[#7F7F7F] pb-[16px] text-[#7F7F7F] text-[18px] font-['Satoshi:Regular',sans-serif] outline-none focus:border-[#1A1A1A] transition-colors placeholder:text-[#7F7F7F]"
            />
          </div>
          <div className="flex flex-col">
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-transparent border-b border-[#7F7F7F] pb-[16px] text-[#7F7F7F] text-[18px] font-['Satoshi:Regular',sans-serif] outline-none focus:border-[#1A1A1A] transition-colors placeholder:text-[#7F7F7F]"
            />
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Social/ Website Link"
              className="w-full bg-transparent border-b border-[#7F7F7F] pb-[16px] text-[#7F7F7F] text-[18px] font-['Satoshi:Regular',sans-serif] outline-none focus:border-[#1A1A1A] transition-colors placeholder:text-[#7F7F7F]"
            />
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Why do you want to become an affiliate?"
              className="w-full bg-transparent border-b border-[#7F7F7F] pb-[16px] text-[#7F7F7F] text-[18px] font-['Satoshi:Regular',sans-serif] outline-none focus:border-[#1A1A1A] transition-colors placeholder:text-[#7F7F7F]"
            />
          </div>

          <button
            type="submit"
            className="mt-[16px] w-[184px] h-[52px] rounded-[16px] bg-[#2C2C2C] text-white text-[16px] font-['Satoshi:Regular',sans-serif] hover:opacity-90 transition-opacity"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
