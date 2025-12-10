import { useState, useEffect } from 'react'
import { 
  LogOut, 
  TrendingUp, 
  DollarSign, 
  ShoppingCart, 
  Users,
  Package,
  BarChart3,
  Settings,
  FileText,
  Calendar
} from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'
import TableMap from '../components/TableMap'
import { useOrderStore } from '../store/orderStore'
import { Table } from '../store/orderStore'
import InventarioQuickView from '../components/InventarioQuickView'
import OrderSummary from '../components/OrderSummary'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'
import Inventario from './Inventario'
import { ProductGridLite } from '../components/ProductGridLite'

interface DashboardStats {
  dailySales: number
  weeklySales: number
  monthlySales: number
  totalOrders: number
  averageTicket: number
  topProducts: Array<{
    name: string
    quantity: number
    revenue: number
  }>
  salesByCategory: Array<{
    category: string
    total: number
  }>
}

const Gerente = () => {
  const { currentOrder, addItem, removeItem, updateItemQuantity } = useOrderStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { currentTable, setCurrentTable, clearOrder } = useOrderStore();
  const [tables, setTables] = useState<Table[]>([]);
  const [selectedTables, setSelectedTables] = useState<Table[]>([]);
  const [loadingTables, setLoadingTables] = useState(true);

  useEffect(() => {
    // Simulación de carga de mesas, reemplaza con tu API si tienes
    setLoadingTables(true);
    setTimeout(() => {
      setTables([
        { id: '1', number: 1, capacity: 4, status: 'DISPONIBLE', position: { x: 100, y: 100 } },
        { id: '2', number: 2, capacity: 2, status: 'DISPONIBLE', position: { x: 250, y: 100 } },
        { id: '3', number: 3, capacity: 6, status: 'DISPONIBLE', position: { x: 400, y: 100 } },
        { id: '4', number: 4, capacity: 4, status: 'DISPONIBLE', position: { x: 100, y: 250 } },
      ]);
      setLoadingTables(false);
    }, 500);
  }, []);
  const [showSeleccionProductos, setShowSeleccionProductos] = useState(false);
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [stats, setStats] = useState<DashboardStats>(() => ({
    dailySales: 0,
    weeklySales: 0,
    monthlySales: 0,
    totalOrders: 0,
    averageTicket: 0,
    topProducts: [],
    salesByCategory: [],
  }));
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'dashboard' | 'ordenes' | 'reports' | 'inventory' | 'settings'>('dashboard')

  useEffect(() => {
    console.log('👔 Gerente - Componente montado')
    console.log('👔 Gerente - Usuario:', user)
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      console.log('📊 Cargando datos del dashboard...')
      const response = await api.get('/reports/dashboard')
      console.log('✅ Datos del dashboard:', response.data)
      setStats(response.data)
    } catch (error: any) {
      console.error('❌ Error al cargar dashboard:', error)
      console.log('ℹ️ Usando datos de ejemplo...')
      // Usar datos de ejemplo si el backend no responde
      setStats({
        dailySales: 15420.50,
        weeklySales: 87350.25,
        monthlySales: 342180.75,
        totalOrders: 156,
        averageTicket: 98.85,
        topProducts: [
          { name: 'Ceviche Mixto', quantity: 45, revenue: 6750 },
          { name: 'Camarones al Ajillo', quantity: 38, revenue: 5700 },
          { name: 'Filete de Pescado', quantity: 32, revenue: 4800 },
        ],
        salesByCategory: [
          { category: 'Ceviches', total: 12500 },
          { category: 'Camarones', total: 18200 },
          { category: 'Pescados', total: 14800 },
          { category: 'Bebidas', total: 8400 },
        ],
      })
      toast('Trabajando en modo offline', { icon: 'ℹ️' })
    } finally {
      setLoading(false)
    }
  }

  const handleCorteDeCaja = async () => {
    try {
      const response = await api.post('/reports/cash-closing')
      toast.success('Corte de caja realizado')
      // Aquí se podría abrir un modal con el reporte del corte
      console.log('Corte de caja:', response.data)
    } catch (error) {
      toast.error('Error al realizar corte de caja')
    }
  }

  const goToSection = (section: string) => {
    switch (section) {
      case 'mesero':
        navigate('/mesero')
        break
      case 'caja':
        navigate('/caja')
        break
      case 'cocina':
        navigate('/cocina')
        break
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary">
        <span className="loading loading-spinner loading-lg text-white"></span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="ocean-gradient text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-5xl">👔</span>
              <div>
                <h1 className="text-3xl font-bold">Panel de Gerencia</h1>
                <p className="text-lg opacity-90">Mariscos Castillo</p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="text-xl font-bold">{user?.name}</p>
                <p className="text-sm opacity-75">{user?.role}</p>
              </div>
              <button
                onClick={logout}
                className="btn btn-error"
              >
                <LogOut size={20} />
                Salir
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs tabs-boxed mt-4 bg-white/10">
            <a
              className={`tab ${activeTab === 'dashboard' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <BarChart3 className="mr-2" size={18} />
              Dashboard
            </a>
            <a
              className={`tab ${activeTab === 'ordenes' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('ordenes')}
            >
              <Users className="mr-2" size={18} />
              Toma de Órdenes
            </a>
            <a
              className={`tab ${activeTab === 'inventory' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('inventory')}
            >
              <Package className="mr-2" size={18} />
              Inventario
            </a>
            <a
              className={`tab ${activeTab === 'settings' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings className="mr-2" size={18} />
              Configuración
            </a>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card-castillo bg-gradient-to-br from-success to-green-600 text-white">
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <DollarSign size={48} />
                    <div className="text-right">
                      <p className="text-sm opacity-90">Ventas del Día</p>
                      <p className="text-4xl font-bold">
                        ${(stats?.dailySales || 0).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-castillo bg-gradient-to-br from-info to-blue-600 text-white">
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <Calendar size={48} />
                    <div className="text-right">
                      <p className="text-sm opacity-90">Ventas Semanales</p>
                      <p className="text-4xl font-bold">
                        ${(stats?.weeklySales || 0).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-castillo bg-gradient-to-br from-warning to-orange-600 text-white">
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <ShoppingCart size={48} />
                    <div className="text-right">
                      <p className="text-sm opacity-90">Órdenes del Día</p>
                      <p className="text-4xl font-bold">
                        {stats?.totalOrders || 0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-castillo bg-gradient-to-br from-secondary to-red-600 text-white">
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <TrendingUp size={48} />
                    <div className="text-right">
                      <p className="text-sm opacity-90">Ticket Promedio</p>
                      <p className="text-4xl font-bold">
                        ${(stats?.averageTicket || 0).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Accesos rápidos */}
            <div className="card-castillo">
              <div className="card-body">
                <h2 className="card-title text-2xl text-primary mb-4">
                  Accesos Rápidos
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button
                    onClick={() => goToSection('mesero')}
                    className="btn btn-lg btn-primary"
                  >
                    <Users size={24} />
                    Toma de Órdenes
                  </button>
                  <button
                    onClick={() => goToSection('caja')}
                    className="btn btn-lg btn-error"
                  >
                    <DollarSign size={24} />
                    Caja
                  </button>
                  <button
                    onClick={() => goToSection('cocina')}
                    className="btn btn-lg btn-info"
                  >
                    <span className="text-2xl">👨‍🍳</span>
                    Cocina
                  </button>
                  <button
                    onClick={handleCorteDeCaja}
                    className="btn btn-lg btn-warning"
                  >
                    <FileText size={24} />
                    Corte de Caja
                  </button>
                </div>
              </div>
            </div>

            {/* Productos más vendidos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card-castillo">
                <div className="card-body">
                  <h2 className="card-title text-xl text-primary mb-4">
                    <TrendingUp size={24} />
                    Top 10 Productos
                  </h2>
                  <div className="space-y-3">
                    {stats?.topProducts && stats.topProducts.length > 0 ? (
                      stats.topProducts.slice(0, 10).map((product, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="badge badge-primary badge-lg">
                              #{index + 1}
                            </div>
                            <div>
                              <div className="font-bold">{product.name}</div>
                              <div className="text-sm text-gray-500">
                                {product.quantity} unidades
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-success">
                              ${product.revenue.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-400 py-10">
                        No hay datos disponibles
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Ventas por categoría */}
              <div className="card-castillo">
                <div className="card-body">
                  <h2 className="card-title text-xl text-primary mb-4">
                    <BarChart3 size={24} />
                    Ventas por Categoría
                  </h2>
                  <div className="space-y-4">
                    {stats?.salesByCategory && stats.salesByCategory.length > 0 ? (
                      stats.salesByCategory.map((category, index) => (
                        <div key={index}>
                          <div className="flex justify-between mb-2">
                            <span className="font-bold">{category.category}</span>
                            <span className="font-bold text-primary">
                              ${category.total.toFixed(2)}
                            </span>
                          </div>
                          <progress
                            className="progress progress-primary w-full"
                            value={category.total}
                            max={Math.max(...(stats?.salesByCategory || []).map(c => c.total))}
                          ></progress>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-400 py-10">
                        No hay datos disponibles
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ordenes' && (
          <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
            {/* Columna izquierda: Selección de mesa */}
            <div className="w-full lg:w-1/3 flex flex-col items-center">
              <div className="card-castillo w-full mb-6">
                <div className="card-body flex flex-col items-center">
                  <h2 className="card-title text-primary mb-4 text-center text-2xl">Selecciona una o varias mesas</h2>
                  {loadingTables ? (
                    <div className="flex justify-center py-10">
                      <span className="loading loading-spinner loading-lg text-primary"></span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-4 w-full">
                      {tables.map((table) => {
                        const isSelected = selectedTables.some(t => t.id === table.id);
                        return (
                          <div
                            key={table.id}
                            onClick={() => {
                              setSelectedTables(prev => {
                                if (isSelected) {
                                  return prev.filter(t => t.id !== table.id);
                                } else {
                                  return [...prev, table];
                                }
                              });
                            }}
                            className={`transition-all duration-200 cursor-pointer rounded-lg shadow p-4 flex flex-col items-center justify-center border-2 text-center select-none ${isSelected ? 'border-primary bg-primary/10' : 'border-gray-200 bg-white hover:bg-primary/5'}`}
                          >
                            <div className="font-bold text-lg text-primary mb-1">Mesa {table.number}</div>
                            <div className="text-xs text-gray-600 mb-1">{table.capacity} personas</div>
                            <div className={`mt-1 text-xs font-semibold uppercase tracking-wide ${table.status === 'DISPONIBLE' ? 'text-success' : table.status === 'OCUPADA' ? 'text-error' : 'text-warning'}`}>{table.status.replace('_', ' ')}</div>
                            <div className={`mt-2 w-4 h-4 rounded-full ${isSelected ? 'bg-primary' : 'bg-gray-300'}`}></div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {selectedTables.length > 0 && (
                    <div className="mt-6 px-6 py-3 rounded-xl bg-primary text-white font-bold text-base shadow text-center border-4 border-success">
                      Mesas seleccionadas: <span className="text-success">{selectedTables.map(t => t.number).join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full">
                <OrderSummary onPayment={() => {}} />
              </div>
              <div className="mt-8 w-full">
                <div className="card-castillo">
                  <div className="card-body">
                    <h3 className="card-title text-primary mb-2">Historial de Órdenes</h3>
                  </div>
                </div>
              </div>
            </div>
            {/* Columna derecha: Menú y selección de productos */}
            <div className="w-full lg:w-2/3 flex flex-col items-center">
              {selectedTables.length > 0 ? (
                <>
                  <div className="flex gap-4 mb-6 w-full justify-center">
                    <button
                      className="btn btn-primary"
                      onClick={() => setShowMenu(prev => !prev)}
                    >
                      {showMenu ? 'Ocultar Menú Completo' : 'Mostrar Menú Completo'}
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={() => setShowSeleccionProductos(prev => !prev)}
                    >
                      {showSeleccionProductos ? 'Ocultar Selección de Productos' : 'Seleccionar Productos (Agregar al carrito)'}
                    </button>
                  </div>
                  {showMenu && (
                    <div className="card-castillo w-full max-w-4xl mb-6">
                      <div className="card-body">
                        <h2 className="card-title text-primary mb-4 text-2xl text-center">
                          Menú Completo
                        </h2>
                        <ProductGridLite />
                      </div>
                    </div>
                  )}
                  {showSeleccionProductos && (
                    <div className="card-castillo w-full max-w-4xl">
                      <div className="card-body">
                        <h2 className="card-title text-success mb-4 text-2xl text-center">
                          Selección de Productos
                        </h2>
                        <ProductGridLite onProductClick={product => setSelectedProduct(product)} />
                        {/* Lista de productos agregados (carrito) */}
                        {currentOrder && currentOrder.items.length > 0 && (
                          <div className="mt-8">
                            <h3 className="text-lg font-bold text-primary mb-2">Productos en la orden</h3>
                            <ul className="divide-y divide-gray-200">
                              {currentOrder.items.map((item, idx) => (
                                <li key={idx} className="flex items-center justify-between py-2">
                                  <div>
                                    <span className="font-bold text-gray-800">{item.product.name}</span>
                                    <span className="ml-2 text-xs text-gray-500">x{item.quantity}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <button className="btn btn-xs btn-circle btn-primary" onClick={() => updateItemQuantity(idx, item.quantity - 1)}>-</button>
                                    <button className="btn btn-xs btn-circle btn-primary" onClick={() => updateItemQuantity(idx, item.quantity + 1)}>+</button>
                                    <button className="btn btn-xs btn-circle btn-error" onClick={() => removeItem(idx)}>🗑️</button>
                                  </div>
                                </li>
                              ))}
                            </ul>
                            <div className="mt-4 text-right font-bold text-lg text-success">
                              Total: ${currentOrder.total.toFixed(2)}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="card-castillo w-full max-w-2xl mt-8">
                  <div className="card-body text-center">
                    <h2 className="text-xl font-bold text-error mb-2">Selecciona al menos una mesa para tomar el pedido</h2>
                    <p className="text-gray-500">No puedes agregar productos hasta seleccionar una mesa.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <></>
        )}

        {activeTab === 'inventory' && (
          <Inventario />
        )}

        {activeTab === 'settings' && (
          <div className="card-castillo">
            <div className="card-body text-center py-20">
              <Settings size={64} className="mx-auto mb-4 text-primary" />
              <h2 className="text-3xl font-bold mb-4">Configuración del Sistema</h2>
              <p className="text-gray-500">
                Ajustes y configuración general en desarrollo
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Gerente
