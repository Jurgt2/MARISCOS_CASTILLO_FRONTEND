import { useState, useRef } from 'react'
import { X, CreditCard, DollarSign, Users, Printer, QrCode } from 'lucide-react'
import { useOrderStore } from '../store/orderStore'
import toast from 'react-hot-toast'
import api from '../services/api'
import { useReactToPrint } from 'react-to-print'
import TicketPrinter from './TicketPrinter'

interface PaymentModalProps {
  onClose: () => void
  onSuccess: () => void
}

const PaymentModal = ({ onClose, onSuccess }: PaymentModalProps) => {
  const { currentOrder, currentTable, clearOrder } = useOrderStore()
  const [paymentMethod, setPaymentMethod] = useState<'EFECTIVO' | 'TARJETA' | 'TRANSFERENCIA'>('EFECTIVO')
  const [amountPaid, setAmountPaid] = useState('')
  const [tipPercentage, setTipPercentage] = useState(10)
  const [splitCount, setSplitCount] = useState(1)
  const [loading, setLoading] = useState(false)
  const [showInvoice, setShowInvoice] = useState(false)
  const [customerEmail, setCustomerEmail] = useState('')

  const ticketRef = useRef(null)

  const handlePrint = useReactToPrint({
    content: () => ticketRef.current,
  })

  if (!currentOrder || !currentTable) return null

  const tipAmount = (currentOrder.subtotal + currentOrder.tax) * (tipPercentage / 100)
  const totalWithTip = currentOrder.subtotal + currentOrder.tax + tipAmount
  const amountPerPerson = totalWithTip / splitCount
  const change = parseFloat(amountPaid || '0') - totalWithTip

  const handlePayment = async () => {
    if (paymentMethod === 'EFECTIVO' && parseFloat(amountPaid) < totalWithTip) {
      toast.error('El monto pagado es insuficiente')
      return
    }

    setLoading(true)

    try {
      // Actualizar orden con propina
      const orderData = {
        ...currentOrder,
        tip: tipAmount,
        total: totalWithTip,
        status: 'PAGADO',
        paymentMethod,
      }

      await api.post('/orders/payment', orderData)

      // Imprimir ticket automáticamente
      setTimeout(() => {
        handlePrint()
      }, 500)

      toast.success('¡Pago procesado exitosamente! 💰')
      clearOrder()
      onSuccess()
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al procesar el pago')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-4xl">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          <X size={20} />
        </button>

        <h3 className="font-bold text-3xl text-primary mb-6">
          💵 Cobrar - Mesa {currentTable.number}
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Columna izquierda - Métodos de pago */}
          <div className="space-y-6">
            {/* Resumen de cuenta */}
            <div className="bg-primary/10 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-bold">${currentOrder.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>IVA (16%):</span>
                <span className="font-bold">${currentOrder.tax.toFixed(2)}</span>
              </div>
              <div className="divider my-2"></div>
              <div className="flex justify-between text-lg font-bold text-primary">
                <span>TOTAL:</span>
                <span>${(currentOrder.subtotal + currentOrder.tax).toFixed(2)}</span>
              </div>
            </div>

            {/* Propina sugerida */}
            <div>
              <label className="label">
                <span className="label-text font-bold">Propina sugerida</span>
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[0, 10, 15, 20].map((percent) => (
                  <button
                    key={percent}
                    onClick={() => setTipPercentage(percent)}
                    className={`btn ${
                      tipPercentage === percent ? 'btn-primary' : 'btn-outline'
                    }`}
                  >
                    {percent}%
                  </button>
                ))}
              </div>
              {tipPercentage > 0 && (
                <p className="text-sm text-gray-500 mt-2">
                  Propina: ${tipAmount.toFixed(2)}
                </p>
              )}
            </div>

            {/* División de cuenta */}
            <div>
              <label className="label">
                <span className="label-text font-bold">
                  <Users className="inline mr-2" size={18} />
                  Dividir cuenta
                </span>
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSplitCount(Math.max(1, splitCount - 1))}
                  className="btn btn-circle btn-primary"
                >
                  -
                </button>
                <span className="text-3xl font-bold w-16 text-center">
                  {splitCount}
                </span>
                <button
                  onClick={() => setSplitCount(Math.min(10, splitCount + 1))}
                  className="btn btn-circle btn-primary"
                >
                  +
                </button>
              </div>
              {splitCount > 1 && (
                <div className="bg-warning/20 p-3 rounded-lg mt-3">
                  <p className="font-bold">
                    ${amountPerPerson.toFixed(2)} por persona
                  </p>
                </div>
              )}
            </div>

            {/* Total con propina */}
            <div className="bg-success/20 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">TOTAL A PAGAR:</span>
                <span className="text-3xl font-bold text-success">
                  ${totalWithTip.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Columna derecha - Pago */}
          <div className="space-y-6">
            {/* Método de pago */}
            <div>
              <label className="label">
                <span className="label-text font-bold">Método de pago</span>
              </label>
              <div className="space-y-2">
                <button
                  onClick={() => setPaymentMethod('EFECTIVO')}
                  className={`btn w-full justify-start ${
                    paymentMethod === 'EFECTIVO' ? 'btn-primary' : 'btn-outline'
                  }`}
                >
                  <DollarSign size={20} />
                  Efectivo
                </button>
                <button
                  onClick={() => setPaymentMethod('TARJETA')}
                  className={`btn w-full justify-start ${
                    paymentMethod === 'TARJETA' ? 'btn-primary' : 'btn-outline'
                  }`}
                >
                  <CreditCard size={20} />
                  Tarjeta
                </button>
                <button
                  onClick={() => setPaymentMethod('TRANSFERENCIA')}
                  className={`btn w-full justify-start ${
                    paymentMethod === 'TRANSFERENCIA' ? 'btn-primary' : 'btn-outline'
                  }`}
                >
                  <QrCode size={20} />
                  Transferencia
                </button>
              </div>
            </div>

            {/* Monto pagado (solo para efectivo) */}
            {paymentMethod === 'EFECTIVO' && (
              <div>
                <label className="label">
                  <span className="label-text font-bold">Monto recibido</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="input input-bordered input-lg w-full text-2xl font-bold"
                  value={amountPaid}
                  onChange={(e) => setAmountPaid(e.target.value)}
                  autoFocus
                />
                {change >= 0 && amountPaid && (
                  <div className="bg-info/20 p-3 rounded-lg mt-3">
                    <p className="text-sm">Cambio:</p>
                    <p className="text-2xl font-bold text-info">
                      ${change.toFixed(2)}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Facturación */}
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text font-bold">¿Requiere factura?</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  checked={showInvoice}
                  onChange={(e) => setShowInvoice(e.target.checked)}
                />
              </label>
            </div>

            {showInvoice && (
              <div>
                <input
                  type="email"
                  placeholder="Correo para factura"
                  className="input input-bordered w-full"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-2">
                  Se enviará un link de autofacturación con código QR
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Botones de acción */}
        <div className="modal-action">
          <button onClick={onClose} className="btn btn-ghost">
            Cancelar
          </button>
          <button
            onClick={handlePayment}
            className="btn-castillo"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <>
                <Printer size={20} />
                Procesar Pago e Imprimir
              </>
            )}
          </button>
        </div>
      </div>

      {/* Ticket para imprimir (oculto) */}
      <div className="hidden">
        <TicketPrinter
          ref={ticketRef}
          order={currentOrder}
          table={currentTable}
          paymentMethod={paymentMethod}
          amountPaid={parseFloat(amountPaid || '0')}
          change={change}
          tipAmount={tipAmount}
        />
      </div>
    </div>
  )
}

export default PaymentModal
