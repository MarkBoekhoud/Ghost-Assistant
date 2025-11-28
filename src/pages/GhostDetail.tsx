import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ghostDatabase } from "@/data/ghostData";
import { ArrowLeft, Ghost, Heart, Footprints, Zap, Shield, Lightbulb } from "lucide-react";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
            Terug
          </Button>
          <p className="text-muted-foreground mt-4">Ghost niet gevonden.</p>
        </div>
      </div>
    );
  }

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
              <span className="text-sm font-semibold">Bewijzen</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {ghost.evidence.map((evidence) => (
                <EvidenceBadge key={evidence} evidence={evidence} />
              ))}
            </div>
          </div>

          {/* Abilities */}
          <div className="bg-card rounded-lg border border-border p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Shield className="w-4 h-4 text-accent" />
              <span className="text-sm font-semibold">Eigenschappen</span>
            </div>
            {ghost.abilities.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {ghost.abilities.map((ability) => (
                  <Badge key={ability} variant="outline" className="text-xs border-accent text-accent">
                    {ability}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">Geen</p>
            )}
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

        {/* Collapsible Sections */}
        <Accordion type="multiple" defaultValue={["tips"]} className="space-y-2">
          {/* Tips */}
          {ghost.tips && ghost.tips.length > 0 && (
            <AccordionItem value="tips" className="bg-card rounded-lg border border-border px-3">
              <AccordionTrigger className="py-3 hover:no-underline">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-warning" />
                  <span className="text-sm font-semibold">Identificatie Tips</span>
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
          )}

          {/* Strengths & Weaknesses combined row */}
          <div className="grid grid-cols-2 gap-2">
            {ghost.strengths && ghost.strengths.length > 0 && (
              <AccordionItem value="strengths" className="bg-card rounded-lg border border-destructive/30 px-3">
                <AccordionTrigger className="py-3 hover:no-underline">
                  <span className="text-sm font-semibold text-destructive">Sterktes</span>
                </AccordionTrigger>
                <AccordionContent className="pb-3">
                  <ul className="space-y-1">
                    {ghost.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start gap-1.5 text-xs text-foreground">
                        <span className="text-destructive">▲</span>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )}

            {ghost.weaknesses && ghost.weaknesses.length > 0 && (
              <AccordionItem value="weaknesses" className="bg-card rounded-lg border border-success/30 px-3">
                <AccordionTrigger className="py-3 hover:no-underline">
                  <span className="text-sm font-semibold text-success">Zwaktes</span>
                </AccordionTrigger>
                <AccordionContent className="pb-3">
                  <ul className="space-y-1">
                    {ghost.weaknesses.map((weakness, index) => (
                      <li key={index} className="flex items-start gap-1.5 text-xs text-foreground">
                        <span className="text-success">▼</span>
                        {weakness}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )}
          </div>
        </Accordion>
      </div>
    </div>
  );
};

export default GhostDetail;
