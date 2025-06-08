import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { MainNav } from "@/components/main-nav"
import { Toaster } from "@/components/ui/toaster"
import { PWARegister } from "@/components/pwa-register"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import { OfflineDetector } from "@/components/offline-detector"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "BITSTREAM - Blockchain Video Platform",
  description: "Leverage the power of blockchain to maintain ownership and tracking of your video content.",
  manifest: "/manifest.json",
  themeColor: "#0ea5e9",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "BitStream",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <MainNav />
          <main>{children}</main>
          <Toaster />
          <PWARegister />
          <PWAInstallPrompt />
          <OfflineDetector />
        </ThemeProvider>
      </body>
    </html>
  )
}
