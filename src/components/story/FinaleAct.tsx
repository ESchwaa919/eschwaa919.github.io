import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, CheckCircle2, Send, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SceneMarker from "./SceneMarker";
import Reveal from "./Reveal";
import { PILLAR_PAGES } from "@/constants/pillarPages";
import { sendLeadNotification, storeLead } from "@/hooks/useLeadCapture";

const pillarChips = PILLAR_PAGES.filter((p) => p.path !== "/use-cases");

const trustPoints = [
  "Flexible engagement models",
  "SMB-focused pricing",
  "Rapid prototyping available",
  "NDA available",
];

const scorecardFeatures = [
  "15-minute interactive assessment",
  "Benchmarked against industry leaders",
  "Actionable recommendations included",
];

/** Finale — your move: strategy call, scorecard, and where to go next. */
const FinaleAct = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await sendLeadNotification(
        "Scorecard request",
        email,
        "AI Readiness Scorecard",
        "Homepage Finale Scorecard",
        false
      );
      storeLead("Scorecard request", email);
      setSubmitted(true);
      toast.success("You're in! Start your assessment below.");
    } catch (error) {
      console.error("Scorecard lead error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="horizon-glow" aria-hidden="true" />

      <div className="container mx-auto px-4 relative z-10">
        <SceneMarker label="Finale — Your move" className="mb-10" />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left — the ask */}
          <div className="space-y-7">
            <Reveal>
              <h2 className="title-scene">
                <span className="block text-foreground">Let's map your path</span>
                <span className="block text-primary">to AI-powered business.</span>
              </h2>
            </Reveal>

            <Reveal delay={80}>
              <p className="lede">
                Whether you're just starting or ready to scale, let's discuss
                where you are in your AI journey and create a practical roadmap
                forward.
              </p>
            </Reveal>

            <Reveal delay={160}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="cine" className="text-sm px-8 py-6" asChild>
                  <a href="https://calendly.com/eschwaa/30min">
                    <Calendar className="w-4 h-4 mr-2.5" />
                    Book a strategy call
                  </a>
                </Button>
                <Button size="lg" variant="cineOutline" className="group text-sm px-8 py-6" asChild>
                  <Link to="/services">
                    Explore services
                    <ArrowRight className="w-4 h-4 ml-2.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                30-minute consultation • No obligation • Just practical insights
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="flex flex-wrap gap-x-6 gap-y-2.5 pt-6 border-t border-border">
                {trustPoints.map((point) => (
                  <div
                    key={point}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary" aria-hidden="true" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2.5 mt-6">
                {pillarChips.map((page) => (
                  <Link
                    key={page.path}
                    to={page.path}
                    className="kicker text-muted-foreground hover:text-primary px-3.5 py-1.5 border border-border rounded-sm hover:border-primary/40 transition-colors"
                  >
                    {page.name}
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right — the scorecard */}
          <Reveal delay={160}>
            <div className="card-surface p-7 lg:p-9">
              <span className="kicker text-primary">Interactive tool</span>
              <h3 className="title-card mt-3 mb-3">
                AI Readiness <span className="text-primary">Scorecard</span>
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                Discover your organization's AI maturity level with our
                proprietary assessment. Get a personalized roadmap for AI
                transformation.
              </p>
              <ul className="space-y-2.5 mb-6">
                {scorecardFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                    <span className="text-sm text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="scorecard-email"
                      className="block text-sm font-medium mb-2 text-foreground"
                    >
                      Work Email Address
                    </label>
                    <Input
                      id="scorecard-email"
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-input border-border focus:border-primary h-11"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    variant="cine"
                    className="w-full text-sm py-5"
                    disabled={isSubmitting}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? "Sending…" : "Start my scorecard"}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    No spam. Unsubscribe anytime.
                  </p>
                </form>
              ) : (
                <div className="text-center space-y-4 py-4">
                  <Sparkles className="w-8 h-8 text-primary mx-auto" aria-hidden="true" />
                  <div>
                    <h4 className="title-card text-primary mb-2">You're in!</h4>
                    <p className="text-muted-foreground text-sm mb-5">
                      Take the interactive assessment now — your personalized
                      scorecard and recommendations are generated at the end.
                    </p>
                    <Button size="lg" variant="cine" className="text-sm px-8 py-5" asChild>
                      <Link to="/ai-assessment">
                        Start the assessment
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
};

export default FinaleAct;
