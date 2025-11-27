import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface BPMTrackerProps {
  onBPMChange: (bpm: number | null) => void;
}

export const BPMTracker = ({ onBPMChange }: BPMTrackerProps) => {
  const [bpm, setBpm] = useState<number | null>(null);
  const [clicks, setClicks] = useState<number[]>([]);
  const lastClickRef = useRef<number>(0);

  const handleClick = () => {
    const now = Date.now();
    
    if (lastClickRef.current === 0) {
      // First click
      lastClickRef.current = now;
      setClicks([now]);
      toast.info("Blijf klikken op het ritme van de heartbeat");
      return;
    }

    const newClicks = [...clicks, now];
    setClicks(newClicks);

    // Calculate BPM from last 5 clicks for more accuracy
    if (newClicks.length >= 3) {
      const recentClicks = newClicks.slice(-5);
      const intervals = [];
      
      for (let i = 1; i < recentClicks.length; i++) {
        intervals.push(recentClicks[i] - recentClicks[i - 1]);
      }
      
      const averageInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const calculatedBpm = Math.round(60000 / averageInterval);
      
      setBpm(calculatedBpm);
      onBPMChange(calculatedBpm);
    }

    lastClickRef.current = now;
  };

  const handleReset = () => {
    setBpm(null);
    setClicks([]);
    lastClickRef.current = 0;
    onBPMChange(null);
    toast.success("BPM tracker gereset");
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <Heart className="w-5 h-5 text-destructive" />
              Heartbeat Tracker
            </CardTitle>
            <CardDescription>Klik op het ritme van de ghost heartbeat</CardDescription>
          </div>
          {bpm && (
            <Button
              onClick={handleReset}
              variant="outline"
              size="sm"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={handleClick}
          size="lg"
          className="w-full h-24 text-2xl font-bold animate-ghost-glow"
          variant="default"
        >
          {bpm ? (
            <span className="flex flex-col items-center gap-1">
              <span className="text-4xl">{bpm}</span>
              <span className="text-sm font-normal">BPM</span>
            </span>
          ) : (
            <span>Klik op het ritme</span>
          )}
        </Button>
        
        {clicks.length > 0 && clicks.length < 3 && (
          <p className="text-sm text-muted-foreground text-center">
            Nog {3 - clicks.length} klik{3 - clicks.length > 1 ? "s" : ""} nodig...
          </p>
        )}
      </CardContent>
    </Card>
  );
};
