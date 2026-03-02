export default function BenefitsHeroSection() {
  return (
    <div
      className="bg-gradient-to-b from-[#425142] from-[62.996%] to-[rgba(54,100,54,0.73)] h-[731px] overflow-clip relative rounded-[16px] shrink-0 w-[1252px]"
      data-name="Benefits hero"
      data-node-id="373:771"
    >
      <div className="-translate-x-1/2 absolute flex h-[731px] items-center justify-center left-[calc(50%+155.5px)] top-0 w-[925px]">
        <div className="-scale-y-100 flex-none rotate-180">
          <div
            className="h-[731px] relative w-[925px]"
            data-name="image-removebg-preview (9) 1"
            data-node-id="373:772"
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img
                alt=""
                className="absolute h-[158%] left-[-0.01%] max-w-none top-[-13.82%] w-[100.03%]"
                src="https://www.figma.com/api/mcp/asset/829ec289-1dfd-4987-9ec9-8640d7373291"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute content-stretch flex flex-col gap-[20px] items-start left-[70px] top-[233px] w-[388px]"
        data-node-id="373:773"
      >
        <h5
          className="block font-['Satoshi:Bold',sans-serif] leading-none min-w-full not-italic relative shrink-0 text-[60px] text-white tracking-[-1.2px] w-[min-content]"
          data-node-id="373:774"
        >
          Feel The Difference
        </h5>
        <div
          className="flex flex-col font-['Satoshi:Regular',sans-serif] justify-center leading-[1.4] min-w-full not-italic relative shrink-0 text-[22px] text-white tracking-[0.22px] w-[min-content]"
          data-node-id="373:775"
        >
          <p className="mb-0">Discover the next level of wellness</p>
          <p className="mb-0">with our premium transdermal</p>
          <p>Patches.</p>
        </div>
        <div
          className="backdrop-blur-[11.15px] bg-white border border-[rgba(0,0,0,0.15)] border-solid content-stretch flex items-start overflow-clip px-[22px] py-[9px] relative rounded-[16px] shrink-0"
          data-node-id="373:776"
        >
          <div
            className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-black tracking-[0.48px] whitespace-nowrap"
            data-node-id="373:777"
          >
            <p className="leading-[1.4]">Get the Patch</p>
          </div>
        </div>
      </div>

      <div className="absolute contents left-[780px] top-[338px]" data-node-id="373:778">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div
            key={idx}
            className="absolute h-[11.417px] w-[9.641px]"
            style={{
              left: `${780 + (idx > 0 ? 0.83 : 0)}px`,
              top: `${338 + idx * 9.16}px`,
            }}
          >
            <img
              alt=""
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
              src="https://www.figma.com/api/mcp/asset/8d063a0b-7709-43d3-9eb0-0f4615db7a97"
            />
          </div>
        ))}
      </div>

      <div
        className="absolute left-[758px] size-[56px] top-[335px]"
        data-node-id="373:784"
      >
        <img
          alt=""
          className="absolute block max-w-none size-full"
          src="https://www.figma.com/api/mcp/asset/2deeb4df-1f00-4287-9f78-937186efd8e6"
        />
      </div>
      <div className="absolute flex h-[15px] items-center justify-center left-[774px] top-[356px] w-[10px]">
        <div className="-rotate-90 flex-none">
          <div className="h-[10px] relative w-[15px]" data-node-id="373:785">
            <div className="absolute bottom-1/4 left-[6.7%] right-[6.7%] top-0">
              <img
                alt=""
                className="block max-w-none size-full"
                src="https://www.figma.com/api/mcp/asset/c3b6e09c-1358-415a-b54d-b1ceb3a8d39a"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[15px] items-center justify-center left-[789px] top-[356px] w-[10px]">
        <div className="-rotate-90 -scale-y-100 flex-none">
          <div className="h-[10px] relative w-[15px]" data-node-id="373:786">
            <div className="absolute bottom-1/4 left-[6.7%] right-[6.7%] top-0">
              <img
                alt=""
                className="block max-w-none size-full"
                src="https://www.figma.com/api/mcp/asset/91f7a5c4-eaba-4850-bbea-e7335248ab6c"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

