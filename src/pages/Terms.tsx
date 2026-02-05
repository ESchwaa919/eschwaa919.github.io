import { Card, CardContent } from "@/components/ui/card";
import SEOHead from "@/components/SEOHead";

const Terms = () => {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <SEOHead
        title="Terms of Service"
        description="Terms of service for theaiexpert.ai. By accessing or using our site, you agree to be bound by these terms."
        canonicalUrl="/terms"
      />
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-heading mb-6">
            <span className="text-primary glow-green">TERMS OF SERVICE</span>
          </h1>

          <p className="text-muted-foreground mb-8">
            Last updated: November 24, 2025
          </p>

          <Card className="bg-card border-2 border-border shadow-cyber mb-8">
            <CardContent className="p-8 space-y-6">
              <section>
                <h2 className="text-2xl font-heading text-primary mb-4">Agreement to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing or using aiexpert.ai, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading text-primary mb-4">Services</h2>
                <p className="text-muted-foreground leading-relaxed">
                  aiexpert.ai provides AI consulting services, including strategy development, implementation support, and fractional CAIO services. Specific terms for professional engagements are outlined in separate service agreements.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading text-primary mb-4">Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The content on this website, including but not limited to text, graphics, logos, and tools, is the property of aiexpert.ai and is protected by intellectual property laws.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  You may not reproduce, distribute, or create derivative works without explicit written permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading text-primary mb-4">Use of Assessment Tools</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The AI Assessment and ROI Calculator tools provided on this site are for informational purposes only. Results are estimates and should not be considered professional advice without consultation.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading text-primary mb-4">No Warranties</h2>
                <p className="text-muted-foreground leading-relaxed">
                  This website and its content are provided "as is" without warranties of any kind, either express or implied. We do not warrant that the site will be uninterrupted or error-free.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading text-primary mb-4">Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  In no event shall aiexpert.ai or its owner be liable for any damages arising from the use or inability to use this website or its services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading text-primary mb-4">Professional Engagements</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Formal consulting engagements are governed by separate written agreements. These Terms of Service apply to website use only and do not constitute a consulting agreement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading text-primary mb-4">Links to Third-Party Sites</h2>
                <p className="text-muted-foreground leading-relaxed">
                  This website may contain links to third-party sites (e.g., Calendly, LinkedIn). We are not responsible for the content or privacy practices of these external sites.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading text-primary mb-4">Modifications</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these terms at any time. Continued use of the site after changes constitutes acceptance of the modified terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading text-primary mb-4">Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading text-primary mb-4">Contact</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For questions about these Terms of Service, contact us at:{" "}
                  <a href="mailto:erik@theaiexpert.ai" className="text-primary hover:underline">
                    erik@theaiexpert.ai
                  </a>
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Terms;
