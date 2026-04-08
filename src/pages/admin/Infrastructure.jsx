import { MapPin, AlertTriangle, TrendingUp } from 'lucide-react'

export default function Infrastructure() {
  const infrastructureUnits = [
    {
      id: 1,
      name: 'Water Treatment Plant A',
      category: 'Water',
      location: 'North District',
      status: 'Operational',
      capacity: '85%',
      lastMaintenance: '2026-02-15',
    },
    {
      id: 2,
      name: 'Power Station B',
      category: 'Electricity',
      location: 'Central Zone',
      status: 'Operational',
      capacity: '72%',
      lastMaintenance: '2026-02-10',
    },
    {
      id: 3,
      name: 'Waste Processing Center',
      category: 'Waste',
      location: 'South District',
      status: 'Under Maintenance',
      capacity: '45%',
      lastMaintenance: '2026-02-20',
    },
    {
      id: 4,
      name: 'Transit Hub Station',
      category: 'Transport',
      location: 'East District',
      status: 'Operational',
      capacity: '92%',
      lastMaintenance: '2026-02-08',
    },
    {
      id: 5,
      name: 'Water Distribution Pump',
      category: 'Water',
      location: 'West District',
      status: 'Operational',
      capacity: '68%',
      lastMaintenance: '2026-02-18',
    },
    {
      id: 6,
      name: 'Street Light Network',
      category: 'Electricity',
      location: 'Downtown',
      status: 'Operational',
      capacity: '95%',
      lastMaintenance: '2026-02-12',
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Operational':
        return 'bg-green-100 text-green-800'
      case 'Under Maintenance':
        return 'bg-orange-100 text-orange-800'
      case 'Offline':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Infrastructure Management</h1>
        <p className="text-gray-600 mt-2">Monitor and manage all city infrastructure units</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Operational Units</p>
              <p className="text-2xl font-bold text-gray-900">5 / 6</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <AlertTriangle className="text-orange-600" size={24} />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Under Maintenance</p>
              <p className="text-2xl font-bold text-gray-900">1</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <MapPin className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Units</p>
              <p className="text-2xl font-bold text-gray-900">6</p>
            </div>
          </div>
        </div>
      </div>

      {/* Infrastructure Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-8 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">All Infrastructure Units</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700">
                  Category
                </th>
                <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700">
                  Location
                </th>
                <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700">
                  Capacity
                </th>
                <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700">
                  Last Maintenance
                </th>
              </tr>
            </thead>
            <tbody>
              {infrastructureUnits.map((unit) => (
                <tr key={unit.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-8 py-4 text-gray-900 font-medium">{unit.name}</td>
                  <td className="px-8 py-4 text-gray-600">{unit.category}</td>
                  <td className="px-8 py-4 text-gray-600">{unit.location}</td>
                  <td className="px-8 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        unit.status
                      )}`}
                    >
                      {unit.status}
                    </span>
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: unit.capacity }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{unit.capacity}</span>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-gray-600 text-sm">{unit.lastMaintenance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
