import {
  Building2,
  Rocket,
  Users,
  Wrench,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useScrollReveal, useStaggeredReveal } from "@/hooks/useScrollReveal";

const WhyWorkWithErik = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal({ threshold: 0.2 });
  const { containerRef: reasonsRef, visibleItems: reasonsVisible } = useStaggeredReveal(4, { threshold: 0.1 });
  const { ref: diffRef, isVisible: diffVisible } = useScrollReveal({ threshold: 0.2 });

  const reasons = [
    {
      icon: Building2,
      title: "Enterprise-Proven Experience",
      description:
        "Twenty years leading search, discovery, and AI at Microsoft, Comcast, and Elsevier — then bringing that enterprise-grade thinking to businesses that don't have Fortune 500 budgets but deserve Fortune 500 results.",
      gradient: "from-primary/20 via-transparent to-transparent",
    },
    {
      icon: Rocket,
      title: "Proven Results",
      description:
        "25% reduction in hotel no-shows through AI prediction. 70% faster workplace investigation reviews. Pharma compliance reviews in seconds instead of days. Real outcomes, not slide decks.",
      gradient: "from-cyan-500/15 via-transparent to-transparent",
    },
    {
      icon: Users,
      title: "Trusted Advisor",
      description:
        "From board-level AI literacy for construction firms and universities to hands-on coaching for startup founders. Clients stay because the advice works — and the relationship lasts beyond the project.",
      gradient: "from-secondary/15 via-transparent to-transparent",
    },
    {
      icon: Wrench,
      title: "Hands-On Builder",
      description:
        "Not just strategy — I write production code. A coaching platform shipped in 12 weeks with kiosk mode for frontline workers. A document analysis AI now handles thousands of cases. I build what I recommend.",
      gradient: "from-primary/15 via-transparent to-transparent",
    },
  ];

  const differentiators = [
    "No hype. No jargon. Just practical, grounded AI consulting.",
    "Evidence-based strategy backed by 20+ years of real-world implementation.",
    "Rapid prototyping: See working solutions in days, not months.",
    "SMB-focused: AI adoption tailored for your business size and budget.",
  ];

  return (
    <section className="py-24 lg:py-32 relative section-glow">
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 lg:mb-20 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading mb-6">
            <span className="text-foreground">WHY WORK WITH</span>{" "}
            <span className="text-gradient-animate glow-green">ERIK</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Get AI done right with an expert who's built at enterprise scale
            and delivers for businesses like yours.
          </p>
        </div>

        {/* Reasons Grid */}
        <div ref={reasonsRef} className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-700 ${
                reasonsVisible[index]
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative h-full glass-card-hover rounded-xl overflow-hidden">
                {/* Gradient accent on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${reason.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative p-6 lg:p-8 space-y-5">
                  {/* Icon */}
                  <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/40 group-hover:shadow-[0_0_25px_hsla(155,100%,45%,0.25)] transition-all duration-300">
                    <reason.icon className="w-7 h-7 lg:w-8 lg:h-8 text-primary group-hover:scale-110 transition-transform" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl lg:text-3xl font-heading text-primary group-hover:glow-green transition-all">
                    {reason.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {reason.description}
                  </p>
                </div>

                {/* Cyber corners */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-primary/20 group-hover:border-primary/50 transition-colors" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-primary/20 group-hover:border-primary/50 transition-colors" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-primary/20 group-hover:border-primary/50 transition-colors" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-primary/20 group-hover:border-primary/50 transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* What Makes This Different */}
        <div
          ref={diffRef}
          className={`max-w-4xl mx-auto transition-all duration-700 ${
            diffVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="relative glass-card rounded-2xl overflow-hidden">
            {/* Gradient border effect */}
            <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-primary/40 via-cyan-500/20 to-secondary/40">
              <div className="absolute inset-[1px] rounded-2xl bg-card" />
            </div>

            <div className="relative p-6 lg:p-10">
              <h3 className="text-2xl lg:text-3xl font-heading text-primary glow-green mb-8 text-center">
                WHAT MAKES THIS DIFFERENT
              </h3>

              <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
                {differentiators.map((item, index) => (
                  <div
                    key={index}
                    className="group flex items-start gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-10">
                <Button
                  size="lg"
                  variant="outline"
                  className="group border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary font-semibold px-8 py-6 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_hsla(155,100%,45%,0.2)]"
                  asChild
                >
                  <Link to="/about">
                    Learn More About Erik's Approach
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWorkWithErik;
