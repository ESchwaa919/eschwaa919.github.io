import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, CheckCircle2, Target, TrendingUp, Users, Lightbulb, Award, BarChart3 } from "lucide-react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

interface Question {
  title: string;
  question: string;
  options: { text: string; score: number }[];
}

interface Answer {
  question: string;
  answer: string;
  score: number;
}

const AIAssessment = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    jobTitle: "",
    companySize: "",
    industry: "",
  });

  const questions: Question[] = [
    {
      title: "Vision & Strategic Differentiation",
      question:
        "How well does your organisation integrate AI into its strategic vision and competitive positioning?",
      options: [
        {
          text: "AI is central to our strategic vision and drives competitive advantage",
          score: 4,
        },
        {
          text: "We have identified AI opportunities and begun strategic planning",
          score: 3,
        },
        {
          text: "We recognize AI's importance but lack concrete strategic direction",
          score: 2,
        },
        {
          text: "AI is not part of our current strategic discussions",
          score: 1,
        },
      ],
    },
    {
      title: "Customer Understanding & Engagement",
      question:
        "How effectively does your organisation use AI to understand and engage customers?",
      options: [
        {
          text: "AI powers personalized customer experiences across all touchpoints",
          score: 4,
        },
        {
          text: "We use AI for some customer insights and basic personalization",
          score: 3,
        },
        {
          text: "We have basic customer data but limited AI-driven insights",
          score: 2,
        },
        {
          text: "Customer data collection and AI analysis are minimal",
          score: 1,
        },
      ],
    },
    {
      title: "Operational Efficiency",
      question:
        "How well does your organisation leverage AI to optimize operations and processes?",
      options: [
        {
          text: "AI automates key processes and drives significant efficiency gains",
          score: 4,
        },
        {
          text: "We have implemented AI in select operational areas",
          score: 3,
        },
        {
          text: "We have identified automation opportunities but limited implementation",
          score: 2,
        },
        {
          text: "Operations remain largely manual with minimal AI integration",
          score: 1,
        },
      ],
    },
    {
      title: "Product & Service Innovation",
      question:
        "How effectively does your organisation use AI to enhance products and services?",
      options: [
        {
          text: "AI is integral to our product development and service delivery",
          score: 4,
        },
        {
          text: "We have successfully integrated AI into some offerings",
          score: 3,
        },
        {
          text: "We have piloted AI features but limited production deployment",
          score: 2,
        },
        {
          text: "Products and services have minimal or no AI capabilities",
          score: 1,
        },
      ],
    },
    {
      title: "Talent & Culture",
      question:
        "How prepared is your workforce for AI adoption and integration?",
      options: [
        {
          text: "Our team has strong AI skills and embraces AI-augmented workflows",
          score: 4,
        },
        {
          text: "We have some AI expertise and active training programs",
          score: 3,
        },
        {
          text: "Basic AI awareness exists but limited skills development",
          score: 2,
        },
        {
          text: "Workforce has minimal AI knowledge or experience",
          score: 1,
        },
      ],
    },
    {
      title: "Data Infrastructure",
      question:
        "How mature is your data infrastructure and readiness for AI applications?",
      options: [
        {
          text: "We have a robust, well-governed data ecosystem powering AI initiatives",
          score: 4,
        },
        {
          text: "Data infrastructure is in place with some quality and access controls",
          score: 3,
        },
        {
          text: "Data exists but is siloed with limited governance or accessibility",
          score: 2,
        },
        {
          text: "Data infrastructure is minimal with significant gaps",
          score: 1,
        },
      ],
    },
    {
      title: "Governance & Ethics",
      question:
        "How well has your organisation addressed AI governance, ethics, and responsible use?",
      options: [
        {
          text: "We have comprehensive AI governance frameworks and ethical guidelines",
          score: 4,
        },
        {
          text: "We have established basic governance policies and review processes",
          score: 3,
        },
        {
          text: "We recognize the need for governance but have limited formal policies",
          score: 2,
        },
        {
          text: "AI governance and ethical considerations are not yet addressed",
          score: 1,
        },
      ],
    },
    {
      title: "Technology & Architecture",
      question:
        "How advanced is your technology stack and architecture for supporting AI initiatives?",
      options: [
        {
          text: "Modern, scalable infrastructure purpose-built for AI workloads",
          score: 4,
        },
        {
          text: "We have cloud infrastructure with some AI-ready components",
          score: 3,
        },
        {
          text: "Legacy systems with limited AI compatibility",
          score: 2,
        },
        {
          text: "Technology infrastructure is not suitable for AI implementation",
          score: 1,
        },
      ],
    },
  ];

  const progress = (currentQuestion / questions.length) * 100;

  const handleSelectOption = (index: number) => {
    setSelectedOption(index);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    const question = questions[currentQuestion];
    const selectedAnswer = question.options[selectedOption];

    const newAnswer: Answer = {
      question: question.title,
      answer: selectedAnswer.text,
      score: selectedAnswer.score,
    };

    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = newAnswer;
    setAnswers(updatedAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      // Check if there's an answer for the next question
      if (updatedAnswers[currentQuestion + 1]) {
        const nextAnswer = updatedAnswers[currentQuestion + 1];
        const nextQuestion = questions[currentQuestion + 1];
        const nextOptionIndex = nextQuestion.options.findIndex(
          (opt) => opt.text === nextAnswer.answer
        );
        setSelectedOption(nextOptionIndex);
      } else {
        setSelectedOption(null);
      }
    } else {
      // Completed all questions
      setShowEmailCapture(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      // Load the previous answer
      const prevAnswer = answers[currentQuestion - 1];
      const prevQuestion = questions[currentQuestion - 1];
      const prevOptionIndex = prevQuestion.options.findIndex(
        (opt) => opt.text === prevAnswer.answer
      );
      setSelectedOption(prevOptionIndex);
    }
  };

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    // Calculate results
    const totalScore = answers.reduce((sum, answer) => sum + answer.score, 0);
    const percentage = Math.round((totalScore / 32) * 100);

    // Determine readiness level
    let readinessLevel = "";
    if (percentage >= 85) readinessLevel = "AI Leader";
    else if (percentage >= 70) readinessLevel = "AI Ready";
    else if (percentage >= 50) readinessLevel = "AI Developing";
    else readinessLevel = "AI Emerging";

    // Format dimension scores
    const dimensionScores = answers.map((answer, index) =>
      `${questions[index].title}: ${answer.score}/4`
    ).join("\n");

    try {
      // Initialize EmailJS
      emailjs.init("oI6t4dwMhBXNaBKXo");

      // Send assessment results email
      await emailjs.send(
        "theaiexpert_assessment",
        "template_8u3fxbf",
        {
          from_name: `${formData.firstName} ${formData.lastName}`,
          from_email: formData.email,
          company: formData.company || "Not specified",
          assessment_score: `${totalScore}/32`,
          assessment_percentage: `${percentage}%`,
          readiness_level: readinessLevel,
          dimension_scores: dimensionScores,
          submission_date: new Date().toLocaleString(),
          lead_type: "AI Assessment Completion",
          lead_source: "Website AI Assessment Tool",
        }
      );

      console.log("✅ Assessment results email sent successfully!");
      toast.success("Assessment complete! Here are your results.");
    } catch (error) {
      console.error("Error sending assessment email:", error);
      // Still show results even if email fails
      toast.success("Assessment complete! Here are your results.");
    }

    setShowEmailCapture(false);
    setShowResults(true);
  };

  const calculateResults = () => {
    const totalScore = answers.reduce((sum, answer) => sum + answer.score, 0);
    const percentage = Math.round((totalScore / 32) * 100);

    let readinessLevel = "";
    let levelColor = "";
    let levelDescription = "";

    if (percentage >= 85) {
      readinessLevel = "AI Leader";
      levelColor = "text-[#1a365d]";
      levelDescription =
        "Your organisation demonstrates advanced AI maturity with strong capabilities across all dimensions.";
    } else if (percentage >= 70) {
      readinessLevel = "AI Ready";
      levelColor = "text-blue-600";
      levelDescription =
        "Your organisation has solid foundations and is well-positioned for AI implementation.";
    } else if (percentage >= 50) {
      readinessLevel = "AI Developing";
      levelColor = "text-yellow-600";
      levelDescription =
        "Your organisation has identified AI opportunities and is building capabilities.";
    } else {
      readinessLevel = "AI Emerging";
      levelColor = "text-orange-600";
      levelDescription =
        "Your organisation is beginning its AI journey with significant opportunities for growth.";
    }

    return { totalScore, percentage, readinessLevel, levelColor, levelDescription };
  };

  const generateRecommendations = () => {
    const { percentage } = calculateResults();
    const recommendations: { title: string; description: string }[] = [];

    if (percentage < 50) {
      recommendations.push(
        {
          title: "Start with AI Foundations",
          description:
            "Begin with basic AI education for your team and establish data collection practices to build a foundation for future AI initiatives.",
        },
        {
          title: "Focus on Quick Wins",
          description:
            "Identify low-risk, high-impact areas where AI tools can provide immediate value, such as automated email responses or basic data analysis.",
        }
      );
    } else if (percentage < 70) {
      recommendations.push(
        {
          title: "Develop AI Strategy",
          description:
            "Create a comprehensive AI roadmap that aligns with your business objectives and identifies priority use cases for implementation.",
        },
        {
          title: "Invest in Skills Development",
          description:
            "Expand AI literacy across your organisation through training programs and consider hiring AI-focused talent or consultants.",
        }
      );
    } else if (percentage < 85) {
      recommendations.push(
        {
          title: "Scale AI Implementation",
          description:
            "Move beyond pilot projects to production-ready AI systems that deliver measurable business value across multiple departments.",
        },
        {
          title: "Strengthen Governance",
          description:
            "Establish robust AI governance frameworks to ensure responsible deployment at scale while maintaining compliance and ethical standards.",
        }
      );
    } else {
      recommendations.push(
        {
          title: "Drive Innovation",
          description:
            "Continue to innovate and explore cutting-edge AI capabilities to maintain your competitive advantage and thought leadership position.",
        },
        {
          title: "Share Knowledge",
          description:
            "Consider contributing to the AI community through knowledge sharing, partnerships, and mentoring organizations beginning their AI journey.",
        }
      );
    }

    return recommendations;
  };

  // Landing page
  if (!hasStarted) {
    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-[#1a365d] to-[#2d5a87] text-white">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                AI Competency Assessment
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Evaluate your organization's AI readiness across 8 critical business dimensions and receive personalized insights to accelerate your AI journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button
                  size="lg"
                  onClick={() => setHasStarted(true)}
                  className="bg-[#e2725b] hover:bg-[#d65d46] text-white text-lg px-10 py-7 rounded-full shadow-lg"
                >
                  Start Assessment
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="bg-white/20 border-2 border-white/30 hover:bg-white/30 text-white text-lg px-10 py-7 rounded-full"
                >
                  <a href="/contact">Schedule Consultation</a>
                </Button>
              </div>
              <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div className="flex flex-col items-center gap-2">
                  <Award className="w-8 h-8" />
                  <p className="text-sm opacity-90">Free & Confidential</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <BarChart3 className="w-8 h-8" />
                  <p className="text-sm opacity-90">8 Key Dimensions</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Target className="w-8 h-8" />
                  <p className="text-sm opacity-90">Personalized Results</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1a365d]">
              What You'll Discover
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <Card className="p-6 hover:shadow-lg transition-all">
                <Target className="w-10 h-10 text-[#1a365d] mb-4" />
                <h3 className="text-lg font-semibold mb-2">Strategic Vision</h3>
                <p className="text-gray-600 text-sm">How AI fits into your competitive positioning</p>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-all">
                <Users className="w-10 h-10 text-[#1a365d] mb-4" />
                <h3 className="text-lg font-semibold mb-2">Team Readiness</h3>
                <p className="text-gray-600 text-sm">Workforce AI skills and culture</p>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-all">
                <TrendingUp className="w-10 h-10 text-[#1a365d] mb-4" />
                <h3 className="text-lg font-semibold mb-2">Operational Maturity</h3>
                <p className="text-gray-600 text-sm">Process automation and efficiency</p>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-all">
                <Lightbulb className="w-10 h-10 text-[#1a365d] mb-4" />
                <h3 className="text-lg font-semibold mb-2">Action Plan</h3>
                <p className="text-gray-600 text-sm">Personalized next steps and recommendations</p>
              </Card>
            </div>
            <div className="text-center mt-12">
              <Button
                size="lg"
                onClick={() => setHasStarted(true)}
                className="bg-[#1a365d] hover:bg-[#153c5a] text-white text-lg px-10 py-6 rounded-full"
              >
                Begin Your Assessment →
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Results page
  if (showResults) {
    const { totalScore, percentage, readinessLevel, levelColor, levelDescription } =
      calculateResults();
    const recommendations = generateRecommendations();

    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-[#1a365d]">
                YOUR AI ASSESSMENT RESULTS
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              Here's how your organisation measures up across the 8 key AI competency dimensions
            </p>
          </div>

          {/* Overall Score */}
          <Card className="border-2 border-[#1a365d] shadow-xl mb-8">
            <CardContent className="p-12 text-center">
              <div
                className="relative w-64 h-64 mx-auto mb-8"
                style={{
                  background: `conic-gradient(#1a365d ${percentage * 3.6}deg, #e5e7eb ${percentage * 3.6}deg)`,
                  borderRadius: "50%",
                }}
              >
                <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center flex-col">
                  <div className="text-6xl font-bold text-[#1a365d] mb-2">
                    {percentage}%
                  </div>
                  <div className="text-sm text-gray-600">AI Readiness Score</div>
                </div>
              </div>
              <div className={`text-3xl font-bold ${levelColor} mb-2`}>
                {readinessLevel}
              </div>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                {levelDescription}
              </p>
            </CardContent>
          </Card>

          {/* Dimension Scores */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Detailed Breakdown
            </h3>
            <div className="grid gap-4">
              {answers.map((answer, index) => {
                const scorePercentage = (answer.score / 4) * 100;
                let badgeColor = "";
                let badgeText = "";

                if (scorePercentage >= 85) {
                  badgeColor = "bg-[#1a365d]/20 text-[#1a365d] border-[#1a365d]";
                  badgeText = "Excellent";
                } else if (scorePercentage >= 70) {
                  badgeColor = "bg-blue-100 text-blue-700 border-blue-700";
                  badgeText = "Good";
                } else if (scorePercentage >= 50) {
                  badgeColor = "bg-yellow-100 text-yellow-700 border-yellow-700";
                  badgeText = "Developing";
                } else {
                  badgeColor = "bg-orange-100 text-orange-700 border-orange-700";
                  badgeText = "Emerging";
                }

                return (
                  <Card
                    key={index}
                    className="border-2 shadow-md"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {questions[index].title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Score: {answer.score}/4
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${badgeColor}`}
                        >
                          {badgeText}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">
                        {answer.answer}
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[#1a365d] h-2 rounded-full transition-all duration-500"
                          style={{ width: `${scorePercentage}%` }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Recommendations */}
          <Card className="border-2 border-[#e2725b] shadow-xl mb-8">
            <CardContent className="p-10">
              <h3 className="text-2xl font-bold text-[#1a365d] mb-6 text-center">
                Recommended Next Steps
              </h3>
              <div className="space-y-6">
                {recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg p-6"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-[#e2725b] flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {rec.title}
                        </h4>
                        <p className="text-gray-700">{rec.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="border-2 border-[#1a365d] shadow-xl">
            <CardContent className="p-10 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Accelerate Your AI Journey?
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                Let's discuss a tailored strategy to improve your AI readiness and drive measurable results.
              </p>
              <Button
                size="lg"
                className="bg-[#e2725b] hover:bg-[#d65d46] text-white font-semibold px-10 py-6 shadow-lg"
                asChild
              >
                <a href="https://calendly.com/eschwaa/aiconsult" target="_blank" rel="noopener noreferrer">
                  Schedule Free Consultation
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Email capture form
  if (showEmailCapture) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="border-2 border-[#1a365d] shadow-xl">
            <CardContent className="p-10">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-[#1a365d]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-[#1a365d]" />
                </div>
                <h2 className="text-3xl font-bold text-[#1a365d] mb-4">
                  GET YOUR PERSONALIZED RESULTS
                </h2>
                <p className="text-gray-600">
                  Enter your details below to receive your comprehensive AI readiness report
                </p>
              </div>

              <form onSubmit={handleSubmitEmail} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      First Name *
                    </label>
                    <Input
                      required
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      className="bg-white border-2 border-gray-300 focus:border-[#1a365d]"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Last Name *
                    </label>
                    <Input
                      required
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      className="bg-white border-2 border-gray-300 focus:border-[#1a365d]"
                      placeholder="Smith"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="bg-white border-2 border-gray-300 focus:border-[#1a365d]"
                    placeholder="john.smith@company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Company
                  </label>
                  <Input
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="bg-white border-2 border-gray-300 focus:border-[#1a365d]"
                    placeholder="Your Company"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Job Title
                    </label>
                    <Input
                      value={formData.jobTitle}
                      onChange={(e) =>
                        setFormData({ ...formData, jobTitle: e.target.value })
                      }
                      className="bg-white border-2 border-gray-300 focus:border-[#1a365d]"
                      placeholder="CEO"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Company Size
                    </label>
                    <select
                      value={formData.companySize}
                      onChange={(e) =>
                        setFormData({ ...formData, companySize: e.target.value })
                      }
                      className="w-full bg-white border-2 border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:border-[#1a365d] focus:outline-none"
                    >
                      <option value="">Select size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-1000">201-1000 employees</option>
                      <option value="1000+">1000+ employees</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Industry
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) =>
                      setFormData({ ...formData, industry: e.target.value })
                    }
                    className="w-full bg-white border-2 border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:border-[#1a365d] focus:outline-none"
                  >
                    <option value="">Select industry</option>
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Financial Services">Financial Services</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Retail">Retail</option>
                    <option value="Professional Services">Professional Services</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[#1a365d] hover:bg-[#153c5a] text-white font-semibold py-6 shadow-lg"
                >
                  Get My AI Assessment Results
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  We respect your privacy. Your information will only be used to send you
                  your assessment results and relevant AI insights.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#1a365d]">AI COMPETENCY</span>
            <br />
            <span className="text-gray-900">ASSESSMENT</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Evaluate your organisation's AI readiness across 8 critical business
            dimensions and receive personalized insights to accelerate your AI
            journey.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm text-[#1a365d] font-semibold">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Question Card */}
        <Card className="border-2 border-[#1a365d] shadow-xl mb-8 bg-white">
          <CardContent className="p-10">
            <h2 className="text-2xl font-bold text-[#2563eb] mb-4">
              {question.title}
            </h2>
            <p className="text-xl text-gray-900 mb-8 leading-relaxed">
              {question.question}
            </p>

            <div className="space-y-4">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectOption(index)}
                  className={`w-full text-left p-6 rounded-lg border-2 transition-all ${
                    selectedOption === index
                      ? "border-[#1a365d] bg-[#1a365d]/10 shadow-md"
                      : "border-gray-300 bg-white hover:border-[#1a365d]/50 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                        selectedOption === index
                          ? "border-[#1a365d] bg-[#1a365d]"
                          : "border-gray-400"
                      }`}
                    >
                      {selectedOption === index && (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <p className="text-gray-900 flex-1">{option.text}</p>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-4">
          <Button
            size="lg"
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="border-2 border-gray-300 text-gray-900 hover:bg-gray-100 font-semibold px-8 py-6"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </Button>
          <Button
            size="lg"
            onClick={handleNext}
            disabled={selectedOption === null}
            className="bg-[#1a365d] hover:bg-[#153c5a] text-white font-semibold px-8 py-6 shadow-lg"
          >
            {currentQuestion === questions.length - 1
              ? "Complete Assessment"
              : "Next"}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIAssessment;
