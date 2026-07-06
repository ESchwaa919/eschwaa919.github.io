import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { StructuredData, createFAQSchema, createServiceSchema } from "@/components/StructuredData";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Sparkles,
  PoundSterling,
  Clock,
  Users,
  Target,
  TrendingUp,
  GraduationCap,
  Rocket,
  Shield,
  Building2,
  Download,
  Zap,
  BarChart,
} from "lucide-react";

// FAQ data for structured data and display
const faqs = [
  {
    question: "What is a Fractional Chief AI Officer (CAIO)?",
    answer: "A Fractional CAIO is a senior AI executive who works part-time with your organisation, providing strategic AI leadership without the cost of a full-time hire. They bring enterprise-level expertise to help you build AI capabilities, develop strategy, and oversee implementation - typically working 1-4 days per week depending on your needs."
  },
  {
    question: "How much does a Fractional CAIO cost compared to a full-time hire?",
    answer: "A full-time Chief AI Officer in the UK typically commands a salary of £200,000+ plus benefits, equity, and recruitment costs. A Fractional CAIO engagement starts from around £2,000-£5,000 per month, giving you access to senior expertise at a fraction of the cost. You only pay for the time you need."
  },
  {
    question: "What does a Fractional CAIO actually do?",
    answer: "A Fractional CAIO provides strategic AI leadership including: developing your AI strategy and roadmap, evaluating and selecting AI technologies, building AI governance frameworks, mentoring your team, presenting to your board, overseeing implementation projects, and ensuring your AI initiatives deliver measurable ROI."
  },
  {
    question: "How do I know if my business needs a Fractional CAIO?",
    answer: "You likely need a Fractional CAIO if: you're exploring AI but lack internal expertise, you have AI initiatives that aren't delivering results, your competitors are pulling ahead with AI, your leadership team lacks confidence evaluating AI proposals, or you need board-level AI guidance without a full-time executive."
  },
  {
    question: "What's the difference between a Fractional CAIO and an AI consultant?",
    answer: "An AI consultant typically delivers a specific project or recommendation and leaves. A Fractional CAIO becomes part of your leadership team - they own outcomes, build internal capabilities, and stay engaged to ensure success. They're accountable for results, not just deliverables."
  },
  {
    question: "How long does a typical Fractional CAIO engagement last?",
    answer: "Engagements typically range from 6-12 months, though many clients continue longer as their AI capabilities mature. The goal is to build internal capability so you can eventually operate independently, or scale up to a full-time hire when ready."
  },
  {
    question: "Can a Fractional CAIO work remotely?",
    answer: "Yes. While some on-site presence is valuable for workshops and key meetings, most Fractional CAIO work can be done remotely. This makes it practical for organisations across the UK and internationally."
  },
  {
    question: "What industries do you work with?",
    answer: "Erik works with SMEs and mid-market companies across professional services, healthcare, financial services, retail, manufacturing, and technology sectors. The 3-stage methodology (Literacy, Strategy, Implementation) adapts to any industry context."
  }
];

// Service schema for structured data
const fractionalCAIOService = createServiceSchema([
  {
    name: "Fractional Chief AI Officer (CAIO)",
    description: "Part-time executive AI leadership for SMEs. Strategic guidance, governance, and implementation oversight without the cost of a full-time hire.",
    url: "https://theaiexpert.ai/fractional-caio"
  }
]);

