import Link from "next/link";
import ComingSoonTooltip from "@/components/ui/ComingSoonTooltip";

export default function Footer() {
  return (
    <div
      className="bg-[#262626] h-[561px] overflow-clip relative rounded-[16px] shrink-0 w-full"
      data-name="Footer"
      data-node-id="449:324"
    >
      <div
        className="absolute bottom-[0.24px] h-[219.765px] left-[75px] w-[1098.823px]"
        data-name="Logo/white"
        data-node-id="449:325"
      >
        <img
          alt="IVPATCH"
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src="https://www.figma.com/api/mcp/asset/a49c8e67-fb21-4c01-bdb8-17aa3aadbe89"
        />
      </div>
      <div
        className="absolute content-stretch flex font-['Satoshi:Medium',sans-serif] items-start justify-between leading-[1.4] left-[75px] not-italic top-[40px] w-[1099px]"
        data-name="Container"
        data-node-id="449:326"
      >
        {/* Shop */}
        <div
          className="content-stretch flex flex-col gap-[16.145px] items-start relative shrink-0 w-[160px]"
          data-name="Shop"
          data-node-id="449:327"
        >
          <p
            className="min-w-full relative shrink-0 text-[30px] text-white tracking-[-0.15px] w-[min-content]"
            data-node-id="449:328"
          >
            Shop
          </p>
          <div
            className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 text-[18px] text-[#b2b2b2] tracking-[-0.09px] w-[133px]"
            data-name="Options"
            data-node-id="449:329"
          >
            <ComingSoonTooltip className="relative shrink-0 w-full block">
              Patches
            </ComingSoonTooltip>
            <ComingSoonTooltip className="relative shrink-0 w-full block">
              Bundles
            </ComingSoonTooltip>
            <ComingSoonTooltip className="relative shrink-0 w-full block">
              Subscriptions
            </ComingSoonTooltip>
          </div>
        </div>

        {/* About */}
        <div
          className="content-stretch flex flex-col gap-[16.145px] items-start relative shrink-0 w-[160px]"
          data-name="About"
          data-node-id="449:333"
        >
          <p
            className="min-w-full relative shrink-0 text-[30px] text-white tracking-[-0.15px] w-[min-content]"
            data-node-id="449:334"
          >
            About
          </p>
          <div
            className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 text-[18px] text-[#b2b2b2] tracking-[-0.09px] w-[133px]"
            data-name="Options"
            data-node-id="449:335"
          >
            <Link
              href="/our-mission"
              className="relative shrink-0 w-full hover:text-white transition-colors"
              data-node-id="449:336"
            >
              Our Mission
            </Link>
            <ComingSoonTooltip className="relative shrink-0 w-full block">
              Track my order
            </ComingSoonTooltip>
            <ComingSoonTooltip className="relative shrink-0 w-full block">
              Refunds
            </ComingSoonTooltip>
          </div>
        </div>

        {/* Learn */}
        <div
          className="content-stretch flex flex-col gap-[16.145px] items-start relative shrink-0 w-[160px]"
          data-name="Learn"
          data-node-id="449:339"
        >
          <p
            className="min-w-full relative shrink-0 text-[30px] text-white tracking-[-0.15px] w-[min-content]"
            data-node-id="449:340"
          >
            Learn
          </p>
          <div
            className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 text-[18px] text-[#b2b2b2] tracking-[-0.09px] w-[133px]"
            data-name="Options"
            data-node-id="449:341"
          >
            <ComingSoonTooltip className="relative shrink-0 w-full block">
              Ingredients
            </ComingSoonTooltip>
            <Link
              href="/benefits"
              className="relative shrink-0 w-full hover:text-white transition-colors"
              data-node-id="449:343"
            >
              Benefits
            </Link>
            <ComingSoonTooltip className="relative shrink-0 w-full block">
              Authentication
            </ComingSoonTooltip>
            <ComingSoonTooltip className="relative shrink-0 w-full block">
              Reviews
            </ComingSoonTooltip>
            <ComingSoonTooltip className="relative shrink-0 w-full block">
              Blog
            </ComingSoonTooltip>
            <ComingSoonTooltip className="relative shrink-0 w-full block">
              FAQ&apos;s
            </ComingSoonTooltip>
          </div>
        </div>

        {/* Contact */}
        <div
          className="content-stretch flex flex-col gap-[16.145px] items-start relative shrink-0 w-[160px]"
          data-name="Contact"
          data-node-id="449:348"
        >
          <p
            className="min-w-full relative shrink-0 text-[30px] text-white tracking-[-0.15px] w-[min-content]"
            data-node-id="449:349"
          >
            Contact
          </p>
          <div
            className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 text-[18px] text-[#b2b2b2] tracking-[-0.09px] w-[133px]"
            data-name="Options"
            data-node-id="449:350"
          >
            <ComingSoonTooltip className="relative shrink-0 w-full block">
              My account
            </ComingSoonTooltip>
            <ComingSoonTooltip className="relative shrink-0 w-full block">
              Track my order
            </ComingSoonTooltip>
            <ComingSoonTooltip className="relative shrink-0 w-full block">
              Refunds
            </ComingSoonTooltip>
            <ComingSoonTooltip className="relative shrink-0 w-full block">
              Contact us
            </ComingSoonTooltip>
            <ComingSoonTooltip className="relative shrink-0 w-full block">
              Career
            </ComingSoonTooltip>
          </div>
        </div>
      </div>
    </div>
  );
}
