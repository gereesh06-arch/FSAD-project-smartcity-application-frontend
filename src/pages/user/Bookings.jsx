import { useEffect, useState } from 'react'
import { CalendarDays, Clock, MapPin, Phone, Mail, X } from 'lucide-react'
import { listBookings } from '../../api/bookings'

export default function UserBookings() {
  const [bookings, setBookings] = useState([])
  const [selectedBooking, setSelectedBooking] = useState(null)

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

  const getStatusColor = (booking) => {
    const now = new Date()
    const bookingDate = new Date(booking.date + 'T' + booking.time)
    if (bookingDate < now) return 'bg-gray-100 text-gray-800'
    if (bookingDate.toDateString() === now.toDateString()) return 'bg-blue-100 text-blue-800'
    return 'bg-green-100 text-green-800'
  }

  const getStatusText = (booking) => {
    const now = new Date()
    const bookingDate = new Date(booking.date + 'T' + booking.time)
    if (bookingDate < now) return 'Completed'
    if (bookingDate.toDateString() === now.toDateString()) return 'Today'
    return 'Upcoming'
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Bookings</h1>
        <p className="text-slate-600 dark:text-slate-300 mt-2">View and manage your service appointments</p>
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-3xl bg-slate-50 dark:bg-slate-800 p-12 text-center">
          <CalendarDays size={48} className="mx-auto text-slate-400 dark:text-slate-500 mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No bookings yet</h3>
          <p className="text-slate-600 dark:text-slate-300">Book a service from the Services page to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedBooking(booking)}
              className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-6 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{booking.serviceName}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Booking #{booking.serviceId}-{idx + 1}</p>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(booking)}`}>
                  {getStatusText(booking)}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <CalendarDays size={16} />
                  <span>{new Date(booking.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <Clock size={16} />
                  <span>{booking.time}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <MapPin size={16} />
                  <span>City Service Center</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Booked on {new Date(booking.bookedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Booking Details</h2>
              <button onClick={() => setSelectedBooking(null)} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                <X size={20} />
              </button>
            </div>

            <div className="px-6 py-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{selectedBooking.serviceName}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Service Appointment</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CalendarDays size={18} className="text-slate-500 dark:text-slate-400" />
                  <span className="text-slate-700 dark:text-slate-200">{new Date(selectedBooking.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-slate-500 dark:text-slate-400" />
                  <span className="text-slate-700 dark:text-slate-200">{selectedBooking.time}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-slate-500 dark:text-slate-400" />
                  <span className="text-slate-700 dark:text-slate-200">{selectedBooking.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-slate-500 dark:text-slate-400" />
                  <span className="text-slate-700 dark:text-slate-200">Contact: {selectedBooking.name}</span>
                </div>
              </div>

              {selectedBooking.notes && (
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Notes</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{selectedBooking.notes}</p>
                </div>
              )}

              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Booked on {new Date(selectedBooking.bookedAt).toLocaleDateString()} at {new Date(selectedBooking.bookedAt).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}