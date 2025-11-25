import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, CheckCircle2 } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Glitch Effect Background */}
      <div className="absolute inset-0 bg-gradient-cyber opacity-40" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-heading">
            <span className="text-foreground">LET'S MAP YOUR PATH</span>
            <br />
            <span className="text-primary glow-green">
              TO AI-POWERED BUSINESS
            </span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Whether you're just starting or ready to scale, let's discuss where
            you are in your AI journey and create a practical roadmap forward.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-green text-xl font-semibold px-12 py-8 shadow-cyber transition-all hover:scale-105"
              asChild
            >
              <Link to="/contact">
                <Calendar className="w-6 h-6 mr-2" />
                Book a Strategy Call
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary/10 text-xl font-semibold px-12 py-8 transition-all hover:scale-105"
              asChild
            >
              <Link to="/resources#assessment">
                Take Free Assessment
                <ArrowRight className="w-6 h-6 ml-2" />
              </Link>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            30-minute consultation • No obligation • Just practical insights
          </p>

          {/* Trust Reinforcement */}
          <div className="pt-12 border-t border-border/30 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Flexible engagement models</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>SMB-focused pricing</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Rapid prototyping available</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>NDA available</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
