import { MapPin } from 'lucide-react'

export default function UserInfrastructure() {
  // sample data - could be fetched from API later
  const infrastructureUnits = [
    { id: 1, name: 'Public Park Lighting', status: 'Operational', location: 'Downtown' },
    { id: 2, name: 'Bus Stop Shelter', status: 'Under Maintenance', location: 'North District' },
    { id: 3, name: 'Water Fountain', status: 'Operational', location: 'Central Square' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">City Infrastructure</h1>
        <p className="text-gray-600 mt-2">View public infrastructure status and locations.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-8 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Units Accessible to Users</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700">Location</th>
                <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {infrastructureUnits.map((unit) => (
                <tr key={unit.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-8 py-4 text-gray-900 font-medium">{unit.name}</td>
                  <td className="px-8 py-4 text-gray-600">{unit.location}</td>
                  <td className="px-8 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        unit.status === 'Operational'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}
                    >
                      {unit.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}