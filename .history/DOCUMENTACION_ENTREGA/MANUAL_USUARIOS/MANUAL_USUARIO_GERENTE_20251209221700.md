# MANUAL DE USUARIO - GERENTE/ADMINISTRADOR
## Sistema de Punto de Venta - Mariscos Castillo

---

## ÍNDICE

1. Introducción
2. Acceso al Sistema
3. Dashboard Gerencial
4. Gestión de Productos
5. Gestión de Inventario
6. Gestión de Compras
7. Gestión de Empleados
8. Configuración de Mesas
9. Reportes
10. Configuración del Sistema

---

## 1. INTRODUCCIÓN

Bienvenido al Sistema de Punto de Venta de Mariscos Castillo. Este manual le guiará en el uso de todas las funcionalidades disponibles para el perfil de Gerente/Administrador.

Como Gerente, usted tiene acceso completo a todas las funcionalidades del sistema, incluyendo:
- Gestión completa de catálogos
- Control de inventario
- Registro de compras
- Generación de reportes
- Configuración del sistema
- Administración de usuarios

---

## 2. ACCESO AL SISTEMA

### 2.1 Iniciar Sesión

1. Abrir navegador web (Chrome, Firefox, Edge o Safari)
2. Escribir la dirección: `http://[IP-DEL-SERVIDOR]:5173` o el dominio configurado
3. En la pantalla de login, ingresar:
   - **Usuario**: Su usuario asignado
   - **Contraseña**: Su contraseña
4. Clic en el botón **"Iniciar Sesión"**

**Nota**: Si olvida su contraseña, contacte al administrador del sistema.

### 2.2 Cerrar Sesión

- Clic en el botón **"Cerrar Sesión"** ubicado en la esquina superior derecha
- Por seguridad, cierre sesión al terminar de usar el sistema

---

## 3. DASHBOARD GERENCIAL

Al iniciar sesión, verá el Dashboard Gerencial con información clave del restaurante.

### 3.1 Métricas del Día

**Ventas del Día**: Muestra el total vendido en el día actual
- Actualización en tiempo real
- Incluye todas las formas de pago

**Órdenes Procesadas**: Número total de órdenes completadas

**Ticket Promedio**: Promedio de consumo por mesa

**Mesas Ocupadas**: Cantidad de mesas actualmente ocupadas del total

### 3.2 Gráfica de Ventas

- Muestra ventas por hora del día
- Compare con días anteriores para identificar patrones

### 3.3 Productos Más Vendidos

- Lista de los productos con mayores ventas del día
- Útil para identificar platillos populares

### 3.4 Alertas de Inventario

- Muestra productos con stock bajo o agotado
- Color rojo indica urgencia
- Clic en un producto para ver detalles

---

## 4. GESTIÓN DE PRODUCTOS

### 4.1 Ver Lista de Productos

1. En el menú lateral, clic en **"Productos"**
2. Se muestra tabla con todos los productos registrados

**Columnas de la tabla**:
- **Código**: Identificador único del producto
- **Nombre**: Nombre del producto
- **Categoría**: Categoría a la que pertenece
- **Precio**: Precio de venta
- **Stock**: Cantidad disponible
- **Estado**: Activo o Inactivo

**Funciones de búsqueda**:
- Barra de búsqueda: Escribir nombre o código del producto
- Filtro por categoría: Seleccionar categoría específica
- Filtro por estado: Ver solo activos o inactivos

### 4.2 Crear Nuevo Producto

1. Clic en botón **"+ Nuevo Producto"**
2. Completar formulario:
   - **Código**: Ingresar código único (ej: PLT001)
     * Si el código ya existe, se mostrará mensaje de error
   - **Nombre**: Nombre del producto (ej: Ceviche de Camarón)
   - **Descripción**: Descripción detallada
   - **Categoría**: Seleccionar del menú desplegable
   - **Precio**: Precio de venta (ej: 150.00)
   - **Costo**: Costo del producto (ej: 80.00)
   - **Stock Actual**: Cantidad en inventario
   - **Stock Mínimo**: Nivel mínimo antes de alerta
   - **Imagen**: Clic en "Seleccionar archivo" para subir foto
   - **Estado**: Activar/Desactivar producto
3. Clic en **"Guardar"**
4. Se muestra mensaje de confirmación

**Nota**: Los campos marcados con asterisco (*) son obligatorios.

### 4.3 Editar Producto

1. En la lista de productos, clic en icono de editar (lápiz) en la fila del producto
2. Modificar los campos deseados
3. Clic en **"Guardar"**

### 4.4 Eliminar Producto

1. En la lista de productos, clic en icono de eliminar (basura)
2. Confirmar la acción en el mensaje que aparece
3. **Advertencia**: No se puede eliminar productos con movimientos en el sistema

---

## 5. GESTIÓN DE INVENTARIO

### 5.1 Ver Inventario Actual

