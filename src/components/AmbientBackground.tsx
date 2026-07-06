/**
 * Quiet ambient canvas for the Evolved Cyber-Luxe system: a still, barely-there
 * emerald wash. The old particle canvas, grid and scan-line are retired —
 * "nothing moves unless the story does" (docs/design/art-direction.html §05).
 * Props are kept for call-site compatibility but no longer drive anything.
 */
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
    </div>
  );
};

export default AmbientBackground;
