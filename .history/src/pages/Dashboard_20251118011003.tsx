import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { LogOut } from 'lucide-react'

const Dashboard = () => {
  const { user, token, logout } = useAuthStore()
  const navigate = useNavigate()

  const [inventoryStats, setInventoryStats] = useState({
    totalValue: 12500,
    expiringSoon: 8,
    recentMermas: 3,
    categoryConsumption: [
      { category: 'Camarón', consumption: 45 },
      { category: 'Pulpo', consumption: 30 },
      { category: 'Pescado', consumption: 25 },
    ],
  })

  useEffect(() => {
    console.log('📊 Dashboard cargado')
    console.log('👤 Usuario:', user)
    console.log('🔑 Token presente:', !!token)
  }, [user, token])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="ocean-gradient text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-5xl">🦐</span>
              <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-lg opacity-90">Mariscos Castillo POS</p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="text-xl font-bold">{user.name}</p>
                <p className="text-sm opacity-75">{user.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="btn btn-error"
              >
                <LogOut size={20} />
                Salir
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-10">
        <div className="card-castillo">
          <div className="card-body">
            <h2 className="card-title text-3xl text-primary mb-6">
              ¡Bienvenido {user.name}! 🦐
            </h2>

            <div className="space-y-4">
              <div className="bg-primary/10 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">Información del Usuario</h3>
                <div className="space-y-2">
                  <p><strong>ID:</strong> {user.id}</p>
                  <p><strong>Nombre:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Rol:</strong> <span className="badge badge-primary badge-lg">{user.role}</span></p>
                </div>
              </div>

              <div className="bg-success/10 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">✅ Login Exitoso</h3>
                <p>Has iniciado sesión correctamente en el sistema.</p>
                <p className="text-sm text-gray-500 mt-2">Token guardado en localStorage y Zustand store.</p>
              </div>

              <div className="bg-info/10 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">📋 Rutas Disponibles</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <button
                    onClick={() => navigate('/mesero')}
                    className="btn btn-primary"
                  >
                    👨‍🍳 Mesero
                  </button>
                  <button
                    onClick={() => navigate('/caja')}
                    className="btn btn-error"
                  >
                    💰 Caja
                  </button>
                  <button
                    onClick={() => navigate('/cocina')}
                    className="btn btn-info"
                  >
                    🍳 Cocina
                  </button>
                  <button
                    onClick={() => navigate('/gerente')}
                    className="btn btn-warning"
                  >
                    👔 Gerente
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de Inventario */}
        <div className="bg-warning/10 p-6 rounded-lg mt-6">
          <h3 className="text-xl font-bold mb-4">📦 Resumen de Inventario</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="stat">
              <div className="stat-title">Valor Total</div>
              <div className="stat-value">${inventoryStats.totalValue}</div>
              <div className="stat-desc">MXN</div>
            </div>
            <div className="stat">
              <div className="stat-title">Próximos a Caducar</div>
              <div className="stat-value">{inventoryStats.expiringSoon}</div>
              <div className="stat-desc">Productos</div>
            </div>
            <div className="stat">
              <div className="stat-title">Mermas Recientes</div>
              <div className="stat-value">{inventoryStats.recentMermas}</div>
              <div className="stat-desc">Últimos 7 días</div>
            </div>
          </div>

          <h4 className="text-lg font-bold mt-6">Consumo por Categoría</h4>
          <ul className="list-disc list-inside">
            {inventoryStats.categoryConsumption.map((item, index) => (
              <li key={index}>
                {item.category}: {item.consumption} kg
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
