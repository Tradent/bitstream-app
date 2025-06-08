"use client"

import type React from "react"

import { useState, useRef } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Globe, Lock, Eye, Upload, Check, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { uploadVideo } from "@/actions/video-actions"
import type { VideoUploadState } from "@/types/video"

interface VideoUploadModalProps {
  isOpen: boolean
  onClose: () => void
  onUploadComplete?: (videoId: string) => void
}

export function VideoUploadModal({ isOpen, onClose, onUploadComplete }: VideoUploadModalProps) {
  const [activeTab, setActiveTab] = useState("details")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("Education")
  const [tags, setTags] = useState("")
  const [visibility, setVisibility] = useState<"public" | "private" | "unlisted">("private")
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
  const [uploadState, setUploadState] = useState<VideoUploadState>({
    progress: 0,
    status: "idle",
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const thumbnailInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type.startsWith("video/")) {
        setVideoFile(file)
        setTitle(file.name.replace(/\.[^/.]+$/, "")) // Set title to filename without extension
      } else {
        toast({
          title: "Invalid file type",
          description: "Please select a video file",
          variant: "destructive",
        })
      }
    }
  }

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type.startsWith("image/")) {
        setThumbnailFile(file)
        const reader = new FileReader()
        reader.onload = (e) => {
          setThumbnailPreview(e.target?.result as string)
        }
        reader.readAsDataURL(file)
      } else {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        })
      }
    }
  }

  const handleUpload = async () => {
    if (!videoFile) {
      toast({
        title: "No video selected",
        description: "Please select a video file to upload",
        variant: "destructive",
      })
      return
    }

    if (!title) {
      toast({
        title: "Title required",
        description: "Please enter a title for your video",
        variant: "destructive",
      })
      return
    }

    setUploadState({
      progress: 0,
      status: "uploading",
    })

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadState((prev) => ({
        ...prev,
        progress: Math.min(prev.progress + 10, 90),
      }))
    }, 500)

    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("description", description)
      formData.append("category", category)
      formData.append("visibility", visibility)
      formData.append("tags", tags)
      formData.append("video", videoFile)

      if (thumbnailFile) {
        formData.append("thumbnail", thumbnailFile)
      }

      const result = await uploadVideo(formData)

      clearInterval(progressInterval)

      if (result.success) {
        setUploadState({
          progress: 100,
          status: "complete",
          videoId: result.videoId,
        })

        toast({
          title: "Upload successful",
          description: "Your video has been uploaded successfully",
        })

        if (onUploadComplete && result.videoId) {
          onUploadComplete(result.videoId)
        }
      } else {
        setUploadState({
          progress: 0,
          status: "error",
          message: result.error || "Failed to upload video",
        })

        toast({
          title: "Upload failed",
          description: result.error || "Failed to upload video",
          variant: "destructive",
        })
      }
    } catch (error) {
      clearInterval(progressInterval)

      setUploadState({
        progress: 0,
        status: "error",
        message: "An unexpected error occurred",
      })

      toast({
        title: "Upload failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    }
  }

  const handleClose = () => {
    if (uploadState.status === "uploading") {
      const confirmed = window.confirm("Upload in progress. Are you sure you want to cancel?")
      if (!confirmed) return
    }

    // Reset state
    setActiveTab("details")
    setTitle("")
    setDescription("")
    setCategory("Education")
    setTags("")
    setVisibility("private")
    setVideoFile(null)
    setThumbnailFile(null)
    setThumbnailPreview(null)
    setUploadState({
      progress: 0,
      status: "idle",
    })

    onClose()
  }

  const isUploading = uploadState.status === "uploading"
  const isComplete = uploadState.status === "complete"
  const isError = uploadState.status === "error"

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Upload Video</DialogTitle>
          <DialogDescription>Share your videos with the BitStream community</DialogDescription>
        </DialogHeader>

        {!videoFile ? (
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
            <Upload className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-center text-gray-600 mb-4">
              Drag and drop video files to upload or click to select files
            </p>
            <Button onClick={() => fileInputRef.current?.click()}>Select Files</Button>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="video/*" className="hidden" />
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="visibility">Visibility</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Add a title that describes your video"
                  disabled={isUploading || isComplete}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell viewers about your video"
                  rows={4}
                  disabled={isUploading || isComplete}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    disabled={isUploading || isComplete}
                  >
                    <option value="Education">Education</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Music">Music</option>
                    <option value="Tech">Tech</option>
                    <option value="Vlogs">Vlogs</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Add tags (comma separated)"
                    disabled={isUploading || isComplete}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="thumbnail">Thumbnail</Label>
                <div className="flex items-center gap-4">
                  <div
                    className="w-32 h-20 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden cursor-pointer"
                    onClick={() => thumbnailInputRef.current?.click()}
                  >
                    {thumbnailPreview ? (
                      <img
                        src={thumbnailPreview || "/placeholder.svg"}
                        alt="Thumbnail preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs text-gray-500">Upload thumbnail</span>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={thumbnailInputRef}
                    onChange={handleThumbnailChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <div className="text-sm text-gray-500">
                    Select or upload a picture that shows what's in your video. A good thumbnail stands out and draws
                    viewers' attention.
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="visibility" className="space-y-4 pt-4">
              <RadioGroup value={visibility} onValueChange={setVisibility as any} className="space-y-3">
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="public" id="public" className="mt-1" disabled={isUploading || isComplete} />
                  <div className="grid gap-1.5">
                    <Label htmlFor="public" className="flex items-center gap-2 font-medium">
                      <Globe className="h-4 w-4 text-sky-700" /> Public
                    </Label>
                    <p className="text-sm text-muted-foreground">Everyone can watch your video</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <RadioGroupItem
                    value="unlisted"
                    id="unlisted"
                    className="mt-1"
                    disabled={isUploading || isComplete}
                  />
                  <div className="grid gap-1.5">
                    <Label htmlFor="unlisted" className="flex items-center gap-2 font-medium">
                      <Eye className="h-4 w-4 text-sky-700" /> Unlisted
                    </Label>
                    <p className="text-sm text-muted-foreground">Anyone with the link can watch your video</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="private" id="private" className="mt-1" disabled={isUploading || isComplete} />
                  <div className="grid gap-1.5">
                    <Label htmlFor="private" className="flex items-center gap-2 font-medium">
                      <Lock className="h-4 w-4 text-sky-700" /> Private
                    </Label>
                    <p className="text-sm text-muted-foreground">Only you can watch your video</p>
                  </div>
                </div>
              </RadioGroup>
            </TabsContent>
          </Tabs>
        )}

        {uploadState.status !== "idle" && (
          <div className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {isUploading && "Uploading..."}
                {isComplete && "Upload complete"}
                {isError && "Upload failed"}
              </span>
              <span className="text-sm text-muted-foreground">{isUploading && `${uploadState.progress}%`}</span>
            </div>
            <Progress value={uploadState.progress} className="h-2" />
            {isError && (
              <div className="flex items-center gap-2 text-red-500 text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>{uploadState.message || "An error occurred during upload"}</span>
              </div>
            )}
            {isComplete && (
              <div className="flex items-center gap-2 text-green-500 text-sm">
                <Check className="h-4 w-4" />
                <span>Video uploaded successfully</span>
              </div>
            )}
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isUploading}>
            {isComplete ? "Close" : "Cancel"}
          </Button>
          {!isComplete && !isError && videoFile && (
            <Button onClick={handleUpload} disabled={isUploading || !title} className="bg-teal-500 hover:bg-teal-600">
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          )}
          {isComplete && uploadState.videoId && (
            <Button
              onClick={() => (window.location.href = `/watch/${uploadState.videoId}`)}
              className="bg-teal-500 hover:bg-teal-600"
            >
              View Video
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
