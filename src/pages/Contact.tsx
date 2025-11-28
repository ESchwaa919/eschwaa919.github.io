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
          <Card className="bg-card border-2 border-primary shadow-cyber">
            <CardContent className="p-12 text-center space-y-6">
              <CheckCircle2 className="w-20 h-20 text-primary mx-auto glow-green" />
              <h2 className="text-3xl font-heading text-primary">
                MESSAGE RECEIVED!
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Thank you for reaching out. Erik will review your message and
                get back to you within 24 hours.
              </p>
              <p className="text-sm text-muted-foreground">
                In the meantime, feel free to explore our{" "}
                <Link to="/resources" className="text-primary hover:underline">
                  free AI resources
                </Link>{" "}
                or{" "}
                <Link to="/about" className="text-primary hover:underline">
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
                className="border-2 border-primary text-primary hover:bg-primary/10"
              >
                Send Another Message
              </Button>
            </CardContent>
          </Card>
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
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-heading mb-4">
                <span className="text-primary glow-green">LET'S MAP</span>
                <br />
                <span className="text-foreground">YOUR AI PATH</span>
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
                className="mt-4 bg-secondary text-secondary-foreground hover:bg-secondary/90 glow-pink font-semibold"
                asChild
              >
                <a
                  href="https://calendly.com/eschwaa/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book a 30-Minute Call
                </a>
              </Button>
            </div>

            <div className="space-y-6">
              <Card className="bg-card/50 border-2 border-border hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
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

              <Card className="bg-card/50 border-2 border-border hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
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

              <Card className="bg-card/50 border-2 border-border hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
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

              <Card className="bg-card/50 border-2 border-border hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Linkedin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading text-foreground mb-1">
                        LinkedIn
                      </h3>
                      <a
                        href="https://www.linkedin.com/in/eschwaa/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        Connect with Erik
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-3 pt-6 border-t border-border">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  Response within 24 hours
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  No obligation consultation
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  NDA available upon request
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  Flexible engagement models
                </span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <Card className="bg-card border-2 border-border shadow-cyber">
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
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-green font-semibold text-lg py-6 shadow-cyber"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>Sending...</>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
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

            {/* Calendly Embed Alternative */}
            <div className="mt-8 text-center">
              <p className="text-muted-foreground mb-4">
                Or skip the form and book directly:
              </p>
              <div className="border-2 border-border rounded-lg p-8 bg-card/30">
                <h3 className="text-xl font-heading text-primary mb-2">
                  30-MINUTE STRATEGY CALL
                </h3>
                <p className="text-muted-foreground mb-4">
                  No obligation • No sales pitch • Just practical insights
                </p>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary/10 font-semibold"
                  asChild
                >
                  <a
                    href="https://calendly.com/eschwaa/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    View Available Times
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
