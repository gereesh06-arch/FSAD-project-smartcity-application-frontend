import { Link } from 'react-router-dom'
import { Zap, Droplets, Trash2, Bus, TrendingUp, Users, Award } from 'lucide-react'
import ServiceCard from '../components/ServiceCard'

export default function Home() {
  const services = [
    {
      name: 'Water Supply',
      description: 'Reliable and clean water distribution across the city',
      icon: Droplets,
      category: 'water',
    },
    {
      name: 'Electricity',
      description: 'Efficient power distribution and outage management',
      icon: Zap,
      category: 'electricity',
    },
    {
      name: 'Waste Management',
      description: 'Sustainable waste collection and recycling programs',
      icon: Trash2,
      category: 'waste',
    },
    {
      name: 'Public Transport',
      description: 'Easy and affordable city-wide transportation',
      icon: Bus,
      category: 'transport',
    },
  ]

  const stats = [
    { label: 'Active Services', value: '24', icon: Zap },
    { label: 'Citizens Served', value: '50K+', icon: Users },
    { label: 'Issues Resolved', value: '98%', icon: Award },
    { label: 'City Coverage', value: '100%', icon: TrendingUp },
  ]

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-950 transition-colors duration-300">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Welcome to Smart City Management
            </h1>
            <p className="text-lg text-blue-100 mb-8">
              Experience modern city services at your fingertips. Report issues, access public
              services, and be part of a smarter, more connected community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition text-center"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition text-center"
              >
                Sign In
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-blue-400 rounded-2xl p-8 h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🏙️</div>
                <p className="text-white text-lg font-semibold">Smart City System</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Our Impact
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon
              return (
                <div key={idx} className="text-center">
                  <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-blue-600 dark:text-blue-400 w-8 h-8" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-gray-600 dark:text-slate-300 text-sm mt-2">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <ServiceCard
                key={idx}
                name={service.name}
                description={service.description}
                icon={service.icon}
                category={service.category}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Why Choose Smart City?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gray-50 dark:bg-slate-800">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Fast & Reliable</h3>
              <p className="text-gray-600 dark:text-slate-300">
                Get quick responses and reliable service delivery across all city services.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gray-50 dark:bg-slate-800">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Secure & Private</h3>
              <p className="text-gray-600 dark:text-slate-300">
                Your data is protected with enterprise-grade security infrastructure.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gray-50 dark:bg-slate-800">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Accessible</h3>
              <p className="text-gray-600 dark:text-slate-300">
                Use our service anytime, anywhere with a responsive mobile-friendly design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Join Smart City?
          </h2>
          <p className="text-lg text-emerald-100 mb-8">
            Create your account today and start enjoying seamless city services.
          </p>
          <Link
            to="/register"
            className="inline-block bg-white text-emerald-600 px-10 py-4 rounded-lg font-semibold hover:bg-emerald-50 transition"
          >
            Register Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Smart City</h3>
            <p className="text-gray-400">
              Making cities smarter, greener, and more connected.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="text-gray-400 space-y-2">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white transition">
                  Register
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Contact</h4>
            <p className="text-gray-400">
              Email: support@smartcity.com
              <br />
              Phone: +1 (555) 0123
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2026 Smart City Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
