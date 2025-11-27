import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ghost } from "@/data/ghostData";
import { Ghost as GhostIcon } from "lucide-react";

interface GhostCardProps {
  ghost: Ghost;
}

export const GhostCard = ({ ghost }: GhostCardProps) => {
  return (
    <Card className="hover:border-primary/50 transition-all animate-fade-in">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <GhostIcon className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg">{ghost.name}</CardTitle>
        </div>
        <CardDescription className="text-sm">{ghost.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-xs text-muted-foreground mb-2 font-semibold">Bewijs:</p>
          <div className="flex flex-wrap gap-1.5">
            {ghost.evidence.map((evidence) => (
              <Badge key={evidence} variant="secondary" className="text-xs">
                {evidence}
              </Badge>
            ))}
          </div>
        </div>
        {ghost.abilities.length > 0 && (
          <div>
            <p className="text-xs text-muted-foreground mb-2 font-semibold">Eigenschappen:</p>
            <div className="flex flex-wrap gap-1.5">
              {ghost.abilities.map((ability) => (
                <Badge key={ability} variant="outline" className="text-xs border-accent text-accent">
                  {ability}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
