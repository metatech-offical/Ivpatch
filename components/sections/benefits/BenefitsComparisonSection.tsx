export default function BenefitsComparisonSection() {
  return (
    <div
      className="bg-white h-[1184px] relative rounded-[10.922px] shrink-0 w-[1252px]"
      data-name="Benefits/features"
      data-node-id="373:1056"
    >
      <div className="absolute bg-[#f0f0f0] h-[787px] left-[451px] rounded-[22px] top-[349px] w-[223px]" />

      <div
        className="absolute content-stretch flex flex-col font-['Satoshi:Regular',sans-serif] gap-[22px] items-start left-[77px] not-italic top-[88px] w-[983px]"
        data-node-id="373:1057"
      >
        <div
          className="leading-[1.1] relative shrink-0 text-[64px] text-black w-[615px] whitespace-pre-wrap"
          data-node-id="373:1058"
        >
          <p className="mb-0">The Smarter </p>
          <p>Way to Supplement</p>
        </div>
        <p
          className="leading-[1.21] min-w-full relative shrink-0 text-[24px] text-[#141413] w-[min-content]"
          data-node-id="373:1059"
        >
          Designed to deliver more of what your body needs, with less effort
          and fewer compromises.
        </p>
      </div>

      {/* Header row */}
      <div
        className="absolute bottom-[578px] h-[70px] left-[36px] w-[1179px]"
        data-node-id="373:1060"
      >
        <div className="absolute left-0 top-0 w-full">
          <div className="absolute content-stretch flex gap-[130px] items-center leading-[1.21] left-[487px] not-italic text-[24px] top-[20px] whitespace-nowrap">
            <p className="font-['Satoshi:Bold',sans-serif] text-[#445c4f]">
              IVPatch
            </p>
            <p className="font-['Satoshi:Regular',sans-serif] text-[#4d4d4d]">
              Oral Supplements
            </p>
            <p className="font-['Satoshi:Regular',sans-serif] text-[#4d4d4d]">
              IV Drips
            </p>
          </div>
          <div className="absolute inset-x-0 top-0 h-px bg-[#d4d4d4]" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-[#d4d4d4]" />
        </div>
      </div>

      {[
        {
          text: "Absorbs nutrients efficiently",
          y: 508,
          dots: ["green", "grey", "grey"],
        },
        {
          text: "Delivers nutrients steadily over time",
          y: 438,
          dots: ["green", "grey", "grey"],
        },
        {
          text: "Avoids digestive breakdown",
          y: 368,
          dots: ["green", "grey", "grey"],
        },
        {
          text: "Easy to use daily",
          y: 298,
          dots: ["green", "grey", "grey"],
        },
        {
          text: "Non invasive",
          y: 228,
          dots: ["green", "grey", "grey"],
        },
        {
          text: "Designed for consistent everyday use",
          y: 158,
          dots: ["green", "grey", "grey"],
        },
        {
          text: "Cost effective over time",
          y: 88,
          dots: ["green", "grey", "grey"],
        },
      ].map((row) => (
        <div
          key={row.text}
          className="absolute left-[36px] w-[1179px]"
          style={{ bottom: `${row.y}px`, height: "70px" }}
        >
          <p className="absolute font-['Satoshi:Regular',sans-serif] leading-[1.21] left-[20px] not-italic text-[24px] text-[#333333] top-[20px] whitespace-nowrap">
            {row.text}
          </p>
          <div className="absolute inset-x-0 bottom-0 h-px bg-[#d4d4d4]" />
          {["514px", "783px", "1051px"].map((left, idx) => (
            <div
              key={left}
              className="absolute size-[22px] top-[24px]"
              style={{ left }}
            >
              <img
                alt=""
                className="absolute block max-w-none size-full"
                src={
                  idx === 0
                    ? "https://www.figma.com/api/mcp/asset/e33a9a92-73e4-40a9-882b-112991c62c65"
                    : "https://www.figma.com/api/mcp/asset/0a71bcdf-e78f-403e-b972-7590b38ddf4f"
                }
              />
            </div>
          ))}
        </div>
      ))}

      {/* Center pill + product images */}
      <div className="absolute bottom-[669.73px] left-[589px] h-[21.275px] w-[84.795px]">
        <div className="absolute inset-[-16.71%_-1.78%_-16.52%_-3.85%]">
          <img
            alt=""
            className="block max-w-none size-full"
            src="https://www.figma.com/api/mcp/asset/fd318e70-c200-462d-94ca-fb5f4d380235"
          />
        </div>
      </div>
      <div className="absolute bottom-[659.89px] left-[469px] h-[137.11px] w-[175.428px]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            alt=""
            className="absolute h-[159.97%] left-[-43.17%] max-w-none top-[-45.41%] w-[187.51%]"
            src="https://www.figma.com/api/mcp/asset/2f941832-45cd-4bc7-a262-4b6e15fea692"
          />
        </div>
      </div>
      <div className="absolute bottom-[654px] left-[1047px] h-[173px] w-[106px]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            alt=""
            className="absolute h-[120.23%] left-[-160.8%] max-w-none top-0 w-[293.69%]"
            src="https://www.figma.com/api/mcp/asset/58ddf036-8038-45fb-b3bf-dbe7c9b2af73"
          />
        </div>
      </div>
      <div className="absolute bottom-[660px] left-[752px] h-[143px] w-[155px]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            alt=""
            className="absolute h-[181.88%] left-[-31.16%] max-w-none top-[-63.94%] w-[250.57%]"
            src="https://www.figma.com/api/mcp/asset/58ddf036-8038-45fb-b3bf-dbe7c9b2af73"
          />
        </div>
      </div>
    </div>
  );
}

