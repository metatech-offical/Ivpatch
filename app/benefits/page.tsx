import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BenefitsHeroSection from "@/components/sections/benefits/BenefitsHeroSection";
import BenefitsHighlightsSection from "@/components/sections/benefits/BenefitsHighlightsSection";
import BenefitsComparisonSection from "@/components/sections/benefits/BenefitsComparisonSection";
import BenefitsProductStrip from "@/components/sections/benefits/BenefitsProductStrip";
import BenefitsSocialsSection from "@/components/sections/benefits/BenefitsSocialsSection";
import BenefitsNewsletterSection from "@/components/sections/benefits/BenefitsNewsletterSection";

export default function BenefitsPage() {
  return (
    <main
      className="bg-[#f2f2f2] content-start flex flex-wrap items-start px-[20px] py-[22px] relative min-h-screen w-full"
      data-name="Benefits"
      data-node-id="373:752"
    >
      <div className="content-stretch flex flex-col gap-[30px] items-center relative shrink-0 w-full md:w-[1252px] mx-auto">
        <Navbar active="benefits" />
        <BenefitsHeroSection />
        <BenefitsHighlightsSection />
        <BenefitsComparisonSection />
        <BenefitsProductStrip />
        <BenefitsSocialsSection />
        <BenefitsNewsletterSection />
        <Footer />
      </div>
    </main>
  );
}

