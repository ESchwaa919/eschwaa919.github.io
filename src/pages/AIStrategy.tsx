import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { StructuredData, createFAQSchema } from "@/components/StructuredData";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  Compass,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Target,
  Lightbulb,
  FileText,
  TrendingUp,
  Users,
  Zap,
  Download,
  BarChart3,
  Shield,
  Clock,
  Sparkles,
  AlertTriangle,
  Map,
  Layers,
  DollarSign,
  Rocket,
} from "lucide-react";

// FAQ data for structured data and display
const faqs = [
  {
    question: "How long does AI strategy development take?",
    answer:
      "A comprehensive AI strategy typically takes 4-8 weeks depending on organisation size and complexity. This includes discovery workshops, use case identification, prioritisation, roadmap development, and governance framework creation. We focus on quick wins in parallel with longer-term strategic initiatives.",
  },
  {
    question: "What ROI should I expect from AI?",
    answer:
      "ROI varies by use case, but we typically see 20-40% productivity gains in knowledge work, 15-30% cost reduction in operational processes, and significant competitive advantages in customer experience. Our strategy phase includes detailed ROI modelling for each prioritised use case before any implementation investment.",
  },
  {
    question: "Do I need to understand AI to develop a strategy?",
    answer:
      "No. That's why our methodology starts with Literacy before Strategy. However, your leadership team needs enough AI understanding to make informed decisions. We build this capability as part of the strategy process, not as a prerequisite.",
  },
  {
    question: "What's the difference between AI strategy and AI implementation?",
    answer:
      "Strategy answers 'where should we use AI and why?' Implementation answers 'how do we build it?' Strategy defines priorities, success metrics, governance, and investment cases. Implementation delivers working solutions. Moving to implementation without strategy leads to scattered pilots that never scale.",
  },
  {
    question: "Should we build AI solutions ourselves or buy them?",
    answer:
      "It depends on the use case. Our strategy process evaluates build vs buy vs partner for each opportunity. Generally: buy for commodity capabilities (document processing, transcription), build for competitive differentiation (custom models, proprietary workflows), partner for specialised domains requiring expertise.",
  },
  {
    question: "How do you prioritise AI use cases?",
    answer:
      "We use a framework assessing four dimensions: Business Impact (revenue, cost, risk), Feasibility (data availability, technical complexity), Strategic Fit (alignment with company goals), and Time to Value (quick wins vs long-term bets). This produces a prioritised backlog with clear rationale.",
  },
  {
    question: "What if our competitors are already ahead with AI?",
    answer:
      "Most companies are still in experimentation mode. Moving strategically now - with clear priorities and proper governance - often outpaces competitors who started earlier but scattered their efforts. The advantage goes to those who execute well, not those who start first.",
  },
  {
    question: "What do we get at the end of the strategy phase?",
    answer:
      "Deliverables include: Prioritised use case backlog with business cases, 3-year AI roadmap, governance framework, data strategy recommendations, technology stack guidance, ROI model with success metrics, and implementation plan for first initiatives. You own all documentation.",
  },
];

// Strategy framework pillars
const strategyPillars = [
  {
    icon: Target,
    name: "Use Case Prioritisation",
    description:
      "Identify and rank AI opportunities by impact, feasibility, and strategic fit. Build a backlog that balances quick wins with transformational initiatives.",
    deliverables: [
      "Use case inventory across functions",
      "Impact vs feasibility matrix",
      "Prioritised implementation backlog",
      "Business case for top 5 opportunities",
    ],
  },
  {
    icon: Map,
    name: "Roadmap Development",
    description:
      "Sequence AI initiatives over 6-36 months, accounting for dependencies, resource constraints, and capability building. Define clear milestones and decision points.",
    deliverables: [
      "3-year AI roadmap",
      "Quarterly milestone plan",
      "Resource and budget requirements",
      "Risk and dependency mapping",
    ],
  },
  {
    icon: Shield,
    name: "Governance Framework",
    description:
      "Establish policies, processes, and accountability structures for responsible AI use. Enable innovation while managing risk and ensuring compliance.",
    deliverables: [
      "AI policy and principles",
      "Risk assessment framework",
      "Roles and responsibilities",
      "Compliance checklist (EU AI Act, etc.)",
    ],
  },
  {
    icon: BarChart3,
    name: "ROI Model",
    description:
      "Quantify expected returns for each initiative. Define success metrics, measurement approach, and investment thresholds. Make the business case for AI investment.",
    deliverables: [
      "ROI model per use case",
      "KPI dashboard design",
      "Investment requirements",
      "Break-even analysis",
    ],
  },
];

