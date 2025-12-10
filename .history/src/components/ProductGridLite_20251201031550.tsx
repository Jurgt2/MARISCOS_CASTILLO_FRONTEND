import { menuCompleto, Product } from '../data/menu';
import { useState } from 'react';
import { useOrderStore } from '../store/orderStore';
import toast from 'react-hot-toast';

import { Table } from '../store/orderStore';

export interface ProductGridLiteProps {
  productos?: Product[];
  selectedTables?: Table[];
}


  export function ProductGridLite({ productos, selectedTables }: ProductGridLiteProps) {
      const { currentTable, addItem } = useOrderStore();
      const [showNoteModal, setShowNoteModal] = useState(false);
      const [note, setNote] = useState('');
      const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
      const [quantity, setQuantity] = useState(1);
      const [selectedVariante, setSelectedVariante] = useState<string | null>(null);

      // Estado para la búsqueda de platillos
      const [search, setSearch] = useState('');


      const handleAdd = (product: Product) => {
        if (!selectedTables || selectedTables.length === 0) {
          toast.error('Selecciona una mesa primero');
          return;
        }
        setSelectedProduct(product);
        setNote('');
        setQuantity(1);
        setSelectedVariante(product.variantes && product.variantes.length > 0 ? product.variantes[0].nombre : null);
        setShowNoteModal(true);
      };

      const confirmAdd = () => {
        if (!selectedProduct || !currentTable) return;
        let finalPrice = selectedProduct.precio;
        let modifiers: string[] = [];
        if (selectedProduct.variantes && selectedVariante) {
          const varianteObj = selectedProduct.variantes.find(v => v.nombre === selectedVariante);
          if (varianteObj) {
            finalPrice = varianteObj.precio;
            modifiers.push(selectedVariante);
          }
        }
        addItem({
          product: {
            id: selectedProduct.id,
            name: selectedProduct.nombre,
            category: selectedProduct.categoria,
            price: finalPrice,
            image: selectedProduct.imagen || '',
            available: selectedProduct.disponible
          },
          quantity,
          modifiers,
          notes: note,
          subtotal: finalPrice * quantity
        });
        toast.success(`${selectedProduct.nombre} agregado`);
        setShowNoteModal(false);
        setSelectedProduct(null);
        setNote('');
        setQuantity(1);
        setSelectedVariante(null);
        // Mostrar automáticamente el apartado de cuenta y cobro
        if (typeof window !== 'undefined') {
          const billBtn = document.getElementById('btn-ver-cuenta-mesa');
          if (billBtn) billBtn.click();
        }
      };

      // Filtrar platillos por búsqueda
      const lista = (productos || menuCompleto).filter(product => {
        const texto = search.toLowerCase();
        return (
          product.nombre.toLowerCase().includes(texto) ||
          (product.descripcion && product.descripcion.toLowerCase().includes(texto))
        );
      });

      return (
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Menú Completo</h2>
          <input
            type="text"
            className="input input-bordered w-full mb-4"
            placeholder="Buscar platillo por nombre o descripción..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lista.map(product => (
              <div key={product.id} className="card bg-white shadow-md">
                <div className="card-body">
                  <h3 className="card-title">{product.nombre}</h3>
                  <p className="text-sm text-gray-600">{product.descripcion}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-2xl font-bold text-primary">${product.precio.toFixed(2)}</span>
                    <button onClick={() => handleAdd(product)} className="btn btn-primary btn-sm">Agregar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Modal para notas */}
          {showNoteModal && selectedProduct && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-bold mb-2">Agregar a la orden</h3>
                <p className="mb-2 text-primary font-semibold">{selectedProduct.nombre}</p>
                {/* Selección de variante si aplica */}
                {selectedProduct.variantes && selectedProduct.variantes.length > 0 && (
                  <div className="mb-3">
                    <label className="block text-sm font-semibold mb-1">Variante:</label>
                    <select
                      className="select select-bordered w-full"
                      value={selectedVariante || ''}
                      onChange={e => setSelectedVariante(e.target.value)}
                    >
                      {selectedProduct.variantes.map(v => (
                        <option key={v.nombre} value={v.nombre}>{v.nombre} (${v.precio})</option>
                      ))}
                    </select>
                  </div>
                )}
                {/* Selección de cantidad */}
                <div className="mb-3">
                  <label className="block text-sm font-semibold mb-1">Cantidad:</label>
                  <div className="flex items-center gap-2">
                    <button className="btn btn-xs btn-primary" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                    <span className="font-bold w-8 text-center">{quantity}</span>
                    <button className="btn btn-xs btn-primary" onClick={() => setQuantity(q => q + 1)}>+</button>
                  </div>
                </div>
                {/* Notas */}
                <textarea
                  className="textarea textarea-bordered w-full mb-4"
                  placeholder="Ejemplo: Sin cebolla, extra salsa, etc. (opcional)"
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  rows={3}
                />
                <div className="flex justify-end gap-2">
                  <button className="btn btn-ghost" onClick={() => setShowNoteModal(false)}>Cancelar</button>
                  <button className="btn btn-primary" onClick={confirmAdd}>Agregar</button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

