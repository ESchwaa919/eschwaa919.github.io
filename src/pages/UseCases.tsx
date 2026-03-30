import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { StructuredData, createFAQSchema } from "@/components/StructuredData";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  ArrowRight,
  CheckCircle2,
  Calendar,
  Sparkles,
  Download,
  Target,
  TrendingUp,
  Brain,
  Settings,
  Headphones,
  Megaphone,
  PoundSterling,
  Users,
  Scale,
  BarChart,
  Zap,
  Clock,
  Lightbulb,
  FileText,
  MessageSquare,
  LineChart,
  ShieldCheck,
  UserCheck,
  FileSearch,
  PieChart,
  Package,
  AlertCircle,
  Award,
} from "lucide-react";

// FAQ data for structured data and display
const faqs = [
  {
    question: "What are the best first AI projects for a business?",
    answer: "The best first AI projects typically have three characteristics: high data availability, clear success metrics, and limited organisational change requirements. Common starting points include document processing automation, customer inquiry routing, reporting automation, and email triage. These projects deliver quick wins while building internal confidence and capability for larger initiatives."
  },
  {
    question: "How do I know if AI is right for a specific use case?",
    answer: "AI is well-suited for tasks that involve pattern recognition, prediction, classification, or processing large volumes of data. Good candidates show consistent, rule-based decision making that currently requires significant human time. Ask: Is there enough historical data? Are the outcomes measurable? Would a 70-80% automation rate still deliver value? If yes, AI is likely a good fit."
  },
  {
    question: "What's the typical ROI from AI implementation?",
    answer: "ROI varies significantly by use case, but UK SMBs typically see 2-5x returns within 12-18 months for well-executed projects. Document processing automation often delivers 40-60% time savings. Customer service automation can reduce costs by 25-35% while improving response times. The key is starting with high-impact, low-complexity projects to build momentum."
  },
  {
    question: "Should we start with quick wins or strategic initiatives?",
    answer: "Start with quick wins. They build confidence, demonstrate value to stakeholders, and fund larger initiatives. A good portfolio includes 60% quick wins (3-6 month payback), 30% strategic bets (6-18 month payback), and 10% transformational projects (18+ months). Quick wins also help your team develop AI skills before tackling complex challenges."
  },
  {
    question: "How do we prioritise which AI use cases to tackle first?",
    answer: "Use an impact vs feasibility framework. Score each use case on business impact (revenue, cost savings, strategic value) and implementation feasibility (data readiness, technical complexity, change management). Prioritise use cases in the high-impact, high-feasibility quadrant first. Avoid the trap of starting with interesting but low-impact projects."
  },
  {
    question: "What departments typically benefit most from AI?",
    answer: "All departments can benefit, but customer service, operations, and finance often see the fastest returns due to high-volume, repetitive tasks. Sales and marketing benefit from personalisation and lead scoring. HR sees gains in recruitment automation. The best starting point depends on your specific pain points and data availability."
  },
  {
    question: "How long does it take to implement an AI solution?",
    answer: "Timeline depends on complexity. Quick win projects (document processing, chatbots) take 2-4 months. Strategic initiatives (predictive analytics, workflow automation) take 4-8 months. Transformational projects (end-to-end process reimagining) can take 12-18 months. The key is starting small and scaling successful pilots."
  },
  {
    question: "Do we need a lot of data to get started with AI?",
    answer: "You need enough relevant, quality data - not necessarily 'big data'. For many use cases, 1,000-10,000 examples is sufficient. The quality and relevance of data matters more than quantity. If you lack historical data, consider starting with rule-based automation or using pre-trained models that require minimal custom data."
  }
];

