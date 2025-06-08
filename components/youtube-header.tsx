"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, Search, Upload } from "lucide-react"
import Link from "next/link"
import { ProfileDropdown } from "./profile-dropdown"
import { NotificationDropdown } from "./notification-dropdown"
import { useSidebar } from "./ui/sidebar"

export function YoutubeHeader() {
  const { toggleSidebar } = useSidebar()

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b z-50">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-slate-800">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>

          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-teal-500 flex items-center justify-center text-white font-bold">B</div>
            <span className="text-xl font-bold text-sky-900">BitStream</span>
          </Link>
        </div>

        <div className="flex-1 max-w-xl mx-4">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search"
              className="pl-4 pr-10 py-1.5 h-10 bg-gray-50 border border-gray-300 rounded-full focus:bg-white"
            />
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              className="absolute right-0 top-0 h-10 w-10 rounded-full text-gray-500"
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" className="bg-teal-500 hover:bg-teal-600" asChild>
            <Link href="/upload">
              <Upload className="h-4 w-4 mr-1" />
              <span>Upload</span>
            </Link>
          </Button>

          <NotificationDropdown />
          <ProfileDropdown />
        </div>
      </div>
    </header>
  )
}
