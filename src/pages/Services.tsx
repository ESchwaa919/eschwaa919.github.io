import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Lightbulb,
  Code,
  Users,
  Wrench,
  ArrowRight,
  CheckCircle2,
  Brain,
  GraduationCap,
  Target,
  Rocket,
  Calendar,
  Zap,
  Sparkles,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { StructuredData, createServiceSchema } from "@/components/StructuredData";
import { PILLAR_PAGES } from "@/constants/pillarPages";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Services = () => {
  // Scroll reveal hooks
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: coreRef, isVisible: coreVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: productsRef, isVisible: productsVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: modelsRef, isVisible: modelsVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal({ threshold: 0.1 });
  // Core service offerings
  const coreServices = [
    {
      icon: Lightbulb,
      title: "Strategic Guidance & Fractional CAIO",
      tagline: "Enterprise-grade AI leadership without the full-time commitment",
      description:
        "Board-approved AI strategy, governance frameworks, and executive leadership that bridges the boardroom and development floor.",
      benefits: [
        "Complete AI strategy delivered in 90 days",
        "3-year investment plan with quantified ROI",
        "Governance frameworks (FDA, EMA, ISO 42001, NIST AI RMF)",
        "Accelerate investor confidence and enterprise sales",
      ],
      cta: "Explore Strategic Services",
      link: "#strategic",
    },
    {
      icon: Code,
      title: "AI Implementation & Consulting",
      tagline: "From proof-of-concept to production deployment",
      description:
        "Hands-on implementation support, production-ready code, and comprehensive knowledge transfer so your team maintains the solution long-term.",
      benefits: [
        "Rapid POC development (2-4 weeks)",
        "Production deployment with MLOps and monitoring",
        "LLM integration, RAG architectures, custom ML models",
        "Full documentation, runbooks, and team training",
      ],
      cta: "Explore Implementation",
      link: "#implementation",
    },
    {
      icon: Users,
      title: "Expert Network & Community",
      tagline: "Access world-class AI specialists and practitioners",
      description:
        "Connect with pre-vetted AI experts across strategy, implementation, data science, ML engineering, and governance. Join a thriving community of AI leaders.",
      benefits: [
        "200+ vetted AI specialists across all domains",
        "48-hour introductions to the right expert",
        "Monthly roundtables and peer learning sessions",
        "Knowledge repository with frameworks and case studies",
      ],
      cta: "Explore Expert Network",
      link: "#expert-network",
    },
    {
      icon: Wrench,
      title: "Focused Consulting Sessions",
      tagline: "Expert guidance for specific challenges",
      description:
        "1:1 consultations, technical audits, compliance reviews, and custom problem-solving sessions. Get expert advice without long-term commitments.",
      benefits: [
        "1:1 expert consultations on any AI challenge",
        "Technical audits and architecture reviews",
        "Compliance reviews (ISO 42001, NIST AI RMF, EU AI Act)",
        "Team workshops and hands-on training",
      ],
      cta: "Explore Focused Services",
      link: "#focused",
    },
  ];

  // Featured product offerings
  const products = [
    {
      name: "AutoMLR",
      tagline: "Multi-Agent Medical Legal Review Automation",
      description:
        "Transform pharmaceutical compliance workflows with AI-powered review. 90% faster approvals with seamless Veeva Vault integration and regulatory compliance across all major markets.",
      metrics: [
        { value: "90%", label: "Faster Approvals" },
        { value: "15s", label: "Average Latency" },
        { value: "24/7", label: "Availability" },
      ],
      features: [
        "Native Veeva Vault integration",
        "FDA, EMA, MHRA, PMDA compliance",
        "Multi-agent AI with human oversight",
        "Cryptographically-sealed audit trails",
      ],
      cta: "Learn More About AutoMLR",
      link: "/automlr",
      gradient: "from-emerald-600 to-teal-600",
    },
    {
      name: "AILMS",
      tagline: "AI Enrichment for Learning Management Systems",
      description:
        "Transform static courses into dynamic, personalized learning journeys. Adaptive pathways, interactive experiences, and smart content discovery that boost engagement and retention.",
      metrics: [
        { value: "70%", label: "Higher Engagement" },
        { value: "30%", label: "Faster Completion" },
        { value: "85%", label: "Better Retention" },
      ],
      features: [
        "Seamless LMS integration (Canvas, Moodle, Blackboard)",
        "Personalized learning paths for each student",
        "Interactive quizzes, simulations, and study guides",
        "GDPR, FERPA, and COPPA compliant",
      ],
      cta: "Learn More About AILMS",
      link: "/ailms",
      gradient: "from-green-600 to-blue-600",
    },
  ];

  // Service delivery model
  const deliveryModels = [
    {
      icon: Brain,
      title: "Project-Based",
      description:
        "Fixed-scope engagements with clear deliverables. Perfect for specific initiatives like AI strategy development or POC implementation.",
    },
    {
      icon: GraduationCap,
      title: "Fractional CAIO",
      description:
        "Ongoing executive leadership on a part-time basis. Get C-level AI expertise without the full-time commitment.",
    },
    {
      icon: Target,
      title: "Retainer",
      description:
        "Monthly retainer for continuous support, advisory, and implementation assistance as your AI capabilities mature.",
    },
    {
      icon: Rocket,
      title: "Custom Engagements",
      description:
        "Bespoke arrangements tailored to your unique needs, timeline, and budget. We design the engagement that works for you.",
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <SEOHead
        title="AI Consulting Services | Fractional CAIO & Strategy"
        description="Comprehensive AI consulting services including fractional Chief AI Officer, AI strategy development, implementation support, and team training. Expert guidance for every stage of your AI journey."
        keywords="AI consulting services, fractional CAIO, AI strategy, AI implementation, AI training, AI governance, agentic workflows"
        canonicalUrl="/services"
      />
      <StructuredData schema={createServiceSchema([
        { name: "Fractional Chief AI Officer (CAIO)", description: "Enterprise-grade AI leadership, strategy development, and governance frameworks without full-time commitment.", url: "https://theaiexpert.ai/services#strategic" },
        { name: "AI Implementation & Consulting", description: "Hands-on AI development from proof-of-concept to production deployment with LLM integration, RAG architectures, and custom ML models.", url: "https://theaiexpert.ai/services#implementation" },
        { name: "AI Expert Network", description: "Access to 200+ vetted AI specialists across strategy, data science, ML engineering, and governance.", url: "https://theaiexpert.ai/services#expert-network" },
        { name: "AI Training & Workshops", description: "Team workshops, hands-on training, and upskilling programs for AI adoption.", url: "https://theaiexpert.ai/services#focused" }
      ])} />
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-20 relative">
        {/* Subtle background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-secondary/5 rounded-full blur-3xl" />
        </div>

        <div
          ref={heroRef}
          className={`max-w-4xl mx-auto text-center space-y-6 relative z-10 transition-all duration-300 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30">
            <Sparkles className="w-4 h-4 text-primary animate-pulse-glow" />
            <span className="text-sm font-heading text-primary tracking-wider">
              COMPREHENSIVE AI SERVICES
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-heading leading-tight">
            <span className="text-gradient-animate glow-green-intense">AI EXPERTISE</span>
            <br />
            <span className="text-foreground">
              ACROSS EVERY STAGE OF YOUR JOURNEY
            </span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            From initial strategy to production deployment, we provide the
            guidance, implementation support, and expert network you need to
            become AI-powered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button
              size="lg"
              className="group relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-semibold px-10 py-6 shadow-cyber transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsla(155,100%,45%,0.4)] btn-shimmer"
              asChild
            >
              <Link to="/contact">
                <Calendar className="w-5 h-5 mr-2" />
                Book a Consultation
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="group border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary text-lg font-semibold px-10 py-6 transition-all duration-300 hover:scale-105"
              asChild
            >
              <a href="/ai-assessment.html">
                Take AI Assessment
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Core Services Grid */}
      <section className="container mx-auto px-4 mb-24 section-glow">
        <div
          ref={coreRef}
          className={`transition-all duration-300 ${
            coreVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading mb-4">
              <span className="text-gradient-animate glow-green">CORE SERVICES</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive AI capabilities tailored to your organization's
              maturity level and specific needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {coreServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={index}
                  className="card-enhanced group"
                >
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/30 group-hover:bg-primary/20 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_hsla(155,100%,45%,0.2)] transition-all">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-heading text-foreground mb-2 group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-sm text-primary font-semibold uppercase tracking-wide">
                          {service.tagline}
                        </p>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <ul className="space-y-3 mb-6">
                      {service.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      variant="outline"
                      className="w-full border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary font-semibold transition-all group-hover:border-primary"
                      asChild
                    >
                      <a href={service.link} className="group/btn">
                        {service.cta}
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Service Sections */}
      <section id="strategic" className="py-20 scroll-mt-32 bg-gradient-to-br from-card/50 to-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <Card className="border-2 border-primary/30 shadow-cyber">
            <CardContent className="p-8 md:p-12">
              <div className="flex items-center gap-4 mb-6">
                <Lightbulb className="w-12 h-12 text-primary glow-green" />
                <h2 className="text-3xl md:text-4xl font-heading text-primary">
                  STRATEGIC GUIDANCE & FRACTIONAL CAIO
                </h2>
              </div>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Transform your business vision into actionable AI strategy with fractional C-level expertise. Get the strategic guidance you need without the full-time executive overhead.
              </p>

              {/* In Practice */}
              <div className="mb-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
                <h3 className="text-sm font-heading text-primary uppercase tracking-wider mb-3">Proven Across Industries</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We've led AI strategy for a hospitality analytics platform — prioritising cancellation prediction as the highest-ROI use case, leading to a 25% reduction in hotel no-shows. For a professional networking platform, we mapped the AI opportunity landscape and designed a phased roadmap from magic-link authentication to AI-powered member matching. We've also developed board-level governance frameworks for construction and higher education organisations.
                </p>
                <div className="flex flex-wrap gap-4 mt-4">
                  <Link to="/fractional-caio" className="text-sm text-primary hover:text-primary/80 flex items-center gap-1">
                    Learn about Fractional CAIO <ArrowRight className="w-3 h-3" />
                  </Link>
                  <Link to="/ai-strategy" className="text-sm text-primary hover:text-primary/80 flex items-center gap-1">
                    AI Strategy deep dive <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-xl font-heading text-foreground mb-3">What's Included:</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5" /> AI strategy development & roadmapping</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5" /> Executive leadership & board presentations</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5" /> Technology vendor evaluation & selection</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5" /> AI governance & risk management</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-heading text-foreground mb-3">Perfect For:</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2"><Target className="w-5 h-5 text-secondary mt-0.5" /> Growing SMBs needing strategic AI direction</li>
                    <li className="flex items-start gap-2"><Target className="w-5 h-5 text-secondary mt-0.5" /> Companies exploring AI for the first time</li>
                    <li className="flex items-start gap-2"><Target className="w-5 h-5 text-secondary mt-0.5" /> Organizations requiring board-level AI expertise</li>
                  </ul>
                </div>
              </div>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-cyber glow-green" asChild>
                <Link to="/contact">Start Strategic Engagement</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="implementation" className="py-20 scroll-mt-32">
        <div className="container mx-auto px-4 max-w-6xl">
          <Card className="border-2 border-primary/30 shadow-cyber">
            <CardContent className="p-8 md:p-12">
              <div className="flex items-center gap-4 mb-6">
                <Code className="w-12 h-12 text-primary glow-green" />
                <h2 className="text-3xl md:text-4xl font-heading text-primary">
                  IMPLEMENTATION & EXECUTION
                </h2>
              </div>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Turn AI strategy into reality with hands-on implementation support. From POC to production, we guide every step of your AI transformation journey.
              </p>

              {/* In Practice */}
              <div className="mb-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
                <h3 className="text-sm font-heading text-primary uppercase tracking-wider mb-3">Delivered in Production</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  From pharmaceutical compliance automation processing thousands of medical-legal reviews monthly, to workplace investigation AI analysing document evidence across complex employment cases, to a coaching platform that went from concept to production in 12 weeks — including kiosk mode for frontline workers without email access. We take AI from concept to production in regulated, high-stakes environments.
                </p>
                <div className="flex flex-wrap gap-4 mt-4">
                  <Link to="/ai-implementation" className="text-sm text-primary hover:text-primary/80 flex items-center gap-1">
                    Implementation methodology <ArrowRight className="w-3 h-3" />
                  </Link>
                  <Link to="/use-cases" className="text-sm text-primary hover:text-primary/80 flex items-center gap-1">
                    See use cases <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-xl font-heading text-foreground mb-3">What's Included:</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5" /> Proof of concept development & validation</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5" /> Production AI system deployment</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5" /> Integration with existing tech stack</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5" /> Performance monitoring & optimization</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-heading text-foreground mb-3">Perfect For:</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2"><Target className="w-5 h-5 text-secondary mt-0.5" /> Teams ready to build & deploy AI solutions</li>
                    <li className="flex items-start gap-2"><Target className="w-5 h-5 text-secondary mt-0.5" /> Companies with clear AI use cases identified</li>
                    <li className="flex items-start gap-2"><Target className="w-5 h-5 text-secondary mt-0.5" /> Organizations needing technical implementation support</li>
                  </ul>
                </div>
              </div>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-cyber glow-green" asChild>
                <Link to="/contact">Discuss Implementation</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="expert-network" className="py-20 scroll-mt-32 bg-gradient-to-br from-card/50 to-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <Card className="border-2 border-primary/30 shadow-cyber">
            <CardContent className="p-8 md:p-12">
              <div className="flex items-start gap-4 mb-6">
                <Users className="w-12 h-12 text-primary glow-green" />
                <h2 className="text-3xl md:text-4xl font-heading text-primary">
                  EXPERT NETWORK & TEAM TRAINING
                </h2>
              </div>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Build internal AI capabilities through comprehensive training and access to our curated network of AI specialists. Empower your team to own your AI transformation.
              </p>

              {/* In Practice */}
              <div className="mb-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
                <h3 className="text-sm font-heading text-primary uppercase tracking-wider mb-3">Building AI-Literate Organisations</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We've delivered board-level AI literacy workshops for construction firms and universities, turning sceptical leadership teams into confident AI evaluators. Our interactive presentation tools make complex AI concepts tangible for non-technical audiences. Through partnerships with the AI Collective and Gen AI Academy, we scale AI education across industries.
                </p>
                <div className="flex flex-wrap gap-4 mt-4">
                  <Link to="/ai-literacy" className="text-sm text-primary hover:text-primary/80 flex items-center gap-1">
                    AI Literacy programmes <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-xl font-heading text-foreground mb-3">What's Included:</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5" /> Custom AI training programs for teams</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5" /> Access to vetted AI specialist network</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5" /> Prompt engineering & AI fluency workshops</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5" /> Change management & adoption support</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-heading text-foreground mb-3">Perfect For:</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2"><Target className="w-5 h-5 text-secondary mt-0.5" /> Organizations building internal AI capabilities</li>
                    <li className="flex items-start gap-2"><Target className="w-5 h-5 text-secondary mt-0.5" /> Teams needing AI skills development</li>
                    <li className="flex items-start gap-2"><Target className="w-5 h-5 text-secondary mt-0.5" /> Companies seeking flexible expert resources</li>
                  </ul>
                </div>
              </div>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-cyber glow-green" asChild>
                <Link to="/contact">Explore Training Options</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="focused" className="py-20 scroll-mt-32">
        <div className="container mx-auto px-4 max-w-6xl">
          <Card className="border-2 border-primary/30 shadow-cyber">
            <CardContent className="p-8 md:p-12">
              <div className="flex items-center gap-4 mb-6">
                <Zap className="w-12 h-12 text-primary glow-green" />
                <h2 className="text-3xl md:text-4xl font-heading text-primary">
                  SPECIALIZED & FOCUSED SERVICES
                </h2>
              </div>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Industry-specific AI solutions and niche expertise for unique challenges. From pharmaceutical compliance to education technology, we bring deep domain knowledge.
              </p>

              {/* In Practice */}
              <div className="mb-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
                <h3 className="text-sm font-heading text-primary uppercase tracking-wider mb-3">Domain Expertise That Matters</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Our AutoMLR platform automates pharmaceutical medical-legal review with multi-agent AI and Veeva Vault integration. Our AILMS enriches learning management systems with adaptive AI pathways. Each solution is built with deep domain knowledge, regulatory awareness, and cryptographically-sealed audit trails where compliance demands it.
                </p>
                <div className="flex flex-wrap gap-4 mt-4">
                  <Link to="/ai-governance" className="text-sm text-primary hover:text-primary/80 flex items-center gap-1">
                    AI Governance frameworks <ArrowRight className="w-3 h-3" />
                  </Link>
                  <Link to="/use-cases" className="text-sm text-primary hover:text-primary/80 flex items-center gap-1">
                    Industry use cases <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-xl font-heading text-foreground mb-3">What's Included:</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5" /> Pharmaceutical medical-legal review automation</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5" /> Educational AI & learning management systems</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5" /> Industry-specific compliance & governance</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5" /> Custom AI product development</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-heading text-foreground mb-3">Perfect For:</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2"><Target className="w-5 h-5 text-secondary mt-0.5" /> Highly regulated industries (pharma, healthcare)</li>
                    <li className="flex items-start gap-2"><Target className="w-5 h-5 text-secondary mt-0.5" /> Educational institutions & EdTech companies</li>
                    <li className="flex items-start gap-2"><Target className="w-5 h-5 text-secondary mt-0.5" /> Organizations with unique AI requirements</li>
                  </ul>
                </div>
              </div>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-cyber glow-green" asChild>
                <Link to="/contact">Discuss Your Needs</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 section-glow relative">
        <div
          ref={productsRef}
          className={`container mx-auto px-4 transition-all duration-300 ${
            productsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading mb-4">
              <span className="text-gradient-animate glow-pink" style={{ backgroundImage: 'linear-gradient(135deg, hsl(320, 85%, 55%), hsl(280, 85%, 55%), hsl(320, 85%, 55%))' }}>
                SPECIALIZED PRODUCTS
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Purpose-built AI solutions for pharmaceutical compliance and
              education technology
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 max-w-7xl mx-auto">
            {products.map((product, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-card to-background border-2 border-border hover:border-secondary/50 transition-all shadow-cyber-lg overflow-hidden group h-full flex flex-col"
              >
                <div
                  className={`h-2 bg-gradient-to-r ${product.gradient}`}
                ></div>
                <CardContent className="p-10 flex-1 flex flex-col">
                  <h3 className="text-3xl font-heading text-foreground mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-secondary font-semibold uppercase tracking-wide mb-4">
                    {product.tagline}
                  </p>

                  <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
                    {product.description}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 p-4 sm:p-6 bg-background/50 rounded-lg border border-border">
                    {product.metrics.map((metric, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-3xl font-heading text-primary mb-1">
                          {metric.value}
                        </div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wide">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-grow">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    size="lg"
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 glow-pink font-semibold py-6 shadow-cyber"
                    asChild
                  >
                    <a href={product.link}>
                      {product.cta}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Delivery Models */}
      <section className="container mx-auto px-4 py-20">
        <div
          ref={modelsRef}
          className={`transition-all duration-300 ${
            modelsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading mb-4">
              <span className="text-gradient-animate glow-green">
                FLEXIBLE ENGAGEMENT MODELS
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We adapt to your needs, timeline, and budget. No one-size-fits-all
              packages.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {deliveryModels.map((model, index) => {
              const Icon = model.icon;
              return (
                <Card
                  key={index}
                  className="card-enhanced text-center group"
                >
                  <CardContent className="p-6">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 border border-primary/30 group-hover:bg-primary/20 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_hsla(155,100%,45%,0.2)] transition-all">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-heading text-foreground mb-3 group-hover:text-primary transition-colors">
                      {model.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {model.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-6">
              Not sure which engagement model fits your needs?
            </p>
            <Button
              size="lg"
              variant="outline"
              className="group border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary font-semibold px-10 py-6 transition-all hover:scale-105"
              asChild
            >
              <Link to="/pricing">
                View Pricing & Packages
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* AI Knowledge Hub */}
      <section className="container mx-auto px-4 py-20 section-glow">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading mb-4">
            <span className="text-gradient-animate glow-green">GO DEEPER</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our comprehensive guides on every aspect of enterprise AI
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {PILLAR_PAGES.map((page) => (
            <Link
              key={page.path}
              to={page.path}
              className="group p-6 rounded-lg border border-border hover:border-primary/50 bg-card/50 hover:bg-primary/5 transition-all"
            >
              <h3 className="text-lg font-heading text-foreground mb-2 group-hover:text-primary transition-colors">
                {page.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">{page.desc}</p>
              <span className="text-sm text-primary flex items-center gap-1">
                Read more <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* The Process Link */}
      <section className="container mx-auto px-4 py-20">
        <div
          ref={ctaRef}
          className={`transition-all duration-300 ${
            ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="relative max-w-4xl mx-auto">
            {/* Cyber corners */}
            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-primary/60" />
            <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-primary/60" />
            <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-primary/60" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-primary/60" />

            <Card className="glass-card border border-primary/30 shadow-glow-card">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">
                  READY TO START YOUR <span className="text-primary glow-green">AI JOURNEY</span>?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Our proven 3-stage process takes you from AI-curious to
                  AI-powered: Literacy → Strategy → Implementation
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="group relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-semibold px-10 py-6 shadow-cyber transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsla(155,100%,45%,0.4)] btn-shimmer"
                    asChild
                  >
                    <Link to="/process">
                      Explore The Process
                      <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="group border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary text-lg font-semibold px-10 py-6 transition-all duration-300 hover:scale-105"
                    asChild
                  >
                    <Link to="/contact">
                      <Calendar className="w-5 h-5 mr-2" />
                      Book Strategy Call
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