// Business function use cases
const businessFunctions = [
  {
    name: "Operations & Supply Chain",
    icon: Settings,
    color: "primary",
    examples: [
      "Demand forecasting and inventory optimisation",
      "Quality control and defect detection",
      "Predictive maintenance scheduling",
      "Logistics route optimisation",
    ],
    impact: "15-30% cost reduction",
  },
  {
    name: "Customer Service & Support",
    icon: Headphones,
    color: "secondary",
    examples: [
      "Intelligent ticket routing and prioritisation",
      "Automated response generation",
      "Sentiment analysis and escalation",
      "Self-service knowledge recommendations",
    ],
    impact: "25-40% faster resolution",
  },
  {
    name: "Sales & Marketing",
    icon: Megaphone,
    color: "primary",
    examples: [
      "Lead scoring and qualification",
      "Content generation and personalisation",
      "Campaign performance prediction",
      "Customer segmentation and targeting",
    ],
    impact: "20-35% conversion improvement",
  },
  {
    name: "Finance & Reporting",
    icon: PoundSterling,
    color: "secondary",
    examples: [
      "Anomaly detection and fraud prevention",
      "Automated reconciliation and matching",
      "Cash flow forecasting",
      "Expense categorisation and policy compliance",
    ],
    impact: "40-60% time savings",
  },
  {
    name: "HR & People",
    icon: Users,
    color: "primary",
    examples: [
      "CV screening and candidate matching",
      "Onboarding automation and chatbots",
      "Skills gap analysis and L&D recommendations",
      "Employee engagement prediction",
    ],
    impact: "50-70% screening time saved",
  },
  {
    name: "Legal & Compliance",
    icon: Scale,
    color: "secondary",
    examples: [
      "Contract analysis and clause extraction",
      "Compliance monitoring and alerting",
      "Risk assessment and due diligence",
      "Policy document summarisation",
    ],
    impact: "30-50% review time reduction",
  },
  {
    name: "Leadership & Decision Making",
    icon: BarChart,
    color: "primary",
    examples: [
      "Market intelligence and trend analysis",
      "Competitive monitoring and alerts",
      "Board reporting automation",
      "Scenario modelling and forecasting",
    ],
    impact: "Faster, data-driven decisions",
  },
];

// Prioritisation framework
const prioritisationFactors = [
  {
    category: "Business Impact",
    icon: TrendingUp,
    factors: [
      "Revenue potential or cost savings",
      "Strategic alignment with business goals",
      "Customer experience improvement",
      "Competitive differentiation",
    ],
  },
  {
    category: "Implementation Feasibility",
    icon: Settings,
    factors: [
      "Data availability and quality",
      "Technical complexity",
      "Integration requirements",
      "Team capability and change readiness",
    ],
  },
];

// Quick wins vs strategic bets
const projectTypes = [
  {
    type: "Quick Wins",
    icon: Zap,
    color: "primary",
    timeframe: "3-6 months to value",
    percentage: "60% of portfolio",
    characteristics: [
      "Well-defined, bounded scope",
      "Existing data and clear metrics",
      "Limited integration complexity",
      "Low organisational change required",
    ],
    examples: ["Document classification", "Email triage", "Basic chatbots", "Report generation"],
  },
  {
    type: "Strategic Bets",
    icon: Target,
    color: "secondary",
    timeframe: "6-18 months to value",
    percentage: "30% of portfolio",
    characteristics: [
      "Higher complexity, higher reward",
      "May require new data collection",
      "Cross-functional integration",
      "Moderate change management",
    ],
    examples: ["Predictive analytics", "Personalisation engines", "Process automation", "Forecasting systems"],
  },
  {
    type: "Transformational",
    icon: Lightbulb,
    color: "primary",
    timeframe: "18+ months to value",
    percentage: "10% of portfolio",
    characteristics: [
      "Business model innovation",
      "Significant competitive advantage",
      "Requires new capabilities",
      "Major organisational change",
    ],
    examples: ["New AI-powered products", "End-to-end automation", "Market-changing innovations", "AI-first operations"],
  },
];

