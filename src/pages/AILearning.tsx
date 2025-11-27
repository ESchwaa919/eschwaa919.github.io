import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  BookOpen,
  Clock,
  Award,
  Target,
  TrendingUp,
  Users,
  Lightbulb,
  Sparkles,
  ArrowRight,
  Rocket,
  GraduationCap,
  Brain,
  ExternalLink,
  CheckCircle2,
  X,
  Play,
  FileText,
  Monitor,
  Download
} from "lucide-react"
import { Link } from "react-router-dom"
import { toast } from "sonner"
import emailjs from "@emailjs/browser"
import cyberGrid from "@/assets/cyber-grid.jpg"

// Types
interface Resource {
  id: string
  title: string
  provider: string
  url: string
  category: string
  type: string
  format: string
  durationMinutes: number
  topics: string[]
  certificateBadge: string
  commuteFriendly: boolean
  chunkable: boolean
  regionTags: string[]
}

interface Preferences {
  mustCover: string[]
  formatBias: string[]
  slotMinutes: number
  wantCertificate: boolean
}

interface Session {
  id: string
  title: string
  provider: string
  url: string
  durationMinutes: number
  category: string
  format: string
}

// Engine functions (adapted from engine.js)
function scoreResource(resource: Resource, prefs: Preferences, unmetTopics: string[]) {
  let score = 0
  const coverageCount = resource.topics.filter(t => unmetTopics.includes(t)).length
  score += coverageCount * 10

  if (resource.durationMinutes <= prefs.slotMinutes) {
    score += 4
  } else if (resource.chunkable && resource.durationMinutes <= prefs.slotMinutes * 4) {
    score += 2
  } else {
    score -= 3
  }

  const idx = prefs.formatBias.indexOf(resource.format)
  if (idx >= 0) {
    score += Math.max(0, 3 - idx)
  }

  if (prefs.wantCertificate) {
    if (resource.certificateBadge === "badge") score += 2
    if (resource.certificateBadge === "certificate_paid" || resource.certificateBadge === "certificate_free") score += 1
  }

  return { resource, score }
}

function generateLearningPath(catalog: Resource[], prefs: Preferences, maxSessions = 6): Session[] {
  const unmet = new Set(prefs.mustCover)
  const chosen: Resource[] = []
  const usedProviders = new Set<string>()

  // Two-pass greedy selection
  for (let pass = 0; pass < 2; pass++) {
    const scored = catalog
      .filter(r => !chosen.find(c => c.id === r.id))
      .map(r => scoreResource(r, prefs, Array.from(unmet)))
      .sort((a, b) => b.score - a.score)

    for (const s of scored) {
      if (chosen.length >= maxSessions) break
      if (pass === 0 && usedProviders.has(s.resource.provider)) continue

      chosen.push(s.resource)
      usedProviders.add(s.resource.provider)
      for (const t of s.resource.topics) unmet.delete(t)
    }
  }

  // Build sessions
  return chosen.map(r => ({
    id: r.id,
    title: r.title,
    provider: r.provider,
    url: r.url,
    durationMinutes: r.durationMinutes,
    category: r.category,
    format: r.format
  }))
}

