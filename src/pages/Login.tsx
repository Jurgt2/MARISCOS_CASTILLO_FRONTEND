import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogIn, Mail, Lock } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../services/api'
import { useAuthStore } from '../store/authStore'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      console.log('🔐 Intentando login con:', { email })
      const response = await api.post('/auth/login', { email, password })
      console.log('🔍 Respuesta completa del backend:', response.data)
      
      // Verificar que tengamos los datos necesarios
      if (!response.data || !response.data.token) {
        throw new Error('Respuesta del servidor inválida')
      }

      // Adaptar la respuesta del backend (puede venir como "user" o "usuario")
      const token = response.data.token || response.data.accessToken
      const userData = response.data.user || response.data.usuario
      
      if (!userData) {
        throw new Error('Datos de usuario no encontrados en la respuesta')
      }

      // Normalizar los campos del usuario
      // El backend devuelve GERENTE o EMPLEADO, normalizamos a MESERO si es EMPLEADO
      let userRole = (userData.role || userData.rol || 'EMPLEADO').toUpperCase()
      
      // Si es EMPLEADO, lo convertimos a MESERO para el frontend
      if (userRole === 'EMPLEADO') {
        userRole = 'MESERO'
      }
      
      const user = {
        id: String(userData.id || userData._id || '1'),
        name: userData.name || userData.nombre || 'Usuario',
        email: userData.email || userData.correo || email,
        role: userRole as 'GERENTE' | 'MESERO' | 'CAJERO' | 'COCINERO'
      }

      console.log('✅ Token recibido:', token.substring(0, 20) + '...')
      console.log('✅ Rol del backend:', userData.role || userData.rol)
      console.log('✅ Rol normalizado:', user.role)
      console.log('✅ Usuario normalizado:', user)

      // Guardar en localStorage directamente (backup)
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      console.log('💾 Guardado en localStorage directamente')

      // Guardar en Zustand store (que también persiste en localStorage)
      setAuth(token, user)
      console.log('💾 Guardado en Zustand store')

      toast.success(`¡Bienvenido ${user.name}! 🦐`)

      // Determinar ruta de destino según el rol
      let targetRoute = '/mesero'
      if (user.role === 'GERENTE') {
        targetRoute = '/gerente'
      } else if (user.role === 'CAJERO') {
        targetRoute = '/caja'
      } else if (user.role === 'COCINERO') {
        targetRoute = '/cocina'
      } else {
        // MESERO o cualquier otro rol -> vista de mesero
        targetRoute = '/mesero'
      }

      console.log('🔄 Redirigiendo a:', targetRoute)
      
      // Navegar inmediatamente
      navigate(targetRoute, { replace: true })
      
    } catch (error: any) {
      console.error('❌ Error completo en login:', error)
      console.error('❌ Respuesta del servidor:', error.response?.data)
      const errorMessage = error.response?.data?.message || error.message || 'Error al iniciar sesión'
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const fillCredentials = (role: 'gerente' | 'mesero') => {
    if (role === 'gerente') {
      setEmail('gerente@castillo.com')
      setPassword('castillo123')
    } else {
      setEmail('mesero1@castillo.com')
      setPassword('mesero123')
    }
  }

  return (
    <div className="min-h-screen ocean-gradient flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decoración de olas */}
      <div className="absolute bottom-0 left-0 right-0 opacity-20">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      {/* Iconos flotantes decorativos */}
      <div className="absolute top-20 left-20 text-white opacity-20 text-6xl animate-wave">🦐</div>
      <div className="absolute top-40 right-32 text-white opacity-20 text-5xl animate-wave" style={{ animationDelay: '1s' }}>🦀</div>
      <div className="absolute bottom-40 left-40 text-white opacity-20 text-7xl animate-wave" style={{ animationDelay: '2s' }}>🐟</div>

      <div className="card-castillo w-full max-w-md z-10 bg-white">
        <div className="card-body">
          {/* Logo y título */}
          <div className="text-center mb-8">
            <div className="inline-block bg-primary rounded-full p-4 mb-4">
              <span className="text-6xl">🦐</span>
            </div>
            <h1 className="text-4xl font-bold text-primary mb-2">Mariscos Castillo</h1>
            <p className="text-gray-600 font-semibold">Sistema de Punto de Venta</p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Correo Electrónico</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="email"
                  placeholder="usuario@castillo.com"
                  className="input input-bordered w-full pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Contraseña</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-castillo w-full"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <>
                  <LogIn size={20} />
                  Iniciar Sesión
                </>
              )}
            </button>
          </form>

          {/* Botones de prueba */}
          <div className="divider text-sm text-gray-500">Cuentas de prueba</div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => fillCredentials('gerente')}
              className="btn btn-outline btn-sm"
            >
              👔 Gerente
            </button>
            <button
              onClick={() => fillCredentials('mesero')}
              className="btn btn-outline btn-sm"
            >
              👨‍🍳 Mesero
            </button>
          </div>

          {/* Footer */}
          <div className="text-center mt-6 text-sm text-gray-500">
            <p>© 2025 Mariscos Castillo</p>
            <p className="text-xs mt-1">Los mejores mariscos de la región 🦐</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
