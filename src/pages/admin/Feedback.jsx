import { useEffect, useState } from 'react'
import { Star, User, Calendar, MessageCircle } from 'lucide-react'
import { getFeedbackStats, listFeedback } from '../../api/feedback'

export default function Feedback() {
  const [feedbackList, setFeedbackList] = useState([])
  const [stats, setStats] = useState({
    count: 0,
    avgRating: 0,
  })

  useEffect(() => {
    let alive = true

    async function loadFeedback() {
      try {
        const [data, feedbackStats] = await Promise.all([listFeedback(), getFeedbackStats()])
        if (!alive) return

        setFeedbackList(Array.isArray(data) ? data : [])
        setStats({
          count: Number(feedbackStats?.count || 0),
          avgRating: Number(feedbackStats?.averageRating || 0),
        })
      } catch (error) {
        if (!alive) return
        setFeedbackList([])
        setStats({ count: 0, avgRating: 0 })
      }
    }

    loadFeedback()
    return () => {
      alive = false
    }
  }, [])

  const getCategoryColor = (category) => {
    switch (category) {
      case 'general':
        return 'bg-blue-100 text-blue-800'
      case 'suggestion':
        return 'bg-purple-100 text-purple-800'
      case 'complaint':
        return 'bg-red-100 text-red-800'
      case 'compliment':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const satisfiedCount = feedbackList.filter((item) => (item.rating || 0) >= 4).length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Feedback Management</h1>
        <p className="text-gray-600 mt-2">Review and respond to citizen feedback</p>
      </div>

      {/* Feedback Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <p className="text-gray-600 text-sm">Total Feedback</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.count}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <p className="text-gray-600 text-sm">Satisfied (4+ stars)</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">{satisfiedCount}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <p className="text-gray-600 text-sm">Avg. Rating</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{stats.avgRating.toFixed(1)}/5.0</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <p className="text-gray-600 text-sm">Satisfaction Rate</p>
          <p className="text-3xl font-bold text-emerald-600 mt-2">{stats.count > 0 ? Math.round((satisfiedCount / stats.count) * 100) : 0}%</p>
        </div>
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {feedbackList.map((feedback) => (
          <div key={feedback.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {feedback.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{feedback.name}</h3>
                  <div className="flex items-center space-x-3 mt-1">
                    <div className="flex text-lg">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < feedback.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }
                        />
                      ))}
                    </div>
                    <span
                      className={`text-sm font-semibold px-2 py-1 rounded ${getCategoryColor(
                        feedback.category
                      )}`}
                    >
                      {feedback.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-4">{feedback.message}</p>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1">
                  <Calendar size={16} />
                  <span>{new Date(feedback.createdAt).toLocaleDateString()}</span>
                </span>
              </div>
              <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium">
                <MessageCircle size={16} />
                <span>Reply</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
