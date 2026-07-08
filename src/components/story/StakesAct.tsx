import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SceneMarker from "./SceneMarker";
import Reveal from "./Reveal";

const stats = [
  {
    figure: "85%",
    headline: "of AI pilots never reach production.",
    detail: "Experiments everywhere. Shipping almost nowhere. This is the gap we close.",
  },
  {
    figure: "2–3×",
    headline: "productivity gap between AI adopters and laggards.",
    detail: "The distance compounds every quarter you wait.",
  },
  {
    figure: "60%",
    headline: "of AI projects fail through poor vendor selection.",
    detail: "You can't buy your way past understanding. Literacy comes first.",
  },
];

/** Act I — the stakes, told as full-width stat beats. */
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
        {stats.map((stat, index) => (
          <Reveal key={stat.figure} delay={index * 80}>
            <div className="grid md:grid-cols-[auto_1fr] gap-3 md:gap-10 items-baseline py-6 lg:py-7 border-b border-border last:border-b-0">
              <span className="stat-figure md:min-w-[4ch]">{stat.figure}</span>
              <div className="max-w-xl">
                <p className="text-lg text-foreground font-medium">{stat.headline}</p>
                <p className="text-muted-foreground mt-1">{stat.detail}</p>
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
