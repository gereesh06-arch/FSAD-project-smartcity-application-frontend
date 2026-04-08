import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, MapPin, Users, Clock } from 'lucide-react'
import ServiceCard from '../../components/ServiceCard'
import { Droplets, Zap, Trash2, Bus } from 'lucide-react'

export default function UserDashboard() {
  const [searchQuery, setSearchQuery] = useState('')

  const services = [
    {
      name: 'Water Supply',
      description: 'Reliable and clean water distribution',
      icon: Droplets,
      category: 'water',
      status: 'active',
    },
    {
      name: 'Electricity',
      description: 'Efficient power distribution',
      icon: Zap,
      category: 'electricity',
      status: 'active',
    },
    {
      name: 'Waste Management',
      description: 'Sustainable waste collection',
      icon: Trash2,
      category: 'waste',
      status: 'active',
    },
    {
      name: 'Public Transport',
      description: 'Easy city-wide transportation',
      icon: Bus,
      category: 'transport',
      status: 'active',
    },
  ]

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const quickLinks = [
    {
      title: 'Report Issue',
      icon: '🚨',
      description: 'Report a problem in your area',
      color: 'from-red-400 to-red-600',
      path: '/user/report-issue',
    },
    {
      title: 'Track Status',
      icon: '📍',
      description: 'Check issue status',
      color: 'from-blue-400 to-blue-600',
      path: '/user/report-issue',
    },
    {
      title: 'Send Feedback',
      icon: '💬',
      description: 'Share your thoughts',
      color: 'from-green-400 to-green-600',
      path: '/user/feedback',
    },
    {
      title: 'Service Updates',
      icon: '📢',
      description: 'Latest announcements',
      color: 'from-purple-400 to-purple-600',
      path: '/user/services',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome to Smart City</h1>
        <p className="text-gray-600 mt-2">Access all city services and report issues</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search for services..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-lg"
        />
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickLinks.map((link, idx) => (
          <Link
            key={idx}
            to={link.path}
            className={`bg-gradient-to-br ${link.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition transform hover:scale-105`}
          >
            <p className="text-3xl mb-3">{link.icon}</p>
            <h3 className="text-lg font-bold mb-1">{link.title}</h3>
            <p className="text-white text-opacity-90 text-sm">{link.description}</p>
          </Link>
        ))}
      </div>

      {/* Services Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredServices.length > 0 ? (
            filteredServices.map((service, idx) => (
              <ServiceCard key={idx} {...service} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600 text-lg">No services found matching your search</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Your Recent Issues</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-4 pb-4 border-b border-gray-200">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">⚠️</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Water Leak at Home</h3>
              <p className="text-gray-600 text-sm mt-1">Reported 3 days ago • Status: In Progress</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }} />
                </div>
                <span className="text-xs text-gray-600">60%</span>
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-4 pb-4 border-b border-gray-200">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">✅</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Street Light Fixed</h3>
              <p className="text-gray-600 text-sm mt-1">Reported 5 days ago • Status: Resolved</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🔄</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Waste Collection Missed</h3>
              <p className="text-gray-600 text-sm mt-1">Reported 1 day ago • Status: Pending</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
