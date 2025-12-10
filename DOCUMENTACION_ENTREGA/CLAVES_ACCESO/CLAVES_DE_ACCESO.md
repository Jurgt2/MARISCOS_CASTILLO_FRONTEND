# CLAVES DE ACCESO AL SISTEMA
## Sistema de Punto de Venta - Mariscos Castillo

---

## ⚠️ DOCUMENTO CONFIDENCIAL

Este documento contiene información sensible de acceso al sistema.
Debe mantenerse en lugar seguro y solo accesible por personal autorizado.

---

## ÍNDICE

1. Credenciales de Administrador
2. Credenciales de Usuarios del Sistema
3. Credenciales de Base de Datos
4. Información de Acceso al Servidor
5. Políticas de Seguridad
6. Cambio de Contraseñas

---

## 1. CREDENCIALES DE ADMINISTRADOR

### Usuario Administrador Principal

**Perfil**: Gerente/Administrador
- **Usuario**: `admin`
- **Contraseña**: `Admin2025!`
- **Código de Empleado**: ADM001
- **Nombre**: Administrador del Sistema
- **Nivel de Acceso**: Completo (todas las funcionalidades)

**Notas**:
- Esta es la cuenta principal del sistema
- Tiene acceso a todas las funcionalidades
- **IMPORTANTE**: Cambiar esta contraseña en el primer acceso
- No compartir estas credenciales
- Usar solo para administración y configuración inicial

---

## 2. CREDENCIALES DE USUARIOS DEL SISTEMA

### 2.1 Usuarios de Prueba - Perfil GERENTE

**Usuario 1**:
- **Usuario**: `gerente01`
- **Contraseña**: `Gerente2025!`
- **Código**: GER001
- **Nombre**: Roberto Martínez
- **Rol**: Gerente
- **Acceso**: Completo

### 2.2 Usuarios de Prueba - Perfil CAJERO

**Usuario 1**:
- **Usuario**: `cajero01`
- **Contraseña**: `Cajero2025!`
- **Código**: CAJ001
- **Nombre**: Ana García
- **Rol**: Cajero
- **Acceso**: Caja, procesar pagos, consultar ventas

**Usuario 2**:
- **Usuario**: `cajero02`
- **Contraseña**: `Cajero2025!`
- **Código**: CAJ002
- **Nombre**: Luis Hernández
- **Rol**: Cajero
- **Acceso**: Caja, procesar pagos, consultar ventas

### 2.3 Usuarios de Prueba - Perfil MESERO

**Usuario 1**:
- **Usuario**: `mesero01`
- **Contraseña**: `Mesero2025!`
- **Código**: MES001
- **Nombre**: Juan Pérez
- **Rol**: Mesero
- **Acceso**: Tomar órdenes, consultar mesas, enviar a cocina

**Usuario 2**:
- **Usuario**: `mesero02`
- **Contraseña**: `Mesero2025!`
- **Código**: MES002
- **Nombre**: María López
- **Rol**: Mesero
- **Acceso**: Tomar órdenes, consultar mesas, enviar a cocina

**Usuario 3**:
- **Usuario**: `mesero03`
- **Contraseña**: `Mesero2025!`
- **Código**: MES003
- **Nombre**: Carlos Ramírez
- **Rol**: Mesero
- **Acceso**: Tomar órdenes, consultar mesas, enviar a cocina

### 2.4 Usuarios de Prueba - Perfil COCINA

**Usuario 1**:
- **Usuario**: `cocina01`
- **Contraseña**: `Cocina2025!`
- **Código**: COC001
- **Nombre**: Pedro Sánchez
- **Rol**: Cocina
- **Acceso**: Ver pedidos, marcar estados de preparación

**Usuario 2**:
- **Usuario**: `cocina02`
- **Contraseña**: `Cocina2025!`
- **Código**: COC002
- **Nombre**: José Torres
- **Rol**: Cocina
- **Acceso**: Ver pedidos, marcar estados de preparación

---

## 3. CREDENCIALES DE BASE DE DATOS

### PostgreSQL

**Servidor**: localhost (o IP del servidor)
- **Puerto**: 5432
- **Base de Datos**: `mariscos_castillo`
- **Usuario**: `mariscos_user`
- **Contraseña**: `MrsCstll2025!DB`

**Usuario Superadministrador de PostgreSQL**:
- **Usuario**: `postgres`
- **Contraseña**: `PostgresAdmin2025!`

**Notas**:
- Usar el usuario `mariscos_user` para la aplicación
- Usar `postgres` solo para administración de base de datos
- Estas credenciales están configuradas en el archivo `.env` del backend

---

## 4. INFORMACIÓN DE ACCESO AL SERVIDOR

### Servidor de Aplicación

**Ubicación**: 
- IP Local: `192.168.1.100` (ejemplo - ajustar según su red)
- Puerto Frontend: `5173` (desarrollo) / `80` (producción)
- Puerto Backend: `4000`

**Acceso SSH** (si es servidor Linux):
- **Usuario**: `mariscos`
- **Contraseña**: `ServerMrsCstll2025!`
- Comando: `ssh mariscos@192.168.1.100`

**Acceso RDP** (si es servidor Windows):
- **Usuario**: `Administrador`
- **Contraseña**: `ServerMrsCstll2025!`

