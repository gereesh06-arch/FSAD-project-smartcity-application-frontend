import { Navigate } from 'react-router-dom'
import { getAuthUser } from '../api/auth'

export default function ProtectedRoute({ children, requiredRole }) {
  const user = getAuthUser()
  const userRole = user?.role

  if (!userRole) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />
  }

  return children
}
