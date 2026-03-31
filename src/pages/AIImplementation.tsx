import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Rocket,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Code,
  Users,
  Zap,
  Sparkles,
  Clock,
  Target,
  FileText,
  Shield,
  Download,
  AlertTriangle,
  Settings,
  Database,
  Cloud,
  GitBranch,
  BookOpen,
  Award,
  RefreshCw,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { StructuredData, createFAQSchema, createServiceSchema } from "@/components/StructuredData";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const AIImplementation = () => {
  // Scroll reveal hooks
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal();
  const { ref: first90Ref, isVisible: first90Visible } = useScrollReveal();
  const { ref: pilotRef, isVisible: pilotVisible } = useScrollReveal();
  const { ref: howWeWorkRef, isVisible: howWeWorkVisible } = useScrollReveal();
  const { ref: techStackRef, isVisible: techStackVisible } = useScrollReveal();
  const { ref: ownershipRef, isVisible: ownershipVisible } = useScrollReveal();
  const { ref: faqRef, isVisible: faqVisible } = useScrollReveal();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal();

  // The First 90 Days - EMBED methodology
  const implementationPhases = [
    {
      weeks: "1-2",
      name: "Discovery & Scoping",
      icon: Target,
      description: "Define scope, success metrics, and technical approach",
      activities: [
        "Stakeholder interviews and requirements gathering",
        "Technical environment assessment",
        "Data availability and quality audit",
        "Define success criteria and KPIs",
        "Risk identification and mitigation planning",
        "Create detailed project plan and timeline",
      ],
      deliverable: "Project charter with scope, timeline, and success metrics",
      color: "primary",
    },
    {
      weeks: "3-6",
      name: "Rapid Prototyping",
      icon: Zap,
      description: "Build working proof-of-concept to validate the approach",
      activities: [
        "Set up development environment",
        "Build initial prototype with core functionality",
        "Integrate with sample data and systems",
        "User testing with key stakeholders",
        "Iterate based on feedback",
        "Validate technical feasibility and performance",
      ],
      deliverable: "Working prototype demonstrating core capabilities",
      color: "secondary",
    },
    {
      weeks: "7-10",
      name: "Production Deployment",
      icon: Rocket,
      description: "Ship to production with monitoring and safeguards",
      activities: [
        "Production infrastructure setup",
        "Security hardening and compliance checks",
        "Integration with production systems",
        "Performance optimisation and load testing",
        "Monitoring, alerting, and logging setup",
        "Staged rollout with feedback loops",
      ],
      deliverable: "Production-ready system with monitoring and documentation",
      color: "primary",
    },
    {
      weeks: "11-12",
      name: "Handover & Training",
      icon: Users,
      description: "Transfer knowledge so your team owns the solution",
      activities: [
        "Complete technical documentation",
        "Team training sessions (developers, operators, users)",
        "Runbook and troubleshooting guides",
        "30-day support period",
        "Performance baseline and KPI tracking",
        "Roadmap for future enhancements",
      ],
      deliverable: "Fully documented system with trained team",
      color: "secondary",
    },
  ];

  // Pilot purgatory problems
  const pilotProblems = [
    {
      problem: "Scope creep",
      description: "POC keeps expanding without clear boundaries",
      solution: "Fixed 2-4 week sprints with defined deliverables",
    },
    {
      problem: "No production path",
      description: "Prototype built without considering deployment",
      solution: "Production architecture from day one",
    },
    {
      problem: "Wrong success metrics",
      description: "Measuring technical accuracy instead of business impact",
      solution: "Business KPIs defined before development starts",
    },
    {
      problem: "Dependency on consultant",
      description: "Only the consultant knows how it works",
      solution: "Documentation and training built into every phase",
    },
  ];

  // How we work
  const workingMethods = [
    {
      title: "Rapid Prototyping",
      icon: Zap,
      description: "Working prototype in 2-4 weeks, not months. We validate approaches quickly so you can make informed decisions before scaling investment.",
      details: [
        "Focus on core functionality first",
        "Use real data from day one",
        "Iterate based on actual user feedback",
        "Kill ideas that don't work early",
      ],
    },
    {
      title: "Production-First Mindset",
      icon: Settings,
      description: "Every prototype is built with production in mind. No throwaway code - everything we build can scale.",
      details: [
        "Production architecture from the start",
        "Security and compliance built in",
        "Monitoring and observability included",
        "MLOps pipeline for continuous deployment",
      ],
    },
    {
      title: "Knowledge Transfer",
      icon: BookOpen,
      description: "Your team owns the solution. We document everything, train your staff, and ensure you're self-sufficient.",
      details: [
        "Pair programming with your developers",
        "Comprehensive documentation",
        "Training sessions for all user types",
        "30-day support after handover",
      ],
    },
  ];

  // Technology stack
  const techCategories = [
    {
      name: "Large Language Models",
      icon: Code,
      tools: ["OpenAI GPT-4", "Anthropic Claude", "Open-source models (Llama, Mistral)", "Azure OpenAI Service"],
    },
    {
      name: "Data & Infrastructure",
      icon: Database,
      tools: ["Vector databases (Pinecone, Weaviate, Qdrant)", "PostgreSQL with pgvector", "Redis for caching", "Apache Kafka for streaming"],
    },
    {
      name: "Cloud Platforms",
      icon: Cloud,
      tools: ["AWS (SageMaker, Bedrock)", "Azure (ML, Cognitive Services)", "Google Cloud (Vertex AI)", "On-premise deployment when required"],
    },
    {
      name: "Development & MLOps",
      icon: GitBranch,
      tools: ["LangChain / LlamaIndex", "Weights & Biases", "MLflow", "Docker & Kubernetes"],
    },
  ];

  // What you own
  const ownership = [
    {
      icon: Code,
      title: "Complete Source Code",
      description: "All code is yours. No licensing fees, no ongoing royalties. You own it outright.",
    },
    {
      icon: FileText,
      title: "Full Documentation",
      description: "Architecture diagrams, API documentation, runbooks, and troubleshooting guides.",
    },
    {
      icon: Award,
      title: "Trained Team",
      description: "Your developers and operators trained to maintain and evolve the solution.",
    },
    {
      icon: Shield,
      title: "No Vendor Lock-In",
      description: "Built on open standards with clear migration paths. You're never trapped.",
    },
  ];

  // FAQs
  const faqs = [
    {
      question: "How long does AI implementation take?",
      answer: "A typical first AI project takes 90 days from kickoff to production deployment. This includes 2 weeks of discovery, 4 weeks of prototyping, 4 weeks of production deployment, and 2 weeks of handover and training. More complex projects may take longer, but we always start with a focused scope to deliver value quickly."
    },
    {
      question: "What do we own at the end?",
      answer: "You own everything: all source code, documentation, trained models, and intellectual property. There are no ongoing licensing fees or royalties. The solution is yours to maintain, modify, and extend as you see fit. We build on open standards specifically to avoid vendor lock-in."
    },
    {
      question: "Do you write production code?",
      answer: "Yes. We don't just advise - we build. Our team writes production-quality code with proper testing, documentation, and MLOps pipelines. Everything we deliver is ready for production use, not just a proof-of-concept that needs to be rebuilt."
    },
    {
      question: "What about ongoing support after the project?",
      answer: "Every project includes 30 days of post-launch support. After that, you have several options: your trained team can maintain the system independently, we can provide ongoing retainer support, or we can engage for future enhancements on a project basis. We design solutions to minimise ongoing dependency on us."
    },
    {
      question: "What if the prototype doesn't work?",
      answer: "That's exactly why we prototype first. If the approach doesn't validate during the prototype phase, we pivot or stop before significant investment. You'll have clear evidence of what works and what doesn't within 4-6 weeks, allowing you to make informed decisions about whether to proceed to production."
    },
    {
      question: "Do we need to have AI expertise in-house?",
      answer: "No. We work with teams of all technical levels. Part of our engagement is building your team's AI capabilities through knowledge transfer. By the end of the project, your team will be equipped to maintain and evolve the solution. For ongoing development, we can also help you hire AI talent."
    },
    {
      question: "How do you handle data privacy and security?",
      answer: "Security and compliance are built into every phase. We conduct data audits during discovery, implement security controls during development, and ensure compliance with relevant regulations (GDPR, HIPAA, SOC 2, etc.) before production deployment. All solutions can run in your own infrastructure if required."
    },
    {
      question: "What's the difference between this and your AI Strategy service?",
      answer: "AI Strategy (Stage 2) focuses on identifying where AI fits in your business and building a roadmap. AI Implementation (Stage 3) is about executing on that strategy - actually building and deploying the AI systems. Many clients start with strategy, but if you already have a clear use case and technical requirements, you can jump straight to implementation."
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <SEOHead
        title="AI Implementation for SMEs | From Prototype to Production in 90 Days"
        description="Get your first AI project to production in 90 days. Expert implementation consulting with rapid prototyping, production deployment, and full knowledge transfer. No pilot purgatory."
        keywords="AI implementation consultant, AI adoption for SMEs, how to implement AI in business, AI pilot programme, AI deployment, AI integration, production AI systems"
        canonicalUrl="/ai-implementation"
      />
      <StructuredData schema={createFAQSchema(faqs)} />
      <StructuredData schema={createServiceSchema([
        { name: "AI Implementation Consulting", description: "End-to-end AI implementation from prototype to production with full knowledge transfer.", url: "https://theaiexpert.ai/ai-implementation" },
        { name: "Rapid AI Prototyping", description: "Working AI prototype in 2-4 weeks to validate approach before scaling investment.", url: "https://theaiexpert.ai/ai-implementation#prototyping" },
        { name: "Production AI Deployment", description: "Deploy AI systems to production with monitoring, security, and compliance.", url: "https://theaiexpert.ai/ai-implementation#deployment" },
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
              AI IMPLEMENTATION
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-heading leading-tight">
            <span className="text-gradient-animate glow-green-intense">YOUR FIRST 90 DAYS</span>
            <br />
            <span className="text-foreground">OF REAL AI PROGRESS</span>
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Stop asking "how do I implement AI?" and start shipping. We take you from idea to production
            in 90 days with a proven methodology: build fast, learn fast, and own everything you build.
          </p>

          {/* Key Value Props */}
          <div className="flex flex-wrap justify-center gap-6 pt-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>Working prototype in 2-4 weeks</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>No pilot purgatory</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>Your team owns it</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button
              size="lg"
              className="group relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-semibold px-10 py-6 shadow-cyber transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsla(155,100%,45%,0.4)] btn-shimmer"
              asChild
            >
              <a href="https://calendly.com/eschwaa/30min">
                <Calendar className="w-5 h-5 mr-2" />
                Start Your First AI Project
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="group border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary text-lg font-semibold px-10 py-6 transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link to="/ai-strategy">
                <ArrowRight className="w-5 h-5 mr-2 rotate-180" />
                Need Strategy First?
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* The First 90 Days Section */}
      <section className="py-20 section-glow" id="first-90-days">
        <div
          ref={first90Ref}
          className={`container mx-auto px-4 transition-all duration-300 ${
            first90Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading mb-4">
              <span className="text-gradient-animate glow-green">THE FIRST 90 DAYS</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our proven methodology takes you from kickoff to production in 12 weeks.
              No multi-year roadmaps. No endless pilots. Just working AI that delivers value.
            </p>
          </div>

          {/* Timeline */}
          <div className="max-w-5xl mx-auto space-y-8">
            {implementationPhases.map((phase, index) => {
              const PhaseIcon = phase.icon;
              return (
                <div key={index} className="relative">
                  {/* Connection line */}
                  {index < implementationPhases.length - 1 && (
                    <div className="hidden md:block absolute left-[2.5rem] top-[5rem] bottom-[-2rem] w-0.5 bg-gradient-to-b from-primary/50 to-secondary/50" />
                  )}

                  <Card className={`card-enhanced border-2 ${
                    phase.color === "primary" ? "border-primary/30 hover:border-primary/50" : "border-secondary/30 hover:border-secondary/50"
                  } transition-all`}>
                    <CardContent className="p-8">
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Week indicator */}
                        <div className="flex-shrink-0 flex items-start gap-4">
                          <div className={`w-20 h-20 rounded-xl ${
                            phase.color === "primary" ? "bg-primary/10 border border-primary/30" : "bg-secondary/10 border border-secondary/30"
                          } flex items-center justify-center`}>
                            <PhaseIcon className={`w-10 h-10 ${
                              phase.color === "primary" ? "text-primary" : "text-secondary"
                            }`} />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                              phase.color === "primary" ? "bg-primary/10 text-primary border border-primary/30" : "bg-secondary/10 text-secondary border border-secondary/30"
                            }`}>
                              <Clock className="w-3 h-3 inline mr-1" />
                              Weeks {phase.weeks}
                            </span>
                            <h3 className="text-2xl font-heading text-foreground">
                              {phase.name}
                            </h3>
                          </div>

                          <p className="text-lg text-muted-foreground mb-4">
                            {phase.description}
                          </p>

                          <div className="grid md:grid-cols-2 gap-3 mb-4">
                            {phase.activities.map((activity, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-sm">
                                <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                                  phase.color === "primary" ? "text-primary" : "text-secondary"
                                }`} />
                                <span className="text-muted-foreground">{activity}</span>
                              </div>
                            ))}
                          </div>

                          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
                            phase.color === "primary" ? "bg-primary/5 border border-primary/20" : "bg-secondary/5 border border-secondary/20"
                          }`}>
                            <FileText className={`w-4 h-4 ${
                              phase.color === "primary" ? "text-primary" : "text-secondary"
                            }`} />
                            <span className="text-sm font-medium text-foreground">
                              Deliverable: {phase.deliverable}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>

          {/* Download CTA */}
          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="group border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary font-semibold px-8 py-6 transition-all"
              asChild
            >
              <a href="/downloads/ai-expert-methodology-guide.pdf" target="_blank" rel="noopener noreferrer">
                <Download className="w-5 h-5 mr-2" />
                Download The AI Expert Methodology Guide (PDF)
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* From Pilot to Production Section */}
      <section className="py-20" id="pilot-to-production">
        <div
          ref={pilotRef}
          className={`container mx-auto px-4 transition-all duration-300 ${
            pilotVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="max-w-5xl mx-auto">
            {/* Cyber corners */}
            <div className="relative">
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-secondary/50" />
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-secondary/50" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-secondary/50" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-secondary/50" />

              <Card className="glass-card border border-secondary/30 shadow-glow-card">
                <CardContent className="p-10">
                  <div className="flex items-start gap-6 mb-8">
                    <div className="w-16 h-16 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0 border border-secondary/30">
                      <AlertTriangle className="w-8 h-8 text-secondary" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-heading text-secondary glow-pink mb-4">
                        Escaping Pilot Purgatory
                      </h2>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        Most AI POCs never make it to production. They get stuck in an endless loop of
                        "almost ready" - expanding scope, unclear metrics, and no path to deployment.
                        We've seen it dozens of times. Here's how we avoid it.
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {pilotProblems.map((item, index) => (
                      <div key={index} className="p-6 bg-background/50 rounded-lg border border-border">
                        <div className="flex items-start gap-4 mb-3">
                          <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 border border-secondary/30">
                            <RefreshCw className="w-4 h-4 text-secondary" />
                          </div>
                          <div>
                            <h4 className="text-lg font-heading text-foreground">{item.problem}</h4>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                        <div className="ml-12">
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-primary font-medium">{item.solution}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-20 section-glow" id="how-we-work">
        <div
          ref={howWeWorkRef}
          className={`container mx-auto px-4 transition-all duration-300 ${
            howWeWorkVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading mb-4">
              <span className="text-gradient-animate glow-green">HOW WE WORK</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Three principles guide every implementation: speed, production-readiness, and knowledge transfer.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {workingMethods.map((method, index) => {
              const MethodIcon = method.icon;
              return (
                <Card key={index} className="card-enhanced group h-full">
                  <CardContent className="p-8 h-full flex flex-col">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/30 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all">
                      <MethodIcon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-heading text-foreground mb-4 group-hover:text-primary transition-colors">
                      {method.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {method.description}
                    </p>
                    <ul className="space-y-3 mt-auto">
                      {method.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-20" id="technology-stack">
        <div
          ref={techStackRef}
          className={`container mx-auto px-4 transition-all duration-300 ${
            techStackVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading mb-4">
              <span className="text-gradient-animate glow-green">TECHNOLOGY STACK & TOOLS</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're technology-agnostic and recommend the best tools for your specific needs.
              No vendor lock-in - everything we build is portable and open.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {techCategories.map((category, index) => {
              const CategoryIcon = category.icon;
              return (
                <Card key={index} className="card-enhanced group">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/30 group-hover:bg-primary/20 transition-all">
                        <CategoryIcon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-heading text-foreground group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.tools.map((tool, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 text-sm bg-background/50 rounded-lg border border-border text-muted-foreground"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <p className="text-muted-foreground text-sm">
              We work with your existing tech stack and can integrate with any cloud or on-premise infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* What You Own Section */}
      <section className="py-20 section-glow" id="what-you-own">
        <div
          ref={ownershipRef}
          className={`container mx-auto px-4 transition-all duration-300 ${
            ownershipVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading mb-4">
              <span className="text-gradient-animate glow-green">WHAT YOU OWN AT THE END</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              No ongoing licensing fees. No proprietary frameworks. No dependency on us.
              You own everything outright.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {ownership.map((item, index) => {
              const ItemIcon = item.icon;
              return (
                <Card key={index} className="card-enhanced text-center group">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 border border-primary/30 group-hover:bg-primary/20 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_hsla(155,100%,45%,0.2)] transition-all">
                      <ItemIcon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-heading text-foreground mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Ownership summary */}
          <div className="max-w-3xl mx-auto mt-12">
            <Card className="border-2 border-primary/30">
              <CardContent className="p-8 text-center">
                <p className="text-lg text-foreground leading-relaxed">
                  At the end of every engagement, you receive complete source code, full documentation,
                  a trained team, and 30 days of support.
                  <span className="text-primary font-semibold"> We build to hand over, not to lock in.</span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20" id="faq">
        <div
          ref={faqRef}
          className={`container mx-auto px-4 transition-all duration-300 ${
            faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading mb-4">
              <span className="text-gradient-animate glow-green">FREQUENTLY ASKED QUESTIONS</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to know about AI implementation.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="card-enhanced">
                <CardContent className="p-6">
                  <h3 className="text-lg font-heading text-primary mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="container mx-auto px-4 pb-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-heading text-muted-foreground mb-4 tracking-wider">EXPLORE RELATED TOPICS</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/ai-strategy" className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
              AI Strategy <ArrowRight className="w-3 h-3" />
            </Link>
            <Link to="/ai-governance" className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
              AI Governance <ArrowRight className="w-3 h-3" />
            </Link>
            <Link to="/fractional-caio" className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
              Fractional CAIO <ArrowRight className="w-3 h-3" />
            </Link>
            <Link to="/use-cases" className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
              Use Cases <ArrowRight className="w-3 h-3" />
            </Link>
            <Link to="/ai-literacy" className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
              AI Literacy <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20">
        <div
          ref={ctaRef}
          className={`container mx-auto px-4 transition-all duration-300 ${
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
                  READY TO START YOUR <span className="text-primary glow-green">FIRST AI PROJECT</span>?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Stop planning and start building. Book a call to discuss your use case
                  and get a clear path to your first working AI system.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="group relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-semibold px-10 py-6 shadow-cyber transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsla(155,100%,45%,0.4)] btn-shimmer"
                    asChild
                  >
                    <a href="https://calendly.com/eschwaa/30min">
                      <Calendar className="w-5 h-5 mr-2" />
                      Book Your Free Strategy Call
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="group border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary text-lg font-semibold px-10 py-6 transition-all duration-300 hover:scale-105"
                    asChild
                  >
                    <Link to="/ai-strategy">
                      Learn About AI Strategy
                      <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
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

export default AIImplementation;
