import { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export interface SlideMeta {
  id: string;
  label: string;
}

interface SlideProps {
  id: string;
  children: ReactNode;
  /** The following slide — renders the "next scene" pull at the bottom. */
  next?: SlideMeta;
  className?: string;
}

export const scrollToSlide = (id: string) => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
};

/**
 * One act of the homepage deck: fills the viewport under the fixed chrome on
 * desktop (with snap landing), flows naturally on mobile. The next-scene
 * affordance is the graphical pull between slides.
 */
const Slide = ({ id, children, next, className = "" }: SlideProps) => (
  <section id={id} className={`slide border-t border-border first:border-t-0 ${className}`}>
    <div className="flex-1 flex flex-col justify-center min-h-0">{children}</div>

    {next && (
      <button
        type="button"
        onClick={() => scrollToSlide(next.id)}
        className="hidden lg:flex group relative z-10 mx-auto mb-5 mt-6 flex-col items-center gap-1.5 kicker text-muted-foreground hover:text-primary transition-colors"
      >
        <span>Next — {next.label}</span>
        <ChevronDown className="w-4 h-4 animate-cue" aria-hidden="true" />
      </button>
    )}
  </section>
);

export default Slide;