1. En el menú, clic en **"Inventario"**
2. Seleccionar pestaña **"Inventario Actual"**
3. Ver tabla con:
   - Código y nombre del producto/ingrediente
   - Cantidad actual
   - Stock mínimo
   - Estado (Normal/Bajo/Crítico)

**Códigos de color**:
- Verde: Stock normal
- Amarillo: Stock bajo (cerca del mínimo)
- Rojo: Stock crítico (por debajo del mínimo)

### 5.2 Consultar Movimientos de Inventario

1. En Inventario, seleccionar pestaña **"Movimientos"**
2. Configurar filtros:
   - **Fecha Inicio**: Seleccionar fecha inicial
   - **Fecha Fin**: Seleccionar fecha final
   - **Tipo**: Entrada o Salida (o ambos)
   - **Producto**: Buscar producto específico (opcional)
3. Clic en **"Buscar"**
4. Ver tabla con movimientos:
   - Fecha y hora
   - Tipo de movimiento
   - Producto
   - Cantidad
   - Referencia (número de compra o venta)
   - Usuario responsable

### 5.3 Realizar Ajuste de Inventario

Usar cuando hay diferencias entre inventario físico y sistema.

1. En Inventario, pestaña **"Ajustes"**
2. Clic en **"+ Nuevo Ajuste"**
3. Completar formulario:
   - **Producto**: Buscar y seleccionar producto
   - **Tipo**: Entrada (+) o Salida (-)
   - **Cantidad**: Cantidad a ajustar
   - **Motivo**: Seleccionar (Merma, Corrección, Devolución, etc.)
   - **Observaciones**: Detalle adicional
4. Clic en **"Registrar Ajuste"**
5. El inventario se actualiza automáticamente

**Importante**: Todos los ajustes quedan registrados con usuario, fecha y hora.

---

## 6. GESTIÓN DE COMPRAS

### 6.1 Ver Lista de Compras

1. En el menú, clic en **"Compras"**
2. Ver tabla con todas las compras registradas

**Filtros disponibles**:
- Por proveedor
- Por rango de fechas

### 6.2 Registrar Nueva Compra

1. Clic en **"+ Nueva Compra"**
2. Completar datos generales:
   - **Folio**: Número de factura o remisión del proveedor
     * **Importante**: Validar que no se repita
   - **Proveedor**: Seleccionar del menú desplegable
   - **Fecha**: Seleccionar fecha de la compra
3. Agregar productos:
   - Clic en **"+ Agregar Producto"**
   - Buscar producto o ingrediente
   - Ingresar **Cantidad**
   - Ingresar **Precio Unitario**
   - El subtotal se calcula automáticamente
   - Repetir para cada producto
4. El **Total** se calcula automáticamente
5. Agregar **Observaciones** si es necesario
6. Clic en **"Guardar Compra"**

**Importante**: 
- El inventario se actualiza automáticamente al guardar
- Verificar bien los datos antes de guardar
- Si necesita modificar, use el botón de editar antes de confirmar

### 6.3 Editar o Eliminar Compra

1. En la lista, clic en icono correspondiente
2. Realizar cambios necesarios
3. Guardar cambios

**Nota**: Solo se pueden editar compras recientes. Compras antiguas quedan bloqueadas por auditoría.

---

## 7. GESTIÓN DE EMPLEADOS

### 7.1 Ver Lista de Empleados

1. En el menú, clic en **"Empleados"**
2. Ver lista completa con:
   - Código
   - Nombre
   - Rol (Gerente, Mesero, Cocina, Cajero)
   - Usuario de acceso
   - Teléfono
   - Estado

### 7.2 Agregar Nuevo Empleado

1. Clic en **"+ Nuevo Empleado"**
2. Completar formulario:
   - **Código**: Código único del empleado (ej: EMP001)
   - **Nombre Completo**: Nombre del empleado
   - **Rol**: Seleccionar perfil de acceso
     * Gerente: Acceso completo
     * Cajero: Solo caja y ventas
     * Mesero: Solo toma de órdenes
     * Cocina: Solo gestión de pedidos
   - **Teléfono**: Número de contacto
   - **Email**: Correo electrónico
   - **Dirección**: Dirección completa
   - **Usuario**: Usuario para login (único)
   - **Contraseña**: Contraseña inicial
     * Mínimo 6 caracteres
     * El empleado debe cambiarla después
   - **Estado**: Activo/Inactivo
3. Clic en **"Guardar"**

**Importante**: Anotar las credenciales y entregarlas al empleado de forma segura.

### 7.3 Editar o Desactivar Empleado

1. Clic en icono de editar en la fila del empleado
2. Modificar datos necesarios
3. Para desactivar: cambiar Estado a "Inactivo"
4. Guardar cambios

**Nota**: No elimine empleados, mejor desactívelos para mantener historial.

---

## 8. CONFIGURACIÓN DE MESAS