// Strategy process phases
const strategyPhases = [
  {
    week: "1-2",
    name: "Discovery",
    icon: Lightbulb,
    activities: [
      "Stakeholder interviews (leadership, operations, IT)",
      "Current state assessment (tools, processes, data)",
      "Competitive landscape analysis",
      "AI maturity assessment",
    ],
    output: "Discovery report with opportunity map",
    color: "primary",
  },
  {
    week: "3-4",
    name: "Ideation & Prioritisation",
    icon: Layers,
    activities: [
      "Use case ideation workshops",
      "Impact-feasibility scoring",
      "Data availability assessment",
      "Quick wins identification",
    ],
    output: "Prioritised use case backlog",
    color: "secondary",
  },
  {
    week: "5-6",
    name: "Roadmap & Governance",
    icon: Map,
    activities: [
      "Roadmap development",
      "Governance framework design",
      "Technology stack recommendations",
      "Build vs buy analysis",
    ],
    output: "Strategic roadmap and governance framework",
    color: "primary",
  },
  {
    week: "7-8",
    name: "Business Case & Alignment",
    icon: DollarSign,
    activities: [
      "ROI modelling for priority initiatives",
      "Resource and budget planning",
      "Leadership alignment sessions",
      "Implementation planning",
    ],
    output: "Final strategy document and implementation plan",
    color: "secondary",
  },
];

// Common strategy mistakes
const strategyMistakes = [
  {
    icon: AlertTriangle,
    mistake: "Technology-first thinking",
    consequence:
      "You buy AI tools before identifying business problems. Solutions looking for problems never deliver value.",
    fix: "Start with business outcomes, then find AI solutions that deliver them.",
  },
  {
    icon: AlertTriangle,
    mistake: "Scattered pilots",
    consequence:
      "Multiple teams experiment independently. Learnings aren't shared. Nothing scales to production.",
    fix: "Centralise AI initiatives under a coordinated strategy with clear governance.",
  },
  {
    icon: AlertTriangle,
    mistake: "Ignoring data foundations",
    consequence:
      "AI can't learn from data you don't have or can't access. Projects stall on data availability.",
    fix: "Assess data readiness early and include data strategy in your AI strategy.",
  },
  {
    icon: AlertTriangle,
    mistake: "No success metrics",
    consequence:
      "You can't prove ROI if you didn't define what success looks like. Budget disappears.",
    fix: "Define measurable KPIs before starting any AI initiative.",
  },
];

