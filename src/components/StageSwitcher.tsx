import { useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, CheckCircle2, Code2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

export interface ProcessStage {
  number: string;
  name: string;
  tagline: string;
  icon: LucideIcon;
  challenge: string;
  description: string;
  duration: string;
  outcome: string;
  whoItsFor: string;
  keyActivities: { icon: LucideIcon; title: string; description: string }[];
  deliverables: string[];
  successIndicators: string[];
  inPractice?: { text: string; links: { name: string; path: string }[] };
  color: "primary" | "secondary";
}

// First word of the stage name, e.g. "Literacy & Fluency" -> "literacy".
const slugFor = (name: string) => name.toLowerCase().split(" ")[0];

const initialIndex = (slugs: string[]) => {
  if (typeof window === "undefined") return 0;
  const hash = window.location.hash.replace("#", "");
  const idx = slugs.indexOf(hash);
  return idx >= 0 ? idx : 0;
};

/**
 * Accessible stage switcher: an ARIA tabs pattern where the 01/02/03 process
 * sequence is the navigation and one stage's detail shows at a time.
 * All three tabpanels stay in the DOM (inactive ones use the `hidden`
 * attribute) so the SSG pre-render and crawlers see every stage.
 */
const StageSwitcher = ({ stages }: { stages: ProcessStage[] }) => {
  const slugs = stages.map((s) => slugFor(s.name));
  const [active, setActive] = useState(() => initialIndex(slugs));
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const selectTab = (index: number, moveFocus: boolean) => {
    const next = (index + stages.length) % stages.length;
    setActive(next);
    if (typeof window !== "undefined") {
      // Reflect the active stage in the URL hash without a scroll jump.
      window.history.replaceState(null, "", `#${slugs[next]}`);
    }
    if (moveFocus) tabRefs.current[next]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        selectTab(index + 1, true);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        selectTab(index - 1, true);
        break;
      case "Home":
        e.preventDefault();
        selectTab(0, true);
        break;
      case "End":
        e.preventDefault();
        selectTab(stages.length - 1, true);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      {/* Stepper / tablist */}
      <div
        role="tablist"
        aria-label="Choose a process stage"
        aria-orientation="horizontal"
        className="grid gap-4 md:grid-cols-3 mb-10"
      >
        {stages.map((stage, index) => {
          const StageIcon = stage.icon;
          const isActive = index === active;
          const isPrimary = stage.color === "primary";
          return (
            <button
              key={stage.number}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              role="tab"
              id={`tab-${slugs[index]}`}
              aria-selected={isActive}
              aria-controls={`panel-${slugs[index]}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => selectTab(index, false)}
              onKeyDown={(e) => onKeyDown(e, index)}
              className={`text-left rounded-lg border p-5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                isActive
                  ? isPrimary
                    ? "border-primary bg-primary/10 shadow-[0_0_30px_hsla(155,100%,45%,0.12)]"
                    : "border-secondary bg-secondary/10 shadow-[0_0_30px_hsla(320,85%,55%,0.12)]"
                  : "border-border bg-card/40 hover:border-primary/40"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span
                  className={`text-3xl font-heading ${
                    isActive
                      ? isPrimary
                        ? "text-primary"
                        : "text-secondary"
                      : "text-muted-foreground/40"
                  }`}
                >
                  {stage.number}
                </span>
                <span
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isPrimary
                      ? "bg-primary/10 border border-primary/30"
                      : "bg-secondary/10 border border-secondary/30"
                  }`}
                >
                  <StageIcon
                    className={`w-5 h-5 ${
                      isPrimary ? "text-primary" : "text-secondary"
                    }`}
                  />
                </span>
              </div>
              <div className="text-lg font-heading text-foreground">
                {stage.name}
              </div>
              <div
                className={`text-xs font-semibold uppercase tracking-wide mt-1 ${
                  isPrimary ? "text-primary" : "text-secondary"
                }`}
              >
                {stage.tagline}
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                {stage.duration}
              </div>
            </button>
          );
        })}
      </div>

      {/* Panels: all present in the DOM, inactive ones hidden */}
      {stages.map((stage, index) => {
        const StageIcon = stage.icon;
        const isPrimary = stage.color === "primary";
        const nextStage = stages[index + 1];
        return (
          <div
            key={stage.number}
            role="tabpanel"
            id={`panel-${slugs[index]}`}
            aria-labelledby={`tab-${slugs[index]}`}
            hidden={index !== active}
            tabIndex={0}
          >
            <Card
              className={`bg-gradient-to-br from-card to-background border-2 ${
                isPrimary ? "border-primary" : "border-secondary"
              } shadow-cyber-lg overflow-hidden`}
            >
              {/* Stage Header Bar */}
              <div
                className={`h-2 ${
                  isPrimary
                    ? "bg-gradient-to-r from-primary to-emerald-600"
                    : "bg-gradient-to-r from-secondary to-pink-600"
                }`}
              ></div>

              <CardContent className="p-6 md:p-10">
                {/* Header */}
                <div className="flex items-start gap-6 mb-8">
                  <div
                    className={`w-20 h-20 rounded-xl ${
                      isPrimary ? "bg-primary/10" : "bg-secondary/10"
                    } flex items-center justify-center flex-shrink-0`}
                  >
                    <StageIcon
                      className={`w-10 h-10 ${
                        isPrimary ? "text-primary" : "text-secondary"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
                      Stage {stage.number}
                    </div>
                    <h2 className="text-4xl font-heading text-foreground mb-2">
                      {stage.name}
                    </h2>
                    <p
                      className={`text-lg ${
                        isPrimary ? "text-primary" : "text-secondary"
                      } font-semibold italic mb-4`}
                    >
                      "{stage.tagline}"
                    </p>
                  </div>
                </div>

                {/* The Challenge */}
                <div className="mb-8 p-6 bg-background/50 rounded-lg border-l-4 border-secondary">
                  <div className="text-sm text-secondary font-semibold uppercase tracking-wide mb-2">
                    The Challenge
                  </div>
                  <p className="text-xl text-foreground font-semibold">
                    {stage.challenge}
                  </p>
                </div>

                {/* Description */}
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {stage.description}
                </p>

                {/* Contextual link to the delivery engine, shown where the
                    "how do you actually build it?" question is live. */}
                {slugs[index] === "implementation" && (
                  <Link
                    to="/process/sdlc"
                    className="group block mb-8 p-6 rounded-lg border border-secondary/30 bg-secondary/5 hover:border-secondary/60 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-lg bg-secondary/10 border border-secondary/30 flex items-center justify-center flex-shrink-0">
                        <Code2 className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Every build runs on our spec-driven agentic method.
                        </p>
                        <span className="inline-flex items-center gap-1 font-heading tracking-wide text-secondary group-hover:text-secondary/80 transition-colors">
                          How we build: The Ai Expert SDLC
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                )}

                {/* In Practice */}
                {stage.inPractice && (
                  <div
                    className={`mb-8 p-6 ${
                      isPrimary
                        ? "bg-primary/5 border-primary/20"
                        : "bg-secondary/5 border-secondary/20"
                    } rounded-lg border`}
                  >
                    <h3
                      className={`text-sm font-heading ${
                        isPrimary ? "text-primary" : "text-secondary"
                      } uppercase tracking-wider mb-3`}
                    >
                      In Practice
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {stage.inPractice.text}
                    </p>
                    <div className="flex flex-wrap gap-4 mt-3">
                      {stage.inPractice.links.map((link, idx) => (
                        <Link
                          key={idx}
                          to={link.path}
                          className={`text-sm ${
                            isPrimary
                              ? "text-primary hover:text-primary/80"
                              : "text-secondary hover:text-secondary/80"
                          } flex items-center gap-1`}
                        >
                          {link.name} <ArrowRight className="w-3 h-3" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Activities Grid */}
                <div className="mb-8">
                  <h3 className="text-xl font-heading text-foreground mb-6">
                    What Happens
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {stage.keyActivities.map((activity, idx) => {
                      const ActivityIcon = activity.icon;
                      return (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-4 bg-background/30 rounded-lg border border-border"
                        >
                          <div
                            className={`w-10 h-10 rounded-lg ${
                              isPrimary ? "bg-primary/10" : "bg-secondary/10"
                            } flex items-center justify-center flex-shrink-0`}
                          >
                            <ActivityIcon
                              className={`w-5 h-5 ${
                                isPrimary ? "text-primary" : "text-secondary"
                              }`}
                            />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-foreground mb-1">
                              {activity.title}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {activity.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Deliverables */}
                <div className="mb-8">
                  <h3 className="text-xl font-heading text-foreground mb-4">
                    You'll Receive
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {stage.deliverables.map((deliverable, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2
                          className={`w-4 h-4 ${
                            isPrimary ? "text-primary" : "text-secondary"
                          } flex-shrink-0 mt-0.5`}
                        />
                        <span className="text-muted-foreground">
                          {deliverable}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Info Grid */}
                <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-border">
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                      Duration
                    </div>
                    <div className="text-lg font-heading text-foreground">
                      {stage.duration}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                      Outcome
                    </div>
                    <div className="text-sm text-foreground">
                      {stage.outcome}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                      Best For
                    </div>
                    <div className="text-sm text-foreground">
                      {stage.whoItsFor}
                    </div>
                  </div>
                </div>

                {/* Success Indicators */}
                <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="text-sm text-primary font-semibold uppercase tracking-wide mb-3">
                    Success Indicators
                  </div>
                  <div className="grid md:grid-cols-2 gap-2">
                    {stage.successIndicators.map((indicator, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{indicator}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Next stage affordance */}
                {nextStage && (
                  <div className="mt-8 pt-6 border-t border-border flex justify-end">
                    <button
                      type="button"
                      onClick={() => selectTab(index + 1, true)}
                      className="group inline-flex items-center gap-2 text-primary font-heading tracking-wide hover:text-primary/80 transition-colors"
                    >
                      Next: {nextStage.name}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default StageSwitcher;
