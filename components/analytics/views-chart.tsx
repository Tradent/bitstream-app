"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ViewsChartProps {
  timeRange: number
}

export function ViewsChart({ timeRange }: ViewsChartProps) {
  const [activeMetric, setActiveMetric] = useState("views")
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    // Generate mock data based on time range
    const data = []
    const now = new Date()

    for (let i = timeRange; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)

      // Generate random data with an upward trend
      const views = Math.floor(3000 + Math.random() * 2000 + (timeRange - i) * 50)
      const watchTime = Math.floor(150 + Math.random() * 100 + (timeRange - i) * 2)

      data.push({
        date: date.toISOString().split("T")[0],
        views,
        watchTime,
      })
    }

    setChartData(data)
  }, [timeRange])

  return (
    <div className="space-y-4">
      <Tabs value={activeMetric} onValueChange={setActiveMetric} className="w-full">
        <TabsList className="bg-sky-50">
          <TabsTrigger value="views">Views</TabsTrigger>
          <TabsTrigger value="watchTime">Watch Time</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="h-80 w-full">
        {/* This would be a real chart in production */}
        <div className="h-full w-full bg-sky-50 rounded-lg p-4 flex flex-col">
          <div className="flex-1 relative">
            {/* Simulated chart bars */}
            <div className="absolute inset-0 flex items-end justify-between px-2">
              {chartData.map((item, index) => {
                // Calculate height percentage based on data
                const maxValue = activeMetric === "views" ? 5000 : 250
                const value = activeMetric === "views" ? item.views : item.watchTime
                const heightPercentage = (value / maxValue) * 100

                return (
                  <div
                    key={index}
                    className="w-2 bg-sky-500 rounded-t"
                    style={{
                      height: `${heightPercentage}%`,
                      opacity: index === chartData.length - 1 ? 1 : 0.7,
                    }}
                  ></div>
                )
              })}
            </div>
          </div>

          {/* X-axis labels */}
          <div className="h-6 flex justify-between text-xs text-sky-700 mt-2">
            {chartData.length > 0 && (
              <>
                <span>{chartData[0].date}</span>
                <span>{chartData[Math.floor(chartData.length / 2)].date}</span>
                <span>{chartData[chartData.length - 1].date}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="text-sm text-sky-700">Average Daily Views</div>
          <div className="text-2xl font-bold text-sky-900 mt-1">
            {chartData.length > 0
              ? Math.floor(chartData.reduce((sum, item) => sum + item.views, 0) / chartData.length).toLocaleString()
              : "0"}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-sky-700">Average Watch Time</div>
          <div className="text-2xl font-bold text-sky-900 mt-1">
            {chartData.length > 0
              ? Math.floor(chartData.reduce((sum, item) => sum + item.watchTime, 0) / chartData.length).toLocaleString()
              : "0"}{" "}
            min
          </div>
        </Card>
      </div>
    </div>
  )
}
