import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, CheckCircle2, Sparkles } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { PILLAR_PAGES } from "@/constants/pillarPages";

const FinalCTA = () => {
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal();

  const trustPoints = [
    "Flexible engagement models",
    "SMB-focused pricing",
    "Rapid prototyping available",
    "NDA available",
  ];

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Dramatic Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large ambient orbs */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[400px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[300px] bg-secondary/10 rounded-full blur-3xl" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(hsla(155, 100%, 45%, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, hsla(155, 100%, 45%, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          ref={ctaRef}
          className={`max-w-4xl mx-auto text-center space-y-10 transition-all duration-300 ${
            ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30">
            <Sparkles className="w-4 h-4 text-primary animate-pulse-glow" />
            <span className="text-sm font-heading text-primary tracking-wider">
              Start Your AI Journey Today
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading leading-tight">
            <span className="text-foreground block">LET'S MAP YOUR PATH</span>
            <span className="text-gradient-animate glow-green-intense block mt-2">
              TO AI-POWERED BUSINESS
            </span>
          </h2>

          {/* Description */}
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Whether you're just starting or ready to scale, let's discuss where
            you are in your AI journey and create a practical roadmap forward.
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            {PILLAR_PAGES.filter(p => p.path !== "/use-cases").map((page) => (
              <Link key={page.path} to={page.path} className="text-sm px-4 py-2 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-all">
                {page.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              className="group relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 text-xl font-semibold px-10 lg:px-12 py-7 lg:py-8 shadow-cyber transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_hsla(155,100%,45%,0.5)] btn-shimmer"
              asChild
            >
              <a href="https://calendly.com/eschwaa/30min">
                <Calendar className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                Book a Strategy Call
              </a>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="group border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary text-xl font-semibold px-10 lg:px-12 py-7 lg:py-8 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_hsla(155,100%,45%,0.25)]"
              asChild
            >
              <Link to="/services">
                Explore Services
                <ArrowRight className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {/* Consultation info */}
          <p className="text-sm text-muted-foreground">
            30-minute consultation • No obligation • Just practical insights
          </p>

          {/* Trust Reinforcement */}
          <div className="pt-10 border-t border-border/30">
            <div className="flex flex-wrap justify-center gap-6 lg:gap-10">
              {trustPoints.map((point, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </section>
  );
};

export default FinalCTA;
