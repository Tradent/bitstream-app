"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function EngagementMetrics() {
  // Mock engagement data
  const metrics = [
    { name: "Likes per View", value: "4.2%", change: "+0.8%", positive: true },
    { name: "Comments per View", value: "1.8%", change: "+0.3%", positive: true },
    { name: "Shares per View", value: "2.5%", change: "-0.2%", positive: false },
    { name: "Average View Duration", value: "4:32", change: "+0:18", positive: true },
    { name: "Click-Through Rate", value: "3.7%", change: "+0.5%", positive: true },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Engagement Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {metrics.map((metric, index) => (
            <div key={index} className="flex justify-between items-center">
              <div>
                <div className="text-sm text-sky-700">{metric.name}</div>
                <div className="text-xl font-medium text-sky-900">{metric.value}</div>
              </div>
              <div className={`text-sm ${metric.positive ? "text-green-600" : "text-red-500"}`}>{metric.change}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
