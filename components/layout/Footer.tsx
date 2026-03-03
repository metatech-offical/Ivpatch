import Link from "next/link";
import ComingSoonTooltip from "@/components/ui/ComingSoonTooltip";

export default function Footer() {
  const sections = [
    {
      title: "Shop",
      options: ["Patches", "Bundles", "Subscriptions"],
      type: "coming-soon",
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
      className="bg-[#262626] py-12 px-6 md:px-20 relative rounded-[16px] w-full mt-10"
      data-name="Footer"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-20 mb-16">
        {sections.map((section) => (
          <div key={section.title} className="flex flex-col gap-4">
            <h4 className="text-white text-[24px] md:text-[30px] font-['Satoshi:Medium',sans-serif] tracking-[-0.15px]">
              {section.title}
            </h4>
            <div className="flex flex-col gap-2 text-[16px] md:text-[18px] text-[#b2b2b2] font-['Satoshi:Medium',sans-serif]">
              {section.links?.map((link) => (
                <Link key={link.name} href={link.href} className="hover:text-white transition-colors">
                  {link.name}
                </Link>
              ))}
              {section.options.map((option) => (
                <ComingSoonTooltip key={option} className="block hover:text-white transition-colors">
                  {option}
                </ComingSoonTooltip>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full pt-10 border-t border-white/5">
        <div className="w-full max-w-[1000px] mx-auto opacity-80">
          <img
            alt="IVPATCH"
            className="w-full h-auto object-contain pointer-events-none"
            src="https://www.figma.com/api/mcp/asset/a49c8e67-fb21-4c01-bdb8-17aa3aadbe89"
          />
        </div>
      </div>
    </footer>
  );
}
