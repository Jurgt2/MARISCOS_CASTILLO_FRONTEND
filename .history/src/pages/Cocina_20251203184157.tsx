import { useState, useEffect, useRef } from 'react'
import { LogOut, Clock, CheckCircle, AlertCircle, Package } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { socketService } from '../services/socket'
import toast from 'react-hot-toast'
import api from '../services/api'
import { Order } from '../store/orderStore'
import { format } from 'date-fns'
import InventarioQuickView from '../components/InventarioQuickView'

// Definición de categorías del menú
const MENU_CATEGORIAS: Record<string, string[]> = {
  'CARNES': ['Arrachera', 'Cecina', 'Milanesa de pollo', 'Filete de pollo a la plancha'],
  'NIÑOS': ['Papas a la francesa', 'Nuggets de pollo', 'Filete empanizado', 'Camarones empanizados'],
  'POSTRES': ['Plátanos flameados', 'Duraznos con crema', 'Duraznos con rompope', 'Plátanos fritos', 'Hielitos', 'Flan napolitano', 'Pay'],
  'CAMARONES': ['Camarones a la diabla', 'Al mojo de ajo', 'A la española', 'Enchipotlados', 'En salsa de chile seco', 'En salsa verde', 'Al chile limón', 'En salsa de la casa', 'Enchilpayados', 'Gratinados al gusto', 'Empanizados', 'Al coco', 'Camarones para pelar', 'Orden de camarón de río'],
  'ESPECIALIDADES': ['Brocheta de camarón', 'Barbacoa de mariscos', 'Torta de mariscos', 'Torta de camarón', 'Mariscada', 'Jaibones al gusto', 'Ostiones a la pimienta', 'Manos de cangrejo', 'Paella'],
  'SOPAS': ['Sopa de mariscos', 'Sopa de camarón', 'Sopa de jaiba en concha', 'Sopa de jaiba en pulpa', 'Arroz a la tumbada', 'Sopa de rebanada de róbalo', 'Cazuela de mariscos'],
  'CHILPACHOLES': ['Chilpachole de mariscos', 'Chilpachole de camarón', 'Chilpachole de jaiba en pulpa', 'Chilpachole de jaiba en concha'],
  'CALDO LARGO': ['Caldo largo de rebanada', 'Caldo largo de rebanada con camarones', 'Caldo largo de cabeza'],
  'PESCADOS': ['Mojarra al mojo de ajo', 'Mojarra enchipotlada', 'Mojarra en salsa verde', 'Mojarra a la veracruzana', 'Mojarra empapelada', 'Mojarra enchilpayada', 'Chucumite al mojo de ajo', 'Chucumite enchipotlado', 'Chucumite en salsa verde', 'Chucumite a la veracruzana', 'Chucumite empapelado', 'Pámpano al gusto', 'Rebanada de róbalo'],
  'HUEVA DE PESCADO': ['Hueva de naca - Frita', 'Hueva de naca - Al mojo de ajo', 'Hueva de naca - Enchilpayada', 'Hueva de naca - Enchipotlada', 'Hueva de naca - Al ajillo', 'Hueva de naca - A la veracruzana', 'Hueva de lisa'],
  'FILETES': ['Filete relleno de mariscos', 'Filete relleno de camarón', 'Tapiste de camarón', 'Tapiste de mariscos', 'Filete al mojo de ajo', 'Filete enchipotlado', 'Filete en salsa verde', 'Filete a la veracruzana', 'Filete empanizado', 'Filete sol'],
  'PULPOS': ['Pulpos encebollados', 'Pulpos enchilpayados', 'Pulpos envinados', 'Pulpos enchipotlados', 'Pulpos al mojo de ajo', 'Pulpos en salsa verde', 'Pulpos con camarones'],
  'COCTELES': ['Coctel de Camarón', 'Coctel de Jaiba', 'Coctel de Pulpo', 'Coctel de Hueva', 'Coctel de Ostión', 'Campechana', 'Vuelve a la vida', 'Vuelve a la vida de camarón', 'Ceviche de pescado'],
  'ENTRADAS': ['Ensalada de camarón', 'Ensalada de mariscos', 'Tostadas de camarón', 'Tostadas de minilla', 'Orden de minilla', 'Jaiba rellena', 'Tacos dorados de minilla', 'Empanadas de camarón', 'Empanadas de minilla', 'Rollitos de camarón', 'Arroz con plátano', 'Arroz con huevo', 'Arroz con camarón']
}

// Función para determinar la categoría de un platillo
const getCategoria = (nombrePlatillo: string): string => {
  const nombreLower = nombrePlatillo.toLowerCase()
  
  for (const [categoria, platillos] of Object.entries(MENU_CATEGORIAS)) {
    for (const platillo of platillos) {
      if (nombreLower.includes(platillo.toLowerCase())) {
        return categoria
      }
    }
  }
  return 'OTROS'
}

// Función para agrupar items por categoría
const agruparPorCategoria = (items: Order['items']) => {
  const agrupado: Record<string, typeof items> = {}
  
  items.forEach(item => {
    const categoria = getCategoria(item.product.name)
    if (!agrupado[categoria]) {
      agrupado[categoria] = []
    }
    agrupado[categoria].push(item)
  })
  
  return agrupado
}

