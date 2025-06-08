export interface AdSettings {
  preRoll: boolean
  midRoll: boolean
  postRoll: boolean
  overlay: boolean
  display: boolean
  frequency: number
  density: "low" | "medium" | "high"
  categories: string[]
}

export interface PremiumSettings {
  enabled: boolean
  price: string
  trialDays: string
  subscriptionModel: boolean
  payPerView: boolean
  earlyAccess: boolean
  adFree: boolean
  previewLength: number
}

export interface MembershipTier {
  id: string
  name: string
  price: string
  color: string
  benefits: string[]
}

export interface MembershipSettings {
  enabled: boolean
  tiers: MembershipTier[]
}

export interface SponsorshipDeal {
  id: string
  brand: string
  amount: number
  startDate: string
  endDate: string
  requirements: string
  status: "active" | "pending" | "completed"
}

export interface PaymentSettings {
  method: "bank" | "paypal" | "crypto"
  accountDetails: string
  threshold: number
  frequency: "monthly" | "quarterly"
  taxInfo: {
    id: string
    country: string
    withholding: boolean
  }
}

export interface VideoMonetizationSettings {
  videoId: string
  adsEnabled: boolean
  adTypes: string[]
  isPremium: boolean
  premiumPrice?: string
  sponsorshipDisclosure?: string
}
