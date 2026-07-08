import { lazy, Suspense, useEffect, useState } from "react";

/**
 * Global ambient canvas for the Evolved Cyber-Luxe system: a barely-there
 * emerald wash plus the ethereal three.js swarm. The swarm chunk (~124 KB gz)
 * is only fetched after the browser goes idle, and never under
 * prefers-reduced-motion — the static wash carries the scene there.
 */
const EtherealSwarm = lazy(() => import("@/components/story/EtherealSwarm"));

const AmbientBackground = () => {
  const [showSwarm, setShowSwarm] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const start = () => setShowSwarm(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(start, 1200);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 0%, hsl(155 100% 45% / 0.04) 0%, transparent 55%),
            radial-gradient(ellipse 70% 50% at 85% 100%, hsl(160 55% 20% / 0.05) 0%, transparent 55%)
          `,
        }}
      />
      {showSwarm && (
        <Suspense fallback={null}>
          <EtherealSwarm />
        </Suspense>
      )}
    </div>
  );
};

export default AmbientBackground;
