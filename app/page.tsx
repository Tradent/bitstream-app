import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Shield, Users, Video } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-sky-50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <h1 className="text-4xl md:text-6xl font-bold text-sky-900 mb-6">Share Your Vision With The World</h1>
              <p className="text-lg md:text-xl text-sky-700 mb-8 max-w-lg">
                BitStream gives creators the tools to upload, share, and monetize their videos with blockchain-powered
                ownership protection.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-teal-500 hover:bg-teal-600">
                  <Link href="/home" className="flex items-center">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline">
                  <Link href="/about" className="flex items-center">
                    Learn More <Play className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <Image
                  src="/video-platform-blueprint.png"
                  alt="BitStream Platform"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl"
                  priority
                />
                <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="bg-green-500 h-3 w-3 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Blockchain Protected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-sky-900 mb-12">Why Choose BitStream?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-sky-50 p-6 rounded-lg">
              <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-sky-900 mb-2">Ownership Protection</h3>
              <p className="text-sky-700">
                Blockchain technology ensures your content remains yours with verifiable ownership records.
              </p>
            </div>
            <div className="bg-sky-50 p-6 rounded-lg">
              <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Video className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-sky-900 mb-2">Advanced Analytics</h3>
              <p className="text-sky-700">
                Gain deep insights into your audience with comprehensive analytics and engagement metrics.
              </p>
            </div>
            <div className="bg-sky-50 p-6 rounded-lg">
              <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-sky-900 mb-2">Monetization Options</h3>
              <p className="text-sky-700">
                Multiple revenue streams including subscriptions, premium content, and ad integration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-sky-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-sky-900 mb-12">What Creators Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-sky-200 flex items-center justify-center mr-3">
                  <span className="font-bold text-sky-700">JD</span>
                </div>
                <div>
                  <h4 className="font-bold">Jane Doe</h4>
                  <p className="text-sm text-sky-600">Music Producer</p>
                </div>
              </div>
              <p className="text-sky-700">
                "BitStream has transformed how I share my music videos. The analytics help me understand what my
                audience loves."
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-teal-200 flex items-center justify-center mr-3">
                  <span className="font-bold text-teal-700">MS</span>
                </div>
                <div>
                  <h4 className="font-bold">Mike Smith</h4>
                  <p className="text-sm text-sky-600">Tech Reviewer</p>
                </div>
              </div>
              <p className="text-sky-700">
                "The monetization options on BitStream have allowed me to turn my passion into a full-time career."
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow md:hidden lg:block">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center mr-3">
                  <span className="font-bold text-purple-700">AJ</span>
                </div>
                <div>
                  <h4 className="font-bold">Alex Johnson</h4>
                  <p className="text-sm text-sky-600">Fitness Instructor</p>
                </div>
              </div>
              <p className="text-sky-700">
                "I love how BitStream protects my workout videos. The platform is intuitive and my subscribers are
                happy."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-sky-500 to-teal-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Share Your Content?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of creators who trust BitStream to host, protect, and monetize their videos.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-sky-700 hover:bg-gray-100">
            <Link href="/home">Explore Videos</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sky-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded bg-teal-500 flex items-center justify-center text-white font-bold">
                  B
                </div>
                <span className="text-xl font-bold">BitStream</span>
              </div>
              <p className="text-sky-200 max-w-xs">
                The blockchain-powered video platform for creators who value ownership and analytics.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold mb-4">Platform</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/home" className="text-sky-200 hover:text-white">
                      Browse
                    </Link>
                  </li>
                  <li>
                    <Link href="/features" className="text-sky-200 hover:text-white">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing" className="text-sky-200 hover:text-white">
                      Pricing
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/about" className="text-sky-200 hover:text-white">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sky-200 hover:text-white">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sky-200 hover:text-white">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-sky-200 hover:text-white">
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sky-200 hover:text-white">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sky-200 hover:text-white">
                      Copyright
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-sky-800 mt-12 pt-6 text-center md:text-left text-sky-300 text-sm">
            &copy; {new Date().getFullYear()} BitStream. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
