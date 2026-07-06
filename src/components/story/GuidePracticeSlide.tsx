import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SceneMarker from "./SceneMarker";
import Reveal from "./Reveal";

const sdlcChips = [
  "11 lifecycle stages",
  "6 agent roles",
  "Independent adversarial review",
  "MIT-licensed open source",
];

/** Act IV·A — the practice that runs on AI. */
const GuidePracticeSlide = () => {
  return (
    <div className="container mx-auto px-4">
      <SceneMarker label="Act IV — The guide" className="mb-10" />

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-start">
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
    </div>
  );
};

export default GuidePracticeSlide;
