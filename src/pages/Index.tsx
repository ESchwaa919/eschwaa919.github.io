import ColdOpen from "@/components/story/ColdOpen";
import StakesAct from "@/components/story/StakesAct";
import PurgatoryAct from "@/components/story/PurgatoryAct";
import PathAct from "@/components/story/PathAct";
import GuideAct from "@/components/story/GuideAct";
import ProofAct from "@/components/story/ProofAct";
import FinaleAct from "@/components/story/FinaleAct";
import CourseTestimonials from "@/components/CourseTestimonials";
import SEOHead from "@/components/SEOHead";
import { StructuredData, organizationSchema } from "@/components/StructuredData";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEOHead
        title="The AI Expert | From AI-Curious to AI-Powered | Fractional CAIO & AI Consulting"
        description="AI isn't coming — it's already here. The AI Expert takes forward-looking businesses from AI-curious to AI-powered: fractional Chief AI Officer services, AI strategy, and implementation, led by Erik Schwartz (Microsoft, Comcast, Elsevier)."
        keywords="AI consultant, fractional CAIO, AI strategy, artificial intelligence consulting, business AI implementation, AI training, machine learning consultant, London AI expert"
        canonicalUrl="/"
        ogType="website"
      />
      <StructuredData schema={organizationSchema} />
      <ColdOpen />
      <StakesAct />
      <PurgatoryAct />
      <PathAct />
      <GuideAct />
      <ProofAct />
      <CourseTestimonials
        title="Workshop Success Stories"
        subtitle="What participants say about Ship an App in a Day"
      />
      <FinaleAct />
    </div>
  );
};

export default Index;
