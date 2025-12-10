import { useState } from 'react';
import { Package, AlertTriangle, CheckCircle, XCircle, Search } from 'lucide-react';

interface IngredienteSimple {
  id: string;
  nombre: string;
  categoria: string;
  cantidad: number;
  unidad: string;
  cantidadMinima: number;
  disponible: boolean;
}

// Datos mock (se sincronizarán con la API real)
const ingredientesDisponibilidadMock: IngredienteSimple[] = [
  // PROTEÍNAS
  { id: '1', nombre: 'Camarón U15', categoria: 'PROTEINA', cantidad: 25, unidad: 'kg', cantidadMinima: 5, disponible: true },
  { id: '2', nombre: 'Camarón U21', categoria: 'PROTEINA', cantidad: 30, unidad: 'kg', cantidadMinima: 8, disponible: true },
  { id: '3', nombre: 'Pulpo Español', categoria: 'PROTEINA', cantidad: 15, unidad: 'kg', cantidadMinima: 3, disponible: true },
  { id: '4', nombre: 'Filete de Robalo', categoria: 'PROTEINA', cantidad: 20, unidad: 'kg', cantidadMinima: 5, disponible: true },
  { id: '5', nombre: 'Mojarra', categoria: 'PROTEINA', cantidad: 25, unidad: 'kg', cantidadMinima: 10, disponible: true },
  { id: '6', nombre: 'Huachinango', categoria: 'PROTEINA', cantidad: 3, unidad: 'kg', cantidadMinima: 3, disponible: true },
  { id: '7', nombre: 'Jaiba', categoria: 'PROTEINA', cantidad: 10, unidad: 'kg', cantidadMinima: 3, disponible: true },
  { id: '8', nombre: 'Ostiones', categoria: 'PROTEINA', cantidad: 8, unidad: 'kg', cantidadMinima: 2, disponible: true },
  { id: '9', nombre: 'Arrachera', categoria: 'PROTEINA', cantidad: 8, unidad: 'kg', cantidadMinima: 2, disponible: true },
  { id: '10', nombre: 'Pechuga de Pollo', categoria: 'PROTEINA', cantidad: 15, unidad: 'kg', cantidadMinima: 5, disponible: true },
  { id: '11', nombre: 'Tocino', categoria: 'PROTEINA', cantidad: 2, unidad: 'kg', cantidadMinima: 2, disponible: true },
  
  // BEBIDAS
  { id: '34', nombre: 'Coca-Cola 600ml', categoria: 'BEBIDA', cantidad: 200, unidad: 'pzas', cantidadMinima: 50, disponible: true },
  { id: '35', nombre: 'Cerveza Corona', categoria: 'BEBIDA', cantidad: 150, unidad: 'pzas', cantidadMinima: 30, disponible: true },
  { id: '36', nombre: 'Agua Mineral', categoria: 'BEBIDA', cantidad: 100, unidad: 'pzas', cantidadMinima: 30, disponible: true },
  { id: '37', nombre: 'Jugo de Naranja', categoria: 'BEBIDA', cantidad: 20, unidad: 'L', cantidadMinima: 5, disponible: true },
];

interface InventarioQuickViewProps {
  onClose?: () => void;
}

