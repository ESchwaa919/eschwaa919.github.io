import { Link } from "react-router-dom";
import { ArrowRight, X, Rocket } from "lucide-react";
import { useState, useEffect } from "react";

// Fade/slide the banner away once the user scrolls a little past the top.
const SCROLL_HIDE_THRESHOLD = 120;

const CourseBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [scrolledPast, setScrolledPast] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("courseBannerDismissed-aug14");
    if (dismissed) {
      const dismissedDate = new Date(dismissed);
      const now = new Date();
      // Show again after 7 days
      if (now.getTime() - dismissedDate.getTime() < 7 * 24 * 60 * 60 * 1000) {
        setIsVisible(false);
      }
    }
  }, []);

  // Present at the top of the page; fades/slides out of the way on scroll and
  // back in near the top. Class-based, so the global prefers-reduced-motion
  // rule snaps it to the hidden state instead of animating.
  useEffect(() => {
    const onScroll = () =>
      setScrolledPast(window.scrollY > SCROLL_HIDE_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Drive the shared --chrome-h variable (default 124px in index.css) so the
  // content offset (main padding) and the /process/sdlc section nav collapse in
  // step with the banner instead of reserving a dead band once it fades or is
  // dismissed. 80px = nav only; 124px = nav + banner.
  useEffect(() => {
    const hidden = !isVisible || scrolledPast;
    document.documentElement.style.setProperty(
      "--chrome-h",
      hidden ? "80px" : "124px"
    );
  }, [isVisible, scrolledPast]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("courseBannerDismissed-aug14", new Date().toISOString());
  };

  if (!isVisible) return null;

  return (
    <div
      aria-hidden={scrolledPast}
      className={`fixed top-20 left-0 right-0 z-40 bg-gradient-to-r from-background via-primary/10 to-background border-b border-primary/30 transition-[opacity,transform] duration-300 ease-out ${
        scrolledPast
          ? "opacity-0 -translate-y-full pointer-events-none"
          : "opacity-100 translate-y-0"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-3 text-sm md:text-base">
          <Rocket className="w-4 h-4 text-primary animate-pulse hidden sm:block" />
          <span className="text-foreground font-medium">
            <span className="text-primary font-heading">Ship an App in a Day</span>
            <span className="hidden sm:inline"> • Fri, Aug 14 • London</span>
            <span className="sm:hidden"> • Aug 14</span>
          </span>
          <Link
            to="/courses"
            className="inline-flex items-center gap-1 text-primary hover:text-primary/80 font-semibold transition-colors group"
          >
            Register Now
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
      <button
        onClick={handleDismiss}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Dismiss banner"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default CourseBanner;
