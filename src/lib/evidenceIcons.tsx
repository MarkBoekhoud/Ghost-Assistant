import { 
  Radio, 
  Fingerprint, 
  Snowflake, 
  BookOpen, 
  Sparkles, 
  Scan, 
  Zap 
} from "lucide-react";
import { Evidence } from "@/data/ghostData";

export const evidenceIcons: Record<Evidence, React.ReactNode> = {
  "EMF Level 5": <Zap className="w-3.5 h-3.5" />,
  "Spirit Box": <Radio className="w-3.5 h-3.5" />,
  "Ultraviolet": <Fingerprint className="w-3.5 h-3.5" />,
  "Ghost Orbs": <Sparkles className="w-3.5 h-3.5" />,
  "Ghost Writing": <BookOpen className="w-3.5 h-3.5" />,
  "Freezing Temps": <Snowflake className="w-3.5 h-3.5" />,
  "DOTS Projector": <Scan className="w-3.5 h-3.5" />,
};

export const getEvidenceIcon = (evidence: Evidence) => evidenceIcons[evidence];
