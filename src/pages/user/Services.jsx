import { useEffect, useMemo, useState } from 'react'
import { Search, Filter } from 'lucide-react'
import ServiceCard from '../../components/ServiceCard'
import { Droplets, Zap, Trash2, Bus, Wifi } from 'lucide-react'
import { listServices } from '../../api/services'

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let alive = true
    async function load() {
      try {
        setLoading(true)
        setError('')
        const data = await listServices()
        if (!alive) return
        setServices(Array.isArray(data) ? data : [])
      } catch (e) {
        if (!alive) return
        setError(e?.response?.data?.message || 'Failed to load services')
      } finally {
        if (!alive) return
        setLoading(false)
      }
    }
    load()
    return () => {
      alive = false
    }
  }, [])

  const iconByCategory = useMemo(
    () => ({
      water: Droplets,
      electricity: Zap,
      waste: Trash2,
      transport: Bus,
      utilities: Wifi,
    }),
    []
  )

  const allServices = services.map((s) => ({
    ...s,
    icon: iconByCategory[s.category] || Wifi,
  }))

  const categories = [
    { name: 'All Services', value: 'all' },
    { name: 'Water', value: 'water' },
    { name: 'Electricity', value: 'electricity' },
    { name: 'Waste', value: 'waste' },
    { name: 'Transport', value: 'transport' },
    { name: 'Utilities', value: 'utilities' },
  ]

  const filteredServices = allServices.filter((service) => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Public Services</h1>
        <p className="text-gray-600 mt-2">Explore all available city services</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
          />
        </div>
        <button className="flex items-center space-x-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg transition">
          <Filter size={20} />
          <span>Advanced Filter</span>
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              selectedCategory === cat.value
                ? 'bg-blue-600 text-white'
                : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-blue-600'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-600 text-lg">Loading services…</p>
          </div>
        ) : error ? (
          <div className="col-span-full text-center py-12">
            <p className="text-red-700 text-lg">{error}</p>
          </div>
        ) : filteredServices.length > 0 ? (
          filteredServices.map((service, idx) => (
            <ServiceCard key={idx} {...service} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-600 text-lg">No services found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Services Info */}
      <div className="bg-blue-50 rounded-2xl shadow-lg p-8 border border-blue-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">About City Services</h2>
        <p className="text-gray-700 leading-relaxed">
          Our Smart City platform provides convenient access to all essential municipal services.
          Whether you need to pay utilities, report issues, check public transport schedules, or
          track public updates, everything is available in one place. We're committed to making
          city living easier and more efficient for all residents.
        </p>
      </div>
    </div>
  )
}
