const TrustBar = () => {
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

  return (
    <section className="border-y border-border" style={{ backgroundColor: 'hsl(0 0% 10%)' }}>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <p className="text-sm font-heading text-primary uppercase tracking-wide">
            Trusted Enterprise Experience
          </p>
          <h3 className="text-lg text-muted-foreground mt-2">
            20+ Years Leading AI, Search & Discovery At
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12 max-w-4xl mx-auto">
          {companies.map((company, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-4 group"
            >
              <div className={`${company.name === 'Elsevier' ? 'h-20' : 'h-16'} flex items-center justify-center transition-all opacity-90 hover:opacity-100 p-4 rounded-lg`} style={{ backgroundColor: 'hsl(0 0% 4%)' }}>
                <img
                  src={company.logo}
                  alt={company.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <span className="text-sm text-muted-foreground text-center">
                {company.role}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-8 py-6 sm:py-4 rounded-lg bg-primary/5 border border-primary/20 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-heading text-primary glow-green">
                20+
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Years Experience
              </div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-border mx-auto" />
            <div className="text-center">
              <div className="text-3xl font-heading text-primary glow-green">
                $100M+
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Projects Delivered
              </div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-border mx-auto" />
            <div className="text-center">
              <div className="text-3xl font-heading text-secondary glow-pink">
                Global
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Enterprise Scale
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
