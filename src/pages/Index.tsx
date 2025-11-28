import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import ProcessOverview from "@/components/ProcessOverview";
import WhyWorkWithErik from "@/components/WhyWorkWithErik";
import LeadMagnet from "@/components/LeadMagnet";
import TrustSignals from "@/components/TrustSignals";
import FinalCTA from "@/components/FinalCTA";
import SEOHead from "@/components/SEOHead";
import { StructuredData, organizationSchema } from "@/components/StructuredData";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEOHead
        title="AI Expert Consulting | Fractional CAIO Services | Erik Schwartz"
        description="Transform your business with expert AI consulting. Erik Schwartz offers fractional Chief AI Officer services, AI strategy development, and implementation support for SMBs in London, UK, and globally."
        keywords="AI consultant, fractional CAIO, AI strategy, artificial intelligence consulting, business AI implementation, AI training, machine learning consultant, London AI expert"
        canonicalUrl="/"
        ogType="website"
      />
      <StructuredData schema={organizationSchema} />
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
