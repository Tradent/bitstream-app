"use client"

import { useState } from "react"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Facebook, Twitter, Linkedin, Mail, Clock, Copy, Check, Share2 } from "lucide-react"

interface VideoShareModalProps {
  isOpen: boolean
  onClose: () => void
  videoId: string
  videoTitle: string
}

export function VideoShareModal({ isOpen, onClose, videoId, videoTitle }: VideoShareModalProps) {
  const [activeTab, setActiveTab] = useState("link")
  const [copied, setCopied] = useState(false)
  const [embedSize, setEmbedSize] = useState("560x315")
  const [startTime, setStartTime] = useState("")
  const { toast } = useToast()

  const videoUrl = `${window.location.origin}/watch/${videoId}`

  const embedCode = `<iframe 
  width="${embedSize.split("x")[0]}" 
  height="${embedSize.split("x")[1]}" 
  src="${window.location.origin}/embed/${videoId}${startTime ? `?start=${startTime}` : ""}" 
  title="${videoTitle}" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowfullscreen>
</iframe>`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(videoUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)

    toast({
      title: "Link copied",
      description: "Video link copied to clipboard",
    })
  }

  const handleCopyEmbed = () => {
    navigator.clipboard.writeText(embedCode)

    toast({
      title: "Embed code copied",
      description: "Embed code copied to clipboard",
    })
  }

  const handleSocialShare = (platform: string) => {
    let shareUrl = ""

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(videoUrl)}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(videoUrl)}&text=${encodeURIComponent(videoTitle)}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(videoUrl)}`
        break
      case "email":
        shareUrl = `mailto:?subject=${encodeURIComponent(videoTitle)}&body=${encodeURIComponent(`Check out this video: ${videoUrl}`)}`
        break
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" /> Share Video
          </DialogTitle>
          <DialogDescription>Share "{videoTitle}" with others</DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="link">Share Link</TabsTrigger>
            <TabsTrigger value="embed">Embed</TabsTrigger>
          </TabsList>

          <TabsContent value="link" className="space-y-4 pt-4">
            <div className="flex gap-2">
              <Input
                value={videoUrl}
                readOnly
                className="flex-1"
                onClick={(e) => (e.target as HTMLInputElement).select()}
              />
              <Button variant="outline" size="icon" onClick={handleCopyLink} className="flex-shrink-0">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-2">
              <Button
                variant="outline"
                className="flex flex-col items-center gap-1 h-auto py-3"
                onClick={() => handleSocialShare("facebook")}
              >
                <Facebook className="h-5 w-5 text-blue-600" />
                <span className="text-xs">Facebook</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center gap-1 h-auto py-3"
                onClick={() => handleSocialShare("twitter")}
              >
                <Twitter className="h-5 w-5 text-sky-500" />
                <span className="text-xs">Twitter</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center gap-1 h-auto py-3"
                onClick={() => handleSocialShare("linkedin")}
              >
                <Linkedin className="h-5 w-5 text-blue-700" />
                <span className="text-xs">LinkedIn</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center gap-1 h-auto py-3"
                onClick={() => handleSocialShare("email")}
              >
                <Mail className="h-5 w-5 text-red-500" />
                <span className="text-xs">Email</span>
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-sky-500" />
              <span className="text-sm text-sky-700">Start at current time</span>
              <div className="ml-auto">
                <Input
                  type="text"
                  placeholder="0:00"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-20 text-center"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="embed" className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-sky-700">Embed size</label>
              <div className="flex gap-2">
                <Button
                  variant={embedSize === "560x315" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setEmbedSize("560x315")}
                  className={embedSize === "560x315" ? "bg-teal-500 hover:bg-teal-600" : ""}
                >
                  560 × 315
                </Button>
                <Button
                  variant={embedSize === "640x360" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setEmbedSize("640x360")}
                  className={embedSize === "640x360" ? "bg-teal-500 hover:bg-teal-600" : ""}
                >
                  640 × 360
                </Button>
                <Button
                  variant={embedSize === "853x480" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setEmbedSize("853x480")}
                  className={embedSize === "853x480" ? "bg-teal-500 hover:bg-teal-600" : ""}
                >
                  853 × 480
                </Button>
                <Button
                  variant={embedSize === "1280x720" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setEmbedSize("1280x720")}
                  className={embedSize === "1280x720" ? "bg-teal-500 hover:bg-teal-600" : ""}
                >
                  1280 × 720
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-sky-700">Embed code</label>
              <Textarea
                value={embedCode}
                readOnly
                rows={5}
                onClick={(e) => (e.target as HTMLTextAreaElement).select()}
              />
            </div>

            <Button variant="outline" onClick={handleCopyEmbed} className="w-full">
              <Copy className="mr-2 h-4 w-4" /> Copy Embed Code
            </Button>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
