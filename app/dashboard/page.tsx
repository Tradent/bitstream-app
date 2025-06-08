"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Play, BarChart2, Video, Users, Clock, DollarSign } from "lucide-react"
import { VideoUploadModal } from "@/components/video-upload-modal"
import { VideoPlayer } from "@/components/video-player"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import Link from "next/link"
import type { VideoMetadata } from "@/types/video"

export default function Dashboard() {
  // Sample videos data
  const [videos, setVideos] = useState<VideoMetadata[]>([
    {
      id: "1",
      title: "Getting Started with BitStream",
      description: "Learn how to use BitStream to share your videos",
      uploaderId: "user-123",
      uploaderName: "Demo User",
      thumbnailUrl: "/placeholder.svg?key=la6i1",
      videoUrl: "/sample-video.mp4",
      duration: 182, // 3:02
      resolution: "720p",
      category: "Education",
      visibility: "public",
      views: 1248,
      likes: 87,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      tags: ["tutorial", "bitstream", "getting-started"],
    },
    {
      id: "2",
      title: "My First Vlog - Exploring the City",
      description: "Join me as I explore the city and share my experiences",
      uploaderId: "user-123",
      uploaderName: "Demo User",
      thumbnailUrl: "/placeholder.svg?key=9w9gp",
      videoUrl: "/sample-video.mp4",
      duration: 423, // 7:03
      resolution: "1080p",
      category: "Vlog",
      visibility: "public",
      views: 856,
      likes: 42,
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
      updatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      tags: ["vlog", "city", "travel"],
    },
  ])

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [currentVideo, setCurrentVideo] = useState<VideoMetadata | null>(null)
  const [isPlayerActive, setIsPlayerActive] = useState(false)

  const { toast } = useToast()
  const router = useRouter()

  const handleUploadComplete = (videoId: string) => {
    // In a real app, you would fetch the video data from the server
    // For now, we'll just add a mock video to the list
    const newVideo: VideoMetadata = {
      id: videoId,
      title: "Newly Uploaded Video",
      description: "This video was just uploaded",
      uploaderId: "user-123",
      uploaderName: "Demo User",
      thumbnailUrl: "/placeholder.svg?key=zl32d",
      videoUrl: "/sample-video.mp4",
      duration: 120,
      resolution: "720p",
      category: "Other",
      visibility: "private",
      views: 0,
      likes: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: [],
    }

    setVideos([newVideo, ...videos])

    toast({
      title: "Video uploaded",
      description: `${newVideo.title} has been added to your library`,
    })
  }

  const handlePlayVideo = (video: VideoMetadata) => {
    setCurrentVideo(video)
    setIsPlayerActive(true)
  }

  const handleClosePlayer = () => {
    setCurrentVideo(null)
    setIsPlayerActive(false)
  }

  return (
    <div className="min-h-screen bg-sky-50">
      <div className="container px-4 py-8 mx-auto">
        <div className="flex flex-col items-start justify-between mb-8 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-sky-900">Welcome to BitStream</h1>
            <p className="text-sky-700">Upload, manage, and share your videos</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button className="bg-teal-500 hover:bg-teal-600" onClick={() => setIsUploadModalOpen(true)}>
              <Upload className="w-4 h-4 mr-2" /> Upload Video
            </Button>
            {videos.length > 0 && (
              <Button
                variant="outline"
                className="text-sky-700 border-sky-300 hover:bg-sky-100"
                onClick={() => handlePlayVideo(videos[0])}
              >
                <Play className="w-4 h-4 mr-2" /> Preview
              </Button>
            )}
          </div>
        </div>

        <div className="grid gap-6 mb-8 md:grid-cols-4">
          {[
            {
              title: "Total Videos",
              value: videos.length.toString(),
              icon: <Video className="w-5 h-5 text-teal-500" />,
              change: "+1 this week",
            },
            {
              title: "Total Views",
              value: videos.reduce((sum, video) => sum + video.views, 0).toLocaleString(),
              icon: <Users className="w-5 h-5 text-teal-500" />,
              change: "+12% from last month",
              link: "/analytics",
            },
            {
              title: "Watch Time",
              value: "324h",
              icon: <Clock className="w-5 h-5 text-teal-500" />,
              change: "+28h this week",
              link: "/analytics",
            },
            {
              title: "Estimated Revenue",
              value: "$245.32",
              icon: <DollarSign className="w-5 h-5 text-teal-500" />,
              change: "+15% from last month",
              link: "/monetization",
            },
          ].map((stat, i) => (
            <Card key={i} className={stat.link ? "cursor-pointer hover:shadow-md transition-shadow" : ""}>
              {stat.link ? (
                <Link href={stat.link}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-sky-700">{stat.title}</CardTitle>
                    {stat.icon}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-sky-900">{stat.value}</div>
                    <p className="text-xs text-sky-600">{stat.change}</p>
                  </CardContent>
                </Link>
              ) : (
                <>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-sky-700">{stat.title}</CardTitle>
                    {stat.icon}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-sky-900">{stat.value}</div>
                    <p className="text-xs text-sky-600">{stat.change}</p>
                  </CardContent>
                </>
              )}
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  className="h-auto py-4 flex flex-col items-center justify-center gap-2 hover:bg-sky-50"
                  onClick={() => setIsUploadModalOpen(true)}
                >
                  <Upload className="h-6 w-6 text-sky-700" />
                  <span>Upload Video</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto py-4 flex flex-col items-center justify-center gap-2 hover:bg-sky-50"
                  onClick={() => router.push("/analytics")}
                >
                  <BarChart2 className="h-6 w-6 text-sky-700" />
                  <span>View Analytics</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto py-4 flex flex-col items-center justify-center gap-2 hover:bg-sky-50"
                  onClick={() => router.push("/monetization")}
                >
                  <DollarSign className="h-6 w-6 text-sky-700" />
                  <span>Monetization</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Channel Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-sky-700">Subscribers</span>
                    <span className="font-medium text-sky-900">1,248</span>
                  </div>
                  <div className="h-2 bg-sky-100 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-500 rounded-full" style={{ width: "62%" }}></div>
                  </div>
                  <p className="text-xs text-teal-600 mt-1">+124 this month</p>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-sky-700">Engagement Rate</span>
                    <span className="font-medium text-sky-900">24.8%</span>
                  </div>
                  <div className="h-2 bg-sky-100 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-500 rounded-full" style={{ width: "24.8%" }}></div>
                  </div>
                  <p className="text-xs text-teal-600 mt-1">+3.1% from last month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="videos" className="mb-8">
          <TabsList className="grid w-full grid-cols-3 md:w-auto">
            <TabsTrigger value="videos">My Videos</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="videos" className="p-4 mt-4 bg-white rounded-lg shadow">
            {videos.length > 0 ? (
              <div className="space-y-4">
                {videos.map((video) => (
                  <div
                    key={video.id}
                    className="flex items-center justify-between p-3 transition-colors rounded-lg hover:bg-sky-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-24 h-14 overflow-hidden rounded bg-sky-100">
                        <img
                          src={video.thumbnailUrl || "/placeholder.svg"}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-sky-900">{video.title}</h4>
                        <p className="text-sm text-sky-600">
                          {formatDuration(video.duration)} • {video.views.toLocaleString()} views
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="px-2 py-1 text-xs rounded bg-sky-100 text-sky-700">{video.visibility}</div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-sky-700 hover:text-sky-900 hover:bg-sky-100"
                        onClick={() => handlePlayVideo(video)}
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <Video className="w-12 h-12 mx-auto mb-4 text-sky-400" />
                <h3 className="mb-2 text-lg font-medium text-sky-900">No videos yet</h3>
                <p className="mb-4 text-sm text-sky-600">Upload your first video to get started</p>
                <Button className="bg-teal-500 hover:bg-teal-600" onClick={() => setIsUploadModalOpen(true)}>
                  <Upload className="w-4 h-4 mr-2" /> Upload Video
                </Button>
              </div>
            )}
          </TabsContent>
          <TabsContent value="analytics" className="p-4 mt-4 bg-white rounded-lg shadow">
            <h3 className="mb-4 text-xl font-semibold text-sky-900">Performance Analytics</h3>
            <div className="h-64 p-4 mb-4 rounded-lg bg-sky-50 flex flex-col items-center justify-center">
              <BarChart2 className="h-12 w-12 text-sky-400 mb-4" />
              <div className="text-center">
                <h4 className="text-lg font-medium text-sky-900 mb-2">View detailed analytics</h4>
                <p className="text-sky-700 mb-4">Get insights about your audience and content performance</p>
                <Button className="bg-teal-500 hover:bg-teal-600" onClick={() => router.push("/analytics")}>
                  Go to Analytics Dashboard
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="settings" className="p-4 mt-4 bg-white rounded-lg shadow">
            <h3 className="mb-4 text-xl font-semibold text-sky-900">Account Settings</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-sky-50">
                <h4 className="mb-2 font-medium text-sky-900">Channel Preferences</h4>
                <p className="text-sm text-sky-700">Configure your channel settings and branding</p>
              </div>
              <div className="p-4 rounded-lg bg-sky-50">
                <h4 className="mb-2 font-medium text-sky-900">Content Permissions</h4>
                <p className="text-sm text-sky-700">Set default permissions for your videos</p>
              </div>
              <div className="p-4 rounded-lg bg-sky-50">
                <h4 className="mb-2 font-medium text-sky-900">Profile Settings</h4>
                <p className="text-sm text-sky-700">Update your profile and public information</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {isUploadModalOpen && (
          <VideoUploadModal
            isOpen={isUploadModalOpen}
            onClose={() => setIsUploadModalOpen(false)}
            onUploadComplete={handleUploadComplete}
          />
        )}

        {currentVideo && isPlayerActive && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="relative w-full max-w-4xl">
              <Button
                variant="ghost"
                size="sm"
                className="absolute -top-10 right-0 text-white hover:bg-white/20"
                onClick={handleClosePlayer}
              >
                Close
              </Button>
              <VideoPlayer src={currentVideo.videoUrl} poster={currentVideo.thumbnailUrl} title={currentVideo.title} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Helper function to format duration in seconds to MM:SS
function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}
