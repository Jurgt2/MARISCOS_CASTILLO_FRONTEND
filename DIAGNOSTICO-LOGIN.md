# 🔍 GUÍA DE DIAGNÓSTICO - Problema de Redirección Post-Login

## 📋 Cambios Realizados

### 1. **Login.tsx** - Adaptador de Respuesta del Backend
Ahora el componente de login maneja diferentes formatos de respuesta del backend:

```typescript
// ACEPTA AMBOS FORMATOS:

// Formato 1 (esperado originalmente)
{
  "token": "...",
  "user": { "name": "...", "role": "..." }
}

// Formato 2 (backend en español)
{
  "token": "...",
  "usuario": { "nombre": "...", "rol": "..." }
}
```

### 2. **Logs de Debugging Agregados**
- ✅ Consola mostrará la respuesta completa del backend
- ✅ Consola mostrará el token y usuario normalizado
- ✅ Consola mostrará la ruta a la que se está redirigiendo
- ✅ ProtectedRoute mostrará si el token está presente
- ✅ authStore mostrará cuando se guarde el auth

### 3. **Redirección Mejorada**
- Agregado `{ replace: true }` para evitar loops
- Agregado `setTimeout` de 100ms para asegurar que el estado se actualice

## 🧪 Pasos para Diagnosticar

### 1. **Abre la Consola del Navegador**
- Chrome/Safari: `Cmd + Option + J` (Mac) o `F12` (Windows)
- Pestaña "Console"

### 2. **Intenta hacer login con:**
- Email: `gerente@castillo.com`
- Password: `castillo123`

### 3. **Observa los logs en la consola:**

Deberías ver algo como:

```
🔍 Respuesta del backend: { token: "...", usuario: {...} }
✅ Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
✅ Usuario normalizado: { id: 1, name: "Gerente", email: "...", role: "GERENTE" }
🔐 Guardando auth en store: { token: "eyJ...", user: {...} }
✅ Auth guardado en localStorage
🔄 Redirigiendo a /gerente
🛡️ ProtectedRoute - Token: ✅ Presente
🛡️ ProtectedRoute - User: { id: 1, name: "Gerente", ... }
```

## 🔎 Posibles Escenarios y Soluciones

### Escenario 1: "❌ Sin token, redirigiendo a /login"
**Problema:** El token no se está guardando
**Solución:** Verifica la respuesta del backend, debe incluir el campo `token`

### Escenario 2: "❌ Rol no autorizado: UNDEFINED"
**Problema:** El campo del rol no se está mapeando correctamente
**Solución:** Verifica que el backend envíe `rol` o `role`

### Escenario 3: La página recarga pero no navega
**Problema:** React Router no está detectando el cambio
**Solución:** Ya agregado `setTimeout` y `replace: true`

### Escenario 4: Error 401 después del login
**Problema:** El token no se está enviando en las siguientes peticiones
**Solución:** Verificar que `api.ts` tenga el interceptor correcto

## 📝 Verifica en localStorage

Abre la consola del navegador y ejecuta:

```javascript
// Ver el auth guardado
console.log(JSON.parse(localStorage.getItem('auth-storage')))

// Debería mostrar:
{
  state: {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    user: {
      id: "1",
      name: "Gerente",
      email: "gerente@castillo.com",
      role: "GERENTE"
    }
  },
  version: 0
}
```

## 🔧 Si el problema persiste

### Opción 1: Verifica la respuesta exacta del backend
```bash
# En terminal, prueba el endpoint directamente:
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"gerente@castillo.com","password":"castillo123"}'
```

Copia la respuesta y pégala aquí para ajustar el código.

### Opción 2: Limpia el caché
```javascript
// En consola del navegador:
localStorage.clear()
sessionStorage.clear()
// Luego recarga la página (Cmd+R)
```

### Opción 3: Verifica que no haya errores de compilación
- Mira la terminal donde corre `npm run dev`
- No debe haber errores de TypeScript

## 🎯 Próximos Pasos

1. **Haz login** con las credenciales de prueba
2. **Copia todos los logs** que aparezcan en la consola
3. **Comparte los logs** para que pueda identificar el problema exacto
4. **Verifica localStorage** con el comando de arriba

## 📞 Información que necesito si persiste el error

1. Todos los logs de la consola del navegador
2. La respuesta exacta del backend (campo `token` y `usuario`/`user`)
3. El contenido de `localStorage.getItem('auth-storage')`
4. Cualquier error en la consola (rojo)

---

**El código ahora tiene protección contra diferentes formatos de respuesta del backend y logs detallados para diagnosticar el problema.** 🦐
