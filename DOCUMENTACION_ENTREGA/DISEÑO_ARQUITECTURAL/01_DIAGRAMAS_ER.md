# DISEÑO ARQUITECTURAL
## Sistema de Punto de Venta - Mariscos Castillo
### DIAGRAMAS ENTIDAD-RELACIÓN

---

## ÍNDICE

1. Diagramas ER por Requerimiento Funcional
2. Diagrama ER del Sistema Completo
3. Descripción de Entidades y Relaciones
4. Diccionario de Datos

---

## 1. DIAGRAMAS ER POR REQUERIMIENTO FUNCIONAL

### 1.1 Diagrama ER - Gestión de Ventas

```
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│              │         │              │         │              │
│   USUARIOS   │─────────│   ORDENES    │─────────│    MESAS     │
│              │ mesero  │              │ mesa    │              │
└──────────────┘         └──────────────┘         └──────────────┘
      PK: id                  PK: id                   PK: id
   codigo (UNIQUE)           folio (UNIQUE)         numero_mesa (UNIQUE)
   nombre                    fecha                  capacidad
   rol                       hora                   zona
   usuario (UNIQUE)          subtotal               estado
   password_hash             impuestos              activa
   activo                    propina
                             total
                             estado
          │                  pagada                       
          │                  metodo_pago
          │                       │
          │                       │
          │              ┌──────────────────┐
          │              │                  │
          └──────────────│ DETALLE_ORDENES  │
                         │                  │
                         └──────────────────┘
                              PK: id
                              orden_id (FK)
                              producto_id (FK)
                              cantidad
                              precio_unitario
                              subtotal
                              notas
                                    │
                                    │
                         ┌──────────────────┐
                         │                  │
                         │    PRODUCTOS     │
                         │                  │
                         └──────────────────┘
                              PK: id
                              codigo (UNIQUE)
                              nombre
                              descripcion
                              precio
                              categoria_id (FK)
                              stock_actual
                              stock_minimo
                              costo
                              imagen_url
                              activo
                                    │
                                    │
                         ┌──────────────────┐
                         │                  │
                         │   CATEGORIAS     │
                         │                  │
                         └──────────────────┘
                              PK: id
                              nombre
                              descripcion
                              activo
```

**Descripción**:
- Un USUARIO (mesero) puede crear múltiples ORDENES
- Una ORDEN pertenece a una MESA específica
- Una ORDEN contiene múltiples DETALLE_ORDENES (productos)
- Cada DETALLE_ORDEN está asociado a un PRODUCTO
- Los PRODUCTOS están organizados en CATEGORIAS

---

### 1.2 Diagrama ER - Gestión de Compras

```
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│              │         │              │         │              │
│   USUARIOS   │─────────│   COMPRAS    │─────────│  PROVEEDORES │
│              │ usuario │              │proveedor│              │
└──────────────┘         └──────────────┘         └──────────────┘
      PK: id                  PK: id                   PK: id
   codigo (UNIQUE)           folio (UNIQUE)         codigo (UNIQUE)
   nombre                    fecha                  nombre
   rol                       total                  rfc
   activo                    observaciones          telefono
                                                    email
                                  │                 direccion
                                  │                 activo
                                  │
                         ┌──────────────────┐
                         │                  │
                         │ DETALLE_COMPRAS  │
                         │                  │
                         └──────────────────┘
                              PK: id
                              compra_id (FK)
                              producto_ingrediente_id
                              tipo (producto/ingrediente)
                              cantidad
                              precio_unitario
                              subtotal
                                    │
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
         ┌──────────────────┐           ┌──────────────────┐
         │                  │           │                  │
         │    PRODUCTOS     │           │   INGREDIENTES   │
         │                  │           │                  │
         └──────────────────┘           └──────────────────┘
              PK: id                         PK: id
           codigo (UNIQUE)                codigo (UNIQUE)
           nombre                         nombre
           precio                         unidad_medida
           stock_actual                   costo_unitario
           stock_minimo                   stock_actual
           activo                         stock_minimo
                                          proveedor_id (FK)
                                          activo
```

**Descripción**:
- Un USUARIO registra múltiples COMPRAS
- Una COMPRA está asociada a un PROVEEDOR
- Una COMPRA contiene múltiples DETALLE_COMPRAS
- Cada DETALLE_COMPRA puede ser un PRODUCTO o un INGREDIENTE
- Los INGREDIENTES tienen un proveedor principal asociado

