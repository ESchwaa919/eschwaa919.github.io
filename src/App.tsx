import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import AmbientBackground from "@/components/AmbientBackground";
import CourseBanner from "@/components/CourseBanner";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import About from "./pages/About";
import Process from "./pages/Process";
import RuneSDLC from "./pages/RuneSDLC";
import Services from "./pages/Services";
import Resources from "./pages/Resources";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import AIAssessment from "./pages/AIAssessment";
import ROICalculator from "./pages/ROICalculator";
import PromptFluency from "./pages/PromptFluency";
import AILearning from "./pages/AILearning";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import AutoMLR from "./pages/AutoMLR";
import AILMS from "./pages/AILMS";
import NotFound from "./pages/NotFound";
// New pillar pages for SEO/GEO
import FractionalCAIO from "./pages/FractionalCAIO";
import AILiteracy from "./pages/AILiteracy";
import AIStrategy from "./pages/AIStrategy";
import AIGovernance from "./pages/AIGovernance";
import AIImplementation from "./pages/AIImplementation";
import UseCases from "./pages/UseCases";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AmbientBackground particleCount={40} showGrid={true} intensity="medium" />
        <CourseBanner />
        <Navigation />
        <main className="pt-[124px]">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/process" element={<Process />} />
          <Route path="/process/rune-sdlc" element={<RuneSDLC />} />
          <Route path="/the-process" element={<Navigate to="/process" replace />} />
          <Route path="/services" element={<Services />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/ai-assessment" element={<AIAssessment />} />
          <Route path="/roi-calculator" element={<ROICalculator />} />
          <Route path="/promptfluency" element={<PromptFluency />} />
          <Route path="/prompt-fluency" element={<PromptFluency />} />
          <Route path="/ai-learning" element={<AILearning />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/automlr" element={<AutoMLR />} />
          <Route path="/ailms" element={<AILMS />} />
          <Route path="/courses" element={<Courses />} />

          {/* Pillar pages for SEO/GEO */}
          <Route path="/fractional-caio" element={<FractionalCAIO />} />
          <Route path="/ai-literacy" element={<AILiteracy />} />
          <Route path="/ai-strategy" element={<AIStrategy />} />
          <Route path="/ai-governance" element={<AIGovernance />} />
          <Route path="/ai-implementation" element={<AIImplementation />} />
          <Route path="/use-cases" element={<UseCases />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
