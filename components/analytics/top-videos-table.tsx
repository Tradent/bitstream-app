"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function TopVideosTable() {
  // Mock data for top performing videos
  const topVideos = [
    {
      title: "How to Build a YouTube Clone with Next.js",
      views: 24892,
      watchTime: 1843,
      ctr: 6.8,
    },
    {
      title: "Building a Real-time Chat App with Next.js",
      views: 18765,
      watchTime: 1532,
      ctr: 5.9,
    },
    {
      title: "Responsive Design Best Practices",
      views: 15432,
      watchTime: 1245,
      ctr: 4.7,
    },
    {
      title: "Introduction to Tailwind CSS",
      views: 12876,
      watchTime: 987,
      ctr: 5.2,
    },
    {
      title: "Epic Mountain Biking Adventure",
      views: 9876,
      watchTime: 876,
      ctr: 4.1,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performing Videos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-sky-700 border-b">
                <th className="pb-2 font-medium">Video</th>
                <th className="pb-2 font-medium">Views</th>
                <th className="pb-2 font-medium">Watch Time</th>
                <th className="pb-2 font-medium">CTR</th>
              </tr>
            </thead>
            <tbody>
              {topVideos.map((video, index) => (
                <tr key={index} className="border-b last:border-0">
                  <td className="py-3 pr-4">
                    <div className="text-sm font-medium text-sky-900 line-clamp-1">{video.title}</div>
                  </td>
                  <td className="py-3 pr-4 text-sm text-sky-700">{video.views.toLocaleString()}</td>
                  <td className="py-3 pr-4 text-sm text-sky-700">
                    {Math.floor(video.watchTime / 60)}:{(video.watchTime % 60).toString().padStart(2, "0")}
                  </td>
                  <td className="py-3 text-sm text-sky-700">{video.ctr}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
