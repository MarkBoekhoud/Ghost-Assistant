import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Evidence, EvidenceState, evidenceList } from "@/data/ghostData";
import { Difficulty } from "@/components/DifficultySelector";
import { Speed } from "@/components/SpeedSelector";
import { Visibility } from "@/components/VisibilitySelector";
import { toast } from "sonner";

export interface RoomData {
  id: string;
  code: string;
  evidence: Record<Evidence, EvidenceState>;
  difficulty: Difficulty;
  speed: Speed;
  visibility: Visibility;
  bpm: number | null;
  spm: number | null;
  created_at: string;
  updated_at: string;
}

const generateRoomCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const defaultEvidence = (): Record<Evidence, EvidenceState> => {
  return Object.fromEntries(evidenceList.map(e => [e, "unknown"])) as Record<Evidence, EvidenceState>;
};

export const useRoom = (roomCode?: string) => {
  const [room, setRoom] = useState<RoomData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch room data
  const fetchRoom = useCallback(async (code: string) => {
    setLoading(true);
    setError(null);
    
    const { data, error: fetchError } = await supabase
      .from("rooms")
      .select("*")
      .eq("code", code)
      .single();
    
    if (fetchError) {
      setError("Room not found");
      setRoom(null);
    } else {
      // Parse evidence from JSONB and cast types
      const roomData: RoomData = {
        ...data,
        evidence: data.evidence as Record<Evidence, EvidenceState>,
        difficulty: data.difficulty as Difficulty,
        speed: data.speed as Speed,
        visibility: data.visibility as Visibility,
        bpm: data.bpm,
        spm: data.spm,
      };
      setRoom(roomData);
    }
    setLoading(false);
  }, []);

  // Create a new room
  const createRoom = useCallback(async (): Promise<string | null> => {
    setLoading(true);
    setError(null);
    
    const code = generateRoomCode();
    const evidence = defaultEvidence();
    
    const { data, error: createError } = await supabase
      .from("rooms")
      .insert({
        code,
        evidence,
        difficulty: "amateur",
      })
      .select()
      .single();
    
    if (createError) {
      setError("Failed to create room");
      setLoading(false);
      return null;
    }
    
    const roomData: RoomData = {
      ...data,
      evidence: data.evidence as Record<Evidence, EvidenceState>,
      difficulty: data.difficulty as Difficulty,
      speed: data.speed as Speed,
      visibility: data.visibility as Visibility,
      bpm: data.bpm,
      spm: data.spm,
    };
    setRoom(roomData);
    setLoading(false);
    return code;
  }, []);

  // Check if room exists
  const checkRoom = useCallback(async (code: string): Promise<boolean> => {
    const { data, error: checkError } = await supabase
      .from("rooms")
      .select("id")
      .eq("code", code)
      .single();
    
    return !checkError && data !== null;
  }, []);

  // Update evidence
  const updateEvidence = useCallback(async (evidence: Record<Evidence, EvidenceState>) => {
    if (!room) return;
    
    const { error: updateError } = await supabase
      .from("rooms")
      .update({ evidence })
      .eq("code", room.code);
    
    if (updateError) {
      toast.error("Failed to sync evidence");
    }
  }, [room]);

  // Update difficulty
  const updateDifficulty = useCallback(async (difficulty: Difficulty) => {
    if (!room) return;
    
    const { error: updateError } = await supabase
      .from("rooms")
      .update({ difficulty })
      .eq("code", room.code);
    
    if (updateError) {
      toast.error("Failed to sync difficulty");
    }
  }, [room]);

  // Update speed
  const updateSpeed = useCallback(async (speed: Speed) => {
    if (!room) return;
    
    const { error: updateError } = await supabase
      .from("rooms")
      .update({ speed })
      .eq("code", room.code);
    
    if (updateError) {
      toast.error("Failed to sync speed");
    }
  }, [room]);

  // Update visibility
  const updateVisibility = useCallback(async (visibility: Visibility) => {
    if (!room) return;
    
    const { error: updateError } = await supabase
      .from("rooms")
      .update({ visibility })
      .eq("code", room.code);
    
    if (updateError) {
      toast.error("Failed to sync visibility");
    }
  }, [room]);

  // Update BPM
  const updateBpm = useCallback(async (bpm: number | null) => {
    if (!room) return;
    
    const { error: updateError } = await supabase
      .from("rooms")
      .update({ bpm })
      .eq("code", room.code);
    
    if (updateError) {
      toast.error("Failed to sync BPM");
    }
  }, [room]);

  // Update SPM
  const updateSpm = useCallback(async (spm: number | null) => {
    if (!room) return;
    
    const { error: updateError } = await supabase
      .from("rooms")
      .update({ spm })
      .eq("code", room.code);
    
    if (updateError) {
      toast.error("Failed to sync footsteps");
    }
  }, [room]);

  // Reset room evidence
  const resetEvidence = useCallback(async () => {
    if (!room) return;
    
    const evidence = defaultEvidence();
    const { error: updateError } = await supabase
      .from("rooms")
      .update({ evidence, speed: null, visibility: null, bpm: null, spm: null })
      .eq("code", room.code);
    
    if (updateError) {
      toast.error("Failed to reset evidence");
    } else {
      toast.success("Evidence reset for all players");
    }
  }, [room]);

  // Delete a room (cleanup when empty)
  const deleteRoom = useCallback(async (code: string): Promise<boolean> => {
    const { error: deleteError } = await supabase
      .from("rooms")
      .delete()
      .eq("code", code);
    
    if (deleteError) {
      console.warn("Failed to delete room:", deleteError);
      return false;
    }
    return true;
  }, []);

  // Subscribe to realtime updates
  useEffect(() => {
    if (!roomCode) return;

    fetchRoom(roomCode);

    const channel = supabase
      .channel(`room-${roomCode}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "rooms",
          filter: `code=eq.${roomCode}`,
        },
        (payload) => {
          const newData = payload.new as any;
          setRoom({
            ...newData,
            evidence: newData.evidence as Record<Evidence, EvidenceState>,
            difficulty: newData.difficulty as Difficulty,
            speed: newData.speed as Speed,
            visibility: newData.visibility as Visibility,
            bpm: newData.bpm,
            spm: newData.spm,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomCode, fetchRoom]);

  return {
    room,
    loading,
    error,
    createRoom,
    checkRoom,
    fetchRoom,
    updateEvidence,
    updateDifficulty,
    updateSpeed,
    updateVisibility,
    updateBpm,
    updateSpm,
    resetEvidence,
    deleteRoom,
  };
};
