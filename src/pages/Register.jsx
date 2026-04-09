import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserPlus, AlertCircle, CheckCircle } from 'lucide-react'
import { register as registerApi } from '../api/auth'
import { digitsOnlyPhone, isValidTenDigitPhone, PHONE_TEN_DIGIT_MESSAGE } from '../utils/phone'
import {
  PASSWORD_RULES,
  normalizeRegisterEmail,
  validateEmail,
  validateFullName,
  validateRegisterPassword,
} from '../utils/registerValidation'

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    agreedToTerms: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (name === 'phone' && type !== 'checkbox') {
      const digits = digitsOnlyPhone(value).slice(0, 10)
      setFormData((prev) => ({ ...prev, phone: digits }))
      return
    }
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    const nameErr = validateFullName(formData.fullName)
    if (nameErr) {
      setError(nameErr)
      return
    }

    const emailErr = validateEmail(formData.email)
    if (emailErr) {
      setError(emailErr)
      return
    }

    if (!isValidTenDigitPhone(formData.phone)) {
      setError(PHONE_TEN_DIGIT_MESSAGE)
      return
    }

    const pwdErr = validateRegisterPassword(formData.password)
    if (pwdErr) {
      setError(pwdErr)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (!formData.agreedToTerms) {
      setError('Please agree to the terms and conditions')
      return
    }

    setIsLoading(true)

    try {
      await registerApi({
        fullName: formData.fullName.trim(),
        email: normalizeRegisterEmail(formData.email),
        phone: digitsOnlyPhone(formData.phone),
        password: formData.password,
        role: formData.role,
      })

      setSuccess(true)
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: 'user',
        agreedToTerms: false,
      })

      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">SC</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Join Smart City</h1>
            <p className="text-gray-600 mt-2">Create your account today</p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 flex items-start space-x-3">
              <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-green-700 text-sm">
                Registration successful! Redirecting to login...
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start space-x-3">
              <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                required
                minLength={2}
                maxLength={80}
                autoComplete="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                maxLength={254}
                autoComplete="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                inputMode="numeric"
                autoComplete="tel"
                maxLength={10}
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                required
                title={PHONE_TEN_DIGIT_MESSAGE}
                pattern="\d{10}"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition"
              />
              <p className="text-xs text-gray-500 mt-1">Enter exactly 10 digits (numbers only).</p>
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Account Type
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                autoComplete="new-password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition"
              />
              <ul className="mt-2 space-y-1 text-xs">
                {PASSWORD_RULES.map((rule) => {
                  const ok = rule.test(formData.password)
                  return (
                    <li
                      key={rule.label}
                      className={ok ? 'text-emerald-700 flex items-center gap-1.5' : 'text-gray-500 flex items-center gap-1.5'}
                    >
                      <span className="font-semibold">{ok ? '✓' : '○'}</span>
                      {rule.label}
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
                autoComplete="new-password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition"
              />
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="agreedToTerms"
                checked={formData.agreedToTerms}
                onChange={handleChange}
                className="w-4 h-4 text-emerald-600 rounded mt-1"
                required
              />
              <label className="text-sm text-gray-700">
                I agree to the{' '}
                <Link to="#" className="text-emerald-600 hover:text-emerald-700 font-semibold">
                  Terms and Conditions
                </Link>{' '}
                and{' '}
                <Link to="#" className="text-emerald-600 hover:text-emerald-700 font-semibold">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 mt-6"
            >
              <UserPlus size={20} />
              <span>{isLoading ? 'Creating Account...' : 'Create Account'}</span>
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-600">Already have an account?</span>
            </div>
          </div>

          {/* Sign In Link */}
          <Link
            to="/login"
            className="block text-center w-full border-2 border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-50 transition"
          >
            Sign In
          </Link>
        </div>

        {/* Footer Link */}
        <div className="text-center mt-8">
          <Link to="/" className="text-white hover:text-emerald-100 transition">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
