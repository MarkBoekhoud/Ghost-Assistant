import { useState, useMemo, useEffect } from "react";
import { useScrollRestoration } from "@/hooks/useScrollRestoration";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { EvidenceSelector } from "@/components/EvidenceSelector";
import { AbilitySelector } from "@/components/AbilitySelector"; 
import { GhostCard } from "@/components/GhostCard";
import { BPMTracker } from "@/components/BPMTracker";
import { FootstepsTracker } from "@/components/FootstepsTracker";
import { DifficultySelector, Difficulty, getEvidenceCount } from "@/components/DifficultySelector";
import { SpeedSelector, Speed } from "@/components/SpeedSelector";
import { VisibilitySelector, Visibility } from "@/components/VisibilitySelector";
import { PlayerPresence } from "@/components/PlayerPresence";
import { AppLogo } from "@/components/AppLogo";
import { NameInputDialog } from "@/components/NameInputDialog";
import { ghostDatabase, evidenceList, abilityList, Ability, Evidence, EvidenceState, Speed as GhostSpeed, VisibilityType } from "@/data/ghostData";
import { RotateCcw, ChevronDown, ArrowLeft, Copy, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRoom } from "@/hooks/useRoom";
import { useRoomPresence } from "@/hooks/useRoomPresence";
import { supabase } from "@/integrations/supabase/client";

