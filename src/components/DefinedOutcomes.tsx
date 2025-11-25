import { Zap, Target, Rocket, TrendingUp, Brain } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const DefinedOutcomes = () => {
  const outcomes = [
    {
      icon: TrendingUp,
      title: "40% Average ROI Increase",
      description: "Measurable revenue growth within 6 months of implementation through AI-driven optimization.",
    },
    {
      icon: Zap,
      title: "60% Operational Efficiency Gain",
      description: "Streamlined processes and automated workflows that reduce costs and accelerate delivery.",
    },
    {
      icon: Brain,
      title: "Enterprise-Grade AI Integration",
      description: "Seamless deployment of AI systems that scale with your business needs.",
    },
    {
      icon: Target,
      title: "Data-Driven Decision Making",
      description: "Real-time insights and predictive analytics that drive strategic advantage.",
    },
    {
      icon: Rocket,
      title: "Competitive Market Leadership",
      description: "First-mover advantage through cutting-edge AI capabilities in your industry.",
    },
  ];

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-cyber opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading mb-4">
            <span className="text-primary glow-green">Tangible Outcomes</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Not just promises. Measurable results that transform your enterprise.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {outcomes.map((outcome, index) => (
            <Card 
              key={index}
              className="bg-card/80 backdrop-blur-sm border-2 border-border hover:border-primary/50 transition-all duration-300 shadow-cyber group hover:scale-105"
            >
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <outcome.icon className="w-6 h-6 text-primary group-hover:glow-green" />
                </div>
                
                <h3 className="text-xl font-heading text-primary">
                  {outcome.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {outcome.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DefinedOutcomes;
