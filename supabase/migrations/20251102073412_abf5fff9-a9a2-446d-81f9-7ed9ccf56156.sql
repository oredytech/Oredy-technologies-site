-- Ajouter la colonne buyer_phone à la table site_purchases
ALTER TABLE public.site_purchases 
ADD COLUMN buyer_phone text NOT NULL DEFAULT '';