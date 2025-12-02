import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ghostDatabase } from "@/data/ghostData";
import { ArrowLeft, Ghost, Heart, Footprints, Zap, Shield, Lightbulb, Gauge, Eye, Brain } from "lucide-react";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { SmudgeTimer } from "@/components/SmudgeTimer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const speedLabels: Record<string, string> = {
  "Fast": "Fast",
  "Normal": "Normal",
  "Slow": "Slow"
};

const visibilityLabels: Record<string, string> = {
  "Visible": "Visible",
  "Invisible": "Invisible",
  "Shy": "Shy"
};

const GhostDetail = () => {
  const { ghostName } = useParams<{ ghostName: string }>();
  const navigate = useNavigate();

  const ghost = ghostDatabase.find(
    (g) => g.name.toLowerCase() === ghostName?.toLowerCase()
  );

  if (!ghost) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto">
          <Button onClick={() => navigate("/")} variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <p className="text-muted-foreground mt-4">Ghost not found.</p>
        </div>
      </div>
    );
  }

  const showSmudgeTimer = ghost.smudgeTimer !== undefined;

  return (
    <div className="min-h-screen bg-background p-3 md:p-6">
      <div className="max-w-4xl mx-auto space-y-3">
        {/* Back Button + Header */}
        <div className="flex items-center gap-3">
          <Button onClick={() => navigate("/")} variant="outline" size="icon" className="h-8 w-8 shrink-0">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Ghost className="w-6 h-6 text-primary animate-ghost-glow" />
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              {ghost.name}
            </h1>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground">{ghost.description}</p>

        {/* Evidence & Stats Grid */}
        <div className="grid grid-cols-2 gap-2">
          {/* Evidence */}
          <div className="bg-card rounded-lg border border-border p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold">Evidence</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {ghost.evidence.map((evidence) => (
                <EvidenceBadge key={evidence} evidence={evidence} />
              ))}
            </div>
          </div>

          {/* Hunt Sanity */}
          <div className="bg-card rounded-lg border border-border p-3 col-span-2">
            <div className="flex items-center gap-1.5 mb-2">
              <Brain className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-semibold">Hunt Sanity</span>
            </div>
            {ghost.huntSanity && ghost.huntSanity.length > 0 ? (
              <div className="space-y-1.5">
                {ghost.huntSanity.map((sanity, index) => (
                  <div key={index} className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="text-xs border-purple-400/50 text-purple-400 bg-purple-400/10">
                      ≤{sanity.threshold}%
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {sanity.condition || "standard"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs border-purple-400/50 text-purple-400 bg-purple-400/10">
                  ≤50%
                </Badge>
                <span className="text-xs text-muted-foreground">standard</span>
              </div>
            )}
          </div>

          {/* Speed */}
          <div className="bg-card rounded-lg border border-border p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Gauge className="w-4 h-4 text-accent" />
              <span className="text-sm font-semibold">Speed</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {ghost.speed.map((s) => (
                <Badge key={s} variant="outline" className="text-xs">
                  {speedLabels[s] || s}
                </Badge>
              ))}
            </div>
          </div>

          {/* Visibility */}
          <div className="bg-card rounded-lg border border-border p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Eye className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold">Visibility</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {ghost.visibility.map((v) => (
                <Badge key={v} variant="outline" className="text-xs">
                  {visibilityLabels[v] || v}
                </Badge>
              ))}
            </div>
          </div>

          {/* BPM */}
          {ghost.bpmRange && (
            <div className="bg-card rounded-lg border border-border p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <Heart className="w-4 h-4 text-destructive" />
                <span className="text-sm font-semibold">BPM</span>
              </div>
              <span className="text-xl font-bold text-foreground">
                {ghost.bpmRange.min}-{ghost.bpmRange.max}
              </span>
            </div>
          )}

          {/* SPM */}
          {ghost.spmRange && (
            <div className="bg-card rounded-lg border border-border p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <Footprints className="w-4 h-4 text-warning" />
                <span className="text-sm font-semibold">SPM</span>
              </div>
              <span className="text-xl font-bold text-foreground">
                {ghost.spmRange.min}-{ghost.spmRange.max}
              </span>
            </div>
          )}
        </div>

        {/* Smudge Timer for Spirit and Demon */}
        {showSmudgeTimer && (
          <SmudgeTimer ghostName={ghost.name} duration={ghost.smudgeTimer!} />
        )}

        {/* Tips - Collapsible */}
        {ghost.tips && ghost.tips.length > 0 && (
          <Accordion type="multiple" defaultValue={["tips"]}>
            <AccordionItem value="tips" className="bg-card rounded-lg border border-border px-3">
              <AccordionTrigger className="py-3 hover:no-underline">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-warning" />
                  <span className="text-sm font-semibold">Identification Tips</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-3">
                <ul className="space-y-1.5">
                  {ghost.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                      <span className="text-primary">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}

        {/* Strengths & Weaknesses - Always visible */}
        <div className="grid grid-cols-2 gap-2">
          {ghost.strengths && ghost.strengths.length > 0 && (
            <div className="bg-card rounded-lg border border-destructive/30 p-3">
              <span className="text-sm font-semibold text-destructive block mb-2">Strengths</span>
              <ul className="space-y-1">
                {ghost.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-1.5 text-xs text-foreground">
                    <span className="text-destructive">▲</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {ghost.weaknesses && ghost.weaknesses.length > 0 && (
            <div className="bg-card rounded-lg border border-success/30 p-3">
              <span className="text-sm font-semibold text-success block mb-2">Weaknesses</span>
              <ul className="space-y-1">
                {ghost.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-start gap-1.5 text-xs text-foreground">
                    <span className="text-success">▼</span>
                    {weakness}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GhostDetail;
