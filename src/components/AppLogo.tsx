import { Ghost } from "lucide-react";

// 1. De import regel mag WEG (of uitgecommentarieerd):
// import customLogo from "@/assets/ghost_assistant.png";

interface AppLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

// 2. Zet hier het harde pad naar je public map neer.
// Dit werkt nu hetzelfde als je ghosts lijst.
const CUSTOM_LOGO_URL: string | null = "/Ghost-Assistant/ghosts/ghost_assistant.png"; 

export const AppLogo = ({ className = "", size = "md" }: AppLogoProps) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8 md:w-10 md:h-10",
    lg: "w-12 h-12 md:w-16 md:h-16",
  };

  if (CUSTOM_LOGO_URL) {
    return (
      <img 
        src={CUSTOM_LOGO_URL} 
        alt="Logo" 
        className={`${sizeClasses[size]} object-contain ${className}`}
      />
    );
  }

  return (
    <Ghost className={`${sizeClasses[size]} text-primary animate-ghost-glow ${className}`} />
  );
};