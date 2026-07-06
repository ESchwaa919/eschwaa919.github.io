import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, CheckCircle2, Download, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SceneMarker from "./SceneMarker";
import Reveal from "./Reveal";
import { PILLAR_PAGES } from "@/constants/pillarPages";

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

/** Finale — your move: scorecard, strategy call, and where to go next. */
const FinaleAct = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      toast.success("Scorecard sent! Check your email.");
    }
  };

  return (
    <section className="py-24 lg:py-32 border-t border-border relative overflow-hidden">
      <div className="horizon-glow" aria-hidden="true" />

      <div className="container mx-auto px-4 relative z-10">
        <SceneMarker label="Finale — Your move" className="mb-12" />

        <div className="max-w-4xl mx-auto text-center space-y-8 mb-24">
          <Reveal>
            <h2 className="title-display">
              <span className="block text-foreground">Let's map your path</span>
              <span className="block text-primary">to AI-powered business.</span>
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <p className="lede max-w-2xl mx-auto">
              Whether you're just starting or ready to scale, let's discuss where
              you are in your AI journey and create a practical roadmap forward.
            </p>
          </Reveal>

          <Reveal delay={160}>
            <div className="flex flex-wrap gap-2.5 justify-center">
              {PILLAR_PAGES.filter((p) => p.path !== "/use-cases").map((page) => (
                <Link
                  key={page.path}
                  to={page.path}
                  className="kicker text-muted-foreground hover:text-primary px-4 py-2 border border-border rounded-sm hover:border-primary/40 transition-colors"
                >
                  {page.name}
                </Link>
              ))}
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <Button
                size="lg"
                className="group bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-sm uppercase tracking-[0.14em] px-10 py-7 rounded-sm transition-all duration-300 hover:-translate-y-0.5 hover:box-glow-signal"
                asChild
              >
                <a href="https://calendly.com/eschwaa/30min">
                  <Calendar className="w-4 h-4 mr-2.5" />
                  Book a strategy call
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border border-border bg-transparent text-foreground hover:border-primary/60 hover:text-primary hover:bg-transparent font-mono text-sm uppercase tracking-[0.14em] px-10 py-7 rounded-sm transition-all duration-300 hover:-translate-y-0.5"
                asChild
              >
                <Link to="/services">
                  Explore services
                  <ArrowRight className="w-4 h-4 ml-2.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <p className="text-sm text-muted-foreground">
              30-minute consultation • No obligation • Just practical insights
            </p>
          </Reveal>

          <Reveal delay={400}>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 pt-8 border-t border-border">
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
          </Reveal>
        </div>

        {/* Scorecard lead magnet */}
        <Reveal>
          <div className="card-surface max-w-4xl mx-auto p-8 md:p-10 lg:p-12">
            <div className="grid md:grid-cols-2 gap-10 lg:gap-12 items-center">
              <div className="space-y-5">
                <span className="kicker text-primary">Interactive tool</span>
                <h3 className="title-scene">
                  AI Readiness
                  <span className="block text-primary">Scorecard</span>
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Discover your organization's AI maturity level with our
                  proprietary assessment. Get a personalized roadmap for AI
                  transformation.
                </p>
                <ul className="space-y-3">
                  {scorecardFeatures.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                      <span className="text-sm text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
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
                        className="bg-input border-border focus:border-primary h-12"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-sm uppercase tracking-[0.14em] py-6 rounded-sm transition-all duration-300 hover:-translate-y-0.5 hover:box-glow-signal"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Get your free scorecard
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      No spam. Unsubscribe anytime.
                    </p>
                  </form>
                ) : (
                  <div className="text-center space-y-5 py-8">
                    <Sparkles className="w-10 h-10 text-primary mx-auto" aria-hidden="true" />
                    <div>
                      <h4 className="title-card text-primary mb-2">Scorecard sent!</h4>
                      <p className="text-muted-foreground text-sm">
                        Check your email for your AI Readiness Scorecard and
                        personalized recommendations.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default FinaleAct;
