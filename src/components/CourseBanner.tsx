import { Link } from "react-router-dom";
import { ArrowRight, X, Rocket } from "lucide-react";
import { useState, useEffect } from "react";

const CourseBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const dismissed = localStorage.getItem("courseBannerDismissed");
    if (dismissed) {
      const dismissedDate = new Date(dismissed);
      const now = new Date();
      // Show again after 7 days
      if (now.getTime() - dismissedDate.getTime() < 7 * 24 * 60 * 60 * 1000) {
        setIsVisible(false);
      }
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("courseBannerDismissed", new Date().toISOString());
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 left-0 right-0 z-40 bg-gradient-to-r from-background via-primary/10 to-background border-b border-primary/30">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-3 text-sm md:text-base">
          <Rocket className="w-4 h-4 text-primary animate-pulse hidden sm:block" />
          <span className="text-foreground font-medium">
            <span className="text-primary font-heading">Ship an App in a Day</span>
            <span className="hidden sm:inline"> • Tue, Jul 7 • London</span>
            <span className="sm:hidden"> • Jul 7</span>
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
