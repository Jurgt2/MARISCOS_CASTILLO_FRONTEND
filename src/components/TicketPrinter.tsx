import { forwardRef } from 'react'
import { Order, Table } from '../store/orderStore'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface TicketPrinterProps {
  order: Order
  table: Table
  paymentMethod: string
  amountPaid: number
  change: number
  tipAmount: number
}

const TicketPrinter = forwardRef<HTMLDivElement, TicketPrinterProps>(
  ({ order, table, paymentMethod, amountPaid, change, tipAmount }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          width: '80mm',
          padding: '10mm',
          fontFamily: 'monospace',
          fontSize: '12px',
          lineHeight: '1.4',
          backgroundColor: 'white',
          color: 'black',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '10px', borderBottom: '2px dashed black', paddingBottom: '10px' }}>
          <div style={{ fontSize: '24px' }}>🦐</div>
          <div style={{ fontSize: '18px', fontWeight: 'bold' }}>MARISCOS CASTILLO</div>
          <div style={{ fontSize: '11px' }}>Los mejores mariscos de la región</div>
          <div style={{ fontSize: '10px', marginTop: '5px' }}>
            RFC: MCR890512ABC
            <br />
            Tel: (555) 123-4567
            <br />
            Av. Costera #123, Puerto Vallarta
          </div>
        </div>

        {/* Información de la orden */}
        <div style={{ marginBottom: '10px', fontSize: '11px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Fecha:</span>
            <span>{format(new Date(), 'dd/MM/yyyy HH:mm', { locale: es })}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Mesa:</span>
            <span><b>#{table.number}</b></span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Folio:</span>
            <span>{order.id || 'NUEVO'}</span>
          </div>
        </div>

        <div style={{ borderTop: '1px solid black', borderBottom: '1px solid black', padding: '5px 0', marginBottom: '10px' }}>
          <div style={{ fontWeight: 'bold' }}>CONSUMO</div>
        </div>

        {/* Items */}
        <div style={{ marginBottom: '10px' }}>
          {order.items.map((item, index) => (
            <div key={index} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                <span>{item.quantity}x {item.product.name}</span>
                <span>${item.subtotal.toFixed(2)}</span>
              </div>
              {item.modifiers.length > 0 && (
                <div style={{ fontSize: '10px', paddingLeft: '15px', color: '#666' }}>
                  * {item.modifiers.join(', ')}
                </div>
              )}
              {item.notes && (
                <div style={{ fontSize: '10px', paddingLeft: '15px', fontStyle: 'italic' }}>
                  Nota: {item.notes}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Totales */}
        <div style={{ borderTop: '1px solid black', paddingTop: '5px', marginBottom: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
            <span>Subtotal:</span>
            <span>${order.subtotal.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
            <span>IVA (16%):</span>
            <span>${order.tax.toFixed(2)}</span>
          </div>
          {tipAmount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
              <span>Propina:</span>
              <span>${tipAmount.toFixed(2)}</span>
            </div>
          )}
          <div style={{ borderTop: '2px solid black', paddingTop: '5px', marginTop: '5px', display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 'bold' }}>
            <span>TOTAL:</span>
            <span>${(order.subtotal + order.tax + tipAmount).toFixed(2)}</span>
          </div>
        </div>

        {/* Información de pago */}
        <div style={{ marginBottom: '10px', borderTop: '1px dashed black', paddingTop: '5px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
            <span>Método de pago:</span>
            <span><b>{paymentMethod}</b></span>
          </div>
          {paymentMethod === 'EFECTIVO' && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                <span>Pagó con:</span>
                <span>${amountPaid.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                <span>Cambio:</span>
                <span>${change.toFixed(2)}</span>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', fontSize: '10px', borderTop: '2px dashed black', paddingTop: '10px', marginTop: '10px' }}>
          <div style={{ marginBottom: '10px' }}>
            <div>¡GRACIAS POR SU PREFERENCIA!</div>
            <div>Los esperamos pronto 🦐🦀🐟</div>
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <div style={{ fontWeight: 'bold' }}>AUTOFACTURACIÓN</div>
            <div>Escanea el código QR:</div>
            <div style={{ margin: '10px 0' }}>
              {/* Placeholder para QR - en producción usar una librería de QR */}
              <div style={{ 
                width: '100px', 
                height: '100px', 
                border: '2px solid black', 
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '40px'
              }}>
                📱
              </div>
            </div>
            <div>o visita: factura.mariscoscastillo.com</div>
          </div>

          <div style={{ fontSize: '9px', color: '#666' }}>
            Este documento es un comprobante de compra simplificado.
            <br />
            Para factura fiscal, solicítela en las próximas 24 horas.
          </div>
        </div>
      </div>
    )
  }
)

TicketPrinter.displayName = 'TicketPrinter'

export default TicketPrinter
