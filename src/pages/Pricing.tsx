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

const Pricing = () => {
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
      <section className="container mx-auto px-4 mb-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-heading leading-tight">
            <span className="text-primary glow-green">FLEXIBLE ENGAGEMENT</span>
            <br />
            <span className="text-foreground">MODELS FOR YOUR JOURNEY</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            No one-size-fits-all packages. We design engagements around your
            specific needs, timeline, and budget.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>SMB-friendly pricing</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>No hidden costs</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>Flexible payment terms</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>ROI-focused</span>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <section className="container mx-auto px-4 mb-24">
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {engagementModels.map((model, index) => {
            const Icon = model.icon;
            return (
              <Card
                key={index}
                className={`bg-card border-2 ${
                  model.color === "primary"
                    ? "border-primary/50"
                    : "border-secondary/50"
                } shadow-cyber-lg hover:shadow-cyber-xl transition-all group`}
              >
                <CardContent className="p-8">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className={`w-16 h-16 rounded-full ${
                        model.color === "primary"
                          ? "bg-primary/10"
                          : "bg-secondary/10"
                      } flex items-center justify-center flex-shrink-0 ${
                        model.color === "primary"
                          ? "group-hover:glow-green"
                          : "group-hover:glow-pink"
                      } transition-all`}
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
                    className={`w-full ${
                      model.color === "primary"
                        ? "bg-primary text-primary-foreground hover:bg-primary/90 glow-green"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/90 glow-pink"
                    } font-semibold py-6 shadow-cyber`}
                    asChild
                  >
                    <Link to="/contact">
                      {model.cta}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Add-On Services */}
      <section className="py-20 bg-gradient-to-br from-background to-card/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading mb-4">
              <span className="text-foreground">ADD-ON SERVICES</span>
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
                  className="bg-card border-2 border-border hover:border-primary/30 transition-all text-center"
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-heading text-foreground mb-2">
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
            <Card className="bg-card border-2 border-border text-center">
              <CardContent className="p-6">
                <div className="text-4xl font-heading text-primary mb-3">
                  40%
                </div>
                <p className="text-sm text-muted-foreground">
                  Average ROI increase within 6 months of AI deployment
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-2 border-border text-center">
              <CardContent className="p-6">
                <div className="text-4xl font-heading text-primary mb-3">
                  60%
                </div>
                <p className="text-sm text-muted-foreground">
                  Improvement in operational efficiency with AI automation
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-2 border-border text-center">
              <CardContent className="p-6">
                <div className="text-4xl font-heading text-primary mb-3">
                  85%
                </div>
                <p className="text-sm text-muted-foreground">
                  Of executives say AI is critical to competitive advantage
                </p>
              </CardContent>
            </Card>
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
            <Card className="bg-card border-2 border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-heading text-foreground mb-3">
                  Why don't you have fixed package pricing?
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every organization's AI needs are unique. Fixed packages lead
                  to either overpaying for services you don't need or
                  underpaying for insufficient scope. We design each engagement
                  around your specific challenges, goals, and budget.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-2 border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-heading text-foreground mb-3">
                  What's the smallest engagement you offer?
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  We offer focused 1-day workshops and consultations. Perfect
                  for specific challenges or initial assessments before larger
                  commitments.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-2 border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-heading text-foreground mb-3">
                  Do you offer payment plans?
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Yes. For larger engagements, we offer milestone-based
                  payment terms. For Fractional CAIO and Advisory Retainers,
                  we invoice monthly.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-2 border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-heading text-foreground mb-3">
                  What if the project scope changes?
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  We build flexibility into every engagement. If scope changes,
                  we'll discuss options: adjust deliverables, phase work, or
                  amend the agreement. You'll never be surprised by costs.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-2 border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-heading text-foreground mb-3">
                  Do you work with startups or only established companies?
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  We work with both. For early-stage startups, we offer
                  lighter-touch advisory and focused sprints. For established
                  businesses, we provide comprehensive strategy and
                  implementation support.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-cyber border-2 border-primary shadow-cyber-lg">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">
              READY TO DISCUSS YOUR NEEDS?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Every engagement starts with a no-obligation 30-minute
              consultation to understand your challenges and design the right
              solution.
            </p>
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-green text-lg font-semibold px-10 py-6 shadow-cyber"
              asChild
            >
              <Link to="/contact">
                <Calendar className="w-5 h-5 mr-2" />
                Book Your Consultation
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground mt-6">
              No sales pitch • Just practical guidance • NDA available
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Pricing;