const AILearning = () => {
  const [catalog, setCatalog] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [generatedPath, setGeneratedPath] = useState<Session[] | null>(null)
  const [showLeadModal, setShowLeadModal] = useState(false)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Preferences state
  const [selectedTopics, setSelectedTopics] = useState<string[]>(["Foundations", "GenAI", "ResponsibleAI"])
  const [slotMinutes, setSlotMinutes] = useState(60)
  const [preferredFormat, setPreferredFormat] = useState("video")
  const [wantCertificate, setWantCertificate] = useState(true)

  const topicOptions = [
    { id: "Foundations", label: "AI Foundations", icon: BookOpen },
    { id: "GenAI", label: "Generative AI", icon: Lightbulb },
    { id: "ResponsibleAI", label: "Responsible AI", icon: Target },
    { id: "RiskHallucinations", label: "Risk & Hallucinations", icon: Brain },
    { id: "ROI", label: "Business ROI", icon: TrendingUp },
    { id: "PromptEngineering", label: "Prompt Engineering", icon: FileText },
  ]

  const formatOptions = [
    { id: "video", label: "Video", icon: Play },
    { id: "interactive", label: "Interactive", icon: Monitor },
    { id: "text", label: "Text/Articles", icon: FileText },
  ]

  const timeOptions = [
    { value: 30, label: "30 min" },
    { value: 60, label: "1 hour" },
    { value: 120, label: "2 hours" },
    { value: 240, label: "Half day" },
  ]

  // Load catalog
  useEffect(() => {
    fetch("/data/catalog.json")
      .then(res => res.json())
      .then(data => {
        setCatalog(data)
        setLoading(false)
      })
      .catch(err => {
        console.error("Failed to load catalog:", err)
        setLoading(false)
      })
  }, [])

  const toggleTopic = (topicId: string) => {
    setSelectedTopics(prev =>
      prev.includes(topicId)
        ? prev.filter(t => t !== topicId)
        : [...prev, topicId]
    )
  }

  const handleGeneratePath = () => {
    if (selectedTopics.length === 0) {
      toast.error("Please select at least one topic")
      return
    }
    setShowLeadModal(true)
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Initialize EmailJS
      emailjs.init("oI6t4dwMhBXNaBKXo")

      // Send lead capture
      await emailjs.send(
        "theaiexpert_assessment",
        "template_dmkjg71",
        {
          from_name: name,
          from_email: email,
          company: "Not specified",
          downloaded_resource: "AI Learning Path Generator",
          download_date: new Date().toLocaleString(),
          lead_type: "Learning Path Generation",
          lead_source: "AI Learning Page",
        }
      )

      // Generate the path
      const prefs: Preferences = {
        mustCover: selectedTopics,
        formatBias: [preferredFormat, "video", "interactive", "text"].filter((v, i, a) => a.indexOf(v) === i),
        slotMinutes,
        wantCertificate
      }

      const path = generateLearningPath(catalog, prefs)
      setGeneratedPath(path)
      setShowLeadModal(false)
      setEmail("")
      setName("")

      toast.success("Your personalized learning path is ready!")

    } catch (error) {
      console.error("Error:", error)
      // Still generate path even if email fails
      const prefs: Preferences = {
        mustCover: selectedTopics,
        formatBias: [preferredFormat, "video", "interactive", "text"].filter((v, i, a) => a.indexOf(v) === i),
        slotMinutes,
        wantCertificate
      }
      const path = generateLearningPath(catalog, prefs)
      setGeneratedPath(path)
      setShowLeadModal(false)
      toast.success("Your personalized learning path is ready!")
    } finally {
      setIsSubmitting(false)
    }
  }

  const closeModal = () => {
    setShowLeadModal(false)
    setEmail("")
    setName("")
  }

  const formatDuration = (mins: number) => {
    if (mins < 60) return `${mins} min`
    const hours = Math.floor(mins / 60)
    const remaining = mins % 60
    return remaining > 0 ? `${hours}h ${remaining}m` : `${hours}h`
  }

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "video": return Play
      case "interactive": return Monitor
      default: return FileText
    }
  }

  const totalDuration = generatedPath?.reduce((sum, s) => sum + s.durationMinutes, 0) || 0

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 animate-data-stream"
          style={{
            backgroundImage: `url(${cyberGrid})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-cyber" />

        <div className="container mx-auto px-4 relative z-10 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8">
              <GraduationCap className="w-4 h-4 text-primary" />
              <span className="text-sm font-heading text-primary">
                {catalog.length} Free Resources Available
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-heading leading-tight mb-6">
              <span className="text-primary glow-green">AI LEARNING</span>
              <br />
              <span className="text-foreground">PATH GENERATOR</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get a personalized learning path from curated, free resources tailored to your goals and schedule
            </p>
          </div>
        </div>
      </section>

      {/* Configuration Section */}
      {!generatedPath && (
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
                <p className="text-muted-foreground">Loading resources...</p>
              </div>
            ) : (
              <div className="space-y-12">
                {/* Topics Selection */}
                <div>
                  <h2 className="text-2xl font-heading text-foreground mb-2">
                    1. SELECT YOUR <span className="text-primary">TOPICS</span>
                  </h2>
                  <p className="text-muted-foreground mb-6">Choose the areas you want to learn about</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {topicOptions.map(topic => {
                      const Icon = topic.icon
                      const isSelected = selectedTopics.includes(topic.id)
                      return (
                        <button
                          key={topic.id}
                          onClick={() => toggleTopic(topic.id)}
                          className={`p-4 rounded-lg border-2 transition-all text-left ${
                            isSelected
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              isSelected ? "bg-primary/20" : "bg-muted"
                            }`}>
                              <Icon className={`w-5 h-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                            </div>
                            <span className={`font-medium ${isSelected ? "text-primary" : "text-foreground"}`}>
                              {topic.label}
                            </span>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Time Slot */}
                <div>
                  <h2 className="text-2xl font-heading text-foreground mb-2">
                    2. AVAILABLE <span className="text-primary">TIME PER SESSION</span>
                  </h2>
                  <p className="text-muted-foreground mb-6">How much time can you dedicate to each learning session?</p>
                  <div className="flex flex-wrap gap-4">
                    {timeOptions.map(option => (
                      <button
                        key={option.value}
                        onClick={() => setSlotMinutes(option.value)}
                        className={`px-6 py-3 rounded-lg border-2 font-medium transition-all ${
                          slotMinutes === option.value
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/50 text-foreground"
                        }`}
                      >
                        <Clock className="w-4 h-4 inline mr-2" />
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Format Preference */}
                <div>
                  <h2 className="text-2xl font-heading text-foreground mb-2">
                    3. PREFERRED <span className="text-primary">FORMAT</span>
                  </h2>
                  <p className="text-muted-foreground mb-6">What's your preferred learning style?</p>
                  <div className="flex flex-wrap gap-4">
                    {formatOptions.map(format => {
                      const Icon = format.icon
                      return (
                        <button
                          key={format.id}
                          onClick={() => setPreferredFormat(format.id)}
                          className={`px-6 py-3 rounded-lg border-2 font-medium transition-all ${
                            preferredFormat === format.id
                              ? "border-secondary bg-secondary/10 text-secondary"
                              : "border-border hover:border-secondary/50 text-foreground"
                          }`}
                        >
                          <Icon className="w-4 h-4 inline mr-2" />
                          {format.label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Certificate Toggle */}
                <div>
                  <h2 className="text-2xl font-heading text-foreground mb-2">
                    4. <span className="text-primary">CERTIFICATES</span>
                  </h2>
                  <p className="text-muted-foreground mb-6">Prioritize courses that offer certificates or badges?</p>
                  <button
                    onClick={() => setWantCertificate(!wantCertificate)}
                    className={`px-6 py-3 rounded-lg border-2 font-medium transition-all ${
                      wantCertificate
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    <Award className="w-4 h-4 inline mr-2" />
                    {wantCertificate ? "Yes, prioritize certificates" : "Not important"}
                  </button>
                </div>

                {/* Generate Button */}
                <div className="pt-8">
                  <Button
                    size="lg"
                    onClick={handleGeneratePath}
                    disabled={selectedTopics.length === 0}
                    className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90 glow-green text-lg font-semibold px-12 py-6 shadow-cyber transition-all hover:scale-105"
                  >
                    <Rocket className="mr-2 w-5 h-5" />
                    Generate My Learning Path
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Results Section */}
      {generatedPath && (
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading mb-4">
                YOUR <span className="text-primary glow-green">PERSONALIZED</span> LEARNING PATH
              </h2>
              <p className="text-muted-foreground">
                {generatedPath.length} resources • {formatDuration(totalDuration)} total
              </p>
            </div>

            <div className="space-y-4 mb-12">
              {generatedPath.map((session, index) => {
                const FormatIcon = getFormatIcon(session.format)
                return (
                  <Card key={session.id} className="p-6 bg-card border-border hover:border-primary/50 transition-all shadow-cyber">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 border-2 border-primary flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-heading text-primary">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-semibold text-foreground mb-1">{session.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{session.provider}</p>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="flex items-center gap-1 text-muted-foreground">
                                <Clock className="w-4 h-4" />
                                {formatDuration(session.durationMinutes)}
                              </span>
                              <span className="flex items-center gap-1 text-muted-foreground">
                                <FormatIcon className="w-4 h-4" />
                                {session.format}
                              </span>
                              <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">
                                {session.category}
                              </span>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            asChild
                            className="bg-primary text-primary-foreground hover:bg-primary/90"
                          >
                            <a href={session.url} target="_blank" rel="noopener noreferrer">
                              Start
                              <ExternalLink className="ml-1 w-3 h-3" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                onClick={() => setGeneratedPath(null)}
                className="border-2 border-primary text-primary hover:bg-primary/10"
              >
                Generate New Path
              </Button>
              <Button
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90 glow-green shadow-cyber"
              >
                <a href="https://calendly.com/eschwaa/aiconsult" target="_blank" rel="noopener noreferrer">
                  Get Custom Training
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-heading mb-6">
              <span className="text-foreground">NEED </span>
              <span className="text-primary glow-green">CUSTOM TRAINING</span>
              <span className="text-foreground"> FOR YOUR TEAM?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Our learning path generator is perfect for self-directed learning. For team training, workshops, or customized curricula, let's talk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90 glow-green text-lg font-semibold px-8 py-6 shadow-cyber transition-all hover:scale-105"
              >
                <a href="https://calendly.com/eschwaa/aiconsult" target="_blank" rel="noopener noreferrer">
                  Schedule Consultation
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
      {showLeadModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="bg-card border-2 border-primary shadow-cyber max-w-md w-full">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-heading text-primary">
                  GENERATE PATH
                </h3>
                <button
                  onClick={closeModal}
                  className="w-8 h-8 rounded-lg hover:bg-border flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <p className="text-muted-foreground mb-6">
                Enter your details to generate your <strong className="text-foreground">personalized AI learning path</strong>
              </p>

              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="text-sm text-foreground mb-2 block">
                    Name *
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-background border-border"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="text-sm text-foreground mb-2 block">
                    Email *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-background border-border"
                    placeholder="your.email@company.com"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-green font-semibold py-6"
                >
                  {isSubmitting ? "Generating..." : "Generate My Learning Path"}
                  {!isSubmitting && <Rocket className="ml-2 w-4 h-4" />}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  We respect your privacy. No spam, ever.
                </p>
              </form>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

export default AILearning
