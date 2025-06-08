import type { VideoMetadata, VideoComment } from "@/types/video"
import { nanoid } from "nanoid"

// This is a mock database service
// In a real application, you would use a database like Supabase, MongoDB, etc.
let videos: VideoMetadata[] = []
const comments: VideoComment[] = []

export async function createVideo(videoData: Partial<VideoMetadata>): Promise<VideoMetadata> {
  const now = new Date().toISOString()
  const newVideo: VideoMetadata = {
    id: nanoid(),
    title: videoData.title || "Untitled Video",
    description: videoData.description || "",
    uploaderId: videoData.uploaderId || "",
    uploaderName: videoData.uploaderName || "Anonymous",
    thumbnailUrl: videoData.thumbnailUrl || "",
    videoUrl: videoData.videoUrl || "",
    duration: videoData.duration || 0,
    resolution: videoData.resolution || "720p",
    category: videoData.category || "Uncategorized",
    visibility: videoData.visibility || "private",
    views: 0,
    likes: 0,
    createdAt: now,
    updatedAt: now,
    tags: videoData.tags || [],
  }

  videos.push(newVideo)
  return newVideo
}

export async function getVideoById(id: string): Promise<VideoMetadata | null> {
  return videos.find((video) => video.id === id) || null
}

export async function updateVideo(id: string, updates: Partial<VideoMetadata>): Promise<VideoMetadata | null> {
  const videoIndex = videos.findIndex((video) => video.id === id)
  if (videoIndex === -1) return null

  videos[videoIndex] = {
    ...videos[videoIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  }

  return videos[videoIndex]
}

export async function deleteVideo(id: string): Promise<boolean> {
  const initialLength = videos.length
  videos = videos.filter((video) => video.id !== id)
  return videos.length < initialLength
}

export async function getPublicVideos(limit = 20, offset = 0): Promise<VideoMetadata[]> {
  return videos
    .filter((video) => video.visibility === "public")
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(offset, offset + limit)
}

export async function getUserVideos(userId: string): Promise<VideoMetadata[]> {
  return videos
    .filter((video) => video.uploaderId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function incrementVideoViews(id: string): Promise<void> {
  const video = videos.find((video) => video.id === id)
  if (video) {
    video.views += 1
  }
}

// Comment functions
export async function addComment(comment: Omit<VideoComment, "id" | "createdAt">): Promise<VideoComment> {
  const newComment: VideoComment = {
    ...comment,
    id: nanoid(),
    likes: 0,
    createdAt: new Date().toISOString(),
  }

  comments.push(newComment)
  return newComment
}

export async function getVideoComments(videoId: string): Promise<VideoComment[]> {
  return comments
    .filter((comment) => comment.videoId === videoId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}
