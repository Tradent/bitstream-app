"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Home, Upload, User } from "lucide-react"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const routes = [
    {
      href: "/home",
      label: "Home",
      icon: <Home className="h-4 w-4 mr-2" />,
    },
    {
      href: "/upload",
      label: "Upload",
      icon: <Upload className="h-4 w-4 mr-2" />,
    },
    {
      href: "/profile",
      label: "Profile",
      icon: <User className="h-4 w-4 mr-2" />,
    },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[240px] sm:w-[300px]">
        <SheetHeader>
          <SheetTitle>
            <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
              <div className="w-8 h-8 rounded bg-teal-500 flex items-center justify-center text-white font-bold">B</div>
              <span className="text-xl font-bold text-sky-900">BitStream</span>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-2 mt-4">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant={pathname === route.href ? "secondary" : "ghost"}
              className={cn("justify-start", pathname === route.href ? "bg-sky-100 text-sky-900" : "text-sky-700")}
              asChild
            >
              <Link href={route.href} onClick={() => setOpen(false)}>
                {route.icon}
                {route.label}
              </Link>
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
