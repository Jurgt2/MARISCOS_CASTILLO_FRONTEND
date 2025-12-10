import React, { useState, useEffect, useRef } from 'react'
import { useAuthStore } from '../store/authStore'
import { useOrderStore, Table } from '../store/orderStore'
import toast from 'react-hot-toast'
// Notificación global para platos listos
window.addEventListener('plato-listo', (e: any) => {
  toast.success(`Plato listo: ${e.detail}`);
});
import api from '../services/api'

// Components
import TableMap from '../components/TableMap'
import ProductGridLite from '../components/ProductGridLite'
import { categorias, menuCompleto, Product } from '../data/menu'
import OrderSummary from '../components/OrderSummary'
import PaymentModal from '../components/PaymentModal'
import InventarioQuickView from '../components/InventarioQuickView'

// Icons (asegúrate de importar estos si los usas)
import { Users, ShoppingCart, DollarSign, Package, LogOut } from 'lucide-react'

// Colores para los estados de la orden
const statusColors = {
  PENDIENTE: 'badge-warning',
  EN_PREPARACION: 'badge-info',
  LISTO: 'badge-success',
  ENTREGADO: 'badge-secondary',
  PAGADO: 'badge-neutral',
  CANCELADO: 'badge-error',
}

// Componente para mostrar las órdenes activas del mesero (forwardRef SOLO, sin function duplicada)
const OrdenesActivasMesero = React.forwardRef((_props, ref) => {
  const { orders, setOrders } = useOrderStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/orders/mesero');
      setOrders(res.data);
    } catch (err: any) {
      setError('No se pudieron cargar las órdenes activas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 15000);
    if (ref) {
      // @ts-ignore
      ref.current = { fetchOrders };
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="card-castillo">
      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <h2 className="card-title text-primary">Órdenes activas</h2>
          <button className="btn btn-sm btn-outline" onClick={fetchOrders} disabled={loading}>
            {loading ? 'Actualizando...' : 'Refrescar'}
          </button>
        </div>
        {error && <div className="alert alert-error mb-4">{error}</div>}
        {orders.length === 0 && !loading && (
          <p className="text-gray-500">No tienes órdenes activas.</p>
        )}
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="border rounded-lg p-4 bg-white shadow flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-bold text-lg mb-1">Mesa {order.tableNumber}</div>
                <div className="text-xs text-gray-500 mb-2">Creada: {order.createdAt ? new Date(order.createdAt).toLocaleString() : ''}</div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {order.items.map((item, idx) => (
                    <span key={idx} className="badge badge-outline">
                      {item.product.name} x{item.quantity}
                    </span>
                  ))}
                </div>
                {/* Notas de la orden (no existe en Order, solo en OrderItem.notes si acaso) */}
              </div>
              <div className="flex flex-col items-end gap-2 mt-2 md:mt-0">
                <span className={`badge ${statusColors[order.status] || 'badge-ghost'} text-xs`}>
                  {order.status.replace('_', ' ')}
                </span>
                <span className="text-sm font-bold text-primary">${order.total.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

const Mesero = () => {
  const ordenesActivasRef = useRef<{ fetchOrders: () => void } | null>(null)
  const { user, logout } = useAuthStore()
  const { currentTable, currentOrder, addItem } = useOrderStore()
  const [tables, setTables] = useState<Table[]>([])
  const [showPayment, setShowPayment] = useState(false)
  const [showInventario, setShowInventario] = useState(false)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'menu' | 'ordenes' | 'ingredientes'>('menu')
  // Filtros y búsqueda para menú
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('')
  const [busqueda, setBusqueda] = useState<string>('')
  const [productosFiltrados, setProductosFiltrados] = useState<Product[]>(menuCompleto)
  const [notaOrden, setNotaOrden] = useState('')
  const [paraLlevar, setParaLlevar] = useState(false)

  useEffect(() => {
    let productos = menuCompleto
    if (categoriaSeleccionada) {
      productos = productos.filter(p => p.categoria === categoriaSeleccionada)
    }
    if (busqueda.trim()) {
      productos = productos.filter(p =>
        p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.descripcion.toLowerCase().includes(busqueda.toLowerCase())
      )
    }
    setProductosFiltrados(productos)
  }, [categoriaSeleccionada, busqueda])

  useEffect(() => {
    console.log('🍽️ Mesero - Componente montado')
    console.log('🍽️ Mesero - Usuario:', user)
    loadTables()
    // eslint-disable-next-line
  }, [])

  const loadTables = async () => {
    try {
      console.log('📡 Cargando mesas...')
      const response = await api.get('/tables')
      console.log('✅ Mesas cargadas:', response.data)
      setTables(response.data)
    } catch (error: any) {
      console.error('❌ Error al cargar mesas:', error)
      toast.error('Error al cargar mesas. Trabajando en modo offline.')
      // Mesas de ejemplo para que funcione el frontend
      setTables([
        { id: '1', number: 1, capacity: 4, status: 'DISPONIBLE', position: { x: 100, y: 100 } },
        { id: '2', number: 2, capacity: 2, status: 'DISPONIBLE', position: { x: 250, y: 100 } },
        { id: '3', number: 3, capacity: 6, status: 'DISPONIBLE', position: { x: 400, y: 100 } },
        { id: '4', number: 4, capacity: 4, status: 'DISPONIBLE', position: { x: 100, y: 250 } },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    if (currentOrder && currentOrder.items.length > 0) {
      toast.error('Debes finalizar o cancelar la orden actual primero')
      return
    }
    logout()
  }

  // Función para refrescar órdenes activas después de enviar una orden
  const handleOrderSent = () => {
    ordenesActivasRef.current?.fetchOrders();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="ocean-gradient text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-4xl">🦐</span>
              <div>
                <h1 className="text-2xl font-bold">Mariscos Castillo</h1>
                <p className="text-sm opacity-90">Punto de Venta - Mesero</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-semibold">{user?.name}</p>
                <p className="text-xs opacity-75">{user?.role}</p>
              </div>
              <button
                onClick={() => setShowInventario(true)}
                className="btn btn-info btn-sm"
              >
                <Package size={18} />
                Inventario
              </button>
              <button
                onClick={handleLogout}
                className="btn btn-error btn-sm"
              >
                <LogOut size={18} />
                Salir
              </button>
            </div>
          </div>
          {/* Tabs */}
          <div className="tabs tabs-boxed mt-4 bg-white/10">
            <a
              className={`tab ${activeTab === 'menu' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('menu')}
            >
              Menú
            </a>
            <a
              className={`tab ${activeTab === 'ordenes' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('ordenes')}
            >
              Órdenes activas
            </a>
            <a
              className={`tab ${activeTab === 'ingredientes' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('ingredientes')}
            >
              Ingredientes
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Menú */}
        {activeTab === 'menu' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Stats rápidos */}
              <div className="grid grid-cols-3 gap-4">
                <div className="card-castillo">
                  <div className="card-body p-4">
                    <div className="flex items-center justify-between">
                      <Users className="text-primary" size={32} />
                      <div className="text-right">
                        <p className="text-2xl font-bold">{tables.filter(t => t.status === 'OCUPADA').length}</p>
                        <p className="text-sm text-gray-500">Ocupadas</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-castillo">
                  <div className="card-body p-4">
                    <div className="flex items-center justify-between">
                      <ShoppingCart className="text-success" size={32} />
                      <div className="text-right">
                        <p className="text-2xl font-bold">{currentOrder?.items.length || 0}</p>
                        <p className="text-sm text-gray-500">Productos</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-castillo">
                  <div className="card-body p-4">
                    <div className="flex items-center justify-between">
                      <DollarSign className="text-warning" size={32} />
                      <div className="text-right">
                        <p className="text-2xl font-bold">
                          ${currentOrder?.total.toFixed(2) || '0.00'}
                        </p>
                        <p className="text-sm text-gray-500">Total</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Mapa de mesas */}
              <div className="card-castillo">
                <div className="card-body">
                  <h2 className="card-title text-primary mb-4">
                    <Users size={24} />
                    Selecciona una Mesa
                  </h2>
                  {loading ? (
                    <div className="flex justify-center py-20">
                      <span className="loading loading-spinner loading-lg text-primary"></span>
                    </div>
                  ) : (
                    <TableMap tables={tables} onTableUpdate={loadTables} />
                  )}
                </div>
              </div>
              {/* Filtros y búsqueda de menú */}
              {currentTable && (
                <div className="card-castillo">
                  <div className="card-body">
                    <h2 className="card-title text-primary mb-4">
                      <ShoppingCart size={24} />
                      Menú de Productos
                    </h2>
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                      <select
                        className="select select-bordered w-full md:w-60"
                        value={categoriaSeleccionada}
                        onChange={e => setCategoriaSeleccionada(e.target.value)}
                      >
                        <option value="">Todas las categorías</option>
                        {categorias.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        className="input input-bordered w-full md:w-80"
                        placeholder="Buscar producto..."
                        value={busqueda}
                        onChange={e => setBusqueda(e.target.value)}
                      />
                    </div>
                    {/* Agrupación por categoría y grid presentable */}
                    {categorias.filter(cat => productosFiltrados.some(p => p.categoria === cat)).map(cat => (
                      <div key={cat} className="mb-8">
                        <h3 className="text-xl font-bold mb-4 text-blue-700 border-b pb-2">{cat}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                          {productosFiltrados.filter(p => p.categoria === cat).map(producto => (
                            <div key={producto.id} className="card-castillo">
                              <div className="card-body flex flex-col justify-between">
                                <div>
                                  <h4 className="font-bold text-lg mb-1">{producto.nombre}</h4>
                                  <p className="text-gray-600 mb-2">{producto.descripcion}</p>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                  <span className="font-bold text-primary text-lg">${producto.precio.toFixed(2)}</span>
                                    <button
                                      className="btn btn-primary btn-sm"
                                      onClick={() => {
                                        if (!currentTable) {
                                          toast.error('Selecciona una mesa antes de agregar productos');
                                          return;
                                        }
                                        addItem({
                                          product: {
                                            id: producto.id,
                                            name: producto.nombre,
                                            category: producto.categoria,
                                            price: producto.precio,
                                            image: producto.imagen || '',
                                            available: producto.disponible,
                                          },
                                          quantity: 1,
                                          modifiers: [],
                                          notes: '',
                                          subtotal: producto.precio,
                                        });
                                        toast.success(`${producto.nombre} agregado a la orden`);
                                      }}
                                    >
                                      Agregar
                                    </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    {/* Campo de notas y opción para llevar */}
                    <div className="mt-8 flex flex-col md:flex-row gap-4 items-center">
                      <input
                        type="text"
                        className="input input-bordered w-full md:w-96"
                        placeholder="Notas especiales para la orden (ej. sin cebolla, extra salsa...)"
                        value={notaOrden}
                        onChange={e => setNotaOrden(e.target.value)}
                      />
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={paraLlevar}
                          onChange={e => setParaLlevar(e.target.checked)}
                        />
                        <span>Para llevar</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Resumen de orden - 1 columna en desktop, sticky */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                  <OrderSummary onPayment={() => setShowPayment(true)} onOrderSent={handleOrderSent} notaOrden={notaOrden} paraLlevar={paraLlevar} />
                </div>
            </div>
          </div>
        )}
        {/* Órdenes activas */}
        {activeTab === 'ordenes' && (
          <OrdenesActivasMesero ref={ordenesActivasRef} />
        )}
        {/* Ingredientes (explosión) */}
        {activeTab === 'ingredientes' && (
          <div className="card-castillo">
            <div className="card-body">
              <h2 className="card-title text-primary mb-4">
                Ingredientes del platillo
              </h2>
              <p className="text-gray-500">Aquí podrás consultar los ingredientes de cada platillo antes de confirmar la orden.</p>
              {/* Aquí irá la explosión de ingredientes */}
            </div>
          </div>
        )}
      </div>

      {/* Modal de pago */}
      {showPayment && (
        <PaymentModal
          onClose={() => setShowPayment(false)}
          onSuccess={() => {
            setShowPayment(false)
            loadTables()
          }}
        />
      )}

      {/* Modal de inventario */}
      {showInventario && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <InventarioQuickView onClose={() => setShowInventario(false)} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Mesero
