import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { StructuredData, createFAQSchema } from "@/components/StructuredData";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  Shield,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Scale,
  AlertTriangle,
  FileCheck,
  Users,
  Search,
  FileText,
  Target,
  Settings,
  BarChart,
  RefreshCw,
  Download,
  Clock,
  Building2,
  Globe,
  Zap,
  TrendingUp,
  Lock,
  Eye,
} from "lucide-react";

const AIGovernance = () => {
  // Scroll reveal hooks for each section
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: whyRef, isVisible: whyVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: frameworkRef, isVisible: frameworkVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: standardsRef, isVisible: standardsVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: integrationRef, isVisible: integrationVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: faqRef, isVisible: faqVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal({ threshold: 0.1 });

  // 10-Day Governance Framework
  const governanceFramework = [
    {
      days: "1-2",
      phase: "Assessment",
      title: "Current State Assessment",
      icon: Search,
      color: "primary",
      description: "Understand where you are before deciding where to go. We audit your existing AI usage, identify risks, and map stakeholders.",
      activities: [
        "AI inventory audit - what AI tools and systems are currently in use?",
        "Risk identification - data privacy, bias, security, compliance gaps",
        "Stakeholder mapping - who needs to be involved in governance?",
        "Regulatory applicability check - which regulations apply to your business?",
      ],
      deliverables: [
        "AI asset inventory",
        "Risk register (prioritised)",
        "Stakeholder responsibility matrix",
        "Regulatory compliance checklist",
      ],
    },
    {
      days: "3-4",
      phase: "Policy Framework",
      title: "Policy Development",
      icon: FileText,
      color: "secondary",
      description: "Create clear, practical policies that your team will actually follow. No 50-page documents that nobody reads.",
      activities: [
        "Draft AI use policy - acceptable use, prohibited uses, approval workflows",
        "Data governance alignment - how AI interacts with existing data policies",
        "Vendor assessment criteria - how to evaluate AI vendors and tools",
        "Incident response procedures - what to do when things go wrong",
      ],
      deliverables: [
        "AI Acceptable Use Policy",
        "AI Vendor Assessment Framework",
        "Data handling guidelines for AI",
        "Incident response playbook",
      ],
    },
    {
      days: "5-6",
      phase: "Risk Management",
      title: "Risk Controls & Mitigation",
      icon: Shield,
      color: "primary",
      description: "Put practical controls in place to manage identified risks. Focus on proportionate measures that enable rather than block.",
      activities: [
        "Risk control design - matching controls to identified risks",
        "Human oversight requirements - where do humans stay in the loop?",
        "Bias and fairness testing protocols - how to check AI outputs",
        "Security and access controls - who can use what, and how",
      ],
      deliverables: [
        "Risk control matrix",
        "Human oversight protocols",
        "Bias testing procedures",
        "Access control policies",
      ],
    },
    {
      days: "7-8",
      phase: "Implementation Guidelines",
      title: "Operationalisation",
      icon: Settings,
      color: "secondary",
      description: "Turn policies into practice. Create the documentation, training, and workflows that make governance real.",
      activities: [
        "Workflow integration - embed governance into existing processes",
        "Training material development - practical guidance for teams",
        "Approval process design - fast-track vs. full review criteria",
        "Communication planning - how to roll out to the organisation",
      ],
      deliverables: [
        "Governance workflow diagrams",
        "Team training materials",
        "Approval decision trees",
        "Launch communication pack",
      ],
    },
    {
      days: "9-10",
      phase: "Monitoring & Review",
      title: "Continuous Improvement",
      icon: RefreshCw,
      color: "primary",
      description: "Governance is not a one-time project. Establish monitoring, metrics, and review cycles to keep governance effective.",
      activities: [
        "KPI definition - what metrics indicate governance health?",
        "Monitoring dashboard setup - visibility into AI usage and compliance",
        "Review cycle establishment - quarterly governance reviews",
        "Continuous improvement process - how to evolve governance over time",
      ],
      deliverables: [
        "Governance KPI dashboard",
        "Quarterly review template",
        "Improvement tracking log",
        "Annual governance audit plan",
      ],
    },
  ];

  // Why Governance Matters - Benefits
  const governanceBenefits = [
    {
      icon: Zap,
      title: "Speed Through Clarity",
      description: "Clear policies mean teams don't wait for approval on every decision. They know what's allowed and can move fast within boundaries.",
    },
    {
      icon: Lock,
      title: "Risk Reduction",
      description: "Proactive governance prevents costly incidents - data breaches, biased decisions, regulatory fines. Prevention is always cheaper than cure.",
    },
    {
      icon: Users,
      title: "Trust Building",
      description: "Customers, employees, and partners trust organisations that use AI responsibly. Governance is a competitive advantage, not just compliance.",
    },
    {
      icon: TrendingUp,
      title: "Scalable AI Adoption",
      description: "Without governance, every new AI project is a battle. With it, you have a repeatable framework that accelerates adoption.",
    },
  ];

  // Frameworks We Use
  const governanceStandards = [
    {
      name: "ISO 42001",
      fullName: "AI Management System Standard",
      description: "The international standard for AI governance. Provides a framework for responsible development and use of AI systems within organisations.",
      relevance: "Best for: Organisations seeking formal certification or working with enterprise clients who require demonstrable governance.",
      icon: Building2,
    },
    {
      name: "NIST AI RMF",
      fullName: "AI Risk Management Framework",
      description: "US-developed framework focused on managing risks in AI systems. Practical, flexible, and widely referenced globally.",
      relevance: "Best for: Organisations wanting a risk-based approach without formal certification requirements.",
      icon: Scale,
    },
    {
      name: "EU AI Act",
      fullName: "European Union AI Act",
      description: "The world's first comprehensive AI regulation. Categorises AI systems by risk level and imposes requirements accordingly.",
      relevance: "Best for: Any organisation selling to EU customers or using AI that affects EU citizens - including UK companies.",
      icon: Globe,
    },
  ];

  // FAQs
  const faqs = [
    {
      question: "Do I need AI governance if I'm just using ChatGPT?",
      answer: "Yes, even 'simple' AI tools like ChatGPT create governance needs. Employees may share confidential data, generate content with errors, or create legal risks. A lightweight governance framework takes days to implement and prevents significant problems. The question isn't whether to govern AI - it's how much governance is proportionate to your risk.",
    },
    {
      question: "What about the EU AI Act? Does it apply to UK companies?",
      answer: "Yes, if you sell to EU customers or your AI affects EU citizens. The EU AI Act has extraterritorial reach - similar to GDPR. UK companies selling software, services, or products to EU markets need to comply. Even post-Brexit, the EU remains a major market for UK businesses, making AI Act compliance essential for most growing companies.",
    },
    {
      question: "How much does AI governance cost?",
      answer: "For SMEs, implementing practical governance typically costs 10-20 days of consulting time, plus internal team effort. Our 10-day framework provides the essentials. Compare this to the cost of a single AI-related incident - regulatory fines, reputation damage, or a flawed decision affecting customers. Governance is an investment that pays for itself many times over.",
    },
    {
      question: "Will governance slow down our AI adoption?",
      answer: "The opposite. Without governance, every AI decision becomes a debate. Teams don't know what's allowed, so they either move slowly waiting for approval or take risks without oversight. Good governance provides clarity - clear policies mean teams can move fast within defined boundaries. Governance enables speed by removing uncertainty.",
    },
    {
      question: "We're a small company. Isn't governance only for enterprises?",
      answer: "Small companies face AI risks just like large ones - often with less capacity to absorb problems. A single AI-related data breach or biased decision can be existential for an SME. Proportionate governance doesn't mean enterprise-scale bureaucracy. Our 10-day framework is designed specifically for SMEs - practical, lightweight, and effective.",
    },
    {
      question: "What if we're not ready to implement AI governance yet?",
      answer: "If you're using AI at all - including tools like ChatGPT, Copilot, or AI features in your existing software - you already need governance. The question is whether you govern proactively or wait for a problem to force action. Starting with a governance review helps you understand your current state and prioritise actions proportionate to your risk.",
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <SEOHead
        title="AI Governance for SMEs | Responsible AI Consulting | The AI Expert"
        description="Implement AI governance in 10 days. Practical frameworks for responsible AI, risk management, and EU AI Act compliance. Governance enables speed by removing uncertainty."
        keywords="AI governance for SMEs, responsible AI consulting UK, AI policy for business, AI risk management, EU AI Act compliance, ISO 42001, NIST AI RMF"
        canonicalUrl="/ai-governance"
      />
      <StructuredData schema={createFAQSchema(faqs)} />

      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-20 relative">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-secondary/5 rounded-full blur-3xl" />
        </div>

        <div
          ref={heroRef}
          className={`max-w-4xl mx-auto text-center space-y-6 relative z-10 transition-all duration-300 ${
            heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30">
            <Sparkles className="w-4 h-4 text-primary animate-pulse-glow" />
            <span className="text-sm font-heading text-primary tracking-wider">
              RESPONSIBLE AI
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-heading leading-tight">
            <span className="text-gradient-animate glow-green-intense">AI GOVERNANCE</span>
            <br />
            <span className="text-foreground">WITHOUT PARALYSIS</span>
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Governance enables speed by removing uncertainty. When teams know what's allowed,
            they move faster - not slower. Implement practical AI governance in 10 days,
            not 10 months.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              className="group relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-semibold px-10 py-6 shadow-cyber transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsla(155,100%,45%,0.4)] btn-shimmer"
              asChild
            >
              <a href="https://calendly.com/eschwaa/30min">
                Book a Governance Review
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="group border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary text-lg font-semibold px-10 py-6 transition-all duration-300 hover:scale-105"
              asChild
            >
              <a href="/downloads/AI Governance - 10 Days - The Ai Expert.pdf" download>
                <Download className="w-5 h-5 mr-2" />
                Download Framework PDF
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Governance Matters */}
      <section className="container mx-auto px-4 mb-24" id="why-governance">
        <div
          ref={whyRef}
          className={`transition-all duration-300 ${
            whyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading mb-4">
              <span className="text-foreground">GOVERNANCE IS AN</span>{" "}
              <span className="text-gradient-animate glow-green">ENABLER</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Not a blocker. Done right, governance accelerates AI adoption by removing
              the uncertainty that slows teams down.
            </p>
          </div>

          {/* The Problem Card */}
          <div className="relative max-w-5xl mx-auto mb-12">
            {/* Cyber corners */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-secondary/50" />
            <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-secondary/50" />
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-secondary/50" />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-secondary/50" />

            <Card className="glass-card border border-secondary/30 shadow-glow-card">
              <CardContent className="p-10">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0 border border-secondary/30">
                    <AlertTriangle className="w-8 h-8 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-heading text-secondary glow-pink mb-4">
                      Without Governance, Every Decision is a Debate
                    </h3>
                    <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                      "Can we use this AI tool?" "What data can we share with it?"
                      "Who approves this?" Without clear policies, teams either wait
                      indefinitely for answers or take risks without oversight. Both outcomes hurt.
                    </p>
                    <p className="text-lg text-foreground font-semibold">
                      Good governance provides clarity. Clarity enables speed.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {governanceBenefits.map((benefit, index) => (
              <Card key={index} className="card-enhanced group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/30 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-heading text-foreground mb-2 group-hover:text-primary transition-colors">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 10-Day Governance Framework */}
      <section className="py-20 section-glow" id="framework">
        <div
          ref={frameworkRef}
          className={`container mx-auto px-4 transition-all duration-300 ${
            frameworkVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-6">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm font-heading text-primary tracking-wider">
                10-DAY FRAMEWORK
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading mb-4">
              <span className="text-foreground">THE</span>{" "}
              <span className="text-gradient-animate glow-green">10-DAY</span>{" "}
              <span className="text-foreground">GOVERNANCE FRAMEWORK</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Practical AI governance for SMEs. Five phases, ten days, lasting results.
              This is the framework we use with clients - now available as a free download.
            </p>
          </div>

          {/* Framework Timeline */}
          <div className="max-w-6xl mx-auto space-y-8">
            {governanceFramework.map((phase, index) => {
              const PhaseIcon = phase.icon;
              return (
                <div key={index} id={`phase-${index + 1}`}>
                  <Card
                    className={`bg-gradient-to-br from-card to-background border-2 ${
                      phase.color === "primary"
                        ? "border-primary"
                        : "border-secondary"
                    } shadow-cyber-lg overflow-hidden`}
                  >
                    {/* Phase Header Bar */}
                    <div
                      className={`h-2 ${
                        phase.color === "primary"
                          ? "bg-gradient-to-r from-primary to-emerald-600"
                          : "bg-gradient-to-r from-secondary to-pink-600"
                      }`}
                    />

                    <CardContent className="p-8 md:p-10">
                      {/* Header */}
                      <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-16 h-16 rounded-xl ${
                              phase.color === "primary"
                                ? "bg-primary/10"
                                : "bg-secondary/10"
                            } flex items-center justify-center flex-shrink-0`}
                          >
                            <PhaseIcon
                              className={`w-8 h-8 ${
                                phase.color === "primary"
                                  ? "text-primary"
                                  : "text-secondary"
                              }`}
                            />
                          </div>
                          <div className="md:hidden">
                            <div
                              className={`text-sm font-heading uppercase tracking-wider ${
                                phase.color === "primary"
                                  ? "text-primary"
                                  : "text-secondary"
                              }`}
                            >
                              Days {phase.days}
                            </div>
                            <h3 className="text-2xl font-heading text-foreground">
                              {phase.title}
                            </h3>
                          </div>
                        </div>
                        <div className="flex-1 hidden md:block">
                          <div
                            className={`text-sm font-heading uppercase tracking-wider mb-1 ${
                              phase.color === "primary"
                                ? "text-primary"
                                : "text-secondary"
                            }`}
                          >
                            Days {phase.days} - {phase.phase}
                          </div>
                          <h3 className="text-3xl font-heading text-foreground mb-2">
                            {phase.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {phase.description}
                          </p>
                        </div>
                      </div>

                      {/* Mobile Description */}
                      <p className="text-muted-foreground leading-relaxed mb-6 md:hidden">
                        {phase.description}
                      </p>

                      {/* Activities & Deliverables Grid */}
                      <div className="grid md:grid-cols-2 gap-8">
                        {/* Activities */}
                        <div>
                          <h4 className="text-lg font-heading text-foreground mb-4 flex items-center gap-2">
                            <Target className={`w-5 h-5 ${
                              phase.color === "primary" ? "text-primary" : "text-secondary"
                            }`} />
                            Activities
                          </h4>
                          <ul className="space-y-3">
                            {phase.activities.map((activity, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2 text-sm"
                              >
                                <CheckCircle2
                                  className={`w-4 h-4 ${
                                    phase.color === "primary"
                                      ? "text-primary"
                                      : "text-secondary"
                                  } flex-shrink-0 mt-0.5`}
                                />
                                <span className="text-muted-foreground">
                                  {activity}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Deliverables */}
                        <div>
                          <h4 className="text-lg font-heading text-foreground mb-4 flex items-center gap-2">
                            <FileCheck className={`w-5 h-5 ${
                              phase.color === "primary" ? "text-primary" : "text-secondary"
                            }`} />
                            Deliverables
                          </h4>
                          <ul className="space-y-3">
                            {phase.deliverables.map((deliverable, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2 text-sm"
                              >
                                <CheckCircle2
                                  className={`w-4 h-4 ${
                                    phase.color === "primary"
                                      ? "text-primary"
                                      : "text-secondary"
                                  } flex-shrink-0 mt-0.5`}
                                />
                                <span className="text-foreground font-medium">
                                  {deliverable}
                                </span>
                              </li>
                            ))}
                          </ul>
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
              className="group border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary text-lg font-semibold px-10 py-6 transition-all duration-300 hover:scale-105"
              asChild
            >
              <a href="/downloads/AI Governance - 10 Days - The Ai Expert.pdf" download>
                <Download className="w-5 h-5 mr-2" />
                Download Complete Framework as PDF
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Frameworks We Use */}
      <section className="container mx-auto px-4 py-20" id="standards">
        <div
          ref={standardsRef}
          className={`transition-all duration-300 ${
            standardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading mb-4">
              <span className="text-foreground">FRAMEWORKS</span>{" "}
              <span className="text-gradient-animate glow-green">WE USE</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We don't invent governance from scratch. We adapt established frameworks
              to your size, industry, and risk profile.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {governanceStandards.map((standard, index) => (
              <Card key={index} className="card-enhanced group h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/30 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all mb-4">
                    <standard.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="text-xs text-primary font-heading uppercase tracking-wider mb-1">
                    {standard.name}
                  </div>
                  <h3 className="text-xl font-heading text-foreground mb-3 group-hover:text-primary transition-colors">
                    {standard.fullName}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">
                    {standard.description}
                  </p>
                  <div className="pt-4 border-t border-border/50">
                    <p className="text-xs text-foreground">
                      <span className="text-primary font-semibold">Best for:</span>{" "}
                      {standard.relevance.replace("Best for: ", "")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Governance as Part of Strategy */}
      <section className="py-20 section-glow" id="integration">
        <div
          ref={integrationRef}
          className={`container mx-auto px-4 transition-all duration-300 ${
            integrationVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="relative max-w-5xl mx-auto">
            {/* Cyber corners */}
            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-primary/60" />
            <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-primary/60" />
            <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-primary/60" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-primary/60" />

            <Card className="glass-card border border-primary/30 shadow-glow-card">
              <CardContent className="p-10 md:p-12">
                <div className="flex flex-col md:flex-row items-start gap-8">
                  <div className="w-20 h-20 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/30">
                    <Eye className="w-10 h-10 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">
                      Governance is <span className="text-primary glow-green">Part of Strategy</span>
                    </h2>
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                      We don't treat governance as a separate workstream that happens after
                      strategy. In our 3-stage methodology, governance is built into
                      <span className="text-foreground font-semibold"> Stage 2: Strategy & Planning</span>.
                    </p>
                    <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                      When you develop an AI strategy with us, governance is included from
                      day one. Risk assessment, policy frameworks, and compliance requirements
                      are integral to your roadmap - not an afterthought.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        size="lg"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-cyber"
                        asChild
                      >
                        <Link to="/process">
                          See Our 3-Stage Process
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-2 border-primary/50 text-primary hover:bg-primary/10"
                        asChild
                      >
                        <Link to="/services">View All Services</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-20" id="faq">
        <div
          ref={faqRef}
          className={`transition-all duration-300 ${
            faqVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading mb-4">
              <span className="text-foreground">FREQUENTLY ASKED</span>{" "}
              <span className="text-gradient-animate glow-green">QUESTIONS</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="card-enhanced">
                <CardContent className="p-6">
                  <h3 className="text-lg font-heading text-primary mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
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
            <Link to="/ai-literacy" className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
              AI Literacy <ArrowRight className="w-3 h-3" />
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
      <section className="container mx-auto px-4 py-20">
        <div
          ref={ctaRef}
          className={`transition-all duration-300 ${
            ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
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
                <Shield className="w-16 h-16 text-primary mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">
                  READY TO IMPLEMENT{" "}
                  <span className="text-primary glow-green">RESPONSIBLE AI</span>?
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Book a governance review to understand your current state, identify gaps,
                  and get a clear path to practical AI governance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="group relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-semibold px-10 py-6 shadow-cyber transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsla(155,100%,45%,0.4)] btn-shimmer"
                    asChild
                  >
                    <a href="https://calendly.com/eschwaa/30min">
                      Book a Governance Review
                      <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="group border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary text-lg font-semibold px-10 py-6 transition-all duration-300 hover:scale-105"
                    asChild
                  >
                    <a href="/downloads/AI Governance - 10 Days - The Ai Expert.pdf" download>
                      <Download className="w-5 h-5 mr-2" />
                      Download Framework PDF
                    </a>
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

export default AIGovernance;
