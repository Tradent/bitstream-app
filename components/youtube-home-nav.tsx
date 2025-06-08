"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import Link from "next/link"

export function YoutubeHomeNav() {
  const pathname = usePathname()

  const categories = [
    { name: "All", href: "/home", active: true },
    { name: "Music", href: "/home?category=music" },
    { name: "Gaming", href: "/home?category=gaming" },
    { name: "News", href: "/home?category=news" },
    { name: "Sports", href: "/home?category=sports" },
    { name: "Learning", href: "/home?category=learning" },
    { name: "Fashion", href: "/home?category=fashion" },
    { name: "Beauty", href: "/home?category=beauty" },
    { name: "Science", href: "/home?category=science" },
    { name: "Technology", href: "/home?category=technology" },
    { name: "Entertainment", href: "/home?category=entertainment" },
    { name: "Food", href: "/home?category=food" },
    { name: "Travel", href: "/home?category=travel" },
  ]

  return (
    <div className="fixed top-16 left-0 right-0 h-12 bg-white z-40 border-b">
      <div className="flex items-center h-full px-4 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={category.active ? "secondary" : "outline"}
              size="sm"
              className={cn(
                "rounded-full text-sm",
                category.active
                  ? "bg-black text-white hover:bg-black/90"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200",
              )}
              asChild
            >
              <Link href={category.href}>{category.name}</Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
