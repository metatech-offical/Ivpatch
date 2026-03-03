export default function BenefitsSocialsSection() {
  const socialImages = [
    "https://www.figma.com/api/mcp/asset/0a7807da-0e61-47bd-8262-bbb9a2e9c39b",
    "https://www.figma.com/api/mcp/asset/4a1f553f-4340-4bdc-bd2a-75d29f1a556e",
    "https://www.figma.com/api/mcp/asset/b684d55b-9feb-47c4-aac5-12e2784cac45",
    "https://www.figma.com/api/mcp/asset/94914c8e-c499-4733-a512-19692efbd2d0",
  ];

  return (
    <section
      className="bg-white py-12 md:py-16 px-6 md:px-10 rounded-[12px] w-full max-w-[1252px]"
      data-name="Socials section"
    >
      <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 gap-6">
        <h2 className="font-['Satoshi:Medium',sans-serif] text-[36px] md:text-[50px] text-[#190f0d] leading-none tracking-[-1px] text-center md:text-left max-w-[447px]">
          Our journey continues on social.
        </h2>
        <span className="font-['Satoshi:Regular',sans-serif] text-[24px] md:text-[30px] text-[#190f0d] tracking-[-0.6px]">
          Follow Along
        </span>
      </div>

      <div className="flex gap-4 overflow-x-auto md:overflow-hidden pb-4 md:pb-0 scrollbar-hide">
        {socialImages.map((img, idx) => (
          <div
            key={idx}
            className="min-w-[280px] md:min-w-0 md:flex-1 h-[400px] md:h-[439px] relative overflow-hidden rounded-[16px] group cursor-pointer"
            style={{
              backgroundImage:
                "linear-gradient(168.1639735692974deg, rgba(255, 255, 255, 0) 2.2224%, rgba(255, 255, 255, 0.2) 93.92%), linear-gradient(179.41270624985742deg, rgb(182, 184, 183) 0%, rgb(178, 174, 175) 14.209%, rgb(171, 171, 171) 26.17%, rgb(163, 163, 163) 41.764%, rgb(161, 161, 161) 67.223%, rgb(171, 168, 163) 99.369%)",
            }}
          >
            <img
              alt={`Social post ${idx + 1}`}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              src={img}
            />
            {idx === 2 && (
              <div className="absolute inset-x-6 top-6 flex items-center justify-between z-10">
                <div className="w-8 h-8">
                  <img src="https://www.figma.com/api/mcp/asset/dac07e29-3909-4344-985a-1696eb8bd03e" alt="Social icon" className="w-full h-full object-contain" />
                </div>
                <span className="text-white font-['Satoshi:Regular',sans-serif] text-lg tracking-[-0.4px]">@IVPatch</span>
              </div>
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
          </div>
        ))}
      </div>
    </section>
  );
}
