import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import ProcessOverview from "@/components/ProcessOverview";
import WhyWorkWithErik from "@/components/WhyWorkWithErik";
import LeadMagnet from "@/components/LeadMagnet";
import TrustSignals from "@/components/TrustSignals";
import FinalCTA from "@/components/FinalCTA";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <TrustBar />
      <ProcessOverview />
      <WhyWorkWithErik />
      <LeadMagnet />
      <TrustSignals />
      <FinalCTA />
    </div>
  );
};

export default Index;
