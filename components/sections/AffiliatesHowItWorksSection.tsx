import Image from "next/image";

export default function AffiliatesHowItWorksSection() {
  const steps = [
    {
      numImg: "/01.svg",
      title: "Join the Program",
      desc: "Submit a quick application in under a minute.",
    },
    {
      numImg: "/02.svg",
      title: "Get verified by the team",
      desc: "Our team reviews your profile within 24—48 hours.",
    },
    {
      numImg: "/03.svg",
      title: "Earn as you share",
      desc: "Start earning as soon as you're approved.",
    },
  ];

  return (
    <section
      className="bg-white rounded-[16px] w-full max-w-[1252px] h-auto md:h-[589px] shrink-0 relative overflow-hidden px-6 md:px-0 py-10 md:py-0"
      data-name="Affiliates How It Works"
    >
      {/* Top right lemon image */}
      <div className="absolute top-[20px] md:top-[30px] right-[20px] md:right-[40px] w-[120px] h-[120px] md:w-[199px] md:h-[194px] z-0 pointer-events-none">
        <Image
          src="/aff-lem.svg"
          alt="Lemon Tea"
          fill
          className="object-contain"
        />
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-center h-full w-full md:pl-[50px] relative z-10">
        
        {/* Yellow Box Image - Hidden on mobile, moved below content */}
        <div className="hidden md:block w-[459px] h-[468px] relative shrink-0">
          <Image
            src="/aff-yellow.svg"
            alt="IVPatch Box"
            fill
            className="object-contain"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col relative w-full">
          <h2 className="text-[36px] md:text-[64px] font-['Satoshi:Regular',sans-serif] font-normal leading-[1.1] text-[#1A1A1A] md:ml-[-30px] mt-[100px] md:mt-[30px]">
            How it Works
          </h2>

          <div className="flex flex-col gap-[28px] md:gap-[36px] mt-[40px] md:mt-[80px] md:ml-[25px]">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center gap-[16px] md:gap-[24px]">
                {/* Number Image */}
                <div className="shrink-0 flex items-center justify-center">
                  <img src={step.numImg} alt={`Step ${index + 1}`} className="h-[55px] md:h-[60px] w-auto object-contain" />
                </div>

                {/* Text Content */}
                <div className="flex flex-col">
                  <h3 className="text-[18px] md:text-[24px] font-['Satoshi:Regular',sans-serif] font-normal text-[#1A1A1A] leading-[1.2]">
                    {step.title}
                  </h3>
                  <p className="text-[14px] md:text-[16px] font-['Satoshi:Regular',sans-serif] font-normal text-[#333333] mt-[2px] md:mt-[4px]">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Yellow Box Image - Mobile only, appears at the bottom */}
          <div className="md:hidden w-full aspect-square relative mt-10 mb-4">
             <Image
                src="/aff-yellow.svg"
                alt="IVPatch Box"
                fill
                className="object-contain rounded-[16px]"
              />
          </div>
        </div>
      </div>
    </section>
  );
}
