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
      className="bg-white rounded-[16px] w-full max-w-[1252px] h-[589px] shrink-0 relative overflow-hidden"
      data-name="Affiliates How It Works"
    >
      {/* Top right lemon image */}
      <div className="absolute top-[30px] right-[40px] w-[199px] h-[194px] z-0 pointer-events-none">
        <Image
          src="/aff-lem.svg"
          alt="Lemon Tea"
          fill
          className="object-contain"
        />
      </div>

      <div className="flex items-center h-full w-full pl-[50px] relative z-10">
        {/* Left Yellow Box Image */}
        <div className="w-[459px] h-[468px] relative shrink-0">
          <Image
            src="/aff-yellow.svg"
            alt="IVPatch Box"
            fill
            className="object-contain"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col relative">
          <h2 className="text-[64px] font-['Satoshi:Regular',sans-serif] font-normal leading-[1.1] text-[#1A1A1A] ml-[-30px] mt-[30px]">
            How it Works
          </h2>

          <div className="flex flex-col gap-[36px] mt-[80px] ml-[25px]">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center gap-[24px]">
                {/* Number Image */}
                <div className="shrink-0 flex items-center justify-center">
                  <img src={step.numImg} alt={`Step ${index + 1}`} className="h-[60px] w-auto object-contain" />
                </div>

                {/* Text Content */}
                <div className="flex flex-col">
                  <h3 className="text-[24px] font-['Satoshi:Regular',sans-serif] font-normal text-[#1A1A1A] leading-[1.2]">
                    {step.title}
                  </h3>
                  <p className="text-[16px] font-['Satoshi:Regular',sans-serif] font-normal text-[#333333] mt-[4px]">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
