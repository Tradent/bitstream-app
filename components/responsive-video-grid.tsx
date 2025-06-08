"use client"

import { VideoCard } from "@/components/video-card"
import type { Video } from "@/types/video"

interface ResponsiveVideoGridProps {
  videos: Video[]
}

export function ResponsiveVideoGrid({ videos }: ResponsiveVideoGridProps) {
  if (!videos || videos.length === 0) {
    return <div className="text-center py-10">No videos found</div>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  )
}

// Add a Card subcomponent that can be used in horizontal scrolling layouts
ResponsiveVideoGrid.Card = VideoCard
