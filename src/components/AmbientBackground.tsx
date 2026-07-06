import { lazy, Suspense } from "react";

/**
 * Global ambient canvas for the Evolved Cyber-Luxe system: a barely-there
 * emerald wash plus the ethereal three.js swarm (lazy-loaded so three stays
 * out of the main bundle). Props kept for call-site compatibility.
 */
const EtherealSwarm = lazy(() => import("@/components/story/EtherealSwarm"));

interface AmbientBackgroundProps {
  particleCount?: number;
  showGrid?: boolean;
  showScanLine?: boolean;
  intensity?: 'subtle' | 'medium' | 'intense';
}

const AmbientBackground = (_props: AmbientBackgroundProps) => {
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
      <Suspense fallback={null}>
        <EtherealSwarm />
      </Suspense>
    </div>
  );
};

export default AmbientBackground;
