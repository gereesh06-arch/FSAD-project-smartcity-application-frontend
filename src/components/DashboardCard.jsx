import { TrendingUp } from 'lucide-react'

export default function DashboardCard({
  title,
  value,
  icon: Icon,
  trend,
  trendColor = 'text-green-600',
  bgColor = 'bg-blue-100',
  iconColor = 'text-blue-600',
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {trend && (
            <p className={`text-xs mt-2 ${trendColor}`}>
              <TrendingUp className="inline w-4 h-4 mr-1" />
              {trend}
            </p>
          )}
        </div>
        <div className={`${bgColor} p-4 rounded-lg`}>
          <Icon className={`${iconColor} w-8 h-8`} />
        </div>
      </div>
    </div>
  )
}
