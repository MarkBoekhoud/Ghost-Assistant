import { cn } from "@/lib/utils";

export type Difficulty = "amateur" | "intermediate" | "professional" | "nightmare";

interface DifficultySelectorProps {
  difficulty: Difficulty;
  onChange: (difficulty: Difficulty) => void;
}

const difficultyOptions: { value: Difficulty; label: string; evidenceCount: number }[] = [
  { value: "amateur", label: "Amateur", evidenceCount: 4 },
  { value: "intermediate", label: "Intermediate", evidenceCount: 3 },
  { value: "professional", label: "Professional", evidenceCount: 2 },
  { value: "nightmare", label: "Nightmare", evidenceCount: 1 },
];

export const DifficultySelector = ({ difficulty, onChange }: DifficultySelectorProps) => {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm font-medium text-muted-foreground">Difficulty:</span>
      <div className="flex gap-1 flex-wrap">
        {difficultyOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "px-3 py-1.5 text-xs rounded-full transition-all",
              difficulty === option.value
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {option.label} ({option.evidenceCount})
          </button>
        ))}
      </div>
    </div>
  );
};

export const getEvidenceCount = (difficulty: Difficulty): number => {
  const option = difficultyOptions.find((o) => o.value === difficulty);
  return option?.evidenceCount ?? 3;
};
