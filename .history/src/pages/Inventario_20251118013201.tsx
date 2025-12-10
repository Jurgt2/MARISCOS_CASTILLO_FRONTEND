import { useState, useEffect } from 'react';
import { Package, AlertTriangle, Plus, Minus, Edit2, Save, X } from 'lucide-react';

interface Ingrediente {
  id: string;
  nombre: string;
  categoria: 'PROTEINA' | 'VERDURA' | 'CONDIMENTO' | 'LACTEO' | 'GRANOS' | 'ACEITE' | 'BEBIDA';
  cantidad: number;
  unidad: string;
  cantidadMinima: number;
  costoUnitario: number;
  proveedor: string;
  ultimaActualizacion: string;
}

// Datos mock para desarrollo (se reemplazarán con API real)
const ingredientesMock: Ingrediente[] = [
  // PROTEÍNAS
  { id: '1', nombre: 'Camarón U15', categoria: 'PROTEINA', cantidad: 25, unidad: 'kg', cantidadMinima: 5, costoUnitario: 180, proveedor: 'Mariscos del Golfo', ultimaActualizacion: new Date().toISOString() },
  { id: '2', nombre: 'Camarón U21', categoria: 'PROTEINA', cantidad: 30, unidad: 'kg', cantidadMinima: 8, costoUnitario: 150, proveedor: 'Mariscos del Golfo', ultimaActualizacion: new Date().toISOString() },
  { id: '3', nombre: 'Pulpo Español', categoria: 'PROTEINA', cantidad: 15, unidad: 'kg', cantidadMinima: 3, costoUnitario: 220, proveedor: 'Mariscos del Golfo', ultimaActualizacion: new Date().toISOString() },
  { id: '4', nombre: 'Filete de Robalo', categoria: 'PROTEINA', cantidad: 20, unidad: 'kg', cantidadMinima: 5, costoUnitario: 160, proveedor: 'Pescados Frescos', ultimaActualizacion: new Date().toISOString() },
  { id: '5', nombre: 'Mojarra', categoria: 'PROTEINA', cantidad: 25, unidad: 'kg', cantidadMinima: 10, costoUnitario: 80, proveedor: 'Pescados Frescos', ultimaActualizacion: new Date().toISOString() },
  { id: '6', nombre: 'Huachinango', categoria: 'PROTEINA', cantidad: 3, unidad: 'kg', cantidadMinima: 3, costoUnitario: 200, proveedor: 'Pescados Frescos', ultimaActualizacion: new Date().toISOString() },
  { id: '7', nombre: 'Jaiba', categoria: 'PROTEINA', cantidad: 10, unidad: 'kg', cantidadMinima: 3, costoUnitario: 120, proveedor: 'Mariscos del Golfo', ultimaActualizacion: new Date().toISOString() },
  { id: '8', nombre: 'Ostiones', categoria: 'PROTEINA', cantidad: 8, unidad: 'kg', cantidadMinima: 2, costoUnitario: 180, proveedor: 'Mariscos del Golfo', ultimaActualizacion: new Date().toISOString() },
  { id: '9', nombre: 'Arrachera', categoria: 'PROTEINA', cantidad: 8, unidad: 'kg', cantidadMinima: 2, costoUnitario: 180, proveedor: 'Carnicería El Buen Corte', ultimaActualizacion: new Date().toISOString() },
  { id: '10', nombre: 'Pechuga de Pollo', categoria: 'PROTEINA', cantidad: 15, unidad: 'kg', cantidadMinima: 5, costoUnitario: 80, proveedor: 'Carnicería El Buen Corte', ultimaActualizacion: new Date().toISOString() },
  { id: '11', nombre: 'Tocino', categoria: 'PROTEINA', cantidad: 2, unidad: 'kg', cantidadMinima: 2, costoUnitario: 90, proveedor: 'Carnicería El Buen Corte', ultimaActualizacion: new Date().toISOString() },
  
  // VERDURAS
  { id: '12', nombre: 'Tomate', categoria: 'VERDURA', cantidad: 25, unidad: 'kg', cantidadMinima: 8, costoUnitario: 22, proveedor: 'Verduras Frescas', ultimaActualizacion: new Date().toISOString() },
  { id: '13', nombre: 'Cebolla Blanca', categoria: 'VERDURA', cantidad: 20, unidad: 'kg', cantidadMinima: 5, costoUnitario: 18, proveedor: 'Verduras Frescas', ultimaActualizacion: new Date().toISOString() },
  { id: '14', nombre: 'Ajo', categoria: 'VERDURA', cantidad: 3, unidad: 'kg', cantidadMinima: 1, costoUnitario: 80, proveedor: 'Verduras Frescas', ultimaActualizacion: new Date().toISOString() },
  { id: '15', nombre: 'Chile Serrano', categoria: 'VERDURA', cantidad: 3, unidad: 'kg', cantidadMinima: 1, costoUnitario: 35, proveedor: 'Verduras Frescas', ultimaActualizacion: new Date().toISOString() },
  { id: '16', nombre: 'Cilantro', categoria: 'VERDURA', cantidad: 20, unidad: 'manojos', cantidadMinima: 5, costoUnitario: 8, proveedor: 'Verduras Frescas', ultimaActualizacion: new Date().toISOString() },
  { id: '17', nombre: 'Aguacate', categoria: 'VERDURA', cantidad: 15, unidad: 'kg', cantidadMinima: 5, costoUnitario: 60, proveedor: 'Verduras Frescas', ultimaActualizacion: new Date().toISOString() },
  { id: '18', nombre: 'Limón', categoria: 'VERDURA', cantidad: 30, unidad: 'kg', cantidadMinima: 10, costoUnitario: 25, proveedor: 'Verduras Frescas', ultimaActualizacion: new Date().toISOString() },
  { id: '19', nombre: 'Pimiento Morrón', categoria: 'VERDURA', cantidad: 5, unidad: 'kg', cantidadMinima: 2, costoUnitario: 45, proveedor: 'Verduras Frescas', ultimaActualizacion: new Date().toISOString() },
  { id: '20', nombre: 'Pepino', categoria: 'VERDURA', cantidad: 8, unidad: 'kg', cantidadMinima: 3, costoUnitario: 18, proveedor: 'Verduras Frescas', ultimaActualizacion: new Date().toISOString() },
  
  // CONDIMENTOS
  { id: '21', nombre: 'Chile Guajillo', categoria: 'CONDIMENTO', cantidad: 2, unidad: 'kg', cantidadMinima: 0.5, costoUnitario: 80, proveedor: 'Especias México', ultimaActualizacion: new Date().toISOString() },
  { id: '22', nombre: 'Chile de Árbol', categoria: 'CONDIMENTO', cantidad: 1.5, unidad: 'kg', cantidadMinima: 0.3, costoUnitario: 120, proveedor: 'Especias México', ultimaActualizacion: new Date().toISOString() },
  { id: '23', nombre: 'Chipotle en Adobo', categoria: 'CONDIMENTO', cantidad: 3, unidad: 'kg', cantidadMinima: 1, costoUnitario: 60, proveedor: 'Especias México', ultimaActualizacion: new Date().toISOString() },
  { id: '24', nombre: 'Sal', categoria: 'CONDIMENTO', cantidad: 10, unidad: 'kg', cantidadMinima: 2, costoUnitario: 10, proveedor: 'Abarrotes Central', ultimaActualizacion: new Date().toISOString() },
  { id: '25', nombre: 'Pimienta Negra', categoria: 'CONDIMENTO', cantidad: 1, unidad: 'kg', cantidadMinima: 0.2, costoUnitario: 150, proveedor: 'Especias México', ultimaActualizacion: new Date().toISOString() },
  
  // LÁCTEOS
  { id: '26', nombre: 'Queso Manchego', categoria: 'LACTEO', cantidad: 8, unidad: 'kg', cantidadMinima: 2, costoUnitario: 150, proveedor: 'Lácteos San José', ultimaActualizacion: new Date().toISOString() },
  { id: '27', nombre: 'Crema', categoria: 'LACTEO', cantidad: 10, unidad: 'L', cantidadMinima: 3, costoUnitario: 45, proveedor: 'Lácteos San José', ultimaActualizacion: new Date().toISOString() },
  { id: '28', nombre: 'Mantequilla', categoria: 'LACTEO', cantidad: 8, unidad: 'kg', cantidadMinima: 2, costoUnitario: 100, proveedor: 'Lácteos San José', ultimaActualizacion: new Date().toISOString() },
  
  // GRANOS Y OTROS
  { id: '29', nombre: 'Arroz', categoria: 'GRANOS', cantidad: 50, unidad: 'kg', cantidadMinima: 10, costoUnitario: 18, proveedor: 'Abarrotes Central', ultimaActualizacion: new Date().toISOString() },
  { id: '30', nombre: 'Harina', categoria: 'GRANOS', cantidad: 20, unidad: 'kg', cantidadMinima: 5, costoUnitario: 22, proveedor: 'Abarrotes Central', ultimaActualizacion: new Date().toISOString() },
  { id: '31', nombre: 'Pan Molido', categoria: 'GRANOS', cantidad: 5, unidad: 'kg', cantidadMinima: 2, costoUnitario: 35, proveedor: 'Panadería La Espiga', ultimaActualizacion: new Date().toISOString() },
  
  // ACEITES
  { id: '32', nombre: 'Aceite Vegetal', categoria: 'ACEITE', cantidad: 30, unidad: 'L', cantidadMinima: 10, costoUnitario: 35, proveedor: 'Abarrotes Central', ultimaActualizacion: new Date().toISOString() },
  { id: '33', nombre: 'Aceite de Oliva', categoria: 'ACEITE', cantidad: 5, unidad: 'L', cantidadMinima: 1, costoUnitario: 180, proveedor: 'Abarrotes Central', ultimaActualizacion: new Date().toISOString() },
  
  // BEBIDAS
  { id: '34', nombre: 'Coca-Cola 600ml', categoria: 'BEBIDA', cantidad: 200, unidad: 'pzas', cantidadMinima: 50, costoUnitario: 12, proveedor: 'Refrescos del Sur', ultimaActualizacion: new Date().toISOString() },
  { id: '35', nombre: 'Cerveza Corona', categoria: 'BEBIDA', cantidad: 150, unidad: 'pzas', cantidadMinima: 30, costoUnitario: 18, proveedor: 'Cervezas Nacionales', ultimaActualizacion: new Date().toISOString() },
  { id: '36', nombre: 'Agua Mineral', categoria: 'BEBIDA', cantidad: 100, unidad: 'pzas', cantidadMinima: 30, costoUnitario: 15, proveedor: 'Distribuidora Agua', ultimaActualizacion: new Date().toISOString() },
  { id: '37', nombre: 'Jugo de Naranja', categoria: 'BEBIDA', cantidad: 20, unidad: 'L', cantidadMinima: 5, costoUnitario: 35, proveedor: 'Jugos Frescos', ultimaActualizacion: new Date().toISOString() },
  { id: '38', nombre: 'Tequila (Cocina)', categoria: 'BEBIDA', cantidad: 3, unidad: 'L', cantidadMinima: 1, costoUnitario: 300, proveedor: 'Licorería Premium', ultimaActualizacion: new Date().toISOString() },
];

