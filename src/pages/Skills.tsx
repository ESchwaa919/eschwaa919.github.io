import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { GraduationCap, Users, Target, TrendingUp, CheckCircle2, Rocket, BookOpen, Award } from "lucide-react"

const Skills = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-600 text-white">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              AI Skills Development
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-95">
              Transform your workforce with comprehensive AI skills development. From prompt fluency to personalized learning paths, build teams that thrive in an AI-powered future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="bg-[#e2725b] hover:bg-[#d65d46] text-white text-lg px-8 py-6 rounded-full shadow-lg"
              >
                <a href="https://calendly.com/eschwaa/aiconsult" target="_blank" rel="noopener noreferrer">
                  Schedule Training Consultation
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="bg-white/20 border-2 border-white/30 hover:bg-white/30 text-white text-lg px-8 py-6 rounded-full"
              >
                <a href="/ai-learning">Explore Learning Paths</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1a365d]">
              The AI Skills Gap is Real
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Organizations are racing to adopt AI, but <strong>80% lack the internal skills</strong> to implement it effectively. The result? Stalled initiatives, wasted investment, and competitive disadvantage.
            </p>
            <p className="text-xl text-gray-600">
              We help you close that gap with practical, hands-on training that transforms your team from AI-curious to AI-competent.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-6 text-center hover:shadow-lg transition-all">
              <div className="text-5xl font-bold text-indigo-600 mb-2">80%</div>
              <p className="text-gray-600">of organizations lack AI talent</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-all">
              <div className="text-5xl font-bold text-purple-600 mb-2">3x</div>
              <p className="text-gray-600">faster time-to-value with trained teams</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-all">
              <div className="text-5xl font-bold text-violet-600 mb-2">60%</div>
              <p className="text-gray-600">productivity increase post-training</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#1a365d]">
            Our Skills Development Solutions
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 hover:shadow-xl transition-all duration-300 border-t-4 border-indigo-600">
              <div className="flex items-start gap-4 mb-4">
                <GraduationCap className="w-12 h-12 text-indigo-600 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-[#1a365d]">
                    Prompt Fluency Training
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Master the art of communicating with AI systems. Learn the CRISP framework, advanced prompting techniques, and best practices for getting consistent, high-quality outputs.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Half-day or full-day workshops</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Hands-on exercises with real use cases</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Tailored to your industry and tools</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full">
                    <a href="/promptfluency">Learn More About Prompt Fluency</a>
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all duration-300 border-t-4 border-purple-600">
              <div className="flex items-start gap-4 mb-4">
                <BookOpen className="w-12 h-12 text-purple-600 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-[#1a365d]">
                    Personalized Learning Paths
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Every team member gets a customized AI education journey based on their role, experience level, and learning preferences. Self-paced, flexible, and always relevant.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Individual skill assessments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Curated from 200+ verified resources</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Progress tracking and certificates</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full">
                    <a href="/ai-learning">Explore Learning Paths</a>
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all duration-300 border-t-4 border-violet-600">
              <div className="flex items-start gap-4 mb-4">
                <Users className="w-12 h-12 text-violet-600 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-[#1a365d]">
                    Executive AI Briefings
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Get your leadership team up to speed fast. No technical jargon, just strategic insights on what AI means for your business, your industry, and your competitive position.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">2-4 hour executive sessions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Industry-specific case studies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Strategic roadmap development</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full">
                    <a href="/services">View All Services</a>
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all duration-300 border-t-4 border-[#e2725b]">
              <div className="flex items-start gap-4 mb-4">
                <Rocket className="w-12 h-12 text-[#e2725b] flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-[#1a365d]">
                    Custom Team Workshops
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Tailored training programs designed around your specific AI initiatives, tools, and use cases. From prompt engineering to responsible AI deployment.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#e2725b] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">1-5 day intensive workshops</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#e2725b] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Your tech stack, your use cases</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#e2725b] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Post-training implementation support</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full">
                    <a href="/contact">Request Custom Workshop</a>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Training Approach */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#1a365d]">
            Our Training Philosophy
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-6 text-center hover:shadow-lg transition-all">
              <Target className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Practical, Not Theoretical</h3>
              <p className="text-gray-600">
                Every concept is taught through real-world examples and hands-on exercises. No abstract theory—just skills you can use immediately.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-all">
              <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Progressive Learning</h3>
              <p className="text-gray-600">
                Start with fundamentals, build to advanced techniques. Everyone learns at their own pace with continuous support.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-all">
              <Award className="w-12 h-12 text-violet-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Measurable Outcomes</h3>
              <p className="text-gray-600">
                Track progress with assessments, certifications, and real project deliverables. Prove ROI from day one.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <Card className="p-12 bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-600 text-white text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Build an AI-Ready Team?
            </h2>
            <p className="text-xl mb-8 opacity-95">
              Let's discuss your team's AI skills needs and design a training program that delivers results.
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
                className="bg-white/20 border-2 border-white/30 hover:bg-white/30 text-white text-lg px-8 py-6 rounded-full"
              >
                <a href="/contact">Contact Us</a>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}

export default Skills
