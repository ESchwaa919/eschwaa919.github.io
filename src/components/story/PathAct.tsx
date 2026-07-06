import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SceneMarker from "./SceneMarker";
import Reveal, { revealClasses } from "./Reveal";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const stages = [
  {
    number: "01",
    title: "Literacy & Fluency",
    description:
      "Build confidence across leadership and staff. Replace confusion with clarity.",
    features: ["Executive briefings", "Hands-on workshops", "AI competency assessment"],
    meta: "2–4 weeks",
    link: "/ai-literacy",
  },
  {
    number: "02",
    title: "Strategy",
    description: "Identify where AI fits, what matters, and what creates value.",
    features: ["AI readiness audit", "Use-case development", "ROI modelling"],
    meta: "4–8 weeks",
    link: "/ai-strategy",
  },
  {
    number: "03",
    title: "Implementation",
    description: "From a prototype in a day to a full project in weeks or months.",
    features: ["Rapid prototypes (1-2 days)", "Full agentic workflows", "Ongoing optimization"],
    meta: "8–16 weeks",
    link: "/ai-implementation",
  },
];

/** Act III — the journey map: Literacy → Strategy → Implementation. */
const PathAct = () => {
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal();

  return (
    <div className="container mx-auto px-4">
      <SceneMarker label="Act III — The path" className="mb-8" />

      <div className="grid lg:grid-cols-2 gap-6 items-end mb-10">
        <Reveal>
          <h2 className="title-scene">
            From AI-curious
            <span className="block text-primary">to AI-powered.</span>
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="lede lg:max-w-md lg:ml-auto">
            AI adoption doesn't happen all at once. It happens in three clear
            steps. We guide you through each one.
          </p>
        </Reveal>
      </div>

      <div
        ref={gridRef}
        className="grid md:grid-cols-3 gap-px bg-border border border-border"
      >
        {stages.map((stage, index) => (
          <Link
            key={stage.number}
            to={stage.link}
            style={{ transitionDelay: `${index * 80}ms` }}
            className={`group block bg-background hover:bg-moss p-7 lg:p-8 ${revealClasses(gridVisible)}`}
          >
            <span className="kicker text-primary block mb-5">
              Stage {stage.number}
            </span>
            <h3 className="title-card mb-3">{stage.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-5">
              {stage.description}
            </p>
            <ul className="space-y-2 mb-6">
              {stage.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground"
                >
                  <span className="w-1 h-1 rounded-full bg-primary shrink-0" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
            <span className="kicker text-muted-foreground flex items-center gap-2 group-hover:text-primary transition-colors">
              {stage.meta} · Deep dive
              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>

      <Reveal className="mt-8 text-center">
        <Link
          to="/process"
          className="inline-flex items-center gap-2 kicker text-primary hover:text-primary/80 transition-colors"
        >
          Explore the full process <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </Reveal>
    </div>
  );
};

export default PathAct;
