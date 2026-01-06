import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ghost } from "@/data/ghostData";
import { X, Check } from "lucide-react";
import { EvidenceBadge } from "./EvidenceBadge";
import { GhostIconComponent } from "./GhostIcon";
import { cn } from "@/lib/utils";

interface GhostCardProps {
  ghost: Ghost;
  isExcluded?: boolean;
  onToggleExclude?: () => void;
  showExcludeButton?: boolean;
}

export const GhostCard = ({ 
  ghost, 
  isExcluded = false, 
  onToggleExclude,
  showExcludeButton = false,
}: GhostCardProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking the exclude button
    if ((e.target as HTMLElement).closest('[data-exclude-button]')) {
      return;
    }
    
    const search = location.search || "";

    // If we're inside a room, preserve the room code in query so GhostDetail can return
    const roomMatch = location.pathname.match(/\/room\/([^\/\?]+)/);
    if (roomMatch) {
      const roomCode = roomMatch[1];
      const params = new URLSearchParams();
      params.set("room", roomCode);
      // preserve any existing search params too
      if (search) {
        const existing = new URLSearchParams(search);
        existing.forEach((v, k) => {
          if (k !== "room") params.set(k, v);
        });
      }
      navigate(`/ghost/${encodeURIComponent(ghost.name.toLowerCase())}?${params.toString()}`);
      return;
    }

    // Default: preserve current search
    navigate(`/ghost/${encodeURIComponent(ghost.name.toLowerCase())}${search}`);
  };

  const handleExcludeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleExclude?.();
  };

  return (
    <Card 
      className={cn(
        "transition-all animate-fade-in cursor-pointer group p-2 md:p-3 relative",
        isExcluded 
          ? "opacity-40 bg-muted/50 border-muted" 
          : "hover:border-primary/50"
      )}
      onClick={handleClick}
    >
      {/* Exclude/Include Button */}
      {showExcludeButton && (
        <button
          data-exclude-button
          onClick={handleExcludeClick}
          className={cn(
            "absolute top-1 right-1 p-1.5 rounded-full transition-all z-10",
            "touch-manipulation min-h-[32px] min-w-[32px] flex items-center justify-center",
            isExcluded 
              ? "bg-success/20 text-success hover:bg-success/30" 
              : "bg-destructive/20 text-destructive hover:bg-destructive/30"
          )}
          title={isExcluded ? "Include ghost" : "Exclude ghost"}
        >
          {isExcluded ? (
            <Check className="w-3.5 h-3.5" />
          ) : (
            <X className="w-3.5 h-3.5" />
          )}
        </button>
      )}

      <CardHeader className="p-0 pb-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 min-w-0">
            <GhostIconComponent 
              ghostName={ghost.name} 
              className="w-4 h-4"
              isExcluded={isExcluded}
            />
            <CardTitle className={cn(
              "text-sm md:text-base truncate",
              isExcluded && "line-through text-muted-foreground"
            )}>
              {ghost.name}
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 space-y-1.5">
        <div className={cn(
          "flex flex-wrap gap-0.5",
          isExcluded && "opacity-50"
        )}>
          {ghost.evidence.map((evidence) => (
            <EvidenceBadge 
              key={evidence} 
              evidence={evidence} 
              size="sm" 
              isGuaranteed={ghost.guaranteedEvidence?.includes(evidence) ?? false}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
