import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Hotel,
  FileSearch,
  Pill,
  GraduationCap,
  TrendingUp,
  Clock,
  Target,
  Users,
} from "lucide-react";
import { useScrollReveal, useStaggeredReveal } from "@/hooks/useScrollReveal";

const partners = ["AI Collective", "Gen AI Academy", "Cognician", "HumAInity", "Impact IT"];

const stories = [
    {
      icon: Hotel,
      industry: "Hospitality Tech",
      challenge:
        "A hospitality analytics company was drowning in cancellation data but couldn't predict which bookings would be lost — costing hotels six figures annually in empty rooms.",
      approach:
        "We developed an AI strategy that prioritised cancellation prediction as the highest-ROI use case, built a predictive model, and deployed it into their existing analytics platform.",
      outcome: "25% reduction in no-shows",
      outcomeIcon: TrendingUp,
      stage: "Strategy → Implementation",
      link: "/ai-strategy",
    },
    {
      icon: FileSearch,
      industry: "Workplace Investigations",
      challenge:
        "A workplace investigations firm was spending 40+ hours per case manually reviewing thousands of documents to identify evidence patterns across complex employment cases.",
      approach:
        "We built an AI system that analyses document evidence, identifies patterns, and generates structured investigation reports — with human oversight at every decision point.",
      outcome: "70% faster case review",
      outcomeIcon: Clock,
      stage: "Implementation",
      link: "/ai-implementation",
    },
    {
      icon: Pill,
      industry: "Pharmaceutical Compliance",
      challenge:
        "Every piece of marketing content required manual compliance checks against FDA, EMA, and MHRA regulations. The medical-legal review bottleneck was costing weeks per campaign.",
      approach:
        "We deployed multi-agent AI with Veeva Vault integration that reviews content against regulatory requirements, with cryptographically-sealed audit trails for compliance.",
      outcome: "Reviews in seconds, not days",
      outcomeIcon: Clock,
      stage: "Implementation",
      link: "/ai-implementation",
    },
    {
      icon: GraduationCap,
      industry: "Construction & Education",
      challenge:
        "Leadership at a major UK construction firm were sceptical about AI. They needed to understand what was real vs. hype before committing budget to any initiatives.",
      approach:
        "Board-level AI literacy workshops tailored to their industry — covering supply chain optimisation, safety monitoring, and predictive maintenance with real-world examples they could relate to.",
      outcome: "15 use cases identified, strategy approved in 6 weeks",
      outcomeIcon: Target,
      stage: "Literacy → Strategy",
      link: "/ai-literacy",
    },
];

const ClientStories = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal({ threshold: 0.2 });
  const { containerRef: storiesRef, visibleItems: storiesVisible } = useStaggeredReveal(4, { threshold: 0.1 });

  return (
    <section className="py-24 lg:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[600px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[300px] bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 lg:mb-20 transition-all duration-700 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading mb-6">
            <span className="text-foreground">REAL WORK.</span>{" "}
            <span className="text-gradient-animate glow-green">REAL RESULTS.</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Every engagement follows our Literacy → Strategy → Implementation methodology.
            Here's what that looks like in practice.
          </p>
        </div>

        {/* Stories Grid */}
        <div ref={storiesRef} className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {stories.map((story, index) => {
            const StoryIcon = story.icon;
            const OutcomeIcon = story.outcomeIcon;
            return (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  storiesVisible[index]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <Card className="card-enhanced group h-full">
                  <CardContent className="p-8 h-full flex flex-col">
                    {/* Industry Header */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/30 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all">
                        <StoryIcon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-xs text-primary font-heading uppercase tracking-wider">
                          {story.industry}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {story.stage}
                        </div>
                      </div>
                    </div>

                    {/* Challenge */}
                    <div className="mb-4">
                      <div className="text-xs font-heading text-secondary uppercase tracking-wider mb-2">
                        The Challenge
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {story.challenge}
                      </p>
                    </div>

                    {/* Approach */}
                    <div className="mb-6 flex-grow">
                      <div className="text-xs font-heading text-primary uppercase tracking-wider mb-2">
                        What We Built
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {story.approach}
                      </p>
                    </div>

                    {/* Outcome */}
                    <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <OutcomeIcon className="w-5 h-5 text-primary" />
                        <span className="text-sm font-heading text-primary">
                          {story.outcome}
                        </span>
                      </div>
                      <Link
                        to={story.link}
                        className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                      >
                        Learn more <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Partners */}
        <div className="text-center">
          <p className="text-xs font-heading text-muted-foreground uppercase tracking-widest mb-4">
            Partner Ecosystem
          </p>
          <div className="flex flex-wrap gap-6 justify-center items-center text-sm text-muted-foreground">
            {partners.map((name) => (
              <span key={name} className="px-4 py-2 rounded-full border border-border/50 hover:border-primary/30 transition-colors">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientStories;
