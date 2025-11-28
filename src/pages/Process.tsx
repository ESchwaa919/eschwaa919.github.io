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
} from "lucide-react";
import SEOHead from "@/components/SEOHead";

const Process = () => {
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
      <section className="container mx-auto px-4 mb-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-heading leading-tight">
            <span className="text-foreground">FROM</span>{" "}
            <span className="text-muted-foreground">AI-CURIOUS</span>
            <br />
            <span className="text-foreground">TO</span>{" "}
            <span className="text-primary glow-green">AI-POWERED</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Our proven 3-stage methodology takes you from confusion to
            confidence to capabilitywithout the typical pilot purgatory.
          </p>
        </div>
      </section>

      {/* Why This Process Works */}
      <section className="container mx-auto px-4 mb-24">
        <Card className="bg-gradient-to-br from-card to-background border-2 border-border shadow-cyber-lg max-w-5xl mx-auto">
          <CardContent className="p-10">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-8 h-8 text-secondary" />
              </div>
              <div>
                <h2 className="text-3xl font-heading text-foreground mb-4">
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
      </section>

      {/* Simple Journey Map Visual */}
      <section className="container mx-auto px-4 mb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {stages.map((stage, index) => (
              <div key={index} className="relative h-full">
                <Card
                  className={`bg-card border-2 ${
                    stage.color === "primary"
                      ? "border-primary/50"
                      : "border-secondary/50"
                  } shadow-cyber text-center h-full flex flex-col`}
                >
                  <CardContent className="p-6">
                    <div className="text-5xl font-heading text-muted-foreground/30 mb-2">
                      {stage.number}
                    </div>
                    <div
                      className={`w-16 h-16 rounded-full ${
                        stage.color === "primary"
                          ? "bg-primary/20"
                          : "bg-secondary/20"
                      } flex items-center justify-center mx-auto mb-4`}
                    >
                      <stage.icon
                        className={`w-8 h-8 ${
                          stage.color === "primary"
                            ? "text-primary"
                            : "text-secondary"
                        }`}
                      />
                    </div>
                    <h3 className="text-xl font-heading text-foreground mb-2">
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
                    <ArrowRight className="w-6 h-6 text-primary" />
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
      <section className="py-20 bg-gradient-to-br from-background to-card/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading mb-4">
              <span className="text-foreground">YOUR PATH,</span>{" "}
              <span className="text-primary glow-green">YOUR PACE</span>
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
                className="bg-card border-2 border-border hover:border-primary/50 transition-all shadow-cyber"
              >
                <CardContent className="p-6">
                  <h3 className="text-2xl font-heading text-foreground mb-3">
                    {path.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    {path.stages.map((stage, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full border border-primary/30"
                      >
                        {stage}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {path.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wide">
                        Timeline
                      </div>
                      <div className="text-sm font-semibold text-primary">
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
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading mb-4">
              <span className="text-primary glow-green">
                WHAT MAKES THIS DIFFERENT
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-card border-2 border-border">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Zap className="w-8 h-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-heading text-foreground mb-2">
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

            <Card className="bg-card border-2 border-border">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Target className="w-8 h-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-heading text-foreground mb-2">
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

            <Card className="bg-card border-2 border-border">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Users className="w-8 h-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-heading text-foreground mb-2">
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

            <Card className="bg-card border-2 border-border">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Rocket className="w-8 h-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-heading text-foreground mb-2">
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

      {/* Interactive Tools CTA */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-cyber border-2 border-primary shadow-cyber-lg max-w-4xl mx-auto">
          <CardContent className="p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">
                WHERE ARE YOU ON YOUR AI JOURNEY?
              </h2>
              <p className="text-lg text-muted-foreground">
                Take our interactive assessment to find out which stage is right
                for you
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 glow-green text-lg font-semibold px-10 py-6 shadow-cyber"
                asChild
              >
                <a href="/ai-assessment.html">
                  <Brain className="w-5 h-5 mr-2" />
                  Take AI Assessment
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary/10 text-lg font-semibold px-10 py-6"
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
            className="border-2 border-primary text-primary hover:bg-primary/10 font-semibold px-10 py-6"
            asChild
          >
            <Link to="/pricing">
              View Pricing & Engagement Models
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Process;
