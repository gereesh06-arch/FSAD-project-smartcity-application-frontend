import { useEffect, useState } from 'react'
import { CalendarDays, Clock, User, Mail, Phone, Filter } from 'lucide-react'
import { listBookings } from '../../api/bookings'

export default function AdminBookings() {
  const [bookings, setBookings] = useState([])
  const [filter, setFilter] = useState('all') // all, upcoming, today, completed

  useEffect(() => {
    let alive = true
    async function loadBookings() {
      try {
        const data = await listBookings()
        if (!alive) return
        setBookings(Array.isArray(data) ? data : [])
      } catch (error) {
        if (!alive) return
        setBookings([])
      }
    }
    loadBookings()
    return () => {
      alive = false
    }
  }, [])

  const getStatus = (booking) => {
    const now = new Date()
    const bookingDate = new Date(booking.date + 'T' + booking.time)
    if (bookingDate < now) return 'completed'
    if (bookingDate.toDateString() === now.toDateString()) return 'today'
    return 'upcoming'
  }

  const filteredBookings = bookings.filter((booking) => {
    if (filter === 'all') return true
    return getStatus(booking) === filter
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-gray-100 text-gray-800'
      case 'today': return 'bg-blue-100 text-blue-800'
      case 'upcoming': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Completed'
      case 'today': return 'Today'
      case 'upcoming': return 'Upcoming'
      default: return 'Unknown'
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Service Bookings</h1>
          <p className="text-slate-600 dark:text-slate-300 mt-2">Manage citizen service appointments</p>
        </div>
        <div className="flex gap-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-slate-900 dark:text-slate-100"
          >
            <option value="all">All Bookings</option>
            <option value="upcoming">Upcoming</option>
            <option value="today">Today</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="rounded-3xl bg-slate-50 dark:bg-slate-800 p-12 text-center">
          <CalendarDays size={48} className="mx-auto text-slate-400 dark:text-slate-500 mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No bookings found</h3>
          <p className="text-slate-600 dark:text-slate-300">
            {filter === 'all' ? 'No service bookings have been made yet' : `No ${filter} bookings`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking, idx) => {
            const status = getStatus(booking)
            return (
              <div key={idx} className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{booking.serviceName}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Booking #{booking.serviceId}-{idx + 1}</p>
                      </div>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(status)}`}>
                        {getStatusText(status)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="flex items-center gap-3">
                        <CalendarDays size={16} className="text-slate-500 dark:text-slate-400" />
                        <span className="text-sm text-slate-700 dark:text-slate-200">{new Date(booking.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock size={16} className="text-slate-500 dark:text-slate-400" />
                        <span className="text-sm text-slate-700 dark:text-slate-200">{booking.time}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <User size={16} className="text-slate-500 dark:text-slate-400" />
                        <span className="text-sm text-slate-700 dark:text-slate-200">{booking.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail size={16} className="text-slate-500 dark:text-slate-400" />
                        <span className="text-sm text-slate-700 dark:text-slate-200">{booking.email}</span>
                      </div>
                    </div>

                    {booking.notes && (
                      <div className="mt-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800">
                        <p className="text-sm text-slate-600 dark:text-slate-300"><strong>Notes:</strong> {booking.notes}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-3">
                    <button className="rounded-2xl bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition">
                      Contact Citizen
                    </button>
                    <button className="rounded-2xl bg-green-600 text-white px-4 py-2 hover:bg-green-700 transition">
                      Mark Complete
                    </button>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Booked on {new Date(booking.bookedAt).toLocaleDateString()} at {new Date(booking.bookedAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}