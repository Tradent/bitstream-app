import type React from "react"
import { YoutubeHeader } from "@/components/youtube-header"
import { YoutubeHomeNav } from "@/components/youtube-home-nav"
import { YoutubeSidebar } from "@/components/youtube-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { YoutubeMiniSidebar } from "@/components/youtube-mini-sidebar"

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-white">
        <YoutubeHeader />
        <YoutubeHomeNav />
        <div className="flex">
          <YoutubeSidebar />
          <YoutubeMiniSidebar />
          <main className="flex-1 pt-[112px] transition-all duration-300">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
