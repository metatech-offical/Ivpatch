import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AffiliatesPageHero from "@/components/sections/AffiliatesPageHero";
import AffiliatesStepsSection from "@/components/sections/AffiliatesStepsSection";
import AffiliatesHowItWorksSection from "@/components/sections/AffiliatesHowItWorksSection";
import AffiliatesFormSection from "@/components/sections/AffiliatesFormSection";
import SocialsSection from "@/components/sections/SocialsSection";
import NewsletterSection from "@/components/sections/NewsletterSection";

export default function AffiliatesPage() {
  return (
    <main
      className="bg-[#f2f2f2] content-start flex flex-wrap items-start px-[20px] py-[22px] relative min-h-screen w-full"
      data-name="Affiliates page"
    >
      <div className="content-stretch flex flex-col gap-[30px] items-center relative shrink-0 w-full md:w-[1252px] mx-auto">
        <Navbar active="affiliates" />
        <AffiliatesPageHero />
        <AffiliatesStepsSection />
        <AffiliatesHowItWorksSection />
        <AffiliatesFormSection />
        <SocialsSection />
        <NewsletterSection />
        <Footer />
      </div>
    </main>
  );
}
