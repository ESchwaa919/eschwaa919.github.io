import { useState } from "react";
import { useForm } from "react-hook-form";
import SEOHead from "@/components/SEOHead";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle2,
  Calendar,
  Linkedin,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must be less than 100 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  company: z
    .string()
    .trim()
    .min(2, { message: "Company name must be at least 2 characters" })
    .max(100, { message: "Company name must be less than 100 characters" }),
  message: z
    .string()
    .trim()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(2000, { message: "Message must be less than 2000 characters" }),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Scroll reveal hooks
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal();
  const { ref: formRef, isVisible: formVisible } = useScrollReveal();
  const { ref: calendlyRef, isVisible: calendlyVisible } = useScrollReveal();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      company: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    // Validate data one more time before processing
    const validated = contactSchema.safeParse(data);

    if (!validated.success) {
      toast.error("Please check your input and try again");
      return;
    }

    setIsSubmitting(true);

    try {
      // Initialize EmailJS
      emailjs.init("oI6t4dwMhBXNaBKXo");

      // Send email using EmailJS
      await emailjs.send(
        "theaiexpert_assessment",
        "template_dmkjg71",
        {
          from_name: validated.data.fullName,
          from_email: validated.data.email,
          company: validated.data.company || "Not specified",
          downloaded_resource: validated.data.message,
          download_date: new Date().toLocaleString(),
          lead_type: "Contact Form Submission",
          lead_source: "Website Contact Page",
        }
      );

      console.log("✅ Contact form email sent successfully!");

      setSubmitted(true);
      toast.success("Thank you! Erik will be in touch within 24 hours.");
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error(
        "There was an error sending your message. Please try emailing directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Cyber corners */}
          <div className="relative">
            <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-primary/60" />
            <div className="absolute -top-3 -right-3 w-10 h-10 border-t-2 border-r-2 border-primary/60" />
            <div className="absolute -bottom-3 -left-3 w-10 h-10 border-b-2 border-l-2 border-primary/60" />
            <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-primary/60" />
            <Card className="glass-card border border-primary/30 shadow-glow-card">
              <CardContent className="p-12 text-center space-y-6">
                <div className="relative inline-block">
                  <CheckCircle2 className="w-20 h-20 text-primary mx-auto glow-green animate-glow-pulse" />
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                </div>
                <h2 className="text-3xl font-heading text-gradient-animate">
                  MESSAGE RECEIVED!
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Thank you for reaching out. Erik will review your message and
                  get back to you within 24 hours.
                </p>
                <p className="text-sm text-muted-foreground">
                  In the meantime, feel free to explore our{" "}
                  <Link to="/resources" className="text-primary hover:underline hover:text-primary/80 transition-colors">
                    free AI resources
                  </Link>{" "}
                  or{" "}
                  <Link to="/about" className="text-primary hover:underline hover:text-primary/80 transition-colors">
                    learn more about Erik
                  </Link>
                  .
                </p>
                <Button
                  onClick={() => {
                    setSubmitted(false);
                    form.reset();
                  }}
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_hsla(155,100%,45%,0.2)]"
                >
                  Send Another Message
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <SEOHead
        title="Contact Erik Schwartz | AI Consulting Enquiries | The AI Expert"
        description="Get in touch with Erik Schwartz for AI consulting, fractional CAIO services, or AI strategy discussions. Book a free 30-minute consultation or send a message."
        keywords="contact AI consultant, AI consulting enquiry, book AI consultation, fractional CAIO contact, AI strategy discussion"
        canonicalUrl="/contact"
      />
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-5 gap-12 max-w-7xl mx-auto">
          {/* Contact Info Sidebar */}
          <div
            ref={heroRef}
            className={`lg:col-span-2 space-y-8 transition-all duration-300 ${
              heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div>
              {/* Slate */}
              <span className="kicker text-primary inline-block mb-6">
                Contact — Start the conversation
              </span>

              <h1 className="title-scene mb-4">
                <span className="text-primary">Let's map</span>
                <span className="block text-foreground">your AI path.</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Whether you're just starting or ready to scale, let's discuss
                where you are in your AI journey and create a practical roadmap
                forward.
              </p>
              <p className="text-muted-foreground">
                Prefer to schedule a call directly?
              </p>
              <Button
                size="lg"
                variant="cine"
                className="group mt-4 text-sm"
                asChild
              >
                <a
                  href="https://calendly.com/eschwaa/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Calendar className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                  Book a 30-Minute Call
                </a>
              </Button>
            </div>

            <div className="space-y-4">
              <Card className="card-enhanced group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/30 group-hover:bg-primary/20 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_hsla(155,100%,45%,0.2)] transition-all">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading text-foreground mb-1">
                        Email
                      </h3>
                      <a
                        href="mailto:erik@theaiexpert.ai"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        erik@theaiexpert.ai
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-enhanced group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/30 group-hover:bg-primary/20 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_hsla(155,100%,45%,0.2)] transition-all">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading text-foreground mb-1">
                        Phone
                      </h3>
                      <a
                        href="tel:+447946235391"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        +44-7946-235391
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-enhanced group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/30 group-hover:bg-primary/20 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_hsla(155,100%,45%,0.2)] transition-all">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading text-foreground mb-1">
                        Location
                      </h3>
                      <p className="text-muted-foreground">
                        Kent, UK
                        <br />
                        <span className="text-xs">
                          Serving London & Global Clients
                        </span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <a
                href="https://www.linkedin.com/in/eschwaa/"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="card-enhanced group cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#0077B5]/10 flex items-center justify-center flex-shrink-0 border border-[#0077B5]/30 group-hover:bg-[#0077B5]/20 group-hover:border-[#0077B5]/50 group-hover:shadow-[0_0_20px_hsla(201,89%,36%,0.2)] transition-all">
                        <Linkedin className="w-5 h-5 text-[#0077B5]" />
                      </div>
                      <div>
                        <h3 className="font-heading text-foreground mb-1">
                          LinkedIn
                        </h3>
                        <span className="text-muted-foreground group-hover:text-[#0077B5] transition-colors">
                          Connect with Erik
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </a>
            </div>

            <div className="space-y-3 pt-6 border-t border-border/50">
              {[
                "Response within 24 hours",
                "No obligation consultation",
                "NDA available upon request",
                "Flexible engagement models",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div
            ref={formRef}
            className={`lg:col-span-3 transition-all duration-300 delay-200 ${
              formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {/* Cyber corners */}
            <div className="relative">
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-primary/60" />
              <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-primary/60" />
              <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-primary/60" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-primary/60" />
              <Card className="glass-card border border-primary/20 shadow-glow-card">
                <CardContent className="p-8">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">
                            Your Name *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John Smith"
                              {...field}
                              className="bg-background border-border focus:border-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">
                            Email Address *
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="john@company.com"
                              {...field}
                              className="bg-background border-border focus:border-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">
                            Company *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your Company Name"
                              {...field}
                              className="bg-background border-border focus:border-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">
                            Tell Us About Your Challenge *
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Where are you in your AI journey? What challenges are you facing? What would success look like?"
                              className="min-h-[180px] bg-background border-border focus:border-primary resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      size="lg"
                      className="group relative overflow-hidden w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-lg py-6 shadow-cyber transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_hsla(155,100%,45%,0.4)] btn-shimmer"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2 transition-transform group-hover:translate-x-1" />
                          Send Message
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      By submitting this form, you agree to our{" "}
                      <Link to="/privacy" className="text-primary hover:underline">
                        privacy policy
                      </Link>
                      . We'll never share your information.
                    </p>
                  </form>
                </Form>
              </CardContent>
            </Card>
            </div>

            {/* Calendly Embed Alternative */}
            <div
              ref={calendlyRef}
              className={`mt-8 text-center transition-all duration-300 delay-300 ${
                calendlyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <p className="text-muted-foreground mb-4">
                Or skip the form and book directly:
              </p>
              <div className="relative">
                <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-secondary/60" />
                <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-secondary/60" />
                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-secondary/60" />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-secondary/60" />
                <div className="glass-card border border-secondary/30 rounded-lg p-8">
                  <h3 className="text-xl font-heading text-gradient-animate mb-2">
                    30-MINUTE STRATEGY CALL
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    No obligation • No sales pitch • Just practical insights
                  </p>
                  <Button
                    size="lg"
                    variant="outline"
                    className="group border-2 border-secondary text-secondary hover:bg-secondary/10 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_hsla(320,85%,55%,0.3)]"
                    asChild
                  >
                    <a
                      href="https://calendly.com/eschwaa/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Calendar className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                      View Available Times
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