---

### 1.3 Diagrama ER - Gestión de Inventario

```
┌──────────────────────┐
│                      │
│ MOVIMIENTOS_         │
│ INVENTARIO           │
│                      │
└──────────────────────┘
       PK: id
    producto_ingrediente_id
    tipo_item (producto/ingrediente)
    tipo_movimiento (entrada/salida)
    cantidad
    costo_unitario
    referencia_tipo (compra/venta/ajuste)
    referencia_id
    fecha
    hora
    usuario_id (FK)
    observaciones
            │
            │
    ┌───────┴────────┐
    │                │
    ▼                ▼
┌──────────┐    ┌──────────────┐
│PRODUCTOS │    │ INGREDIENTES │
└──────────┘    └──────────────┘
   PK: id            PK: id
   codigo            codigo
   stock_actual      stock_actual
   stock_minimo      stock_minimo
   activo            activo

         ┌──────────────┐
         │   USUARIOS   │
         └──────────────┘
              PK: id
           nombre
           rol
```

**Descripción**:
- MOVIMIENTOS_INVENTARIO registra todos los movimientos de productos e ingredientes
- Puede referenciar COMPRAS, VENTAS (ORDENES) o AJUSTES
- Cada movimiento está asociado a un USUARIO responsable
- Actualiza automáticamente stock_actual en PRODUCTOS o INGREDIENTES

---

### 1.4 Diagrama ER - Módulo de Caja

```
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│              │         │              │         │              │
│   USUARIOS   │─────────│     CAJA     │         │   ORDENES    │
│   (cajero)   │ usuario │              │         │  (pagadas)   │
└──────────────┘         └──────────────┘         └──────────────┘
      PK: id                  PK: id                   PK: id
   codigo                    fecha_apertura         folio
   nombre                    hora_apertura          total
   rol: 'cajero'             saldo_inicial          metodo_pago
   activo                    fecha_cierre           estado: 'pagada'
                             hora_cierre            fecha
                             total_efectivo
                             total_tarjeta
                             total_transferencia
                             efectivo_esperado
                             efectivo_real
                             diferencia
                             observaciones

Relación:
- Las ORDENES pagadas durante el turno se asocian con el período de CAJA
- El corte de CAJA totaliza las ORDENES del período
```

**Descripción**:
- Un USUARIO (cajero) abre una CAJA
- Durante el turno se procesan múltiples ORDENES
- Al final se realiza el corte de CAJA
- Se calculan totales por método de pago
- Se registra diferencia entre efectivo esperado y real

---

### 1.5 Diagrama ER - Catálogos del Sistema

```
┌──────────────┐
│  CATEGORIAS  │
└──────────────┘
     PK: id
   nombre
   descripcion
   activo
       │
       │ 1:N
       │
┌──────────────┐         ┌──────────────┐
│   PRODUCTOS  │         │  PROVEEDORES │
└──────────────┘         └──────────────┘
     PK: id                   PK: id
   codigo (UNIQUE)          codigo (UNIQUE)
   nombre                   nombre
   descripcion              rfc
   precio                   telefono
   categoria_id (FK)        email
   stock_actual             direccion
   stock_minimo             activo
   costo                         │
   imagen_url                    │
   activo                        │ N:1
                                 │
                         ┌──────────────┐
                         │ INGREDIENTES │
                         └──────────────┘
                              PK: id
                           codigo (UNIQUE)
                           nombre
                           unidad_medida
                           costo_unitario
                           stock_actual
                           stock_minimo
                           proveedor_id (FK)
                           activo

┌──────────────┐         ┌──────────────┐
│   CLIENTES   │         │    MESAS     │
└──────────────┘         └──────────────┘
     PK: id                   PK: id
   codigo (UNIQUE)          numero_mesa (UNIQUE)
   nombre                   capacidad
   telefono                 zona
   email                    estado
   direccion                activa
   puntos
   activo

┌──────────────┐
│   USUARIOS   │
│  (empleados) │
└──────────────┘
     PK: id
   codigo (UNIQUE)
   nombre
   rol (mesero/cocina/caja/gerente)
   telefono
   email
   usuario (UNIQUE)
   password_hash
   activo
   fecha_ingreso
```

