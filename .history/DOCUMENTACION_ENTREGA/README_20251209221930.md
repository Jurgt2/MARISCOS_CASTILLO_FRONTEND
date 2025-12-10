# DOCUMENTACIÓN DE ENTREGA
## Sistema de Punto de Venta - Mariscos Castillo

---

## 📋 ÍNDICE DE DOCUMENTOS

Esta carpeta contiene toda la documentación requerida para la entrega del proyecto en carácter de ordinario.

---

## 📁 ESTRUCTURA DE CARPETAS

```
DOCUMENTACION_ENTREGA/
├── DOCUMENTO_REQUERIMIENTOS/
│   └── 01_DOCUMENTO_REQUERIMIENTOS.md
├── DISEÑO_ARQUITECTURAL/
│   ├── 01_DIAGRAMAS_ER.md
│   └── 02_DIAGRAMAS_UML.md
├── DISEÑO_INTERFACES/
│   └── ESPECIFICACION_INTERFACES.md
├── MANUAL_INSTALACION/
│   └── MANUAL_INSTALACION.md
├── MANUAL_USUARIOS/
│   ├── MANUAL_USUARIO_GERENTE.md
│   └── MANUAL_USUARIO_MESERO_COCINA_CAJERO.md
├── CLAVES_ACCESO/
│   └── CLAVES_DE_ACCESO.md
└── README.md (este archivo)
```

---

## 📄 DESCRIPCIÓN DE DOCUMENTOS

### 1. DOCUMENTO DE REQUERIMIENTOS

**Ubicación**: `/DOCUMENTO_REQUERIMIENTOS/`

**Contenido**:
- Índice completo
- Introducción al sistema
- Definición de Requerimientos Funcionales (RF-001 a RF-020)
- Definición de Requerimientos No Funcionales (RNF-001 a RNF-020)
- Apéndices:
  * Descripción de la Plataforma de Hardware
  * Lenguaje de Programación (Frontend y Backend)
  * Manejador de Base de Datos (PostgreSQL/MySQL)

**Propósito**: Documentar todas las funcionalidades y características técnicas del sistema.

---

### 2. DISEÑO ARQUITECTURAL

**Ubicación**: `/DISEÑO_ARQUITECTURAL/`

**Contiene 2 documentos**:

#### a) Diagramas Entidad-Relación (ER)
- Diagrama ER por cada requerimiento funcional
- Diagrama ER del sistema completo
- Descripción de entidades y relaciones
- Diccionario de datos

#### b) Diagramas UML
- Diagrama de Casos de Uso
- Diagrama de Clases
- Diagrama de Secuencia
- Diagrama de Actividades
- Diagrama de Componentes
- Diagrama de Despliegue

**Propósito**: Mostrar la arquitectura y diseño técnico del sistema.

---

### 3. DISEÑO DE INTERFACES

**Ubicación**: `/DISEÑO_INTERFACES/`

**Contenido**:
- Especificación de interfaces para Gerente/Administrador
- Especificación de interfaces para Mesero
- Especificación de interfaces para Cocina
- Especificación de interfaces para Cajero
- Componentes comunes del sistema
- Guía de estilos y diseño (colores, tipografía, responsive)

**Propósito**: Documentar todas las pantallas e interfaces de usuario del sistema.

---

### 4. MANUAL DE INSTALACIÓN

**Ubicación**: `/MANUAL_INSTALACION/`

**Contenido**:
- Requisitos previos (hardware y software)
- Instalación de la base de datos
- Instalación del backend
- Instalación del frontend
- Configuración del sistema
- Verificación de la instalación
- Solución de problemas comunes
- Mantenimiento y actualizaciones

**Propósito**: Guía completa para instalar y configurar el sistema.

---

### 5. MANUALES DE USUARIO

**Ubicación**: `/MANUAL_USUARIOS/`

**Contiene 2 documentos**:

#### a) Manual de Usuario - Gerente/Administrador
- Acceso al sistema
- Dashboard gerencial
- Gestión de productos, inventario, compras
- Gestión de empleados y mesas
- Generación de reportes
- Configuración del sistema

#### b) Manual de Usuario - Mesero, Cocina, Cajero
- Manual para perfil Mesero (toma de órdenes)
- Manual para perfil Cocina (gestión de pedidos)
- Manual para perfil Cajero (procesamiento de pagos y caja)

**Propósito**: Guías de uso para cada tipo de usuario del sistema.

---

### 6. CLAVES DE ACCESO

**Ubicación**: `/CLAVES_ACCESO/`

**Contenido** (⚠️ CONFIDENCIAL):
- Credenciales del administrador
- Credenciales de todos los usuarios del sistema por rol
- Credenciales de base de datos
- Información de acceso al servidor
- Políticas de seguridad
- Procedimientos de cambio de contraseñas

**Propósito**: Documento con todas las credenciales de acceso al sistema.

**IMPORTANTE**: Este documento debe mantenerse seguro y confidencial.

---

## 💻 CÓDIGO FUENTE

**Ubicación del código**: 
- **Frontend**: Carpeta raíz del proyecto `MARISCOS_CASTILLO_FRONTEND`
- **Backend**: Carpeta `MARISCOS_CASTILLO_BACKEND` (si está separado)

