import { WaveVisualizer } from "@/components/wave-visualizer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Music, Zap, BarChart4, Globe, Lock, Coins, Users } from "lucide-react"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <WaveVisualizer />
        </div>
        <div className="container relative z-10 px-4 py-20 mx-auto text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-sky-900 md:text-5xl">
            BITSTREAM <span className="text-teal-500">Features</span>
          </h1>
          <p className="max-w-2xl mx-auto mb-8 text-xl text-sky-700">
            Discover how BITSTREAM empowers musicians with blockchain technology to maintain ownership and control of
            their creative work.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-sky-100/80 to-transparent"></div>
      </section>

      {/* Main Features Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-sky-100">
                <Shield className="w-8 h-8 text-teal-500" />
              </div>
              <h2 className="mb-4 text-2xl font-bold text-sky-900">Blockchain Ownership</h2>
              <p className="text-sky-700">
                Your music is securely registered on the blockchain, creating an immutable record of ownership. This
                provides legal protection and verifiable proof of your creative work, ensuring you maintain full rights
                to your content.
              </p>
            </div>

            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-sky-100">
                <Music className="w-8 h-8 text-teal-500" />
              </div>
              <h2 className="mb-4 text-2xl font-bold text-sky-900">Multi-Chain Distribution</h2>
              <p className="text-sky-700">
                BITSTREAM allows you to manage your content on a single blockchain while enabling transfers across
                multiple chains. This flexibility maximizes your reach while maintaining centralized control over your
                music catalog.
              </p>
            </div>

            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-sky-100">
                <Zap className="w-8 h-8 text-teal-500" />
              </div>
              <h2 className="mb-4 text-2xl font-bold text-sky-900">Creator Preferences</h2>
              <p className="text-sky-700">
                Set custom preferences for how your music is shared, played, and monetized. You control who can access
                your content, under what conditions, and how you get compensated—all enforced by smart contracts.
              </p>
            </div>

            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-sky-100">
                <BarChart4 className="w-8 h-8 text-teal-500" />
              </div>
              <h2 className="mb-4 text-2xl font-bold text-sky-900">Advanced Analytics</h2>
              <p className="text-sky-700">
                Gain deep insights into how your music performs with comprehensive analytics. Track plays, engagement,
                revenue, and audience demographics in real-time across all distribution channels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Features */}
      <section className="py-16 bg-gradient-to-r from-sky-100 to-teal-100">
        <div className="container px-4 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center text-sky-900">More Powerful Features</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-sky-100">
                  <Globe className="w-6 h-6 text-teal-500" />
                </div>
                <CardTitle>Global Reach</CardTitle>
                <CardDescription>Distribute your music worldwide without boundaries</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sky-700">
                  BITSTREAM connects you to listeners around the world through decentralized distribution networks,
                  eliminating geographical restrictions and maximizing your global audience.
                </p>
              </CardContent>
            </Card>

            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-sky-100">
                  <Lock className="w-6 h-6 text-teal-500" />
                </div>
                <CardTitle>Access Control</CardTitle>
                <CardDescription>Define who can access your content and how</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sky-700">
                  Create custom access rules for your music, from public streaming to token-gated exclusive content.
                  Smart contracts automatically enforce your preferences across all platforms.
                </p>
              </CardContent>
            </Card>

            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-sky-100">
                  <Coins className="w-6 h-6 text-teal-500" />
                </div>
                <CardTitle>Direct Monetization</CardTitle>
                <CardDescription>Earn revenue directly from your listeners</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sky-700">
                  Eliminate middlemen and receive payments directly from your audience. Set your own pricing models,
                  including streaming, downloads, subscriptions, and exclusive content.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Collaboration Features */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center md:flex-row md:justify-between">
            <div className="mb-10 md:mb-0 md:w-1/2 md:pr-10">
              <h2 className="mb-6 text-3xl font-bold text-sky-900">Collaboration Tools</h2>
              <p className="mb-6 text-lg text-sky-700">
                BITSTREAM makes it easy to collaborate with other musicians while maintaining clear ownership and
                contribution records.
              </p>
              <ul className="space-y-4">
                {[
                  "Smart contract-based royalty splitting",
                  "Transparent contribution tracking",
                  "Secure file sharing and version control",
                  "Collaborative editing with permission controls",
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 mt-1 mr-2 rounded-full bg-teal-500">
                      <svg
                        className="w-3.5 h-3.5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sky-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-8 bg-teal-500 hover:bg-teal-600">Start Collaborating</Button>
            </div>
            <div className="relative w-full md:w-1/2">
              <div className="p-1 overflow-hidden rounded-lg bg-gradient-to-r from-sky-400 to-teal-400">
                <div className="overflow-hidden bg-white rounded-lg">
                  <div className="relative h-64 md:h-80 bg-sky-50">
                    <div className="absolute inset-0 opacity-30">
                      <WaveVisualizer />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 mb-2 overflow-hidden rounded-full bg-sky-200">
                            <Users className="w-8 h-8 m-4 text-sky-600" />
                          </div>
                          <span className="text-sm font-medium text-sky-700">Collaboration</span>
                        </div>
                        <svg
                          className="w-8 h-8 text-teal-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 mb-2 overflow-hidden rounded-full bg-teal-200">
                            <Music className="w-8 h-8 m-4 text-teal-600" />
                          </div>
                          <span className="text-sm font-medium text-sky-700">Creation</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-white bg-gradient-to-r from-sky-800 to-teal-800">
        <div className="container px-4 mx-auto text-center">
          <h2 className="mb-6 text-3xl font-bold">Ready to Take Control of Your Music?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg text-sky-100">
            Join BITSTREAM today and experience the future of music ownership and distribution.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-teal-700 hover:bg-sky-100">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-sky-800/50">
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
