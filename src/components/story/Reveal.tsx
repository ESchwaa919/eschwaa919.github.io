import { ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * The reveal beat of the motion vocabulary: rise + fade on the --reveal-ease
 * curve. Single source of truth — staggered grids apply these classes to
 * their items directly (with a transitionDelay) off ONE container reveal.
 */
export const revealClasses = (visible: boolean) =>
  `transition-all duration-700 ease-reveal ${
    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
  }`;

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/** Scroll-reveal wrapper built on revealClasses. */
const Reveal = ({ children, delay = 0, className = "" }: RevealProps) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined }}
      className={`${revealClasses(isVisible)} ${className}`}
    >
      {children}
    </div>
  );
};

export default Reveal;
