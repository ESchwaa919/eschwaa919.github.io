import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { StructuredData, createFAQSchema } from "@/components/StructuredData";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Brain,
  Lightbulb,
  Sparkles,
  Download,
  Users,
  Target,
  Zap,
  TrendingUp,
  MessageSquare,
  Bot,
  Cpu,
  Workflow,
  Calendar,
  BookOpen,
  Award,
} from "lucide-react";

// FAQ data for structured data and display
const faqs = [
  {
    question: "What is AI really?",
    answer:
      "AI (Artificial Intelligence) is pattern recognition at scale. It's software that learns from data to make predictions, generate content, or automate decisions. Modern AI, particularly Large Language Models (LLMs) like ChatGPT, can understand and generate human language, but they don't 'think' - they predict the most likely next word based on patterns in their training data.",
  },
  {
    question: "Will AI replace my team?",
    answer:
      "AI augments rather than replaces most roles. The real risk is that companies who adopt AI effectively will outpace those who don't. Studies show AI increases productivity by 20-40% in knowledge work. The question isn't whether AI will replace your team, but whether teams using AI will replace those who aren't.",
  },
  {
    question: "Where should I start with AI?",
    answer:
      "Start with literacy - understanding what AI can and cannot do. Then identify high-impact, low-risk use cases in your business. Our 3-stage process (Literacy, Strategy, Implementation) ensures you build confidence before committing capital. Take our free AI Readiness Assessment to identify your starting point.",
  },
  {
    question: "How much does AI literacy training cost?",
    answer:
      "Executive briefings start at half-day sessions, while comprehensive team workshops can span 2-4 weeks. Investment varies based on organization size and depth of training. However, the cost of NOT having AI literacy - bad vendor decisions, failed pilots, missed opportunities - far exceeds the training investment.",
  },
  {
    question: "Do I need technical skills to understand AI?",
    answer:
      "No. Business leaders need to understand AI capabilities, limitations, and applications - not how to code. Our literacy programmes focus on practical business applications: evaluating AI proposals, identifying use cases, understanding risks, and making informed decisions about AI investments.",
  },
  {
    question: "What's the difference between AI, machine learning, and automation?",
    answer:
      "Automation follows predefined rules (if X, then Y). Machine learning learns patterns from data to make predictions. AI is the broader field that includes machine learning, natural language processing, and more. LLMs (Large Language Models) are AI systems trained on text that can understand and generate human language.",
  },
  {
    question: "How long does it take to become AI-literate?",
    answer:
      "Basic literacy can be achieved in 2-4 hours through executive briefings. Practical fluency - being able to evaluate proposals, identify opportunities, and guide your team - typically takes 2-4 weeks of focused learning. Ongoing literacy requires staying current as the field evolves rapidly.",
  },
  {
    question: "What happens after we complete AI literacy training?",
    answer:
      "AI literacy is Stage 1 of our 3-stage methodology. Once your leadership team can evaluate AI opportunities critically, you're ready for Stage 2: Strategy. This involves prioritizing use cases, modelling ROI, and creating a governance framework. Then Stage 3: Implementation delivers working AI solutions.",
  },
];

// Core AI concepts
const aiConcepts = [
  {
    term: "Large Language Models (LLMs)",
    icon: MessageSquare,
    simple:
      "AI systems that understand and generate human language by predicting the most likely next word.",
    business:
      "Powers chatbots, content generation, document analysis, and customer service automation.",
    examples: ["ChatGPT", "Claude", "Gemini"],
  },
  {
    term: "Machine Learning (ML)",
    icon: Brain,
    simple:
      "Software that learns patterns from data to make predictions without being explicitly programmed.",
    business:
      "Fraud detection, demand forecasting, recommendation systems, predictive maintenance.",
    examples: ["Netflix recommendations", "Credit scoring", "Spam filters"],
  },
  {
    term: "AI Agents",
    icon: Bot,
    simple:
      "AI systems that can take actions, use tools, and complete multi-step tasks autonomously.",
    business:
      "Automated research, customer support workflows, data entry, appointment scheduling.",
    examples: ["AI assistants that book meetings", "Automated report generation"],
  },
  {
    term: "Automation vs AI",
    icon: Workflow,
    simple:
      "Automation follows rules (if X, then Y). AI learns and adapts. Both have their place.",
    business:
      "Use automation for predictable processes, AI for complex judgments and pattern recognition.",
    examples: ["Email rules (automation)", "Email prioritisation (AI)"],
  },
  {
    term: "Generative AI",
    icon: Sparkles,
    simple:
      "AI that creates new content - text, images, code, video - rather than just analysing data.",
    business:
      "Marketing content, product design prototypes, code assistance, document drafting.",
    examples: ["DALL-E", "Midjourney", "GitHub Copilot"],
  },
  {
    term: "RAG (Retrieval-Augmented Generation)",
    icon: Cpu,
    simple:
      "Combining AI with your own data so it can answer questions about your specific business.",
    business:
      "Internal knowledge bases, customer support trained on your documentation, policy lookup.",
    examples: ["AI that knows your company policies", "Product-specific chatbots"],
  },
];

