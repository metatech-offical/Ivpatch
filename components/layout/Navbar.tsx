import Link from "next/link";
import ComingSoonTooltip from "@/components/ui/ComingSoonTooltip";

type NavbarProps = {
  active?: "home" | "our-mission" | "benefits";
};

export default function Navbar({ active = "home" }: NavbarProps) {
  return (
    <div
      className="bg-white h-[55px] relative rounded-[12px] shrink-0 w-full"
      data-name="Nav Bar"
      data-node-id="449:168"
    >
      <Link href="/" aria-label="IVPATCH home">
        <div
          className="absolute h-[31px] left-[40px] top-[12px] w-[157px]"
          data-name="IV-PATCH-Black-Updated"
          data-node-id="449:169"
        >
          <img
            alt="IVPATCH"
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
            src="https://www.figma.com/api/mcp/asset/5ab95cff-f10b-4eff-989f-0a5e3bc2e130"
          />
        </div>
      </Link>
      <div
        className="absolute content-stretch flex items-center justify-between left-[638px] top-[16px] w-[562px]"
        data-node-id="449:170"
      >
        <nav
          className="content-stretch flex font-['Satoshi:Medium',sans-serif] gap-[30px] items-center leading-none not-italic relative shrink-0 text-[20px] tracking-[-0.4px] whitespace-nowrap"
          data-node-id="449:171"
        >
          <Link
            href="/"
            className={
              active === "home"
                ? "text-[#1a1a1a]"
                : "text-[#808080]"
            }
          >
            Home
          </Link>
          <ComingSoonTooltip className="text-[#808080]">
            Range
          </ComingSoonTooltip>
          <Link
            href="/our-mission"
            className={
              active === "our-mission"
                ? "text-black"
                : "text-[#808080]"
            }
          >
            Our Mission
          </Link>
          <Link
            href="/benefits"
            className={
              active === "benefits" ? "text-black" : "text-[#808080]"
            }
          >
            Benefits
          </Link>
          <ComingSoonTooltip className="text-[#808080]">
            Affiliates
          </ComingSoonTooltip>
        </nav>
        <ComingSoonTooltip>
          <div className="h-[24px] relative shrink-0 w-[60px] cursor-pointer" data-node-id="449:177">
            <img
              alt="Cart and profile"
              className="absolute block max-w-none size-full"
              src="https://www.figma.com/api/mcp/asset/bdc4b423-82e5-479f-a857-1eaf02ae9cf1"
            />
          </div>
        </ComingSoonTooltip>
      </div>
    </div>
  );
}

