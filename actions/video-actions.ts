"use server"

import { nanoid } from "nanoid"
import { uploadVideoToBlob, uploadThumbnailToBlob } from "@/lib/blob-storage"
import { createVideo, updateVideo } from "@/lib/video-service"

export async function uploadVideo(formData: FormData) {
  try {
    // Extract data from form
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const category = formData.get("category") as string
    const visibility = formData.get("visibility") as "public" | "private" | "unlisted"
    const tags = ((formData.get("tags") as string) || "").split(",").map((tag) => tag.trim())
    const videoFile = formData.get("video") as File
    const thumbnailFile = formData.get("thumbnail") as File

    // Mock user data (in a real app, this would come from authentication)
    const userId = "user-123"
    const userName = "Demo User"

    // Generate a unique ID for the video
    const videoId = nanoid()

    // Upload video to Blob storage
    const { url: videoUrl } = await uploadVideoToBlob(videoFile, userId)

    // Upload thumbnail to Blob storage
    const { url: thumbnailUrl } = await uploadThumbnailToBlob(thumbnailFile, videoId, userId)

    // Extract video metadata (in a real app, you would use a library like ffmpeg)
    const duration = 120 // Mock duration in seconds
    const resolution = "720p" // Mock resolution

    // Create video record in database
    const video = await createVideo({
      id: videoId,
      title,
      description,
      uploaderId: userId,
      uploaderName: userName,
      thumbnailUrl,
      videoUrl,
      duration,
      resolution,
      category,
      visibility,
      tags,
    })

    // In a real app, you would start a background job for video processing
    // For now, we'll simulate this by updating the video after a delay
    setTimeout(async () => {
      await updateVideo(videoId, {
        // In a real app, these would be the URLs to the transcoded videos
        videoUrl,
      })
    }, 3000)

    return { success: true, videoId: video.id }
  } catch (error) {
    console.error("Error uploading video:", error)
    return { success: false, error: "Failed to upload video" }
  }
}

export async function generateThumbnail(videoId: string, timestamp: number) {
  try {
    // In a real app, you would use a library like ffmpeg to extract a frame at the given timestamp
    // For now, we'll just return a mock thumbnail URL
    const thumbnailUrl = `/placeholder.svg?height=480&width=640&query=video thumbnail at ${timestamp} seconds`

    // Update the video with the new thumbnail
    await updateVideo(videoId, {
      thumbnailUrl,
    })

    return { success: true, thumbnailUrl }
  } catch (error) {
    console.error("Error generating thumbnail:", error)
    return { success: false, error: "Failed to generate thumbnail" }
  }
}
