import { useState } from 'react'
import { X, CalendarDays, Clock, User, Mail, MessageSquare } from 'lucide-react'

export default function ServiceBookingModal({ service, onClose, onBooking }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: new Date().toISOString().slice(0, 10),
    time: '10:00',
    notes: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  if (!service) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      await new Promise((resolve) => setTimeout(resolve, 400))
      onBooking({
        serviceId: service.id,
        serviceName: service.name,
        ...formData,
        bookedAt: new Date().toISOString(),
      })
      setMessage('Booking confirmed! You will receive a confirmation email shortly.')
      setFormData((prev) => ({ ...prev, notes: '' }))
      setTimeout(() => {
        setMessage('')
        onClose()
      }, 1400)
    } catch (error) {
      setMessage('Could not complete the booking. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-700">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Book {service.name}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Schedule a service appointment for the city service you need.</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 px-6 py-6">
          {message && (
            <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-800">
              {message}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Your Name</label>
              <div className="flex items-center gap-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3">
                <User size={18} className="text-slate-500 dark:text-slate-400" />
                <input
                  value={formData.name}
                  name="name"
                  onChange={handleChange}
                  required
                  placeholder="Full name"
                  className="w-full bg-transparent outline-none text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Email</label>
              <div className="flex items-center gap-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3">
                <Mail size={18} className="text-slate-500 dark:text-slate-400" />
                <input
                  value={formData.email}
                  name="email"
                  onChange={handleChange}
                  required
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-transparent outline-none text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Date</label>
              <div className="flex items-center gap-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3">
                <CalendarDays size={18} className="text-slate-500 dark:text-slate-400" />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent outline-none text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Time</label>
              <div className="flex items-center gap-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3">
                <Clock size={18} className="text-slate-500 dark:text-slate-400" />
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent outline-none text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Notes or special request</label>
            <div className="rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3">
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="4"
                placeholder="Optional details for the service team"
                className="w-full bg-transparent outline-none text-slate-900 dark:text-slate-100 resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-blue-600 text-white py-3 font-semibold transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Booking...' : 'Confirm Booking'}
          </button>
        </form>
      </div>
    </div>
  )
}
