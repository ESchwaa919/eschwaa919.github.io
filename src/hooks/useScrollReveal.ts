import { useEffect, useRef, useState } from 'react';
import { REVEAL_DEFAULTS } from '@/constants/animations';

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

const reducedMotion =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const hasIO = typeof IntersectionObserver !== 'undefined';

export const useScrollReveal = (options: UseScrollRevealOptions = {}) => {
  const {
    threshold = REVEAL_DEFAULTS.threshold,
    rootMargin = REVEAL_DEFAULTS.rootMargin,
    triggerOnce = REVEAL_DEFAULTS.triggerOnce,
  } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(reducedMotion || !hasIO);

  useEffect(() => {
    if (reducedMotion || !hasIO) return;

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
};

export const useStaggeredReveal = (itemCount: number, options: UseScrollRevealOptions = {}) => {
  const {
    threshold = REVEAL_DEFAULTS.threshold,
    rootMargin = REVEAL_DEFAULTS.rootMargin,
    triggerOnce = REVEAL_DEFAULTS.triggerOnce,
  } = options;
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    () => new Array(itemCount).fill(reducedMotion || !hasIO)
  );
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    if (reducedMotion || !hasIO) return;

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timersRef.current.forEach(clearTimeout);
          timersRef.current = [];

          for (let i = 0; i < itemCount; i++) {
            const timerId = window.setTimeout(() => {
              setVisibleItems(prev => {
                const newState = [...prev];
                newState[i] = true;
                return newState;
              });
            }, i * REVEAL_DEFAULTS.staggerDelay);
            timersRef.current.push(timerId);
          }
          if (triggerOnce) {
            observer.unobserve(container);
          }
        } else if (!triggerOnce) {
          timersRef.current.forEach(clearTimeout);
          timersRef.current = [];
          setVisibleItems(new Array(itemCount).fill(false));
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      timersRef.current.forEach(clearTimeout);
    };
  }, [itemCount, threshold, rootMargin, triggerOnce]);

  return { containerRef, visibleItems };
};

export default useScrollReveal;
