# 🦐 PROMPT COMPLETO PARA EL BACKEND - MARISCOS CASTILLO POS

Copia y pega este prompt completo en el chat del backend:

---

# 🚀 IMPLEMENTACIÓN COMPLETA DEL MENÚ MARISCOS CASTILLO + INVENTARIOS + EXPLOSIÓN DE RECETAS

Soy desarrollador de un sistema POS para "Mariscos Castillo" con NestJS + MySQL. Necesito que implementes TODO lo siguiente:

## 📋 PARTE 1: ACTUALIZAR/CREAR TABLAS EN LA BASE DE DATOS

```sql
-- ============================================
-- 1. TABLA DE PRODUCTOS (MENÚ COMPLETO - 132 PLATILLOS)
-- ============================================

CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10,2) NOT NULL DEFAULT 0,
  categoria VARCHAR(50) NOT NULL,
  imagen VARCHAR(255),
  disponible BOOLEAN DEFAULT TRUE,
  popular BOOLEAN DEFAULT FALSE,
  especial BOOLEAN DEFAULT FALSE,
  picante ENUM('BAJO', 'MEDIO', 'ALTO') NULL,
  precioVariable BOOLEAN DEFAULT FALSE,
  unidad VARCHAR(20) DEFAULT 'pza',
  porciones INT DEFAULT 1,
  alcoholica BOOLEAN DEFAULT FALSE,
  tiempoPreparacion INT DEFAULT 15 COMMENT 'Minutos',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_categoria (categoria),
  INDEX idx_disponible (disponible),
  INDEX idx_popular (popular)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- 2. TABLA DE INGREDIENTES (INVENTARIO)
-- ============================================

CREATE TABLE IF NOT EXISTS ingredients (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  nombre VARCHAR(255) NOT NULL,
  unidad ENUM('kg', 'g', 'L', 'ml', 'pza', 'manojo', 'diente') NOT NULL,
  stock_actual DECIMAL(10,3) NOT NULL DEFAULT 0,
  stock_minimo DECIMAL(10,3) NOT NULL DEFAULT 2,
  costo_unitario DECIMAL(10,2) NOT NULL,
  proveedor VARCHAR(255),
  categoria_ingrediente ENUM('PROTEINA', 'VERDURA', 'CONDIMENTO', 'LACTEO', 'GRANOS', 'ACEITE', 'BEBIDA') NOT NULL,
  perecedero BOOLEAN DEFAULT TRUE,
  fecha_caducidad DATE NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_stock_bajo (stock_actual, stock_minimo),
  INDEX idx_categoria (categoria_ingrediente)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- 3. TABLA DE RECETAS (EXPLOSIÓN DE INGREDIENTES)
-- ============================================

CREATE TABLE IF NOT EXISTS recipes (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  product_id VARCHAR(36) NOT NULL,
  ingredient_id VARCHAR(36) NOT NULL,
  cantidad DECIMAL(10,3) NOT NULL COMMENT 'Cantidad del ingrediente necesaria',
  unidad VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) ON DELETE CASCADE,
  INDEX idx_product (product_id),
  INDEX idx_ingredient (ingredient_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- 4. TABLA DE MOVIMIENTOS DE INVENTARIO
-- ============================================

CREATE TABLE IF NOT EXISTS inventory_movements (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  ingredient_id VARCHAR(36) NOT NULL,
  tipo ENUM('ENTRADA', 'SALIDA', 'AJUSTE', 'MERMA', 'VENTA') NOT NULL,
  cantidad DECIMAL(10,3) NOT NULL,
  cantidad_anterior DECIMAL(10,3) NOT NULL,
  cantidad_nueva DECIMAL(10,3) NOT NULL,
  motivo VARCHAR(255),
  order_id VARCHAR(36) NULL COMMENT 'Si el movimiento es por una venta',
  usuario_id VARCHAR(36) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id),
  INDEX idx_ingredient (ingredient_id),
  INDEX idx_fecha (created_at),
  INDEX idx_tipo (tipo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- 5. TABLA DE ALERTAS DE INVENTARIO
-- ============================================

CREATE TABLE IF NOT EXISTS inventory_alerts (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  ingredient_id VARCHAR(36) NOT NULL,
  tipo ENUM('STOCK_BAJO', 'PROXIM_CADUCAR', 'CADUCADO', 'FALTANTE') NOT NULL,
  mensaje TEXT NOT NULL,
  leida BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) ON DELETE CASCADE,
  INDEX idx_leida (leida),
  INDEX idx_fecha (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- 6. ACTUALIZAR TABLA DE ÓRDENES (SI NO EXISTE)
-- ============================================

CREATE TABLE IF NOT EXISTS orders (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  mesa_id VARCHAR(36),
  usuario_id VARCHAR(36) NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
  descuento DECIMAL(10,2) DEFAULT 0,
  propina DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  estado ENUM('PENDIENTE', 'EN_COCINA', 'LISTO', 'ENTREGADO', 'PAGADO', 'CANCELADO') DEFAULT 'PENDIENTE',
  tipo_pago ENUM('EFECTIVO', 'TARJETA', 'TRANSFERENCIA', 'MIXTO') NULL,
  notas TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_mesa (mesa_id),
  INDEX idx_estado (estado),
  INDEX idx_fecha (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- 7. TABLA DE ITEMS DE ORDEN
-- ============================================

CREATE TABLE IF NOT EXISTS order_items (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  order_id VARCHAR(36) NOT NULL,
  product_id VARCHAR(36) NOT NULL,
  cantidad INT NOT NULL DEFAULT 1,
  precio_unitario DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  modificadores TEXT COMMENT 'JSON con modificaciones',
  estado ENUM('PENDIENTE', 'EN_PREPARACION', 'LISTO', 'ENTREGADO', 'CANCELADO') DEFAULT 'PENDIENTE',
  tiempo_inicio TIMESTAMP NULL,
  tiempo_fin TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id),
  INDEX idx_order (order_id),
  INDEX idx_estado (estado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

---

## 📋 PARTE 2: INSERTAR LOS 132 PLATILLOS DEL MENÚ

```sql
-- ============================================
-- INSERTAR PRODUCTOS - CATEGORÍA: CAMARONES
-- ============================================

