
-- Create table for API key configurations
CREATE TABLE public.api_key_configs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  tool_name TEXT NOT NULL,
  tool_category TEXT NOT NULL,
  api_key TEXT NOT NULL,
  is_enabled BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, tool_name)
);

-- Add Row Level Security (RLS)
ALTER TABLE public.api_key_configs ENABLE ROW LEVEL SECURITY;

-- Create policies for API key configs
CREATE POLICY "Users can view their own API key configs" 
  ON public.api_key_configs 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own API key configs" 
  ON public.api_key_configs 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own API key configs" 
  ON public.api_key_configs 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own API key configs" 
  ON public.api_key_configs 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create index for better performance
CREATE INDEX idx_api_key_configs_user_id ON public.api_key_configs(user_id);
CREATE INDEX idx_api_key_configs_tool_name ON public.api_key_configs(tool_name);
