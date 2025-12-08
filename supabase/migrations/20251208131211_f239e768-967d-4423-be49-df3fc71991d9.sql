-- Create rooms table for multiplayer functionality
CREATE TABLE public.rooms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code VARCHAR(6) NOT NULL UNIQUE,
  evidence JSONB NOT NULL DEFAULT '{
    "EMF Level 5": "unknown",
    "Spirit Box": "unknown",
    "Fingerprints": "unknown",
    "Ghost Orbs": "unknown",
    "Ghost Writing": "unknown",
    "DOTS Projector": "unknown",
    "Freezing Temps": "unknown"
  }'::jsonb,
  difficulty VARCHAR(20) NOT NULL DEFAULT 'Amateur',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (public access for multiplayer)
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read rooms (needed for joining)
CREATE POLICY "Anyone can read rooms" 
ON public.rooms 
FOR SELECT 
USING (true);

-- Allow anyone to create rooms
CREATE POLICY "Anyone can create rooms" 
ON public.rooms 
FOR INSERT 
WITH CHECK (true);

-- Allow anyone to update rooms (for evidence sync)
CREATE POLICY "Anyone can update rooms" 
ON public.rooms 
FOR UPDATE 
USING (true);

-- Allow anyone to delete rooms
CREATE POLICY "Anyone can delete rooms" 
ON public.rooms 
FOR DELETE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_rooms_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_rooms_updated_at
BEFORE UPDATE ON public.rooms
FOR EACH ROW
EXECUTE FUNCTION public.update_rooms_updated_at();

-- Enable realtime for rooms table
ALTER PUBLICATION supabase_realtime ADD TABLE public.rooms;