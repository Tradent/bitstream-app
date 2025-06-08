"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const [name, setName] = useState("Current User")
  const [email, setEmail] = useState("user@example.com")
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const { toast } = useToast()

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved",
    })
  }

  const handleSaveNotifications = () => {
    toast({
      title: "Notification preferences updated",
      description: "Your notification preferences have been saved",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-sky-900 mb-6">Settings</h1>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="content">Content Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Manage your account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="avatar">Profile Picture</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 text-xl font-medium">
                      {name.charAt(0).toUpperCase()}
                    </div>
                    <Button variant="outline">Change</Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-sky-900">Channel Information</h3>

                <div className="space-y-2">
                  <Label htmlFor="channel-name">Channel Name</Label>
                  <Input id="channel-name" defaultValue={name + "'s Channel"} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="channel-description">Channel Description</Label>
                  <textarea id="channel-description" className="w-full min-h-[100px] p-2 border rounded-md"></textarea>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage your notification preferences</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Notification settings form elements */}
              <Button onClick={handleSaveNotifications}>Save Notifications</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Configure your privacy settings</CardDescription>
            </CardHeader>
            <CardContent>{/* Privacy settings form elements */}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Content Preferences</CardTitle>
              <CardDescription>Customize your content preferences</CardDescription>
            </CardHeader>
            <CardContent>{/* Content preferences form elements */}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
