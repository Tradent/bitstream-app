import { put, del, list, head } from "@vercel/blob"
import { nanoid } from "nanoid"

export async function uploadVideoToBlob(file: File, userId: string): Promise<{ url: string; blobName: string }> {
  try {
    const fileExtension = file.name.split(".").pop()
    const blobName = `videos/${userId}/${nanoid()}.${fileExtension}`

    const { url } = await put(blobName, file, {
      access: "public",
      addRandomSuffix: false,
    })

    return { url, blobName }
  } catch (error) {
    console.error("Error uploading video to Blob:", error)
    throw new Error("Failed to upload video")
  }
}

export async function uploadThumbnailToBlob(
  file: File,
  videoId: string,
  userId: string,
): Promise<{ url: string; blobName: string }> {
  try {
    const fileExtension = file.name.split(".").pop()
    const blobName = `thumbnails/${userId}/${videoId}.${fileExtension}`

    const { url } = await put(blobName, file, {
      access: "public",
      addRandomSuffix: false,
    })

    return { url, blobName }
  } catch (error) {
    console.error("Error uploading thumbnail to Blob:", error)
    throw new Error("Failed to upload thumbnail")
  }
}

export async function deleteVideoFromBlob(blobName: string): Promise<void> {
  try {
    await del(blobName)
  } catch (error) {
    console.error("Error deleting video from Blob:", error)
    throw new Error("Failed to delete video")
  }
}

export async function getUserVideos(userId: string): Promise<string[]> {
  try {
    const { blobs } = await list({
      prefix: `videos/${userId}/`,
    })

    return blobs.map((blob) => blob.url)
  } catch (error) {
    console.error("Error listing user videos:", error)
    throw new Error("Failed to list videos")
  }
}

export async function checkVideoAccess(blobName: string): Promise<boolean> {
  try {
    const blob = await head(blobName)
    return !!blob
  } catch (error) {
    return false
  }
}