INSERT INTO products (nombre, descripcion, precio, categoria, picante, popular, tiempoPreparacion, imagen) VALUES
('CAMARONES A LA DIABLA (CONCHA)', 'Camarones en salsa picante de chile de árbol', 185.00, 'CAMARONES', 'ALTO', FALSE, 20, 'camarones-diabla.jpg'),
('CAMARONES A LA DIABLA (PULPA)', 'Camarones pelados en salsa diabla', 190.00, 'CAMARONES', 'ALTO', FALSE, 20, 'camarones-diabla-pulpa.jpg'),
('CAMARONES AL MOJO DE AJO (CONCHA)', 'Camarones en aceite de ajo', 185.00, 'CAMARONES', NULL, FALSE, 18, 'camarones-mojo.jpg'),
('CAMARONES AL MOJO DE AJO (PULPA)', 'Camarones pelados al mojo de ajo', 190.00, 'CAMARONES', NULL, FALSE, 18, 'camarones-mojo-pulpa.jpg'),
('CAMARONES EMPANIZADOS', 'Camarones capeados crujientes', 200.00, 'CAMARONES', NULL, FALSE, 25, 'camarones-empanizados.jpg'),
('CAMARONES A LA MANTEQUILLA', 'Camarones en salsa de mantequilla', 190.00, 'CAMARONES', NULL, FALSE, 20, 'camarones-mantequilla.jpg'),
('CAMARONES RANCHEROS', 'Camarones en salsa ranchera', 185.00, 'CAMARONES', 'MEDIO', FALSE, 22, 'camarones-rancheros.jpg'),
('CAMARONES BORRACHOS', 'Camarones flameados con tequila y cerveza', 195.00, 'CAMARONES', NULL, FALSE, 20, 'camarones-borrachos.jpg'),
('CAMARONES AL CHIPOTLE', 'Camarones en crema de chipotle', 195.00, 'CAMARONES', 'MEDIO', FALSE, 20, 'camarones-chipotle.jpg'),
('CAMARONES ENCHILADOS', 'Camarones en salsa de chiles guajillo y ancho', 195.00, 'CAMARONES', 'ALTO', FALSE, 22, 'camarones-enchilados.jpg'),
('CAMARONES CUCARACHA', 'Camarones fritos con cabeza, especiados', 220.00, 'CAMARONES', 'MEDIO', TRUE, 25, 'camarones-cucaracha.jpg'),
('CAMARONES COSTA AZUL', 'Camarones rellenos de queso manchego envueltos en tocino', 250.00, 'CAMARONES', NULL, TRUE, 30, 'camarones-costa-azul.jpg'),
('CAMARONES ZARANDEADOS', 'Camarones asados estilo Nayarit', 210.00, 'CAMARONES', NULL, FALSE, 25, 'camarones-zarandeados.jpg'),
('CAMARONES AL COCO', 'Camarones capeados con coco rayado', 210.00, 'CAMARONES', NULL, FALSE, 25, 'camarones-coco.jpg'),
('CAMARONES MOMIA', 'Camarones envueltos en tocino', 240.00, 'CAMARONES', NULL, FALSE, 28, 'camarones-momia.jpg'),
('CAMARONES AL TEQUILA', 'Camarones flameados con tequila añejo', 210.00, 'CAMARONES', NULL, FALSE, 20, 'camarones-tequila.jpg'),
('CAMARONES A LA CREMA', 'Camarones en salsa de crema y poblano', 195.00, 'CAMARONES', NULL, FALSE, 20, 'camarones-crema.jpg'),
('CAMARONES AL TAMARINDO', 'Camarones en salsa agridulce de tamarindo', 205.00, 'CAMARONES', NULL, FALSE, 22, 'camarones-tamarindo.jpg'),
('CAMARONES GRATINADOS', 'Camarones horneados con queso gratinado', 220.00, 'CAMARONES', NULL, FALSE, 25, 'camarones-gratinados.jpg'),
('BROCHETAS DE CAMARÓN', 'Camarones asados con pimiento y cebolla', 230.00, 'CAMARONES', NULL, FALSE, 25, 'brochetas-camaron.jpg');

