import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
  TrendingUp,
  DollarSign,
  Calendar,
  Target,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

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

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading mb-4">
            <span className="text-primary glow-green">AI ROI CALCULATOR</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Calculate your potential AI return on investment and see the cost of
            waiting. Every month you delay, your competitors compound ahead.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="bg-gradient-cyber border-2 border-primary shadow-cyber">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-heading text-primary glow-green mb-2">
                88%
              </div>
              <div className="text-sm text-muted-foreground">
                see early returns on AI investments
              </div>
              <div className="text-xs text-muted-foreground/60 mt-1">
                (PwC 2025)
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-cyber border-2 border-secondary shadow-cyber">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-heading text-secondary glow-pink mb-2">
                40%
              </div>
              <div className="text-sm text-muted-foreground">
                productivity boost with proper AI use
              </div>
              <div className="text-xs text-muted-foreground/60 mt-1">
                (Stanford/MIT)
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-cyber border-2 border-primary shadow-cyber">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-heading text-primary glow-green mb-2">
                70%
              </div>
              <div className="text-sm text-muted-foreground">
                of CEOs expect AI to transform value creation
              </div>
              <div className="text-xs text-muted-foreground/60 mt-1">
                (PwC Global CEO Survey)
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calculator Form */}
        <Card className="bg-gradient-cyber border-2 border-primary shadow-cyber-lg mb-12">
          <CardContent className="p-10">
            <h2 className="text-2xl font-heading text-primary glow-green mb-6 text-center">
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

        {/* Results Section */}
        {showResults && results && (
          <div className="space-y-8">
            {/* ROI Summary */}
            <Card className="bg-gradient-cyber border-2 border-primary shadow-cyber-lg">
              <CardContent className="p-12 text-center">
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
                  className="bg-card border-2 border-border shadow-cyber"
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-heading text-primary glow-green mb-2">
                      {metric.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {metric.label}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Total 3-Year Value */}
              <Card className="bg-card border-2 border-border shadow-cyber">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-heading text-primary glow-green mb-2">
                    {formatCurrency(results.totalValue)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total 3-Year Value
                  </div>
                </CardContent>
              </Card>

              {/* Time to ROI */}
              <Card className="bg-card border-2 border-border shadow-cyber">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-heading text-primary glow-green mb-2">
                    {results.timeToROI}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Time to Positive ROI
                  </div>
                </CardContent>
              </Card>

              {/* Implementation Cost */}
              <Card className="bg-card border-2 border-border shadow-cyber">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-heading text-secondary glow-pink mb-2">
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
              <CardContent className="p-10">
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
              <CardContent className="p-12 text-center">
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
                    className="bg-primary text-primary-foreground hover:bg-primary/90 glow-green font-semibold px-10 py-6 shadow-cyber"
                    asChild
                  >
                    <a href="https://calendly.com/eschwaa/aiconsult">
                      Book Your Strategy Call
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-primary text-primary hover:bg-primary/10 font-semibold px-10 py-6"
                    onClick={() => {
                      toast.success(
                        "Results saved! Contact us to receive your detailed business case."
                      );
                    }}
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
    </div>
  );
};

export default ROICalculator;
