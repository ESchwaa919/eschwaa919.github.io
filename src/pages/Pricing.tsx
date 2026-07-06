import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  ArrowRight,
  Calendar,
  Zap,
  Briefcase,
  Rocket,
  Users,
  Target,
  TrendingUp,
  Clock,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Pricing = () => {
  // Scroll reveal hooks
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal();
  const { ref: modelsRef, isVisible: modelsVisible } = useScrollReveal();
  const { ref: addonsRef, isVisible: addonsVisible } = useScrollReveal();
  const { ref: statsRef, isVisible: statsVisible } = useScrollReveal();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal();
  const consultingRates = [
    {
      label: "Daily", price: "£1,500", subtitle: "per day", highlighted: false,
      features: ["Focused consulting sessions", "Technical reviews & audits", "Ad-hoc problem solving"],
    },
    {
      label: "Weekly", price: "£5,000", subtitle: "per week", highlighted: true,
      features: ["Strategy sprints & deep dives", "Rapid prototyping", "Intensive implementation"],
    },
    {
      label: "Monthly", price: "£15,000", subtitle: "per month", highlighted: false,
      features: ["Fractional CAIO leadership", "Ongoing strategy & oversight", "Board presentations & governance"],
    },
  ];

  const trainingRates = [
    {
      label: "1-Day Workshop", price: "£5,000", subtitle: "full day", highlighted: false,
      features: ["AI literacy & fluency training", "Hands-on prompt engineering labs", "Up to 20 participants"],
    },
    {
      label: "2-Day Workshop", price: "£7,500", subtitle: "two days", highlighted: true,
      features: ["Everything in 1-day, plus:", "Build a working AI prototype", "Use case identification & prioritisation"],
    },
  ];

  const faqs = [
    {
      q: "How does your pricing work?",
      a: "We publish transparent standard rates — consulting at £1,500/day, £5,000/week, or £15,000/month and corporate training from £5,000. Engagement models (Strategy Sprints, Fractional CAIO, etc.) are scoped from these base rates. You always know the day rate behind any proposal.",
    },
    {
      q: "What's the smallest engagement you offer?",
      a: "A single consulting day at £1,500. Perfect for focused challenges, technical reviews, or initial assessments before larger commitments.",
    },
    {
      q: "Do you offer payment plans?",
      a: "Yes. For larger engagements, we offer milestone-based payment terms. For Fractional CAIO and Advisory Retainers, we invoice monthly.",
    },
    {
      q: "What if the project scope changes?",
      a: "We build flexibility into every engagement. If scope changes, we'll discuss options: adjust deliverables, phase work, or amend the agreement. You'll never be surprised by costs.",
    },
    {
      q: "Do you work with startups or only established companies?",
      a: "We work with both. For early-stage startups, we offer lighter-touch advisory and focused sprints. For established businesses, we provide comprehensive strategy and implementation support.",
    },
  ];

  const investStats = [
    { value: "40%", label: "Average ROI increase within 6 months of AI deployment" },
    { value: "60%", label: "Improvement in operational efficiency with AI automation" },
    { value: "85%", label: "Of executives say AI is critical to competitive advantage" },
  ];

  const heroBadges = ["SMB-friendly pricing", "No hidden costs", "Flexible payment terms", "ROI-focused"];

  // Engagement models
  const engagementModels = [
    {
      name: "Strategy Sprint",
      icon: Zap,
      tagline: "Fast-track your AI roadmap",
      description:
        "Intensive 2-4 week engagement to develop a complete AI strategy, governance framework, and 3-year implementation roadmap.",
      timeline: "2-4 weeks",
      deliverables: [
        "AI readiness assessment",
        "Board-ready AI strategy document",
        "3-year implementation roadmap with ROI projections",
        "Governance framework (ISO 42001 / NIST AI RMF)",
        "Technology stack recommendations",
        "Risk assessment and mitigation plan",
      ],
      bestFor: "Organizations needing executive-level AI strategy quickly",
      cta: "Discuss Strategy Sprint",
      color: "primary",
    },
    {
      name: "Fractional CAIO",
      icon: Briefcase,
      tagline: "Executive AI leadership, part-time",
      description:
        "Ongoing C-level AI leadership and strategic guidance. Perfect for organizations that need AI expertise but aren't ready for a full-time hire.",
      timeline: "3-12 months",
      deliverables: [
        "Weekly executive strategy sessions",
        "Board and investor presentations",
        "AI team leadership and mentorship",
        "Vendor evaluation and selection",
        "Governance and compliance oversight",
        "Quarterly business reviews with leadership",
      ],
      bestFor: "Growing companies building AI capabilities",
      cta: "Explore Fractional CAIO",
      color: "secondary",
    },
    {
      name: "Implementation Project",
      icon: Rocket,
      tagline: "From POC to production",
      description:
        "End-to-end implementation support for specific AI initiatives. From rapid prototyping to production deployment with full knowledge transfer.",
      timeline: "8-16 weeks",
      deliverables: [
        "Working proof-of-concept (2-4 weeks)",
        "Production-ready deployment",
        "MLOps and monitoring setup",
        "Complete documentation and runbooks",
        "Team training and knowledge transfer",
        "30-day post-launch support",
      ],
      bestFor: "Teams ready to implement specific AI solutions",
      cta: "Discuss Implementation",
      color: "primary",
    },
    {
      name: "Advisory Retainer",
      icon: Users,
      tagline: "Continuous expert support",
      description:
        "Monthly retainer for ongoing strategic guidance, technical reviews, team coaching, and ad-hoc problem-solving as your AI capabilities mature.",
      timeline: "Ongoing",
      deliverables: [
        "Monthly strategy and planning sessions",
        "Technical architecture reviews",
        "Team workshops and training",
        "Priority access for urgent consultations",
        "Quarterly capability assessments",
        "Access to expert network",
      ],
      bestFor: "Organizations scaling AI capabilities",
      cta: "Explore Retainer",
      color: "secondary",
    },
  ];

  // Add-on services
  const addons = [
    {
      name: "AI Assessment",
      description: "Comprehensive evaluation of AI readiness and maturity",
      duration: "1 week",
      icon: Target,
    },
    {
      name: "Technical Audit",
      description: "Deep-dive review of AI architecture and implementation",
      duration: "2 weeks",
      icon: TrendingUp,
    },
    {
      name: "Team Training",
      description: "Custom workshops for leadership, data teams, or developers",
      duration: "1-2 days",
      icon: Users,
    },
    {
      name: "Compliance Review",
      description: "ISO 42001, NIST AI RMF, or EU AI Act compliance assessment",
      duration: "1-2 weeks",
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <SEOHead
        title="AI Consulting Pricing | Flexible Engagement Models"
        description="Transparent AI consulting pricing with flexible engagement models. From Strategy Sprints to ongoing Fractional CAIO partnerships. Find the right fit for your AI journey."
        keywords="AI consulting pricing, fractional CAIO cost, AI strategy pricing, AI consulting rates, AI engagement models"
        canonicalUrl="/pricing"
      />
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-20 relative">
        {/* Subtle background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-secondary/5 rounded-full blur-3xl" />
        </div>

        <div
          ref={heroRef}
          className={`max-w-4xl mx-auto text-center space-y-6 relative z-10 transition-all duration-300 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {/* Slate */}
          <span className="kicker text-primary inline-block">
            Pricing — Transparent rates
          </span>

          <h1 className="title-scene">
            <span className="text-primary">Flexible engagement models</span>
            <span className="block text-foreground">for your journey.</span>
          </h1>
          <p className="lede max-w-2xl mx-auto">
            Transparent rates, flexible engagement models. Pick the structure
            that fits your needs — from a single consulting day to ongoing
            fractional leadership.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-6">
            {heroBadges.map((badge) => (
              <div key={badge} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standard Rates */}
      <section className="container mx-auto px-4 mb-24">
        <div
          ref={statsRef}
          className={`max-w-6xl mx-auto transition-all duration-300 ${
            statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {/* Consulting Rates */}
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-heading mb-4">
              <span className="text-foreground">CONSULTING </span>
              <span className="text-gradient-animate glow-green">RATES</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Strategy, implementation, advisory, and fractional CAIO leadership
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {consultingRates.map((rate) => (
              <Card key={rate.label} className={`card-enhanced group text-center hover:border-primary/50 ${rate.highlighted ? 'relative overflow-hidden' : ''}`}>
                {rate.highlighted && <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary to-primary/50" />}
                <CardContent className="p-8">
                  <div className="text-xs font-heading text-primary uppercase tracking-widest mb-4">{rate.label}</div>
                  <div className="text-5xl font-heading text-foreground mb-1">{rate.price}</div>
                  <div className="text-sm text-muted-foreground mb-6">{rate.subtitle}</div>
                  <ul className="space-y-2 text-sm text-muted-foreground text-left">
                    {rate.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Corporate Training Rates */}
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-heading mb-4">
              <span className="text-foreground">CORPORATE </span>
              <span className="text-gradient-animate glow-green">TRAINING</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              AI literacy workshops, hands-on labs, and leadership briefings
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {trainingRates.map((rate) => (
              <Card key={rate.label} className={`card-enhanced group text-center hover:border-secondary/50 ${rate.highlighted ? 'relative overflow-hidden' : ''}`}>
                {rate.highlighted && <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-secondary to-secondary/50" />}
                <CardContent className="p-8">
                  <div className="text-xs font-heading text-secondary uppercase tracking-widest mb-4">{rate.label}</div>
                  <div className="text-5xl font-heading text-foreground mb-1">{rate.price}</div>
                  <div className="text-sm text-muted-foreground mb-6">{rate.subtitle}</div>
                  <ul className="space-y-2 text-sm text-muted-foreground text-left">
                    {rate.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <section className="container mx-auto px-4 mb-24 section-glow">
        <div
          ref={modelsRef}
          className={`grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto transition-all duration-300 ${
            modelsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {engagementModels.map((model, index) => {
            const Icon = model.icon;
            return (
              <Card
                key={index}
                className={`card-enhanced group ${
                  model.color === "primary"
                    ? "hover:border-primary/50 hover:shadow-[0_0_40px_hsla(155,100%,45%,0.1)]"
                    : "hover:border-secondary/50 hover:shadow-[0_0_40px_hsla(320,85%,55%,0.1)]"
                }`}
              >
                <CardContent className="p-8">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className={`w-16 h-16 rounded-xl border flex items-center justify-center flex-shrink-0 transition-all ${
                        model.color === "primary"
                          ? "bg-primary/10 border-primary/30 group-hover:bg-primary/20 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_hsla(155,100%,45%,0.2)]"
                          : "bg-secondary/10 border-secondary/30 group-hover:bg-secondary/20 group-hover:border-secondary/50 group-hover:shadow-[0_0_20px_hsla(320,85%,55%,0.2)]"
                      }`}
                    >
                      <Icon
                        className={`w-8 h-8 ${
                          model.color === "primary"
                            ? "text-primary"
                            : "text-secondary"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-heading text-foreground mb-1">
                        {model.name}
                      </h3>
                      <p
                        className={`text-sm ${
                          model.color === "primary"
                            ? "text-primary"
                            : "text-secondary"
                        } font-semibold uppercase tracking-wide`}
                      >
                        {model.tagline}
                      </p>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {model.description}
                  </p>

                  {/* Timeline */}
                  <div className="mb-6 p-4 bg-background/50 rounded-lg border border-border">
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      Timeline
                    </div>
                    <div className="text-lg font-heading text-foreground">
                      {model.timeline}
                    </div>
                  </div>

                  {/* Deliverables */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">
                      What's Included
                    </h4>
                    <ul className="space-y-2">
                      {model.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2
                            className={`w-4 h-4 ${
                              model.color === "primary"
                                ? "text-primary"
                                : "text-secondary"
                            } flex-shrink-0 mt-0.5`}
                          />
                          <span className="text-sm text-muted-foreground">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Best For */}
                  <div className="mb-6 p-3 bg-card/50 rounded-lg border border-border">
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      Best For
                    </div>
                    <div className="text-sm text-foreground font-medium">
                      {model.bestFor}
                    </div>
                  </div>

                  {/* CTA */}
                  <Button
                    size="lg"
                    className={`w-full group/btn ${
                      model.color === "primary"
                        ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-cyber transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsla(155,100%,45%,0.4)] btn-shimmer"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-cyber transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsla(320,85%,55%,0.4)]"
                    } font-semibold py-6`}
                    asChild
                  >
                    <Link to="/contact">
                      {model.cta}
                      <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Add-On Services */}
      <section className="py-20 section-glow relative">
        <div
          ref={addonsRef}
          className={`container mx-auto px-4 transition-all duration-300 ${
            addonsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading mb-4">
              <span className="text-foreground">ADD-ON </span>
              <span className="text-gradient-animate glow-green">SERVICES</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Focused services to complement your main engagement
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {addons.map((addon, index) => {
              const Icon = addon.icon;
              return (
                <Card
                  key={index}
                  className="card-enhanced text-center group"
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 border border-primary/30 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-heading text-foreground mb-2 group-hover:text-primary transition-colors">
                      {addon.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                      {addon.description}
                    </p>
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{addon.duration}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Invest in AI Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading mb-4">
              <span className="text-primary glow-green">
                WHY INVEST IN AI NOW?
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {investStats.map((stat) => (
              <Card key={stat.value} className="bg-card border-2 border-border text-center">
                <CardContent className="p-6">
                  <div className="text-4xl font-heading text-primary mb-3">{stat.value}</div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-background to-card/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading mb-4">
              <span className="text-foreground">PRICING FAQ</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq) => (
              <Card key={faq.q} className="bg-card border-2 border-border">
                <CardContent className="p-6">
                  <h3 className="text-lg font-heading text-foreground mb-3">{faq.q}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 py-20">
        <div
          ref={ctaRef}
          className={`transition-all duration-300 ${
            ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="relative max-w-4xl mx-auto">
            {/* Cyber corners */}
            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-primary/60" />
            <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-primary/60" />
            <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-primary/60" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-primary/60" />

            <Card className="glass-card border border-primary/30 shadow-glow-card">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">
                  READY TO <span className="text-primary glow-green">DISCUSS YOUR NEEDS</span>?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Every engagement starts with a no-obligation 30-minute
                  consultation to understand your challenges and design the right
                  solution.
                </p>
                <Button
                  size="lg"
                  className="group relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-semibold px-10 py-6 shadow-cyber transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsla(155,100%,45%,0.4)] btn-shimmer"
                  asChild
                >
                  <Link to="/contact">
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Your Consultation
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <p className="text-sm text-muted-foreground mt-6">
                  No sales pitch • Just practical guidance • NDA available
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
