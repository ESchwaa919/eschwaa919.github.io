import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { GraduationCap, Map, Rocket, ArrowRight } from "lucide-react";

const ProcessOverview = () => {
  const stages = [
    {
      number: "01",
      title: "Literacy & Fluency",
      icon: GraduationCap,
      description:
        "Build confidence across leadership and staff. Replace confusion with clarity.",
      features: [
        "Executive briefings",
        "Hands-on workshops",
        "AI competency assessment",
      ],
    },
    {
      number: "02",
      title: "Strategy",
      icon: Map,
      description:
        "Identify where AI fits, what matters, and what creates value.",
      features: [
        "AI readiness audit",
        "Use-case development",
        "ROI modelling",
      ],
    },
    {
      number: "03",
      title: "Implementation",
      icon: Rocket,
      description:
        "From a prototype in a day to a full project in weeks or months.",
      features: [
        "Rapid prototypes (1-2 days)",
        "Full agentic workflows",
        "Ongoing optimization",
      ],
    },
  ];

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading mb-6">
            <span className="text-foreground">THE AI</span>{" "}
            <span className="text-primary glow-green">ROADMAP</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            AI adoption doesn't happen all at once. It happens in three clear
            steps. We guide you through each one.
          </p>
        </div>

        {/* Process Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <Card
                key={index}
                className="bg-card/80 backdrop-blur-sm border-2 border-border hover:border-primary/50 transition-all duration-300 shadow-cyber group hover:scale-105 relative overflow-hidden"
              >
                {/* Stage Number Background */}
                <div className="absolute top-0 right-0 text-9xl font-heading text-primary/5 leading-none pr-4 pt-4">
                  {stage.number}
                </div>

                <CardContent className="p-8 space-y-6 relative z-10">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center border-2 border-primary/30 group-hover:bg-primary/20 group-hover:border-primary transition-all">
                    <Icon className="w-8 h-8 text-primary group-hover:glow-green" />
                  </div>

                  {/* Stage Number */}
                  <div className="text-sm font-heading text-primary/50">
                    STAGE {stage.number}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-heading text-primary group-hover:glow-green">
                    {stage.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {stage.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {stage.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>

                {/* Arrow Connector (hidden on mobile, shown on desktop for first two cards) */}
                {index < 2 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-20">
                    <ArrowRight className="w-8 h-8 text-primary/30" />
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary/10 font-semibold px-8 py-6"
            asChild
          >
            <Link to="/process">
              Explore The Process
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProcessOverview;
