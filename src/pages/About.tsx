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
} from "lucide-react";
import erikPhoto from "@/assets/Erik-Headshot.png";

const About = () => {
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
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-cyber opacity-30" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-5 gap-12 items-center max-w-7xl mx-auto">
            {/* Photo */}
            <div className="lg:col-span-2 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/30 shadow-cyber">
                  <img
                    src={erikPhoto}
                    alt="Erik Schwartz"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-card border-2 border-primary px-6 py-3 rounded-lg shadow-cyber backdrop-blur-sm">
                  <div className="text-2xl font-heading text-primary glow-green">
                    20+
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Years Experience
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Content */}
            <div className="lg:col-span-3 space-y-6">
              <h1 className="text-4xl md:text-6xl font-heading leading-tight">
                <span className="text-primary glow-green">MEET ERIK</span>
                <br />
                <span className="text-foreground">SCHWARTZ</span>
              </h1>

              <p className="text-2xl text-foreground font-light">
                Your Fractional CAIO and Trusted AI Partner
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                A seasoned technology executive with over two decades of
                experience leading AI, search, and knowledge discovery at
                Microsoft, Comcast, and Elsevier. Now helping forward-looking
                SMBs navigate AI adoption with confidence.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 glow-green font-semibold"
                  asChild
                >
                  <a
                    href="https://calendly.com/eschwaa/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Book a Strategy Call
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary/10 font-semibold"
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
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-heading mb-6">
                <span className="text-foreground">THE</span>{" "}
                <span className="text-primary glow-green">JOURNEY</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                From NYC to UK: Two decades building AI at enterprise scale
              </p>
            </div>

            <Card className="bg-card border-2 border-border shadow-cyber">
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

                <div className="pt-6 border-t border-border">
                  <h3 className="text-xl font-heading text-primary mb-4">
                    ENTERPRISE EXPERIENCE
                  </h3>
                  <div className="space-y-4">
                    {experience.map((exp, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 rounded-lg bg-primary/5 border border-primary/20"
                      >
                        <Building2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <div className="font-heading text-foreground">
                            {exp.company}
                          </div>
                          <div className="text-sm text-primary">
                            {exp.role}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {exp.years}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-cyber opacity-30" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Vision */}
            <Card className="bg-card border-2 border-primary/30 shadow-cyber">
              <CardContent className="p-10 space-y-6">
                <div className="flex items-center gap-4 mb-4">
                  <Rocket className="w-14 h-14 text-primary glow-green" />
                  <h3 className="text-3xl font-heading text-primary">
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

            {/* Mission */}
            <Card className="bg-card border-2 border-secondary/30 shadow-cyber">
              <CardContent className="p-10 space-y-6">
                <div className="flex items-center gap-4 mb-4">
                  <Target className="w-14 h-14 text-secondary glow-pink" />
                  <h3 className="text-3xl font-heading text-secondary">
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
      </section>

      {/* Philosophy & Approach */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-heading mb-6">
                <span className="text-foreground">PHILOSOPHY &</span>{" "}
                <span className="text-primary glow-green">APPROACH</span>
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
                    className="bg-card border-2 border-border hover:border-primary/50 transition-all shadow-cyber group"
                  >
                    <CardContent className="p-8 space-y-4">
                      <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center border-2 border-primary/30 group-hover:bg-primary/20 group-hover:border-primary transition-all">
                        <Icon className="w-7 h-7 text-primary group-hover:glow-green" />
                      </div>
                      <h3 className="text-xl font-heading text-primary">
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
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-card border-2 border-primary/30 shadow-cyber">
              <CardContent className="p-12">
                <h2 className="text-3xl font-heading text-primary mb-8 text-center">
                  WHAT MAKES THIS DIFFERENT
                </h2>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {differentiators.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <p className="text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="text-center pt-8 border-t border-border">
                  <p className="text-lg text-muted-foreground italic mb-6">
                    "The AI Expert: Where AI expertise meets real-world
                    application."
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      className="bg-primary text-primary-foreground hover:bg-primary/90 glow-green font-semibold"
                      asChild
                    >
                      <Link to="/contact">
                        Let's Work Together
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-primary text-primary hover:bg-primary/10 font-semibold"
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
      </section>

      {/* Thought Leadership Links */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-cyber opacity-30" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading text-primary mb-4">
                EXPLORE ERIK'S THOUGHT LEADERSHIP
              </h2>
              <p className="text-muted-foreground">
                Dive deeper into AI strategy, implementation, and industry
                insights
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-card border-2 border-border hover:border-primary transition-all shadow-cyber group">
                <CardContent className="p-8">
                  <div className="text-4xl mb-4">📚</div>
                  <h3 className="text-xl font-heading text-primary mb-2 group-hover:glow-green">
                    AI Insights & Resources
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Strategic frameworks and practical guides for AI adoption
                  </p>
                  <Button
                    variant="ghost"
                    className="text-primary hover:text-primary/80 p-0 h-auto font-semibold"
                    asChild
                  >
                    <Link to="/resources">
                      Read Insights →
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-card border-2 border-border hover:border-primary transition-all shadow-cyber group">
                <CardContent className="p-8">
                  <div className="text-4xl mb-4">🎙️</div>
                  <h3 className="text-xl font-heading text-primary mb-2 group-hover:glow-green">
                    Media & Speaking
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Podcasts and industry presentations on AI transformation
                  </p>
                  <Button
                    variant="ghost"
                    className="text-primary hover:text-primary/80 p-0 h-auto font-semibold"
                    asChild
                  >
                    <Link to="/resources#media">
                      Watch & Listen →
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
