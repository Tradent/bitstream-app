import { WaveVisualizer } from "@/components/wave-visualizer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, HelpCircle } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <WaveVisualizer />
        </div>
        <div className="container relative z-10 px-4 py-20 mx-auto text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-sky-900 md:text-5xl">
            Simple, Transparent <span className="text-teal-500">Pricing</span>
          </h1>
          <p className="max-w-2xl mx-auto mb-8 text-xl text-sky-700">
            Choose the plan that works best for your music career. No hidden fees, just straightforward value.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-sky-100/80 to-transparent"></div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Basic Plan */}
            <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle>Indie Artist</CardTitle>
                <CardDescription>Perfect for solo musicians just getting started</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-sky-900">$9</span>
                  <span className="text-sky-700">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Upload up to 50 tracks",
                    "Basic blockchain registration",
                    "Standard analytics dashboard",
                    "Single blockchain support",
                    "Community forum access",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-teal-500" />
                      <span className="text-sky-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-teal-500 hover:bg-teal-600">Get Started</Button>
              </CardFooter>
            </Card>

            {/* Pro Plan */}
            <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg border-teal-500">
              <div className="absolute top-0 left-0 right-0 py-1.5 text-center text-xs font-medium text-white bg-teal-500">
                MOST POPULAR
              </div>
              <CardHeader className="pt-10">
                <CardTitle>Professional</CardTitle>
                <CardDescription>For serious musicians building their career</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-sky-900">$29</span>
                  <span className="text-sky-700">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Unlimited track uploads",
                    "Priority blockchain registration",
                    "Advanced analytics and insights",
                    "Multi-chain support (3 blockchains)",
                    "Collaboration tools",
                    "Custom access control settings",
                    "Email support",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-teal-500" />
                      <span className="text-sky-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-teal-500 hover:bg-teal-600">Get Started</Button>
              </CardFooter>
            </Card>

            {/* Enterprise Plan */}
            <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle>Label & Studio</CardTitle>
                <CardDescription>For music labels and production studios</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-sky-900">$99</span>
                  <span className="text-sky-700">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Unlimited track uploads",
                    "Instant blockchain registration",
                    "Enterprise-grade analytics",
                    "Full multi-chain support",
                    "Advanced collaboration suite",
                    "Custom smart contracts",
                    "API access",
                    "Dedicated account manager",
                    "24/7 priority support",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-teal-500" />
                      <span className="text-sky-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-teal-500 hover:bg-teal-600">Contact Sales</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-16 bg-gradient-to-r from-sky-100 to-teal-100">
        <div className="container px-4 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center text-sky-900">Compare Features</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow">
              <thead>
                <tr className="text-left border-b border-sky-200">
                  <th className="p-4 font-semibold text-sky-900">Feature</th>
                  <th className="p-4 font-semibold text-center text-sky-900">Indie Artist</th>
                  <th className="p-4 font-semibold text-center text-sky-900">Professional</th>
                  <th className="p-4 font-semibold text-center text-sky-900">Label & Studio</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Track uploads", indie: "50 tracks", pro: "Unlimited", label: "Unlimited" },
                  { feature: "Blockchain registration", indie: "Basic", pro: "Priority", label: "Instant" },
                  { feature: "Analytics", indie: "Basic", pro: "Advanced", label: "Enterprise" },
                  { feature: "Multi-chain support", indie: "Single chain", pro: "3 chains", label: "Unlimited" },
                  { feature: "Collaboration tools", indie: "Limited", pro: "Full access", label: "Advanced suite" },
                  { feature: "Custom smart contracts", indie: "—", pro: "—", label: "✓" },
                  { feature: "API access", indie: "—", pro: "—", label: "✓" },
                  { feature: "Support", indie: "Community", pro: "Email", label: "24/7 priority" },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-sky-50"}>
                    <td className="p-4 font-medium text-sky-900">{row.feature}</td>
                    <td className="p-4 text-center text-sky-700">{row.indie}</td>
                    <td className="p-4 text-center text-sky-700">{row.pro}</td>
                    <td className="p-4 text-center text-sky-700">{row.label}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center text-sky-900">Frequently Asked Questions</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                question: "How does blockchain registration work?",
                answer:
                  "When you upload your music to BITSTREAM, we create a unique digital fingerprint and register it on the blockchain of your choice. This creates an immutable record of your ownership that can be verified by anyone.",
              },
              {
                question: "Can I switch plans later?",
                answer:
                  "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to new features. When downgrading, changes will take effect at the end of your current billing cycle.",
              },
              {
                question: "What blockchains do you support?",
                answer:
                  "We currently support Ethereum, Solana, Polygon, NEAR, and Tezos. Additional blockchains are added regularly based on community demand and technological advancements.",
              },
              {
                question: "How do royalty payments work?",
                answer:
                  "Royalties are automatically distributed according to the smart contracts you set up. You can define custom splits for collaborators, and payments are processed in real-time as your music is streamed or purchased.",
              },
              {
                question: "Is there a free trial available?",
                answer:
                  "Yes, we offer a 14-day free trial of the Professional plan for all new users. No credit card required to start your trial.",
              },
              {
                question: "What happens to my music if I cancel my subscription?",
                answer:
                  "Your music remains registered on the blockchain permanently. However, some platform features like analytics and distribution tools will become unavailable until you reactivate your subscription.",
              },
            ].map((faq, i) => (
              <Card key={i} className="transition-all duration-300 hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex items-start gap-2">
                    <HelpCircle className="flex-shrink-0 w-5 h-5 mt-1 text-teal-500" />
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sky-700">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-white bg-gradient-to-r from-sky-800 to-teal-800">
        <div className="container px-4 mx-auto text-center">
          <h2 className="mb-6 text-3xl font-bold">Ready to Get Started?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg text-sky-100">
            Join thousands of musicians who are taking control of their music with BITSTREAM.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-teal-700 hover:bg-sky-100">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-sky-800/50">
              Contact Sales
            </Button>
          </div>
          <p className="mt-6 text-sm text-sky-200">No credit card required. Cancel anytime.</p>
        </div>
      </section>
    </div>
  )
}
