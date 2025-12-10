# DISEÑO DE INTERFACES
## Sistema de Punto de Venta - Mariscos Castillo

---

## ÍNDICE

1. Especificaciones de Interfaz para Gerente/Administrador
2. Especificaciones de Interfaz para Mesero
3. Especificaciones de Interfaz para Cocina
4. Especificaciones de Interfaz para Cajero
5. Componentes Comunes del Sistema
6. Guía de Estilos y Diseño

---

## 1. ESPECIFICACIONES DE INTERFAZ PARA GERENTE/ADMINISTRADOR

### 1.1 Pantalla de Login

**Descripción**: Pantalla de autenticación para todos los usuarios

**Elementos**:
- Logo de Mariscos Castillo
- Campo de texto: Usuario
- Campo de contraseña: Password (oculto)
- Botón: "Iniciar Sesión"
- Mensaje de error (si credenciales inválidas)

**Funcionalidad**:
- Validar credenciales contra base de datos
- Redirigir según el rol del usuario
- Mostrar mensajes de error claros

---

### 1.2 Dashboard Gerencial

**Descripción**: Pantalla principal con métricas y resumen del día

**Secciones**:

1. **Header/Navbar**
   - Logo "Mariscos Castillo"
   - Nombre del usuario: "Gerente: [Nombre]"
   - Botón: "Cerrar Sesión"
   - Fecha y hora actual

2. **Menú de Navegación Lateral**
   - Dashboard (activo)
   - Ventas
   - Inventario
   - Compras
   - Productos
   - Proveedores
   - Empleados
   - Mesas
   - Clientes
   - Reportes
   - Configuración

3. **Panel de Métricas del Día** (Cards/Tarjetas)
   - **Ventas del Día**: $X,XXX.XX
   - **Órdenes Procesadas**: XX órdenes
   - **Ticket Promedio**: $XXX.XX
   - **Mesas Ocupadas**: X/XX

4. **Gráfica de Ventas**
   - Gráfica de barras o líneas
   - Ventas por hora del día
   - Comparativa con días anteriores

5. **Productos Más Vendidos** (Tabla)
   - Columnas: Producto, Cantidad, Total
   - Top 5 o 10 productos

6. **Órdenes Activas** (Lista)
   - Mesa, Mesero, Estado, Total
   - Actualización en tiempo real

7. **Alertas de Inventario**
   - Productos con bajo stock
   - Color rojo para llamar atención

