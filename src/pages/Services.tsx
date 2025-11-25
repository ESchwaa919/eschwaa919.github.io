import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Lightbulb,
  Code,
  Users,
  Wrench,
  ArrowRight,
  CheckCircle2,
  Brain,
  GraduationCap,
  Target,
  Rocket,
  Calendar,
} from "lucide-react";

const Services = () => {
  // Core service offerings
  const coreServices = [
    {
      icon: Lightbulb,
      title: "Strategic Guidance & Fractional CAIO",
      tagline: "Enterprise-grade AI leadership without the full-time commitment",
      description:
        "Board-approved AI strategy, governance frameworks, and executive leadership that bridges the boardroom and development floor.",
      benefits: [
        "Complete AI strategy delivered in 90 days",
        "3-year investment plan with quantified ROI",
        "Governance frameworks (FDA, EMA, ISO 42001, NIST AI RMF)",
        "Accelerate investor confidence and enterprise sales",
      ],
      cta: "Explore Strategic Services",
      link: "#strategic",
    },
    {
      icon: Code,
      title: "AI Implementation & Consulting",
      tagline: "From proof-of-concept to production deployment",
      description:
        "Hands-on implementation support, production-ready code, and comprehensive knowledge transfer so your team maintains the solution long-term.",
      benefits: [
        "Rapid POC development (2-4 weeks)",
        "Production deployment with MLOps and monitoring",
        "LLM integration, RAG architectures, custom ML models",
        "Full documentation, runbooks, and team training",
      ],
      cta: "Explore Implementation",
      link: "#implementation",
    },
    {
      icon: Users,
      title: "Expert Network & Community",
      tagline: "Access world-class AI specialists and practitioners",
      description:
        "Connect with pre-vetted AI experts across strategy, implementation, data science, ML engineering, and governance. Join a thriving community of AI leaders.",
      benefits: [
        "200+ vetted AI specialists across all domains",
        "48-hour introductions to the right expert",
        "Monthly roundtables and peer learning sessions",
        "Knowledge repository with frameworks and case studies",
      ],
      cta: "Explore Expert Network",
      link: "#expert-network",
    },
    {
      icon: Wrench,
      title: "Focused Consulting Sessions",
      tagline: "Expert guidance for specific challenges",
      description:
        "1:1 consultations, technical audits, compliance reviews, and custom problem-solving sessions. Get expert advice without long-term commitments.",
      benefits: [
        "1:1 expert consultations on any AI challenge",
        "Technical audits and architecture reviews",
        "Compliance reviews (ISO 42001, NIST AI RMF, EU AI Act)",
        "Team workshops and hands-on training",
      ],
      cta: "Explore Focused Services",
      link: "#focused",
    },
  ];

  // Featured product offerings
  const products = [
    {
      name: "AutoMLR",
      tagline: "Multi-Agent Medical Legal Review Automation",
      description:
        "Transform pharmaceutical compliance workflows with AI-powered review. 90% faster approvals with seamless Veeva Vault integration and regulatory compliance across all major markets.",
      metrics: [
        { value: "90%", label: "Faster Approvals" },
        { value: "15s", label: "Average Latency" },
        { value: "24/7", label: "Availability" },
      ],
      features: [
        "Native Veeva Vault integration",
        "FDA, EMA, MHRA, PMDA compliance",
        "Multi-agent AI with human oversight",
        "Cryptographically-sealed audit trails",
      ],
      cta: "Learn More About AutoMLR",
      link: "/automlr",
      gradient: "from-emerald-600 to-teal-600",
    },
    {
      name: "AILMS",
      tagline: "AI Enrichment for Learning Management Systems",
      description:
        "Transform static courses into dynamic, personalized learning journeys. Adaptive pathways, interactive experiences, and smart content discovery that boost engagement and retention.",
      metrics: [
        { value: "70%", label: "Higher Engagement" },
        { value: "30%", label: "Faster Completion" },
        { value: "85%", label: "Better Retention" },
      ],
      features: [
        "Seamless LMS integration (Canvas, Moodle, Blackboard)",
        "Personalized learning paths for each student",
        "Interactive quizzes, simulations, and study guides",
        "GDPR, FERPA, and COPPA compliant",
      ],
      cta: "Learn More About AILMS",
      link: "/ailms",
      gradient: "from-green-600 to-blue-600",
    },
  ];

  // Service delivery model
  const deliveryModels = [
    {
      icon: Brain,
      title: "Project-Based",
      description:
        "Fixed-scope engagements with clear deliverables. Perfect for specific initiatives like AI strategy development or POC implementation.",
    },
    {
      icon: GraduationCap,
      title: "Fractional CAIO",
      description:
        "Ongoing executive leadership on a part-time basis. Get C-level AI expertise without the full-time commitment.",
    },
    {
      icon: Target,
      title: "Retainer",
      description:
        "Monthly retainer for continuous support, advisory, and implementation assistance as your AI capabilities mature.",
    },
    {
      icon: Rocket,
      title: "Custom Engagements",
      description:
        "Bespoke arrangements tailored to your unique needs, timeline, and budget. We design the engagement that works for you.",
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-heading leading-tight">
            <span className="text-primary glow-green">AI EXPERTISE</span>
            <br />
            <span className="text-foreground">
              ACROSS EVERY STAGE OF YOUR JOURNEY
            </span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            From initial strategy to production deployment, we provide the
            guidance, implementation support, and expert network you need to
            become AI-powered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-green text-lg font-semibold px-10 py-6 shadow-cyber"
              asChild
            >
              <Link to="/contact">
                <Calendar className="w-5 h-5 mr-2" />
                Book a Consultation
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary/10 text-lg font-semibold px-10 py-6"
              asChild
            >
              <a href="/ai-assessment.html">
                Take AI Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Core Services Grid */}
      <section className="container mx-auto px-4 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading mb-4">
            <span className="text-primary glow-green">CORE SERVICES</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive AI capabilities tailored to your organization's
            maturity level and specific needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {coreServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="bg-card border-2 border-border hover:border-primary/50 transition-all shadow-cyber hover:shadow-cyber-lg group"
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:glow-green transition-all">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-heading text-foreground mb-2">
                        {service.title}
                      </h3>
                      <p className="text-sm text-primary font-semibold uppercase tracking-wide">
                        {service.tagline}
                      </p>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-3 mb-6">
                    {service.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant="outline"
                    className="w-full border-2 border-primary text-primary hover:bg-primary/10 font-semibold"
                    asChild
                  >
                    <a href={service.link}>
                      {service.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gradient-to-br from-background to-card/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading mb-4">
              <span className="text-secondary glow-pink">
                SPECIALIZED PRODUCTS
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Purpose-built AI solutions for pharmaceutical compliance and
              education technology
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 max-w-7xl mx-auto">
            {products.map((product, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-card to-background border-2 border-border hover:border-secondary/50 transition-all shadow-cyber-lg overflow-hidden group h-full flex flex-col"
              >
                <div
                  className={`h-2 bg-gradient-to-r ${product.gradient}`}
                ></div>
                <CardContent className="p-10 flex-1 flex flex-col">
                  <h3 className="text-3xl font-heading text-foreground mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-secondary font-semibold uppercase tracking-wide mb-4">
                    {product.tagline}
                  </p>

                  <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
                    {product.description}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-8 p-6 bg-background/50 rounded-lg border border-border">
                    {product.metrics.map((metric, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-3xl font-heading text-primary mb-1">
                          {metric.value}
                        </div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wide">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-grow">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    size="lg"
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 glow-pink font-semibold py-6 shadow-cyber"
                    asChild
                  >
                    <a href={product.link}>
                      {product.cta}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Delivery Models */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading mb-4">
            <span className="text-primary glow-green">
              FLEXIBLE ENGAGEMENT MODELS
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We adapt to your needs, timeline, and budget. No one-size-fits-all
            packages.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {deliveryModels.map((model, index) => {
            const Icon = model.icon;
            return (
              <Card
                key={index}
                className="bg-card border-2 border-border hover:border-primary/30 transition-all text-center group"
              >
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:glow-green transition-all">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading text-foreground mb-3">
                    {model.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {model.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Not sure which engagement model fits your needs?
          </p>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary/10 font-semibold px-10 py-6"
            asChild
          >
            <Link to="/pricing">
              View Pricing & Packages
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* The Process Link */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-cyber border-2 border-primary shadow-cyber-lg">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">
              READY TO START YOUR AI JOURNEY?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our proven 3-stage process takes you from AI-curious to
              AI-powered: Literacy → Strategy → Implementation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 glow-green text-lg font-semibold px-10 py-6 shadow-cyber"
                asChild
              >
                <Link to="/process">
                  Explore The Process
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary/10 text-lg font-semibold px-10 py-6"
                asChild
              >
                <Link to="/contact">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Strategy Call
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Services;
