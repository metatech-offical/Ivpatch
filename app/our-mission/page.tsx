import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MissionHeroSection from "@/components/sections/mission/MissionHeroSection";
import MissionBenefitsStrip from "@/components/sections/mission/MissionBenefitsStrip";
import MissionSocialsStrip from "@/components/sections/mission/MissionSocialsStrip";
import MissionNewsletterSection from "@/components/sections/mission/MissionNewsletterSection";

export default function OurMissionPage() {
  return (
    <main
      className="bg-[#f2f2f2] relative min-h-screen px-[20px] py-[22px]"
      data-name="Our mission"
    >
      <div className="flex flex-col items-center gap-[20px] w-full max-w-[1252px] mx-auto">
        <Navbar active="our-mission" />
        {/* 1. Big green hero (product + heading + all stats) */}
        <div className="w-full">
          <MissionHeroSection />
        </div>
        {/* 2. Benefits strip – yoga woman background */}
        <MissionBenefitsStrip />
        {/* 3. Socials strip */}
        <MissionSocialsStrip />
        {/* 4. Newsletter */}
        <MissionNewsletterSection />
        {/* 5. Footer */}
        <Footer />
      </div>
    </main>
  );
}
