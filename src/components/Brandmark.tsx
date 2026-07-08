import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

/** The brand lockup — shared by Navigation and Footer. */
const Brandmark = ({ hideTextOnMobile = false }: { hideTextOnMobile?: boolean }) => (
  <Link to="/" className="flex items-center gap-3 group">
    <div className="w-9 h-9 rounded-sm flex items-center justify-center border border-primary/60 group-hover:border-primary transition-colors">
      <Zap className="w-5 h-5 text-primary" />
    </div>
    <div className={hideTextOnMobile ? "hidden sm:block" : ""}>
      <div className="wordmark text-foreground leading-tight">The AI Expert</div>
      <div className="kicker text-[10px] text-muted-foreground -mt-0.5">
        Getting AI Done Right
      </div>
    </div>
  </Link>
);

export default Brandmark;
