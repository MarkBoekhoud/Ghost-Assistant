-- Add excluded_ghosts column to rooms table for ghost exclusion sync
ALTER TABLE public.rooms 
ADD COLUMN excluded_ghosts TEXT[] DEFAULT ARRAY[]::TEXT[];