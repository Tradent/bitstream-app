"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Home,
  Compass,
  ListVideo,
  PlaySquare,
  Clock,
  Flame,
  Music,
  Gamepad2,
  Newspaper,
  Trophy,
  GraduationCap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useSidebar } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface MiniSidebarLinkProps {
  href: string
  icon: React.ReactNode
  label: string
  isActive?: boolean
}

function MiniSidebarLink({ href, icon, label, isActive }: MiniSidebarLinkProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            asChild
            className={cn(
              "h-16 w-full flex flex-col items-center justify-center gap-1 rounded-none hover:bg-gray-100",
              isActive ? "bg-gray-100" : "",
            )}
          >
            <Link href={href} className="w-full flex flex-col items-center py-3">
              <div className="text-slate-800">{icon}</div>
              <span className="text-[10px] mt-1 text-slate-800">{label}</span>
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

function SubscriptionLink({ href, image, name }: { href: string; image: string; name: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            asChild
            className="h-16 w-full flex flex-col items-center justify-center rounded-none hover:bg-gray-100"
          >
            <Link href={href} className="w-full flex flex-col items-center py-3">
              <Avatar className="h-6 w-6">
                <AvatarImage src={image || "/placeholder.svg"} alt={name} />
                <AvatarFallback>{name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-[10px] mt-1 text-slate-800 truncate w-full text-center">{name}</span>
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">{name}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function YoutubeMiniSidebar() {
  const pathname = usePathname()
  const { state } = useSidebar()

  // Only show mini sidebar when main sidebar is collapsed
  if (state === "expanded") {
    return null
  }

  const subscriptions = [
    { name: "Tech Insights", image: "/abstract-geometric-TI.png", href: "/channel/tech-insights" },
    { name: "Creative Minds", image: "/abstract-geometric-cm.png", href: "/channel/creative-minds" },
    { name: "Travel Diaries", image: "/abstract-geometric-TD.png", href: "/channel/travel-diaries" },
    { name: "Gaming Pro", image: "/grand-prix-finish.png", href: "/channel/gaming-pro" },
    { name: "Music Channel", image: "/intertwined-initials.png", href: "/channel/music-channel" },
  ]

  const mainLinks = [
    { href: "/home", icon: <Home className="h-5 w-5" />, label: "Home", isActive: pathname === "/home" },
    { href: "/explore", icon: <Compass className="h-5 w-5" />, label: "Explore", isActive: pathname === "/explore" },
    {
      href: "/subscriptions",
      icon: <ListVideo className="h-5 w-5" />,
      label: "Subscriptions",
      isActive: pathname === "/subscriptions",
    },
    { href: "/library", icon: <PlaySquare className="h-5 w-5" />, label: "Library", isActive: pathname === "/library" },
    { href: "/history", icon: <Clock className="h-5 w-5" />, label: "History", isActive: pathname === "/history" },
  ]

  const exploreLinks = [
    { href: "/trending", icon: <Flame className="h-5 w-5" />, label: "Trending", isActive: pathname === "/trending" },
    { href: "/music", icon: <Music className="h-5 w-5" />, label: "Music", isActive: pathname === "/music" },
    { href: "/gaming", icon: <Gamepad2 className="h-5 w-5" />, label: "Gaming", isActive: pathname === "/gaming" },
    { href: "/news", icon: <Newspaper className="h-5 w-5" />, label: "News", isActive: pathname === "/news" },
    { href: "/sports", icon: <Trophy className="h-5 w-5" />, label: "Sports", isActive: pathname === "/sports" },
    {
      href: "/learning",
      icon: <GraduationCap className="h-5 w-5" />,
      label: "Learning",
      isActive: pathname === "/learning",
    },
  ]

  return (
    <div className="fixed left-0 top-[112px] bottom-0 w-[72px] bg-white border-r overflow-y-auto overflow-x-hidden scrollbar-hide z-30">
      <div className="flex flex-col">
        {/* Main navigation links */}
        <div className="border-b pb-2">
          {mainLinks.map((link) => (
            <MiniSidebarLink
              key={link.href}
              href={link.href}
              icon={link.icon}
              label={link.label}
              isActive={link.isActive}
            />
          ))}
        </div>

        {/* Subscriptions */}
        <div className="border-b py-2">
          {subscriptions.map((subscription) => (
            <SubscriptionLink
              key={subscription.href}
              href={subscription.href}
              image={subscription.image}
              name={subscription.name}
            />
          ))}
        </div>

        {/* Explore section */}
        <div className="py-2">
          {exploreLinks.map((link) => (
            <MiniSidebarLink
              key={link.href}
              href={link.href}
              icon={link.icon}
              label={link.label}
              isActive={link.isActive}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
