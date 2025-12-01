import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Download, Zap, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const LeadMagnet = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollReveal({ threshold: 0.2 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      toast.success("Scorecard sent! Check your email.");
    }
  };

  const features = [
    "15-minute interactive assessment",
    "Benchmarked against industry leaders",
    "Actionable recommendations included",
  ];

  return (
    <section className="py-24 lg:py-32 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div
          ref={sectionRef}
          className={`max-w-4xl mx-auto transition-all duration-1000 ${
            sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Card Container */}
          <div className="relative rounded-2xl overflow-hidden">
            {/* Gradient border */}
            <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-br from-secondary/60 via-primary/30 to-secondary/60">
              <div className="absolute inset-[2px] rounded-2xl bg-card" />
            </div>

            {/* Content */}
            <div className="relative p-8 md:p-10 lg:p-12">
              <div className="grid md:grid-cols-2 gap-10 lg:gap-12 items-center">
                {/* Left Column - Info */}
                <div className="space-y-6">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30">
                    <Zap className="w-4 h-4 text-secondary" />
                    <span className="text-sm font-heading text-secondary tracking-wider">
                      INTERACTIVE TOOL
                    </span>
                  </div>

                  {/* Headline */}
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading leading-tight">
                    <span className="text-foreground block">AI Readiness</span>
                    <span className="text-secondary glow-pink block">Scorecard</span>
                  </h2>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    Discover your organization's AI maturity level with our proprietary assessment. Get a personalized roadmap for AI transformation.
                  </p>

                  {/* Features List */}
                  <ul className="space-y-4">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3 group">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Column - Form */}
                <div className="relative">
                  {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
                          Work Email Address
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="bg-background/50 border-border focus:border-secondary h-12 text-lg"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold py-6 text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_hsla(320,85%,55%,0.4)] btn-shimmer"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        Get Your Free Scorecard
                      </Button>

                      <p className="text-xs text-muted-foreground text-center">
                        No spam. Unsubscribe anytime.
                      </p>
                    </form>
                  ) : (
                    <div className="text-center space-y-6 py-8">
                      <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/30 animate-glow-pulse">
                        <Sparkles className="w-10 h-10 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-heading text-primary glow-green mb-2">
                          Scorecard Sent!
                        </h3>
                        <p className="text-muted-foreground">
                          Check your email for your AI Readiness Scorecard and personalized recommendations.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Cyber corners */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-secondary/40" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-secondary/40" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-secondary/40" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-secondary/40" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadMagnet;
