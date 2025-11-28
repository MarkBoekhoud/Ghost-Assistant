import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { EvidenceSelector } from "@/components/EvidenceSelector";
import { AbilitySelector } from "@/components/AbilitySelector";
import { GhostCard } from "@/components/GhostCard";
import { BPMTracker } from "@/components/BPMTracker";
import { FootstepsTracker } from "@/components/FootstepsTracker";
import { ghostDatabase, evidenceList, abilityList, Evidence, Ability, EvidenceState } from "@/data/ghostData";
import { RotateCcw, Ghost } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [evidenceStates, setEvidenceStates] = useState<Record<Evidence, EvidenceState>>(
    () => Object.fromEntries(evidenceList.map(e => [e, "unknown"])) as Record<Evidence, EvidenceState>
  );
  const [selectedAbilities, setSelectedAbilities] = useState<Ability[]>([]);
  const [bpm, setBpm] = useState<number | null>(null);
  const [spm, setSpm] = useState<number | null>(null);

  const cycleEvidenceState = (evidence: Evidence) => {
    setEvidenceStates((prev) => {
      const currentState = prev[evidence];
      let nextState: EvidenceState;
      
      switch (currentState) {
        case "unknown":
          nextState = "present";
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

  // Calculate possible ghosts based on all filters
  const possibleGhosts = useMemo(() => {
    return ghostDatabase.filter((ghost) => {
      // Check evidence: present evidence must be in ghost's evidence
      const presentEvidence = evidenceList.filter(e => evidenceStates[e] === "present");
      const excludedEvidence = evidenceList.filter(e => evidenceStates[e] === "excluded");
      
      // All present evidence must be in ghost's evidence list
      const presentMatch = presentEvidence.every((evidence) =>
        ghost.evidence.includes(evidence)
      );
      
      // Ghost cannot have any excluded evidence
      const excludedMatch = excludedEvidence.every((evidence) =>
        !ghost.evidence.includes(evidence)
      );

      // Check abilities
      const abilityMatch = selectedAbilities.every((ability) =>
        ghost.abilities.includes(ability)
      );

      // Check BPM range
      const bpmMatch = bpm === null || !ghost.bpmRange || 
        (bpm >= ghost.bpmRange.min && bpm <= ghost.bpmRange.max);

      // Check SPM range
      const spmMatch = spm === null || !ghost.spmRange || 
        (spm >= ghost.spmRange.min && spm <= ghost.spmRange.max);

      return presentMatch && excludedMatch && abilityMatch && bpmMatch && spmMatch;
    });
  }, [evidenceStates, selectedAbilities, bpm, spm]);

  // Calculate which evidence should be disabled (impossible based on current selections)
  const disabledEvidence = useMemo(() => {
    const disabled: Evidence[] = [];
    
    evidenceList.forEach((evidence) => {
      // Skip if already selected or excluded
      if (evidenceStates[evidence] !== "unknown") return;
      
      // Check if any remaining possible ghost could have this evidence
      const couldHaveEvidence = possibleGhosts.some((ghost) =>
        ghost.evidence.includes(evidence)
      );
      
      if (!couldHaveEvidence && possibleGhosts.length > 0) {
        disabled.push(evidence);
      }
    });
    
    return disabled;
  }, [possibleGhosts, evidenceStates]);

  const handleReset = () => {
    setEvidenceStates(
      Object.fromEntries(evidenceList.map(e => [e, "unknown"])) as Record<Evidence, EvidenceState>
    );
    setSelectedAbilities([]);
    setBpm(null);
    setSpm(null);
    toast.success("Selectie gereset");
  };

  const hasActiveFilters = 
    Object.values(evidenceStates).some(s => s !== "unknown") || 
    selectedAbilities.length > 0 || 
    bpm !== null || 
    spm !== null;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center gap-3">
            <Ghost className="w-10 h-10 text-primary animate-ghost-glow" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Ghost Assistant
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Vink bewijs aan en selecteer gedrag om te ontdekken met welke ghost je te maken hebt
          </p>
        </header>

        {/* Selectors */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg border border-border">
              <EvidenceSelector
                evidenceList={evidenceList}
                evidenceStates={evidenceStates}
                disabledEvidence={disabledEvidence}
                onToggle={cycleEvidenceState}
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <BPMTracker onBPMChange={setBpm} />
              <FootstepsTracker onSPMChange={setSpm} />
            </div>
          </div>

          <div className="bg-card p-6 rounded-lg border border-border">
            <AbilitySelector
              abilityList={abilityList}
              selectedAbilities={selectedAbilities}
              onToggle={toggleAbility}
            />
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">
              Mogelijke Ghosts
            </h2>
            <p className="text-muted-foreground mt-1">
              {possibleGhosts.length === ghostDatabase.length
                ? "Selecteer bewijs en eigenschappen om te filteren"
                : `${possibleGhosts.length} ghost${possibleGhosts.length !== 1 ? "s" : ""} mogelijk`}
            </p>
          </div>
          <Button
            onClick={handleReset}
            variant="outline"
            size="lg"
            disabled={!hasActiveFilters}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        {/* Ghost Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {possibleGhosts.map((ghost) => (
            <GhostCard key={ghost.name} ghost={ghost} />
          ))}
        </div>

        {possibleGhosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Geen ghosts gevonden met deze combinatie. Controleer je selectie.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
