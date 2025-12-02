import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Footprints, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface FootstepsTrackerProps {
  onSPMChange: (spm: number | null) => void;
}

export const FootstepsTracker = ({ onSPMChange }: FootstepsTrackerProps) => {
  const [spm, setSpm] = useState<number | null>(null);
  const [clicks, setClicks] = useState<number[]>([]);
  const lastClickRef = useRef<number>(0);

  const handleClick = () => {
    const now = Date.now();
    
    if (lastClickRef.current === 0) {
      lastClickRef.current = now;
      setClicks([now]);
      toast.info("Keep clicking to the rhythm of the footsteps");
      return;
    }

    const newClicks = [...clicks, now];
    setClicks(newClicks);

    if (newClicks.length >= 3) {
      const recentClicks = newClicks.slice(-5);
      const intervals = [];
      
      for (let i = 1; i < recentClicks.length; i++) {
        intervals.push(recentClicks[i] - recentClicks[i - 1]);
      }
      
      const averageInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const calculatedSpm = Math.round(60000 / averageInterval);
      
      setSpm(calculatedSpm);
      onSPMChange(calculatedSpm);
    }

    lastClickRef.current = now;
  };

  const handleReset = () => {
    setSpm(null);
    setClicks([]);
    lastClickRef.current = 0;
    onSPMChange(null);
    toast.success("Footsteps tracker reset");
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <Footprints className="w-5 h-5 text-warning" />
              Footsteps Tracker
            </CardTitle>
            <CardDescription>Click to the rhythm of the ghost footsteps</CardDescription>
          </div>
          {spm && (
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
          className="w-full h-24 text-2ms font-bold bg-warning/20 hover:bg-warning/30 text-warning border border-warning/50"
          variant="outline"
        >
          {spm ? (
            <span className="flex flex-col items-center gap-1">
              <span className="text-4xl">{spm}</span>
              <span className="text-sm font-normal">SPM</span>
            </span>
          ) : (
            <span>Click to the rhythm</span>
          )}
        </Button>
        
        {clicks.length > 0 && clicks.length < 3 && (
          <p className="text-sm text-muted-foreground text-center">
            {3 - clicks.length} more click{3 - clicks.length > 1 ? "s" : ""} needed...
          </p>
        )}
      </CardContent>
    </Card>
  );
};
