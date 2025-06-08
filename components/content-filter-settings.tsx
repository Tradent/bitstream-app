"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export function ContentFilterSettings() {
  const [restrictedMode, setRestrictedMode] = useState(false)
  const [autoplay, setAutoplay] = useState(true)
  const [contentMaturity, setContentMaturity] = useState([2]) // 1-4 scale
  const [hideComments, setHideComments] = useState(false)
  const { toast } = useToast()

  const handleSaveSettings = () => {
    // In a real app, you would call an API to save the settings
    toast({
      title: "Settings saved",
      description: "Your content filter settings have been updated",
    })
  }

  const getMaturityLabel = (level: number) => {
    switch (level) {
      case 1:
        return "G - General Audiences"
      case 2:
        return "PG - Parental Guidance Suggested"
      case 3:
        return "PG-13 - Parents Strongly Cautioned"
      case 4:
        return "R - Restricted"
      default:
        return "PG - Parental Guidance Suggested"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-sky-900 mb-4">Content Filter Settings</h2>
        <p className="text-sm text-sky-700 mb-6">
          Customize your viewing experience by adjusting content filters and preferences.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="restricted-mode" className="text-base">
              Restricted Mode
            </Label>
            <p className="text-sm text-muted-foreground">Hide videos that may contain mature content</p>
          </div>
          <Switch id="restricted-mode" checked={restrictedMode} onCheckedChange={setRestrictedMode} />
        </div>

        <div className="space-y-0.5">
          <Label htmlFor="content-maturity" className="text-base">
            Content Maturity Level
          </Label>
          <p className="text-sm text-muted-foreground mb-6">
            Set the maximum maturity level of content you want to see
          </p>
          <Slider
            id="content-maturity"
            min={1}
            max={4}
            step={1}
            value={contentMaturity}
            onValueChange={setContentMaturity}
            className="mb-2"
          />
          <div className="flex justify-between text-xs text-sky-700">
            <span>G</span>
            <span>PG</span>
            <span>PG-13</span>
            <span>R</span>
          </div>
          <p className="text-sm font-medium text-sky-900 mt-2">
            Current setting: {getMaturityLabel(contentMaturity[0])}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="autoplay" className="text-base">
              Autoplay Videos
            </Label>
            <p className="text-sm text-muted-foreground">Automatically play the next recommended video</p>
          </div>
          <Switch id="autoplay" checked={autoplay} onCheckedChange={setAutoplay} />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="hide-comments" className="text-base">
              Hide Comments
            </Label>
            <p className="text-sm text-muted-foreground">Don't show comments on videos</p>
          </div>
          <Switch id="hide-comments" checked={hideComments} onCheckedChange={setHideComments} />
        </div>
      </div>

      <Button onClick={handleSaveSettings} className="bg-teal-500 hover:bg-teal-600">
        Save preferences
      </Button>
    </div>
  )
}
