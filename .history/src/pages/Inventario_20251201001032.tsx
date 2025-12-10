import { useState, useEffect } from 'react';
import { Package } from 'lucide-react';
import Modal from '../components/Modal';
import jsPDF from 'jspdf';
import JsBarcode from 'jsbarcode';

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

// ...existing code...

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
          {ingredientes.filter(ing => ing.cantidad === 0).length > 0 && (
            <div className="bg-red-500 px-4 py-2 rounded-lg">
              <p className="text-sm">AGOTADOS</p>
              <p className="text-2xl font-bold">{ingredientes.filter(ing => ing.cantidad === 0).length}</p>
            </div>
          )}
          {ingredientes.filter(ing => ing.cantidad <= ing.cantidadMinima).length > 0 && (
            <div className="bg-yellow-500 px-4 py-2 rounded-lg">
              <p className="text-sm">STOCK BAJO</p>
              <p className="text-2xl font-bold">{ingredientes.filter(ing => ing.cantidad <= ing.cantidadMinima).length}</p>
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
            <div className="stat-value">{ingredientes.filter(ing => ing.cantidad === 0).length}</div>
            <div className="stat-desc">Productos</div>
          </div>
          <div className="stat">
            <div className="stat-title">Stock Bajo</div>
            <div className="stat-value">{ingredientes.filter(ing => ing.cantidad <= ing.cantidadMinima).length}</div>
            <div className="stat-desc">Productos</div>
          </div>
        </div>
      </div>

      {/* Funciones Críticas */}
      <div className="bg-info/10 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-bold mb-4">Funciones Críticas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="btn btn-primary" onClick={() => setRecepcionModalOpen(true)}>Recepción y Verificación</button>
          <button className="btn btn-primary" onClick={() => handlePesaje()}>Pesaje Automático</button>
          <button className="btn btn-primary" onClick={() => setCostoPromedioModalOpen(true)}>Cálculo Costo Promedio</button>
          <button className="btn btn-primary" onClick={() => handleEtiquetasQR()}>Impresión de Etiquetas QR</button>
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
                <th>ID</th>
                <th>Ingrediente</th>
                <th>Categoría</th>
                <th>Cantidad Actual</th>
                <th>Proveedor</th>
                <th>Unidad</th>
              </tr>
            </thead>
            <tbody>
              {ingredientes.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.id}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.categoria}</td>
                  <td>{producto.cantidad}</td>
                  <td>{producto.proveedor}</td>
                  <td>{producto.unidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
        <h2 className="text-xl font-bold mb-4">📜 Historial de Mermas</h2>
        <ul className="list-disc pl-5">
          {mermas.map((merma) => (
            <li key={merma.id} className="mb-2">
              <span className="font-semibold">{merma.nombreIngrediente}</span> ({merma.cantidad} {merma.unidad}) - {merma.razon} <br />
              <span className="text-xs text-gray-500">{new Date(merma.fecha).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);
            <h2 className="text-xl font-bold mb-4">📜 Historial de Mermas</h2>
            <ul className="list-disc pl-5">
              {mermas.map((merma) => (
                <li key={merma.id} className="mb-2">
                  <span className="font-semibold">{merma.nombreIngrediente}</span> ({merma.cantidad} {merma.unidad}) - {merma.razon} <br />
                  <span className="text-xs text-gray-500">{new Date(merma.fecha).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </div>
        {/* Cierre correcto de todos los divs abiertos */}
        </div>
      );
    }

    export default Inventario;
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
              <div className="stat-value">{ingredientes.filter(ing => ing.cantidad === 0).length}</div>
              <div className="stat-desc">Productos</div>
            </div>
            <div className="stat">
              <div className="stat-title">Stock Bajo</div>
              <div className="stat-value">{ingredientes.filter(ing => ing.cantidad <= ing.cantidadMinima).length}</div>
              <div className="stat-desc">Productos</div>
            </div>
          </div>
        </div>

        {/* Funciones Críticas */}
        <div className="bg-info/10 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-4">Funciones Críticas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="btn btn-primary" onClick={() => setRecepcionModalOpen(true)}>Recepción y Verificación</button>
            <button className="btn btn-primary" onClick={() => handlePesaje()}>Pesaje Automático</button>
            <button className="btn btn-primary" onClick={() => setCostoPromedioModalOpen(true)}>Cálculo Costo Promedio</button>
            <button className="btn btn-primary" onClick={() => handleEtiquetasQR()}>Impresión de Etiquetas QR</button>
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
                  <th>ID</th>
                  <th>Ingrediente</th>
                  <th>Categoría</th>
                  <th>Cantidad Actual</th>
                  <th>Proveedor</th>
                  <th>Unidad</th>
                </tr>
              </thead>
              <tbody>
                {ingredientes.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.id}</td>
                    <td>{producto.nombre}</td>
                    <td>{producto.categoria}</td>
                    <td>{producto.cantidad}</td>
                    <td>{producto.proveedor}</td>
                    <td>{producto.unidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

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
        <h2 className="text-xl font-bold mb-4">📜 Historial de Mermas</h2>
        <ul className="list-disc pl-5">
          {mermas.map((merma) => (
            <li key={merma.id} className="mb-2">
              <span className="font-semibold">{merma.nombreIngrediente}</span> ({merma.cantidad} {merma.unidad}) - {merma.razon} <br />
              <span className="text-xs text-gray-500">{new Date(merma.fecha).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Inventario;
