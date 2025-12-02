import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type Difficulty = "amateur" | "intermediate" | "professional" | "nightmare" | "insanity";

interface DifficultySelectorProps {
  difficulty: Difficulty;
  onChange: (difficulty: Difficulty) => void;
}

const difficultyOptions: { value: Difficulty; label: string; evidenceCount: number }[] = [
  { value: "amateur", label: "Amateur", evidenceCount: 3 },
  { value: "intermediate", label: "Intermediate", evidenceCount: 3 },
  { value: "professional", label: "Professional", evidenceCount: 3 },
  { value: "nightmare", label: "Nightmare", evidenceCount: 2 },
  { value: "insanity", label: "Insanity", evidenceCount: 1 },
];

export const DifficultySelector = ({ difficulty, onChange }: DifficultySelectorProps) => {
  const currentOption = difficultyOptions.find(o => o.value === difficulty);
  
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-muted-foreground">Difficulty:</span>
      <Select value={difficulty} onValueChange={(value) => onChange(value as Difficulty)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select difficulty" />
        </SelectTrigger>
        <SelectContent className="bg-popover border border-border">
          {difficultyOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label} ({option.evidenceCount} evidence)
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export const getEvidenceCount = (difficulty: Difficulty): number => {
  const option = difficultyOptions.find((o) => o.value === difficulty);
  return option?.evidenceCount ?? 3;
};
