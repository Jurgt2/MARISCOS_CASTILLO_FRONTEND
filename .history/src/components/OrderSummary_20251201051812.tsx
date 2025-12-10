import { Trash2, Send, X } from 'lucide-react'
import { useOrderStore } from '../store/orderStore'
import toast from 'react-hot-toast'
import api from '../services/api'

interface OrderSummaryProps {
  onPayment: () => void
  onOrderSent?: () => void
  notaOrden?: string
  paraLlevar?: boolean
}

const OrderSummary = ({ onPayment, onOrderSent, notaOrden, paraLlevar }: OrderSummaryProps) => {
  const {
    currentTable,
    currentOrder,
    removeItem,
    updateItemQuantity,
    clearOrder,
  } = useOrderStore()

  const handleSendToKitchen = async () => {
    if (!currentOrder || currentOrder.items.length === 0) {
      toast.error('Agrega productos a la orden')
      return
    }

    try {
      const orderData = {
        tableId: currentOrder.tableId,
        items: currentOrder.items.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
          modifiers: item.modifiers,
          notes: item.notes,
        })),
      }

  await api.post('/orders', orderData)
  toast.success('¡Orden enviada a cocina! 👨‍🍳')
  clearOrder()
  if (onOrderSent) onOrderSent();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al enviar orden')
    }
  }

  const handleClearOrder = () => {
    if (window.confirm('¿Deseas cancelar esta orden?')) {
      clearOrder()
      toast.success('Orden cancelada')
    }
  }

  if (!currentTable) {
    return (
      <div className="card-castillo">
        <div className="card-body text-center py-20">
          <div className="text-6xl mb-4">🍽️</div>
          <h3 className="text-xl font-bold text-gray-400">
            Selecciona una mesa
          </h3>
          <p className="text-gray-400">
            Para comenzar a tomar la orden
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="card-castillo">
      <div className="card-body">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-primary">
              Mesa {currentTable.number}
            </h2>
            <p className="text-sm text-gray-500">
              {currentTable.capacity} personas
            </p>
          </div>
          {currentOrder && currentOrder.items.length > 0 && (
            <button
              onClick={handleClearOrder}
              className="btn btn-ghost btn-sm text-error"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Items */}
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {currentOrder && currentOrder.items.length > 0 ? (
            currentOrder.items.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-3 border border-gray-200"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h4 className="font-bold text-sm">{item.product.name}</h4>
                    {item.modifiers.length > 0 && (
                      <p className="text-xs text-gray-500 mt-1">
                        {item.modifiers.join(', ')}
                      </p>
                    )}
                    {item.notes && (
                      <p className="text-xs text-primary mt-1 italic">
                        "{item.notes}"
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => removeItem(index)}
                    className="btn btn-ghost btn-xs text-error"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateItemQuantity(index, item.quantity - 1)}
                      className="btn btn-xs btn-circle btn-primary"
                    >
                      -
                    </button>
                    <span className="font-bold w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateItemQuantity(index, item.quantity + 1)}
                      className="btn btn-xs btn-circle btn-primary"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      ${item.product.price.toFixed(2)} c/u
                    </p>
                    <p className="font-bold text-primary">
                      ${item.subtotal.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-400">
              <div className="text-4xl mb-2">🍤</div>
              <p>No hay productos en la orden</p>
            </div>
          )}
        </div>

        {/* Totales */}
        {currentOrder && currentOrder.items.length > 0 && (
          <>
            <div className="divider my-4"></div>
            {/* Mostrar nota y para llevar */}
            {(notaOrden || paraLlevar) && (
              <div className="mb-4 p-3 rounded bg-blue-50 border border-blue-200">
                {notaOrden && (
                  <div className="mb-2">
                    <span className="font-semibold text-blue-700">Notas especiales:</span>
                    <span className="ml-2 text-blue-900 italic">{notaOrden}</span>
                  </div>
                )}
                {paraLlevar && (
                  <div>
                    <span className="font-semibold text-green-700">Orden para llevar</span>
                  </div>
                )}
              </div>
            )}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>${currentOrder.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>IVA (16%):</span>
                <span>${currentOrder.tax.toFixed(2)}</span>
              </div>
              {currentOrder.tip > 0 && (
                <div className="flex justify-between text-sm">
                  <span>Propina:</span>
                  <span>${currentOrder.tip.toFixed(2)}</span>
                </div>
              )}
              <div className="divider my-2"></div>
              <div className="flex justify-between text-xl font-bold text-primary">
                <span>TOTAL:</span>
                <span>${currentOrder.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="space-y-2 mt-6">
              <button
                onClick={handleSendToKitchen}
                className="btn-castillo w-full"
              >
                <Send size={20} />
                Enviar a Cocina
              </button>
              <button
                onClick={onPayment}
                className="btn btn-success w-full text-white font-semibold"
              >
                <span className="text-xl">💵</span>
                Cobrar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default OrderSummary
