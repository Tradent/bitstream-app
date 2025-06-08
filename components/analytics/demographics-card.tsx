"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DemographicsCardProps {
  title: string
  type: "age" | "gender" | "geography" | "device"
}

export function DemographicsCard({ title, type }: DemographicsCardProps) {
  // Mock data for different demographic types
  const getData = () => {
    switch (type) {
      case "age":
        return [
          { label: "18-24", value: 28 },
          { label: "25-34", value: 35 },
          { label: "35-44", value: 18 },
          { label: "45-54", value: 12 },
          { label: "55+", value: 7 },
        ]
      case "gender":
        return [
          { label: "Male", value: 62 },
          { label: "Female", value: 35 },
          { label: "Other", value: 3 },
        ]
      case "geography":
        return [
          { label: "United States", value: 42 },
          { label: "United Kingdom", value: 15 },
          { label: "Canada", value: 8 },
          { label: "Australia", value: 7 },
          { label: "Germany", value: 6 },
          { label: "Other", value: 22 },
        ]
      case "device":
        return [
          { label: "Mobile", value: 58 },
          { label: "Desktop", value: 32 },
          { label: "Tablet", value: 7 },
          { label: "TV", value: 3 },
        ]
      default:
        return []
    }
  }

  const data = getData()

  // Generate colors for the chart segments
  const getColor = (index: number) => {
    const colors = ["bg-sky-500", "bg-teal-500", "bg-indigo-500", "bg-emerald-500", "bg-violet-500", "bg-amber-500"]
    return colors[index % colors.length]
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex">
          {/* Simple pie/donut chart visualization */}
          {type === "gender" || type === "device" ? (
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {data.map((item, index) => {
                  // Calculate the segment position in the pie chart
                  const total = data.reduce((sum, d) => sum + d.value, 0)
                  const startAngle = data.slice(0, index).reduce((sum, d) => sum + (d.value / total) * 360, 0)
                  const endAngle = startAngle + (item.value / total) * 360

                  // Convert angles to radians and calculate path
                  const startRad = ((startAngle - 90) * Math.PI) / 180
                  const endRad = ((endAngle - 90) * Math.PI) / 180
                  const x1 = 50 + 40 * Math.cos(startRad)
                  const y1 = 50 + 40 * Math.sin(startRad)
                  const x2 = 50 + 40 * Math.cos(endRad)
                  const y2 = 50 + 40 * Math.sin(endRad)

                  // Create the arc path
                  const largeArc = endAngle - startAngle > 180 ? 1 : 0
                  const path = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`

                  return (
                    <path key={index} d={path} className={`${getColor(index)} hover:opacity-90 transition-opacity`} />
                  )
                })}
                {/* Donut hole */}
                <circle cx="50" cy="50" r="25" fill="white" />
              </svg>
            </div>
          ) : (
            <div className="w-full">
              {data.map((item, index) => (
                <div key={index} className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-sky-900">{item.label}</span>
                    <span className="text-sky-700">{item.value}%</span>
                  </div>
                  <div className="w-full h-2 bg-sky-100 rounded-full">
                    <div className={`h-full rounded-full ${getColor(index)}`} style={{ width: `${item.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Legend for pie/donut charts */}
          {(type === "gender" || type === "device") && (
            <div className="ml-6 flex flex-col justify-center">
              {data.map((item, index) => (
                <div key={index} className="flex items-center mb-2">
                  <div className={`w-3 h-3 rounded-full ${getColor(index)} mr-2`}></div>
                  <span className="text-sm text-sky-900">
                    {item.label}: {item.value}%
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
