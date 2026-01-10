import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { RealtimeChannel } from "@supabase/supabase-js";

export interface Player {
  id: string;
  name: string;
  joinedAt: string;
}

export interface RoomNotification {
  type: "success" | "error" | "info";
  message: string;
  senderId: string;
  senderName: string;
  toastId?: string; // Unique ID to prevent duplicate toasts
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
  const broadcastChannelRef = useRef<RealtimeChannel | null>(null);

  const setPlayerName = useCallback((name: string) => {
    localStorage.setItem("ghost-player-name", name);
    setPlayerNameState(name);
  }, []);

  // Function to broadcast a notification to all players in the room
  const broadcastNotification = useCallback((type: RoomNotification["type"], message: string, toastId?: string) => {
    if (!broadcastChannelRef.current) return;
    
    // Use a fixed ID for action toasts so only one shows at a time
    const notificationId = toastId || "room-action";
    
    // Dismiss any existing action toast and show new one
    toast.dismiss("room-action");
    toast[type](message, { id: notificationId });
    
    // Broadcast to other players
    broadcastChannelRef.current.send({
      type: "broadcast",
      event: "room-notification",
      payload: {
        type,
        message,
        senderId: playerId,
        senderName: playerName,
        toastId: notificationId,
      } as RoomNotification,
    });
  }, [playerId, playerName]);

  useEffect(() => {
    if (!roomCode) return;

    const channel = supabase.channel(`presence-${roomCode}`, {
      config: {
        presence: {
          key: playerId,
        },
      },
    });

    // Store reference for broadcasting
    broadcastChannelRef.current = channel;

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
        // Show toast when another player joins
        if (key !== playerId && newPresences && newPresences.length > 0) {
          const presence = newPresences[0] as any;
          const name = presence.name || `Player ${key.slice(0, 4)}`;
          toast.info(`${name} joined the room`, { id: `join-${key}` });
        }
      })
      .on("presence", { event: "leave" }, ({ key, leftPresences }) => {
        console.log("Player left:", key, leftPresences);
        // Show toast when another player leaves
        if (key !== playerId && leftPresences && leftPresences.length > 0) {
          const presence = leftPresences[0] as any;
          const name = presence.name || `Player ${key.slice(0, 4)}`;
          toast.info(`${name} left the room`, { id: `leave-${key}` });
        }
      })
      .on("broadcast", { event: "room-notification" }, ({ payload }) => {
        const notification = payload as RoomNotification;
        // Show notification from other players
        if (notification.senderId !== playerId) {
          const displayMessage = `${notification.senderName}: ${notification.message}`;
          // Dismiss any existing action toast and show new one (single action toast at a time)
          toast.dismiss("room-action");
          const toastOptions = { id: "room-action" };
          switch (notification.type) {
            case "success":
              toast.success(displayMessage, toastOptions);
              break;
            case "error":
              toast.error(displayMessage, toastOptions);
              break;
            case "info":
            default:
              toast.info(displayMessage, toastOptions);
              break;
          }
        }
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
      broadcastChannelRef.current = null;
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
    broadcastNotification,
  };
};
