ALTER TABLE rooms 
ADD COLUMN description text DEFAULT NULL,
ADD COLUMN max_players integer DEFAULT NULL;