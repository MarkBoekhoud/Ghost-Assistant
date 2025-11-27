import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Evidence } from "@/data/ghostData";

interface EvidenceSelectorProps {
  evidenceList: Evidence[];
  selectedEvidence: Evidence[];
  onToggle: (evidence: Evidence) => void;
}

export const EvidenceSelector = ({ evidenceList, selectedEvidence, onToggle }: EvidenceSelectorProps) => {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold text-foreground mb-4">Bewijs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {evidenceList.map((evidence) => (
          <div
            key={evidence}
            className="flex items-center space-x-3 p-3 rounded-lg bg-secondary/50 border border-border hover:border-primary/50 transition-all"
          >
            <Checkbox
              id={evidence}
              checked={selectedEvidence.includes(evidence)}
              onCheckedChange={() => onToggle(evidence)}
              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <Label
              htmlFor={evidence}
              className="text-sm font-medium leading-none cursor-pointer"
            >
              {evidence}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};
