import { Ghost } from "lucide-react";

// To use a custom logo, place your PNG in src/assets/ and import it here
// import customLogo from "@/assets/custom-logo.png";

interface AppLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

// Set to your custom logo path, or null to use default Ghost icon
const CUSTOM_LOGO_URL: string | null = null;

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
