import { useEffect, useRef, useState } from 'react';
import { REVEAL_DEFAULTS } from '@/constants/animations';

const reducedMotion =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const hasIO = typeof IntersectionObserver !== 'undefined';

export const useCounterReveal = (target: number, duration = 2000) => {
  const [count, setCount] = useState(reducedMotion || !hasIO ? target : 0);
  const [hasAnimated, setHasAnimated] = useState(reducedMotion || !hasIO);
  const ref = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (reducedMotion || !hasIO) return;

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.unobserve(element);

          let start = 0;
          const increment = target / (duration / 16);
          intervalRef.current = window.setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
              }
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5, rootMargin: REVEAL_DEFAULTS.rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [target, duration, hasAnimated]);

  return { count, ref };
};
