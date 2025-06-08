"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { VideoCard } from "@/components/video-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Search, SlidersHorizontal } from "lucide-react"
import type { VideoMetadata } from "@/types/video"
import { formatDistanceToNow } from "date-fns"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get("q") || ""

  const [searchQuery, setSearchQuery] = useState(query)
  const [videos, setVideos] = useState<VideoMetadata[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  // Filter states
  const [sortBy, setSortBy] = useState("relevance")
  const [uploadDate, setUploadDate] = useState("any")
  const [duration, setDuration] = useState("any")
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true)
      try {
        // In a real app, you would fetch search results from an API
        // For now, we'll use mock data
        const mockVideos: VideoMetadata[] = [
          {
            id: "1",
            title: "How to Build a YouTube Clone with Next.js",
            description:
              "In this tutorial, we'll learn how to build a YouTube clone using Next.js, Tailwind CSS, and Vercel Blob for video storage.",
            uploaderId: "user-123",
            uploaderName: "BitStream Tutorials",
            thumbnailUrl: "/placeholder.svg?key=gi3kl",
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
            id: "3",
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
        ]

        // Filter videos based on search query
        const filteredVideos = query
          ? mockVideos.filter(
              (video) =>
                video.title.toLowerCase().includes(query.toLowerCase()) ||
                video.description.toLowerCase().includes(query.toLowerCase()) ||
                video.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())),
            )
          : mockVideos

        setVideos(filteredVideos)
      } catch (error) {
        console.error("Error fetching search results:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSearchResults()
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleCategoryToggle = (category: string) => {
    setCategories((prev) => (prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]))
  }

  const applyFilters = () => {
    // In a real app, you would apply these filters to your search query
    console.log("Applying filters:", { sortBy, uploadDate, duration, categories })

    // For now, we'll just close the filters panel
    setShowFilters(false)
  }

  const resetFilters = () => {
    setSortBy("relevance")
    setUploadDate("any")
    setDuration("any")
    setCategories([])
  }

  // Apply filters to videos (in a real app, this would be done server-side)
  const filteredVideos = videos.filter((video) => {
    // Filter by categories if any are selected
    if (categories.length > 0 && !categories.includes(video.category)) {
      return false
    }

    // Filter by upload date
    if (uploadDate === "today") {
      const today = new Date()
      const videoDate = new Date(video.createdAt)
      if (
        today.getDate() !== videoDate.getDate() ||
        today.getMonth() !== videoDate.getMonth() ||
        today.getFullYear() !== videoDate.getFullYear()
      ) {
        return false
      }
    } else if (uploadDate === "week") {
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      if (new Date(video.createdAt) < weekAgo) {
        return false
      }
    } else if (uploadDate === "month") {
      const monthAgo = new Date()
      monthAgo.setMonth(monthAgo.getMonth() - 1)
      if (new Date(video.createdAt) < monthAgo) {
        return false
      }
    }

    // Filter by duration
    if (duration === "short" && video.duration > 240) {
      // < 4 minutes
      return false
    } else if (duration === "medium" && (video.duration <= 240 || video.duration > 1200)) {
      // 4-20 minutes
      return false
    } else if (duration === "long" && video.duration <= 1200) {
      // > 20 minutes
      return false
    }

    return true
  })

  // Sort videos
  const sortedVideos = [...filteredVideos].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    } else if (sortBy === "views") {
      return b.views - a.views
    } else if (sortBy === "rating") {
      return b.likes - a.likes
    }
    // Default: relevance (no specific sorting)
    return 0
  })

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Search Bar */}
      <div className="mb-6">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-sky-500" />
          </div>
          <Button type="submit" className="bg-teal-500 hover:bg-teal-600">
            Search
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? "bg-sky-100" : ""}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filters Panel */}
        {showFilters && (
          <div className="md:col-span-1 bg-white p-4 rounded-lg border border-sky-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-sky-900">Filters</h2>
              <Button variant="ghost" size="sm" onClick={resetFilters}>
                Reset
              </Button>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="sort">
                <AccordionTrigger className="text-sky-900">Sort by</AccordionTrigger>
                <AccordionContent>
                  <RadioGroup value={sortBy} onValueChange={setSortBy}>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="relevance" id="relevance" />
                      <Label htmlFor="relevance">Relevance</Label>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="date" id="date" />
                      <Label htmlFor="date">Upload date</Label>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="views" id="views" />
                      <Label htmlFor="views">View count</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="rating" id="rating" />
                      <Label htmlFor="rating">Rating</Label>
                    </div>
                  </RadioGroup>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="upload-date">
                <AccordionTrigger className="text-sky-900">Upload date</AccordionTrigger>
                <AccordionContent>
                  <RadioGroup value={uploadDate} onValueChange={setUploadDate}>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="any" id="any-date" />
                      <Label htmlFor="any-date">Any time</Label>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="today" id="today" />
                      <Label htmlFor="today">Today</Label>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="week" id="week" />
                      <Label htmlFor="week">This week</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="month" id="month" />
                      <Label htmlFor="month">This month</Label>
                    </div>
                  </RadioGroup>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="duration">
                <AccordionTrigger className="text-sky-900">Duration</AccordionTrigger>
                <AccordionContent>
                  <RadioGroup value={duration} onValueChange={setDuration}>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="any" id="any-duration" />
                      <Label htmlFor="any-duration">Any duration</Label>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="short" id="short" />
                      <Label htmlFor="short">Under 4 minutes</Label>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label htmlFor="medium">4-20 minutes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="long" id="long" />
                      <Label htmlFor="long">Over 20 minutes</Label>
                    </div>
                  </RadioGroup>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="categories">
                <AccordionTrigger className="text-sky-900">Categories</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {["Education", "Gaming", "Music", "Sports", "Food", "Technology", "Entertainment"].map(
                      (category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={`category-${category.toLowerCase()}`}
                            checked={categories.includes(category)}
                            onCheckedChange={() => handleCategoryToggle(category)}
                          />
                          <Label htmlFor={`category-${category.toLowerCase()}`}>{category}</Label>
                        </div>
                      ),
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Button className="w-full mt-4 bg-teal-500 hover:bg-teal-600" onClick={applyFilters}>
              Apply Filters
            </Button>
          </div>
        )}

        {/* Search Results */}
        <div className={`${showFilters ? "md:col-span-3" : "md:col-span-4"}`}>
          {query && (
            <div className="mb-4">
              <h1 className="text-xl font-medium text-sky-900">
                Search results for <span className="font-bold">"{query}"</span>
              </h1>
              <p className="text-sky-700">{sortedVideos.length} results</p>
            </div>
          )}

          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse flex gap-4">
                  <div className="w-64 aspect-video bg-gray-200 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="h-5 bg-gray-200 rounded mb-2 w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : sortedVideos.length > 0 ? (
            <div className="space-y-4">
              {sortedVideos.map((video) => (
                <div key={video.id} className="flex gap-4">
                  <div className="w-64 flex-shrink-0">
                    <VideoCard video={video} />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-medium text-sky-900 mb-1">{video.title}</h2>
                    <p className="text-sm text-sky-700 mb-2">
                      {video.views.toLocaleString()} views •{" "}
                      {formatDistanceToNow(new Date(video.createdAt), { addSuffix: true })}
                    </p>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-medium text-xs">
                        {video.uploaderName.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm text-sky-700">{video.uploaderName}</span>
                    </div>
                    <p className="text-sm text-sky-800 line-clamp-2">{video.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl font-medium text-sky-900 mb-2">No videos found</h2>
              <p className="text-sky-700">Try different search terms or filters</p>
            </div>
          )}
        </div>
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
