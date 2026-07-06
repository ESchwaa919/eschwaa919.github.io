import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SceneMarker from "./SceneMarker";
import Reveal from "./Reveal";

/** Act II — the villain: pilot purgatory. */
const PurgatoryAct = () => {
  return (
    <section className="py-24 lg:py-32 border-t border-border relative overflow-hidden">
      <div className="container mx-auto px-4">
        <SceneMarker label="Act II — Pilot purgatory" className="mb-12" />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <Reveal>
            <h2 className="title-scene">Why most AI initiatives fail.</h2>
          </Reveal>

          <div className="space-y-6">
            <Reveal delay={80}>
              <p className="lede">
                They skip straight to implementation. A tool gets bought, a pilot
                gets built, and eighteen months later there's nothing in
                production — just an expensive proof of concept nobody trusts.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <p className="lede">
                It isn't a technology problem. It's a sequence problem: strategy
                before understanding, scale before evidence.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <p className="text-lg text-foreground font-medium">
                We fix this by building capabilities in{" "}
                <span className="text-primary">the right order</span>.
              </p>
            </Reveal>
            <Reveal delay={320}>
              <Link
                to="/process"
                className="inline-flex items-center gap-2 kicker text-primary hover:text-primary/80 transition-colors"
              >
                How the sequence works <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PurgatoryAct;
