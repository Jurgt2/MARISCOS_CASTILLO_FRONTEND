# MANUAL DE INSTALACIÓN
## Sistema de Punto de Venta - Mariscos Castillo

---

## ÍNDICE

1. Requisitos Previos
2. Instalación de la Base de Datos
3. Instalación del Backend
4. Instalación del Frontend
5. Configuración del Sistema
6. Verificación de la Instalación
7. Solución de Problemas Comunes

---

## 1. REQUISITOS PREVIOS

### 1.1 Hardware Requerido

**Servidor**:
- Procesador: Intel Core i5 o AMD Ryzen 5 (o superior)
- Memoria RAM: 8 GB mínimo (16 GB recomendado)
- Almacenamiento: 500 GB SSD
- Red: Puerto Ethernet Gigabit o WiFi

**Estaciones de Trabajo**:
- Procesador: Intel Core i3 o equivalente
- Memoria RAM: 4 GB mínimo
- Almacenamiento: 128 GB
- Monitor: Resolución mínima 1024x768
- Red: Ethernet 100 Mbps o WiFi

### 1.2 Software Requerido

Antes de iniciar la instalación, asegúrese de tener:

1. **Sistema Operativo**:
   - Windows 10/11, macOS 10.15+, o Linux Ubuntu 20.04+

2. **Node.js**:
   - Versión: 18.x LTS o 20.x LTS
   - Descargar de: https://nodejs.org

3. **PostgreSQL** (o MySQL):
   - Versión: PostgreSQL 14+ o MySQL 8+
   - Descargar de: https://www.postgresql.org o https://www.mysql.com

4. **Git** (opcional, para control de versiones):
   - Descargar de: https://git-scm.com

5. **Editor de Código** (opcional, para configuración):
   - Visual Studio Code, Sublime Text, etc.

---

## 2. INSTALACIÓN DE LA BASE DE DATOS

### 2.1 Instalación de PostgreSQL

#### En Windows:
1. Descargar el instalador de PostgreSQL desde https://www.postgresql.org/download/windows/
2. Ejecutar el instalador
3. Seguir el asistente de instalación
4. **Importante**: Anotar la contraseña del usuario `postgres`
5. Seleccionar el puerto (por defecto: 5432)
6. Completar la instalación

#### En macOS:
```bash
# Usando Homebrew
brew install postgresql@14
brew services start postgresql@14
```

#### En Linux (Ubuntu):
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 2.2 Crear la Base de Datos

1. Abrir una terminal o línea de comandos

2. Conectarse a PostgreSQL:
```bash
# En Windows y macOS
psql -U postgres

# En Linux
sudo -u postgres psql
```

3. Crear la base de datos:
```sql
CREATE DATABASE mariscos_castillo;
```

4. Crear un usuario para la aplicación:
```sql
CREATE USER mariscos_user WITH ENCRYPTED PASSWORD 'tu_contraseña_segura';
```

5. Otorgar permisos:
```sql
GRANT ALL PRIVILEGES ON DATABASE mariscos_castillo TO mariscos_user;
```

6. Salir de psql:
```sql
\q
```

### 2.3 Cargar Datos Iniciales (Opcional)

Si tiene un archivo SQL con datos iniciales:

```bash
psql -U mariscos_user -d mariscos_castillo -f /ruta/al/archivo/datos_iniciales.sql
```

---

## 3. INSTALACIÓN DEL BACKEND

### 3.1 Obtener el Código Fuente

**Opción A: Desde archivo ZIP**
1. Extraer el archivo `MARISCOS_CASTILLO_BACKEND.zip`
2. Colocar en la ubicación deseada, ejemplo: `C:\mariscos-castillo-backend`

**Opción B: Desde repositorio Git** (si aplica)
```bash
git clone [URL_DEL_REPOSITORIO_BACKEND]
cd mariscos-castillo-backend
```

### 3.2 Instalar Dependencias

1. Abrir terminal en la carpeta del backend

2. Instalar dependencias de Node.js:
```bash
npm install
```

Este comando instalará todas las librerías necesarias (Express, Sequelize, Socket.IO, etc.)

### 3.3 Configurar Variables de Entorno

1. Crear un archivo `.env` en la raíz del proyecto backend

2. Copiar el contenido del archivo `.env.example` (si existe) o crear con el siguiente contenido:

```env
# Puerto del servidor
PORT=4000

# Base de Datos
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mariscos_castillo
DB_USER=mariscos_user
DB_PASSWORD=tu_contraseña_segura
DB_DIALECT=postgres

# JWT Secret (generar una clave aleatoria segura)
JWT_SECRET=tu_clave_secreta_muy_larga_y_segura_aqui

# Entorno
NODE_ENV=production

# Configuración de CORS
CORS_ORIGIN=http://localhost:5173
```

**Importante**: Cambiar los valores según su configuración, especialmente:
- `DB_PASSWORD`: La contraseña que definió para `mariscos_user`
- `JWT_SECRET`: Generar una clave aleatoria larga y segura

### 3.4 Ejecutar Migraciones de Base de Datos

