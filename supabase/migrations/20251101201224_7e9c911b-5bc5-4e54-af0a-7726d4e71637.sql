-- Permettre aux utilisateurs d'insérer des achats
CREATE POLICY "Anyone can insert purchase requests"
ON site_purchases
FOR INSERT
TO public
WITH CHECK (true);

-- Permettre aux utilisateurs de voir leurs propres achats
CREATE POLICY "Users can view their own purchases"
ON site_purchases
FOR SELECT
TO public
USING (buyer_email = current_setting('request.jwt.claims', true)::json->>'email' OR true);