**Descripción**:
- Todos los catálogos tienen códigos únicos validados
- PRODUCTOS están organizados en CATEGORIAS
- INGREDIENTES están asociados a PROVEEDORES
- Todos permiten operaciones CRUD completas

---

## 2. DIAGRAMA ER DEL SISTEMA COMPLETO

```
                    ┌──────────────┐
                    │              │
                    │  CATEGORIAS  │
                    │              │
                    └──────────────┘
                          │ 1:N
                          │
    ┌─────────────────────┴─────────────────────┐
    │                                           │
┌──────────────┐                    ┌──────────────┐
│              │                    │              │
│  PRODUCTOS   │                    │  PROVEEDORES │
│              │                    │              │
└──────────────┘                    └──────────────┘
    │                                      │
    │ N:1                                  │ 1:N
    │                                      │
    ├──────────────┐              ┌───────┴────────┐
    │              │              │                │
    │              │              │                │
┌──────────────────┐      ┌──────────────┐  ┌──────────────┐
│                  │      │              │  │              │
│ DETALLE_ORDENES  │      │ INGREDIENTES │  │   COMPRAS    │
│                  │      │              │  │              │
└──────────────────┘      └──────────────┘  └──────────────┘
    │ N:1                        │                  │
    │                            │                  │ 1:N
    │                            │                  │
┌──────────────┐                 │          ┌──────────────────┐
│              │                 │          │                  │
│   ORDENES    │                 └──────────│ DETALLE_COMPRAS  │
│              │                            │                  │
└──────────────┘                            └──────────────────┘
    │        │
    │ N:1    │ N:1
    │        │
┌─────┴─┐  ┌─┴───────┐
│       │  │         │                ┌──────────────────────┐
│MESAS  │  │USUARIOS │                │                      │
│       │  │         │────────────────│ MOVIMIENTOS_         │
└───────┘  └─────────┘      usuario  │ INVENTARIO           │
               │                      │                      │
               │ N:1                  └──────────────────────┘
               │
          ┌────┴──────┐
          │           │
     ┌────────┐  ┌────────┐
     │  CAJA  │  │CLIENTES│
     │        │  │        │
     └────────┘  └────────┘
```

### Descripción Completa del Sistema:

**Gestión de Productos y Menú**:
- CATEGORIAS contiene categorías de productos
- PRODUCTOS pertenecen a CATEGORIAS
- INGREDIENTES son materias primas

**Gestión de Ventas**:
- USUARIOS (meseros) crean ORDENES
- ORDENES están asignadas a MESAS
- ORDENES contienen DETALLE_ORDENES
- DETALLE_ORDENES referencian PRODUCTOS
- CLIENTES pueden asociarse a ORDENES (opcional)

**Gestión de Compras**:
- PROVEEDORES surten productos e ingredientes
- USUARIOS (gerente) registran COMPRAS
- COMPRAS están asociadas a PROVEEDORES
- COMPRAS contienen DETALLE_COMPRAS
- DETALLE_COMPRAS referencian PRODUCTOS o INGREDIENTES

**Gestión de Inventario**:
- MOVIMIENTOS_INVENTARIO registra entradas y salidas
- Se relaciona con PRODUCTOS e INGREDIENTES
- Referencia COMPRAS y ORDENES
- Asociado a USUARIOS responsables

**Módulo de Caja**:
- USUARIOS (cajeros) gestionan CAJA
- CAJA registra turnos con apertura y cierre
- Relacionado con ORDENES pagadas del período

---

## 3. DESCRIPCIÓN DE ENTIDADES Y RELACIONES

### 3.1 Entidades Principales

#### USUARIOS
- **Descripción**: Empleados del restaurante con acceso al sistema
- **Tipo**: Entidad fuerte
- **Relaciones**: 
  - 1:N con ORDENES (como mesero)
  - 1:N con COMPRAS (como responsable)
  - 1:N con CAJA (como cajero)
  - 1:N con MOVIMIENTOS_INVENTARIO (como responsable)

#### PRODUCTOS
- **Descripción**: Artículos del menú que se venden a clientes
- **Tipo**: Entidad fuerte
- **Relaciones**: 
  - N:1 con CATEGORIAS
  - 1:N con DETALLE_ORDENES
  - 1:N con DETALLE_COMPRAS

