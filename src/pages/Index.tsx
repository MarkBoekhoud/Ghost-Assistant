import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { EvidenceSelector } from "@/components/EvidenceSelector";
import { AbilitySelector } from "@/components/AbilitySelector";
import { GhostCard } from "@/components/GhostCard";
import { BPMTracker } from "@/components/BPMTracker";
import { ghostDatabase, evidenceList, abilityList, Evidence, Ability } from "@/data/ghostData";
import { RotateCcw, Ghost } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence[]>([]);
  const [selectedAbilities, setSelectedAbilities] = useState<Ability[]>([]);
  const [bpm, setBpm] = useState<number | null>(null);

  const toggleEvidence = (evidence: Evidence) => {
    setSelectedEvidence((prev) =>
      prev.includes(evidence)
        ? prev.filter((e) => e !== evidence)
        : [...prev, evidence]
    );
  };

  const toggleAbility = (ability: Ability) => {
    setSelectedAbilities((prev) =>
      prev.includes(ability)
        ? prev.filter((a) => a !== ability)
        : [...prev, ability]
    );
  };

  const possibleGhosts = useMemo(() => {
    return ghostDatabase.filter((ghost) => {
      // Check if all selected evidence is in the ghost's evidence
      const evidenceMatch = selectedEvidence.every((evidence) =>
        ghost.evidence.includes(evidence)
      );

      // Check if all selected abilities are in the ghost's abilities
      const abilityMatch = selectedAbilities.every((ability) =>
        ghost.abilities.includes(ability)
      );

      // Check BPM range if BPM is set
      const bpmMatch = bpm === null || !ghost.bpmRange || 
        (bpm >= ghost.bpmRange.min && bpm <= ghost.bpmRange.max);

      return evidenceMatch && abilityMatch && bpmMatch;
    });
  }, [selectedEvidence, selectedAbilities, bpm]);

  const handleReset = () => {
    setSelectedEvidence([]);
    setSelectedAbilities([]);
    setBpm(null);
    toast.success("Selectie gereset");
  };

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
                selectedEvidence={selectedEvidence}
                onToggle={toggleEvidence}
              />
            </div>
            
            <BPMTracker onBPMChange={setBpm} />
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
            disabled={selectedEvidence.length === 0 && selectedAbilities.length === 0 && bpm === null}
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
