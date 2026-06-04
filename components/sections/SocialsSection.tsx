export default function SocialsSection() {
  const socialImages = [
    "/img1.svg",
    "/img2.svg",
    "/img3.svg",
    "/img4.svg",
  ];

  // Double the images for infinite scrolling
  const marqueeImages = [...socialImages, ...socialImages];

  return (
    <section
      className="bg-white py-12 md:py-16 px-6 md:px-10 rounded-[12px] w-full max-w-[1252px] overflow-hidden"
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

      <div className="relative w-full overflow-hidden">
        <style>{`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .marquee-track {
            display: flex;
            gap: 16px;
            width: max-content;
            animation: marquee 25s linear infinite;
          }
          .marquee-track:hover {
            animation-play-state: paused;
          }
        `}</style>
        
        <div className="marquee-track">
          {marqueeImages.map((img, idx) => {
            const originalIdx = idx % socialImages.length;
            return (
              <div
                key={idx}
                className="w-[280px] sm:w-[320px] md:w-[350px] h-[320px] sm:h-[350px] md:h-[439px] relative overflow-hidden rounded-[16px] group cursor-pointer shrink-0"
                style={{
                  backgroundImage:
                    "linear-gradient(168.1639735692974deg, rgba(255, 255, 255, 0) 2.2224%, rgba(255, 255, 255, 0.2) 93.92%), linear-gradient(179.41270624985742deg, rgb(182, 184, 183) 0%, rgb(178, 174, 175) 14.209%, rgb(171, 171, 171) 26.17%, rgb(163, 163, 163) 41.764%, rgb(161, 161, 161) 67.223%, rgb(171, 168, 163) 99.369%)",
                }}
              >
                <img
                  alt={`Social post ${idx + 1}`}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  src={img}
                />
                {originalIdx === 2 && (
                  <div className="absolute inset-x-6 top-6 flex items-center justify-between z-10">
                    <div className="w-8 h-8">
                      <img src="/x-icon.svg" alt="Social icon" className="w-full h-full object-contain" />
                    </div>
                    <span className="text-white font-['Satoshi:Regular',sans-serif] text-lg tracking-[-0.4px]">@IVPatch</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
