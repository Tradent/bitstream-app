"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell } from "lucide-react"

export function NotificationDropdown() {
  const [hasNotifications, setHasNotifications] = useState(true)

  const handleOpen = () => {
    if (hasNotifications) {
      setHasNotifications(false)
    }
  }

  return (
    <DropdownMenu onOpenChange={handleOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {hasNotifications && <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Notifications</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <div className="flex items-start gap-2">
              <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0">
                <img src="/abstract-geometric-TI.png" alt="Channel" className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col">
                <p className="text-sm">Tech Insights uploaded a new video</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <div className="flex items-start gap-2">
              <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0">
                <img src="/abstract-geometric-cm.png" alt="Channel" className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col">
                <p className="text-sm">Creative Minds commented on your video</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <div className="flex items-start gap-2">
              <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0">
                <img src="/abstract-geometric-TD.png" alt="Channel" className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col">
                <p className="text-sm">Travel Diaries subscribed to your channel</p>
                <p className="text-xs text-muted-foreground">3 days ago</p>
              </div>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer justify-center">
          <p className="text-sm text-muted-foreground">View all notifications</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
