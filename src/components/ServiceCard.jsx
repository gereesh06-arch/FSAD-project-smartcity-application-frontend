import { MapPin, Users, Clock } from 'lucide-react'

export default function ServiceCard({
  name,
  description,
  icon: Icon,
  category,
  status = 'active',
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer hover:scale-105 duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${
          category === 'water' ? 'bg-blue-100' :
          category === 'electricity' ? 'bg-yellow-100' :
          category === 'waste' ? 'bg-green-100' :
          category === 'transport' ? 'bg-purple-100' :
          'bg-gray-100'
        }`}>
          <Icon className={`w-6 h-6 ${
            category === 'water' ? 'text-blue-600' :
            category === 'electricity' ? 'text-yellow-600' :
            category === 'waste' ? 'text-green-600' :
            category === 'transport' ? 'text-purple-600' :
            'text-gray-600'
          }`} />
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
          status === 'active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {status === 'active' ? 'Active' : 'Inactive'}
        </span>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>

      <div className="space-y-2 text-xs text-gray-500">
        <div className="flex items-center space-x-2">
          <MapPin size={14} />
          <span>City Wide Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <Users size={14} />
          <span>Community Service</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock size={14} />
          <span>24/7 Support</span>
        </div>
      </div>
    </div>
  )
}
