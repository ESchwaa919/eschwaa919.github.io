import { Card, CardContent } from "@/components/ui/card";

const Privacy = () => {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-heading mb-6">
            <span className="text-primary glow-green">PRIVACY POLICY</span>
          </h1>

          <p className="text-muted-foreground mb-8">
            Last updated: November 24, 2025
          </p>

          <Card className="bg-card border-2 border-border shadow-cyber mb-8">
            <CardContent className="p-8 space-y-6">
              <section>
                <h2 className="text-2xl font-heading text-primary mb-4">Our Commitment</h2>
                <p className="text-muted-foreground leading-relaxed">
                  At aiexpert.ai, we take your privacy seriously. We don't track, we don't sell data, and we don't use invasive analytics. This page explains how we handle any information you choose to share with us.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading text-primary mb-4">Information We Collect</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We only collect information you explicitly provide to us through:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Contact forms</li>
                  <li>Email communications</li>
                  <li>Calendly booking integrations</li>
                  <li>Assessment tools (stored locally in your browser)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-heading text-primary mb-4">How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Information you provide is used solely to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Respond to your inquiries</li>
                  <li>Schedule consultations</li>
                  <li>Provide the services you've requested</li>
                  <li>Send relevant AI insights (only if you've opted in)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-heading text-primary mb-4">Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use minimal, essential cookies only for site functionality. No tracking cookies, no third-party analytics, no advertising cookies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading text-primary mb-4">Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your data is stored securely and is never sold, rented, or shared with third parties for marketing purposes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading text-primary mb-4">Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Request access to your personal data</li>
                  <li>Request correction or deletion of your data</li>
                  <li>Opt out of communications at any time</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-heading text-primary mb-4">Contact</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For privacy-related questions or requests, contact us at:{" "}
                  <a href="mailto:erik@theaiexpert.ai" className="text-primary hover:underline">
                    erik@theaiexpert.ai
                  </a>
                </p>
              </section>
            </CardContent>
          </Card>

          <p className="text-center text-muted-foreground italic">
            "We don't track. Just helpful AI — no gimmicks."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
