import { Ghost as GhostIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// --- 1. Importeer alle plaatjes ---
import bansheeImg from "@/assets/banshee.png";
import dayanImg from "@/assets/ghost_assistant.png";
import demonImg from "@/assets/demon.png";
import deogenImg from "@/assets/deogen.png";
import galluImg from "@/assets/ghost_assistant.png";
import goryoImg from "@/assets/goryo.png";
import hantuImg from "@/assets/hantu.png";
import jinnImg from "@/assets/jinn.png";
import mareImg from "@/assets/mare.png";
import mimicImg from "@/assets/the_mimic.png";
import moroiImg from "@/assets/moroi.png";
import mylingImg from "@/assets/myling.png";
import obakeImg from "@/assets/obake.png";
import obamboImg from "@/assets/ghost_assistant.png";
import oniImg from "@/assets/oni.png";
import onryoImg from "@/assets/onryo.png";
import phantomImg from "@/assets/phantom.png";
import poltergeistImg from "@/assets/poltergeist.png";
import raijuImg from "@/assets/raiju.png";
import revenantImg from "@/assets/revenant.png";
import shadeImg from "@/assets/shade.png";
import spiritImg from "@/assets/spirit.png";
import thayeImg from "@/assets/thaye.png";
import twinsImg from "@/assets/the_twins.png";
import wraithImg from "@/assets/wraith.png";
import yokaiImg from "@/assets/yokai.png";
import yureiImg from "@/assets/yurei.png";

// --- 2. Map ghost names to custom icon URLs ---
const ghostIconMap: Record<string, string> = {
  "Banshee": bansheeImg,
  "Dayan": dayanImg,
  "Demon": demonImg,
  "Deogen": deogenImg,
  "Gallu": galluImg,
  "Goryo": goryoImg,
  "Hantu": hantuImg,
  "Jinn": jinnImg,
  "Mare": mareImg,
  "The Mimic": mimicImg,
  "Moroi": moroiImg,
  "Myling": mylingImg,
  "Obake": obakeImg,
  "Obambo": obamboImg,
  "Oni": oniImg,
  "Onryo": onryoImg,
  "Phantom": phantomImg,
  "Poltergeist": poltergeistImg,
  "Raiju": raijuImg,
  "Revenant": revenantImg,
  "Shade": shadeImg,
  "Spirit": spiritImg,
  "Thaye": thayeImg,
  "The Twins": twinsImg,
  "Wraith": wraithImg,
  "Yokai": yokaiImg,
  "Yurei": yureiImg,
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