import { useEffect } from "react";
import ColdOpen from "@/components/story/ColdOpen";
import StakesAct from "@/components/story/StakesAct";
import PurgatoryAct from "@/components/story/PurgatoryAct";
import PathAct from "@/components/story/PathAct";
import GuidePracticeSlide from "@/components/story/GuidePracticeSlide";
import GuideErikSlide from "@/components/story/GuideErikSlide";
import GuideWhySlide from "@/components/story/GuideWhySlide";
import ProofStoriesSlide from "@/components/story/ProofStoriesSlide";
import ProofInsightsSlide from "@/components/story/ProofInsightsSlide";
import FinaleAct from "@/components/story/FinaleAct";
import Slide, { SlideMeta, scrollToSlide } from "@/components/story/Slide";
import DeckRail from "@/components/story/DeckRail";
import CourseTestimonials from "@/components/CourseTestimonials";
import SEOHead from "@/components/SEOHead";
import { StructuredData, organizationSchema } from "@/components/StructuredData";

/** The deck, in story order. Ids double as scroll anchors. */
const SLIDES: SlideMeta[] = [
  { id: "scene-00", label: "The shift" },
  { id: "act-1", label: "Act I — The stakes" },
  { id: "act-2", label: "Act II — Pilot purgatory" },
  { id: "act-3", label: "Act III — The path" },
  { id: "act-4a", label: "Act IV — We run on it" },
  { id: "act-4b", label: "Act IV — Meet Erik" },
  { id: "act-4c", label: "Act IV — Why The AI Expert" },
  { id: "act-5a", label: "Act V — Real results" },
  { id: "act-5b", label: "Act V — Insights" },
  { id: "act-6", label: "Workshop stories" },
  { id: "finale", label: "Finale — Your move" },
];

const next = (index: number): SlideMeta | undefined => SLIDES[index + 1];

const Index = () => {
  // Desktop: snap landing + slide-wise keyboard navigation. Mobile keeps
  // natural scrolling. Never hijacks the wheel.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const applySnap = () =>
      document.documentElement.classList.toggle("deck-snap", mq.matches);
    applySnap();
    mq.addEventListener("change", applySnap);

    const currentIndex = () => {
      const chrome =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue("--chrome-h")
        ) || 124;
      // generous tolerance: --chrome-h animates 124→80 as the banner
      // collapses, so a slide can sit slightly above its snap position
      let current = 0;
      SLIDES.forEach((slide, index) => {
        const el = document.getElementById(slide.id);
        if (el && el.getBoundingClientRect().top <= chrome + 120) current = index;
      });
      return current;
    };

    const onKey = (e: KeyboardEvent) => {
      if (!mq.matches) return;
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      const forward =
        e.key === "ArrowDown" || e.key === "PageDown" || (e.key === " " && !e.shiftKey);
      const back =
        e.key === "ArrowUp" || e.key === "PageUp" || (e.key === " " && e.shiftKey);
      if (!forward && !back) return;
      const targetIndex = currentIndex() + (forward ? 1 : -1);
      // beyond the deck (e.g. into the footer): let the browser handle it
      if (targetIndex < 0 || targetIndex >= SLIDES.length) return;
      e.preventDefault();
      scrollToSlide(SLIDES[targetIndex].id);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      mq.removeEventListener("change", applySnap);
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("deck-snap");
    };
  }, []);

  return (
    <div className="min-h-screen">
      <SEOHead
        title="The AI Expert | From AI-Curious to AI-Powered | Fractional CAIO & AI Consulting"
        description="AI isn't coming — it's already here. The AI Expert takes forward-looking businesses from AI-curious to AI-powered: fractional Chief AI Officer services, AI strategy, and implementation, led by Erik Schwartz (Microsoft, Comcast, Elsevier)."
        keywords="AI consultant, fractional CAIO, AI strategy, artificial intelligence consulting, business AI implementation, AI training, machine learning consultant, London AI expert"
        canonicalUrl="/"
        ogType="website"
      />
      <StructuredData schema={organizationSchema} />

      <DeckRail slides={SLIDES} />

      <Slide id={SLIDES[0].id} next={next(0)}>
        <ColdOpen />
      </Slide>
      <Slide id={SLIDES[1].id} next={next(1)}>
        <StakesAct />
      </Slide>
      <Slide id={SLIDES[2].id} next={next(2)}>
        <PurgatoryAct />
      </Slide>
      <Slide id={SLIDES[3].id} next={next(3)}>
        <PathAct />
      </Slide>
      <Slide id={SLIDES[4].id} next={next(4)}>
        <GuidePracticeSlide />
      </Slide>
      <Slide id={SLIDES[5].id} next={next(5)}>
        <GuideErikSlide />
      </Slide>
      <Slide id={SLIDES[6].id} next={next(6)}>
        <GuideWhySlide />
      </Slide>
      <Slide id={SLIDES[7].id} next={next(7)}>
        <ProofStoriesSlide />
      </Slide>
      <Slide id={SLIDES[8].id} next={next(8)}>
        <ProofInsightsSlide />
      </Slide>
      <Slide id={SLIDES[9].id} next={next(9)}>
        <CourseTestimonials
          title="Workshop Success Stories"
          subtitle="What participants say about Ship an App in a Day"
        />
      </Slide>
      <Slide id={SLIDES[10].id}>
        <FinaleAct />
      </Slide>
    </div>
  );
};

export default Index;
