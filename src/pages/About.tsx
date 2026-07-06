import { Button } from "@/components/ui/button";
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
} from "lucide-react";
import erikPhoto from "@/assets/Erik-Headshot.jpg";
import SEOHead from "@/components/SEOHead";
import { StructuredData, personSchema } from "@/components/StructuredData";
import SceneMarker from "@/components/story/SceneMarker";
import Reveal, { revealClasses } from "@/components/story/Reveal";
import { useScrollReveal } from "@/hooks/useScrollReveal";

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
      "Most AI projects fail because they begin with tools instead of outcomes. We help organisations understand where AI fits and why it matters before building anything.",
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

const About = () => {
  const { ref: principlesRef, isVisible: principlesVisible } = useScrollReveal();

  return (
    <div className="min-h-screen">
      <SEOHead
        title="About The AI Expert | Erik Schwartz, Fractional CAIO"
        description="The practice that takes businesses from AI-curious to AI-powered — and the person behind it. Erik Schwartz brings enterprise AI experience from Microsoft, Comcast, and Elsevier to SMBs."
        keywords="Erik Schwartz, AI consultant, fractional CAIO, AI leadership, enterprise AI, Microsoft AI, AI strategy consultant"
        canonicalUrl="/about"
      />
      <StructuredData schema={personSchema} />

      {/* The practice — vision */}
      <section className="pt-20 pb-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <SceneMarker label="About — The practice" className="mb-12" />

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <Reveal>
              <h1 className="title-display">
                The advantage
                <span className="block text-primary">of intelligence.</span>
              </h1>
            </Reveal>
            <div className="space-y-6">
              <Reveal delay={80}>
                <p className="lede">
                  The AI Expert exists to help every ambitious business unlock
                  the advantage of intelligence. AI is reshaping how
                  organisations operate, compete, and grow — but the real
                  opportunity is not in the tools. It's in what leaders choose
                  to do with them.
                </p>
              </Reveal>
              <Reveal delay={160}>
                <p className="text-muted-foreground leading-relaxed">
                  We believe small and medium businesses deserve the same level
                  of intelligence, automation, and capability that used to be
                  reserved for global enterprises. The next generation of
                  successful companies will embrace AI early, build competency
                  within their teams, and redesign their operations around
                  intelligent workflows. Our role is to get them there with
                  clarity, confidence, and momentum.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <p className="text-muted-foreground leading-relaxed">
                  The mission is simple: guide forward-looking business owners
                  from AI-curious to AI-powered through a practical, three-stage
                  journey — removing the confusion and noise around AI and
                  replacing it with a grounded, evidence-based path. No hype. No
                  theory. Working solutions that save time, reduce cost, and
                  strengthen your competitive position.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* The person behind the practice */}
      <section className="py-24 border-t border-border relative">
        <div className="container mx-auto px-4">
          <SceneMarker label="The person behind the practice" className="mb-12" />

          <div className="grid lg:grid-cols-5 gap-12 items-start max-w-6xl">
            <Reveal className="lg:col-span-2">
              <div className="max-w-[320px]">
                <img
                  src={erikPhoto}
                  alt="Erik Schwartz"
                  className="rounded-sm border border-border w-full h-auto"
                  loading="lazy"
                />
                <div className="flex items-baseline gap-3 mt-4">
                  <span className="stat-figure text-2xl">20+</span>
                  <span className="kicker text-muted-foreground">Years experience</span>
                </div>
              </div>
            </Reveal>

            <div className="lg:col-span-3 space-y-6">
              <Reveal>
                <span className="kicker text-primary block mb-3">Fractional CAIO</span>
                <h2 className="title-scene">
                  Meet Erik
                  <span className="text-primary"> Schwartz</span>
                </h2>
              </Reveal>
              <Reveal delay={80}>
                <p className="text-xl text-foreground font-light">
                  Your Fractional CAIO and trusted AI partner.
                </p>
              </Reveal>
              <Reveal delay={160}>
                <p className="text-muted-foreground leading-relaxed">
                  A seasoned technology executive with over two decades of
                  experience leading AI, search, and knowledge discovery at
                  Microsoft, Comcast, and Elsevier. Now helping forward-looking
                  SMBs navigate AI adoption with confidence.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button
                    size="lg"
                    variant="cine"
                    className="group text-sm px-6 py-5"
                    asChild
                  >
                    <a
                      href="https://calendly.com/eschwaa/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Book a strategy call
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="cineOutline"
                    className="text-sm px-6 py-5"
                    asChild
                  >
                    <a
                      href="https://www.linkedin.com/in/eschwaa/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="w-4 h-4 mr-2" />
                      Connect on LinkedIn
                    </a>
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* The Journey */}
      <section className="py-24 border-t border-border">
        <div className="container mx-auto px-4">
          <SceneMarker label="The journey" className="mb-12" />

          <div className="max-w-4xl space-y-8">
            <Reveal>
              <h2 className="title-scene mb-2">
                From NYC to UK:
                <span className="text-muted-foreground"> two decades building AI at enterprise scale.</span>
              </h2>
            </Reveal>

            <Reveal delay={80}>
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Erik Schwartz is a technology leader and entrepreneur with more
                  than twenty years of hands-on experience helping teams use AI
                  to solve real business problems. He founded TheAiExpert.ai to
                  make modern AI accessible to small and medium businesses —
                  especially those who know they need to get started, but aren't
                  sure how.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Before launching his own practice, Erik worked in senior roles
                  at <strong className="text-foreground font-medium">Microsoft</strong>,{" "}
                  <strong className="text-foreground font-medium">Comcast</strong>, and{" "}
                  <strong className="text-foreground font-medium">Elsevier</strong>, where
                  he led major projects in AI, search, and knowledge discovery.
                  He built large-scale platforms used by millions of people every
                  day and helped organisations adopt AI safely, confidently, and
                  with clear business results.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Erik believes AI should feel practical, not overwhelming. His
                  approach is grounded in collaboration, clear communication, and
                  moving fast — whether that's helping a leadership team build
                  confidence with AI, identifying the right opportunities to
                  pursue, or creating a working prototype in just a day or two.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  His work on projects like{" "}
                  <a
                    href="https://www.elsevier.com/en-gb/products/scopus/scopus-ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center gap-1"
                  >
                    Scopus AI
                    <ExternalLink className="w-4 h-4" />
                  </a>{" "}
                  shows his commitment to one thing: helping people find
                  information faster, make better decisions, and unlock new
                  opportunities. Today, Erik brings that same experience to
                  business owners who want to understand AI, put it to work, and
                  stay ahead of the curve.
                </p>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="pt-8 border-t border-border">
                <span className="kicker text-primary block mb-6">Enterprise experience</span>
                <div className="grid md:grid-cols-3 gap-px bg-border border border-border">
                  {experience.map((exp) => (
                    <div key={exp.company} className="bg-background p-6">
                      <div
                        className="font-heading text-lg text-foreground mb-1.5 uppercase"
                        style={{ fontVariationSettings: "'wdth' 112, 'wght' 620" }}
                      >
                        {exp.company}
                      </div>
                      <div className="text-sm text-primary">{exp.role}</div>
                      <div className="text-sm text-muted-foreground mt-1">{exp.years}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Philosophy & Approach */}
      <section className="py-24 border-t border-border">
        <div className="container mx-auto px-4">
          <SceneMarker label="Philosophy & approach" className="mb-12" />

          <div className="grid lg:grid-cols-2 gap-8 items-end mb-14">
            <Reveal>
              <h2 className="title-scene">Six principles guide every engagement.</h2>
            </Reveal>
          </div>

          <div ref={principlesRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <div
                  key={principle.title}
                  style={{ transitionDelay: `${index * 80}ms` }}
                  className={`card-surface p-7 ${revealClasses(principlesVisible)}`}
                >
                  <Icon className="w-6 h-6 text-primary mb-5" aria-hidden="true" />
                  <h3 className="title-card mb-3 normal-case">{principle.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What Makes This Different */}
      <section className="py-24 border-t border-border">
        <div className="container mx-auto px-4">
          <SceneMarker label="What makes this different" className="mb-12" />

          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="grid md:grid-cols-2 gap-x-10 gap-y-4 mb-12">
                {differentiators.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-1" aria-hidden="true" />
                    <p className="text-foreground/80">{item}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="border-l border-primary pl-8 my-12">
                <p
                  className="font-heading text-2xl lg:text-3xl text-foreground"
                  style={{ fontVariationSettings: "'wdth' 108, 'wght' 480" }}
                >
                  The AI Expert: Where AI expertise meets real-world application.
                </p>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 border-t border-border">
                <Button
                  size="lg"
                  variant="cine"
                    className="group text-sm px-6 py-5"
                  asChild
                >
                  <Link to="/contact">
                    Let's work together
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="cineOutline"
                  className="text-sm px-6 py-5"
                  asChild
                >
                  <Link to="/process">Explore the process</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Thought Leadership */}
      <section className="py-24 border-t border-border">
        <div className="container mx-auto px-4">
          <SceneMarker label="Thought leadership" className="mb-12" />

          <div className="max-w-4xl mx-auto">
            <Reveal>
              <p className="lede mb-10">
                Dive deeper into AI strategy, implementation, and industry insights.
              </p>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-5">
              <Reveal>
                <Link to="/resources" className="card-surface group block p-8 h-full">
                  <Sparkles className="w-6 h-6 text-primary mb-4" aria-hidden="true" />
                  <h3 className="title-card mb-2">AI Insights &amp; Resources</h3>
                  <p className="text-muted-foreground text-sm mb-5">
                    Strategic frameworks and practical guides for AI adoption
                  </p>
                  <span className="kicker text-primary inline-flex items-center gap-1.5">
                    Read insights
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
              <Reveal delay={80}>
                <Link to="/resources#media" className="card-surface group block p-8 h-full">
                  <ExternalLink className="w-6 h-6 text-primary mb-4" aria-hidden="true" />
                  <h3 className="title-card mb-2">Media &amp; Speaking</h3>
                  <p className="text-muted-foreground text-sm mb-5">
                    Podcasts and industry presentations on AI transformation
                  </p>
                  <span className="kicker text-primary inline-flex items-center gap-1.5">
                    Watch &amp; listen
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
