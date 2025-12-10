import { io, Socket } from 'socket.io-client'
import toast from 'react-hot-toast'

class SocketService {
  private socket: Socket | null = null
  private listeners: Map<string, Function[]> = new Map()
  private isConnecting: boolean = false

  connect(token: string) {
    // Evitar múltiples conexiones
    if (this.socket?.connected || this.isConnecting) return
    
    this.isConnecting = true

    try {
      this.socket = io('http://localhost:3000', {
        auth: { token },
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 5,
        timeout: 20000,
        autoConnect: true,
        forceNew: false,
        upgrade: true,
        rememberUpgrade: true
      })

      this.socket.on('connect', () => {
        console.log('✅ Socket conectado correctamente:', this.socket?.id)
        this.isConnecting = false
      })

      this.socket.on('connected', (data) => {
        console.log('✅ Confirmación del servidor:', data)
      })

      this.socket.on('connect_error', (error) => {
        console.warn('⚠️ Socket error:', error.message)
        this.isConnecting = false
      })

      this.socket.on('disconnect', (reason) => {
        console.log('🔌 Socket desconectado:', reason)
        this.isConnecting = false
      })

      this.socket.on('error', (error) => {
        console.error('❌ Socket error:', error)
        this.isConnecting = false
      })

      // Eventos de la aplicación
      this.socket.on('new-order', (data) => {
        console.log('📦 Nueva orden:', data)
        toast.success('¡Nueva orden recibida!', {
          icon: '��',
          duration: 5000,
        })
        this.emit('new-order', data)
      })

      this.socket.on('order-ready', (data) => {
        console.log('✅ Orden lista:', data)
        toast.success('¡Orden lista para servir!', {
          icon: '🍽️',
          duration: 5000,
        })
        this.emit('order-ready', data)
      })

      this.socket.on('order-updated', (data) => {
        console.log('🔄 Orden actualizada:', data)
        this.emit('order-updated', data)
      })
    } catch (error) {
      console.warn('⚠️ No se pudo inicializar el socket:', error)
      this.isConnecting = false
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
      this.listeners.clear()
      this.isConnecting = false
    }
  }

  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }
    this.listeners.get(event)!.push(callback)
  }

  off(event: string, callback: Function) {
    const callbacks = this.listeners.get(event)
    if (callbacks) {
      const index = callbacks.indexOf(callback)
      if (index > -1) {
        callbacks.splice(index, 1)
      }
    }
  }

  private emit(event: string, data: any) {
    const callbacks = this.listeners.get(event)
    if (callbacks) {
      callbacks.forEach(callback => callback(data))
    }
  }

  sendMessage(event: string, data: any) {
    if (this.socket?.connected) {
      this.socket.emit(event, data)
    }
  }
}

export const socketService = new SocketService()
