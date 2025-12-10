import { useState, useEffect } from 'react';
import { Package, AlertTriangle, Plus, Minus, Edit2, Save, X, Search } from 'lucide-react';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [categoriaFilter, setCategoriaFilter] = useState<string>('TODAS');
  const [showOnlyLow, setShowOnlyLow] = useState(false);

  useEffect(() => {
    let filtered = ingredientes;

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(ing =>
        ing.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ing.proveedor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por categoría
    if (categoriaFilter !== 'TODAS') {
      filtered = filtered.filter(ing => ing.categoria === categoriaFilter);
    }

    // Filtrar solo stock bajo
    if (showOnlyLow) {
      filtered = filtered.filter(ing => ing.cantidad <= ing.cantidadMinima);
    }

    setFilteredIngredientes(filtered);
  }, [searchTerm, categoriaFilter, showOnlyLow, ingredientes]);

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

  const categorias = ['TODAS', 'PROTEINA', 'VERDURA', 'CONDIMENTO', 'LACTEO', 'GRANOS', 'ACEITE', 'BEBIDA'];

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

      {/* Controles de búsqueda y filtros */}
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Búsqueda */}
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar ingrediente o proveedor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input input-bordered w-full pl-10"
                />
              </div>
            </div>

            {/* Filtro por categoría */}
            <select
              value={categoriaFilter}
              onChange={(e) => setCategoriaFilter(e.target.value)}
              className="select select-bordered"
            >
              {categorias.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {/* Toggle stock bajo */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showOnlyLow}
                onChange={(e) => setShowOnlyLow(e.target.checked)}
                className="checkbox checkbox-warning"
              />
              <span className="font-medium">Solo stock bajo</span>
            </label>
          </div>
        </div>

        {/* Tabla de inventario */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
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

        {/* Resumen */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="stat bg-white shadow rounded-lg">
            <div className="stat-title">Total Ingredientes</div>
            <div className="stat-value text-primary">{ingredientes.length}</div>
          </div>
          <div className="stat bg-white shadow rounded-lg">
            <div className="stat-title">Valor Total Inventario</div>
            <div className="stat-value text-success">
              ${ingredientes.reduce((sum, ing) => sum + (ing.cantidad * ing.costoUnitario), 0).toFixed(2)}
            </div>
          </div>
          <div className="stat bg-white shadow rounded-lg">
            <div className="stat-title">Stock Bajo</div>
            <div className="stat-value text-warning">{alertasCount}</div>
          </div>
          <div className="stat bg-white shadow rounded-lg">
            <div className="stat-title">Agotados</div>
            <div className="stat-value text-error">{agotadosCount}</div>
          </div>
        </div>

        {/* Botón Hola */}
        <div className="flex justify-end mt-4">
          <button className="btn btn-primary">Hola</button>
        </div>
      </div>
    </div>
  );
}
