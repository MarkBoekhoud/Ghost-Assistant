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

export const EvidenceSelector = ({ 
  evidenceList, 
  evidenceStates, 
  disabledEvidence,
  onToggle 
}: EvidenceSelectorProps) => {
  const getStateStyles = (evidence: Evidence) => {
    const isDisabled = disabledEvidence.includes(evidence);
    const state = evidenceStates[evidence];

    if (isDisabled) {
      return "bg-muted/30 border-muted cursor-not-allowed opacity-50";
    }

    switch (state) {
      case "present":
        return "bg-success/20 border-success text-success";
      case "excluded":
        return "bg-muted/50 border-muted text-muted-foreground line-through";
      default:
        return "bg-secondary/50 border-border hover:border-primary/50";
    }
  };

  const getStateIcon = (evidence: Evidence) => {
    const state = evidenceStates[evidence];
    
    switch (state) {
      case "present":
        return <Check className="w-4 h-4 text-success" />;
      case "excluded":
        return <X className="w-4 h-4 text-muted-foreground" />;
      default:
        return <div className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold text-foreground mb-4">Bewijs</h2>
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
                  <p>Niet mogelijk op basis van geselecteerde bewijzen</p>
                </TooltipContent>
              </Tooltip>
            );
          }

          return button;
        })}
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        Klik 1x = aanwezig (groen) • Klik 2x = uitgesloten (grijs) • Klik 3x = reset
      </p>
    </div>
  );
};
