"use client"

import { useState, useEffect } from "react"
import { Wifi, WifiOff } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function OfflineDetector() {
  const [isOnline, setIsOnline] = useState(true)
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 3000)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setShowAlert(true)
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  if (!showAlert) return null

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-md">
      <Alert variant={isOnline ? "default" : "destructive"} className="animate-in slide-in-from-bottom">
        {isOnline ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
        <AlertTitle>{isOnline ? "Back online" : "You're offline"}</AlertTitle>
        <AlertDescription>
          {isOnline ? "Your connection has been restored." : "Please check your internet connection."}
        </AlertDescription>
      </Alert>
    </div>
  )
}