-- ============================================
-- CATEGORÍA: PULPOS
-- ============================================

INSERT INTO products (nombre, descripcion, precio, categoria, picante, popular, tiempoPreparacion, imagen) VALUES
('PULPOS ENCEBOLLADOS', 'Pulpo español con cebolla caramelizada', 300.00, 'PULPOS', NULL, FALSE, 30, 'pulpos-encebollados.jpg'),
('PULPOS AL MOJO DE AJO', 'Pulpo en aceite de ajo', 300.00, 'PULPOS', NULL, FALSE, 28, 'pulpos-mojo.jpg'),
('PULPOS A LA DIABLA', 'Pulpo en salsa picante', 310.00, 'PULPOS', 'ALTO', FALSE, 30, 'pulpos-diabla.jpg'),
('PULPOS AL CHIPOTLE', 'Pulpo en crema de chipotle', 310.00, 'PULPOS', 'MEDIO', FALSE, 28, 'pulpos-chipotle.jpg'),
('PULPOS AL AJILLO', 'Pulpo en aceite con ajo rebanado', 310.00, 'PULPOS', NULL, FALSE, 28, 'pulpos-ajillo.jpg'),
('PULPOS ZARANDEADOS', 'Pulpo asado estilo Nayarit', 320.00, 'PULPOS', NULL, FALSE, 35, 'pulpos-zarandeados.jpg'),
('PULPOS GRATINADOS', 'Pulpo horneado con queso', 340.00, 'PULPOS', NULL, FALSE, 30, 'pulpos-gratinados.jpg'),
('CARPACCIO DE PULPO', 'Pulpo en láminas finas con aceite de oliva', 280.00, 'PULPOS', NULL, FALSE, 15, 'carpaccio-pulpo.jpg');

