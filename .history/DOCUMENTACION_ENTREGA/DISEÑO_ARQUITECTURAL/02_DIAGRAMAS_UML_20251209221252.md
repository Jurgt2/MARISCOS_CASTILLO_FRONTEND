# DISEÑO ARQUITECTURAL
## Sistema de Punto de Venta - Mariscos Castillo
### DIAGRAMAS UML

---

## ÍNDICE

1. Diagrama de Casos de Uso
2. Diagrama de Clases
3. Diagrama de Secuencia
4. Diagrama de Actividades
5. Diagrama de Componentes
6. Diagrama de Despliegue

---

## 1. DIAGRAMA DE CASOS DE USO

### 1.1 Actores del Sistema

- **Gerente/Administrador**: Acceso completo al sistema
- **Mesero**: Toma de órdenes y consultas
- **Cocina**: Gestión de pedidos
- **Cajero**: Proceso de pagos

### 1.2 Diagrama de Casos de Uso General

```
                    SISTEMA POS MARISCOS CASTILLO

┌─────────────┐                                        ┌─────────────┐
│             │                                        │             │
│   GERENTE   │───────────┐                  ┌─────────│   MESERO    │
│             │           │                  │         │             │
└─────────────┘           │                  │         └─────────────┘
                          ▼                  ▼                │
                    ┌──────────────────────────┐             │
                    │                          │             │
                    │  • Gestionar Usuarios    │             │
                    │  • Gestionar Catálogos   │             │
                    │  • Gestionar Productos   │◄────────────┤
                    │  • Gestionar Proveedores │             │
                    │  • Gestionar Mesas       │             │
                    │  • Ver Reportes          │             ▼
                    │  • Dashboard Gerencial   │       ┌──────────────┐
                    │  • Gestionar Inventario  │       │              │
                    │  • Configurar Sistema    │       │• Tomar Orden │
                    │                          │       │• Ver Mesas   │
                    │  • Tomar Orden           │◄──────│• Enviar a    │
                    │  • Procesar Pago         │       │  Cocina      │
                    │  • Gestionar Compras     │       │• Consultar   │
                    │  • Corte de Caja         │       │  Estado      │
                    │                          │       │              │
                    └──────────────────────────┘       └──────────────┘
                          ▲                  ▲
                          │                  │
┌─────────────┐           │                  │         ┌─────────────┐
│             │           │                  │         │             │
│   CAJERO    │───────────┘                  └─────────│   COCINA    │
│             │                                        │             │
└─────────────┘                                        └─────────────┘
                                                              │
    • Abrir Caja                                             │
    • Procesar Pago                                          ▼
    • Generar Ticket                                   ┌──────────────┐
    • Corte de Caja                                    │              │
    • Consultar Ventas                                 │• Ver Pedidos │
                                                       │• Marcar En   │
                                                       │  Preparación │
                                                       │• Marcar Listo│
                                                       │• Notificar   │
                                                       │  Mesero      │
                                                       │              │
                                                       └──────────────┘
```

### 1.3 Casos de Uso Detallados

#### CU-001: Iniciar Sesión
- **Actor**: Todos
- **Precondición**: Usuario registrado en el sistema
- **Flujo Principal**:
  1. Usuario ingresa credenciales
  2. Sistema valida credenciales
  3. Sistema carga perfil según rol
  4. Sistema redirige a dashboard correspondiente
- **Postcondición**: Usuario autenticado y sesión activa

#### CU-002: Tomar Orden (Mesero)
- **Actor**: Mesero
- **Precondición**: Usuario autenticado, mesa disponible
- **Flujo Principal**:
  1. Mesero selecciona mesa
  2. Mesero agrega productos del menú
  3. Mesero especifica cantidades
  4. Mesero agrega notas especiales (opcional)
  5. Sistema calcula subtotal e impuestos
  6. Mesero confirma orden
  7. Sistema genera folio autoincrementable
  8. Sistema envía orden a cocina vía WebSocket
  9. Sistema actualiza estado de mesa
