-- Add excluded_ghosts and selected_abilities columns to rooms table for multiplayer sync
ALTER TABLE public.rooms 
ADD COLUMN excluded_ghosts TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN selected_abilities TEXT[] DEFAULT ARRAY[]::TEXT[];