-- ============================================
-- CATEGORÍA: FILETES
-- ============================================

INSERT INTO products (nombre, descripcion, precio, categoria, picante, popular, tiempoPreparacion, imagen) VALUES
('FILETE AL MOJO DE AJO', 'Filete de robalo en aceite de ajo', 180.00, 'FILETES', NULL, FALSE, 18, 'filete-mojo.jpg'),
('FILETE A LA DIABLA', 'Filete en salsa picante', 180.00, 'FILETES', 'ALTO', FALSE, 20, 'filete-diabla.jpg'),
('FILETE EMPANIZADO', 'Filete capeado crujiente', 185.00, 'FILETES', NULL, FALSE, 22, 'filete-empanizado.jpg'),
('FILETE A LA MANTEQUILLA', 'Filete en salsa de mantequilla', 180.00, 'FILETES', NULL, FALSE, 18, 'filete-mantequilla.jpg'),
('FILETE AL CHIPOTLE', 'Filete en crema de chipotle', 190.00, 'FILETES', 'MEDIO', FALSE, 20, 'filete-chipotle.jpg'),
('FILETE RELLENO', 'Filete relleno de mariscos', 220.00, 'FILETES', NULL, TRUE, 25, 'filete-relleno.jpg'),
('FILETE AL AJILLO', 'Filete con ajo rebanado', 185.00, 'FILETES', NULL, FALSE, 18, 'filete-ajillo.jpg'),
('FILETE ZARANDEADO', 'Filete asado estilo Nayarit', 190.00, 'FILETES', NULL, FALSE, 25, 'filete-zarandeado.jpg'),
('FILETE A LA VERACRUZANA', 'Filete con salsa de jitomate, alcaparras y aceitunas', 195.00, 'FILETES', NULL, FALSE, 22, 'filete-veracruzana.jpg'),
('FILETE AL TAMARINDO', 'Filete en salsa agridulce', 195.00, 'FILETES', NULL, FALSE, 20, 'filete-tamarindo.jpg'),
('FILETE GRATINADO', 'Filete horneado con queso', 210.00, 'FILETES', NULL, FALSE, 25, 'filete-gratinado.jpg'),
('FILETE AL CILANTRO', 'Filete en salsa verde de cilantro', 190.00, 'FILETES', NULL, FALSE, 20, 'filete-cilantro.jpg');

