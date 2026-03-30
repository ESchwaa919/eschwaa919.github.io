import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GraduationCap, Map, Rocket, ArrowRight, ChevronRight } from "lucide-react";
import { useScrollReveal, useStaggeredReveal } from "@/hooks/useScrollReveal";

const ProcessOverview = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal({ threshold: 0.2 });
  const { containerRef, visibleItems } = useStaggeredReveal(3, { threshold: 0.1 });

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
      gradient: "from-primary/20 to-cyan-500/10",
      link: "/ai-literacy",
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
      gradient: "from-cyan-500/15 to-primary/15",
      link: "/ai-strategy",
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
      gradient: "from-primary/15 to-secondary/15",
      link: "/ai-implementation",
    },
  ];

  return (
    <section className="py-24 lg:py-32 relative section-glow">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 lg:mb-20 transition-all duration-300 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading mb-6">
            <span className="text-foreground">THE AI</span>{" "}
            <span className="text-gradient-animate glow-green">ROADMAP</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            AI adoption doesn't happen all at once. It happens in three clear
            steps. We guide you through each one.
          </p>
        </div>

        {/* Process Cards */}
        <div ref={containerRef} className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <div
                key={index}
                className={`group relative transition-all duration-300 ${
                  visibleItems[index]
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Card */}
                <div className="relative h-full glass-card-hover rounded-xl overflow-hidden">
                  {/* Gradient background on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${stage.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  {/* Stage Number Background */}
                  <div className="absolute top-0 right-0 text-[120px] lg:text-[150px] font-heading text-primary/[0.03] leading-none pr-4 select-none">
                    {stage.number}
                  </div>

                  {/* Content */}
                  <div className="relative p-6 lg:p-8 space-y-6 h-full flex flex-col">
                    {/* Icon */}
                    <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/40 group-hover:shadow-[0_0_20px_hsla(155,100%,45%,0.2)] transition-all duration-300">
                      <Icon className="w-7 h-7 lg:w-8 lg:h-8 text-primary group-hover:scale-110 transition-transform" />
                    </div>

                    {/* Stage Number */}
                    <div className="text-xs font-heading text-primary/60 tracking-widest">
                      STAGE {stage.number}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl lg:text-3xl font-heading text-primary group-hover:glow-green transition-all">
                      {stage.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed flex-grow">
                      {stage.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-3 pt-4 border-t border-border/50">
                      {stage.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center gap-3 text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary group-hover:shadow-[0_0_8px_hsla(155,100%,45%,0.6)] transition-all" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Deep dive link */}
                    <Link
                      to={stage.link}
                      className="inline-flex items-center gap-1 text-xs text-primary/60 hover:text-primary transition-colors mt-4 font-heading tracking-wider uppercase"
                    >
                      Deep dive <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  {/* Cyber corners */}
                  <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-primary/30 group-hover:border-primary/60 transition-colors" />
                  <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-primary/30 group-hover:border-primary/60 transition-colors" />
                  <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-primary/30 group-hover:border-primary/60 transition-colors" />
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-primary/30 group-hover:border-primary/60 transition-colors" />
                </div>

                {/* Arrow Connector */}
                {index < 2 && (
                  <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-8 h-8">
                    <ChevronRight className="w-6 h-6 text-primary/30 group-hover:text-primary/50 transition-colors" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div
          className={`text-center transition-all duration-300 delay-500 ${
            visibleItems[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <Button
            size="lg"
            variant="outline"
            className="group border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary font-semibold px-8 py-6 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_hsla(155,100%,45%,0.2)]"
            asChild
          >
            <Link to="/process">
              Explore The Process
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProcessOverview;
