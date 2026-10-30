import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock, Rocket, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SEOHead from "@/components/SEOHead";
import { StructuredData, createCourseSchema } from "@/components/StructuredData";
import CourseTestimonials from "@/components/CourseTestimonials";

const courseSchema = createCourseSchema({
  name: "Ship an App in a Day",
  description: "A one-day hands-on workshop teaching participants to build real applications using AI. Covers AI-assisted development, prompt engineering for code generation, and deploying functional apps. Suitable for non-techies and developers alike.",
  url: "https://theaiexpert.ai/courses",
});

const Courses = () => {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <SEOHead
        title="Ship an App in a Day | AI Workshop London | The AI Expert"
        description="Build a real application in one day using AI. Hands-on workshop in London teaching you to collaborate effectively with AI tools. Perfect for non-techies and developers alike."
        keywords="AI workshop, ship an app, AI course London, learn AI, build with AI, Claude, ChatGPT, AI training"
        canonicalUrl="/courses"
      />
      <StructuredData schema={courseSchema} />

      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Slate */}
          <span className="kicker text-primary inline-block">
            Courses — Hands-on workshop
          </span>

          <h1 className="title-display">
            <span className="text-primary">Ship an app</span>
            <span className="block text-foreground">in a day.</span>
          </h1>

          <p className="lede max-w-2xl mx-auto">
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
                  <p className="font-semibold">On request</p>
                  <p className="text-xs text-muted-foreground">Ask about the next date</p>
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

      {/* Next date — the Aug 14 event is over; route date enquiries to Contact */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30">
            <Calendar className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-heading text-primary tracking-wider">
              NEXT DATE
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-heading leading-tight">
            <span className="text-foreground">Ask about the </span>
            <span className="text-gradient-animate glow-green">Next Workshop</span>
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            Limited seats at each session. Get in touch to ask when the next
            workshop runs.
          </p>

          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-cyber"
            asChild
          >
            <Link to="/contact">
              Ask about the next date
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
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
            <Link to="/contact">
              Ask about the next date
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Courses;
