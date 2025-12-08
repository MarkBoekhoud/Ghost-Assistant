import { Badge } from "@/components/ui/badge";
import { Evidence } from "@/data/ghostData";
import { cn } from "@/lib/utils";
import { getEvidenceIcon } from "@/lib/evidenceIcons";

interface EvidenceBadgeProps {
  evidence: Evidence;
  className?: string;
  size?: "sm" | "default";
  showIcon?: boolean;
  isGuaranteed?: boolean;
}

const evidenceStyles: Record<Evidence, string> = {
  "EMF Level 5": "bg-evidence-emf/20 text-evidence-emf border-evidence-emf/50",
  "Spirit Box": "bg-evidence-spiritbox/20 text-evidence-spiritbox border-evidence-spiritbox/50",
  "Fingerprints": "bg-evidence-fingerprints/20 text-evidence-fingerprints border-evidence-fingerprints/50",
  "Ghost Orbs": "bg-evidence-orbs/20 text-evidence-orbs border-evidence-orbs/50",
  "Ghost Writing": "bg-evidence-writing/20 text-evidence-writing border-evidence-writing/50",
  "Freezing Temps": "bg-evidence-freezing/20 text-evidence-freezing border-evidence-freezing/50",
  "DOTS Projector": "bg-evidence-dots/20 text-evidence-dots border-evidence-dots/50",
};

export const EvidenceBadge = ({ evidence, className, size = "default", showIcon = true, isGuaranteed = false }: EvidenceBadgeProps) => {
  return (
    <Badge 
      variant="outline" 
      className={cn(
        "border flex items-center gap-1",
        size === "sm" ? "text-[10px] px-1.5 py-0" : "text-xs",
        evidenceStyles[evidence],
        isGuaranteed && "underline",
        className
      )}
    >
      {showIcon && getEvidenceIcon(evidence)}
      {evidence}
    </Badge>
  );
};
