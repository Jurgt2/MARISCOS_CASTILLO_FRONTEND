import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import { useAuthStore } from './store/authStore'
import { socketService } from './services/socket'

// Pages
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Mesero from './pages/Mesero'
import Caja from './pages/Caja'
import Cocina from './pages/Cocina'
import Gerente from './pages/Gerente'

// Components
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const { token, user } = useAuthStore()

  useEffect(() => {
    console.log('🔄 App - Estado de autenticación:', { 
      hasToken: !!token, 
      user: user?.name,
      role: user?.role 
    })
    
    if (token) {
      console.log('🔌 Conectando socket...')
      socketService.connect(token)
    }
    
    return () => {
      socketService.disconnect()
    }
  }, [token, user])

  return (
    <Router>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#0A3D62',
            color: '#fff',
            fontWeight: '600',
          },
          success: {
            iconTheme: {
              primary: '#27AE60',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#E74C3C',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <Routes>
        <Route path="/login" element={
          token ? (
            <Navigate 
              to={user?.role === 'GERENTE' ? '/gerente' : '/mesero'} 
              replace 
            />
          ) : (
            <Login />
          )
        } />
        
        <Route path="/mesero" element={
          <ProtectedRoute allowedRoles={['MESERO', 'GERENTE']}>
            <Mesero />
          </ProtectedRoute>
        } />
        
        <Route path="/caja" element={
          <ProtectedRoute allowedRoles={['CAJERO', 'GERENTE']}>
            <Caja />
          </ProtectedRoute>
        } />
        
        <Route path="/cocina" element={
          <ProtectedRoute allowedRoles={['COCINERO', 'GERENTE']}>
            <Cocina />
          </ProtectedRoute>
        } />
        
        <Route path="/gerente" element={
          <ProtectedRoute allowedRoles={['GERENTE']}>
            <Gerente />
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/" element={
          token ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
        } />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App
