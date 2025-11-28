import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ghostDatabase } from "@/data/ghostData";
import { ArrowLeft, Ghost, Heart, Footprints, Zap, Shield, Lightbulb } from "lucide-react";

const GhostDetail = () => {
  const { ghostName } = useParams<{ ghostName: string }>();
  const navigate = useNavigate();

  const ghost = ghostDatabase.find(
    (g) => g.name.toLowerCase() === ghostName?.toLowerCase()
  );

  if (!ghost) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <Button onClick={() => navigate("/")} variant="outline" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Terug
          </Button>
          <p className="text-muted-foreground">Ghost niet gevonden.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Button */}
        <Button onClick={() => navigate("/")} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Terug naar overzicht
        </Button>

        {/* Header */}
        <header className="space-y-4">
          <div className="flex items-center gap-3">
            <Ghost className="w-10 h-10 text-primary animate-ghost-glow" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              {ghost.name}
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">{ghost.description}</p>
        </header>

        {/* Evidence & Abilities */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Bewijzen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {ghost.evidence.map((evidence) => (
                  <Badge key={evidence} variant="secondary" className="text-sm">
                    {evidence}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-accent" />
                Eigenschappen
              </CardTitle>
            </CardHeader>
            <CardContent>
              {ghost.abilities.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {ghost.abilities.map((ability) => (
                    <Badge key={ability} variant="outline" className="text-sm border-accent text-accent">
                      {ability}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">Geen speciale eigenschappen</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Speed Stats */}
        <div className="grid md:grid-cols-2 gap-6">
          {ghost.bpmRange && (
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-destructive" />
                  Heartbeat (BPM)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-foreground">
                    {ghost.bpmRange.min} - {ghost.bpmRange.max}
                  </span>
                  <span className="text-muted-foreground">BPM</span>
                </div>
              </CardContent>
            </Card>
          )}

          {ghost.spmRange && (
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Footprints className="w-5 h-5 text-warning" />
                  Footsteps (SPM)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-foreground">
                    {ghost.spmRange.min} - {ghost.spmRange.max}
                  </span>
                  <span className="text-muted-foreground">SPM</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Tips */}
        {ghost.tips && ghost.tips.length > 0 && (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-warning" />
                Identificatie Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {ghost.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-foreground">
                    <span className="text-primary">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Strengths & Weaknesses */}
        <div className="grid md:grid-cols-2 gap-6">
          {ghost.strengths && ghost.strengths.length > 0 && (
            <Card className="bg-card border-destructive/30">
              <CardHeader>
                <CardTitle className="text-destructive">Sterktes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {ghost.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2 text-foreground">
                      <span className="text-destructive">▲</span>
                      {strength}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {ghost.weaknesses && ghost.weaknesses.length > 0 && (
            <Card className="bg-card border-success/30">
              <CardHeader>
                <CardTitle className="text-success">Zwaktes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {ghost.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-start gap-2 text-foreground">
                      <span className="text-success">▼</span>
                      {weakness}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default GhostDetail;
