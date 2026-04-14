import Image from "next/image";

export default function AffiliatesStepsSection() {
  const cards = [
    {
      id: 1,
      image: "/aff-1.svg",
      hoverImage: "/affh-1.svg",
      alt: "Affiliates Step 1",
    },
    {
      id: 2,
      image: "/aff-2.svg",
      hoverImage: "/affh-2.svg",
      alt: "Affiliates Step 2",
    },
    {
      id: 3,
      image: "/aff-3.svg",
      hoverImage: "/affh-3.svg",
      alt: "Affiliates Step 3",
    },
  ];

  return (
    <section
      className="bg-white rounded-[16px] w-[1252px] max-w-full h-auto md:h-[463px] shrink-0 flex flex-col items-center justify-center py-10 md:py-0"
      data-name="Affiliates Steps Section"
    >
      {/* Title & Subtitle */}
      <div className="flex flex-col items-center text-center mb-[40px]">
        <h2 className="text-[50px] font-['Satoshi:Medium',sans-serif] font-medium text-[#190F0D] leading-[1.2]">
          Why Partner With IVPatch
        </h2>
        <p className="text-[22px] font-['Satoshi:Medium',sans-serif] font-medium text-[#333333] leading-[1.4] mt-[12px]">
          Join a permium wellness brand built to reward every recommendation you make
        </p>
      </div>

      {/* Cards Grid */}
      <div className="flex flex-col md:flex-row gap-6 justify-center w-full px-6 md:px-0">
        {cards.map((card) => (
          <div
            key={card.id}
            className="relative w-full max-w-[381px] h-[220px] rounded-[16px] overflow-hidden group cursor-pointer shrink-0 border border-gray-100 bg-[#190F0D]"
          >
            {/* Base Image */}
            <Image
              src={card.image}
              alt={card.alt}
              fill
              className="object-cover transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-0"
            />

            {/* Hover Image */}
            <Image
              src={card.hoverImage}
              alt={`${card.alt} Hover`}
              fill
              className="object-cover transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100 absolute inset-0"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
