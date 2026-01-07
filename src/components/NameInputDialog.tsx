import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User } from "lucide-react";

interface NameInputDialogProps {
  open: boolean;
  onSubmit: (name: string) => void;
  onClose?: () => void;
}

export const NameInputDialog = ({ open, onSubmit, onClose }: NameInputDialogProps) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("Please enter a name");
      return;
    }
    
    if (trimmedName.length < 2) {
      setError("Name must be at least 2 characters");
      return;
    }
    
    if (trimmedName.length > 20) {
      setError("Name must be 20 characters or less");
      return;
    }
    
    onSubmit(trimmedName);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose?.()}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Enter Your Name
          </DialogTitle>
          <DialogDescription>
            Choose a name that will be visible to other players in the room
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Your name..."
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              className="text-lg"
              autoFocus
              maxLength={20}
            />
            {error && (
              <p className="text-sm text-destructive mt-1">{error}</p>
            )}
          </div>
          
          <Button type="submit" className="w-full">
            Join Room
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
