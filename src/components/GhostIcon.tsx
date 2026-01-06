import { Ghost as GhostIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Helper functie om het juiste pad te genereren voor GitHub Pages
const getGhostImg = (filename: string) => {
  // Let op: '/Ghost-Assistant/' is jouw repository naam (base)
  return `/Ghost-Assistant/ghosts/${filename}`;
};

// Map ghost names to custom icon URLs
const ghostIconMap: Record<string, string> = {
  "Banshee": getGhostImg("banshee.png"),
  "Dayan": getGhostImg("ghost_assistant.png"), // Placeholder
  "Demon": getGhostImg("demon.png"),
  "Deogen": getGhostImg("deogen.png"),
  "Gallu": getGhostImg("ghost_assistant.png"), // Placeholder
  "Goryo": getGhostImg("goryo.png"),
  "Hantu": getGhostImg("hantu.png"),
  "Jinn": getGhostImg("jinn.png"),
  "Mare": getGhostImg("mare.png"),
  "The Mimic": getGhostImg("the_mimic.png"),
  "Moroi": getGhostImg("moroi.png"),
  "Myling": getGhostImg("myling.png"),
  "Obake": getGhostImg("obake.png"),
  "Obambo": getGhostImg("ghost_assistant.png"), // Placeholder
  "Oni": getGhostImg("oni.png"),
  "Onryo": getGhostImg("onryo.png"),
  "Phantom": getGhostImg("phantom.png"),
  "Poltergeist": getGhostImg("poltergeist.png"),
  "Raiju": getGhostImg("raiju.png"),
  "Revenant": getGhostImg("revenant.png"),
  "Shade": getGhostImg("shade.png"),
  "Spirit": getGhostImg("spirit.png"),
  "Thaye": getGhostImg("thaye.png"),
  "The Twins": getGhostImg("the_twins.png"),
  "Wraith": getGhostImg("wraith.png"),
  "Yokai": getGhostImg("yokai.png"),
  "Yurei": getGhostImg("yurei.png"),
};

export default ghostIconMap;

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