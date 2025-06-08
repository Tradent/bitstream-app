import type { Metadata } from "next"
import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Help Center | BitStream",
  description: "Get help with BitStream features, account management, and troubleshooting.",
}

export default function HelpPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col items-center text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">BitStream Help Center</h1>
        <p className="text-muted-foreground max-w-2xl mb-6">
          Find answers to common questions and learn how to make the most of BitStream.
        </p>
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input type="search" placeholder="Search for help" className="pl-10" />
        </div>
      </div>

      <Tabs defaultValue="popular" className="w-full max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="popular">Popular Topics</TabsTrigger>
          <TabsTrigger value="account">Account & Privacy</TabsTrigger>
          <TabsTrigger value="videos">Videos & Content</TabsTrigger>
        </TabsList>
        <TabsContent value="popular">
          <div className="grid gap-6 md:grid-cols-2">
            <HelpCard
              title="Getting Started with BitStream"
              description="Learn the basics of navigating BitStream, uploading videos, and customizing your channel."
              href="/help/getting-started"
            />
            <HelpCard
              title="Video Upload Troubleshooting"
              description="Solutions for common issues when uploading or processing videos."
              href="/help/upload-issues"
            />
            <HelpCard
              title="Monetization Requirements"
              description="Learn about eligibility requirements and how to enable monetization for your channel."
              href="/help/monetization-requirements"
            />
            <HelpCard
              title="Account Security"
              description="Tips and best practices to keep your BitStream account secure."
              href="/help/account-security"
            />
          </div>
        </TabsContent>
        <TabsContent value="account">
          <div className="grid gap-6 md:grid-cols-2">
            <HelpCard
              title="Managing Your Account"
              description="Learn how to update your profile, change email, and manage account settings."
              href="/help/manage-account"
            />
            <HelpCard
              title="Privacy Settings"
              description="Control who can see your content and how your information is used."
              href="/help/privacy-settings"
            />
            <HelpCard
              title="Channel Customization"
              description="Personalize your channel with custom branding, layouts, and sections."
              href="/help/channel-customization"
            />
            <HelpCard
              title="Account Recovery"
              description="Steps to recover access if you're locked out of your account."
              href="/help/account-recovery"
            />
          </div>
        </TabsContent>
        <TabsContent value="videos">
          <div className="grid gap-6 md:grid-cols-2">
            <HelpCard
              title="Video Upload Guidelines"
              description="Learn about file formats, size limits, and best practices for uploading."
              href="/help/upload-guidelines"
            />
            <HelpCard
              title="Content Policies"
              description="Understand our community guidelines and content restrictions."
              href="/help/content-policies"
            />
            <HelpCard
              title="Copyright Information"
              description="Learn about copyright claims, fair use, and how to protect your content."
              href="/help/copyright"
            />
            <HelpCard
              title="Video Analytics"
              description="Understanding your video performance metrics and audience insights."
              href="/help/video-analytics"
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 border-t pt-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <FaqItem
            question="How do I upload a video?"
            answer="To upload a video, click on the upload button in the top right corner of any page. You can drag and drop your video file or select it from your device. Add a title, description, and tags, then click 'Publish' when you're ready."
          />
          <FaqItem
            question="How can I monetize my content?"
            answer="To monetize your content, you need to join the BitStream Partner Program. You'll need at least 1,000 subscribers and 4,000 watch hours in the past 12 months. Once eligible, go to Monetization in your dashboard to apply."
          />
          <FaqItem
            question="What video formats are supported?"
            answer="BitStream supports most common video formats including MP4, MOV, AVI, WMV, FLV, and WebM. For best results, we recommend using MP4 with H.264 video codec and AAC audio codec."
          />
          <FaqItem
            question="How do I change my channel name?"
            answer="To change your channel name, go to Settings > Channel > Basic info. You can update your channel name there. Note that you can only change your channel name up to 3 times every 90 days."
          />
        </div>
      </div>

      <div className="mt-12 bg-muted p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
        <p className="mb-6 text-muted-foreground">
          Our support team is ready to assist you with any questions or issues.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild>
            <Link href="/help/contact">Contact Support</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/help/community">Community Forums</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

function HelpCard({
  title,
  description,
  href,
}: {
  title: string
  description: string
  href: string
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild variant="outline" className="w-full">
          <Link href={href}>Learn More</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

function FaqItem({
  question,
  answer,
}: {
  question: string
  answer: string
}) {
  return (
    <div className="border rounded-lg p-6">
      <h3 className="text-lg font-medium mb-2">{question}</h3>
      <p className="text-muted-foreground">{answer}</p>
    </div>
  )
}
