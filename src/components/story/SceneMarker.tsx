import { useScrollReveal } from "@/hooks/useScrollReveal";

interface SceneMarkerProps {
  label: string;
  className?: string;
  /** Override the scroll trigger — e.g. a load-time entrance (ColdOpen). */
  revealed?: boolean;
}

/**
 * The signature device: a screenplay slate — mono label + hairline rule that
 * draws in from the left as it enters the viewport. Use only for genuinely
 * sequential content (acts, stages). docs/design/art-direction.html §03.
 */
const SceneMarker = ({ label, className = "", revealed }: SceneMarkerProps) => {
  const { ref, isVisible } = useScrollReveal();
  const isDrawn = revealed ?? isVisible;

  return (
    <div ref={ref} className={`flex items-center gap-5 ${className}`}>
      <span className="kicker text-primary whitespace-normal sm:whitespace-nowrap">{label}</span>
      <span className={`scene-rule ${isDrawn ? "is-drawn" : ""}`} aria-hidden="true" />
    </div>
  );
};

export default SceneMarker;
