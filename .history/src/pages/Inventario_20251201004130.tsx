import { useState } from 'react';
import { Package } from 'lucide-react';
import Modal from '../components/Modal';

function Inventario() {
  // Estados principales
  const [ingredientes] = useState([
    { id: '1', nombre: 'Camarón', categoria: 'PROTEINA', cantidad: 10, unidad: 'kg', cantidadMinima: 5, costoUnitario: 120, proveedor: 'Proveedor A', ultimaActualizacion: new Date().toISOString() },
    { id: '2', nombre: 'Pulpo', categoria: 'PROTEINA', cantidad: 3, unidad: 'kg', cantidadMinima: 2, costoUnitario: 200, proveedor: 'Proveedor B', ultimaActualizacion: new Date().toISOString() }
  ]);
  const [mermas] = useState([
    { id: '1', nombreIngrediente: 'Camarón', cantidad: 1, unidad: 'kg', razon: 'Descomposición', fecha: new Date().toISOString() }
  ]);
  const [isRecepcionModalOpen, setRecepcionModalOpen] = useState(false);
  const [isCostoPromedioModalOpen, setCostoPromedioModalOpen] = useState(false);
  const [costos] = useState([120, 200]);
  const [totalCostos] = useState(320);
  const [promedio] = useState(160);
  const [recepcionValues, setRecepcionValues] = useState({ id: '', cantidad: 0, costoTotal: 0 });
  const [mermaForm, setMermaForm] = useState({ ingredienteId: '', cantidad: 0, razon: '' });

  // Handlers vacíos
  const handlePesaje = () => {};
  const handleEtiquetasQR = () => {};
  const handleRegistroMermas = () => {};
  const handleOrdenesCompra = () => {};
  const handleAlertasStock = () => {};
  const handleFichasTecnicas = () => {};
  const handleDashboardReportes = () => {};
  const handleRecepcionRegistro = () => {};
  const handleRegisterMerma = () => {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Aquí va el contenido completo del inventario */}
      {/* Puedes agregar aquí el header, resumen, funciones, tabla, modales, formularios y el historial de mermas, como en el bloque que ya tienes abajo */}

      {/* Cálculo Costo Promedio */}
      {isCostoPromedioModalOpen && (
        <Modal onClose={() => setCostoPromedioModalOpen(false)}>
          <h2 className="text-lg font-bold">Cálculo Costo Promedio</h2>
          <ul className="list-disc pl-5">
            {costos.map((costo, index) => (
              <li key={index}>Costo: ${costo.toFixed(2)}</li>
            ))}
          </ul>
          <p className="mt-4">Total Costos: ${totalCostos.toFixed(2)}</p>
          <p className="mt-2">Costo Promedio: ${promedio.toFixed(2)}</p>
        </Modal>
      )}

      {/* Modal de Recepción */}
      {isRecepcionModalOpen && (
        <Modal onClose={() => setRecepcionModalOpen(false)}>
          <h2 className="text-lg font-bold">Registrar Recepción</h2>
          <div className="mt-4">
            <label className="block text-sm font-medium">ID del Producto</label>
            <input
              type="text"
              className="border rounded px-2 py-1 w-full"
              value={recepcionValues.id}
              onChange={(e) => setRecepcionValues({ ...recepcionValues, id: e.target.value })}
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium">Cantidad</label>
            <input
              type="number"
              className="border rounded px-2 py-1 w-full"
              value={recepcionValues.cantidad}
              onChange={(e) => setRecepcionValues({ ...recepcionValues, cantidad: parseInt(e.target.value) })}
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium">Costo Total (MXN)</label>
            <input
              type="number"
              className="border rounded px-2 py-1 w-full"
              value={recepcionValues.costoTotal}
              onChange={(e) => setRecepcionValues({ ...recepcionValues, costoTotal: parseFloat(e.target.value) })}
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleRecepcionRegistro}
            >
              Registrar
            </button>
          </div>
        </Modal>
      )}

      {/* Registrar Merma */}
      <div className="bg-white shadow-md rounded-lg p-6 mt-6">
        <h2 className="text-xl font-bold mb-4">📉 Registrar Merma</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRegisterMerma();
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Ingrediente</label>
              <select
                value={mermaForm.ingredienteId}
                onChange={(e) => setMermaForm({ ...mermaForm, ingredienteId: e.target.value })}
                className="border rounded px-2 py-1 w-full"
              >
                <option value="">Seleccione un ingrediente</option>
                {ingredientes.map((ingrediente) => (
                  <option key={ingrediente.id} value={ingrediente.id}>
                    {ingrediente.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Cantidad</label>
              <input
                type="number"
                placeholder="Cantidad"
                value={mermaForm.cantidad}
                onChange={(e) => setMermaForm({ ...mermaForm, cantidad: parseFloat(e.target.value) })}
                className="border rounded px-2 py-1 w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Razón</label>
              <input
                type="text"
                placeholder="Razón"
                value={mermaForm.razon}
                onChange={(e) => setMermaForm({ ...mermaForm, razon: e.target.value })}
                className="border rounded px-2 py-1 w-full"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Registrar Merma
            </button>
          </div>
        </form>
      </div>

      {/* Historial de Mermas */}
      <div className="bg-white shadow-md rounded-lg p-6 mt-6">
          <>
            <h2 className="text-xl font-bold mb-4">📜 Historial de Mermas</h2>
            <ul className="list-disc pl-5">
              {mermas.map((merma) => (
                <li key={merma.id} className="mb-2">
                  <span className="font-semibold">{merma.nombreIngrediente}</span> ({merma.cantidad} {merma.unidad}) - {merma.razon} <br />
                  <span className="text-xs text-gray-500">{new Date(merma.fecha).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </>
    </div>
  );
}

  export default Inventario;

// ...existing code...
}

export default Inventario;
