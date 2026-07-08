import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SceneMarker from "./SceneMarker";

/**
 * Scene 00 — the cold open. Opens on AI, not on a person. One light source
 * (the horizon), one primary action. Rendered inside a Slide.
 */
const ColdOpen = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const entrance = (delay = "") =>
    `transition-all duration-700 ${delay} ${
      isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    }`;

  return (
    <>
      <div className="horizon-glow" aria-hidden="true" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-5xl">
          {/* Slate — load-time entrance rather than scroll reveal */}
          <div className={`mb-10 ${entrance()}`}>
            <SceneMarker
              label="Your first stop for getting AI done right"
              revealed={isLoaded}
            />
          </div>

          {/* Headline */}
          <h1 className={`title-display ${entrance("delay-150")}`}>
            <span className="block text-foreground">AI isn't coming.</span>
            <span className="block text-primary">It's already here.</span>
          </h1>

          {/* Lede */}
          <p className={`lede mt-8 max-w-2xl ${entrance("delay-300")}`}>
            The only question is whether it's working for you. We take
            forward-looking businesses from{" "}
            <span className="text-foreground">AI-curious</span> to{" "}
            <span className="text-foreground">AI-powered</span> — through a proven
            path of{" "}
            <Link to="/ai-literacy" className="text-primary hover:text-primary/80">
              Literacy
            </Link>
            ,{" "}
            <Link to="/ai-strategy" className="text-primary hover:text-primary/80">
              Strategy
            </Link>{" "}
            and{" "}
            <Link to="/ai-implementation" className="text-primary hover:text-primary/80">
              Implementation
            </Link>
            .
          </p>

          {/* CTAs */}
          <div className={`flex flex-col sm:flex-row gap-4 mt-12 ${entrance("delay-450")}`}>
            <Button size="lg" variant="cine" className="group text-sm px-8 py-6" asChild>
              <Link to="/ai-assessment">
                Start the AI assessment
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="cineOutline" className="text-sm px-8 py-6" asChild>
              <a href="https://calendly.com/eschwaa/30min">Book a strategy call</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Horizon hairline */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.4), transparent)",
        }}
        aria-hidden="true"
      />
    </>
  );
};

export default ColdOpen;
