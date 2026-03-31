import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  TrendingUp,
  DollarSign,
  Calendar,
  Target,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { jsPDF } from "jspdf";
import emailjs from "@emailjs/browser";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface CalculatorInputs {
  industry: string;
  companySize: string;
  revenue: string;
  techSavvy: string;
  currentAI: string;
  priority: string;
}

interface ROIResults {
  netROI: number;
  totalValue: number;
  implementationCost: number;
  costOfDelay: number;
  yearlyBreakdown: {
    year1: number;
    year2: number;
    year3: number;
  };
  insights: {
    [key: string]: { label: string; value: string };
  };
  timeToROI: string;
}

const ROICalculator = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    industry: "",
    companySize: "",
    revenue: "",
    techSavvy: "",
    currentAI: "",
    priority: "",
  });

  const [results, setResults] = useState<ROIResults | null>(null);
  const [showResults, setShowResults] = useState(false);

  // Scroll reveal hooks
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal();
  const { ref: statsRef, isVisible: statsVisible } = useScrollReveal();
  const { ref: formRef, isVisible: formVisible } = useScrollReveal();
  const { ref: resultsRef, isVisible: resultsVisible } = useScrollReveal();

  // Lead capture modal state
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [leadForm, setLeadForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
  });

  // Calculate ROI in real-time as inputs change
  useEffect(() => {
    if (
      inputs.industry &&
      inputs.companySize &&
      inputs.revenue &&
      inputs.techSavvy &&
      inputs.currentAI &&
      inputs.priority
    ) {
      const calculatedResults = calculateROI(inputs);
      setResults(calculatedResults);
      if (!showResults) {
        setShowResults(true);
      }
    }
  }, [inputs]);

  const calculateROI = (data: CalculatorInputs): ROIResults => {
    // Industry-specific multipliers and factors
    const industryFactors: {
      [key: string]: { efficiency: number; growth: number; baseline: number };
    } = {
      "professional-services": { efficiency: 1.4, growth: 1.2, baseline: 280000 },
      healthcare: { efficiency: 1.6, growth: 1.1, baseline: 420000 },
      "financial-services": { efficiency: 1.8, growth: 1.3, baseline: 650000 },
      manufacturing: { efficiency: 1.7, growth: 1.4, baseline: 580000 },
      retail: { efficiency: 1.3, growth: 1.5, baseline: 340000 },
      "real-estate": { efficiency: 1.2, growth: 1.3, baseline: 280000 },
      technology: { efficiency: 1.5, growth: 1.6, baseline: 520000 },
      education: { efficiency: 1.3, growth: 1.0, baseline: 220000 },
      other: { efficiency: 1.3, growth: 1.2, baseline: 300000 },
    };

    // Company size multipliers
    const sizeMultipliers: { [key: string]: number } = {
      "1-10": 0.6,
      "11-50": 1.0,
      "51-200": 1.8,
      "201-1000": 3.2,
      "1000+": 5.5,
    };

    // Revenue base amounts for calculations (GBP)
    const revenueBase: { [key: string]: number } = {
      "under-1m": 400000,
      "1m-5m": 2000000,
      "5m-25m": 10000000,
      "25m-100m": 40000000,
      "100m+": 160000000,
    };

    // Tech readiness impact
    const techReadiness: { [key: string]: number } = {
      low: 0.7,
      medium: 1.0,
      high: 1.3,
    };

    // Current AI level impact
    const aiReadiness: { [key: string]: number } = {
      none: 0.8,
      basic: 1.0,
      some: 1.2,
      advanced: 1.4,
    };

    // Get factors
    const industry = industryFactors[data.industry] || industryFactors["other"];
    const sizeMultiplier = sizeMultipliers[data.companySize] || 1.0;
    const revenue = revenueBase[data.revenue] || 2500000;
    const techFactor = techReadiness[data.techSavvy] || 1.0;
    const aiFactor = aiReadiness[data.currentAI] || 1.0;

    // Calculate baseline AI value
    const baselineValue = industry.baseline * sizeMultiplier * techFactor * aiFactor;

    // Year 1 calculations
    const year1Efficiency = baselineValue * industry.efficiency * 0.6; // 60% in year 1
    const year1Growth = revenue * 0.15 * industry.growth * 0.4; // 40% in year 1
    const year1Total = year1Efficiency + year1Growth;

    // Year 2 calculations
    const year2Efficiency = baselineValue * industry.efficiency * 0.85;
    const year2Growth = revenue * 0.25 * industry.growth * 0.7;
    const year2Total = year2Efficiency + year2Growth;

    // Year 3 calculations
    const year3Efficiency = baselineValue * industry.efficiency;
    const year3Growth = revenue * 0.35 * industry.growth;
    const year3Total = year3Efficiency + year3Growth;

    // Total value over 3 years
    const totalValue = year1Total + year2Total + year3Total;

    // Implementation costs (conservative estimate)
    const implementationCost = Math.min(totalValue * 0.25, revenue * 0.08);

    // Net ROI
    const netROI = ((totalValue - implementationCost) / implementationCost) * 100;

    // Cost of delay (12 months)
    const delayedStart = year1Total * 0.8; // Miss 80% of year 1 value
    const competitorAdvantage = revenue * 0.05; // 5% market share risk
    const increasedCosts = implementationCost * 0.15; // 15% higher costs later
    const costOfDelay = delayedStart + competitorAdvantage + increasedCosts;

    // Priority-specific insights
    const priorityInsights: {
      [key: string]: {
        metric1: { label: string; value: string };
        metric2: { label: string; value: string };
        metric3: { label: string; value: string };
      };
    } = {
      efficiency: {
        metric1: {
          label: "Time Savings per Week",
          value: Math.round(sizeMultiplier * 8) + " hours",
        },
        metric2: {
          label: "Process Automation",
          value: Math.round(industry.efficiency * 35) + "%",
        },
        metric3: { label: "Error Reduction", value: "78%" },
      },
      growth: {
        metric1: {
          label: "Revenue Uplift Potential",
          value: Math.round(industry.growth * 28) + "%",
        },
        metric2: {
          label: "Customer Acquisition",
          value: "+" + Math.round(sizeMultiplier * 12) + "%",
        },
        metric3: { label: "Market Expansion", value: "2.3x faster" },
      },
      customer: {
        metric1: { label: "Response Time Improvement", value: "78%" },
        metric2: {
          label: "Satisfaction Increase",
          value: "+" + Math.round(industry.efficiency * 25) + "%",
        },
        metric3: { label: "Retention Improvement", value: "+15%" },
      },
      costs: {
        metric1: {
          label: "Operating Cost Reduction",
          value: Math.round(industry.efficiency * 22) + "%",
        },
        metric2: {
          label: "Labor Cost Savings",
          value: "£" + Math.round(baselineValue / 1000) + "K",
        },
        metric3: { label: "Resource Optimization", value: "45%" },
      },
      competitive: {
        metric1: { label: "Time to Market", value: "56% faster" },
        metric2: { label: "Competitive Advantage", value: "24 months" },
        metric3: { label: "Innovation Speed", value: "3x faster" },
      },
    };

    return {
      netROI: Math.round(netROI),
      totalValue: totalValue,
      implementationCost: implementationCost,
      costOfDelay: costOfDelay,
      yearlyBreakdown: {
        year1: year1Total,
        year2: year2Total,
        year3: year3Total,
      },
      insights: priorityInsights[data.priority] || priorityInsights["efficiency"],
      timeToROI: netROI > 200 ? "4-6 months" : "6-8 months",
    };
  };

  const formatCurrency = (value: number) => {
    return "£" + Math.round(value / 1000).toLocaleString() + "K";
  };

  const generateBusinessCasePDF = () => {
    if (!results) return;

    const doc = new jsPDF();

    // Title Page
    doc.setFontSize(24);
    doc.setTextColor(220, 38, 38);
    doc.text('AI BUSINESS CASE', 20, 30);

    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text(leadForm.company, 20, 45);

    doc.setFontSize(12);
    doc.text(`Prepared for: ${leadForm.firstName} ${leadForm.lastName}`, 20, 60);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 70);
    doc.text('Prepared by: theaiexpert.ai', 20, 80);

    // Executive Summary
    doc.setFontSize(16);
    doc.setTextColor(220, 38, 38);
    doc.text('EXECUTIVE SUMMARY', 20, 100);

    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    const execSummary = [
      `AI implementation for ${leadForm.company} represents a critical business opportunity`,
      `that cannot be delayed without significant competitive and financial risk.`,
      '',
      `Key Financial Impact:`,
      `• Expected 3-year ROI: ${results.netROI}%`,
      `• Total projected value: £${Math.round(results.totalValue/1000)}K over 3 years`,
      `• Implementation investment: £${Math.round(results.implementationCost/1000)}K`,
      `• Cost of delaying 12 months: £${Math.round(results.costOfDelay/1000)}K`,
      '',
      'RECOMMENDATION: Begin AI implementation immediately to capture',
      'maximum value and maintain competitive position.'
    ];

    let yPos = 115;
    execSummary.forEach(line => {
      doc.text(line, 25, yPos);
      yPos += 6;
    });

    // Add new page for detailed analysis
    doc.addPage();

    // The Compound Interest Case
    doc.setFontSize(16);
    doc.setTextColor(220, 38, 38);
    doc.text('AI: YOUR NEW COMPOUND INTEREST', 20, 30);

    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    yPos = 45;

    const compoundCase = [
      'Like compound interest, AI returns accelerate over time. Every month',
      'of delay means missing exponential gains that become harder to',
      'recover as competitors build advantages.',
      '',
      'INDUSTRY EVIDENCE (Source: Leading Research Institutions):'
    ];

    // Add the industry evidence with clickable links
    const industryEvidence = [
      { text: '• 88% of companies see early returns on AI investments (PwC 2025)', url: 'https://www.pwc.com/us/en/tech-effect/ai-analytics/ai-business-survey.html' },
      { text: '• 40% productivity boost for skilled workers using AI properly (MIT/Harvard)', url: 'https://www.nber.org/papers/w31161' },
      { text: '• 70% of CEOs expect AI to transform value creation (PwC Global CEO Survey)', url: 'https://www.pwc.com/gx/en/issues/c-suite-insights/ceo-survey.html' },
      { text: '• 27% productivity growth in AI-exposed industries (PwC Jobs Barometer)', url: 'https://www.pwc.com/us/en/tech-effect/ai-analytics/ai-jobs-barometer.html' },
      { text: '• 49% of tech leaders have AI fully integrated into strategy (PwC 2025)', url: 'https://www.pwc.com/us/en/tech-effect/ai-analytics/ai-business-survey.html' }
    ];

    const remainingCompoundCase = [
      '',
      'Your AI Compound Growth Projection:',
      `• Year 1: £${Math.round(results.yearlyBreakdown.year1/1000)}K value created`,
      `• Year 2: £${Math.round(results.yearlyBreakdown.year2/1000)}K value created`,
      `• Year 3: £${Math.round(results.yearlyBreakdown.year3/1000)}K value created`,
      '',
      'The Mathematics of Delay:',
      'Waiting 12 months costs your organization:',
      `• Lost efficiency gains: £${Math.round((results.costOfDelay * 0.6)/1000)}K`,
      `• Competitive disadvantage: £${Math.round((results.costOfDelay * 0.3)/1000)}K`,
      `• Higher implementation costs: £${Math.round((results.costOfDelay * 0.1)/1000)}K`,
      `• Total cost of delay: £${Math.round(results.costOfDelay/1000)}K`
    ];

    // Add the first part of compound case
    compoundCase.forEach(line => {
      if (yPos > 250) {
        doc.addPage();
        yPos = 30;
      }
      doc.text(line, 25, yPos);
      yPos += 6;
    });

    // Add industry evidence with clickable links
    industryEvidence.forEach(item => {
      if (yPos > 250) {
        doc.addPage();
        yPos = 30;
      }
      doc.setTextColor(0, 100, 200);
      doc.text(item.text, 25, yPos);
      doc.link(25, yPos - 3, 160, 6, { url: item.url });
      doc.setTextColor(0, 0, 0);
      yPos += 6;
    });

    // Add remaining compound case content
    remainingCompoundCase.forEach(line => {
      if (yPos > 250) {
        doc.addPage();
        yPos = 30;
      }
      doc.text(line, 25, yPos);
      yPos += 6;
    });

    // Add new page for implementation roadmap
    doc.addPage();

    doc.setFontSize(16);
    doc.setTextColor(220, 38, 38);
    doc.text('3-PHASE IMPLEMENTATION ROADMAP', 20, 30);

    yPos = 50;
    const roadmap = [
      'PHASE 1: QUICK WINS (Months 1-2)',
      '• Deploy AI productivity tools (ChatGPT, Copilot)',
      '• Automate routine email responses and scheduling',
      '• Implement basic customer service chatbots',
      `• Expected value: £${Math.round((results.yearlyBreakdown.year1 * 0.3)/1000)}K`,
      '',
      'PHASE 2: CORE OPERATIONS (Months 3-6)',
      '• AI-powered analytics and reporting',
      '• Process automation for key workflows',
      '• Personalized customer experiences',
      `• Expected value: £${Math.round((results.yearlyBreakdown.year1 * 0.7)/1000)}K`,
      '',
      'PHASE 3: STRATEGIC ADVANTAGE (Months 6-12)',
      '• Custom AI solutions for competitive advantage',
      '• Predictive analytics for business insights',
      '• AI-driven product/service innovation',
      `• Expected value: £${Math.round(results.yearlyBreakdown.year2/1000)}K`,
      '',
      'SUCCESS METRICS:',
      `• ROI positive by month ${results.timeToROI.includes('4-6') ? '5' : '7'}`,
      '• 25%+ efficiency improvement by month 6',
      '• Full implementation ROI within 18 months'
    ];

    roadmap.forEach(line => {
      if (yPos > 260) {
        doc.addPage();
        yPos = 30;
      }

      if (line.startsWith('PHASE') || line.startsWith('SUCCESS')) {
        doc.setFont(undefined, 'bold');
      } else {
        doc.setFont(undefined, 'normal');
      }

      doc.text(line, 25, yPos);
      yPos += 6;
    });

    // Add final page with next steps
    doc.addPage();

    doc.setFontSize(16);
    doc.setTextColor(220, 38, 38);
    doc.text('NEXT STEPS', 20, 30);

    doc.setFont(undefined, 'normal');
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);

    yPos = 50;
    const nextSteps = [
      'IMMEDIATE ACTIONS (This Week):',
      '1. Share this business case with key stakeholders',
      '2. Book an AI strategy consultation: calendly.com/eschwaa/aiconsult',
      '3. Begin researching AI productivity tools for quick wins',
      '',
      'SHORT-TERM ACTIONS (Next 30 Days):',
      '1. Develop detailed AI implementation budget',
      '2. Identify internal AI champion/project manager',
      '3. Create AI governance and risk management framework',
      '',
      'The Cost of Inaction:',
      `Every month of delay costs ${leadForm.company} approximately`,
      `£${Math.round((results.costOfDelay/12)/1000)}K in lost value and competitive position.`,
      '',
      'Time is your most valuable asset in the AI race.',
      'Companies that act now will compound ahead of those who wait.',
      '',
      '───────────────────────────────────────────────',
      '',
      'Contact Information:',
      'Erik Schwartz, Fractional CAIO',
      'Email: eschwaa@gmail.com',
      'Phone: +44-7946-235391',
      'Website: theaiexpert.ai',
      '',
      '"AI isn\'t a tech project — it\'s compound interest for your business."'
    ];

    nextSteps.forEach(line => {
      if (yPos > 260) {
        doc.addPage();
        yPos = 30;
      }

      if (line.startsWith('IMMEDIATE') || line.startsWith('SHORT-TERM') || line.startsWith('The Cost')) {
        doc.setFont(undefined, 'bold');
      } else if (line.startsWith('"')) {
        doc.setFont(undefined, 'italic');
      } else {
        doc.setFont(undefined, 'normal');
      }

      doc.text(line, 25, yPos);
      yPos += 6;
    });

    // Save the PDF
    doc.save(`AI_Business_Case_${leadForm.company.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!results) return;

    try {
      // Initialize EmailJS
      emailjs.init("oI6t4dwMhBXNaBKXo");

      // Send lead notification
      await emailjs.send("theaiexpert_assessment", "template_dmkjg71", {
        from_name: `${leadForm.firstName} ${leadForm.lastName}`,
        from_email: leadForm.email,
        company: leadForm.company,
        downloaded_resource: 'AI ROI Calculator Business Case',
        download_date: new Date().toLocaleString(),
        lead_type: 'AI ROI Calculator',
        lead_source: 'Website ROI Calculator'
      });

      // Close modal
      setShowLeadModal(false);

      // Generate and download PDF
      setTimeout(() => {
        generateBusinessCasePDF();
        toast.success("Your AI Business Case is downloading!");
      }, 300);

    } catch (error) {
      console.error('Lead submission error:', error);
      // Still generate PDF even if email fails
      setShowLeadModal(false);
      setTimeout(() => {
        generateBusinessCasePDF();
        toast.success("Your AI Business Case is downloading!");
      }, 300);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      <SEOHead
        title="AI ROI Calculator | Calculate Your AI Investment Returns | The AI Expert"
        description="Calculate your potential AI return on investment. Our free ROI calculator shows expected returns, cost of delay, and generates a personalised AI business case."
        keywords="AI ROI calculator, AI investment returns, AI business case, cost of AI delay, AI value calculator"
        canonicalUrl="/roi-calculator"
      />
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Hero Section */}
        <div
          ref={heroRef}
          className={`text-center mb-16 transition-all duration-300 ${
            heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Free ROI Analysis</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-heading mb-4">
            <span className="text-gradient-animate">AI ROI CALCULATOR</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Calculate your potential AI return on investment and see the cost of
            waiting. Every month you delay, your competitors compound ahead.
          </p>
        </div>

        {/* Stats Bar */}
        <div
          ref={statsRef}
          className={`grid md:grid-cols-3 gap-6 mb-16 transition-all duration-300 delay-100 ${
            statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {[
            { value: "88%", label: "see early returns on AI investments", source: "PwC 2025", color: "primary" },
            { value: "40%", label: "productivity boost with proper AI use", source: "Stanford/MIT", color: "secondary" },
            { value: "70%", label: "of CEOs expect AI to transform value creation", source: "PwC Global CEO Survey", color: "primary" },
          ].map((stat, index) => (
            <Card key={index} className={`card-enhanced group border ${stat.color === "primary" ? "border-primary/30 hover:border-primary/50 hover:shadow-[0_0_30px_hsla(155,100%,45%,0.15)]" : "border-secondary/30 hover:border-secondary/50 hover:shadow-[0_0_30px_hsla(320,85%,55%,0.15)]"}`}>
              <CardContent className="p-6 text-center">
                <div className={`text-3xl font-heading mb-2 ${stat.color === "primary" ? "text-primary glow-green" : "text-secondary glow-pink"}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
                <div className="text-xs text-muted-foreground/60 mt-1">
                  ({stat.source})
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Calculator Form */}
        <div
          ref={formRef}
          className={`relative mb-12 transition-all duration-300 delay-200 ${
            formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Cyber corners */}
          <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-primary/60" />
          <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-primary/60" />
          <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-primary/60" />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-primary/60" />
          <Card className="glass-card border border-primary/30 shadow-glow-card">
            <CardContent className="p-6 md:p-10">
              <h2 className="text-2xl font-heading text-gradient-animate mb-6 text-center">
                TELL US ABOUT YOUR BUSINESS
              </h2>
            <p className="text-center text-muted-foreground mb-8">
              Help us calculate your personalized AI ROI and cost of delay
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Industry */}
              <div>
                <label className="text-sm text-foreground mb-2 block font-semibold">
                  Industry *
                </label>
                <Select
                  value={inputs.industry}
                  onValueChange={(value) =>
                    setInputs({ ...inputs, industry: value })
                  }
                >
                  <SelectTrigger className="bg-background border-2 border-border focus:border-primary">
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional-services">
                      Professional Services
                    </SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="financial-services">
                      Financial Services
                    </SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="retail">Retail & E-commerce</SelectItem>
                    <SelectItem value="real-estate">Real Estate</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Company Size */}
              <div>
                <label className="text-sm text-foreground mb-2 block font-semibold">
                  Company Size *
                </label>
                <Select
                  value={inputs.companySize}
                  onValueChange={(value) =>
                    setInputs({ ...inputs, companySize: value })
                  }
                >
                  <SelectTrigger className="bg-background border-2 border-border focus:border-primary">
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-1000">201-1,000 employees</SelectItem>
                    <SelectItem value="1000+">1,000+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Revenue */}
              <div>
                <label className="text-sm text-foreground mb-2 block font-semibold">
                  Annual Revenue (GBP) *
                </label>
                <Select
                  value={inputs.revenue}
                  onValueChange={(value) =>
                    setInputs({ ...inputs, revenue: value })
                  }
                >
                  <SelectTrigger className="bg-background border-2 border-border focus:border-primary">
                    <SelectValue placeholder="Select revenue range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-1m">Under £800K</SelectItem>
                    <SelectItem value="1m-5m">£800K - £4M</SelectItem>
                    <SelectItem value="5m-25m">£4M - £20M</SelectItem>
                    <SelectItem value="25m-100m">£20M - £80M</SelectItem>
                    <SelectItem value="100m+">£80M+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tech Savvy */}
              <div>
                <label className="text-sm text-foreground mb-2 block font-semibold">
                  Technology Readiness *
                </label>
                <Select
                  value={inputs.techSavvy}
                  onValueChange={(value) =>
                    setInputs({ ...inputs, techSavvy: value })
                  }
                >
                  <SelectTrigger className="bg-background border-2 border-border focus:border-primary">
                    <SelectValue placeholder="How tech-savvy is your team?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Basic - We use essential tools</SelectItem>
                    <SelectItem value="medium">
                      Moderate - We adopt new tools regularly
                    </SelectItem>
                    <SelectItem value="high">
                      Advanced - We're early adopters
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Current AI */}
              <div>
                <label className="text-sm text-foreground mb-2 block font-semibold">
                  Current AI Usage *
                </label>
                <Select
                  value={inputs.currentAI}
                  onValueChange={(value) =>
                    setInputs({ ...inputs, currentAI: value })
                  }
                >
                  <SelectTrigger className="bg-background border-2 border-border focus:border-primary">
                    <SelectValue placeholder="Current AI implementation level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No AI tools yet</SelectItem>
                    <SelectItem value="basic">Basic tools (ChatGPT, etc.)</SelectItem>
                    <SelectItem value="some">Some business applications</SelectItem>
                    <SelectItem value="advanced">Advanced AI systems</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Priority */}
              <div>
                <label className="text-sm text-foreground mb-2 block font-semibold">
                  Top Business Priority *
                </label>
                <Select
                  value={inputs.priority}
                  onValueChange={(value) =>
                    setInputs({ ...inputs, priority: value })
                  }
                >
                  <SelectTrigger className="bg-background border-2 border-border focus:border-primary">
                    <SelectValue placeholder="What's your main focus?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="efficiency">
                      Improve operational efficiency
                    </SelectItem>
                    <SelectItem value="growth">Drive revenue growth</SelectItem>
                    <SelectItem value="customer">
                      Enhance customer experience
                    </SelectItem>
                    <SelectItem value="costs">Reduce operating costs</SelectItem>
                    <SelectItem value="competitive">Stay competitive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>

        {/* Results Section */}
        {showResults && results && (
          <div
            ref={resultsRef}
            className={`space-y-8 transition-all duration-300 ${
              resultsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {/* ROI Summary */}
            <Card className="glass-card border border-primary/30 shadow-glow-card">
              <CardContent className="p-6 md:p-10 lg:p-12 text-center">
                <h2 className="text-2xl font-heading text-foreground mb-6">
                  YOUR AI INVESTMENT RETURNS
                </h2>
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div
                    className="w-48 h-48 rounded-full flex items-center justify-center"
                    style={{
                      background: `conic-gradient(hsl(145 65% 48%) ${Math.min(
                        results.netROI,
                        360
                      )}%, hsl(0 0% 20%) 0%)`,
                    }}
                  >
                    <div className="absolute inset-4 bg-card rounded-full flex items-center justify-center flex-col">
                      <div className="text-5xl font-heading text-primary glow-green mb-1">
                        {results.netROI}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Expected ROI
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-lg text-muted-foreground">
                  Expected ROI over 3 years
                </p>
              </CardContent>
            </Card>

            {/* Cost of Delay */}
            <Card className="bg-gradient-to-br from-red-900/20 to-red-700/10 border-2 border-red-500 shadow-cyber-lg">
              <CardContent className="p-10 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <AlertCircle className="w-8 h-8 text-red-500" />
                  <h3 className="text-2xl font-heading text-foreground">
                    COST OF WAITING 12 MONTHS
                  </h3>
                </div>
                <div className="text-5xl font-heading text-red-500 mb-3">
                  {formatCurrency(results.costOfDelay)}
                </div>
                <p className="text-muted-foreground">
                  In lost efficiency, missed opportunities, and competitive
                  disadvantage
                </p>
              </CardContent>
            </Card>

            {/* Key Metrics Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(results.insights).map(([key, metric]) => (
                <Card
                  key={key}
                  className="card-enhanced group"
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-heading text-primary glow-green mb-2 group-hover:scale-110 transition-transform">
                      {metric.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {metric.label}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Total 3-Year Value */}
              <Card className="card-enhanced group">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-heading text-primary glow-green mb-2 group-hover:scale-110 transition-transform">
                    {formatCurrency(results.totalValue)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total 3-Year Value
                  </div>
                </CardContent>
              </Card>

              {/* Time to ROI */}
              <Card className="card-enhanced group">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-heading text-primary glow-green mb-2 group-hover:scale-110 transition-transform">
                    {results.timeToROI}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Time to Positive ROI
                  </div>
                </CardContent>
              </Card>

              {/* Implementation Cost */}
              <Card className="card-enhanced group border-secondary/30 hover:border-secondary/50">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-heading text-secondary glow-pink mb-2 group-hover:scale-110 transition-transform">
                    {formatCurrency(results.implementationCost)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Implementation Investment
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Yearly Breakdown */}
            <Card className="bg-gradient-cyber border-2 border-secondary shadow-cyber-lg">
              <CardContent className="p-6 md:p-10">
                <h3 className="text-2xl font-heading text-secondary glow-pink mb-6 text-center">
                  YOUR AI COMPOUND GROWTH PROJECTION
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-2">
                      YEAR 1
                    </div>
                    <div className="text-3xl font-heading text-foreground mb-2">
                      {formatCurrency(results.yearlyBreakdown.year1)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Value created
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-2">
                      YEAR 2
                    </div>
                    <div className="text-3xl font-heading text-foreground mb-2">
                      {formatCurrency(results.yearlyBreakdown.year2)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Value created
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-2">
                      YEAR 3
                    </div>
                    <div className="text-3xl font-heading text-foreground mb-2">
                      {formatCurrency(results.yearlyBreakdown.year3)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Value created
                    </div>
                  </div>
                </div>
                <p className="text-center text-muted-foreground mt-6 italic">
                  Like compound interest, AI returns accelerate over time
                </p>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-gradient-cyber border-2 border-primary shadow-cyber-lg">
              <CardContent className="p-6 md:p-10 lg:p-12 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-heading text-foreground">
                    READY TO CAPTURE THIS VALUE?
                  </h3>
                </div>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Let's discuss your personalized AI implementation roadmap and turn
                  these projections into reality.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="group relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6 md:px-10 py-4 md:py-6 shadow-cyber transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsla(155,100%,45%,0.4)] btn-shimmer"
                    asChild
                  >
                    <a href="https://calendly.com/eschwaa/30min">
                      Book Your Strategy Call
                      <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-primary text-primary hover:bg-primary/10 font-semibold px-6 md:px-10 py-4 md:py-6 transition-all duration-300 hover:scale-105"
                    onClick={() => setShowLeadModal(true)}
                  >
                    Get Detailed Business Case
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-6">
                  Every month of delay costs you approximately{" "}
                  {formatCurrency(results.costOfDelay / 12)} in lost value
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Empty state message if form not complete */}
        {!showResults && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Fill in all fields above to see your personalized ROI calculation
            </p>
          </div>
        )}
      </div>

      {/* Lead Capture Modal */}
      <Dialog open={showLeadModal} onOpenChange={setShowLeadModal}>
        <DialogContent className="glass-card border border-primary/30 shadow-glow-card">
          <DialogHeader>
            <DialogTitle className="text-2xl font-heading text-gradient-animate">
              Get Your AI Business Case
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              You're one step away from downloading your personalized AI ROI report. Enter your details below to receive your comprehensive business case PDF.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleLeadSubmit} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  type="text"
                  placeholder="First Name *"
                  required
                  value={leadForm.firstName}
                  onChange={(e) => setLeadForm({ ...leadForm, firstName: e.target.value })}
                  className="bg-background border-border text-foreground focus:border-primary transition-colors"
                />
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="Last Name *"
                  required
                  value={leadForm.lastName}
                  onChange={(e) => setLeadForm({ ...leadForm, lastName: e.target.value })}
                  className="bg-background border-border text-foreground focus:border-primary transition-colors"
                />
              </div>
            </div>

            <Input
              type="email"
              placeholder="Email Address *"
              required
              value={leadForm.email}
              onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
              className="bg-background border-border text-foreground focus:border-primary transition-colors"
            />

            <Input
              type="text"
              placeholder="Company Name *"
              required
              value={leadForm.company}
              onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
              className="bg-background border-border text-foreground focus:border-primary transition-colors"
            />

            <p className="text-xs text-muted-foreground">
              By downloading, you agree to receive occasional emails about AI strategy and implementation. Unsubscribe anytime.
            </p>

            <Button
              type="submit"
              size="lg"
              className="group relative overflow-hidden w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-cyber transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_hsla(155,100%,45%,0.4)] btn-shimmer"
            >
              Download My AI Business Case
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ROICalculator;
