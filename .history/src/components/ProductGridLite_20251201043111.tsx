
import { menuCompleto, Product } from '../data/menu';
import { useState } from 'react';
import { useOrderStore } from '../store/orderStore';
import toast from 'react-hot-toast';

interface ProductGridLiteProps {
  productos?: Product[];
  selectedTables?: string[];
  onAddProduct?: (
    product: {
      id: string;
      name: string;
      category: string;
      price: number;
      image: string;
      available: boolean;
    },
    cantidad: number,
    notas: string,
    modifiers: string[]
  ) => void;
}

export function ProductGridLite({ productos, selectedTables }: ProductGridLiteProps) {
  const [search, setSearch] = useState('');
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [note, setNote] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedVariante, setSelectedVariante] = useState<string | null>(null);
  const { addItemToTable } = useOrderStore();
  const currentTable = selectedTables && selectedTables.length > 0 ? selectedTables[0] : null;
  // Si no se pasa onAddProduct, usar la función del store
  const safeOnAddProduct = typeof onAddProduct === 'function'
    ? onAddProduct
    : (product: Product, cantidad: number, notas: string, modifiers: string[]) => {
        if (currentTable) {
          addItemToTable(
            currentTable,
            {
              id: product.id,
              name: product.nombre,
              category: product.categoria,
              price: product.precio,
              image: product.imagen || '',
              available: product.disponible
            },
            cantidad,
            notas,
            modifiers
          );
          toast.success(`${product.nombre} agregado`);
        } else {
          toast.error('Selecciona una mesa primero');
        }
      };

  // Filtrar y ordenar platillos por búsqueda y categoría/nombre
  const lista = (productos || menuCompleto)
    .filter(product => {
      const texto = search.toLowerCase();
      return (
        product.nombre.toLowerCase().includes(texto) ||
        (product.categoria && product.categoria.toLowerCase().includes(texto)) ||
        (product.descripcion && product.descripcion.toLowerCase().includes(texto))
      );
    })
    .sort((a, b) => {
      if (a.categoria === b.categoria) {
        return a.nombre.localeCompare(b.nombre);
      }
      return a.categoria.localeCompare(b.categoria);
    });

  // Agrupar por categoría
  const categorias = Array.from(new Set(lista.map(p => p.categoria)));

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
    safeOnAddProduct(
      {
        id: selectedProduct.id,
        name: selectedProduct.nombre,
        category: selectedProduct.categoria,
        price: finalPrice,
        image: selectedProduct.imagen || '',
        available: selectedProduct.disponible
      },
      quantity,
      note,
      modifiers
    );
    setShowNoteModal(false);
    setSelectedProduct(null);
    setNote('');
    setQuantity(1);
    setSelectedVariante(null);
    // Mostrar automáticamente el modal de cobro
    if (typeof window !== 'undefined') {
      const ticketBtn = document.getElementById('btn-generar-ticket');
      if (ticketBtn) ticketBtn.click();
    }
  };

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
      <div className="space-y-8">
        {categorias.map(categoria => (
          <div key={categoria}>
            <h3 className="text-lg font-bold text-primary mb-2">{categoria}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {lista.filter(p => p.categoria === categoria).map(product => (
                <div key={product.id} className="card bg-white shadow-md hover:shadow-lg transition-all">
                  <div className="card-body flex flex-col items-center">
                    <div className="font-bold text-lg text-primary mb-2 text-center">{product.nombre}</div>
                    <div className="text-xs text-gray-500 mb-2 text-center">{product.descripcion}</div>
                    <div className="font-bold text-xl text-success mb-2">${product.precio.toFixed(2)}</div>
                    <button className="btn btn-primary w-full" onClick={() => handleAdd(product)}>Agregar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal para notas y variantes */}
      {showNoteModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold mb-2 text-primary">Agregar a la orden</h3>
            <div className="mb-3">
              <label className="block text-sm font-semibold mb-1">Cantidad:</label>
              <input
                type="number"
                className="input input-bordered w-full mb-2"
                min={1}
                value={quantity}
                onChange={e => setQuantity(Number(e.target.value))}
              />
            </div>
            {selectedProduct.variantes && selectedProduct.variantes.length > 0 && (
              <div className="mb-3">
                <label className="block text-sm font-semibold mb-1">Variante:</label>
                <select
                  className="select select-bordered w-full"
                  value={selectedVariante || ''}
                  onChange={e => setSelectedVariante(e.target.value)}
                >
                  {selectedProduct.variantes.map(v => (
                    <option key={v.nombre} value={v.nombre}>
                      {v.nombre} (${v.precio.toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="mb-3">
              <label className="block text-sm font-semibold mb-1">Notas:</label>
              <textarea
                className="textarea textarea-bordered w-full"
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="Notas especiales, alergias, etc."
              ></textarea>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button className="btn btn-ghost" onClick={() => setShowNoteModal(false)}>Cancelar</button>
              <button className="btn btn-success" onClick={confirmAdd}>Agregar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

