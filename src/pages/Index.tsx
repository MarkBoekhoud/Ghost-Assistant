import { useState, useMemo } from "react";
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
import { RotateCcw, Ghost, ChevronDown } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>("amateur");
  const [evidenceStates, setEvidenceStates] = useState<Record<Evidence, EvidenceState>>(
    () => Object.fromEntries(evidenceList.map(e => [e, "unknown"])) as Record<Evidence, EvidenceState>
  );
  const [selectedAbilities, setSelectedAbilities] = useState<Ability[]>([]);
  const [selectedSpeed, setSelectedSpeed] = useState<Speed>(null);
  const [selectedVisibility, setSelectedVisibility] = useState<Visibility>(null);
  const [bpm, setBpm] = useState<number | null>(null);
  const [spm, setSpm] = useState<number | null>(null);

  const presentEvidenceCount = useMemo(() => {
    return evidenceList.filter(e => evidenceStates[e] === "present").length;
  }, [evidenceStates]);

  // Check if Mimic is still possible based on current evidence
  const mimicStillPossible = useMemo(() => {
    const presentEvidence = evidenceList.filter(e => evidenceStates[e] === "present");
    const excludedEvidence = evidenceList.filter(e => evidenceStates[e] === "excluded");
    const mimic = ghostDatabase.find(g => g.name === "The Mimic");
    
    if (!mimic) return false;
    
    // Mimic's main evidence + Ghost Orbs
    const mimicMainEvidence: Evidence[] = ["Freezing Temps", "Spirit Box", "Fingerprints"];
    const mimicAllEvidence: Evidence[] = [...mimicMainEvidence, "Ghost Orbs"];
    
    // Check if any present evidence is NOT in Mimic's possible evidence
    const presentMatch = presentEvidence.every(e => mimicAllEvidence.includes(e));
    
    // Check if any of Mimic's required evidence is excluded
    const excludedMatch = !excludedEvidence.some(e => mimicAllEvidence.includes(e));
    
    return presentMatch && excludedMatch;
  }, [evidenceStates]);

  // Check if any Mimic main evidence is selected
  const selectedMimicMainEvidence = useMemo(() => {
    const mimicMainEvidence: Evidence[] = ["Freezing Temps", "Spirit Box", "Fingerprints"];
    return mimicMainEvidence.filter(e => evidenceStates[e] === "present");
  }, [evidenceStates]);

  const maxEvidence = getEvidenceCount(difficulty, mimicStillPossible);

  const cycleEvidenceState = (evidence: Evidence) => {
    setEvidenceStates((prev) => {
      const currentState = prev[evidence];
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
      
      return { ...prev, [evidence]: nextState };
    });
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
    return ghostDatabase.filter((ghost) => {
      const presentEvidence = evidenceList.filter(e => evidenceStates[e] === "present");
      const excludedEvidence = evidenceList.filter(e => evidenceStates[e] === "excluded");
      
      const presentMatch = presentEvidence.every((evidence) =>
        ghost.evidence.includes(evidence)
      );
      
      const excludedMatch = excludedEvidence.every((evidence) =>
        !ghost.evidence.includes(evidence)
      );

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

      return presentMatch && excludedMatch && abilityMatch && speedMatch && visibilityMatch && bpmMatch && spmMatch;
    });
  }, [evidenceStates, selectedAbilities, selectedSpeed, selectedVisibility, bpm, spm]);

  const disabledEvidence = useMemo(() => {
    const disabled: Evidence[] = [];
    const atMaxPresent = presentEvidenceCount >= maxEvidence;
    
    const mimicMainEvidence: Evidence[] = ["Freezing Temps", "Spirit Box", "Fingerprints"];
    const mimicProtectedEvidence: Evidence[] = mimicStillPossible
      ? selectedMimicMainEvidence.length > 0
        ? [...selectedMimicMainEvidence, "Ghost Orbs"] // Only protect selected + Ghost Orbs
        : [...mimicMainEvidence, "Ghost Orbs"] // Protect all Mimic evidence
      : [];
    
    evidenceList.forEach((evidence) => {
      if (evidenceStates[evidence] !== "unknown") return;
      
      // Never disable Mimic-protected evidence while Mimic is possible
      const isProtectedByMimic = mimicProtectedEvidence.includes(evidence);
      
      // Disable if at max evidence limit (unless protected by Mimic)
      if (atMaxPresent && !isProtectedByMimic) {
        disabled.push(evidence);
        return;
      }
      
      // Disable if no ghost can have this evidence (unless protected by Mimic)
      const couldHaveEvidence = possibleGhosts.some((ghost) =>
        ghost.evidence.includes(evidence)
      );
      
      if (!couldHaveEvidence && possibleGhosts.length > 0 && !isProtectedByMimic) {
        disabled.push(evidence);
      }
    });
    
    return disabled;
  }, [possibleGhosts, evidenceStates, presentEvidenceCount, maxEvidence, mimicStillPossible, selectedMimicMainEvidence]);

  const handleReset = () => {
    setEvidenceStates(
      Object.fromEntries(evidenceList.map(e => [e, "unknown"])) as Record<Evidence, EvidenceState>
    );
    setSelectedAbilities([]);
    setSelectedSpeed(null);
    setSelectedVisibility(null);
    setBpm(null);
    setSpm(null);
    toast.success("Selection reset");
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

  return (
    <div className="min-h-screen bg-background p-3 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <header className="text-center space-y-2 py-4 md:py-6">
          <div className="flex items-center justify-center gap-2">
            <Ghost className="w-8 h-8 md:w-10 md:h-10 text-primary animate-ghost-glow" />
            <h1 className="text-2xl md:text-4xl font-bold text-foreground">
              Ghost Assistant
            </h1>
          </div>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            Filter by evidence and traits to identify the ghost
          </p>
        </header>

        {/* Difficulty Selector */}
        <div className="bg-card p-3 rounded-lg border border-border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <DifficultySelector difficulty={difficulty} onChange={setDifficulty} />
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

export default Index;
