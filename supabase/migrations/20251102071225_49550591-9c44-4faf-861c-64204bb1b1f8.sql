-- Ajouter le statut "pending" à l'enum site_status
ALTER TYPE site_status ADD VALUE IF NOT EXISTS 'pending';