**Colores**:
- Primario: Azul marino (#1e3a8a)
- Secundario: Naranja (#f97316)
- Éxito: Verde (#10b981)
- Advertencia: Amarillo (#fbbf24)
- Error: Rojo (#ef4444)

---

### 1.3 Gestión de Productos

**Descripción**: CRUD completo de productos del menú

**Vista de Lista**:
- Tabla con columnas:
  - Código
  - Imagen (thumbnail)
  - Nombre
  - Categoría
  - Precio
  - Stock
  - Estado (Activo/Inactivo)
  - Acciones (Editar, Eliminar)
- Búsqueda por nombre o código
- Filtro por categoría
- Filtro por estado
- Botón: "+ Nuevo Producto"
- Paginación (10, 20, 50 por página)

**Modal de Crear/Editar Producto**:
- Campos:
  - Código* (autocompletado o manual)
  - Nombre*
  - Descripción
  - Categoría* (dropdown)
  - Precio*
  - Costo
  - Stock Actual*
  - Stock Mínimo*
  - Imagen (carga de archivo)
  - Estado (toggle Activo/Inactivo)
- Botones:
  - "Guardar"
  - "Cancelar"
- Validaciones en tiempo real
- Mensaje de confirmación al guardar

**Modal de Eliminar**:
- Mensaje: "¿Está seguro de eliminar el producto [Nombre]?"
- Advertencia si tiene movimientos
- Botones: "Sí, Eliminar" (rojo), "Cancelar"

---

### 1.4 Gestión de Inventario

**Descripción**: Control y monitoreo del inventario

**Vista Principal**:
- Pestañas:
  - **Inventario Actual**
  - **Movimientos**
  - **Ajustes**

**Pestaña: Inventario Actual**:
- Tabla con:
  - Código
  - Nombre
  - Cantidad Actual
  - Unidad
  - Stock Mínimo
  - Estado (Normal/Bajo/Crítico) - con colores
- Botón: "Exportar a PDF"
- Botón: "Realizar Inventario Físico"
- Filtros: por categoría, estado de stock

**Pestaña: Movimientos**:
- Filtros:
  - Rango de fechas
  - Tipo de movimiento (Entrada/Salida)
  - Producto específico
- Tabla:
  - Fecha
  - Tipo
  - Producto
  - Cantidad
  - Referencia (Compra/Venta)
  - Usuario
- Botón: "Generar Reporte PDF"

**Modal: Ajuste de Inventario**:
- Seleccionar producto
- Cantidad a ajustar (+/-)
- Motivo (Merma, Corrección, Devolución, etc.)
- Observaciones
- Botón: "Registrar Ajuste"

---

### 1.5 Gestión de Compras

**Descripción**: Registro de compras a proveedores

**Vista de Lista**:
- Tabla de compras:
  - Folio
  - Fecha
  - Proveedor
  - Total
  - Usuario
  - Acciones (Ver, Editar, Eliminar)
- Botón: "+ Nueva Compra"
- Filtros: por proveedor, rango de fechas

**Formulario de Nueva Compra**:
- Folio* (ingresado por usuario)
- Proveedor* (dropdown)
- Fecha* (date picker)
- Tabla de productos:
  - Buscar producto/ingrediente
  - Cantidad
  - Precio Unitario
  - Subtotal (automático)
  - Botón eliminar (X)
- Botón: "+ Agregar Producto"
- Total de la Compra (automático)
- Observaciones (textarea)
- Botones:
  - "Guardar Compra"
  - "Cancelar"

---

### 1.6 Reportes

**Descripción**: Generación de reportes en PDF

**Vista de Reportes**:
- Lista de tipos de reportes:
  
  **Catálogos**:
  - □ Listado de Productos
  - □ Listado de Ingredientes
  - □ Listado de Proveedores
  - □ Listado de Clientes
  - □ Listado de Empleados
  - □ Listado de Precios

  **Inventario**:
  - □ Inventario Actual
  - □ Movimientos de Inventario

  **Ventas**:
  - □ Ventas por Período
  - □ Ventas por Método de Pago
  - □ Productos Más Vendidos
  - □ Ventas por Mesero

  **Gerenciales**:
  - □ Dashboard Ejecutivo
  - □ Análisis de Rentabilidad

- Al seleccionar un reporte, mostrar:
  - Parámetros específicos (fechas, filtros)
  - Botón: "Generar PDF"
- Previsualización del PDF
- Botón: "Descargar"

---

### 1.7 Gestión de Empleados

**Vista de Lista**:
- Tabla con:
  - Código
  - Nombre
  - Rol
  - Usuario
  - Teléfono
  - Estado
  - Acciones
- Botón: "+ Nuevo Empleado"

**Modal Crear/Editar Empleado**:
- Código*
- Nombre Completo*
- Rol* (dropdown: Gerente, Mesero, Cocina, Cajero)
- Teléfono
- Email
- Dirección
- Usuario de Acceso*
- Contraseña* (solo al crear)
- Estado (toggle)
- Botones: "Guardar", "Cancelar"

---

### 1.8 Configuración de Mesas

**Vista de Mapa de Mesas**:
- Representación visual de mesas
- Cada mesa muestra:
  - Número de mesa
  - Capacidad (icono de personas)
  - Estado (color):
    * Verde: Disponible
    * Rojo: Ocupada
    * Amarillo: Reservada
    * Gris: Fuera de Servicio
- Botón: "+ Agregar Mesa"
- Vista de lista alternativa (tabla)

**Modal Configurar Mesa**:
- Número de Mesa*
- Capacidad* (número de comensales)
- Zona* (dropdown: Principal, Terraza, VIP, etc.)
- Estado
- Mesa Activa (toggle)
- Botones: "Guardar", "Cancelar"

---

## 2. ESPECIFICACIONES DE INTERFAZ PARA MESERO

### 2.1 Dashboard Mesero

**Descripción**: Vista principal para meseros

**Elementos**:
- Header:
  - Logo
  - "Mesero: [Nombre]"
  - Botón "Cerrar Sesión"

- Menú:
  - Mesas
  - Nueva Orden
  - Mis Órdenes

- Vista de Mesas:
  - Mapa visual de mesas
  - Color según estado
  - Click en mesa para ver detalles

---

### 2.2 Tomar Orden

**Descripción**: Interfaz para crear órdenes

**Pantalla dividida en dos columnas**:

**Columna Izquierda: Menú de Productos**
- Búsqueda rápida (barra de búsqueda)
- Filtros por categoría (tabs):
  - Todas
  - Entradas
  - Platos Fuertes
  - Bebidas
  - Postres
- Grid de productos (cards):
  - Imagen del producto
  - Nombre
  - Precio
  - Botón "+" para agregar

**Columna Derecha: Resumen de Orden**
- Encabezado:
  - Mesa: [Número]
  - Mesero: [Nombre]
- Lista de productos agregados:
  - Nombre del producto
  - Cantidad (botones +/-) 
  - Precio unitario
  - Subtotal
  - Campo de notas especiales
  - Botón eliminar (X)
- Resumen:
  - Subtotal: $XXX.XX
  - Impuestos (16%): $XX.XX
  - **Total: $XXX.XX**
- Botones:
  - "Enviar a Cocina" (verde, grande)
  - "Guardar Borrador"
  - "Cancelar"

---

### 2.3 Mis Órdenes

**Descripción**: Ver órdenes activas del mesero

**Vista de Lista**:
- Cards por orden:
  - Folio
  - Mesa
  - Hora
  - Estado (badge con color):
    * Pendiente (gris)
    * En Preparación (amarillo)
    * Listo (verde)
    * Entregado (azul)
  - Total
  - Botón: "Ver Detalle"
  - Botón: "Marcar Entregado" (si está listo)

**Modal de Detalle**:
- Info de la orden
- Lista de productos con estados individuales
- Tiempo transcurrido
- Botón: "Cerrar"

---

## 3. ESPECIFICACIONES DE INTERFAZ PARA COCINA

### 3.1 Panel de Cocina

**Descripción**: Vista de órdenes para cocina

**Pantalla Principal**:
- Header:
  - "Cocina - Mariscos Castillo"
  - Reloj en tiempo real
  - Botón "Cerrar Sesión"

- Tabs:
  - **Pendientes** (con contador: XX)
  - **En Preparación** (con contador: XX)
  - **Completados**

**Vista de Órdenes Pendientes**:
- Cards de órdenes (ordenadas por hora):
  - **Folio**: 12-09-2025-001
  - **Mesa**: 5
  - **Mesero**: Juan Pérez
  - **Hora**: 14:35
  - **Tiempo**: 5 min (actualización en tiempo real)
  - Lista de productos:
    * 2x Ceviche de Camarón
    * 1x Filete Empanizado
    * Notas: "Sin cebolla"
  - Botón grande: "Iniciar Preparación" (amarillo)

**Vista En Preparación**:
- Mismo formato
- Botón: "Marcar como Listo" (verde)

**Vista Completados**:
- Historial de órdenes completadas del día
- Solo lectura

**Notificaciones**:
- Sonido y notificación visual cuando llega nueva orden
- Badge parpadeante en tab "Pendientes"

---

## 4. ESPECIFICACIONES DE INTERFAZ PARA CAJERO

### 4.1 Punto de Venta

**Descripción**: Procesar pagos

**Pantalla Principal**:
- Header:
  - "Caja - Mariscos Castillo"
  - Cajero: [Nombre]
  - Turno: [Hora Apertura]
  - Botón "Cerrar Sesión"

- Menú:
  - Cobrar
  - Mi Caja
  - Corte de Caja

**Vista de Mesas con Cuenta**:
- Grid de cards:
  - Mesa [Número]
  - Mesero
  - Tiempo
  - Total a pagar: $XXX.XX
  - Botón: "Cobrar"

**Modal de Cobro**:
- Sección superior:
  - Mesa: [Número]
  - Mesero: [Nombre]
  - Folio: [XXXX]

- Detalle de Consumo (tabla):
  - Cant. | Producto | P.U. | Total
  - ...

- Totales:
  - Subtotal: $XXX.XX
  - Impuestos: $XX.XX
  - Propina: $XX.XX (editable)
  - **TOTAL: $XXX.XX** (grande, destacado)

- Método de Pago (botones grandes):
  - [💵 Efectivo]
  - [💳 Tarjeta]
  - [🏦 Transferencia]

- Si selecciona Efectivo:
  - Campo: Monto Recibido
  - Mostrar: Cambio: $XX.XX (grande, verde)

- Botones:
  - "Procesar Pago e Imprimir" (verde, grande)
  - "Cancelar"

---

### 4.2 Mi Caja

**Vista de Caja Actual**:
- Card de información:
  - Fecha y Hora de Apertura
  - Saldo Inicial: $XXX.XX
  - Ventas del Turno: $X,XXX.XX
  - Total en Caja: $X,XXX.XX

- Tabla de Ventas del Turno:
  - Folio | Mesa | Total | Método | Hora

---

### 4.3 Corte de Caja

**Formulario de Corte**:
- Resumen Automático:
  - Saldo Inicial: $XXX.XX
  - Total Efectivo: $XXX.XX
  - Total Tarjeta: $XXX.XX
  - Total Transferencia: $XXX.XX
  - **Efectivo Esperado**: $X,XXX.XX

- Conteo Real:
  - Campo: Efectivo Real en Caja*
  - Calcular: Diferencia: $XX.XX (verde si 0, rojo si no)

- Observaciones (textarea)

- Botones:
  - "Generar Corte y PDF" (azul)
  - "Cancelar"

---

## 5. COMPONENTES COMUNES DEL SISTEMA

### 5.1 Navbar/Header

- Logo a la izquierda
- Título de la sección al centro
- Usuario y rol a la derecha
- Botón de cerrar sesión

### 5.2 Sidebar de Navegación

- Lista vertical de opciones
- Icono + Texto
- Hover effect
- Active state (color diferente)
- Collapsible en móvil

### 5.3 Tablas de Datos

- Header con títulos de columna
- Filas alternadas (zebra striping)
- Hover en filas
- Paginación al pie
- Ordenamiento por columna (opcional)

### 5.4 Modales

- Fondo oscuro semitransparente
- Caja blanca centrada
- Título en la parte superior
- Botón X para cerrar (esquina superior derecha)
- Botones de acción al pie

### 5.5 Botones

**Primario** (Azul): Acción principal
**Secundario** (Gris): Cancelar
**Éxito** (Verde): Confirmar, Guardar
**Peligro** (Rojo): Eliminar
**Advertencia** (Amarillo): Precaución

### 5.6 Formularios

- Labels claros arriba de cada campo
- Asterisco (*) en campos obligatorios
- Validación en tiempo real
- Mensajes de error debajo del campo en rojo
- Placeholder text descriptivo

### 5.7 Notificaciones/Toasts

- Aparecen en esquina superior derecha
- Colores según tipo (éxito, error, info, advertencia)
- Se ocultan automáticamente después de 3-5 segundos
- Icono según el tipo
- Botón X para cerrar manualmente

---

## 6. GUÍA DE ESTILOS Y DISEÑO

### 6.1 Paleta de Colores

**Colores Principales**:
- **Primario**: #1e3a8a (Azul Marino) - Botones principales, navbar
- **Secundario**: #f97316 (Naranja) - Acentos, logos
- **Éxito**: #10b981 (Verde) - Confirmaciones, estados positivos
- **Advertencia**: #fbbf24 (Amarillo) - Alertas, precaución
- **Error**: #ef4444 (Rojo) - Errores, eliminaciones
- **Info**: #3b82f6 (Azul Claro) - Información

**Colores de Fondo**:
- Fondo principal: #f9fafb (Gris muy claro)
- Fondo cards: #ffffff (Blanco)
- Fondo sidebar: #1f2937 (Gris oscuro)

**Texto**:
- Principal: #111827 (Negro suave)
- Secundario: #6b7280 (Gris)
- Invertido: #ffffff (Blanco)

### 6.2 Tipografía

- **Fuente**: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
- **Tamaños**:
  - Títulos H1: 2.5rem (40px)
  - Títulos H2: 2rem (32px)
  - Títulos H3: 1.5rem (24px)
  - Texto normal: 1rem (16px)
  - Texto pequeño: 0.875rem (14px)

### 6.3 Espaciado

- Margen entre secciones: 2rem (32px)
- Padding de cards: 1.5rem (24px)
- Espaciado entre elementos: 1rem (16px)

### 6.4 Bordes y Sombras

- Border radius: 0.5rem (8px) para cards
- Border radius: 0.375rem (6px) para botones
- Sombra de cards: 0 1px 3px rgba(0,0,0,0.12)
- Sombra de hover: 0 4px 6px rgba(0,0,0,0.1)

### 6.5 Responsive Design

**Breakpoints**:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

**Adaptaciones**:
- Sidebar colapsable en móvil (hamburger menu)
- Tablas scrollables horizontalmente en móvil
- Grid de productos 2 columnas en móvil, 4+ en desktop
- Botones full-width en móvil

### 6.6 Iconografía

- Usar iconos consistentes (Font Awesome, Hero Icons, o React Icons)
- Tamaño estándar: 1.25rem (20px)
- Tamaño en botones: 1rem (16px)
- Color: heredar del texto o personalizado según contexto

---

**Documento**: Diseño de Interfaces

**Versión**: 1.0

**Fecha**: 9 de Diciembre de 2025

**Proyecto**: Sistema de Punto de Venta - Mariscos Castillo
