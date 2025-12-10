import { create } from 'zustand'

export interface Product {
  id: string
  name: string
  category: string
  price: number
  image: string
  available: boolean
}

export interface OrderItem {
  product: Product
  quantity: number
  modifiers: string[]
  notes: string
  subtotal: number
}

export interface Table {
  id: string
  number: number
  capacity: number
  status: 'DISPONIBLE' | 'OCUPADA' | 'RESERVADA'
  position: { x: number; y: number }
}

export interface Order {
  id?: string
  tableId: string
  tableNumber: number
  items: OrderItem[]
  subtotal: number
  tax: number
  tip: number
  total: number
  status: 'PENDIENTE' | 'EN_PREPARACION' | 'LISTO' | 'ENTREGADO' | 'PAGADO' | 'CANCELADO'
  createdAt?: string
  ticket?: {
    fecha: string;
    productos: OrderItem[];
    total: number;
  }
}

interface OrderState {
  currentTable: Table | null
  currentOrder: Order | null
  orders: Order[]
  ordersByTable: { [tableId: string]: Order }
  setCurrentTable: (table: Table | null) => void
  setCurrentOrder: (order: Order | null) => void
  addItem: (item: OrderItem) => void
  removeItem: (index: number) => void
  updateItemQuantity: (index: number, quantity: number) => void
  calculateTotals: () => void
  clearOrder: () => void
  setOrders: (orders: Order[]) => void
    updateOrderStatus: (orderId: string, status: Order['status']) => void
    addItemToTable: (tableId: string, product: Product, quantity: number, notes?: string, modifiers?: string[]) => void
    generateTicketForTable: (tableId: string) => void
}

export const useOrderStore = create<OrderState>((set, get) => ({
  currentTable: null,
  currentOrder: null,
  orders: [],
  ordersByTable: (() => {
    const saved = localStorage.getItem('ordersByTable');
    return saved ? JSON.parse(saved) : {};
  })(),
  generateTicketForTable: (tableId) => {
    const { ordersByTable } = get();
    const order = ordersByTable[tableId];
    if (!order) return;
    // Aquí podrías generar el PDF o simplemente marcar el ticket como generado
    // Ejemplo: guardar una bandera en el objeto de la orden
    set((state) => ({
      ordersByTable: {
        ...state.ordersByTable,
        [tableId]: {
          ...order,
          ticket: {
            fecha: new Date().toLocaleString(),
            productos: order.items,
            total: order.total,
          },
        },
      },
    }));
  },
  
  setCurrentTable: (table) => set({ currentTable: table }),
  
  setCurrentOrder: (order) => set({ currentOrder: order }),
  
  addItem: (item) => {
    const { currentOrder, currentTable, calculateTotals } = get()
    
    if (!currentTable) return
    
    const newOrder: Order = currentOrder || {
      tableId: currentTable.id,
      tableNumber: currentTable.number,
      items: [],
      subtotal: 0,
      tax: 0,
      tip: 0,
      total: 0,
      status: 'PENDIENTE',
    }
    
    // Buscar si ya existe el mismo producto con los mismos modificadores
    const existingIndex = newOrder.items.findIndex(
      (i) => 
        i.product.id === item.product.id && 
        JSON.stringify(i.modifiers) === JSON.stringify(item.modifiers) &&
        i.notes === item.notes
    )
    
    if (existingIndex >= 0) {
      newOrder.items[existingIndex].quantity += item.quantity
      newOrder.items[existingIndex].subtotal = 
        newOrder.items[existingIndex].quantity * newOrder.items[existingIndex].product.price
    } else {
      newOrder.items.push(item)
    }
    
    set({ currentOrder: newOrder })
    calculateTotals()
  },
  
  removeItem: (index) => {
    const { currentOrder, calculateTotals } = get()
    if (!currentOrder) return
    
    const newItems = [...currentOrder.items]
    newItems.splice(index, 1)
    
    set({ 
      currentOrder: { 
        ...currentOrder, 
        items: newItems 
      } 
    })
    calculateTotals()
  },
  
  updateItemQuantity: (index, quantity) => {
    const { currentOrder, calculateTotals } = get()
    if (!currentOrder) return
    
    const newItems = [...currentOrder.items]
    if (quantity <= 0) {
      newItems.splice(index, 1)
    } else {
      newItems[index].quantity = quantity
      newItems[index].subtotal = quantity * newItems[index].product.price
    }
    
    set({ 
      currentOrder: { 
        ...currentOrder, 
        items: newItems 
      } 
    })
    calculateTotals()
  },
  
  calculateTotals: () => {
    const { currentOrder } = get()
    if (!currentOrder) return
    
    const subtotal = currentOrder.items.reduce((sum, item) => sum + item.subtotal, 0)
    const tax = subtotal * 0.16 // IVA 16%
    const total = subtotal + tax + (currentOrder.tip || 0)
    
    set({
      currentOrder: {
        ...currentOrder,
        subtotal,
        tax,
        total,
      }
    })
  },
  
  clearOrder: () => {
    set({ currentOrder: null, currentTable: null })
  },
  
  setOrders: (orders) => set({ orders }),
  
  updateOrderStatus: (orderId, status) => {
    const { orders } = get()
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status } : order
    )
    set({ orders: updatedOrders })
  },
  
    addItemToTable: (tableId, product, quantity, notes = '', modifiers = []) => {
      const { ordersByTable } = get();
      let order = ordersByTable[tableId];
      if (!order) {
        order = {
          tableId,
          tableNumber: 0, // Puedes actualizar esto si tienes el número
          items: [],
          subtotal: 0,
          tax: 0,
          tip: 0,
          total: 0,
          status: 'PENDIENTE',
        };
      }
      // Buscar si ya existe el mismo producto con los mismos modificadores y notas
      const existingIndex = order.items.findIndex(
        (i) =>
          i.product.id === product.id &&
          JSON.stringify(i.modifiers) === JSON.stringify(modifiers) &&
          i.notes === notes
      );
      if (existingIndex >= 0) {
        order.items[existingIndex].quantity += quantity;
        order.items[existingIndex].subtotal = order.items[existingIndex].quantity * order.items[existingIndex].product.price;
      } else {
        order.items.push({ product, quantity, modifiers, notes, subtotal: product.price * quantity });
      }
      // Calcular totales
      order.subtotal = order.items.reduce((sum, item) => sum + item.subtotal, 0);
      order.tax = order.subtotal * 0.16;
      order.total = order.subtotal + order.tax + (order.tip || 0);
      set((state) => {
        const newOrdersByTable = {
          ...state.ordersByTable,
          [tableId]: order,
        };
        localStorage.setItem('ordersByTable', JSON.stringify(newOrdersByTable));
        return {
          ordersByTable: newOrdersByTable,
        };
      });
    },
}))
