import { Card, CardContent } from "@/components/ui/card";
import { Quote, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const TrustSignals = () => {
  const testimonials = [
    {
      quote:
        "Erik helped us go from overwhelmed by AI hype to implementing real solutions that saved us 15 hours a week. Clear guidance, practical results.",
      author: "James Wilson",
      role: "Managing Director",
      company: "Mid-Market Professional Services",
      metric: "15hrs/week saved",
    },
    {
      quote:
        "Finally, an AI consultant who speaks our language. Erik cut through the jargon and delivered a roadmap we could actually execute on our budget.",
      author: "Sarah Thompson",
      role: "Operations Director",
      company: "Growing Tech Startup",
      metric: "ROI in 3 months",
    },
    {
      quote:
        "We went from AI-curious to AI-powered in 6 months. Erik's hands-on approach and enterprise experience gave us the confidence to move fast.",
      author: "Michael Chen",
      role: "Founder & CEO",
      company: "SMB Manufacturing",
      metric: "40% faster ops",
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Testimonials */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading mb-6">
              <span className="text-foreground">SOCIAL</span>{" "}
              <span className="text-primary glow-green">PROOF</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Here's what forward-looking business leaders say about working
              with Erik.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-card border-2 border-border hover:border-primary/50 transition-all shadow-cyber group"
              >
                <CardContent className="p-6 space-y-6">
                  <Quote className="w-10 h-10 text-primary/30 group-hover:text-primary/50 transition-colors" />

                  <p className="text-muted-foreground leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>

                  <div className="pt-4 border-t border-border">
                    <div className="text-lg font-heading text-primary mb-1">
                      {testimonial.metric}
                    </div>
                    <div className="font-semibold text-foreground">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                    <div className="text-xs text-muted-foreground/70">
                      {testimonial.company}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Trust Stats */}
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-cyber border-2 border-primary/20">
              <CardContent className="p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-4xl font-heading text-primary glow-green mb-2">
                      20+
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Years in AI & Search
                    </div>
                  </div>
                  <div>
                    <div className="text-4xl font-heading text-primary glow-green mb-2">
                      $100M+
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Projects Delivered
                    </div>
                  </div>
                  <div>
                    <div className="text-4xl font-heading text-secondary glow-pink mb-2">
                      3
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Fortune 500 Companies
                    </div>
                  </div>
                  <div>
                    <div className="text-4xl font-heading text-secondary glow-pink mb-2">
                      Global
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Enterprise Scale
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-6">
              Ready to see how AI can transform your business?
            </p>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary/10 font-semibold px-8 py-6"
              asChild
            >
              <Link to="/resources#assessment">
                Take the Free AI Readiness Assessment
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
