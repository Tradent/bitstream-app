export interface VideoMetadata {
  id: string
  title: string
  description: string
  uploaderId: string
  uploaderName: string
  thumbnailUrl: string
  videoUrl: string
  duration: number
  resolution: string
  category: string
  visibility: "public" | "private" | "unlisted"
  views: number
  likes: number
  createdAt: string
  updatedAt: string
  tags: string[]
  replies?: VideoComment[]
}

export interface VideoComment {
  id: string
  videoId: string
  userId: string
  userName: string
  userAvatarUrl?: string
  content: string
  likes: number
  createdAt: string
  replies?: VideoComment[]
}

export interface VideoUploadState {
  progress: number
  status: "idle" | "uploading" | "complete" | "error"
  message?: string
  videoId?: string
}

export interface Video {
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
