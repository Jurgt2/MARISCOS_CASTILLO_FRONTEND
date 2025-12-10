import { useState, useEffect } from 'react'
import { LogOut, DollarSign, Receipt, TrendingUp, Package } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { socketService } from '../services/socket'
import toast from 'react-hot-toast'
import api from '../services/api'
import { Order } from '../store/orderStore'
import InventarioQuickView from '../components/InventarioQuickView'

const Caja = () => {
  const { user, logout } = useAuthStore()
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [showInventario, setShowInventario] = useState(false)
  const [stats, setStats] = useState({
    totalDay: 0,
    ordersCount: 0,
    averageTicket: 0,
  })

  useEffect(() => {
    loadOrders()
    loadStats()

    // Escuchar actualizaciones de órdenes
    socketService.on('order-updated', loadOrders)
    socketService.on('new-order', loadOrders)

    return () => {
      socketService.off('order-updated', loadOrders)
      socketService.off('new-order', loadOrders)
    }
  }, [])

  const loadOrders = async () => {
    try {
      const response = await api.get('/orders?status=LISTO,ENTREGADO')
      setOrders(response.data)
    } catch (error) {
      toast.error('Error al cargar órdenes')
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const response = await api.get('/reports/daily')
      setStats(response.data)
    } catch (error) {
      console.error('Error al cargar estadísticas')
    }
  }

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order)
  }

  return (
    <div className="min-h-screen bg-error">
      {/* Header estilo SoftRestaurant */}
      <header className="bg-red-900 text-white shadow-2xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-5xl">💰</span>
              <div>
                <h1 className="text-4xl font-bold">CAJA GENERAL</h1>
                <p className="text-xl opacity-90">Mariscos Castillo</p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="text-2xl font-bold">{user?.name}</p>
                <p className="text-lg opacity-75">{user?.role}</p>
              </div>
              <button
                onClick={() => setShowInventario(true)}
                className="btn btn-info btn-lg"
              >
                <Package size={24} />
                Inventario
              </button>
              <button
                onClick={logout}
                className="btn btn-error btn-lg"
              >
                <LogOut size={24} />
                Salir
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats grandes */}
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="card bg-white shadow-2xl">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <DollarSign className="text-success" size={64} />
                <div className="text-right">
                  <p className="text-gray-500 text-xl">Total del Día</p>
                  <p className="text-5xl font-bold text-success">
                    ${stats.totalDay.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-white shadow-2xl">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <Receipt className="text-primary" size={64} />
                <div className="text-right">
                  <p className="text-gray-500 text-xl">Órdenes</p>
                  <p className="text-5xl font-bold text-primary">
                    {stats.ordersCount}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-white shadow-2xl">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <TrendingUp className="text-warning" size={64} />
                <div className="text-right">
                  <p className="text-gray-500 text-xl">Ticket Promedio</p>
                  <p className="text-5xl font-bold text-warning">
                    ${stats.averageTicket.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de órdenes estilo SoftRestaurant */}
        <div className="card bg-white shadow-2xl">
          <div className="card-body">
            <h2 className="text-3xl font-bold text-error mb-6">
              ÓRDENES PENDIENTES DE COBRO
            </h2>

            {loading ? (
              <div className="flex justify-center py-20">
                <span className="loading loading-spinner loading-lg text-error"></span>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <div className="text-6xl mb-4">📋</div>
                <p className="text-2xl">No hay órdenes pendientes</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    onClick={() => handleOrderClick(order)}
                    className="card bg-red-50 border-4 border-error hover:bg-red-100 cursor-pointer hover:shadow-2xl transition-all transform hover:scale-105"
                  >
                    <div className="card-body">
                      <div className="text-center">
                        <div className="text-6xl font-bold text-error mb-2">
                          {order.tableNumber}
                        </div>
                        <div className="text-sm text-gray-500 mb-3">
                          Mesa #{order.tableNumber}
                        </div>
                        <div className="text-4xl font-bold text-success">
                          ${order.total.toFixed(2)}
                        </div>
                        <div className={`badge badge-lg mt-3 ${
                          order.status === 'LISTO' ? 'badge-warning' : 'badge-info'
                        }`}>
                          {order.status}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de detalle */}
      {selectedOrder && (
        <div className="modal modal-open">
          <div className="modal-box max-w-3xl bg-white">
            <h3 className="font-bold text-3xl text-error mb-6">
              Mesa {selectedOrder.tableNumber} - Detalle
            </h3>

            <div className="space-y-4 mb-6">
              {selectedOrder.items.map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-xl font-bold">
                        {item.quantity}x {item.product.name}
                      </div>
                      {item.modifiers.length > 0 && (
                        <div className="text-sm text-gray-500 mt-1">
                          {item.modifiers.join(', ')}
                        </div>
                      )}
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      ${item.subtotal.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-error/10 p-6 rounded-lg space-y-3">
              <div className="flex justify-between text-xl">
                <span>Subtotal:</span>
                <span className="font-bold">${selectedOrder.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl">
                <span>IVA:</span>
                <span className="font-bold">${selectedOrder.tax.toFixed(2)}</span>
              </div>
              {selectedOrder.tip > 0 && (
                <div className="flex justify-between text-xl">
                  <span>Propina:</span>
                  <span className="font-bold">${selectedOrder.tip.toFixed(2)}</span>
                </div>
              )}
              <div className="divider"></div>
              <div className="flex justify-between text-4xl font-bold text-success">
                <span>TOTAL:</span>
                <span>${selectedOrder.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="modal-action">
              <button
                onClick={() => setSelectedOrder(null)}
                className="btn btn-lg btn-ghost"
              >
                Cerrar
              </button>
              <button
                className="btn btn-lg btn-success text-white text-xl"
                onClick={() => {
                  toast.success('Orden cobrada (función pendiente)')
                  setSelectedOrder(null)
                }}
              >
                💵 COBRAR
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de inventario */}
      {showInventario && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <InventarioQuickView onClose={() => setShowInventario(false)} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Caja
