import { useEffect, useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface Testimonial {
  name: string;
  linkedIn?: string;
  company?: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Jason Keen",
    company: "The Aspirational Company",
    quote: "Erik completely transformed my perspective on what's possible with AI. He has a remarkable gift for unpacking complex technical subjects and making them accessible to everyone. He didn't just teach us about AI tools; he opened our eyes to an entirely new world of possibility.",
  },
  {
    name: "Ann Binnie",
    linkedIn: "https://www.linkedin.com/in/annbinnie/",
    quote: "Erik's expertise and skill at communicating it are remarkable. I write as one who wasn't even on the scale of AI-curious to AI-powered (more like AI-fearful!) when I took his app in a day course and what he guided me to creating was astonishing. Cannot recommend him too highly.",
  },
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
  {
    name: "James Knight",
    company: "Founder, iMA Technologies",
    quote: "Erik's ability to translate complex AI concepts into practical business solutions is exceptional. He consistently exceeds expectations, delivering results that have transformed how we approach technology across our platform.",
  },
  {
    name: "Jess Keltie",
    quote: "The course was fantastic!!! a print out of a flowchart, or numbered steps for the process would be fantastic so participants could follow along on there as well as looking at the projector - this could be fairly top level e.g. open Google AI studio and import your PDR",
  },
  {
    name: "Jade Vincent",
    quote: "Felt a little sceptical that I would understand the concept and be able to get going. But it was exciting to see what we could all achieve in one day! Imagine what we may achieve next!",
  },
  {
    name: "Sarah Monaco",
    quote: "Let me know when Part 2 happens!",
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
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

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

        <div className="max-w-6xl mx-auto px-12">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 5000,
                stopOnInteraction: true,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="card-enhanced group h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <Quote className="w-8 h-8 text-primary/40 mb-4" />
                      <blockquote className="text-foreground/90 leading-relaxed flex-grow mb-4">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="mt-auto pt-4 border-t border-border/30">
                        {testimonial.linkedIn ? (
                          <a
                            href={testimonial.linkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 font-semibold transition-colors"
                          >
                            {testimonial.name}
                          </a>
                        ) : (
                          <span className="text-primary font-semibold">
                            {testimonial.name}
                          </span>
                        )}
                        <p className="text-sm text-muted-foreground">
                          {testimonial.company || "Ship an App in a Day Graduate"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-primary/30 hover:bg-primary/10 hover:border-primary" />
            <CarouselNext className="border-primary/30 hover:bg-primary/10 hover:border-primary" />
          </Carousel>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  current === index
                    ? "bg-primary w-6"
                    : "bg-primary/30 hover:bg-primary/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseTestimonials;
