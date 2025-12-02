import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";

export type Visibility = "visible" | "invisible" | "normal" | null;

interface VisibilitySelectorProps {
  visibility: Visibility;
  onChange: (visibility: Visibility) => void;
}

const visibilityOptions: { value: Visibility; label: string }[] = [
  { value: null, label: "All" },
  { value: "invisible", label: "Invisible" },
  { value: "normal", label: "Normal" },
  { value: "visible", label: "Visible" },
];

export const VisibilitySelector = ({ visibility, onChange }: VisibilitySelectorProps) => {
  return (
    <div className="bg-card p-3 rounded-lg border border-border">
      <div className="flex items-center gap-2 mb-2">
        <Eye className="w-4 h-4 text-primary" />
        <span className="text-sm font-semibold">Visibility</span>
      </div>
      <div className="flex gap-1 flex-wrap">
        {visibilityOptions.map((option) => (
          <button
            key={option.value ?? "all"}
            onClick={() => onChange(option.value)}
            className={cn(
              "px-3 py-1.5 text-xs rounded-full transition-all",
              visibility === option.value
                ? "bg-primary text-primary-foreground"
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
