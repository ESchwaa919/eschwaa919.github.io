import {
  Building2,
  Rocket,
  Users,
  Wrench,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const WhyWorkWithErik = () => {
  const reasons = [
    {
      icon: Building2,
      title: "Enterprise-Proven Experience",
      description:
        "Twenty years leading search, discovery, and AI at Microsoft, Comcast, Elsevier. Built systems at global scale.",
    },
    {
      icon: Rocket,
      title: "Proven Results",
      description:
        "Track record building enterprise-scale AI platforms that deliver measurable business outcomes and ROI.",
    },
    {
      icon: Users,
      title: "Trusted Advisor",
      description:
        "Trusted advisor to SMBs and mid-market leaders navigating AI adoption with confidence and clarity.",
    },
    {
      icon: Wrench,
      title: "Hands-On Builder",
      description:
        "Not just strategy. Hands-on builder who ships working solutions fast—from prototype to production.",
    },
  ];

  const differentiators = [
    "No hype. No jargon. Just practical, grounded AI consulting.",
    "Evidence-based strategy backed by 20+ years of real-world implementation.",
    "Rapid prototyping: See working solutions in days, not months.",
    "SMB-focused: AI adoption tailored for your business size and budget.",
  ];

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-cyber opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading mb-6">
            <span className="text-foreground">WHY WORK WITH</span>{" "}
            <span className="text-primary glow-green">ERIK</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get AI done right with an expert who's built at enterprise scale
            and delivers for businesses like yours.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {reasons.map((reason, index) => (
            <Card
              key={index}
              className="bg-card/80 backdrop-blur-sm border-2 border-border hover:border-primary/50 transition-all duration-300 shadow-cyber group hover:scale-105"
            >
              <CardContent className="p-8 space-y-4">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center border-2 border-primary/30 group-hover:bg-primary/20 group-hover:border-primary transition-all">
                  <reason.icon className="w-7 h-7 text-primary group-hover:glow-green" />
                </div>

                <h3 className="text-2xl font-heading text-primary group-hover:glow-green">
                  {reason.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  {reason.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* What Makes This Different */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card border-2 border-primary/30 shadow-cyber">
            <CardContent className="p-8">
              <h3 className="text-2xl font-heading text-primary mb-6 text-center">
                WHAT MAKES THIS DIFFERENT
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                {differentiators.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary/10 font-semibold px-8 py-6"
                  asChild
                >
                  <Link to="/about">
                    Learn More About Erik's Approach
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WhyWorkWithErik;
