import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Music, Info } from "lucide-react"

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-sky-50">
      <div className="container px-4 py-8 mx-auto">
        <div className="max-w-3xl mx-auto">
          <h1 className="mb-2 text-3xl font-bold text-sky-900">Upload Your Music</h1>
          <p className="mb-8 text-sky-700">Share your sound with the world while maintaining full ownership</p>

          <Card>
            <CardHeader>
              <CardTitle>New Release</CardTitle>
              <CardDescription>Fill in the details about your track or album</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-8 text-center border-2 border-dashed rounded-lg border-sky-200 bg-sky-50">
                <div className="flex flex-col items-center justify-center">
                  <Music className="w-12 h-12 mb-4 text-sky-400" />
                  <h3 className="mb-2 text-lg font-medium text-sky-900">Drag and drop your audio files</h3>
                  <p className="mb-4 text-sm text-sky-600">Supports MP3, WAV, FLAC (max 50MB)</p>
                  <Button className="bg-teal-500 hover:bg-teal-600">
                    <Upload className="w-4 h-4 mr-2" /> Select Files
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Track Title</Label>
                  <Input id="title" placeholder="Enter track title" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="artist">Artist Name</Label>
                  <Input id="artist" placeholder="Your artist name" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Tell us about your track..." />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="genre">Genre</Label>
                  <Select>
                    <SelectTrigger id="genre">
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronic">Electronic</SelectItem>
                      <SelectItem value="rock">Rock</SelectItem>
                      <SelectItem value="hiphop">Hip Hop</SelectItem>
                      <SelectItem value="jazz">Jazz</SelectItem>
                      <SelectItem value="classical">Classical</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="blockchain">Blockchain</Label>
                  <Select>
                    <SelectTrigger id="blockchain">
                      <SelectValue placeholder="Select blockchain" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ethereum">Ethereum</SelectItem>
                      <SelectItem value="solana">Solana</SelectItem>
                      <SelectItem value="polygon">Polygon</SelectItem>
                      <SelectItem value="near">NEAR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-sky-100 flex items-start gap-3">
                <Info className="w-5 h-5 mt-0.5 flex-shrink-0 text-sky-600" />
                <div>
                  <h4 className="font-medium text-sky-900">Blockchain Ownership</h4>
                  <p className="text-sm text-sky-700">
                    Your content will be registered on the blockchain, ensuring your ownership rights are protected.
                    You'll maintain full control over distribution and monetization.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="permissions">Distribution Permissions</Label>
                <Select>
                  <SelectTrigger id="permissions">
                    <SelectValue placeholder="Select permissions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public - Anyone can stream</SelectItem>
                    <SelectItem value="token">Token Holders Only</SelectItem>
                    <SelectItem value="paid">Paid Access Only</SelectItem>
                    <SelectItem value="custom">Custom Permissions</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" className="text-sky-700 border-sky-300 hover:bg-sky-100">
                  Save Draft
                </Button>
                <Button className="bg-teal-500 hover:bg-teal-600">Upload to Blockchain</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
