import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { WaveVisualizer } from "@/components/wave-visualizer"
import { Music, Users, Play, Share2, Heart, BarChart2 } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-sky-50">
      <div className="relative h-64 bg-gradient-to-r from-sky-600 to-teal-600">
        <div className="absolute inset-0 opacity-30">
          <WaveVisualizer />
        </div>
      </div>

      <div className="container px-4 mx-auto -mt-24">
        <div className="relative z-10 p-6 bg-white rounded-lg shadow-lg">
          <div className="flex flex-col items-center md:flex-row md:items-start">
            <Avatar className="w-32 h-32 border-4 border-white shadow-md">
              <AvatarImage src="/placeholder.svg?key=alfz2" alt="Artist" />
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>

            <div className="mt-4 text-center md:mt-0 md:ml-6 md:text-left">
              <div className="flex flex-col items-center md:flex-row md:items-center md:gap-3">
                <h1 className="text-3xl font-bold text-sky-900">AudioWave</h1>
                <Badge className="mt-2 md:mt-0 bg-teal-500 hover:bg-teal-600">Verified Artist</Badge>
              </div>
              <p className="mt-1 text-sky-700">Electronic Music Producer</p>
              <div className="flex flex-wrap justify-center gap-4 mt-4 md:justify-start">
                <div className="flex items-center gap-1 text-sky-700">
                  <Music className="w-4 h-4" />
                  <span>24 Tracks</span>
                </div>
                <div className="flex items-center gap-1 text-sky-700">
                  <Users className="w-4 h-4" />
                  <span>1.2K Followers</span>
                </div>
                <div className="flex items-center gap-1 text-sky-700">
                  <BarChart2 className="w-4 h-4" />
                  <span>45K Total Plays</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6 md:ml-auto md:mt-0">
              <Button className="bg-teal-500 hover:bg-teal-600">Follow</Button>
              <Button variant="outline" className="text-sky-700 border-sky-300 hover:bg-sky-100">
                <Share2 className="w-4 h-4 mr-2" /> Share
              </Button>
            </div>
          </div>

          <div className="mt-8">
            <Tabs defaultValue="music">
              <TabsList className="grid w-full grid-cols-3 md:w-auto">
                <TabsTrigger value="music">Music</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="stats">Stats</TabsTrigger>
              </TabsList>

              <TabsContent value="music" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    { title: "Digital Tides", plays: "12.4K", likes: "843", blockchain: "Ethereum" },
                    { title: "Wave Function", plays: "8.7K", likes: "621", blockchain: "Solana" },
                    { title: "Frequency Shift", plays: "15.2K", likes: "1.2K", blockchain: "Polygon" },
                    { title: "Amplitude", plays: "9.8K", likes: "756", blockchain: "Ethereum" },
                    { title: "Resonance", plays: "7.3K", likes: "512", blockchain: "Solana" },
                    { title: "Harmonic Flow", plays: "11.6K", likes: "934", blockchain: "Polygon" },
                  ].map((track, i) => (
                    <Card key={i} className="overflow-hidden transition-all duration-300 hover:shadow-md">
                      <div className="relative h-40 bg-gradient-to-br from-sky-400 to-teal-400">
                        <div className="absolute inset-0 opacity-30">
                          <WaveVisualizer />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Button size="icon" className="w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                            <Play className="w-6 h-6 text-white" />
                          </Button>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-sky-900">{track.title}</h3>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 text-sm text-sky-700">
                              <Play className="w-3.5 h-3.5" /> {track.plays}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-sky-700">
                              <Heart className="w-3.5 h-3.5" /> {track.likes}
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs text-sky-700 border-sky-200">
                            {track.blockchain}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="about" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About AudioWave</CardTitle>
                    <CardDescription>Electronic music producer and sound designer</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sky-700">
                      AudioWave is an electronic music producer specializing in ambient and downtempo compositions. With
                      a focus on creating immersive soundscapes that blend digital and organic elements, AudioWave has
                      been at the forefront of the blockchain music revolution.
                    </p>
                    <p className="mt-4 text-sky-700">
                      All music is created, owned, and distributed through the BITSTREAM platform, ensuring complete
                      creative control and fair compensation for every stream and download.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="stats" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Analytics</CardTitle>
                    <CardDescription>Track engagement and revenue across platforms</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 p-4 mb-4 rounded-lg bg-sky-50">
                      <div className="flex items-center justify-center h-full text-sky-700">
                        Analytics visualization would appear here
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="p-4 rounded-lg bg-sky-50">
                        <h4 className="font-medium text-sky-900">Top Performing Track</h4>
                        <p className="text-sm text-sky-700">Frequency Shift - 15.2K plays</p>
                      </div>
                      <div className="p-4 rounded-lg bg-sky-50">
                        <h4 className="font-medium text-sky-900">Most Active Region</h4>
                        <p className="text-sm text-sky-700">North America - 42% of listeners</p>
                      </div>
                      <div className="p-4 rounded-lg bg-sky-50">
                        <h4 className="font-medium text-sky-900">Total Blockchain Revenue</h4>
                        <p className="text-sm text-sky-700">$12,845 (lifetime)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
