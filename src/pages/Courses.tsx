import { Calendar, MapPin, Clock, Rocket, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SEOHead from "@/components/SEOHead";
import { StructuredData, createEventSchema, createCourseSchema } from "@/components/StructuredData";
import CourseTestimonials from "@/components/CourseTestimonials";

const courseEventSchema = createEventSchema({
  name: "Ship an App in a Day – AI Workshop",
  description: "Build a real, working application using AI in just one day. Hands-on workshop in London teaching you to collaborate effectively with AI tools. No coding experience required.",
  startDate: "2026-07-07T09:00:00+01:00",
  endDate: "2026-07-07T17:00:00+01:00",
  url: "https://theaiexpert.ai/courses",
  locationName: "The Mandeville Hotel",
  locationAddress: "Mandeville Place",
  offers: {
    price: "0",
    currency: "GBP",
    url: "https://luma.com/wivak21g",
  },
});

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
      <StructuredData schema={courseEventSchema} />
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
                  <p className="font-semibold">Multiple dates</p>
                  <p className="text-xs text-muted-foreground">See calendar below</p>
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

      {/* Upcoming Dates / Calendar */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30">
            <Calendar className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-heading text-primary tracking-wider">
              UPCOMING DATES
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-heading leading-tight">
            <span className="text-foreground">Register for an </span>
            <span className="text-gradient-animate glow-green">Upcoming Workshop</span>
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            Limited seats available at each session. Pick a date that works for you and
            secure your place below.
          </p>

          {/* Primary CTA — next workshop */}
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-cyber"
            asChild
          >
            <a
              href="https://luma.com/wivak21g"
              target="_blank"
              rel="noopener noreferrer"
            >
              Register for the Next Workshop
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </Button>

          {/* Luma Calendar Embed */}
          <div className="glass border-primary/20 rounded-lg overflow-hidden p-2 max-w-3xl mx-auto">
            <iframe
              src="https://luma.com/embed/calendar/cal-T2xNxOfEHZzazET/events"
              width="100%"
              height="600"
              frameBorder="0"
              style={{ border: "1px solid #bfcbda88", borderRadius: "8px", minHeight: "600px" }}
              allowFullScreen
              aria-hidden="false"
              tabIndex={0}
              title="The AI Expert — Upcoming Events"
            />
          </div>
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
              href="https://luma.com/wivak21g"
              target="_blank"
              rel="noopener noreferrer"
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