- **Postcondición**: Orden registrada y enviada a cocina

#### CU-003: Gestionar Pedidos (Cocina)
- **Actor**: Cocina
- **Precondición**: Usuario autenticado, orden recibida
- **Flujo Principal**:
  1. Sistema notifica nueva orden
  2. Cocina visualiza detalles del pedido
  3. Cocina marca pedido "En Preparación"
  4. Cocina prepara platillos
  5. Cocina marca pedido "Listo"
  6. Sistema notifica a mesero vía WebSocket
- **Postcondición**: Pedido completado y notificado

#### CU-004: Procesar Pago (Cajero)
- **Actor**: Cajero
- **Precondición**: Usuario autenticado, orden confirmada
- **Flujo Principal**:
  1. Cajero selecciona mesa con cuenta pendiente
  2. Sistema muestra detalle de consumo
  3. Cajero selecciona método de pago
  4. Si es efectivo: cajero ingresa monto recibido
  5. Sistema calcula cambio (si aplica)
  6. Cajero puede agregar propina
  7. Sistema genera ticket de venta
  8. Sistema marca orden como pagada
  9. Sistema actualiza estado de mesa a disponible
  10. Sistema registra transacción
- **Postcondición**: Venta registrada, ticket generado

#### CU-005: Generar Reportes (Gerente)
- **Actor**: Gerente
- **Precondición**: Usuario autenticado como gerente
- **Flujo Principal**:
  1. Gerente selecciona tipo de reporte
  2. Gerente define parámetros (fechas, filtros)
  3. Sistema procesa información
  4. Sistema genera reporte en PDF
  5. Sistema muestra reporte para descarga
- **Postcondición**: Reporte generado y disponible

---

## 2. DIAGRAMA DE CLASES

### 2.1 Diagrama de Clases Principal

