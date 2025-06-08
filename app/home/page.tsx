"use client"

import { useSidebar } from "@/components/ui/sidebar"
import { VideoCard } from "@/components/video-card"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

// Sample video data
const videos = [
  {
    id: "1",
    title: "Getting Started with Next.js 13",
    thumbnailUrl: "/abstract-geometric-shapes.png",
    duration: "12:34",
    views: 1200000,
    createdAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
    channel: {
      id: "channel1",
      name: "Tech Insights",
      avatarUrl: "/abstract-geometric-TI.png",
      verified: true,
    },
  },
  {
    id: "2",
    title: "Advanced React Patterns for 2023",
    thumbnailUrl: "/grand-piano-performance.png",
    duration: "18:27",
    views: 850000,
    createdAt: new Date(Date.now() - 86400000 * 5), // 5 days ago
    channel: {
      id: "channel2",
      name: "Creative Minds",
      avatarUrl: "/abstract-geometric-cm.png",
      verified: true,
    },
  },
  {
    id: "3",
    title: "Building a Full-Stack App with TypeScript",
    thumbnailUrl: "/esports-arena-excitement.png",
    duration: "32:15",
    views: 500000,
    createdAt: new Date(Date.now() - 86400000 * 7), // 7 days ago
    channel: {
      id: "channel3",
      name: "Travel Diaries",
      avatarUrl: "/abstract-geometric-TD.png",
      verified: false,
    },
  },
  {
    id: "4",
    title: "CSS Grid Layout Masterclass",
    thumbnailUrl: "/vibrant-abstract-banner.png",
    duration: "15:42",
    views: 320000,
    createdAt: new Date(Date.now() - 86400000 * 14), // 14 days ago
    channel: {
      id: "channel1",
      name: "Tech Insights",
      avatarUrl: "/abstract-geometric-TI.png",
      verified: true,
    },
  },
  {
    id: "5",
    title: "Modern JavaScript Features You Should Know",
    thumbnailUrl: "/colorful-pasta-ingredients.png",
    duration: "22:18",
    views: 980000,
    createdAt: new Date(Date.now() - 86400000 * 21), // 21 days ago
    channel: {
      id: "channel2",
      name: "Creative Minds",
      avatarUrl: "/abstract-geometric-cm.png",
      verified: true,
    },
  },
  {
    id: "6",
    title: "Responsive Design Best Practices",
    thumbnailUrl: "/contemplative-keys.png",
    duration: "28:03",
    views: 450000,
    createdAt: new Date(Date.now() - 86400000 * 30), // 30 days ago
    channel: {
      id: "channel3",
      name: "Travel Diaries",
      avatarUrl: "/abstract-geometric-TD.png",
      verified: false,
    },
  },
  {
    id: "7",
    title: "State Management in React Applications",
    thumbnailUrl: "/victory-squad.png",
    duration: "19:45",
    views: 720000,
    createdAt: new Date(Date.now() - 86400000 * 45), // 45 days ago
    channel: {
      id: "channel1",
      name: "Tech Insights",
      avatarUrl: "/abstract-geometric-TI.png",
      verified: true,
    },
  },
  {
    id: "8",
    title: "Building Accessible Web Applications",
    thumbnailUrl: "/grand-prix-finish.png",
    duration: "24:37",
    views: 380000,
    createdAt: new Date(Date.now() - 86400000 * 60), // 60 days ago
    channel: {
      id: "channel2",
      name: "Creative Minds",
      avatarUrl: "/abstract-geometric-cm.png",
      verified: true,
    },
  },
]

export default function HomePage() {
  const { state } = useSidebar()
  const [mounted, setMounted] = useState(false)
  const isExpanded = state === "expanded"

  // Ensure hydration mismatch doesn't occur
  useEffect(() => {
    setMounted(true)
  }, [])

  // Group videos by category
  const categories = [
    {
      title: "Recommended",
      videos: videos.slice(0, 6),
    },
    {
      title: "Web Development",
      videos: [videos[0], videos[3], videos[5], videos[7]],
    },
    {
      title: "JavaScript & TypeScript",
      videos: [videos[2], videos[4], videos[6]],
    },
    {
      title: "Design & UI",
      videos: [videos[1], videos[3], videos[5]],
    },
  ]

  if (!mounted) {
    return null // Prevent hydration mismatch
  }

  return (
    <div className={cn("space-y-8 transition-all duration-300 overflow-y-auto", isExpanded ? "ml-60" : "ml-[72px]")}>
      {categories.map((category, index) => (
        <div key={index} className="px-4">
          {/* Category heading stays static */}
          <h2 className="text-xl font-semibold mb-4 sticky left-0">{category.title}</h2>

          {/* Only the video row is horizontally scrollable */}
          <div className="relative w-full overflow-visible">
            <div className="overflow-x-auto scrollbar-hide pb-4">
              <div className="flex gap-4 w-max">
                {category.videos.map((video) => (
                  <div key={video.id} className="w-72 flex-shrink-0">
                    <VideoCard video={video} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