// Competency framework levels
const competencyLevels = [
  {
    level: "Level 1: Awareness",
    description: "Understanding what AI is and isn't",
    capabilities: [
      "Define AI, ML, and related terms accurately",
      "Recognise AI applications in daily life",
      "Understand basic capabilities and limitations",
      "Separate hype from reality in AI discussions",
    ],
    for: "All employees",
    color: "primary",
  },
  {
    level: "Level 2: Literacy",
    description: "Ability to evaluate and apply AI",
    capabilities: [
      "Identify AI opportunities in your role",
      "Evaluate AI vendor proposals critically",
      "Use AI tools effectively (prompting, workflows)",
      "Understand data requirements and quality",
    ],
    for: "Knowledge workers & managers",
    color: "secondary",
  },
  {
    level: "Level 3: Fluency",
    description: "Leading AI initiatives",
    capabilities: [
      "Build business cases for AI investments",
      "Assess build vs buy vs partner decisions",
      "Design AI-augmented processes",
      "Manage AI project teams and vendors",
    ],
    for: "Department heads & project leaders",
    color: "primary",
  },
  {
    level: "Level 4: Mastery",
    description: "Strategic AI leadership",
    capabilities: [
      "Develop enterprise AI strategy",
      "Establish AI governance frameworks",
      "Navigate ethical and regulatory requirements",
      "Drive AI transformation across the organisation",
    ],
    for: "C-suite & board members",
    color: "secondary",
  },
];

// Workshop offerings
const workshops = [
  {
    name: "Executive AI Briefing",
    duration: "Half-day",
    audience: "C-suite & Board",
    description:
      "Board-level overview of AI capabilities, risks, and strategic implications. Leave with a clear understanding of where AI fits in your business.",
    includes: [
      "AI landscape overview and trends",
      "Industry-specific opportunities",
      "Risk and governance essentials",
      "Q&A with real-time demonstrations",
    ],
  },
  {
    name: "Leadership Literacy Workshop",
    duration: "1-2 days",
    audience: "Leadership team",
    description:
      "Hands-on training for your leadership team to understand, evaluate, and champion AI initiatives.",
    includes: [
      "Deep dive into AI technologies",
      "Hands-on tool exploration",
      "Use case identification exercises",
      "Vendor evaluation frameworks",
      "Building your AI opportunity matrix",
    ],
  },
  {
    name: "Team AI Fluency Programme",
    duration: "2-4 weeks",
    audience: "Departments & teams",
    description:
      "Comprehensive programme to build AI fluency across your teams with practical, role-specific training.",
    includes: [
      "Foundational AI literacy modules",
      "Role-specific AI applications",
      "Prompt engineering training",
      "Process redesign for AI augmentation",
      "Ongoing learning resources",
    ],
  },
];

