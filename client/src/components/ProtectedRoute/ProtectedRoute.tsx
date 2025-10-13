import { Navigate, useLocation } from 'react-router-dom'
import { type PropsWithChildren } from 'react'

interface ProtectedRouteProps {
  isAuthenticated: boolean
  redirectTo?: string
}

export const ProtectedRoute = ({ 
  children, 
  isAuthenticated, 
  redirectTo = '/login' 
}: PropsWithChildren<ProtectedRouteProps>) => {
  const location = useLocation()
  
  if (!isAuthenticated) {
    // Redirect to login page with return url
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }
  
  return <>{children}</>
}