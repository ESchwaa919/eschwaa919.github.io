import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import {
  BookOpen,
  Video,
  Download,
  ArrowRight,
  ExternalLink,
  FileText,
  TrendingUp,
  Brain,
  Lightbulb,
  Target,
  CheckCircle2,
} from "lucide-react";
import { useLeadCapture } from "@/hooks/useLeadCapture";
import { LeadCaptureModal } from "@/components/LeadCaptureModal";
import { useScrollReveal } from "@/hooks/useScrollReveal";

// Section navigation data
const sections = [
  { id: "tools", label: "Tools" },
  { id: "insights", label: "Insights" },
  { id: "downloads", label: "Downloads" },
  { id: "media", label: "Videos" },
];

// Inter-section navigation component
const SectionNav = ({ currentSection }: { currentSection: string }) => {
  const currentIndex = sections.findIndex((s) => s.id === currentSection);

  return (
    <div className="flex items-center justify-center gap-2 mt-12 pt-8 border-t border-border/30">
      <span className="text-xs text-muted-foreground mr-2">Jump to:</span>
      {sections.map((section, index) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
            index === currentIndex
              ? "bg-primary/20 text-primary border border-primary/40"
              : "text-muted-foreground hover:text-primary hover:bg-primary/10"
          }`}
        >
          {section.label}
        </a>
      ))}
    </div>
  );
};

const Resources = () => {
  // Scroll reveal hooks
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal();
  const { ref: toolsRef, isVisible: toolsVisible } = useScrollReveal();
  const { ref: insightsRef, isVisible: insightsVisible } = useScrollReveal();
  const { ref: downloadsRef, isVisible: downloadsVisible } = useScrollReveal();
  const { ref: mediaRef, isVisible: mediaVisible } = useScrollReveal();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal();
  const {
    showModal,
    isSubmitting,
    name,
    email,
    setName,
    setEmail,
    checkAndDownload,
    submitLead,
    closeModal,
    isLeadCaptured,
  } = useLeadCapture();

  // Featured insights/articles
  const insights = [
    {
      title: "AI Execution Playbook for SMBs",
      category: "Strategy",
      description:
        "Turning AI hype into measurable ROI without a Fortune 500 budget. A practical roadmap for small and medium businesses ready to implement AI successfully.",
      link: "https://www.linkedin.com/pulse/ai-execution-playbook-smbs-turning-hype-roi-without-fortune-schwartz-76y6e/",
      icon: Target,
      file: "/downloads/The-AI-Execution-Playbook-for-SMBs.pdf",
    },
    {
      title: "A Leader's Journey to AI Adoption",
      category: "Leadership",
      description:
        "Real-world insights from leadership experiences in AI transformation. Navigate the challenges and opportunities of leading your organization through AI adoption.",
      link: "https://www.linkedin.com/posts/eschwaa_a-leaders-journey-to-ai-adoption-activity-7325771625394565120-LNsR",
      icon: Brain,
      file: "/downloads/The-AI-Infused-Business-A-Leaders-Journey-to-AI-Adoption.pdf",
    },
    {
      title: "AI Workforce Revolution by 2045",
      category: "Future of Work",
      description:
        "How jobs, teams, and leadership will transform over the next two decades. Prepare your organization for the AI-driven future of work.",
      link: "https://www.linkedin.com/pulse/ai-workforce-revolution-how-jobs-teams-leadership-2045-erik-schwartz-bdn3e",
      icon: TrendingUp,
      file: "/downloads/AI and the Future of Work.pdf",
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
      link: "/promptfluency",
      color: "primary",
    },
    {
      name: "AI Learning Path Generator",
      description:
        "Get a personalized AI learning path tailored to your role, industry, and learning preferences. From AI basics to advanced implementation.",
      icon: BookOpen,
      cta: "Generate Path",
      link: "/ai-learning",
      color: "secondary",
    },
  ];

  // Downloadable resources with actual file paths
  const downloads = [
    {
      title: "The AI Execution Playbook for SMBs",
      type: "PDF",
      description:
        "Practical roadmap for small and medium businesses to turn AI hype into measurable ROI without Fortune 500 budgets.",
      size: "2.1 MB",
      icon: FileText,
      file: "/downloads/The-AI-Execution-Playbook-for-SMBs.pdf",
    },
    {
      title: "AI Expert Methodology Guide",
      type: "PDF",
      description:
        "Comprehensive methodology for implementing AI successfully in your organization. From assessment to execution.",
      size: "64 KB",
      icon: Target,
      file: "/downloads/The AI Expert Methodology Guide.pdf",
    },
    {
      title: "The AI-Infused Business: A Leader's Journey",
      type: "PDF",
      description:
        "Real-world insights from leadership experiences in AI transformation. Navigate challenges and opportunities of AI adoption.",
      size: "6 MB",
      icon: Brain,
      file: "/downloads/The-AI-Infused-Business-A-Leaders-Journey-to-AI-Adoption.pdf",
    },
    {
      title: "AI and the Future of Work",
      type: "PDF",
      description:
        "Research paper examining how jobs, teams, and leadership will transform by 2045. Comprehensive analysis of the AI-driven workplace.",
      size: "379 KB",
      icon: TrendingUp,
      file: "/downloads/AI and the Future of Work.pdf",
    },
    {
      title: "The AI Competency Matrix",
      type: "PDF",
      description:
        "Comprehensive framework for assessing and developing AI capabilities across your organization at every level.",
      size: "208 KB",
      icon: CheckCircle2,
      file: "/downloads/The AI Competency Matrix.pdf",
    },
    {
      title: "Prompt Fluency Toolkit",
      type: "PDF",
      description:
        "Master the CRISP framework and advanced prompting techniques for effective AI communication.",
      size: "137 KB",
      icon: Lightbulb,
      file: "/downloads/Prompt Fluency Toolkit.pdf",
    },
    {
      title: "AI Governance - 10 Days",
      type: "PDF",
      description:
        "Comprehensive 10-day guide to implementing AI governance in your organization. Covers risk management, compliance, and ethical AI practices.",
      size: "531 KB",
      icon: CheckCircle2,
      file: "/downloads/AI Governance - 10 Days - The Ai Expert.pdf",
    },
    {
      title: "Fractional Chief AI Officer (CAIO)",
      type: "PDF",
      description:
        "Learn how a fractional CAIO can accelerate your AI strategy without the cost of a full-time executive. Ideal for SMBs and growing organizations.",
      size: "526 KB",
      icon: Brain,
      file: "/downloads/Fractional Chief AI Officer (CAIO)  - The Ai Expert.pdf",
    },
    {
      title: "ROI of AI Investment for UK SMBs",
      type: "PDF",
      description:
        "Data-driven analysis of AI investment returns for UK small and medium businesses. Includes benchmarks, case studies, and ROI calculation frameworks.",
      size: "222 KB",
      icon: TrendingUp,
      file: "/downloads/ROI of AI Investment for UK SMBs.pdf",
    },
  ];

  // Media appearances
  const media = [
    {
      type: "Video",
      title: "NHS 10-Year AI Plan: From Ambition to Reality",
      outlet: "YouTube",
      description:
        "Session on the NHS 10-year AI roadmap and breaking down barriers to healthcare innovation.",
      link: "https://www.youtube.com/watch?v=i_vUPfW6ssg",
      date: "2025",
    },
    {
      type: "Video",
      title: "Trust, Growth, Risk, Opportunity: The AI Paradox",
      outlet: "BusinessABC AI Global Summit",
      description:
        "Business track conversation on AI trust, growth, risk and opportunity at the AI Global Summit.",
      link: "https://www.youtube.com/watch?v=Aw0cPgj3YsU",
      date: "2025",
    },
    {
      type: "Video",
      title: "Go Beyond Search with Generative AI",
      outlet: "OpenSource Connections",
      description:
        "How GenAI changes search, RAG patterns, and measurement strategies for modern search applications.",
      link: "https://www.youtube.com/watch?v=iTzeveXVmeo",
      date: "Jan 2024",
    },
    {
      type: "Podcast",
      title: "Aligning AI to Business Strategy, DeepSeek and AI Agents",
      outlet: "The NeuralPod (Spotify)",
      description:
        "Deep dive on aligning AI to business strategy, agents, ROI, and AI/dot-com parallels.",
      link: "https://open.spotify.com/episode/19okJTgxevydVvAqXTtZiI",
      date: "Mar 2025",
    },
    {
      type: "Podcast",
      title: "AI Predictions for 2025",
      outlet: "AI Horizons (Eden Smith)",
      description:
        "Predictions for 2025, ethics and regulation, workforce impact, and how organizations should prepare.",
      link: "https://music.amazon.com/podcasts/a408a0af-eb75-4497-bac7-ba712b0366ce/episodes/18b22def-13e9-4a33-b123-ae4be936513f/eden-smith-ai-horizons-erik-schwartz-on-ai-predictions-for-2025",
      date: "Jan 2025",
    },
    {
      type: "Podcast",
      title: "Agents, Autonomy, and the AI Workforce: A Year in Review",
      outlet: "AI Horizons (Eden Smith)",
      description:
        "Year-in-review on predictions with focus on agentic AI, jobs, skills, and 2026 trends.",
      link: "https://open.spotify.com/episode/0M9nvDu9p2PyAlMk4PxmA",
      date: "2025",
    },
    {
      type: "Podcast",
      title: "Reimagining Work and AI",
      outlet: "Gaule's Question Time",
      description:
        "GenAI, agents, and rethinking work and business models with a veteran in enterprise search and AI.",
      link: "https://www.podomatic.com/podcasts/gaulesqt/episodes/2025-08-19T08_59_37-07_00",
      date: "Aug 2025",
    },
    {
      type: "Podcast",
      title: "Insights from a Chief AI Officer",
      outlet: "Disruption Digest (Spotify)",
      description:
        "Role of CAIO, components of AI strategy, where to start, and enterprise AI roadmap.",
      link: "https://open.spotify.com/show/452ywgUOKV6yh759zNahhd",
      date: "Aug 2024",
    },
    {
      type: "Podcast",
      title: "Chief AI Officer @ Tricon Infotech",
      outlet: "Game Set Matchup! (Findr)",
      description:
        "Partnerships and scaling with data-driven approaches and joint-objective tracking.",
      link: "https://podcasts.apple.com/dk/podcast/s6-ep6-erik-schwartz-chief-ai-officer-tricon-infotech/id1569210074?i=1000669804861",
      date: "2024",
    },
    {
      type: "Podcast",
      title: "The Future of AI in Business",
      outlet: "Dinis Guarda Podcast",
      description:
        "Long-form origin story covering platforms like Comcast and Elsevier, plus future-of-AI-in-business discussion.",
      link: "https://citiesabc.buzzsprout.com/1032388/episodes/17550370-erik-schwartz-co-founder-and-chief-ai-officer-of-elysia-ai-labs-the-future-of-ai-in-business",
      date: "2025",
    },
    {
      type: "Video",
      title: "Tricon Kimolian Academy Graduation",
      outlet: "YouTube",
      description:
        "Fireside chat about AI careers with the January 2025 graduation cohort.",
      link: "https://www.youtube.com/watch?v=ypjBcdTww4Y",
      date: "Jan 2025",
    },
    {
      type: "Article",
      title: "Enterprise Search, AI Agents, and the Future of Work",
      outlet: "GoSearch AI Innovators",
      description:
        "Q&A profiling enterprise search work, agents, and the future of work.",
      link: "https://www.gosearch.ai/blog/ai-innovators-erik-schwartz-enterprise-search-ai-agents/",
      date: "2024",
    },
  ];

  const handleDownloadClick = (resource: typeof downloads[0]) => {
    checkAndDownload(
      resource.title,
      resource.file,
      "Website Resources Page"
    );
  };

  const handleInsightDownload = (insight: typeof insights[0]) => {
    if (insight.file) {
      checkAndDownload(
        insight.title,
        insight.file,
        "Website Resources Page - Insights"
      );
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      <SEOHead
        title="AI Resources & Tools | Free Downloads, Guides & Insights | The AI Expert"
        description="Access free AI resources: interactive tools, downloadable guides, frameworks, and expert insights to accelerate your AI journey. Practical resources for business leaders."
        keywords="AI resources, AI tools, AI guides, AI frameworks, prompt fluency toolkit, AI competency matrix, AI learning, free AI resources"
        canonicalUrl="/resources"
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
            Resources — Free tools &amp; insights
          </span>

          <h1 className="title-scene">
            <span className="text-primary">AI resources</span>
            <span className="block text-foreground">
              to accelerate your journey.
            </span>
          </h1>
          <p className="lede max-w-2xl mx-auto">
            Practical frameworks, tools, and insights to help you build AI
            capabilities and drive real business value.
          </p>
          {isLeadCaptured && (
            <p className="text-sm text-primary glow-green">
              Welcome back! Downloads are instant for the next 24 hours.
            </p>
          )}
        </div>

        {/* Quick Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mt-10">
          {[
            { label: "Tools", href: "#tools" },
            { label: "Insights", href: "#insights" },
            { label: "Downloads", href: "#downloads" },
            { label: "Videos", href: "#media" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-6 py-2 rounded-full border border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all text-sm font-semibold"
            >
              {item.label}
            </a>
          ))}
        </div>
      </section>

      {/* Interactive Tools Section */}
      <section className="container mx-auto px-4 mb-24 section-glow" id="tools">
        <div
          ref={toolsRef}
          className={`transition-all duration-300 ${
            toolsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading mb-4">
              <span className="text-gradient-animate glow-green">INTERACTIVE TOOLS</span>
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
                  className="card-enhanced group h-full flex flex-col"
                >
                  <CardContent className="p-10 flex-1 flex flex-col">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 border transition-all ${
                      tool.color === "primary"
                        ? "bg-primary/10 border-primary/30 group-hover:bg-primary/20 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_hsla(155,100%,45%,0.2)]"
                        : "bg-secondary/10 border-secondary/30 group-hover:bg-secondary/20 group-hover:border-secondary/50 group-hover:shadow-[0_0_20px_hsla(320,85%,55%,0.2)]"
                    }`}>
                      <Icon className={`w-8 h-8 ${tool.color === "primary" ? "text-primary" : "text-secondary"}`} />
                    </div>
                    <h3 className={`text-2xl font-heading text-foreground mb-4 transition-colors ${
                      tool.color === "primary" ? "group-hover:text-primary" : "group-hover:text-secondary"
                    }`}>
                      {tool.name}
                    </h3>
                    <p className="text-muted-foreground mb-8 leading-relaxed flex-grow">
                      {tool.description}
                    </p>
                    <Button
                      size="lg"
                      className={`w-full group/btn ${
                        tool.color === "primary"
                          ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-cyber transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsla(155,100%,45%,0.4)] btn-shimmer"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-cyber transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsla(320,85%,55%,0.4)]"
                      } font-semibold py-6`}
                      asChild
                    >
                      <Link to={tool.link}>
                        {tool.cta}
                        <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <SectionNav currentSection="tools" />
        </div>
      </section>

      {/* Featured Insights */}
      <section className="py-20 section-glow relative" id="insights">
        <div
          ref={insightsRef}
          className={`container mx-auto px-4 transition-all duration-300 ${
            insightsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading mb-4">
              <span className="text-foreground">FEATURED </span>
              <span className="text-gradient-animate glow-green">INSIGHTS</span>
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
                  className="card-enhanced group h-full flex flex-col"
                >
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/30 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs text-primary font-semibold uppercase tracking-wide">
                          {insight.category}
                        </span>
                        <h3 className="text-xl font-heading text-foreground mt-1 group-hover:text-primary transition-colors">
                          {insight.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4 leading-relaxed flex-grow">
                      {insight.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Button
                        variant="outline"
                        className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary font-semibold group/btn"
                        asChild
                      >
                        <a href={insight.link} target="_blank" rel="noopener noreferrer">
                          Read Article
                          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                        </a>
                      </Button>
                      {insight.file && (
                        <Button
                          variant="outline"
                          className="border-secondary/50 text-secondary hover:bg-secondary/10 hover:border-secondary font-semibold"
                          onClick={() => handleInsightDownload(insight)}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <SectionNav currentSection="insights" />
        </div>
      </section>

      {/* Downloadable Resources */}
      <section className="container mx-auto px-4 py-20" id="downloads">
        <div
          ref={downloadsRef}
          className={`transition-all duration-300 ${
            downloadsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading mb-4">
              <span className="text-gradient-animate glow-pink" style={{ backgroundImage: 'linear-gradient(135deg, hsl(320, 85%, 55%), hsl(280, 85%, 55%), hsl(320, 85%, 55%))' }}>
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
                  className="card-enhanced group cursor-pointer"
                  onClick={() => handleDownloadClick(resource)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0 border border-secondary/30 group-hover:bg-secondary/20 group-hover:border-secondary/50 transition-all">
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
                        <h3 className="text-xl font-heading text-foreground group-hover:text-secondary transition-colors">
                          {resource.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                      {resource.description}
                    </p>
                    <Button
                      variant="outline"
                      className="w-full border-secondary/50 text-secondary hover:bg-secondary/10 hover:border-secondary font-semibold transition-all"
                      onClick={() => handleDownloadClick(resource)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {isLeadCaptured ? "Download Now" : `Download ${resource.type}`}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <SectionNav currentSection="downloads" />
        </div>
      </section>

      {/* Media & Speaking */}
      <section className="py-20 section-glow relative" id="media">
        <div
          ref={mediaRef}
          className={`container mx-auto px-4 transition-all duration-300 ${
            mediaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading mb-4">
              <span className="text-gradient-animate glow-green">
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
                className="card-enhanced group cursor-pointer"
                onClick={() => window.open(item.link, '_blank', 'noopener,noreferrer')}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/30 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all">
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
                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                          {item.type === "Video" ? "Watch Now" : item.type === "Article" ? "Read Article" : "Listen Now"}
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <SectionNav currentSection="media" />
        </div>
      </section>

      {/* Newsletter CTA */}
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
                  STAY AHEAD OF THE <span className="text-primary glow-green">AI CURVE</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Get practical AI insights, frameworks, and case studies delivered
                  monthly. No hype, just actionable guidance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
                  <input
                    type="email"
                    placeholder="your.email@company.com"
                    className="flex-1 px-6 py-4 rounded-lg border-2 border-border/50 bg-background/50 text-foreground focus:border-primary focus:outline-none transition-colors"
                  />
                  <Button
                    size="lg"
                    className="group relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-10 py-4 shadow-cyber transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsla(155,100%,45%,0.4)] btn-shimmer"
                  >
                    Subscribe
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Join 5,000+ business leaders • Unsubscribe anytime • No spam, ever
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
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
            className="group border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary font-semibold px-10 py-6 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_hsla(155,100%,45%,0.2)]"
            asChild
          >
            <Link to="/contact">
              Book a Strategy Call
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={showModal}
        onClose={closeModal}
        onSubmit={submitLead}
        isSubmitting={isSubmitting}
        name={name}
        email={email}
        onNameChange={setName}
        onEmailChange={setEmail}
        title="DOWNLOAD RESOURCE"
        buttonText="Download Now"
        buttonIcon="download"
      />
    </div>
  );
};

export default Resources;
