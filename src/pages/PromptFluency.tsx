import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import SEOHead from "@/components/SEOHead"
import {
  CheckCircle2,
  Target,
  Zap,
  Shield,
  FileText,
  Users,
  Code,
  BarChart3,
  HeadphonesIcon,
  GraduationCap,
  Search,
  Download,
  ArrowRight,
  Sparkles,
  MessageSquare,
  ListOrdered,
  Layout,
  Lightbulb,
} from "lucide-react"
import { Link } from "react-router-dom"
import cyberGrid from "@/assets/cyber-grid.jpg"
import { useLeadCapture } from "@/hooks/useLeadCapture"
import { LeadCaptureModal } from "@/components/LeadCaptureModal"
import { useScrollReveal } from "@/hooks/useScrollReveal"

const PromptFluency = () => {
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
  } = useLeadCapture()

  // Scroll reveal hooks
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal({ threshold: 0.1 })
  const { ref: whyRef, isVisible: whyVisible } = useScrollReveal({ threshold: 0.1 })
  const { ref: crispRef, isVisible: crispVisible } = useScrollReveal({ threshold: 0.1 })

  const handleDownloadClick = () => {
    checkAndDownload(
      "Prompt Fluency Toolkit",
      "/downloads/Prompt Fluency Toolkit.pdf",
      "Prompt Fluency Page"
    )
  }

  const crispFramework = [
    {
      icon: MessageSquare,
      letter: "C",
      title: "Context",
      description: "Set the stage with relevant background information. The more context you provide, the more tailored and accurate the response."
    },
    {
      icon: Users,
      letter: "R",
      title: "Role",
      description: "Define the AI's perspective. Asking it to act as an expert in a specific domain can dramatically improve response quality."
    },
    {
      icon: ListOrdered,
      letter: "I",
      title: "Instructions",
      description: "Be clear and specific about what you want. Break complex requests into step-by-step instructions."
    },
    {
      icon: Layout,
      letter: "S",
      title: "Structure",
      description: "Specify the desired format of the output—bullets, tables, code, or narrative prose."
    },
    {
      icon: Lightbulb,
      letter: "P",
      title: "Prompting Techniques",
      description: "Leverage advanced techniques like chain-of-thought reasoning, few-shot examples, and self-consistency."
    },
  ]

  const bestPractices = [
    { title: "Be Specific", description: "Vague prompts yield vague results. Clear, detailed instructions produce superior outputs." },
    { title: "Iterate & Refine", description: "Treat prompting as a conversation. Use follow-up questions to guide the AI toward better results." },
    { title: "Provide Examples", description: "Show the AI what you want. Few-shot learning dramatically improves output quality." },
    { title: "Set Constraints", description: "Define boundaries—word count, tone, format, or style—to keep outputs focused." },
    { title: "Use Chain-of-Thought", description: "Ask the AI to show its reasoning process for complex problem-solving tasks." },
    { title: "Protect Sensitive Data", description: "Never share confidential information. Anonymize data before processing." },
  ]

  const applications = [
    {
      icon: FileText,
      title: "Content Creation",
      items: ["Blog posts and articles", "Marketing copy and email campaigns", "Social media content", "Product descriptions"]
    },
    {
      icon: Code,
      title: "Technical Work",
      items: ["Code generation and debugging", "API documentation", "Database queries", "Technical specifications"]
    },
    {
      icon: BarChart3,
      title: "Business Analysis",
      items: ["Data analysis and insights", "Competitive research", "Market analysis reports", "Strategic recommendations"]
    },
    {
      icon: HeadphonesIcon,
      title: "Customer Support",
      items: ["Response templates", "FAQ generation", "Troubleshooting guides", "Knowledge base articles"]
    },
    {
      icon: GraduationCap,
      title: "Learning & Training",
      items: ["Personalized learning paths", "Quiz and assessment creation", "Training material development", "Concept explanations"]
    },
    {
      icon: Search,
      title: "Research & Discovery",
      items: ["Literature reviews", "Trend analysis", "Summarization of complex documents", "Hypothesis generation"]
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Prompt Fluency Toolkit | Master AI Communication | The AI Expert"
        description="Master the art of AI communication with the CRISP framework. Download our free Prompt Fluency Toolkit with best practices, examples, and techniques for effective prompting."
        keywords="prompt engineering, prompt fluency, CRISP framework, AI prompting, ChatGPT prompts, effective prompting, AI communication"
        canonicalUrl="/promptfluency"
      />
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Animated Background */}
        <div
          className="absolute inset-0 opacity-20 animate-data-stream"
          style={{
            backgroundImage: `url(${cyberGrid})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-cyber" />

        <div
          ref={heroRef}
          className={`container mx-auto px-4 relative z-10 py-32 transition-all duration-300 ${
            heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-heading text-primary">
                Master AI Communication
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-heading leading-tight mb-6">
              <span className="text-gradient-animate">PROMPT FLUENCY</span>
              <br />
              <span className="text-foreground">TOOLKIT</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Master the Art of AI Communication and Unlock Your Organization's Full Potential
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={handleDownloadClick}
                className="group relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-semibold px-8 py-6 shadow-cyber transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsla(155,100%,45%,0.4)] btn-shimmer"
              >
                <Download className="mr-2 w-5 h-5 transition-transform group-hover:scale-110" />
                Download Free Toolkit
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="group border-2 border-primary text-primary hover:bg-primary/10 text-lg font-semibold px-8 py-6 transition-all duration-300 hover:scale-105"
              >
                <a href="https://calendly.com/eschwaa/30min" target="_blank" rel="noopener noreferrer">
                  Schedule Strategy Call
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section className="py-24 relative">
        <div className="section-glow" />
        <div
          ref={whyRef}
          className={`container mx-auto px-4 transition-all duration-300 ${
            whyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading mb-6">
              <span className="text-foreground">WHY </span>
              <span className="text-gradient-animate">PROMPT FLUENCY</span>
              <span className="text-foreground"> MATTERS</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              In the age of generative AI, the ability to communicate effectively with AI systems is becoming as fundamental as digital literacy itself. <span className="text-primary font-semibold">Prompt fluency</span> is the key to unlocking AI's transformative potential for your organization.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Target, title: "STRATEGIC FOUNDATION", desc: "Move beyond trial-and-error to systematic, repeatable prompt strategies that deliver consistent results across your organization." },
              { icon: Zap, title: "PRODUCTIVITY MULTIPLIER", desc: "Transform AI from a novelty into a productivity powerhouse by mastering the techniques that unlock its full capabilities." },
              { icon: Shield, title: "RISK MITIGATION", desc: "Learn best practices for responsible AI use that protect your data, maintain quality, and ensure compliance." },
            ].map((item, index) => (
              <Card key={index} className="card-enhanced group p-8">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/30 mb-6 group-hover:bg-primary/20 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_hsla(155,100%,45%,0.2)] transition-all">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-heading text-foreground mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CRISP Framework Section */}
      <section className="py-24 bg-card/50 relative">
        <div
          ref={crispRef}
          className={`container mx-auto px-4 transition-all duration-300 ${
            crispVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading mb-6">
              <span className="text-foreground">THE </span>
              <span className="text-gradient-animate">CRISP</span>
              <span className="text-foreground"> FRAMEWORK</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our battle-tested framework for crafting effective prompts that drive results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {crispFramework.map((item, index) => {
              const Icon = item.icon
              return (
                <Card key={index} className="p-6 bg-card border-border hover:border-secondary/50 transition-all duration-300 hover:-translate-y-1 shadow-cyber">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center border-2 border-secondary">
                      <span className="text-2xl font-heading text-secondary glow-pink">{item.letter}</span>
                    </div>
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-xl font-heading text-foreground mb-3">{item.title.toUpperCase()}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Best Practices Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading mb-6">
              <span className="text-foreground">ESSENTIAL </span>
              <span className="text-primary glow-green">BEST PRACTICES</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {bestPractices.map((item, index) => (
              <Card key={index} className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 shadow-cyber flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                </div>
                <div>
                  <span className="text-foreground font-semibold">{item.title}: </span>
                  <span className="text-muted-foreground">{item.description}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Real-World Applications Section */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading mb-6">
              <span className="text-foreground">REAL-WORLD </span>
              <span className="text-primary glow-green">APPLICATIONS</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {applications.map((item, index) => {
              const Icon = item.icon
              return (
                <Card key={index} className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 shadow-cyber">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center border-2 border-primary mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-xl font-heading text-foreground mb-4">{item.title.toUpperCase()}</h4>
                  <ul className="space-y-2">
                    {item.items.map((subitem, subindex) => (
                      <li key={subindex} className="flex items-start gap-2 text-muted-foreground text-sm">
                        <span className="text-secondary font-bold">→</span>
                        <span>{subitem}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Download CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <Card className="p-12 bg-gradient-cyber border-2 border-primary/30 text-center max-w-4xl mx-auto shadow-cyber">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
              <Download className="w-4 h-4 text-primary" />
              <span className="text-sm font-heading text-primary">FREE DOWNLOAD</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading mb-4 text-foreground">
              GET YOUR FREE <span className="text-primary glow-green">PROMPT FLUENCY TOOLKIT</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Download the complete guide with frameworks, examples, and best practices you can implement today.
            </p>
            <Button
              size="lg"
              onClick={handleDownloadClick}
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-green text-lg font-semibold px-8 py-6 shadow-cyber transition-all hover:scale-105"
            >
              <Download className="mr-2 w-5 h-5" />
              Download Free Toolkit
            </Button>
          </Card>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-heading mb-6">
              <span className="text-foreground">READY TO </span>
              <span className="text-primary glow-green">TRANSFORM</span>
              <span className="text-foreground"> YOUR AI STRATEGY?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's discuss how prompt fluency can unlock productivity gains and competitive advantages for your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90 glow-green text-lg font-semibold px-8 py-6 shadow-cyber transition-all hover:scale-105"
              >
                <a href="https://calendly.com/eschwaa/aiconsult" target="_blank" rel="noopener noreferrer">
                  Schedule Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-primary text-primary hover:bg-primary/10 text-lg font-semibold px-8 py-6 transition-all hover:scale-105"
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
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
        title="DOWNLOAD TOOLKIT"
        resourceName="Prompt Fluency Toolkit"
        buttonText="Download Toolkit"
        buttonIcon="download"
      />
    </div>
  )
}

export default PromptFluency
