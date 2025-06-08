"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Music, Upload, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface UploadModalProps {
  isOpen: boolean
  onClose: () => void
  onUpload: (trackData: any) => void
}

export function UploadModal({ isOpen, onClose, onUpload }: UploadModalProps) {
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "success" | "error">("idle")
  const [files, setFiles] = useState<File[]>([])
  const [trackTitle, setTrackTitle] = useState("")
  const [trackGenre, setTrackGenre] = useState("")
  const [trackDescription, setTrackDescription] = useState("")
  const [blockchain, setBlockchain] = useState("")
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files)
      setFiles(selectedFiles)
    }
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one audio file to upload.",
        variant: "destructive",
      })
      return
    }

    if (!trackTitle) {
      toast({
        title: "Missing information",
        description: "Please provide a title for your track.",
        variant: "destructive",
      })
      return
    }

    setUploadState("uploading")

    // Simulate upload process
    setTimeout(() => {
      const newTrack = {
        id: Math.random().toString(36).substr(2, 9),
        title: trackTitle,
        genre: trackGenre,
        description: trackDescription,
        blockchain: blockchain || "Ethereum",
        duration: "3:42",
        plays: "0",
        dateAdded: new Date().toISOString(),
        fileName: files[0].name,
      }

      setUploadState("success")
      toast({
        title: "Upload successful!",
        description: `${trackTitle} has been uploaded to the blockchain.`,
      })

      // Reset form
      setFiles([])
      setTrackTitle("")
      setTrackGenre("")
      setTrackDescription("")
      setBlockchain("")

      // Close modal and update parent component
      onUpload(newTrack)
      onClose()
    }, 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upload Music</DialogTitle>
          <DialogDescription>Upload your music to the blockchain and maintain full ownership.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-4 text-center border-2 border-dashed rounded-lg border-sky-200 bg-sky-50">
            {files.length > 0 ? (
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-white rounded-md">
                    <div className="flex items-center">
                      <Music className="w-4 h-4 mr-2 text-sky-500" />
                      <span className="text-sm text-sky-700 truncate max-w-[250px]">{file.name}</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="h-6 w-6 p-0"
                    >
                      <X className="w-4 h-4 text-sky-700" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById("file-upload")?.click()}
                  className="mt-2"
                >
                  Add More Files
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <Music className="w-12 h-12 mb-4 text-sky-400" />
                <h3 className="mb-2 text-lg font-medium text-sky-900">Drag and drop your audio files</h3>
                <p className="mb-4 text-sm text-sky-600">Supports MP3, WAV, FLAC (max 50MB)</p>
                <Button
                  type="button"
                  onClick={() => document.getElementById("file-upload")?.click()}
                  className="bg-teal-500 hover:bg-teal-600"
                >
                  <Upload className="w-4 h-4 mr-2" /> Select Files
                </Button>
              </div>
            )}
            <input
              id="file-upload"
              type="file"
              accept="audio/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Track Title</Label>
            <Input
              id="title"
              placeholder="Enter track title"
              value={trackTitle}
              onChange={(e) => setTrackTitle(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="genre">Genre</Label>
              <Select value={trackGenre} onValueChange={setTrackGenre}>
                <SelectTrigger id="genre">
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronic">Electronic</SelectItem>
                  <SelectItem value="rock">Rock</SelectItem>
                  <SelectItem value="hiphop">Hip Hop</SelectItem>
                  <SelectItem value="jazz">Jazz</SelectItem>
                  <SelectItem value="classical">Classical</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="blockchain">Blockchain</Label>
              <Select value={blockchain} onValueChange={setBlockchain}>
                <SelectTrigger id="blockchain">
                  <SelectValue placeholder="Select blockchain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ethereum">Ethereum</SelectItem>
                  <SelectItem value="solana">Solana</SelectItem>
                  <SelectItem value="polygon">Polygon</SelectItem>
                  <SelectItem value="near">NEAR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Tell us about your track..."
              value={trackDescription}
              onChange={(e) => setTrackDescription(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-teal-500 hover:bg-teal-600" disabled={uploadState === "uploading"}>
              {uploadState === "uploading" ? "Uploading..." : "Upload to Blockchain"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
