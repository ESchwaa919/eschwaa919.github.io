import { Link } from "react-router-dom";
import {
  ArrowRight,
  ExternalLink,
  Hotel,
  FileSearch,
  Pill,
  GraduationCap,
  TrendingUp,
  Clock,
  Target,
  Mic,
  Video,
  FileText,
} from "lucide-react";
import SceneMarker from "./SceneMarker";
import Reveal from "./Reveal";
import { useStaggeredReveal } from "@/hooks/useScrollReveal";

const stories = [
  {
    icon: Hotel,
    industry: "Hospitality Tech",
    challenge:
      "A hospitality analytics company was drowning in cancellation data but couldn't predict which bookings would be lost — costing hotels six figures annually in empty rooms.",
    approach:
      "We developed an AI strategy that prioritised cancellation prediction as the highest-ROI use case, built a predictive model, and deployed it into their existing analytics platform.",
    outcome: "25% reduction in no-shows",
    outcomeIcon: TrendingUp,
    stage: "Strategy → Implementation",
    link: "/ai-strategy",
  },
  {
    icon: FileSearch,
    industry: "Workplace Investigations",
    challenge:
      "A workplace investigations firm was spending 40+ hours per case manually reviewing thousands of documents to identify evidence patterns across complex employment cases.",
    approach:
      "We built an AI system that analyses document evidence, identifies patterns, and generates structured investigation reports — with human oversight at every decision point.",
    outcome: "70% faster case review",
    outcomeIcon: Clock,
    stage: "Implementation",
    link: "/ai-implementation",
  },
  {
    icon: Pill,
    industry: "Pharmaceutical Compliance",
    challenge:
      "Every piece of marketing content required manual compliance checks against FDA, EMA, and MHRA regulations. The medical-legal review bottleneck was costing weeks per campaign.",
    approach:
      "We deployed multi-agent AI with Veeva Vault integration that reviews content against regulatory requirements, with cryptographically-sealed audit trails for compliance.",
    outcome: "Reviews in seconds, not days",
    outcomeIcon: Clock,
    stage: "Implementation",
    link: "/ai-implementation",
  },
  {
    icon: GraduationCap,
    industry: "Construction & Education",
    challenge:
      "Leadership at a major UK construction firm were sceptical about AI. They needed to understand what was real vs. hype before committing budget to any initiatives.",
    approach:
      "Board-level AI literacy workshops tailored to their industry — covering supply chain optimisation, safety monitoring, and predictive maintenance with real-world examples they could relate to.",
    outcome: "15 use cases identified, strategy approved in 6 weeks",
    outcomeIcon: Target,
    stage: "Literacy → Strategy",
    link: "/ai-literacy",
  },
];

const partners = ["AI Collective", "Gen AI Academy", "Cognician", "HumAInity", "Impact IT"];

const featured = [
  {
    type: "Podcast",
    icon: Mic,
    title: "Aligning AI to Business Strategy, DeepSeek and AI Agents",
    outlet: "The NeuralPod — Spotify",
    description:
      "Deep dive on aligning AI to business strategy, the agent revolution, measuring ROI, and why the dot-com parallels matter for leaders today.",
    link: "https://open.spotify.com/episode/19okJTgxevydVvAqXTtZiI",
  },
  {
    type: "Summit Talk",
    icon: Video,
    title: "Trust, Growth, Risk, Opportunity: The AI Paradox",
    outlet: "AI Global Summit — BusinessABC",
    description:
      "Business track conversation on the paradox every leader faces: AI creates enormous opportunity and genuine risk simultaneously. How do you move forward?",
    link: "https://www.youtube.com/watch?v=Aw0cPgj3YsU",
  },
  {
    type: "Article",
    icon: FileText,
    title: "AI Execution Playbook for SMBs",
    outlet: "LinkedIn",
    description:
      "Turning AI hype into measurable ROI without a Fortune 500 budget. A practical roadmap for SMBs ready to move beyond experimentation.",
    link: "https://www.linkedin.com/pulse/ai-execution-playbook-smbs-turning-hype-roi-without-fortune-schwartz-76y6e/",
  },
];

const channels = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/eschwaa/",
    description: "Articles, insights, and AI strategy posts",
    external: true,
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@eschwaa",
    description: "Summit talks and AI deep dives",
    external: true,
  },
  {
    name: "Podcasts",
    url: "/resources#media",
    description: "7+ podcast appearances on AI strategy",
    external: false,
  },
];

