import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import RangeSection from "@/components/sections/RangeSection";
import WellnessSection from "@/components/sections/WellnessSection";
import NutritionSection from "@/components/sections/NutritionSection";
import AffiliatesSection from "@/components/sections/AffiliatesSection";
import SocialsSection from "@/components/sections/SocialsSection";
import NewsletterSection from "@/components/sections/NewsletterSection";

export default function Home() {
  return (
    <main
      className="bg-[#f2f2f2] content-start flex flex-wrap items-start px-[20px] py-[22px] relative min-h-screen w-full"
      data-name="Home page"
      data-node-id="449:166"
    >
      <div className="content-stretch flex flex-col gap-[30px] items-center relative shrink-0 w-full md:w-[1252px] mx-auto">
        <Navbar active="home" />
        <HeroSection />
        <RangeSection />
        <WellnessSection />
        <NutritionSection />
        <AffiliatesSection />
        <SocialsSection />
        <NewsletterSection />
        <Footer />
      </div>
    </main>
  );
}
