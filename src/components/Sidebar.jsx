import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  Menu,
  X,
  LayoutDashboard,
  Wrench,
  Building2,
  FileText,
  MessageSquare,
  LogOut,
  AlertCircle,
  MapPin,
} from 'lucide-react'
import { clearAuthSession, getAuthUser } from '../api/auth'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const role = getAuthUser()?.role

  const handleLogout = () => {
    clearAuthSession()
    navigate('/')
  }

  const adminMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Wrench, label: 'Manage Services', path: '/admin/services' },
    { icon: Building2, label: 'Infrastructure', path: '/admin/infrastructure' },
    { icon: FileText, label: 'View Reports', path: '/admin/reports' },
    { icon: MessageSquare, label: 'Feedback', path: '/admin/feedback' },
  ]

  const userMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/user/dashboard' },
    { icon: MapPin, label: 'Public Services', path: '/user/services' },
    { icon: Building2, label: 'Infrastructure', path: '/user/infrastructure' },
    { icon: AlertCircle, label: 'Report Issue', path: '/user/report-issue' },
    { icon: MessageSquare, label: 'Feedback', path: '/user/feedback' },
  ]

  const menuItems = role === 'admin' ? adminMenuItems : userMenuItems

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:block fixed left-0 top-0 h-screen bg-gray-900 text-white transition-all duration-300 ${
          isOpen ? 'w-64' : 'w-20'
        } pt-16 z-40`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-20 right-2 p-2 hover:bg-gray-800 rounded-lg transition"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Menu Items */}
        <nav className="mt-8 space-y-2 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-4 px-4 py-3 rounded-lg transition ${
                  isActive(item.path)
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <Icon size={20} className="flex-shrink-0" />
                {isOpen && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-8 left-0 right-0 px-4">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-4 w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
          >
            <LogOut size={20} className="flex-shrink-0" />
            {isOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-gray-900 text-white transition-transform duration-300 z-50 lg:hidden ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } pt-16`}
      >
        <button
          onClick={() => setIsMobileOpen(false)}
          className="absolute top-4 right-4 p-2 hover:bg-gray-800 rounded-lg"
        >
          <X size={24} />
        </button>

        <nav className="mt-8 space-y-2 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center space-x-4 px-4 py-3 rounded-lg transition ${
                  isActive(item.path)
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-8 left-0 right-0 px-4">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-4 w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed bottom-8 right-8 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 z-40"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  )
}
