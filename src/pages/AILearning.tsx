import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BookOpen, Clock, Award, Target, Filter, TrendingUp, Users, Lightbulb } from "lucide-react"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

const AILearning = () => {
  const navigate = useNavigate()

  const handleLaunchTool = () => {
    // Legacy tool has been removed - redirect to contact for now
    toast.info("The AI Learning Path Generator is being updated with new features. Contact us to learn more!")
    navigate('/contact')
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-[#1a365d] to-[#2d5a87] text-white">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              AI Learning Path Generator
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Curated AI learning resources from verified, free sources tailored to your needs and schedule
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleLaunchTool}
                className="bg-[#e2725b] hover:bg-[#d65d46] text-white text-lg px-8 py-6 rounded-full shadow-lg"
              >
                🚀 Launch Learning Path Tool
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="bg-white/20 border-2 border-white/30 hover:bg-white/30 text-white text-lg px-8 py-6 rounded-full"
              >
                <a href="/contact">Request Custom Training</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-[#1a365d]">
            Personalized AI Education
          </h2>
          <p className="text-center text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Our intelligent learning path generator analyzes your needs, preferences, and available time to recommend the perfect mix of courses, videos, and resources.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-[#1a365d]">
              <Target className="w-12 h-12 text-[#1a365d] mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-[#1a365d]">Tailored Topics</h3>
              <p className="text-gray-600">
                Focus on what matters most - Foundations, GenAI, Ethics, ROI, and more
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-[#1a365d]">
              <Clock className="w-12 h-12 text-[#1a365d] mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-[#1a365d]">Time-Optimized</h3>
              <p className="text-gray-600">
                Resources that fit your schedule, from 30-minute videos to full courses
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-[#1a365d]">
              <Filter className="w-12 h-12 text-[#1a365d] mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-[#1a365d]">Format Preferences</h3>
              <p className="text-gray-600">
                Choose from videos, interactive courses, or text-based learning
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-[#1a365d]">
              <Award className="w-12 h-12 text-[#1a365d] mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-[#1a365d]">Certifications</h3>
              <p className="text-gray-600">
                Option to prioritize courses with certificates and badges
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#1a365d]">
            How It Works
          </h2>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#1a365d] text-white flex items-center justify-center text-xl font-bold">
                1
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-gray-900">Set Your Preferences</h3>
                <p className="text-gray-600 text-lg">
                  Tell us which topics you want to cover, how much time you have per session, and your preferred learning formats
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#1a365d] text-white flex items-center justify-center text-xl font-bold">
                2
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-gray-900">Smart Matching Algorithm</h3>
                <p className="text-gray-600 text-lg">
                  Our engine scores hundreds of verified resources based on topic coverage, time fit, format, and regional relevance
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#1a365d] text-white flex items-center justify-center text-xl font-bold">
                3
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-gray-900">Get Your Personalized Path</h3>
                <p className="text-gray-600 text-lg">
                  Receive a curated learning journey with diverse sources from top providers like DeepLearning.AI, Google, Microsoft, and more
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Topics Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#1a365d]">
            Comprehensive Topic Coverage
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: <BookOpen className="w-8 h-8" />, title: "AI Foundations", description: "Core concepts, machine learning basics, and AI history" },
              { icon: <Lightbulb className="w-8 h-8" />, title: "Generative AI", description: "LLMs, ChatGPT, prompt engineering, and content generation" },
              { icon: <Target className="w-8 h-8" />, title: "Responsible AI", description: "Ethics, bias mitigation, transparency, and governance" },
              { icon: <TrendingUp className="w-8 h-8" />, title: "Business & ROI", description: "Use cases, implementation strategies, and value measurement" },
              { icon: <Users className="w-8 h-8" />, title: "Leadership", description: "Change management, team building, and organizational readiness" },
              { icon: <Filter className="w-8 h-8" />, title: "Technical Deep Dives", description: "Model training, fine-tuning, RAG, and advanced techniques" },
            ].map((topic, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="text-[#1a365d] mb-4">{topic.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-[#1a365d]">{topic.title}</h3>
                <p className="text-gray-600">{topic.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <Card className="p-12 bg-gradient-to-br from-[#1a365d] to-[#2d5a87] text-white text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Start Your AI Learning Journey Today
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Generate a personalized learning path in minutes. All resources are free, verified, and ready to use.
            </p>
            <Button
              size="lg"
              onClick={handleLaunchTool}
              className="bg-[#e2725b] hover:bg-[#d65d46] text-white text-lg px-8 py-6 rounded-full shadow-lg"
            >
              🚀 Launch Learning Path Tool
            </Button>
          </Card>
        </div>
      </section>

      {/* Support CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1a365d]">
              Need Custom Training for Your Team?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Our learning path generator is perfect for self-directed learning. For team training, workshops, or customized curricula, let's talk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="bg-[#e2725b] hover:bg-[#d65d46] text-white text-lg px-8 py-6 rounded-full"
              >
                <a href="https://calendly.com/eschwaa/aiconsult" target="_blank" rel="noopener noreferrer">
                  Schedule Consultation
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-[#1a365d] text-[#1a365d] hover:bg-[#1a365d] hover:text-white text-lg px-8 py-6 rounded-full"
              >
                <a href="/contact">Contact Us</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AILearning