**Ubicación de Archivos**:
- Backend: `/home/mariscos/mariscos-backend` (Linux) o `C:\mariscos-backend` (Windows)
- Frontend: `/home/mariscos/mariscos-frontend` (Linux) o `C:\mariscos-frontend` (Windows)

---

## 5. POLÍTICAS DE SEGURIDAD

### 5.1 Uso de Contraseñas

**Requisitos de Contraseñas**:
- Mínimo 8 caracteres
- Al menos una mayúscula
- Al menos una minúscula
- Al menos un número
- Al menos un carácter especial (@, #, $, !, etc.)

**Políticas**:
- ✅ Cambiar contraseña cada 90 días
- ✅ No repetir últimas 3 contraseñas
- ✅ No compartir contraseñas entre usuarios
- ✅ No escribir contraseñas en lugares visibles
- ✅ Usar contraseñas diferentes para cada sistema

### 5.2 Acceso al Sistema

**Reglas**:
- Cada empleado debe tener su propio usuario
- No compartir credenciales
- Cerrar sesión al terminar
- Reportar accesos no autorizados inmediatamente
- Bloquear pantalla si se ausenta temporalmente

### 5.3 Respaldos y Seguridad de Datos

- Los respaldos de base de datos se realizan diariamente
- Los respaldos se almacenan en ubicación segura
- Solo personal autorizado tiene acceso a respaldos
- Se mantienen respaldos por 30 días

---

## 6. CAMBIO DE CONTRASEÑAS

### 6.1 Cambiar Contraseña de Usuario del Sistema

**Opción 1: Desde el Sistema (cada usuario)**
1. Iniciar sesión con credenciales actuales
2. Ir a "Mi Perfil" o "Configuración"
3. Seleccionar "Cambiar Contraseña"
4. Ingresar contraseña actual
5. Ingresar nueva contraseña (dos veces)
6. Guardar cambios

**Opción 2: Por el Administrador**
1. Administrador inicia sesión
2. Ir a "Gestión de Empleados"
3. Seleccionar usuario
4. Clic en "Restablecer Contraseña"
5. Ingresar nueva contraseña temporal
6. Informar al usuario para que la cambie

### 6.2 Cambiar Contraseña de Base de Datos

**IMPORTANTE**: Cambiar en base de datos Y en archivo `.env`

1. Conectarse a PostgreSQL:
```sql
psql -U postgres
```

2. Cambiar contraseña:
```sql
ALTER USER mariscos_user WITH PASSWORD 'nueva_contraseña_segura';
```

3. Actualizar archivo `.env` del backend:
```env
DB_PASSWORD=nueva_contraseña_segura
```

4. Reiniciar backend:
```bash
pm2 restart mariscos-backend
# o
npm restart
```

### 6.3 Cambiar JWT Secret

**IMPORTANTE**: Esto invalidará todas las sesiones activas.

1. Generar nuevo secret (usar generador online o comando):
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

2. Actualizar en `.env`:
```env
JWT_SECRET=nuevo_secret_generado
```

3. Reiniciar backend

4. Todos los usuarios deberán iniciar sesión nuevamente

---

## 7. PROCEDIMIENTO EN CASO DE COMPROMISO DE SEGURIDAD

Si sospecha que alguna credencial ha sido comprometida:

**Acción Inmediata**:
1. Cambiar la contraseña comprometida inmediatamente
2. Revisar logs de acceso para actividad sospechosa
3. Notificar al administrador del sistema
4. Documentar el incidente

**Prevención**:
- Revisar periódicamente los logs de acceso
- Mantener sistema actualizado
- Capacitar al personal en seguridad
- Realizar auditorías de seguridad

---

## 8. CONTACTOS DE EMERGENCIA

**Administrador del Sistema**:
- Nombre: [Nombre del Responsable]
- Teléfono: [Número de Emergencia]
- Email: admin@mariscoscastillo.com

**Soporte Técnico**:
- Email: soporte@mariscoscastillo.com
- Teléfono: [Número de Soporte]
- Horario: 24/7 para emergencias críticas

---

## 9. REGISTRO DE CAMBIOS

| Fecha | Usuario Modificado | Cambio Realizado | Responsable |
|-------|-------------------|------------------|-------------|
| 09/12/2025 | - | Creación inicial de usuarios | Administrador |
| | | | |
| | | | |
| | | | |

**Instrucciones**: Mantener este registro actualizado cada vez que se modifiquen credenciales.

---

## 10. DECLARACIÓN DE CONFIDENCIALIDAD

Este documento contiene información confidencial y propietaria de Mariscos Castillo.

- No debe ser copiado, distribuido o revelado sin autorización
- Debe almacenarse en lugar seguro con acceso restringido
- Solo personal autorizado debe tener acceso
- En caso de terminación de empleo, devolver o destruir copias

---

**IMPORTANTE**:
- ✅ Cambiar TODAS las contraseñas de este documento en el primer uso
- ✅ Guardar este documento en lugar seguro
- ✅ No enviar por email sin encriptar
- ✅ Actualizar este documento cuando se cambien credenciales
- ✅ Revisar permisos y accesos mensualmente

---

**Documento**: Claves de Acceso al Sistema

**Versión**: 1.0

**Fecha de Creación**: 9 de Diciembre de 2025

**Última Actualización**: 9 de Diciembre de 2025

**Clasificación**: CONFIDENCIAL

**Proyecto**: Sistema de Punto de Venta - Mariscos Castillo
