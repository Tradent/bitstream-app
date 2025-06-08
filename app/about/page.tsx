import { WaveVisualizer } from "@/components/wave-visualizer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Globe, Users, Shield, Zap } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <WaveVisualizer />
        </div>
        <div className="container relative z-10 px-4 py-20 mx-auto text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-sky-900 md:text-5xl">
            About <span className="text-teal-500">BITSTREAM</span>
          </h1>
          <p className="max-w-2xl mx-auto mb-8 text-xl text-sky-700">
            We're revolutionizing music ownership and distribution through blockchain technology.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-sky-100/80 to-transparent"></div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center md:flex-row md:justify-between">
            <div className="mb-10 md:mb-0 md:w-1/2 md:pr-10">
              <h2 className="mb-6 text-3xl font-bold text-sky-900">Our Story</h2>
              <p className="mb-4 text-lg text-sky-700">
                BITSTREAM was founded in 2022 by a group of musicians, blockchain developers, and music industry
                veterans who saw a fundamental problem in how artists were compensated and recognized for their work.
              </p>
              <p className="mb-4 text-lg text-sky-700">
                We believe that musicians should have complete ownership and control over their creative output, with
                transparent tracking of how their music is used and fair compensation for every stream, download, and
                use.
              </p>
              <p className="text-lg text-sky-700">
                By leveraging blockchain technology, we've created a platform that puts the power back in the hands of
                creators, eliminating middlemen and creating direct connections between artists and their audiences.
              </p>
            </div>
            <div className="relative w-full md:w-1/2">
              <div className="p-1 overflow-hidden rounded-lg bg-gradient-to-r from-sky-400 to-teal-400">
                <div className="overflow-hidden bg-white rounded-lg">
                  <img
                    src="/vibrant-studio-session.png"
                    alt="BITSTREAM founding team"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-gradient-to-r from-sky-100 to-teal-100">
        <div className="container px-4 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center text-sky-900">Our Mission & Values</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
              <CardContent className="p-6">
                <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-sky-100">
                  <Shield className="w-8 h-8 text-teal-500" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-sky-900">Artist Ownership</h3>
                <p className="text-sky-700">
                  We believe that creators should maintain full ownership and control of their work. Every decision we
                  make is guided by this fundamental principle.
                </p>
              </CardContent>
            </Card>

            <Card className="transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
              <CardContent className="p-6">
                <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-sky-100">
                  <Globe className="w-8 h-8 text-teal-500" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-sky-900">Global Accessibility</h3>
                <p className="text-sky-700">
                  Music is universal, and we're committed to breaking down barriers that prevent artists from reaching
                  global audiences while maintaining control of their work.
                </p>
              </CardContent>
            </Card>

            <Card className="transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
              <CardContent className="p-6">
                <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-sky-100">
                  <Zap className="w-8 h-8 text-teal-500" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-sky-900">Innovation</h3>
                <p className="text-sky-700">
                  We're constantly pushing the boundaries of what's possible with blockchain technology to create better
                  experiences for musicians and listeners alike.
                </p>
              </CardContent>
            </Card>

            <Card className="transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
              <CardContent className="p-6">
                <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-sky-100">
                  <Users className="w-8 h-8 text-teal-500" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-sky-900">Community</h3>
                <p className="text-sky-700">
                  We're building more than a platform—we're creating a community of artists and listeners who believe in
                  a more equitable music ecosystem.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center text-sky-900">Meet Our Team</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "Alex Rivera",
                role: "Founder & CEO",
                bio: "Former musician and blockchain developer with a passion for artist rights.",
                image: "team-member-1",
              },
              {
                name: "Maya Johnson",
                role: "CTO",
                bio: "Blockchain architect with 10+ years experience in decentralized systems.",
                image: "team-member-2",
              },
              {
                name: "David Chen",
                role: "Head of Music Partnerships",
                bio: "20 years in the music industry working with independent artists and major labels.",
                image: "team-member-3",
              },
              {
                name: "Sophia Williams",
                role: "Chief Product Officer",
                bio: "UX specialist focused on creating intuitive experiences for musicians.",
                image: "team-member-4",
              },
            ].map((member, i) => (
              <Card key={i} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-0">
                  <div className="aspect-square bg-gradient-to-br from-sky-400 to-teal-400">
                    <Avatar className="w-full h-full rounded-none">
                      <AvatarImage
                        src={`/confident-professional.png?height=300&width=300&query=professional%20headshot%20${member.image}`}
                        alt={member.name}
                      />
                      <AvatarFallback className="text-4xl text-white">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-sky-900">{member.name}</h3>
                    <p className="mb-2 text-sm font-medium text-teal-500">{member.role}</p>
                    <p className="text-sm text-sky-700">{member.bio}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Investors & Partners */}
      <section className="py-16 bg-gradient-to-r from-sky-100 to-teal-100">
        <div className="container px-4 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center text-sky-900">Our Partners & Investors</h2>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md"
              >
                <img
                  src={`/abstract-tech-logo.png?height=80&width=120&query=tech%20company%20logo%20${i + 1}`}
                  alt={`Partner ${i + 1}`}
                  className="max-w-full h-12"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6 text-3xl font-bold text-sky-900">Get in Touch</h2>
            <p className="mb-8 text-lg text-sky-700">
              Have questions about BITSTREAM? We'd love to hear from you. Reach out to our team for more information.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-teal-500 hover:bg-teal-600">
                Contact Us
              </Button>
              <Button size="lg" variant="outline" className="text-sky-700 border-sky-300 hover:bg-sky-100">
                Join Our Community
              </Button>
            </div>
            <div className="mt-8 text-sky-700">
              <p>Email: hello@bitstream.io</p>
              <p>Location: San Francisco, CA</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-white bg-gradient-to-r from-sky-800 to-teal-800">
        <div className="container px-4 mx-auto text-center">
          <h2 className="mb-6 text-3xl font-bold">Join the Music Revolution</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg text-sky-100">
            Be part of the movement that's changing how musicians create, share, and profit from their work.
          </p>
          <Button size="lg" className="bg-white text-teal-700 hover:bg-sky-100">
            Sign Up Now
          </Button>
        </div>
      </section>
    </div>
  )
}
