import { useState } from "react";
import { Users, User } from "lucide-react";
import { Player } from "@/hooks/useRoomPresence";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface PlayerPresenceProps {
  players: Player[];
  currentPlayerId: string;
}

export const PlayerPresence = ({ players, currentPlayerId }: PlayerPresenceProps) => {
  const [open, setOpen] = useState(false);

  const PlayerList = () => (
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
  );

  const TriggerButton = ({ onClick }: { onClick?: () => void }) => (
    <div 
      className="flex items-center gap-1.5 bg-primary/10 px-2.5 py-1.5 rounded-full cursor-pointer min-h-[36px] hover:bg-primary/20 transition-colors"
      onClick={onClick}
    >
      <Users className="w-4 h-4 text-primary" />
      <span className="text-sm font-medium text-primary">{players.length}</span>
    </div>
  );

  return (
    <>
      {/* Mobile: Popover on click */}
      <div className="sm:hidden">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div>
              <TriggerButton />
            </div>
          </PopoverTrigger>
          <PopoverContent side="bottom" align="end" className="w-48">
            <PlayerList />
          </PopoverContent>
        </Popover>
      </div>

      {/* Desktop: Tooltip on hover */}
      <div className="hidden sm:block">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <TriggerButton />
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-[200px]">
              <PlayerList />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  );
};
