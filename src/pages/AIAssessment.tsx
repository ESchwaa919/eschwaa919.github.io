import { useState } from "react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, CheckCircle2, Target, TrendingUp, Users, Lightbulb, Award, BarChart3, Sparkles } from "lucide-react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import { useScrollReveal } from "@/hooks/useScrollReveal";

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

  // Scroll reveal hooks
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollReveal({ threshold: 0.1, delay: 200 });
  const { ref: resultsRef, isVisible: resultsVisible } = useScrollReveal({ threshold: 0.1 });

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
        <SEOHead
          title="AI Readiness Assessment | Free AI Competency Evaluation | The AI Expert"
          description="Take our free 10-minute AI readiness assessment. Evaluate your organisation's AI maturity across 8 critical dimensions and get personalised recommendations."
          keywords="AI readiness assessment, AI maturity assessment, AI competency evaluation, business AI readiness, AI capability assessment"
          canonicalUrl="/ai-assessment"
        />
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center bg-gradient-cyber overflow-hidden">
          <div className="absolute inset-0 bg-background opacity-90" />
          {/* Background glow effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
          <div
            ref={heroRef}
            className={`container mx-auto px-4 relative z-10 transition-all duration-1000 ${
              heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Free AI Readiness Evaluation</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-heading mb-6 leading-tight">
                <span className="text-gradient-animate">AI COMPETENCY</span>
                <br />
                <span className="text-foreground">ASSESSMENT</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
                Evaluate your organization's AI readiness across 8 critical business dimensions and receive personalized insights to accelerate your AI journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button
                  size="lg"
                  onClick={() => setHasStarted(true)}
                  className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-10 py-7 rounded-full shadow-cyber transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsla(155,100%,45%,0.4)] btn-shimmer"
                >
                  Start Assessment
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-2 border-primary text-primary hover:bg-primary/10 text-lg px-10 py-7 rounded-full transition-all duration-300 hover:scale-105"
                >
                  <a href="/contact">Schedule Consultation</a>
                </Button>
              </div>
              <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                {[
                  { icon: Award, label: "Free & Confidential" },
                  { icon: BarChart3, label: "8 Key Dimensions" },
                  { icon: Target, label: "Personalized Results" },
                ].map((item, index) => (
                  <div key={index} className="flex flex-col items-center gap-2 group">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/30 group-hover:bg-primary/20 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_hsla(155,100%,45%,0.2)] transition-all">
                      <item.icon className="w-7 h-7 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background relative">
          {/* Section glow */}
          <div className="section-glow" />
          <div
            ref={featuresRef}
            className={`container mx-auto px-4 transition-all duration-1000 delay-200 ${
              featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-heading text-center mb-12 text-gradient-animate">
              What You'll Discover
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                { icon: Target, title: "Strategic Vision", desc: "How AI fits into your competitive positioning" },
                { icon: Users, title: "Team Readiness", desc: "Workforce AI skills and culture" },
                { icon: TrendingUp, title: "Operational Maturity", desc: "Process automation and efficiency" },
                { icon: Lightbulb, title: "Action Plan", desc: "Personalized next steps and recommendations" },
              ].map((item, index) => (
                <Card key={index} className="card-enhanced group p-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/30 mb-4 group-hover:bg-primary/20 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_hsla(155,100%,45%,0.2)] transition-all">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-heading text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </Card>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button
                size="lg"
                onClick={() => setHasStarted(true)}
                className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-10 py-6 rounded-full shadow-cyber transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsla(155,100%,45%,0.4)] btn-shimmer"
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
      <div className="min-h-screen bg-background py-20">
        <div
          ref={resultsRef}
          className={`container mx-auto px-4 max-w-5xl transition-all duration-1000 ${
            resultsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Header */}
          <div className="text-center mb-16">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Assessment Complete</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading mb-4">
              <span className="text-gradient-animate">
                YOUR AI ASSESSMENT RESULTS
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Here's how your organisation measures up across the 8 key AI competency dimensions
            </p>
          </div>

          {/* Overall Score */}
          <div className="relative mb-8">
            <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-primary/60" />
            <div className="absolute -top-3 -right-3 w-10 h-10 border-t-2 border-r-2 border-primary/60" />
            <div className="absolute -bottom-3 -left-3 w-10 h-10 border-b-2 border-l-2 border-primary/60" />
            <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-primary/60" />
            <Card className="glass-card border border-primary/30 shadow-glow-card">
              <CardContent className="p-12 text-center">
                <div
                  className="relative w-64 h-64 mx-auto mb-8"
                  style={{
                    background: `conic-gradient(hsl(155, 100%, 45%) ${percentage * 3.6}deg, hsl(var(--border)) ${percentage * 3.6}deg)`,
                    borderRadius: "50%",
                  }}
                >
                  <div className="absolute inset-4 bg-card rounded-full flex items-center justify-center flex-col border border-border">
                    <div className="text-6xl font-bold text-primary mb-2 glow-green">
                      {percentage}%
                    </div>
                    <div className="text-sm text-muted-foreground">AI Readiness Score</div>
                  </div>
                </div>
                <div className="text-3xl font-heading text-primary glow-green mb-2">
                  {readinessLevel}
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  {levelDescription}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Dimension Scores */}
          <div className="mb-8">
            <h3 className="text-2xl font-heading text-foreground mb-6">
              Detailed Breakdown
            </h3>
            <div className="grid gap-4">
              {answers.map((answer, index) => {
                const scorePercentage = (answer.score / 4) * 100;
                let badgeColor = "";
                let badgeText = "";

                if (scorePercentage >= 85) {
                  badgeColor = "bg-primary/20 text-primary border-primary/50";
                  badgeText = "Excellent";
                } else if (scorePercentage >= 70) {
                  badgeColor = "bg-cyan-500/20 text-cyan-400 border-cyan-500/50";
                  badgeText = "Good";
                } else if (scorePercentage >= 50) {
                  badgeColor = "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
                  badgeText = "Developing";
                } else {
                  badgeColor = "bg-secondary/20 text-secondary border-secondary/50";
                  badgeText = "Emerging";
                }

                return (
                  <Card
                    key={index}
                    className="card-enhanced"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground mb-1">
                            {questions[index].title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Score: {answer.score}/4
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${badgeColor}`}
                        >
                          {badgeText}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {answer.answer}
                      </p>
                      <div className="w-full bg-border rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-500"
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
          <Card className="glass-card border border-secondary/30 shadow-glow-card mb-8">
            <CardContent className="p-10">
              <h3 className="text-2xl font-heading text-gradient-animate mb-6 text-center">
                Recommended Next Steps
              </h3>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="card-enhanced p-6 group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center border border-secondary/30 group-hover:bg-secondary/20 group-hover:shadow-[0_0_15px_hsla(320,85%,55%,0.2)] transition-all flex-shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">
                          {rec.title}
                        </h4>
                        <p className="text-muted-foreground">{rec.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="relative">
            <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-secondary/60" />
            <div className="absolute -top-3 -right-3 w-10 h-10 border-t-2 border-r-2 border-secondary/60" />
            <div className="absolute -bottom-3 -left-3 w-10 h-10 border-b-2 border-l-2 border-secondary/60" />
            <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-secondary/60" />
            <Card className="glass-card border border-secondary/30 shadow-glow-card">
              <CardContent className="p-10 text-center">
                <h3 className="text-2xl font-heading text-foreground mb-4">
                  Ready to Accelerate Your AI Journey?
                </h3>
                <p className="text-lg text-muted-foreground mb-8">
                  Let's discuss a tailored strategy to improve your AI readiness and drive measurable results.
                </p>
                <Button
                  size="lg"
                  className="group relative overflow-hidden bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-10 py-6 shadow-cyber transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsla(320,85%,55%,0.4)] btn-shimmer"
                  asChild
                >
                  <a href="https://calendly.com/eschwaa/30min" target="_blank" rel="noopener noreferrer">
                    Schedule Free Consultation
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Email capture form
  if (showEmailCapture) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Cyber corners */}
          <div className="relative">
            <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-primary/60" />
            <div className="absolute -top-3 -right-3 w-10 h-10 border-t-2 border-r-2 border-primary/60" />
            <div className="absolute -bottom-3 -left-3 w-10 h-10 border-b-2 border-l-2 border-primary/60" />
            <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-primary/60" />
            <Card className="glass-card border border-primary/30 shadow-glow-card">
              <CardContent className="p-10">
                <div className="text-center mb-8">
                  <div className="relative inline-block">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/30">
                      <CheckCircle2 className="w-10 h-10 text-primary animate-glow-pulse" />
                    </div>
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                  </div>
                  <h2 className="text-3xl font-heading text-gradient-animate mb-4">
                    GET YOUR PERSONALIZED RESULTS
                  </h2>
                  <p className="text-muted-foreground">
                    Enter your details below to receive your comprehensive AI readiness report
                  </p>
                </div>

                <form onSubmit={handleSubmitEmail} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">
                        First Name *
                      </label>
                      <Input
                        required
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({ ...formData, firstName: e.target.value })
                        }
                        className="bg-background border-border focus:border-primary"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">
                        Last Name *
                      </label>
                      <Input
                        required
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                        className="bg-background border-border focus:border-primary"
                        placeholder="Smith"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="bg-background border-border focus:border-primary"
                      placeholder="john.smith@company.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">
                      Company
                    </label>
                    <Input
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      className="bg-background border-border focus:border-primary"
                      placeholder="Your Company"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">
                        Job Title
                      </label>
                      <Input
                        value={formData.jobTitle}
                        onChange={(e) =>
                          setFormData({ ...formData, jobTitle: e.target.value })
                        }
                        className="bg-background border-border focus:border-primary"
                        placeholder="CEO"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">
                        Company Size
                      </label>
                      <select
                        value={formData.companySize}
                        onChange={(e) =>
                          setFormData({ ...formData, companySize: e.target.value })
                        }
                        className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground focus:border-primary focus:outline-none transition-colors"
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
                    <label className="block text-sm font-medium mb-2 text-foreground">
                      Industry
                    </label>
                    <select
                      value={formData.industry}
                      onChange={(e) =>
                        setFormData({ ...formData, industry: e.target.value })
                      }
                      className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground focus:border-primary focus:outline-none transition-colors"
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
                    className="group relative overflow-hidden w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 shadow-cyber transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_hsla(155,100%,45%,0.4)] btn-shimmer"
                  >
                    Get My AI Assessment Results
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    We respect your privacy. Your information will only be used to send you
                    your assessment results and relevant AI insights.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen pt-32 pb-20 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading mb-4">
            <span className="text-primary glow-green">AI COMPETENCY</span>
            <br />
            <span className="text-foreground">ASSESSMENT</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Evaluate your organisation's AI readiness across 8 critical business
            dimensions and receive personalized insights to accelerate your AI
            journey.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm text-primary font-semibold glow-green">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Question Card */}
        <Card className="border-2 border-primary shadow-cyber mb-8 bg-card">
          <CardContent className="p-10">
            <h2 className="text-2xl font-heading text-primary glow-green mb-4">
              {question.title}
            </h2>
            <p className="text-xl text-foreground mb-8 leading-relaxed">
              {question.question}
            </p>

            <div className="space-y-4">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectOption(index)}
                  className={`w-full text-left p-6 rounded-lg border-2 transition-all ${
                    selectedOption === index
                      ? "border-primary bg-primary/10 shadow-cyber glow-green"
                      : "border-border bg-card hover:border-primary/50 hover:bg-muted"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                        selectedOption === index
                          ? "border-primary bg-primary"
                          : "border-muted-foreground"
                      }`}
                    >
                      {selectedOption === index && (
                        <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                      )}
                    </div>
                    <p className="text-foreground flex-1">{option.text}</p>
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
            className="border-2 border-border text-foreground hover:bg-muted font-semibold px-8 py-6"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </Button>
          <Button
            size="lg"
            onClick={handleNext}
            disabled={selectedOption === null}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 shadow-cyber glow-green"
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