-- (Continúa con las demás categorías: PESCADOS, SOPAS, COCTELES, ENTRADAS, ESPECIALIDADES, CARNES, INFANTIL, POSTRES, BEBIDAS)
-- Total: 132 productos
```

---

## 📋 PARTE 3: INSERTAR 50 INGREDIENTES PARA INVENTARIO

```sql
INSERT INTO ingredients (nombre, unidad, stock_actual, stock_minimo, costo_unitario, categoria_ingrediente, proveedor, perecedero) VALUES
-- PROTEÍNAS
('Camarón U15', 'kg', 25.000, 5.000, 180.00, 'PROTEINA', 'Mariscos del Golfo', TRUE),
('Camarón U21', 'kg', 30.000, 8.000, 150.00, 'PROTEINA', 'Mariscos del Golfo', TRUE),
('Pulpo Español', 'kg', 15.000, 3.000, 220.00, 'PROTEINA', 'Mariscos del Golfo', TRUE),
('Filete de Robalo', 'kg', 20.000, 5.000, 160.00, 'PROTEINA', 'Pescados Frescos SA', TRUE),
('Mojarra Entera', 'kg', 25.000, 10.000, 80.00, 'PROTEINA', 'Pescados Frescos SA', TRUE),
('Huachinango', 'kg', 12.000, 3.000, 200.00, 'PROTEINA', 'Pescados Frescos SA', TRUE),
('Jaiba Entera', 'kg', 10.000, 3.000, 120.00, 'PROTEINA', 'Mariscos del Golfo', TRUE),
('Ostiones Frescos', 'kg', 8.000, 2.000, 180.00, 'PROTEINA', 'Mariscos del Golfo', TRUE),
('Almejas', 'kg', 10.000, 2.000, 100.00, 'PROTEINA', 'Mariscos del Golfo', TRUE),
('Langosta', 'kg', 3.000, 0.500, 600.00, 'PROTEINA', 'Mariscos Premium', TRUE),
('Arrachera', 'kg', 8.000, 2.000, 180.00, 'PROTEINA', 'Carnicería El Buen Corte', TRUE),
('Pechuga de Pollo', 'kg', 15.000, 5.000, 80.00, 'PROTEINA', 'Carnicería El Buen Corte', TRUE),
('Tocino', 'kg', 5.000, 2.000, 90.00, 'PROTEINA', 'Carnicería El Buen Corte', TRUE),

-- VERDURAS
('Cebolla Blanca', 'kg', 20.000, 5.000, 18.00, 'VERDURA', 'Verduras Frescas', TRUE),
('Ajo', 'kg', 3.000, 1.000, 80.00, 'VERDURA', 'Verduras Frescas', TRUE),
('Jitomate', 'kg', 25.000, 8.000, 22.00, 'VERDURA', 'Verduras Frescas', TRUE),
('Chile Serrano', 'kg', 3.000, 1.000, 35.00, 'VERDURA', 'Verduras Frescas', TRUE),
('Cilantro', 'manojo', 20.000, 5.000, 8.00, 'VERDURA', 'Verduras Frescas', TRUE),
('Aguacate', 'kg', 15.000, 5.000, 60.00, 'VERDURA', 'Verduras Frescas', TRUE),
('Limón', 'kg', 30.000, 10.000, 25.00, 'VERDURA', 'Verduras Frescas', TRUE),
('Pimiento Morrón', 'kg', 5.000, 2.000, 45.00, 'VERDURA', 'Verduras Frescas', TRUE),
('Pepino', 'kg', 8.000, 3.000, 18.00, 'VERDURA', 'Verduras Frescas', TRUE),
('Zanahoria', 'kg', 10.000, 3.000, 15.00, 'VERDURA', 'Verduras Frescas', TRUE),

-- CONDIMENTOS
('Chile Guajillo', 'kg', 2.000, 0.500, 80.00, 'CONDIMENTO', 'Especias México', FALSE),
('Chile de Árbol', 'kg', 1.500, 0.300, 120.00, 'CONDIMENTO', 'Especias México', FALSE),
('Chipotle en Adobo', 'kg', 3.000, 1.000, 60.00, 'CONDIMENTO', 'Especias México', FALSE),
('Sal', 'kg', 10.000, 2.000, 10.00, 'CONDIMENTO', 'Abarrotes Central', FALSE),
('Pimienta Negra', 'kg', 1.000, 0.200, 150.00, 'CONDIMENTO', 'Especias México', FALSE),
('Orégano', 'kg', 0.500, 0.100, 80.00, 'CONDIMENTO', 'Especias México', FALSE),
('Comino', 'kg', 0.500, 0.100, 90.00, 'CONDIMENTO', 'Especias México', FALSE),

