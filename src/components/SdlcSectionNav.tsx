import { useEffect, useState } from "react";

// "On this page" jump-links for the SDLC narrative. Ids match the section
// anchors on the page; keep in sync with AiExpertSDLC.tsx.
const sections = [
  { id: "lifecycle", label: "Lifecycle" },
  { id: "team", label: "The Team" },
  { id: "organizational-brain", label: "Organizational Brain" },
  { id: "protocol", label: "Guardrails" },
  { id: "who", label: "Rune" },
];

// Fixed header (nav + course banner) plus this bar, so a jumped-to section
// heading lands just below the bar rather than under it.
const HEADER_OFFSET = 180;
// Reveal the bar once the hero is scrolled past.
const SHOW_AFTER = 320;

/**
 * "On this page" section nav with scrollspy. Real anchor links
 * (keyboard-accessible, Enter jumps, visible focus ring). The active section
 * is highlighted as the user scrolls. On narrow screens the row becomes a
 * horizontal scroller so it never crowds the content.
 *
 * Positioned fixed (not sticky): this page's overflow-x:hidden turns
 * html/body/#root into nested scroll containers, which breaks both
 * position:sticky and native fragment scrolling. So the bar is fixed, revealed
 * once past the hero, and jumps set the window scroll position directly.
 */
const SdlcSectionNav = () => {
  const [activeId, setActiveId] = useState(sections[0].id);
  const [shown, setShown] = useState(false);

  // Scrollspy: highlight the section currently in the upper viewport.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-200px 0px -55% 0px", threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Reveal once the hero is scrolled past.
  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > SHOW_AFTER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jumpTo = (e: React.MouseEvent, id: string) => {
    const el = document.getElementById(id);
    if (!el) return; // fall back to default anchor behaviour
    e.preventDefault();
    const top = Math.max(
      0,
      el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
    );
    // This page sets scroll-behavior: smooth globally, and its nested overflow
    // setup means smooth programmatic scrolls never settle. Force an instant
    // jump so the link is reliable (and it respects reduced motion).
    const rootEl = document.documentElement;
    const prevBehavior = rootEl.style.scrollBehavior;
    rootEl.style.scrollBehavior = "auto";
    window.scrollTo(0, top);
    rootEl.style.scrollBehavior = prevBehavior;
    window.history.replaceState(null, "", `#${id}`);
    setActiveId(id);
  };

  return (
    <nav
      aria-label="On this page"
      aria-hidden={!shown}
      className={`fixed top-[var(--chrome-h)] inset-x-0 z-30 border-y border-border bg-background/90 backdrop-blur transition-[opacity,top] duration-300 ${
        shown ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="container mx-auto px-4">
        <ul className="flex gap-1 overflow-x-auto py-2">
          {sections.map((s) => {
            const active = s.id === activeId;
            return (
              <li key={s.id} className="flex-shrink-0">
                <a
                  href={`#${s.id}`}
                  onClick={(e) => jumpTo(e, s.id)}
                  tabIndex={shown ? undefined : -1}
                  aria-current={active ? "true" : undefined}
                  className={`inline-block whitespace-nowrap rounded-full px-4 py-2 text-sm font-heading tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    active
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default SdlcSectionNav;
