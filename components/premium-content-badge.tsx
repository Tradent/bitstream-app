import { Badge } from "@/components/ui/badge"
import { Lock } from "lucide-react"

interface PremiumContentBadgeProps {
  variant?: "default" | "subtle" | "outline"
  size?: "default" | "sm"
}

export function PremiumContentBadge({ variant = "default", size = "default" }: PremiumContentBadgeProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "default":
        return "bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700"
      case "subtle":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200"
      case "outline":
        return "border border-amber-500 text-amber-700 bg-transparent hover:bg-amber-50"
      default:
        return "bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700"
    }
  }

  const getSizeClasses = () => {
    return size === "sm" ? "text-xs py-0 px-1.5" : "text-xs py-0.5 px-2"
  }

  return (
    <Badge className={`${getVariantClasses()} ${getSizeClasses()} font-medium`}>
      <Lock className="w-3 h-3 mr-1" />
      Premium
    </Badge>
  )
}
