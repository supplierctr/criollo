# 🚀 Guía para Alojar en GitHub Pages

## 📋 Pasos para Publicar en GitHub Pages

### 1. **Crear un Repositorio en GitHub**

1. Ve a [GitHub.com](https://github.com)
2. Haz clic en "New repository"
3. Nombra el repositorio: `criollo-4` o `criollo-web`
4. Marca como **Public** (necesario para GitHub Pages gratuito)
5. No inicialices con README (ya tienes archivos)
6. Haz clic en "Create repository"

### 2. **Subir los Archivos**

```bash
# En tu carpeta local del proyecto
git init
git add .
git commit -m "Primera versión de Criollo 4"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/criollo-4.git
git push -u origin main
```

### 3. **Configurar GitHub Pages**

1. Ve a tu repositorio en GitHub
2. Haz clic en **Settings** (pestaña)
3. Baja hasta **Pages** (en el menú lateral)
4. En **Source**, selecciona **Deploy from a branch**
5. En **Branch**, selecciona **main** y **/(root)**
6. Haz clic en **Save**

### 4. **Esperar el Despliegue**

- GitHub Pages tardará unos minutos en desplegar
- Verás un mensaje verde: "Your site is published at https://TU_USUARIO.github.io/criollo-4/"

## 🔧 Configuración Adicional

### **Personalizar Dominio (Opcional)**

Si quieres un dominio personalizado:

1. En **Settings > Pages**
2. En **Custom domain**, escribe tu dominio
3. Marca **Enforce HTTPS**
4. Guarda

### **Configurar HTTPS**

GitHub Pages automáticamente proporciona HTTPS, pero asegúrate de que tu Service Worker funcione:

```javascript
// En sw.js, verifica que las rutas sean correctas
const STATIC_FILES = [
  '/criollo-4/',  // Si tu repo se llama criollo-4
  '/criollo-4/index.html',
  // ... resto de archivos
];
```

## 📁 Estructura de Archivos Requerida

```
criollo-4/
├── index.html          ✅ REQUERIDO
├── style.css           ✅ REQUERIDO
├── script.js           ✅ REQUERIDO
├── manifest.json       ✅ PWA
├── sw.js              ✅ PWA
├── 404.html           ✅ Error page
└── README.md          ✅ Documentación
```

## 🎯 URLs de Acceso

- **Página Principal**: `https://TU_USUARIO.github.io/criollo-4/`
- **PWA Install**: Disponible en navegadores compatibles
- **Offline**: Funciona gracias al Service Worker

## 🔍 Verificar el Despliegue

### **Pruebas Básicas**
1. ✅ La página carga correctamente
2. ✅ El toggle de tema funciona (sol/luna)
3. ✅ Los temas de restaurantes cambian
4. ✅ Las notificaciones toast aparecen
5. ✅ La PWA se puede instalar

### **Pruebas Avanzadas**
1. ✅ Modo offline funciona
2. ✅ Service Worker registrado
3. ✅ Manifest cargado correctamente
3. ✅ Responsive en móviles

## 🛠️ Solución de Problemas

### **El Toggle No Funciona**
1. Abre las herramientas de desarrollador (F12)
2. Ve a la pestaña **Console**
3. Busca mensajes de error
4. Verifica que el archivo `script.js` se cargue

### **PWA No Se Instala**
1. Verifica que `manifest.json` esté en la raíz
2. Asegúrate de que `sw.js` esté en la raíz
3. Comprueba que las rutas en el Service Worker sean correctas

### **Errores de CORS**
- GitHub Pages no tiene problemas de CORS
- Si usas APIs externas, verifica que permitan GitHub Pages

## 📱 Configuración para Producción

### **Optimizaciones Recomendadas**

1. **Comprimir Imágenes** (si las agregas)
2. **Minificar CSS/JS** (opcional)
3. **Configurar Cache** (ya incluido en Service Worker)
4. **Analytics** (opcional)

### **Variables de Entorno**

Para diferentes entornos, puedes usar:

```javascript
const isProduction = window.location.hostname === 'TU_USUARIO.github.io';
const API_URL = isProduction ? 'https://tu-api.com' : 'http://localhost:3000';
```

## 🎉 ¡Listo!

Una vez desplegado, tu aplicación estará disponible en:
**https://TU_USUARIO.github.io/criollo-4/**

### **Características Disponibles**
- ✅ PWA instalable
- ✅ Modo offline
- ✅ Temas personalizables
- ✅ Responsive design
- ✅ Integración con Google Sheets
- ✅ Notificaciones modernas

---

**¿Necesitas ayuda?** Revisa los logs en la consola del navegador para diagnosticar problemas.
