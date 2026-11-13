import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SceneMarker from "./SceneMarker";
import Reveal from "./Reveal";

const stakes = [
  {
    headline: "Most AI pilots never reach production.",
    detail: "Experiments everywhere. Shipping almost nowhere. This is the gap we close.",
  },
  {
    headline: "The gap between AI adopters and laggards keeps widening.",
    detail: "The distance compounds every quarter you wait.",
  },
  {
    headline: "Many AI projects stall on the wrong vendor choice.",
    detail: "You can't buy your way past understanding. Literacy comes first.",
  },
];

/** Act I — the stakes, told as full-width beats. */
const StakesAct = () => {
  return (
    <div className="container mx-auto px-4">
      <SceneMarker label="Act I — The stakes" className="mb-8" />

      <Reveal>
        <h2 className="title-scene max-w-3xl">
          The world just changed speed.
          <span className="text-muted-foreground"> Most businesses haven't.</span>
        </h2>
      </Reveal>

      <div className="mt-4">
        {stakes.map((item, index) => (
          <Reveal key={item.headline} delay={index * 80}>
            <div className="py-6 lg:py-7 border-b border-border last:border-b-0">
              <div className="max-w-2xl">
                <p className="text-xl md:text-2xl text-foreground font-medium">{item.headline}</p>
                <p className="text-muted-foreground mt-1">{item.detail}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-6">
        <Link
          to="/ai-literacy"
          className="inline-flex items-center gap-2 kicker text-primary hover:text-primary/80 transition-colors"
        >
          See the full picture <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </Reveal>
    </div>
  );
};

export default StakesAct;