### 8.1 Ver Mapa de Mesas

1. En el menú, clic en **"Mesas"**
2. Ver representación visual de todas las mesas

**Códigos de color**:
- Verde: Disponible
- Rojo: Ocupada
- Amarillo: Reservada
- Gris: Fuera de servicio

### 8.2 Agregar Nueva Mesa

1. Clic en **"+ Agregar Mesa"**
2. Completar:
   - **Número de Mesa**: Identificador único (ej: 1, 2, 3, o A1, A2, etc.)
   - **Capacidad**: Número de comensales
   - **Zona**: Área del restaurante (Principal, Terraza, VIP, etc.)
   - **Estado Inicial**: Disponible
   - **Mesa Activa**: Sí
3. Clic en **"Guardar"**

### 8.3 Configurar o Desactivar Mesa

1. Clic en una mesa en el mapa
2. Clic en **"Configurar"**
3. Modificar datos
4. Para dar de baja temporalmente: cambiar Estado a "Fuera de Servicio"
5. Guardar cambios

---

## 9. REPORTES

### 9.1 Tipos de Reportes Disponibles

**Catálogos**:
- Listado de Productos
- Listado de Proveedores
- Listado de Empleados
- Listado de Clientes

**Inventario**:
- Inventario Actual
- Movimientos de Inventario

**Ventas**:
- Ventas por Período
- Ventas por Método de Pago
- Productos Más Vendidos
- Ventas por Mesero

**Gerenciales**:
- Dashboard Ejecutivo
- Análisis de Rentabilidad

### 9.2 Generar Reporte

1. En el menú, clic en **"Reportes"**
2. Seleccionar tipo de reporte deseado
3. Configurar parámetros:
   - **Fecha Inicio** y **Fecha Fin** (si aplica)
   - Filtros adicionales según el reporte
4. Clic en **"Generar PDF"**
5. Esperar generación (puede tomar algunos segundos)
6. El PDF se abre en nueva pestaña
7. Guardar o imprimir según necesidad

**Recomendación**: Generar reportes periódicamente para análisis de negocio.

---

## 10. CONFIGURACIÓN DEL SISTEMA

### 10.1 Configuración General

1. En el menú, clic en **"Configuración"**
2. Opciones disponibles:
   - **Información del Restaurante**:
     * Nombre, dirección, teléfono, RFC
     * Logo del restaurante
   - **Impuestos**:
     * Porcentaje de IVA (16% por defecto)
     * Otros impuestos aplicables
   - **Caja**:
     * Configuración de métodos de pago
     * Configuración de impresoras
3. Modificar según necesidad
4. Guardar cambios

### 10.2 Respaldos

**Importante**: Configurar respaldos automáticos de la base de datos.

Contactar al administrador de sistemas para:
- Configurar respaldos diarios automáticos
- Verificar que los respaldos funcionan
- Mantener respaldos fuera del servidor

---

## 11. MEJORES PRÁCTICAS

### 11.1 Seguridad

- ✅ Cerrar sesión al terminar
- ✅ No compartir contraseñas
- ✅ Cambiar contraseña periódicamente
- ✅ Usar contraseñas seguras (mayúsculas, minúsculas, números, símbolos)
- ✅ No dejar el sistema abierto sin supervisión

### 11.2 Operación Diaria

- Revisar el dashboard cada mañana
- Verificar alertas de inventario
- Revisar ventas del día anterior
- Generar reporte de ventas semanalmente
- Verificar que los empleados cierren sesión correctamente

### 11.3 Mantenimiento de Datos

- Mantener catálogos actualizados
- Revisar y depurar productos inactivos
- Verificar precios periódicamente
- Actualizar información de proveedores
- Revisar stock mínimo de productos según temporada

---

## 12. SOLUCIÓN DE PROBLEMAS

### Problema: No puedo iniciar sesión

**Solución**:
1. Verificar que usuario y contraseña sean correctos
2. Verificar que no hay espacios extra
3. Verificar que su cuenta esté activa
4. Contactar al administrador

### Problema: El sistema está lento

**Solución**:
1. Verificar conexión a internet
2. Cerrar pestañas innecesarias del navegador
3. Reiniciar el navegador
4. Verificar con administrador de sistemas

### Problema: No se genera el PDF

**Solución**:
1. Verificar que no hay bloqueador de pop-ups activo
2. Intentar con otro navegador
3. Verificar que los parámetros son correctos
4. Reportar al soporte técnico

---

## 13. CONTACTO Y SOPORTE

Para soporte técnico:
- Email: soporte@mariscoscastillo.com
- Teléfono: [Número]
- Horario: Lunes a Viernes, 9:00 AM - 6:00 PM

---

**Manual de Usuario - Gerente/Administrador**

**Versión**: 1.0

**Fecha**: 9 de Diciembre de 2025

**Proyecto**: Sistema de Punto de Venta - Mariscos Castillo