```bash
# Si el proyecto usa Sequelize CLI
npx sequelize-cli db:migrate

# O si tiene un script personalizado
npm run migrate
```

### 3.5 Poblar Datos Iniciales (Seeds)

```bash
# Si el proyecto usa Sequelize CLI
npx sequelize-cli db:seed:all

# O si tiene un script personalizado
npm run seed
```

Esto creará:
- Usuario administrador por defecto
- Categorías básicas
- Mesas configuradas
- Datos de ejemplo (opcional)

### 3.6 Iniciar el Servidor Backend

**Modo Desarrollo** (con recarga automática):
```bash
npm run dev
```

**Modo Producción**:
```bash
npm start
```

Deberá ver un mensaje similar a:
```
🚀 Servidor corriendo en puerto 4000
✅ Base de datos conectada
🔌 WebSocket Server iniciado
```

---

## 4. INSTALACIÓN DEL FRONTEND

### 4.1 Obtener el Código Fuente

**Opción A: Desde archivo ZIP**
1. Extraer el archivo `MARISCOS_CASTILLO_FRONTEND.zip`
2. Colocar en la ubicación deseada, ejemplo: `C:\mariscos-castillo-frontend`

**Opción B: Desde repositorio Git** (si aplica)
```bash
git clone [URL_DEL_REPOSITORIO_FRONTEND]
cd mariscos-castillo-frontend
```

### 4.2 Instalar Dependencias

1. Abrir terminal en la carpeta del frontend

2. Instalar dependencias:
```bash
npm install
```

### 4.3 Configurar Variables de Entorno

1. Crear un archivo `.env` en la raíz del proyecto frontend

2. Agregar la configuración:

```env
# URL del Backend API
VITE_API_URL=http://localhost:4000

# URL del WebSocket
VITE_SOCKET_URL=http://localhost:4000
```

**Nota**: Si el backend está en otro servidor, cambiar `localhost` por la IP correspondiente.

### 4.4 Iniciar la Aplicación Frontend

**Modo Desarrollo**:
```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173`

**Build para Producción**:
```bash
npm run build
```

Esto genera una carpeta `dist` con los archivos optimizados para producción.

### 4.5 Servir en Producción (Opcional)

**Opción A: Usando servidor HTTP simple**
```bash
npm install -g serve
serve -s dist -l 80
```

**Opción B: Configurar con Nginx** (Linux)

Crear archivo de configuración:
```nginx
server {
    listen 80;
    server_name tudominio.com;

    root /ruta/a/mariscos-castillo-frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Reiniciar Nginx:
```bash
sudo systemctl restart nginx
```

---

## 5. CONFIGURACIÓN DEL SISTEMA

### 5.1 Configurar Impresoras

#### Impresora Térmica de Tickets

1. Conectar la impresora térmica al servidor o estación de caja
2. Instalar drivers del fabricante
3. Configurar como impresora predeterminada o anotar el nombre
4. Verificar que funcione imprimiendo una página de prueba

#### Configuración en el Sistema

En el archivo de configuración del backend o frontend (según implementación):

```js
// Ejemplo de configuración
PRINTER_NAME=POS-80    // Nombre de la impresora
PRINTER_WIDTH=80       // Ancho en mm (58 o 80)
```

### 5.2 Configurar Red Local

1. **Asignar IP Estática al Servidor** (recomendado):

En Windows:
- Panel de Control → Redes → Propiedades del adaptador
- Configurar IPv4 con IP fija, ejemplo: `192.168.1.100`

En Linux:
```bash
sudo nano /etc/netplan/01-netcfg.yaml
```

2. **Configurar Firewall**:

En Windows:
- Permitir puerto 4000 (backend) y 5173 o 80 (frontend)

En Linux:
```bash
sudo ufw allow 4000/tcp
sudo ufw allow 80/tcp
```

3. **Verificar Conectividad**:

Desde una estación de trabajo, hacer ping al servidor:
```bash
ping 192.168.1.100
```

### 5.3 Crear Usuario Administrador

Si no se creó automáticamente en los seeds, crear manualmente:

1. Acceder a la base de datos:
```bash
psql -U mariscos_user -d mariscos_castillo
```

2. Insertar usuario administrador:
```sql
INSERT INTO usuarios (codigo, nombre, rol, usuario, password_hash, activo, fecha_ingreso)
VALUES (
    'ADM001',
    'Administrador',
    'gerente',
    'admin',
    '$2a$10$HASH_DE_PASSWORD_ENCRIPTADO',
    true,
    CURRENT_DATE
);
```

**Nota**: El password_hash debe generarse con bcrypt. Contraseña por defecto sugerida: `Admin123!`

O usar el endpoint de la API si está configurado para crear el primer usuario.

---

## 6. VERIFICACIÓN DE LA INSTALACIÓN

### 6.1 Checklist de Verificación

- [ ] Base de datos PostgreSQL está corriendo
- [ ] Base de datos `mariscos_castillo` existe
- [ ] Tablas fueron creadas correctamente
- [ ] Backend Node.js está corriendo en puerto 4000
- [ ] Frontend está accesible en navegador
- [ ] WebSocket está conectado (verificar en consola del navegador)
- [ ] Se puede hacer login con usuario administrador
- [ ] Las páginas cargan correctamente
- [ ] No hay errores en consola del navegador
- [ ] No hay errores en logs del backend

### 6.2 Pruebas Básicas

1. **Probar Login**:
   - Ir a `http://localhost:5173` (o la IP del servidor)
   - Ingresar credenciales del administrador
   - Verificar que redirige al dashboard

