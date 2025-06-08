"use client"

import { useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import {
  Home,
  Compass,
  ListVideo,
  Library,
  History,
  Clock,
  ThumbsUp,
  Flame,
  Music2,
  Gamepad2,
  Newspaper,
  Trophy,
  GraduationCap,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function YoutubeSidebar() {
  const { state } = useSidebar()
  const pathname = usePathname()
  const isExpanded = state === "expanded"

  const mainNavItems = [
    {
      name: "Home",
      href: "/home",
      icon: <Home className="h-5 w-5" />,
      active: pathname === "/home",
    },
    {
      name: "Explore",
      href: "/explore",
      icon: <Compass className="h-5 w-5" />,
      active: pathname === "/explore",
    },
    {
      name: "Subscriptions",
      href: "/subscriptions",
      icon: <ListVideo className="h-5 w-5" />,
      active: pathname === "/subscriptions",
    },
    {
      name: "Library",
      href: "/library",
      icon: <Library className="h-5 w-5" />,
      active: pathname === "/library",
    },
    {
      name: "History",
      href: "/history",
      icon: <History className="h-5 w-5" />,
      active: pathname === "/history",
    },
  ]

  const secondaryNavItems = [
    {
      name: "Watch Later",
      href: "/playlist?list=WL",
      icon: <Clock className="h-5 w-5" />,
    },
    {
      name: "Liked Videos",
      href: "/playlist?list=LL",
      icon: <ThumbsUp className="h-5 w-5" />,
    },
  ]

  const exploreItems = [
    {
      name: "Trending",
      href: "/trending",
      icon: <Flame className="h-5 w-5" />,
    },
    {
      name: "Music",
      href: "/music",
      icon: <Music2 className="h-5 w-5" />,
    },
    {
      name: "Gaming",
      href: "/gaming",
      icon: <Gamepad2 className="h-5 w-5" />,
    },
    {
      name: "News",
      href: "/news",
      icon: <Newspaper className="h-5 w-5" />,
    },
    {
      name: "Sports",
      href: "/sports",
      icon: <Trophy className="h-5 w-5" />,
    },
    {
      name: "Learning",
      href: "/learning",
      icon: <GraduationCap className="h-5 w-5" />,
    },
  ]

  const subscriptions = [
    {
      name: "Tech Insights",
      href: "/channel/tech-insights",
      image: "/abstract-geometric-TI.png",
    },
    {
      name: "Creative Minds",
      href: "/channel/creative-minds",
      image: "/abstract-geometric-cm.png",
    },
    {
      name: "Travel Diaries",
      href: "/channel/travel-diaries",
      image: "/abstract-geometric-TD.png",
    },
  ]

  return (
    <aside
      className={cn(
        "fixed left-0 top-[112px] z-30 h-[calc(100vh-112px)] bg-white transition-all duration-300 overflow-y-auto scrollbar-hide",
        isExpanded ? "w-60" : "w-0 opacity-0 pointer-events-none",
      )}
    >
      <div className="pb-12">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <div className="space-y-1">
              {mainNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-md px-2 py-2 hover:bg-gray-100",
                    item.active ? "bg-gray-100" : "transparent",
                  )}
                >
                  {item.icon}
                  <span className="ml-2 text-sm font-medium text-slate-800">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="px-3 py-2">
            <h2 className="mb-2 px-2 text-xs font-semibold tracking-tight">Library</h2>
            <div className="space-y-1">
              {secondaryNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center rounded-md px-2 py-2 hover:bg-gray-100"
                >
                  {item.icon}
                  <span className="ml-2 text-sm font-medium text-slate-800">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="px-3 py-2">
            <h2 className="mb-2 px-2 text-xs font-semibold tracking-tight">Subscriptions</h2>
            <div className="space-y-1">
              {subscriptions.map((subscription) => (
                <Link
                  key={subscription.name}
                  href={subscription.href}
                  className="flex items-center rounded-md px-2 py-2 hover:bg-gray-100"
                >
                  <div className="h-6 w-6 rounded-full overflow-hidden">
                    <img
                      src={subscription.image || "/placeholder.svg"}
                      alt={subscription.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="ml-2 text-sm font-medium text-slate-800">{subscription.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="px-3 py-2">
            <h2 className="mb-2 px-2 text-xs font-semibold tracking-tight">Explore</h2>
            <div className="space-y-1">
              {exploreItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center rounded-md px-2 py-2 hover:bg-gray-100"
                >
                  {item.icon}
                  <span className="ml-2 text-sm font-medium text-slate-800">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
