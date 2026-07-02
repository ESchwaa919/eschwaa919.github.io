import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  FileText,
  ClipboardList,
  Ticket,
  GitBranch,
  Code2,
  Wand2,
  GitPullRequest,
  ShieldAlert,
  Rocket,
  Eye,
  Flag,
  User,
  Compass,
  Layers,
  Bot,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Calendar,
  Github,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { StructuredData, organizationSchema } from "@/components/StructuredData";
import { useScrollReveal } from "@/hooks/useScrollReveal";

// The 11-stage delivery lifecycle. Copy authored verbatim (UK English, no em dashes).
const stages = [
  {
    number: "01",
    title: "Spec",
    phase: "Define",
    icon: FileText,
    description:
      "Every piece of work begins as a written specification with explicit acceptance criteria. Tech-lead approval comes before anything else.",
  },
  {
    number: "02",
    title: "Plan",
    phase: "Define",
    icon: ClipboardList,
    description:
      "An implementation plan sets out tasks, dependencies and acceptance criteria, turning the specification into a sequenced route.",
  },
  {
    number: "03",
    title: "Ticket",
    phase: "Define",
    icon: Ticket,
    description:
      "Linear issues are created from the approved specification before any code is written, so the backlog reflects the agreed scope.",
  },
  {
    number: "04",
    title: "Branch",
    phase: "Build",
    icon: GitBranch,
    description:
      "All work happens on feature branches off freshly-fetched origin/main, never main directly. Recently-merged PRs are scanned for conflicts before starting.",
  },
  {
    number: "05",
    title: "Implement",
    phase: "Build",
    icon: Code2,
    description:
      "A failing test comes first, then the change. Edits stay surgical, and every line traces back to the specification.",
  },
  {
    number: "06",
    title: "Simplify",
    phase: "Build",
    icon: Wand2,
    description:
      "A dedicated simplification pass runs before commit, removing accidental complexity while the change is still fresh.",
  },
  {
    number: "07",
    title: "PR",
    phase: "Review",
    icon: GitPullRequest,
    description:
      "A draft pull request carries a summary and a test plan. Builds must pass before the change is put forward for review.",
  },
  {
    number: "08",
    title: "Adversarial review",
    phase: "Review",
    icon: ShieldAlert,
    description:
      "An independent AI reviewer on a separate model tries to break the change. Findings are authoritative and fixed before merge. No agent self-merges schema, CI or infrastructure changes.",
  },
  {
    number: "09",
    title: "Merge + CI/CD",
    phase: "Ship",
    icon: Rocket,
    description:
      "After a clean review the change merges and the pipeline deploys automatically. Deploy status is verified and staging environments are auto-cleaned.",
  },
  {
    number: "10",
    title: "Verify behaviour",
    phase: "Ship",
    icon: Eye,
    description:
      "The change is confirmed in the real environment, browser or live API, not just green tests. Anything only proxy-verified is logged as explicit verify-debt.",
  },
  {
    number: "11",
    title: "Close the loop",
    phase: "Ship",
    icon: Flag,
    description:
      "Linear is updated to Done, and the backlog and trackers are refreshed so the next piece of work starts from an accurate picture.",
  },
];

// The layered agentic team. "human" tag renders in secondary (magenta), "ai" in primary (green).
const teamLayers = [
  {
    role: "Human tech lead",
    tag: "Human",
    tagKind: "human" as const,
    icon: User,
    description:
      "Sets direction and makes the decisions that matter. Owns the product calls and the priorities, and delegates execution to the orchestration layer.",
  },
  {
    role: 'Lead orchestrator, "Rune"',
    tag: "AI",
    tagKind: "ai" as const,
    icon: Compass,
    description:
      "The completeness and protocol conscience of the team, and the single human interface. Tracks the verify-debt ledger and a dropped-items watchlist so nothing stalls silently or is quietly called done.",
  },
  {
    role: "Per-project orchestrators",
    tag: "AI",
    tagKind: "ai" as const,
    icon: Layers,
    description:
      "One per engagement. Each owns its backlog, dispatches work and supervises its own workers, keeping projects isolated from one another.",
  },
  {
    role: "Worker agents",
    tag: "AI",
    tagKind: "ai" as const,
    icon: Bot,
    description:
      "Each takes one scoped task at a time: failing test first, then evidence-based self-verification before handing the change on.",
    cards: [
      { title: "Scoped task", detail: "One clear objective, owned end to end" },
      { title: "Test first", detail: "A failing test defines success" },
      { title: "Self-verify", detail: "Evidence gathered before hand-off" },
    ],
  },
  {
    role: "Independent adversarial reviewer",
    tag: "AI · Gate",
    tagKind: "gate" as const,
    icon: ShieldCheck,
    description:
      "A separate model that gates everything before it lands. It tries to break each change, and its findings must be resolved before merge.",
  },
];

