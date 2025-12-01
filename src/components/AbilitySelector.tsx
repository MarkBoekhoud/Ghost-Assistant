import { Badge } from "@/components/ui/badge";
import { Ability } from "@/data/ghostData";
import { Clock } from "lucide-react";

interface AbilitySelectorProps {
  abilityList: Ability[];
  selectedAbilities: Ability[];
  onToggle: (ability: Ability) => void;
}

const abilityLabels: Record<Ability, string> = {
  "Hunt Early": "Hunts Early",
  "Hunt Late": "Hunts Late"
};

export const AbilitySelector = ({ abilityList, selectedAbilities, onToggle }: AbilitySelectorProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-warning" />
        <span className="text-sm font-semibold">Hunt Timing</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {abilityList.map((ability) => (
          <Badge
            key={ability}
            variant={selectedAbilities.includes(ability) ? "default" : "outline"}
            className="cursor-pointer px-3 py-1.5 text-xs hover:opacity-80 transition-opacity"
            onClick={() => onToggle(ability)}
          >
            {abilityLabels[ability] || ability}
          </Badge>
        ))}
      </div>
    </div>
  );
};