-- LÁCTEOS
('Queso Manchego', 'kg', 8.000, 2.000, 150.00, 'LACTEO', 'Lácteos San José', TRUE),
('Queso Crema', 'kg', 5.000, 2.000, 80.00, 'LACTEO', 'Lácteos San José', TRUE),
('Crema', 'L', 10.000, 3.000, 45.00, 'LACTEO', 'Lácteos San José', TRUE),
('Mantequilla', 'kg', 8.000, 2.000, 100.00, 'LACTEO', 'Lácteos San José', TRUE),
('Leche', 'L', 20.000, 5.000, 25.00, 'LACTEO', 'Lácteos San José', TRUE),

-- GRANOS
('Arroz', 'kg', 50.000, 10.000, 18.00, 'GRANOS', 'Abarrotes Central', FALSE),
('Harina', 'kg', 20.000, 5.000, 22.00, 'GRANOS', 'Abarrotes Central', FALSE),
('Pan Molido', 'kg', 5.000, 2.000, 35.00, 'GRANOS', 'Panadería La Espiga', FALSE),

-- ACEITES
('Aceite Vegetal', 'L', 30.000, 10.000, 35.00, 'ACEITE', 'Abarrotes Central', FALSE),
('Aceite de Oliva', 'L', 5.000, 1.000, 180.00, 'ACEITE', 'Abarrotes Central', FALSE),

-- BEBIDAS
('Coca-Cola 600ml', 'pza', 200.000, 50.000, 12.00, 'BEBIDA', 'Refrescos del Sur', FALSE),
('Cerveza Corona', 'pza', 150.000, 30.000, 18.00, 'BEBIDA', 'Cervezas Nacionales', FALSE),
('Agua Mineral', 'pza', 100.000, 30.000, 15.00, 'BEBIDA', 'Distribuidora Agua', FALSE),

-- OTROS
('Coco Rallado', 'kg', 3.000, 1.000, 70.00, 'CONDIMENTO', 'Ingredientes Especiales', FALSE),
('Tamarindo', 'kg', 2.000, 0.500, 50.00, 'CONDIMENTO', 'Ingredientes Especiales', FALSE),
('Tequila (Cocina)', 'L', 3.000, 1.000, 300.00, 'BEBIDA', 'Licorería Premium', FALSE),
('Caldo de Pescado', 'L', 10.000, 3.000, 80.00, 'CONDIMENTO', 'Caldos Caseros', TRUE);
```

---

## 📋 PARTE 4: INSERTAR 80 RECETAS (EXPLOSIÓN DE INGREDIENTES)

```sql
-- Ejemplo: Camarones a la Diabla
INSERT INTO recipes (product_id, ingredient_id, cantidad, unidad) VALUES
((SELECT id FROM products WHERE nombre = 'CAMARONES A LA DIABLA (CONCHA)' LIMIT 1), 
 (SELECT id FROM ingredients WHERE nombre = 'Camarón U15' LIMIT 1), 
 0.200, 'kg'),
 
((SELECT id FROM products WHERE nombre = 'CAMARONES A LA DIABLA (CONCHA)' LIMIT 1), 
 (SELECT id FROM ingredients WHERE nombre = 'Chile de Árbol' LIMIT 1), 
 0.050, 'kg'),
 
((SELECT id FROM products WHERE nombre = 'CAMARONES A LA DIABLA (CONCHA)' LIMIT 1), 
 (SELECT id FROM ingredients WHERE nombre = 'Ajo' LIMIT 1), 
 0.030, 'kg'),
 
((SELECT id FROM products WHERE nombre = 'CAMARONES A LA DIABLA (CONCHA)' LIMIT 1), 
 (SELECT id FROM ingredients WHERE nombre = 'Aceite Vegetal' LIMIT 1), 
 0.050, 'L');

