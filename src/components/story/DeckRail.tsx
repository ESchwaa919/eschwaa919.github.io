import { useEffect, useState } from "react";
import { SlideMeta, scrollToSlide } from "./Slide";

/**
 * The emerald thread: a fixed progress rail down the right edge — one dot per
 * act, the line filling as the story advances. Desktop only.
 */
const DeckRail = ({ slides }: { slides: SlideMeta[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = slides.findIndex((s) => s.id === entry.target.id);
            if (index !== -1) setActiveIndex(index);
          }
        });
      },
      // a slide is "active" when it crosses the vertical middle of the viewport
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    slides.forEach((slide) => {
      const el = document.getElementById(slide.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [slides]);

  const progress = slides.length > 1 ? activeIndex / (slides.length - 1) : 0;

  return (
    <nav
      aria-label="Story progress"
      className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3"
    >
      {/* the thread */}
      <div className="absolute inset-y-1 left-1/2 -translate-x-1/2 w-px bg-border" aria-hidden="true">
        <div
          className="w-px bg-primary transition-[height] duration-700 ease-reveal"
          style={{ height: `${progress * 100}%` }}
        />
      </div>

      {slides.map((slide, index) => (
        <button
          key={slide.id}
          type="button"
          title={slide.label}
          aria-label={`Go to ${slide.label}`}
          aria-current={index === activeIndex ? "true" : undefined}
          onClick={() => scrollToSlide(slide.id)}
          className={`relative z-10 w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
            index === activeIndex
              ? "bg-primary border-primary scale-110"
              : index < activeIndex
                ? "bg-primary/40 border-primary/40 hover:border-primary"
                : "bg-background border-border hover:border-primary/60"
          }`}
        />
      ))}
    </nav>
  );
};

export default DeckRail;
