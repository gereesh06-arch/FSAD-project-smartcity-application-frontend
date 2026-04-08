import { useEffect, useState } from 'react'
import FeedbackForm from '../../components/FeedbackForm'
import { listFeedback, getFeedbackStats } from '../../api/feedback'

export default function Feedback() {
  const [feedbackCount, setFeedbackCount] = useState(0)
  const [averageRating, setAverageRating] = useState(0)
  const [feedbackList, setFeedbackList] = useState([])

  useEffect(() => {
    let alive = true

    async function loadFeedback() {
      try {
        const stats = await getFeedbackStats()
        const data = await listFeedback()
        if (!alive) return
        setFeedbackCount(stats.count || data.length)
        setAverageRating(Math.round((stats.averageRating || 0) * 10) / 10)
        setFeedbackList(Array.isArray(data) ? data : [])
      } catch (error) {
        if (!alive) return
        setFeedbackCount(0)
        setAverageRating(0)
        setFeedbackList([])
      }
    }

    loadFeedback()
    return () => {
      alive = false
    }
  }, [])

  const feedbackStats = [
    {
      label: 'Your Feedback Count',
      value: feedbackList.length.toString(),
    },
    {
      label: 'Average Rating',
      value: averageRating > 0 ? averageRating.toFixed(1) : 'N/A',
    },
    {
      label: 'Feedback Items',
      value: feedbackCount > 0 ? 'Submitted' : 'No feedback yet',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Send Feedback</h1>
        <p className="text-gray-600 mt-2">Help us improve by sharing your valuable feedback</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {feedbackStats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-lg p-6">
            <p className="text-gray-600 text-sm">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Form and Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <FeedbackForm />
        </div>

        {/* Feedback List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Your Feedback Submissions</h3>
            {feedbackList.length === 0 ? (
              <p className="text-gray-600">No feedback submitted yet. Share your thoughts above!</p>
            ) : (
              <div className="space-y-4">
                {feedbackList.map((item, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">{item.email}</p>
                      </div>
                      <span className="text-yellow-500">{'⭐'.repeat(item.rating)}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2"><strong>Category:</strong> {item.category}</p>
                    <p className="text-gray-700">{item.message}</p>
                    <p className="text-xs text-gray-500 mt-2">{new Date(item.createdAt).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* What We Do With Feedback */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">What We Do With Your Feedback</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start space-x-3">
                <span className="text-emerald-600 text-lg leading-none">✓</span>
                <span>Review all submissions carefully</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-emerald-600 text-lg leading-none">✓</span>
                <span>Identify improvement opportunities</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-emerald-600 text-lg leading-none">✓</span>
                <span>Implement necessary changes</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-emerald-600 text-lg leading-none">✓</span>
                <span>Keep you updated on progress</span>
              </li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">FAQ</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">
                  How long does it take to respond?
                </h4>
                <p className="text-sm text-gray-600">
                  We typically respond within 2-3 business days.
                </p>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-semibold text-gray-900 text-sm mb-1">
                  Is my feedback anonymous?
                </h4>
                <p className="text-sm text-gray-600">
                  You can choose to provide your contact information or remain anonymous.
                </p>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-semibold text-gray-900 text-sm mb-1">
                  Can I track my feedback?
                </h4>
                <p className="text-sm text-gray-600">
                  Yes, you'll receive updates via email on the status of your feedback.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-emerald-50 rounded-2xl shadow-lg p-6 border border-emerald-200">
            <h3 className="text-lg font-bold text-emerald-900 mb-2">Need More Help?</h3>
            <p className="text-sm text-emerald-700 mb-4">
              Contact our support team directly for urgent matters.
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-emerald-900">
                <strong>Email:</strong> support@smartcity.com
              </p>
              <p className="text-emerald-900">
                <strong>Phone:</strong> +1 (555) 0123
              </p>
              <p className="text-emerald-900">
                <strong>Hours:</strong> 9 AM - 6 PM (Mon-Fri)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
