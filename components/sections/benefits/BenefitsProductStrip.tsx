export default function BenefitsProductStrip() {
  return (
    <div
      className="content-stretch flex gap-[16px] items-center relative shrink-0"
      data-name="Product display"
      data-node-id="373:1114"
    >
      {Array.from({ length: 7 }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white border border-[rgba(0,0,0,0.12)] border-solid h-[147px] overflow-clip relative rounded-[19.765px] shrink-0 w-[162px]"
        >
          <div className="absolute h-[99.865px] left-[30px] shadow-[0px_3.251px_3.251px_0px_rgba(0,0,0,0.25)] top-[23px] w-[99.162px]">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img
                alt=""
                className="absolute h-[212.8%] left-[-34.4%] max-w-none top-[-84.51%] w-[389.65%]"
                src={
                  idx === 2
                    ? "https://www.figma.com/api/mcp/asset/411434d9-6d49-4ab0-8be1-bc6a73072b4f"
                    : "https://www.figma.com/api/mcp/asset/e40fac33-2ee7-4750-96cf-d8fc122c42e7"
                }
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

