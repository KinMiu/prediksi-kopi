import { jwtDecode } from 'jwt-decode'
import { Navigate, Outlet } from 'react-router-dom'

const RequireAuth = ({ redirectPath }) => {
  const isAuthenticate = localStorage.getItem('access-token')

  if (!isAuthenticate) {
    return <Navigate to={redirectPath} />
  }

  return <Outlet />
}

const RequireRole = ( {allowedRoles, redirectPath} ) => {
  const token = localStorage.getItem('access-token')

  if (!token) {
    return <Navigate to={redirectPath} />
  }

  try {
    const { ROLE } = jwtDecode(token)

    if (!allowedRoles.includes(ROLE)) {
      return <Navigate to={redirectPath} />
    }

  } catch (error) {
    console.error('Invalid token:', error)
    return <Navigate to={redirectPath} />
  }

  return <Outlet/>
}

export {RequireAuth, RequireRole}