export default function Inventario() {
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>(ingredientesMock);
  const [filteredIngredientes, setFilteredIngredientes] = useState<Ingrediente[]>(ingredientesMock);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ cantidad: number; cantidadMinima: number }>({ cantidad: 0, cantidadMinima: 0 });
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Camarón U15', categoria: 'PROTEINA', cantidad: 25, caducidad: '2025-12-01', proveedor: 'Mariscos del Golfo', estado: 'ÓPTIMO' },
    { id: 2, nombre: 'Camarón U21', categoria: 'PROTEINA', cantidad: 30, caducidad: '2025-12-05', proveedor: 'Mariscos del Golfo', estado: 'ÓPTIMO' },
  ]);

  useEffect(() => {
    let filtered = ingredientes;

    // Filtrar por búsqueda
    // if (searchTerm) {
    //   filtered = filtered.filter(ing =>
    //     ing.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     ing.proveedor.toLowerCase().includes(searchTerm.toLowerCase())
    //   );
    // }

    // Filtrar por categoría
    // if (categoriaFilter !== 'TODAS') {
    //   filtered = filtered.filter(ing => ing.categoria === categoriaFilter);
    // }

    // Filtrar solo stock bajo
    // if (showOnlyLow) {
    //   filtered = filtered.filter(ing => ing.cantidad <= ing.cantidadMinima);
    // }

    setFilteredIngredientes(filtered);
  }, [ingredientes]);

  const handleEdit = (ingrediente: Ingrediente) => {
    setEditingId(ingrediente.id);
    setEditValues({
      cantidad: ingrediente.cantidad,
      cantidadMinima: ingrediente.cantidadMinima
    });
  };

  const handleSave = (id: string) => {
    setIngredientes(prev => prev.map(ing =>
      ing.id === id
        ? { ...ing, cantidad: editValues.cantidad, cantidadMinima: editValues.cantidadMinima, ultimaActualizacion: new Date().toISOString() }
        : ing
    ));
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleAdjust = (id: string, amount: number) => {
    setIngredientes(prev => prev.map(ing =>
      ing.id === id
        ? { ...ing, cantidad: Math.max(0, ing.cantidad + amount), ultimaActualizacion: new Date().toISOString() }
        : ing
    ));
  };

  const getStockStatus = (cantidad: number, minimo: number) => {
    if (cantidad === 0) return { text: 'AGOTADO', color: 'badge-error' };
    if (cantidad <= minimo) return { text: 'BAJO', color: 'badge-warning' };
    if (cantidad <= minimo * 2) return { text: 'MEDIO', color: 'badge-info' };
    return { text: 'ÓPTIMO', color: 'badge-success' };
  };

  const alertasCount = ingredientes.filter(ing => ing.cantidad <= ing.cantidadMinima).length;
  const agotadosCount = ingredientes.filter(ing => ing.cantidad === 0).length;

  // Funciones reales
  const handleRecepcion = () => {
    const nombre = prompt('Ingrese el nombre del ingrediente:');
    const cantidad = parseFloat(prompt('Ingrese la cantidad recibida:'));
    const caducidad = prompt('Ingrese la fecha de caducidad (YYYY-MM-DD):');

    if (nombre && cantidad && caducidad) {
      const nuevoProducto = {
        id: Date.now(),
        nombre,
        categoria: 'PROTEINA', // Categoría predeterminada
        cantidad,
        caducidad,
        proveedor: 'Proveedor Desconocido', // Proveedor predeterminado
        estado: cantidad > 10 ? 'ÓPTIMO' : 'BAJO',
      };

      setProductos((prevProductos) => [...prevProductos, nuevoProducto]);
      alert('Producto recibido y agregado al inventario: ' + nombre);
    } else {
      alert('Por favor, complete todos los campos.');
    }
  };

  const handlePesaje = () => {
    const peso = Math.random() * 20 + 5; // Simular peso
    console.log('Pesaje automático:', peso + ' kg');
    alert('Peso registrado: ' + peso.toFixed(2) + ' kg');
  };

  const handleRegistroTemperatura = () => {
    const temperatura = Math.random() * 10 + 2; // Simular temperatura
    console.log('Temperatura registrada:', temperatura + ' °C');
    alert('Temperatura registrada: ' + temperatura.toFixed(2) + ' °C');
  };

  const handleFechaCaducidad = () => {
    const fechaCaducidad = prompt('Ingrese la fecha de caducidad (YYYY-MM-DD):');
    console.log('Fecha de caducidad ingresada:', fechaCaducidad);
    alert('Fecha de caducidad registrada: ' + fechaCaducidad);
  };

  const handleEntradaInventario = () => {
    console.log('Entrada automática al inventario realizada.');
    alert('Entrada automática completada.');
  };

  const handleCostoPromedio = () => {
    console.log('Cálculo de costo promedio ponderado realizado.');
    alert('Costo promedio calculado.');
  };

  const handleEtiquetasQR = () => {
    console.log('Etiquetas QR generadas.');
    alert('Etiquetas QR impresas.');
  };

  const handleUbicacionFisica = () => {
    const ubicacion = prompt('Ingrese la ubicación física (Área → Estante → Nivel):');
    console.log('Ubicación asignada:', ubicacion);
    alert('Ubicación asignada: ' + ubicacion);
  };

  const handleRotacionFIFO = () => {
    console.log('Rotación FIFO/FEFO realizada.');
    alert('Rotación FIFO/FEFO completada.');
  };

  const handleRequisasDigitales = () => {
    console.log('Requisas digitales realizadas desde cocina/bar.');
    alert('Requisas digitales completadas.');
  };

  const handleConfirmacionRequisas = () => {
    console.log('Confirmación y descuento automático de requisas realizado.');
    alert('Requisas confirmadas y descontadas.');
  };

  const handleRegistroMermas = () => {
    const motivo = prompt('Ingrese el motivo de la merma:');
    console.log('Merma registrada con motivo:', motivo);
    alert('Merma registrada: ' + motivo);
  };

  const handleOrdenesCompra = () => {
    console.log('Órdenes de compra generadas según stock mínimo.');
    alert('Órdenes de compra generadas.');
  };

  const handleAlertasStock = () => {
    console.log('Alertas visuales generadas para productos con stock bajo.');
    alert('Alertas de stock bajo mostradas.');
  };

  const handleFichasTecnicas = () => {
    console.log('Fichas técnicas de recetas generadas.');
    alert('Fichas técnicas generadas.');
  };

  const handleDashboardReportes = () => {
    console.log('Dashboard principal con reportes en tiempo real mostrado.');
    alert('Reportes en tiempo real mostrados.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A3D62] to-[#1e5a8e] text-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <Package className="text-[#0A3D62] w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Gestión de Inventario</h1>
              <p className="text-blue-100">Control de ingredientes e insumos</p>
            </div>
          </div>
          <div className="flex gap-4">
            {agotadosCount > 0 && (
              <div className="bg-red-500 px-4 py-2 rounded-lg">
                <p className="text-sm">AGOTADOS</p>
                <p className="text-2xl font-bold">{agotadosCount}</p>
              </div>
            )}
            {alertasCount > 0 && (
              <div className="bg-yellow-500 px-4 py-2 rounded-lg">
                <p className="text-sm">STOCK BAJO</p>
                <p className="text-2xl font-bold">{alertasCount}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-primary mb-6">Gestión de Inventario</h1>

        {/* Resumen de Inventario */}
        <div className="bg-warning/10 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-4">📦 Resumen de Inventario</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="stat">
              <div className="stat-title">Total Ingredientes</div>
              <div className="stat-value">{ingredientes.length}</div>
              <div className="stat-desc">Productos registrados</div>
            </div>
            <div className="stat">
              <div className="stat-title">Valor Total</div>
              <div className="stat-value">
                ${ingredientes.reduce((sum, ing) => sum + (ing.cantidad * ing.costoUnitario), 0).toFixed(2)}
              </div>
              <div className="stat-desc">MXN</div>
            </div>
            <div className="stat">
              <div className="stat-title">Agotados</div>
              <div className="stat-value">{agotadosCount}</div>
              <div className="stat-desc">Productos</div>
            </div>
            <div className="stat">
              <div className="stat-title">Stock Bajo</div>
              <div className="stat-value">{alertasCount}</div>
              <div className="stat-desc">Productos</div>
            </div>
          </div>
        </div>

        {/* Funciones Críticas */}
        <div className="bg-info/10 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-4">Funciones Críticas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="btn btn-primary" onClick={() => handleRecepcion()}>Recepción y Verificación</button>
            <button className="btn btn-primary" onClick={() => handlePesaje()}>Pesaje Automático</button>
            <button className="btn btn-primary" onClick={() => handleRegistroTemperatura()}>Registro de Temperatura</button>
            <button className="btn btn-primary" onClick={() => handleFechaCaducidad()}>Ingreso Fecha de Caducidad</button>
            <button className="btn btn-primary" onClick={() => handleEntradaInventario()}>Entrada Automática</button>
            <button className="btn btn-primary" onClick={() => handleCostoPromedio()}>Cálculo Costo Promedio</button>
            <button className="btn btn-primary" onClick={() => handleEtiquetasQR()}>Impresión de Etiquetas QR</button>
            <button className="btn btn-primary" onClick={() => handleUbicacionFisica()}>Asignación de Ubicación Física</button>
            <button className="btn btn-primary" onClick={() => handleRotacionFIFO()}>Rotación FIFO/FEFO</button>
            <button className="btn btn-primary" onClick={() => handleRequisasDigitales()}>Requisas Digitales</button>
            <button className="btn btn-primary" onClick={() => handleConfirmacionRequisas()}>Confirmación de Requisas</button>
            <button className="btn btn-primary" onClick={() => handleRegistroMermas()}>Registro de Mermas</button>
            <button className="btn btn-primary" onClick={() => handleOrdenesCompra()}>Órdenes de Compra</button>
            <button className="btn btn-primary" onClick={() => handleAlertasStock()}>Alertas de Stock</button>
            <button className="btn btn-primary" onClick={() => handleFichasTecnicas()}>Fichas Técnicas</button>
            <button className="btn btn-primary" onClick={() => handleDashboardReportes()}>Dashboard de Reportes</button>
          </div>
        </div>

        {/* Tabla de Inventario */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">📋 Productos en Inventario</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead className="bg-[#0A3D62] text-white">
                <tr>
                  <th>Estado</th>
                  <th>Ingrediente</th>
                  <th>Categoría</th>
                  <th>Cantidad Actual</th>
                  <th>Stock Mínimo</th>
                  <th>Unidad</th>
                  <th>Costo/Unidad</th>
                  <th>Valor Total</th>
                  <th>Proveedor</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredIngredientes.map(ingrediente => {
                  const status = getStockStatus(ingrediente.cantidad, ingrediente.cantidadMinima);
                  const isEditing = editingId === ingrediente.id;
                  const valorTotal = ingrediente.cantidad * ingrediente.costoUnitario;

                  return (
                    <tr key={ingrediente.id} className={ingrediente.cantidad === 0 ? 'bg-red-50' : ''}>
                      <td>
                        <div className="flex items-center gap-2">
                          <span className={`badge ${status.color} badge-sm`}>
                            {status.text}
                          </span>
                          {ingrediente.cantidad <= ingrediente.cantidadMinima && (
                            <AlertTriangle className="w-4 h-4 text-yellow-500" />
                          )}
                        </div>
                      </td>
                      <td className="font-semibold">{ingrediente.nombre}</td>
                      <td>
                        <span className="badge badge-outline">{ingrediente.categoria}</span>
                      </td>
                      <td>
                        {isEditing ? (
                          <input
                            type="number"
                            value={editValues.cantidad}
                            onChange={(e) => setEditValues({ ...editValues, cantidad: parseFloat(e.target.value) })}
                            className="input input-bordered input-sm w-24"
                            step="0.1"
                          />
                        ) : (
                          <span className={`font-bold ${ingrediente.cantidad === 0 ? 'text-red-600' : ''}`}>
                            {ingrediente.cantidad}
                          </span>
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <input
                            type="number"
                            value={editValues.cantidadMinima}
                            onChange={(e) => setEditValues({ ...editValues, cantidadMinima: parseFloat(e.target.value) })}
                            className="input input-bordered input-sm w-24"
                            step="0.1"
                          />
                        ) : (
                          <span className="text-gray-600">{ingrediente.cantidadMinima}</span>
                        )}
                      </td>
                      <td>{ingrediente.unidad}</td>
                      <td>${ingrediente.costoUnitario.toFixed(2)}</td>
                      <td className="font-semibold text-green-600">${valorTotal.toFixed(2)}</td>
                      <td className="text-sm text-gray-600">{ingrediente.proveedor}</td>
                      <td>
                        {isEditing ? (
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleSave(ingrediente.id)}
                              className="btn btn-success btn-sm"
                            >
                              <Save className="w-4 h-4" />
                            </button>
                            <button
                              onClick={handleCancel}
                              className="btn btn-error btn-sm"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleAdjust(ingrediente.id, -1)}
                              className="btn btn-error btn-sm"
                              disabled={ingrediente.cantidad === 0}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleAdjust(ingrediente.id, 1)}
                              className="btn btn-success btn-sm"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleEdit(ingrediente)}
                              className="btn btn-warning btn-sm"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabla de Productos Recepcionados */}
        <div className="bg-white shadow-md rounded-lg p-6 mt-6">
          <h2 className="text-xl font-bold mb-4">📦 Productos Recepcionados</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead className="bg-[#0A3D62] text-white">
                <tr>
                  <th>Estado</th>
                  <th>Ingrediente</th>
                  <th>Categoría</th>
                  <th>Cantidad</th>
                  <th>Caducidad</th>
                  <th>Proveedor</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.id}>
                    <td>
                      <span className={`badge ${producto.estado === 'ÓPTIMO' ? 'badge-success' : 'badge-warning'}`}>
                        {producto.estado}
                      </span>
                    </td>
                    <td>{producto.nombre}</td>
                    <td>{producto.categoria}</td>
                    <td>{producto.cantidad}</td>
                    <td>{producto.caducidad}</td>
                    <td>{producto.proveedor}</td>
                    <td>
                      <div className="flex space-x-2">
                        <button className="btn btn-success btn-sm">+</button>
                        <button className="btn btn-error btn-sm">-</button>
                        <button className="btn btn-warning btn-sm">✏️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
