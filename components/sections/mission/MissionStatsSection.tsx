export default function MissionStatsSection() {
  return (
    <div className="flex flex-col gap-[20px] w-full" data-name="MissionStats">

      {/* Row 1: small stats left + Backed by Science right */}
      <div className="flex gap-[20px] w-full">

        {/* Left column: 95% + 24 Hours stacked */}
        <div className="flex flex-col gap-[20px] w-[380px] shrink-0">

          {/* 95% card */}
          <div
            className="rounded-[12px] p-[32px] flex flex-col justify-between"
            style={{
              background: "rgba(255,255,255,0.5)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(0,0,0,0.04)",
              minHeight: "220px",
            }}
          >
            <p
              className="text-[48px] leading-[1.1] text-black"
              style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 500 }}
            >
              95%
            </p>
            <p
              className="text-[18px] leading-[1.5] text-[#666] mt-[24px]"
              style={{ fontFamily: "'Satoshi', sans-serif" }}
            >
              This 95% absorption rate ensures faster, more effective results with no stomach discomfort.
            </p>
          </div>

          {/* 24 Hours card */}
          <div
            className="rounded-[12px] p-[32px] flex flex-col justify-between"
            style={{
              background: "rgba(255,255,255,0.5)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(0,0,0,0.04)",
              minHeight: "220px",
            }}
          >
            <p
              className="text-[48px] leading-[1.1] text-black"
              style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 500 }}
            >
              24 Hours
            </p>
            <p
              className="text-[18px] leading-[1.5] text-[#666] mt-[24px]"
              style={{ fontFamily: "'Satoshi', sans-serif" }}
            >
              of steady, controlled nutrient release from a single patch.
            </p>
          </div>
        </div>

        {/* Right: Backed by Science card */}
        <div
          className="flex-1 rounded-[12px] overflow-hidden relative"
          style={{
            background: "rgba(255,255,255,0.4)",
            backdropFilter: "blur(15px)",
            border: "1px solid rgba(0,0,0,0.04)",
            minHeight: "460px",
          }}
        >
          {/* Photo right side */}
          <div className="absolute right-0 top-0 bottom-0 w-[45%]">
            <img
              alt="Woman smiling"
              src="https://www.figma.com/api/mcp/asset/e821f484-64e5-460e-815a-fa595c168c9f"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text left side */}
          <div className="absolute left-0 top-0 bottom-0 w-[55%] p-[40px] flex flex-col justify-start">
            <h2
              className="text-[40px] leading-[1.1] text-black mb-[24px]"
              style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 500 }}
            >
              Backed by Science
            </h2>
            <p
              className="text-[18px] leading-[1.6] text-[#666]"
              style={{ fontFamily: "'Satoshi', sans-serif" }}
            >
              The skin has the ability to absorb certain vitamins and mineral
              directly. When these nutrients have a molecular weight of 500
              Daltons or less, our skin can pick it up. Unlike oral supplements,
              which must pass through the digestive system (losing potency along
              the way), our patches deliver nutrients directly through the skin
              and into the bloodstream. This 95% absorption rate ensures faster,
              more effective results with no stomach discomfort.
            </p>
          </div>
        </div>
      </div>

      {/* Row 2: You Deserve Better + Up to 5x */}
      <div className="flex gap-[20px] w-full">

        {/* You Deserve Better card (image bg) */}
        <div
          className="flex-1 rounded-[12px] overflow-hidden relative"
          style={{ minHeight: "360px" }}
        >
          {/* Background image */}
          <div className="absolute inset-0">
            <img
              alt=""
              src="https://www.figma.com/api/mcp/asset/5b901abf-7cb2-4dbe-9b14-d324a8bb36d3"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(120deg, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0.1) 80%)",
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 p-[36px] h-full flex flex-col justify-between">
            <h2
              className="text-[44px] leading-[1.1] text-white"
              style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 500 }}
            >
              You deserve Better
            </h2>

            {/* Tags */}
            <div className="flex flex-col gap-[12px] mt-[auto] pt-[32px]">
              <div className="flex flex-wrap gap-[10px]">
                {["Steady absorption", "No digestive strain", "Consistent daily support"].map((label) => (
                  <span
                    key={label}
                    className="bg-[#d3dccf] text-[#555] text-[16px] px-[14px] py-[8px] rounded-[8px] whitespace-nowrap"
                    style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 500 }}
                  >
                    {label}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-[10px]">
                {["Easy to maintain", "No needles", "No clinic visits", "Reduced nutrient loss"].map((label) => (
                  <span
                    key={label}
                    className="bg-[#d3dccf] text-[#555] text-[16px] px-[14px] py-[8px] rounded-[8px] whitespace-nowrap"
                    style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 500 }}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Up to 5x card */}
        <div
          className="w-[460px] shrink-0 rounded-[12px] p-[40px] flex flex-col justify-between"
          style={{
            background: "rgba(255,255,255,0.5)",
            backdropFilter: "blur(15px)",
            border: "1px solid rgba(0,0,0,0.04)",
          }}
        >
          <p
            className="text-[48px] leading-[1.1] text-black"
            style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 500 }}
          >
            Up to 5×
          </p>
          <p
            className="text-[18px] leading-[1.6] text-[#666] mt-[auto] pt-[40px]"
            style={{ fontFamily: "'Satoshi', sans-serif" }}
          >
            more efficient nutrient utilization compared to traditional oral
            supplements, based on delivery method and reduced digestive
            breakdown.
          </p>
        </div>
      </div>
    </div>
  );
}