const Room = () => {
  const { roomCode } = useParams<{ roomCode: string }>();
  const navigate = useNavigate();
  const { 
    room, 
    loading, 
    error, 
    updateEvidence, 
    updateDifficulty, 
    updateSpeed, 
    updateVisibility, 
    updateBpm, 
    updateSpm, 
    resetEvidence, 
    toggleGhostExclusion,
    updateSelectedAbilities,
  } = useRoom(roomCode);

  const { players, playerId, playerName, setPlayerName, playerCount, broadcastNotification } = useRoomPresence(roomCode);
  useScrollRestoration({ ready: !loading });
  
  // Show name dialog if player hasn't set a custom name
  const [showNameDialog, setShowNameDialog] = useState(false);
  
  useEffect(() => {
    // Check if user needs to enter name (only show once per session for new rooms)
    const hasEnteredName = sessionStorage.getItem(`room-name-entered-${roomCode}`);
    if (!hasEnteredName && room) {
      setShowNameDialog(true);
    }
  }, [room, roomCode]);

  const handleNameSubmit = (name: string) => {
    setPlayerName(name);
    sessionStorage.setItem(`room-name-entered-${roomCode}`, "true");
    setShowNameDialog(false);
    toast.success(`Welcome, ${name}!`);
  };

  // Get synced state from room
  const difficulty = room?.difficulty || "amateur";
  const evidenceStates = room?.evidence || 
    (Object.fromEntries(evidenceList.map(e => [e, "unknown"])) as Record<Evidence, EvidenceState>);
  const selectedSpeed = room?.speed || null;
  const selectedVisibility = room?.visibility || null;
  const bpm = room?.bpm || null;
  const spm = room?.spm || null;
  
  // FIX: Hier voegen we 'as Ability[]' toe om TypeScript gerust te stellen
  const selectedAbilities = (room?.selectedAbilities || []) as Ability[];
  
  const excludedGhosts = room?.excludedGhosts || [];

  const toggleAbility = (ability: Ability) => {
    // Omdat selectedAbilities nu als Ability[] wordt gezien, werkt dit ook correct
    const newAbilities = selectedAbilities.includes(ability)
      ? selectedAbilities.filter(a => a !== ability)
      : [...selectedAbilities, ability];
    updateSelectedAbilities(newAbilities);
  };

  const presentEvidenceCount = useMemo(() => {
    return evidenceList.filter(e => evidenceStates[e] === "present").length;
  }, [evidenceStates]);

  const mimicStillPossible = useMemo(() => {
    const presentEvidence = evidenceList.filter(e => evidenceStates[e] === "present");
    const excludedEvidence = evidenceList.filter(e => evidenceStates[e] === "excluded");
    const mimic = ghostDatabase.find(g => g.name === "The Mimic");
    
    if (!mimic) return false;
    
    const mimicMainEvidence: Evidence[] = ["Freezing Temps", "Spirit Box", "Ultraviolet"];
    const mimicAllEvidence: Evidence[] = [...mimicMainEvidence, "Ghost Orbs"];
    
    const presentMatch = presentEvidence.every(e => mimicAllEvidence.includes(e));
    const excludedMatch = !excludedEvidence.some(e => mimicAllEvidence.includes(e));
    
    return presentMatch && excludedMatch;
  }, [evidenceStates]);

  const selectedMimicMainEvidence = useMemo(() => {
    const mimicMainEvidence: Evidence[] = ["Freezing Temps", "Spirit Box", "Ultraviolet"];
    return mimicMainEvidence.filter(e => evidenceStates[e] === "present");
  }, [evidenceStates]);

  const baseMaxEvidence = getEvidenceCount(difficulty, false);
  const maxEvidence = getEvidenceCount(difficulty, mimicStillPossible);

  const cycleEvidenceState = (evidence: Evidence) => {
    const currentState = evidenceStates[evidence];
    let nextState: EvidenceState;
    
    switch (currentState) {
      case "unknown":
        if (presentEvidenceCount >= maxEvidence) {
          nextState = "excluded";
        } else {
          nextState = "present";
        }
        break;
      case "present":
        nextState = "excluded";
        break;
      case "excluded":
        nextState = "unknown";
        break;
      default:
        nextState = "unknown";
    }
    
    const newEvidence = { ...evidenceStates, [evidence]: nextState };
    updateEvidence(newEvidence);
  };

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    updateDifficulty(newDifficulty);
  };

  const mapSpeedToGhostSpeed = (speed: Speed): GhostSpeed | null => {
    switch (speed) {
      case "slow": return "Slow";
      case "normal": return "Normal";
      case "fast": return "Fast";
      default: return null;
    }
  };

  const mapVisibilityToGhostVisibility = (visibility: Visibility): VisibilityType | null => {
    switch (visibility) {
      case "visible": return "Visible";
      case "invisible": return "Invisible";
      case "normal": return "Normal";
      default: return null;
    }
  };

  const possibleGhosts = useMemo(() => {
    const exceedsBaseLimit = presentEvidenceCount > baseMaxEvidence;
    const presentEvidence = evidenceList.filter(e => evidenceStates[e] === "present");
    const excludedEvidence = evidenceList.filter(e => evidenceStates[e] === "excluded");
    
    return ghostDatabase.filter((ghost) => {
      if (exceedsBaseLimit && ghost.name !== "The Mimic") {
        return false;
      }
      
      const presentMatch = presentEvidence.every((evidence) =>
        ghost.evidence.includes(evidence)
      );
      
      const excludedMatch = excludedEvidence.every((evidence) =>
        !ghost.evidence.includes(evidence)
      );

      let guaranteedMatch = true;
      if (ghost.guaranteedEvidence && ghost.name !== "The Mimic" && baseMaxEvidence < 3 && presentEvidenceCount >= baseMaxEvidence) {
        guaranteedMatch = ghost.guaranteedEvidence.every(ge => presentEvidence.includes(ge));
      }

      const abilityMatch = selectedAbilities.every((ability) =>
        ghost.abilities.includes(ability)
      );

      const ghostSpeed = mapSpeedToGhostSpeed(selectedSpeed);
      const speedMatch = ghostSpeed === null || ghost.speed.includes(ghostSpeed);

      const ghostVisibility = mapVisibilityToGhostVisibility(selectedVisibility);
      const visibilityMatch = ghostVisibility === null || ghost.visibility.includes(ghostVisibility);

      const bpmMatch = bpm === null || !ghost.bpmRange || 
        (bpm >= ghost.bpmRange.min && bpm <= ghost.bpmRange.max);

      const spmMatch = spm === null || !ghost.spmRange || 
        (spm >= ghost.spmRange.min && spm <= ghost.spmRange.max);

      return presentMatch && excludedMatch && guaranteedMatch && abilityMatch && speedMatch && visibilityMatch && bpmMatch && spmMatch;
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [evidenceStates, selectedAbilities, selectedSpeed, selectedVisibility, bpm, spm, presentEvidenceCount, baseMaxEvidence]);

  const disabledEvidence = useMemo(() => {
    const disabled: Evidence[] = [];
    const atBaseMax = presentEvidenceCount >= baseMaxEvidence;
    const atMimicMax = presentEvidenceCount >= maxEvidence;
    
    const mimicMainEvidence: Evidence[] = ["Freezing Temps", "Spirit Box", "Ultraviolet"];
    
    const mimicProtectedEvidence: Evidence[] = mimicStillPossible
      ? selectedMimicMainEvidence.length > 0
        ? [...selectedMimicMainEvidence, "Ghost Orbs" as Evidence]
        : [...mimicMainEvidence, "Ghost Orbs" as Evidence]
      : [];
    
    evidenceList.forEach((evidence) => {
      if (evidenceStates[evidence] !== "unknown") return;
      
      const isProtectedByMimic = mimicProtectedEvidence.includes(evidence);
      
      if (isProtectedByMimic) {
        if (atMimicMax) {
          disabled.push(evidence);
        }
      } else {
        if (atBaseMax) {
          disabled.push(evidence);
          return;
        }
        
        const couldHaveEvidence = possibleGhosts.some((ghost) =>
          ghost.evidence.includes(evidence)
        );
        
        if (!couldHaveEvidence && possibleGhosts.length > 0) {
          disabled.push(evidence);
        }
      }
    });
    
    return disabled;
  }, [possibleGhosts, evidenceStates, presentEvidenceCount, maxEvidence, mimicStillPossible, selectedMimicMainEvidence, baseMaxEvidence]);

  const handleReset = () => {
    resetEvidence();
    broadcastNotification("success", "Evidence reset", "reset-evidence");
    try {
      window.dispatchEvent(new Event("app-reset"));
    } catch (e) {}
  };

  const handleLeaveRoom = async () => {
    try {
      if (players.length <= 1 && roomCode) {
        console.log("Laatste speler vertrekt, room wordt verwijderd...");
        const { error } = await supabase
          .from('rooms')
          .delete()
          .eq('code', roomCode);

        if (error) {
          console.error("Kon room niet verwijderen:", error);
        }
      }
    } catch (error) {
      console.error("Error during leave:", error);
    } finally {
      navigate("/multiplayer");
      toast.success("Left room");
    }
  };

  const handleCopyCode = () => {
    if (roomCode) {
      navigator.clipboard.writeText(roomCode);
      toast.success("Room code copied!");
    }
  };

  const hasActiveFilters = 
    Object.values(evidenceStates).some(s => s !== "unknown") || 
    selectedAbilities.length > 0 || 
    selectedSpeed !== null ||
    selectedVisibility !== null ||
    bpm !== null || 
    spm !== null ||
    excludedGhosts.length > 0;

  const scrollToGhosts = () => {
    document.getElementById('ghost-results')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className="min-h-screen bg-background p-6 flex flex-col items-center justify-center gap-4">
        <p className="text-destructive text-lg">{error || "Room not found"}</p>
        <Button onClick={() => navigate("/multiplayer")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Lobby
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-3 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Room Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLeaveRoom}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Leave
          </Button>
          <div className="flex items-center gap-2">
            <PlayerPresence players={players} currentPlayerId={playerId} />
            <div 
              className="flex items-center gap-2 bg-card px-3 py-1.5 rounded-lg border border-border cursor-pointer hover:bg-secondary transition-colors"
              onClick={handleCopyCode}
            >
              <span className="font-mono font-bold text-foreground">{roomCode}</span>
              <Copy className="w-3 h-3 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Mobile: always-visible player list */}
        <section className="sm:hidden bg-card rounded-lg border border-border p-3">
          <p className="text-xs font-semibold text-muted-foreground mb-2">Players in room</p>
          <div className="flex flex-wrap gap-2">
            {players.map((p) => (
              <div
                key={p.id}
                className={`px-2.5 py-1 rounded-full border text-sm truncate max-w-[45vw] ${
                  p.id === playerId
                    ? "bg-primary/10 border-primary/30 text-primary"
                    : "bg-background border-border text-foreground"
                }`}
              >
                {p.name}{p.id === playerId ? " (you)" : ""}
              </div>
            ))}
          </div>
        </section>

        {/* Name Input Dialog */}
        <NameInputDialog 
          open={showNameDialog} 
          onSubmit={handleNameSubmit}
          onClose={() => {
            // Generate a default name if closed without entering
            const defaultName = `Player${Math.floor(Math.random() * 1000)}`;
            setPlayerName(defaultName);
            sessionStorage.setItem(`room-name-entered-${roomCode}`, "true");
            setShowNameDialog(false);
          }}
        />

        {/* Header */}
        <header className="text-center space-y-2 py-2 md:py-4">
          <div className="flex items-center justify-center gap-2">
            <AppLogo size="md" />
            <h1 className="text-2xl md:text-4xl font-bold text-foreground">
              Ghost Assistant
            </h1>
          </div>
          <p className="text-muted-foreground text-sm md:text-base">
            <span className="text-primary">Multiplayer</span> - Evidence syncs in real-time
          </p>
        </header>

        {/* Difficulty Selector */}
        <div className="bg-card p-3 rounded-lg border border-border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <DifficultySelector difficulty={difficulty} onChange={handleDifficultyChange} />
            <p className="text-xs text-muted-foreground">
              {presentEvidenceCount}/{maxEvidence} evidence selected
            </p>
          </div>
        </div>

        {/* Selectors Grid */}
        <div className="grid gap-3 md:gap-4">
          {/* Evidence */}
          <div className="bg-card p-4 rounded-lg border border-border">
            <EvidenceSelector
              evidenceList={evidenceList}
              evidenceStates={evidenceStates}
              disabledEvidence={disabledEvidence}
              onToggle={cycleEvidenceState}
            />
          </div>
          
          {/* Speed & Visibility */}
          <div className="grid grid-cols-2 gap-2 md:gap-4">
            <SpeedSelector speed={selectedSpeed} onChange={updateSpeed} />
            <VisibilitySelector visibility={selectedVisibility} onChange={updateVisibility} />
          </div>

          {/* BPM & Footsteps Trackers */}
          <div className="grid grid-cols-2 gap-2 md:gap-4">
            <BPMTracker onBPMChange={updateBpm} bpmValue={bpm} />
            <FootstepsTracker onSPMChange={updateSpm} spmValue={spm} />
          </div>

          {/* Ability (Hunt Timing) Selector */}
          {abilityList.length > 0 && (
            <div className="bg-card p-3 rounded-lg border border-border">
              <AbilitySelector
                abilityList={abilityList}
                selectedAbilities={selectedAbilities}
                onToggle={toggleAbility}
              />
            </div>
          )}
        </div>

        {/* Mobile Quick Jump Button */}
        <div className="md:hidden sticky bottom-4 z-10">
          <Button 
            onClick={scrollToGhosts}
            className="w-full shadow-lg"
            size="lg"
            >
            <span>View {possibleGhosts.length} ghost{possibleGhosts.length !== 1 ? "s" : ""}</span>
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Results Header */}
        <div id="ghost-results" className="flex items-center justify-between pt-2">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground">
              Possible Ghosts
            </h2>
            <p className="text-muted-foreground text-sm mt-0.5">
              {possibleGhosts.length === ghostDatabase.length
                ? "Select filters to narrow down"
                : `${possibleGhosts.length} ghost${possibleGhosts.length !== 1 ? "s" : ""} possible`}
              {excludedGhosts.length > 0 && (
                <span className="ml-2 text-warning">• {excludedGhosts.length} excluded</span>
              )}
            </p>
          </div>
          <Button
            onClick={handleReset}
            variant="outline"
            size="sm"
            disabled={!hasActiveFilters}
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </Button>
        </div>

        {/* Ghost Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
          {possibleGhosts.map((ghost) => (
            <GhostCard 
              key={ghost.name} 
              ghost={ghost} 
              isExcluded={excludedGhosts.includes(ghost.name)}
              onToggleExclude={() => toggleGhostExclusion(ghost.name)}
              showExcludeButton={true}
            />
          ))}
        </div>

        {possibleGhosts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No ghosts found with this combination.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Room;