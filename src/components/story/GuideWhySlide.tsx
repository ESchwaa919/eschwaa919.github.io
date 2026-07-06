import { Building2, Rocket, Users, Wrench, CheckCircle2 } from "lucide-react";
import SceneMarker from "./SceneMarker";
import Reveal, { revealClasses } from "./Reveal";
import { useScrollReveal } from "@/hooks/useScrollReveal";

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

/** Act IV·C — why work with the practice. */
const GuideWhySlide = () => {
  const { ref: reasonsRef, isVisible: reasonsVisible } = useScrollReveal();

  return (
    <div className="container mx-auto px-4">
      <SceneMarker label="Act IV — Why The AI Expert" className="mb-10" />

      <div ref={reasonsRef} className="grid md:grid-cols-2 gap-4 lg:gap-5 mb-10">
        {reasons.map((reason, index) => {
          const Icon = reason.icon;
          return (
            <div
              key={reason.title}
              style={{ transitionDelay: `${index * 80}ms` }}
              className={`card-surface p-6 lg:p-7 ${revealClasses(reasonsVisible)}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <Icon className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                <h3 className="title-card">{reason.title}</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {reason.description}
              </p>
            </div>
          );
        })}
      </div>

      <Reveal>
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-2.5 max-w-4xl mx-auto mb-8">
          {differentiators.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-1" aria-hidden="true" />
              <p className="text-sm text-muted-foreground">{item}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={80}>
        <p className="kicker text-muted-foreground text-center mb-3">
          AI training delivered to
        </p>
        <p className="text-center text-sm text-muted-foreground max-w-3xl mx-auto">
          {trainingClients.join(" · ")}
        </p>
      </Reveal>
    </div>
  );
};

export default GuideWhySlide;
