import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ghost } from "@/data/ghostData";
import { Ghost as GhostIcon, ChevronRight } from "lucide-react";
import { EvidenceBadge } from "./EvidenceBadge";

interface GhostCardProps {
  ghost: Ghost;
}

const speedLabels: Record<string, string> = {
  "Fast": "Snel",
  "Normal": "Normaal",
  "Slow": "Langzaam"
};

export const GhostCard = ({ ghost }: GhostCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/ghost/${encodeURIComponent(ghost.name.toLowerCase())}`);
  };

  return (
    <Card 
      className="hover:border-primary/50 transition-all animate-fade-in cursor-pointer group p-2 md:p-3"
      onClick={handleClick}
    >
      <CardHeader className="p-0 pb-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 min-w-0">
            <GhostIcon className="w-4 h-4 text-primary shrink-0" />
            <CardTitle className="text-sm md:text-base truncate">{ghost.name}</CardTitle>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
        </div>
      </CardHeader>
      <CardContent className="p-0 space-y-1.5">
        <div className="flex flex-wrap gap-0.5">
          {ghost.evidence.slice(0, 3).map((evidence) => (
            <EvidenceBadge key={evidence} evidence={evidence} size="sm" />
          ))}
        </div>
        {/* <div className="flex flex-wrap gap-1">
          {ghost.speed.map((s) => (
            <Badge key={s} variant="outline" className="text-[10px] px-1.5 py-0">
              {speedLabels[s] || s}
            </Badge>
          ))}
        </div> */}
      </CardContent>
    </Card>
  );
};
