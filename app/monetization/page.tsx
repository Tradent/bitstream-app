"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { DollarSign, CreditCard, Users, Gift, Lock } from "lucide-react"

export default function MonetizationPage() {
  const [adSettings, setAdSettings] = useState({
    preRoll: true,
    midRoll: true,
    postRoll: false,
    overlay: true,
    display: true,
  })

  const [premiumSettings, setPremiumSettings] = useState({
    enabled: true,
    price: "4.99",
    trialDays: "7",
  })

  const [membershipSettings, setMembershipSettings] = useState({
    enabled: true,
    tiers: [
      { name: "Supporter", price: "4.99", color: "bg-sky-500" },
      { name: "Premium", price: "9.99", color: "bg-teal-500" },
      { name: "VIP", price: "19.99", color: "bg-purple-500" },
    ],
  })

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-sky-900">Monetization</h1>
        <p className="text-sky-700 mt-1">Manage your revenue streams and monetization settings</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-sky-50">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="ads">Ads</TabsTrigger>
          <TabsTrigger value="premium">Premium Content</TabsTrigger>
          <TabsTrigger value="memberships">Channel Memberships</TabsTrigger>
          <TabsTrigger value="sponsorships">Sponsorships</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Total Revenue</CardTitle>
                <CardDescription>Last 30 days</CardDescription>
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
                <CardTitle className="text-lg font-medium">Estimated Monthly Revenue</CardTitle>
                <CardDescription>Based on current trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-sky-700">$2,450.00</div>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <span className="i-lucide-arrow-up-right mr-1"></span>
                  12.4% from previous month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Next Payout</CardTitle>
                <CardDescription>Scheduled for May 15, 2023</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-sky-700">$1,243.78</div>
                <Button variant="outline" size="sm" className="mt-2">
                  View payment history
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
              <CardDescription>Your revenue sources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-sky-500 mr-2" />
                    <div>
                      <div className="font-medium text-sky-900">Ad Revenue</div>
                      <div className="text-sm text-sky-700">From pre-roll, mid-roll, and display ads</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sky-900">$1,243.78</div>
                    <div className="text-sm text-sky-700">65.7% of total</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Lock className="h-5 w-5 text-teal-500 mr-2" />
                    <div>
                      <div className="font-medium text-sky-900">Premium Content</div>
                      <div className="text-sm text-sky-700">From subscribers and pay-per-view</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sky-900">$412.45</div>
                    <div className="text-sm text-sky-700">21.8% of total</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-purple-500 mr-2" />
                    <div>
                      <div className="font-medium text-sky-900">Channel Memberships</div>
                      <div className="text-sm text-sky-700">From member subscriptions</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sky-900">$236.22</div>
                    <div className="text-sm text-sky-700">12.5% of total</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Gift className="h-5 w-5 text-amber-500 mr-2" />
                    <div>
                      <div className="font-medium text-sky-900">Sponsorships</div>
                      <div className="text-sm text-sky-700">From brand deals and sponsorships</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sky-900">$0.00</div>
                    <div className="text-sm text-sky-700">0% of total</div>
                  </div>
                </div>
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
                <CardTitle>Monetization Eligibility</CardTitle>
                <CardDescription>Your channel's eligibility status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 6L9 17l-5-5"></path>
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-sky-900">Subscriber Count</div>
                        <div className="text-sm text-sky-700">1,000+ subscribers required</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                      5,243
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 6L9 17l-5-5"></path>
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-sky-900">Watch Time</div>
                        <div className="text-sm text-sky-700">4,000+ hours in past 12 months</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                      8,432 hours
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 6L9 17l-5-5"></path>
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-sky-900">Content Guidelines</div>
                        <div className="text-sm text-sky-700">Adherence to platform policies</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                      Compliant
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 6L9 17l-5-5"></path>
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-sky-900">Account Status</div>
                        <div className="text-sm text-sky-700">Account in good standing</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                      Active
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ads" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ad Settings</CardTitle>
              <CardDescription>Configure your ad preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="pre-roll" className="text-base">
                      Pre-roll Ads
                    </Label>
                    <p className="text-sm text-sky-700">Ads that play before your video starts</p>
                  </div>
                  <Switch
                    id="pre-roll"
                    checked={adSettings.preRoll}
                    onCheckedChange={(checked) => setAdSettings({ ...adSettings, preRoll: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="mid-roll" className="text-base">
                      Mid-roll Ads
                    </Label>
                    <p className="text-sm text-sky-700">Ads that play during your video</p>
                  </div>
                  <Switch
                    id="mid-roll"
                    checked={adSettings.midRoll}
                    onCheckedChange={(checked) => setAdSettings({ ...adSettings, midRoll: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="post-roll" className="text-base">
                      Post-roll Ads
                    </Label>
                    <p className="text-sm text-sky-700">Ads that play after your video ends</p>
                  </div>
                  <Switch
                    id="post-roll"
                    checked={adSettings.postRoll}
                    onCheckedChange={(checked) => setAdSettings({ ...adSettings, postRoll: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="overlay" className="text-base">
                      Overlay Ads
                    </Label>
                    <p className="text-sm text-sky-700">
                      Semi-transparent ads that appear on the lower portion of your video
                    </p>
                  </div>
                  <Switch
                    id="overlay"
                    checked={adSettings.overlay}
                    onCheckedChange={(checked) => setAdSettings({ ...adSettings, overlay: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="display" className="text-base">
                      Display Ads
                    </Label>
                    <p className="text-sm text-sky-700">Ads that appear alongside your video</p>
                  </div>
                  <Switch
                    id="display"
                    checked={adSettings.display}
                    onCheckedChange={(checked) => setAdSettings({ ...adSettings, display: checked })}
                  />
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium text-sky-900 mb-2">Ad Frequency</h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="ad-frequency">Mid-roll Ad Frequency</Label>
                      <span className="text-sm text-sky-700">Every 8 minutes</span>
                    </div>
                    <Slider id="ad-frequency" defaultValue={[8]} max={15} min={4} step={1} className="w-full" />
                    <p className="text-xs text-sky-600">Adjust how frequently mid-roll ads appear in longer videos</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="ad-density">Ad Density</Label>
                      <span className="text-sm text-sky-700">Medium</span>
                    </div>
                    <Select defaultValue="medium">
                      <SelectTrigger id="ad-density">
                        <SelectValue placeholder="Select ad density" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-sky-600">Controls the number of ads shown to viewers</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium text-sky-900 mb-2">Ad Categories</h3>
                <p className="text-sm text-sky-700 mb-4">Select which ad categories can appear on your videos</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["Technology", "Gaming", "Fashion", "Food", "Travel", "Finance", "Health", "Entertainment"].map(
                    (category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Switch id={`category-${category.toLowerCase()}`} defaultChecked={true} />
                        <Label htmlFor={`category-${category.toLowerCase()}`}>{category}</Label>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save Ad Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="premium" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Premium Content Settings</CardTitle>
              <CardDescription>Configure your premium content options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="premium-enabled" className="text-base">
                    Enable Premium Content
                  </Label>
                  <p className="text-sm text-sky-700">Allow viewers to subscribe to your premium content</p>
                </div>
                <Switch
                  id="premium-enabled"
                  checked={premiumSettings.enabled}
                  onCheckedChange={(checked) => setPremiumSettings({ ...premiumSettings, enabled: checked })}
                />
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="subscription-price">Monthly Subscription Price ($)</Label>
                  <Input
                    id="subscription-price"
                    type="number"
                    value={premiumSettings.price}
                    onChange={(e) => setPremiumSettings({ ...premiumSettings, price: e.target.value })}
                    className="mt-1"
                  />
                  <p className="text-xs text-sky-600 mt-1">Set the monthly price for access to your premium content</p>
                </div>

                <div>
                  <Label htmlFor="trial-days">Free Trial Period (Days)</Label>
                  <Input
                    id="trial-days"
                    type="number"
                    value={premiumSettings.trialDays}
                    onChange={(e) => setPremiumSettings({ ...premiumSettings, trialDays: e.target.value })}
                    className="mt-1"
                  />
                  <p className="text-xs text-sky-600 mt-1">Set the number of days for the free trial period</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium text-sky-900 mb-2">Premium Content Types</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="subscription-model" defaultChecked={true} />
                    <div>
                      <Label htmlFor="subscription-model">Subscription Model</Label>
                      <p className="text-xs text-sky-600">
                        Viewers pay a monthly fee for access to all premium content
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="pay-per-view" defaultChecked={false} />
                    <div>
                      <Label htmlFor="pay-per-view">Pay-Per-View</Label>
                      <p className="text-xs text-sky-600">Viewers pay for individual premium videos</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="early-access" defaultChecked={true} />
                    <div>
                      <Label htmlFor="early-access">Early Access</Label>
                      <p className="text-xs text-sky-600">Premium subscribers get early access to new videos</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="ad-free" defaultChecked={true} />
                    <div>
                      <Label htmlFor="ad-free">Ad-Free Viewing</Label>
                      <p className="text-xs text-sky-600">Premium subscribers watch without ads</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium text-sky-900 mb-2">Premium Content Preview</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="preview-length">Preview Length (seconds)</Label>
                    <span className="text-sm text-sky-700">30 seconds</span>
                  </div>
                  <Slider id="preview-length" defaultValue={[30]} max={120} min={0} step={10} className="w-full" />
                  <p className="text-xs text-sky-600">
                    Set how much of your premium videos non-subscribers can preview
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save Premium Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="memberships" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Channel Memberships</CardTitle>
              <CardDescription>Configure membership tiers and benefits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="memberships-enabled" className="text-base">
                    Enable Channel Memberships
                  </Label>
                  <p className="text-sm text-sky-700">Allow viewers to become channel members</p>
                </div>
                <Switch
                  id="memberships-enabled"
                  checked={membershipSettings.enabled}
                  onCheckedChange={(checked) => setMembershipSettings({ ...membershipSettings, enabled: checked })}
                />
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium text-sky-900 mb-2">Membership Tiers</h3>
                <p className="text-sm text-sky-700 mb-4">Configure your membership tiers and pricing</p>

                <div className="space-y-4">
                  {membershipSettings.tiers.map((tier, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded-full ${tier.color} mr-2`}></div>
                          <h4 className="font-medium text-sky-900">{tier.name} Tier</h4>
                        </div>
                        <Badge variant="outline" className="bg-sky-50 text-sky-700 hover:bg-sky-50">
                          ${tier.price}/month
                        </Badge>
                      </div>

                      <div className="space-y-2 mb-4">
                        <Label htmlFor={`tier-${index}-name`}>Tier Name</Label>
                        <Input id={`tier-${index}-name`} defaultValue={tier.name} />
                      </div>

                      <div className="space-y-2 mb-4">
                        <Label htmlFor={`tier-${index}-price`}>Monthly Price ($)</Label>
                        <Input id={`tier-${index}-price`} type="number" defaultValue={tier.price} />
                      </div>

                      <div className="space-y-2">
                        <Label>Benefits</Label>
                        <div className="space-y-2">
                          {["Custom Badge", "Custom Emojis", "Members-only Chat", "Members-only Videos"].map(
                            (benefit, i) => (
                              <div key={i} className="flex items-center space-x-2">
                                <Switch id={`tier-${index}-benefit-${i}`} defaultChecked={i < 3 - index} />
                                <Label htmlFor={`tier-${index}-benefit-${i}`}>{benefit}</Label>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="mt-4">
                  Add New Tier
                </Button>
              </div>

              <div className="flex justify-end">
                <Button>Save Membership Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sponsorships" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sponsorship Management</CardTitle>
              <CardDescription>Track and manage your sponsorship deals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Gift className="h-12 w-12 text-sky-500 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-sky-900 mb-2">No Active Sponsorships</h3>
                <p className="text-sky-700 mb-4">You don't have any active sponsorship deals at the moment</p>
                <Button>Add Sponsorship Deal</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sponsorship Resources</CardTitle>
              <CardDescription>Tools to help you secure sponsorships</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium text-sky-900 mb-2">Media Kit</h4>
                  <p className="text-sm text-sky-700 mb-4">
                    Create a professional media kit to share with potential sponsors
                  </p>
                  <Button variant="outline">Create Media Kit</Button>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium text-sky-900 mb-2">Sponsorship Marketplace</h4>
                  <p className="text-sm text-sky-700 mb-4">Connect with brands looking for content creators</p>
                  <Button variant="outline">Browse Opportunities</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>Manage your payment methods and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="pt-2">
                <h3 className="text-lg font-medium text-sky-900 mb-4">Payment Method</h3>
                <div className="border rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 text-sky-500 mr-3" />
                      <div>
                        <div className="font-medium text-sky-900">Bank Account</div>
                        <div className="text-sm text-sky-700">Ending in 4567</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Change
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="payment-threshold">Payment Threshold ($)</Label>
                    <Input id="payment-threshold" type="number" defaultValue="100" className="mt-1" />
                    <p className="text-xs text-sky-600 mt-1">Minimum amount required before payment is issued</p>
                  </div>

                  <div>
                    <Label htmlFor="payment-frequency">Payment Frequency</Label>
                    <Select defaultValue="monthly">
                      <SelectTrigger id="payment-frequency">
                        <SelectValue placeholder="Select payment frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-sky-600 mt-1">How often you receive payments</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium text-sky-900 mb-4">Tax Information</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="tax-id">Tax ID / SSN</Label>
                    <Input id="tax-id" type="text" placeholder="Enter your tax ID" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="tax-country">Tax Country</Label>
                    <Select defaultValue="us">
                      <SelectTrigger id="tax-country">
                        <SelectValue placeholder="Select your tax country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="tax-withholding" defaultChecked={false} />
                    <div>
                      <Label htmlFor="tax-withholding">Tax Withholding</Label>
                      <p className="text-xs text-sky-600">Withhold taxes from your payments</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save Payment Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
