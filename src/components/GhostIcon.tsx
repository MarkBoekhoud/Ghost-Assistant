import { Ghost as GhostIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// 1. Importeer het plaatje hier (zorg dat de naam exact klopt met je bestand in src/assets)
import bansheeImg from "@/assets/banshee.png";
import demonImg from "@/assets/ghost_assistant.png";

// Map ghost names to custom icon URLs
const ghostIconMap: Record<string, string> = {
  // 2. Koppel de "Banshee" aan de geïmporteerde afbeelding
  "Banshee": bansheeImg,
  "Demon": demonImg,
  
  // Je kunt hier later meer ghosts toevoegen:
  // "Demon": demonImg,
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
  // Check of de ghostnaam in onze lijst staat (bijv. "Banshee")
  const customIcon = ghostIconMap[ghostName];

  if (customIcon) {
    return (
      <img 
        src={customIcon} 
        alt={ghostName} 
        className={cn(
          className,
          "object-contain shrink-0",
          isExcluded && "opacity-50 grayscale" // Maakt hem grijs als de ghost is uitgesloten
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