```
┌─────────────────────────────┐
│        Usuario              │
├─────────────────────────────┤
│ - id: number                │
│ - codigo: string            │
│ - nombre: string            │
│ - rol: Rol                  │
│ - usuario: string           │
│ - passwordHash: string      │
│ - activo: boolean           │
├─────────────────────────────┤
│ + autenticar(): boolean     │
│ + cambiarPassword(): void   │
│ + validarPermisos(): boolean│
└─────────────────────────────┘
        │
        │ tiene rol
        ▼
┌─────────────────────────────┐
│     Rol (Enum)              │
├─────────────────────────────┤
│ GERENTE                     │
│ MESERO                      │
│ COCINA                      │
│ CAJERO                      │
└─────────────────────────────┘


┌─────────────────────────────┐         ┌─────────────────────────────┐
│        Categoria            │         │        Producto             │
├─────────────────────────────┤         ├─────────────────────────────┤
│ - id: number                │ 1    N  │ - id: number                │
│ - nombre: string            │◄────────│ - codigo: string            │
│ - descripcion: string       │         │ - nombre: string            │
│ - activo: boolean           │         │ - descripcion: string       │
├─────────────────────────────┤         │ - precio: number            │
│ + crear(): Categoria        │         │ - categoriaId: number       │
│ + actualizar(): void        │         │ - stockActual: number       │
│ + eliminar(): void          │         │ - stockMinimo: number       │
└─────────────────────────────┘         │ - costo: number             │
                                        │ - activo: boolean           │
                                        ├─────────────────────────────┤
                                        │ + validarStock(): boolean   │
                                        │ + calcularMargen(): number  │
                                        │ + actualizarStock(): void   │
                                        └─────────────────────────────┘
                                                    │
                                                    │ N
                                                    │
┌─────────────────────────────┐         ┌─────────────────────────────┐
│          Mesa               │         │      DetalleOrden           │
├─────────────────────────────┤         ├─────────────────────────────┤
│ - id: number                │         │ - id: number                │
│ - numeroMesa: string        │         │ - ordenId: number           │
│ - capacidad: number         │   N     │ - productoId: number        │
│ - zona: string              │◄────┐   │ - cantidad: number          │
│ - estado: EstadoMesa        │     │   │ - precioUnitario: number    │
│ - activa: boolean           │     │   │ - subtotal: number          │
├─────────────────────────────┤     │   │ - notas: string             │
│ + cambiarEstado(): void     │     │   ├─────────────────────────────┤
│ + validarDisponible(): bool │     │   │ + calcularSubtotal(): number│
└─────────────────────────────┘     │   └─────────────────────────────┘
                                    │               │
                                    │               │ N
                                    │ 1             │
┌─────────────────────────────┐     │   ┌─────────────────────────────┐
│         Orden               │     │   │                             │
├─────────────────────────────┤     └───│          1                  │
│ - id: number                │         │                             │
│ - folio: string             │─────────┤                             │
│ - mesaId: number            │         │                             │
│ - meseroId: number          │         │                             │
│ - fecha: Date               │         │                             │
│ - hora: Time                │         │                             │
│ - subtotal: number          │         │                             │
│ - impuestos: number         │         │                             │
│ - propina: number           │         │                             │
│ - total: number             │         │                             │
│ - estado: EstadoOrden       │         │                             │
│ - pagada: boolean           │         │                             │
│ - metodoPago: MetodoPago    │         │                             │
├─────────────────────────────┤         │                             │
│ + generarFolio(): string    │         │                             │
│ + calcularTotales(): void   │         │                             │
│ + enviarACocina(): void     │         │                             │
│ + procesarPago(): void      │         │                             │
│ + generarTicket(): Ticket   │         │                             │
└─────────────────────────────┘         └─────────────────────────────┘


┌─────────────────────────────┐         ┌─────────────────────────────┐
│       Proveedor             │         │        Compra               │
├─────────────────────────────┤         ├─────────────────────────────┤
│ - id: number                │ 1    N  │ - id: number                │
│ - codigo: string            │◄────────│ - folio: string             │
│ - nombre: string            │         │ - proveedorId: number       │
│ - rfc: string               │         │ - fecha: Date               │
│ - telefono: string          │         │ - total: number             │
│ - email: string             │         │ - usuarioId: number         │
│ - direccion: string         │         │ - observaciones: string     │
│ - activo: boolean           │         ├─────────────────────────────┤
├─────────────────────────────┤         │ + calcularTotal(): number   │
│ + validarRFC(): boolean     │         │ + confirmar(): void         │
└─────────────────────────────┘         │ + actualizarInventario():void│
                                        └─────────────────────────────┘


┌─────────────────────────────┐
│    MovimientoInventario     │
├─────────────────────────────┤
│ - id: number                │
│ - productoIngredienteId: num│
│ - tipoItem: TipoItem        │
│ - tipoMovimiento: TipoMov   │
│ - cantidad: number          │
│ - costoUnitario: number     │
│ - referenciaId: number      │
│ - fecha: Date               │
│ - usuarioId: number         │
├─────────────────────────────┤
│ + registrar(): void         │
│ + calcularCosto(): number   │
└─────────────────────────────┘


┌─────────────────────────────┐
│          Caja               │
├─────────────────────────────┤
│ - id: number                │
│ - fechaApertura: Date       │
│ - saldoInicial: number      │
│ - fechaCierre: Date         │
│ - totalEfectivo: number     │
│ - totalTarjeta: number      │
│ - totalTransferencia: number│
│ - efectivoEsperado: number  │
│ - efectivoReal: number      │
│ - diferencia: number        │
│ - usuarioId: number         │
├─────────────────────────────┤
│ + abrir(): void             │
│ + cerrar(): void            │
│ + calcularTotales(): void   │
│ + generarReporte(): Report  │
└─────────────────────────────┘
```