#### INGREDIENTES
- **Descripción**: Materias primas utilizadas en preparación
- **Tipo**: Entidad fuerte
- **Relaciones**: 
  - N:1 con PROVEEDORES
  - 1:N con DETALLE_COMPRAS

#### ORDENES
- **Descripción**: Órdenes de venta/pedidos de clientes
- **Tipo**: Entidad fuerte
- **Relaciones**: 
  - N:1 con USUARIOS (mesero)
  - N:1 con MESAS
  - 1:N con DETALLE_ORDENES
  - N:1 con CLIENTES (opcional)

#### COMPRAS
- **Descripción**: Compras de productos/ingredientes a proveedores
- **Tipo**: Entidad fuerte
- **Relaciones**: 
  - N:1 con PROVEEDORES
  - N:1 con USUARIOS (responsable)
  - 1:N con DETALLE_COMPRAS

#### MESAS
- **Descripción**: Mesas del restaurante
- **Tipo**: Entidad fuerte
- **Relaciones**: 
  - 1:N con ORDENES

#### PROVEEDORES
- **Descripción**: Proveedores de productos e ingredientes
- **Tipo**: Entidad fuerte
- **Relaciones**: 
  - 1:N con COMPRAS
  - 1:N con INGREDIENTES

#### CATEGORIAS
- **Descripción**: Categorías de productos del menú
- **Tipo**: Entidad fuerte
- **Relaciones**: 
  - 1:N con PRODUCTOS

#### CLIENTES
- **Descripción**: Clientes del restaurante (opcional, para lealtad)
- **Tipo**: Entidad fuerte
- **Relaciones**: 
  - 1:N con ORDENES (opcional)

#### CAJA
- **Descripción**: Registros de turnos de caja
- **Tipo**: Entidad fuerte
- **Relaciones**: 
  - N:1 con USUARIOS (cajero)

### 3.2 Entidades Débiles/Intermedias

#### DETALLE_ORDENES
- **Descripción**: Productos incluidos en cada orden
- **Tipo**: Entidad débil de ORDENES
- **Relaciones**: 
  - N:1 con ORDENES
  - N:1 con PRODUCTOS

#### DETALLE_COMPRAS
- **Descripción**: Productos/ingredientes incluidos en cada compra
- **Tipo**: Entidad débil de COMPRAS
- **Relaciones**: 
  - N:1 con COMPRAS
  - Referencia a PRODUCTOS o INGREDIENTES

#### MOVIMIENTOS_INVENTARIO
- **Descripción**: Historial de movimientos de inventario
- **Tipo**: Entidad de registro/auditoría
- **Relaciones**: 
  - Referencia a PRODUCTOS o INGREDIENTES
  - N:1 con USUARIOS
  - Referencia a COMPRAS u ORDENES

### 3.3 Tipos de Relaciones

#### 1:N (Uno a Muchos)
- CATEGORIAS → PRODUCTOS
- PROVEEDORES → INGREDIENTES
- PROVEEDORES → COMPRAS
- USUARIOS → ORDENES
- USUARIOS → COMPRAS
- USUARIOS → CAJA
- MESAS → ORDENES
- ORDENES → DETALLE_ORDENES
- COMPRAS → DETALLE_COMPRAS
- CLIENTES → ORDENES

#### N:1 (Muchos a Uno)
- Todas las anteriores vistas desde la otra perspectiva

#### N:M (Muchos a Muchos) - Mediante tablas intermedias
- ORDENES ↔ PRODUCTOS (mediante DETALLE_ORDENES)
- COMPRAS ↔ PRODUCTOS/INGREDIENTES (mediante DETALLE_COMPRAS)

---

## 4. DICCIONARIO DE DATOS (RESUMEN)

