"use client"

import { useState, useEffect } from "react"
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
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, Lock, Globe, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Playlist {
  id: string
  name: string
  description: string
  visibility: "public" | "private" | "unlisted"
  videoCount: number
  createdAt: string
}

interface PlaylistModalProps {
  isOpen: boolean
  onClose: () => void
  videoId: string
  videoTitle: string
}

export function PlaylistModal({ isOpen, onClose, videoId, videoTitle }: PlaylistModalProps) {
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [selectedPlaylists, setSelectedPlaylists] = useState<Set<string>>(new Set())
  const [isCreatingNew, setIsCreatingNew] = useState(false)
  const [newPlaylistName, setNewPlaylistName] = useState("")
  const [newPlaylistDescription, setNewPlaylistDescription] = useState("")
  const [newPlaylistVisibility, setNewPlaylistVisibility] = useState<"public" | "private" | "unlisted">("private")
  const { toast } = useToast()

  // Fetch playlists
  useEffect(() => {
    // In a real app, you would fetch playlists from an API
    const mockPlaylists: Playlist[] = [
      {
        id: "playlist-1",
        name: "Favorite Videos",
        description: "A collection of my favorite videos",
        visibility: "public",
        videoCount: 12,
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "playlist-2",
        name: "Watch Later",
        description: "Videos to watch later",
        visibility: "private",
        videoCount: 24,
        createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "playlist-3",
        name: "Coding Tutorials",
        description: "Helpful coding tutorials",
        visibility: "public",
        videoCount: 8,
        createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ]

    setPlaylists(mockPlaylists)
  }, [])

  const handleTogglePlaylist = (playlistId: string) => {
    const newSelectedPlaylists = new Set(selectedPlaylists)
    if (newSelectedPlaylists.has(playlistId)) {
      newSelectedPlaylists.delete(playlistId)
    } else {
      newSelectedPlaylists.add(playlistId)
    }
    setSelectedPlaylists(newSelectedPlaylists)
  }

  const handleCreatePlaylist = () => {
    if (!newPlaylistName.trim()) return

    // In a real app, you would call an API to create a new playlist
    const newPlaylist: Playlist = {
      id: `playlist-${Date.now()}`,
      name: newPlaylistName,
      description: newPlaylistDescription,
      visibility: newPlaylistVisibility,
      videoCount: 1, // Including the current video
      createdAt: new Date().toISOString(),
    }

    setPlaylists([newPlaylist, ...playlists])
    setSelectedPlaylists(new Set([newPlaylist.id]))
    setIsCreatingNew(false)
    setNewPlaylistName("")
    setNewPlaylistDescription("")
    setNewPlaylistVisibility("private")

    toast({
      title: "Playlist created",
      description: `"${newPlaylistName}" has been created and video added`,
    })
  }

  const handleSave = () => {
    // In a real app, you would call an API to save the selected playlists
    toast({
      title: "Video saved",
      description: `Video added to ${selectedPlaylists.size} playlist${selectedPlaylists.size !== 1 ? "s" : ""}`,
    })
    onClose()
  }

  const getVisibilityIcon = (visibility: "public" | "private" | "unlisted") => {
    switch (visibility) {
      case "public":
        return <Globe className="h-3 w-3" />
      case "private":
        return <Lock className="h-3 w-3" />
      case "unlisted":
        return <Eye className="h-3 w-3" />
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save to playlist</DialogTitle>
          <DialogDescription>Add "{videoTitle}" to a playlist</DialogDescription>
        </DialogHeader>

        {isCreatingNew ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="playlist-name">Playlist name</Label>
              <Input
                id="playlist-name"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                placeholder="Enter playlist name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="playlist-description">Description (optional)</Label>
              <Input
                id="playlist-description"
                value={newPlaylistDescription}
                onChange={(e) => setNewPlaylistDescription(e.target.value)}
                placeholder="Enter playlist description"
              />
            </div>
            <div className="space-y-2">
              <Label>Privacy</Label>
              <div className="flex flex-col gap-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="private"
                    checked={newPlaylistVisibility === "private"}
                    onChange={() => setNewPlaylistVisibility("private")}
                  />
                  <Label htmlFor="private" className="flex items-center gap-1">
                    <Lock className="h-3 w-3" /> Private
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="public"
                    checked={newPlaylistVisibility === "public"}
                    onChange={() => setNewPlaylistVisibility("public")}
                  />
                  <Label htmlFor="public" className="flex items-center gap-1">
                    <Globe className="h-3 w-3" /> Public
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="unlisted"
                    checked={newPlaylistVisibility === "unlisted"}
                    onChange={() => setNewPlaylistVisibility("unlisted")}
                  />
                  <Label htmlFor="unlisted" className="flex items-center gap-1">
                    <Eye className="h-3 w-3" /> Unlisted
                  </Label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreatingNew(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreatePlaylist} disabled={!newPlaylistName.trim()}>
                Create
              </Button>
            </div>
          </div>
        ) : (
          <>
            <Button
              variant="outline"
              className="flex items-center gap-2 w-full justify-start"
              onClick={() => setIsCreatingNew(true)}
            >
              <Plus className="h-4 w-4" /> Create new playlist
            </Button>

            <ScrollArea className="h-[200px] pr-4">
              <div className="space-y-2">
                {playlists.map((playlist) => (
                  <div key={playlist.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={playlist.id}
                      checked={selectedPlaylists.has(playlist.id)}
                      onCheckedChange={() => handleTogglePlaylist(playlist.id)}
                    />
                    <Label
                      htmlFor={playlist.id}
                      className="flex flex-1 items-center justify-between text-sm cursor-pointer"
                    >
                      <span>{playlist.name}</span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        {getVisibilityIcon(playlist.visibility)}
                        <span>{playlist.videoCount} videos</span>
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={selectedPlaylists.size === 0 && !isCreatingNew}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