// Common first projects
const firstProjects = [
  {
    name: "Document Processing",
    icon: FileText,
    description: "Automate extraction, classification, and routing of invoices, contracts, or applications.",
    suitedFor: "High document volumes, manual data entry",
    typicalROI: "40-60% time savings",
    timeToValue: "2-3 months",
  },
  {
    name: "Customer Inquiry Handling",
    icon: MessageSquare,
    description: "Route, prioritise, and auto-respond to common customer questions with AI assistance.",
    suitedFor: "High inquiry volumes, repetitive questions",
    typicalROI: "30-50% cost reduction",
    timeToValue: "3-4 months",
  },
  {
    name: "Reporting Automation",
    icon: LineChart,
    description: "Generate routine reports, dashboards, and summaries automatically from multiple data sources.",
    suitedFor: "Regular reporting cycles, multiple data sources",
    typicalROI: "20-30 hours saved monthly",
    timeToValue: "2-3 months",
  },
  {
    name: "Compliance Monitoring",
    icon: ShieldCheck,
    description: "Automatically flag policy violations, regulatory changes, or compliance risks.",
    suitedFor: "Regulated industries, complex policy requirements",
    typicalROI: "Risk mitigation + time savings",
    timeToValue: "3-5 months",
  },
  {
    name: "Recruitment Screening",
    icon: UserCheck,
    description: "Screen CVs, match candidates to roles, and identify top prospects automatically.",
    suitedFor: "High-volume recruitment, standardised roles",
    typicalROI: "50-70% screening time saved",
    timeToValue: "2-3 months",
  },
  {
    name: "Contract Review",
    icon: FileSearch,
    description: "Extract key terms, identify risks, and compare clauses across contracts.",
    suitedFor: "Legal teams, procurement, high contract volumes",
    typicalROI: "30-50% review time reduction",
    timeToValue: "3-4 months",
  },
];

