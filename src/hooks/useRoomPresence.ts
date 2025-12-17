import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Player {
  id: string;
  name: string;
  joinedAt: string;
}

const generatePlayerId = (): string => {
  const stored = localStorage.getItem("ghost-player-id");
  if (stored) return stored;
  const id = crypto.randomUUID();
  localStorage.setItem("ghost-player-id", id);
  return id;
};

const getPlayerName = (): string => {
  const stored = localStorage.getItem("ghost-player-name");
  if (stored) return stored;
  const name = `Player ${Math.floor(Math.random() * 1000)}`;
  localStorage.setItem("ghost-player-name", name);
  return name;
};

export const useRoomPresence = (roomCode?: string) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerId] = useState(generatePlayerId);
  const [playerName, setPlayerNameState] = useState(getPlayerName);

  const setPlayerName = useCallback((name: string) => {
    localStorage.setItem("ghost-player-name", name);
    setPlayerNameState(name);
  }, []);

  useEffect(() => {
    if (!roomCode) return;

    const channel = supabase.channel(`presence-${roomCode}`, {
      config: {
        presence: {
          key: playerId,
        },
      },
    });

    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        const playerList: Player[] = [];
        
        Object.entries(state).forEach(([key, presences]) => {
          if (presences && presences.length > 0) {
            const presence = presences[0] as any;
            playerList.push({
              id: key,
              name: presence.name || `Player ${key.slice(0, 4)}`,
              joinedAt: presence.joinedAt || new Date().toISOString(),
            });
          }
        });
        
        setPlayers(playerList);
      })
      .on("presence", { event: "join" }, ({ key, newPresences }) => {
        console.log("Player joined:", key, newPresences);
      })
      .on("presence", { event: "leave" }, ({ key, leftPresences }) => {
        console.log("Player left:", key, leftPresences);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({
            name: playerName,
            joinedAt: new Date().toISOString(),
          });
        }
      });

    return () => {
      channel.untrack();
      supabase.removeChannel(channel);
    };
  }, [roomCode, playerId, playerName]);

  return {
    players,
    playerId,
    playerName,
    setPlayerName,
    playerCount: players.length,
  };
};
