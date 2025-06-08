"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Repeat,
  Shuffle,
  Maximize2,
  Minimize2,
  ListMusic,
  X,
  Music,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { WaveVisualizer } from "./wave-visualizer"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface Track {
  id: string
  title: string
  duration: string
  artist?: string
  blockchain?: string
  plays?: string
}

interface MusicPlayerProps {
  track: Track | null
  onClose: () => void
  tracks?: Track[]
}

export function MusicPlayer({ track, onClose, tracks = [] }: MusicPlayerProps) {
  const { toast } = useToast()
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [repeat, setRepeat] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [playlist, setPlaylist] = useState<Track[]>([])
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const animationRef = useRef<number | null>(null)
  const progressBarRef = useRef<HTMLDivElement | null>(null)

  // Initialize playlist when component mounts or track/tracks change
  useEffect(() => {
    if (track) {
      // If we have a specific track, find it in the tracks array
      const trackIndex = tracks.findIndex((t) => t.id === track.id)

      // If found, set the current index and use the full tracks array as playlist
      if (trackIndex >= 0) {
        setCurrentTrackIndex(trackIndex)
        setPlaylist(tracks)
      } else {
        // Otherwise, just use the single track
        setCurrentTrackIndex(0)
        setPlaylist([track])
      }
    }
  }, [track, tracks])

  // Get current track from playlist
  const currentTrack = playlist[currentTrackIndex] || null

  // Create audio element when track changes
  useEffect(() => {
    if (!currentTrack) return

    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      audioRef.current = new Audio()
    }

    const audio = audioRef.current

    // Reset state
    setIsPlaying(false)
    setCurrentTime(0)

    // Set up error handling
    const handleError = (e: Event) => {
      console.error("Audio error:", e)
      setIsPlaying(false)
      toast({
        title: "Playback Error",
        description: "There was an error playing this track. Please try again.",
        variant: "destructive",
      })
    }

    // Set up event listeners
    audio.addEventListener("timeupdate", updateProgress)
    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration || parseDuration(currentTrack.duration))
    })
    audio.addEventListener("ended", handleTrackEnd)
    audio.addEventListener("error", handleError)

    // In a real app, this would be the actual audio file URL
    // For this demo, we're using a simulated audio source
    audio.src =
      "data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV"

    // Set initial volume
    audio.volume = isMuted ? 0 : volume

    // Notify user
    toast({
      title: "Now Playing",
      description: currentTrack.title,
    })

    // Clean up
    return () => {
      cancelAnimationFrame(animationRef.current!)
      audio.pause()
      audio.removeEventListener("timeupdate", updateProgress)
      audio.removeEventListener("loadedmetadata", () => {})
      audio.removeEventListener("ended", handleTrackEnd)
      audio.removeEventListener("error", handleError)
    }
  }, [currentTrack, toast, volume, isMuted])

  // Parse duration string (e.g., "3:42") to seconds
  const parseDuration = (durationStr: string): number => {
    const parts = durationStr.split(":").map(Number)
    if (parts.length === 2) {
      return parts[0] * 60 + parts[1]
    }
    return 180 // Default to 3 minutes
  }

  // Handle track end
  const handleTrackEnd = useCallback(() => {
    setIsPlaying(false)
    setCurrentTime(0)

    if (repeat) {
      // Replay the current track
      playTrack()
    } else if (shuffle) {
      // Play a random track from the playlist
      const randomIndex = Math.floor(Math.random() * playlist.length)
      setCurrentTrackIndex(randomIndex)
    } else if (currentTrackIndex < playlist.length - 1) {
      // Play the next track
      setCurrentTrackIndex(currentTrackIndex + 1)
    }
  }, [repeat, shuffle, playlist.length, currentTrackIndex])

  // Update progress bar
  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  // Play track
  const playTrack = useCallback(() => {
    if (!audioRef.current) return

    try {
      const playPromise = audioRef.current.play()

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true)
            startProgressAnimation()
          })
          .catch((error) => {
            console.error("Playback error:", error)
            setIsPlaying(false)

            // Fallback to simulated playback
            simulatePlayback()
          })
      }
    } catch (error) {
      console.error("Play track error:", error)
      setIsPlaying(false)

      // Fallback to simulated playback
      simulatePlayback()
    }
  }, [])

  // Simulate playback when audio fails
  const simulatePlayback = () => {
    setIsPlaying(true)
    startProgressAnimation()

    toast({
      title: "Simulated Playback",
      description: "Using simulated playback mode",
    })
  }

  // Start progress animation
  const startProgressAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }

    const animate = () => {
      if (audioRef.current) {
        setCurrentTime((prevTime) => {
          // If using real audio, use its time
          if (audioRef.current!.paused) {
            return prevTime
          }
          return audioRef.current!.currentTime
        })
      } else {
        // Simulated playback
        setCurrentTime((prevTime) => {
          const newTime = prevTime + 0.05
          if (newTime >= duration) {
            handleTrackEnd()
            return 0
          }
          return newTime
        })
      }
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  // Toggle play/pause
  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      cancelAnimationFrame(animationRef.current!)
      setIsPlaying(false)
    } else {
      playTrack()
    }
  }

  // Skip to previous track
  const previousTrack = () => {
    if (currentTime > 3) {
      // If we're more than 3 seconds into the track, restart it
      if (audioRef.current) {
        audioRef.current.currentTime = 0
        setCurrentTime(0)
      }
    } else if (currentTrackIndex > 0) {
      // Otherwise go to previous track
      setCurrentTrackIndex(currentTrackIndex - 1)
    } else {
      // If we're at the first track, go to the last track
      setCurrentTrackIndex(playlist.length - 1)
    }
  }

  // Skip to next track
  const nextTrack = () => {
    if (shuffle) {
      // Play a random track
      const randomIndex = Math.floor(Math.random() * playlist.length)
      setCurrentTrackIndex(randomIndex)
    } else if (currentTrackIndex < playlist.length - 1) {
      // Play the next track
      setCurrentTrackIndex(currentTrackIndex + 1)
    } else if (repeat) {
      // If repeat is on and we're at the end, go back to the first track
      setCurrentTrackIndex(0)
    }
  }

  // Handle time change from slider
  const handleTimeChange = (value: number[]) => {
    const newTime = value[0]

    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }

    setCurrentTime(newTime)
  }

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]

    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }

    setVolume(newVolume)

    if (newVolume === 0) {
      setIsMuted(true)
    } else {
      setIsMuted(false)
    }
  }

  // Toggle mute
  const toggleMute = () => {
    if (!audioRef.current) return

    if (isMuted) {
      audioRef.current.volume = volume
      setIsMuted(false)
    } else {
      audioRef.current.volume = 0
      setIsMuted(true)
    }
  }

  // Format time (seconds to MM:SS)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  // Play a specific track from the playlist
  const playTrackFromPlaylist = (index: number) => {
    setCurrentTrackIndex(index)
  }

  // Set up keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle shortcuts if player is expanded
      if (!expanded) return

      switch (e.key) {
        case " ": // Space
          e.preventDefault()
          togglePlay()
          break
        case "ArrowRight":
          nextTrack()
          break
        case "ArrowLeft":
          previousTrack()
          break
        case "m":
          toggleMute()
          break
        case "r":
          setRepeat(!repeat)
          break
        case "s":
          setShuffle(!shuffle)
          break
        case "Escape":
          setExpanded(false)
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [expanded, repeat, shuffle, togglePlay, nextTrack, previousTrack])

  if (!currentTrack) return null

  return (
    <>
      {/* Compact Player (always visible) */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-sky-200 shadow-lg transition-all duration-300",
          expanded ? "h-[calc(100vh-4rem)]" : "h-auto",
        )}
      >
        {/* Compact view */}
        {!expanded && (
          <div className="container flex items-center justify-between px-4 py-3 mx-auto">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-10 h-10 text-white rounded-full bg-gradient-to-r from-sky-500 to-teal-500">
                <Music className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-medium text-sky-900">{currentTrack.title}</h4>
                <p className="text-sm text-sky-600">{currentTrack.artist || "Your Music"}</p>
              </div>
            </div>

            <div className="flex-1 hidden max-w-xl mx-8 md:block">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-full mb-2 space-x-4">
                  <Button
                    onClick={previousTrack}
                    variant="ghost"
                    size="icon"
                    className="text-sky-700 hover:text-sky-900 hover:bg-sky-100"
                  >
                    <SkipBack className="w-5 h-5" />
                  </Button>
                  <Button
                    onClick={togglePlay}
                    variant="ghost"
                    size="icon"
                    className="text-sky-700 hover:text-sky-900 hover:bg-sky-100"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </Button>
                  <Button
                    onClick={nextTrack}
                    variant="ghost"
                    size="icon"
                    className="text-sky-700 hover:text-sky-900 hover:bg-sky-100"
                  >
                    <SkipForward className="w-5 h-5" />
                  </Button>
                </div>
                <div className="flex items-center w-full space-x-2">
                  <span className="text-xs text-sky-600">{formatTime(currentTime)}</span>
                  <div className="relative flex-1 h-1 bg-sky-200 rounded-full" ref={progressBarRef}>
                    <div
                      className="absolute top-0 left-0 h-full bg-teal-500 rounded-full"
                      style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                    />
                    <Slider
                      value={[currentTime]}
                      max={duration || 100}
                      step={0.1}
                      onValueChange={handleTimeChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                  <span className="text-xs text-sky-600">{formatTime(duration || 0)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Sheet open={isPlaylistOpen} onOpenChange={setIsPlaylistOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-sky-700 hover:text-sky-900 hover:bg-sky-100">
                    <ListMusic className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Playlist</h3>
                      <Button variant="ghost" size="sm" onClick={() => setIsPlaylistOpen(false)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                      {playlist.map((track, index) => (
                        <div
                          key={track.id}
                          className={cn(
                            "flex items-center justify-between p-2 rounded-md cursor-pointer",
                            currentTrackIndex === index ? "bg-sky-100" : "hover:bg-sky-50",
                          )}
                          onClick={() => playTrackFromPlaylist(index)}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "flex items-center justify-center w-8 h-8 rounded-full",
                                currentTrackIndex === index ? "bg-teal-500 text-white" : "bg-sky-100 text-sky-700",
                              )}
                            >
                              {currentTrackIndex === index && isPlaying ? (
                                <Pause className="w-4 h-4" />
                              ) : (
                                <Play className="w-4 h-4" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-sky-900">{track.title}</p>
                              <p className="text-xs text-sky-600">{track.duration}</p>
                            </div>
                          </div>
                          {track.plays && <div className="text-xs text-sky-600">{track.plays} plays</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <div className="hidden items-center space-x-2 md:flex">
                <Button
                  onClick={toggleMute}
                  variant="ghost"
                  size="icon"
                  className="text-sky-700 hover:text-sky-900 hover:bg-sky-100"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </Button>
                <Slider
                  value={[isMuted ? 0 : volume]}
                  max={1}
                  step={0.01}
                  onValueChange={handleVolumeChange}
                  className="w-24"
                />
              </div>

              <Button
                onClick={() => setExpanded(!expanded)}
                variant="ghost"
                size="icon"
                className="text-sky-700 hover:text-sky-900 hover:bg-sky-100"
              >
                <Maximize2 className="w-5 h-5" />
              </Button>

              <Button
                onClick={onClose}
                variant="outline"
                size="sm"
                className="text-sky-700 border-sky-300 hover:bg-sky-100"
              >
                Close
              </Button>
            </div>
          </div>
        )}

        {/* Expanded view */}
        {expanded && (
          <div className="container h-full flex flex-col px-4 py-6 mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-sky-900">Now Playing</h2>
              <Button
                onClick={() => setExpanded(false)}
                variant="ghost"
                size="icon"
                className="text-sky-700 hover:text-sky-900 hover:bg-sky-100"
              >
                <Minimize2 className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex-1 flex flex-col md:flex-row gap-8">
              {/* Album art and visualizer */}
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="relative w-full max-w-md aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-sky-400 to-teal-400 mb-6">
                  <div className="absolute inset-0">
                    <WaveVisualizer isActive={isPlaying} />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center">
                      <Music className="w-12 h-12 text-white" />
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-sky-900 mb-1">{currentTrack.title}</h3>
                <p className="text-lg text-sky-700 mb-6">{currentTrack.artist || "Your Music"}</p>

                {/* Progress bar */}
                <div className="w-full max-w-md">
                  <div className="flex items-center w-full space-x-2 mb-2">
                    <span className="text-sm text-sky-600">{formatTime(currentTime)}</span>
                    <div className="relative flex-1 h-2 bg-sky-200 rounded-full">
                      <div
                        className="absolute top-0 left-0 h-full bg-teal-500 rounded-full"
                        style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                      />
                      <Slider
                        value={[currentTime]}
                        max={duration || 100}
                        step={0.1}
                        onValueChange={handleTimeChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                    <span className="text-sm text-sky-600">{formatTime(duration || 0)}</span>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-center space-x-4 mt-6">
                    <Button
                      onClick={() => setShuffle(!shuffle)}
                      variant="ghost"
                      size="icon"
                      className={cn("text-sky-700 hover:text-sky-900 hover:bg-sky-100", shuffle && "text-teal-500")}
                    >
                      <Shuffle className="w-5 h-5" />
                    </Button>

                    <Button
                      onClick={previousTrack}
                      variant="ghost"
                      size="icon"
                      className="text-sky-700 hover:text-sky-900 hover:bg-sky-100 h-12 w-12"
                    >
                      <SkipBack className="w-6 h-6" />
                    </Button>

                    <Button
                      onClick={togglePlay}
                      variant="default"
                      size="icon"
                      className="bg-teal-500 hover:bg-teal-600 h-16 w-16 rounded-full"
                    >
                      {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                    </Button>

                    <Button
                      onClick={nextTrack}
                      variant="ghost"
                      size="icon"
                      className="text-sky-700 hover:text-sky-900 hover:bg-sky-100 h-12 w-12"
                    >
                      <SkipForward className="w-6 h-6" />
                    </Button>

                    <Button
                      onClick={() => setRepeat(!repeat)}
                      variant="ghost"
                      size="icon"
                      className={cn("text-sky-700 hover:text-sky-900 hover:bg-sky-100", repeat && "text-teal-500")}
                    >
                      <Repeat className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Volume */}
                  <div className="flex items-center justify-center space-x-2 mt-6">
                    <Button
                      onClick={toggleMute}
                      variant="ghost"
                      size="icon"
                      className="text-sky-700 hover:text-sky-900 hover:bg-sky-100"
                    >
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </Button>
                    <Slider
                      value={[isMuted ? 0 : volume]}
                      max={1}
                      step={0.01}
                      onValueChange={handleVolumeChange}
                      className="w-32"
                    />
                  </div>
                </div>
              </div>

              {/* Playlist */}
              <div className="w-full md:w-80 bg-sky-50 rounded-lg p-4 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-sky-900">Up Next</h3>
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => setShuffle(!shuffle)}
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "text-sky-700 hover:text-sky-900 hover:bg-sky-100 h-8 px-2",
                        shuffle && "text-teal-500",
                      )}
                    >
                      <Shuffle className="w-4 h-4 mr-1" /> Shuffle
                    </Button>
                    <Button
                      onClick={() => setRepeat(!repeat)}
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "text-sky-700 hover:text-sky-900 hover:bg-sky-100 h-8 px-2",
                        repeat && "text-teal-500",
                      )}
                    >
                      <Repeat className="w-4 h-4 mr-1" /> Repeat
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  {playlist.map((track, index) => (
                    <div
                      key={track.id}
                      className={cn(
                        "flex items-center justify-between p-2 rounded-md cursor-pointer",
                        currentTrackIndex === index ? "bg-sky-100" : "hover:bg-sky-100/50",
                      )}
                      onClick={() => playTrackFromPlaylist(index)}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "flex items-center justify-center w-8 h-8 rounded-full",
                            currentTrackIndex === index ? "bg-teal-500 text-white" : "bg-sky-200 text-sky-700",
                          )}
                        >
                          {currentTrackIndex === index && isPlaying ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sky-900">{track.title}</p>
                          <p className="text-xs text-sky-600">{track.duration}</p>
                        </div>
                      </div>
                      {track.plays && <div className="text-xs text-sky-600">{track.plays} plays</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
