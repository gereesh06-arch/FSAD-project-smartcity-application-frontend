import React from 'react'
import { BarChart3, AlertCircle, Briefcase, MessageSquare } from 'lucide-react'
import DashboardCard from '../../components/DashboardCard'
import { listIssues } from '../../api/issues'

export default function AdminDashboard() {
  const [issues, setIssues] = React.useState([])
  const [issuesLoading, setIssuesLoading] = React.useState(true)

  React.useEffect(() => {
    let alive = true
    async function load() {
      try {
        setIssuesLoading(true)
        const data = await listIssues()
        if (!alive) return
        setIssues(Array.isArray(data) ? data : [])
      } finally {
        if (!alive) return
        setIssuesLoading(false)
      }
    }
    load()
    return () => {
      alive = false
    }
  }, [])

  const stats = [
    {
      title: 'Total Services',
      value: '24',
      icon: Briefcase,
      trend: '+2 this month',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Active Issues',
      value: issues.length.toString(),
      icon: AlertCircle,
      trend: issues.length ? `+${issues.length} new` : '- ',
      trendColor: 'text-red-600',
      bgColor: 'bg-red-100',
      iconColor: 'text-red-600',
    },
    {
      title: 'Infrastructure Units',
      value: '156',
      icon: BarChart3,
      trend: '+8 added',
      bgColor: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
    },
    {
      title: 'Feedback Count',
      value: '487',
      icon: MessageSquare,
      trend: '+45 pending',
      trendColor: 'text-orange-600',
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
  ]

  const recentReports = issues.length
    ? issues.map((i) => ({
        id: i.id,
        title: i.title,
        category: i.category,
        status: i.status || 'Pending',
        reported: i.createdAt ? new Date(i.createdAt).toLocaleString() : '',
        priority: i.priority,
      }))
    : [
        {
          id: 1,
          title: 'Water Leak at Main Street',
          category: 'Water Supply',
          status: 'In Progress',
          reported: '2 hours ago',
          priority: 'high',
        },
        {
          id: 2,
          title: 'Street Light Outage',
          category: 'Electricity',
          status: 'Resolved',
          reported: '5 hours ago',
          priority: 'medium',
        },
        {
          id: 3,
          title: 'Waste Collection Missed',
          category: 'Waste Management',
          status: 'Pending',
          reported: '1 day ago',
          priority: 'low',
        },
        {
          id: 4,
          title: 'Bus Route Delay',
          category: 'Public Transport',
          status: 'In Progress',
          reported: '3 hours ago',
          priority: 'medium',
        },
        {
          id: 5,
          title: 'Pothole on Park Avenue',
          category: 'Infrastructure',
          status: 'Resolved',
          reported: '2 days ago',
          priority: 'high',
        },
      ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Resolved':
        return 'bg-green-100 text-green-800'
      case 'In Progress':
        return 'bg-blue-100 text-blue-800'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600'
      case 'medium':
        return 'text-orange-600'
      case 'low':
        return 'text-green-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Here's an overview of your city services.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <DashboardCard key={idx} {...stat} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pie Chart Placeholder */}
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:col-span-1">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Service Distribution</h2>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 opacity-50" />
              <p className="text-gray-600">Pie Chart Placeholder</p>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:col-span-2">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Performance Metrics</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700 font-medium">Issue Resolution Rate</span>
                <span className="text-gray-900 font-bold">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700 font-medium">Service Availability</span>
                <span className="text-gray-900 font-bold">99.8%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '99.8%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700 font-medium">Customer Satisfaction</span>
                <span className="text-gray-900 font-bold">4.8/5.0</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '96%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reports Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-8 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Recent Reports</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700">
                  Title
                </th>
                <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700">
                  Category
                </th>
                <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700">
                  Priority
                </th>
                <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700">
                  Reported
                </th>
              </tr>
            </thead>
            <tbody>
              {issuesLoading ? (
                <tr className="border-b border-gray-200">
                  <td className="px-8 py-6 text-gray-600" colSpan={5}>
                    Loading…
                  </td>
                </tr>
              ) : (
                recentReports.map((report) => (
                  <tr key={report.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="px-8 py-4 text-gray-900 font-medium">{report.title}</td>
                    <td className="px-8 py-4 text-gray-600">{report.category}</td>
                    <td className="px-8 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          report.status
                        )}`}
                      >
                        {report.status}
                      </span>
                    </td>
                    <td className={`px-8 py-4 text-sm font-semibold capitalize ${getPriorityColor(
                      report.priority
                    )}`}>
                      {report.priority}
                    </td>
                    <td className="px-8 py-4 text-gray-600 text-sm">{report.reported}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
