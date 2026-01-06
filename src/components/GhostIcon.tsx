import { Ghost as GhostIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Map ghost names to custom icon URLs
// To add a custom icon: ghostIconMap["Ghost Name"] = "/path/to/icon.png"
// Place icons in public/ folder for URL paths, or import from src/assets/
const ghostIconMap: Record<string, string> = {
  // Example:
  // "Banshee": "/icons/banshee.png",
  // "Demon": "/icons/demon.png",
};

interface GhostIconComponentProps {
  ghostName: string;
  className?: string;
  isExcluded?: boolean;
}

export const GhostIconComponent = ({ 
  ghostName, 
  className = "w-4 h-4",
  isExcluded = false 
}: GhostIconComponentProps) => {
  const customIcon = ghostIconMap[ghostName];

  if (customIcon) {
    return (
      <img 
        src={customIcon} 
        alt={ghostName} 
        className={cn(
          className,
          "object-contain shrink-0",
          isExcluded && "opacity-50 grayscale"
        )}
      />
    );
  }

  return (
    <GhostIcon className={cn(
      className,
      "shrink-0",
      isExcluded ? "text-muted-foreground" : "text-primary"
    )} />
  );
};
