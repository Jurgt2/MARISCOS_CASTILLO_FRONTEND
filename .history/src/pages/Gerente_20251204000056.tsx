import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
// ...existing code...

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
import { useOrderStore } from '../store/orderStore'
import { Table } from '../store/orderStore'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'
import Inventario from './Inventario'
import { ProductGridLite } from '../components/ProductGridLite'
import { Product } from '../data/menu'

function Gerente() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const {
    ordersByTable,
    addItemToTable,
    generateTicketForTable,
    // ...otros métodos...
  } = useOrderStore();

  // Mover aquí la función para que acceda a los estados
  const handleDownloadPDF = () => {
    if (!selectedTables || selectedTables.length === 0) return;
    const mesaId = selectedTables[0];
    const ticket = ordersByTable[mesaId]?.ticket;
    const items: Array<{ product: { name: string; price: number }; quantity: number; notes?: string; subtotal: number }> = ordersByTable[mesaId]?.items || [];
    if (!ticket) return;
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Ticket de la mesa ${tables.find((t: Table) => t.id === mesaId)?.number || mesaId}`, 10, 20);
    doc.setFontSize(12);
    doc.text(`Fecha: ${new Date(ticket.fecha).toLocaleString()}`, 10, 30);
    doc.text('----------------------------------------', 10, 35);
    let y = 45;
    doc.text('Platillo', 10, y);
    doc.text('Cant.', 70, y);
    doc.text('Precio', 90, y);
    doc.text('Notas', 120, y);
    doc.text('Subtotal', 160, y);
    y += 7;
    items.forEach((item: any) => {
      doc.text(String(item.product.name), 10, y);
      doc.text(String(item.quantity), 70, y);
      doc.text(`$${item.product.price.toFixed(2)}`, 90, y);
      doc.text(item.notes || '-', 120, y);
      doc.text(`$${item.subtotal.toFixed(2)}`, 160, y);
      y += 7;
    });
    doc.text('----------------------------------------', 10, y);
    y += 7;
    doc.setFontSize(14);
    doc.text(`Total: $${ordersByTable[mesaId].total.toFixed(2)}`, 10, y);
    doc.save(`ticket-mesa-${mesaId}.pdf`);
  };
  // ...existing code...

interface DashboardStats {
  dailySales: number;
  weeklySales: number;
  monthlySales: number;
  totalOrders: number;
  averageTicket: number;
  topProducts: Array<{
    name: string;
    quantity: number;
    revenue: number;
  }>;
  salesByCategory: Array<{
    category: string;
    total: number;
  }>;
}

// --- Missing state declarations ---
const [tables, setTables] = useState<Table[]>([]);
const [selectedTables, setSelectedTables] = useState<string[]>(() => {
  const saved = localStorage.getItem('selectedTables');
  return saved ? JSON.parse(saved) : [];
});
// Persistir selectedTables en localStorage cada vez que cambie
useEffect(() => {
  localStorage.setItem('selectedTables', JSON.stringify(selectedTables));
}, [selectedTables]);
const [loadingTables, setLoadingTables] = useState(false);
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

  // Estado para inventario de platillos
  const [platillosInventario, setPlatillosInventario] = useState<{[key: string]: number}>(() => {
    const saved = localStorage.getItem('platillosInventario');
    return saved ? JSON.parse(saved) : {};
  });

  const [showGestionPlatillos, setShowGestionPlatillos] = useState(false);
  const [platilloSeleccionado, setPlatilloSeleccionado] = useState<{nombre: string, categoria: string} | null>(null);

  // Persistir inventario de platillos
  useEffect(() => {
    localStorage.setItem('platillosInventario', JSON.stringify(platillosInventario));
  }, [platillosInventario]);

  function handleAgregarPlatillo(nombre: string, categoria: string) {
    setPlatilloSeleccionado({nombre, categoria});
    setShowGestionPlatillos(true);
  }

  function handleGuardarCantidadPlatillo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!platilloSeleccionado) return;
    
    const nuevaCantidad = Number((e.currentTarget.cantidad as any).value);
    setPlatillosInventario(prev => ({
      ...prev,
      [platilloSeleccionado.nombre]: nuevaCantidad
    }));
    
    setShowGestionPlatillos(false);
    toast.success(`Cantidad actualizada: ${platilloSeleccionado.nombre} = ${nuevaCantidad}`);
  }

  useEffect(() => {
    console.log('👔 Gerente - Componente montado')
    console.log('👔 Gerente - Usuario:', user)
    loadDashboardData()
    loadTables()
  }, [])

  const loadTables = async () => {
    setLoadingTables(true)
    try {
      const response = await api.get('/tables')
      setTables(response.data)
      toast.success('Mesas cargadas')
    } catch (error) {
      console.error('Error al cargar mesas:', error)
      // Crear mesas de ejemplo si el backend no responde
      const mesasEjemplo: Table[] = [
        { id: '1', number: 1, capacity: 4, status: 'DISPONIBLE', position: { x: 0, y: 0 } },
        { id: '2', number: 2, capacity: 4, status: 'DISPONIBLE', position: { x: 0, y: 0 } },
        { id: '3', number: 3, capacity: 6, status: 'DISPONIBLE', position: { x: 0, y: 0 } },
        { id: '4', number: 4, capacity: 2, status: 'DISPONIBLE', position: { x: 0, y: 0 } },
        { id: '5', number: 5, capacity: 4, status: 'DISPONIBLE', position: { x: 0, y: 0 } },
        { id: '6', number: 6, capacity: 8, status: 'DISPONIBLE', position: { x: 0, y: 0 } },
      ]
      setTables(mesasEjemplo)
      toast('Usando mesas de ejemplo', { icon: 'ℹ️' })
    } finally {
      setLoadingTables(false)
    }
  }

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
              <span className="text-5xl">�‍🍳</span>
              <div>
                <h1 className="text-3xl font-bold">Panel de Cocina</h1>
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
              Panel de Control
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
              Cocina
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
                  Panel de Control
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
                  {/* Botón agregado */}
                  <button
                    onClick={() => alert('Botón de acción de cocina')}
                    className="btn btn-lg btn-success"
                  >
                    🍳 Acción Cocina
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
              <div className="card-castillo w-full mb-8 p-6 rounded-2xl shadow-xl">
                <div className="card-body flex flex-col items-center">
                  <h2 className="card-title text-primary mb-6 text-left text-2xl font-bold -ml-16">Selecciona una o varias mesas</h2>
                  {loadingTables ? (
                    <div className="flex justify-center py-10">
                      <span className="loading loading-spinner loading-lg text-primary"></span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                      {tables.map((table) => {
                        const isSelected = selectedTables.includes(table.id);
                        return (
                          <div
                            key={table.id}
                            onClick={() => {
                              setSelectedTables(prev => {
                                const newSelection = isSelected 
                                  ? prev.filter(id => id !== table.id)
                                  : [...prev, table.id];
                                
                                // Mostrar menú automáticamente cuando se selecciona una mesa
                                if (newSelection.length > 0 && !showMenu) {
                                  setShowMenu(true);
                                }
                                
                                return newSelection;
                              });
                            }}
                            className={`transition-all duration-200 cursor-pointer rounded-xl shadow-lg p-6 flex flex-col items-center justify-center border-2 text-center select-none ${isSelected ? 'border-primary bg-primary/10' : 'border-gray-200 bg-white hover:bg-primary/5'}`}
                          >
                            <div className="font-bold text-xl text-primary mb-2">Mesa {table.number}</div>
                            <div className="text-sm text-gray-600 mb-1">{table.capacity} personas</div>
                            <div className={`mt-1 text-xs font-semibold uppercase tracking-wide ${table.status === 'DISPONIBLE' ? 'text-success' : table.status === 'OCUPADA' ? 'text-error' : 'text-warning'}`}>{table.status.replace('_', ' ')}</div>
                            <div className={`mt-3 w-5 h-5 rounded-full ${isSelected ? 'bg-primary' : 'bg-gray-300'}`}></div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {selectedTables.length > 0 && (
                    <div className="mt-8 flex flex-col gap-3">
                      <div className="px-6 py-3 rounded-xl bg-white text-primary font-bold text-lg shadow text-center border-4 border-primary">
                        Mesas seleccionadas: <span className="text-primary">{selectedTables.map(id => tables.find(t => t.id === id)?.number).join(', ')}</span>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedTables([])
                          toast.success('Mesas deseleccionadas')
                        }}
                        className="btn btn-error btn-outline w-full"
                      >
                        ✕ Limpiar Selección
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {/* Resumen de la orden actual */}
              {selectedTables.length === 1 && ordersByTable[selectedTables[0]] && ordersByTable[selectedTables[0]].items.length > 0 && (
                <div className="w-full mt-6">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-xl p-6 border-4 border-green-500">
                    <h3 className="text-2xl font-bold text-green-700 mb-4 text-center">
                      📋 Orden Mesa {tables.find(t => t.id === selectedTables[0])?.number}
                    </h3>
                    
                    <div className="bg-white rounded-lg p-4 mb-4 max-h-[300px] overflow-y-auto">
                      <table className="w-full">
                        <thead className="bg-green-100 sticky top-0">
                          <tr>
                            <th className="text-left py-2 px-2 text-sm">Platillo</th>
                            <th className="text-center py-2 px-2 text-sm">Cant.</th>
                            <th className="text-right py-2 px-2 text-sm">Precio</th>
                            <th className="text-right py-2 px-2 text-sm">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ordersByTable[selectedTables[0]].items.map((item: any, idx: number) => (
                            <tr key={idx} className="border-b border-gray-200">
                              <td className="py-2 px-2 text-sm">
                                {item.product.name}
                                {item.notes && (
                                  <div className="text-xs text-gray-500 italic">📝 {item.notes}</div>
                                )}
                              </td>
                              <td className="text-center py-2 px-2 text-sm font-bold">{item.quantity}</td>
                              <td className="text-right py-2 px-2 text-sm">${item.product.price.toFixed(2)}</td>
                              <td className="text-right py-2 px-2 text-sm font-bold">${item.subtotal.toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="bg-green-600 text-white rounded-lg p-4 flex justify-between items-center">
                      <span className="text-xl font-bold">TOTAL:</span>
                      <span className="text-3xl font-extrabold">${ordersByTable[selectedTables[0]].total.toFixed(2)}</span>
                    </div>
                    
                    <button
                      className="btn btn-success w-full mt-4 text-lg font-bold"
                      type="button"
                      onClick={() => {
                        generateTicketForTable(selectedTables[0])
                        toast.success('¡Ticket generado!')
                      }}
                    >
                      ✓ Confirmar y Generar Ticket
                    </button>
                  </div>
                </div>
              )}
              
              <div className="mt-8 w-full">
                <div className="card-castillo">
                  <div className="card-body">
                    {/* Mostrar ticket generado para la mesa seleccionada */}
                    {ordersByTable[selectedTables[0]]?.ticket && (
                      <div className="mt-8 card-castillo bg-white shadow-2xl rounded-2xl border-2 border-yellow-400 max-w-xs mx-auto flex flex-col items-center">
                        <div className="w-full px-3 py-2">
                          <h3 className="text-2xl font-bold text-yellow-600 mb-4 text-center">Ticket de la mesa {tables.find(t => t.id === selectedTables[0])?.number}</h3>
                          <table className="w-full mb-2 rounded overflow-hidden">
                          <thead>
                            <tr className="bg-yellow-100 text-yellow-800">
                              <th className="text-left py-0 px-0 font-semibold text-[10px]">Platillo</th>
                              <th className="text-center py-0 px-0 font-semibold text-[10px]">Cantidad</th>
                              <th className="text-center py-0 px-0 font-semibold text-[10px]">Precio unitario</th>
                              <th className="text-center py-0 px-0 font-semibold text-[10px]">Notas</th>
                              <th className="text-right py-0 px-0 font-semibold text-[10px]">Subtotal</th>
                            </tr>
                          </thead>
                            <tbody>
                              {ordersByTable[selectedTables[0]].items.map((item: any, idx: number) => (
                                <tr key={idx} className="border-b border-yellow-200">
                                  <td className="text-left py-1 px-0 text-[10px]">{item.product.name}</td>
                                  <td className="text-center py-1 px-0 text-[10px]">{item.quantity}</td>
                                  <td className="text-center py-1 px-0 text-[10px]">${item.product.price.toFixed(2)}</td>
                                  <td className="text-center py-1 px-0 text-[10px]">{item.notes || '-'}</td>
                                  <td className="text-right py-1 px-0 text-[10px]">${item.subtotal.toFixed(2)}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                          <div className="flex items-center justify-between mt-2 mb-2">
                            <span className="text-base font-bold text-gray-700">Total:</span>
                            <span className="text-xl font-extrabold text-green-600">${ordersByTable[selectedTables[0]].total.toFixed(2)}</span>
                          </div>
                          <div className="text-right text-xs text-gray-400 mt-2">
                            Fecha: {ordersByTable[selectedTables[0]].ticket?.fecha}
                          </div>
                        </div>
                      </div>
                    )}
                    {/* Botón para elegir método de pago */}
                    {ordersByTable[selectedTables[0]]?.ticket && (
                      <div className="w-full flex flex-col items-center mt-4">
                        <label className="mb-2 font-semibold text-gray-700">Selecciona método de pago:</label>
                        <div className="flex gap-2 w-full justify-center">
                          <button className="btn btn-success flex-1" type="button">Efectivo</button>
                          <button className="btn btn-info flex-1" type="button" onClick={handleDownloadPDF}>Tarjeta crédito/débito</button>
                          <button className="btn btn-warning flex-1" type="button">Transferencia</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Columna derecha: Menú y selección de productos */}
            <div className="w-full lg:w-1/3 flex flex-col items-center">
              <div className="w-full">
                <button
                  className="btn btn-primary mb-4"
                  onClick={() => setShowMenu(prev => !prev)}
                >
                  {showMenu ? 'Ocultar Menú Completo' : 'Mostrar Menú Completo'}
                </button>
              </div>
                  {showMenu && (
                    <ProductGridLite
                      selectedTables={selectedTables}
                      onAddProduct={(
                        product: Product,
                        cantidad: number,
                        notas: string,
                        modifiers: string[]
                      ) => {
                        if (selectedTables.length === 1) {
                          // Verificar si hay stock suficiente
                          const stockActual = platillosInventario[product.nombre] || 0;
                          
                          if (stockActual < cantidad) {
                            toast.error(`Stock insuficiente. Solo hay ${stockActual} disponibles de ${product.nombre}`);
                            return;
                          }
                          
                          // Agregar el producto a la mesa
                          addItemToTable(selectedTables[0], product, cantidad, notas, modifiers);
                          
                          // Descontar del inventario
                          setPlatillosInventario(prev => {
                            const nuevoStock = {
                              ...prev,
                              [product.nombre]: (prev[product.nombre] || 0) - cantidad
                            };
                            // Guardar en localStorage
                            localStorage.setItem('platillosInventario', JSON.stringify(nuevoStock));
                            return nuevoStock;
                          });
                          
                          toast.success(`${cantidad}x ${product.nombre} agregado. Stock restante: ${stockActual - cantidad}`);
                        } else {
                          toast.error('Selecciona una sola mesa para agregar productos');
                        }
                      }}
                    />
                  )}
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <></>
        )}

        {activeTab === 'inventory' && (
          <div className="space-y-6">
            {/* Menú Completo - Tabla de Platillos */}
            <div className="card-castillo">
              <div className="card-body">
                <h2 className="card-title text-2xl text-primary mb-6">📋 Menú Completo - Mariscos Castillo</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* CARNES */}
                  <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="text-xl font-bold text-red-700 mb-3 border-b-2 border-red-200 pb-2">🥩 CARNES</h3>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-gray-600">
                          <th className="text-left py-2">Platillo</th>
                          <th className="text-right py-2">Precio</th>
                          <th className="text-center py-2">Stock</th>
                          <th className="text-center py-2">Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="py-2">Arrachera</td>
                          <td className="text-right font-semibold">$250.00</td>
                          <td className="text-center">
                            <span className={`badge ${platillosInventario['Arrachera'] > 0 ? 'badge-success' : 'badge-error'}`}>
                              {platillosInventario['Arrachera'] || 0}
                            </span>
                          </td>
                          <td className="text-center">
                            <button 
                              onClick={() => handleAgregarPlatillo('Arrachera', 'CARNES')}
                              className="btn btn-xs btn-primary"
                            >
                              Gestionar
                            </button>
                          </td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="py-2">Cecina</td>
                          <td className="text-right font-semibold">$150.00</td>
                          <td className="text-center">
                            <span className={`badge ${platillosInventario['Cecina'] > 0 ? 'badge-success' : 'badge-error'}`}>
                              {platillosInventario['Cecina'] || 0}
                            </span>
                          </td>
                          <td className="text-center">
                            <button 
                              onClick={() => handleAgregarPlatillo('Cecina', 'CARNES')}
                              className="btn btn-xs btn-primary"
                            >
                              Gestionar
                            </button>
                          </td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="py-2">Milanesa de pollo</td>
                          <td className="text-right font-semibold">$135.00</td>
                          <td className="text-center">
                            <span className={`badge ${platillosInventario['Milanesa de pollo'] > 0 ? 'badge-success' : 'badge-error'}`}>
                              {platillosInventario['Milanesa de pollo'] || 0}
                            </span>
                          </td>
                          <td className="text-center">
                            <button 
                              onClick={() => handleAgregarPlatillo('Milanesa de pollo', 'CARNES')}
                              className="btn btn-xs btn-primary"
                            >
                              Gestionar
                            </button>
                          </td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="py-2">Filete de pollo a la plancha</td>
                          <td className="text-right font-semibold">$135.00</td>
                          <td className="text-center">
                            <span className={`badge ${platillosInventario['Filete de pollo a la plancha'] > 0 ? 'badge-success' : 'badge-error'}`}>
                              {platillosInventario['Filete de pollo a la plancha'] || 0}
                            </span>
                          </td>
                          <td className="text-center">
                            <button 
                              onClick={() => handleAgregarPlatillo('Filete de pollo a la plancha', 'CARNES')}
                              className="btn btn-xs btn-primary"
                            >
                              Gestionar
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* NIÑOS */}
                  <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="text-xl font-bold text-pink-700 mb-3 border-b-2 border-pink-200 pb-2">👶 NIÑOS</h3>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-gray-600">
                          <th className="text-left py-2">Platillo</th>
                          <th className="text-right py-2">Precio</th>
                          <th className="text-center py-2">Stock</th>
                          <th className="text-center py-2">Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="py-2">Papas a la francesa</td>
                          <td className="text-right font-semibold">$80.00</td>
                          <td className="text-center">
                            <span className={`badge ${platillosInventario['Papas a la francesa'] > 0 ? 'badge-success' : 'badge-error'}`}>
                              {platillosInventario['Papas a la francesa'] || 0}
                            </span>
                          </td>
                          <td className="text-center">
                            <button onClick={() => handleAgregarPlatillo('Papas a la francesa', 'NIÑOS')} className="btn btn-xs btn-primary">Gestionar</button>
                          </td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="py-2">Nuggets de pollo</td>
                          <td className="text-right font-semibold">$110.00</td>
                          <td className="text-center">
                            <span className={`badge ${platillosInventario['Nuggets de pollo'] > 0 ? 'badge-success' : 'badge-error'}`}>
                              {platillosInventario['Nuggets de pollo'] || 0}
                            </span>
                          </td>
                          <td className="text-center">
                            <button onClick={() => handleAgregarPlatillo('Nuggets de pollo', 'NIÑOS')} className="btn btn-xs btn-primary">Gestionar</button>
                          </td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="py-2">Filete empanizado</td>
                          <td className="text-right font-semibold">$190.00</td>
                          <td className="text-center">
                            <span className={`badge ${platillosInventario['Filete empanizado'] > 0 ? 'badge-success' : 'badge-error'}`}>
                              {platillosInventario['Filete empanizado'] || 0}
                            </span>
                          </td>
                          <td className="text-center">
                            <button onClick={() => handleAgregarPlatillo('Filete empanizado', 'NIÑOS')} className="btn btn-xs btn-primary">Gestionar</button>
                          </td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="py-2">Camarones empanizados</td>
                          <td className="text-right font-semibold">$190.00</td>
                          <td className="text-center">
                            <span className={`badge ${platillosInventario['Camarones empanizados'] > 0 ? 'badge-success' : 'badge-error'}`}>
                              {platillosInventario['Camarones empanizados'] || 0}
                            </span>
                          </td>
                          <td className="text-center">
                            <button onClick={() => handleAgregarPlatillo('Camarones empanizados', 'NIÑOS')} className="btn btn-xs btn-primary">Gestionar</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* POSTRES */}
                  <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="text-xl font-bold text-purple-700 mb-3 border-b-2 border-purple-200 pb-2">🍰 POSTRES</h3>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-gray-600">
                          <th className="text-left py-2">Platillo</th>
                          <th className="text-right py-2">Precio</th>
                          <th className="text-center py-2">Stock</th>
                          <th className="text-center py-2">Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="py-2">Plátanos flameados</td>
                          <td className="text-right font-semibold">$130.00</td>
                          <td className="text-center">
                            <span className={`badge ${platillosInventario['Plátanos flameados'] > 0 ? 'badge-success' : 'badge-error'}`}>
                              {platillosInventario['Plátanos flameados'] || 0}
                            </span>
                          </td>
                          <td className="text-center">
                            <button onClick={() => handleAgregarPlatillo('Plátanos flameados', 'POSTRES')} className="btn btn-xs btn-primary">Gestionar</button>
                          </td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="py-2">Duraznos con crema</td>
                          <td className="text-right font-semibold">$60.00</td>
                          <td className="text-center">
                            <span className={`badge ${platillosInventario['Duraznos con crema'] > 0 ? 'badge-success' : 'badge-error'}`}>
                              {platillosInventario['Duraznos con crema'] || 0}
                            </span>
                          </td>
                          <td className="text-center">
                            <button onClick={() => handleAgregarPlatillo('Duraznos con crema', 'POSTRES')} className="btn btn-xs btn-primary">Gestionar</button>
                          </td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="py-2">Duraznos con rompope</td>
                          <td className="text-right font-semibold">$75.00</td>
                          <td className="text-center">
                            <span className={`badge ${platillosInventario['Duraznos con rompope'] > 0 ? 'badge-success' : 'badge-error'}`}>
                              {platillosInventario['Duraznos con rompope'] || 0}
                            </span>
                          </td>
                          <td className="text-center">
                            <button onClick={() => handleAgregarPlatillo('Duraznos con rompope', 'POSTRES')} className="btn btn-xs btn-primary">Gestionar</button>
                          </td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="py-2">Plátanos fritos</td>
                          <td className="text-right font-semibold">$60.00</td>
                          <td className="text-center">
                            <span className={`badge ${platillosInventario['Plátanos fritos'] > 0 ? 'badge-success' : 'badge-error'}`}>
                              {platillosInventario['Plátanos fritos'] || 0}
                            </span>
                          </td>
                          <td className="text-center">
                            <button onClick={() => handleAgregarPlatillo('Plátanos fritos', 'POSTRES')} className="btn btn-xs btn-primary">Gestionar</button>
                          </td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="py-2">Hielitos</td>
                          <td className="text-right font-semibold">$20.00</td>
                          <td className="text-center">
                            <span className={`badge ${platillosInventario['Hielitos'] > 0 ? 'badge-success' : 'badge-error'}`}>
                              {platillosInventario['Hielitos'] || 0}
                            </span>
                          </td>
                          <td className="text-center">
                            <button onClick={() => handleAgregarPlatillo('Hielitos', 'POSTRES')} className="btn btn-xs btn-primary">Gestionar</button>
                          </td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="py-2">Flan napolitano / Pay</td>
                          <td className="text-right font-semibold">$60.00</td>
                          <td className="text-center">
                            <span className={`badge ${platillosInventario['Flan napolitano / Pay'] > 0 ? 'badge-success' : 'badge-error'}`}>
                              {platillosInventario['Flan napolitano / Pay'] || 0}
                            </span>
                          </td>
                          <td className="text-center">
                            <button onClick={() => handleAgregarPlatillo('Flan napolitano / Pay', 'POSTRES')} className="btn btn-xs btn-primary">Gestionar</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* CAMARONES */}
                  <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="text-xl font-bold text-orange-700 mb-3 border-b-2 border-orange-200 pb-2">🦐 CAMARONES</h3>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-gray-600">
                          <th className="text-left py-2">Platillo</th>
                          <th className="text-right py-2">Precio</th>
                          <th className="text-center py-2">Stock</th>
                          <th className="text-center py-2">Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {nombre: 'Camarones a la diabla', precio: '$185 / $190'},
                          {nombre: 'Camarones al mojo de ajo', precio: '$185 / $190'},
                          {nombre: 'Camarones a la española', precio: '$185 / $190'},
                          {nombre: 'Camarones enchipotlados', precio: '$185 / $190'},
                          {nombre: 'Camarones en salsa de chile seco', precio: '$185 / $190'},
                          {nombre: 'Camarones en salsa verde', precio: '$185 / $190'},
                          {nombre: 'Camarones al chile limón', precio: '$185 / $190'},
                          {nombre: 'Camarones en salsa de la casa', precio: '$185 / $190'},
                          {nombre: 'Camarones enchilpayados', precio: '$185 / $190'},
                          {nombre: 'Camarones gratinados al gusto', precio: '$185 / $195'},
                          {nombre: 'Camarones empanizados', precio: '$190.00'},
                          {nombre: 'Camarones al coco', precio: '$210.00'},
                          {nombre: 'Camarones para pelar', precio: '$185.00'},
                          {nombre: 'Orden de camarón de río al gusto', precio: 'S/O'}
                        ].map((platillo) => (
                          <tr key={platillo.nombre} className="border-b hover:bg-gray-50">
                            <td className="py-2">{platillo.nombre}</td>
                            <td className="text-right font-semibold">{platillo.precio}</td>
                            <td className="text-center">
                              <span className={`badge ${platillosInventario[platillo.nombre] > 0 ? 'badge-success' : 'badge-error'}`}>
                                {platillosInventario[platillo.nombre] || 0}
                              </span>
                            </td>
                            <td className="text-center">
                              <button onClick={() => handleAgregarPlatillo(platillo.nombre, 'CAMARONES')} className="btn btn-xs btn-primary">Gestionar</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* ESPECIALIDADES */}
                  <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="text-xl font-bold text-yellow-700 mb-3 border-b-2 border-yellow-200 pb-2">⭐ ESPECIALIDADES</h3>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-gray-600">
                          <th className="text-left py-2">Platillo</th>
                          <th className="text-right py-2">Precio</th>
                          <th className="text-center py-2">Stock</th>
                          <th className="text-center py-2">Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {nombre: 'Brocheta de camarón', precio: '$220.00'},
                          {nombre: 'Barbacoa de mariscos', precio: '$220.00'},
                          {nombre: 'Torta de mariscos', precio: '$225.00'},
                          {nombre: 'Torta de camarón', precio: '$225.00'},
                          {nombre: 'Mariscada', precio: '$210.00'},
                          {nombre: 'Jaibones al gusto', precio: 'S/O'},
                          {nombre: 'Ostiones a la pimienta', precio: 'S/O'},
                          {nombre: 'Manos de cangrejo', precio: 'S/O'},
                          {nombre: 'Paella (10 personas)', precio: '$2,000.00'}
                        ].map((platillo) => (
                          <tr key={platillo.nombre} className="border-b hover:bg-gray-50">
                            <td className="py-2">{platillo.nombre}</td>
                            <td className="text-right font-semibold">{platillo.precio}</td>
                            <td className="text-center">
                              <span className={`badge ${platillosInventario[platillo.nombre] > 0 ? 'badge-success' : 'badge-error'}`}>
                                {platillosInventario[platillo.nombre] || 0}
                              </span>
                            </td>
                            <td className="text-center">
                              <button onClick={() => handleAgregarPlatillo(platillo.nombre, 'ESPECIALIDADES')} className="btn btn-xs btn-primary">Gestionar</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* SOPAS */}
                  <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="text-xl font-bold text-green-700 mb-3 border-b-2 border-green-200 pb-2">🍲 SOPAS</h3>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-gray-600">
                          <th className="text-left py-2">Platillo</th>
                          <th className="text-right py-2">Precio</th>
                          <th className="text-center py-2">Stock</th>
                          <th className="text-center py-2">Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {nombre: 'Sopa de mariscos', precio: '$185.00'},
                          {nombre: 'Sopa de camarón', precio: '$185.00'},
                          {nombre: 'Sopa de jaiba en concha', precio: '$185.00'},
                          {nombre: 'Sopa de jaiba en pulpa', precio: '$190.00'},
                          {nombre: 'Arroz a la tumbada', precio: '$185.00'},
                          {nombre: 'Sopa de rebanada de róbalo', precio: 'S/T'},
                          {nombre: 'Cazuela de mariscos', precio: '$190.00'}
                        ].map((platillo) => (
                          <tr key={platillo.nombre} className="border-b hover:bg-gray-50">
                            <td className="py-2">{platillo.nombre}</td>
                            <td className="text-right font-semibold">{platillo.precio}</td>
                            <td className="text-center">
                              <span className={`badge ${platillosInventario[platillo.nombre] > 0 ? 'badge-success' : 'badge-error'}`}>
                                {platillosInventario[platillo.nombre] || 0}
                              </span>
                            </td>
                            <td className="text-center">
                              <button onClick={() => handleAgregarPlatillo(platillo.nombre, 'SOPAS')} className="btn btn-xs btn-primary">Gestionar</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* CHILPACHOLES */}
                  <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="text-xl font-bold text-red-600 mb-3 border-b-2 border-red-200 pb-2">🌶️ CHILPACHOLES</h3>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-gray-600">
                          <th className="text-left py-2">Platillo</th>
                          <th className="text-right py-2">Precio</th>
                          <th className="text-center py-2">Stock</th>
                          <th className="text-center py-2">Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {nombre: 'Chilpachole de mariscos', precio: '$185.00'},
                          {nombre: 'Chilpachole de camarón', precio: '$185.00'},
                          {nombre: 'Chilpachole de jaiba en pulpa', precio: '$190.00'},
                          {nombre: 'Chilpachole de jaiba en concha', precio: '$185.00'}
                        ].map((platillo) => (
                          <tr key={platillo.nombre} className="border-b hover:bg-gray-50">
                            <td className="py-2">{platillo.nombre}</td>
                            <td className="text-right font-semibold">{platillo.precio}</td>
                            <td className="text-center">
                              <span className={`badge ${platillosInventario[platillo.nombre] > 0 ? 'badge-success' : 'badge-error'}`}>
                                {platillosInventario[platillo.nombre] || 0}
                              </span>
                            </td>
                            <td className="text-center">
                              <button onClick={() => handleAgregarPlatillo(platillo.nombre, 'CHILPACHOLES')} className="btn btn-xs btn-primary">Gestionar</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* CALDO LARGO */}
                  <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="text-xl font-bold text-blue-700 mb-3 border-b-2 border-blue-200 pb-2">🥘 CALDO LARGO</h3>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-gray-600">
                          <th className="text-left py-2">Platillo</th>
                          <th className="text-right py-2">Precio</th>
                          <th className="text-center py-2">Stock</th>
                          <th className="text-center py-2">Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {nombre: 'Caldo largo de rebanada', precio: 'S/T'},
                          {nombre: 'Caldo largo de rebanada con camarones', precio: 'S/T'},
                          {nombre: 'Caldo largo de cabeza', precio: 'S/T'}
                        ].map((platillo) => (
                          <tr key={platillo.nombre} className="border-b hover:bg-gray-50">
                            <td className="py-2">{platillo.nombre}</td>
                            <td className="text-right font-semibold">{platillo.precio}</td>
                            <td className="text-center">
                              <span className={`badge ${platillosInventario[platillo.nombre] > 0 ? 'badge-success' : 'badge-error'}`}>
                                {platillosInventario[platillo.nombre] || 0}
                              </span>
                            </td>
                            <td className="text-center">
                              <button onClick={() => handleAgregarPlatillo(platillo.nombre, 'CALDO LARGO')} className="btn btn-xs btn-primary">Gestionar</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* PESCADOS */}
                  <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="text-xl font-bold text-cyan-700 mb-3 border-b-2 border-cyan-200 pb-2">🐟 PESCADOS (S/T)</h3>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-gray-600">
                          <th className="text-left py-2">Platillo</th>
                          <th className="text-right py-2">Precio</th>
                          <th className="text-center py-2">Stock</th>
                          <th className="text-center py-2">Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {nombre: 'Mojarra al mojo de ajo', precio: 'S/T'},
                          {nombre: 'Mojarra enchipotlada', precio: 'S/T'},
                          {nombre: 'Mojarra en salsa verde', precio: 'S/T'},
                          {nombre: 'Mojarra a la veracruzana', precio: 'S/T'},
                          {nombre: 'Mojarra empapelada', precio: 'S/T'},
                          {nombre: 'Mojarra enchilpayada', precio: 'S/T'},
                          {nombre: 'Chucumite al mojo de ajo', precio: 'S/T'},
                          {nombre: 'Chucumite enchipotlado', precio: 'S/T'},
                          {nombre: 'Chucumite en salsa verde', precio: 'S/T'},
                          {nombre: 'Chucumite a la veracruzana', precio: 'S/T'},
                          {nombre: 'Chucumite empapelado', precio: 'S/T'},
                          {nombre: 'Pámpano al gusto', precio: 'S/T'},
                          {nombre: 'Rebanada de róbalo (varias preparaciones)', precio: 'S/T'}
                        ].map((platillo) => (
                          <tr key={platillo.nombre} className="border-b hover:bg-gray-50">
                            <td className="py-2">{platillo.nombre}</td>
                            <td className="text-right font-semibold">{platillo.precio}</td>
                            <td className="text-center">
                              <span className={`badge ${platillosInventario[platillo.nombre] > 0 ? 'badge-success' : 'badge-error'}`}>
                                {platillosInventario[platillo.nombre] || 0}
                              </span>
                            </td>
                            <td className="text-center">
                              <button onClick={() => handleAgregarPlatillo(platillo.nombre, 'PESCADOS')} className="btn btn-xs btn-primary">Gestionar</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* HUEVA DE PESCADO */}
                  <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="text-xl font-bold text-amber-700 mb-3 border-b-2 border-amber-200 pb-2">🥚 HUEVA DE PESCADO</h3>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-gray-600">
                          <th className="text-left py-2">Platillo</th>
                          <th className="text-right py-2">Precio</th>
                          <th className="text-center py-2">Stock</th>
                          <th className="text-center py-2">Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-gray-100"><td colSpan={4} className="py-2 font-semibold text-center">Hueva de naca</td></tr>
                        {[
                          {nombre: 'Hueva de naca - Frita', precio: '$190.00'},
                          {nombre: 'Hueva de naca - Al mojo de ajo', precio: '$190.00'},
                          {nombre: 'Hueva de naca - Enchilpayada', precio: '$190.00'},
                          {nombre: 'Hueva de naca - Enchipotlada', precio: '$190.00'},
                          {nombre: 'Hueva de naca - Al ajillo', precio: '$190.00'},
                          {nombre: 'Hueva de naca - A la veracruzana', precio: '$190.00'}
                        ].map((platillo) => (
                          <tr key={platillo.nombre} className="border-b hover:bg-gray-50">
                            <td className="py-2 pl-4">{platillo.nombre.replace('Hueva de naca - ', '')}</td>
                            <td className="text-right font-semibold">{platillo.precio}</td>
                            <td className="text-center">
                              <span className={`badge ${platillosInventario[platillo.nombre] > 0 ? 'badge-success' : 'badge-error'}`}>
                                {platillosInventario[platillo.nombre] || 0}
                              </span>
                            </td>
                            <td className="text-center">
                              <button onClick={() => handleAgregarPlatillo(platillo.nombre, 'HUEVA DE PESCADO')} className="btn btn-xs btn-primary">Gestionar</button>
                            </td>
                          </tr>
                        ))}
                        <tr className="bg-gray-100"><td colSpan={4} className="py-2 font-semibold text-center">Hueva de lisa</td></tr>
                        {[
                          {nombre: 'Hueva de lisa - Todas las preparaciones', precio: 'S/O'}
                        ].map((platillo) => (
                          <tr key={platillo.nombre} className="border-b hover:bg-gray-50">
                            <td className="py-2 pl-4">{platillo.nombre.replace('Hueva de lisa - ', '')}</td>
                            <td className="text-right font-semibold">{platillo.precio}</td>
                            <td className="text-center">
                              <span className={`badge ${platillosInventario[platillo.nombre] > 0 ? 'badge-success' : 'badge-error'}`}>
                                {platillosInventario[platillo.nombre] || 0}
                              </span>
                            </td>
                            <td className="text-center">
                              <button onClick={() => handleAgregarPlatillo(platillo.nombre, 'HUEVA DE PESCADO')} className="btn btn-xs btn-primary">Gestionar</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* FILETES */}
                  <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="text-xl font-bold text-indigo-700 mb-3 border-b-2 border-indigo-200 pb-2">🐠 FILETES</h3>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-gray-600">
                          <th className="text-left py-2">Platillo</th>
                          <th className="text-right py-2">Precio</th>
                          <th className="text-center py-2">Stock</th>
                          <th className="text-center py-2">Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {nombre: 'Filete relleno de mariscos', precio: '$220.00'},
                          {nombre: 'Filete relleno de camarón', precio: '$220.00'},
                          {nombre: 'Tapiste de camarón', precio: '$220.00'},
                          {nombre: 'Tapiste de mariscos', precio: '$220.00'},
                          {nombre: 'Filete al mojo de ajo', precio: '$190.00'},
                          {nombre: 'Filete enchipotlado', precio: '$190.00'},
                          {nombre: 'Filete en salsa verde', precio: '$190.00'},
                          {nombre: 'Filete a la veracruzana', precio: '$190.00'},
                          {nombre: 'Filete empanizado', precio: '$190.00'},
                          {nombre: 'Filete sol', precio: '$190.00'}
                        ].map((platillo) => (
                          <tr key={platillo.nombre} className="border-b hover:bg-gray-50">
                            <td className="py-2">{platillo.nombre}</td>
                            <td className="text-right font-semibold">{platillo.precio}</td>
                            <td className="text-center">
                              <span className={`badge ${platillosInventario[platillo.nombre] > 0 ? 'badge-success' : 'badge-error'}`}>
                                {platillosInventario[platillo.nombre] || 0}
                              </span>
                            </td>
                            <td className="text-center">
                              <button onClick={() => handleAgregarPlatillo(platillo.nombre, 'FILETES')} className="btn btn-xs btn-primary">Gestionar</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* PULPOS */}
                  <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="text-xl font-bold text-purple-600 mb-3 border-b-2 border-purple-200 pb-2">🐙 PULPOS</h3>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-gray-600">
                          <th className="text-left py-2">Platillo</th>
                          <th className="text-right py-2">Precio</th>
                          <th className="text-center py-2">Stock</th>
                          <th className="text-center py-2">Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {nombre: 'Pulpos encebollados', precio: '$300.00'},
                          {nombre: 'Pulpos enchilpayados', precio: '$300.00'},
                          {nombre: 'Pulpos envinados', precio: '$300.00'},
                          {nombre: 'Pulpos enchipotlados', precio: '$300.00'},
                          {nombre: 'Pulpos al mojo de ajo', precio: '$300.00'},
                          {nombre: 'Pulpos en salsa verde', precio: '$300.00'},
                          {nombre: 'Pulpos con camarones a la C', precio: '$300.00'}
                        ].map((platillo) => (
                          <tr key={platillo.nombre} className="border-b hover:bg-gray-50">
                            <td className="py-2">{platillo.nombre}</td>
                            <td className="text-right font-semibold">{platillo.precio}</td>
                            <td className="text-center">
                              <span className={`badge ${platillosInventario[platillo.nombre] > 0 ? 'badge-success' : 'badge-error'}`}>
                                {platillosInventario[platillo.nombre] || 0}
                              </span>
                            </td>
                            <td className="text-center">
                              <button onClick={() => handleAgregarPlatillo(platillo.nombre, 'PULPOS')} className="btn btn-xs btn-primary">Gestionar</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* COCTELES */}
                  <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="text-xl font-bold text-pink-600 mb-3 border-b-2 border-pink-200 pb-2">🍹 COCTELES (Chico/Grande)</h3>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-gray-600">
                          <th className="text-left py-2">Platillo</th>
                          <th className="text-right py-2">Precio</th>
                          <th className="text-center py-2">Stock</th>
                          <th className="text-center py-2">Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {nombre: 'Coctel de Camarón', precio: '$93 / $125'},
                          {nombre: 'Coctel de Jaiba', precio: '$93 / $125'},
                          {nombre: 'Coctel de Pulpo', precio: '$93 / $125'},
                          {nombre: 'Coctel de Hueva', precio: '$93 / $125'},
                          {nombre: 'Coctel de Ostión', precio: '$93 / $125'},
                          {nombre: 'Campechana (2 mariscos)', precio: '$125.00'},
                          {nombre: 'Vuelve a la vida', precio: '$150.00'},
                          {nombre: 'Vuelve a la vida de camarón', precio: '$160.00'},
                          {nombre: 'Ceviche de pescado', precio: 'S/O'}
                        ].map((platillo) => (
                          <tr key={platillo.nombre} className="border-b hover:bg-gray-50">
                            <td className="py-2">{platillo.nombre}</td>
                            <td className="text-right font-semibold">{platillo.precio}</td>
                            <td className="text-center">
                              <span className={`badge ${platillosInventario[platillo.nombre] > 0 ? 'badge-success' : 'badge-error'}`}>
                                {platillosInventario[platillo.nombre] || 0}
                              </span>
                            </td>
                            <td className="text-center">
                              <button onClick={() => handleAgregarPlatillo(platillo.nombre, 'COCTELES')} className="btn btn-xs btn-primary">Gestionar</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* ENTRADAS */}
                  <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="text-xl font-bold text-teal-700 mb-3 border-b-2 border-teal-200 pb-2">🍤 ENTRADAS</h3>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-gray-600">
                          <th className="text-left py-2">Platillo</th>
                          <th className="text-right py-2">Precio</th>
                          <th className="text-center py-2">Stock</th>
                          <th className="text-center py-2">Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {nombre: 'Ensalada de camarón', precio: '$185.00'},
                          {nombre: 'Ensalada de mariscos', precio: '$180.00'},
                          {nombre: 'Tostadas de camarón (3)', precio: '$130.00'},
                          {nombre: 'Tostadas de minilla (3)', precio: '$110.00'},
                          {nombre: 'Orden de minilla', precio: '$150.00'},
                          {nombre: 'Jaiba rellena (pieza)', precio: '$110.00'},
                          {nombre: 'Tacos dorados de minilla (4)', precio: '$110.00'},
                          {nombre: 'Empanadas de camarón (4)', precio: '$130.00'},
                          {nombre: 'Empanadas de minilla (4)', precio: '$110.00'},
                          {nombre: 'Rollitos de camarón', precio: '$130.00'},
                          {nombre: 'Arroz con plátano / huevo', precio: '$45.00'},
                          {nombre: 'Arroz con camarón', precio: '$135.00'}
                        ].map((platillo) => (
                          <tr key={platillo.nombre} className="border-b hover:bg-gray-50">
                            <td className="py-2">{platillo.nombre}</td>
                            <td className="text-right font-semibold">{platillo.precio}</td>
                            <td className="text-center">
                              <span className={`badge ${platillosInventario[platillo.nombre] > 0 ? 'badge-success' : 'badge-error'}`}>
                                {platillosInventario[platillo.nombre] || 0}
                              </span>
                            </td>
                            <td className="text-center">
                              <button onClick={() => handleAgregarPlatillo(platillo.nombre, 'ENTRADAS')} className="btn btn-xs btn-primary">Gestionar</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4">
                  <p className="text-sm text-gray-700">
                    <strong>Nota:</strong> S/T = Según Temporada | S/O = Según Oferta
                  </p>
                </div>
              </div>
            </div>

            {/* Componente de Inventario Original */}
            <Inventario />
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-[#0a2342] text-white py-8 px-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <span className="text-5xl">👨‍🍳</span>
                <div>
                  {/* Título eliminado por solicitud */}
                  <p className="text-lg">Mariscos Castillo - Cocina</p>
                </div>
              </div>
              <button className="btn btn-primary text-lg px-6 py-3 font-bold" style={{background:'#2994e4'}}>
                <span className="text-xl">📦</span> Ver Inventario
              </button>
              <div className="flex flex-col items-end">
                <span className="font-bold text-lg">Gerente Castillo</span>
                <span className="text-xs">GERENTE</span>
                <button className="btn btn-primary mt-2">Salir</button>
              </div>
            </div>
            <div className="flex gap-4 mb-8">
              <div className="bg-white text-black rounded-lg shadow px-8 py-4 flex flex-col items-center">
                <span className="font-bold text-lg">Pendientes</span>
                <span className="text-3xl font-bold" style={{color:'#e53e3e'}}>0</span>
              </div>
              <div className="bg-white text-black rounded-lg shadow px-8 py-4 flex flex-col items-center">
                <span className="font-bold text-lg">En Preparación</span>
                <span className="text-3xl font-bold" style={{color:'#2994e4'}}>0</span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center mt-20">
              {Object.keys(ordersByTable).length === 0 ? (
                <>
                  <span className="text-7xl mb-6">😴</span>
                  <h2 className="text-3xl font-bold mb-2">Todo tranquilo en la cocina</h2>
                  <p className="text-lg text-gray-400">No hay órdenes pendientes</p>
                </>
              ) : (
                <div className="w-full px-6">
                  <h2 className="text-2xl font-bold mb-6 text-white">Órdenes en Cocina</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(ordersByTable).map(([mesaId, order]) => (
                      <div key={mesaId} className="bg-gradient-to-br from-blue-600 to-blue-800 border-4 border-blue-400 rounded-lg shadow-2xl p-6 text-white">
                        {/* Header de la orden */}
                        <div className="mb-4">
                          <div className="text-4xl font-bold mb-2">
                            MESA {order.tableNumber || mesaId}
                          </div>
                          <div className="badge badge-lg badge-error">
                            🆕 PENDIENTE
                          </div>
                        </div>

                        {/* Items por categoría */}
                        <div className="space-y-4 mb-4 max-h-[50vh] overflow-y-auto">
                          {(() => {
                            // Agrupar por categoría
                            const CATEGORIAS: Record<string, string[]> = {
                              'CARNES': ['Arrachera', 'Cecina', 'Milanesa', 'Filete de pollo'],
                              'CAMARONES': ['Camarones', 'camarón'],
                              'PESCADOS': ['Mojarra', 'Chucumite', 'Pámpano', 'róbalo'],
                              'COCTELES': ['Coctel', 'Campechana', 'Vuelve a la vida', 'Ceviche'],
                              'SOPAS': ['Sopa', 'Cazuela', 'Arroz a la tumbada'],
                              'ENTRADAS': ['Ensalada', 'Tostadas', 'minilla', 'Jaiba rellena', 'Empanadas', 'Rollitos'],
                              'BEBIDAS': ['AGUA', 'REFRESCO', 'CERVEZA', 'Agua', 'Refresco', 'Cerveza']
                            }
                            
                            const getCategoria = (nombre: string): string => {
                              for (const [cat, palabras] of Object.entries(CATEGORIAS)) {
                                if (palabras.some(p => nombre.toLowerCase().includes(p.toLowerCase()))) {
                                  return cat
                                }
                              }
                              return 'OTROS'
                            }
                            
                            const itemsPorCategoria: Record<string, typeof order.items> = {}
                            order.items.forEach(item => {
                              const cat = getCategoria(item.product.name)
                              if (!itemsPorCategoria[cat]) itemsPorCategoria[cat] = []
                              itemsPorCategoria[cat].push(item)
                            })
                            
                            return Object.entries(itemsPorCategoria).map(([categoria, items]) => (
                              <div key={categoria} className="bg-black/40 p-3 rounded-lg border-2 border-white/20">
                                <h4 className="text-lg font-bold mb-2 text-yellow-300 border-b border-yellow-300/50 pb-1">
                                  {categoria === 'CARNES' && '🥩 '}
                                  {categoria === 'CAMARONES' && '🦐 '}
                                  {categoria === 'PESCADOS' && '🐟 '}
                                  {categoria === 'COCTELES' && '🍹 '}
                                  {categoria === 'SOPAS' && '🍲 '}
                                  {categoria === 'ENTRADAS' && '🍤 '}
                                  {categoria === 'BEBIDAS' && '🥤 '}
                                  {categoria === 'OTROS' && '🍽️ '}
                                  {categoria}
                                </h4>
                                <div className="space-y-2">
                                  {items.map((item, idx) => (
                                    <div key={idx} className="bg-white/10 p-2 rounded hover:bg-white/20 transition-colors">
                                      <div className="flex items-center gap-2">
                                        <div className="text-2xl font-bold text-green-400 min-w-[40px]">
                                          {item.quantity}x
                                        </div>
                                        <div className="flex-1">
                                          <div className="text-sm font-bold">{item.product.name}</div>
                                          {item.notes && (
                                            <div className="text-xs bg-warning/20 p-1 rounded mt-1 border border-warning">
                                              📝 {item.notes}
                                            </div>
                                          )}
                                        </div>
                                        <button 
                                          className="btn btn-xs btn-success"
                                          onClick={() => {
                                            toast.success(`${item.product.name} marcado como listo!`)
                                          }}
                                        >
                                          Listo
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))
                          })()}
                        </div>

                        {/* Total y botón */}
                        <div className="border-t-2 border-white/30 pt-3 mt-3">
                          <div className="text-right font-bold text-xl mb-3">
                            Total: ${order.total.toFixed(2)}
                          </div>
                          <button 
                            className="btn btn-success btn-lg w-full font-bold text-lg"
                            onClick={() => toast.success(`Orden de Mesa ${order.tableNumber || mesaId} completada!`)}
                          >
                            ✓ ORDEN COMPLETA
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal para gestionar cantidad de platillos */}
      {showGestionPlatillos && platilloSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Gestionar Inventario de Platillos
            </h2>
            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Categoría: <span className="font-semibold">{platilloSeleccionado.categoria}</span></p>
              <p className="text-lg font-bold text-gray-800 mt-1">{platilloSeleccionado.nombre}</p>
              <p className="text-sm text-gray-500 mt-2">
                Stock actual: <span className={`font-bold ${platillosInventario[platilloSeleccionado.nombre] > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {platillosInventario[platilloSeleccionado.nombre] || 0} disponibles
                </span>
              </p>
            </div>
            <form onSubmit={handleGuardarCantidadPlatillo} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nueva cantidad disponible
                </label>
                <input 
                  type="number" 
                  name="cantidad" 
                  placeholder="Cantidad" 
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:border-primary focus:ring-2 focus:ring-primary/20" 
                  required 
                  min="0"
                  defaultValue={platillosInventario[platilloSeleccionado.nombre] || 0}
                />
                <p className="text-xs text-gray-500 mt-1">Ingresa cuántos platillos de este tipo tienes disponibles</p>
              </div>
              <div className="flex gap-3 mt-6">
                <button 
                  type="submit" 
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  ✓ Guardar
                </button>
                <button 
                  type="button" 
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-6 py-3 rounded-lg transition-colors" 
                  onClick={() => setShowGestionPlatillos(false)}
                >
                  ✕ Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gerente