### 2.2 Enumeraciones

```
enum EstadoMesa {
    DISPONIBLE,
    OCUPADA,
    RESERVADA,
    FUERA_SERVICIO
}

enum EstadoOrden {
    PENDIENTE,
    EN_PROCESO,
    LISTO,
    ENTREGADO
}

enum MetodoPago {
    EFECTIVO,
    TARJETA_CREDITO,
    TARJETA_DEBITO,
    TRANSFERENCIA,
    MIXTO
}

enum TipoMovimiento {
    ENTRADA,
    SALIDA
}

enum TipoItem {
    PRODUCTO,
    INGREDIENTE
}
```

---

## 3. DIAGRAMA DE SECUENCIA

### 3.1 Secuencia: Tomar Orden

```
Mesero      Sistema      BaseDatos     Cocina      Mesa
  │            │             │            │          │
  │──registrar orden─>│      │            │          │
  │            │             │            │          │
  │            │─validar mesa─>           │          │
  │            │             │            │          │
  │            │<──mesa disponible──      │          │
  │            │             │            │          │
  │            │─generar folio─>          │          │
  │            │             │            │          │
  │            │<──folio generado──       │          │
  │            │             │            │          │
  │            │─guardar orden─>          │          │
  │            │             │            │          │
  │            │<──orden guardada──       │          │
  │            │             │            │          │
  │            │───notificar via WebSocket───>      │
  │            │             │            │          │
  │            │─actualizar estado mesa─> │          │
  │            │             │            │          │
  │<─orden creada──          │            │          │
  │            │             │            │<─orden nueva
  │            │             │            │          │
```

### 3.2 Secuencia: Procesar Pago

```
Cajero    Sistema    BaseDatos    Impresora    Mesa
  │          │           │            │          │
  │─seleccionar mesa>│   │            │          │
  │          │           │            │          │
  │          │─obtener orden─>        │          │
  │          │           │            │          │
  │          │<──datos orden──        │          │
  │          │           │            │          │
  │<─mostrar detalle──   │            │          │
  │          │           │            │          │
  │─ingresar pago─>│     │            │          │
  │          │           │            │          │
  │          │─validar pago─>         │          │
  │          │           │            │          │
  │          │<──pago válido──        │          │
  │          │           │            │          │
  │          │─registrar venta─>      │          │
  │          │           │            │          │
  │          │─generar ticket─>       │          │
  │          │           │            │          │
  │          │───────enviar a imprimir──────>   │
  │          │           │            │          │
  │          │─actualizar estado mesa─>          │
  │          │           │            │          │
  │          │           │            │<─imprimir ticket
  │          │           │            │          │
  │<──pago exitoso────   │            │          │
  │          │           │            │          │
```

### 3.3 Secuencia: Generar Reporte

```
Gerente    Sistema    ReporteService    BaseDatos    PDF
  │           │             │               │          │
  │─solicitar reporte>│     │               │          │
  │           │             │               │          │
  │           │─validar permisos─>          │          │
  │           │             │               │          │
  │           │<──usuario autorizado──      │          │
  │           │             │               │          │
  │           │──obtener parámetros>│       │          │
  │           │             │               │          │
  │           │             │─consultar datos─>        │
  │           │             │               │          │
  │           │             │<──datos──     │          │
  │           │             │               │          │
  │           │             │─procesar datos─>         │
  │           │             │               │          │
  │           │             │───generar PDF──────────>│
  │           │             │               │          │
  │           │             │<──PDF generado─────────  │
  │           │             │               │          │
  │           │<──reporte completo──        │          │
  │           │             │               │          │
  │<──mostrar reporte────   │               │          │
  │           │             │               │          │
```

---

## 4. DIAGRAMA DE ACTIVIDADES

### 4.1 Actividad: Proceso Completo de Venta

