import { Ghost as GhostIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// 1. HARDE URL FIX:
// We gebruiken geen variabelen meer. Dit is de link die we net in de browser getest hebben.
const getGhostImg = (filename: string) => {
  return `/Ghost-Assistant/images/${filename}`;
};

// Map ghost names to custom icon URLs
const ghostIconMap: Record<string, string> = {
  "Banshee": getGhostImg("banshee.png"),
  "Dayan": getGhostImg("ghost_assistant.png"),
  "Demon": getGhostImg("demon.png"),
  "Deogen": getGhostImg("deogen.png"),
  "Gallu": getGhostImg("ghost_assistant.png"),
  "Goryo": getGhostImg("goryo.png"),
  "Hantu": getGhostImg("hantu.png"),
  "Jinn": getGhostImg("jinn.png"),
  "Mare": getGhostImg("mare.png"),
  "The Mimic": getGhostImg("the_mimic.png"),
  "Moroi": getGhostImg("moroi.png"),
  "Myling": getGhostImg("myling.png"),
  "Obake": getGhostImg("obake.png"),
  "Obambo": getGhostImg("ghost_assistant.png"),
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
  
  // 2. SLIMME LOOKUP FIX:
  // Probeer de naam direct. Werkt dat niet? Probeer met een Hoofdletter.
  // Dit lost het probleem op als de data "banshee" is maar de map "Banshee" verwacht.
  let customIcon = ghostIconMap[ghostName];

  if (!customIcon && ghostName) {
    // Maak eerste letter hoofdletter (bijv. 'banshee' -> 'Banshee')
    const capitalized = ghostName.charAt(0).toUpperCase() + ghostName.slice(1);
    customIcon = ghostIconMap[capitalized];
  }
  
  // Console log om te debuggen (druk F12 in browser om dit te zien)
  console.log(`Ghost: ${ghostName}, Found Icon: ${!!customIcon}`);

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
        // Als het plaatje toch niet laadt (404), verstop hem dan zodat je geen lelijk icoon ziet
        onError={(e) => {
            console.error("Image failed to load:", customIcon);
            e.currentTarget.style.display = 'none';
        }}
      />
    );
  }

  // Fallback naar SVG als er echt niks gevonden is
  return (
    <GhostIcon className={cn(
      className,
      "shrink-0",
      isExcluded ? "text-muted-foreground" : "text-primary"
    )} />
  );
};