import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Video,
  Wrench,
  Download,
  ArrowRight,
  ExternalLink,
  FileText,
  TrendingUp,
  Brain,
  Lightbulb,
  Target,
  CheckCircle2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

const Resources = () => {
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState<string>("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDownloadClick = (resourceTitle: string) => {
    setSelectedResource(resourceTitle);
    setShowDownloadModal(true);
  };

  const handleDownloadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Initialize EmailJS
      emailjs.init("oI6t4dwMhBXNaBKXo");

      // Send email using EmailJS
      await emailjs.send(
        "theaiexpert_assessment",
        "template_dmkjg71",
        {
          from_name: name,
          from_email: email,
          company: "Not specified",
          downloaded_resource: selectedResource,
          download_date: new Date().toLocaleString(),
          lead_type: "Resource Download",
          lead_source: "Website Resources Page",
        }
      );

      console.log("✅ Download notification email sent successfully!");

      toast.success("Download link sent to your email!");
      setShowDownloadModal(false);
      setEmail("");
      setName("");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowDownloadModal(false);
    setEmail("");
    setName("");
  };
  // Featured insights/articles
  const insights = [
    {
      title: "AI Execution Playbook for SMBs",
      category: "Strategy",
      description:
        "Turning AI hype into measurable ROI without a Fortune 500 budget. A practical roadmap for small and medium businesses ready to implement AI successfully.",
      link: "https://www.linkedin.com/pulse/ai-execution-playbook-smbs-turning-hype-roi-without-fortune-schwartz-76y6e/",
      icon: Target,
    },
    {
      title: "A Leader's Journey to AI Adoption",
      category: "Leadership",
      description:
        "Real-world insights from leadership experiences in AI transformation. Navigate the challenges and opportunities of leading your organization through AI adoption.",
      link: "https://www.linkedin.com/posts/eschwaa_a-leaders-journey-to-ai-adoption-activity-7325771625394565120-LNsR",
      icon: Brain,
    },
    {
      title: "AI Workforce Revolution by 2045",
      category: "Future of Work",
      description:
        "How jobs, teams, and leadership will transform over the next two decades. Prepare your organization for the AI-driven future of work.",
      link: "https://www.linkedin.com/pulse/ai-workforce-revolution-how-jobs-teams-leadership-2045-erik-schwartz-bdn3e",
      icon: TrendingUp,
    },
    {
      title: "AI in Healthcare: Overcoming Innovation Barriers",
      category: "Research",
      description:
        "Strategic framework for integrating AI into healthcare systems. Co-authored research examining barriers to innovation and evidence-based solutions for AI adoption in the NHS.",
      link: "https://thecsbr.com/research/",
      icon: CheckCircle2,
    },
  ];

  // Featured tools
  const tools = [
    {
      name: "AI Readiness Assessment",
      description:
        "Take our 10-minute interactive assessment to understand your organization's AI maturity across strategy, technology, data, and culture.",
      icon: Brain,
      cta: "Take Assessment",
      link: "/ai-assessment",
      color: "primary",
    },
    {
      name: "ROI Calculator",
      description:
        "Estimate the potential return on investment from AI implementation based on your industry, use case, and business metrics.",
      icon: TrendingUp,
      cta: "Calculate ROI",
      link: "/roi-calculator",
      color: "secondary",
    },
    {
      name: "Prompt Fluency Toolkit",
      description:
        "Master the art of prompt engineering with our comprehensive toolkit. Learn best practices, frameworks, and techniques for effective AI interactions.",
      icon: Lightbulb,
      cta: "Explore Toolkit",
      link: "/promptfluency/",
      color: "primary",
    },
    {
      name: "AI Learning Path Generator",
      description:
        "Get a personalized AI learning path tailored to your role, industry, and learning preferences. From AI basics to advanced implementation.",
      icon: BookOpen,
      cta: "Generate Path",
      link: "/ai-learning/",
      color: "secondary",
    },
    {
      name: "Skills Assessment",
      description:
        "Evaluate your AI skills and capabilities across different domains. Identify strengths and areas for development.",
      icon: Target,
      cta: "Assess Skills",
      link: "/skills/",
      color: "primary",
    },
  ];

  // Downloadable resources
  const downloads = [
    {
      title: "The AI Execution Playbook for SMBs",
      type: "PDF",
      description:
        "Practical roadmap for small and medium businesses to turn AI hype into measurable ROI without Fortune 500 budgets.",
      size: "2.4 MB",
      icon: FileText,
      file: "The-AI-Execution-Playbook-for-SMBs.pdf",
    },
    {
      title: "AI Expert Methodology Guide",
      type: "PDF",
      description:
        "Comprehensive methodology for implementing AI successfully in your organization. From assessment to execution.",
      size: "1.8 MB",
      icon: Target,
      file: "The AI Expert Methodology Guide.pdf",
    },
    {
      title: "The AI-Infused Business: A Leader's Journey",
      type: "PDF",
      description:
        "Real-world insights from leadership experiences in AI transformation. Navigate challenges and opportunities of AI adoption.",
      size: "1.5 MB",
      icon: Brain,
      file: "The-AI-Infused-Business-A-Leaders-Journey-to-AI-Adoption.pdf",
    },
    {
      title: "AI and the Future of Work",
      type: "PDF",
      description:
        "Research paper examining how jobs, teams, and leadership will transform by 2045. Comprehensive analysis of the AI-driven workplace.",
      size: "2.1 MB",
      icon: TrendingUp,
      file: "AI and the Future of Work.pdf",
    },
    {
      title: "The AI Competency Matrix",
      type: "PDF",
      description:
        "Comprehensive framework for assessing and developing AI capabilities across your organization at every level.",
      size: "850 KB",
      icon: CheckCircle2,
      file: "The AI Competency Matrix.pdf",
    },
    {
      title: "The Dawn of Intelligence as Infrastructure",
      type: "Document",
      description:
        "Deep dive into how AI is becoming the foundational infrastructure layer for modern businesses and organizations.",
      size: "1.2 MB",
      icon: Lightbulb,
      file: "The Dawn of Intelligence as Infrastructure.docx",
    },
  ];

  // Media appearances
  const media = [
    {
      type: "Video",
      title: "NHS 10-Year AI Plan: From Ambition to Reality",
      outlet: "YouTube",
      description:
        "Erik and James Morris react to the NHS 10-Year Health Plan, exploring the UK's vision for AI-enabled hospitals, innovation zones, and healthcare transformation.",
      link: "https://youtu.be/i_vUPfW6ssg",
      date: "Jan 2025",
    },
    {
      type: "Podcast",
      title: "AI Horizons: Predictions for 2025",
      outlet: "Amazon Music Podcast",
      description:
        "Expert predictions and strategic insights into the future of AI technology. Discussing emerging trends, business implications, and key developments to watch.",
      link: "https://music.amazon.com/podcasts/a408a0af-eb75-4497-bac7-ba712b0366ce/episodes/18b22def-13e9-4a33-b123-ae4be936513f/eden-smith-ai-horizons-erik-schwartz-on-ai-predictions-for-2025",
      date: "Jan 2025",
    },
    {
      type: "Video",
      title: "Aligning AI to Business Strategy, DeepSeek and AI Agents",
      outlet: "YouTube",
      description:
        "Deep dive into business strategy alignment with AI implementation, covering the latest developments in DeepSeek technology and AI agents.",
      link: "https://youtu.be/CnmClTT3AIw",
      date: "Jan 2025",
    },
    {
      type: "Podcast",
      title: "Insights from a Chief AI Officer",
      outlet: "Disruption Digest (Spotify)",
      description:
        "Erik discusses the CAIO role, key components of AI strategy, how to get started with AI, and the future of AI in business.",
      link: "https://open.spotify.com/episode/0M9vnvDu9pzPyAIMk4PxmA",
      date: "Aug 2024",
    },
    {
      type: "Video",
      title: "Harnessing the Power of AI: Knowledge Discovery",
      outlet: "Findr Podcast (YouTube)",
      description:
        "Expert insights on leveraging AI for knowledge discovery and enterprise applications with practical implementation strategies.",
      link: "https://youtu.be/9tX5W5vHJXw",
      date: "2024",
    },
    {
      type: "LinkedIn Live",
      title: "The RAG Phenomenon: Cutting Through the Hype",
      outlet: "LinkedIn Live",
      description:
        "Exploring Retrieval-Augmented Generation (RAG) technology with Alessandro Benedetti from Sease.io.",
      link: "https://www.linkedin.com/events/theragphenomenon-cuttingthrough7173632352642949122/theater/",
      date: "Mar 2024",
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-heading leading-tight">
            <span className="text-primary glow-green">AI RESOURCES</span>
            <br />
            <span className="text-foreground">
              TO ACCELERATE YOUR JOURNEY
            </span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Practical frameworks, tools, and insights to help you build AI
            capabilities and drive real business value.
          </p>
        </div>
      </section>

      {/* Interactive Tools Section */}
      <section className="container mx-auto px-4 mb-24" id="tools">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading mb-4">
            <span className="text-primary glow-green">INTERACTIVE TOOLS</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Free tools to assess your AI readiness and calculate potential ROI
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <Card
                key={index}
                className="bg-gradient-cyber border-2 border-primary shadow-cyber-lg group hover:shadow-cyber-xl transition-all h-full flex flex-col"
              >
                <CardContent className="p-10 flex-1 flex flex-col">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6 group-hover:glow-green transition-all">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-heading text-foreground mb-4">
                    {tool.name}
                  </h3>
                  <p className="text-muted-foreground mb-8 leading-relaxed flex-grow">
                    {tool.description}
                  </p>
                  <Button
                    size="lg"
                    className={`w-full ${
                      tool.color === "primary"
                        ? "bg-primary text-primary-foreground hover:bg-primary/90 glow-green"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/90 glow-pink"
                    } font-semibold py-6 shadow-cyber`}
                    asChild
                  >
                    <a href={tool.link}>
                      {tool.cta}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Featured Insights */}
      <section className="py-20 bg-gradient-to-br from-background to-card/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading mb-4">
              <span className="text-foreground">FEATURED INSIGHTS</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Practical guidance from the front lines of AI transformation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {insights.map((insight, index) => {
              const Icon = insight.icon;
              return (
                <Card
                  key={index}
                  className="bg-card border-2 border-border hover:border-primary/50 transition-all shadow-cyber group h-full flex flex-col"
                >
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs text-primary font-semibold uppercase tracking-wide">
                          {insight.category}
                        </span>
                        <h3 className="text-xl font-heading text-foreground mt-1">
                          {insight.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4 leading-relaxed flex-grow">
                      {insight.description}
                    </p>
                    <Button
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary/10 font-semibold"
                      asChild
                    >
                      <a href={insight.link}>
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Downloadable Resources */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading mb-4">
            <span className="text-secondary glow-pink">
              DOWNLOADABLE RESOURCES
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Free frameworks, guides, and templates to support your AI journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {downloads.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <Card
                key={index}
                className="bg-card border-2 border-border hover:border-secondary/50 transition-all shadow-cyber group"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-secondary font-semibold uppercase tracking-wide">
                          {resource.type}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {resource.size}
                        </span>
                      </div>
                      <h3 className="text-xl font-heading text-foreground">
                        {resource.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                    {resource.description}
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-secondary text-secondary hover:bg-secondary/10 font-semibold"
                    onClick={() => handleDownloadClick(resource.title)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download {resource.type}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Media & Speaking */}
      <section className="py-20 bg-gradient-to-br from-background to-card/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading mb-4">
              <span className="text-primary glow-green">
                MEDIA & SPEAKING
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Recent appearances, interviews, and thought leadership
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {media.map((item, index) => (
              <Card
                key={index}
                className="bg-card border-2 border-border hover:border-primary/30 transition-all shadow-cyber"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      {(item.type === "Podcast" || item.type === "Video") && (
                        <Video className="w-8 h-8 text-primary" />
                      )}
                      {item.type === "Article" && (
                        <BookOpen className="w-8 h-8 text-primary" />
                      )}
                      {item.type === "LinkedIn Live" && (
                        <Video className="w-8 h-8 text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-primary font-semibold uppercase tracking-wide">
                              {item.type}
                            </span>
                            {item.date && (
                              <span className="text-xs text-muted-foreground">
                                • {item.date}
                              </span>
                            )}
                          </div>
                          <h3 className="text-xl font-heading text-foreground mt-1">
                            {item.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.outlet}
                          </p>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {item.description}
                      </p>
                      <Button
                        variant="link"
                        className="text-primary hover:text-primary/80 p-0 h-auto font-semibold"
                        asChild
                      >
                        <a href={item.link}>
                          Watch / Listen
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-cyber border-2 border-primary shadow-cyber-lg">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">
              STAY AHEAD OF THE AI CURVE
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get practical AI insights, frameworks, and case studies delivered
              monthly. No hype, just actionable guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
              <input
                type="email"
                placeholder="your.email@company.com"
                className="flex-1 px-6 py-4 rounded-lg border-2 border-border bg-background text-foreground focus:border-primary focus:outline-none"
              />
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 glow-green font-semibold px-10 py-4 shadow-cyber"
              >
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Join 5,000+ business leaders " Unsubscribe anytime " No spam, ever
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-xl text-muted-foreground mb-6">
            Ready to put these insights into action?
          </p>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary/10 font-semibold px-10 py-6"
            asChild
          >
            <Link to="/contact">
              Book a Strategy Call
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Download Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="bg-card border-2 border-primary shadow-cyber-lg max-w-md w-full">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-heading text-primary">
                  DOWNLOAD RESOURCE
                </h3>
                <button
                  onClick={closeModal}
                  className="w-8 h-8 rounded-lg hover:bg-border flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <p className="text-muted-foreground mb-6">
                Enter your details to download: <strong className="text-foreground">{selectedResource}</strong>
              </p>

              <form onSubmit={handleDownloadSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="text-sm text-foreground mb-2 block">
                    Name *
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-background border-border"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="text-sm text-foreground mb-2 block">
                    Email *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-background border-border"
                    placeholder="your.email@company.com"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-green font-semibold py-6"
                >
                  {isSubmitting ? "Sending..." : "Get Download Link"}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  We respect your privacy. No spam, ever.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Resources;
