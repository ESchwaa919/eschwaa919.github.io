import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface Testimonial {
  name: string;
  linkedIn: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Leigh Allen",
    linkedIn: "https://www.linkedin.com/in/leighdallen/",
    quote: "This is one of those mind shifting courses that gets to the heart of how we can collaborate effectively with AI, highly recommend",
  },
  {
    name: "Thomas Power",
    linkedIn: "https://www.linkedin.com/in/thomaspower/",
    quote: "Erik's course is a real eye opener providing context and planning for this new AI world brilliant",
  },
  {
    name: "Andrew Smith",
    linkedIn: "https://www.linkedin.com/in/speak2andrew/",
    quote: "Such a productive and inspirational day. It's so refreshing to leave a workshop with something to show for all your efforts, instead of attempting to apply theory days/weeks later when you've lost momentum. Highly recommended, even for non-techies like me.",
  },
];

interface CourseTestimonialsProps {
  title?: string;
  subtitle?: string;
  compact?: boolean;
}

const CourseTestimonials = ({
  title = "What Participants Say",
  subtitle = "Real feedback from Ship an App in a Day graduates",
  compact = false
}: CourseTestimonialsProps) => {
  return (
    <section className={compact ? "py-12" : "py-20"}>
      <div className="container mx-auto px-4">
        {!compact && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading mb-4">
              <span className="text-gradient-animate glow-green">{title}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>
        )}

        <div className={`grid gap-6 max-w-5xl mx-auto ${
          compact ? "md:grid-cols-3" : "md:grid-cols-1 lg:grid-cols-3"
        }`}>
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="card-enhanced group h-full"
            >
              <CardContent className="p-6 flex flex-col h-full">
                <Quote className="w-8 h-8 text-primary/40 mb-4" />
                <blockquote className="text-foreground/90 leading-relaxed flex-grow mb-4">
                  "{testimonial.quote}"
                </blockquote>
                <div className="mt-auto pt-4 border-t border-border/30">
                  <a
                    href={testimonial.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 font-semibold transition-colors"
                  >
                    {testimonial.name}
                  </a>
                  <p className="text-sm text-muted-foreground">
                    Ship an App in a Day Graduate
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseTestimonials;
