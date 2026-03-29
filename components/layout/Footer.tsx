import Link from "next/link";
import ComingSoonTooltip from "@/components/ui/ComingSoonTooltip";

export default function Footer() {
  const sections = [
    {
      title: "Shop",
      links: [{ name: "Range", href: "/range" }],
      options: ["Patches", "Bundles", "Subscriptions"],
      type: "mixed",
    },
    {
      title: "About",
      links: [{ name: "Our Mission", href: "/our-mission" }],
      options: ["Track my order", "Refunds"],
      type: "mixed",
    },
    {
      title: "Learn",
      links: [{ name: "Benefits", href: "/benefits" }],
      options: ["Ingredients", "Authentication", "Reviews", "Blog", "FAQ's"],
      type: "mixed",
    },
    {
      title: "Contact",
      options: ["My account", "Track my order", "Refunds", "Contact us", "Career"],
      type: "coming-soon",
    },
  ];

  return (
    <footer
      className="bg-[#262626] pb-12 pt-20 px-6 md:px-20 relative rounded-[16px] w-full"
      data-name="Footer"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 mb-24">
        {/* Shop Section */}
        <div className="flex flex-col gap-6">
          <h4 className="text-white text-[24px] md:text-[30px] font-['Satoshi:Medium',sans-serif] tracking-[-0.15px]">
            Shop
          </h4>
          <div className="flex flex-col gap-3 text-[16px] md:text-[18px] text-[#B2B2B2] font-['Satoshi:Medium',sans-serif]">
            <ComingSoonTooltip><span className="hover:text-white transition-colors cursor-pointer">Patches</span></ComingSoonTooltip>
            <ComingSoonTooltip><span className="hover:text-white transition-colors cursor-pointer">Bundles</span></ComingSoonTooltip>
            <ComingSoonTooltip><span className="hover:text-white transition-colors cursor-pointer">Subscriptions</span></ComingSoonTooltip>
          </div>
        </div>

        {/* About Section */}
        <div className="flex flex-col gap-6">
          <h4 className="text-white text-[24px] md:text-[30px] font-['Satoshi:Medium',sans-serif] tracking-[-0.15px]">
            About
          </h4>
          <div className="flex flex-col gap-3 text-[16px] md:text-[18px] text-[#B2B2B2] font-['Satoshi:Medium',sans-serif]">
            <Link href="/about-us" className="hover:text-white transition-colors">About Us</Link>
            <ComingSoonTooltip><span className="hover:text-white transition-colors cursor-pointer">Track my order</span></ComingSoonTooltip>
            <ComingSoonTooltip><span className="hover:text-white transition-colors cursor-pointer">Refunds</span></ComingSoonTooltip>
          </div>
        </div>

        {/* Learn Section */}
        <div className="flex flex-col gap-6">
          <h4 className="text-white text-[24px] md:text-[30px] font-['Satoshi:Medium',sans-serif] tracking-[-0.15px]">
            Learn
          </h4>
          <div className="flex flex-col gap-3 text-[16px] md:text-[18px] text-[#B2B2B2] font-['Satoshi:Medium',sans-serif]">
            <ComingSoonTooltip><span className="hover:text-white transition-colors cursor-pointer">Ingredients</span></ComingSoonTooltip>
            <ComingSoonTooltip><span className="hover:text-white transition-colors cursor-pointer">The science</span></ComingSoonTooltip>
            <ComingSoonTooltip><span className="hover:text-white transition-colors cursor-pointer">Authentication</span></ComingSoonTooltip>
            <ComingSoonTooltip><span className="hover:text-white transition-colors cursor-pointer">Reviews</span></ComingSoonTooltip>
            <ComingSoonTooltip><span className="hover:text-white transition-colors cursor-pointer">Blog</span></ComingSoonTooltip>
            <ComingSoonTooltip><span className="hover:text-white transition-colors cursor-pointer">FAQ's</span></ComingSoonTooltip>
          </div>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col gap-6">
          <h4 className="text-white text-[24px] md:text-[30px] font-['Satoshi:Medium',sans-serif] tracking-[-0.15px]">
            Contact
          </h4>
          <div className="flex flex-col gap-3 text-[16px] md:text-[18px] text-[#B2B2B2] font-['Satoshi:Medium',sans-serif]">
            <ComingSoonTooltip><span className="hover:text-white transition-colors cursor-pointer">My account</span></ComingSoonTooltip>
            <ComingSoonTooltip><span className="hover:text-white transition-colors cursor-pointer">Track my order</span></ComingSoonTooltip>
            <ComingSoonTooltip><span className="hover:text-white transition-colors cursor-pointer">Refunds</span></ComingSoonTooltip>
            <ComingSoonTooltip><span className="hover:text-white transition-colors cursor-pointer">Contact us</span></ComingSoonTooltip>
            <ComingSoonTooltip><span className="hover:text-white transition-colors cursor-pointer">Career</span></ComingSoonTooltip>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="w-full max-w-[1240px] mx-auto opacity-100">
          <img
            alt="IV PATCH"
            className="w-full h-auto object-contain pointer-events-none select-none"
            src="/iv-white-logo.svg"
          />
        </div>
      </div>
    </footer>
  );
}
