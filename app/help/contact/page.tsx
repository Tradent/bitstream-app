import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const metadata: Metadata = {
  title: "Contact Support | BitStream Help Center",
  description: "Get in touch with BitStream support team for assistance.",
}

export default function ContactSupportPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link href="/help">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Help Center
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Contact Support</h1>
        <p className="text-muted-foreground mt-2">
          Fill out the form below and our support team will get back to you as soon as possible.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Support Request</CardTitle>
            <CardDescription>Please provide as much detail as possible so we can best assist you.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your email address" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="issue-type">Issue Type</Label>
                <Select>
                  <SelectTrigger id="issue-type">
                    <SelectValue placeholder="Select issue type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="account">Account Issues</SelectItem>
                    <SelectItem value="video">Video Upload/Processing</SelectItem>
                    <SelectItem value="monetization">Monetization</SelectItem>
                    <SelectItem value="copyright">Copyright/Content ID</SelectItem>
                    <SelectItem value="technical">Technical Problems</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Brief description of your issue" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Please describe your issue in detail" className="min-h-[150px]" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="attachment">Attachments (Optional)</Label>
                <Input id="attachment" type="file" />
                <p className="text-xs text-muted-foreground mt-1">
                  You can upload screenshots or other files that might help us understand your issue. Maximum file size:
                  10MB.
                </p>
              </div>

              <Button type="submit" className="w-full">
                Submit Request
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Support Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">Monday - Friday</p>
              <p className="font-medium">9:00 AM - 6:00 PM EST</p>
              <p className="text-sm text-muted-foreground mt-4">
                We aim to respond to all inquiries within 24-48 hours during business days.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Other Ways to Get Help</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Help Center</h3>
                <p className="text-sm text-muted-foreground">Browse our comprehensive guides and tutorials.</p>
                <Button variant="link" asChild className="p-0">
                  <Link href="/help">Visit Help Center</Link>
                </Button>
              </div>

              <div>
                <h3 className="font-medium">Community Forums</h3>
                <p className="text-sm text-muted-foreground">Connect with other users and find solutions.</p>
                <Button variant="link" asChild className="p-0">
                  <Link href="/help/community">Browse Forums</Link>
                </Button>
              </div>

              <div>
                <h3 className="font-medium">Twitter Support</h3>
                <p className="text-sm text-muted-foreground">Follow us for updates and quick assistance.</p>
                <Button variant="link" asChild className="p-0">
                  <Link href="https://twitter.com/bitstreamapp">@BitstreamApp</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
