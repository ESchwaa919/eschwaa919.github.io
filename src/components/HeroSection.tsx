import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/Erik-Headshot.png";
import cyberGrid from "@/assets/cyber-grid.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div
        className="absolute inset-0 opacity-20 animate-data-stream"
        style={{
          backgroundImage: `url(${cyberGrid})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-cyber" />

      <div className="container relative z-10 mx-auto px-4 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-heading text-primary">
                Your First Stop For Getting AI Done Right
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-heading leading-tight">
              <span className="text-primary glow-green">ERIK SCHWARTZ.</span>
              <br />
              <span className="text-foreground">THE AI EXPERT.</span>
            </h1>

            <p className="text-2xl md:text-3xl text-foreground font-light leading-relaxed">
              Helping forward-looking business owners go from{" "}
              <span className="text-primary font-semibold">AI-curious</span> to{" "}
              <span className="text-primary font-semibold">AI-powered</span>.
            </p>

            <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
              We guide small and medium businesses who know AI is essential —
              but don't know where to begin.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 glow-green text-lg font-semibold px-8 py-6 shadow-cyber transition-all hover:scale-105"
                asChild
              >
                <Link to="/resources#assessment">
                  Start Your AI Readiness Assessment
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary/10 text-lg font-semibold px-8 py-6 transition-all hover:scale-105"
                asChild
              >
                <Link to="/contact">Book a Call</Link>
              </Button>
            </div>
          </div>

          {/* Expert Image */}
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden shadow-cyber border-2 border-primary/30">
              <img
                src={heroImage}
                alt="Erik Schwartz - AI Expert"
                className="w-full h-auto"
              />
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-card border-2 border-primary p-4 rounded-lg shadow-cyber backdrop-blur-sm">
              <div className="text-3xl font-heading text-primary glow-green">20+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>

            <div className="absolute -top-6 -right-6 bg-card border-2 border-secondary p-4 rounded-lg shadow-cyber backdrop-blur-sm">
              <div className="text-2xl font-heading text-secondary glow-pink">Microsoft</div>
              <div className="text-sm text-muted-foreground">Comcast • Elsevier</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
