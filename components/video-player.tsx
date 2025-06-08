"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, Settings, SkipForward } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

interface VideoPlayerProps {
  src: string
  poster?: string
  title?: string
  onEnded?: () => void
  className?: string
}

export function VideoPlayer({ src, poster, title, onEnded, className }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isBuffering, setIsBuffering] = useState(false)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  const [userInteracting, setUserInteracting] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isMobile = useMobile()

  // Format time (seconds to MM:SS)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  // Toggle play/pause
  const togglePlay = () => {
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error)
      })
    }
  }

  // Handle time change from slider
  const handleTimeChange = (value: number[]) => {
    if (!videoRef.current) return

    const newTime = value[0]
    videoRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    if (!videoRef.current) return

    const newVolume = value[0]
    videoRef.current.volume = newVolume
    setVolume(newVolume)

    if (newVolume === 0) {
      setIsMuted(true)
    } else {
      setIsMuted(false)
    }
  }

  // Toggle mute
  const toggleMute = () => {
    if (!videoRef.current) return

    if (isMuted) {
      videoRef.current.volume = volume
      setIsMuted(false)
    } else {
      videoRef.current.volume = 0
      setIsMuted(true)
    }
  }

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
  }

  // Hide controls after inactivity
  const hideControlsAfterTimeout = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }

    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying && !userInteracting) {
        setShowControls(false)
      }
    }, 3000)
  }

  // Show controls on mouse move or touch
  const handleInteractionStart = () => {
    setShowControls(true)
    setUserInteracting(true)
    hideControlsAfterTimeout()
  }

  const handleInteractionEnd = () => {
    setUserInteracting(false)
    hideControlsAfterTimeout()
  }

  // Skip forward 10 seconds
  const skipForward = () => {
    if (!videoRef.current) return

    videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 10, videoRef.current.duration)
  }

  // Double tap to seek on mobile
  const handleDoubleTap = (e: React.TouchEvent) => {
    if (!videoRef.current) return

    const screenWidth = window.innerWidth
    const touchX = e.touches[0].clientX

    // If tap is on the left third of the screen, rewind 10 seconds
    if (touchX < screenWidth / 3) {
      videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 10, 0)
    }
    // If tap is on the right third of the screen, forward 10 seconds
    else if (touchX > (screenWidth * 2) / 3) {
      videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 10, videoRef.current.duration)
    }
    // Center tap toggles play/pause
    else {
      togglePlay()
    }
  }

  // Set up event listeners
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    const onTimeUpdate = () => setCurrentTime(video.currentTime)
    const onLoadedMetadata = () => setDuration(video.duration)
    const onEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
      if (onEnded) onEnded()
    }
    const onWaiting = () => setIsBuffering(true)
    const onCanPlay = () => setIsBuffering(false)
    const onFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement)

    video.addEventListener("play", onPlay)
    video.addEventListener("pause", onPause)
    video.addEventListener("timeupdate", onTimeUpdate)
    video.addEventListener("loadedmetadata", onLoadedMetadata)
    video.addEventListener("ended", onEnded)
    video.addEventListener("waiting", onWaiting)
    video.addEventListener("canplay", onCanPlay)
    document.addEventListener("fullscreenchange", onFullscreenChange)

    return () => {
      video.removeEventListener("play", onPlay)
      video.removeEventListener("pause", onPause)
      video.removeEventListener("timeupdate", onTimeUpdate)
      video.removeEventListener("loadedmetadata", onLoadedMetadata)
      video.removeEventListener("ended", onEnded)
      video.removeEventListener("waiting", onWaiting)
      video.removeEventListener("canplay", onCanPlay)
      document.removeEventListener("fullscreenchange", onFullscreenChange)

      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [onEnded])

  // Initialize volume
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn("relative group/video overflow-hidden bg-black rounded-lg", className)}
      onMouseMove={handleInteractionStart}
      onMouseLeave={handleInteractionEnd}
      onTouchStart={handleInteractionStart}
      onTouchEnd={handleInteractionEnd}
      onDoubleClick={toggleFullscreen}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full"
        onClick={isMobile ? undefined : togglePlay}
        onDoubleClick={isMobile ? undefined : toggleFullscreen}
        onTouchStart={isMobile ? handleDoubleTap : undefined}
        playsInline
      />

      {/* Play/Pause overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <Button
            variant="ghost"
            size="icon"
            className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 text-white"
            onClick={togglePlay}
          >
            <Play className="w-8 h-8 ml-1" />
          </Button>
        </div>
      )}

      {/* Buffering indicator */}
      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="w-12 h-12 border-4 border-t-teal-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Video controls */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-2 transition-opacity duration-300",
          showControls ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
      >
        {/* Progress bar */}
        <div className="relative flex items-center w-full mb-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-1 bg-white/30 rounded-full">
              <div
                className="h-full bg-teal-500 rounded-full"
                style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
              />
            </div>
          </div>
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            onValueChange={handleTimeChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>

        {/* Control buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={togglePlay}>
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </Button>

            <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={skipForward}>
              <SkipForward className="w-5 h-5" />
            </Button>

            {!isMobile && (
              <div
                className="relative"
                onMouseEnter={() => setShowVolumeSlider(true)}
                onMouseLeave={() => setShowVolumeSlider(false)}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:bg-white/20"
                  onClick={toggleMute}
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </Button>

                {showVolumeSlider && (
                  <div className="absolute bottom-full left-0 mb-2 p-2 bg-black/80 rounded-md">
                    <Slider
                      orientation="vertical"
                      value={[isMuted ? 0 : volume]}
                      max={1}
                      step={0.01}
                      onValueChange={handleVolumeChange}
                      className="h-24"
                    />
                  </div>
                )}
              </div>
            )}

            <span className="text-xs text-white">
              {formatTime(currentTime)} / {formatTime(duration || 0)}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20">
              <Settings className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/20"
              onClick={toggleFullscreen}
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
