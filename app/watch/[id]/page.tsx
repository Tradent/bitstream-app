"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { VideoPlayer } from "@/components/video-player"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ThumbsUp, ThumbsDown, Share2, Bookmark, MoreHorizontal, ArrowLeft } from "lucide-react"
import { CommentSection } from "@/components/comment-section"
import { VideoShareModal } from "@/components/video-share-modal"
import { PlaylistModal } from "@/components/playlist-modal"
import { SubscribeButton } from "@/components/subscribe-button"
import type { VideoMetadata, VideoComment } from "@/types/video"

export default function WatchPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [video, setVideo] = useState<VideoMetadata | null>(null)
  const [comments, setComments] = useState<VideoComment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [relatedVideos, setRelatedVideos] = useState<VideoMetadata[]>([])
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [showPlaylistModal, setShowPlaylistModal] = useState(false)

  // Fetch video data
  useEffect(() => {
    const fetchVideoData = async () => {
      setIsLoading(true)
      try {
        // In a real app, you would fetch the video data from the server
        // For now, we'll just use mock data
        const mockVideo: VideoMetadata = {
          id: id as string,
          title: "How to Build a YouTube Clone with Next.js",
          description:
            "In this tutorial, we'll learn how to build a YouTube clone using Next.js, Tailwind CSS, and Vercel Blob for video storage. We'll cover video uploads, playback, comments, and more.\n\nTopics covered:\n- Setting up Next.js with App Router\n- Implementing video uploads with Vercel Blob\n- Creating a video player component\n- Building comment systems\n- Implementing search and discovery features\n- Optimizing for mobile devices\n\nThis is part of our full-stack development series where we build real-world applications from scratch.",
          uploaderId: "user-123",
          uploaderName: "BitStream Tutorials",
          thumbnailUrl: "/placeholder.svg?key=o3a9q",
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
        }

        const mockComments: VideoComment[] = [
          {
            id: "comment-1",
            videoId: id as string,
            userId: "user-456",
            userName: "WebDev Enthusiast",
            userAvatarUrl: "/Na'vi Hunter.png",
            content:
              "This tutorial was super helpful! I've been trying to figure out how to implement video uploads for weeks.",
            likes: 24,
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
          },
          {
            id: "comment-2",
            videoId: id as string,
            userId: "user-789",
            userName: "CodeMaster",
            userAvatarUrl: "/pandora-ocean.png",
            content:
              "Great explanation of the video processing pipeline. Could you do a follow-up on implementing adaptive streaming?",
            likes: 12,
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
          },
        ]

        const mockRelatedVideos: VideoMetadata[] = [
          {
            id: "related-1",
            title: "Building a Real-time Chat App with Next.js",
            description: "Learn how to build a real-time chat application using Next.js and WebSockets",
            uploaderId: "user-123",
            uploaderName: "BitStream Tutorials",
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
          {
            id: "related-2",
            title: "Responsive Design Best Practices",
            description: "Learn the best practices for creating responsive web designs",
            uploaderId: "user-456",
            uploaderName: "WebDev Enthusiast",
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
          {
            id: "related-3",
            title: "Introduction to Tailwind CSS",
            description: "Get started with Tailwind CSS and learn how to build modern UIs",
            uploaderId: "user-789",
            uploaderName: "CodeMaster",
            thumbnailUrl: "/tailwind-css-components.png",
            videoUrl: "/sample-video.mp4",
            duration: 632, // 10:32
            resolution: "1080p",
            category: "Education",
            visibility: "public",
            views: 9876,
            likes: 654,
            createdAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(),
            tags: ["tailwind", "css", "frontend"],
          },
        ]

        setVideo(mockVideo)
        setComments(mockComments)
        setRelatedVideos(mockRelatedVideos)

        // Increment view count
        // In a real app, you would call an API to increment the view count
        // incrementVideoViews(id as string)
      } catch (error) {
        console.error("Error fetching video:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchVideoData()
    }
  }, [id])

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false)
      setVideo((prev) => prev && { ...prev, likes: prev.likes - 1 })
    } else {
      setIsLiked(true)
      if (isDisliked) {
        setIsDisliked(false)
      }
      setVideo((prev) => prev && { ...prev, likes: prev.likes + 1 })
    }
  }

  const handleDislike = () => {
    if (isDisliked) {
      setIsDisliked(false)
    } else {
      setIsDisliked(true)
      if (isLiked) {
        setIsLiked(false)
        setVideo((prev) => prev && { ...prev, likes: prev.likes - 1 })
      }
    }
  }

  // Format duration in seconds to MM:SS
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="aspect-video bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-8 bg-gray-200 rounded mb-4 w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded mb-4 w-1/3"></div>
        </div>
      </div>
    )
  }

  if (!video) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-sky-900">Video not found</h1>
          <p className="text-sky-700 mb-4">The video you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => router.push("/")}>Go to Homepage</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-4">
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-sky-700 hover:text-sky-900 hover:bg-sky-50"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Video Player */}
          <div className="rounded-lg overflow-hidden mb-4">
            <VideoPlayer src={video.videoUrl} poster={video.thumbnailUrl} title={video.title} />
          </div>

          {/* Video Info */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-sky-900 mb-2">{video.title}</h1>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="text-sky-700">
                {video.views.toLocaleString()} views •{" "}
                {formatDistanceToNow(new Date(video.createdAt), { addSuffix: true })}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  variant="ghost"
                  className={`flex items-center gap-1 ${isLiked ? "text-teal-600" : ""}`}
                  onClick={handleLike}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{video.likes.toLocaleString()}</span>
                </Button>
                <Button
                  variant="ghost"
                  className={`flex items-center gap-1 ${isDisliked ? "text-red-600" : ""}`}
                  onClick={handleDislike}
                >
                  <ThumbsDown className="w-4 h-4" />
                </Button>
                <Button variant="ghost" className="flex items-center gap-1" onClick={() => setShowShareModal(true)}>
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </Button>
                <Button variant="ghost" className="flex items-center gap-1" onClick={() => setShowPlaylistModal(true)}>
                  <Bookmark className="w-4 h-4" />
                  <span>Save</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Channel Info */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <Link href={`/channel/${video.uploaderId}`}>
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={`/abstract-geometric-shapes.png?key=un0oq&height=40&width=40&query=${encodeURIComponent(video.uploaderName)}`}
                    />
                    <AvatarFallback>{video.uploaderName.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link href={`/channel/${video.uploaderId}`} className="font-medium text-sky-900 hover:text-sky-700">
                    {video.uploaderName}
                  </Link>
                  <div className="text-sm text-sky-600">42.3K subscribers</div>
                </div>
              </div>
              <SubscribeButton channelId={video.uploaderId} channelName={video.uploaderName} />
            </div>

            <Separator className="my-4" />

            {/* Video Description */}
            <div className="bg-sky-50 rounded-lg p-4">
              <div className="flex gap-2 flex-wrap mb-2">
                {video.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="bg-sky-100 text-sky-700 hover:bg-sky-200">
                    #{tag}
                  </Badge>
                ))}
              </div>
              <div className={`text-sky-800 whitespace-pre-line ${!showFullDescription && "line-clamp-3"}`}>
                {video.description}
              </div>
              {video.description.split("\n").length > 3 && (
                <Button
                  variant="link"
                  className="p-0 h-auto text-sky-700"
                  onClick={() => setShowFullDescription(!showFullDescription)}
                >
                  {showFullDescription ? "Show less" : "Show more"}
                </Button>
              )}
            </div>
          </div>

          {/* Comments Section */}
          <div className="mb-6">
            <Tabs defaultValue="comments">
              <TabsList>
                <TabsTrigger value="comments">Comments ({comments.length})</TabsTrigger>
                <TabsTrigger value="transcript">Transcript</TabsTrigger>
              </TabsList>
              <TabsContent value="comments" className="pt-4">
                <CommentSection videoId={id as string} initialComments={comments} />
              </TabsContent>
              <TabsContent value="transcript" className="pt-4">
                <div className="bg-sky-50 p-4 rounded-lg">
                  <p className="text-sky-700 italic">Transcript is not available for this video.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Related Videos */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-sky-900 mb-2">Related Videos</h2>
          {relatedVideos.map((relatedVideo) => (
            <Link href={`/watch/${relatedVideo.id}`} key={relatedVideo.id} className="block">
              <div className="flex gap-2 group">
                <div className="relative w-40 flex-shrink-0">
                  <div className="aspect-video rounded-lg overflow-hidden bg-sky-100">
                    <img
                      src={
                        relatedVideo.thumbnailUrl ||
                        `/placeholder.svg?height=90&width=160&query=${encodeURIComponent(relatedVideo.title) || "/placeholder.svg"}`
                      }
                      alt={relatedVideo.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 py-0.5 rounded">
                    {formatDuration(relatedVideo.duration)}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sky-900 line-clamp-2 group-hover:text-teal-600">
                    {relatedVideo.title}
                  </h3>
                  <p className="text-sm text-sky-700 mt-1">{relatedVideo.uploaderName}</p>
                  <p className="text-xs text-sky-600">
                    {relatedVideo.views.toLocaleString()} views •{" "}
                    {formatDistanceToNow(new Date(relatedVideo.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Modals */}
      <VideoShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        videoId={video.id}
        videoTitle={video.title}
      />

      <PlaylistModal
        isOpen={showPlaylistModal}
        onClose={() => setShowPlaylistModal(false)}
        videoId={video.id}
        videoTitle={video.title}
      />
    </div>
  )
}
