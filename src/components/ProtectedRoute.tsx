import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: string[]
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { token, user } = useAuthStore()

  console.log('🛡️ ProtectedRoute - Token:', token ? '✅ Presente' : '❌ Ausente')
  console.log('🛡️ ProtectedRoute - User:', user)
  console.log('🛡️ ProtectedRoute - Allowed roles:', allowedRoles)

  if (!token) {
    console.log('❌ Sin token, redirigiendo a /login')
    return <Navigate to="/login" replace />
  }

  // Permitir acceso si no hay restricciones de roles o si EMPLEADO puede acceder a rutas de MESERO
  if (allowedRoles && user) {
    const userRole = user.role
    const hasAccess = allowedRoles.includes(userRole) || 
                     (userRole === 'EMPLEADO' && allowedRoles.includes('MESERO'))
    
    if (!hasAccess) {
      console.log('❌ Rol no autorizado:', user.role)
      return (
        <div className="min-h-screen flex items-center justify-center bg-error">
          <div className="card-castillo w-96">
            <div className="card-body text-center">
              <span className="text-6xl mb-4">🚫</span>
              <h2 className="card-title text-error justify-center">Acceso Denegado</h2>
              <p>No tienes permisos para acceder a esta sección.</p>
              <div className="card-actions justify-center mt-4">
                <button onClick={() => window.history.back()} className="btn btn-primary">
                  Regresar
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  return <>{children}</>
}

export default ProtectedRoute