// The standing protocol guardrails.
const guardrails = [
  {
    title: "Verify the behaviour, not the proxy",
    description:
      "Green tests are evidence, not proof. Work is done when the outcome is confirmed in the environment the user actually uses.",
  },
  {
    title: "Independent review before landing",
    description:
      "Nothing merges on its author's say-so. Schema, CI and infrastructure changes never self-merge.",
  },
  {
    title: "Fresh context always",
    description:
      "Branch from the current state and conflict-scan first, so no work is built on a stale picture of the codebase.",
  },
  {
    title: "Evidence before conclusion",
    description:
      "Follow the full chain before escalating a finding. A hypothesis that fits a question you already had is the one to distrust.",
  },
  {
    title: 'No silent stalls, no silent "done"',
    description:
      "All dispatched work is tracked to proven completion. Blocked is a status, not a disappearance.",
  },
  {
    title: "One team, one method",
    description:
      "Every engagement runs the same lifecycle and the same guardrails, so quality does not depend on who is on the keyboard.",
  },
];

const principles = [
  "Think before coding",
  "Simplicity first",
  "Surgical changes",
  "Goal-driven execution",
  "Verify behaviour",
  "Finish what you started",
];

const RuneSDLC = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal();
  const { ref: lifecycleRef, isVisible: lifecycleVisible } = useScrollReveal();
  const { ref: teamRef, isVisible: teamVisible } = useScrollReveal();
  const { ref: protocolRef, isVisible: protocolVisible } = useScrollReveal();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal();

  return (
    <div className="min-h-screen pt-32 pb-20">
      <SEOHead
        title="The Rune SDLC: Spec-Driven Agentic Delivery"
        description="How The AI Expert ships software: an 11-stage spec-driven lifecycle run by an orchestrated AI team under human direction, from planning to full CI/CD with independent adversarial review."
        keywords="agentic software delivery, spec-driven development, AI software development lifecycle, adversarial review, AI orchestration, agentic SDLC"
        canonicalUrl="/process/rune-sdlc"
      />
      <StructuredData schema={organizationSchema} />

      {/* Hero */}
      <section className="container mx-auto px-4 mb-24 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-secondary/5 rounded-full blur-3xl" />
        </div>

        <div
          ref={heroRef}
          className={`max-w-4xl mx-auto text-center space-y-6 relative z-10 transition-all duration-300 ${
            heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30">
            <Sparkles className="w-4 h-4 text-primary animate-pulse-glow" />
            <span className="text-sm font-heading text-primary tracking-wider">
              THE AI EXPERT · DELIVERY METHOD
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-heading leading-tight">
            <span className="text-foreground">THE RUNE SDLC</span>
            <br />
            <span className="text-gradient-animate glow-green-intense">
              SPEC-DRIVEN AGENTIC DELIVERY
            </span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            From planning to full CI/CD, run by an orchestrated AI team under
            human direction. A repeatable lifecycle where every change begins as
            a written specification and ends as verified behaviour in the real
            environment.
          </p>

          <div className="flex flex-wrap gap-3 justify-center pt-2">
            {[
              { value: "11", label: "lifecycle stages" },
              { value: "4", label: "agent layers" },
              { value: "6", label: "core principles" },
              { value: "", label: "Human-directed · AI-executed" },
            ].map((chip, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground border border-border rounded-full px-4 py-2"
              >
                {chip.value && (
                  <strong className="text-foreground font-heading">
                    {chip.value}
                  </strong>
                )}
                {chip.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Section A: The delivery lifecycle */}
      <section className="container mx-auto px-4 mb-24 section-glow" id="lifecycle">
        <div
          ref={lifecycleRef}
          className={`max-w-5xl mx-auto transition-all duration-300 ${
            lifecycleVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <div className="text-center mb-12">
            <p className="text-sm font-heading text-primary tracking-wider mb-3">
              SECTION A
            </p>
            <h2 className="text-4xl md:text-5xl font-heading mb-4">
              <span className="text-gradient-animate glow-green">
                THE DELIVERY LIFECYCLE
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every piece of work travels the same spine, no shortcuts. Each
              stage has a clear exit condition before the next begins, so quality
              is built in rather than inspected afterwards.
            </p>
          </div>

          <div className="space-y-4">
            {stages.map((stage) => {
              const StageIcon = stage.icon;
              return (
                <Card key={stage.number} className="card-enhanced group">
                  <CardContent className="p-0">
                    <div className="flex items-stretch">
                      {/* Number rail */}
                      <div className="flex items-center justify-center w-16 md:w-20 flex-shrink-0 bg-primary/10 border-r border-primary/30">
                        <span className="text-2xl md:text-3xl font-heading text-primary">
                          {stage.number}
                        </span>
                      </div>
                      {/* Body */}
                      <div className="flex items-start gap-4 p-5 md:p-6">
                        <div className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110">
                          <StageIcon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1 flex-wrap">
                            <h3 className="text-xl font-heading text-foreground group-hover:text-primary transition-colors">
                              {stage.title}
                            </h3>
                            <span className="text-[0.6rem] font-heading tracking-widest uppercase text-muted-foreground border border-border rounded px-2 py-0.5">
                              {stage.phase}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {stage.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section B: The agentic team */}
      <section className="container mx-auto px-4 mb-24" id="team">
        <div
          ref={teamRef}
          className={`max-w-4xl mx-auto transition-all duration-300 ${
            teamVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="text-center mb-12">
            <p className="text-sm font-heading text-primary tracking-wider mb-3">
              SECTION B
            </p>
            <h2 className="text-4xl md:text-5xl font-heading mb-4">
              <span className="text-gradient-animate glow-green">
                THE AGENTIC TEAM THAT RUNS IT
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A layered organisation with a single human at the top for direction
              and decisions. Authority and accountability flow downward, evidence
              flows back up, and an independent reviewer gates everything before
              it lands.
            </p>
          </div>

          <div className="space-y-8">
            {teamLayers.map((layer, index) => {
              const LayerIcon = layer.icon;
              const accent =
                layer.tagKind === "human" ? "secondary" : "primary";
              const isGate = layer.tagKind === "gate";
              return (
                <div key={index} className="relative">
                  <Card
                    className={`glass-card ${
                      isGate
                        ? "border border-dashed border-primary/40 bg-primary/[0.03]"
                        : accent === "secondary"
                        ? "border border-secondary/30"
                        : "border border-primary/20"
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border ${
                            accent === "secondary"
                              ? "bg-secondary/10 border-secondary/30"
                              : "bg-primary/10 border-primary/30"
                          }`}
                        >
                          <LayerIcon
                            className={`w-6 h-6 ${
                              accent === "secondary"
                                ? "text-secondary"
                                : "text-primary"
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h3 className="text-xl font-heading text-foreground">
                              {layer.role}
                            </h3>
                            <span
                              className={`text-[0.6rem] font-heading tracking-widest uppercase rounded px-2 py-0.5 border ${
                                layer.tagKind === "human"
                                  ? "text-secondary border-secondary/40"
                                  : "text-primary border-primary/40"
                              }`}
                            >
                              {layer.tag}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {layer.description}
                          </p>

                          {layer.cards && (
                            <div className="grid sm:grid-cols-3 gap-3 mt-4">
                              {layer.cards.map((c, ci) => (
                                <div
                                  key={ci}
                                  className="bg-background/40 border border-border rounded-lg p-3"
                                >
                                  <div className="text-sm font-heading text-foreground mb-1">
                                    {c.title}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {c.detail}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  {/* Connector to next layer */}
                  {index < teamLayers.length - 1 && (
                    <div className="flex justify-center py-2">
                      <div className="w-px h-6 bg-gradient-to-b from-primary/50 to-transparent" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section C: The standing protocol */}
      <section className="container mx-auto px-4 mb-24 section-glow" id="protocol">
        <div
          ref={protocolRef}
          className={`max-w-6xl mx-auto transition-all duration-300 ${
            protocolVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <div className="text-center mb-12">
            <p className="text-sm font-heading text-primary tracking-wider mb-3">
              SECTION C
            </p>
            <h2 className="text-4xl md:text-5xl font-heading mb-4">
              <span className="text-gradient-animate glow-green">
                THE STANDING PROTOCOL
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The guardrails that hold across every project and every change.
              They are the reason the lifecycle stays trustworthy at speed.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guardrails.map((g, index) => (
              <Card key={index} className="card-enhanced group h-full">
                <CardContent className="p-6">
                  <div className="w-9 h-1 bg-primary rounded mb-4 transition-all group-hover:w-14" />
                  <h3 className="text-lg font-heading text-foreground mb-2 group-hover:text-primary transition-colors">
                    {g.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {g.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Six core principles strip */}
          <div className="relative max-w-6xl mx-auto mt-10">
            <Card className="glass-card border border-primary/30 shadow-glow-card">
              <CardContent className="p-8">
                <p className="text-sm font-heading text-primary tracking-wider mb-6 text-center">
                  SIX CORE PRINCIPLES, APPLIED TO EVERY CHANGE
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {principles.map((p, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 bg-background/40 border border-border rounded-lg p-3"
                    >
                      <span className="text-lg font-heading text-primary min-w-[1.25rem]">
                        {index + 1}
                      </span>
                      <span className="text-sm font-heading text-foreground">
                        {p}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Run this discipline yourself (open source) */}
      <section className="container mx-auto px-4 py-12" id="open-source">
        <div className="relative max-w-4xl mx-auto">
          {/* Cyber corners */}
          <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-secondary/60" />
          <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-secondary/60" />
          <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-secondary/60" />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-secondary/60" />

          <Card className="glass-card border border-secondary/30 shadow-glow-card">
            <CardContent className="p-10">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="w-16 h-16 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0 border border-secondary/30">
                  <Github className="w-8 h-8 text-secondary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <div className="text-sm text-secondary font-semibold uppercase tracking-wide">
                      Open Source
                    </div>
                    <span className="text-[0.6rem] font-heading tracking-widest uppercase text-secondary border border-secondary/40 rounded px-2 py-0.5">
                      MIT Licensed
                    </span>
                  </div>
                  <h2 className="text-3xl font-heading text-foreground mb-4">
                    Run this discipline yourself
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    The principles and guardrails on this page are packaged as an
                    open-source Claude Code plugin: hooks, skills, and dispatch and
                    verification commands, MIT licensed. Explore the repository and
                    adopt the method in your own team.
                  </p>
                  <Button
                    size="lg"
                    variant="outline"
                    className="group border-2 border-secondary/50 text-secondary hover:bg-secondary/10 hover:border-secondary font-semibold px-8 py-6 transition-all duration-300 hover:scale-105"
                    asChild
                  >
                    <a
                      href="https://github.com/The-Ai-Expert/discipline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-5 h-5 mr-2" />
                      The Ai Expert Discipline on GitHub
                      <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 py-12">
        <div
          ref={ctaRef}
          className={`transition-all duration-300 ${
            ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-primary/60" />
            <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-primary/60" />
            <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-primary/60" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-primary/60" />

            <Card className="glass-card border border-primary/30 shadow-glow-card">
              <CardContent className="p-10 md:p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">
                  THE SAME RIGOUR,{" "}
                  <span className="text-primary glow-green">ON YOUR BUILD</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  This is how we ship. If you want spec-driven, verified delivery
                  on your next AI project, let us walk you through it.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="group relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-semibold px-10 py-6 shadow-cyber transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsla(155,100%,45%,0.4)] btn-shimmer"
                    asChild
                  >
                    <a href="https://calendly.com/eschwaa/aiconsult">
                      <Calendar className="w-5 h-5 mr-2" />
                      Book a Strategy Call
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="group border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary text-lg font-semibold px-10 py-6 transition-all duration-300 hover:scale-105"
                    asChild
                  >
                    <Link to="/process">
                      <ArrowRight className="w-5 h-5 mr-2 rotate-180" />
                      Back to Our Process
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RuneSDLC;
