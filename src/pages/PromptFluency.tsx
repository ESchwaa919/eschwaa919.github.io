import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Target, Zap, Shield, FileText, Users, Code, BarChart3, HeadphonesIcon, GraduationCap, Search } from "lucide-react"

const PromptFluency = () => {
  const handleDownload = () => {
    // Open the PDF directly
    window.open('/promptfluency/Prompt Fluency Toolkit.pdf', '_blank')
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-[#1a365d] to-[#2d5a87] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Prompt Fluency Toolkit
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Master the Art of AI Communication and Unlock Your Organization's Full Potential
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={handleDownload}
                className="bg-[#e2725b] hover:bg-[#d65d46] text-white text-lg px-8 py-6 rounded-full shadow-lg"
              >
                📄 Download Free Toolkit
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="bg-white/20 border-2 border-white/30 hover:bg-white/30 text-white text-lg px-8 py-6 rounded-full"
              >
                <a href="https://calendly.com/eschwaa/aiconsult" target="_blank" rel="noopener noreferrer">
                  Schedule Strategy Call
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-[#1a365d]">
            Why Prompt Fluency Matters
          </h2>
          <p className="text-center text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            In the age of generative AI, the ability to communicate effectively with AI systems is becoming as fundamental as digital literacy itself. <strong>Prompt fluency</strong> is the key to unlocking AI's transformative potential for your organization.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-[#1a365d]">
              <Target className="w-16 h-16 text-[#1a365d] mb-4" />
              <h3 className="text-2xl font-semibold mb-4 text-[#1a365d]">Strategic Foundation</h3>
              <p className="text-gray-600 leading-relaxed">
                Move beyond trial-and-error to systematic, repeatable prompt strategies that deliver consistent results across your organization.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-[#1a365d]">
              <Zap className="w-16 h-16 text-[#1a365d] mb-4" />
              <h3 className="text-2xl font-semibold mb-4 text-[#1a365d]">Productivity Multiplier</h3>
              <p className="text-gray-600 leading-relaxed">
                Transform AI from a novelty into a productivity powerhouse by mastering the techniques that unlock its full capabilities.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-[#1a365d]">
              <Shield className="w-16 h-16 text-[#1a365d] mb-4" />
              <h3 className="text-2xl font-semibold mb-4 text-[#1a365d]">Risk Mitigation</h3>
              <p className="text-gray-600 leading-relaxed">
                Learn best practices for responsible AI use that protect your data, maintain quality, and ensure compliance.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CRISP Framework Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-[#1a365d]">
            The CRISP Framework
          </h2>
          <p className="text-center text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Our battle-tested framework for crafting effective prompts that drive results
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: "📋", title: "Context", description: "Set the stage with relevant background information. The more context you provide, the more tailored and accurate the response." },
              { icon: "🎭", title: "Role", description: "Define the AI's perspective. Asking it to act as an expert in a specific domain can dramatically improve response quality." },
              { icon: "📝", title: "Instructions", description: "Be clear and specific about what you want. Break complex requests into step-by-step instructions." },
              { icon: "📊", title: "Structure", description: "Specify the desired format of the output—bullets, tables, code, or narrative prose." },
              { icon: "💡", title: "Prompting Techniques", description: "Leverage advanced techniques like chain-of-thought reasoning, few-shot examples, and self-consistency." },
            ].map((item, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-[#e2725b]">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h4 className="text-xl font-semibold mb-3 text-gray-900">{item.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Best Practices Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#1a365d]">
            Essential Best Practices
          </h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Be Specific", description: "Vague prompts yield vague results. Clear, detailed instructions produce superior outputs." },
              { title: "Iterate & Refine", description: "Treat prompting as a conversation. Use follow-up questions to guide the AI toward better results." },
              { title: "Provide Examples", description: "Show the AI what you want. Few-shot learning dramatically improves output quality." },
              { title: "Set Constraints", description: "Define boundaries—word count, tone, format, or style—to keep outputs focused." },
              { title: "Use Chain-of-Thought", description: "Ask the AI to show its reasoning process for complex problem-solving tasks." },
              { title: "Protect Sensitive Data", description: "Never share confidential information. Anonymize data before processing." },
            ].map((item, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-[#e2725b]" />
                </div>
                <div>
                  <strong className="text-gray-900">{item.title}:</strong>
                  <span className="text-gray-600"> {item.description}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Real-World Applications Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#1a365d]">
            Real-World Applications
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: <FileText className="w-8 h-8" />,
                title: "Content Creation",
                items: ["Blog posts and articles", "Marketing copy and email campaigns", "Social media content", "Product descriptions"]
              },
              {
                icon: <Code className="w-8 h-8" />,
                title: "Technical Work",
                items: ["Code generation and debugging", "API documentation", "Database queries", "Technical specifications"]
              },
              {
                icon: <BarChart3 className="w-8 h-8" />,
                title: "Business Analysis",
                items: ["Data analysis and insights", "Competitive research", "Market analysis reports", "Strategic recommendations"]
              },
              {
                icon: <HeadphonesIcon className="w-8 h-8" />,
                title: "Customer Support",
                items: ["Response templates", "FAQ generation", "Troubleshooting guides", "Knowledge base articles"]
              },
              {
                icon: <GraduationCap className="w-8 h-8" />,
                title: "Learning & Training",
                items: ["Personalized learning paths", "Quiz and assessment creation", "Training material development", "Concept explanations"]
              },
              {
                icon: <Search className="w-8 h-8" />,
                title: "Research & Discovery",
                items: ["Literature reviews", "Trend analysis", "Summarization of complex documents", "Hypothesis generation"]
              },
            ].map((item, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="text-[#1a365d] mb-4">{item.icon}</div>
                <h4 className="text-xl font-semibold mb-4 text-[#1a365d]">{item.title}</h4>
                <ul className="space-y-2">
                  {item.items.map((subitem, subindex) => (
                    <li key={subindex} className="flex items-start gap-2 text-gray-600 text-sm">
                      <span className="text-[#e2725b] font-bold">→</span>
                      <span>{subitem}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Download CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="p-12 bg-gradient-to-br from-[#1a365d] to-[#2d5a87] text-white text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get Your Free Prompt Fluency Toolkit
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Download the complete guide with frameworks, examples, and best practices you can implement today.
            </p>
            <Button
              size="lg"
              onClick={handleDownload}
              className="bg-[#e2725b] hover:bg-[#d65d46] text-white text-lg px-8 py-6 rounded-full shadow-lg"
            >
              📄 Download Free Toolkit
            </Button>
          </Card>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1a365d]">
              Ready to Transform Your AI Strategy?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Let's discuss how prompt fluency can unlock productivity gains and competitive advantages for your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="bg-[#e2725b] hover:bg-[#d65d46] text-white text-lg px-8 py-6 rounded-full"
              >
                <a href="https://calendly.com/eschwaa/aiconsult" target="_blank" rel="noopener noreferrer">
                  Schedule Free Consultation
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

export default PromptFluency
