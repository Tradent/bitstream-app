import type { ReactNode } from "react"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-6 transition-all duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl hover:translate-y-[-5px]">
      <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-sky-100">{icon}</div>
      <h3 className="mb-3 text-xl font-semibold text-sky-900">{title}</h3>
      <p className="text-sky-700">{description}</p>
    </div>
  )
}
