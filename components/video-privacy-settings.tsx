"use client"

import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Globe, Lock, Eye, Calendar, Users } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface VideoPrivacySettingsProps {
  videoId: string
  initialVisibility: "public" | "private" | "unlisted"
  onVisibilityChange?: (visibility: "public" | "private" | "unlisted") => void
}

export function VideoPrivacySettings({
  videoId,
  initialVisibility = "private",
  onVisibilityChange,
}: VideoPrivacySettingsProps) {
  const [visibility, setVisibility] = useState<"public" | "private" | "unlisted">(initialVisibility)
  const [schedulePublish, setSchedulePublish] = useState(false)
  const [publishDate, setPublishDate] = useState("")
  const [publishTime, setPublishTime] = useState("")
  const [ageRestricted, setAgeRestricted] = useState(false)
  const [notifySubscribers, setNotifySubscribers] = useState(true)
  const { toast } = useToast()

  const handleVisibilityChange = (value: "public" | "private" | "unlisted") => {
    setVisibility(value)
    if (onVisibilityChange) {
      onVisibilityChange(value)
    }
  }

  const handleSaveSettings = () => {
    // In a real app, you would call an API to update the video settings
    toast({
      title: "Settings saved",
      description: `Video visibility set to ${visibility}${
        schedulePublish ? ` and scheduled for ${publishDate} ${publishTime}` : ""
      }`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-sky-900">Privacy settings</h3>

        <RadioGroup value={visibility} onValueChange={handleVisibilityChange} className="space-y-3">
          <div className="flex items-start space-x-2">
            <RadioGroupItem value="public" id="public" className="mt-1" />
            <div className="grid gap-1.5">
              <Label htmlFor="public" className="flex items-center gap-2 font-medium">
                <Globe className="h-4 w-4 text-sky-700" /> Public
              </Label>
              <p className="text-sm text-muted-foreground">
                Everyone can watch your video. This is the recommended setting.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <RadioGroupItem value="unlisted" id="unlisted" className="mt-1" />
            <div className="grid gap-1.5">
              <Label htmlFor="unlisted" className="flex items-center gap-2 font-medium">
                <Eye className="h-4 w-4 text-sky-700" /> Unlisted
              </Label>
              <p className="text-sm text-muted-foreground">
                Anyone with the link can watch your video. Your video won't appear in search results or on your channel.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <RadioGroupItem value="private" id="private" className="mt-1" />
            <div className="grid gap-1.5">
              <Label htmlFor="private" className="flex items-center gap-2 font-medium">
                <Lock className="h-4 w-4 text-sky-700" /> Private
              </Label>
              <p className="text-sm text-muted-foreground">Only you and people you choose can watch your video.</p>
            </div>
          </div>
        </RadioGroup>
      </div>

      {visibility === "public" && (
        <div className="space-y-4">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="schedule"
              checked={schedulePublish}
              onCheckedChange={(checked) => setSchedulePublish(checked === true)}
              className="mt-1"
            />
            <div className="grid gap-1.5">
              <Label htmlFor="schedule" className="flex items-center gap-2 font-medium">
                <Calendar className="h-4 w-4 text-sky-700" /> Schedule
              </Label>
              <p className="text-sm text-muted-foreground">Set a date and time to make this video public.</p>
            </div>
          </div>

          {schedulePublish && (
            <div className="ml-6 grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="publish-date">Date</Label>
                <Input
                  type="date"
                  id="publish-date"
                  value={publishDate}
                  onChange={(e) => setPublishDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="publish-time">Time</Label>
                <Input
                  type="time"
                  id="publish-time"
                  value={publishTime}
                  onChange={(e) => setPublishTime(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="flex items-start space-x-2">
            <Checkbox
              id="notify-subscribers"
              checked={notifySubscribers}
              onCheckedChange={(checked) => setNotifySubscribers(checked === true)}
              className="mt-1"
            />
            <div className="grid gap-1.5">
              <Label htmlFor="notify-subscribers" className="flex items-center gap-2 font-medium">
                <Users className="h-4 w-4 text-sky-700" /> Notify subscribers
              </Label>
              <p className="text-sm text-muted-foreground">Notify your subscribers when this video is published.</p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-start space-x-2">
          <Checkbox
            id="age-restriction"
            checked={ageRestricted}
            onCheckedChange={(checked) => setAgeRestricted(checked === true)}
            className="mt-1"
          />
          <div className="grid gap-1.5">
            <Label htmlFor="age-restriction" className="font-medium">
              Age restriction
            </Label>
            <p className="text-sm text-muted-foreground">
              This video is not suitable for viewers under 18 years of age.
            </p>
          </div>
        </div>
      </div>

      <Button onClick={handleSaveSettings} className="bg-teal-500 hover:bg-teal-600">
        Save settings
      </Button>
    </div>
  )
}
