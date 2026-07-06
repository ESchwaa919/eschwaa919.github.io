import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SceneMarker from "./SceneMarker";
import Reveal from "./Reveal";
import erikPortrait from "@/assets/Erik-Headshot.jpg";

const companies = [
  { name: "Microsoft", logo: "/images/msift.png", role: "Search & AI Leadership" },
  { name: "Comcast", logo: "/images/comcast.png", role: "AI & Discovery" },
  { name: "Elsevier", logo: "/images/elsevier.png", role: "Knowledge Discovery" },
];

const stats = [
  { value: "20+", label: "Years Experience" },
  { value: "$100M+", label: "Projects Delivered" },
  { value: "Global", label: "Enterprise Scale" },
];

/** Act IV·B — the human reveal: Erik, mid-story, not the headline. */
const GuideErikSlide = () => {
  return (
    <div className="container mx-auto px-4">
      <SceneMarker label="Act IV — The human behind the practice" className="mb-10" />

      <div className="grid md:grid-cols-[180px_1fr] gap-8 lg:gap-14 items-start mb-10">
        <Reveal>
          <img
            src={erikPortrait}
            alt="Erik Schwartz — founder of The AI Expert"
            className="rounded-sm border border-border w-full max-w-[180px] h-auto"
            loading="lazy"
          />
        </Reveal>
        <div>
          <Reveal delay={80}>
            <h2 className="title-scene mb-4">
              Erik <span className="text-primary">Schwartz</span>
            </h2>
            <p className="lede max-w-2xl">
              Two decades building AI, search and knowledge discovery at
              enterprise scale — platforms used by millions of people every
              day. Now that experience guides forward-looking businesses like
              yours, delivered by a practice that runs on the same AI it
              recommends.
            </p>
          </Reveal>
          <Reveal delay={160} className="mt-5">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 kicker text-primary hover:text-primary/80 transition-colors"
            >
              Meet Erik <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Reveal>
        </div>
      </div>

      {/* Credibility strip */}
      <Reveal>
        <div className="border border-border rounded-sm">
          <div className="grid md:grid-cols-3 gap-px bg-border">
            {companies.map((company) => (
              <div key={company.name} className="bg-background p-5 flex items-center gap-4">
                <div className="h-9 w-24 flex items-center justify-center shrink-0">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="max-h-full max-w-full object-contain opacity-80"
                    loading="lazy"
                  />
                </div>
                <span className="text-sm text-muted-foreground">{company.role}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-px bg-border border-t border-border">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-background p-5 text-center">
                <div className="stat-figure text-2xl lg:text-3xl">{stat.value}</div>
                <div className="kicker text-muted-foreground mt-1.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
};

export default GuideErikSlide;
