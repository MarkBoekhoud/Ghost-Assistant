import { useState, useMemo, useEffect } from "react";
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
import { ghostDatabase, evidenceList, abilityList, Evidence, Ability, EvidenceState, Speed as GhostSpeed, VisibilityType } from "@/data/ghostData";
import { RotateCcw, Ghost, ChevronDown, ArrowLeft, Users, Copy, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRoom } from "@/hooks/useRoom";

const Room = () => {
  const { roomCode } = useParams<{ roomCode: string }>();
  const navigate = useNavigate();
  const { room, loading, error, updateEvidence, updateDifficulty, resetEvidence, deleteRoom } = useRoom(roomCode);

  // Local state for non-synced features
  const [selectedAbilities, setSelectedAbilities] = useState<Ability[]>([]);
  const [isLeaving, setIsLeaving] = useState(false);
  const [selectedSpeed, setSelectedSpeed] = useState<Speed>(null);
  const [selectedVisibility, setSelectedVisibility] = useState<Visibility>(null);
  const [bpm, setBpm] = useState<number | null>(null);
  const [spm, setSpm] = useState<number | null>(null);

  // Get synced state from room
  const difficulty = room?.difficulty || "amateur";
  const evidenceStates = room?.evidence || 
    (Object.fromEntries(evidenceList.map(e => [e, "unknown"])) as Record<Evidence, EvidenceState>);

  const presentEvidenceCount = useMemo(() => {
    return evidenceList.filter(e => evidenceStates[e] === "present").length;
  }, [evidenceStates]);

  const mimicStillPossible = useMemo(() => {
    const presentEvidence = evidenceList.filter(e => evidenceStates[e] === "present");
    const excludedEvidence = evidenceList.filter(e => evidenceStates[e] === "excluded");
    const mimic = ghostDatabase.find(g => g.name === "The Mimic");
    
    if (!mimic) return false;
    
    const mimicMainEvidence: Evidence[] = ["Freezing Temps", "Spirit Box", "Fingerprints"];
    const mimicAllEvidence: Evidence[] = [...mimicMainEvidence, "Ghost Orbs"];
    
    const presentMatch = presentEvidence.every(e => mimicAllEvidence.includes(e));
    const excludedMatch = !excludedEvidence.some(e => mimicAllEvidence.includes(e));
    
    return presentMatch && excludedMatch;
  }, [evidenceStates]);

  const selectedMimicMainEvidence = useMemo(() => {
    const mimicMainEvidence: Evidence[] = ["Freezing Temps", "Spirit Box", "Fingerprints"];
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

  const toggleAbility = (ability: Ability) => {
    setSelectedAbilities((prev) =>
      prev.includes(ability)
        ? prev.filter((a) => a !== ability)
        : [...prev, ability]
    );
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
      if (ghost.guaranteedEvidence && baseMaxEvidence < 3 && presentEvidenceCount >= baseMaxEvidence) {
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
    });
  }, [evidenceStates, selectedAbilities, selectedSpeed, selectedVisibility, bpm, spm, presentEvidenceCount, baseMaxEvidence]);

  const disabledEvidence = useMemo(() => {
    const disabled: Evidence[] = [];
    const atBaseMax = presentEvidenceCount >= baseMaxEvidence;
    const atMimicMax = presentEvidenceCount >= maxEvidence;
    
    const mimicMainEvidence: Evidence[] = ["Freezing Temps", "Spirit Box", "Fingerprints"];
    const mimicProtectedEvidence: Evidence[] = mimicStillPossible
      ? selectedMimicMainEvidence.length > 0
        ? [...selectedMimicMainEvidence, "Ghost Orbs"]
        : [...mimicMainEvidence, "Ghost Orbs"]
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
    setSelectedAbilities([]);
    setSelectedSpeed(null);
    setSelectedVisibility(null);
    setBpm(null);
    setSpm(null);
    // Notify local components (timers/trackers) to reset
    try {
      window.dispatchEvent(new Event("app-reset"));
    } catch (e) {}
  };

  const handleLeaveRoom = async () => {
    if (!roomCode) {
      navigate("/multiplayer");
      return;
    }
    
    setIsLeaving(true);
    try {
      const deleted = await deleteRoom(roomCode);
      if (deleted) {
        toast.success("Room deleted");
      } else {
        toast.error("Failed to delete room");
      }
    } catch (err) {
      console.error("Error deleting room:", err);
      toast.error("Error leaving room");
    } finally {
      navigate("/multiplayer");
      setIsLeaving(false);
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
    spm !== null;

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
            disabled={isLeaving}
          >
            {isLeaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Leaving...
              </>
            ) : (
              <>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Leave
              </>
            )}
          </Button>
          <div 
            className="flex items-center gap-2 bg-card px-3 py-1.5 rounded-lg border border-border cursor-pointer hover:bg-secondary transition-colors"
            onClick={handleCopyCode}
          >
            <Users className="w-4 h-4 text-primary" />
            <span className="font-mono font-bold text-foreground">{roomCode}</span>
            <Copy className="w-3 h-3 text-muted-foreground" />
          </div>
        </div>

        {/* Header */}
        <header className="text-center space-y-2 py-2 md:py-4">
          <div className="flex items-center justify-center gap-2">
            <Ghost className="w-8 h-8 md:w-10 md:h-10 text-primary animate-ghost-glow" />
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
            <SpeedSelector speed={selectedSpeed} onChange={setSelectedSpeed} />
            <VisibilitySelector visibility={selectedVisibility} onChange={setSelectedVisibility} />
          </div>

          {/* BPM & Footsteps Trackers */}
          <div className="grid grid-cols-2 gap-2 md:gap-4">
            <BPMTracker onBPMChange={setBpm} />
            <FootstepsTracker onSPMChange={setSpm} />
          </div>

          {/* Hunt Behavior */}
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
            <GhostCard key={ghost.name} ghost={ghost} />
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
