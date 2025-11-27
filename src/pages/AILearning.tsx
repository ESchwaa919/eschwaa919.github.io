import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  BookOpen,
  Clock,
  Award,
  Target,
  Filter,
  TrendingUp,
  Users,
  Lightbulb,
  Sparkles,
  ArrowRight,
  Rocket,
  Zap,
  GraduationCap,
  Brain
} from "lucide-react"
import { toast } from "sonner"
import { useNavigate, Link } from "react-router-dom"
import cyberGrid from "@/assets/cyber-grid.jpg"

const AILearning = () => {
  const navigate = useNavigate()

  const handleLaunchTool = () => {
    toast.info("The AI Learning Path Generator is being updated with new features. Contact us to learn more!")
    navigate('/contact')
  }

  const features = [
    {
      icon: Target,
      title: "Tailored Topics",
      description: "Focus on what matters most - Foundations, GenAI, Ethics, ROI, and more"
    },
    {
      icon: Clock,
      title: "Time-Optimized",
      description: "Resources that fit your schedule, from 30-minute videos to full courses"
    },
    {
      icon: Filter,
      title: "Format Preferences",
      description: "Choose from videos, interactive courses, or text-based learning"
    },
    {
      icon: Award,
      title: "Certifications",
      description: "Option to prioritize courses with certificates and badges"
    },
  ]

  const steps = [
    {
      number: "1",
      title: "Set Your Preferences",
      description: "Tell us which topics you want to cover, how much time you have per session, and your preferred learning formats"
    },
    {
      number: "2",
      title: "Smart Matching Algorithm",
      description: "Our engine scores hundreds of verified resources based on topic coverage, time fit, format, and regional relevance"
    },
    {
      number: "3",
      title: "Get Your Personalized Path",
      description: "Receive a curated learning journey with diverse sources from top providers like DeepLearning.AI, Google, Microsoft, and more"
    },
  ]

  const topics = [
    { icon: BookOpen, title: "AI Foundations", description: "Core concepts, machine learning basics, and AI history" },
    { icon: Lightbulb, title: "Generative AI", description: "LLMs, ChatGPT, prompt engineering, and content generation" },
    { icon: Target, title: "Responsible AI", description: "Ethics, bias mitigation, transparency, and governance" },
    { icon: TrendingUp, title: "Business & ROI", description: "Use cases, implementation strategies, and value measurement" },
    { icon: Users, title: "Leadership", description: "Change management, team building, and organizational readiness" },
    { icon: Brain, title: "Technical Deep Dives", description: "Model training, fine-tuning, RAG, and advanced techniques" },
  ]

  return (
    <div className="min-h-screen bg-background">
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

        <div className="container mx-auto px-4 relative z-10 py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8">
              <GraduationCap className="w-4 h-4 text-primary" />
              <span className="text-sm font-heading text-primary">
                Personalized AI Education
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-heading leading-tight mb-6">
              <span className="text-primary glow-green">AI LEARNING</span>
              <br />
              <span className="text-foreground">PATH GENERATOR</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Curated AI learning resources from verified, free sources tailored to your needs and schedule
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={handleLaunchTool}
                className="bg-primary text-primary-foreground hover:bg-primary/90 glow-green text-lg font-semibold px-8 py-6 shadow-cyber transition-all hover:scale-105"
              >
                <Rocket className="mr-2 w-5 h-5" />
                Launch Learning Path Tool
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-primary text-primary hover:bg-primary/10 text-lg font-semibold px-8 py-6 transition-all hover:scale-105"
              >
                <Link to="/contact">
                  Request Custom Training
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading mb-6">
              <span className="text-foreground">PERSONALIZED </span>
              <span className="text-primary glow-green">AI EDUCATION</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our intelligent learning path generator analyzes your needs, preferences, and available time to recommend the perfect mix of courses, videos, and resources.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 shadow-cyber">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center border-2 border-primary mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading text-foreground mb-3">{feature.title.toUpperCase()}</h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading mb-6">
              <span className="text-foreground">HOW IT </span>
              <span className="text-primary glow-green">WORKS</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-primary/10 border-2 border-primary flex items-center justify-center">
                  <span className="text-2xl font-heading text-primary glow-green">{step.number}</span>
                </div>
                <div className="pt-2">
                  <h3 className="text-2xl font-heading text-foreground mb-2">{step.title.toUpperCase()}</h3>
                  <p className="text-muted-foreground text-lg">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Topics Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading mb-6">
              <span className="text-foreground">COMPREHENSIVE </span>
              <span className="text-primary glow-green">TOPIC COVERAGE</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {topics.map((topic, index) => {
              const Icon = topic.icon
              return (
                <Card key={index} className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 shadow-cyber">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center border-2 border-primary mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading text-foreground mb-2">{topic.title.toUpperCase()}</h3>
                  <p className="text-muted-foreground">{topic.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <Card className="p-12 bg-gradient-cyber border-2 border-primary/30 text-center max-w-4xl mx-auto shadow-cyber">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-heading text-primary">START LEARNING</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading mb-4 text-foreground">
              START YOUR <span className="text-primary glow-green">AI LEARNING JOURNEY</span> TODAY
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Generate a personalized learning path in minutes. All resources are free, verified, and ready to use.
            </p>
            <Button
              size="lg"
              onClick={handleLaunchTool}
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-green text-lg font-semibold px-8 py-6 shadow-cyber transition-all hover:scale-105"
            >
              <Rocket className="mr-2 w-5 h-5" />
              Launch Learning Path Tool
            </Button>
          </Card>
        </div>
      </section>

      {/* Support CTA */}
      <section className="py-24">
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
    </div>
  )
}

export default AILearning
