import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import SEOHead from "@/components/SEOHead"
import { StructuredData, createProductSchema, createFAQSchema } from "@/components/StructuredData"
import { Card } from "@/components/ui/card"
import {
  FileText,
  Clock,
  Shield,
  Zap,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  Play,
  Download,
  Brain,
  Users,
  Target,
  Award,
  ChevronDown,
  X,
  ExternalLink,
} from "lucide-react"
import cyberGrid from "@/assets/cyber-grid.jpg"
import { useLeadCapture } from "@/hooks/useLeadCapture"
import { LeadCaptureModal } from "@/components/LeadCaptureModal"

const AutoMLR = () => {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

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

  // Animated counter hook
  const useCounter = (target: number, duration = 2000) => {
    const [count, setCount] = useState(0)
    const [hasAnimated, setHasAnimated] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            let start = 0
            const increment = target / (duration / 16)
            const timer = setInterval(() => {
              start += increment
              if (start >= target) {
                setCount(target)
                clearInterval(timer)
              } else {
                setCount(Math.floor(start))
              }
            }, 16)
          }
        },
        { threshold: 0.5 }
      )
      if (ref.current) observer.observe(ref.current)
      return () => observer.disconnect()
    }, [target, duration, hasAnimated])

    return { count, ref }
  }

  const metric1 = useCounter(90)
  const metric2 = useCounter(15)
  const metric3 = useCounter(99)
  const metric4 = useCounter(24)

  const handleDownloadWhitepaper = () => {
    checkAndDownload(
      "AutoMLR Technical Whitepaper",
      "/automlr/automlr-whitepaper.pdf",
      "AutoMLR Page"
    )
  }

  const handleWatchDemo = () => {
    setShowVideoModal(true)
  }

  const closeVideoModal = () => {
    setShowVideoModal(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  const problems = [
    { icon: Clock, title: "Lengthy Delays", description: "Manual review processes take weeks, creating bottlenecks in product launches and critical communications." },
    { icon: XCircle, title: "Inconsistent Decisions", description: "Human reviewers apply different standards, leading to conflicting decisions and compliance risks." },
    { icon: Target, title: "Limited Scalability", description: "Traditional systems can't handle increasing volumes while maintaining quality and speed." },
  ]

  const pipelineSteps = [
    { icon: FileText, title: "Content Ingestion", description: "Direct Veeva Vault integration" },
    { icon: Brain, title: "AI Multi-Agent Review", description: "Intelligent analysis & flagging" },
    { icon: Users, title: "Human Override", description: "Expert review when needed" },
    { icon: CheckCircle2, title: "Instant Approval", description: "Automated compliance & audit" },
  ]

  const comparisonFeatures = [
    { feature: "Veeva Vault Integration", automlr: "Native, zero-config connector", other: "Limited / vendor-specific", automlrGood: true, otherBad: false },
    { feature: "Real-time Processing (<15s)", automlr: "Seconds, not hours", other: "Typically hours–days", automlrGood: true, otherBad: true },
    { feature: "Multi-Agent AI Architecture", automlr: "Yes", other: "Single model / rule engine", automlrGood: true, otherBad: true },
    { feature: "Regulatory Compliance Packs", automlr: "FDA today, EU/JP roadmap", other: "Manual or service-heavy", automlrGood: true, otherBad: false },
    { feature: "15-Second Latency (P95)", automlr: "Proven SLO", other: "Not publicly documented", automlrGood: true, otherBad: true },
    { feature: "Cryptographically-Sealed Audit", automlr: "Immutable, tamper-proof trail", other: "Basic logs only", automlrGood: true, otherBad: false },
  ]

  const howItWorks = [
    { title: "Content Ingestion", description: "Documents are automatically pulled from Veeva Vault and preprocessed for AI analysis with complete metadata preservation." },
    { title: "Multi-Agent AI Review", description: "Specialized AI agents analyze content for regulatory compliance, medical accuracy, and legal requirements in parallel." },
    { title: "Expert Human Validation", description: "All AI decisions can be reviewed and overridden by human experts. Complex cases are automatically escalated with full context." },
    { title: "Human-Validated Approval", description: "Only human-approved content is updated in Veeva Vault with complete audit trail for full regulatory traceability." },
  ]

  const faqs = [
    { question: "How does AutoMLR maintain human control and oversight?", answer: "AutoMLR is designed as a human-in-the-loop system. AI handles initial analysis and flags potential issues, but humans maintain final authority on all decisions. Reviewers can override any AI recommendation, add contextual notes, and escalate complex cases." },
    { question: "How quickly can AutoMLR be integrated with our Veeva Vault?", answer: "AutoMLR can be integrated with your existing Veeva Vault instance within 2-4 weeks. Our team handles the complete setup, configuration, and testing to ensure seamless operation without disrupting your current workflows." },
    { question: "Which regulatory frameworks does AutoMLR support?", answer: "AutoMLR is pre-configured for FDA, EMA, MHRA, and PMDA requirements. The system automatically adapts review criteria based on your target markets and can be customized for additional regulatory frameworks." },
    { question: "What happens when the AI identifies potential compliance issues?", answer: "When potential issues are detected, AutoMLR provides detailed explanations, suggests corrections, and can automatically escalate to human reviewers. All decisions include full audit trails and regulatory justifications." },
    { question: "Is our sensitive pharmaceutical data secure?", answer: "Yes, AutoMLR is built with enterprise-grade security including SOC 2 Type II compliance, HIPAA compliance, and GDPR compliance. All data is encrypted in transit and at rest, with role-based access controls." },
    { question: "Can AutoMLR handle different types of content?", answer: "AutoMLR supports all content types including promotional materials, medical information, clinical data, regulatory submissions, and training materials. The AI agents are specialized for different content types and regulatory requirements." },
  ]

  const trustBadges = ["Veeva Vault", "HIPAA", "GDPR", "SOC 2 Type II"]

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="AutoMLR | AI-Powered Medical Legal Review for Pharma | The AI Expert"
        description="Transform pharmaceutical compliance with AutoMLR's multi-agent AI. Accelerate medical legal review by 90% with human oversight, Veeva Vault integration, and regulatory compliance."
        keywords="medical legal review, MLR automation, pharma compliance, Veeva Vault integration, pharmaceutical AI, regulatory compliance, FDA compliance"
        canonicalUrl="/automlr"
        ogType="product"
      />
      <StructuredData schema={createProductSchema({
        name: "AutoMLR",
        description: "AI-powered medical legal review automation for pharmaceutical companies. Multi-agent AI with human oversight, native Veeva Vault integration, and FDA/EMA compliance.",
        url: "https://theaiexpert.ai/automlr"
      })} />
      <StructuredData schema={createFAQSchema(faqs)} />
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 animate-data-stream"
          style={{
            backgroundImage: `url(${cyberGrid})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-cyber" />

        <div className="container mx-auto px-4 relative z-10 py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-heading text-primary">
                Multi-Agent AI for Pharma Compliance
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-heading leading-tight mb-6">
              <span className="text-foreground">ACCELERATE</span>
              <br />
              <span className="text-primary glow-green">MEDICAL LEGAL REVIEW</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Transform your pharmaceutical compliance workflow with AutoMLR's intelligent automation. AI-powered review with human oversight ensures accuracy and regulatory compliance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                onClick={handleWatchDemo}
                className="bg-primary text-primary-foreground hover:bg-primary/90 glow-green text-lg font-semibold px-8 py-6 shadow-cyber transition-all hover:scale-105"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-primary text-primary hover:bg-primary/10 text-lg font-semibold px-8 py-6 transition-all hover:scale-105"
              >
                <a href="#demo">
                  Request a Demo
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
            </div>

            {/* Hero Metrics */}
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { value: "90%", label: "Faster Approvals" },
                { value: "15s", label: "Latency" },
                { value: "24/7", label: "Availability" },
              ].map((metric, index) => (
                <div
                  key={index}
                  className="px-6 py-4 rounded-lg bg-card/50 border border-border backdrop-blur-sm"
                >
                  <div className="text-2xl font-heading text-primary glow-green">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading mb-6">
              <span className="text-foreground">THE </span>
              <span className="text-secondary glow-pink">MLR BOTTLENECK</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Traditional review processes create costly delays, inconsistent decisions, and compliance risks that slow down critical pharmaceutical operations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {problems.map((problem, index) => {
              const Icon = problem.icon
              return (
                <Card key={index} className="p-8 bg-card border-2 border-secondary/30 hover:border-secondary/50 transition-all shadow-cyber">
                  <div className="w-16 h-16 rounded-lg bg-secondary/10 flex items-center justify-center border-2 border-secondary mb-6">
                    <Icon className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-2xl font-heading text-foreground mb-4">{problem.title.toUpperCase()}</h3>
                  <p className="text-muted-foreground">{problem.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading mb-6">
              <span className="text-foreground">THE </span>
              <span className="text-primary glow-green">AUTOMLR</span>
              <span className="text-foreground"> SOLUTION</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our multi-agent AI system transforms medical legal review with intelligent automation, instant processing, and seamless integration.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
            {/* Pipeline Visual */}
            <div className="space-y-6">
              {pipelineSteps.map((step, index) => {
                const Icon = step.icon
                return (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg bg-primary/10 border-2 border-primary flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-heading text-foreground">{step.title.toUpperCase()}</h4>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                    {index < pipelineSteps.length - 1 && (
                      <ChevronDown className="w-5 h-5 text-primary/50 absolute left-7 mt-20" />
                    )}
                  </div>
                )
              })}
            </div>

            {/* Solution Text */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-heading text-primary mb-3">AI + HUMAN INTELLIGENCE</h3>
                <p className="text-muted-foreground">
                  AutoMLR's multi-agent AI handles routine reviews and flags potential issues, while human experts maintain final authority on complex decisions. This hybrid approach delivers 90% faster processing while ensuring pharmaceutical-grade accuracy.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-heading text-primary mb-3">EXPERT OVERSIGHT ALWAYS</h3>
                <p className="text-muted-foreground">
                  AI recommendations are transparent and explainable. Human reviewers can override any decision, add context, and maintain full control. Built specifically for pharmaceutical workflows with native Veeva Vault integration.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-heading text-primary mb-3">TRUSTED GLOBAL COMPLIANCE</h3>
                <p className="text-muted-foreground">
                  Pre-configured for FDA, EMA, MHRA, and PMDA requirements with human validation at every critical checkpoint. AI accelerates the process, humans ensure compliance integrity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading mb-6">
              <span className="text-foreground">PROVEN </span>
              <span className="text-primary glow-green">RESULTS</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div ref={metric1.ref} className="text-center">
              <div className="text-5xl font-heading text-primary glow-green mb-2">{metric1.count}%</div>
              <div className="text-muted-foreground">Faster Review Process</div>
            </div>
            <div ref={metric2.ref} className="text-center">
              <div className="text-5xl font-heading text-primary glow-green mb-2">{metric2.count}s</div>
              <div className="text-muted-foreground">Average Latency</div>
            </div>
            <div ref={metric3.ref} className="text-center">
              <div className="text-5xl font-heading text-primary glow-green mb-2">{metric3.count}.9%</div>
              <div className="text-muted-foreground">Accuracy Rate</div>
            </div>
            <div ref={metric4.ref} className="text-center">
              <div className="text-5xl font-heading text-primary glow-green mb-2">{metric4.count}/7</div>
              <div className="text-muted-foreground">Availability</div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading mb-6">
              <span className="text-foreground">AUTOMLR VS </span>
              <span className="text-secondary glow-pink">TRADITIONAL</span>
            </h2>
          </div>

          <Card className="max-w-4xl mx-auto overflow-hidden border-2 border-border shadow-cyber">
            <div className="bg-gradient-to-r from-primary to-secondary p-4 text-center">
              <div className="grid grid-cols-3 gap-4 text-primary-foreground font-heading">
                <div>FEATURE</div>
                <div>AUTOMLR</div>
                <div>OTHER PLATFORMS</div>
              </div>
            </div>
            <div className="divide-y divide-border">
              {comparisonFeatures.map((row, index) => (
                <div key={index} className="grid grid-cols-3 gap-4 p-4 items-center">
                  <div className="font-medium text-foreground">{row.feature}</div>
                  <div className={`text-sm ${row.automlrGood ? 'text-primary' : 'text-muted-foreground'}`}>
                    <CheckCircle2 className="w-4 h-4 inline mr-2 text-primary" />
                    {row.automlr}
                  </div>
                  <div className={`text-sm ${row.otherBad ? 'text-secondary' : 'text-muted-foreground'}`}>
                    {row.otherBad ? (
                      <XCircle className="w-4 h-4 inline mr-2 text-secondary" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 inline mr-2 text-yellow-500" />
                    )}
                    {row.other}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading mb-6">
              <span className="text-foreground">HOW </span>
              <span className="text-primary glow-green">IT WORKS</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {howItWorks.map((step, index) => (
              <Card key={index} className="p-6 bg-card border-border hover:border-primary/50 transition-all shadow-cyber">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-heading text-lg mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-heading text-foreground mb-3">{step.title.toUpperCase()}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading mb-6">
              <span className="text-foreground">FREQUENTLY ASKED </span>
              <span className="text-primary glow-green">QUESTIONS</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className={`border-border overflow-hidden transition-all ${activeQuestion === index ? 'border-primary/50' : ''}`}
              >
                <button
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-card/50 transition-colors"
                  onClick={() => setActiveQuestion(activeQuestion === index ? null : index)}
                >
                  <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${activeQuestion === index ? 'rotate-180' : ''}`} />
                </button>
                {activeQuestion === index && (
                  <div className="px-6 pb-6 text-muted-foreground">
                    {faq.answer}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="demo" className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
            <div>
              <h2 className="text-4xl md:text-5xl font-heading mb-6">
                <span className="text-foreground">SEE </span>
                <span className="text-primary glow-green">AUTOMLR</span>
                <span className="text-foreground"> IN ACTION</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Schedule a personalized demo to see how AutoMLR can transform your medical legal review process.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {trustBadges.map((badge, index) => (
                  <span key={index} className="px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-sm text-primary">
                    {badge}
                  </span>
                ))}
              </div>

              <Button
                variant="outline"
                onClick={handleDownloadWhitepaper}
                className="border-2 border-primary text-primary hover:bg-primary/10"
              >
                <Download className="mr-2 w-4 h-4" />
                Download Technical Whitepaper
              </Button>
            </div>

            {/* Calendly Embed */}
            <Card className="p-6 bg-card border-border shadow-cyber">
              <div
                className="calendly-inline-widget"
                data-url="https://calendly.com/eschwaa/60-minute-meeting"
                style={{ minWidth: '320px', height: '500px' }}
              />
              <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async />
            </Card>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="bg-card border-2 border-primary shadow-cyber max-w-4xl w-full">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="text-xl font-heading text-primary">AUTOMLR PRODUCT DEMO</h3>
              <button
                onClick={closeVideoModal}
                className="w-8 h-8 rounded-lg hover:bg-border flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <div className="aspect-video bg-black">
              <video
                ref={videoRef}
                controls
                autoPlay
                className="w-full h-full"
              >
                <source src="/automlr/auto-mlr-demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </Card>
        </div>
      )}

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
        title="DOWNLOAD WHITEPAPER"
        resourceName="AutoMLR Technical Whitepaper"
        buttonText="Download Whitepaper"
        buttonIcon="download"
      />
    </div>
  )
}

export default AutoMLR