// Cost of not understanding AI
const literacyCosts = [
  {
    icon: AlertTriangle,
    problem: "Bad Vendor Decisions",
    description:
      "Without AI literacy, you can't evaluate vendor proposals. You'll overpay for simple solutions or buy complex tools you don't need.",
    stat: "60%",
    statLabel: "of AI projects fail due to poor vendor selection",
  },
  {
    icon: TrendingUp,
    problem: "Missed Opportunities",
    description:
      "Your competitors are using AI to move faster, serve customers better, and reduce costs. Every month of delay widens the gap.",
    stat: "2-3x",
    statLabel: "productivity gap between AI adopters and laggards",
  },
  {
    icon: Zap,
    problem: "Wasted Pilots",
    description:
      "Leadership who can't evaluate AI proposals approve pilots that never scale. You spend money learning the wrong lessons.",
    stat: "85%",
    statLabel: "of AI pilots never reach production",
  },
];

const AILiteracy = () => {
  // Scroll reveal hooks
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: whyRef, isVisible: whyVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: conceptsRef, isVisible: conceptsVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: frameworkRef, isVisible: frameworkVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: workshopsRef, isVisible: workshopsVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: assessmentRef, isVisible: assessmentVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: faqRef, isVisible: faqVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <div className="min-h-screen pt-32 pb-20">
      <SEOHead
        title="AI Literacy for Business Leaders | Training & Workshops"
        description="Build AI literacy for your leadership team. Understand what AI is, evaluate proposals, and make informed decisions. Executive briefings and workshops for UK SMEs."
        keywords="AI literacy for business leaders, AI training for executives, what is AI for business, AI for SMEs UK, AI education, AI workshops, AI competency, AI fluency"
        canonicalUrl="/ai-literacy"
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
            <GraduationCap className="w-4 h-4 text-primary animate-pulse-glow" />
            <span className="text-sm font-heading text-primary tracking-wider">
              STAGE 1: LITERACY
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-heading leading-tight mb-6">
            <span className="text-gradient-animate glow-green-intense">AI Literacy</span>
            <br />
            <span className="text-foreground">for Business Leaders</span>
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mb-6">
            <strong className="text-foreground">AI is not magic - it's pattern recognition at scale.</strong>{" "}
            It's software that learns from data to make predictions, generate content, or automate
            decisions. Understanding this is the first step to using AI effectively in your business.
          </p>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mb-8">
            Most AI projects fail not because the technology doesn't work, but because leadership
            can't evaluate proposals, distinguish hype from reality, or identify where AI actually
            fits. We fix this first.
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
                Book a Literacy Workshop
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="group border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary text-lg font-semibold px-8 py-6 transition-all duration-300 hover:scale-105"
              asChild
            >
              <a href="/ai-assessment.html">
                <Brain className="w-5 h-5 mr-2" />
                Take the Free Assessment
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Why AI Literacy Matters */}
      <section className="py-20 section-glow" id="why-literacy">
        <div
          ref={whyRef}
          className={`container mx-auto px-4 transition-all duration-300 ${
            whyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading mb-4">
              <span className="text-foreground">THE COST OF</span>{" "}
              <span className="text-secondary glow-pink">NOT UNDERSTANDING</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              AI literacy isn't optional. Without it, you're making million-pound decisions based
              on vendor promises and media hype.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {literacyCosts.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="relative">
                  {/* Cyber corners */}
                  {index === 1 && (
                    <>
                      <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-secondary/50" />
                      <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-secondary/50" />
                      <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-secondary/50" />
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-secondary/50" />
                    </>
                  )}
                  <Card
                    className={`card-enhanced h-full ${
                      index === 1
                        ? "border-secondary/30 shadow-[0_0_30px_hsla(320,85%,55%,0.1)]"
                        : ""
                    }`}
                  >
                    <CardContent className="p-6">
                      <div
                        className={`w-14 h-14 rounded-xl ${
                          index === 1 ? "bg-secondary/10" : "bg-primary/10"
                        } flex items-center justify-center mb-4 border ${
                          index === 1 ? "border-secondary/30" : "border-primary/30"
                        }`}
                      >
                        <IconComponent
                          className={`w-7 h-7 ${
                            index === 1 ? "text-secondary" : "text-primary"
                          }`}
                        />
                      </div>
                      <h3 className="text-xl font-heading text-foreground mb-2">{item.problem}</h3>
                      <p className="text-muted-foreground mb-4">{item.description}</p>
                      <div
                        className={`pt-4 border-t ${
                          index === 1 ? "border-secondary/20" : "border-primary/20"
                        }`}
                      >
                        <div
                          className={`text-3xl font-heading ${
                            index === 1 ? "text-secondary glow-pink" : "text-primary glow-green"
                          }`}
                        >
                          {item.stat}
                        </div>
                        <div className="text-sm text-muted-foreground">{item.statLabel}</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-muted-foreground mb-4">
              Literacy is Stage 1 of our 3-stage methodology.
            </p>
            <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10" asChild>
              <Link to="/process">
                See the Full Process
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Core AI Concepts Explained */}
      <section className="py-20" id="concepts">
        <div
          ref={conceptsRef}
          className={`container mx-auto px-4 transition-all duration-300 ${
            conceptsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading mb-4">
              <span className="text-gradient-animate glow-green">CORE AI CONCEPTS</span>
              <br />
              <span className="text-foreground">Explained Simply</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              No jargon. No hype. Just clear explanations of the terms you need to understand.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {aiConcepts.map((concept, index) => {
              const IconComponent = concept.icon;
              return (
                <Card key={index} className="card-enhanced group h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/30 group-hover:bg-primary/20 transition-all flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-heading text-foreground group-hover:text-primary transition-colors">
                        {concept.term}
                      </h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs text-primary font-semibold uppercase tracking-wide mb-1">
                          In simple terms
                        </div>
                        <p className="text-sm text-muted-foreground">{concept.simple}</p>
                      </div>
                      <div>
                        <div className="text-xs text-secondary font-semibold uppercase tracking-wide mb-1">
                          Business application
                        </div>
                        <p className="text-sm text-muted-foreground">{concept.business}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {concept.examples.map((example, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-background/50 text-muted-foreground px-2 py-1 rounded border border-border/50"
                          >
                            {example}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Competency Framework */}
      <section className="py-20 section-glow" id="framework">
        <div
          ref={frameworkRef}
          className={`container mx-auto px-4 transition-all duration-300 ${
            frameworkVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading mb-4">
              <span className="text-foreground">THE AI</span>{" "}
              <span className="text-gradient-animate glow-green">COMPETENCY FRAMEWORK</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A structured approach to building AI capabilities at every level of your organisation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
            {competencyLevels.map((level, index) => (
              <Card
                key={index}
                className={`card-enhanced overflow-hidden ${
                  level.color === "secondary" ? "border-secondary/20" : ""
                }`}
              >
                {/* Level header bar */}
                <div
                  className={`h-1 ${
                    level.color === "primary"
                      ? "bg-gradient-to-r from-primary to-emerald-600"
                      : "bg-gradient-to-r from-secondary to-pink-600"
                  }`}
                />
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        level.color === "primary"
                          ? "bg-primary/10 border border-primary/30"
                          : "bg-secondary/10 border border-secondary/30"
                      }`}
                    >
                      <Award
                        className={`w-5 h-5 ${
                          level.color === "primary" ? "text-primary" : "text-secondary"
                        }`}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-heading text-foreground">{level.level}</h3>
                      <p
                        className={`text-sm ${
                          level.color === "primary" ? "text-primary" : "text-secondary"
                        }`}
                      >
                        {level.description}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {level.capabilities.map((capability, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2
                          className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                            level.color === "primary" ? "text-primary" : "text-secondary"
                          }`}
                        />
                        <span className="text-muted-foreground">{capability}</span>
                      </li>
                    ))}
                  </ul>
                  <div
                    className={`text-xs uppercase tracking-wide pt-3 border-t ${
                      level.color === "primary" ? "border-primary/20" : "border-secondary/20"
                    }`}
                  >
                    <span className="text-muted-foreground">Target audience:</span>{" "}
                    <span
                      className={level.color === "primary" ? "text-primary" : "text-secondary"}
                    >
                      {level.for}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Download CTA */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Cyber corners */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-primary/50" />
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-primary/50" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-primary/50" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-primary/50" />

              <Card className="glass-card border border-primary/30">
                <CardContent className="p-8 text-center">
                  <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-heading text-foreground mb-2">
                    The AI Competency Matrix
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Download the full framework with detailed competencies, assessment criteria,
                    and development paths for every level of your organisation.
                  </p>
                  <Button
                    className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-cyber"
                    asChild
                  >
                    <a href="/downloads/The AI Competency Matrix.pdf" download>
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

      {/* Executive Briefings & Workshops */}
      <section className="py-20" id="workshops">
        <div
          ref={workshopsRef}
          className={`container mx-auto px-4 transition-all duration-300 ${
            workshopsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading mb-4">
              <span className="text-foreground">EXECUTIVE BRIEFINGS</span>
              <br />
              <span className="text-gradient-animate glow-green">& WORKSHOPS</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Build AI literacy at every level with programmes tailored to your organisation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {workshops.map((workshop, index) => (
              <Card key={index} className="card-enhanced group h-full flex flex-col">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/30">
                      {workshop.duration}
                    </span>
                    <span className="text-xs text-muted-foreground">{workshop.audience}</span>
                  </div>
                  <h3 className="text-xl font-heading text-foreground mb-3 group-hover:text-primary transition-colors">
                    {workshop.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">
                    {workshop.description}
                  </p>
                  <div className="space-y-2 pt-4 border-t border-border/50">
                    <div className="text-xs text-primary font-semibold uppercase tracking-wide mb-2">
                      What's included
                    </div>
                    {workshop.includes.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-3 h-3 text-primary flex-shrink-0 mt-1" />
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-cyber"
              asChild
            >
              <a href="https://calendly.com/eschwaa/30min">
                <Users className="w-5 h-5 mr-2" />
                Discuss Your Team's Needs
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Take the Assessment CTA */}
      <section className="py-20 section-glow" id="assessment">
        <div
          ref={assessmentRef}
          className={`container mx-auto px-4 transition-all duration-300 ${
            assessmentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="relative max-w-4xl mx-auto">
            {/* Cyber corners */}
            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-secondary/60" />
            <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-secondary/60" />
            <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-secondary/60" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-secondary/60" />

            <Card className="glass-card border border-secondary/30 shadow-[0_0_40px_hsla(320,85%,55%,0.1)]">
              <CardContent className="p-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-24 h-24 rounded-2xl bg-secondary/10 flex items-center justify-center border border-secondary/30 flex-shrink-0">
                    <Target className="w-12 h-12 text-secondary" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl md:text-3xl font-heading text-foreground mb-3">
                      Take the AI Literacy Assessment
                    </h2>
                    <p className="text-lg text-muted-foreground mb-6">
                      Our free 10-minute assessment evaluates your organisation's AI readiness
                      across strategy, technology, data, and culture. Get a personalised report
                      with specific recommendations.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                      <Button
                        size="lg"
                        className="bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-[0_0_20px_hsla(320,85%,55%,0.3)]"
                        asChild
                      >
                        <a href="/ai-assessment.html">
                          <Brain className="w-5 h-5 mr-2" />
                          Start Free Assessment
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </a>
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-secondary/50 text-secondary hover:bg-secondary/10"
                        asChild
                      >
                        <a href="/roi-calculator.html">
                          <TrendingUp className="w-5 h-5 mr-2" />
                          Calculate AI ROI
                        </a>
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
      <section className="py-20" id="faq">
        <div
          ref={faqRef}
          className={`container mx-auto px-4 transition-all duration-300 ${
            faqVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading mb-4">
              <span className="text-gradient-animate glow-green">FREQUENTLY ASKED</span>
              <br />
              <span className="text-foreground">QUESTIONS</span>
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
            <Link to="/ai-strategy" className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
              AI Strategy <ArrowRight className="w-3 h-3" />
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
      <section className="py-20">
        <div
          ref={ctaRef}
          className={`container mx-auto px-4 transition-all duration-300 ${
            ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading mb-4">
              Ready to Build <span className="text-primary glow-green">AI Literacy</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Start with our free assessment, or book a call to discuss a literacy programme
              tailored to your organisation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="group relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-semibold px-10 py-6 shadow-cyber transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsla(155,100%,45%,0.4)] btn-shimmer"
                asChild
              >
                <a href="https://calendly.com/eschwaa/30min">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book a Free Consultation
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
                  <Lightbulb className="w-5 h-5 mr-2" />
                  Next Step: AI Strategy
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AILiteracy;