const Cocina = () => {
  const { user, logout } = useAuthStore()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [showInventario, setShowInventario] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    loadOrders()

    // Escuchar nuevas órdenes
    socketService.on('new-order', (data) => {
      loadOrders()
      playNotificationSound()
    })

    socketService.on('order-updated', loadOrders)

    return () => {
      socketService.off('new-order', loadOrders)
      socketService.off('order-updated', loadOrders)
    }
  }, [])

  const loadOrders = async () => {
    try {
      const response = await api.get('/orders?status=PENDIENTE,EN_PREPARACION')
      setOrders(response.data.sort((a: Order, b: Order) => {
        // Ordenar por estado y tiempo
        if (a.status === 'PENDIENTE' && b.status !== 'PENDIENTE') return -1
        if (a.status !== 'PENDIENTE' && b.status === 'PENDIENTE') return 1
        return new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime()
      }))
    } catch (error) {
      toast.error('Error al cargar órdenes')
    } finally {
      setLoading(false)
    }
  }

  const playNotificationSound = () => {
    // En producción, cargar un archivo de audio real
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Audio play failed'))
    }
  }

  const handleStartOrder = async (orderId: string) => {
    try {
      await api.patch(`/orders/${orderId}/status`, {
        status: 'EN_PREPARACION'
      })
      toast.success('Orden en preparación 👨‍🍳')
      loadOrders()
    } catch (error) {
      toast.error('Error al actualizar orden')
    }
  }

  const handleCompleteOrder = async (orderId: string) => {
    try {
      await api.patch(`/orders/${orderId}/status`, {
        status: 'LISTO'
      })
      toast.success('¡Orden lista! 🎉')
      loadOrders()
    } catch (error) {
      toast.error('Error al completar orden')
    }
  }

  const getOrderColor = (order: Order) => {
    const elapsed = Date.now() - new Date(order.createdAt!).getTime()
    const minutes = elapsed / 1000 / 60

    if (order.status === 'EN_PREPARACION') {
      return 'bg-info border-info'
    }
    
    if (minutes > 15) {
      return 'bg-error border-error animate-pulse'
    } else if (minutes > 10) {
      return 'bg-warning border-warning'
    }
    return 'bg-success border-success'
  }

  const getElapsedTime = (createdAt: string) => {
    const elapsed = Date.now() - new Date(createdAt).getTime()
    const minutes = Math.floor(elapsed / 1000 / 60)
    return `${minutes} min`
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Audio notification */}
      <audio ref={audioRef} src="/notification.mp3" />

      {/* Header KDS */}
      <header className="bg-black shadow-2xl sticky top-0 z-50 border-b-4 border-primary">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-5xl">👨‍🍳</span>
              <div>
                <h1 className="text-4xl font-bold">KITCHEN DISPLAY SYSTEM</h1>
                <p className="text-xl opacity-90">Mariscos Castillo - Cocina</p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <button
                onClick={() => setShowInventario(true)}
                className="btn btn-info btn-lg"
              >
                <Package size={24} />
                Ver Inventario
              </button>
              
              <div className="stats shadow">
                <div className="stat place-items-center">
                  <div className="stat-title">Pendientes</div>
                  <div className="stat-value text-error">
                    {orders.filter(o => o.status === 'PENDIENTE').length}
                  </div>
                </div>
                <div className="stat place-items-center">
                  <div className="stat-title">En Preparación</div>
                  <div className="stat-value text-info">
                    {orders.filter(o => o.status === 'EN_PREPARACION').length}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold">{user?.name}</p>
                <p className="text-lg opacity-75">{user?.role}</p>
              </div>
              
              <button
                onClick={logout}
                className="btn btn-error btn-lg"
              >
                <LogOut size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Órdenes en grid */}
      <div className="container mx-auto px-6 py-6">
        {loading ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-9xl mb-6">😴</div>
            <p className="text-4xl font-bold">Todo tranquilo en la cocina</p>
            <p className="text-2xl mt-4">No hay órdenes pendientes</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className={`card ${getOrderColor(order)} border-4 shadow-2xl text-white`}
              >
                <div className="card-body">
                  {/* Header de la orden */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-5xl font-bold">
                        MESA {order.tableNumber}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Clock size={20} />
                        <span className="text-xl font-bold">
                          {getElapsedTime(order.createdAt!)}
                        </span>
                      </div>
                    </div>
                    <div className={`badge badge-lg ${
                      order.status === 'PENDIENTE' 
                        ? 'badge-error' 
                        : 'badge-info'
                    }`}>
                      {order.status === 'PENDIENTE' ? '🆕 NUEVA' : '🔥 EN PROCESO'}
                    </div>
                  </div>

                  {/* Items */}
                  <div className="space-y-3 mb-4">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="bg-black/30 p-3 rounded-lg"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="text-3xl font-bold">
                            {item.quantity}x
                          </div>
                          <div className="flex-1 ml-3">
                            <div className="text-xl font-bold">
                              {item.product.name}
                            </div>
                            {item.modifiers.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {item.modifiers.map((mod, i) => (
                                  <span
                                    key={i}
                                    className="badge badge-warning badge-sm"
                                  >
                                    {mod}
                                  </span>
                                ))}
                              </div>
                            )}
                            {item.notes && (
                              <div className="bg-warning/20 p-2 rounded mt-2 text-sm">
                                <AlertCircle className="inline mr-1" size={14} />
                                <span className="font-bold">{item.notes}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Botones de acción */}
                  <div className="card-actions">
                    {order.status === 'PENDIENTE' ? (
                      <button
                        onClick={() => handleStartOrder(order.id!)}
                        className="btn btn-info btn-lg w-full text-xl font-bold"
                      >
                        <Clock size={24} />
                        COMENZAR
                      </button>
                    ) : (
                      <button
                        onClick={() => handleCompleteOrder(order.id!)}
                        className="btn btn-success btn-lg w-full text-xl font-bold"
                      >
                        <CheckCircle size={24} />
                        ORDEN LISTA
                      </button>
                    )}
                  </div>

                  {/* Timestamp */}
                  <div className="text-center text-xs opacity-70 mt-2">
                    Recibida: {format(new Date(order.createdAt!), 'HH:mm:ss')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

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

export default Cocina
