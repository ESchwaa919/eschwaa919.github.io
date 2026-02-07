import { Quote, ArrowRight, Star, TrendingUp, Clock, Zap, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useScrollReveal, useStaggeredReveal } from "@/hooks/useScrollReveal";

const TrustSignals = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal({ threshold: 0.2 });
  const { containerRef: testimonialsRef, visibleItems: testimonialsVisible } = useStaggeredReveal(4, { threshold: 0.1 });
  const { ref: statsRef, isVisible: statsVisible } = useScrollReveal({ threshold: 0.3 });

  const testimonials = [
    {
      quote:
        "Erik completely transformed my perspective on what's possible with AI. He has a remarkable gift for unpacking complex technical subjects and making them accessible to everyone.",
      author: "Jason Keen",
      role: "Founder",
      company: "The Aspirational Company",
      metric: "Perspective shift",
      metricIcon: TrendingUp,
    },
    {
      quote:
        "Erik's expertise and skill at communicating it are remarkable. I wasn't even AI-curious when I took his course—more like AI-fearful! What he guided me to creating was astonishing.",
      author: "Ann Binnie",
      role: "Workshop Graduate",
      company: "Ship an App in a Day",
      metric: "Fear → Confidence",
      metricIcon: Zap,
    },
    {
      quote:
        "Such a productive and inspirational day. It's so refreshing to leave a workshop with something to show for all your efforts. Highly recommended, even for non-techies like me.",
      author: "Andrew Smith",
      role: "Workshop Graduate",
      company: "Ship an App in a Day",
      metric: "Built in 1 day",
      metricIcon: Clock,
    },
    {
      quote:
        "I had the good fortune to choose Erik Schwartz as my AI expert, and he has exceeded my expectations from the very start. Erik brings an exceptional level of expertise in AI and consistently delivers exactly what he commits to. What truly sets Erik apart is the care and effort he puts into understanding my objectives.",
      author: "James Knight",
      role: "Founder",
      company: "iMA Technologies",
      metric: "Exceeds expectations",
      metricIcon: Award,
    },
  ];

  const stats = [
    { value: "20+", label: "Years in AI & Search", color: "primary" },
    { value: "$100M+", label: "Projects Delivered", color: "primary" },
    { value: "3", label: "Fortune 500 Companies", color: "secondary" },
    { value: "Global", label: "Enterprise Scale", color: "secondary" },
  ];

  return (
    <section className="py-24 lg:py-32 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[250px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 lg:mb-20 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading mb-6">
            <span className="text-foreground">SOCIAL</span>{" "}
            <span className="text-gradient-animate glow-green">PROOF</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Here's what forward-looking business leaders say about working
            with Erik.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div ref={testimonialsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {testimonials.map((testimonial, index) => {
            const MetricIcon = testimonial.metricIcon;
            return (
              <div
                key={index}
                className={`group relative transition-all duration-700 ${
                  testimonialsVisible[index]
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Card */}
                <div className="relative h-full glass-card-hover rounded-xl overflow-hidden">
                  {/* Accent line at top */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent group-hover:via-primary transition-all" />

                  <div className="p-6 lg:p-8 space-y-6 h-full flex flex-col">
                    {/* Quote Icon */}
                    <div className="flex items-center justify-between">
                      <Quote className="w-10 h-10 text-primary/20 group-hover:text-primary/40 transition-colors" />
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-primary/60 fill-primary/60"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Quote Text */}
                    <blockquote className="text-foreground/80 leading-relaxed italic flex-grow">
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Author Info */}
                    <div className="pt-4 border-t border-border/50 space-y-3">
                      {/* Metric Badge */}
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                        <MetricIcon className="w-4 h-4 text-primary" />
                        <span className="text-sm font-heading text-primary">
                          {testimonial.metric}
                        </span>
                      </div>

                      <div>
                        <div className="font-semibold text-foreground">
                          {testimonial.author}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </div>
                        <div className="text-xs text-muted-foreground/60">
                          {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cyber corners */}
                  <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-primary/20 group-hover:border-primary/40 transition-colors" />
                  <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-primary/20 group-hover:border-primary/40 transition-colors" />
                  <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-primary/20 group-hover:border-primary/40 transition-colors" />
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-primary/20 group-hover:border-primary/40 transition-colors" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Bar */}
        <div
          ref={statsRef}
          className={`max-w-5xl mx-auto transition-all duration-700 ${
            statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="relative glass-card rounded-2xl overflow-hidden">
            {/* Gradient border effect */}
            <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-primary/30 via-cyan-500/20 to-secondary/30">
              <div className="absolute inset-[1px] rounded-2xl bg-card" />
            </div>

            <div className="relative p-6 md:p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="text-center group"
                    style={{
                      animationDelay: statsVisible ? `${index * 100}ms` : '0ms',
                    }}
                  >
                    <div
                      className={`text-4xl lg:text-5xl font-heading mb-2 ${
                        stat.color === 'primary'
                          ? 'text-primary glow-green'
                          : 'text-secondary glow-pink'
                      } transition-all group-hover:scale-110`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          className={`text-center mt-12 transition-all duration-700 delay-300 ${
            statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-muted-foreground mb-6">
            Ready to see how AI can transform your business?
          </p>
          <Button
            size="lg"
            variant="outline"
            className="group border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary font-semibold px-8 py-6 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_hsla(155,100%,45%,0.2)]"
            asChild
          >
            <Link to="/resources#assessment">
              Take the Free AI Readiness Assessment
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
