# 🧪 INSTRUCCIONES PARA PROBAR EL LOGIN

## ✅ PASO 1: Limpiar el navegador

1. **Abre la consola** del navegador:
   - Presiona: `Cmd + Option + J` (en Safari o Chrome)

2. **Limpia el almacenamiento**:
   - En la consola, escribe:
   ```javascript
   localStorage.clear()
   ```
   - Presiona Enter

3. **Cierra todas las pestañas** de localhost:5173

---

## ✅ PASO 2: Verificar que el servidor esté corriendo

1. **Abre una nueva terminal** en VS Code
2. **Ejecuta**:
   ```bash
   lsof -i :5173
   ```

Si NO muestra nada, ejecuta:
```bash
npm run dev
```

Debe mostrar:
```
VITE v5.4.21  ready in 103 ms
➜  Local:   http://localhost:5173/
```

---

## ✅ PASO 3: Abrir en el navegador

1. **Abre una nueva ventana** de incógnito/privada
2. **Ve a**: `http://localhost:5173`
3. **Mantén la consola abierta** (`Cmd + Option + J`)

---

## ✅ PASO 4: Hacer login

1. **Rellena los campos**:
   - Email: `gerente@castillo.com`
   - Password: `castillo123`

2. **Click en "Iniciar Sesión"**

3. **Observa la consola** - deberías ver:
   ```
   🔐 Intentando login con: {email: "gerente@castillo.com"}
   🔍 Respuesta completa del backend: {...}
   ✅ Token recibido: eyJ...
   ✅ Rol del backend: GERENTE
   ✅ Rol normalizado: GERENTE
   💾 Guardado en localStorage directamente
   💾 Guardado en Zustand store
   🔄 Redirigiendo a: /gerente
   🔄 App - Estado de autenticación: {hasToken: true, user: "Gerente Castillo", role: "GERENTE"}
   👔 Gerente - Componente montado
   👔 Gerente - Usuario: {id: "...", name: "Gerente Castillo", ...}
   📊 Cargando datos del dashboard...
   ℹ️ Usando datos de ejemplo...
   ```

4. **Deberías ver**:
   - Un dashboard con estadísticas
   - Ventas del día, semana, mes
   - Gráficas
   - Menú de navegación

---

## 🔴 SI AÚN ESTÁ EN BLANCO:

**Copia TODOS los logs de la consola** y pégalos aquí para diagnosticar el problema.

También toma una **captura de pantalla** de:
- La consola del navegador
- La pestaña Network (filtro: All)
- La URL en la barra de direcciones

---

## 🦐 RESUMEN

- ✅ Backend corriendo en: `http://localhost:3000`
- ✅ Frontend corriendo en: `http://localhost:5173`
- ✅ Usuario: `gerente@castillo.com`
- ✅ Password: `castillo123`
- ✅ Datos de ejemplo configurados (funciona sin backend completo)
