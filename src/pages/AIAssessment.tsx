import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, CheckCircle2, ArrowRight } from "lucide-react";
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
      title: "Risk Management & Governance",
      question:
        "How well does your organisation manage AI-related risks and governance?",
      options: [
        {
          text: "Comprehensive AI governance framework with active risk management",
          score: 4,
        },
        {
          text: "Basic governance policies and risk assessment procedures in place",
          score: 3,
        },
        {
          text: "Awareness of AI risks but limited formal governance structures",
          score: 2,
        },
        {
          text: "Minimal consideration of AI risks and governance requirements",
          score: 1,
        },
      ],
    },
    {
      title: "Data & Decision Making",
      question:
        "How effectively does your organisation leverage data for AI-driven decision making?",
      options: [
        {
          text: "High-quality, integrated data powers real-time AI-driven decisions",
          score: 4,
        },
        {
          text: "Good data foundation with some AI-enhanced decision processes",
          score: 3,
        },
        {
          text: "Basic data collection but limited AI-powered insights",
          score: 2,
        },
        {
          text: "Data is fragmented with minimal analytics or AI application",
          score: 1,
        },
      ],
    },
    {
      title: "Growth & Market Expansion",
      question:
        "How well does your organisation use AI to drive growth and market opportunities?",
      options: [
        {
          text: "AI enables new revenue streams and market expansion strategies",
          score: 4,
        },
        {
          text: "We use AI for market analysis and some growth initiatives",
          score: 3,
        },
        {
          text: "Limited use of AI for market insights and growth planning",
          score: 2,
        },
        {
          text: "Growth strategies are developed without AI-driven insights",
          score: 1,
        },
      ],
    },
  ];

  const handleSelectOption = (index: number) => {
    setSelectedOption(index);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    const question = questions[currentQuestion];
    const newAnswer: Answer = {
      question: question.title,
      answer: question.options[selectedOption].text,
      score: question.options[selectedOption].score,
    };

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = newAnswer;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      // Check if next question already has an answer
      const nextAnswer = newAnswers[currentQuestion + 1];
      if (nextAnswer) {
        const nextOptionIndex = question.options.findIndex(
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
      levelColor = "text-primary";
      levelDescription =
        "Your organisation demonstrates advanced AI maturity with strong capabilities across all dimensions.";
    } else if (percentage >= 70) {
      readinessLevel = "AI Ready";
      levelColor = "text-secondary";
      levelDescription =
        "Your organisation has solid foundations and is well-positioned for AI implementation.";
    } else if (percentage >= 50) {
      readinessLevel = "AI Developing";
      levelColor = "text-yellow-500";
      levelDescription =
        "Your organisation has identified AI opportunities and is building capabilities.";
    } else {
      readinessLevel = "AI Emerging";
      levelColor = "text-orange-500";
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
            "Implement robust AI governance frameworks to ensure responsible AI use, compliance, and risk management.",
        }
      );
    } else {
      recommendations.push(
        {
          title: "Drive Innovation Leadership",
          description:
            "Leverage your AI maturity to create competitive advantages and explore cutting-edge AI applications that could reshape your industry.",
        },
        {
          title: "Share Your Expertise",
          description:
            "Consider partnering with other organisations or contributing to AI thought leadership to strengthen your position as an AI leader.",
        }
      );
    }

    // Add specific recommendations based on lowest scoring areas
    const lowestScoring = [...answers]
      .sort((a, b) => a.score - b.score)
      .slice(0, 2);

    lowestScoring.forEach((item) => {
      if (item.score <= 2) {
        switch (item.question) {
          case "Vision & Strategic Differentiation":
            recommendations.push({
              title: "Develop AI Vision",
              description:
                "Create a clear AI vision statement and strategy that aligns with your business goals and competitive positioning.",
            });
            break;
          case "Data & Decision Making":
            recommendations.push({
              title: "Improve Data Infrastructure",
              description:
                "Invest in data quality, integration, and analytics capabilities to support AI-driven decision making.",
            });
            break;
          case "Talent & Culture":
            recommendations.push({
              title: "Build AI Culture",
              description:
                "Foster an AI-ready culture through training, change management, and demonstrating AI value to your team.",
            });
            break;
        }
      }
    });

    return recommendations.slice(0, 4);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    const { totalScore, percentage, readinessLevel, levelColor, levelDescription } =
      calculateResults();
    const recommendations = generateRecommendations();

    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-heading mb-4">
              <span className="text-primary glow-green">
                YOUR AI ASSESSMENT RESULTS
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Here's your comprehensive AI readiness analysis
            </p>
          </div>

          {/* Overall Score */}
          <Card className="bg-gradient-cyber border-2 border-primary shadow-cyber-lg mb-8">
            <CardContent className="p-12 text-center">
              <div
                className="w-48 h-48 mx-auto mb-6 rounded-full flex items-center justify-center relative"
                style={{
                  background: `conic-gradient(hsl(145 65% 48%) ${percentage}%, hsl(0 0% 20%) 0%)`,
                }}
              >
                <div className="absolute inset-4 bg-card rounded-full flex items-center justify-center flex-col">
                  <div className="text-6xl font-heading text-primary glow-green mb-2">
                    {percentage}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {totalScore}/32
                  </div>
                </div>
              </div>
              <h2 className={`text-3xl font-heading mb-3 ${levelColor}`}>
                {readinessLevel}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {levelDescription}
              </p>
            </CardContent>
          </Card>

          {/* Dimension Breakdown */}
          <div className="mb-8">
            <h3 className="text-2xl font-heading text-foreground mb-6 text-center">
              <span className="text-secondary glow-pink">
                DIMENSION BREAKDOWN
              </span>
            </h3>
            <div className="space-y-4">
              {answers.map((answer, index) => {
                const scorePercentage = (answer.score / 4) * 100;
                let badgeColor = "";
                let badgeText = "";

                if (scorePercentage >= 85) {
                  badgeColor = "bg-primary/20 text-primary border-primary";
                  badgeText = "Excellent";
                } else if (scorePercentage >= 70) {
                  badgeColor = "bg-secondary/20 text-secondary border-secondary";
                  badgeText = "Good";
                } else if (scorePercentage >= 50) {
                  badgeColor = "bg-yellow-500/20 text-yellow-500 border-yellow-500";
                  badgeText = "Developing";
                } else {
                  badgeColor = "bg-orange-500/20 text-orange-500 border-orange-500";
                  badgeText = "Emerging";
                }

                return (
                  <Card
                    key={index}
                    className="bg-card border-2 border-border shadow-cyber"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-heading text-foreground">
                          {answer.question}
                        </h4>
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full border ${badgeColor}`}
                        >
                          {badgeText} ({answer.score}/4)
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
          <Card className="bg-gradient-cyber border-2 border-secondary shadow-cyber-lg mb-8">
            <CardContent className="p-10">
              <h3 className="text-2xl font-heading text-secondary glow-pink mb-6 text-center">
                YOUR PERSONALIZED RECOMMENDATIONS
              </h3>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="bg-card border border-border rounded-lg p-6"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-lg font-heading text-foreground mb-2">
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
          <Card className="bg-gradient-cyber border-2 border-primary shadow-cyber-lg">
            <CardContent className="p-10 text-center">
              <h3 className="text-2xl font-heading text-foreground mb-4">
                READY TO ACCELERATE YOUR AI JOURNEY?
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                Let's discuss how to implement these recommendations in your
                organisation.
              </p>
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 glow-green font-semibold px-10 py-6 shadow-cyber"
                asChild
              >
                <a href="https://calendly.com/eschwaa/aiconsult">
                  Book Your Strategy Call
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (showEmailCapture) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="bg-gradient-cyber border-2 border-primary shadow-cyber-lg">
            <CardContent className="p-10">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-3xl font-heading text-primary glow-green mb-4">
                  GET YOUR PERSONALIZED RESULTS
                </h2>
                <p className="text-lg text-muted-foreground">
                  You're just one step away from receiving your comprehensive AI
                  readiness report with personalized recommendations.
                </p>
              </div>

              <form onSubmit={handleSubmitEmail} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-foreground mb-2 block font-semibold">
                      First Name *
                    </label>
                    <Input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      className="bg-background border-2 border-border focus:border-primary"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-foreground mb-2 block font-semibold">
                      Last Name *
                    </label>
                    <Input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      className="bg-background border-2 border-border focus:border-primary"
                      placeholder="Smith"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-foreground mb-2 block font-semibold">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="bg-background border-2 border-border focus:border-primary"
                    placeholder="john.smith@company.com"
                  />
                </div>

                <div>
                  <label className="text-sm text-foreground mb-2 block font-semibold">
                    Company Name *
                  </label>
                  <Input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="bg-background border-2 border-border focus:border-primary"
                    placeholder="Your Company"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-foreground mb-2 block font-semibold">
                      Job Title *
                    </label>
                    <Input
                      type="text"
                      required
                      value={formData.jobTitle}
                      onChange={(e) =>
                        setFormData({ ...formData, jobTitle: e.target.value })
                      }
                      className="bg-background border-2 border-border focus:border-primary"
                      placeholder="CEO"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-foreground mb-2 block font-semibold">
                      Company Size
                    </label>
                    <select
                      value={formData.companySize}
                      onChange={(e) =>
                        setFormData({ ...formData, companySize: e.target.value })
                      }
                      className="w-full bg-background border-2 border-border rounded-md px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                    >
                      <option value="">Select size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-1000">201-1,000 employees</option>
                      <option value="1000+">1,000+ employees</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-foreground mb-2 block font-semibold">
                    Industry
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) =>
                      setFormData({ ...formData, industry: e.target.value })
                    }
                    className="w-full bg-background border-2 border-border rounded-md px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                  >
                    <option value="">Select industry</option>
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Financial Services">Financial Services</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Retail">Retail</option>
                    <option value="Education">Education</option>
                    <option value="Professional Services">
                      Professional Services
                    </option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-green font-semibold py-6 shadow-cyber"
                >
                  Get My AI Assessment Results
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  We respect your privacy. Your information will only be used to
                  provide your assessment results and relevant AI insights. You can
                  unsubscribe at any time.
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
    <div className="min-h-screen pt-32 pb-20">
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
            <span className="text-sm text-primary font-semibold">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Question Card */}
        <Card className="bg-gradient-cyber border-2 border-primary shadow-cyber-lg mb-8">
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
                      ? "border-primary bg-primary/10 shadow-cyber"
                      : "border-border bg-card hover:border-primary/50 hover:bg-card/80"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                        selectedOption === index
                          ? "border-primary bg-primary"
                          : "border-border"
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
            className="border-2 border-border text-foreground hover:bg-border font-semibold px-8 py-6"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </Button>
          <Button
            size="lg"
            onClick={handleNext}
            disabled={selectedOption === null}
            className="bg-primary text-primary-foreground hover:bg-primary/90 glow-green font-semibold px-8 py-6 shadow-cyber"
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
