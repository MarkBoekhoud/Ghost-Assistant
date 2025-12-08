import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRoom } from "@/hooks/useRoom";
import { Ghost, Users, ArrowLeft, Loader2, Clipboard } from "lucide-react";
import { toast } from "sonner";

const RoomLobby = () => {
  const navigate = useNavigate();
  const [joinCode, setJoinCode] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const { createRoom, checkRoom } = useRoom();

  const handleCreateRoom = async () => {
    setIsCreating(true);
    const code = await createRoom();
    if (code) {
      toast.success(`Room ${code} created!`);
      navigate(`/room/${code}`);
    } else {
      toast.error("Failed to create room");
    }
    setIsCreating(false);
  };

  const handleJoinRoom = async () => {
    if (joinCode.length !== 6) {
      toast.error("Enter a 6-digit room code");
      return;
    }
    
    setIsJoining(true);
    const exists = await checkRoom(joinCode);
    if (exists) {
      navigate(`/room/${joinCode}`);
    } else {
      toast.error("Room not found");
    }
    setIsJoining(false);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setJoinCode(value);
  };

  const handlePasteCode = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const code = text.replace(/\D/g, "").slice(0, 6);
      if (code.length > 0) {
        setJoinCode(code);
        toast.success("Code pasted!");
      } else {
        toast.error("No valid code found in clipboard");
      }
    } catch (err) {
      toast.error("Failed to read clipboard");
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-md mx-auto space-y-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/")}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Solo Mode
        </Button>

        {/* Header */}
        <header className="text-center space-y-2 py-6">
          <div className="flex items-center justify-center gap-2">
            <Users className="w-8 h-8 text-primary animate-pulse" />
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Multiplayer
            </h1>
          </div>
          <p className="text-muted-foreground text-sm">
            Hunt ghosts together with your team
          </p>
        </header>

        {/* Create Room Section */}
        <div className="bg-card p-6 rounded-lg border border-border space-y-4">
          <div className="flex items-center gap-2">
            <Ghost className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Create Room</h2>
          </div>
          <p className="text-muted-foreground text-sm">
            Start a new room and share the code with your team
          </p>
          <Button 
            onClick={handleCreateRoom} 
            className="w-full"
            disabled={isCreating}
          >
            {isCreating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Room"
            )}
          </Button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-muted-foreground text-sm">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Join Room Section */}
        <div className="bg-card p-6 rounded-lg border border-border space-y-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-accent" />
            <h2 className="text-lg font-semibold text-foreground">Join Room</h2>
          </div>
          <p className="text-muted-foreground text-sm">
            Enter the 6-digit code to join an existing room
          </p>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="000000"
              value={joinCode}
              onChange={handleCodeChange}
              className="text-center text-xl tracking-widest font-mono"
              maxLength={6}
            />
            <Button 
              onClick={handlePasteCode}
              variant="outline"
              size="icon"
              title="Paste room code"
            >
              <Clipboard className="w-4 h-4" />
            </Button>
            <Button 
              onClick={handleJoinRoom}
              disabled={joinCode.length !== 6 || isJoining}
            >
              {isJoining ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Join"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomLobby;
