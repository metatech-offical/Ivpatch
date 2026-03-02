export default function MissionHeroSection() {
  return (
    <div
      className="relative w-full rounded-[20px] overflow-hidden flex flex-col"
      style={{
        background: "linear-gradient(165deg, #c8d6c3 0%, #dbd8cc 55%, #e4e0d4 100%)",
      }}
      data-name="MissionHero"
    >
      {/* ── TOP: Product image + Heading ── */}
      <div className="relative w-full flex" style={{ minHeight: "480px" }}>

        {/* Left: layered hand + product box images */}
        <div className="relative w-[52%] overflow-hidden" style={{ minHeight: "600px" }}>
          {/* Base: hand + box SVG */}
          <img
            alt="Hand holding IVPATCH product box"
            src="/hand-box.svg"
            className="absolute max-w-none object-contain object-bottom"
            style={{ width: "135%", left: "-28%", bottom: "-30%", maxHeight: "720px" }}
          />
        </div>

        {/* Right: Heading + Button */}
        <div className="flex-1 flex flex-col justify-center pl-[36px] pr-[56px] py-[50px]">
          <h1
            className="text-[64px] leading-[1.08] text-black mb-[30px]"
            style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 400, letterSpacing: "-1px" }}
          >
            Support that<br />Feels Natural
          </h1>
          <div
            className="inline-flex items-center self-start px-[24px] py-[12px] rounded-[50px] cursor-pointer"
            style={{
              background: "rgba(26,26,26,0.88)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(0,0,0,0.15)",
            }}
          >
            <span
              className="text-white text-[19px] tracking-[0.38px] whitespace-nowrap"
              style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700 }}
            >
              View the Range
            </span>
          </div>
        </div>
      </div>

      {/* ── ROW 1: 95% + 24 Hours | Backed by Science ── */}
      <div className="flex gap-[12px] px-[20px] pb-[12px]">

        {/* Left column: 95% + 24 Hours stacked */}
        <div className="flex flex-col gap-[12px] w-[340px] shrink-0">
          {/* 95% */}
          <div
            className="rounded-[14px] p-[28px] flex flex-col"
            style={{
              background: "rgba(255,255,255,0.55)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.6)",
              minHeight: "200px",
            }}
          >
            <p
              className="text-[48px] leading-[1.05] text-black"
              style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 500 }}
            >
              95%
            </p>
            <p
              className="text-[16px] leading-[1.55] text-[#555] mt-auto pt-[16px]"
              style={{ fontFamily: "'Satoshi', sans-serif" }}
            >
              This 95% absorption rate ensures faster, more effective results with no stomach discomfort.
            </p>
          </div>

          {/* 24 Hours */}
          <div
            className="rounded-[14px] p-[28px] flex flex-col"
            style={{
              background: "rgba(255,255,255,0.55)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.6)",
              minHeight: "200px",
            }}
          >
            <p
              className="text-[48px] leading-[1.05] text-black"
              style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 500 }}
            >
              24 Hours
            </p>
            <p
              className="text-[16px] leading-[1.55] text-[#555] mt-auto pt-[16px]"
              style={{ fontFamily: "'Satoshi', sans-serif" }}
            >
              of steady, controlled nutrient release from a single patch.
            </p>
          </div>
        </div>

        {/* Right: Backed by Science */}
        <div
          className="flex-1 rounded-[14px] overflow-hidden relative"
          style={{
            background: "rgba(255,255,255,0.45)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.6)",
            minHeight: "412px",
          }}
        >
          {/* Woman photo — right side */}
          <div className="absolute right-0 top-0 bottom-0 w-[40%]">
            <img
              alt="Woman smiling"
              src="https://www.figma.com/api/mcp/asset/e821f484-64e5-460e-815a-fa595c168c9f"
              className="w-full h-full object-cover object-top"
            />
          </div>
          {/* Text — left side */}
          <div className="absolute left-0 top-0 bottom-0 w-[60%] p-[32px] flex flex-col justify-start">
            <h2
              className="text-[36px] leading-[1.1] text-black mb-[16px]"
              style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 500 }}
            >
              Backed by Science
            </h2>
            <p
              className="text-[16px] leading-[1.65] text-[#555]"
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

      {/* ── ROW 2: You Deserve Better | Up to 5x ── */}
      <div className="flex gap-[12px] px-[20px] pb-[20px]">

        {/* You Deserve Better */}
        <div
          className="flex-1 rounded-[14px] overflow-hidden relative"
          style={{ minHeight: "310px" }}
        >
          <div className="absolute inset-0">
            <img
              alt="Person exercising"
              src="https://www.figma.com/api/mcp/asset/5b901abf-7cb2-4dbe-9b14-d324a8bb36d3"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(110deg, rgba(0,0,0,0.62) 30%, rgba(0,0,0,0.08) 80%)",
              }}
            />
          </div>
          <div className="relative z-10 p-[30px] h-full flex flex-col justify-between">
            <h2
              className="text-[40px] leading-[1.1] text-white"
              style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 500 }}
            >
              You deserve Better
            </h2>
            <div className="flex flex-col gap-[8px] mt-auto pt-[20px]">
              <div className="flex flex-wrap gap-[7px]">
                {["Steady absorption", "No digestive strain", "Consistent daily support"].map((l) => (
                  <span
                    key={l}
                    className="text-[#444] text-[14px] px-[12px] py-[6px] rounded-[8px] whitespace-nowrap"
                    style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 500, background: "#d3dccf" }}
                  >
                    {l}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-[7px]">
                {["Easy to maintain", "No needles", "No clinic visits", "Reduced nutrient loss"].map((l) => (
                  <span
                    key={l}
                    className="text-[#444] text-[14px] px-[12px] py-[6px] rounded-[8px] whitespace-nowrap"
                    style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 500, background: "#d3dccf" }}
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Up to 5x */}
        <div
          className="w-[400px] shrink-0 rounded-[14px] p-[30px] flex flex-col"
          style={{
            background: "rgba(255,255,255,0.55)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.6)",
          }}
        >
          <p
            className="text-[48px] leading-[1.05] text-black"
            style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 500 }}
          >
            Up to 5×
          </p>
          <p
            className="text-[16px] leading-[1.65] text-[#555] mt-auto pt-[48px]"
            style={{ fontFamily: "'Satoshi', sans-serif" }}
          >
            more efficient nutrient utilization compared to traditional oral
            supplements, based on delivery method and reduced digestive breakdown.
          </p>
        </div>
      </div>
    </div>
  );
}
