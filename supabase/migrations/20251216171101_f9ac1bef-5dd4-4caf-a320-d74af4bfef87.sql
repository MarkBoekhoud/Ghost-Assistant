-- Add speed, visibility, bpm, spm, excluded_ghosts, and selected_abilities columns to rooms table for multiplayer sync
ALTER TABLE public.rooms 
ADD COLUMN speed character varying DEFAULT NULL,
ADD COLUMN visibility character varying DEFAULT NULL,
ADD COLUMN bpm integer DEFAULT NULL,
ADD COLUMN spm integer DEFAULT NULL,
ADD COLUMN excluded_ghosts TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN selected_abilities TEXT[] DEFAULT ARRAY[]::TEXT[];