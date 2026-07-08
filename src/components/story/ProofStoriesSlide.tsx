import { Link } from "react-router-dom";
import {
  ArrowRight,
  Hotel,
  FileSearch,
  Pill,
  GraduationCap,
  TrendingUp,
  Clock,
  Target,
} from "lucide-react";
import SceneMarker from "./SceneMarker";
import Reveal, { revealClasses } from "./Reveal";
import { useScrollReveal } from "@/hooks/useScrollReveal";

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

/** Act V·A — the proof: client stories. */
const ProofStoriesSlide = () => {
  const { ref: storiesRef, isVisible: storiesVisible } = useScrollReveal();

  return (
    <div className="container mx-auto px-4">
      <SceneMarker label="Act V — The proof" className="mb-8" />

      <div className="grid lg:grid-cols-2 gap-6 items-end mb-8">
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

      <div ref={storiesRef} className="grid md:grid-cols-2 gap-4 lg:gap-5">
        {stories.map((story, index) => {
          const StoryIcon = story.icon;
          const OutcomeIcon = story.outcomeIcon;
          return (
            <div
              key={story.industry}
              style={{ transitionDelay: `${index * 80}ms` }}
              className={`card-surface p-5 lg:p-6 flex flex-col ${revealClasses(storiesVisible)}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <StoryIcon className="w-5 h-5 text-primary" aria-hidden="true" />
                <div>
                  <div className="kicker text-primary">{story.industry}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{story.stage}</div>
                </div>
              </div>

              <div className="mb-3">
                <div className="kicker text-muted-foreground mb-1.5">The challenge</div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {story.challenge}
                </p>
              </div>

              <div className="mb-4 flex-grow">
                <div className="kicker text-muted-foreground mb-1.5">What we built</div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {story.approach}
                </p>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between gap-4">
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
    </div>
  );
};

export default ProofStoriesSlide;
