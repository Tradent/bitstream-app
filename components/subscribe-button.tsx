"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bell, BellOff, BellRing } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface SubscribeButtonProps {
  channelId: string
  channelName: string
  initialSubscribed?: boolean
  subscriberCount?: number
  className?: string
}

export function SubscribeButton({
  channelId,
  channelName,
  initialSubscribed = false,
  subscriberCount,
  className,
}: SubscribeButtonProps) {
  const [isSubscribed, setIsSubscribed] = useState(initialSubscribed)
  const [notificationLevel, setNotificationLevel] = useState<"all" | "personalized" | "none">("all")
  const [subscribers, setSubscribers] = useState(subscriberCount || 0)

  const handleSubscribe = () => {
    // In a real app, you would call an API to subscribe/unsubscribe
    if (isSubscribed) {
      setIsSubscribed(false)
      setSubscribers((prev) => Math.max(0, prev - 1))
    } else {
      setIsSubscribed(true)
      setNotificationLevel("all")
      setSubscribers((prev) => prev + 1)
    }
  }

  const handleNotificationChange = (level: "all" | "personalized" | "none") => {
    // In a real app, you would call an API to update notification preferences
    setNotificationLevel(level)
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        onClick={handleSubscribe}
        className={isSubscribed ? "bg-gray-200 text-gray-800 hover:bg-gray-300" : "bg-teal-500 hover:bg-teal-600"}
      >
        {isSubscribed ? "Subscribed" : "Subscribe"}
        {subscriberCount !== undefined && !isSubscribed && (
          <span className="ml-2">{formatSubscriberCount(subscribers)}</span>
        )}
      </Button>

      {isSubscribed && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              {notificationLevel === "all" ? (
                <BellRing className="h-4 w-4" />
              ) : notificationLevel === "personalized" ? (
                <Bell className="h-4 w-4" />
              ) : (
                <BellOff className="h-4 w-4" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => handleNotificationChange("all")}
              className={notificationLevel === "all" ? "bg-sky-50" : ""}
            >
              <BellRing className="mr-2 h-4 w-4" /> All notifications
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleNotificationChange("personalized")}
              className={notificationLevel === "personalized" ? "bg-sky-50" : ""}
            >
              <Bell className="mr-2 h-4 w-4" /> Personalized
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleNotificationChange("none")}
              className={notificationLevel === "none" ? "bg-sky-50" : ""}
            >
              <BellOff className="mr-2 h-4 w-4" /> None
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}

// Helper function to format subscriber count
function formatSubscriberCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`
  } else {
    return count.toString()
  }
}