```
    [INICIO]
        │
        ▼
    ┌─────────┐
    │ Cliente │
    │ Llega   │
    └─────────┘
        │
        ▼
    ┌──────────────┐
    │ Mesero asigna│      
    │    mesa      │
    └──────────────┘
        │
        ▼
    ┌──────────────┐
    │ Mesero toma  │
    │    orden     │
    └──────────────┘
        │
        ▼
    ┌──────────────┐
    │ Agregar      │
    │ productos    │───┐
    └──────────────┘   │
        │              │
        ▼              │
    <¿Más productos?>──┘
        │ No
        ▼
    ┌──────────────┐
    │ Confirmar    │
    │    orden     │
    └──────────────┘
        │
        ├──────────────────┐
        │                  │
        ▼                  ▼
    ┌────────────┐    ┌────────────┐
    │ Actualizar │    │  Enviar a  │
    │ inventario │    │   cocina   │
    └────────────┘    └────────────┘
                           │
                           ▼
                      ┌────────────┐
                      │  Cocina    │
                      │  prepara   │
                      └────────────┘
                           │
                           ▼
                      ┌────────────┐
                      │ Marcar como│
                      │   listo    │
                      └────────────┘
                           │
                           ▼
                      ┌────────────┐
                      │ Notificar  │
                      │  mesero    │
                      └────────────┘
                           │
                           ▼
                      ┌────────────┐
                      │ Servir al  │
                      │  cliente   │
                      └────────────┘
                           │
                           ▼
                      ┌────────────┐
                      │ Cliente    │
                      │ solicita   │
                      │ cuenta     │
                      └────────────┘
                           │
                           ▼
                      ┌────────────┐
                      │ Cajero     │
                      │ procesa    │
                      │ pago       │
                      └────────────┘
                           │
                           ▼
                      <¿Pago válido?>
                       │           │
                    Sí │           │ No
                       │           ▼
                       │      [Rechazar]
                       │           │
                       │           │
                       ▼           ▼
                  ┌────────────┐  [FIN]
                  │ Generar    │
                  │  ticket    │
                  └────────────┘
                       │
                       ▼
                  ┌────────────┐
                  │ Liberar    │
                  │   mesa     │
                  └────────────┘
                       │
                       ▼
                    [FIN]
```

---

## 5. DIAGRAMA DE COMPONENTES

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND (React)                        │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │              │  │              │  │              │      │
│  │ Componentes  │  │   Páginas    │  │   Servicios  │      │
│  │     UI       │  │              │  │              │      │
│  │              │  │              │  │              │      │
│  │ - ProductGrid│  │ - Dashboard  │  │ - API Client │      │
│  │ - TableMap   │  │ - Mesero     │  │ - Socket     │      │
│  │ - Modal      │  │ - Cocina     │  │ - Auth       │      │
│  │ - Ticket     │  │ - Caja       │  │              │      │
│  │              │  │ - Gerente    │  │              │      │
│  │              │  │ - Inventario │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│  ┌──────────────────────────────────────────────────┐       │
│  │                                                   │       │
│  │              GESTIÓN DE ESTADO                   │       │
│  │                  (Zustand)                        │       │
│  │                                                   │       │
│  │  - authStore     - orderStore                    │       │
│  │                                                   │       │
│  └──────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP / WebSocket
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      BACKEND (Node.js)                       │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │              │  │              │  │              │      │
│  │ Controladores│  │  Middleware  │  │   Servicios  │      │
│  │              │  │              │  │              │      │
│  │ - Auth       │  │ - Validator  │  │ - Auth       │      │
│  │ - Productos  │  │ - Auth       │  │ - Reportes   │      │
│  │ - Ordenes    │  │ - Error      │  │ - Inventario │      │
│  │ - Ventas     │  │ - Logger     │  │ - PDF        │      │
│  │ - Inventario │  │ - CORS       │  │              │      │
│  │ - Reportes   │  │              │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│  ┌──────────────────────────────────────────────────┐       │
│  │                                                   │       │
│  │                   MODELOS (ORM)                   │       │
│  │                                                   │       │
│  │  Usuario - Producto - Orden - Compra - etc.      │       │
│  │                                                   │       │
│  └──────────────────────────────────────────────────┘       │
│                                                              │
│  ┌──────────────────────────────────────────────────┐       │
│  │                                                   │       │
│  │              SOCKET.IO SERVER                     │       │
│  │                                                   │       │
│  │  - Eventos en tiempo real                        │       │
│  │  - Notificaciones                                 │       │
│  │                                                   │       │
│  └──────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ SQL
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│              BASE DE DATOS (PostgreSQL/MySQL)                │
│                                                              │
│  Tablas: usuarios, productos, ordenes, compras,             │
│          inventario, mesas, etc.                            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 6. DIAGRAMA DE DESPLIEGUE

