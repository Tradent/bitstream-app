"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ViewsChart } from "@/components/analytics/views-chart"
import { DemographicsCard } from "@/components/analytics/demographics-card"
import { EngagementMetrics } from "@/components/analytics/engagement-metrics"
import { TopVideosTable } from "@/components/analytics/top-videos-table"
import { AudienceRetention } from "@/components/analytics/audience-retention"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30")

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-sky-900">Analytics Dashboard</h1>
          <p className="text-sky-700 mt-1">Track your channel performance and audience engagement</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-sky-50">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Total Views</CardTitle>
                <CardDescription>Last {timeRange} days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-sky-700">124,892</div>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <span className="i-lucide-arrow-up-right mr-1"></span>
                  12.5% from previous period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Watch Time (hours)</CardTitle>
                <CardDescription>Last {timeRange} days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-sky-700">8,432</div>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <span className="i-lucide-arrow-up-right mr-1"></span>
                  8.2% from previous period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Subscribers</CardTitle>
                <CardDescription>Last {timeRange} days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-sky-700">+1,243</div>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <span className="i-lucide-arrow-up-right mr-1"></span>
                  15.3% from previous period
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Over Time</CardTitle>
              <CardDescription>Views and watch time trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ViewsChart timeRange={Number.parseInt(timeRange)} />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TopVideosTable />
            <EngagementMetrics />
          </div>
        </TabsContent>

        <TabsContent value="audience" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DemographicsCard title="Age Distribution" type="age" />
            <DemographicsCard title="Gender Distribution" type="gender" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DemographicsCard title="Geographic Distribution" type="geography" />
            <DemographicsCard title="Device Type" type="device" />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Audience Retention</CardTitle>
              <CardDescription>How long viewers watch your videos</CardDescription>
            </CardHeader>
            <CardContent>
              <AudienceRetention />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Likes</CardTitle>
                <CardDescription>Last {timeRange} days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-sky-700">8,932</div>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <span className="i-lucide-arrow-up-right mr-1"></span>
                  9.7% from previous period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Comments</CardTitle>
                <CardDescription>Last {timeRange} days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-sky-700">1,287</div>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <span className="i-lucide-arrow-up-right mr-1"></span>
                  11.2% from previous period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Shares</CardTitle>
                <CardDescription>Last {timeRange} days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-sky-700">3,456</div>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <span className="i-lucide-arrow-up-right mr-1"></span>
                  14.8% from previous period
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Engagement Rate</CardTitle>
              <CardDescription>Likes, comments, and shares per view</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              {/* Engagement chart would go here */}
              <div className="h-full flex items-center justify-center text-sky-700">Engagement chart visualization</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Comments</CardTitle>
              <CardDescription>Most engaging comments on your videos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border-b pb-4 last:border-0">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-medium">
                        {String.fromCharCode(64 + i)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-sky-900">User {i}</h4>
                          <span className="text-xs text-sky-600">2 days ago</span>
                        </div>
                        <p className="text-sky-800 mt-1">
                          This is an amazing video! I learned so much from your content.
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-sky-600">
                          <span>42 likes</span>
                          <span>5 replies</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Total Revenue</CardTitle>
                <CardDescription>Last {timeRange} days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-sky-700">$1,892.45</div>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <span className="i-lucide-arrow-up-right mr-1"></span>
                  8.3% from previous period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Ad Revenue</CardTitle>
                <CardDescription>Last {timeRange} days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-sky-700">$1,243.78</div>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <span className="i-lucide-arrow-up-right mr-1"></span>
                  7.5% from previous period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Premium Content</CardTitle>
                <CardDescription>Last {timeRange} days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-sky-700">$648.67</div>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <span className="i-lucide-arrow-up-right mr-1"></span>
                  12.4% from previous period
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
              <CardDescription>Revenue sources and trends</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              {/* Revenue chart would go here */}
              <div className="h-full flex items-center justify-center text-sky-700">
                Revenue breakdown visualization
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Earning Videos</CardTitle>
                <CardDescription>Videos generating the most revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-sky-100 rounded"></div>
                        <div>
                          <h4 className="font-medium text-sky-900">Video Title {i}</h4>
                          <p className="text-xs text-sky-600">Published 2 weeks ago</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-sky-900">${(200 - i * 50).toFixed(2)}</div>
                        <p className="text-xs text-sky-600">12.5K views</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Geography</CardTitle>
                <CardDescription>Top earning regions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["United States", "United Kingdom", "Canada", "Australia", "Germany"].map((country, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-sky-100 rounded-full"></div>
                        <span className="text-sky-900">{country}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-sky-900">${(500 - i * 80).toFixed(2)}</div>
                        <div className="w-32 h-2 bg-sky-100 rounded-full mt-1">
                          <div className="h-full bg-sky-500 rounded-full" style={{ width: `${100 - i * 15}%` }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
