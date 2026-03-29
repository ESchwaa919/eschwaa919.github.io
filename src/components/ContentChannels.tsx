import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Mic, Video, FileText, ExternalLink } from "lucide-react";
import { useScrollReveal, useStaggeredReveal } from "@/hooks/useScrollReveal";

const featured = [
    {
      type: "Podcast",
      icon: Mic,
      title: "Aligning AI to Business Strategy, DeepSeek and AI Agents",
      outlet: "The NeuralPod — Spotify",
      description:
        "Deep dive on aligning AI to business strategy, the agent revolution, measuring ROI, and why the dot-com parallels matter for leaders today.",
      link: "https://open.spotify.com/episode/19okJTgxevydVvAqXTtZiI",
      color: "primary",
    },
    {
      type: "Summit Talk",
      icon: Video,
      title: "Trust, Growth, Risk, Opportunity: The AI Paradox",
      outlet: "AI Global Summit — BusinessABC",
      description:
        "Business track conversation on the paradox every leader faces: AI creates enormous opportunity and genuine risk simultaneously. How do you move forward?",
      link: "https://www.youtube.com/watch?v=Aw0cPgj3YsU",
      color: "secondary",
    },
    {
      type: "Article",
      icon: FileText,
      title: "AI Execution Playbook for SMBs",
      outlet: "LinkedIn",
      description:
        "Turning AI hype into measurable ROI without a Fortune 500 budget. A practical roadmap for SMBs ready to move beyond experimentation.",
      link: "https://www.linkedin.com/pulse/ai-execution-playbook-smbs-turning-hype-roi-without-fortune-schwartz-76y6e/",
      color: "primary",
    },
  ];

const channels = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/eschwaa/",
    description: "Articles, insights, and AI strategy posts",
    external: true,
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@eschwaa",
    description: "Summit talks and AI deep dives",
    external: true,
  },
  {
    name: "Podcasts",
    url: "/resources#media",
    description: "7+ podcast appearances on AI strategy",
    external: false,
  },
];

const ContentChannels = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal({ threshold: 0.2 });
  const { containerRef: cardsRef, visibleItems: cardsVisible } = useStaggeredReveal(3, { threshold: 0.1 });

  return (
    <section className="py-24 lg:py-32 relative section-glow">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
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
            <span className="text-foreground">INSIGHTS &</span>{" "}
            <span className="text-gradient-animate glow-green">THOUGHT LEADERSHIP</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Erik regularly shares practical AI insights through podcasts,
            summit talks, and published articles. No fluff — just actionable guidance.
          </p>
        </div>

        {/* Featured Content */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mb-16">
          {featured.map((item, index) => {
            const ItemIcon = item.icon;
            return (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group block transition-all duration-700 ${
                  cardsVisible[index]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <Card className="card-enhanced h-full hover:border-primary/50 transition-all">
                  <CardContent className="p-6 lg:p-8 h-full flex flex-col">
                    {/* Type Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${
                        item.color === "primary"
                          ? "bg-primary/10 border border-primary/20"
                          : "bg-secondary/10 border border-secondary/20"
                      }`}>
                        <ItemIcon className={`w-3.5 h-3.5 ${
                          item.color === "primary" ? "text-primary" : "text-secondary"
                        }`} />
                        <span className={`text-xs font-heading tracking-wider ${
                          item.color === "primary" ? "text-primary" : "text-secondary"
                        }`}>
                          {item.type}
                        </span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-heading text-foreground mb-2 group-hover:text-primary transition-colors leading-tight">
                      {item.title}
                    </h3>

                    {/* Outlet */}
                    <p className="text-xs text-muted-foreground/60 mb-4">
                      {item.outlet}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                      {item.description}
                    </p>

                    {/* Listen/Watch CTA */}
                    <div className="pt-4 mt-4 border-t border-border/30">
                      <span className="text-sm text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                        {item.type === "Podcast" ? "Listen" : item.type === "Article" ? "Read" : "Watch"}
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </a>
            );
          })}
        </div>

        {/* Channel Links */}
        <div className="flex flex-wrap gap-4 justify-center">
          {channels.map((channel) => {
            const content = (
              <>
                <div>
                  <div className="text-sm font-heading text-foreground group-hover:text-primary transition-colors">
                    {channel.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {channel.description}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-colors" />
              </>
            );
            const className = "group flex items-center gap-3 px-6 py-3 rounded-xl border border-border/50 hover:border-primary/40 bg-card/50 hover:bg-primary/5 transition-all";

            return channel.external ? (
              <a key={channel.name} href={channel.url} target="_blank" rel="noopener noreferrer" className={className}>
                {content}
              </a>
            ) : (
              <Link key={channel.name} to={channel.url} className={className}>
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ContentChannels;
