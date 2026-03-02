export default function MissionBenefitsStrip() {
  return (
    <div
      className="relative bg-[#f7f4f3] h-[725px] overflow-hidden rounded-[12px] w-full"
      data-name="Socials"
      data-node-id="438:4047"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          alt=""
          className="w-full h-full object-cover"
          src="https://www.figma.com/api/mcp/asset/1e99b3e8-5e0b-4f10-8f7d-b488abec7432"
        />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)]" />
      </div>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-[24px]">
        <div className="flex flex-col items-center gap-[10px] text-center w-[480px]">
          <p
            className="text-[22px] leading-[1.4] text-[rgba(255,255,255,0.7)]"
            style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 500 }}
          >
            Benefits that add up
          </p>
          <div
            className="text-[40px] leading-none text-white tracking-[-0.8px]"
            style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700 }}
          >
            <h5 className="block mb-0">Crafted for busy lives and</h5>
            <h5 className="block">health-conscious minds.</h5>
          </div>
        </div>

        {/* Shop Now button */}
        <div className="bg-white border border-[rgba(0,0,0,0.15)] px-[22px] py-[9px] rounded-[16px] cursor-pointer">
          <p
            className="text-[24px] text-[#1a1a1a] tracking-[0.48px] leading-[1.4] whitespace-nowrap"
            style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700 }}
          >
            Shop Now
          </p>
        </div>
      </div>

      {/* Product thumbnails — bottom right */}
      <div className="absolute bottom-[32px] right-[32px] flex gap-[16px]">
        <div className="bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.2)] h-[119px] overflow-hidden rounded-[16px] w-[150px]">
          <div className="absolute bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.2)] h-[96px] left-[14px] overflow-hidden rounded-[14px] top-[11px] w-[119px]">
            <img
              alt=""
              className="w-full h-full object-cover"
              src="https://www.figma.com/api/mcp/asset/70c40b9e-e82d-480d-a639-29f86445224b"
            />
          </div>
        </div>
        <div className="bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.2)] h-[119px] overflow-hidden rounded-[16px] w-[150px]">
          <div className="absolute bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.2)] h-[96px] left-[14px] overflow-hidden rounded-[14px] top-[11px] w-[119px]">
            <img
              alt=""
              className="w-full h-full object-cover"
              src="https://www.figma.com/api/mcp/asset/e4b33ecf-2d97-4116-84d1-23ea33413d4f"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
