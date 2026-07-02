import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Target,
  Rocket,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Brain,
  Map,
  Zap,
  Users,
  TrendingUp,
  AlertCircle,
  Lightbulb,
  Shield,
  Code,
  BarChart,
  Sparkles,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Process = () => {
  // Scroll reveal hooks
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal();
  const { ref: whyRef, isVisible: whyVisible } = useScrollReveal();
  const { ref: mapRef, isVisible: mapVisible } = useScrollReveal();
  const { ref: pathsRef, isVisible: pathsVisible } = useScrollReveal();
  const { ref: differentRef, isVisible: differentVisible } = useScrollReveal();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal();
  // The 3 stages with comprehensive details
  const stages = [
    {
      number: "01",
      name: "Literacy & Fluency",
      tagline: "Build confidence before committing capital",
      icon: GraduationCap,
      challenge: "You can't strategize what you don't understand",
      description:
        "Most AI initiatives fail because leadership can't evaluate proposals, teams can't distinguish hype from reality, and nobody knows what's actually possible. We fix this first.",
      duration: "2-4 weeks",
      outcome: "Confident leadership and educated teams who can evaluate AI opportunities critically",
      whoItsFor: "Organizations starting their AI journey or those stuck in 'pilot purgatory'",
      keyActivities: [
        {
          icon: Users,
          title: "Executive Briefings",
          description: "Board-level sessions on AI capabilities, limitations, and business impact",
        },
        {
          icon: Brain,
          title: "Hands-On Workshops",
          description: "Interactive sessions where teams use real AI tools and understand how they work",
        },
        {
          icon: BarChart,
          title: "Competency Assessment",
          description: "Baseline evaluation of current AI literacy across leadership and staff",
        },
        {
          icon: Lightbulb,
          title: "Use Case Discovery",
          description: "Identify where AI can drive real value in your specific business context",
        },
      ],
      deliverables: [
        "AI literacy baseline and gap analysis",
        "Custom executive education materials",
        "Initial use case inventory (20-30 opportunities)",
        "Competency development roadmap",
        "Common AI terminology glossary for your team",
      ],
      successIndicators: [
        "Leadership can evaluate AI proposals independently",
        "Teams understand what AI can and cannot do",
        "Clear picture of where AI fits in your business",
        "Shared language for discussing AI initiatives",
      ],
      inPractice: {
        text: "We delivered board-level AI literacy sessions for a major UK construction firm, helping leadership evaluate AI proposals for site safety and supply chain optimisation. For a university, we ran hands-on workshops transforming faculty sceptics into AI champions who now integrate AI tools into their teaching. Our interactive presentation platform makes complex AI concepts tangible for non-technical audiences.",
        links: [
          { name: "Explore AI Literacy in depth", path: "/ai-literacy" },
        ],
      },
      color: "primary",
    },
    {
      number: "02",
      name: "Strategy & Planning",
      tagline: "Strategy before scale",
      icon: Target,
      challenge: "You can't implement without a roadmap",
      description:
        "Armed with AI literacy, you're ready to build a strategic plan. We help you prioritize use cases, model ROI, establish governance, and create a board-approved roadmap.",
      duration: "4-8 weeks",
      outcome: "Board-ready AI strategy with quantified ROI and clear implementation roadmap",
      whoItsFor: "Organizations ready to commit resources and build AI capabilities systematically",
      keyActivities: [
        {
          icon: Target,
          title: "Use Case Prioritization",
          description: "Score opportunities by impact, feasibility, and strategic alignment",
        },
        {
          icon: TrendingUp,
          title: "ROI Modeling",
          description: "Quantify expected returns, timeline, and resource requirements",
        },
        {
          icon: Shield,
          title: "Governance Framework",
          description: "Establish ethical guidelines, compliance requirements, and risk management",
        },
        {
          icon: Map,
          title: "3-Year Roadmap",
          description: "Phase implementation across quick wins, strategic bets, and transformational initiatives",
        },
      ],
      deliverables: [
        "Prioritized use case portfolio (with impact scores)",
        "3-year AI investment roadmap with budget estimates",
        "Governance framework (ISO 42001, NIST AI RMF, or custom)",
        "Risk assessment and mitigation strategies",
        "Technology stack recommendations",
        "Organizational design (team structure, roles, hiring plan)",
        "Board presentation materials",
      ],
      successIndicators: [
        "Board approval and budget allocation secured",
        "Clear ROI expectations for first 3 initiatives",
        "Governance and compliance requirements defined",
        "Team knows what to build and in what order",
      ],
      inPractice: {
        text: "For a hospitality analytics company, we developed an AI strategy that prioritised cancellation prediction as the highest-ROI use case — leading to a 25% reduction in hotel no-shows. For a professional networking platform, we mapped the AI opportunity landscape and designed a phased roadmap from magic-link authentication to AI-powered member matching. Each strategy was board-approved with quantified ROI.",
        links: [
          { name: "AI Strategy deep dive", path: "/ai-strategy" },
          { name: "AI Governance frameworks", path: "/ai-governance" },
        ],
      },
      color: "secondary",
    },
    {
      number: "03",
      name: "Implementation & Scale",
      tagline: "Build fast, learn fast",
      icon: Rocket,
      challenge: "You can't succeed without execution",
      description:
        "Now we build. We start with rapid prototyping to validate approaches, then move to production deployment. No pilot purgatoryjust working solutions that deliver measurable value.",
      duration: "8-16 weeks per initiative",
      outcome: "Production-ready AI systems delivering measurable ROI with full team ownership",
      whoItsFor: "Organizations ready to execute on specific AI initiatives with committed teams",
      keyActivities: [
        {
          icon: Zap,
          title: "Rapid Prototyping",
          description: "Working proof-of-concept in 2-4 weeks to validate technical approach",
        },
        {
          icon: Code,
          title: "Production Deployment",
          description: "Full-scale implementation with monitoring, security, and compliance",
        },
        {
          icon: Users,
          title: "Team Training",
          description: "Knowledge transfer so your team maintains and evolves the solution",
        },
        {
          icon: TrendingUp,
          title: "Performance Optimization",
          description: "Continuous tuning based on real-world usage and business metrics",
        },
      ],
      deliverables: [
        "Working proof-of-concept (2-4 weeks)",
        "Production system with monitoring and alerting",
        "MLOps pipeline for continuous deployment",
        "Complete technical documentation and runbooks",
        "Team training and certification",
        "30-day post-launch support",
        "Performance dashboards and KPI tracking",
      ],
      successIndicators: [
        "System running in production with real users",
        "Measurable ROI within 90 days",
        "Your team can maintain and improve the system",
        "Clear path to scaling or expanding capabilities",
      ],
      inPractice: {
        text: "We built a workplace investigation AI that analyses thousands of documents, identifies evidence patterns, and generates structured reports — now used across complex employment cases. For a pharma client, we deployed multi-agent medical-legal review automation processing content against FDA, EMA, and MHRA regulations. A coaching platform went from concept to production in 12 weeks, including kiosk mode for frontline workers without email access.",
        links: [
          { name: "Implementation methodology", path: "/ai-implementation" },
          { name: "Explore use cases", path: "/use-cases" },
        ],
      },
      color: "primary",
    },
  ];

  // Different paths through the process
  const journeyPaths = [
    {
      name: "Full Transformation",
      stages: ["Literacy", "Strategy", "Implementation"],
      duration: "4-6 months",
      description: "Complete journey for organizations starting from scratch",
      bestFor: "First AI initiative or building foundational capabilities",
    },
    {
      name: "Strategy Sprint",
      stages: ["Strategy", "Implementation"],
      duration: "3-4 months",
      description: "Fast-track for teams with existing AI literacy",
      bestFor: "Organizations with technical teams but no strategic plan",
    },
    {
      name: "Implementation Fast-Track",
      stages: ["Implementation"],
      duration: "2-3 months",
      description: "Jump straight to building for well-prepared teams",
      bestFor: "Organizations with clear strategy ready to execute",
    },
    {
      name: "Fractional CAIO",
      stages: ["All stages, ongoing"],
      duration: "6-12+ months",
      description: "Continuous leadership across all phases as you mature",
      bestFor: "Growing companies building AI as a core capability",
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <SEOHead
        title="Our 3-Stage AI Process | Discover, Design, Deploy"
        description="Transform from AI-curious to AI-confident with our proven 3-stage methodology. Discover opportunities, design solutions, and deploy AI that delivers real business value."
        keywords="AI process, AI methodology, AI implementation, discover design deploy, AI transformation, AI roadmap"
        canonicalUrl="/process"
      />
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
              3-STAGE METHODOLOGY
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-heading leading-tight">
            <span className="text-foreground">FROM</span>{" "}
            <span className="text-muted-foreground">AI-CURIOUS</span>
            <br />
            <span className="text-foreground">TO</span>{" "}
            <span className="text-gradient-animate glow-green-intense">AI-POWERED</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Our proven 3-stage methodology takes you from confusion to
            confidence to capabilitywithout the typical pilot purgatory.
          </p>
        </div>
      </section>

      {/* Why This Process Works */}
      <section className="container mx-auto px-4 mb-24">
        <div
          ref={whyRef}
          className={`transition-all duration-300 ${
            whyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="relative max-w-5xl mx-auto">
            {/* Cyber corners */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-secondary/50" />
            <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-secondary/50" />
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-secondary/50" />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-secondary/50" />

            <Card className="glass-card border border-secondary/30 shadow-glow-card">
              <CardContent className="p-10">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0 border border-secondary/30">
                    <AlertCircle className="w-8 h-8 text-secondary" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-heading text-secondary glow-pink mb-4">
                      Why Most AI Initiatives Fail
                    </h2>
                    <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                      They skip straight to implementation. Leadership can't
                      evaluate proposals. No strategic alignment. No governance. The
                      result? Expensive pilots that never reach production.
                    </p>
                    <p className="text-lg text-foreground font-semibold">
                      We fix this by building capabilities in the right order.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Simple Journey Map Visual */}
      <section className="container mx-auto px-4 mb-24 section-glow">
        <div
          ref={mapRef}
          className={`max-w-6xl mx-auto transition-all duration-300 ${
            mapVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="grid md:grid-cols-3 gap-6">
            {stages.map((stage, index) => (
              <div key={index} className="relative h-full group">
                <Card
                  className={`card-enhanced h-full flex flex-col text-center transition-all duration-500 ${
                    stage.color === "primary"
                      ? "hover:border-primary/50 hover:shadow-[0_0_40px_hsla(155,100%,45%,0.1)]"
                      : "hover:border-secondary/50 hover:shadow-[0_0_40px_hsla(320,85%,55%,0.1)]"
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="text-5xl font-heading text-muted-foreground/20 mb-2">
                      {stage.number}
                    </div>
                    <div
                      className={`w-16 h-16 rounded-xl ${
                        stage.color === "primary"
                          ? "bg-primary/10 border border-primary/30"
                          : "bg-secondary/10 border border-secondary/30"
                      } flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110`}
                    >
                      <stage.icon
                        className={`w-8 h-8 ${
                          stage.color === "primary"
                            ? "text-primary"
                            : "text-secondary"
                        }`}
                      />
                    </div>
                    <h3 className={`text-xl font-heading text-foreground mb-2 transition-all ${
                      stage.color === "primary" ? "group-hover:text-primary group-hover:glow-green" : "group-hover:text-secondary group-hover:glow-pink"
                    }`}>
                      {stage.name}
                    </h3>
                    <p
                      className={`text-sm ${
                        stage.color === "primary"
                          ? "text-primary"
                          : "text-secondary"
                      } font-semibold uppercase tracking-wide mb-3`}
                    >
                      {stage.tagline}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      {stage.duration}
                    </p>
                  </CardContent>
                </Card>
                {/* Arrow between stages */}
                {index < stages.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-primary animate-pulse-glow" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Stage Breakdowns */}
      <section className="container mx-auto px-4 mb-24">
        <div className="max-w-7xl mx-auto space-y-16">
          {stages.map((stage, index) => {
            const StageIcon = stage.icon;
            return (
              <div key={index} id={`stage-${stage.number}`}>
                <Card
                  className={`bg-gradient-to-br from-card to-background border-2 ${
                    stage.color === "primary"
                      ? "border-primary"
                      : "border-secondary"
                  } shadow-cyber-lg overflow-hidden`}
                >
                  {/* Stage Header Bar */}
                  <div
                    className={`h-2 ${
                      stage.color === "primary"
                        ? "bg-gradient-to-r from-primary to-emerald-600"
                        : "bg-gradient-to-r from-secondary to-pink-600"
                    }`}
                  ></div>

                  <CardContent className="p-10">
                    {/* Header */}
                    <div className="flex items-start gap-6 mb-8">
                      <div
                        className={`w-20 h-20 rounded-xl ${
                          stage.color === "primary"
                            ? "bg-primary/10"
                            : "bg-secondary/10"
                        } flex items-center justify-center flex-shrink-0`}
                      >
                        <StageIcon
                          className={`w-10 h-10 ${
                            stage.color === "primary"
                              ? "text-primary"
                              : "text-secondary"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
                          Stage {stage.number}
                        </div>
                        <h2 className="text-4xl font-heading text-foreground mb-2">
                          {stage.name}
                        </h2>
                        <p
                          className={`text-lg ${
                            stage.color === "primary"
                              ? "text-primary"
                              : "text-secondary"
                          } font-semibold italic mb-4`}
                        >
                          "{stage.tagline}"
                        </p>
                      </div>
                    </div>

                    {/* The Challenge */}
                    <div className="mb-8 p-6 bg-background/50 rounded-lg border-l-4 border-secondary">
                      <div className="text-sm text-secondary font-semibold uppercase tracking-wide mb-2">
                        The Challenge
                      </div>
                      <p className="text-xl text-foreground font-semibold">
                        {stage.challenge}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                      {stage.description}
                    </p>

                    {/* In Practice */}
                    {stage.inPractice && (
                      <div className={`mb-8 p-6 ${stage.color === 'primary' ? 'bg-primary/5 border-primary/20' : 'bg-secondary/5 border-secondary/20'} rounded-lg border`}>
                        <h3 className={`text-sm font-heading ${stage.color === 'primary' ? 'text-primary' : 'text-secondary'} uppercase tracking-wider mb-3`}>In Practice</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {stage.inPractice.text}
                        </p>
                        <div className="flex flex-wrap gap-4 mt-3">
                          {stage.inPractice.links.map((link, idx) => (
                            <Link key={idx} to={link.path} className={`text-sm ${stage.color === 'primary' ? 'text-primary hover:text-primary/80' : 'text-secondary hover:text-secondary/80'} flex items-center gap-1`}>
                              {link.name} <ArrowRight className="w-3 h-3" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Key Activities Grid */}
                    <div className="mb-8">
                      <h3 className="text-xl font-heading text-foreground mb-6">
                        What Happens
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {stage.keyActivities.map((activity, idx) => {
                          const ActivityIcon = activity.icon;
                          return (
                            <div
                              key={idx}
                              className="flex items-start gap-3 p-4 bg-background/30 rounded-lg border border-border"
                            >
                              <div
                                className={`w-10 h-10 rounded-lg ${
                                  stage.color === "primary"
                                    ? "bg-primary/10"
                                    : "bg-secondary/10"
                                } flex items-center justify-center flex-shrink-0`}
                              >
                                <ActivityIcon
                                  className={`w-5 h-5 ${
                                    stage.color === "primary"
                                      ? "text-primary"
                                      : "text-secondary"
                                  }`}
                                />
                              </div>
                              <div>
                                <h4 className="text-sm font-semibold text-foreground mb-1">
                                  {activity.title}
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                  {activity.description}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Deliverables */}
                    <div className="mb-8">
                      <h3 className="text-xl font-heading text-foreground mb-4">
                        You'll Receive
                      </h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {stage.deliverables.map((deliverable, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2 text-sm"
                          >
                            <CheckCircle2
                              className={`w-4 h-4 ${
                                stage.color === "primary"
                                  ? "text-primary"
                                  : "text-secondary"
                              } flex-shrink-0 mt-0.5`}
                            />
                            <span className="text-muted-foreground">
                              {deliverable}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Info Grid */}
                    <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-border">
                      <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                          Duration
                        </div>
                        <div className="text-lg font-heading text-foreground">
                          {stage.duration}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                          Outcome
                        </div>
                        <div className="text-sm text-foreground">
                          {stage.outcome}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                          Best For
                        </div>
                        <div className="text-sm text-foreground">
                          {stage.whoItsFor}
                        </div>
                      </div>
                    </div>

                    {/* Success Indicators */}
                    <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
                      <div className="text-sm text-primary font-semibold uppercase tracking-wide mb-3">
                        Success Indicators
                      </div>
                      <div className="grid md:grid-cols-2 gap-2">
                        {stage.successIndicators.map((indicator, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2 text-sm"
                          >
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-foreground">{indicator}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </section>

      {/* Different Paths Through The Process */}
      <section className="py-20 section-glow relative">
        <div
          ref={pathsRef}
          className={`container mx-auto px-4 transition-all duration-300 ${
            pathsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading mb-4">
              <span className="text-foreground">YOUR PATH,</span>{" "}
              <span className="text-gradient-animate glow-green">YOUR PACE</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              You don't have to follow a rigid sequence. Enter at the stage
              that matches your readiness.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {journeyPaths.map((path, index) => (
              <Card
                key={index}
                className="card-enhanced group"
              >
                <CardContent className="p-6">
                  <h3 className="text-2xl font-heading text-foreground mb-3 group-hover:text-primary transition-colors">
                    {path.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    {path.stages.map((stage, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/30 group-hover:bg-primary/20 transition-colors"
                      >
                        {stage}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {path.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wide">
                        Timeline
                      </div>
                      <div className="text-sm font-semibold text-primary glow-green">
                        {path.duration}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground uppercase tracking-wide">
                        Best For
                      </div>
                      <div className="text-xs text-foreground">
                        {path.bestFor}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes This Different */}
      <section className="container mx-auto px-4 py-20">
        <div
          ref={differentRef}
          className={`max-w-5xl mx-auto transition-all duration-300 ${
            differentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading mb-4">
              <span className="text-gradient-animate glow-green">
                WHAT MAKES THIS DIFFERENT
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="card-enhanced group">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/30 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all flex-shrink-0">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading text-foreground mb-2 group-hover:text-primary transition-colors">
                      No Pilot Purgatory
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Rapid prototyping in 2-4 weeks, not 6-month pilots that
                      never scale. You see results fast or pivot quickly.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-enhanced group">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/30 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all flex-shrink-0">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading text-foreground mb-2 group-hover:text-primary transition-colors">
                      Evidence-Based Decisions
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Every recommendation backed by data, not hype. We test
                      assumptions before scaling investment.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-enhanced group">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/30 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all flex-shrink-0">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading text-foreground mb-2 group-hover:text-primary transition-colors">
                      Knowledge Transfer
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Your team owns the capability. We document everything,
                      train your staff, and ensure you're self-sufficient.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-enhanced group">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/30 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all flex-shrink-0">
                    <Rocket className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading text-foreground mb-2 group-hover:text-primary transition-colors">
                      Flexible Engagement
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Enter at any stage. Skip stages if you're ready. No rigid
                      contracts or vendor lock-in.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How We Build: The Rune SDLC */}
      <section className="container mx-auto px-4 py-12">
        <div className="relative max-w-4xl mx-auto">
          {/* Cyber corners */}
          <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-secondary/60" />
          <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-secondary/60" />
          <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-secondary/60" />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-secondary/60" />

          <Card className="glass-card border border-secondary/30 shadow-glow-card">
            <CardContent className="p-10">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="w-16 h-16 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0 border border-secondary/30">
                  <Code className="w-8 h-8 text-secondary" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-secondary font-semibold uppercase tracking-wide mb-2">
                    How We Build
                  </div>
                  <h2 className="text-3xl font-heading text-foreground mb-4">
                    The Rune SDLC
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    When we build the systems behind your strategy, we run a
                    spec-driven, agentic delivery lifecycle: every change starts
                    as a written specification and ends as verified behaviour in
                    the real environment, with independent adversarial review
                    before anything lands. Explore the full 11-stage method.
                  </p>
                  <Button
                    size="lg"
                    variant="outline"
                    className="group border-2 border-secondary/50 text-secondary hover:bg-secondary/10 hover:border-secondary font-semibold px-8 py-6 transition-all duration-300 hover:scale-105"
                    asChild
                  >
                    <Link to="/process/rune-sdlc">
                      Explore The Rune SDLC
                      <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Interactive Tools CTA */}
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
              <CardContent className="p-12">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">
                    WHERE ARE YOU ON YOUR <span className="text-primary glow-green">AI JOURNEY</span>?
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Take our interactive assessment to find out which stage is right
                    for you
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="group relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-semibold px-10 py-6 shadow-cyber transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsla(155,100%,45%,0.4)] btn-shimmer"
                    asChild
                  >
                    <a href="/ai-assessment.html">
                      <Brain className="w-5 h-5 mr-2" />
                      Take AI Assessment
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </a>
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

      {/* Pillar Pages */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-heading text-muted-foreground mb-4 tracking-wider">EXPLORE EACH STAGE IN DEPTH</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/ai-literacy" className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
              AI Literacy <ArrowRight className="w-3 h-3" />
            </Link>
            <Link to="/ai-strategy" className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
              AI Strategy <ArrowRight className="w-3 h-3" />
            </Link>
            <Link to="/ai-implementation" className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
              AI Implementation <ArrowRight className="w-3 h-3" />
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
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xl text-muted-foreground mb-6">
            Ready to start your transformation?
          </p>
          <Button
            size="lg"
            variant="outline"
            className="group border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary font-semibold px-10 py-6 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_hsla(155,100%,45%,0.2)]"
            asChild
          >
            <Link to="/pricing">
              View Pricing & Engagement Models
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Process;
