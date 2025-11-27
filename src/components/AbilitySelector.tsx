import { Badge } from "@/components/ui/badge";
import { Ability } from "@/data/ghostData";

interface AbilitySelectorProps {
  abilityList: Ability[];
  selectedAbilities: Ability[];
  onToggle: (ability: Ability) => void;
}

export const AbilitySelector = ({ abilityList, selectedAbilities, onToggle }: AbilitySelectorProps) => {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold text-foreground mb-4">Gedrag & Eigenschappen</h2>
      <div className="flex flex-wrap gap-2">
        {abilityList.map((ability) => (
          <Badge
            key={ability}
            variant={selectedAbilities.includes(ability) ? "default" : "outline"}
            className="cursor-pointer px-4 py-2 text-sm hover:opacity-80 transition-opacity"
            onClick={() => onToggle(ability)}
          >
            {ability}
          </Badge>
        ))}
      </div>
    </div>
  );
};
