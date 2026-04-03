import { useScrollReveal } from "@/hooks/useScrollReveal";

const TrustBar = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollReveal();

  const companies = [
    {
      name: "Microsoft",
      logo: "/images/msift.png",
      role: "Search & AI Leadership",
    },
    {
      name: "Comcast",
      logo: "/images/comcast.png",
      role: "AI & Discovery",
    },
    {
      name: "Elsevier",
      logo: "/images/elsevier.png",
      role: "Knowledge Discovery",
    },
  ];

  const stats = [
    { value: "20+", label: "Years Experience", color: "primary" },
    { value: "$100M+", label: "Projects Delivered", color: "primary" },
    { value: "Global", label: "Enterprise Scale", color: "secondary" },
  ];

  const trainingClients = [
    "Spotify",
    "The Economist",
    "London Business School",
    "Henley Business School",
    "Kier Group",
    "Accredible",
    "IF.se",
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-16 lg:py-20 border-y border-border/50"
      style={{ backgroundColor: 'hsl(220 15% 5%)' }}
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/50" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div
          className={`text-center mb-10 transition-all duration-300 ${
            sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-sm font-heading text-primary uppercase tracking-widest mb-2">
            Trusted Enterprise Experience
          </p>
          <h3 className="text-xl lg:text-2xl text-muted-foreground">
            20+ Years Leading AI, Search & Discovery At
          </h3>
        </div>

        {/* Company Logos */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-4xl mx-auto mb-12 transition-all duration-300 delay-150 ${
            sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {companies.map((company, index) => (
            <div
              key={index}
              className="group flex flex-col items-center justify-center gap-4"
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div
                className={`${company.name === 'Elsevier' ? 'h-20' : 'h-16'} w-full max-w-[200px] flex items-center justify-center p-4 rounded-xl glass-card group-hover:border-primary/30 transition-all duration-300 group-hover:shadow-[0_0_20px_hsla(155,100%,45%,0.1)]`}
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className="max-h-full max-w-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
              </div>
              <span className="text-sm text-muted-foreground text-center group-hover:text-foreground/80 transition-colors">
                {company.role}
              </span>
            </div>
          ))}
        </div>

        {/* Training Clients */}
        <div
          className={`text-center mb-10 transition-all duration-300 delay-200 ${
            sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-sm font-heading text-secondary uppercase tracking-widest mb-4">
            AI Training Delivered To
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 max-w-3xl mx-auto">
            {trainingClients.map((client, index) => (
              <span
                key={index}
                className="text-sm text-muted-foreground/80 hover:text-foreground transition-colors"
              >
                {client}
              </span>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div
          className={`max-w-3xl mx-auto transition-all duration-300 delay-300 ${
            sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="relative glass-card rounded-xl overflow-hidden">
            {/* Gradient border */}
            <div className="absolute inset-0 rounded-xl p-[1px] bg-gradient-to-r from-primary/20 via-cyan-500/10 to-secondary/20">
              <div className="absolute inset-[1px] rounded-xl bg-card" />
            </div>

            <div className="relative px-6 py-6 lg:py-8">
              <div className="grid grid-cols-3 gap-4 lg:gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center group relative">
                    {/* Divider (except for first item) */}
                    {index > 0 && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-border/50" />
                    )}

                    <div
                      className={`text-2xl lg:text-3xl xl:text-4xl font-heading mb-1 transition-all group-hover:scale-110 ${
                        stat.color === 'primary'
                          ? 'text-primary glow-green'
                          : 'text-secondary glow-pink'
                      }`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs lg:text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
