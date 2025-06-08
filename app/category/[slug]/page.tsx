"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { VideoCard } from "@/components/video-card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import type { VideoMetadata } from "@/types/video"

interface CategoryData {
  slug: string
  name: string
  description: string
  videoCount: number
}

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const [category, setCategory] = useState<CategoryData | null>(null)
  const [videos, setVideos] = useState<VideoMetadata[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState("trending")
  const [loadedCount, setLoadedCount] = useState(8)

  useEffect(() => {
    const fetchCategoryData = async () => {
      setIsLoading(true)
      try {
        // In a real app, you would fetch category data from an API
        // For now, we'll use mock data
        const categoryMap: Record<string, CategoryData> = {
          education: {
            slug: "education",
            name: "Education",
            description: "Learn new skills and expand your knowledge with educational videos.",
            videoCount: 12500,
          },
          gaming: {
            slug: "gaming",
            name: "Gaming",
            description: "Watch gameplay, tutorials, and reviews for your favorite games.",
            videoCount: 45000,
          },
          music: {
            slug: "music",
            name: "Music",
            description: "Discover new music, watch music videos, and enjoy live performances.",
            videoCount: 78000,
          },
          sports: {
            slug: "sports",
            name: "Sports",
            description: "Stay up to date with highlights, analysis, and sports news.",
            videoCount: 32000,
          },
          food: {
            slug: "food",
            name: "Food",
            description: "Explore recipes, cooking tutorials, and food reviews.",
            videoCount: 18500,
          },
        }

        const selectedCategory = categoryMap[slug as string] || {
          slug: slug as string,
          name: (slug as string).charAt(0).toUpperCase() + (slug as string).slice(1),
          description: "Browse videos in this category.",
          videoCount: 5000,
        }

        setCategory(selectedCategory)

        // Mock videos for this category
        const mockVideos: VideoMetadata[] = Array(20)
          .fill(null)
          .map((_, index) => ({
            id: `${slug}-${index + 1}`,
            title: `${selectedCategory.name} Video ${index + 1}`,
            description: `This is a sample ${selectedCategory.name.toLowerCase()} video description.`,
            uploaderId: `user-${Math.floor(Math.random() * 1000)}`,
            uploaderName: `${selectedCategory.name} Creator ${Math.floor(Math.random() * 100)}`,
            thumbnailUrl: `/placeholder.svg?height=720&width=1280&query=${encodeURIComponent(`${selectedCategory.name} video ${index + 1}`)}`,
            videoUrl: "/sample-video.mp4",
            duration: 300 + Math.floor(Math.random() * 900), // 5-20 minutes
            resolution: "1080p",
            category: selectedCategory.name,
            visibility: "public",
            views: Math.floor(Math.random() * 100000),
            likes: Math.floor(Math.random() * 10000),
            createdAt: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString(),
            tags: [selectedCategory.name.toLowerCase(), "sample", `tag-${index}`],
          }))

        setVideos(mockVideos)
      } catch (error) {
        console.error("Error fetching category data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (slug) {
      fetchCategoryData()
    }
  }, [slug])

  const loadMore = () => {
    setLoadedCount((prev) => Math.min(prev + 8, videos.length))
  }

  // Sort videos based on selected sort option
  const sortedVideos = [...videos].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    } else if (sortBy === "popular") {
      return b.views - a.views
    } else if (sortBy === "rating") {
      return b.likes - a.likes
    }
    // Default: trending (a mix of views, likes, and recency)
    const viewsWeight = 0.5
    const likesWeight = 0.3
    const recencyWeight = 0.2

    const aScore = a.views * viewsWeight + a.likes * likesWeight + new Date(a.createdAt).getTime() * recencyWeight
    const bScore = b.views * viewsWeight + b.likes * likesWeight + new Date(b.createdAt).getTime() * recencyWeight

    return bScore - aScore
  })

  const displayedVideos = sortedVideos.slice(0, loadedCount)

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i}>
                <div className="aspect-video bg-gray-200 rounded-lg mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded mb-2 w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-sky-900 mb-2">Category not found</h1>
          <p className="text-sky-700">The category you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-sky-900 mb-2">{category.name}</h1>
        <p className="text-sky-700 mb-2">{category.description}</p>
        <p className="text-sm text-sky-600">{category.videoCount.toLocaleString()} videos</p>
      </div>

      <div className="mb-6">
        <Tabs value={sortBy} onValueChange={setSortBy}>
          <TabsList>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="newest">Newest</TabsTrigger>
            <TabsTrigger value="popular">Most Viewed</TabsTrigger>
            <TabsTrigger value="rating">Top Rated</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {displayedVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      {loadedCount < videos.length && (
        <div className="text-center">
          <Button variant="outline" onClick={loadMore} className="px-8">
            Load More <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
