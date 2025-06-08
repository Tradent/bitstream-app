import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, MessageSquare, Users, Clock, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Community Forums | BitStream Help Center",
  description: "Connect with other BitStream users, share tips, and find solutions in our community forums.",
}

export default function CommunityForumsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link href="/help">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Help Center
          </Link>
        </Button>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Community Forums</h1>
            <p className="text-muted-foreground mt-2">
              Connect with other BitStream users, share tips, and find solutions.
            </p>
          </div>
          <Button>Create New Topic</Button>
        </div>
      </div>

      <Tabs defaultValue="popular" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="popular">
          <div className="space-y-4">
            {popularTopics.map((topic) => (
              <ForumTopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent">
          <div className="space-y-4">
            {recentTopics.map((topic) => (
              <ForumTopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="unanswered">
          <div className="space-y-4">
            {unansweredTopics.map((topic) => (
              <ForumTopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="categories">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Card key={category.id}>
                <CardHeader>
                  <CardTitle>{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      <span>{category.topics} topics</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{category.members} members</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild className="w-full">
                    <Link href={`/help/community/category/${category.id}`}>Browse Topics</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ForumTopicCard({ topic }: { topic: any }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <Link href={`/help/community/topic/${topic.id}`} className="hover:underline">
              <CardTitle className="text-lg">{topic.title}</CardTitle>
            </Link>
            <CardDescription className="mt-1">
              Started by {topic.author} • {topic.date}
            </CardDescription>
          </div>
          <Badge
            variant={
              topic.category === "Technical"
                ? "destructive"
                : topic.category === "Feature Request"
                  ? "outline"
                  : "default"
            }
          >
            {topic.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="line-clamp-2">{topic.preview}</p>
      </CardContent>
      <CardFooter className="pt-0 flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-1" />
            <span>{topic.replies} replies</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{topic.views} views</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{topic.lastActivity}</span>
          </div>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/help/community/topic/${topic.id}`}>
            View <ArrowUpRight className="ml-1 h-3 w-3" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

// Sample data
const popularTopics = [
  {
    id: "1",
    title: "Video processing stuck at 0% - what should I do?",
    author: "VideoCreator123",
    date: "2 days ago",
    category: "Technical",
    preview:
      "I've been trying to upload a 15-minute video for the past two days, but it keeps getting stuck at 0% processing. I've tried different browsers and even a different computer, but nothing seems to work. Has anyone else experienced this issue?",
    replies: 24,
    views: 342,
    lastActivity: "3 hours ago",
  },
  {
    id: "2",
    title: "Tips for growing your channel in 2023",
    author: "GrowthGuru",
    date: "1 week ago",
    category: "Tips & Tricks",
    preview:
      "After reaching 100K subscribers last month, I wanted to share some strategies that worked for me. Consistency is key, but there are several other factors that can significantly impact your growth rate.",
    replies: 87,
    views: 1243,
    lastActivity: "2 hours ago",
  },
  {
    id: "3",
    title: "Request: Add scheduled uploads feature",
    author: "ContentPlanner",
    date: "3 days ago",
    category: "Feature Request",
    preview:
      "It would be incredibly helpful to have the ability to schedule uploads in advance. As someone who batches content creation, this would save me a lot of time and help maintain a consistent posting schedule.",
    replies: 42,
    views: 516,
    lastActivity: "1 day ago",
  },
]

const recentTopics = [
  {
    id: "4",
    title: "New analytics dashboard not showing accurate data",
    author: "DataAnalyst",
    date: "5 hours ago",
    category: "Technical",
    preview:
      "Since the recent update, my analytics dashboard seems to be showing incorrect view counts. The numbers are significantly lower than what I'm seeing in my email notifications.",
    replies: 3,
    views: 47,
    lastActivity: "1 hour ago",
  },
  {
    id: "5",
    title: "How to optimize video titles for search?",
    author: "SEOMaster",
    date: "12 hours ago",
    category: "Tips & Tricks",
    preview:
      "I've been experimenting with different title formats and wanted to share my findings. Certain patterns seem to perform much better in search results.",
    replies: 8,
    views: 112,
    lastActivity: "4 hours ago",
  },
  {
    id: "6",
    title: "Monetization rejected - need advice",
    author: "AspiringCreator",
    date: "1 day ago",
    category: "Monetization",
    preview:
      "My application for the Partner Program was rejected, citing 'reused content' as the reason. I create original animations, so I'm confused about this feedback. Has anyone dealt with this before?",
    replies: 15,
    views: 203,
    lastActivity: "6 hours ago",
  },
]

const unansweredTopics = [
  {
    id: "7",
    title: "Custom thumbnail not updating",
    author: "ThumbnailArtist",
    date: "4 hours ago",
    category: "Technical",
    preview:
      "I uploaded a custom thumbnail for my latest video, but it's still showing the auto-generated one. I've tried reuploading multiple times with different images, but nothing changes.",
    replies: 0,
    views: 12,
    lastActivity: "4 hours ago",
  },
  {
    id: "8",
    title: "Best microphone for under $100?",
    author: "AudioNewbie",
    date: "2 days ago",
    category: "Equipment",
    preview:
      "I'm looking to upgrade my audio setup but have a limited budget. Any recommendations for a good quality microphone under $100 that works well for voice recording?",
    replies: 0,
    views: 34,
    lastActivity: "2 days ago",
  },
  {
    id: "9",
    title: "Channel art dimensions issue",
    author: "DesignChallenge",
    date: "1 day ago",
    category: "Design",
    preview:
      "I've created channel art according to the recommended dimensions (2560 x 1440), but it's getting cropped strangely on different devices. Any tips for creating art that displays well everywhere?",
    replies: 0,
    views: 18,
    lastActivity: "1 day ago",
  },
]

const categories = [
  {
    id: "tech",
    name: "Technical Support",
    description: "Get help with technical issues related to uploading, processing, and playback.",
    topics: 342,
    members: 1205,
  },
  {
    id: "monetization",
    name: "Monetization",
    description: "Discuss revenue strategies, ad performance, and partnership program requirements.",
    topics: 187,
    members: 943,
  },
  {
    id: "growth",
    name: "Channel Growth",
    description: "Share tips and strategies for growing your audience and increasing engagement.",
    topics: 256,
    members: 1876,
  },
  {
    id: "creation",
    name: "Content Creation",
    description: "Discuss video production techniques, equipment, and creative processes.",
    topics: 412,
    members: 2103,
  },
  {
    id: "features",
    name: "Feature Requests",
    description: "Suggest new features and improvements for the BitStream platform.",
    topics: 124,
    members: 756,
  },
  {
    id: "announcements",
    name: "Announcements",
    description: "Official updates and announcements from the BitStream team.",
    topics: 87,
    members: 3254,
  },
]
