import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Download } from "lucide-react";
import { toast } from "sonner";

const LeadMagnet = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      toast.success("Scorecard sent! Check your email.");
    }
  };

  return (
    <section className="py-24 bg-cyber-gray/50">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto bg-card border-2 border-secondary shadow-cyber">
          <CardContent className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="inline-block">
                  <span className="text-sm font-heading text-secondary bg-secondary/10 px-4 py-2 rounded-full border border-secondary/30">
                    ⚡ INTERACTIVE TOOL
                  </span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-heading">
                  <span className="text-foreground">AI Readiness</span>
                  <br />
                  <span className="text-secondary glow-pink">Scorecard</span>
                </h2>
                
                <p className="text-muted-foreground leading-relaxed">
                  Discover your organization's AI maturity level with our proprietary assessment. Get a personalized roadmap for AI transformation.
                </p>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-sm">15-minute interactive assessment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-sm">Benchmarked against industry leaders</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-sm">Actionable recommendations included</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-6">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Work Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-background border-border focus:border-primary"
                      />
                    </div>
                    
                    <Button 
                      type="submit"
                      size="lg"
                      className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 glow-pink font-semibold"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Get Your Free Scorecard
                    </Button>
                    
                    <p className="text-xs text-muted-foreground text-center">
                      No spam. Unsubscribe anytime.
                    </p>
                  </form>
                ) : (
                  <div className="text-center space-y-4 py-8">
                    <CheckCircle2 className="w-16 h-16 text-primary mx-auto glow-green" />
                    <h3 className="text-xl font-heading text-primary">
                      Scorecard Sent!
                    </h3>
                    <p className="text-muted-foreground">
                      Check your email for your AI Readiness Scorecard and personalized recommendations.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default LeadMagnet;
