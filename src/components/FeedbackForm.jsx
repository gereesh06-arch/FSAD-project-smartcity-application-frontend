import { useState } from 'react'
import { AlertCircle, Send, Star } from 'lucide-react'
import { createFeedback } from '../api/feedback'

export default function FeedbackForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'general',
    rating: 5,
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await createFeedback(formData)
      setSuccessMessage('Thank you for your feedback! We truly appreciate your input.')
      if (onSubmit) onSubmit(formData)
      setFormData({
        name: '',
        email: '',
        category: 'general',
        rating: 5,
        message: '',
      })
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      setSuccessMessage('Error submitting feedback. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Share Your Feedback</h2>

      {successMessage && (
        <div className="mb-6 p-4 rounded-lg flex items-start space-x-3 bg-green-50 border border-green-200">
          <AlertCircle className="text-green-600" size={20} />
          <p className="text-green-700">{successMessage}</p>
        </div>
      )}

      <div className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Feedback Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition"
          >
            <option value="general">General Feedback</option>
            <option value="suggestion">Suggestion</option>
            <option value="complaint">Complaint</option>
            <option value="compliment">Compliment</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            How satisfied are you? (1-5 stars)
          </label>
          <div className="flex space-x-3">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, rating: num }))}
                className={`transition transform hover:scale-110 ${
                  num <= formData.rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
              >
                <Star size={32} fill={num <= formData.rating ? 'currentColor' : 'none'} />
              </button>
            ))}
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Your Feedback
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us what you think..."
            required
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <Send size={20} />
          <span>{isSubmitting ? 'Submitting...' : 'Send Feedback'}</span>
        </button>
      </div>
    </form>
  )
}
