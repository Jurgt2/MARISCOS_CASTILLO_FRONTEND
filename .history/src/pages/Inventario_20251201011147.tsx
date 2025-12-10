import { useState } from 'react';
import { Package } from 'lucide-react';
import Modal from '../components/Modal';

function Inventario() {
  // Estados principales
  const [ingredientes, setIngredientes] = useState([
    { id: 'ING01', nombre: 'Camarón Grande', categoria: 'PROTEINA', unidad: 'kg', cantidad: 0, proveedor: '' },
    { id: 'ING02', nombre: 'Camarón Chico', categoria: 'PROTEINA', unidad: 'kg', cantidad: 0, proveedor: '' },
    { id: 'ING03', nombre: 'Pulpo Español', categoria: 'PROTEINA', unidad: 'kg', cantidad: 0, proveedor: '' },
    { id: 'ING04', nombre: 'Filete de Robalo', categoria: 'PROTEINA', unidad: 'kg', cantidad: 0, proveedor: '' },
    { id: 'ING05', nombre: 'Mojarra entera', categoria: 'PROTEINA', unidad: 'kg', cantidad: 0, proveedor: '' },
    { id: 'ING06', nombre: 'Huachinango', categoria: 'PROTEINA', unidad: 'kg', cantidad: 0, proveedor: '' },
    { id: 'ING07', nombre: 'Jaiba viva', categoria: 'PROTEINA', unidad: 'kg', cantidad: 0, proveedor: '' },
    { id: 'ING08', nombre: 'Ostiones en concha', categoria: 'PROTEINA', unidad: 'kg', cantidad: 0, proveedor: '' },
    { id: 'ING09', nombre: 'Callo de hacha', categoria: 'PROTEINA', unidad: 'kg', cantidad: 0, proveedor: '' },
    { id: 'ING10', nombre: 'Sierra', categoria: 'PROTEINA', unidad: 'kg', cantidad: 0, proveedor: '' },
    { id: 'ING11', nombre: 'Arrachera marinada', categoria: 'PROTEINA', unidad: 'kg', cantidad: 0, proveedor: '' },
    { id: 'ING12', nombre: 'Pechuga de pollo', categoria: 'PROTEINA', unidad: 'kg', cantidad: 0, proveedor: '' },
    { id: 'ING13', nombre: 'Tocino', categoria: 'PROTEINA', unidad: 'kg', cantidad: 0, proveedor: '' },
    { id: 'ING14', nombre: 'Tomate saladet', categoria: 'VERDURA', unidad: 'kg', cantidad: 0, proveedor: '' },
    { id: 'ING15', nombre: 'Cebolla blanca', categoria: 'VERDURA', unidad: 'kg', cantidad: 0, proveedor: '' },
    { id: 'ING16', nombre: 'Ajo', categoria: 'VERDURA', unidad: 'kg', cantidad: 0, proveedor: '' },
    { id: 'ING17', nombre: 'Chile serrano', categoria: 'VERDURA', unidad: 'kg', cantidad: 0, proveedor: '' },
    { id: 'ING18', nombre: 'Cilantro', categoria: 'VERDURA', unidad: 'manojos', cantidad: 0, proveedor: '' },
    { id: 'ING19', nombre: 'Aguacate Hass', categoria: 'VERDURA', unidad: 'kg', cantidad: 0, proveedor: '' },
    { id: 'ING20', nombre: 'Limón', categoria: 'VERDURA', unidad: 'kg', cantidad: 0, proveedor: '' },
    { id: 'ING21', nombre: 'Pepino', categoria: 'VERDURA', unidad: 'kg', cantidad: 0, proveedor: '' },
    { id: 'ING22', nombre: 'Pimiento morrón rojo', categoria: 'VERDURA', unidad: 'kg', cantidad: 0, proveedor: '' },
    { id: 'ING23', nombre: 'Lechuga orejona', categoria: 'VERDURA', unidad: 'kg', cantidad: 0, proveedor: '' },
    { id: 'ING24', nombre: 'Jitomate', categoria: 'VERDURA', unidad: 'kg', cantidad: 0, proveedor: '' },
    { id: 'ING25', nombre: 'Chile guajillo', categoria: 'CONDIMENTO', unidad: 'kg', cantidad: 0, proveedor: '' },
    { id: 'ING26', nombre: 'Chile de árbol', categoria: 'CONDIMENTO', unidad: 'kg', cantidad: 0, proveedor: '' },
    { id: 'ING27', nombre: 'Chipotle en adobo', categoria: 'CONDIMENTO', unidad: 'kg', cantidad: 0, proveedor: '' },
    { id: 'ING28', nombre: 'Sal de grano', categoria: 'CONDIMENTO', unidad: 'kg', cantidad: 0, proveedor: '' },
    { id: 'ING29', nombre: 'Pimienta negra molida', categoria: 'CONDIMENTO', unidad: 'kg', cantidad: 0, proveedor: '' },
    { id: 'ING30', nombre: 'Orégano', categoria: 'CONDIMENTO', unidad: 'kg', cantidad: 0, proveedor: '' },
    { id: 'ING31', nombre: 'Comino molido', categoria: 'CONDIMENTO', unidad: 'kg', cantidad: 0, proveedor: '' },
    { id: 'ING32', nombre: 'Queso manchego rallado', categoria: 'LACTEO', unidad: 'kg', cantidad: 0, proveedor: '' },
    { id: 'ING33', nombre: 'Crema ácida', categoria: 'LACTEO', unidad: 'L', cantidad: 0, proveedor: '' },
    { id: 'ING34', nombre: 'Mantequilla sin sal', categoria: 'LACTEO', unidad: 'kg', cantidad: 0, proveedor: '' },
    { id: 'ING35', nombre: 'Queso panela', categoria: 'LACTEO', unidad: 'kg', cantidad: 0, proveedor: '' },
    { id: 'ING36', nombre: 'Arroz blanco', categoria: 'GRANOS', unidad: 'kg', cantidad: 0, proveedor: '' },
    { id: 'ING37', nombre: 'Harina de trigo', categoria: 'GRANOS', unidad: 'kg', cantidad: 0, proveedor: '' },
    { id: 'ING38', nombre: 'Pan molido', categoria: 'GRANOS', unidad: 'kg', cantidad: 0, proveedor: '' },
    { id: 'ING39', nombre: 'Tortilla de maíz (saco 50 kg)', categoria: 'GRANOS', unidad: 'kg', cantidad: 0, proveedor: '' },
    { id: 'ING40', nombre: 'Aceite vegetal', categoria: 'ACEITE', unidad: 'L', cantidad: 0, proveedor: '' },
    { id: 'ING41', nombre: 'Aceite de oliva extra virgen', categoria: 'ACEITE', unidad: 'L', cantidad: 0, proveedor: '' },
    { id: 'ING42', nombre: 'Coca-Cola 600 ml', categoria: 'BEBIDA', unidad: 'pzas', cantidad: 0, proveedor: '' },
    { id: 'ING43', nombre: 'Cerveza Corona 355 ml', categoria: 'BEBIDA', unidad: 'pzas', cantidad: 0, proveedor: '' },
    { id: 'ING44', nombre: 'Agua mineral 1 L', categoria: 'BEBIDA', unidad: 'pzas', cantidad: 0, proveedor: '' },
    { id: 'ING45', nombre: 'Jugo de naranja natural', categoria: 'BEBIDA', unidad: 'L', cantidad: 0, proveedor: '' },
    { id: 'ING46', nombre: 'Tequila (cocina)', categoria: 'BEBIDA', unidad: 'L', cantidad: 0, proveedor: '' },
    { id: 'ING47', nombre: 'Clamato', categoria: 'BEBIDA', unidad: 'L', cantidad: 0, proveedor: '' },
    { id: 'ING48', nombre: 'Salsa inglesa', categoria: 'CONDIMENTO', unidad: 'L', cantidad: 0, proveedor: '' },
    { id: 'ING49', nombre: 'Salsa valentina', categoria: 'CONDIMENTO', unidad: 'L', cantidad: 0, proveedor: '' },
    { id: 'ING50', nombre: 'Mayonesa', categoria: 'CONDIMENTO', unidad: 'kg', cantidad: 0, proveedor: '' },
    { id: 'ING51', nombre: 'Catsup', categoria: 'CONDIMENTO', unidad: 'kg', cantidad: 0, proveedor: '' },
    { id: 'ING52', nombre: 'Mostaza', categoria: 'CONDIMENTO', unidad: 'kg', cantidad: 0, proveedor: '' },
    { id: 'ING53', nombre: 'Vinagre blanco', categoria: 'CONDIMENTO', unidad: 'L', cantidad: 0, proveedor: '' },
    { id: 'ING54', nombre: 'Hojas de laurel', categoria: 'CONDIMENTO', unidad: 'kg', cantidad: 0, proveedor: '' },
    { id: 'ING55', nombre: 'Consomé de camarón', categoria: 'CONDIMENTO', unidad: 'kg', cantidad: 0, proveedor: '' },
    { id: 'ING56', nombre: 'Caldo de pollo en polvo', categoria: 'CONDIMENTO', unidad: 'kg', cantidad: 0, proveedor: '' },
    { id: 'ING57', nombre: 'Papel aluminio', categoria: 'DESCARTABLE', unidad: 'rollos', cantidad: 0, proveedor: '' },
    { id: 'ING58', nombre: 'Servilletas', categoria: 'DESCARTABLE', unidad: 'paquetes', cantidad: 0, proveedor: '' },
    { id: 'ING59', nombre: 'Bolsas térmicas', categoria: 'DESCARTABLE', unidad: 'pzas', cantidad: 0, proveedor: '' },
    { id: 'ING60', nombre: 'Guantes látex', categoria: 'LIMPIEZA', unidad: 'cajas', cantidad: 0, proveedor: '' },
    { id: 'ING61', nombre: 'Jabón líquido', categoria: 'LIMPIEZA', unidad: 'L', cantidad: 0, proveedor: '' },
    { id: 'ING62', nombre: 'Cloro', categoria: 'LIMPIEZA', unidad: 'L', cantidad: 0, proveedor: '' },
    { id: 'ING63', nombre: 'Servitoallas', categoria: 'LIMPIEZA', unidad: 'rollos', cantidad: 0, proveedor: '' },
    { id: 'ING64', nombre: 'Esponjas', categoria: 'LIMPIEZA', unidad: 'pzas', cantidad: 0, proveedor: '' },
    { id: 'ING65', nombre: 'Limpiador multiusos', categoria: 'LIMPIEZA', unidad: 'L', cantidad: 0, proveedor: '' },
    { id: 'ING66', nombre: 'Bolsas de basura 100 L', categoria: 'LIMPIEZA', unidad: 'pzas', cantidad: 0, proveedor: '' },
    { id: 'ING67', nombre: 'Hielo en barra', categoria: 'CONGELADO', unidad: 'kg', cantidad: 0, proveedor: '' },
    { id: 'ING68', nombre: 'Hielo picado', categoria: 'CONGELADO', unidad: 'kg', cantidad: 0, proveedor: '' }
  ]);
  const [mermas] = useState([
    { id: '1', nombreIngrediente: 'Camarón', cantidad: 1, unidad: 'kg', razon: 'Descomposición', fecha: new Date().toISOString() }
  ]);
  const [isRecepcionModalOpen, setRecepcionModalOpen] = useState(false);
  const [isCostoPromedioModalOpen, setCostoPromedioModalOpen] = useState(false);
  const [costos] = useState([120, 200]);
  const [totalCostos] = useState(320);
  const [promedio] = useState(160);
  const [recepcionValues, setRecepcionValues] = useState({ id: '', cantidad: 0, costoTotal: 0, proveedor: '' });
  const [mermaForm, setMermaForm] = useState({ ingredienteId: '', cantidad: 0, razon: '' });

  // Handlers con acciones útiles para inventario
  const handlePesaje = () => {
    alert('Función de pesaje automático: conecta la balanza y registra el peso del producto.');
  };

  const handleEtiquetasQR = () => {
    alert('Función de impresión de etiquetas QR: genera y descarga la etiqueta para el producto seleccionado.');
  };

  const handleRegistroMermas = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    alert('Desplazado a la sección de registro de mermas.');
  };

  const handleOrdenesCompra = () => {
    alert('Función de órdenes de compra: genera una orden de compra para reabastecer inventario.');
  };

  const handleAlertasStock = () => {
    alert('Función de alertas de stock: muestra productos con bajo inventario.');
  };

  const handleFichasTecnicas = () => {
    alert('Función de fichas técnicas: muestra información detallada del producto.');
  };

  const handleDashboardReportes = () => {
    alert('Función de reportes: muestra reportes de inventario y movimientos.');
  };

  const handleRecepcionRegistro = () => {
    const idx = ingredientes.findIndex(i => i.id === recepcionValues.id);
    if (idx !== -1) {
      const updated = [...ingredientes];
      updated[idx].cantidad = (updated[idx].cantidad || 0) + recepcionValues.cantidad;
      updated[idx].proveedor = recepcionValues.proveedor || updated[idx].proveedor || '';
      setIngredientes(updated);
      alert('Recepción registrada correctamente.');
    } else {
      alert('ID de producto no encontrado.');
    }
    setRecepcionModalOpen(false);
  };

  const handleRegisterMerma = () => {
    alert('Merma registrada correctamente.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
  {/* Header y navegación eliminado por solicitud */}

  {/* Navegación secundaria eliminada por solicitud */}

      {/* Funciones Críticas con acciones */}
      <div className="bg-white shadow-md rounded-lg p-6 mt-6 mx-8">
        <h2 className="text-lg font-bold mb-4">Funciones Críticas</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <button
            className="bg-blue-100 px-4 py-2 rounded hover:bg-blue-200 transition"
            onClick={() => setRecepcionModalOpen(true)}
          >
            Recepción y Verificación
          </button>
          <button
            className="bg-blue-100 px-4 py-2 rounded hover:bg-blue-200 transition"
            onClick={() => alert('Función de registro de temperatura no implementada aún.')}
          >
            Registro de Temperatura
          </button>
          <button
            className="bg-blue-100 px-4 py-2 rounded hover:bg-blue-200 transition"
            onClick={() => setCostoPromedioModalOpen(true)}
          >
            Cálculo Costo Promedio
          </button>
          <button
            className="bg-blue-100 px-4 py-2 rounded hover:bg-blue-200 transition"
            onClick={handleEtiquetasQR}
          >
            Impresión de Etiquetas QR
          </button>
          <button
            className="bg-blue-100 px-4 py-2 rounded hover:bg-blue-200 transition"
            onClick={handleRegistroMermas}
          >
            Registro de Mermas
          </button>
          <button
            className="bg-blue-100 px-4 py-2 rounded hover:bg-blue-200 transition"
            onClick={handleOrdenesCompra}
          >
            Órdenes de Compra
          </button>
        </div>
      </div>

      {/* Tabla de Productos en Inventario */}
      <div className="bg-white shadow-md rounded-lg p-6 mt-6 mx-8">
        <h2 className="text-lg font-bold mb-4">📦 Productos en Inventario</h2>
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Ingrediente</th>
              <th className="px-4 py-2 text-left">Categoría</th>
              <th className="px-4 py-2 text-left">Cantidad Actual</th>
              <th className="px-4 py-2 text-left">Proveedor</th>
              <th className="px-4 py-2 text-left">Unidad</th>
            </tr>
          </thead>
          <tbody>
            {ingredientes.map((ingrediente) => (
              <tr key={ingrediente.id} className="border-b">
                <td className="px-4 py-2">{ingrediente.id}</td>
                <td className="px-4 py-2">{ingrediente.nombre}</td>
                <td className="px-4 py-2">{ingrediente.categoria}</td>
                <td className="px-4 py-2">{ingrediente.cantidad || 0}</td>
                <td className="px-4 py-2">{ingrediente.proveedor || ''}</td>
                <td className="px-4 py-2">{ingrediente.unidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ...existing code... (modales, formularios, historial de mermas) */}
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
            <label className="block text-sm font-medium">Proveedor</label>
            <input
              type="text"
              className="border rounded px-2 py-1 w-full"
              value={recepcionValues.proveedor}
              onChange={(e) => setRecepcionValues({ ...recepcionValues, proveedor: e.target.value })}
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
      <div className="bg-white shadow-md rounded-lg p-6 mt-6 mx-8">
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
      <div className="bg-white shadow-md rounded-lg p-6 mt-6 mx-8">
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
    </div>
  );
}

export default Inventario;
