
-- Create an enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table to store role assignments
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable Row Level Security
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create a security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create RLS policies for user_roles table
CREATE POLICY "Users can view their own roles" 
  ON public.user_roles 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles" 
  ON public.user_roles 
  FOR SELECT 
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert roles" 
  ON public.user_roles 
  FOR INSERT 
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update roles" 
  ON public.user_roles 
  FOR UPDATE 
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles" 
  ON public.user_roles 
  FOR DELETE 
  USING (public.has_role(auth.uid(), 'admin'));

-- Add scope column to api_key_configs to differentiate between user and system keys
ALTER TABLE public.api_key_configs 
ADD COLUMN scope TEXT NOT NULL DEFAULT 'user' CHECK (scope IN ('user', 'system'));

-- Update RLS policies for api_key_configs to allow admins to manage system keys
CREATE POLICY "Admins can view all API key configs" 
  ON public.api_key_configs 
  FOR SELECT 
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can create system API key configs" 
  ON public.api_key_configs 
  FOR INSERT 
  WITH CHECK (
    public.has_role(auth.uid(), 'admin') AND scope = 'system'
  );

CREATE POLICY "Admins can update system API key configs" 
  ON public.api_key_configs 
  FOR UPDATE 
  USING (
    public.has_role(auth.uid(), 'admin') AND scope = 'system'
  );

CREATE POLICY "Admins can delete system API key configs" 
  ON public.api_key_configs 
  FOR DELETE 
  USING (
    public.has_role(auth.uid(), 'admin') AND scope = 'system'
  );

-- Create trigger function to automatically assign 'user' role to new users
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$;

-- Create trigger to assign default role on user creation
CREATE TRIGGER on_auth_user_created_assign_role
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_role();

-- Create indexes for better performance
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX idx_user_roles_role ON public.user_roles(role);
CREATE INDEX idx_api_key_configs_scope ON public.api_key_configs(scope);
