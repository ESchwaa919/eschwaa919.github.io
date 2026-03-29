import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import heroImage from "@/assets/Erik-Headshot.jpg";
import cyberGrid from "@/assets/cyber-grid.jpg";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger entrance animations after mount
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden overflow-x-hidden">
      {/* Animated Cyber Grid Background - THE HERO VISUAL */}
      <div
        className="absolute inset-0 opacity-40 animate-data-stream"
        style={{
          backgroundImage: `url(${cyberGrid})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Minimal Atmospheric Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Very subtle floating orbs for depth - barely visible */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float opacity-20" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-float-delayed opacity-15" />
      </div>

      {/* Bottom fade only - for content readability at bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/50" />

      {/* Content Container */}
      <div className="container relative z-10 mx-auto px-4 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8 max-w-full overflow-hidden">
            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
            >
              <Sparkles className="w-4 h-4 text-primary animate-pulse-glow" />
              <span className="text-sm font-heading text-primary tracking-wider">
                Your First Stop For Getting AI Done Right
              </span>
            </div>

            {/* Main Headline */}
            <h1
              className={`text-[1.6rem] xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading leading-[1.1] transition-all duration-700 delay-150 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <span className="block text-gradient-animate glow-green-intense">
                ERIK SCHWARTZ.
              </span>
              <span className="block text-foreground mt-2">
                THE AI EXPERT.
              </span>
            </h1>

            {/* Subheadline */}
            <p
              className={`text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-foreground/90 font-light leading-relaxed transition-all duration-700 delay-300 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Helping forward-looking business owners go from{" "}
              <span className="text-primary font-semibold glow-green">AI-curious</span> to{" "}
              <span className="text-primary font-semibold glow-green">AI-powered</span>.
            </p>

            {/* Description */}
            <p
              className={`text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed transition-all duration-700 delay-[450ms] ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              We guide small and medium businesses through a proven 3-stage path:{" "}
              <Link to="/ai-literacy" className="text-primary hover:text-primary/80 font-medium">Literacy</Link> →{" "}
              <Link to="/ai-strategy" className="text-primary hover:text-primary/80 font-medium">Strategy</Link> →{" "}
              <Link to="/ai-implementation" className="text-primary hover:text-primary/80 font-medium">Implementation</Link>.
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 pt-4 transition-all duration-700 delay-[600ms] ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <Button
                size="lg"
                className="group relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 text-sm sm:text-lg font-semibold px-4 sm:px-8 py-5 sm:py-6 shadow-cyber transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsla(155,100%,45%,0.4)] btn-shimmer"
                asChild
              >
                <Link to="/resources#assessment">
                  <Zap className="mr-2 w-4 sm:w-5 h-4 sm:h-5 group-hover:animate-pulse flex-shrink-0" />
                  <span className="truncate">Start AI Assessment</span>
                  <ArrowRight className="ml-2 w-4 sm:w-5 h-4 sm:h-5 transition-transform group-hover:translate-x-1 flex-shrink-0" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary text-lg font-semibold px-8 py-6 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_hsla(155,100%,45%,0.2)]"
                asChild
              >
                <a href="https://calendly.com/eschwaa/30min">
                  Book a Strategy Call
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </div>

          {/* Expert Image with Enhanced Frame */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            {/* Glow backdrop */}
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 rounded-2xl blur-2xl opacity-50" />

            {/* Main Image Container */}
            <div className="relative">
              {/* Cyber corners */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-primary/60" />
              <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-primary/60" />
              <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-primary/60" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-primary/60" />

              {/* Image */}
              <div className="relative overflow-hidden rounded-lg shadow-elevated border border-primary/20">
                <img
                  src={heroImage}
                  alt="Erik Schwartz - AI Expert"
                  className="w-full h-auto"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
            </div>

            {/* Floating Stats - Years Experience */}
            <div
              className={`absolute -bottom-4 -left-4 lg:-bottom-6 lg:-left-8 glass-card p-4 lg:p-5 rounded-xl animate-float transition-all duration-700 delay-500 ${
                isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-3xl lg:text-4xl font-heading text-primary glow-green">20+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
              </div>
            </div>

            {/* Floating Stats - Companies */}
            <div
              className={`absolute -top-4 right-0 sm:-right-4 lg:-top-6 lg:-right-8 glass-card p-3 sm:p-4 lg:p-5 rounded-xl animate-float-delayed transition-all duration-700 delay-700 ${
                isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              <div className="text-lg sm:text-xl lg:text-2xl font-heading text-secondary glow-pink mb-1">Microsoft</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Comcast • Elsevier</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 delay-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-primary rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