-- Repetir para los 80 platillos principales con sus ingredientes
-- (Camarones, Pulpos, Filetes, Sopas, etc.)
```

---

## 📋 PARTE 5: CREAR ENDPOINTS EN EL BACKEND

### 1. **Products Endpoints** (productos.controller.ts)

```typescript
// GET /api/products - Obtener todos los productos
// GET /api/products/:id - Obtener un producto
// GET /api/products/category/:categoria - Filtrar por categoría
// POST /api/products - Crear producto (SOLO GERENTE)
// PUT /api/products/:id - Actualizar producto (SOLO GERENTE)
// DELETE /api/products/:id - Eliminar producto (SOLO GERENTE)
// PATCH /api/products/:id/disponible - Cambiar disponibilidad
```

### 2. **Inventory Endpoints** (inventario.controller.ts)

```typescript
// GET /api/inventory - Ver todo el inventario
// GET /api/inventory/alerts - Alertas de stock bajo
// GET /api/inventory/movements - Historial de movimientos
// POST /api/inventory/entrada - Registrar entrada de ingredientes
// POST /api/inventory/salida - Registrar salida manual
// POST /api/inventory/ajuste - Ajuste de inventario
// GET /api/inventory/explosion/:orderId - Ver explosión de receta de una orden
```

### 3. **Orders Endpoints** (orders.controller.ts)

```typescript
// POST /api/orders - Crear orden
// GET /api/orders/:id - Ver orden
// GET /api/orders/mesa/:mesaId - Ver órdenes de una mesa
// PATCH /api/orders/:id/estado - Cambiar estado
// POST /api/orders/:id/pagar - Procesar pago

// IMPORTANTE: Al crear una orden, descontar automáticamente el inventario
async createOrder(orderData) {
  // 1. Crear la orden
  const order = await this.ordersRepository.save(orderData);
  
  // 2. Por cada item de la orden
  for (const item of order.items) {
    // 3. Buscar la receta del producto
    const recetas = await this.recipesRepository.find({
      where: { product_id: item.product_id }
    });
    
    // 4. Descontar ingredientes automáticamente
    for (const receta of recetas) {
      await this.inventoryService.descontarIngrediente(
        receta.ingredient_id,
        receta.cantidad * item.cantidad,
        order.id
      );
    }
  }
  
  return order;
}
```

### 4. **Kitchen Endpoints** (cocina.controller.ts)

```typescript
// GET /api/kitchen/pending - Órdenes pendientes en cocina
// PATCH /api/kitchen/:itemId/preparando - Marcar como "en preparación"
// PATCH /api/kitchen/:itemId/listo - Marcar como "listo"
// GET /api/kitchen/stats - Estadísticas de cocina
```

### 5. **Cashier Endpoints** (caja.controller.ts)

```typescript
// GET /api/cashier/active-orders - Todas las órdenes activas
// POST /api/cashier/close/:orderId - Cerrar cuenta
// POST /api/cashier/split-payment - División de cuenta
// GET /api/cashier/daily-summary - Resumen del día
// POST /api/cashier/cash-closing - Corte de caja
```

---

## 📋 PARTE 6: SOCKET.IO PARA TIEMPO REAL

```typescript
// En gateway.ts

@WebSocketGateway({ cors: true })
export class EventsGateway {
  
  @WebSocketServer()
  server: Server;
  
  // Cuando se crea una orden
  notifyNewOrder(order: Order) {
    this.server.emit('new-order', {
      orderId: order.id,
      mesa: order.mesa_id,
      items: order.items,
      timestamp: new Date()
    });
  }
  
  // Cuando un platillo está listo
  notifyOrderReady(orderItemId: string) {
    this.server.emit('order-ready', {
      orderItemId,
      timestamp: new Date()
    });
  }
  
  // Alertas de inventario bajo
  notifyLowStock(ingredient: Ingredient) {
    this.server.emit('low-stock-alert', {
      ingredientId: ingredient.id,
      nombre: ingredient.nombre,
      stockActual: ingredient.stock_actual,
      stockMinimo: ingredient.stock_minimo
    });
  }
}
```

---

## 📋 PARTE 7: SCRIPT DE SEED AUTOMÁTICO

Crea un archivo `seed-menu.ts`:

```typescript
import { Connection } from 'typeorm';
import { menuCompleto } from './data/menu-castillo';
import { ingredientes } from './data/ingredientes';
import { recetas } from './data/recetas';