2. **Probar Creación de Producto**:
   - Ir a Gestión de Productos
   - Crear un producto de prueba
   - Verificar que se guarda correctamente

3. **Probar Comunicación en Tiempo Real**:
   - Abrir dos navegadores
   - Login en ambos (diferentes roles)
   - Crear una orden en uno
   - Verificar que aparece en el otro

4. **Probar Generación de PDF**:
   - Ir a Reportes
   - Generar un reporte sencillo
   - Verificar que se descarga el PDF

---

## 7. SOLUCIÓN DE PROBLEMAS COMUNES

### 7.1 Error: "Cannot connect to database"

**Causa**: Backend no puede conectarse a PostgreSQL

**Solución**:
1. Verificar que PostgreSQL está corriendo:
   ```bash
   # Windows
   services.msc → Buscar PostgreSQL

   # Linux
   sudo systemctl status postgresql
   ```

2. Verificar credenciales en `.env`
3. Verificar que el puerto 5432 no está bloqueado por firewall
4. Intentar conectarse manualmente con psql para verificar credenciales

### 7.2 Error: "Port 4000 already in use"

**Causa**: Otro proceso está usando el puerto 4000

**Solución**:
1. Cambiar el puerto en `.env` del backend
2. Actualizar también en `.env` del frontend (VITE_API_URL)
3. O detener el proceso que usa el puerto 4000

Para ver qué proceso usa el puerto:
```bash
# Windows
netstat -ano | findstr :4000

# Linux/macOS
lsof -i :4000
```

### 7.3 Error: "npm install" falla

**Causa**: Problemas de red, permisos, o dependencias incompatibles

**Solución**:
1. Limpiar caché de npm:
   ```bash
   npm cache clean --force
   ```

2. Eliminar `node_modules` y `package-lock.json`:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. Verificar versión de Node.js:
   ```bash
   node --version    # Debe ser 18.x o 20.x
   ```

### 7.4 Frontend no se conecta al Backend

**Causa**: URL incorrecta o CORS no configurado

**Solución**:
1. Verificar que `VITE_API_URL` en frontend apunta a la URL correcta
2. Verificar que backend está corriendo
3. Verificar configuración de CORS en backend
4. Abrir consola del navegador (F12) y revisar errores de red

### 7.5 WebSocket no conecta

**Causa**: Configuración incorrecta o puerto bloqueado

**Solución**:
1. Verificar `VITE_SOCKET_URL` en frontend
2. Verificar que Socket.IO server está iniciado en backend
3. Revisar logs del backend para mensajes de Socket.IO
4. Verificar firewall no bloquea conexiones WebSocket

### 7.6 Impresora no imprime tickets

**Causa**: Driver no instalado o configuración incorrecta

**Solución**:
1. Verificar que la impresora está encendida y conectada
2. Imprimir página de prueba desde Windows
3. Verificar nombre de la impresora en configuración
4. Instalar drivers actualizados del fabricante
5. Verificar que el formato ESC/POS es compatible

### 7.7 Error 404 al recargar página en producción

**Causa**: Servidor no redirige todas las rutas a index.html

**Solución para Nginx**:
Asegurarse de tener en la configuración:
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

---

## 8. MANTENIMIENTO Y ACTUALIZACIONES

### 8.1 Respaldos de Base de Datos

Configurar respaldos automáticos diarios:

```bash
# Script de respaldo (Linux/macOS)
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump -U mariscos_user mariscos_castillo > /ruta/respaldos/backup_$DATE.sql
```

Programar con cron (Linux) o Task Scheduler (Windows).

### 8.2 Actualización del Sistema

1. Respaldar base de datos
2. Descargar nueva versión del código
3. Ejecutar `npm install` en backend y frontend
4. Ejecutar migraciones nuevas si las hay
5. Reiniciar servicios
6. Verificar funcionamiento

### 8.3 Monitoreo

Herramientas recomendadas:
- **PM2**: Para mantener el backend corriendo y auto-reinicio
  ```bash
  npm install -g pm2
  pm2 start npm --name "mariscos-backend" -- start
  pm2 startup
  pm2 save
  ```

- **Logs**: Revisar regularmente logs del sistema
  ```bash
  pm2 logs mariscos-backend
  ```

---

## 9. CONTACTO Y SOPORTE

Para soporte técnico o consultas:
- Email: soporte@mariscoscastillo.com
- Teléfono: [Número de contacto]
- Horario: Lunes a Viernes, 9:00 AM - 6:00 PM

---

**Documento**: Manual de Instalación

**Versión**: 1.0

**Fecha**: 9 de Diciembre de 2025

**Proyecto**: Sistema de Punto de Venta - Mariscos Castillo
