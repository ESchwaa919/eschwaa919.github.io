import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  GraduationCap,
  Users,
  Target,
  TrendingUp,
  CheckCircle2,
  Rocket,
  BookOpen,
  Award,
  Sparkles,
  ArrowRight,
  Brain,
  Zap
} from "lucide-react"
import { Link } from "react-router-dom"
import cyberGrid from "@/assets/cyber-grid.jpg"

const Skills = () => {
  const stats = [
    { value: "80%", label: "of organizations lack AI talent", color: "primary" },
    { value: "3x", label: "faster time-to-value with trained teams", color: "secondary" },
    { value: "60%", label: "productivity increase post-training", color: "primary" },
  ]

  const solutions = [
    {
      icon: GraduationCap,
      title: "Prompt Fluency Training",
      description: "Master the art of communicating with AI systems. Learn the CRISP framework, advanced prompting techniques, and best practices for getting consistent, high-quality outputs.",
      features: [
        "Half-day or full-day workshops",
        "Hands-on exercises with real use cases",
        "Tailored to your industry and tools",
      ],
      link: "/promptfluency",
      linkText: "Learn More About Prompt Fluency",
      accent: "primary"
    },
    {
      icon: BookOpen,
      title: "Personalized Learning Paths",
      description: "Every team member gets a customized AI education journey based on their role, experience level, and learning preferences. Self-paced, flexible, and always relevant.",
      features: [
        "Individual skill assessments",
        "Curated from 200+ verified resources",
        "Progress tracking and certificates",
      ],
      link: "/ai-learning",
      linkText: "Explore Learning Paths",
      accent: "secondary"
    },
    {
      icon: Users,
      title: "Executive AI Briefings",
      description: "Get your leadership team up to speed fast. No technical jargon, just strategic insights on what AI means for your business, your industry, and your competitive position.",
      features: [
        "2-4 hour executive sessions",
        "Industry-specific case studies",
        "Strategic roadmap development",
      ],
      link: "/services",
      linkText: "View All Services",
      accent: "primary"
    },
    {
      icon: Rocket,
      title: "Custom Team Workshops",
      description: "Tailored training programs designed around your specific AI initiatives, tools, and use cases. From prompt engineering to responsible AI deployment.",
      features: [
        "1-5 day intensive workshops",
        "Your tech stack, your use cases",
        "Post-training implementation support",
      ],
      link: "/contact",
      linkText: "Request Custom Workshop",
      accent: "secondary"
    },
  ]

  const philosophyItems = [
    {
      icon: Target,
      title: "Practical, Not Theoretical",
      description: "Every concept is taught through real-world examples and hands-on exercises. No abstract theory—just skills you can use immediately."
    },
    {
      icon: TrendingUp,
      title: "Progressive Learning",
      description: "Start with fundamentals, build to advanced techniques. Everyone learns at their own pace with continuous support."
    },
    {
      icon: Award,
      title: "Measurable Outcomes",
      description: "Track progress with assessments, certifications, and real project deliverables. Prove ROI from day one."
    },
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
              <Brain className="w-4 h-4 text-primary" />
              <span className="text-sm font-heading text-primary">
                Transform Your Workforce
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-heading leading-tight mb-6">
              <span className="text-primary glow-green">AI SKILLS</span>
              <br />
              <span className="text-foreground">DEVELOPMENT</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Transform your workforce with comprehensive AI skills development. From prompt fluency to personalized learning paths, build teams that thrive in an AI-powered future.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90 glow-green text-lg font-semibold px-8 py-6 shadow-cyber transition-all hover:scale-105"
              >
                <a href="https://calendly.com/eschwaa/aiconsult" target="_blank" rel="noopener noreferrer">
                  Schedule Training Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-primary text-primary hover:bg-primary/10 text-lg font-semibold px-8 py-6 transition-all hover:scale-105"
              >
                <Link to="/ai-learning">Explore Learning Paths</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading mb-6">
              <span className="text-foreground">THE </span>
              <span className="text-primary glow-green">AI SKILLS GAP</span>
              <span className="text-foreground"> IS REAL</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-6">
              Organizations are racing to adopt AI, but <span className="text-primary font-semibold">80% lack the internal skills</span> to implement it effectively. The result? Stalled initiatives, wasted investment, and competitive disadvantage.
            </p>
            <p className="text-xl text-muted-foreground">
              We help you close that gap with practical, hands-on training that transforms your team from <span className="text-primary">AI-curious</span> to <span className="text-primary">AI-competent</span>.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <Card key={index} className="p-8 text-center bg-card border-border hover:border-primary/50 transition-all shadow-cyber">
                <div className={`text-5xl font-heading mb-2 ${stat.color === 'primary' ? 'text-primary glow-green' : 'text-secondary glow-pink'}`}>
                  {stat.value}
                </div>
                <p className="text-muted-foreground">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading mb-6">
              <span className="text-foreground">OUR </span>
              <span className="text-primary glow-green">SKILLS DEVELOPMENT</span>
              <span className="text-foreground"> SOLUTIONS</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {solutions.map((solution, index) => {
              const Icon = solution.icon
              const isPrimary = solution.accent === 'primary'
              return (
                <Card key={index} className="p-8 bg-card border-border hover:border-primary/50 transition-all duration-300 shadow-cyber">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-lg flex items-center justify-center border-2 flex-shrink-0 ${isPrimary ? 'bg-primary/10 border-primary' : 'bg-secondary/10 border-secondary'}`}>
                      <Icon className={`w-7 h-7 ${isPrimary ? 'text-primary' : 'text-secondary'}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-heading text-foreground mb-3">
                        {solution.title.toUpperCase()}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {solution.description}
                      </p>
                      <ul className="space-y-2 mb-6">
                        {solution.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-start gap-2">
                            <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isPrimary ? 'text-primary' : 'text-secondary'}`} />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        asChild
                        className={`w-full ${isPrimary ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-secondary text-secondary-foreground hover:bg-secondary/90'} shadow-cyber transition-all hover:scale-[1.02]`}
                      >
                        <Link to={solution.link}>{solution.linkText}</Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Training Approach */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading mb-6">
              <span className="text-foreground">OUR </span>
              <span className="text-primary glow-green">TRAINING</span>
              <span className="text-foreground"> PHILOSOPHY</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {philosophyItems.map((item, index) => {
              const Icon = item.icon
              return (
                <Card key={index} className="p-8 text-center bg-card border-border hover:border-primary/50 transition-all duration-300 shadow-cyber">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 border-2 border-primary flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading text-foreground mb-3">{item.title.toUpperCase()}</h3>
                  <p className="text-muted-foreground">
                    {item.description}
                  </p>
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
              <span className="text-sm font-heading text-primary">GET STARTED</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading mb-4 text-foreground">
              READY TO BUILD AN <span className="text-primary glow-green">AI-READY TEAM</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss your team's AI skills needs and design a training program that delivers results.
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
          </Card>
        </div>
      </section>
    </div>
  )
}

export default Skills
