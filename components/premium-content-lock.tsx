"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"

interface PremiumContentLockProps {
  title?: string
  description?: string
  previewDuration?: number
  subscriptionPrice?: string
  onSubscribe?: () => void
  onPreview?: () => void
}

export function PremiumContentLock({
  title = "Premium Content",
  description = "This content is available exclusively to premium subscribers.",
  previewDuration = 30,
  subscriptionPrice = "$4.99",
  onSubscribe,
  onPreview,
}: PremiumContentLockProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative w-full">
      {/* Blurred content background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-900/30 to-sky-900/80 backdrop-blur-sm rounded-lg" />

      <div className="relative p-6 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-4">
          <Lock className="h-8 w-8 text-amber-600" />
        </div>

        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-sky-100 mb-6 max-w-md">{description}</p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
            onClick={onSubscribe}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Subscribe for {subscriptionPrice}/month
            {isHovered && <span className="ml-2">→</span>}
          </Button>

          {previewDuration > 0 && (
            <Button variant="outline" className="border-sky-200 text-sky-100 hover:bg-sky-800/30" onClick={onPreview}>
              Watch {previewDuration}s Preview
            </Button>
          )}
        </div>

        <p className="text-xs text-sky-200 mt-4">
          Premium subscription includes ad-free viewing and access to all premium content
        </p>
      </div>
    </div>
  )
}
