"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, Upload } from "lucide-react"
import { NotificationDropdown } from "@/components/notification-dropdown"
import { MobileNav } from "@/components/mobile-nav"
import { ProfileDropdown } from "@/components/profile-dropdown"

export function MainNav() {
  const pathname = usePathname()

  // Hide the navbar on the /home page
  if (pathname === "/home") {
    return null
  }

  const routes = [
    {
      href: "/home",
      label: "Home",
      icon: <Home className="h-4 w-4" />,
      active: pathname === "/home",
    },
  ]

  return (
    <div className="border-b bg-white">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <div className="md:hidden">
          <MobileNav />
        </div>
        <Link href="/" className="flex items-center gap-2 mr-6">
          <div className="w-8 h-8 rounded bg-teal-500 flex items-center justify-center text-white font-bold">B</div>
          <span className="text-xl font-bold text-sky-900">BitStream</span>
        </Link>

        <div className="flex-1 hidden md:flex">{/* Navigation space */}</div>

        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" className="bg-teal-500 hover:bg-teal-600 hidden md:flex" asChild>
            <Link href="/upload">
              <Upload className="h-4 w-4 mr-1" />
              <span>Upload</span>
            </Link>
          </Button>

          <div className="hidden md:flex items-center gap-1">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={route.active ? "secondary" : "ghost"}
                size="icon"
                asChild
                className={cn(route.active ? "bg-gray-100 text-black" : "text-black")}
              >
                <Link href={route.href}>
                  {route.icon}
                  <span className="sr-only">{route.label}</span>
                </Link>
              </Button>
            ))}
          </div>

          <NotificationDropdown />

          <ProfileDropdown />
        </div>
      </div>
    </div>
  )
}
