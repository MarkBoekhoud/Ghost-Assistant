import { cn } from "@/lib/utils";
import { Gauge } from "lucide-react";

export type Speed = "slow" | "normal" | "fast" | null;

interface SpeedSelectorProps {
  speed: Speed;
  onChange: (speed: Speed) => void;
}

const speedOptions: { value: Speed; label: string }[] = [
  { value: null, label: "Alle" },
  { value: "slow", label: "Langzaam" },
  { value: "normal", label: "Normaal" },
  { value: "fast", label: "Snel" },
];

export const SpeedSelector = ({ speed, onChange }: SpeedSelectorProps) => {
  return (
    <div className="bg-card p-3 rounded-lg border border-border">
      <div className="flex items-center gap-2 mb-2">
        <Gauge className="w-4 h-4 text-accent" />
        <span className="text-sm font-semibold">Snelheid</span>
      </div>
      <div className="flex gap-1 flex-wrap">
        {speedOptions.map((option) => (
          <button
            key={option.value ?? "all"}
            onClick={() => onChange(option.value)}
            className={cn(
              "px-3 py-1.5 text-xs rounded-full transition-all",
              speed === option.value
                ? "bg-accent text-accent-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};
