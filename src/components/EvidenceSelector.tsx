import { Label } from "@/components/ui/label";
import { Evidence, EvidenceState } from "@/data/ghostData";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface EvidenceSelectorProps {
  evidenceList: Evidence[];
  evidenceStates: Record<Evidence, EvidenceState>;
  disabledEvidence: Evidence[];
  onToggle: (evidence: Evidence) => void;
}

const evidenceColorMap: Record<Evidence, { bg: string; border: string; text: string }> = {
  "EMF Level 5": { bg: "bg-evidence-emf/20", border: "border-evidence-emf", text: "text-evidence-emf" },
  "Spirit Box": { bg: "bg-evidence-spiritbox/20", border: "border-evidence-spiritbox", text: "text-evidence-spiritbox" },
  "Fingerprints": { bg: "bg-evidence-fingerprints/20", border: "border-evidence-fingerprints", text: "text-evidence-fingerprints" },
  "Ghost Orbs": { bg: "bg-evidence-orbs/20", border: "border-evidence-orbs", text: "text-evidence-orbs" },
  "Ghost Writing": { bg: "bg-evidence-writing/20", border: "border-evidence-writing", text: "text-evidence-writing" },
  "Freezing Temps": { bg: "bg-evidence-freezing/20", border: "border-evidence-freezing", text: "text-evidence-freezing" },
  "DOTS Projector": { bg: "bg-evidence-dots/20", border: "border-evidence-dots", text: "text-evidence-dots" },
};

export const EvidenceSelector = ({ 
  evidenceList, 
  evidenceStates, 
  disabledEvidence,
  onToggle 
}: EvidenceSelectorProps) => {
  const getStateStyles = (evidence: Evidence) => {
    const isDisabled = disabledEvidence.includes(evidence);
    const state = evidenceStates[evidence];
    const colors = evidenceColorMap[evidence];

    if (isDisabled) {
      return "bg-muted/30 border-muted cursor-not-allowed opacity-50";
    }

    switch (state) {
      case "present":
        return cn(colors.bg, colors.border, colors.text);
      case "excluded":
        return "bg-muted/50 border-muted text-muted-foreground line-through";
      default:
        return cn("bg-secondary/50 hover:border-opacity-70", colors.border, "border-opacity-30");
    }
  };

  const getStateIcon = (evidence: Evidence) => {
    const state = evidenceStates[evidence];
    const colors = evidenceColorMap[evidence];
    
    switch (state) {
      case "present":
        return <Check className={cn("w-4 h-4", colors.text)} />;
      case "excluded":
        return <X className="w-4 h-4 text-muted-foreground" />;
      default:
        return <div className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold text-foreground mb-4">Evidence</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {evidenceList.map((evidence) => {
          const isDisabled = disabledEvidence.includes(evidence);
          
          const button = (
            <button
              key={evidence}
              onClick={() => !isDisabled && onToggle(evidence)}
              disabled={isDisabled}
              className={cn(
                "flex items-center justify-between w-full p-3 rounded-lg border transition-all",
                getStateStyles(evidence)
              )}
            >
              <Label
                className={cn(
                  "text-sm font-medium leading-none cursor-pointer",
                  isDisabled && "cursor-not-allowed"
                )}
              >
                {evidence}
              </Label>
              {getStateIcon(evidence)}
            </button>
          );

          if (isDisabled) {
            return (
              <Tooltip key={evidence}>
                <TooltipTrigger asChild>
                  {button}
                </TooltipTrigger>
                <TooltipContent>
                  <p>Not possible based on selected evidence</p>
                </TooltipContent>
              </Tooltip>
            );
          }

          return button;
        })}
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        Click 1x = present • Click 2x = excluded • Click 3x = reset
      </p>
    </div>
  );
};