### Tabla: USUARIOS
| Campo | Tipo | Longitud | Nulo | Llave | Descripción |
|-------|------|----------|------|-------|-------------|
| id | INT | - | NO | PK | Identificador único |
| codigo | VARCHAR | 20 | NO | UNIQUE | Código del empleado |
| nombre | VARCHAR | 100 | NO | - | Nombre completo |
| rol | ENUM | - | NO | - | mesero/cocina/caja/gerente |
| telefono | VARCHAR | 15 | SÍ | - | Teléfono de contacto |
| email | VARCHAR | 100 | SÍ | - | Email |
| usuario | VARCHAR | 50 | NO | UNIQUE | Usuario de acceso |
| password_hash | VARCHAR | 255 | NO | - | Contraseña encriptada |
| activo | BOOLEAN | - | NO | - | Estado activo/inactivo |
| fecha_ingreso | DATE | - | NO | - | Fecha de ingreso |
| created_at | TIMESTAMP | - | NO | - | Fecha de creación |
| updated_at | TIMESTAMP | - | NO | - | Fecha de actualización |

### Tabla: PRODUCTOS
| Campo | Tipo | Longitud | Nulo | Llave | Descripción |
|-------|------|----------|------|-------|-------------|
| id | INT | - | NO | PK | Identificador único |
| codigo | VARCHAR | 20 | NO | UNIQUE | Código del producto |
| nombre | VARCHAR | 100 | NO | - | Nombre del producto |
| descripcion | TEXT | - | SÍ | - | Descripción detallada |
| precio | DECIMAL | 10,2 | NO | - | Precio de venta |
| categoria_id | INT | - | NO | FK | Categoría |
| stock_actual | DECIMAL | 10,2 | NO | - | Stock disponible |
| stock_minimo | DECIMAL | 10,2 | NO | - | Stock mínimo |
| costo | DECIMAL | 10,2 | NO | - | Costo del producto |
| imagen_url | VARCHAR | 255 | SÍ | - | URL de imagen |
| activo | BOOLEAN | - | NO | - | Estado activo/inactivo |
| created_at | TIMESTAMP | - | NO | - | Fecha de creación |
| updated_at | TIMESTAMP | - | NO | - | Fecha de actualización |

### Tabla: ORDENES
| Campo | Tipo | Longitud | Nulo | Llave | Descripción |
|-------|------|----------|------|-------|-------------|
| id | INT | - | NO | PK | Identificador único |
| folio | VARCHAR | 30 | NO | UNIQUE | Folio autoincrementable |
| mesa_id | INT | - | NO | FK | Mesa asociada |
| mesero_id | INT | - | NO | FK | Mesero responsable |
| cliente_id | INT | - | SÍ | FK | Cliente (opcional) |
| fecha | DATE | - | NO | - | Fecha de la orden |
| hora | TIME | - | NO | - | Hora de la orden |
| subtotal | DECIMAL | 10,2 | NO | - | Subtotal |
| impuestos | DECIMAL | 10,2 | NO | - | Impuestos (IVA) |
| propina | DECIMAL | 10,2 | SÍ | - | Propina |
| total | DECIMAL | 10,2 | NO | - | Total |
| estado | ENUM | - | NO | - | pendiente/proceso/listo/entregado |
| pagada | BOOLEAN | - | NO | - | Si está pagada |
| metodo_pago | ENUM | - | SÍ | - | efectivo/tarjeta/transferencia |
| created_at | TIMESTAMP | - | NO | - | Fecha de creación |
| updated_at | TIMESTAMP | - | NO | - | Fecha de actualización |

*(Continúa para todas las tablas...)*

---

## NOTAS IMPORTANTES

1. **Integridad Referencial**: Todas las relaciones FK deben configurarse con:
   - ON UPDATE CASCADE
   - ON DELETE RESTRICT (para preservar historial)

2. **Índices**: Crear índices en:
   - Llaves foráneas
   - Campos UNIQUE
   - Campos de búsqueda frecuente (nombre, codigo, folio)
   - Campos de fecha para reportes

3. **Triggers Sugeridos**:
   - Actualizar stock_actual en PRODUCTOS al confirmar ORDENES
   - Actualizar stock_actual en INGREDIENTES al confirmar COMPRAS
   - Registrar en MOVIMIENTOS_INVENTARIO automáticamente

4. **Constraints**:
   - CHECK precio > 0
   - CHECK cantidad > 0
   - CHECK stock_actual >= 0 (o permitir negativos según política)

---

**Documento**: Diseño Arquitectural - Diagramas ER

**Versión**: 1.0

**Fecha**: 9 de Diciembre de 2025

**Proyecto**: Sistema de Punto de Venta - Mariscos Castillo
