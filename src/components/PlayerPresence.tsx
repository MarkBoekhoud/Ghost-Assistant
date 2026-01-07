import { Users, User } from "lucide-react";
import { Player } from "@/hooks/useRoomPresence";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PlayerPresenceProps {
  players: Player[];
  currentPlayerId: string;
}

export const PlayerPresence = ({ players, currentPlayerId }: PlayerPresenceProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1.5 bg-primary/10 px-2.5 py-1.5 rounded-full cursor-default min-h-[36px]">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">{players.length}</span>
            {/* Show a name on mobile for visibility */}
            <span className="sm:hidden text-xs text-primary/70 max-w-[120px] truncate">
              {players.find((p) => p.id === currentPlayerId)?.name || players[0]?.name}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-[200px]">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground mb-1.5">In room:</p>
            {players.map((player) => (
              <div 
                key={player.id} 
                className="flex items-center gap-1.5 text-sm"
              >
                <User className="w-3 h-3" />
                <span className={player.id === currentPlayerId ? "font-semibold text-primary" : ""}>
                  {player.name}
                  {player.id === currentPlayerId && " (you)"}
                </span>
              </div>
            ))}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
