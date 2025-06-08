export interface ViewsData {
  date: string
  views: number
  watchTime: number
}

export interface DemographicData {
  label: string
  value: number
}

export interface TopVideo {
  id: string
  title: string
  views: number
  watchTime: number
  ctr: number
  revenue?: number
}

export interface EngagementMetric {
  name: string
  value: string
  change: string
  positive: boolean
}

export interface RetentionPoint {
  position: number
  retention: number
}

export interface RevenueData {
  date: string
  adRevenue: number
  premiumRevenue: number
  membershipRevenue: number
  sponsorshipRevenue: number
  total: number
}

export interface GeographicRevenue {
  country: string
  amount: number
  percentage: number
}

export interface AnalyticsSummary {
  totalViews: number
  totalWatchTime: number
  subscribers: number
  viewsChange: number
  watchTimeChange: number
  subscribersChange: number
}