```
┌─────────────────────────────────────────────────────────────┐
│                      RED LOCAL (LAN)                         │
│                                                              │
│  ┌──────────────────────────────────────────────┐           │
│  │                  SERVIDOR                     │           │
│  │                                               │           │
│  │  ┌─────────────────────────────────────┐     │           │
│  │  │     Node.js Backend Server          │     │           │
│  │  │     Puerto: 4000                    │     │           │
│  │  │                                     │     │           │
│  │  │  - API REST                         │     │           │
│  │  │  - Socket.IO Server                 │     │           │
│  │  │  - Lógica de Negocio                │     │           │
│  │  └─────────────────────────────────────┘     │           │
│  │                      │                        │           │
│  │                      │                        │           │
│  │  ┌─────────────────────────────────────┐     │           │
│  │  │     React App (Build Estático)      │     │           │
│  │  │     Puerto: 5173 (dev) / 80 (prod)  │     │           │
│  │  │                                     │     │           │
│  │  │  - Servido por Vite (dev)           │     │           │
│  │  │  - O servido por Nginx/Apache       │     │           │
│  │  └─────────────────────────────────────┘     │           │
│  │                      │                        │           │
│  │                      │                        │           │
│  │  ┌─────────────────────────────────────┐     │           │
│  │  │     PostgreSQL / MySQL              │     │           │
│  │  │     Puerto: 5432 / 3306             │     │           │
│  │  │                                     │     │           │
│  │  │  - Base de Datos Principal          │     │           │
│  │  └─────────────────────────────────────┘     │           │
│  │                                               │           │
│  │  OS: Windows Server / Linux / macOS          │           │
│  │  RAM: 8-16 GB                                 │           │
│  │  Storage: 500GB - 1TB SSD                    │           │
│  └──────────────────────────────────────────────┘           │
│                      │                                       │
│                      │  Red Ethernet / WiFi                  │
│                      │                                       │
│  ┌───────────────┬──┴───┬───────────────┬──────────────┐    │
│  │               │      │               │              │    │
│  ▼               ▼      ▼               ▼              ▼    │
│ ┌────────┐  ┌────────┐ ┌────────┐  ┌────────┐  ┌────────┐ │
│ │Estación│  │Estación│ │Estación│  │Estación│  │Impresora││
│ │ Caja   │  │Meseros │ │ Cocina │  │Gerencia│  │ Tickets││
│ └────────┘  └────────┘ └────────┘  └────────┘  └────────┘ │
│   Browser     Browser    Browser     Browser     Térmica   │
│                                                              │
│                    IP: 192.168.1.x                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘

CONEXIÓN A INTERNET (Opcional)
        │
        ▼
    [Servicios Cloud]
    - Respaldos remotos
    - Actualizaciones
    - Soporte técnico
```

---

**Documento**: Diseño Arquitectural - Diagramas UML

**Versión**: 1.0

**Fecha**: 9 de Diciembre de 2025

**Proyecto**: Sistema de Punto de Venta - Mariscos Castillo