El código fuente incluye:
- Todos los archivos fuente (.tsx, .ts, .js)
- Archivos de configuración
- Dependencias (package.json)
- Scripts de base de datos
- Archivos de estilos (CSS)

---

## 🔧 REQUERIMIENTOS DE HARDWARE Y SOFTWARE

**Resumen** (detalle completo en Documento de Requerimientos):

### Hardware Mínimo:
- **Servidor**: Intel Core i5, 8GB RAM, 500GB SSD
- **Estaciones**: Intel Core i3, 4GB RAM, 128GB HDD
- **Red**: Ethernet Gigabit o WiFi

### Software Requerido:
- **Sistema Operativo**: Windows 10+, macOS 10.15+, Ubuntu 20.04+
- **Node.js**: 18.x LTS o 20.x LTS
- **Base de Datos**: PostgreSQL 14+ o MySQL 8+
- **Navegadores**: Chrome, Firefox, Edge, Safari (últimas versiones)

---

## 🚀 FUNCIONALIDAD DEL SISTEMA

El sistema incluye los siguientes módulos funcionales:

✅ **Registro y Control de Ventas (Salidas)**
- Toma de órdenes con asignación a mesas
- Folios autoincrementables
- Cálculo automático de totales e impuestos
- Actualización automática de inventario

✅ **Registro y Control de Compras (Entradas)**
- Registro de compras a proveedores
- Folios definidos por usuario
- Actualización de inventario

✅ **Registro y Control de Movimientos del Inventario**
- Inventario en tiempo real
- Alertas de stock bajo
- Historial completo de movimientos

✅ **Registro y Control de Pedidos**
- Envío automático a cocina
- Gestión de estados de preparación
- Notificaciones en tiempo real

✅ **Módulo de Caja**
- Apertura con saldo inicial
- Procesamiento de pagos (efectivo, tarjeta, transferencia)
- Corte de caja con reporte
- Generación de tickets

✅ **Catálogos con Validación**
- Productos, Ingredientes, Proveedores, Clientes, Empleados, Mesas
- Validación de códigos únicos
- CRUD completo en todos los catálogos

✅ **Reportes en PDF**
- Listados de catálogos
- Reportes de inventario
- Reportes de ventas
- Reportes gerenciales

✅ **Comunicación en Tiempo Real**
- WebSocket para actualizaciones instantáneas
- Sincronización entre estaciones

---

## 👥 PERFILES DE USUARIO

El sistema soporta 4 perfiles de usuario:

1. **Gerente/Administrador**: Acceso completo
2. **Mesero**: Toma de órdenes y consultas
3. **Cocina**: Gestión de pedidos
4. **Cajero**: Procesamiento de pagos y caja

---

## 📞 CONTACTO Y SOPORTE

**Soporte Técnico**:
- Email: soporte@mariscoscastillo.com
- Teléfono: [Número de Contacto]
- Horario: Lunes a Viernes, 9:00 AM - 6:00 PM

---

## 📝 INFORMACIÓN DEL PROYECTO

**Nombre del Proyecto**: Sistema de Punto de Venta - Mariscos Castillo

**Tipo de Entrega**: Ordinario

**Fecha de Entrega**: 9 de Diciembre de 2025

**Versión del Sistema**: 1.0

**Tecnologías Principales**:
- Frontend: React 18 + TypeScript + Vite + TailwindCSS
- Backend: Node.js + Express + Socket.IO
- Base de Datos: PostgreSQL 14+ / MySQL 8+
- ORM: Sequelize / TypeORM

---

## ✅ CHECKLIST DE DOCUMENTACIÓN ENTREGADA

- [x] Documento de Requerimientos (Funcionales y No Funcionales)
- [x] Diseño Arquitectural (Diagramas ER completos)
- [x] Diseño Arquitectural (Diagramas UML)
- [x] Diseño de Interfaces (Especificaciones para todos los perfiles)
- [x] Manual de Instalación
- [x] Manual de Usuario para Gerente
- [x] Manual de Usuario para Mesero, Cocina, Cajero
- [x] Claves de Acceso (Todos los usuarios)
- [x] Código Fuente (Frontend completo)
- [x] Scripts de Base de Datos
- [x] Archivo README principal

---

## 📌 NOTAS IMPORTANTES

1. **Código Fuente**: El código fuente completo del frontend está en la carpeta raíz del proyecto. El backend debe entregarse por separado si es un repositorio independiente.

2. **Base de Datos**: Los scripts SQL están en la carpeta `/database/` del proyecto.

3. **Credenciales**: Las credenciales en el documento de Claves de Acceso son **temporales** y deben cambiarse en la instalación en producción.

4. **Configuración**: Revisar archivos `.env.example` en frontend y backend para configuración de variables de entorno.

5. **Instalación**: Seguir estrictamente el Manual de Instalación para evitar problemas.

---

## 🔐 SEGURIDAD

**RECORDATORIO IMPORTANTE**:
- Cambiar todas las contraseñas por defecto
- Configurar backups automáticos
- Mantener el sistema actualizado
- No exponer puertos innecesarios al público
- Usar HTTPS en producción

---

**Fin del Documento**

Para cualquier duda o aclaración sobre la documentación, contactar al equipo de desarrollo.