/** Act V — the proof: client stories, partners, and thought leadership. */
const ProofAct = () => {
  const { containerRef, visibleItems } = useStaggeredReveal(4);
  const { containerRef: mediaRef, visibleItems: mediaVisible } = useStaggeredReveal(3);

  return (
    <section className="py-24 lg:py-32 border-t border-border">
      <div className="container mx-auto px-4">
        <SceneMarker label="Act V — The proof" className="mb-12" />

        <div className="grid lg:grid-cols-2 gap-8 items-end mb-14">
          <Reveal>
            <h2 className="title-scene">
              Real work.
              <span className="text-primary"> Real results.</span>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="lede lg:max-w-md lg:ml-auto">
              Every engagement follows our Literacy → Strategy → Implementation
              methodology. Here's what that looks like in practice.
            </p>
          </Reveal>
        </div>

        {/* Case stories */}
        <div ref={containerRef} className="grid md:grid-cols-2 gap-5 lg:gap-6 mb-12">
          {stories.map((story, index) => {
            const StoryIcon = story.icon;
            const OutcomeIcon = story.outcomeIcon;
            return (
              <div
                key={story.industry}
                className={`card-surface p-7 lg:p-8 flex flex-col transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  visibleItems[index]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <StoryIcon className="w-5 h-5 text-primary" aria-hidden="true" />
                  <div>
                    <div className="kicker text-primary">{story.industry}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{story.stage}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="kicker text-muted-foreground mb-2">The challenge</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {story.challenge}
                  </p>
                </div>

                <div className="mb-6 flex-grow">
                  <div className="kicker text-muted-foreground mb-2">What we built</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {story.approach}
                  </p>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <OutcomeIcon className="w-4 h-4 text-primary" aria-hidden="true" />
                    <span className="text-sm text-foreground font-medium">{story.outcome}</span>
                  </div>
                  <Link
                    to={story.link}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 shrink-0"
                  >
                    Learn more <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Partners */}
        <Reveal className="mb-24 lg:mb-32">
          <p className="kicker text-muted-foreground text-center mb-4">Partner ecosystem</p>
          <div className="flex flex-wrap gap-3 justify-center items-center">
            {partners.map((name) => (
              <span
                key={name}
                className="text-sm text-muted-foreground px-4 py-2 border border-border rounded-sm"
              >
                {name}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Thought leadership */}
        <Reveal>
          <div className="grid lg:grid-cols-2 gap-8 items-end mb-12">
            <h3 className="title-scene">Insights &amp; thought leadership</h3>
            <p className="lede lg:max-w-md lg:ml-auto">
              Practical AI insights through podcasts, summit talks, and published
              articles. No fluff — just actionable guidance.
            </p>
          </div>
        </Reveal>

        <div ref={mediaRef} className="grid md:grid-cols-3 gap-5 lg:gap-6 mb-10">
          {featured.map((item, index) => {
            const ItemIcon = item.icon;
            return (
              <a
                key={item.title}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`card-surface group p-6 lg:p-7 flex flex-col transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  mediaVisible[index]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="kicker text-primary flex items-center gap-2">
                    <ItemIcon className="w-3.5 h-3.5" aria-hidden="true" />
                    {item.type}
                  </span>
                  <ExternalLink className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                </div>
                <h4 className="text-base font-medium text-foreground mb-1.5 leading-snug group-hover:text-primary transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-muted-foreground/70 mb-4">{item.outlet}</p>
                <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                  {item.description}
                </p>
                <span className="kicker text-primary mt-5 pt-4 border-t border-border flex items-center gap-1.5">
                  {item.type === "Podcast" ? "Listen" : item.type === "Article" ? "Read" : "Watch"}
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            );
          })}
        </div>

        <Reveal>
          <div className="flex flex-wrap gap-4 justify-center">
            {channels.map((channel) => {
              const content = (
                <>
                  <div>
                    <div className="text-sm text-foreground group-hover:text-primary transition-colors">
                      {channel.name}
                    </div>
                    <div className="text-xs text-muted-foreground">{channel.description}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                </>
              );
              const className =
                "group flex items-center gap-3 px-6 py-3 border border-border rounded-sm hover:border-primary/40 transition-colors";

              return channel.external ? (
                <a
                  key={channel.name}
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {content}
                </a>
              ) : (
                <Link key={channel.name} to={channel.url} className={className}>
                  {content}
                </Link>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ProofAct;
