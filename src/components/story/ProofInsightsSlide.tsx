import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Mic, Video, FileText } from "lucide-react";
import SceneMarker from "./SceneMarker";
import Reveal, { revealClasses } from "./Reveal";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const featured = [
  {
    type: "Podcast",
    icon: Mic,
    title: "Aligning AI to Business Strategy, DeepSeek and AI Agents",
    outlet: "The NeuralPod — Spotify",
    description:
      "Deep dive on aligning AI to business strategy, the agent revolution, measuring ROI, and why the dot-com parallels matter for leaders today.",
    link: "https://open.spotify.com/episode/19okJTgxevydVvAqXTtZiI",
  },
  {
    type: "Summit Talk",
    icon: Video,
    title: "Trust, Growth, Risk, Opportunity: The AI Paradox",
    outlet: "AI Global Summit — BusinessABC",
    description:
      "Business track conversation on the paradox every leader faces: AI creates enormous opportunity and genuine risk simultaneously. How do you move forward?",
    link: "https://www.youtube.com/watch?v=Aw0cPgj3YsU",
  },
  {
    type: "Article",
    icon: FileText,
    title: "AI Execution Playbook for SMBs",
    outlet: "LinkedIn",
    description:
      "Turning AI hype into measurable ROI without a Fortune 500 budget. A practical roadmap for SMBs ready to move beyond experimentation.",
    link: "https://www.linkedin.com/pulse/ai-execution-playbook-smbs-turning-hype-roi-without-fortune-schwartz-76y6e/",
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

const partners = ["AI Collective", "Gen AI Academy", "Cognician", "HumAInity", "Impact IT"];

/** Act V·B — the proof: thought leadership, channels, partners. */
const ProofInsightsSlide = () => {
  const { ref: mediaRef, isVisible: mediaVisible } = useScrollReveal();

  return (
    <div className="container mx-auto px-4">
      <SceneMarker label="Act V — Insights & thought leadership" className="mb-8" />

      <div className="grid lg:grid-cols-2 gap-6 items-end mb-8">
        <Reveal>
          <h2 className="title-scene">No fluff. Just actionable guidance.</h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="lede lg:max-w-md lg:ml-auto">
            Practical AI insights through podcasts, summit talks, and published
            articles.
          </p>
        </Reveal>
      </div>

      <div ref={mediaRef} className="grid md:grid-cols-3 gap-4 lg:gap-5 mb-8">
        {featured.map((item, index) => {
          const ItemIcon = item.icon;
          return (
            <a
              key={item.title}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ transitionDelay: `${index * 80}ms` }}
              className={`card-surface group p-5 lg:p-6 flex flex-col ${revealClasses(mediaVisible)}`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="kicker text-primary flex items-center gap-2">
                  <ItemIcon className="w-3.5 h-3.5" aria-hidden="true" />
                  {item.type}
                </span>
                <ExternalLink className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-base font-medium text-foreground mb-1.5 leading-snug group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-muted-foreground/70 mb-3">{item.outlet}</p>
              <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                {item.description}
              </p>
              <span className="kicker text-primary mt-4 pt-3 border-t border-border flex items-center gap-1.5">
                {item.type === "Podcast" ? "Listen" : item.type === "Article" ? "Read" : "Watch"}
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </span>
            </a>
          );
        })}
      </div>

      <Reveal>
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {channels.map((channel) => {
            const content = (
              <>
                <div>
                  <div className="text-sm text-foreground group-hover:text-primary transition-colors">
                    {channel.name}
                  </div>
                  <div className="text-xs text-muted-foreground">{channel.description}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-colors" />
              </>
            );
            const className =
              "group flex items-center gap-3 px-5 py-2.5 border border-border rounded-sm hover:border-primary/40 transition-colors";

            return channel.external ? (
              <a
                key={channel.name}
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                {content}
              </a>
            ) : (
              <Link key={channel.name} to={channel.url} className={className}>
                {content}
              </Link>
            );
          })}
        </div>
      </Reveal>

      <Reveal delay={80}>
        <p className="kicker text-muted-foreground text-center mb-3">Partner ecosystem</p>
        <div className="flex flex-wrap gap-3 justify-center items-center">
          {partners.map((name) => (
            <span
              key={name}
              className="text-sm text-muted-foreground px-4 py-1.5 border border-border rounded-sm"
            >
              {name}
            </span>
          ))}
        </div>
      </Reveal>
    </div>
  );
};

export default ProofInsightsSlide;