const AIStrategy = () => {
  // Scroll reveal hooks
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: whatRef, isVisible: whatVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: pillarsRef, isVisible: pillarsVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: processRef, isVisible: processVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: mistakesRef, isVisible: mistakesVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: vsImplementRef, isVisible: vsImplementVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: faqRef, isVisible: faqVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <div className="min-h-screen pt-32 pb-20">
      <SEOHead
        title="AI Strategy Consulting for SMEs | UK AI Strategy Development"
        description="Develop a clear AI strategy for your business. Prioritise use cases, build roadmaps, and create governance frameworks. Expert AI strategy consulting for UK SMEs."
        keywords="AI strategy consulting UK, AI strategy for SMEs, AI roadmap for business, AI consultant UK, AI strategy development, AI business strategy, AI transformation"
        canonicalUrl="/ai-strategy"
      />
      <StructuredData schema={createFAQSchema(faqs)} />

      {/* Hero Section */}
      <section className="pt-8 pb-20 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-secondary/5 rounded-full blur-3xl" />
        </div>

        <div
          ref={heroRef}
          className={`container mx-auto px-4 relative z-10 transition-all duration-300 ${
            heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-6">
            <Compass className="w-4 h-4 text-primary animate-pulse-glow" />
            <span className="text-sm font-heading text-primary tracking-wider">
              STAGE 2: STRATEGY
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-heading leading-tight mb-6">
            <span className="text-gradient-animate glow-green-intense">AI Strategy</span>
            <br />
            <span className="text-foreground">for SMEs</span>
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mb-6">
            <strong className="text-foreground">Most AI projects fail because they start without strategy.</strong>{" "}
            Teams chase technology instead of business outcomes. Pilots multiply but nothing scales.
            Resources scatter across disconnected experiments. Sound familiar?
          </p>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mb-8">
            AI strategy answers the critical questions: Where should we use AI? What will it cost?
            What return should we expect? How do we govern it responsibly? Get these right first,
            and implementation becomes dramatically simpler.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="group relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-semibold px-8 py-6 shadow-cyber transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsla(155,100%,45%,0.4)] btn-shimmer"
              asChild
            >
              <a href="https://calendly.com/eschwaa/30min">
                <Calendar className="w-5 h-5 mr-2" />
                Book a Strategy Session
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="group border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary text-lg font-semibold px-8 py-6 transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link to="/ai-literacy">
                <Lightbulb className="w-5 h-5 mr-2" />
                Start with AI Literacy
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What Makes a Good AI Strategy */}
      <section className="py-20 section-glow" id="what-makes-strategy">
        <div
          ref={whatRef}
          className={`container mx-auto px-4 transition-all duration-300 ${
            whatVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading mb-4">
              <span className="text-foreground">WHAT MAKES A</span>{" "}
              <span className="text-secondary glow-pink">GOOD AI STRATEGY</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A strategy document that sits in a drawer is worthless. Good AI strategy is
              actionable, measurable, and aligned with how your business actually works.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="card-enhanced h-full border-primary/20">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-heading text-foreground">Good Strategy</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span>Starts with business problems, not technology</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span>Prioritises ruthlessly - you can't do everything</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span>Includes governance from day one, not as afterthought</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span>Defines success metrics before starting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span>Balances quick wins with strategic bets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span>Accounts for data readiness and gaps</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-enhanced h-full border-secondary/20">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-secondary" />
                  <h3 className="text-xl font-heading text-foreground">Not Strategy</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                    <span>"Let's buy ChatGPT Enterprise and see what happens"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                    <span>50-page vision documents with no action plan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                    <span>"Everyone do their own AI experiments"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                    <span>Technology choices before business case</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                    <span>Governance delayed until "after we've proved value"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                    <span>Copying competitors without understanding why</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Strategy Pillars */}
      <section className="py-20" id="pillars">
        <div
          ref={pillarsRef}
          className={`container mx-auto px-4 transition-all duration-300 ${
            pillarsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading mb-4">
              <span className="text-foreground">THE FOUR PILLARS OF</span>{" "}
              <span className="text-primary glow-green">AI STRATEGY</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every AI strategy needs these four elements. Missing any one leads to failed
              initiatives, wasted budget, or governance crises.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {strategyPillars.map((pillar, index) => {
              const IconComponent = pillar.icon;
              const isHighlighted = index === 0 || index === 3;
              return (
                <div key={index} className="relative">
                  {/* Cyber corners on key cards */}
                  {isHighlighted && (
                    <>
                      <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-primary/50" />
                      <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-primary/50" />
                      <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-primary/50" />
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-primary/50" />
                    </>
                  )}
                  <Card
                    className={`card-enhanced h-full ${
                      isHighlighted
                        ? "border-primary/30 shadow-[0_0_30px_hsla(155,100%,45%,0.1)]"
                        : ""
                    }`}
                  >
                    <CardContent className="p-6">
                      <div
                        className={`w-14 h-14 rounded-xl ${
                          isHighlighted ? "bg-primary/10" : "bg-secondary/10"
                        } flex items-center justify-center mb-4 border ${
                          isHighlighted ? "border-primary/30" : "border-secondary/30"
                        }`}
                      >
                        <IconComponent
                          className={`w-7 h-7 ${
                            isHighlighted ? "text-primary" : "text-secondary"
                          }`}
                        />
                      </div>
                      <h3 className="text-xl font-heading text-foreground mb-2">
                        {pillar.name}
                      </h3>
                      <p className="text-muted-foreground mb-4">{pillar.description}</p>
                      <div className="border-t border-border/50 pt-4">
                        <p className="text-sm font-heading text-primary mb-2">DELIVERABLES:</p>
                        <ul className="space-y-1">
                          {pillar.deliverables.map((item, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <CheckCircle2 className="w-3 h-3 text-primary mt-1 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Strategy Process */}
      <section className="py-20 section-glow" id="process">
        <div
          ref={processRef}
          className={`container mx-auto px-4 transition-all duration-300 ${
            processVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading mb-4">
              <span className="text-foreground">THE</span>{" "}
              <span className="text-primary glow-green">90-DAY</span>{" "}
              <span className="text-foreground">STRATEGY SPRINT</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From kickoff to actionable strategy in 8 weeks. Shorter timelines available
              for focused engagements.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {strategyPhases.map((phase, index) => {
              const IconComponent = phase.icon;
              return (
                <div key={index} className="relative">
                  {/* Connecting line */}
                  {index < strategyPhases.length - 1 && (
                    <div className="absolute left-[27px] top-[80px] w-0.5 h-[calc(100%-60px)] bg-gradient-to-b from-primary/50 to-secondary/50" />
                  )}
                  <div className="flex gap-6 mb-8">
                    {/* Week indicator */}
                    <div className="flex-shrink-0">
                      <div
                        className={`w-14 h-14 rounded-xl ${
                          phase.color === "primary" ? "bg-primary/10 border-primary/30" : "bg-secondary/10 border-secondary/30"
                        } flex items-center justify-center border`}
                      >
                        <IconComponent
                          className={`w-7 h-7 ${
                            phase.color === "primary" ? "text-primary" : "text-secondary"
                          }`}
                        />
                      </div>
                    </div>
                    {/* Content */}
                    <Card className="card-enhanced flex-grow">
                      <CardContent className="p-6">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <span
                            className={`text-sm font-heading ${
                              phase.color === "primary" ? "text-primary" : "text-secondary"
                            }`}
                          >
                            WEEK {phase.week}
                          </span>
                          <h3 className="text-xl font-heading text-foreground">{phase.name}</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-heading text-muted-foreground mb-2">
                              ACTIVITIES
                            </p>
                            <ul className="space-y-1">
                              {phase.activities.map((activity, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <CheckCircle2 className="w-3 h-3 text-primary mt-1 flex-shrink-0" />
                                  {activity}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-sm font-heading text-muted-foreground mb-2">
                              OUTPUT
                            </p>
                            <p
                              className={`text-sm ${
                                phase.color === "primary" ? "text-primary" : "text-secondary"
                              } font-medium`}
                            >
                              {phase.output}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Common Strategy Mistakes */}
      <section className="py-20" id="mistakes">
        <div
          ref={mistakesRef}
          className={`container mx-auto px-4 transition-all duration-300 ${
            mistakesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading mb-4">
              <span className="text-foreground">AVOID THESE</span>{" "}
              <span className="text-secondary glow-pink">STRATEGY MISTAKES</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We've seen these patterns sink AI initiatives across dozens of companies.
              Learn from others' mistakes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {strategyMistakes.map((item, index) => (
              <Card key={index} className="card-enhanced">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0 border border-secondary/30">
                      <AlertTriangle className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-heading text-foreground mb-2">{item.mistake}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{item.consequence}</p>
                      <div className="flex items-start gap-2 bg-primary/5 rounded-lg p-3">
                        <Zap className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-primary">{item.fix}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Strategy vs Implementation */}
      <section className="py-20 section-glow" id="vs-implementation">
        <div
          ref={vsImplementRef}
          className={`container mx-auto px-4 transition-all duration-300 ${
            vsImplementVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading mb-4">
              <span className="text-foreground">WHEN TO MOVE FROM</span>{" "}
              <span className="text-primary glow-green">STRATEGY TO IMPLEMENTATION</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Strategy without implementation is just planning. Implementation without strategy is
              just experimenting. Here's how to know when you're ready to build.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="card-enhanced">
              <CardContent className="p-8">
                <h3 className="text-xl font-heading text-foreground mb-6">
                  You're ready for implementation when:
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {[
                      "Leadership aligned on AI priorities",
                      "Clear success metrics defined",
                      "Governance framework in place",
                      "Data availability confirmed",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    {[
                      "Budget allocated for first initiatives",
                      "Build vs buy decisions made",
                      "Project team identified",
                      "Risk mitigations documented",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-border/50">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Rocket className="w-6 h-6 text-primary" />
                      <span className="text-foreground font-heading">Ready to implement?</span>
                    </div>
                    <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                      <Link to="/ai-implementation">
                        See Our Implementation Approach
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="card-enhanced border-primary/30 shadow-[0_0_40px_hsla(155,100%,45%,0.15)]">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6 border border-primary/30">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-heading text-foreground mb-3">
                  AI Execution Playbook for SMBs
                </h3>
                <p className="text-muted-foreground mb-6">
                  The complete guide to planning and executing AI initiatives. Includes use case
                  prioritisation frameworks, ROI templates, governance checklists, and implementation
                  roadmaps.
                </p>
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                  <a href="/downloads/AI-Execution-Playbook.pdf" download>
                    <Download className="w-5 h-5 mr-2" />
                    Download Free Playbook
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 section-glow" id="faq">
        <div
          ref={faqRef}
          className={`container mx-auto px-4 transition-all duration-300 ${
            faqVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading mb-4">
              <span className="text-foreground">FREQUENTLY ASKED</span>{" "}
              <span className="text-primary glow-green">QUESTIONS</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="card-enhanced">
                <CardContent className="p-6">
                  <h3 className="text-lg font-heading text-primary mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
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
            <Link to="/ai-governance" className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
              AI Governance <ArrowRight className="w-3 h-3" />
            </Link>
            <Link to="/ai-implementation" className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
              AI Implementation <ArrowRight className="w-3 h-3" />
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
      <section className="py-20" id="cta">
        <div
          ref={ctaRef}
          className={`container mx-auto px-4 text-center transition-all duration-300 ${
            ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-heading mb-4">
            <span className="text-foreground">Ready to Build Your</span>{" "}
            <span className="text-primary glow-green">AI Strategy</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Stop experimenting randomly. Get a clear strategy that tells you where AI fits,
            what it will cost, and what return to expect. Let's build your roadmap.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="group relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-semibold px-8 py-6 shadow-cyber transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsla(155,100%,45%,0.4)] btn-shimmer"
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
              className="border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary text-lg font-semibold px-8 py-6 transition-all duration-300 hover:scale-105"
              asChild
            >
              <a href="/ai-assessment.html">
                <Target className="w-5 h-5 mr-2" />
                Take the AI Assessment First
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIStrategy;
