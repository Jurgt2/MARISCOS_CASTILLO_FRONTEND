import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  role: 'GERENTE' | 'MESERO' | 'CAJERO' | 'COCINERO' | 'EMPLEADO'
}

interface AuthState {
  token: string | null
  user: User | null
  setAuth: (token: string, user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: (token, user) => {
        console.log('🔐 Guardando auth en store:', { token: token?.substring(0, 20) + '...', user })
        set({ token, user })
        console.log('✅ Auth guardado en localStorage')
      },
      logout: () => {
        console.log('👋 Cerrando sesión')
        set({ token: null, user: null })
        localStorage.removeItem('auth-storage')
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)
