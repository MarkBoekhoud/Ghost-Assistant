import { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { EvidenceSelector } from "@/components/EvidenceSelector";
import { AbilitySelector } from "@/components/AbilitySelector";
import { GhostCard } from "@/components/GhostCard";
import { BPMTracker } from "@/components/BPMTracker";
import { FootstepsTracker } from "@/components/FootstepsTracker";
import { DifficultySelector, Difficulty, getEvidenceCount } from "@/components/DifficultySelector";
import { SpeedSelector, Speed } from "@/components/SpeedSelector";
import { VisibilitySelector, Visibility } from "@/components/VisibilitySelector";
import { AppLogo } from "@/components/AppLogo";
import { useScrollRestoration } from "@/hooks/useScrollRestoration";
import { ghostDatabase, evidenceList, abilityList, Evidence, Ability, EvidenceState, Speed as GhostSpeed, VisibilityType } from "@/data/ghostData";
import { RotateCcw, ChevronDown, Users, Info } from "lucide-react";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const Index = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  useScrollRestoration();

  const parseList = (value: string | null) =>
    value ? value.split(",").map(v => decodeURIComponent(v)).filter(Boolean) : [];

  const initDifficulty = (): Difficulty => (searchParams.get("difficulty") as Difficulty) || "amateur";

  const initEvidenceStates = (): Record<Evidence, EvidenceState> => {
    const base = Object.fromEntries(evidenceList.map(e => [e, "unknown"])) as Record<Evidence, EvidenceState>;
    const present = parseList(searchParams.get("present"));
    const excluded = parseList(searchParams.get("excluded"));

    present.forEach((p) => {
      if (p in base) base[p as Evidence] = "present";
    });
    excluded.forEach((e) => {
      if (e in base) base[e as Evidence] = "excluded";
    });

    return base;
  };

  const initAbilities = (): Ability[] => parseList(searchParams.get("abilities")) as Ability[];
  const initSpeed = (): Speed => (searchParams.get("speed") as Speed) || null;
  const initVisibility = (): Visibility => (searchParams.get("visibility") as Visibility) || null;
  const initBpm = (): number | null => {
    const v = searchParams.get("bpm");
    return v ? Number(v) : null;
  };
  const initSpm = (): number | null => {
    const v = searchParams.get("spm");
    return v ? Number(v) : null;
  };
  const initExcludedGhosts = (): string[] => parseList(searchParams.get("excludedGhosts"));

  const [difficulty, setDifficulty] = useState<Difficulty>(initDifficulty);
  const [evidenceStates, setEvidenceStates] = useState<Record<Evidence, EvidenceState>>(initEvidenceStates);
  const [selectedAbilities, setSelectedAbilities] = useState<Ability[]>(initAbilities);
  const [selectedSpeed, setSelectedSpeed] = useState<Speed>(initSpeed);
  const [selectedVisibility, setSelectedVisibility] = useState<Visibility>(initVisibility);
  const [bpm, setBpm] = useState<number | null>(initBpm);
  const [spm, setSpm] = useState<number | null>(initSpm);
  const [excludedGhosts, setExcludedGhosts] = useState<string[]>(initExcludedGhosts);

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
    const mimicMainEvidence: Evidence[] = ["Freezing Temps", "Spirit Box", "Ultraviolet"];
    const mimicAllEvidence: Evidence[] = [...mimicMainEvidence, "Ghost Orbs"];
    
    // Check if any present evidence is NOT in Mimic's possible evidence
    const presentMatch = presentEvidence.every(e => mimicAllEvidence.includes(e));
    
    // Check if any of Mimic's required evidence is excluded
    const excludedMatch = !excludedEvidence.some(e => mimicAllEvidence.includes(e));
    
    return presentMatch && excludedMatch;
  }, [evidenceStates]);

  // Check if any Mimic main evidence is selected
  const selectedMimicMainEvidence = useMemo(() => {
    const mimicMainEvidence: Evidence[] = ["Freezing Temps", "Spirit Box", "Ultraviolet"];
    return mimicMainEvidence.filter(e => evidenceStates[e] === "present");
  }, [evidenceStates]);

  const baseMaxEvidence = getEvidenceCount(difficulty, false);
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
    const exceedsBaseLimit = presentEvidenceCount > baseMaxEvidence;
    const presentEvidence = evidenceList.filter(e => evidenceStates[e] === "present");
    const excludedEvidence = evidenceList.filter(e => evidenceStates[e] === "excluded");
    
    return ghostDatabase.filter((ghost) => {
      // If we exceed the base limit, only Mimic can be possible
      if (exceedsBaseLimit && ghost.name !== "The Mimic") {
        return false;
      }
      
      const presentMatch = presentEvidence.every((evidence) =>
        ghost.evidence.includes(evidence)
      );
      
      const excludedMatch = excludedEvidence.every((evidence) =>
        !ghost.evidence.includes(evidence)
      );

      // Check guaranteed evidence on reduced evidence difficulties
      // Skip this check for The Mimic - its Ghost Orbs are EXTRA evidence, not required
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
        ? [...selectedMimicMainEvidence, "Ghost Orbs"] // Only protect selected + Ghost Orbs
        : [...mimicMainEvidence, "Ghost Orbs"] // Protect all Mimic evidence
      : [];
    
    evidenceList.forEach((evidence) => {
      if (evidenceStates[evidence] !== "unknown") return;
      
      const isProtectedByMimic = mimicProtectedEvidence.includes(evidence);
      
      // Non-Mimic evidence: disable at base limit
      // Mimic-protected evidence: disable at mimic limit (base + 1)
      if (isProtectedByMimic) {
        if (atMimicMax) {
          disabled.push(evidence);
        }
      } else {
        if (atBaseMax) {
          disabled.push(evidence);
          return;
        }
        
        // Also disable if no ghost can have this evidence
        const couldHaveEvidence = possibleGhosts.some((ghost) =>
          ghost.evidence.includes(evidence)
        );
        
        if (!couldHaveEvidence && possibleGhosts.length > 0) {
          disabled.push(evidence);
        }
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
    setExcludedGhosts([]);
    toast.success("Selection reset");
    // Notify other components (timers/trackers) to reset
    try {
      window.dispatchEvent(new Event("app-reset"));
    } catch (e) {}
  };

  const toggleGhostExclusion = (ghostName: string) => {
    setExcludedGhosts(prev => 
      prev.includes(ghostName) 
        ? prev.filter(g => g !== ghostName)
        : [...prev, ghostName]
    );
  };

  // Sync state -> URL search params so selections are preserved when navigating
  useEffect(() => {
    const params = new URLSearchParams();
    if (difficulty) params.set("difficulty", difficulty);

    const present = Object.entries(evidenceStates)
      .filter(([, state]) => state === "present")
      .map(([e]) => encodeURIComponent(e));
    const excluded = Object.entries(evidenceStates)
      .filter(([, state]) => state === "excluded")
      .map(([e]) => encodeURIComponent(e));

    if (present.length) params.set("present", present.join(","));
    if (excluded.length) params.set("excluded", excluded.join(","));

    if (selectedAbilities.length) params.set("abilities", selectedAbilities.map(a => encodeURIComponent(a)).join(","));
    if (selectedSpeed) params.set("speed", selectedSpeed);
    if (selectedVisibility) params.set("visibility", selectedVisibility);
    if (bpm !== null && bpm !== undefined) params.set("bpm", String(bpm));
    if (spm !== null && spm !== undefined) params.set("spm", String(spm));
    if (excludedGhosts.length) params.set("excludedGhosts", excludedGhosts.map(g => encodeURIComponent(g)).join(","));

    // Replace so browser back/forward isn't flooded
    setSearchParams(params, { replace: true });
  }, [difficulty, evidenceStates, selectedAbilities, selectedSpeed, selectedVisibility, bpm, spm, excludedGhosts, setSearchParams]);

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

  return (
    <div className="min-h-screen bg-background p-3 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <header className="text-center space-y-2 py-4 md:py-6 relative">
          {/* Info Icon - Top Right */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="About Ghost Assistant"
                className="absolute top-4 right-0 text-muted-foreground hover:text-foreground min-w-[56px] min-h-[56px] w-14 h-14"
              >
                <Info className="w-7 h-7" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">About Ghost Assistant</h3>
                <p className="text-sm text-muted-foreground">
                  Ghost Assistant helps you identify ghost types in Phasmophobia. 
                  Select evidence, behaviors, and traits to narrow down which ghost you're dealing with.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 mt-2">
                  <li>• <strong>Evidence:</strong> Click to cycle through present/excluded/unknown</li>
                  <li>• <strong>Speed & Visibility:</strong> Filter by ghost movement patterns</li>
                  <li>• <strong>BPM/Footsteps:</strong> Tap to measure heartbeat or footstep speed</li>
                  <li>• <strong>Multiplayer:</strong> Collaborate with your team in real-time</li>
                </ul>
              </div>
            </PopoverContent>
          </Popover>

          <div className="flex items-center justify-center gap-2">
            <AppLogo size="md" />
            <h1 className="text-2xl md:text-4xl font-bold text-foreground">
              Ghost Assistant
            </h1>
          </div>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            Filter by evidence and traits to identify the ghost
          </p>
          <Button
            onClick={() => navigate("/multiplayer")}
            variant="outline"
            size="sm"
            className="mt-2"
          >
            <Users className="w-4 h-4 mr-2" />
            Multiplayer
          </Button>
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

export default Index;
