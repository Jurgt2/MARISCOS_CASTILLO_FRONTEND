import { useOrderStore } from '../store/orderStore'
import toast from 'react-hot-toast'

const ProductGridSimple = () => {
  const { currentTable, addItem } = useOrderStore()

  const handleAddItem = () => {
    if (!currentTable) {
      toast.error('Selecciona una mesa primero')
      return
    }

    const item = {
      product: {
        id: 'test-1',
        name: 'Camarones a la Diabla',
        category: 'CAMARONES',
        price: 185,
        image: '',
        available: true
      },
      quantity: 1,
      modifiers: [],
      notes: '',
      subtotal: 185
    }

    addItem(item)
    toast.success('Producto agregado')
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Menú de Prueba</h2>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="card bg-white shadow-md">
          <div className="card-body">
            <h3 className="card-title">Camarones a la Diabla</h3>
            <p className="text-sm text-gray-600">Camarones en salsa picante</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-2xl font-bold text-primary">$185.00</span>
              <button 
                onClick={handleAddItem}
                className="btn btn-primary btn-sm"
              >
                Agregar
              </button>
            </div>
          </div>
        </div>

        <div className="card bg-white shadow-md">
          <div className="card-body">
            <h3 className="card-title">Pulpo al Mojo de Ajo</h3>
            <p className="text-sm text-gray-600">Pulpo fresco con ajo</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-2xl font-bold text-primary">$300.00</span>
              <button className="btn btn-primary btn-sm">
                Agregar
              </button>
            </div>
          </div>
        </div>

        <div className="card bg-white shadow-md">
          <div className="card-body">
            <h3 className="card-title">Filete Empanizado</h3>
            <p className="text-sm text-gray-600">Filete capeado crujiente</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-2xl font-bold text-primary">$185.00</span>
              <button className="btn btn-primary btn-sm">
                Agregar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded">
        <p className="text-sm text-gray-600">
          {currentTable 
            ? `Mesa seleccionada: Mesa ${currentTable.number}` 
            : '⚠️ Selecciona una mesa primero'}
        </p>
      </div>
    </div>
  )
}

export default ProductGridSimple
