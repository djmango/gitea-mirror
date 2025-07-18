import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "../ui/checkbox";
import type { AdvancedOptions } from "@/types/config";
import { RefreshCw } from "lucide-react";

interface AdvancedOptionsFormProps {
  config: AdvancedOptions;
  setConfig: React.Dispatch<React.SetStateAction<AdvancedOptions>>;
  onAutoSave?: (config: AdvancedOptions) => Promise<void>;
  isAutoSaving?: boolean;
}

export function AdvancedOptionsForm({
  config,
  setConfig,
  onAutoSave,
  isAutoSaving = false,
}: AdvancedOptionsFormProps) {
  const handleChange = (name: string, checked: boolean) => {
    const newConfig = {
      ...config,
      [name]: checked,
    };

    setConfig(newConfig);

    // Auto-save
    if (onAutoSave) {
      onAutoSave(newConfig);
    }
  };

  return (
    <Card className="self-start">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center justify-between">
          Advanced Options
          {isAutoSaving && (
            <div className="flex items-center text-sm text-muted-foreground">
              <RefreshCw className="h-3 w-3 animate-spin mr-1" />
              <span className="text-xs">Auto-saving...</span>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center">
            <Checkbox
              id="skip-forks"
              checked={config.skipForks}
              onCheckedChange={(checked) =>
                handleChange("skipForks", Boolean(checked))
              }
            />
            <label
              htmlFor="skip-forks"
              className="ml-2 text-sm select-none"
            >
              Skip forks
            </label>
          </div>
          <p className="text-xs text-muted-foreground ml-6">
            Don't mirror repositories that are forks of other repositories
          </p>

          <div className="flex items-center">
            <Checkbox
              id="skip-starred-issues"
              checked={config.skipStarredIssues}
              onCheckedChange={(checked) =>
                handleChange("skipStarredIssues", Boolean(checked))
              }
            />
            <label
              htmlFor="skip-starred-issues"
              className="ml-2 text-sm select-none"
            >
              Don't fetch issues for starred repos
            </label>
          </div>
          <p className="text-xs text-muted-foreground ml-6">
            Skip mirroring issues and pull requests for starred repositories
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
