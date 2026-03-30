import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  Building2,
  Target,
  Lightbulb,
  Rocket,
  CheckCircle2,
  ArrowRight,
  Linkedin,
  Calendar,
  ExternalLink,
  Users,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import erikPhoto from "@/assets/Erik-Headshot.jpg";
import SEOHead from "@/components/SEOHead";
import { StructuredData, personSchema } from "@/components/StructuredData";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const About = () => {
  // Scroll reveal hooks for each section
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: journeyRef, isVisible: journeyVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: visionRef, isVisible: visionVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: philosophyRef, isVisible: philosophyVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: differentiatorRef, isVisible: differentiatorVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: thoughtLeadershipRef, isVisible: thoughtLeadershipVisible } = useScrollReveal({ threshold: 0.1 });

  const experience = [
    {
      company: "Microsoft",
      role: "Search & AI Leadership",
      years: "Enterprise-scale search innovation",
    },
    {
      company: "Comcast",
      role: "AI & Discovery",
      years: "Led pioneering AI initiatives",
    },
    {
      company: "Elsevier",
      role: "Knowledge Systems",
      years: "Scopus AI project leadership",
    },
  ];

  const principles = [
    {
      icon: Lightbulb,
      title: "AI is not a magic trick — it's a capability",
      description:
        "The companies that win will be the ones that treat AI as a core competency, not a bolt-on. This starts with education and fluency at the leadership level.",
    },
    {
      icon: Target,
      title: "Strategy before scale",
      description:
        "Most AI projects fail because they begin with tools instead of outcomes. I help organisations understand where AI fits and why it matters before building anything.",
    },
    {
      icon: Rocket,
      title: "Build fast, learn fast",
      description:
        "You don't need six-month projects to prove value. A prototype in a day often reveals more than a committee report in a month. Momentum builds confidence.",
    },
    {
      icon: Users,
      title: "Blend human judgment with intelligent automation",
      description:
        "The winning model is hybrid: AI handles scale, speed, and complexity. Humans handle judgment, nuance, and relationships. When the two align, businesses transform.",
    },
    {
      icon: Shield,
      title: "Trust is the foundation",
      description:
        "AI adoption only works when teams believe in the process. Transparency, governance, and pragmatic risk management create the confidence required to move forward.",
    },
    {
      icon: Building2,
      title: "Every business can become AI-powered",
      description:
        "You don't need a data science team or Silicon Valley budgets. You need clarity, the right guidance, and the courage to take the first step.",
    },
  ];

  const differentiators = [
    "Hands-on builder who ships code, not just strategy decks",
    "Direct access to Erik—no layers of junior consultants",
    "Flexible engagement models that adapt to your budget",
    "Proven track record delivering $100M+ in AI projects",
    "Deep expertise in agentic workflows and LLM integration",
    "UK-based with global enterprise experience",
  ];

  return (
    <div className="min-h-screen">
      <SEOHead
        title="About Erik Schwartz | AI Leadership & Consulting"
        description="Meet Erik Schwartz, an AI consultant and fractional CAIO with enterprise experience at Microsoft, Comcast, and Hotwire. Expert AI strategy and implementation for SMBs."
        keywords="Erik Schwartz, AI consultant, fractional CAIO, AI leadership, enterprise AI, Microsoft AI, AI strategy consultant"
        canonicalUrl="/about"
      />
      <StructuredData schema={personSchema} />
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl" />
        </div>

        <div
          ref={heroRef}
          className={`container mx-auto px-4 relative z-10 transition-all duration-300 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="grid lg:grid-cols-5 gap-12 items-center max-w-7xl mx-auto">
            {/* Photo */}
            <div className="lg:col-span-2 flex justify-center">
              <div className="relative">
                {/* Glow backdrop */}
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 rounded-full blur-2xl opacity-50" />

                {/* Photo container with cyber frame */}
                <div className="relative">
                  {/* Cyber corners */}
                  <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-primary/60 rounded-tl-lg" />
                  <div className="absolute -top-3 -right-3 w-10 h-10 border-t-2 border-r-2 border-primary/60 rounded-tr-lg" />
                  <div className="absolute -bottom-3 -left-3 w-10 h-10 border-b-2 border-l-2 border-primary/60 rounded-bl-lg" />
                  <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-primary/60 rounded-br-lg" />

                  <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/30 shadow-elevated">
                    <img
                      src={erikPhoto}
                      alt="Erik Schwartz"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-4 glass-card p-4 rounded-xl animate-float shadow-glow-card">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-heading text-primary glow-green">20+</div>
                      <div className="text-xs text-muted-foreground">Years Experience</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30">
                <Sparkles className="w-4 h-4 text-primary animate-pulse-glow" />
                <span className="text-sm font-heading text-primary tracking-wider">
                  FRACTIONAL CAIO
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-heading leading-tight">
                <span className="text-gradient-animate glow-green-intense">MEET ERIK</span>
                <br />
                <span className="text-foreground">SCHWARTZ</span>
              </h1>

              <p className="text-2xl text-foreground font-light">
                Your Fractional CAIO and Trusted AI Partner
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                A seasoned technology executive with over two decades of
                experience leading AI, search, and knowledge discovery at
                Microsoft, Comcast, and Elsevier. Now helping forward-looking
                SMBs navigate AI adoption with confidence.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="group relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6 py-5 shadow-cyber transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsla(155,100%,45%,0.4)] btn-shimmer"
                  asChild
                >
                  <a
                    href="https://calendly.com/eschwaa/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Book a Strategy Call
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="group border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary font-semibold px-6 py-5 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_hsla(155,100%,45%,0.2)]"
                  asChild
                >
                  <a
                    href="https://www.linkedin.com/in/eschwaa/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-5 h-5 mr-2" />
                    Connect on LinkedIn
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Journey */}
      <section className="py-24 section-glow relative">
        <div
          ref={journeyRef}
          className={`container mx-auto px-4 transition-all duration-300 ${
            journeyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-heading mb-6">
                <span className="text-foreground">THE</span>{" "}
                <span className="text-gradient-animate glow-green">JOURNEY</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                From NYC to UK: Two decades building AI at enterprise scale
              </p>
            </div>

            {/* Card with cyber corners */}
            <div className="relative">
              {/* Cyber corners */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-primary/50" />
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-primary/50" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-primary/50" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-primary/50" />

              <Card className="glass-card border border-primary/20 shadow-glow-card">
                <CardContent className="p-8 space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Erik Schwartz is a technology leader and entrepreneur with more than twenty years of hands-on experience helping teams use AI to solve real business problems. He founded TheAiExpert.ai to make modern AI accessible to small and medium businesses — especially those who know they need to get started, but aren't sure how.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Before launching his own practice, Erik worked in senior roles at{" "}
                  <strong className="text-foreground">Microsoft</strong>,{" "}
                  <strong className="text-foreground">Comcast</strong>, and{" "}
                  <strong className="text-foreground">Elsevier</strong>, where he led major projects in AI, search, and knowledge discovery. He built large-scale platforms used by millions of people every day and helped organisations adopt AI safely, confidently, and with clear business results.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Erik believes AI should feel practical, not overwhelming. His approach is grounded in collaboration, clear communication, and moving fast — whether that's helping a leadership team build confidence with AI, identifying the right opportunities to pursue, or creating a working prototype in just a day or two.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  His work on projects like{" "}
                  <a
                    href="https://www.elsevier.com/en-gb/products/scopus/scopus-ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    Scopus AI
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  {" "}shows his commitment to one thing: helping people find information faster, make better decisions, and unlock new opportunities. Today, Erik brings that same experience to business owners who want to understand AI, put it to work, and stay ahead of the curve.
                </p>

                <div className="pt-6 border-t border-border/50">
                  <h3 className="text-xl font-heading text-primary mb-4 glow-green">
                    ENTERPRISE EXPERIENCE
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {experience.map((exp, index) => (
                      <div
                        key={index}
                        className="group flex flex-col gap-2 p-5 rounded-lg glass border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_20px_hsla(155,100%,45%,0.1)]"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/30 group-hover:bg-primary/20 transition-colors">
                          <Building2 className="w-5 h-5 text-primary" />
                        </div>
                        <div className="font-heading text-lg text-foreground group-hover:text-primary transition-colors">
                          {exp.company}
                        </div>
                        <div className="text-sm text-primary font-medium">
                          {exp.role}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {exp.years}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 relative">
        {/* Subtle background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-[600px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[300px] bg-secondary/5 rounded-full blur-3xl" />
        </div>

        <div
          ref={visionRef}
          className={`container mx-auto px-4 relative z-10 transition-all duration-300 ${
            visionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Vision */}
            <div className="relative group">
              {/* Cyber corners */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-primary/40 group-hover:border-primary/70 transition-colors" />
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-primary/40 group-hover:border-primary/70 transition-colors" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-primary/40 group-hover:border-primary/70 transition-colors" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-primary/40 group-hover:border-primary/70 transition-colors" />

              <Card className="glass-card border border-primary/20 hover:border-primary/40 shadow-glow-card transition-all duration-500 hover:shadow-[0_0_60px_hsla(155,100%,45%,0.1)]">
                <CardContent className="p-10 space-y-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/30 animate-glow-pulse">
                      <Rocket className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-3xl font-heading text-primary glow-green">
                      VISION
                    </h3>
                  </div>
                  <p className="text-2xl font-light text-foreground leading-relaxed">
                    To help every ambitious business unlock the advantage of intelligence.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    AI is reshaping how organisations operate, compete, and grow. But the real opportunity is not in the tools — it's in what leaders choose to do with them. My vision is a world where small and medium businesses can access the same level of intelligence, automation, and capability that used to be reserved for global enterprises. A world where AI extends human capability, accelerates progress, and frees people to focus on the work that matters.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    I believe the next generation of successful companies will be the ones who embrace AI early, build competency within their teams, and redesign their operations around intelligent workflows. My role is to help them get there with clarity, confidence, and momentum.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Mission */}
            <div className="relative group">
              {/* Cyber corners - secondary color */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-secondary/40 group-hover:border-secondary/70 transition-colors" />
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-secondary/40 group-hover:border-secondary/70 transition-colors" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-secondary/40 group-hover:border-secondary/70 transition-colors" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-secondary/40 group-hover:border-secondary/70 transition-colors" />

              <Card className="glass-card border border-secondary/20 hover:border-secondary/40 transition-all duration-500 hover:shadow-[0_0_60px_hsla(320,85%,55%,0.1)]">
                <CardContent className="p-10 space-y-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-xl bg-secondary/10 flex items-center justify-center border border-secondary/30">
                      <Target className="w-8 h-8 text-secondary" />
                    </div>
                    <h3 className="text-3xl font-heading text-secondary glow-pink">
                      MISSION
                    </h3>
                  </div>
                  <p className="text-2xl font-light text-foreground leading-relaxed">
                    To guide forward-looking business owners from AI-curious to AI-powered through a simple, practical, three-stage journey.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    My mission is to remove the confusion and noise around AI and replace it with a grounded, evidence-based path that any organisation can follow. I work directly with leadership teams to build the literacy, strategy, and prototypes that prove value fast — and then scale into real operational impact.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    I don't hype. I don't theorise. I help you ship working solutions that save time, reduce cost, and strengthen your competitive position.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy & Approach */}
      <section className="py-24 section-glow relative">
        <div
          ref={philosophyRef}
          className={`container mx-auto px-4 transition-all duration-300 ${
            philosophyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-heading mb-6">
                <span className="text-foreground">PHILOSOPHY &</span>{" "}
                <span className="text-gradient-animate glow-green">APPROACH</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Six core principles that guide every engagement
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {principles.map((principle, index) => {
                const Icon = principle.icon;
                return (
                  <Card
                    key={index}
                    className="card-enhanced group"
                  >
                    <CardContent className="p-8 space-y-4">
                      <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/30 group-hover:bg-primary/20 group-hover:border-primary/60 group-hover:shadow-[0_0_20px_hsla(155,100%,45%,0.2)] transition-all duration-300">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="text-xl font-heading text-primary group-hover:glow-green transition-all">
                        {principle.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {principle.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* What Makes This Different */}
      <section className="py-24 relative">
        {/* Subtle glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div
          ref={differentiatorRef}
          className={`container mx-auto px-4 relative z-10 transition-all duration-300 ${
            differentiatorVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="max-w-4xl mx-auto">
            {/* Card with cyber corners */}
            <div className="relative">
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-primary/50" />
              <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-primary/50" />
              <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-primary/50" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-primary/50" />

              <Card className="glass-card border border-primary/20 shadow-glow-card">
                <CardContent className="p-12">
                  <h2 className="text-3xl font-heading text-primary glow-green mb-8 text-center">
                    WHAT MAKES THIS DIFFERENT
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {differentiators.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 group">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all flex-shrink-0 mt-0.5">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        </div>
                        <p className="text-foreground/80 group-hover:text-foreground transition-colors">{item}</p>
                      </div>
                    ))}
                  </div>

                  <div className="text-center pt-8 border-t border-border/50">
                    <p className="text-lg text-muted-foreground italic mb-6">
                      "The AI Expert: Where AI expertise meets real-world
                      application."
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        size="lg"
                        className="group relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6 py-5 shadow-cyber transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsla(155,100%,45%,0.4)] btn-shimmer"
                        asChild
                      >
                        <Link to="/contact">
                          Let's Work Together
                          <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="group border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary font-semibold px-6 py-5 transition-all duration-300 hover:scale-105"
                        asChild
                      >
                        <Link to="/process">Explore The Process</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Thought Leadership Links */}
      <section className="py-24 section-glow relative">
        <div
          ref={thoughtLeadershipRef}
          className={`container mx-auto px-4 relative z-10 transition-all duration-300 ${
            thoughtLeadershipVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading mb-4">
                <span className="text-foreground">EXPLORE ERIK'S</span>{" "}
                <span className="text-primary glow-green">THOUGHT LEADERSHIP</span>
              </h2>
              <p className="text-muted-foreground">
                Dive deeper into AI strategy, implementation, and industry
                insights
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="card-enhanced group">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/30 mb-4 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all">
                    <Sparkles className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading text-primary mb-2 group-hover:glow-green transition-all">
                    AI Insights & Resources
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Strategic frameworks and practical guides for AI adoption
                  </p>
                  <Button
                    variant="ghost"
                    className="text-primary hover:text-primary/80 p-0 h-auto font-semibold group/btn"
                    asChild
                  >
                    <Link to="/resources" className="inline-flex items-center">
                      Read Insights
                      <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="card-enhanced group">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center border border-secondary/30 mb-4 group-hover:bg-secondary/20 group-hover:border-secondary/50 transition-all">
                    <ExternalLink className="w-7 h-7 text-secondary" />
                  </div>
                  <h3 className="text-xl font-heading text-secondary mb-2 group-hover:glow-pink transition-all">
                    Media & Speaking
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Podcasts and industry presentations on AI transformation
                  </p>
                  <Button
                    variant="ghost"
                    className="text-secondary hover:text-secondary/80 p-0 h-auto font-semibold group/btn"
                    asChild
                  >
                    <Link to="/resources#media" className="inline-flex items-center">
                      Watch & Listen
                      <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
