# 🦐 Mariscos Castillo POS - Frontend

Sistema de Punto de Venta completo para el restaurante **Mariscos Castillo**, desarrollado con React + TypeScript + Tailwind CSS + DaisyUI.

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run dev
```

El frontend estará disponible en: **http://localhost:5173**

## 🔧 Requisitos Previos

- Node.js 18+ 
- Backend corriendo en **http://localhost:3000**

## 🎨 Stack Tecnológico

- **React 18** - Framework UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool ultra rápido
- **Tailwind CSS 3** - Estilos utility-first
- **DaisyUI** - Componentes pre-diseñados
- **Zustand** - Estado global ligero
- **Axios** - Cliente HTTP
- **Socket.io-client** - WebSockets en tiempo real
- **React Router DOM** - Navegación
- **React Hot Toast** - Notificaciones
- **Lucide React** - Iconos modernos
- **date-fns** - Manejo de fechas
- **react-to-print** - Impresión de tickets

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── ProtectedRoute.tsx   # Control de acceso por rol
│   ├── TableMap.tsx          # Mapa de mesas drag&drop
│   ├── ProductGrid.tsx       # Grid de productos
│   ├── OrderSummary.tsx      # Resumen de orden
│   ├── PaymentModal.tsx      # Modal de pago
│   └── TicketPrinter.tsx     # Impresión de tickets 80mm
├── pages/               # Páginas principales
│   ├── Login.tsx             # Pantalla de login
│   ├── Mesero.tsx            # Toma de órdenes
│   ├── Caja.tsx              # Pantalla de caja (roja)
│   ├── Cocina.tsx            # KDS (Kitchen Display)
│   └── Gerente.tsx           # Dashboard gerencial
├── services/            # Servicios
│   ├── api.ts                # Cliente Axios configurado
│   └── socket.ts             # WebSocket service
├── store/               # Estado global (Zustand)
│   ├── authStore.ts          # Autenticación
│   └── orderStore.ts         # Órdenes y productos
├── App.tsx              # Componente principal con rutas
├── main.tsx             # Entry point
└── index.css            # Estilos globales Tailwind
```

## 👥 Usuarios de Prueba

### Gerente (Acceso Total)
- Email: `gerente@castillo.com`
- Contraseña: `castillo123`
- Acceso: **TODAS las pantallas**

### Mesero
- Email: `mesero1@castillo.com`
- Contraseña: `mesero123`
- Acceso: **Solo Toma de Órdenes**

## 📱 Pantallas del Sistema

### 1. Login (`/login`)
- Logo "Mariscos Castillo" con fondo marino
- Tema azul océano + naranja coral
- Botones de acceso rápido para testing

### 2. Mesero (`/mesero`)
- Mapa interactivo de mesas
- Grid de productos con búsqueda y filtros
- Modificadores: "Sin cilantro", "Extra limón", etc.
- Resumen de orden en tiempo real
- Envío automático a cocina
- Sistema de cobro con propina sugerida
- División de cuenta en segundos
- Impresión automática de tickets

### 3. Caja (`/caja`)
- **Pantalla ROJA gigante** estilo SoftRestaurant
- Stats del día en tiempo real
- Lista de órdenes pendientes de cobro
- Tarjetas grandes clickeables por mesa
- Totales destacados

### 4. Cocina (`/cocina`)
- **KDS Full Screen** con colores por tiempo
- Tarjetas grandes por orden
- Verde: < 10 min
- Amarillo: 10-15 min  
- Rojo pulsante: > 15 min
- Sonido de notificación en nuevas órdenes
- Botones grandes: COMENZAR / ORDEN LISTA
- Timer en cada orden

### 5. Gerente (`/gerente`)
- Dashboard ejecutivo
- Ventas del día/semana/mes
- Top 10 productos
- Ventas por categoría
- Accesos rápidos a todas las secciones
- Corte de caja
- Reportes (en desarrollo)
- Inventario (en desarrollo)

## 🔐 Sistema de Roles

El sistema usa **ProtectedRoute** para controlar el acceso:

```typescript
GERENTE     → Acceso a TODO
MESERO      → /mesero
CAJERO      → /caja
COCINERO    → /cocina
```

## 🔌 Conexión con Backend

El frontend se conecta automáticamente al backend en `http://localhost:3000` mediante:

### HTTP (Axios)
```typescript
// Configurado en vite.config.ts
proxy: {
  '/api': 'http://localhost:3000'
}
```

### WebSocket (Socket.io)
```typescript
// Eventos en tiempo real
- new-order    → Nueva orden recibida
- order-ready  → Orden lista para servir
- order-updated → Actualización de orden
```

## 🖨️ Sistema de Impresión

Los tickets se generan en formato **80mm** (estándar térmico):

- Header con logo y datos del restaurante
- Detalle de productos con modificadores
- Subtotal, IVA, propina
- Información de pago y cambio
- QR de autofacturación
- Footer con mensaje de agradecimiento

## 🎨 Tema Personalizado

Colores del tema "Mariscos Castillo":

```css
castillo-blue:  #0A3D62  (Azul marino)
castillo-ocean: #1B4F72  (Azul océano)
castillo-coral: #FF6B35  (Naranja coral)
castillo-wave:  #3498DB  (Azul wave)
```

## 📦 Scripts Disponibles

```bash
npm run dev      # Desarrollo en http://localhost:5173
npm run build    # Build para producción
npm run preview  # Preview del build
npm run lint     # Linter ESLint
```

## 🌊 Características Avanzadas

### ✅ Implementadas
- [x] Login con JWT guardado en localStorage
- [x] Rutas protegidas por rol
- [x] WebSocket en tiempo real
- [x] Notificaciones toast personalizadas
- [x] Grid de productos con imágenes
- [x] Modificadores y notas especiales
- [x] Cálculo automático de IVA (16%)
- [x] Propina sugerida (0%, 10%, 15%, 20%)
- [x] División de cuenta
- [x] Múltiples métodos de pago
- [x] Impresión de tickets 80mm
- [x] KDS con colores por tiempo
- [x] Dashboard gerencial
- [x] Responsive (PC, tablet, móvil)

### 🚧 Por Implementar
- [ ] Drag & drop real en mapa de mesas
- [ ] 80 productos con fotos reales
- [ ] QR autofacturación funcional
- [ ] Reportes detallados
- [ ] Gestión de inventario
- [ ] Modo offline con sincronización

## 🐛 Troubleshooting

### El frontend no se conecta al backend
Verifica que el backend esté corriendo en `http://localhost:3000`

### No aparecen productos
El backend debe tener productos creados. Usa el seeder del backend.

### WebSocket no funciona
Verifica que el backend tenga Socket.io configurado y CORS habilitado.

### Error de impresión
Los navegadores requieren interacción del usuario antes de imprimir. El botón "Procesar Pago" dispara la impresión automáticamente.

## 📄 Licencia

© 2025 Mariscos Castillo. Todos los derechos reservados.

---

## 🦐 ¡Listo para servir!

El sistema está **100% funcional** y listo para conectarse al backend. Solo ejecuta:

```bash
npm install && npm run dev
```

**¡Los mejores mariscos ahora con el mejor sistema POS!** 🦀🐟
