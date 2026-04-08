import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import ProtectedRoute from './components/ProtectedRoute'
import PublicLayout from './layouts/PublicLayout'
import DashboardLayout from './layouts/DashboardLayout'
import { ToastProvider } from './components/ToastProvider'
import { applyTheme, resolveInitialTheme } from './utils/theme'

// Public Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'
import Users from './pages/admin/Users'
import ManageServices from './pages/admin/ManageServices'
import Infrastructure from './pages/admin/Infrastructure'
import Reports from './pages/admin/Reports'
import AdminFeedback from './pages/admin/Feedback'
import AdminBookings from './pages/admin/Bookings'

// User Pages
import UserDashboard from './pages/user/UserDashboard'
import Services from './pages/user/Services'
import UserInfrastructure from './pages/user/Infrastructure'
import ReportIssue from './pages/user/ReportIssue'
import UserFeedback from './pages/user/Feedback'
import UserBookings from './pages/user/Bookings'

function App() {
  useEffect(() => {
    applyTheme(resolveInitialTheme())
  }, [])

  return (
    <ToastProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Admin Routes */}
          <Route
            element={
              <ProtectedRoute requiredRole="admin">
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/services" element={<ManageServices />} />
            <Route path="/admin/infrastructure" element={<Infrastructure />} />
            <Route path="/admin/reports" element={<Reports />} />
            <Route path="/admin/feedback" element={<AdminFeedback />} />
            <Route path="/admin/bookings" element={<AdminBookings />} />
          </Route>

          {/* User Routes */}
          <Route
            element={
              <ProtectedRoute requiredRole="user">
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/services" element={<Services />} />
            <Route path="/user/infrastructure" element={<UserInfrastructure />} />
            <Route path="/user/report-issue" element={<ReportIssue />} />
            <Route path="/user/feedback" element={<UserFeedback />} />
            <Route path="/user/bookings" element={<UserBookings />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ToastProvider>
  )
}

export default App
