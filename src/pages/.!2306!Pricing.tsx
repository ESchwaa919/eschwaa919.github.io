import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  ArrowRight,
  Calendar,
  Zap,
  Briefcase,
  Rocket,
  Users,
  Target,
  TrendingUp,
  Clock,
} from "lucide-react";

const Pricing = () => {
  // Engagement models with pricing guidance
  const engagementModels = [
    {
      name: "Strategy Sprint",
      icon: Zap,
      tagline: "Fast-track your AI roadmap",
      description:
        "Intensive 2-4 week engagement to develop a complete AI strategy, governance framework, and 3-year implementation roadmap.",
      timeline: "2-4 weeks",