export async function seedDatabase(connection: Connection) {
  console.log('🦐 Iniciando seed del menú Mariscos Castillo...');
  
  // 1. Insertar productos
  console.log('📋 Insertando 132 productos...');
  await connection.query(`INSERT INTO products (...) VALUES (...)`);
  
  // 2. Insertar ingredientes
  console.log('🥘 Insertando 50 ingredientes...');
  await connection.query(`INSERT INTO ingredients (...) VALUES (...)`);
  
  // 3. Insertar recetas
  console.log('📖 Insertando 80 recetas...');
  await connection.query(`INSERT INTO recipes (...) VALUES (...)`);
  
  console.log('✅ Seed completado exitosamente');
}
```

Luego en `package.json`:

```json
{
  "scripts": {
    "seed:menu-castillo": "ts-node src/database/seed-menu.ts"
  }
}
```

---

## 📋 PARTE 8: FUNCIONES ESPECIALES

### 1. Descuento Automático de Inventario

```typescript
async descontarInventarioPorOrden(orderId: string) {
  const order = await this.ordersRepository.findOne({
    where: { id: orderId },
    relations: ['items']
  });
  
  for (const item of order.items) {
    const recetas = await this.recipesRepository.find({
      where: { product_id: item.product_id }
    });
    
    for (const receta of recetas) {
      const cantidadTotal = receta.cantidad * item.cantidad;
      
      await this.ingredientsRepository.decrement(
        { id: receta.ingredient_id },
        'stock_actual',
        cantidadTotal
      );
      
      // Registrar movimiento
      await this.inventoryMovementsRepository.save({
        ingredient_id: receta.ingredient_id,
        tipo: 'VENTA',
        cantidad: cantidadTotal,
        motivo: `Venta - Orden #${orderId}`,
        order_id: orderId
      });
      
      // Verificar si hay stock bajo
      await this.checkStockBajo(receta.ingredient_id);
    }
  }
}
```

### 2. Alertas Automáticas de Stock

```typescript
async checkStockBajo(ingredientId: string) {
  const ingredient = await this.ingredientsRepository.findOne({
    where: { id: ingredientId }
  });
  
  if (ingredient.stock_actual <= ingredient.stock_minimo) {
    await this.inventoryAlertsRepository.save({
      ingredient_id: ingredientId,
      tipo: 'STOCK_BAJO',
      mensaje: `Stock bajo: ${ingredient.nombre} (${ingredient.stock_actual} ${ingredient.unidad})`
    });
    
    // Notificar vía Socket
    this.eventsGateway.notifyLowStock(ingredient);
  }
}
```

---

## 🎯 RESUMEN DE LO QUE DEBES IMPLEMENTAR

✅ **7 Tablas nuevas** en MySQL  
✅ **132 Productos** del menú real  
✅ **50 Ingredientes** para inventario  
✅ **80 Recetas** con explosión automática  
✅ **8 Controllers** (products, inventory, orders, kitchen, cashier, etc.)  
✅ **WebSocket** para notificaciones en tiempo real  
✅ **Descuento automático** de inventario al crear orden  
✅ **Alertas automáticas** cuando stock < mínimo  
✅ **Script seed** para cargar todo con `npm run seed:menu-castillo`

---

## 🚀 COMANDOS PARA EJECUTAR

```bash
# 1. Ejecutar migraciones
npm run migration:run

# 2. Cargar el menú completo
npm run seed:menu-castillo

# 3. Iniciar el servidor
npm run start:dev

# 4. Verificar que todo funcionó
curl http://localhost:3000/api/products
curl http://localhost:3000/api/inventory
```

---

**IMPLEMENTA TODO ESTO Y GENERA LOS ARCHIVOS COMPLETOS.**
