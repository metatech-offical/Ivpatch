export default function WellnessSection() {
  return (
    <section
      className="flex flex-col items-center pt-12 md:pt-20 gap-12 md:gap-16 w-full max-w-[1252px]"
      data-name="Wellness Section"
    >
      {/* Introduction Text */}
      <div className="flex flex-col gap-5 items-center text-center max-w-[800px] px-6">
        <h3 className="font-['Satoshi:Medium',sans-serif] text-[32px] md:text-[36px] text-[#1a1a1a] tracking-[-0.72px]">
          Wellness, Simplified
        </h3>
        <div className="font-['Satoshi:Regular',sans-serif] text-[20px] md:text-[24px] text-black/55 leading-relaxed tracking-[-0.12px]">
          <p>At IVPATCH, we aim to remove friction from wellness.</p>
          <p>No complicated routines, No compromises,</p>
          <p>Just effective solutions that fit into real lives.</p>
        </div>
      </div>

      {/* Main Feature Image */}
      <div className="w-full px-4 md:px-0">
        <div className="aspect-[16/9] md:aspect-[947/513] relative w-full overflow-hidden rounded-[16px] max-w-[947px] mx-auto">
          <img
            alt="Wellness Banner"
            className="absolute inset-0 w-full h-full object-cover"
            src="https://www.figma.com/api/mcp/asset/156f63b8-eb6e-4ea0-941f-aa760b2e4727"
          />
        </div>
      </div>

      {/* Product Gallery Grid */}
      <div className="bg-white p-5 md:p-6 rounded-[24px] w-full">
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Main Large Image */}
          <div className="lg:flex-[1.2] relative bg-[#f3ebe2] rounded-[16px] overflow-hidden group h-[400px] md:h-[669px]">
            <img
              alt="Model with patch"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src="https://www.figma.com/api/mcp/asset/9b56e960-5b42-4831-804b-411c875415e4"
            />
            {/* Feature Floating Badge */}
            <div className="absolute bottom-6 left-6 right-6 md:right-auto md:w-[280px] bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-[12px] shadow-2xl">
              <div className="flex items-center gap-3 mb-2">
                <img
                  src="https://www.figma.com/api/mcp/asset/4c99db14-df7d-498f-92c2-91a1751ed24d"
                  className="w-5 h-5"
                  alt=""
                />
                <span className="text-white font-['Satoshi:Medium_Italic',sans-serif] text-lg">Proven Effectiveness</span>
              </div>
              <p className="text-white/70 text-xs font-['Satoshi:Regular',sans-serif] leading-tight">
                Every product is carefully crafted to meet the highest quality standards
              </p>
            </div>
          </div>

          {/* Secondary Stacked Images */}
          <div className="lg:flex-1 flex flex-col gap-5">
            <div className="h-[250px] md:h-[355px] bg-[#f3ebe2] rounded-[16px] overflow-hidden group relative">
              <img
                alt="Product feature"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://www.figma.com/api/mcp/asset/72bfc62b-94b5-4417-8f07-6c7a5ef76389"
              />
            </div>
            <div className="h-[250px] md:h-[298px] bg-[#d0ab8e] rounded-[16px] overflow-hidden group relative">
              <img
                alt="Neuroboost patch"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://www.figma.com/api/mcp/asset/2ee919c6-b8cb-4826-9fb9-257b0084d44c"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
