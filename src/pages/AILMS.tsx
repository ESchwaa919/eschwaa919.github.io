import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  BookOpen,
  Zap,
  Search,
  Link2,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Download,
  Users,
  TrendingUp,
  ChevronDown,
  GraduationCap,
  Lightbulb,
  Target,
  Sparkles,
} from "lucide-react"
import cyberGrid from "@/assets/cyber-grid.jpg"
import { useLeadCapture } from "@/hooks/useLeadCapture"
import { LeadCaptureModal } from "@/components/LeadCaptureModal"

const AILMS = () => {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null)

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

  const metric1 = useCounter(70)
  const metric2 = useCounter(30)
  const metric3 = useCounter(85)

  const handleDownloadWhitepaper = () => {
    checkAndDownload(
      "AI Enrichment for LMS Whitepaper",
      "/ailms/ailms-whitepaper.pdf",
      "AILMS Page"
    )
  }

  const scrollToDemo = () => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })
  }

  const staticProblems = [
    "One-size-fits-all courses leave some students lost or bored",
    "Static lessons limit engagement and retention",
    "Content creators lack tools to adapt materials dynamically",
    "Linear progression ignores individual learning styles",
  ]

  const dynamicBenefits = [
    "Personalized pathways adapt to each learner's needs",
    "Interactive experiences boost engagement and retention",
    "Smart content discovery surfaces relevant materials",
    "Branching scenarios accommodate different learning styles",
  ]

  const benefits = [
    { icon: Target, title: "Custom Learning Paths", description: "Adaptive journeys based on student needs and progress, ensuring every learner finds their optimal route to mastery." },
    { icon: Zap, title: "Interactive Experiences", description: "Quizzes, simulations, conversational study guides that transform passive consumption into active engagement." },
    { icon: Search, title: "Smarter Discovery", description: "AI surfaces related lessons and materials contextually, creating serendipitous learning moments." },
    { icon: Link2, title: "Seamless Integration", description: "Works with major LMS platforms without disrupting existing workflows or requiring content migration." },
  ]

  const howItWorks = [
    { title: "Connect", description: "Plug into your LMS in minutes with our seamless API integration. No disruption to existing workflows." },
    { title: "Enrich", description: "AI analyzes your courses and builds adaptive paths, creating personalized learning journeys for each student." },
    { title: "Engage", description: "Students interact dynamically with enriched material through personalized quizzes, simulations, and guided discoveries." },
    { title: "Evolve", description: "AI learns from every interaction, continuously improving experiences and outcomes for all learners." },
  ]

  const faqs = [
    { question: "What is AI Enrichment for LMS?", answer: "AI Enrichment enhances your existing courses with personalization and interactivity to dramatically improve learning outcomes. It transforms static content into dynamic, adaptive experiences." },
    { question: "Do I need to rebuild my courses?", answer: "No, our AI enrichment works with your existing content and LMS platforms. There's no need to migrate or rebuild - we enhance what you already have." },
    { question: "Which LMS platforms are supported?", answer: "We support Canvas, Moodle, Blackboard, TalentLMS, and many others via our flexible API integration. Contact us to discuss your specific platform." },
    { question: "How does AI personalize learning paths?", answer: "Our AI adapts based on student behavior, preferences, and progress. It creates branching pathways, suggests relevant content, and adjusts difficulty in real-time." },
    { question: "Do educators keep control?", answer: "Absolutely. Teachers can edit, override, or customize any AI suggestions. You maintain full control while benefiting from intelligent automation." },
    { question: "Is student data safe?", answer: "Yes, we're fully GDPR, FERPA, and COPPA compliant with end-to-end encryption. Student privacy and data security are our top priorities." },
    { question: "What results can I expect?", answer: "Our beta users see 70% higher engagement, 30% faster completion rates, and significantly improved knowledge retention scores." },
  ]

  const trustSignals = [
    { icon: CheckCircle2, text: "Works with top LMS platforms" },
    { icon: TrendingUp, text: "Proven to improve student engagement" },
    { icon: Users, text: "Compliant with global education privacy standards" },
  ]

  return (
    <div className="min-h-screen bg-background">
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
              <GraduationCap className="w-4 h-4 text-primary" />
              <span className="text-sm font-heading text-primary">
                AI-Powered Learning Enhancement
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-heading leading-tight mb-6">
              <span className="text-foreground">TURN LESSONS INTO</span>
              <br />
              <span className="text-primary glow-green">LIVING JOURNEYS</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              AI enrichment transforms static content into dynamic, personalized pathways that adapt to every learner.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={scrollToDemo}
                className="bg-primary text-primary-foreground hover:bg-primary/90 glow-green text-lg font-semibold px-8 py-6 shadow-cyber transition-all hover:scale-105"
              >
                <Sparkles className="mr-2 w-5 h-5" />
                Book a Demo
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleDownloadWhitepaper}
                className="border-2 border-primary text-primary hover:bg-primary/10 text-lg font-semibold px-8 py-6 transition-all hover:scale-105"
              >
                <Download className="mr-2 w-5 h-5" />
                Download Whitepaper
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading mb-6">
              <span className="text-foreground">TRADITIONAL LMS </span>
              <span className="text-secondary glow-pink">FALLS FLAT</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Static Learning */}
            <Card className="p-8 bg-card border-2 border-secondary/30 shadow-cyber">
              <div className="w-16 h-16 rounded-lg bg-secondary/10 flex items-center justify-center border-2 border-secondary mb-6">
                <BookOpen className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-heading text-secondary mb-6">STATIC LEARNING</h3>
              <ul className="space-y-4">
                {staticProblems.map((problem, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{problem}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* AI-Enriched Learning */}
            <Card className="p-8 bg-card border-2 border-primary/30 shadow-cyber">
              <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center border-2 border-primary mb-6">
                <Lightbulb className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-heading text-primary mb-6">AI-ENRICHED LEARNING</h3>
              <ul className="space-y-4">
                {dynamicBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading mb-6">
              <span className="text-foreground">PERSONALIZED, ADAPTIVE </span>
              <span className="text-primary glow-green">LEARNING</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Powered by AI that understands how every student learns best.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <Card key={index} className="p-6 bg-card border-border hover:border-primary/50 transition-all shadow-cyber">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center border-2 border-primary mb-4">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading text-foreground mb-3">{benefit.title.toUpperCase()}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </Card>
              )
            })}
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

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
            <div ref={metric1.ref} className="text-center">
              <div className="text-5xl font-heading text-primary glow-green mb-2">{metric1.count}%</div>
              <div className="text-muted-foreground">Higher Learner Engagement</div>
            </div>
            <div ref={metric2.ref} className="text-center">
              <div className="text-5xl font-heading text-secondary glow-pink mb-2">{metric2.count}%</div>
              <div className="text-muted-foreground">Faster Course Completion</div>
            </div>
            <div ref={metric3.ref} className="text-center">
              <div className="text-5xl font-heading text-primary glow-green mb-2">{metric3.count}%</div>
              <div className="text-muted-foreground">Improved Knowledge Retention</div>
            </div>
          </div>

          {/* Testimonial */}
          <Card className="max-w-3xl mx-auto p-8 bg-gradient-cyber border-2 border-primary/30 shadow-cyber">
            <p className="text-xl text-foreground italic mb-4">
              "This transformed how our students connected with material—learning finally feels alive. The personalized pathways have increased engagement across all our courses."
            </p>
            <p className="text-muted-foreground">— Beta Educator, Early Access Program</p>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading mb-6">
              <span className="text-foreground">HOW </span>
              <span className="text-primary glow-green">IT WORKS</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {howItWorks.map((step, index) => (
              <Card key={index} className="p-6 bg-card border-border hover:border-primary/50 transition-all shadow-cyber relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-heading text-sm">
                  {index + 1}
                </div>
                <h3 className="text-xl font-heading text-foreground mb-3 mt-4 text-center">{step.title.toUpperCase()}</h3>
                <p className="text-sm text-muted-foreground text-center">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-card/50">
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
      <section id="demo" className="py-24">
        <div className="container mx-auto px-4">
          <Card className="max-w-5xl mx-auto p-12 bg-gradient-cyber border-2 border-primary/30 shadow-cyber">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-4xl font-heading mb-6">
                  <span className="text-foreground">SEE AI ENRICHMENT </span>
                  <span className="text-primary glow-green">IN ACTION</span>
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Book a demo to see how AI transforms your courses, or download our whitepaper to explore the research behind adaptive learning.
                </p>

                <Button
                  variant="outline"
                  onClick={handleDownloadWhitepaper}
                  className="border-2 border-primary text-primary hover:bg-primary/10 mb-8"
                >
                  <Download className="mr-2 w-4 h-4" />
                  Download Whitepaper
                </Button>

                <div className="flex flex-wrap gap-4">
                  {trustSignals.map((signal, index) => {
                    const Icon = signal.icon
                    return (
                      <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon className="w-4 h-4 text-primary" />
                        <span>{signal.text}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Calendly Embed */}
              <Card className="p-4 bg-card border-border shadow-cyber">
                <div
                  className="calendly-inline-widget"
                  data-url="https://calendly.com/eschwaa/60-minute-meeting"
                  style={{ minWidth: '280px', height: '500px' }}
                />
                <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async />
              </Card>
            </div>
          </Card>
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
        title="DOWNLOAD WHITEPAPER"
        resourceName="AI Enrichment for LMS Whitepaper"
        buttonText="Download Whitepaper"
        buttonIcon="download"
      />
    </div>
  )
}

export default AILMS