const FractionalCAIO = () => {
  // Scroll reveal hooks
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal();
  const { ref: whyRef, isVisible: whyVisible } = useScrollReveal();
  const { ref: whatRef, isVisible: whatVisible } = useScrollReveal();
  const { ref: howRef, isVisible: howVisible } = useScrollReveal();
  const { ref: resultsRef, isVisible: resultsVisible } = useScrollReveal();
  const { ref: faqRef, isVisible: faqVisible } = useScrollReveal();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal();

  // Why SMEs choose fractional
  const whyFractional = [
    {
      icon: PoundSterling,
      title: "Cost-Effective",
      description: "Access senior AI leadership from £2k/month instead of £200k+ for a full-time hire. Pay only for the time you need.",
    },
    {
      icon: Clock,
      title: "Flexible Commitment",
      description: "Scale engagement up or down as your needs evolve. No long-term contracts or permanent headcount commitment.",
    },
    {
      icon: Zap,
      title: "Immediate Expertise",
      description: "Skip the 6-month recruitment process. Start with a senior AI leader who can deliver from day one.",
    },
    {
      icon: Building2,
      title: "Enterprise Experience",
      description: "Benefit from experience at Microsoft, Comcast, and Elsevier without enterprise-level budgets.",
    },
    {
      icon: Users,
      title: "Knowledge Transfer",
      description: "Build internal AI capability. Your team learns from an expert while working alongside them.",
    },
    {
      icon: Shield,
      title: "Reduced Risk",
      description: "Test AI leadership fit before committing to a full-time hire. Exit gracefully if needs change.",
    },
  ];

  // The 3-stage methodology
  const stages = [
    {
      number: "01",
      name: "AI Literacy & Fluency",
      icon: GraduationCap,
      tagline: "Build confidence before committing capital",
      description: "Executive briefings and team workshops to build AI understanding across your organisation. Your leadership team learns to evaluate AI opportunities critically.",
      deliverables: [
        "Executive AI education sessions",
        "Team capability assessments",
        "Initial use case discovery (20-30 opportunities)",
        "AI competency roadmap",
      ],
      duration: "2-4 weeks",
      color: "primary",
    },
    {
      number: "02",
      name: "AI Strategy & Planning",
      icon: Target,
      tagline: "Strategy before scale",
      description: "Develop a board-ready AI strategy with prioritised use cases, ROI models, governance frameworks, and a 3-year implementation roadmap.",
      deliverables: [
        "Prioritised use case portfolio",
        "3-year AI roadmap with budget estimates",
        "Governance framework (ISO 42001, NIST)",
        "Board presentation materials",
      ],
      duration: "4-8 weeks",
      color: "secondary",
    },
    {
      number: "03",
      name: "Implementation & Scale",
      icon: Rocket,
      tagline: "Build fast, learn fast",
      description: "Rapid prototyping to validate approaches, production deployment, and team training. No pilot purgatory - just working solutions that deliver measurable value.",
      deliverables: [
        "Working proof-of-concept (2-4 weeks)",
        "Production deployment with monitoring",
        "Team training and knowledge transfer",
        "Ongoing performance optimisation",
      ],
      duration: "8-16 weeks per initiative",
      color: "primary",
    },
  ];

  // Engagement models
  const engagementModels = [
    {
      name: "Project-Based",
      icon: Target,
      description: "Focused engagement for a specific AI initiative - from strategy development to implementation.",
      timeline: "2-4 months",
      bestFor: "Organisations with a clear AI challenge or opportunity",
    },
    {
      name: "Retainer",
      icon: Calendar,
      description: "Ongoing fractional leadership with a set number of days per month. Strategic guidance plus hands-on support.",
      timeline: "6-12+ months",
      bestFor: "Growing companies building AI as a core capability",
    },
    {
      name: "Advisory",
      icon: Briefcase,
      description: "Light-touch monthly advisory for strategic guidance, board presentations, and critical decisions.",
      timeline: "Ongoing",
      bestFor: "Organisations needing periodic senior input",
    },
  ];

  // Results/outcomes
  const outcomes = [
    {
      icon: BarChart,
      title: "Board-Ready AI Strategy",
      description: "A clear, quantified AI roadmap your board can approve with confidence.",
    },
    {
      icon: Shield,
      title: "Governance & Compliance",
      description: "AI governance framework aligned with ISO 42001, NIST AI RMF, or EU AI Act requirements.",
    },
    {
      icon: Rocket,
      title: "Working AI Solutions",
      description: "Proof-of-concepts that become production systems, not pilots that gather dust.",
    },
    {
      icon: Users,
      title: "AI-Confident Team",
      description: "Leadership and staff who understand AI and can evaluate opportunities independently.",
    },
    {
      icon: TrendingUp,
      title: "Measurable ROI",
      description: "Clear metrics showing AI impact on efficiency, revenue, or cost reduction.",
    },
    {
      icon: GraduationCap,
      title: "Internal Capability",
      description: "Knowledge transfer that lets your team own and evolve AI capabilities.",
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <SEOHead
        title="Fractional Chief AI Officer (CAIO) | Part-Time AI Leadership for SMEs"
        description="A Fractional CAIO brings senior AI leadership to your organisation part-time. Get enterprise-level expertise from £2k/month. 20+ years experience at Microsoft, Comcast, Elsevier."
        keywords="fractional chief AI officer, fractional CAIO UK, head of AI consultant, part-time AI executive, AI leadership SME, CAIO for hire"
        canonicalUrl="/fractional-caio"
      />
      <StructuredData schema={createFAQSchema(faqs)} />
      <StructuredData schema={fractionalCAIOService} />

      {/* Hero Section */}
      <section className="pt-8 pb-20 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[300px] bg-secondary/5 rounded-full blur-3xl" />
        </div>

        <div
          ref={heroRef}
          className={`container mx-auto px-4 relative z-10 transition-all duration-300 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-6">
            <Sparkles className="w-4 h-4 text-primary animate-pulse-glow" />
            <span className="text-sm font-heading text-primary tracking-wider">FRACTIONAL CAIO</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-heading leading-tight mb-6">
            <span className="text-gradient-animate glow-green-intense">SENIOR AI LEADERSHIP</span>
            <br />
            <span className="text-foreground">WITHOUT THE FULL-TIME COST</span>
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mb-4">
            <strong className="text-foreground">A Fractional Chief AI Officer (CAIO) is a senior AI executive who works part-time with your organisation</strong> - typically 1-4 days per week. You get enterprise-level AI leadership, strategy, and implementation oversight without committing to a £200,000+ full-time hire.
          </p>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mb-8">
            Whether you're exploring AI for the first time, stuck in pilot purgatory, or ready to scale - a Fractional CAIO provides the expertise and accountability to move forward with confidence.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button
              size="lg"
              className="group relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-semibold px-10 py-6 shadow-cyber transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsla(155,100%,45%,0.4)] btn-shimmer"
              asChild
            >
              <a href="https://calendly.com/eschwaa/30min" target="_blank" rel="noopener noreferrer">
                <Calendar className="w-5 h-5 mr-2" />
                Book a Discovery Call
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="group border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary text-lg font-semibold px-10 py-6 transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link to="/process">
                See Our Process
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-6 pt-6 border-t border-border/50">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>From <strong className="text-foreground">£2k/month</strong></span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span><strong className="text-foreground">20+ years</strong> enterprise experience</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>Microsoft, Comcast, Elsevier</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why SMEs Choose Fractional */}
      <section className="py-20 section-glow relative" id="why-fractional">
        <div
          ref={whyRef}
          className={`container mx-auto px-4 transition-all duration-300 ${
            whyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading mb-4">
              <span className="text-foreground">WHY SMEs CHOOSE </span>
              <span className="text-gradient-animate glow-green">FRACTIONAL</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get senior AI leadership at a fraction of the cost of a full-time hire
            </p>
          </div>

          {/* Cost comparison callout */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative">
              {/* Cyber corners */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-secondary/50" />
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-secondary/50" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-secondary/50" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-secondary/50" />

              <Card className="glass-card border border-secondary/30">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-3 gap-8 items-center">
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground uppercase tracking-wide mb-2">Full-Time CAIO</div>
                      <div className="text-3xl font-heading text-muted-foreground line-through">£200,000+</div>
                      <div className="text-sm text-muted-foreground mt-1">Per year + benefits</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-secondary uppercase tracking-wide mb-2 glow-pink">VS</div>
                      <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mx-auto border border-secondary/40">
                        <ArrowRight className="w-6 h-6 text-secondary" />
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-primary uppercase tracking-wide mb-2 glow-green">Fractional CAIO</div>
                      <div className="text-3xl font-heading text-primary glow-green">From £2,000</div>
                      <div className="text-sm text-muted-foreground mt-1">Per month, scale as needed</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {whyFractional.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="card-enhanced group">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/30 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-heading text-foreground mb-2 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* What a Fractional CAIO Does - 3 Stage Approach */}
      <section className="py-20 relative" id="what-we-do">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/3 w-[500px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div
          ref={whatRef}
          className={`container mx-auto px-4 relative z-10 transition-all duration-300 ${
            whatVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading mb-4">
              <span className="text-foreground">WHAT A FRACTIONAL CAIO </span>
              <span className="text-gradient-animate glow-green">DOES</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Erik's proven 3-stage methodology takes you from AI-curious to AI-powered
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-8">
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              return (
                <div key={index} className="relative">
                  <Card
                    className={`bg-gradient-to-br from-card to-background border-2 ${
                      stage.color === "primary" ? "border-primary/50" : "border-secondary/50"
                    } overflow-hidden`}
                  >
                    {/* Top bar */}
                    <div
                      className={`h-1 ${
                        stage.color === "primary"
                          ? "bg-gradient-to-r from-primary to-emerald-600"
                          : "bg-gradient-to-r from-secondary to-pink-600"
                      }`}
                    />

                    <CardContent className="p-8">
                      <div className="grid md:grid-cols-3 gap-8">
                        {/* Stage info */}
                        <div className="flex items-start gap-4">
                          <div
                            className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 ${
                              stage.color === "primary"
                                ? "bg-primary/10 border border-primary/30"
                                : "bg-secondary/10 border border-secondary/30"
                            }`}
                          >
                            <Icon
                              className={`w-8 h-8 ${
                                stage.color === "primary" ? "text-primary" : "text-secondary"
                              }`}
                            />
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                              Stage {stage.number}
                            </div>
                            <h3 className="text-xl font-heading text-foreground mb-1">
                              {stage.name}
                            </h3>
                            <p
                              className={`text-sm font-semibold ${
                                stage.color === "primary" ? "text-primary" : "text-secondary"
                              }`}
                            >
                              {stage.tagline}
                            </p>
                          </div>
                        </div>

                        {/* Description */}
                        <div>
                          <p className="text-muted-foreground leading-relaxed mb-4">
                            {stage.description}
                          </p>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Duration: </span>
                            <span className="text-foreground font-medium">{stage.duration}</span>
                          </div>
                        </div>

                        {/* Deliverables */}
                        <div>
                          <div className="text-xs text-muted-foreground uppercase tracking-wide mb-3">
                            Key Deliverables
                          </div>
                          <ul className="space-y-2">
                            {stage.deliverables.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm">
                                <CheckCircle2
                                  className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                                    stage.color === "primary" ? "text-primary" : "text-secondary"
                                  }`}
                                />
                                <span className="text-muted-foreground">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Arrow between stages */}
                  {index < stages.length - 1 && (
                    <div className="flex justify-center py-4">
                      <ArrowRight className="w-6 h-6 text-primary rotate-90 animate-pulse-glow" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="group border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary font-semibold"
              asChild
            >
              <Link to="/process">
                Learn More About Our Process
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How Engagements Work */}
      <section className="py-20 section-glow relative" id="how-it-works">
        <div
          ref={howRef}
          className={`container mx-auto px-4 transition-all duration-300 ${
            howVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading mb-4">
              <span className="text-foreground">HOW ENGAGEMENTS </span>
              <span className="text-gradient-animate glow-green">WORK</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Flexible engagement models designed around your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {engagementModels.map((model, index) => {
              const Icon = model.icon;
              return (
                <Card key={index} className="card-enhanced group h-full">
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/30 mb-6 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>

                    <h3 className="text-2xl font-heading text-foreground mb-3 group-hover:text-primary transition-colors">
                      {model.name}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                      {model.description}
                    </p>

                    <div className="space-y-3 pt-4 border-t border-border/50">
                      <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wide">Timeline</div>
                        <div className="text-sm font-medium text-primary">{model.timeline}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wide">Best For</div>
                        <div className="text-sm text-foreground">{model.bestFor}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="group border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary font-semibold"
              asChild
            >
              <Link to="/contact">
                Discuss an Engagement
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Results & Outcomes */}
      <section className="py-20 relative" id="results">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[400px] bg-secondary/5 rounded-full blur-3xl" />
        </div>

        <div
          ref={resultsRef}
          className={`container mx-auto px-4 relative z-10 transition-all duration-300 ${
            resultsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading mb-4">
              <span className="text-foreground">WHAT YOU </span>
              <span className="text-gradient-animate glow-green">LEAVE WITH</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tangible outcomes from your Fractional CAIO engagement
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            {outcomes.map((outcome, index) => {
              const Icon = outcome.icon;
              return (
                <Card key={index} className="card-enhanced group">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/30 mb-4 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-heading text-foreground mb-2 group-hover:text-primary transition-colors">
                      {outcome.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {outcome.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* PDF Download */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-primary/50" />
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-primary/50" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-primary/50" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-primary/50" />

              <Card className="glass-card border border-primary/30">
                <CardContent className="p-6 text-center">
                  <Download className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-heading text-foreground mb-2">
                    Download the Fractional CAIO Guide
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Learn more about how a Fractional Chief AI Officer can transform your organisation
                  </p>
                  <Button
                    className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-cyber"
                    asChild
                  >
                    <a href="/downloads/Fractional Chief AI Officer (CAIO)  - The Ai Expert.pdf" download>
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF (Free)
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 section-glow relative" id="faq">
        <div
          ref={faqRef}
          className={`container mx-auto px-4 transition-all duration-300 ${
            faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading mb-4">
              <span className="text-foreground">FREQUENTLY ASKED </span>
              <span className="text-gradient-animate glow-green">QUESTIONS</span>
            </h2>
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
            <Link to="/ai-literacy" className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
              AI Literacy <ArrowRight className="w-3 h-3" />
            </Link>
            <Link to="/ai-strategy" className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
              AI Strategy <ArrowRight className="w-3 h-3" />
            </Link>
            <Link to="/ai-governance" className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
              AI Governance <ArrowRight className="w-3 h-3" />
            </Link>
            <Link to="/ai-implementation" className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
              AI Implementation <ArrowRight className="w-3 h-3" />
            </Link>
            <Link to="/use-cases" className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
              Use Cases <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
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
                  READY TO EXPLORE <span className="text-primary glow-green">FRACTIONAL AI LEADERSHIP</span>?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Book a free 30-minute discovery call to discuss your AI challenges and explore whether a Fractional CAIO is the right fit for your organisation.
                </p>
                <Button
                  size="lg"
                  className="group relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-semibold px-10 py-6 shadow-cyber transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsla(155,100%,45%,0.4)] btn-shimmer"
                  asChild
                >
                  <a href="https://calendly.com/eschwaa/30min" target="_blank" rel="noopener noreferrer">
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Your Free Discovery Call
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                <p className="text-sm text-muted-foreground mt-6">
                  No commitment required • 30 minutes • Practical guidance
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FractionalCAIO;