const UseCases = () => {
  // Scroll reveal hooks
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: functionsRef, isVisible: functionsVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: prioritiseRef, isVisible: prioritiseVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: portfolioRef, isVisible: portfolioVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: firstProjectsRef, isVisible: firstProjectsVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: faqRef, isVisible: faqVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <div className="min-h-screen pb-20">
      <SEOHead
        title="AI Use Cases for Business | Where to Apply AI in Your Organisation"
        description="Discover practical AI use cases for operations, customer service, marketing, finance, HR, and legal. Learn how to prioritise AI projects for maximum ROI."
        keywords="AI use cases for business, where to use AI, AI for operations, AI for customer service, AI for marketing, AI for finance, AI for HR, business AI applications"
        canonicalUrl="/use-cases"
      />
      <StructuredData schema={createFAQSchema(faqs)} />

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
            <span className="text-sm font-heading text-primary tracking-wider">PRACTICAL AI APPLICATIONS</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-heading leading-tight mb-6">
            <span className="text-gradient-animate glow-green-intense">Where AI Fits</span>
            <br />
            <span className="text-foreground">In Your Business</span>
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mb-8">
            AI isn't one thing - it's dozens of capabilities that can transform every function in your business.
            The question isn't whether to use AI, but where to start and how to prioritise for maximum impact.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="group relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-semibold px-8 py-6 shadow-cyber transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsla(155,100%,45%,0.4)] btn-shimmer"
              asChild
            >
              <a href="/ai-assessment.html">
                <Brain className="w-5 h-5 mr-2" />
                Take AI Readiness Assessment
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="group border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary text-lg font-semibold px-8 py-6 transition-all duration-300 hover:scale-105"
              asChild
            >
              <a href="https://calendly.com/eschwaa/30min" target="_blank" rel="noopener noreferrer">
                <Calendar className="w-5 h-5 mr-2" />
                Book Use Case Workshop
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Use Cases by Business Function */}
      <section className="py-20 section-glow" id="by-function">
        <div
          ref={functionsRef}
          className={`container mx-auto px-4 transition-all duration-300 ${
            functionsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading mb-4">
              <span className="text-foreground">AI Use Cases by</span>{" "}
              <span className="text-gradient-animate glow-green">Business Function</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every department has AI opportunities. Here's where organisations are seeing the biggest impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {businessFunctions.map((func, index) => (
              <Card
                key={index}
                className={`card-enhanced group h-full transition-all duration-500 ${
                  func.color === "primary"
                    ? "hover:border-primary/50 hover:shadow-[0_0_40px_hsla(155,100%,45%,0.1)]"
                    : "hover:border-secondary/50 hover:shadow-[0_0_40px_hsla(320,85%,55%,0.1)]"
                }`}
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl ${
                        func.color === "primary"
                          ? "bg-primary/10 border border-primary/30"
                          : "bg-secondary/10 border border-secondary/30"
                      } flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110`}
                    >
                      <func.icon
                        className={`w-6 h-6 ${
                          func.color === "primary" ? "text-primary" : "text-secondary"
                        }`}
                      />
                    </div>
                    <div>
                      <h3
                        className={`text-lg font-heading text-foreground mb-1 transition-colors ${
                          func.color === "primary"
                            ? "group-hover:text-primary"
                            : "group-hover:text-secondary"
                        }`}
                      >
                        {func.name}
                      </h3>
                      <span
                        className={`text-xs font-semibold ${
                          func.color === "primary" ? "text-primary" : "text-secondary"
                        }`}
                      >
                        {func.impact}
                      </span>
                    </div>
                  </div>
                  <ul className="space-y-2 flex-grow">
                    {func.examples.map((example, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2
                          className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                            func.color === "primary" ? "text-primary" : "text-secondary"
                          }`}
                        />
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How to Prioritise Use Cases */}
      <section className="py-20" id="prioritise">
        <div
          ref={prioritiseRef}
          className={`container mx-auto px-4 transition-all duration-300 ${
            prioritiseVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading mb-4">
              <span className="text-foreground">How to</span>{" "}
              <span className="text-gradient-animate glow-green">Prioritise Use Cases</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Not all AI projects are equal. Use the Impact vs Feasibility framework to identify your best starting points.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Prioritisation Framework Visual */}
            <div className="relative mb-12">
              {/* Cyber corners */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-primary/50" />
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-primary/50" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-primary/50" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-primary/50" />

              <Card className="glass-card border border-primary/30 shadow-glow-card">
                <CardContent className="p-8">
                  {/* 2x2 Matrix */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-6 bg-primary/10 rounded-lg border border-primary/30">
                      <div className="text-sm font-semibold text-primary mb-2 uppercase tracking-wide">High Impact + High Feasibility</div>
                      <div className="text-xl font-heading text-foreground mb-2">Start Here</div>
                      <p className="text-sm text-muted-foreground">Quick wins with clear value. Build momentum and fund larger initiatives.</p>
                    </div>
                    <div className="p-6 bg-secondary/5 rounded-lg border border-secondary/20">
                      <div className="text-sm font-semibold text-secondary mb-2 uppercase tracking-wide">High Impact + Low Feasibility</div>
                      <div className="text-xl font-heading text-foreground mb-2">Plan For</div>
                      <p className="text-sm text-muted-foreground">Strategic bets requiring investment. Build capabilities to unlock these.</p>
                    </div>
                    <div className="p-6 bg-muted/20 rounded-lg border border-border/50">
                      <div className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Low Impact + High Feasibility</div>
                      <div className="text-xl font-heading text-foreground mb-2">Consider</div>
                      <p className="text-sm text-muted-foreground">Easy wins but limited value. May be useful for learning.</p>
                    </div>
                    <div className="p-6 bg-background/50 rounded-lg border border-border/30">
                      <div className="text-sm font-semibold text-muted-foreground/60 mb-2 uppercase tracking-wide">Low Impact + Low Feasibility</div>
                      <div className="text-xl font-heading text-foreground mb-2">Avoid</div>
                      <p className="text-sm text-muted-foreground">High effort, low return. Don't start here.</p>
                    </div>
                  </div>

                  {/* Scoring Factors */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {prioritisationFactors.map((factor, index) => (
                      <div key={index}>
                        <div className="flex items-center gap-2 mb-3">
                          <factor.icon className="w-5 h-5 text-primary" />
                          <h4 className="font-heading text-foreground">{factor.category}</h4>
                        </div>
                        <ul className="space-y-2">
                          {factor.factors.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Wins vs Strategic Bets */}
      <section className="py-20 section-glow" id="portfolio">
        <div
          ref={portfolioRef}
          className={`container mx-auto px-4 transition-all duration-300 ${
            portfolioVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading mb-4">
              <span className="text-gradient-animate glow-green">Quick Wins</span>{" "}
              <span className="text-foreground">vs Strategic Bets</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Build a balanced AI portfolio. Start with quick wins to build momentum, then invest in strategic initiatives.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {projectTypes.map((project, index) => (
              <Card
                key={index}
                className={`card-enhanced group h-full transition-all duration-500 ${
                  project.color === "primary"
                    ? "hover:border-primary/50 hover:shadow-[0_0_40px_hsla(155,100%,45%,0.1)]"
                    : "hover:border-secondary/50 hover:shadow-[0_0_40px_hsla(320,85%,55%,0.1)]"
                }`}
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl ${
                        project.color === "primary"
                          ? "bg-primary/10 border border-primary/30"
                          : "bg-secondary/10 border border-secondary/30"
                      } flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110`}
                    >
                      <project.icon
                        className={`w-6 h-6 ${
                          project.color === "primary" ? "text-primary" : "text-secondary"
                        }`}
                      />
                    </div>
                    <div>
                      <h3
                        className={`text-xl font-heading text-foreground transition-colors ${
                          project.color === "primary"
                            ? "group-hover:text-primary"
                            : "group-hover:text-secondary"
                        }`}
                      >
                        {project.type}
                      </h3>
                      <span
                        className={`text-xs font-semibold ${
                          project.color === "primary" ? "text-primary" : "text-secondary"
                        }`}
                      >
                        {project.percentage}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4 p-3 bg-background/50 rounded-lg border border-border/50">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{project.timeframe}</span>
                    </div>
                  </div>

                  <div className="mb-4 flex-grow">
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Characteristics</div>
                    <ul className="space-y-2">
                      {project.characteristics.map((char, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2
                            className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                              project.color === "primary" ? "text-primary" : "text-secondary"
                            }`}
                          />
                          <span>{char}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-border/50">
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Examples</div>
                    <div className="flex flex-wrap gap-2">
                      {project.examples.map((example, idx) => (
                        <span
                          key={idx}
                          className={`text-xs px-2 py-1 rounded-full border ${
                            project.color === "primary"
                              ? "bg-primary/10 border-primary/30 text-primary"
                              : "bg-secondary/10 border-secondary/30 text-secondary"
                          }`}
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Common First Projects */}
      <section className="py-20" id="first-projects">
        <div
          ref={firstProjectsRef}
          className={`container mx-auto px-4 transition-all duration-300 ${
            firstProjectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading mb-4">
              <span className="text-foreground">Common</span>{" "}
              <span className="text-gradient-animate glow-green">First Projects</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These proven starting points deliver quick wins while building your team's AI capabilities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {firstProjects.map((project, index) => (
              <Card key={index} className="card-enhanced group h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                      <project.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-heading text-foreground group-hover:text-primary transition-colors">
                        {project.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 flex-grow">
                    {project.description}
                  </p>

                  <div className="space-y-3 pt-4 border-t border-border/50">
                    <div className="flex items-start gap-2 text-sm">
                      <Award className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">
                        <span className="text-foreground font-medium">Suited for:</span> {project.suitedFor}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <span className="text-primary font-semibold">{project.typicalROI}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{project.timeToValue}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PDF Download */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="card-enhanced border-primary/30">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <PieChart className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-heading text-foreground mb-2">
                      ROI of AI Investment for UK SMBs
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Data-driven analysis of AI investment returns for UK small and medium businesses.
                      Includes benchmarks, case studies, and ROI calculation frameworks.
                    </p>
                    <Button
                      className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-cyber"
                      asChild
                    >
                      <a href="/downloads/ROI of AI Investment for UK SMBs.pdf" download>
                        <Download className="w-4 h-4 mr-2" />
                        Download Free PDF
                      </a>
                    </Button>
                  </div>
                </div>
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
            <h2 className="text-3xl md:text-4xl font-heading mb-4">
              <span className="text-foreground">Frequently Asked</span>{" "}
              <span className="text-gradient-animate glow-green">Questions</span>
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
              <CardContent className="p-12">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">
                    Ready to Find Your <span className="text-primary glow-green">Best AI Use Cases</span>?
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Take our AI Readiness Assessment to identify your highest-impact opportunities,
                    or book a workshop to prioritise use cases with expert guidance.
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
                    <a href="https://calendly.com/eschwaa/30min" target="_blank" rel="noopener noreferrer">
                      <Calendar className="w-5 h-5 mr-2" />
                      Book Use Case Workshop
                    </a>
                  </Button>
                </div>

                {/* Internal links */}
                <div className="mt-8 pt-8 border-t border-border/30 text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    Need to build AI capabilities first?
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Link
                      to="/fractional-caio"
                      className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                    >
                      Fractional CAIO
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                    <Link
                      to="/ai-literacy"
                      className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                    >
                      AI Literacy
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                    <Link
                      to="/ai-strategy"
                      className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                    >
                      AI Strategy
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                    <Link
                      to="/ai-implementation"
                      className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                    >
                      AI Implementation
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                    <Link
                      to="/ai-governance"
                      className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                    >
                      AI Governance
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UseCases;