export default function InventarioQuickView({ onClose }: InventarioQuickViewProps) {
  const [ingredientes, setIngredientes] = useState<IngredienteSimple[]>(ingredientesDisponibilidadMock);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState<string>('TODAS');

  const filteredIngredientes = ingredientes.filter(ing => {
    const matchSearch = ing.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategoria = filtroCategoria === 'TODAS' || ing.categoria === filtroCategoria;
    return matchSearch && matchCategoria;
  });

  const getStatusIcon = (cantidad: number, minimo: number) => {
    if (cantidad === 0) return <XCircle className="w-5 h-5 text-error" />;
    if (cantidad <= minimo) return <AlertTriangle className="w-5 h-5 text-warning" />;
    return <CheckCircle className="w-5 h-5 text-success" />;
  };

  const getStatusText = (cantidad: number, minimo: number) => {
    if (cantidad === 0) return { text: 'AGOTADO', color: 'text-error' };
    if (cantidad <= minimo) return { text: 'BAJO', color: 'text-warning' };
    return { text: 'DISPONIBLE', color: 'text-success' };
  };

  const agotados = ingredientes.filter(ing => ing.cantidad === 0);
  const bajo = ingredientes.filter(ing => ing.cantidad > 0 && ing.cantidad <= ing.cantidadMinima);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-primary">
        <div className="flex items-center gap-3">
          <Package className="w-8 h-8 text-primary" />
          <div>
            <h2 className="text-2xl font-bold text-primary">Disponibilidad de Inventario</h2>
            <p className="text-sm text-gray-600">Consulta rápida de ingredientes y bebidas</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="btn btn-ghost btn-sm">
            ✕
          </button>
        )}
      </div>

      {/* Alertas */}
      {(agotados.length > 0 || bajo.length > 0) && (
        <div className="alert alert-warning mb-6">
          <AlertTriangle className="w-6 h-6" />
          <div>
            <div className="font-bold">⚠️ Alertas de Inventario</div>
            <div className="text-sm">
              {agotados.length > 0 && <span>{agotados.length} ingredientes agotados. </span>}
              {bajo.length > 0 && <span>{bajo.length} ingredientes con stock bajo.</span>}
            </div>
          </div>
        </div>
      )}

      {/* Controles */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Búsqueda */}
        <div className="flex-1 min-w-[250px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar ingrediente o bebida..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered w-full pl-10"
            />
          </div>
        </div>

        {/* Filtro */}
        <select
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
          className="select select-bordered"
        >
          <option value="TODAS">Todas las categorías</option>
          <option value="PROTEINA">Proteínas</option>
          <option value="BEBIDA">Bebidas</option>
          <option value="VERDURA">Verduras</option>
          <option value="CONDIMENTO">Condimentos</option>
          <option value="LACTEO">Lácteos</option>
        </select>
      </div>

      {/* Tabla de disponibilidad */}
      <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
        <table className="table table-zebra w-full">
          <thead className="sticky top-0 bg-base-200 z-10">
            <tr>
              <th>Estado</th>
              <th>Ingrediente</th>
              <th>Categoría</th>
              <th>Cantidad Disponible</th>
              <th>Unidad</th>
            </tr>
          </thead>
          <tbody>
            {filteredIngredientes.map(ingrediente => {
              const status = getStatusText(ingrediente.cantidad, ingrediente.cantidadMinima);
              return (
                <tr key={ingrediente.id} className={ingrediente.cantidad === 0 ? 'bg-red-50' : ''}>
                  <td>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(ingrediente.cantidad, ingrediente.cantidadMinima)}
                      <span className={`font-semibold ${status.color}`}>
                        {status.text}
                      </span>
                    </div>
                  </td>
                  <td className="font-bold">{ingrediente.nombre}</td>
                  <td>
                    <span className="badge badge-outline badge-sm">
                      {ingrediente.categoria}
                    </span>
                  </td>
                  <td>
                    <span className={`font-bold ${ingrediente.cantidad === 0 ? 'text-error' : ingrediente.cantidad <= ingrediente.cantidadMinima ? 'text-warning' : 'text-success'}`}>
                      {ingrediente.cantidad}
                    </span>
                  </td>
                  <td>{ingrediente.unidad}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredIngredientes.length === 0 && (
        <div className="text-center py-10">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No se encontraron ingredientes</p>
        </div>
      )}

      {/* Resumen rápido */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
        <div className="stat bg-success/10 rounded-lg p-4">
          <div className="stat-title text-sm">Disponibles</div>
          <div className="stat-value text-2xl text-success">
            {ingredientes.filter(ing => ing.cantidad > ing.cantidadMinima).length}
          </div>
        </div>
        <div className="stat bg-warning/10 rounded-lg p-4">
          <div className="stat-title text-sm">Stock Bajo</div>
          <div className="stat-value text-2xl text-warning">
            {bajo.length}
          </div>
        </div>
        <div className="stat bg-error/10 rounded-lg p-4">
          <div className="stat-title text-sm">Agotados</div>
          <div className="stat-value text-2xl text-error">
            {agotados.length}
          </div>
        </div>
      </div>
    </div>
  );
}
