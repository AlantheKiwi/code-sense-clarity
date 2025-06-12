
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Eye, EyeOff, Key, TestTube } from "lucide-react";
import { Tool, APIKeyConfig } from "@/types/apiKeys";
import { useToast } from "@/hooks/use-toast";

interface APIKeyCardProps {
  tool: Tool;
  config?: APIKeyConfig;
  onSave: (toolId: string, apiKey: string, enabled: boolean) => Promise<void>;
  onTest?: (toolId: string, apiKey: string) => Promise<boolean>;
}

const APIKeyCard = ({ tool, config, onSave, onTest }: APIKeyCardProps) => {
  const [apiKey, setApiKey] = useState(config?.api_key || '');
  const [isEnabled, setIsEnabled] = useState(config?.is_enabled || false);
  const [showKey, setShowKey] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter an API key",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      await onSave(tool.id, apiKey, isEnabled);
      toast({
        title: "Success",
        description: `${tool.name} API key saved successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to save API key: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleTest = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter an API key to test",
        variant: "destructive",
      });
      return;
    }

    setIsTesting(true);
    try {
      const isValid = await onTest?.(tool.id, apiKey);
      toast({
        title: isValid ? "Success" : "Error",
        description: isValid 
          ? `${tool.name} API key is valid!` 
          : `${tool.name} API key is invalid`,
        variant: isValid ? "default" : "destructive",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to test API key: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Key className="h-5 w-5 text-primary" />
            <div>
              <CardTitle className="text-lg">{tool.name}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {tool.description}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {tool.isPopular && (
              <Badge variant="secondary" className="text-xs">
                Popular
              </Badge>
            )}
            <Switch
              checked={isEnabled}
              onCheckedChange={setIsEnabled}
              disabled={!apiKey.trim()}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">API Key</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  type={showKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder={`Enter your ${tool.name} API key`}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowKey(!showKey)}
                >
                  {showKey ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleSave}
              disabled={isSaving || !apiKey.trim()}
              className="flex-1"
            >
              {isSaving ? "Saving..." : "Save"}
            </Button>
            {onTest && (
              <Button
                variant="outline"
                onClick={handleTest}
                disabled={isTesting || !apiKey.trim()}
                size="icon"
              >
                {isTesting ? (
                  <div className="h-4 w-4 animate-spin border-2 border-current border-t-transparent rounded-full" />
                ) : (
                  <TestTube className="h-4 w-4" />
                )}
              </Button>
            )}
            {tool.docUrl && (
              <Button
                variant="outline"
                size="icon"
                asChild
              >
                <a href={tool.docUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default APIKeyCard;
