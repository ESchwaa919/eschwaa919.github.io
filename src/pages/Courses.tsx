import { useEffect } from "react";
import { Calendar, MapPin, Clock, Users, Rocket, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SEOHead from "@/components/SEOHead";
import { StructuredData, createEventSchema, createCourseSchema } from "@/components/StructuredData";
import CourseTestimonials from "@/components/CourseTestimonials";

const courseEventSchema = createEventSchema({
  name: "Ship an App in a Day – AI Workshop",
  description: "Build a real, working application using AI in just one day. Hands-on workshop in London teaching you to collaborate effectively with AI tools. No coding experience required.",
  startDate: "2026-04-17T09:00:00+01:00",
  endDate: "2026-04-17T17:00:00+01:00",
  url: "https://theaiexpert.ai/courses",
  locationName: "The Mandeville Hotel",
  locationAddress: "Mandeville Place",
  offers: {
    price: "0",
    currency: "GBP",
    url: "https://lu.ma/event/evt-zbJYSpnyFKU8pCv",
  },
});

const courseSchema = createCourseSchema({
  name: "Ship an App in a Day",
  description: "A one-day hands-on workshop teaching participants to build real applications using AI. Covers AI-assisted development, prompt engineering for code generation, and deploying functional apps. Suitable for non-techies and developers alike.",
  url: "https://theaiexpert.ai/courses",
});

const Courses = () => {
  // Load Luma checkout script
  useEffect(() => {
    const existingScript = document.getElementById("luma-checkout");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "luma-checkout";
      script.src = "https://embed.lu.ma/checkout-button.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-20">
      <SEOHead
        title="Ship an App in a Day | AI Workshop London | The AI Expert"
        description="Build a real application in one day using AI. Hands-on workshop in London teaching you to collaborate effectively with AI tools. Perfect for non-techies and developers alike."
        keywords="AI workshop, ship an app, AI course London, learn AI, build with AI, Claude, ChatGPT, AI training"
        canonicalUrl="/courses"
      />
      <StructuredData schema={courseEventSchema} />
      <StructuredData schema={courseSchema} />

      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30">
            <Rocket className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-heading text-primary tracking-wider">
              HANDS-ON WORKSHOP
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-heading leading-tight">
            <span className="text-gradient-animate glow-green-intense">SHIP AN APP</span>
            <br />
            <span className="text-foreground">IN A DAY</span>
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Build a real, working application using AI in just one day.
            No coding experience required – just bring your idea.
          </p>

          {/* Course Details Cards */}
          <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto mt-8">
            <Card className="glass border-primary/20">
              <CardContent className="p-4 flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="font-semibold">Thu, Apr 17, 2026</p>
                </div>
              </CardContent>
            </Card>
            <Card className="glass border-primary/20">
              <CardContent className="p-4 flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Time</p>
                  <p className="font-semibold">9:00 AM - 5:00 PM</p>
                </div>
              </CardContent>
            </Card>
            <Card className="glass border-primary/20">
              <CardContent className="p-4 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="font-semibold">Central London</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Venue Details */}
          <p className="text-muted-foreground">
            <MapPin className="w-4 h-4 inline mr-1" />
            The Mandeville Hotel, Mandeville Pl, London
          </p>
        </div>
      </section>

      {/* Registration CTA */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-xl mx-auto">
          <Card className="card-enhanced border-primary/30">
            <CardContent className="p-8 text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-heading mb-2">Reserve Your Spot</h2>
              <p className="text-muted-foreground mb-6">
                Limited seats available. Register now to secure your place.
              </p>

              {/* Luma Checkout Button */}
              <a
                href="https://lu.ma/event/evt-zbJYSpnyFKU8pCv"
                className="luma-checkout--button inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 py-4 rounded-lg shadow-cyber transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsla(155,100%,45%,0.4)]"
                data-luma-action="checkout"
                data-luma-event-id="evt-zbJYSpnyFKU8pCv"
              >
                Register for Event
                <ArrowRight className="w-5 h-5" />
              </a>

              <p className="text-sm text-muted-foreground mt-4">
                <a
                  href="https://luma.com/dbfz9lvs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  View full event details on Luma →
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <CourseTestimonials />

      {/* What You'll Achieve */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-heading mb-6">
            <span className="text-foreground">What You'll </span>
            <span className="text-gradient-animate glow-green">Achieve</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Leave with a working application you built yourself, plus the skills and confidence
            to continue building with AI. Whether you're a complete beginner or an experienced
            developer, you'll discover how to collaborate effectively with AI to turn ideas into reality.
          </p>

          <Button
            size="lg"
            className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-cyber"
            asChild
          >
            <a
              href="https://lu.ma/event/evt-zbJYSpnyFKU8pCv"
              className="luma-checkout--button"
              data-luma-action="checkout"
              data-luma-event-id="evt-zbJYSpnyFKU8pCv"
            >
              Register Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Courses;
