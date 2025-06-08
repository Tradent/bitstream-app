import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import { formatNumber } from "@/lib/utils"
import { CheckCircle } from "lucide-react"

interface VideoCardProps {
  video: {
    id: string
    title: string
    thumbnailUrl: string
    duration: string
    views: number
    createdAt: Date
    channel: {
      id: string
      name: string
      avatarUrl: string
      verified: boolean
    }
  }
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="group">
      <Link href={`/watch/${video.id}`}>
        <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-100">
          <img
            src={video.thumbnailUrl || "/placeholder.svg"}
            alt={video.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute bottom-1 right-1 rounded bg-black/80 px-1 text-xs text-white">{video.duration}</div>
        </div>
      </Link>
      <div className="mt-2 flex gap-2">
        <Link href={`/channel/${video.channel.id}`} className="flex-shrink-0">
          <div className="h-9 w-9 overflow-hidden rounded-full">
            <img
              src={video.channel.avatarUrl || "/placeholder.svg"}
              alt={video.channel.name}
              className="h-full w-full object-cover"
            />
          </div>
        </Link>
        <div className="flex flex-col">
          <Link href={`/watch/${video.id}`} className="line-clamp-2 font-medium">
            {video.title}
          </Link>
          <Link href={`/channel/${video.channel.id}`} className="mt-1 flex items-center text-sm text-gray-500">
            {video.channel.name}
            {video.channel.verified && <CheckCircle className="ml-1 h-3.5 w-3.5 fill-gray-500 text-white" />}
          </Link>
          <div className="text-sm text-gray-500">
            {formatNumber(video.views)} views • {formatDistanceToNow(video.createdAt, { addSuffix: true })}
          </div>
        </div>
      </div>
    </div>
  )
}
