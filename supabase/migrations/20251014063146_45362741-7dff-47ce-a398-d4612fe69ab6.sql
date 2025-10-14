-- Create enum for site status
CREATE TYPE public.site_status AS ENUM ('available', 'sold', 'reserved');

-- Create marketplace_sites table
CREATE TABLE public.marketplace_sites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  short_description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  site_url TEXT,
  demo_url TEXT,
  screenshots TEXT[] DEFAULT '{}',
  code_snippets TEXT,
  technologies TEXT[] DEFAULT '{}',
  status site_status DEFAULT 'available',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.marketplace_sites ENABLE ROW LEVEL SECURITY;

-- Anyone can view available sites
CREATE POLICY "Anyone can view available sites"
ON public.marketplace_sites
FOR SELECT
USING (status = 'available' OR auth.uid() IS NOT NULL);

-- Create user roles enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Users can view their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Only admins can manage sites
CREATE POLICY "Admins can insert sites"
ON public.marketplace_sites
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update sites"
ON public.marketplace_sites
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete sites"
ON public.marketplace_sites
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_marketplace_sites_updated_at
BEFORE UPDATE ON public.marketplace_sites
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create purchases table
CREATE TABLE public.site_purchases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  site_id UUID REFERENCES public.marketplace_sites(id) ON DELETE CASCADE,
  buyer_email TEXT NOT NULL,
  buyer_name TEXT NOT NULL,
  purchase_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT DEFAULT 'pending'
);

-- Enable RLS
ALTER TABLE public.site_purchases ENABLE ROW LEVEL SECURITY;

-- Admins can view all purchases
CREATE POLICY "Admins can view all purchases"
ON public.site_purchases
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));