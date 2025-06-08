"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { VideoCard } from "@/components/video-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Share2, MoreHorizontal } from "lucide-react"
import type { VideoMetadata } from "@/types/video"

interface ChannelData {
  id: string
  name: string
  avatarUrl?: string
  bannerUrl?: string
  description: string
  subscriberCount: number
  videoCount: number
  totalViews: number
  joinDate: string
  isSubscribed: boolean
}

export default function ChannelPage() {
  const { id } = useParams<{ id: string }>()
  const [channel, setChannel] = useState<ChannelData | null>(null)
  const [videos, setVideos] = useState<VideoMetadata[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubscribed, setIsSubscribed] = useState(false)

  useEffect(() => {
    const fetchChannelData = async () => {
      setIsLoading(true)
      try {
        // In a real app, you would fetch channel data from an API
        // For now, we'll use mock data
        const mockChannel: ChannelData = {
          id: id as string,
          name: id === "user-123" ? "BitStream Tutorials" : "WebDev Enthusiast",
          avatarUrl: `/placeholder.svg?height=120&width=120&query=${id === "user-123" ? "BitStream Tutorials" : "WebDev Enthusiast"}`,
          bannerUrl: "/vibrant-abstract-banner.png",
          description:
            id === "user-123"
              ? "Welcome to BitStream Tutorials! We create in-depth tutorials on web development, focusing on Next.js, React, and modern web technologies. Subscribe for weekly content!"
              : "I'm passionate about web development and sharing my knowledge with the community. Join me as I explore the latest trends and best practices in frontend development.",
          subscriberCount: id === "user-123" ? 42300 : 15700,
          videoCount: id === "user-123" ? 87 : 34,
          totalViews: id === "user-123" ? 1250000 : 450000,
          joinDate: id === "user-123" ? "Jan 2020" : "Mar 2021",
          isSubscribed: false,
        }

        // Mock videos for this channel
        const mockVideos: VideoMetadata[] =
          id === "user-123"
            ? [
                {
                  id: "1",
                  title: "How to Build a YouTube Clone with Next.js",
                  description:
                    "In this tutorial, we'll learn how to build a YouTube clone using Next.js, Tailwind CSS, and Vercel Blob for video storage.",
                  uploaderId: id as string,
                  uploaderName: mockChannel.name,
                  thumbnailUrl: "/placeholder.svg?key=uzzpv",
                  videoUrl: "/sample-video.mp4",
                  duration: 842, // 14:02
                  resolution: "1080p",
                  category: "Education",
                  visibility: "public",
                  views: 12483,
                  likes: 876,
                  createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
                  updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
                  tags: ["nextjs", "tutorial", "coding", "webdev"],
                },
                {
                  id: "2",
                  title: "Building a Real-time Chat App with Next.js",
                  description: "Learn how to build a real-time chat application using Next.js and WebSockets",
                  uploaderId: id as string,
                  uploaderName: mockChannel.name,
                  thumbnailUrl: "/connected-conversations.png",
                  videoUrl: "/sample-video.mp4",
                  duration: 723, // 12:03
                  resolution: "1080p",
                  category: "Education",
                  visibility: "public",
                  views: 8765,
                  likes: 543,
                  createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
                  updatedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
                  tags: ["nextjs", "chat", "websockets"],
                },
              ]
            : [
                {
                  id: "3",
                  title: "Responsive Design Best Practices",
                  description: "Learn the best practices for creating responsive web designs",
                  uploaderId: id as string,
                  uploaderName: mockChannel.name,
                  thumbnailUrl: "/responsive-devices.png",
                  videoUrl: "/sample-video.mp4",
                  duration: 542, // 9:02
                  resolution: "1080p",
                  category: "Education",
                  visibility: "public",
                  views: 6543,
                  likes: 321,
                  createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
                  updatedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
                  tags: ["css", "responsive", "design"],
                },
              ]

        setChannel(mockChannel)
        setVideos(mockVideos)
        setIsSubscribed(mockChannel.isSubscribed)
      } catch (error) {
        console.error("Error fetching channel data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchChannelData()
    }
  }, [id])

  const toggleSubscription = () => {
    setIsSubscribed(!isSubscribed)
  }

  const handleShare = () => {
    // In a real app, you would implement sharing functionality
    // For now, we'll just copy the URL to clipboard
    navigator.clipboard.writeText(window.location.href)
    alert("Channel link copied to clipboard!")
  }

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-48 bg-gray-200 w-full"></div>
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-20 w-20 rounded-full bg-gray-200"></div>
            <div className="flex-1">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!channel) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-sky-900 mb-2">Channel not found</h1>
          <p className="text-sky-700">The channel you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Channel Banner */}
      <div className="relative h-48 md:h-64 bg-sky-100 overflow-hidden">
        {channel.bannerUrl && (
          <img
            src={channel.bannerUrl || "/placeholder.svg"}
            alt={`${channel.name} banner`}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Channel Info */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
          <Avatar className="h-24 w-24 border-4 border-white shadow-md">
            <AvatarImage src={channel.avatarUrl || "/placeholder.svg"} />
            <AvatarFallback>{channel.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-sky-900 mb-1">{channel.name}</h1>
            <div className="text-sky-700 mb-4">
              <span>{formatSubscriberCount(channel.subscriberCount)} subscribers</span>
              <span className="mx-2">•</span>
              <span>{channel.videoCount} videos</span>
              <span className="mx-2">•</span>
              <span>Joined {channel.joinDate}</span>
            </div>
            <p className="text-sky-800 mb-4 max-w-2xl">{channel.description}</p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center">
            <Button
              onClick={toggleSubscription}
              className={isSubscribed ? "bg-gray-200 text-gray-800 hover:bg-gray-300" : "bg-teal-500 hover:bg-teal-600"}
            >
              {isSubscribed ? "Subscribed" : "Subscribe"}
            </Button>
            {isSubscribed && (
              <Button variant="ghost" size="icon">
                <Bell className="w-4 h-4" />
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={handleShare}>
              <Share2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Channel Content */}
        <Tabs defaultValue="videos">
          <TabsList className="mb-6">
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="playlists">Playlists</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="videos">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
            {videos.length === 0 && (
              <div className="text-center py-12">
                <h2 className="text-xl font-medium text-sky-900 mb-2">No videos yet</h2>
                <p className="text-sky-700">This channel hasn't uploaded any videos</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="playlists">
            <div className="text-center py-12">
              <h2 className="text-xl font-medium text-sky-900 mb-2">No playlists yet</h2>
              <p className="text-sky-700">This channel hasn't created any playlists</p>
            </div>
          </TabsContent>

          <TabsContent value="community">
            <div className="text-center py-12">
              <h2 className="text-xl font-medium text-sky-900 mb-2">No community posts yet</h2>
              <p className="text-sky-700">This channel hasn't made any community posts</p>
            </div>
          </TabsContent>

          <TabsContent value="about">
            <div className="max-w-3xl">
              <div className="mb-6">
                <h2 className="text-lg font-medium text-sky-900 mb-2">Description</h2>
                <p className="text-sky-800 whitespace-pre-line">{channel.description}</p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-medium text-sky-900 mb-2">Stats</h2>
                <ul className="text-sky-800">
                  <li>Joined {channel.joinDate}</li>
                  <li>{formatNumber(channel.totalViews)} total views</li>
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-medium text-sky-900 mb-2">Links</h2>
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm">
                    Website
                  </Button>
                  <Button variant="outline" size="sm">
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm">
                    GitHub
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Helper function to format subscriber count
function formatSubscriberCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`
  } else {
    return count.toString()
  }
}

// Helper function to format numbers
function formatNumber(num: number): string {
  return num.toLocaleString()
}
