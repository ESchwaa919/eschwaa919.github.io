import { Link } from "react-router-dom";
import { ArrowRight, Building2, Rocket, Users, Wrench, CheckCircle2 } from "lucide-react";
import SceneMarker from "./SceneMarker";
import Reveal from "./Reveal";
import { useStaggeredReveal } from "@/hooks/useScrollReveal";
import erikPortrait from "@/assets/Erik-Headshot.jpg";

const sdlcChips = [
  "11 lifecycle stages",
  "6 agent roles",
  "Independent adversarial review",
  "MIT-licensed open source",
];

const reasons = [
  {
    icon: Building2,
    title: "Enterprise-Proven Experience",
    description:
      "Twenty years leading search, discovery, and AI at Microsoft, Comcast, and Elsevier — then bringing that enterprise-grade thinking to businesses that don't have Fortune 500 budgets but deserve Fortune 500 results.",
  },
  {
    icon: Rocket,
    title: "Proven Results",
    description:
      "25% reduction in hotel no-shows through AI prediction. 70% faster workplace investigation reviews. Pharma compliance reviews in seconds instead of days. Real outcomes, not slide decks.",
  },
  {
    icon: Users,
    title: "Trusted Advisor",
    description:
      "From board-level AI literacy for construction firms and universities to hands-on coaching for startup founders. Clients stay because the advice works — and the relationship lasts beyond the project.",
  },
  {
    icon: Wrench,
    title: "Hands-On Builder",
    description:
      "Not just strategy — Erik writes production code. A coaching platform shipped in 12 weeks with kiosk mode for frontline workers. A document analysis AI now handles thousands of cases. We build what we recommend.",
  },
];

const companies = [
  { name: "Microsoft", logo: "/images/msift.png", role: "Search & AI Leadership" },
  { name: "Comcast", logo: "/images/comcast.png", role: "AI & Discovery" },
  { name: "Elsevier", logo: "/images/elsevier.png", role: "Knowledge Discovery" },
];

const stats = [
  { value: "20+", label: "Years Experience" },
  { value: "$100M+", label: "Projects Delivered" },
  { value: "Global", label: "Enterprise Scale" },
];

const trainingClients = [
  "Spotify",
  "The Economist",
  "London Business School",
  "Henley Business School",
  "Kier Group",
  "Accredible",
  "IF.se",
];

const differentiators = [
  "No hype. No jargon. Just practical, grounded AI consulting.",
  "Evidence-based strategy backed by 20+ years of real-world implementation.",
  "Rapid prototyping: See working solutions in days, not months.",
  "SMB-focused: AI adoption tailored for your business size and budget.",
];

/** Act IV — the guide: the practice that runs on AI, then the human behind it. */
const GuideAct = () => {
  const { containerRef, visibleItems } = useStaggeredReveal(4);

  return (
    <section className="py-24 lg:py-32 border-t border-border">
      <div className="container mx-auto px-4">
        <SceneMarker label="Act IV — The guide" className="mb-12" />

        {/* Beat A — the practice */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-24 lg:mb-32">
          <Reveal>
            <h2 className="title-scene">
              We don't just advise on AI.
              <span className="block text-primary">We run on it.</span>
            </h2>
          </Reveal>
          <div className="space-y-6">
            <Reveal delay={80}>
              <p className="lede">
                Every engagement is delivered through The Ai Expert SDLC — a
                spec-driven, agentic lifecycle where an orchestrated AI team
                builds under human direction, every change begins as a written
                specification, and an independent AI reviewer adversarially
                checks the work before it ships.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <div className="flex flex-wrap gap-2.5">
                {sdlcChips.map((chip) => (
                  <span
                    key={chip}
                    className="kicker text-muted-foreground px-4 py-2 border border-border rounded-sm"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={240}>
              <Link
                to="/process/sdlc"
                className="inline-flex items-center gap-2 kicker text-primary hover:text-primary/80 transition-colors"
              >
                See how we build <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Beat B — the human reveal */}
        <div className="grid md:grid-cols-[200px_1fr] gap-10 lg:gap-14 items-start mb-16">
          <Reveal>
            <div className="relative max-w-[200px]">
              <img
                src={erikPortrait}
                alt="Erik Schwartz — founder of The AI Expert"
                className="rounded-sm border border-border w-full h-auto"
                loading="lazy"
              />
            </div>
          </Reveal>
          <div>
            <Reveal delay={80}>
              <span className="kicker text-primary block mb-4">
                The human behind the practice
              </span>
              <h3 className="title-card mb-4">Erik Schwartz</h3>
              <p className="lede max-w-2xl">
                Two decades building AI, search and knowledge discovery at
                enterprise scale — platforms used by millions of people every
                day. Now that experience guides forward-looking businesses like
                yours, delivered by a practice that runs on the same AI it
                recommends.
              </p>
            </Reveal>
            <Reveal delay={160} className="mt-6">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 kicker text-primary hover:text-primary/80 transition-colors"
              >
                Meet Erik <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Reasons grid */}
        <div ref={containerRef} className="grid md:grid-cols-2 gap-5 lg:gap-6 mb-16">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className={`card-surface p-7 lg:p-8 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  visibleItems[index]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <Icon className="w-6 h-6 text-primary mb-5" aria-hidden="true" />
                <h4 className="title-card mb-3">{reason.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Credibility strip */}
        <Reveal>
          <div className="border border-border rounded-sm">
            <div className="grid md:grid-cols-3 gap-px bg-border">
              {companies.map((company) => (
                <div
                  key={company.name}
                  className="bg-background p-6 flex items-center gap-4"
                >
                  <div className="h-10 w-24 flex items-center justify-center shrink-0">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="max-h-full max-w-full object-contain opacity-80"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">{company.role}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-px bg-border border-t border-border">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-background p-6 text-center">
                  <div className="font-heading text-2xl lg:text-3xl text-primary" style={{ fontVariationSettings: "'wdth' 118, 'wght' 640" }}>
                    {stat.value}
                  </div>
                  <div className="kicker text-muted-foreground mt-1.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Training clients + differentiators */}
        <Reveal className="mt-12">
          <p className="kicker text-muted-foreground text-center mb-4">
            AI training delivered to
          </p>
          <p className="text-center text-sm text-muted-foreground max-w-3xl mx-auto">
            {trainingClients.join(" · ")}
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-3 max-w-4xl mx-auto">
            {differentiators.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-1" aria-hidden="true" />
                <p className="text-sm text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default GuideAct;
