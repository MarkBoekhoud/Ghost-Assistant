import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface SmudgeTimerProps {
  ghostName: string;
  duration: number; // in seconds
}

export const SmudgeTimer = ({ ghostName, duration }: SmudgeTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    if (timeLeft === 0) {
      setTimeLeft(duration);
      setIsFinished(false);
    }
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsFinished(false);
    setTimeLeft(duration);
  };

  // Listen for global app reset
  useEffect(() => {
    const handler = () => handleReset();
    window.addEventListener("app-reset", handler as EventListener);
    return () => window.removeEventListener("app-reset", handler as EventListener);
  }, [duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = ((duration - timeLeft) / duration) * 100;

  return (
    <div className="bg-card rounded-lg border border-border p-3">
      <div className="flex items-center gap-2 mb-3">
        <Flame className="w-4 h-4 text-orange-500" />
        <span className="text-sm font-semibold">Smudge Timer</span>
      </div>
      
      <p className="text-xs text-muted-foreground mb-3">
        {ghostName === "Spirit" 
          ? "Spirit cannot hunt for 180 seconds after smudging"
          : "Demon can hunt after only 60 seconds of smudging"}
      </p>

      {/* Timer Display */}
      <div className="relative mb-3">
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className={cn(
              "h-full transition-all duration-1000",
              isFinished ? "bg-destructive" : "bg-primary"
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className={cn(
          "text-2xl font-bold font-mono",
          isFinished ? "text-destructive animate-pulse" : "text-foreground"
        )}>
          {formatTime(timeLeft)}
        </span>
        
        <div className="flex gap-2">
          {!isRunning ? (
            <Button size="sm" onClick={handleStart} variant="default">
              <Play className="w-4 h-4" />
            </Button>
          ) : (
            <Button size="sm" onClick={handlePause} variant="secondary">
              <Pause className="w-4 h-4" />
            </Button>
          )}
          <Button size="sm" onClick={handleReset} variant="outline">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {isFinished && (
        <p className="text-sm text-destructive font-medium mt-2 animate-pulse">
          ⚠️ Ghost can hunt again!
        </p>
      )}
    </div>
  );
};
