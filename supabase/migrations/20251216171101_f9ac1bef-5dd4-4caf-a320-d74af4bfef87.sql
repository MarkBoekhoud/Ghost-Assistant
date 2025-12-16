-- Add speed, visibility, bpm, and spm columns to rooms table for multiplayer sync
ALTER TABLE public.rooms 
ADD COLUMN speed character varying DEFAULT NULL,
ADD COLUMN visibility character varying DEFAULT NULL,
ADD COLUMN bpm integer DEFAULT NULL,
ADD COLUMN spm integer DEFAULT NULL;